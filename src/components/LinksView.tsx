import React from 'react';
import { 
  Search, 
  LayoutGrid, 
  List, 
  ArrowUpDown, 
  Plus, 
  Bookmark, 
  Folder,
  Hash,
  Star,
  Trash2
} from 'lucide-react';
import { CollectionItem, LinkItem, SortOption, ViewMode } from '../types';
import { LinkCard } from './LinkCard';
import { MobileLinkItem } from './MobileLinkItem';

interface LinksViewProps {
  title: string;
  subtitle?: string;
  links: LinkItem[];
  collections: CollectionItem[];
  collectionMap: Map<number, CollectionItem>;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (m: ViewMode) => void;
  sortBy: SortOption;
  onSortByChange: (s: SortOption) => void;
  onOpenNewLink: () => void;
  onOpenDetail: (link: LinkItem) => void;
  onTogglePin: (id: number, current: boolean) => void;
  onToggleRead: (id: number, current: boolean) => void;
  onToggleArchive: (id: number, current: boolean) => void;
  onMoveToTrash: (id: number) => void;
  onRestoreFromTrash?: (id: number) => void;
  onPermanentDelete?: (id: number) => void;
  onEditLink: (link: LinkItem) => void;
  isTrashView?: boolean;
  onEmptyTrash?: () => void;
}

export const LinksView: React.FC<LinksViewProps> = ({
  title,
  subtitle,
  links,
  collections,
  collectionMap,
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortByChange,
  onOpenNewLink,
  onOpenDetail,
  onTogglePin,
  onToggleRead,
  onToggleArchive,
  onMoveToTrash,
  onRestoreFromTrash,
  onPermanentDelete,
  onEditLink,
  isTrashView = false,
  onEmptyTrash
}) => {
  return (
    <div className="space-y-5 pb-24 md:pb-12">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-light text-white tracking-tight">
              {title}
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#262626] border border-[#383838] text-[#a3a3a3] font-mono">
              {links.length}
            </span>
          </div>
          {subtitle && (
            <p className="text-xs text-[#a3a3a3] mt-1">{subtitle}</p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {isTrashView && onEmptyTrash && links.length > 0 && (
            <button
              onClick={onEmptyTrash}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-medium hover:bg-rose-500/20 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Çöpü Boşalt</span>
            </button>
          )}

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as SortOption)}
              className="appearance-none pl-8 pr-7 py-1.5 rounded-xl bg-[#262626] border border-[#383838] text-xs text-[#d4d4d4] hover:border-[#525252] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#38bdf8]"
            >
              <option value="date_desc">En Yeni</option>
              <option value="date_asc">En Eski</option>
              <option value="title_asc">Başlık (A-Z)</option>
              <option value="title_desc">Başlık (Z-A)</option>
              <option value="domain">Alan Adı</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#737373] pointer-events-none" />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#262626] border border-[#383838] p-0.5 rounded-xl">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#333333] text-[#38bdf8] shadow-xs'
                  : 'text-[#737373] hover:text-white'
              }`}
              title="Kart Görünümü"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#333333] text-[#38bdf8] shadow-xs'
                  : 'text-[#737373] hover:text-white'
              }`}
              title="Liste Görünümü"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* New Link Button */}
          {!isTrashView && (
            <button
              onClick={onOpenNewLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7dd3fc] hover:bg-[#38bdf8] text-[#0f172a] font-bold text-xs shadow-sm shadow-sky-500/20 active:scale-98 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">New Link</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737373]">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Bağlantı başlığı, URL veya açıklamasında ara..."
          className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-[#262626] border border-[#383838] focus:border-[#38bdf8] text-white placeholder-[#737373] focus:outline-none transition-colors"
        />
      </div>

      {/* Grid or List of Links */}
      {links.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {links.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                collection={link.collectionId ? collectionMap.get(link.collectionId) : undefined}
                onTogglePin={onTogglePin}
                onToggleRead={onToggleRead}
                onToggleArchive={onToggleArchive}
                onMoveToTrash={onMoveToTrash}
                onRestoreFromTrash={onRestoreFromTrash}
                onPermanentDelete={onPermanentDelete}
                onEdit={onEditLink}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {links.map((link) => (
              <MobileLinkItem
                key={link.id}
                link={link}
                collection={link.collectionId ? collectionMap.get(link.collectionId) : undefined}
                onOpenDetail={onOpenDetail}
              />
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-16 px-4 bg-[#262626]/40 border border-dashed border-[#383838] rounded-2xl">
          <Bookmark className="w-8 h-8 text-[#525252] mx-auto mb-3" />
          <p className="text-sm font-medium text-[#d4d4d4] mb-1">
            {searchQuery ? 'Aramayla eşleşen bağlantı bulunamadı' : 'Burada henüz bir bağlantı yok'}
          </p>
          <p className="text-xs text-[#737373] mb-4">
            Yeni bir yer imi ekleyerek başlayabilirsiniz.
          </p>
          {!searchQuery && !isTrashView && (
            <button
              onClick={onOpenNewLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#7dd3fc] text-[#0f172a] font-bold text-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Bağlantı</span>
            </button>
          )}
        </div>
      )}

    </div>
  );
};
