import React, { useRef, useState, useEffect } from 'react';
import { 
  PulseIcon, 
  CloseIcon,
  Verify1Icon
} from './BloggerIcons';
import { 
  Eye, 
  MessageSquare, 
  Bookmark, 
  Calendar, 
  Send,
  MessageCircle
} from 'lucide-react';
import { CollectionItem, LinkItem, TagItem } from '../types';

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

      {/* Widget 1: Popüler Post (#PopularPosts01) */}
      <section aria-label="Popüler Post" className="space-y-4">
        
        {/* Başlık: Pulse İkonu + Popüler Post */}
        <div className="flex items-center gap-2 pb-1">
          <PulseIcon className="w-4 h-4 text-white/90" />
          <h2 className="text-base font-bold text-white tracking-wide">
            Popüler Post
          </h2>
        </div>

        {/* 1. Öne Çıkan Büyük Popüler Post (#1) */}
        {featuredFirst && (
          <article
            onClick={() => {
              onOpenPostPage(featuredFirst);
              if (onCloseDrawer) onCloseDrawer();
            }}
            className="group rounded-2xl bg-[#252526] hover:bg-[#28282b] border border-[#383838] hover:border-[#60cdff]/60 p-3 transition-all duration-200 cursor-pointer shadow-md overflow-hidden space-y-3"
          >
            {/* Büyük Thumbnail */}
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#1e1e1e]">
              <img
                src={featuredFirst.thumbnail || "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJhv3IYtlwon8oo7nnuC9EM4IlJ51X4im6kgttJGrLqim12ty5I1Y6tzvfDBmbg6qQi_qxy09MCU8nzxIdc43r0TmL_1EyE_sCdhWAic2ImYAW6IT5A0Dm3MjBvzUgRcWpqNLPcdmq9E0h_9zycwiTK5Sz0E15FDZkXCHH_UzakSP3ln854_yxLhdS61ap/s1600/Gemini_Generated_Image_jpdg1njpdg1njpdg.jpg"}
                alt={featuredFirst.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/60 pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-2 left-2 z-10">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-md text-white text-[10px] font-medium border border-white/10">
                  <Eye className="w-3 h-3 text-[#60cdff]" />
                  <span>{featuredFirst.views || 74}</span>
                </div>
              </div>

              <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-md text-white text-[10px] font-medium border border-white/10">
                  <MessageSquare className="w-2.5 h-2.5 text-white/90" />
                  <span>{featuredFirst.commentsCount !== undefined ? featuredFirst.commentsCount : 6}</span>
                </div>
                <div className="p-1 rounded-md bg-black/65 backdrop-blur-md text-white/80 border border-white/10">
                  <Bookmark className="w-3 h-3 fill-current text-amber-300" />
                </div>
              </div>

              <div className="absolute bottom-2 left-2 z-10">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white text-[10px] font-bold border border-white/15">
                  <span className="w-3 h-3 rounded-full bg-[#1e1e1e] flex items-center justify-center text-[7px] text-[#60cdff] font-extrabold">
                    A
                  </span>
                  <span>AI</span>
                  <Verify1Icon className="w-3 h-3 text-[#60cdff]" />
                </div>
              </div>
            </div>

            {/* Metin İçeriği */}
            <div className="space-y-1">
              <div className="text-[11px] text-[#9ca3af]">
                Ek 29 — {featuredFirst.tags[0] || 'videolar'}
              </div>

              <h3 className="font-bold text-sm text-white group-hover:text-[#60cdff] line-clamp-2 leading-snug transition-colors">
                #1 {featuredFirst.title}
              </h3>

              {featuredFirst.description && (
                <p className="text-xs text-[#989b9f] line-clamp-2 leading-relaxed pt-0.5">
                  {featuredFirst.description}
                </p>
              )}
            </div>
          </article>
        )}

        {/* 2. Liste Formatındaki Popüler Gönderiler (#2, #3, #4, #5) */}
        <div className="space-y-3 pt-1">
          {listPosts.map((post, idx) => {
            const rank = idx + 2;
            const category = post.tags[0] || 'oyun';
            return (
              <article
                key={post.id || idx}
                onClick={() => {
                  onOpenPostPage(post);
                  if (onCloseDrawer) onCloseDrawer();
                }}
                className="group cursor-pointer space-y-1 border-b border-[#2d2d30] pb-3 last:border-b-0 transition-colors"
              >
                <div className="text-[11px] text-[#71717a] font-medium">
                  {idx === 0 ? 'Ek 22 — ' : idx === 1 ? 'Ek 13 — ' : idx === 2 ? 'Ağu 23 — ' : 'Oca 26 — '}
                  <span className="text-[#9ca3af]">{category}</span>
                </div>

                <h4 className="font-semibold text-xs sm:text-sm text-white/90 group-hover:text-[#60cdff] leading-snug transition-colors line-clamp-2">
                  #{rank} {post.title}
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
            <span className="text-sm font-bold text-white leading-none">◎</span>
            <h2 className="text-base font-bold text-white tracking-wide">
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

        {/* Yatay Kayar Etiket Çipleri (.lbL) */}
        <div 
          ref={tagsTrackRef}
          onScroll={checkTagScroll}
          className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar scroll-smooth"
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#252526] hover:bg-[#333333] text-[#d4d4d4] hover:text-[#60cdff] border border-[#383838] hover:border-[#60cdff]/60 text-xs font-medium transition-all shrink-0 active:scale-95"
              >
                <span>{t.name}</span>
                <span className="text-[10px] text-[#71717a] font-mono">({count})</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Widget 3: Bize Ulaşın (#ContactForm2) */}
      <section aria-label="Bize Ulaşın" className="rounded-2xl bg-[#252526] border border-[#383838] p-4 space-y-3.5 shadow-sm">
        
        <div className="flex items-center gap-2 border-b border-[#333333] pb-2">
          <MessageCircle className="w-4 h-4 text-[#60cdff]" />
          <h2 className="text-sm font-bold text-white tracking-wide">
            Bize Ulaşın
          </h2>
        </div>

        {sentSuccess ? (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-medium">
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
                className="w-full px-3 py-2 rounded-xl bg-[#1e1e1e] border border-[#383838] focus:border-[#60cdff] text-white text-xs outline-none transition-colors"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="E-posta *"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#1e1e1e] border border-[#383838] focus:border-[#60cdff] text-white text-xs outline-none transition-colors"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Mesajınız *"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-xl bg-[#1e1e1e] border border-[#383838] focus:border-[#60cdff] text-white text-xs outline-none transition-colors resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-[#60cdff] hover:bg-[#38bdf8] text-[#0f172a] font-bold text-xs shadow-md shadow-sky-500/20 active:scale-98 transition-all cursor-pointer"
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
          <div className="relative w-80 max-w-[85vw] h-full bg-[#1e1e1e] border-l border-[#383838] shadow-2xl p-4 overflow-y-auto z-10 animate-in slide-in-from-right duration-300">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
