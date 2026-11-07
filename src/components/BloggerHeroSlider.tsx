import React, { useState, useEffect, useRef } from 'react';
import { CollectionItem } from '../types';
import { TagBloggerIcon } from './BloggerIcons';

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
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image03',
    title: 'Oyun',
    subtitle: 'Gaming, Oyun Rehberleri, İpuçları ve Emülasyon',
    note: '*Oyun arşivleri ve kaynak bağlantıları',
    category: 'Oyun',
    collectionName: 'Oyun',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image04',
    title: 'Bilgisayar',
    subtitle: 'Sistem Yardımcıları, Donanım, Bulut ve Masaüstü Yazılımları',
    note: '*Masaüstü ve sistem araçları deposu',
    category: 'Bilgisayar',
    collectionName: 'Araçlar',
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image05',
    title: 'Teknoloji',
    subtitle: 'Yapay Zeka, Gelecek Trendleri, LLM Modelleri ve API’ler',
    note: '*Yapay zeka ve teknoloji yer imleri',
    category: 'Teknoloji',
    collectionName: 'AI',
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image06',
    title: 'Telefon',
    subtitle: 'Mobil Ekosistem, Android & iOS Uygulamaları ve Tweaks',
    note: '*Mobil platform rehberleri',
    category: 'Telefon',
    collectionName: 'Web Uygulamaları',
    imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image02',
    title: 'Videolar',
    subtitle: 'Medya, YouTube Kanalları, Sinema ve Görsel Sanatlar',
    note: '*Seçkin video kanalları ve oynatma listeleri',
    category: 'Videolar',
    collectionName: 'Medya',
    imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image01',
    title: 'Konu Dışı',
    subtitle: 'Günlük Yaşam, Verimlilik, Okumalar ve Düşünceler',
    note: '*Günlük rutin ve yaşam bağlantıları',
    category: 'Konu Dışı',
    collectionName: 'Rutin',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image08',
    title: 'Televizyon',
    subtitle: 'Smart TV, Yayın Servisleri, Ekran ve Ev Sinema Sistemleri',
    note: '*Televizyon ve ev eğlence teknolojileri',
    category: 'Televizyon',
    collectionName: 'Medya',
    imageUrl: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image09',
    title: 'Sanat',
    subtitle: 'Tasarım, UI/UX, Yaratıcı Varlıklar ve Dijital Görsel Estetik',
    note: '*Dijital sanat ve estetik portfolyolar',
    category: 'Sanat',
    collectionName: 'Genel',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1920&q=85'
  },
  {
    id: 'Image10',
    title: 'Ticaret',
    subtitle: 'E-Ticaret, Finansal Veriler, Pazaryeri ve Analizler',
    note: '*Finans ve e-ticaret araçları',
    category: 'Ticaret',
    collectionName: 'Alışveriş',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1920&q=85'
  }
];

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=85';

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

  // Mouse Drag handlers for desktop
  const mouseStartX = useRef<number | null>(null);
  const isMouseDown = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    isMouseDown.current = true;
    mouseStartX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || mouseStartX.current === null) return;
    const diff = mouseStartX.current - e.clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) handleNext();
      else handlePrev();
      isMouseDown.current = false;
      mouseStartX.current = null;
    }
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    mouseStartX.current = null;
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
        className="relative w-full overflow-hidden rounded-lg bg-[#18181b] shadow-md group aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.4/1] cursor-grab active:cursor-grabbing touch-pan-y"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          handleMouseUp();
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
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
                draggable={false}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== FALLBACK_IMAGE) {
                    target.src = FALLBACK_IMAGE;
                  }
                }}
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
            <TagBloggerIcon className="w-3.5 h-3.5 text-[var(--linkC,#9aa0a6)]" />
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
                : 'w-9 sm:w-10 bg-[var(--linkC,#9aa0a6)] shadow-[0_0_10px_var(--linkC,#9aa0a6)]'
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
                : 'w-9 sm:w-10 bg-[var(--linkC,#9aa0a6)] shadow-[0_0_10px_var(--linkC,#9aa0a6)]'
            }`}
            aria-label="Sonraki Çizgi Buton"
            title="Sonraki Slayt"
          />
        </div>

      </div>
    </div>
  );
};
