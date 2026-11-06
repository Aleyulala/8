import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { CollectionItem } from '../types';

export interface BloggerSlide {
  id: string;
  title: string;
  subtitle?: string;
  note?: string;
  category: string;
  collectionName?: string;
  imageUrl: string;
  link?: string;
}

export const BLOGGER_SLIDES: BloggerSlide[] = [
  {
    id: 'Image07',
    title: 'Programlama',
    subtitle: 'Programming, Programlama, Programmierung, Programmation,',
    note: '*Unlimited AI generations until Jan 31 2026',
    category: 'Programlama',
    collectionName: 'Programlama',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgF8vYmvLlvRBlmdF6YJRet5gFmVCLD_SrBR7NnVQfGWEuv2gYxOspqJsDCIpZin-9T0Dt67nR30elX14Z5RqjthtGOF7PGEp_YYqGCrAXVG3gv5UoZEVSX6G2Rpcj_aS_hpDllSw1XiaBosuosiLgQcbvpMs_3EkBbCgwkqFl7mX81SG9-Fo7SWcrkpwg/s1600/PROGRAMLAMA.png'
  },
  {
    id: 'Image03',
    title: 'Oyun',
    subtitle: 'Gaming, Oyunlar, Spiele, Jeux, Video Games & Guides',
    note: '*Online gaming archives & resources',
    category: 'Oyun',
    collectionName: 'Oyun',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSWxLj44ddaJRjyvFa_voMNmhFtwce0fTu1bvgfGtjRPKKqChsUfKr-j__rhuzpWcw4OzxqvBuW3EcDEBorhY4pP3JAIJuOOxGLgXSGNy2fLwoZsRArtrXJfzQcBjKxNVNX6s_Dws6yC0QW5x8IkJ8n7njbP67EsTFAphF8XHTbD8hQiXXfe5GJg03DEI/s1600/Gemini_Generated_Image_sohk87sohk87sohk.png'
  },
  {
    id: 'Image04',
    title: 'Bilgisayar',
    subtitle: 'Software, Hardware, System Utilities & Cloud',
    note: '*Desktop & Mobile tools repository',
    category: 'Bilgisayar',
    collectionName: 'Araçlar',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhUZ_PKRSbWxMvZs1kdwI6OixvQxD_wuakjQG_rsbTWJJnlTdWrmgYUWSIrq60xjZ8ozybnqtU7YL7FroX0CJAxbkRzVgX1knztw_dlqWb3ksWBqgjOt45fqBKIl2fM8jOtpJvbT_IS5r9KxLmQupXecIxHgspIH98XV-Um3UvAk4BfwRGxFmszXNaJ9To/s1600/Gemini_Generated_Image_sohk87sohk87sohk(1).png'
  },
  {
    id: 'Image05',
    title: 'Teknoloji',
    subtitle: 'Artificial Intelligence, Tech Trends, Models & APIs',
    note: '*Cutting-edge tech bookmarks & curated links',
    category: 'Teknoloji',
    collectionName: 'AI',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFRjK0CU38NgZbK3aIriUnxoABDo6AxOn9pC0pFAvAsPPGney_YlATfM4o3MqtpIs-5oyovNgjK_nxfxntK2b7DQb910PS4O9fvbW7806WyrhLQyih5eSG8KDLzXjBG8_4ad1x8uK3pbFzGN0Oz28Jiki4hhU39jrrKI379ycHwcuLnJfXC5QvhBSkvgE/s1600/Gemini_Generated_Image_sohk87sohk87sohk.png'
  },
  {
    id: 'Image06',
    title: 'Telefon',
    subtitle: 'Mobile Devices, Apps, Firmware & Tweaks',
    note: '*Mobile applications & guides',
    category: 'Telefon',
    collectionName: 'Web Uygulamaları',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEivnlwOLGKKLdJFSiQ1ThHSiJUsFC0-ERcNO78bww7tCtZD6tACSxBEoeXxHkibbp_oADn5FfmdcLE45TEgsEDD6egDUVSOayvys_mlcb0rFsWwXRBMhxDhVKulw61grV229AwcQWtuT1xvWXSYf60nquXSKp1_MRxJK3LzACjCMyXnjn56wTyzl-d58QI/s1600/Gemini_Generated_Image_sohk87sohk87sohk(1).png'
  },
  {
    id: 'Image02',
    title: 'Videolar',
    subtitle: 'Streaming, YouTube, Channels & Video Media',
    note: '*Curated video channels & playlists',
    category: 'Videolar',
    collectionName: 'Medya',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiSKzV87LjbkzyY7_f4xkJgyJJYA7UgnG49mbYsoY0lytIDbarcYdSCwpZgzEkfrg3Z0fOCbrc5-sMG7Z1VuN56XAzQplqhv_FYEJM_bdylIwe8iBAHosimgXeie7HliX7oeKVlUlp69nnas1icedpQ9yXviN0TGCSa3t2tUmsqB8sl-UdVtjkVyeB_i7Q/s1600/V%C4%B0DEOLAR.png'
  },
  {
    id: 'Image01',
    title: 'Konu Dışı',
    subtitle: 'General Discussion, News, Daily Routine & Ideas',
    note: '*Daily life & recommendation links',
    category: 'Konu Dışı',
    collectionName: 'Routine',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEid3ulPqvwn4qV0yInmRpfMDy3kpxMdqHKAwuzx4CJQkhHk3RtNOTp6B9mLVF6nZD-Mzp18ovK72f7h2mTdLhvZ-vCVPZ0Q7WPBSgb3zhw-T27GRao9Fpc5OVy0DtMQtW7OKE3ufzPKXHMjCuC00hs-7wiVfcQNDyiChRsXb7pZw9aeFgzy9IDFx-2-Uxk/s1600/KONU%20DI%C5%9EI.png'
  },
  {
    id: 'Image08',
    title: 'Televizyon',
    subtitle: 'Smart TV, Streaming Platforms, IPTV & Displays',
    note: '*Television & entertainment tech',
    category: 'Televizyon',
    collectionName: 'Medya',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjGZfy1pqBQeulkRZyZvd39QXGL0rFaLA5-cLcuh3hwUa_bpYVLnEInF8DjdJBobSv7yVvtpmaswZ0TNsIDjgoHuV5XFGS6bNHMNuxXeaIY3epNR9k7mTgCuE5z_-fAR5kAuRCEAm76vHDXjsDpHgry0dgSwSU6G4Rd-6GJXonx_oODBjVvJH6AdjQ0Vbk/s1600/Gemini_Generated_Image_sohk87sohk87sohk(2).png'
  },
  {
    id: 'Image09',
    title: 'Sanat',
    subtitle: 'Art, Design, UI/UX, Creative Tools & Aesthetics',
    note: '*Digital art and creative assets',
    category: 'Sanat',
    collectionName: 'Genel',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvoxByJKU4Xi2DZnLz9GLEo56pBlXb1iRmTtWji4ymw7CWCH3QFkYoKdJoe6NzjXwbY52_DhDsi4JLnU562wMcwyiym4Wefawa29ILzbIuykdT0LbT9WlDAlszTuiClEmhlOKz33T5EI2FuurF_tKhMFJeQ2j0iRiyRWplTsozAHGH1wiYTplJ-JQouH8/s1600/Gemini_Generated_Image_sohk87sohk87sohk.png'
  },
  {
    id: 'Image10',
    title: 'Ticaret',
    subtitle: 'E-Commerce, Marketplace, Finance & Deals',
    note: '*Shopping and financial resources',
    category: 'Ticaret',
    collectionName: 'Alışveriş',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijCrS96aJNu-AnY6tH7wXJe1Uk5z95Nypyy6gzaJTAA0AkTWDz3Ul6_vT2Yb9DY2SOVk08ONFOrOX4iCKAVAeW395wNCPNftHnxejfy7CCE2ypfcXQ4z32KTBY-aZsyMndd6kUMsYUyxGo1Sx2M23LliSEZn4mqIeXEMFbBMAN0bsmI4OOb9kkGL51OgU/s1600/Gemini_Generated_Image_sohk87sohk87sohk(1).png'
  }
];

