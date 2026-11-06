import React, { useState } from 'react';
import { X, Hash, Trash2, Plus } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="w-full max-w-md bg-[#212121] rounded-2xl shadow-2xl border border-[#3e3e3e] overflow-hidden my-8 text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333333]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#38bdf8]/15 text-[#38bdf8] flex items-center justify-center">
              <Hash className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white">
              Manage Tags
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#333333] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <form onSubmit={handleAdd} className="flex gap-2">
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Tag name..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#171717] border border-[#383838] text-sm text-white focus:outline-none focus:border-[#38bdf8] transition-colors"
            />
            <button
              type="submit"
              disabled={isSubmitting || !newTagName.trim()}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-[#7dd3fc] hover:bg-[#38bdf8] text-[#0f172a] font-bold text-xs shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </form>

          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Existing Tags ({tags.length})
            </div>

            {tags.length > 5 && (
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Filter tags..."
                className="w-full px-3 py-1.5 mb-2 rounded-xl bg-[#171717] text-xs border border-[#383838] text-white focus:outline-none focus:border-[#38bdf8]"
              />
            )}

            <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
              {filteredTags.map((tag) => {
                const count = tagCounts[tag.name] || 0;
                return (
                  <div
                    key={tag.name}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#1a1a1a] border border-[#333333]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">
                        #{tag.name}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        ({count} links)
                      </span>
                    </div>

                    <button
                      onClick={() => onDeleteTag(tag.name)}
                      className="p-1 rounded-md text-neutral-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                      title="Delete Tag"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}

              {filteredTags.length === 0 && (
                <div className="text-xs text-center py-4 text-neutral-500">
                  No tags found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
