import React, { useState } from 'react';
import { X, Plus, Trash2, Edit2, Folder, Check } from 'lucide-react';
import { CollectionItem } from '../types';

interface ManageCollectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  collections: CollectionItem[];
  onAddCollection: (data: { name: string; description?: string; color: string }) => Promise<void>;
  onUpdateCollection: (id: number, data: { name: string; description?: string; color: string }) => Promise<void>;
  onDeleteCollection: (id: number) => Promise<void>;
}

const PRESET_COLORS = [
  '#38bdf8', // Sky
  '#fbbf24', // Amber
  '#4ade80', // Green
  '#a78bfa', // Purple
  '#f472b6', // Pink
  '#f87171', // Red
  '#2dd4bf', // Teal
  '#fb923c'  // Orange
];

export const ManageCollectionsModal: React.FC<ManageCollectionsModalProps> = ({
  isOpen,
  onClose,
  collections,
  onAddCollection,
  onUpdateCollection,
  onDeleteCollection
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleStartEdit = (col: CollectionItem) => {
    setEditingId(col.id!);
    setName(col.name);
    setDescription(col.description || '');
    setColor(col.color || PRESET_COLORS[0]);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setColor(PRESET_COLORS[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setIsSubmitting(true);
      if (editingId) {
        await onUpdateCollection(editingId, {
          name: name.trim(),
          description: description.trim(),
          color
        });
      } else {
        await onAddCollection({
          name: name.trim(),
          description: description.trim(),
          color
        });
      }
      handleCancelEdit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="w-full max-w-lg bg-[#212121] rounded-2xl shadow-2xl border border-[#3e3e3e] overflow-hidden my-8 text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333333]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#38bdf8]/15 text-[#38bdf8] flex items-center justify-center">
              <Folder className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white">
              Manage Collections
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#333333] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <form onSubmit={handleSubmit} className="p-4 rounded-xl bg-[#171717] border border-[#383838] space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {editingId ? 'Edit Collection' : 'Create New Collection'}
            </div>

            <div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Collection name (e.g. Research, Tech, Recipes)"
                className="w-full px-3 py-2 rounded-xl bg-[#212121] border border-[#383838] text-sm text-white focus:outline-none focus:border-[#38bdf8] transition-colors"
              />
            </div>

            <div>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
                className="w-full px-3 py-2 rounded-xl bg-[#212121] border border-[#383838] text-xs text-white focus:outline-none focus:border-[#38bdf8] transition-colors"
              />
            </div>

            <div>
              <div className="text-xs font-medium text-neutral-400 mb-1.5">Color</div>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className="w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
                    style={{ backgroundColor: c }}
                  >
                    {color === c && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-400 hover:bg-[#262626]"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#7dd3fc] hover:bg-[#38bdf8] text-[#0f172a] shadow-xs"
              >
                {editingId ? 'Update' : 'Create Collection'}
              </button>
            </div>
          </form>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Existing Collections ({collections.length})
            </div>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {collections.map((col) => (
                <div
                  key={col.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#1a1a1a] border border-[#333333]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: col.color || '#38bdf8' }}
                    />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">
                        {col.name}
                      </div>
                      {col.description && (
                        <div className="text-xs text-[#8e8e8e] truncate">
                          {col.description}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleStartEdit(col)}
                      className="p-1.5 rounded-lg text-[#8e8e8e] hover:text-white hover:bg-[#282828] transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => col.id && onDeleteCollection(col.id)}
                      className="p-1.5 rounded-lg text-[#8e8e8e] hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
