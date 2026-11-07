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

  // Nsone Bot Carousel Slider states
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [shakeStep, setShakeStep] = useState<number | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const msgInputRef = useRef<HTMLTextAreaElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

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

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const triggerShake = (step: number, errorText: string) => {
    setErrorMessage(errorText);
    setShakeStep(step);
    setTimeout(() => {
      setShakeStep(null);
    }, 350);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    setErrorMessage('');
    setTimeout(() => {
      if (step === 0) nameInputRef.current?.focus();
      else if (step === 1) emailInputRef.current?.focus();
      else if (step === 2) {
        if (msgInputRef.current) {
          msgInputRef.current.focus();
          msgInputRef.current.style.height = 'auto';
          const scrollH = msgInputRef.current.scrollHeight;
          const newH = Math.min(220, Math.max(48, scrollH));
          msgInputRef.current.style.height = `${newH}px`;
          msgInputRef.current.style.overflowY = scrollH > 220 ? 'auto' : 'hidden';
        }
      } else if (step === 3) {
        submitBtnRef.current?.focus();
      }
    }, 120);
  };

  const handleNext0 = () => {
    const n = contactName.trim();
    if (!n || n.length < 2) {
      triggerShake(0, 'Lütfen adınızı girin.');
      nameInputRef.current?.focus();
      return;
    }
    goToStep(1);
  };

  const handleNext1 = () => {
    const em = contactEmail.trim();
    if (!em || !validateEmail(em)) {
      triggerShake(1, 'Lütfen geçerli bir e-posta adresi girin.');
      emailInputRef.current?.focus();
      return;
    }
    goToStep(2);
  };

  const handleNext2 = () => {
    const msg = contactMessage.trim();
    if (!msg || msg.length < 2) {
      triggerShake(2, 'Lütfen mesajınızı yazın.');
      msgInputRef.current?.focus();
      return;
    }
    goToStep(3);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContactMessage(e.target.value);
    if (errorMessage) setErrorMessage('');
    const target = e.target;
    target.style.height = 'auto';
    const scrollH = target.scrollHeight;
    const newH = Math.min(220, Math.max(48, scrollH));
    target.style.height = `${newH}px`;
    target.style.overflowY = scrollH > 220 ? 'auto' : 'hidden';
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim()) {
      goToStep(0);
      triggerShake(0, 'Lütfen adınızı girin.');
      return;
    }
    if (!contactEmail.trim() || !validateEmail(contactEmail.trim())) {
      goToStep(1);
      triggerShake(1, 'Lütfen geçerli bir e-posta adresi girin.');
      return;
    }
    if (!contactMessage.trim()) {
      goToStep(2);
      triggerShake(2, 'Lütfen mesajınızı yazın.');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
      setTimeout(() => {
        setSentSuccess(false);
        setContactName('');
        setContactEmail('');
        setContactMessage('');
        setCurrentStep(0);
        setErrorMessage('');
      }, 3500);
    }, 600);
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

      {/* Widget 3: Bize Ulaşın (#ContactForm2) - Nsone Bot Carousel Slider */}
      <section aria-label="Bize Ulaşın" id="ContactForm2" className="rounded-2xl bg-[#252526] p-4 shadow-sm border border-white/5">
        
        {/* Nsone Bot Başlığı */}
        <div className="flex items-center gap-3 pb-3 border-b border-white/10 mb-3">
          <div className="relative w-10 h-10 rounded-full bg-[#60cdff]/20 border border-[#60cdff]/30 flex items-center justify-center text-[#60cdff] shrink-0">
            <ChatBloggerIcon className="w-5 h-5" />
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#252526] shadow-[0_0_8px_rgba(16,185,129,0.6)]"
              title="Çevrimiçi"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm leading-tight">Nsone Bot</span>
            <span className="text-emerald-400 text-[11px] font-medium leading-tight">Çevrimiçi</span>
          </div>
        </div>

        {/* Nsone Bot Tane Tane Mesaj Baloncukları */}
        <div className="flex flex-col gap-1.5 max-w-[96%] mb-3.5">
          <div className="rounded-[18px_18px_18px_4px] bg-white/[0.06] border border-white/10 p-2.5 px-3.5 text-xs text-slate-200 leading-relaxed shadow-sm">
            Merhaba! 👋
          </div>
          <div className="rounded-[4px_18px_18px_4px] bg-white/[0.06] border border-white/10 p-2.5 px-3.5 text-xs text-slate-200 leading-relaxed shadow-sm">
            Bir sorunuz, öneriniz veya mesajınız varsa lütfen aşağıdaki formu doldurarak bize iletin.
          </div>
          <div className="rounded-[4px_18px_18px_4px] bg-white/[0.06] border border-white/10 p-2.5 px-3.5 text-xs text-slate-200 leading-relaxed shadow-sm">
            <div>Size e-posta adresinizden en kısa sürede dönüş yapacağız.</div>
            <div className="flex items-center justify-end gap-1 text-[10px] text-white/50 mt-1">
              <span>Şimdi</span>
              <svg className="w-3.5 h-3.5 stroke-[#38bdf8] fill-none" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L7 17l-5-5M22 10l-7.5 7.5L13 16" />
              </svg>
            </div>
          </div>
        </div>

        {sentSuccess ? (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-xs text-center font-medium animate-in fade-in">
            Mesajınız başarıyla iletildi! En kısa sürede dönüş yapacağız.
          </div>
        ) : (
          <form onSubmit={handleContactSubmit}>
            <div className="ns-slider-container">
              {/* 0. Ad (İsim) Slaytı */}
              <div className={`ns-slide ${currentStep === 0 ? 'active' : currentStep > 0 ? 'passed' : ''} ${shakeStep === 0 ? 'ns-shake' : ''}`}>
                <div className="ns-input-wrap">
                  <input
                    ref={nameInputRef}
                    type="text"
                    value={contactName}
                    onChange={(e) => {
                      setContactName(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleNext0();
                      }
                    }}
                    placeholder=" "
                    autoComplete="name"
                  />
                  <label>İsim</label>
                </div>
                <button
                  type="button"
                  onClick={handleNext0}
                  className="ns-btn-next"
                  title="İleri"
                  aria-label="İleri"
                >
                  <svg viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

              {/* 1. E-posta Slaytı */}
              <div className={`ns-slide ${currentStep === 1 ? 'active' : currentStep > 1 ? 'passed' : ''} ${shakeStep === 1 ? 'ns-shake' : ''}`}>
                <div className="ns-input-wrap">
                  <input
                    ref={emailInputRef}
                    type="email"
                    value={contactEmail}
                    onChange={(e) => {
                      setContactEmail(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleNext1();
                      }
                    }}
                    placeholder=" "
                    autoComplete="email"
                  />
                  <label>E-posta</label>
                </div>
                <button
                  type="button"
                  onClick={handleNext1}
                  className="ns-btn-next"
                  title="İleri"
                  aria-label="İleri"
                >
                  <svg viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

              {/* 2. Mesaj Slaytı */}
              <div className={`ns-slide ns-slide-msg ${currentStep === 2 ? 'active' : currentStep > 2 ? 'passed' : ''} ${shakeStep === 2 ? 'ns-shake' : ''}`}>
                <div className="ns-input-wrap ns-msg-field">
                  <textarea
                    ref={msgInputRef}
                    rows={1}
                    value={contactMessage}
                    onChange={handleMessageChange}
                    onKeyDown={(e) => {
                      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                        e.preventDefault();
                        handleNext2();
                      }
                    }}
                    placeholder=" "
                  />
                  <label>Mesajınız</label>
                </div>
                <button
                  type="button"
                  onClick={handleNext2}
                  className="ns-btn-next"
                  title="İleri"
                  aria-label="İleri"
                >
                  <svg viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>

              {/* 3. Gönder Butonu Slaytı */}
              <div className={`ns-slide ${currentStep === 3 ? 'active' : ''} ${shakeStep === 3 ? 'ns-shake' : ''}`}>
                <button
                  ref={submitBtnRef}
                  type="submit"
                  disabled={isSending}
                  className="ns-btn-submit"
                >
                  <svg viewBox="0 0 24 24">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  <span>{isSending ? 'Gönderiliyor...' : 'Mesajı Gönder'}</span>
                </button>
              </div>
            </div>

            {/* Hata Bildirimi */}
            {errorMessage && (
              <div className="mt-2.5 p-2 rounded-lg bg-red-500/10 text-red-400 text-xs text-center font-medium">
                {errorMessage}
              </div>
            )}
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
