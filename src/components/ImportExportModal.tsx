import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  FileJson, 
  FileCode, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  RefreshCw 
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

  // JSON Export
  const handleExportJson = async () => {
    try {
      setIsProcessing(true);
      const jsonStr = await exportDatabaseToJson();
      const dateStr = new Date().toISOString().split('T')[0];
      downloadFile(jsonStr, `saved-backup-${dateStr}.json`, 'application/json');
      setStatusMessage({ type: 'success', text: 'JSON yedeği başarıyla indirildi!' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: 'Dışa aktarma hatası: ' + err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  // JSON Import
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
          text: `Yedek yüklendi: ${result.linksCount} bağlantı ve ${result.collectionsCount} koleksiyon eklendi.`
        });
        onDataChanged();
      } catch (err: any) {
        setStatusMessage({ type: 'error', text: 'İçe aktarma hatası: ' + err.message });
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // HTML Export (Netscape)
  const handleExportHtml = async () => {
    try {
      setIsProcessing(true);
      const links = await db.links.toArray();
      const collections = await db.collections.toArray();
      const html = generateNetscapeBookmarks(links, collections);
      const dateStr = new Date().toISOString().split('T')[0];
      downloadFile(html, `saved-bookmarks-${dateStr}.html`, 'text/html');
      setStatusMessage({ type: 'success', text: 'HTML yer imleri dosyası indirildi (Chrome, Firefox uyumlu).' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: 'Dışa aktarma hatası: ' + err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  // HTML Import (Netscape Bookmarks)
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
          throw new Error('Dosyada geçerli bağlantı bulunamadı.');
        }

        // Group by collectionName to create missing collections
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
                  color: '#3b82f6',
                  createdAt: Date.now()
                });
                colNameMap.set(lowerName, newColId as number);
                collectionId = newColId as number;
              }
            }

            // Add tags to db if present
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
            text: `HTML yer imleri içe aktarıldı: ${importedLinks} bağlantı başarıyla eklendi!`
          });
        });

        onDataChanged();
      } catch (err: any) {
        setStatusMessage({ type: 'error', text: 'HTML içe aktarma hatası: ' + err.message });
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                İçe ve Dışa Aktar
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Verilerinizi yedekleyin, taşıyın veya tarayıcı yer imlerinizi aktarın
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 pt-3 gap-4">
          <button
            onClick={() => {
              setActiveTab('json');
              setStatusMessage(null);
            }}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'json'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileJson className="w-4 h-4" />
            <span>Tam JSON Yedek (Önerilen)</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('html');
              setStatusMessage(null);
            }}
            className={`pb-3 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'html'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>HTML Yer İmleri (Chrome/Firefox/Linkwarden)</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Alert */}
          {statusMessage && (
            <div className={`p-3 rounded-xl flex items-center gap-2 text-xs font-medium ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
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
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Tam Yedek İndir (Dışa Aktar)
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Tüm bağlantılarınızı, koleksiyonlarınızı, etiketlerinizi ve notlarınızı tek bir JSON dosyası olarak kaydedin.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleExportJson}
                    disabled={isProcessing}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>JSON Yedeği İndir (.json)</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Yedek Yükle (Geri Yükle)
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Daha önce indirdiğiniz Saved JSON yedeğini yükleyerek verilerinizi geri getirin.
                </p>

                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={overwrite}
                    onChange={(e) => setOverwrite(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 dark:bg-slate-800 dark:border-slate-700"
                  />
                  <span>Mevcut tüm verileri sil ve yedeğin üzerine yaz</span>
                </label>

                <div className="pt-1">
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-semibold cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>JSON Dosyası Seç</span>
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
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  HTML Yer İmleri Dosyası İndir
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Standart Netscape Bookmark formatında dışa aktarın. Bu dosyayı Google Chrome, Firefox, Safari, Brave veya Raindrop içine aktarabilirsiniz.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleExportHtml}
                    disabled={isProcessing}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>HTML Yer İmleri İndir (.html)</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Tarayıcı veya Linkwarden Yer İmlerini İçe Aktar
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Chrome, Firefox veya Linkwarden'dan dışa aktardığınız HTML yer imi dosyasını seçin. Klasörler otomatik olarak koleksiyonlara dönüştürülecektir.
                </p>
                <div className="pt-2">
                  <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-semibold cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>HTML Dosyası Seç</span>
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

          {/* Privacy Note */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              Verileriniz hiçbir sunucuya yüklenmez. Tüm aktarım ve yedekleme işlemleri 100% cihazınızda istemci tarafında gerçekleşir.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
