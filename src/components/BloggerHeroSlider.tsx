import React, { useState, useEffect, useRef } from 'react';
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
    subtitle: 'Programming, Kodlama, Geliştirici Araçları ve Algoritmalar',
    note: '*Küratörlü kod ve programlama kaynakları',
    category: 'Programlama',
    collectionName: 'Programlama',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image03',
    title: 'Oyun',
    subtitle: 'Gaming, Oyun Rehberleri, İpuçları ve Emülasyon',
    note: '*Oyun arşivleri ve kaynak bağlantıları',
    category: 'Oyun',
    collectionName: 'Oyun',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image04',
    title: 'Bilgisayar',
    subtitle: 'Sistem Yardımcıları, Donanım, Bulut ve Masaüstü Yazılımları',
    note: '*Masaüstü ve sistem araçları deposu',
    category: 'Bilgisayar',
    collectionName: 'Araçlar',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image05',
    title: 'Teknoloji',
    subtitle: 'Yapay Zeka, Gelecek Trendleri, LLM Modelleri ve API’ler',
    note: '*Yapay zeka ve teknoloji yer imleri',
    category: 'Teknoloji',
    collectionName: 'AI',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image06',
    title: 'Telefon',
    subtitle: 'Mobil Ekosistem, Android & iOS Uygulamaları ve Tweaks',
    note: '*Mobil platform rehberleri',
    category: 'Telefon',
    collectionName: 'Web Uygulamaları',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image02',
    title: 'Videolar',
    subtitle: 'Medya, YouTube Kanalları, Sinema ve Görsel Sanatlar',
    note: '*Seçkin video kanalları ve oynatma listeleri',
    category: 'Videolar',
    collectionName: 'Medya',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image01',
    title: 'Konu Dışı',
    subtitle: 'Günlük Yaşam, Verimlilik, Okumalar ve Düşünceler',
    note: '*Günlük rutin ve yaşam bağlantıları',
    category: 'Konu Dışı',
    collectionName: 'Routine',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image08',
    title: 'Televizyon',
    subtitle: 'Smart TV, Yayın Servisleri, Ekran ve Ev Sinema Sistemleri',
    note: '*Televizyon ve ev eğlence teknolojileri',
    category: 'Televizyon',
    collectionName: 'Medya',
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image09',
    title: 'Sanat',
    subtitle: 'Tasarım, UI/UX, Yaratıcı Varlıklar ve Dijital Görsel Estetik',
    note: '*Dijital sanat ve estetik portfolyolar',
    category: 'Sanat',
    collectionName: 'Genel',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1920&q=85'
  }
];

interface BloggerHeroSliderProps {
  collections?: CollectionItem[];
  onSelectCollection?: (id: number) => void;
  onFilterTag?: (tag: string) => void;
  onOpenMedia?: (slide: BloggerSlide) => void;
}

export const BloggerHeroSlider: React.FC<BloggerHeroSliderProps> = ({
  collections = [],
  onSelectCollection,
  onFilterTag,
  onOpenMedia
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const activeSlide = BLOGGER_SLIDES[currentIndex];

  // Auto-play interval
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BLOGGER_SLIDES.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + BLOGGER_SLIDES.length) % BLOGGER_SLIDES.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % BLOGGER_SLIDES.length);
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 40;

    if (diff > threshold) {
      handleNext();
    } else if (diff < -threshold) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Navigate to category/collection on click
  const handleCategoryClick = (e: React.MouseEvent, slide: BloggerSlide) => {
    e.stopPropagation();
    if (slide.collectionName && onSelectCollection && collections.length > 0) {
      const targetCol = collections.find(
        (c) => c.name.toLowerCase() === slide.collectionName?.toLowerCase()
      );
      if (targetCol && targetCol.id) {
        onSelectCollection(targetCol.id);
        return;
      }
    }
    if (onFilterTag) {
      onFilterTag(slide.category);
    }
  };

  return (
    <div className="w-full relative select-none">
      <div 
        className="relative w-full overflow-hidden rounded-lg bg-[#18181b] shadow-md group aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.4/1]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slides list */}
        {BLOGGER_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Wallpaper Image (Responsive, razor-sharp, cover) */}
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 ease-out"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* Gradient overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/15 pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/35 to-transparent pointer-events-none" />
            </div>
          );
        })}

        {/* Bottom-Left: Blogger Category Badge (.sldT - e.g. "◎ Programlama") */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20">
          <button
            onClick={(e) => handleCategoryClick(e, activeSlide)}
            className="group/badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 shadow-lg cursor-pointer"
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

        {/* Bottom-Center: Blogger Saved 2 Line Pills (.sld-car-nav) */}
        <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {/* Sol Çizgi Buton */}
          <button
            onClick={handlePrev}
            className={`h-2 rounded-full transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer ${
              currentIndex % 2 === 0
                ? 'w-7 sm:w-8 bg-white/40 hover:bg-white/60'
                : 'w-9 sm:w-10 bg-[#60cdff] shadow-[0_0_10px_rgba(96,205,255,0.6)]'
            }`}
            aria-label="Önceki Çizgi Buton"
            title="Önceki Slayt"
          />
          {/* Sağ Çizgi Buton */}
          <button
            onClick={handleNext}
            className={`h-2 rounded-full transition-all duration-300 shadow-md backdrop-blur-md cursor-pointer ${
              currentIndex % 2 === 1
                ? 'w-7 sm:w-8 bg-white/40 hover:bg-white/60'
                : 'w-9 sm:w-10 bg-[#60cdff] shadow-[0_0_10px_rgba(96,205,255,0.6)]'
            }`}
            aria-label="Sonraki Çizgi Buton"
            title="Sonraki Slayt"
          />
        </div>

      </div>
    </div>
  );
};
