import React, { useRef, useState } from 'react';
import { 
  Home, 
  Hash, 
  Clock, 
  ChevronRight, 
  SlidersHorizontal,
  Plus
} from 'lucide-react';
import { CollectionItem, LinkItem } from '../types';
import { DashboardItem } from './DashboardItem';
import { LinkCard } from './LinkCard';
import { MobileLinkItem } from './MobileLinkItem';
import { BloggerHeroSlider } from './BloggerHeroSlider';
import { 
  Link21Icon, 
  Folder2Icon, 
  FolderFavoriteIcon 
} from './BloggerIcons';

interface DashboardViewProps {
  links: LinkItem[];
  collections: CollectionItem[];
  tagsCount: number;
  pinnedCount: number;
  collectionMap: Map<number, CollectionItem>;
  onViewAllRecent: () => void;
  onViewCollection: (id: number) => void;
  onNavigateTab?: (tab: 'links' | 'pinned' | 'collections_list' | 'tags_list') => void;
  onSelectTag?: (tag: string) => void;
  onOpenNewLink: () => void;
  onOpenDetail: (link: LinkItem) => void;
  onTogglePin: (id: number, current: boolean) => void;
  onToggleRead: (id: number, current: boolean) => void;
  onToggleArchive: (id: number, current: boolean) => void;
  onMoveToTrash: (id: number) => void;
  onEditLink: (link: LinkItem) => void;
}

