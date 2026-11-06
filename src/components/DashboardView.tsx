import React from 'react';
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
  const recentLinks = [...activeLinks].sort((a, b) => b.createdAt - a.createdAt).slice(0, 8);

  // Group links by collection
  const linksByCollection: Record<number, LinkItem[]> = {};
  activeLinks.forEach(l => {
    if (l.collectionId) {
      if (!linksByCollection[l.collectionId]) linksByCollection[l.collectionId] = [];
      linksByCollection[l.collectionId].push(l);
    }
  });

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

      {/* 3. Section: Recent Links */}
      <section aria-label="Recent Links" className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#38bdf8]" />
            <h2 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Recent Links
            </h2>
          </div>
          <button
            onClick={onViewAllRecent}
            className="flex items-center gap-1 text-xs text-[#a3a3a3] hover:text-[#38bdf8] font-medium transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Desktop View: Horizontal Card Scroll / Row */}
        <div className="hidden md:flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {recentLinks.map((link) => (
            <div key={link.id} className="min-w-[260px] w-[260px] max-w-[280px] shrink-0">
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
              No recent links found.
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

      {/* 4. Sections by Collection */}
      {collections.map((col) => {
        const colLinks = (col.id && linksByCollection[col.id]) || [];
        if (colLinks.length === 0) return null;

        return (
          <section key={col.id} aria-label={col.name} className="space-y-3 pt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0" 
                  style={{ backgroundColor: col.color || '#38bdf8' }}
                />
                <h2 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                  {col.name}
                </h2>
              </div>
              <button
                onClick={() => col.id && onViewCollection(col.id)}
                className="flex items-center gap-1 text-xs text-[#a3a3a3] hover:text-[#38bdf8] font-medium transition-colors"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Desktop Horizontal Scroll */}
            <div className="hidden md:flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
              {colLinks.map((link) => (
                <div key={link.id} className="min-w-[260px] w-[260px] max-w-[280px] shrink-0">
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
              {colLinks.slice(0, 3).map((link) => (
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
      })}

    </div>
  );
};
