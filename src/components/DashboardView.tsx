import React, { useRef, useState, useMemo } from 'react';
import { 
  Home, 
  Hash, 
  Clock, 
  ChevronLeft,
  ChevronRight, 
  SlidersHorizontal,
  Plus,
  Calendar,
  Newspaper
} from 'lucide-react';
import { CollectionItem, LinkItem } from '../types';
import { formatDate, getDomain, getFaviconUrl } from '../utils/favicon';
import { getAuthorData } from '../utils/bloggerAuthors';
import { DashboardItem } from './DashboardItem';
import { LinkCard } from './LinkCard';
import { BloggerHeroSlider } from './BloggerHeroSlider';
import { BloggerNotificationBar } from './BloggerNotificationBar';
import { 
  Link21Icon, 
  Folder2Icon, 
  FolderFavoriteIcon,
  Verify1Icon,
  EyeIcon,
  MessageNotif1Icon,
  ArchiveIcon,
  ArchiveAddIcon,
  ArchiveTickIcon,
  RankingIcon,
  DocumentIcon
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
  
  // 1. Kategoriler: "Konu Dışı" her zaman ilk sırada (Sayfa 1'de) yer alır
  const sortedCollections = useMemo(() => {
    const list = [...collections];
    list.sort((a, b) => {
      const isA = a.name.toLowerCase().includes('konu');
      const isB = b.name.toLowerCase().includes('konu');
      if (isA && !isB) return -1;
      if (!isA && isB) return 1;
      return 0;
    });

    if (!list.some(c => c.name.toLowerCase().includes('konu'))) {
      list.unshift({
        id: -999,
        name: 'Konu Dışı',
        color: '#9aa0a6',
        icon: 'messages-square',
        description: 'Genel sohbet, öneriler ve konu dışı paylaşımlar',
        createdAt: Date.now()
      });
    }
    return list;
  }, [collections]);

  // Featured Pinned Post (e.g. Notbook Lm Projelerim Hakkında)
  const pinnedPost = activeLinks.find(l => l.isPinned && l.thumbnail) || activeLinks.find(l => l.isPinned) || activeLinks[0];

  // Group links by collection with Konu Dışı fallback guarantee
  const linksByCollection = useMemo(() => {
    const map: Record<number, LinkItem[]> = {};
    activeLinks.forEach(l => {
      if (l.collectionId) {
        if (!map[l.collectionId]) map[l.collectionId] = [];
        map[l.collectionId].push(l);
      }
    });

    // Konu Dışı koleksiyonunun bağlantılarını garantile
    const konuCol = sortedCollections.find(c => c.name.toLowerCase().includes('konu'));
    if (konuCol && konuCol.id) {
      if (!map[konuCol.id] || map[konuCol.id].length === 0) {
        const fallback = activeLinks.filter(l => 
          l.tags.some(t => t.toLowerCase().includes('konu') || t.toLowerCase().includes('forum') || t.toLowerCase().includes('sozluk') || t.toLowerCase().includes('topluluk')) ||
          l.title.toLowerCase().includes('forum') ||
          l.title.toLowerCase().includes('sohbet') ||
          (l.collectionId && collectionMap.get(l.collectionId)?.name.toLowerCase() === 'forum')
        );
        map[konuCol.id] = fallback.length > 0 ? fallback : activeLinks.slice(0, 10);
      }
    }
    return map;
  }, [activeLinks, sortedCollections, collectionMap]);

  // Sayfalama (Blogger Plus UI 1 2 3 4 5... Pager Motoru)
  const POSTS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState<number>(() => {
    try {
      const p = new URLSearchParams(window.location.search).get('page');
      const n = parseInt(p || '1', 10);
      return !isNaN(n) && n >= 1 ? n : 1;
    } catch {
      return 1;
    }
  });

  // Toplam sayfa sayısı (en az 5 sayfa sekmesi sunacak şekilde dinamik)
  const totalPages = useMemo(() => {
    const availableCount = activeLinks.filter(l => pinnedPost ? l.id !== pinnedPost.id : true).length;
    const postPages = Math.ceil(Math.max(1, availableCount) / POSTS_PER_PAGE);
    const catPages = Math.max(1, sortedCollections.length);
    return Math.max(5, Math.min(catPages, postPages));
  }, [activeLinks, pinnedPost, sortedCollections.length]);

  // Geçerli sayfanın gönderileri (En Son Yayınlar: Sayfaya göre 6'şar 6'şar değişir)
  const latestPosts = useMemo(() => {
    const available = activeLinks.filter(l => pinnedPost ? l.id !== pinnedPost.id : true);
    const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
    const slice = available.slice(startIdx, startIdx + POSTS_PER_PAGE);
    if (slice.length === 0) {
      return available.slice(0, POSTS_PER_PAGE);
    }
    return slice;
  }, [activeLinks, pinnedPost, currentPage]);

  // Sayfalar ilerledikçe değişen kategoriler:
  // Sayfa 1: Konu Dışı (Blogger negronshow ile birebir)
  // Sayfa 2+: Sırasıyla diğer kategoriler
  const pageCategories = useMemo(() => {
    if (sortedCollections.length === 0) return [];
    const catIdx = (currentPage - 1) % sortedCollections.length;
    return [sortedCollections[catIdx]];
  }, [sortedCollections, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
    try {
      const url = new URL(window.location.href);
      if (newPage === 1) {
        url.searchParams.delete('page');
      } else {
        url.searchParams.set('page', String(newPage));
      }
      window.history.pushState({}, '', url.toString());
    } catch {}

    const anchor = document.getElementById('latestPostsAnchor');
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 1 2 3 4 5 Numaratör Butonları (Blogger Plus UI Algoritması)
  const pageNumbers = useMemo(() => {
    const items: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
    } else {
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
          items.push(i);
        } else if (i === currentPage - 2 || i === currentPage + 2) {
          items.push('...');
        }
      }
    }
    return items.filter((item, idx, arr) => item !== '...' || arr[idx - 1] !== '...');
  }, [totalPages, currentPage]);

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

      {/* 3. Sabitlenmiş Gönderi (Pinned Post - 1:1 Blogger Stili) */}
      {pinnedPost && (
        <section aria-label="Sabitlenmiş Gönderi" className="space-y-3 pt-1">
          <div className="flex items-center gap-2">
            <RankingIcon className="w-5 h-5 text-[#60cdff]" />
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
              Sabitlenmiş Gönderi
            </h2>
          </div>

          <article 
            onClick={() => onOpenPostPage(pinnedPost)}
            className="group relative rounded-lg bg-[#252526] hover:bg-[#28282b] border border-transparent hover:border-[#60cdff]/30 transition-all duration-200 overflow-hidden cursor-pointer shadow-md hover:shadow-xl hover:shadow-black/60 flex flex-col md:flex-row select-none"
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
                  <div className="relative z-10 w-16 h-16 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center p-3 shadow-xl mb-2 group-hover:scale-105 transition-transform">
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
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/65 backdrop-blur-md text-white text-[10px] font-medium shadow-sm">
                  <EyeIcon className="w-3.5 h-3.5 text-[#60cdff]" />
                  <span>{pinnedPost.views || Math.abs(pinnedPost.title.length * 3 + 12)}</span>
                </div>
              </div>

              {/* Sağ Üst: 💬 Yorumlar ve 🔖 Yer İmi / Kaydet Butonu (.bm-button 1:1 LinkCard) */}
              <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/65 backdrop-blur-md text-white text-[10px] font-medium shadow-sm">
                  <MessageNotif1Icon className="w-3 h-3 text-white/90" />
                  <span>{pinnedPost.commentsCount !== undefined ? pinnedPost.commentsCount : 0}</span>
                </div>

                {/* Blogger XML 1:1 Yer İmleri / Kaydet Butonu (.bm-button) */}
                <button
                  type="button"
                  onClick={(e) => {
                    if (onTogglePin && pinnedPost.id) {
                      e.stopPropagation();
                      onTogglePin(pinnedPost.id, pinnedPost.isPinned);
                    }
                  }}
                  className={`tIc bm-button p-1.5 rounded-lg backdrop-blur-md shadow-sm transition-all duration-200 active:scale-90 cursor-pointer ${
                    pinnedPost.isPinned 
                      ? 'added bg-amber-500/25 text-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.3)]' 
                      : 'bg-black/65 text-white/80 hover:text-[#60cdff] hover:bg-black/85'
                  }`}
                  data-save="Kaydet"
                  data-saved="Kaydedildi"
                  title={pinnedPost.isPinned ? 'Kaydedildi' : 'Kaydet'}
                  aria-label={pinnedPost.isPinned ? 'Kaydedildi' : 'Kaydet'}
                >
                  {pinnedPost.isPinned ? (
                    <ArchiveTickIcon className="w-3.5 h-3.5 text-amber-300" />
                  ) : (
                    <ArchiveAddIcon className="w-3.5 h-3.5 text-white/90" />
                  )}
                </button>
              </div>

              {/* Sol Alt: Yazar Rozeti (.aNm - XML 1:1) */}
              <div className="absolute bottom-2.5 left-2.5 z-10">
                {(() => {
                  const pinnedAuthor = getAuthorData(pinnedPost.authorName || 'NEGRONN');
                  return (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-black/75 backdrop-blur-md text-white text-[10px] font-bold shadow-sm">
                      <img
                        src={pinnedAuthor.avatar}
                        alt={pinnedPost.authorName || 'NEGRONN'}
                        className="w-3.5 h-3.5 rounded-full object-cover shrink-0 ring-1 ring-white/20"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span>{pinnedPost.authorName || 'NEGRONN'}</span>
                      <Verify1Icon className="w-3 h-3 text-[#60cdff]" />
                    </div>
                  );
                })()}
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

              {/* Alt Satır: Tarih + Daha */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#9ca3af]">
                <div className="flex items-center gap-2">
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

      {/* Çapa: Sayfa Değiştiğinde Buraya Kay */}
      <div id="latestPostsAnchor" className="scroll-mt-24" />

      {/* 5. En Son Yayınlar (Latest Posts - 3 Sütunlu Blogger Grid) */}
      <section aria-label="En Son Yayınlar" className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DocumentIcon className="w-5 h-5 text-[#60cdff]" />
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
              En Son Yayınlar
              {totalPages > 1 && (
                <span className="text-xs font-normal text-[#9aa0a6] ml-2 font-mono">
                  (Sayfa {currentPage}/{totalPages})
                </span>
              )}
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

      {/* 6. Sayfalar İlerledikçe Değişen Kategori Vitrini (Sayfa 1: Konu Dışı, Sayfa 2+: Sırasıyla Diğerleri) */}
      {pageCategories.map((col) => {
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

      {/* 7. Blogger Plus UI Sayfalama Numaratörü (.blogN #blog-pager 1 2 3 4 5...) */}
      {totalPages > 1 && (
        <nav aria-label="Sayfalama Numaratörü" className="blogN numP" id="blog-pager">
          {/* Önceki Sayfa (<) */}
          {currentPage > 1 ? (
            <button
              type="button"
              className="nwLnk"
              aria-label="Önceki Sayfa"
              onClick={() => handlePageChange(currentPage - 1)}
              title="Önceki Sayfa"
            >
              <svg className="line" viewBox="0 0 24 24">
                <path d="M9.57 5.92993L3.5 11.9999L9.57 18.0699" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.5 12H3.67004" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <div className="nwLnk nPst disabled" aria-disabled="true" title="İlk Sayfadasınız">
              <svg className="line" viewBox="0 0 24 24">
                <path d="M9.57 5.92993L3.5 11.9999L9.57 18.0699" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.5 12H3.67004" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}

          {/* Numaralar (1, 2, 3, 4, 5...) */}
          {pageNumbers.map((item, idx) => {
            if (item === '...') {
              return (
                <div key={`ellipsis-${idx}`} className="nPst ellipsis" aria-hidden="true">
                  ...
                </div>
              );
            }
            const pageNum = item as number;
            const isActive = pageNum === currentPage;
            return (
              <button
                key={`page-${pageNum}`}
                type="button"
                className={`page-num-btn ${isActive ? 'active nPst' : ''}`}
                aria-label={`Sayfa ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handlePageChange(pageNum)}
                title={`Sayfa ${pageNum}`}
              >
                {pageNum}
              </button>
            );
          })}

          {/* Sonraki Sayfa (>) */}
          {currentPage < totalPages ? (
            <button
              type="button"
              className="olLnk"
              aria-label="Sonraki Sayfa"
              onClick={() => handlePageChange(currentPage + 1)}
              title="Sonraki Sayfa"
            >
              <svg className="line" viewBox="0 0 24 24">
                <path d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.5 12H20.33" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <div className="olLnk nPst disabled" aria-disabled="true" title="Son Sayfadasınız">
              <svg className="line" viewBox="0 0 24 24">
                <path d="M14.4301 5.92993L20.5001 11.9999L14.4301 18.0699" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M3.5 12H20.33" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </nav>
      )}

    </div>
  );
};