interface BloggerHeroSliderProps {
  collections?: CollectionItem[];
  onSelectCollection?: (id: number) => void;
  onFilterTag?: (tag: string) => void;
}

export const BloggerHeroSlider: React.FC<BloggerHeroSliderProps> = ({
  collections = [],
  onSelectCollection,
  onFilterTag
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const activeSlide = BLOGGER_SLIDES[currentIndex];

  // Auto next slide every 5 seconds (as per Blogger data-auto-next-in)
  useEffect(() => {
    if (isPaused || isLightboxOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BLOGGER_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, isLightboxOpen]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + BLOGGER_SLIDES.length) % BLOGGER_SLIDES.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % BLOGGER_SLIDES.length);
  };

  const handleCategoryClick = (e: React.MouseEvent, slide: BloggerSlide) => {
    e.stopPropagation();
    if (onSelectCollection && slide.collectionName) {
      const match = collections.find(c => 
        c.name.toLowerCase() === slide.collectionName?.toLowerCase() ||
        c.name.toLowerCase().includes(slide.category.toLowerCase())
      );
      if (match && match.id) {
        onSelectCollection(match.id);
        return;
      }
    }
    if (onFilterTag) {
      onFilterTag(slide.category.toLowerCase());
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <>
      {/* Plus UI 3.0.0 Main Carousel Container (.sldW) */}
      <div 
        className="relative w-full rounded-2xl overflow-hidden bg-[#18181b] border border-[#27272a] shadow-xl group select-none transition-all duration-300"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Aspect Ratio Container: 21:9 on desktop, 16:9 on tablet, 2:1 on mobile */}
        <div className="relative w-full aspect-[2/1] sm:aspect-[16/7] md:aspect-[21/9] min-h-[190px] sm:min-h-[240px] md:min-h-[290px] overflow-hidden">
          
          {/* Slides Track */}
          {BLOGGER_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Background Image (.sldI) */}
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />

                {/* Subtle dark gradient overlay for crystal clear contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20 pointer-events-none" />

                {/* Left Side Shadow to highlight any overlay text if needed */}
                <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
              </div>
            );
          })}

          {/* Top-Right: Fullscreen / Expand Lightbox Button */}
          <div className="absolute top-3.5 right-3.5 z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLightboxOpen(true);
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/55 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/90 hover:text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-md"
              title="Tam Ekran Görüntüle"
              aria-label="Tam Ekran"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Left Arrow Button (.sldP) - desktop hover */}
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/15 text-white/90 hover:text-white items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 active:scale-90 shadow-md"
            aria-label="Önceki Slayt"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button (.sldN) - desktop hover */}
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md border border-white/15 text-white/90 hover:text-white items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 active:scale-90 shadow-md"
            aria-label="Sonraki Slayt"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom-Left: Blogger Plus UI Category Badge (.sldT - e.g. "◎ Programlama") */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20">
            <button
              onClick={(e) => handleCategoryClick(e, activeSlide)}
              className="group/badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 shadow-lg"
              title={`${activeSlide.category} kategorisine git`}
            >
              <span className="text-white/80 group-hover/badge:text-[#60cdff] text-base leading-none font-bold">
                ◎
              </span>
              <span className="tracking-wide">
                {activeSlide.category}
              </span>
            </button>
          </div>

          {/* Bottom-Center: Blogger GitHub Saved Stili 2 Adet Çizgi Buton (.sld-car-nav) */}
          <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {/* Önceki Buton / Sol Çizgi */}
            <button
              onClick={handlePrev}
              className={`h-2 rounded-full transition-all duration-300 shadow-md backdrop-blur-md ${
                currentIndex % 2 === 0
                  ? 'w-7 sm:w-8 bg-white/40 hover:bg-white/60'
                  : 'w-9 sm:w-10 bg-[#60cdff] shadow-[0_0_10px_rgba(96,205,255,0.6)]'
              }`}
              aria-label="Önceki Çizgi Buton"
              title="Önceki Slayt"
            />
            {/* Sonraki Buton / Sağ Çizgi */}
            <button
              onClick={handleNext}
              className={`h-2 rounded-full transition-all duration-300 shadow-md backdrop-blur-md ${
                currentIndex % 2 === 1
                  ? 'w-7 sm:w-8 bg-white/40 hover:bg-white/60'
                  : 'w-9 sm:w-10 bg-[#60cdff] shadow-[0_0_10px_rgba(96,205,255,0.6)]'
              }`}
              aria-label="Sonraki Çizgi Buton"
              title="Sonraki Slayt"
            />
          </div>

          {/* Slayt Noktaları / Pagination Mini Dots (Mobile & Desktop) */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-auto">
            {BLOGGER_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(i);
                }}
                className={`transition-all duration-200 rounded-full ${
                  i === currentIndex
                    ? 'w-3 h-1 bg-white'
                    : 'w-1 h-1 bg-white/40 hover:bg-white/70'
                }`}
                title={`Slayt ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Modal Header */}
          <div className="w-full max-w-5xl flex items-center justify-between mb-3 text-white">
            <div className="flex items-center gap-2">
              <span className="text-[#60cdff] font-bold">◎</span>
              <span className="font-semibold text-lg">{activeSlide.category}</span>
              <span className="text-sm text-neutral-400 hidden sm:inline">— {activeSlide.title}</span>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Image */}
          <div 
            className="relative max-w-5xl w-full max-h-[80vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeSlide.imageUrl}
              alt={activeSlide.title}
              className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
            />

            {/* Left / Right Modal Nav */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md"
              aria-label="Önceki"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md"
              aria-label="Sonraki"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Footer Controls */}
          <div className="mt-4 flex items-center gap-4 text-neutral-400 text-xs sm:text-sm">
            <span>Slayt {currentIndex + 1} / {BLOGGER_SLIDES.length}</span>
            <button
              onClick={(e) => {
                setIsLightboxOpen(false);
                handleCategoryClick(e, activeSlide);
              }}
              className="flex items-center gap-1.5 text-[#60cdff] hover:underline"
            >
              <span>Kategoriye Git</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
