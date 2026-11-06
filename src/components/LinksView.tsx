import React, { useState, useEffect } from 'react';
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
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
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

function getPageNumbers(currentPage: number, totalPages: number): (number | string)[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Reset to page 1 whenever search, sort, or view changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, title, links.length]);

  const totalPages = Math.ceil(links.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLinks = links.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    const container = document.getElementById('mainScrollContainer') || window;
    container.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-5 pb-24 md:pb-12">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-light text-white tracking-tight">
              {title}
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-[#252526] border border-transparent text-[#a3a3a3] font-mono">
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-transparent text-xs font-medium hover:bg-rose-500/20 transition-colors cursor-pointer"
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
              className="appearance-none pl-8 pr-7 py-1.5 rounded-lg bg-[#252526] border border-transparent text-xs text-[#d4d4d4] hover:bg-[#2d2d30] cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#38bdf8]"
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
          <div className="flex items-center bg-[#252526] border border-transparent p-0.5 rounded-lg">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
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
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7dd3fc] hover:bg-[#38bdf8] text-[#0f172a] font-bold text-xs shadow-sm shadow-sky-500/20 active:scale-98 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Yeni Bağlantı</span>
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
          className="w-full pl-10 pr-4 py-2 text-xs rounded-lg bg-[#252526] border border-transparent focus:border-[#38bdf8]/50 text-white placeholder-[#737373] focus:outline-none transition-colors"
        />
      </div>

      {/* Grid or List of Paginated Links */}
      {paginatedLinks.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedLinks.map((link) => (
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
            {paginatedLinks.map((link) => (
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
        <div className="text-center py-16 px-4 bg-[#252526]/40 border border-dashed border-[#333333] rounded-2xl">
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
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#7dd3fc] text-[#0f172a] font-bold text-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Bağlantı</span>
            </button>
          )}
        </div>
      )}

      {/* Blogger XML 1:1 Sayfalama Butonları (#blog-pager / .blogN: 1 2 3 4 5...) */}
      {totalPages > 1 && (
        <div className="pt-4 space-y-2">
          <nav 
            id="blog-pager" 
            aria-label="Sayfalama" 
            className="blogN flex flex-wrap items-center justify-center gap-2 select-none"
          >
            {/* İlk Sayfa */}
            <button
              type="button"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`min-w-9 h-9 px-2 rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${
                currentPage === 1
                  ? 'opacity-30 bg-[#252526] text-[#71717a] cursor-not-allowed'
                  : 'bg-[#252526] hover:bg-[#333333] text-[#d4d4d4] hover:text-white cursor-pointer active:scale-95'
              }`}
              title="İlk Sayfa"
              aria-label="İlk Sayfa"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            {/* Önceki Sayfa (.nwLnk) */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`nwLnk min-w-9 h-9 px-3 rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold transition-all ${
                currentPage === 1
                  ? 'opacity-30 bg-[#252526] text-[#71717a] cursor-not-allowed'
                  : 'bg-[#252526] hover:bg-[#333333] text-[#d4d4d4] hover:text-white cursor-pointer active:scale-95'
              }`}
              title="Önceki Sayfa"
              aria-label="Önceki Sayfa"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Önceki</span>
            </button>

            {/* Sayfa Numaraları: 1 2 3 4 5... */}
            <div className="flex items-center gap-1.5">
              {getPageNumbers(currentPage, totalPages).map((p, idx) => {
                if (p === '...') {
                  return (
                    <span 
                      key={`ellipsis-${idx}`} 
                      className="min-w-8 h-9 flex items-center justify-center text-[#71717a] font-mono text-xs select-none"
                    >
                      …
                    </span>
                  );
                }

                const pageNum = p as number;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`min-w-9 h-9 px-3 rounded-lg flex items-center justify-center text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                      isActive
                        ? 'bg-[#60cdff] text-[#0f172a] shadow-md shadow-sky-500/25 scale-105'
                        : 'bg-[#252526] hover:bg-[#333333] text-[#d4d4d4] hover:text-white'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                    title={`Sayfa ${pageNum}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Sonraki Sayfa (.olLnk) */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`olLnk min-w-9 h-9 px-3 rounded-lg flex items-center justify-center gap-1.5 text-xs font-semibold transition-all ${
                currentPage === totalPages
                  ? 'opacity-30 bg-[#252526] text-[#71717a] cursor-not-allowed'
                  : 'bg-[#252526] hover:bg-[#333333] text-[#d4d4d4] hover:text-white cursor-pointer active:scale-95'
              }`}
              title="Sonraki Sayfa"
              aria-label="Sonraki Sayfa"
            >
              <span className="hidden sm:inline">Sonraki</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Son Sayfa */}
            <button
              type="button"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`min-w-9 h-9 px-2 rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${
                currentPage === totalPages
                  ? 'opacity-30 bg-[#252526] text-[#71717a] cursor-not-allowed'
                  : 'bg-[#252526] hover:bg-[#333333] text-[#d4d4d4] hover:text-white cursor-pointer active:scale-95'
              }`}
              title="Son Sayfa"
              aria-label="Son Sayfa"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </nav>

          {/* Sayfa Altı Bilgi Metni */}
          <div className="text-center text-[11px] text-[#71717a] font-mono">
            Sayfa {currentPage} / {totalPages} • Toplam {links.length} bağlantı (Sayfa başına {itemsPerPage})
          </div>
        </div>
      )}

    </div>
  );
};
