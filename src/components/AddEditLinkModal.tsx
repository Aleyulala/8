import React, { useState, useEffect } from 'react';
import { X, Plus, Star, CheckCircle2, Archive, Link as LinkIcon, Folder, Tag, FileText } from 'lucide-react';
import { CollectionItem, LinkItem, TagItem } from '../types';
import { getDomain } from '../utils/favicon';

interface AddEditLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (linkData: Partial<LinkItem>) => Promise<void>;
  editingLink?: LinkItem | null;
  collections: CollectionItem[];
  allTags: TagItem[];
  defaultCollectionId?: number | null;
}

export const AddEditLinkModal: React.FC<AddEditLinkModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingLink,
  collections,
  allTags,
  defaultCollectionId
}) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [collectionId, setCollectionId] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [notes, setNotes] = useState('');
  const [isPinned, setIsPinned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingLink) {
      setUrl(editingLink.url);
      setTitle(editingLink.title);
      setDescription(editingLink.description || '');
      setCollectionId(editingLink.collectionId);
      setTags(editingLink.tags || []);
      setNotes(editingLink.notes || '');
      setIsPinned(editingLink.isPinned || false);
    } else {
      setUrl('');
      setTitle('');
      setDescription('');
      setCollectionId(defaultCollectionId ?? (collections[0]?.id || null));
      setTags([]);
      setNotes('');
      setIsPinned(false);
    }
  }, [editingLink, isOpen, defaultCollectionId, collections]);

  if (!isOpen) return null;

  const handleUrlBlur = () => {
    if (url && !title) {
      const domain = getDomain(url);
      setTitle(domain.charAt(0).toUpperCase() + domain.slice(1));
    }
  };

  const handleAddTag = (tagToAdd: string) => {
    const clean = tagToAdd.trim().toLowerCase().replace(/^#/, '');
    if (clean && !tags.includes(clean)) {
      setTags([...tags, clean]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    try {
      setIsSubmitting(true);
      await onSave({
        url: formattedUrl,
        title: title.trim() || formattedUrl,
        description: description.trim(),
        collectionId: collectionId ? Number(collectionId) : null,
        tags,
        notes: notes.trim(),
        isPinned,
        isRead: false,
        isArchived: false
      });
      onClose();
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
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333333]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#38bdf8]/15 text-[#38bdf8] flex items-center justify-center">
              <LinkIcon className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white">
              {editingLink ? 'Edit Link' : 'New Link'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#333333] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              URL *
            </label>
            <input
              type="text"
              required
              autoFocus
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={handleUrlBlur}
              placeholder="https://example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#171717] border border-[#383838] text-sm text-white focus:outline-none focus:border-[#38bdf8] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Webpage title"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#171717] border border-[#383838] text-sm text-white focus:outline-none focus:border-[#38bdf8] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary..."
              className="w-full px-3.5 py-2 rounded-xl bg-[#171717] border border-[#383838] text-sm text-white focus:outline-none focus:border-[#38bdf8] transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Collection
            </label>
            <select
              value={collectionId || ''}
              onChange={(e) => setCollectionId(e.target.value ? Number(e.target.value) : null)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#171717] border border-[#383838] text-sm text-white focus:outline-none focus:border-[#38bdf8] transition-colors cursor-pointer"
            >
              <option value="">No Collection</option>
              {collections.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Tags
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#38bdf8]/15 text-[#7dd3fc] text-xs font-medium border border-[#38bdf8]/20"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    handleAddTag(tagInput);
                  }
                }}
                placeholder="Type tag and press Enter..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-[#171717] border border-[#383838] text-xs text-white focus:outline-none focus:border-[#38bdf8] transition-colors"
              />
              <button
                type="button"
                onClick={() => handleAddTag(tagInput)}
                className="px-3 py-2 rounded-xl bg-[#333333] hover:bg-[#404040] text-xs font-medium text-white transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
              Notes (Markdown)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Personal markdown notes..."
              className="w-full px-3.5 py-2 rounded-xl bg-[#171717] border border-[#383838] text-xs text-white focus:outline-none focus:border-[#38bdf8] transition-colors font-mono resize-none"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-300">
              <input
                type="checkbox"
                checked={isPinned}
                onChange={(e) => setIsPinned(e.target.checked)}
                className="w-4 h-4 rounded text-[#38bdf8] focus:ring-[#38bdf8] bg-[#171717] border-[#383838]"
              />
              <span className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                Pin to Dashboard
              </span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#333333]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-[#333333] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-[#7dd3fc] hover:bg-[#38bdf8] text-[#0f172a] shadow-sm disabled:opacity-50 transition-all"
            >
              {editingLink ? 'Save Changes' : 'Create Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
