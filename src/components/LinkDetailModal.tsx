import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  Calendar, 
  Globe, 
  Folder, 
  FileText, 
  Star, 
  Trash2, 
  Save,
  Rss
} from 'lucide-react';
import { CollectionItem, LinkItem } from '../types';
import { formatDate, getDomain, getFaviconUrl } from '../utils/favicon';

interface LinkDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: LinkItem | null;
  collection?: CollectionItem;
  onUpdateNotes: (id: number, notes: string) => Promise<void>;
  onTogglePin: (id: number, current: boolean) => void;
  onToggleRead: (id: number, current: boolean) => void;
  onToggleArchive: (id: number, current: boolean) => void;
  onMoveToTrash: (id: number) => void;
}

export const LinkDetailModal: React.FC<LinkDetailModalProps> = ({
  isOpen,
  onClose,
  link,
  collection,
  onUpdateNotes,
  onTogglePin,
  onMoveToTrash
}) => {
  if (!isOpen || !link) return null;

  const [notes, setNotes] = useState(link.notes || '');
  const [copied, setCopied] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const domain = getDomain(link.url);
  const faviconUrl = getFaviconUrl(link.url);

  const handleCopy = () => {
    navigator.clipboard.writeText(link.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNotes = async () => {
    if (!link.id) return;
    try {
      setIsSavingNotes(true);
      await onUpdateNotes(link.id, notes);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } finally {
      setIsSavingNotes(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="w-full max-w-2xl bg-[#212121] rounded-2xl shadow-2xl border border-[#3e3e3e] overflow-hidden my-8 text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333333]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#171717] border border-[#383838] flex items-center justify-center shrink-0 overflow-hidden">
              <img src={faviconUrl} alt={domain} className="w-4 h-4 object-contain" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-white truncate">
                {link.title || link.url}
              </h2>
              <span className="text-xs text-[#a3a3a3]">
                {domain}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#333333] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* URL Row */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#171717] border border-[#383838] gap-3">
            <span className="text-xs font-mono text-neutral-300 truncate select-all">
              {link.url}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#262626] border border-[#404040] text-xs font-medium text-neutral-300 hover:text-white hover:bg-[#333333] transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#7dd3fc] hover:bg-[#38bdf8] text-[#0f172a] text-xs font-bold shadow-xs transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Visit Link</span>
              </a>
            </div>
          </div>

          {/* RSS Akış Satırı */}
          {link.rss && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#171717] border border-amber-500/20 gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Rss className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs font-mono text-[#fbbf24] truncate select-all">
                  {link.rss}
                </span>
              </div>
              <a
                href={link.rss}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-medium transition-colors shrink-0"
              >
                <ExternalLink className="w-3 h-3" />
                <span>RSS Akışı</span>
              </a>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#171717] border border-[#383838] space-y-1">
              <span className="text-neutral-500 flex items-center gap-1.5 font-medium">
                <Folder className="w-3.5 h-3.5 text-[#38bdf8]" /> Collection
              </span>
              <div className="font-semibold text-neutral-200">
                {collection ? collection.name : 'No Collection'}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#171717] border border-[#383838] space-y-1">
              <span className="text-neutral-500 flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Date Added
              </span>
              <div className="font-semibold text-neutral-200">
                {new Date(link.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Description */}
          {link.description && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                Description
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed bg-[#171717] p-3 rounded-xl border border-[#383838]">
                {link.description}
              </p>
            </div>
          )}

          {/* Tags */}
          {link.tags && link.tags.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                Tags
              </div>
              <div className="flex flex-wrap gap-1.5">
                {link.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#38bdf8]/15 text-[#7dd3fc] border border-[#38bdf8]/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#38bdf8]" />
                Personal Notes (IndexedDB)
              </span>
              {saveSuccess && (
                <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" /> Saved!
                </span>
              )}
            </div>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write your markdown or text notes here..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#171717] border border-[#383838] text-xs text-white focus:outline-none focus:border-[#38bdf8] transition-colors font-mono resize-none"
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={isSavingNotes || notes === (link.notes || '')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#7dd3fc] hover:bg-[#38bdf8] disabled:opacity-50 text-[#0f172a] shadow-xs transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isSavingNotes ? 'Saving...' : 'Update Notes'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#1b1b1b] border-t border-[#333333] flex items-center justify-between">
          <button
            onClick={() => link.id && onTogglePin(link.id, link.isPinned)}
            className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors ${
              link.isPinned
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-[#262626] text-neutral-300 hover:text-white'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${link.isPinned ? 'fill-current' : ''}`} />
            <span>{link.isPinned ? 'Pinned' : 'Pin to Dashboard'}</span>
          </button>

          <button
            onClick={() => {
              if (link.id) onMoveToTrash(link.id);
              onClose();
            }}
            className="p-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-950/40 flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Move to Trash</span>
          </button>
        </div>
      </div>
    </div>
  );
};
