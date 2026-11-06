import React, { useState } from 'react';
import { X, Tag as TagIcon, Trash2, Plus } from 'lucide-react';
import { TagItem } from '../types';

interface ManageTagsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tags: TagItem[];
  tagCounts: Record<string, number>;
  onAddTag: (name: string) => Promise<void>;
  onDeleteTag: (name: string) => Promise<void>;
}

export const ManageTagsModal: React.FC<ManageTagsModalProps> = ({
  isOpen,
  onClose,
  tags,
  tagCounts,
  onAddTag,
  onDeleteTag
}) => {
  const [newTagName, setNewTagName] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newTagName.trim().toLowerCase().replace(/^#/, '');
    if (!clean) return;

    try {
      setIsSubmitting(true);
      await onAddTag(clean);
      setNewTagName('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredTags = tags.filter(t => 
    t.name.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <TagIcon className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Etiketleri Yönet
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Yeni Etiket Ekle Formu */}
          <form onSubmit={handleAdd} className="flex gap-2">
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Yeni etiket adı..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
            />
            <button
              type="submit"
              disabled={isSubmitting || !newTagName.trim()}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Ekle</span>
            </button>
          </form>

          {/* Etiket Listesi */}
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Kayıtlı Etiketler ({tags.length})
            </div>

            {tags.length > 5 && (
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Etiketleri filtrele..."
                className="w-full px-3 py-1.5 mb-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs border-0 text-slate-900 dark:text-white focus:ring-1 focus:ring-blue-500"
              />
            )}

            <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
              {filteredTags.map((tag) => {
                const count = tagCounts[tag.name] || 0;
                return (
                  <div
                    key={tag.name}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        #{tag.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        ({count} bağlantı)
                      </span>
                    </div>

                    <button
                      onClick={() => onDeleteTag(tag.name)}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Etiketi Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}

              {filteredTags.length === 0 && (
                <div className="text-xs text-center py-4 text-slate-400">
                  Etiket bulunamadı.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
