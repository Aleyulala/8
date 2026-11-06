import React, { useRef, useState, useEffect } from 'react';
import { 
  Globe, 
  ExternalLink, 
  Folder, 
  HardDrive, 
  ShieldCheck, 
  ChevronRight,
  ChevronLeft,
  Hash,
  X
} from 'lucide-react';
import { 
  PulseIcon, 
  InstagramIcon, 
  TelegramIcon, 
  MailIcon,
  CloseIcon,
  GithubIcon
} from './BloggerIcons';
import { CollectionItem, LinkItem, TagItem } from '../types';
import { getDomain, getFaviconUrl } from '../utils/favicon';

interface BloggerRightSidebarProps {
  pinnedLinks: LinkItem[];
  collections: CollectionItem[];
  tags: TagItem[];
  counts: {
    all: number;
    pinned: number;
    trash: number;
    collections: Record<number, number>;
    tags: Record<string, number>;
  };
  storageInfo: {
    formattedUsed: string;
    formattedQuota: string;
    percentage: number;
  };
  onSelectCollection: (id: number) => void;
  onSelectTag: (tag: string) => void;
  onOpenDetail: (link: LinkItem) => void;
  // Mobile / Drawer props
  isDrawerOpen?: boolean;
  onCloseDrawer?: () => void;
}

