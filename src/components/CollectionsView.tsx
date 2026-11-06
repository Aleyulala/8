import React from 'react';
import { Folder, Plus, ChevronRight, FolderPlus } from 'lucide-react';
import { CollectionItem } from '../types';

interface CollectionsViewProps {
  collections: CollectionItem[];
  counts: Record<number, number>;
  onSelectCollection: (id: number) => void;
  onOpenManageCollections: () => void;
}

export const CollectionsView: React.FC<CollectionsViewProps> = ({
  collections,
  counts,
  onSelectCollection,
  onOpenManageCollections
}) => {
  return (
    <div className="space-y-4 pb-24 md:pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Folder className="w-5 h-5 text-[#38bdf8]" />
          <h1 className="text-xl font-light text-white tracking-tight">Collections</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#262626] border border-[#383838] text-[#a3a3a3] font-mono">
            {collections.length}
          </span>
        </div>

        <button
          onClick={onOpenManageCollections}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7dd3fc] hover:bg-[#38bdf8] text-[#0f172a] font-bold text-xs shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>New Collection</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {collections.map((col) => {
          const count = (col.id && counts[col.id]) || 0;
          return (
            <div
              key={col.id}
              onClick={() => col.id && onSelectCollection(col.id)}
              className="p-4 rounded-xl bg-[#262626] border border-[#383838] hover:border-[#555555] cursor-pointer transition-all flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-inner"
                  style={{ backgroundColor: `${col.color || '#38bdf8'}22` }}
                >
                  <Folder className="w-5 h-5" style={{ color: col.color || '#38bdf8' }} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate group-hover:text-[#38bdf8] transition-colors">
                    {col.name}
                  </h3>
                  {col.description && (
                    <p className="text-xs text-[#8e8e8e] truncate mt-0.5">
                      {col.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-3">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-lg bg-[#1f1f1f] text-[#a3a3a3] border border-white/5">
                  {count}
                </span>
                <ChevronRight className="w-4 h-4 text-[#737373] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
