import React from 'react';
import { 
  Bookmark, 
  Star, 
  Clock, 
  CheckCircle2, 
  Archive, 
  Trash2, 
  FolderPlus, 
  Folder, 
  Tag as TagIcon, 
  HardDrive, 
  ShieldCheck, 
  Layers,
  Plus
} from 'lucide-react';
import { CollectionItem, TagItem, ViewFilter } from '../types';

interface SidebarProps {
  currentFilter: ViewFilter;
  onFilterChange: (filter: ViewFilter) => void;
  collections: CollectionItem[];
  tags: TagItem[];
  counts: {
    all: number;
    pinned: number;
    unread: number;
    read: number;
    archived: number;
    trash: number;
    collections: Record<number, number>;
    tags: Record<string, number>;
  };
  storageInfo: {
    formattedUsed: string;
    formattedQuota: string;
    percentage: number;
  };
  onOpenManageCollections: () => void;
  onOpenManageTags: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentFilter,
  onFilterChange,
  collections,
  tags,
  counts,
  storageInfo,
  onOpenManageCollections,
  onOpenManageTags,
  isOpenMobile,
  onCloseMobile
}) => {
  const isSelected = (filter: ViewFilter) => {
    if (filter.type === currentFilter.type) {
      if (filter.type === 'collection' && currentFilter.type === 'collection') {
        return filter.id === currentFilter.id;
      }
      if (filter.type === 'tag' && currentFilter.type === 'tag') {
        return filter.tag === currentFilter.tag;
      }
      return true;
    }
    return false;
  };

  const navItems = [
    { label: 'Tüm Bağlantılar', icon: Bookmark, filter: { type: 'all' as const }, count: counts.all },
    { label: 'Sabitlenenler', icon: Star, filter: { type: 'pinned' as const }, count: counts.pinned },
    { label: 'Okuma Listesi', icon: Clock, filter: { type: 'unread' as const }, count: counts.unread },
    { label: 'Okunanlar', icon: CheckCircle2, filter: { type: 'read' as const }, count: counts.read },
    { label: 'Arşiv', icon: Archive, filter: { type: 'archived' as const }, count: counts.archived },
    { label: 'Çöp Kutusu', icon: Trash2, filter: { type: 'trash' as const }, count: counts.trash },
  ];

  return (
    <>
      {/* Mobil Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Konteyneri */}
      <aside
        className={`fixed md:sticky top-16 left-0 z-40 md:z-20 w-64 h-[calc(100vh-4rem)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between overflow-y-auto transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6">

          {/* Ana Filtreler */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 mb-2">
              Görünümler
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isSelected(item.filter);
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      onFilterChange(item.filter);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      active
                        ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Koleksiyonlar */}
          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Koleksiyonlar
              </span>
              <button
                onClick={onOpenManageCollections}
                className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
                title="Koleksiyonları Yönet"
              >
                <FolderPlus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {collections.map((col) => {
                const active = isSelected({ type: 'collection', id: col.id! });
                const count = counts.collections[col.id!] || 0;
                return (
                  <button
                    key={col.id}
                    onClick={() => {
                      onFilterChange({ type: 'collection', id: col.id! });
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0" 
                        style={{ backgroundColor: col.color || '#3b82f6' }}
                      />
                      <span className="truncate">{col.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                      active
                        ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 font-semibold'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
              {collections.length === 0 && (
                <div className="px-3 py-2 text-xs text-slate-400">
                  Henüz koleksiyon yok.
                </div>
              )}
            </div>
          </div>

          {/* Etiketler */}
          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Etiketler
              </span>
              <button
                onClick={onOpenManageTags}
                className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
                title="Etiketleri Yönet"
              >
                <TagIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 px-2">
              {tags.map((tag) => {
                const active = isSelected({ type: 'tag', tag: tag.name });
                const count = counts.tags[tag.name] || 0;
                return (
                  <button
                    key={tag.name}
                    onClick={() => {
                      if (active) {
                        onFilterChange({ type: 'all' });
                      } else {
                        onFilterChange({ type: 'tag', tag: tag.name });
                      }
                      onCloseMobile();
                    }}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      active
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>#{tag.name}</span>
                    <span className="opacity-70 text-[10px]">({count})</span>
                  </button>
                );
              })}
              {tags.length === 0 && (
                <div className="px-1 py-1 text-xs text-slate-400">
                  Henüz etiket yok.
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Alt Bilgi Kartı: Depolama ve Yerel Durum */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          {/* Yerel Gizlilik Rozeti */}
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 px-2.5 py-1.5 rounded-xl">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Girişsiz & Tamamen Yerel (IndexedDB)</span>
          </div>

          {/* Depolama Durumu */}
          <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5" />
                <span>Tarayıcı Hafızası</span>
              </span>
              <span className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                {storageInfo.formattedUsed}
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${Math.max(2, Math.min(100, storageInfo.percentage))}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 text-right">
              Maksimum Kota: {storageInfo.formattedQuota}
            </div>
          </div>
        </div>

      </aside>
    </>
  );
};