export const BloggerRightSidebar: React.FC<BloggerRightSidebarProps> = ({
  pinnedLinks,
  collections,
  tags,
  counts,
  storageInfo,
  onSelectCollection,
  onSelectTag,
  onOpenDetail,
  isDrawerOpen = false,
  onCloseDrawer
}) => {
  // Sort collections by link count
  const sortedCollections = [...collections]
    .map(c => ({ ...c, count: (c.id && counts.collections[c.id]) || 0 }))
    .sort((a, b) => b.count - a.count);

  // Top pinned / popular links
  const featuredLinks = pinnedLinks.slice(0, 5);

  // Category Slides Horizontal Ref & State
  const catTrackRef = useRef<HTMLDivElement>(null);
  const [catCanScrollLeft, setCatCanScrollLeft] = useState(false);
  const [catCanScrollRight, setCatCanScrollRight] = useState(true);

  // Tags Slides Horizontal Ref & State
  const tagsTrackRef = useRef<HTMLDivElement>(null);
  const [tagCanScrollLeft, setTagCanScrollLeft] = useState(false);
  const [tagCanScrollRight, setTagCanScrollRight] = useState(true);

  const checkCatScroll = () => {
    if (!catTrackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = catTrackRef.current;
    setCatCanScrollLeft(scrollLeft > 4);
    setCatCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  const checkTagScroll = () => {
    if (!tagsTrackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = tagsTrackRef.current;
    setTagCanScrollLeft(scrollLeft > 4);
    setTagCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  useEffect(() => {
    checkCatScroll();
    checkTagScroll();
  }, [collections, tags]);

  const scrollCat = (direction: 'left' | 'right') => {
    if (!catTrackRef.current) return;
    const offset = direction === 'left' ? -200 : 200;
    catTrackRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(checkCatScroll, 300);
  };

  const scrollTags = (direction: 'left' | 'right') => {
    if (!tagsTrackRef.current) return;
    const offset = direction === 'left' ? -180 : 180;
    tagsTrackRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(checkTagScroll, 300);
  };

  const content = (
    <div className="p-4 space-y-5 text-xs text-[#a1a1aa] select-none">
      
      {/* Drawer Header (Only visible when rendered as a mobile drawer) */}
      {onCloseDrawer && (
        <div className="flex items-center justify-between pb-2 border-b border-[#333333] lg:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
            <h2 className="font-bold text-sm text-white">Sağ Panel & Menü</h2>
          </div>
          <button
            onClick={onCloseDrawer}
            className="p-1.5 rounded-lg bg-[#252526] hover:bg-[#333333] text-[#a1a1aa] hover:text-white transition-colors"
            aria-label="Kapat"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Widget 1: Blogger Yazar Kartı (Profile01) */}
      <div className="rounded-2xl bg-[#252526] border border-[#383838] p-4 space-y-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5 shadow-md shrink-0">
            <div className="w-full h-full rounded-[14px] bg-[#1e1e1e] flex items-center justify-center font-bold text-sm text-[#fffdfc]">
              AY
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#1e1e1e]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-[#fffdfc] truncate">Ali Yıldız</h3>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#ff5722]/20 text-[#ff5722] font-semibold">BLOGGER</span>
            </div>
            <p className="text-[11px] text-[#989b9f] truncate">
              aleyulala.blogspot.com
            </p>
          </div>
        </div>

        <p className="text-[11px] text-[#989b9f] leading-relaxed">
          Local-First Linkwarden yöneticisi. 352 bağlantı ve 14 kategoriyle tüm web akışınız çevrimdışı elinizin altında.
        </p>

        {/* Social Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <a
            href="https://aleyulala.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-[#1e1e1e] hover:bg-[#ff5722] text-[#d4d4d4] hover:text-white border border-[#383838] hover:border-transparent transition-all font-semibold text-[11px]"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Blog</span>
          </a>
          <a
            href="https://t.me/aleyyulala"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-xl bg-[#1e1e1e] hover:bg-[#229ed9] text-[#d4d4d4] hover:text-white border border-[#383838] hover:border-transparent flex items-center justify-center transition-all"
            title="Telegram"
          >
            <TelegramIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.instagram.com/aleyul.ala/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-xl bg-[#1e1e1e] hover:bg-[#e1306c] text-[#d4d4d4] hover:text-white border border-[#383838] hover:border-transparent flex items-center justify-center transition-all"
            title="Instagram"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="mailto:mrstar14155@gmail.com"
            className="w-8 h-8 rounded-xl bg-[#1e1e1e] hover:bg-[#ea4335] text-[#d4d4d4] hover:text-white border border-[#383838] hover:border-transparent flex items-center justify-center transition-all"
            title="E-posta"
          >
            <MailIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Widget 2: Kategori Başlıkları Slides (Blogger Koleksiyonlar Slayt Motoru) */}
      <div className="rounded-2xl bg-[#252526] border border-[#383838] p-4 space-y-3 shadow-md">
        
        {/* Başlık ve Çizgi Butonlar (.car-nav) */}
        <div className="flex items-center justify-between border-b border-[#333333] pb-2">
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-xs text-[#fffdfc] uppercase tracking-wider">
              Kategoriler ({sortedCollections.length})
            </h3>
          </div>

          {/* Blogger Stili Çizgi Navigasyon Butonları */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollCat('left')}
              className={`h-2 rounded-full transition-all duration-200 ${
                catCanScrollLeft 
                  ? 'w-6 bg-[#60cdff] shadow-[0_0_8px_rgba(96,205,255,0.6)] cursor-pointer' 
                  : 'w-4 bg-white/20 opacity-40 cursor-default'
              }`}
              title="Önceki Kategoriler"
              aria-label="Önceki Kategoriler"
            />
            <button
              onClick={() => scrollCat('right')}
              className={`h-2 rounded-full transition-all duration-200 ${
                catCanScrollRight 
                  ? 'w-6 bg-[#60cdff] shadow-[0_0_8px_rgba(96,205,255,0.6)] cursor-pointer' 
                  : 'w-4 bg-white/20 opacity-40 cursor-default'
              }`}
              title="Sonraki Kategoriler"
              aria-label="Sonraki Kategoriler"
            />
          </div>
        </div>

        {/* Akıcı Yatay Slayt Şeridi (.cat-showcase-track) */}
        <div 
          ref={catTrackRef}
          onScroll={checkCatScroll}
          className="flex gap-2.5 overflow-x-auto pb-1.5 pt-0.5 hide-scrollbar scroll-smooth"
        >
          {sortedCollections.map((col) => {
            const max = sortedCollections[0]?.count || 1;
            const pct = Math.min(100, Math.round((col.count / max) * 100));
            return (
              <div 
                key={col.id}
                onClick={() => {
                  if (col.id) {
                    onSelectCollection(col.id);
                    if (onCloseDrawer) onCloseDrawer();
                  }
                }}
                className="group min-w-[135px] w-[135px] p-2.5 rounded-xl bg-[#1e1e1e] hover:bg-[#2b2b2e] border border-[#383838] hover:border-[#38bdf8]/60 cursor-pointer transition-all duration-200 shrink-0 space-y-1.5 active:scale-95 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs" 
                    style={{ backgroundColor: col.color || '#38bdf8' }}
                  />
                  <span className="text-[10px] text-[#989b9f] font-mono font-bold group-hover:text-white">
                    {col.count}
                  </span>
                </div>

                <div className="font-semibold text-xs text-[#fffdfc] group-hover:text-[#38bdf8] truncate transition-colors">
                  {col.name}
                </div>

                {/* Progress bar */}
                <div className="w-full h-1 bg-[#252526] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${pct}%`,
                      backgroundColor: col.color || '#38bdf8'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Widget 3: Sabitlenmiş Popüler Bağlantılar (PopularPosts01) */}
      <div className="rounded-2xl bg-[#252526] border border-[#383838] p-4 space-y-3 shadow-md">
        <div className="flex items-center justify-between border-b border-[#333333] pb-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8] flex items-center justify-center">
              <PulseIcon className="w-3.5 h-3.5" />
            </span>
            <h3 className="font-bold text-xs text-[#fffdfc] uppercase tracking-wider">
              Popüler Bağlantılar
            </h3>
          </div>
          <span className="text-[10px] text-[#989b9f] font-mono">{pinnedLinks.length}</span>
        </div>

        <div className="space-y-2">
          {featuredLinks.map((link) => {
            const domain = getDomain(link.url);
            const favicon = getFaviconUrl(link.url);
            return (
              <div
                key={link.id}
                onClick={() => {
                  onOpenDetail(link);
                  if (onCloseDrawer) onCloseDrawer();
                }}
                className="group flex items-center justify-between p-2 rounded-xl bg-[#1e1e1e]/70 hover:bg-[#1e1e1e] border border-[#333333] hover:border-[#4d4d4d] cursor-pointer transition-all gap-2.5 active:scale-98"
              >
                <div className="w-7 h-7 rounded-lg bg-black/40 border border-white/10 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={favicon}
                    alt={domain}
                    className="w-4 h-4 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs text-[#fffdfc] group-hover:text-[#38bdf8] truncate transition-colors">
                    {link.title || domain}
                  </h4>
                  <p className="text-[10px] text-[#989b9f] truncate">
                    {domain}
                  </p>
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 rounded-md text-[#737373] hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Widget 4: Etiket Bulutu Slides (#Label01 - initLabelSlider) */}
      <div className="rounded-2xl bg-[#252526] border border-[#383838] p-4 space-y-3 shadow-md">
        
        {/* Başlık ve Çizgi Butonlar (.label-slider-nav) */}
        <div className="flex items-center justify-between border-b border-[#333333] pb-2">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-xs text-[#fffdfc] uppercase tracking-wider">
              Etiketler ({tags.length})
            </h3>
          </div>

          {/* Blogger Stili Çizgi Butonlar */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollTags('left')}
              className={`h-2 rounded-full transition-all duration-200 ${
                tagCanScrollLeft 
                  ? 'w-6 bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.6)] cursor-pointer' 
                  : 'w-4 bg-white/20 opacity-40 cursor-default'
              }`}
              title="Önceki Etiketler"
              aria-label="Önceki Etiketler"
            />
            <button
              onClick={() => scrollTags('right')}
              className={`h-2 rounded-full transition-all duration-200 ${
                tagCanScrollRight 
                  ? 'w-6 bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.6)] cursor-pointer' 
                  : 'w-4 bg-white/20 opacity-40 cursor-default'
              }`}
              title="Sonraki Etiketler"
              aria-label="Sonraki Etiketler"
            />
          </div>
        </div>

        {/* Yatay Kayan Etiketler Şeridi (.lbL) */}
        <div 
          ref={tagsTrackRef}
          onScroll={checkTagScroll}
          className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 hide-scrollbar scroll-smooth"
        >
          {tags.map((t) => {
            const count = counts.tags[t.name] || 0;
            return (
              <button
                key={t.name}
                onClick={() => {
                  onSelectTag(t.name);
                  if (onCloseDrawer) onCloseDrawer();
                }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#1e1e1e] hover:bg-[#34d399] text-[#a3a3a3] hover:text-[#0f172a] border border-[#383838] hover:border-[#34d399] font-medium text-xs transition-all shrink-0 active:scale-95 shadow-sm"
              >
                <span>#{t.name}</span>
                <span className="text-[10px] opacity-75 font-mono">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Widget 5: Depolama & Sistem Durumu (Stats41) */}
      <div className="rounded-2xl bg-[#252526] border border-[#383838] p-4 space-y-3 shadow-md">
        <div className="flex items-center justify-between border-b border-[#333333] pb-2">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-[#38bdf8]" />
            <h3 className="font-bold text-xs text-[#fffdfc] uppercase tracking-wider">
              Yerel Depolama
            </h3>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold">ONLINE</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-[#989b9f]">
            <span>Kullanılan Alan:</span>
            <span className="font-mono text-[#fffdfc] font-semibold">{storageInfo.formattedUsed}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#989b9f]">
            <span>Toplam Kota:</span>
            <span className="font-mono text-[#fffdfc] font-semibold">{storageInfo.formattedQuota}</span>
          </div>
          <div className="w-full h-1.5 bg-[#1e1e1e] rounded-full overflow-hidden mt-1">
            <div 
              className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(3, storageInfo.percentage)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400/90 font-medium">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>IndexedDB Güvenli Çevrimdışı Bellek</span>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* 1. Masaüstü Sabit Sağ Bar (.sideB) */}
      <aside className="w-72 xl:w-80 bg-[#1e1e1e] border-l border-[rgba(255,255,255,0.08)] h-[calc(100vh-60px)] overflow-y-auto hidden lg:block shadow-xs">
        {content}
      </aside>

      {/* 2. Mobil / Tablet Sağ Çekmece (Right Drawer) */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={onCloseDrawer}
          />
          {/* Drawer Body */}
          <div className="relative w-80 max-w-[85vw] h-full bg-[#1e1e1e] border-l border-[#383838] shadow-2xl overflow-y-auto z-10 animate-in slide-in-from-right duration-300">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
