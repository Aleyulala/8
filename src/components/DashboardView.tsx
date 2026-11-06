import React, { useRef, useState } from 'react';
import { 
  Home, 
  Hash, 
  Clock, 
  ChevronRight, 
  SlidersHorizontal,
  Plus,
  Eye,
  MessageSquare,
  Bookmark,
  Calendar,
  Newspaper
} from 'lucide-react';
import { CollectionItem, LinkItem } from '../types';
import { formatDate, getDomain, getFaviconUrl } from '../utils/favicon';
import { DashboardItem } from './DashboardItem';
import { LinkCard } from './LinkCard';
import { BloggerHeroSlider } from './BloggerHeroSlider';
import { BloggerNotificationBar } from './BloggerNotificationBar';
import { 
  Link21Icon, 
  Folder2Icon, 
  FolderFavoriteIcon,
  Verify1Icon
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
  onOpenPostPage: (link: LinkItem) => void;
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
  onOpenPostPage: (link: LinkItem) => void;
}> = ({
  col,
  links,
  onViewCollection,
  onTogglePin,
  onOpenPostPage
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
              className={`h-1.5 rounded-full transition-all duration-200 ${
                canScrollLeft 
                  ? 'w-6 bg-[#60cdff] shadow-[0_0_8px_rgba(96,205,255,0.6)] cursor-pointer' 
                  : 'w-3.5 bg-white/20 opacity-40 cursor-default'
              }`}
              title="Önceki Kartlar"
              aria-label="Önceki Kartlar"
            />
            <button
              onClick={() => scroll('right')}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                canScrollRight 
                  ? 'w-6 bg-[#60cdff] shadow-[0_0_8px_rgba(96,205,255,0.6)] cursor-pointer' 
                  : 'w-3.5 bg-white/20 opacity-40 cursor-default'
              }`}
              title="Sonraki Kartlar"
              aria-label="Sonraki Kartlar"
            />
          </div>

          <button
            onClick={() => col.id && onViewCollection(col.id)}
            className="flex items-center gap-1 text-xs text-[#a3a3a3] hover:text-[#38bdf8] font-medium transition-colors cursor-pointer"
          >
            <span>Tümünü Gör</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track with Cards */}
      <div 
        ref={trackRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto pb-3 pt-1 hide-scrollbar scroll-smooth"
      >
        {links.map((link) => (
          <div key={link.id} className="min-w-[260px] w-[270px] max-w-[290px] shrink-0">
            <LinkCard
              link={link}
              collection={col}
              onTogglePin={onTogglePin}
              onOpenPostPage={onOpenPostPage}
            />
          </div>
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
  onOpenPostPage,
  onTogglePin,
  onToggleRead,
  onToggleArchive,
  onMoveToTrash,
  onEditLink
}) => {
  const activeLinks = links.filter(l => !l.isTrash && !l.isArchived);
  
  // Featured Pinned Post (e.g. Notbook Lm Projelerim Hakkında)
  const pinnedPost = activeLinks.find(l => l.isPinned && l.thumbnail) || activeLinks.find(l => l.isPinned) || activeLinks[0];

  // Latest Posts (En Son Yayınlar: excluding the pinned post if possible, taking next 6)
  const latestPosts = activeLinks
    .filter(l => pinnedPost ? l.id !== pinnedPost.id : true)
    .slice(0, 6);

  // Group links by collection
  const linksByCollection: Record<number, LinkItem[]> = {};
  activeLinks.forEach(l => {
    if (l.collectionId) {
      if (!linksByCollection[l.collectionId]) linksByCollection[l.collectionId] = [];
      linksByCollection[l.collectionId].push(l);
    }
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Blogger Üst Bildiri Çubuğu (.ntcW) */}
      <BloggerNotificationBar />

      {/* 2. Blogger Plus UI Hero Showcase Carousel (.sldW) */}
      <section aria-label="Hero Carousel" className="w-full">
        <BloggerHeroSlider
          collections={collections}
          onSelectCollection={onViewCollection}
          onFilterTag={onSelectTag}
        />
      </section>

      {/* 3. 4 Stat Cards: Links (352), Collections (14), Tags (26), Pinned (38) */}
      <section aria-label="Statistics Cards">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
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

      {/* 4. Sabitlenmiş Gönderi (Pinned Post - 1:1 Blogger Stili) */}
      {pinnedPost && (
        <section aria-label="Sabitlenmiş Gönderi" className="space-y-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white leading-none">📌</span>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
              Sabitlenmiş Gönderi
            </h2>
          </div>

          <article 
            onClick={() => onOpenPostPage(pinnedPost)}
            className="group relative rounded-xl bg-[#252526] hover:bg-[#28282b] border border-transparent hover:border-[#60cdff]/30 transition-all duration-200 overflow-hidden cursor-pointer shadow-md hover:shadow-xl hover:shadow-black/60 flex flex-col md:flex-row select-none"
          >
            {/* Sol Görsel / Thumbnail */}
            <div className="relative md:w-1/2 aspect-[16/9] md:aspect-auto bg-[#1e1e1e] overflow-hidden shrink-0">
              {pinnedPost.thumbnail ? (
                <img
                  src={pinnedPost.thumbnail}
                  alt={pinnedPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center bg-gradient-to-tr from-sky-950 via-[#1c2430] to-[#252526] p-6 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:14px_14px]" />
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-black/60 backdrop-blur-md flex items-center justify-center p-3 shadow-xl mb-2 group-hover:scale-105 transition-transform">
                    <img
                      src={getFaviconUrl(pinnedPost.url)}
                      alt={getDomain(pinnedPost.url)}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <span className="relative z-10 text-xs font-mono text-white/80 font-bold tracking-wider">
                    {getDomain(pinnedPost.url)}
                  </span>
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/60 pointer-events-none" />

              {/* Sol Üst: 👁 Görüntülenme */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-md text-white text-[10px] font-medium shadow-sm">
                  <Eye className="w-3 h-3 text-[#60cdff]" />
                  <span>{pinnedPost.views || Math.abs(pinnedPost.title.length * 3 + 12)}</span>
                </div>
              </div>

              {/* Sağ Üst: 💬 Yorumlar ve 🔖 Sabit */}
              <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-md text-white text-[10px] font-medium shadow-sm">
                  <MessageSquare className="w-2.5 h-2.5 text-white/90" />
                  <span>{pinnedPost.commentsCount !== undefined ? pinnedPost.commentsCount : 0}</span>
                </div>
                <div className="p-1 rounded-md bg-amber-500/30 text-amber-300 shadow-sm">
                  <Bookmark className="w-3 h-3 fill-current text-amber-300" />
                </div>
              </div>

              {/* Sol Alt: SAVED ✔ Rozeti */}
              <div className="absolute bottom-2.5 left-2.5 z-10">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white text-[10px] font-bold shadow-sm">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#1e1e1e] flex items-center justify-center text-[7px] text-[#60cdff] font-extrabold">
                    S
                  </span>
                  <span>{pinnedPost.authorName || 'SAVED'}</span>
                  <Verify1Icon className="w-3 h-3 text-[#60cdff]" />
                </div>
              </div>
            </div>

            {/* Sağ Metin İçeriği */}
            <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3">
              <div className="space-y-2">
                <div className="text-[11px] text-[#60cdff] hover:underline lowercase font-medium">
                  {pinnedPost.tags[0] || (pinnedPost.collectionId ? collectionMap.get(pinnedPost.collectionId)?.name.toLowerCase() : 'genel')}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#60cdff] leading-snug transition-colors">
                  {pinnedPost.title}
                </h3>

                {pinnedPost.description && (
                  <p className="text-xs text-[#989b9f] leading-relaxed line-clamp-3">
                    {pinnedPost.description}
                  </p>
                )}
              </div>

              {/* Alt Satır: Yayınlandı! + Tarih + Daha */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#9ca3af]">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#457f57] text-white text-[10px] font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
                    Yayınlandı!
                  </span>
                  <span className="text-[11px] text-[#71717a]">{formatDate(pinnedPost.createdAt)}</span>
                </div>

                <span className="text-xs text-[#60cdff] group-hover:underline font-medium">
                  Daha →
                </span>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* 5. En Son Yayınlar (Latest Posts - 3 Sütunlu Blogger Grid) */}
      <section aria-label="En Son Yayınlar" className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base text-white">📰</span>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
              En Son Yayınlar
            </h2>
          </div>

          <button
            onClick={onViewAllRecent}
            className="flex items-center gap-1 text-xs text-[#a3a3a3] hover:text-[#38bdf8] font-medium transition-colors cursor-pointer"
          >
            <span>Tümünü Gör</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-[18px] gap-y-[36px]">
          {latestPosts.map((post) => (
            <LinkCard
              key={post.id}
              link={post}
              collection={post.collectionId ? collectionMap.get(post.collectionId) : undefined}
              onOpenPostPage={onOpenPostPage}
              onTogglePin={onTogglePin}
            />
          ))}
        </div>
      </section>

      {/* 6. Kategorilere Göre Vitrin Kaydırıcıları (.cat-showcase-carousel) */}
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
            onOpenPostPage={onOpenPostPage}
          />
        );
      })}

    </div>
  );
};
