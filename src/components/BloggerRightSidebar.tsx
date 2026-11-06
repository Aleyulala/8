import React, { useRef, useState, useEffect } from 'react';
import { 
  PulseIcon, 
  CloseIcon,
  Verify1Icon,
  EyeIcon,
  MessageNotif1Icon,
  ArchiveIcon,
  TagBloggerIcon,
  ChatBloggerIcon
} from './BloggerIcons';
import { 
  Calendar, 
  Send,
  MessageCircle
} from 'lucide-react';
import { CollectionItem, LinkItem, TagItem } from '../types';
import { formatDate, getDomain, getFaviconUrl } from '../utils/favicon';

interface BloggerRightSidebarProps {
  pinnedLinks: LinkItem[];
  allLinks: LinkItem[];
  collections: CollectionItem[];
  tags: TagItem[];
  counts: {
    all: number;
    pinned: number;
    trash: number;
    collections: Record<number, number>;
    tags: Record<string, number>;
  };
  onSelectCollection: (id: number) => void;
  onSelectTag: (tag: string) => void;
  onOpenPostPage: (link: LinkItem) => void;
  // Mobile / Drawer props
  isDrawerOpen?: boolean;
  onCloseDrawer?: () => void;
}

export const BloggerRightSidebar: React.FC<BloggerRightSidebarProps> = ({
  pinnedLinks,
  allLinks,
  collections,
  tags,
  counts,
  onSelectCollection,
  onSelectTag,
  onOpenPostPage,
  isDrawerOpen = false,
  onCloseDrawer
}) => {
  // Tags track horizontal slider
  const tagsTrackRef = useRef<HTMLDivElement>(null);
  const [tagCanScrollLeft, setTagCanScrollLeft] = useState(false);
  const [tagCanScrollRight, setTagCanScrollRight] = useState(true);
  const isDraggingTags = useRef(false);
  const startTagsX = useRef(0);
  const startScrollLeft = useRef(0);

  // Form states for "Bize Ulaşın"
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const checkTagScroll = () => {
    if (!tagsTrackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = tagsTrackRef.current;
    setTagCanScrollLeft(scrollLeft > 4);
    setTagCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  useEffect(() => {
    checkTagScroll();
  }, [tags]);

  const handleTagsMouseDown = (e: React.MouseEvent) => {
    isDraggingTags.current = true;
    startTagsX.current = e.pageX - (tagsTrackRef.current?.offsetLeft || 0);
    startScrollLeft.current = tagsTrackRef.current?.scrollLeft || 0;
  };

  const handleTagsMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingTags.current || !tagsTrackRef.current) return;
    e.preventDefault();
    const x = e.pageX - (tagsTrackRef.current.offsetLeft || 0);
    const walk = (x - startTagsX.current) * 1.5;
    tagsTrackRef.current.scrollLeft = startScrollLeft.current - walk;
    checkTagScroll();
  };

  const handleTagsMouseUpOrLeave = () => {
    isDraggingTags.current = false;
  };

  const scrollTags = (direction: 'left' | 'right') => {
    if (!tagsTrackRef.current) return;
    const offset = direction === 'left' ? -180 : 180;
    tagsTrackRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    setTimeout(checkTagScroll, 300);
  };

  // Prepare popular posts (first 5 links)
  const popularPosts = [...allLinks].filter(l => !l.isTrash && !l.isArchived).slice(0, 5);
  const featuredFirst = popularPosts[0];
  const listPosts = popularPosts.slice(1, 5);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 3000);
  };

  const content = (
    <div className="space-y-6 text-xs text-[#a1a1aa] select-none">
      
      {/* Mobile Drawer Header (Only when opened as drawer on mobile) */}
      {onCloseDrawer && (
        <div className="flex items-center justify-between pb-3 border-b border-[#333333] lg:hidden">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#60cdff]" />
            <h2 className="font-bold text-sm text-white">Sağ Panel</h2>
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

      {/* Widget 1: Popüler Post (#PopularPosts01 - Sıfır Kutu, Kenarlıksız, Doğrudan Sidebar Üzerinde) */}
      <section aria-label="Popüler Post" className="space-y-4">
        
        {/* Başlık: Pulse İkonu + Popüler Post (.title) */}
        <div className="flex items-center gap-2 mb-3">
          <PulseIcon className="w-5 h-5 text-[#60cdff]" />
          <h2 className="text-[1.15rem] font-bold text-white tracking-wide">
            Popüler Post
          </h2>
        </div>

        {/* 1. Öne Çıkan Büyük Popüler Post (.mostP - Kart Kutusu Yok, Doğrudan Sidebar'da) */}
        {featuredFirst && (
          <article
            onClick={() => {
              onOpenPostPage(featuredFirst);
              if (onCloseDrawer) onCloseDrawer();
            }}
            className="group cursor-pointer select-none space-y-2 mb-5"
          >
            {/* Büyük 16:9 Thumbnail (.iThmb .thmb) */}
            <div className="relative w-full aspect-[16/9] rounded-[14px] overflow-hidden bg-[#1e1e1e]">
              {featuredFirst.thumbnail ? (
                <img
                  src={featuredFirst.thumbnail}
                  alt={featuredFirst.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-sky-950 via-[#1c2430] to-[#252526] p-4 relative">
                  <div className="w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center p-2 shadow-lg mb-1">
                    <img
                      src={getFaviconUrl(featuredFirst.url)}
                      alt={getDomain(featuredFirst.url)}
                      className="w-5 h-5 object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-white/70 font-mono">{getDomain(featuredFirst.url)}</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/60 pointer-events-none" />

              {/* Badges (.tfxM .tfxC - Beyaz Bordersız) */}
              <div className="absolute top-2 left-2 z-10">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/65 backdrop-blur-md text-white text-[10px] font-medium shadow-sm">
                  <EyeIcon className="w-3.5 h-3.5 text-[#60cdff]" />
                  <span>{featuredFirst.views || 74}</span>
                </div>
              </div>

              <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/65 backdrop-blur-md text-white text-[10px] font-medium shadow-sm">
                  <MessageNotif1Icon className="w-3 h-3 text-white/90" />
                  <span>{featuredFirst.commentsCount !== undefined ? featuredFirst.commentsCount : 0}</span>
                </div>
                <div className="p-1 rounded-lg bg-black/65 backdrop-blur-md text-white/80 shadow-sm">
                  <ArchiveIcon className="w-3.5 h-3.5 text-amber-300" />
                </div>
              </div>

              <div className="absolute bottom-2 left-2 z-10">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/75 backdrop-blur-md text-white text-[10px] font-bold shadow-sm">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#1e1e1e] flex items-center justify-center text-[7px] text-[#60cdff] font-extrabold">
                    N
                  </span>
                  <span>{featuredFirst.authorName || 'NEGRONN'}</span>
                  <Verify1Icon className="w-3 h-3 text-[#60cdff]" />
                </div>
              </div>
            </div>

            {/* Metin İçeriği (.iCtnt) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-1.5 py-0.5 rounded bg-[#457f57] text-white text-[10px] font-medium">
                  Yayınlandı!
                </span>
                <span className="text-[11px] text-[#71717a]">{formatDate(featuredFirst.createdAt)}</span>
                <span className="text-[11px] text-[#60cdff] hover:underline lowercase">{featuredFirst.tags[0] || 'genel'}</span>
              </div>

              <h3 className="font-bold text-[14px] text-white group-hover:text-[#60cdff] line-clamp-2 leading-snug transition-colors">
                {featuredFirst.title}
              </h3>

              {featuredFirst.description && (
                <p className="text-xs text-[#989b9f] line-clamp-2 leading-relaxed pt-0.5">
                  {featuredFirst.description}
                </p>
              )}
            </div>
          </article>
        )}

        {/* 2. Liste Formatındaki Popüler Gönderiler (.itm - Kutusuz, Çizgisiz, Doğrudan Sidebar'da) */}
        <div className="space-y-4 pt-1">
          {listPosts.map((post, idx) => {
            const category = post.tags[0] || 'genel';
            return (
              <article
                key={post.id || idx}
                onClick={() => {
                  onOpenPostPage(post);
                  if (onCloseDrawer) onCloseDrawer();
                }}
                className="group cursor-pointer select-none space-y-1 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-1.5 py-0.5 rounded bg-[#457f57] text-white text-[10px] font-medium">
                    Yayınlandı!
                  </span>
                  <span className="text-[11px] text-[#71717a]">{formatDate(post.createdAt)}</span>
                  <span className="text-[11px] text-[#60cdff] hover:underline lowercase">{category}</span>
                </div>

                <h4 className="font-bold text-xs sm:text-[13px] text-white/90 group-hover:text-[#60cdff] leading-snug transition-colors line-clamp-2">
                  {post.title}
                </h4>
              </article>
            );
          })}
        </div>
      </section>

      {/* Widget 2: Etiketler (#Label01) */}
      <section aria-label="Etiketler" className="space-y-3 pt-2">
        
        {/* Başlık: Hedef İkonu + Etiketler + Çizgi Butonlar (.car-nav) */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <TagBloggerIcon className="w-4 h-4 text-[#60cdff]" />
            <h2 className="text-[1.15rem] font-bold text-white tracking-wide">
              Etiketler
            </h2>
          </div>

          {/* Blogger Çizgi Navigasyon Butonları */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollTags('left')}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                tagCanScrollLeft 
                  ? 'w-6 bg-[#60cdff] shadow-[0_0_6px_rgba(96,205,255,0.6)] cursor-pointer' 
                  : 'w-4 bg-white/20 opacity-40 cursor-default'
              }`}
              title="Önceki Etiketler"
              aria-label="Önceki Etiketler"
            />
            <button
              onClick={() => scrollTags('right')}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                tagCanScrollRight 
                  ? 'w-6 bg-[#60cdff] shadow-[0_0_6px_rgba(96,205,255,0.6)] cursor-pointer' 
                  : 'w-4 bg-white/20 opacity-40 cursor-default'
              }`}
              title="Sonraki Etiketler"
              aria-label="Sonraki Etiketler"
            />
          </div>
        </div>

        {/* Yatay Kayar Etiket Çipleri (.lbL - Fareyle Çekilebilir / Dokunmatik) */}
        <div 
          ref={tagsTrackRef}
          onScroll={checkTagScroll}
          onMouseDown={handleTagsMouseDown}
          onMouseMove={handleTagsMouseMove}
          onMouseUp={handleTagsMouseUpOrLeave}
          onMouseLeave={handleTagsMouseUpOrLeave}
          className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar scroll-smooth cursor-grab active:cursor-grabbing select-none"
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#252526] hover:bg-[#2d2d30] text-[#d4d4d4] hover:text-[#60cdff] border border-transparent text-xs font-medium transition-all shrink-0 active:scale-95 shadow-sm cursor-pointer"
              >
                <span>{t.name}</span>
                <span className="text-[10px] text-[#71717a] font-mono px-1.5 py-0.2 rounded-md bg-[#1e1e1e]">({count})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Widget 3: Bize Ulaşın (#ContactForm2) */}
      <section aria-label="Bize Ulaşın" className="rounded-xl bg-[#252526] p-4 space-y-3.5 shadow-sm border border-transparent">
        
        <div className="flex items-center gap-2 border-b border-[#333333] pb-2">
          <ChatBloggerIcon className="w-4 h-4 text-[#60cdff]" />
          <h2 className="text-sm font-bold text-white tracking-wide">
            Bize Ulaşın
          </h2>
        </div>

        {sentSuccess ? (
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs text-center font-medium">
            Mesajınız başarıyla iletildi! Teşekkür ederiz.
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-2.5">
            <div>
              <input
                type="text"
                placeholder="İsim"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#1e1e1e] border border-transparent focus:border-[#60cdff]/50 text-white text-xs outline-none transition-colors"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="E-posta *"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#1e1e1e] border border-transparent focus:border-[#60cdff]/50 text-white text-xs outline-none transition-colors"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Mesajınız *"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Tab') {
                    e.stopPropagation();
                    if (!e.shiftKey) {
                      e.preventDefault();
                      const submitBtn = e.currentTarget.form?.querySelector<HTMLButtonElement>('button[type="submit"]');
                      if (submitBtn) submitBtn.focus();
                    } else {
                      e.preventDefault();
                      const emailInput = e.currentTarget.form?.querySelector<HTMLInputElement>('input[type="email"]');
                      if (emailInput) emailInput.focus();
                    }
                  }
                }}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-[#1e1e1e] border border-transparent focus:border-[#60cdff]/50 text-white text-xs outline-none transition-colors resize-y min-h-[80px] max-h-[320px]"
                required
              />
            </div>
            <button
              type="submit"
              onKeyDown={(e) => {
                if (e.key === 'Tab' && e.shiftKey) {
                  e.stopPropagation();
                  e.preventDefault();
                  const txt = e.currentTarget.form?.querySelector<HTMLTextAreaElement>('textarea');
                  if (txt) txt.focus();
                }
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-lg bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#7dd3fc] hover:to-[#38bdf8] text-[#0f172a] font-bold text-xs shadow-md shadow-sky-500/20 active:scale-98 transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Gönder</span>
            </button>
          </form>
        )}
      </section>

    </div>
  );

  return (
    <>
      {/* 1. Masaüstü Sağ Bar: Sayfayla Birlikte Kayar! (Ayrı kaydırma çubuğu YOK) */}
      <div className="w-full hidden lg:block">
        {content}
      </div>

      {/* 2. Mobil / Tablet Sağ Çekmece */}
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={onCloseDrawer}
          />
          <div className="relative w-80 max-w-[85vw] h-full bg-[#1e1e1e] border-l border-[#252526] shadow-2xl p-4 overflow-y-auto z-10 animate-in slide-in-from-right duration-300">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