// Reusable Category Card Slider Section (.cat-showcase-carousel)
const CategoryShowcaseSection: React.FC<{
  col: CollectionItem;
  links: LinkItem[];
  onViewCollection: (id: number) => void;
  onTogglePin: (id: number, current: boolean) => void;
  onToggleRead: (id: number, current: boolean) => void;
  onToggleArchive: (id: number, current: boolean) => void;
  onMoveToTrash: (id: number) => void;
  onEditLink: (link: LinkItem) => void;
  onOpenDetail: (link: LinkItem) => void;
}> = ({
  col,
  links,
  onViewCollection,
  onTogglePin,
  onToggleRead,
  onToggleArchive,
  onMoveToTrash,
  onEditLink,
  onOpenDetail
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const offset = direction === 'left' ? -280 : 280;
    trackRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
  };

  return (
    <section aria-label={col.name} className="space-y-3 pt-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span 
            className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs" 
            style={{ backgroundColor: col.color || '#38bdf8' }}
          />
          <h2 className="text-sm sm:text-base font-semibold text-white tracking-tight">
            {col.name}
          </h2>
          <span className="text-[11px] text-[#9ca3af] font-mono">
            ({links.length})
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Blogger Stili Çizgi Butonlar (.car-nav) */}
          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className={`h-2 rounded-full transition-all duration-200 ${
                canScrollLeft 
                  ? 'w-7 bg-[#60cdff] shadow-[0_0_8px_rgba(96,205,255,0.6)] cursor-pointer' 
                  : 'w-4 bg-white/20 opacity-40 cursor-default'
              }`}
              title="Önceki Kartlar"
              aria-label="Önceki Kartlar"
            />
            <button
              onClick={() => scroll('right')}
              className={`h-2 rounded-full transition-all duration-200 ${
                canScrollRight 
                  ? 'w-7 bg-[#60cdff] shadow-[0_0_8px_rgba(96,205,255,0.6)] cursor-pointer' 
                  : 'w-4 bg-white/20 opacity-40 cursor-default'
              }`}
              title="Sonraki Kartlar"
              aria-label="Sonraki Kartlar"
            />
          </div>

          <button
            onClick={() => col.id && onViewCollection(col.id)}
            className="flex items-center gap-1 text-xs text-[#a3a3a3] hover:text-[#38bdf8] font-medium transition-colors"
          >
            <span>Tümünü Gör</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Desktop Horizontal Scroll Track with Cards */}
      <div 
        ref={trackRef}
        onScroll={checkScroll}
        className="hidden md:flex gap-4 overflow-x-auto pb-3 pt-1 hide-scrollbar scroll-smooth"
      >
        {links.map((link) => (
          <div key={link.id} className="min-w-[270px] w-[270px] max-w-[290px] shrink-0">
            <LinkCard
              link={link}
              collection={col}
              onTogglePin={onTogglePin}
              onToggleRead={onToggleRead}
              onToggleArchive={onToggleArchive}
              onMoveToTrash={onMoveToTrash}
              onEdit={onEditLink}
              onOpenDetail={onOpenDetail}
            />
          </div>
        ))}
      </div>

      {/* Mobile Vertical List */}
      <div className="md:hidden space-y-2">
        {links.slice(0, 3).map((link) => (
          <MobileLinkItem
            key={link.id}
            link={link}
            collection={col}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>
    </section>
  );
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  links,
  collections,
  tagsCount,
  pinnedCount,
  collectionMap,
  onViewAllRecent,
  onViewCollection,
  onNavigateTab,
  onSelectTag,
  onOpenNewLink,
  onOpenDetail,
  onTogglePin,
  onToggleRead,
  onToggleArchive,
  onMoveToTrash,
  onEditLink
}) => {
  const activeLinks = links.filter(l => !l.isTrash && !l.isArchived);
  const recentLinks = [...activeLinks].sort((a, b) => b.createdAt - a.createdAt).slice(0, 10);

  // Group links by collection
  const linksByCollection: Record<number, LinkItem[]> = {};
  activeLinks.forEach(l => {
    if (l.collectionId) {
      if (!linksByCollection[l.collectionId]) linksByCollection[l.collectionId] = [];
      linksByCollection[l.collectionId].push(l);
    }
  });

  // Recent links horizontal scroll ref
  const recentTrackRef = useRef<HTMLDivElement>(null);
  const [recentCanScrollLeft, setRecentCanScrollLeft] = useState(false);
  const [recentCanScrollRight, setRecentCanScrollRight] = useState(true);

  const checkRecentScroll = () => {
    if (!recentTrackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = recentTrackRef.current;
    setRecentCanScrollLeft(scrollLeft > 4);
    setRecentCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  const scrollRecent = (direction: 'left' | 'right') => {
    if (!recentTrackRef.current) return;
    const offset = direction === 'left' ? -280 : 280;
    recentTrackRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(checkRecentScroll, 300);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      
      {/* 1. Blogger Plus UI Hero Showcase Carousel (.sldW) */}
      <section aria-label="Hero Carousel" className="w-full">
        <BloggerHeroSlider
          collections={collections}
          onSelectCollection={onViewCollection}
          onFilterTag={onSelectTag}
        />
      </section>

      {/* 2. 4 Stat Cards: Links (352), Collections (14), Tags (26), Pinned (38) */}
      <section aria-label="Statistics Cards">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <DashboardItem
            name="Links"
            value={activeLinks.length}
            icon={Link21Icon}
            color="#38bdf8"
            subtitle="Tüm Bağlantılar"
            onClick={() => onNavigateTab ? onNavigateTab('links') : onViewAllRecent()}
          />
          <DashboardItem
            name="Collections"
            value={collections.length}
            icon={Folder2Icon}
            color="#fbbf24"
            subtitle="Kategoriler"
            onClick={() => onNavigateTab ? onNavigateTab('collections_list') : undefined}
          />
          <DashboardItem
            name="Tags"
            value={tagsCount}
            icon={Hash}
            color="#34d399"
            subtitle="Etiketler"
            onClick={() => onNavigateTab ? onNavigateTab('tags_list') : undefined}
          />
          <DashboardItem
            name="Pinned"
            value={pinnedCount}
            icon={FolderFavoriteIcon}
            color="#f472b6"
            subtitle="Sabitlenenler"
            onClick={() => onNavigateTab ? onNavigateTab('pinned') : undefined}
          />
        </div>
      </section>

      {/* 3. Section: Recent Links with Blogger .car-nav Slider */}
      <section aria-label="Recent Links" className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#38bdf8]" />
            <h2 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Son Eklenen Bağlantılar
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Blogger Çizgi Butonlar */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={() => scrollRecent('left')}
                className={`h-2 rounded-full transition-all duration-200 ${
                  recentCanScrollLeft 
                    ? 'w-7 bg-[#60cdff] shadow-[0_0_8px_rgba(96,205,255,0.6)] cursor-pointer' 
                    : 'w-4 bg-white/20 opacity-40 cursor-default'
                }`}
                title="Önceki Bağlantılar"
                aria-label="Önceki Bağlantılar"
              />
              <button
                onClick={() => scrollRecent('right')}
                className={`h-2 rounded-full transition-all duration-200 ${
                  recentCanScrollRight 
                    ? 'w-7 bg-[#60cdff] shadow-[0_0_8px_rgba(96,205,255,0.6)] cursor-pointer' 
                    : 'w-4 bg-white/20 opacity-40 cursor-default'
                }`}
                title="Sonraki Bağlantılar"
                aria-label="Sonraki Bağlantılar"
              />
            </div>

            <button
              onClick={onViewAllRecent}
              className="flex items-center gap-1 text-xs text-[#a3a3a3] hover:text-[#38bdf8] font-medium transition-colors"
            >
              <span>Tümünü Gör</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Desktop View: Horizontal Card Scroll / Row with Blogger Cards */}
        <div 
          ref={recentTrackRef}
          onScroll={checkRecentScroll}
          className="hidden md:flex gap-4 overflow-x-auto pb-3 pt-1 hide-scrollbar scroll-smooth"
        >
          {recentLinks.map((link) => (
            <div key={link.id} className="min-w-[270px] w-[270px] max-w-[290px] shrink-0">
              <LinkCard
                link={link}
                collection={link.collectionId ? collectionMap.get(link.collectionId) : undefined}
                onTogglePin={onTogglePin}
                onToggleRead={onToggleRead}
                onToggleArchive={onToggleArchive}
                onMoveToTrash={onMoveToTrash}
                onEdit={onEditLink}
                onOpenDetail={onOpenDetail}
              />
            </div>
          ))}
          {recentLinks.length === 0 && (
            <div className="w-full text-center py-8 text-xs text-[#737373] border border-dashed border-[#383838] rounded-xl">
              Henüz kayıtlı bağlantı bulunamadı.
            </div>
          )}
        </div>

        {/* Mobile View: Vertical List with square thumbnail on right */}
        <div className="md:hidden space-y-2">
          {recentLinks.slice(0, 4).map((link) => (
            <MobileLinkItem
              key={link.id}
              link={link}
              collection={link.collectionId ? collectionMap.get(link.collectionId) : undefined}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      </section>

      {/* 4. Sections by Collection (Categorized Showcase Slider) */}
      {collections.map((col) => {
        const colLinks = (col.id && linksByCollection[col.id]) || [];
        if (colLinks.length === 0) return null;

        return (
          <CategoryShowcaseSection
            key={col.id}
            col={col}
            links={colLinks}
            onViewCollection={onViewCollection}
            onTogglePin={onTogglePin}
            onToggleRead={onToggleRead}
            onToggleArchive={onToggleArchive}
            onMoveToTrash={onMoveToTrash}
            onEditLink={onEditLink}
            onOpenDetail={onOpenDetail}
          />
        );
      })}

    </div>
  );
};
