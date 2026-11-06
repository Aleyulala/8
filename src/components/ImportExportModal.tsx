import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  FileJson, 
  FileCode, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck 
} from 'lucide-react';
import { db } from '../db';
import { CollectionItem, LinkItem } from '../types';
import { downloadFile, exportDatabaseToJson, importDatabaseFromJson } from '../utils/exportImport';
import { generateNetscapeBookmarks, parseNetscapeBookmarks } from '../utils/bookmarkParser';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
  onDataChanged
}) => {
  const [activeTab, setActiveTab] = useState<'json' | 'html'>('json');
  const [overwrite, setOverwrite] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleExportJson = async () => {
    try {
      setIsProcessing(true);
      const jsonStr = await exportDatabaseToJson();
      const dateStr = new Date().toISOString().split('T')[0];
      downloadFile(jsonStr, `saved-backup-${dateStr}.json`, 'application/json');
      setStatusMessage({ type: 'success', text: 'JSON backup downloaded successfully!' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: 'Export error: ' + err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        setIsProcessing(true);
        const content = event.target?.result as string;
        const result = await importDatabaseFromJson(content, overwrite);
        setStatusMessage({
          type: 'success',
          text: `Backup restored: ${result.linksCount} links and ${result.collectionsCount} collections imported.`
        });
        onDataChanged();
      } catch (err: any) {
        setStatusMessage({ type: 'error', text: 'Import error: ' + err.message });
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExportHtml = async () => {
    try {
      setIsProcessing(true);
      const links = await db.links.toArray();
      const collections = await db.collections.toArray();
      const html = generateNetscapeBookmarks(links, collections);
      const dateStr = new Date().toISOString().split('T')[0];
      downloadFile(html, `saved-bookmarks-${dateStr}.html`, 'text/html');
      setStatusMessage({ type: 'success', text: 'HTML Bookmarks exported (Chrome, Firefox, Linkwarden compatible).' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: 'Export error: ' + err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImportHtmlFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        setIsProcessing(true);
        const html = event.target?.result as string;
        const bookmarks = parseNetscapeBookmarks(html);

        if (bookmarks.length === 0) {
          throw new Error('No valid bookmarks found in file.');
        }

        await db.transaction('rw', db.links, db.collections, db.tags, async () => {
          const colNameMap = new Map<string, number>();
          const existingCols = await db.collections.toArray();
          existingCols.forEach(c => {
            if (c.id) colNameMap.set(c.name.toLowerCase(), c.id);
          });

          let importedLinks = 0;
          for (const bm of bookmarks) {
            let collectionId: number | null = null;
            if (bm.collectionName) {
              const lowerName = bm.collectionName.toLowerCase();
              if (colNameMap.has(lowerName)) {
                collectionId = colNameMap.get(lowerName)!;
              } else {
                const newColId = await db.collections.add({
                  name: bm.collectionName,
                  color: '#38bdf8',
                  createdAt: Date.now()
                });
                colNameMap.set(lowerName, newColId as number);
                collectionId = newColId as number;
              }
            }

            if (bm.tags && bm.tags.length > 0) {
              for (const tag of bm.tags) {
                const existing = await db.tags.where('name').equalsIgnoreCase(tag).first();
                if (!existing) {
                  await db.tags.add({ name: tag.toLowerCase() });
                }
              }
            }

            await db.links.add({
              url: bm.url,
              title: bm.title,
              description: '',
              collectionId,
              tags: bm.tags || [],
              isPinned: false,
              isArchived: false,
              isRead: false,
              isTrash: false,
              createdAt: bm.dateAdded || Date.now(),
              updatedAt: Date.now()
            });
            importedLinks++;
          }

          setStatusMessage({
            type: 'success',
            text: `Imported ${importedLinks} bookmarks successfully!`
          });
        });

        onDataChanged();
      } catch (err: any) {
        setStatusMessage({ type: 'error', text: 'HTML import error: ' + err.message });
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="w-full max-w-xl bg-[#212121] rounded-2xl shadow-2xl border border-[#3e3e3e] overflow-hidden my-8 text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333333]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#38bdf8]/15 text-[#38bdf8] flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Import & Export
              </h2>
              <p className="text-xs text-[#8e8e8e]">
                Backup, restore, or transfer bookmarks from Chrome, Firefox or Linkwarden
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#333333] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-[#333333] px-6 pt-3 gap-4">
          <button
            onClick={() => {
              setActiveTab('json');
              setStatusMessage(null);
            }}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'json'
                ? 'border-[#38bdf8] text-[#38bdf8]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <FileJson className="w-4 h-4" />
            <span>JSON Backup</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('html');
              setStatusMessage(null);
            }}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'html'
                ? 'border-[#38bdf8] text-[#38bdf8]'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>HTML Bookmarks (Linkwarden/Chrome)</span>
          </button>
        </div>

        <div className="p-6 space-y-5">
          {statusMessage && (
            <div className={`p-3 rounded-xl flex items-center gap-2 text-xs font-medium ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800'
                : 'bg-rose-950/40 text-rose-300 border border-rose-800'
            }`}>
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {activeTab === 'json' ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#171717] border border-[#383838] space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-white">
                  Export Full JSON Backup
                </div>
                <p className="text-xs text-[#8e8e8e] leading-relaxed">
                  Download all your links, collections, tags, and personal notes into a single portable JSON file.
                </p>
                <div className="pt-1">
                  <button
                    onClick={handleExportJson}
                    disabled={isProcessing}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7dd3fc] hover:bg-[#38bdf8] text-[#0f172a] text-xs font-bold shadow-xs transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#171717] border border-[#383838] space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-white">
                  Restore from JSON Backup
                </div>
                <p className="text-xs text-[#8e8e8e] leading-relaxed">
                  Upload a previously exported Saved JSON backup to restore your data.
                </p>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-300">
                  <input
                    type="checkbox"
                    checked={overwrite}
                    onChange={(e) => setOverwrite(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-500 focus:ring-rose-500 bg-[#212121] border-[#383838]"
                  />
                  <span>Overwrite existing database</span>
                </label>

                <div className="pt-1">
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#333333] hover:bg-[#404040] text-white text-xs font-semibold cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Select JSON File</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJsonFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#171717] border border-[#383838] space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-white">
                  Export HTML Bookmarks
                </div>
                <p className="text-xs text-[#8e8e8e] leading-relaxed">
                  Export standard Netscape HTML format compatible with Google Chrome, Firefox, Safari, and Linkwarden.
                </p>
                <div className="pt-1">
                  <button
                    onClick={handleExportHtml}
                    disabled={isProcessing}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7dd3fc] hover:bg-[#38bdf8] text-[#0f172a] text-xs font-bold shadow-xs transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export Bookmarks HTML</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#171717] border border-[#383838] space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-white">
                  Import HTML Bookmarks
                </div>
                <p className="text-xs text-[#8e8e8e] leading-relaxed">
                  Import your bookmarks from Chrome, Firefox, Raindrop, or your Linkwarden instance. Folders will be converted into collections automatically.
                </p>
                <div className="pt-1">
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#333333] hover:bg-[#404040] text-white text-xs font-semibold cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Select HTML File</span>
                    <input
                      type="file"
                      accept=".html,.htm"
                      onChange={handleImportHtmlFile}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-[#8e8e8e] bg-[#171717] p-3 rounded-xl border border-[#383838]">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              100% Client-side. No data is ever sent to any remote server.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
