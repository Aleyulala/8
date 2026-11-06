import React from 'react';
import { 
  Home, 
  Link as LinkIcon, 
  Folder, 
  Hash, 
  Pin, 
  Clock, 
  ChevronRight, 
  LayoutGrid, 
  SlidersHorizontal,
  Plus
} from 'lucide-react';
import { CollectionItem, LinkItem } from '../types';
import { DashboardItem } from './DashboardItem';
import { LinkCard } from './LinkCard';
import { MobileLinkItem } from './MobileLinkItem';

interface DashboardViewProps {
  links: LinkItem[];
  collections: CollectionItem[];
  tagsCount: number;
  pinnedCount: number;
  collectionMap: Map<number, CollectionItem>;
  onViewAllRecent: () => void;
  onViewCollection: (id: number) => void;
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
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Home className="w-6 h-6 text-[#38bdf8]" />
          <h1 className="text-xl sm:text-2xl font-light tracking-tight text-white">
            Dashboard
          </h1>
        </div>

        {/* Right Action Icons (Edit Layout & Mobile + button) */}
        <div className="flex items-center gap-2">
          {/* Mobile + Add Button */}
          <button
            onClick={onOpenNewLink}
            className="md:hidden w-8 h-8 rounded-full bg-[#7dd3fc] text-[#0f172a] flex items-center justify-center font-bold shadow-md shadow-sky-500/20 active:scale-95 transition-all"
            title="Yeni Bağlantı Ekle"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Desktop Edit Layout button */}
          <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#404040] bg-[#262626] hover:bg-[#333333] text-xs font-medium text-[#a3a3a3] hover:text-white transition-colors">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Edit Layout</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      {/* Desktop: 4 in a row. Mobile: 2x2 grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <DashboardItem
          name="Links"
          value={activeLinks.length}
          icon={LinkIcon}
          color="#38bdf8"
        />
        <DashboardItem
          name="Collections"
          value={collections.length}
          icon={Folder}
          color="#fbbf24"
        />
        <DashboardItem
          name="Tags"
          value={tagsCount}
          icon={Hash}
          color="#34d399"
        />
        <DashboardItem
          name="Pinned"
          value={pinnedCount}
          icon={Pin}
          color="#f472b6"
        />
      </div>

      {/* Section 1: Recent Links */}
      <div className="space-y-3 pt-2">
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
      </div>

      {/* Sections by Collection */}
      {collections.map((col) => {
        const colLinks = (col.id && linksByCollection[col.id]) || [];
        if (colLinks.length === 0) return null;

        return (
          <div key={col.id} className="space-y-3 pt-3">
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
          </div>
        );
      })}

    </div>
  );
};
