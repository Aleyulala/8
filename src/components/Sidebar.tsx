import React from 'react';
import { 
  Home, 
  Link as LinkIcon, 
  Pin, 
  Folder, 
  Hash, 
  Plus, 
  Search, 
  Settings as SettingsIcon,
  Tag as TagIcon,
  FolderPlus,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  HardDrive
} from 'lucide-react';
import { CollectionItem, TagItem, ViewFilter } from '../types';

interface SidebarProps {
  currentTab: 'dashboard' | 'links' | 'pinned' | 'collection' | 'tag';
  activeCollectionId?: number | null;
  activeTag?: string | null;
  onSelectTab: (tab: 'dashboard' | 'links' | 'pinned') => void;
  onSelectCollection: (id: number) => void;
  onSelectTag: (tag: string) => void;
  collections: CollectionItem[];
  tags: TagItem[];
  counts: {
    all: number;
    pinned: number;
    collections: Record<number, number>;
    tags: Record<string, number>;
  };
  onOpenNewLink: () => void;
  onOpenManageCollections: () => void;
  onOpenManageTags: () => void;
  onOpenSettings: () => void;
  onOpenSearch: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  activeCollectionId,
  activeTag,
  onSelectTab,
  onSelectCollection,
  onSelectTag,
  collections,
  tags,
  counts,
  onOpenNewLink,
  onOpenManageCollections,
  onOpenManageTags,
  onOpenSettings,
  onOpenSearch
}) => {
  return (
    <aside className="w-72 bg-[#1b1b1b] border-r border-[#2e2e2e] flex flex-col justify-between h-screen shrink-0 text-sm select-none">
      
      {/* Top Section */}
      <div className="p-3 space-y-3 overflow-y-auto flex-1">
        
        {/* Search for Links Button / Input */}
        <div 
          onClick={onOpenSearch}
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#262626] border border-[#383838] text-[#8e8e8e] hover:text-[#d4d4d4] hover:border-[#4d4d4d] cursor-pointer transition-colors"
        >
          <Search className="w-4 h-4 text-[#737373]" />
          <span className="text-xs">Search for Links...</span>
        </div>

        {/* Action Row: + New Link Button + Quick Action Icons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenNewLink}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#7dd3fc] hover:bg-[#38bdf8] text-[#0f172a] font-bold text-xs shadow-md shadow-sky-500/10 active:scale-98 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Link</span>
          </button>

          <button
            onClick={onOpenManageCollections}
            className="p-2 rounded-xl bg-[#262626] hover:bg-[#333333] border border-[#383838] text-[#a3a3a3] hover:text-white transition-colors"
            title="Koleksiyon Yönetimi"
          >
            <FolderPlus className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenManageTags}
            className="p-2 rounded-xl bg-[#262626] hover:bg-[#333333] border border-[#383838] text-[#a3a3a3] hover:text-white transition-colors"
            title="Etiket Yönetimi"
          >
            <TagIcon className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-[#262626] hover:bg-[#333333] border border-[#383838] text-[#a3a3a3] hover:text-white transition-colors"
            title="Ayarlar & Lisans"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Navigation Items */}
        <nav className="space-y-0.5 pt-1">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              currentTab === 'dashboard'
                ? 'bg-[#262626] text-[#38bdf8] border border-[#383838]'
                : 'text-[#d4d4d4] hover:bg-[#262626]/60 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4 text-[#38bdf8]" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onSelectTab('links')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              currentTab === 'links'
                ? 'bg-[#262626] text-[#38bdf8] border border-[#383838]'
                : 'text-[#d4d4d4] hover:bg-[#262626]/60 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LinkIcon className="w-4 h-4 text-neutral-400" />
              <span>Links</span>
            </div>
            <span className="text-[11px] text-[#737373] font-mono">{counts.all}</span>
          </button>

          <button
            onClick={() => onSelectTab('pinned')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              currentTab === 'pinned'
                ? 'bg-[#262626] text-[#38bdf8] border border-[#383838]'
                : 'text-[#d4d4d4] hover:bg-[#262626]/60 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Pin className="w-4 h-4 text-amber-400" />
              <span>Pinned</span>
            </div>
            <span className="text-[11px] text-[#737373] font-mono">{counts.pinned}</span>
          </button>
        </nav>

        {/* Collections Section */}
        <div className="pt-2">
          <div className="flex items-center justify-between px-3 py-1 text-xs font-semibold text-[#8e8e8e]">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-[#38bdf8]" />
              <span>Collections</span>
            </div>
            <span className="text-[11px] text-[#737373]">{collections.length}</span>
          </div>

          <div className="space-y-0.5 mt-1 max-h-56 overflow-y-auto pr-1">
            {collections.map((col) => {
              const active = currentTab === 'collection' && activeCollectionId === col.id;
              const count = (col.id && counts.collections[col.id]) || 0;
              return (
                <button
                  key={col.id}
                  onClick={() => col.id && onSelectCollection(col.id)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors ${
                    active
                      ? 'bg-[#262626] text-white border border-[#383838]'
                      : 'text-[#a3a3a3] hover:bg-[#262626]/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: col.color || '#38bdf8' }}
                    />
                    <span className="truncate">{col.name}</span>
                  </div>
                  <span className="text-[11px] text-[#737373] font-mono shrink-0 ml-2">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tags Section */}
        <div className="pt-2">
          <div className="flex items-center justify-between px-3 py-1 text-xs font-semibold text-[#8e8e8e]">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-[#38bdf8]" />
              <span>Tags</span>
            </div>
            <span className="text-[11px] text-[#737373]">{tags.length}</span>
          </div>

          <div className="space-y-0.5 mt-1 max-h-48 overflow-y-auto pr-1">
            {tags.map((tag) => {
              const active = currentTab === 'tag' && activeTag === tag.name;
              const count = counts.tags[tag.name] || 0;
              return (
                <button
                  key={tag.name}
                  onClick={() => onSelectTag(tag.name)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-colors ${
                    active
                      ? 'bg-[#262626] text-white border border-[#383838]'
                      : 'text-[#a3a3a3] hover:bg-[#262626]/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[#737373]">#</span>
                    <span className="truncate">{tag.name}</span>
                  </div>
                  <span className="text-[11px] text-[#737373] font-mono shrink-0 ml-2">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom Profile / Local Storage Bar */}
      <div className="p-3 border-t border-[#2e2e2e] bg-[#161616]">
        <div 
          onClick={onOpenSettings}
          className="flex items-center justify-between p-2 rounded-xl hover:bg-[#262626] cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Avatar Circle with Letter J or S */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-sm shrink-0">
              S
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">Saved (Local)</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> IndexedDB
              </div>
            </div>
          </div>
          <SettingsIcon className="w-4 h-4 text-[#737373] hover:text-white" />
        </div>
      </div>

    </aside>
  );
};
