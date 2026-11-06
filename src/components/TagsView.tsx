import React from 'react';
import { Hash, Plus, Tag as TagIcon } from 'lucide-react';
import { TagItem } from '../types';

interface TagsViewProps {
  tags: TagItem[];
  counts: Record<string, number>;
  onSelectTag: (tag: string) => void;
  onOpenManageTags: () => void;
}

export const TagsView: React.FC<TagsViewProps> = ({
  tags,
  counts,
  onSelectTag,
  onOpenManageTags
}) => {
  return (
    <div className="space-y-4 pb-24 md:pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Hash className="w-5 h-5 text-[#38bdf8]" />
          <h1 className="text-xl font-light text-white tracking-tight">Tags</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#252526] text-[#a3a3a3] font-mono">
            {tags.length}
          </span>
        </div>

        <button
          onClick={onOpenManageTags}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7dd3fc] hover:bg-[#38bdf8] text-[#0f172a] font-bold text-xs shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>New Tag</span>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {tags.map((tag) => {
          const count = counts[tag.name] || 0;
          return (
            <button
              key={tag.name}
              onClick={() => onSelectTag(tag.name)}
              className="p-3.5 rounded-lg bg-[#252526] hover:bg-[#28282b] border border-transparent cursor-pointer transition-all flex items-center justify-between text-left group shadow-sm"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-neutral-500 font-mono">#</span>
                <span className="text-xs font-semibold text-neutral-200 group-hover:text-[#38bdf8] truncate transition-colors">
                  {tag.name}
                </span>
              </div>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-md bg-[#1f1f1f] text-[#a3a3a3] shrink-0 ml-2">
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
