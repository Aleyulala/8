import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
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

// 1:1 Blogger Plus UI CDN Görselleri (theme-1915278968279215939.xml) & Yaratıcı Özgün İsimlendirmeler
export const BLOGGER_SLIDES: BloggerSlide[] = [
  {
    id: 'Image07',
    title: 'Geliştirici Üssü & Kod Matriksi',
    subtitle: 'Algoritmalar, Açık Kaynak, Frontend & Backend Kütüphaneleri',
    note: '*Küratörlü kod ve programlama kaynakları',
    category: 'Kod Matriksi & Yazılım',
    collectionName: 'Programlama',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgF8vYmvLlvRBlmdF6YJRet5gFmVCLD_SrBR7NnVQfGWEuv2gYxOspqJsDCIpZin-9T0Dt67nR30elX14Z5RqjthtGOF7PGEp_YYqGCrAXVG3gv5UoZEVSX6G2Rpcj_aS_hpDllSw1XiaBosuosiLgQcbvpMs_3EkBbCgwkqFl7mX81SG9-Fo7SWcrkpwg/s1600/PROGRAMLAMA.png',
    link: 'https://negronshow.blogspot.com/search/label/programlama'
  },
  {
    id: 'Image02',
    title: 'Sinematik Akış & Medya Evreni',
    subtitle: 'YouTube Seçkileri, Belgeseller, Kurgu ve Sinema Dünyası',
    note: '*Seçkin video kanalları ve medya listeleri',
    category: 'Sinematik & Görsel Evren',
    collectionName: 'Medya',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiSKzV87LjbkzyY7_f4xkJgyJJYA7UgnG49mbYsoY0lytIDbarcYdSCwpZgzEkfrg3Z0fOCbrc5-sMG7Z1VuN56XAzQplqhv_FYEJM_bdylIwe8iBAHosimgXeie7HliX7oeKVlUlp69nnas1icedpQ9yXviN0TGCSa3t2tUmsqB8sl-UdVtjkVyeB_i7Q/s1600/V%C4%B0DEOLAR.png',
    link: 'https://negronshow.blogspot.com/search/label/videolar'
  },
  {
    id: 'Image03',
    title: 'Piksel Krallığı & Gaming Lab',
    subtitle: 'Retro Emülasyon, İndie Keşifler, Boss Rehberleri ve Arşivler',
    note: '*Oyun arşivleri ve kaynak bağlantıları',
    category: 'Piksel Krallığı & Gaming',
    collectionName: 'Oyun',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSWxLj44ddaJRjyvFa_voMNmhFtwce0fTu1bvgfGtjRPKKqChsUfKr-j__rhuzpWcw4OzxqvBuW3EcDEBorhY4pP3JAIJuOOxGLgXSGNy2fLwoZsRArtrXJfzQcBjKxNVNX6s_Dws6yC0QW5x8IkJ8n7njbP67EsTFAphF8XHTbD8hQiXXfe5GJg03DEI/s1600/Gemini_Generated_Image_sohk87sohk87sohk.png',
    link: 'https://negronshow.blogspot.com/search/label/oyun'
  },
  {
    id: 'Image04',
    title: 'PC Master & Sistem Odası',
    subtitle: 'Linux & Windows Terminal Araçları, Donanım Tweakleri ve Masaüstü',
    note: '*Masaüstü ve sistem araçları deposu',
    category: 'Donanım & Çekirdek Gücü',
    collectionName: 'Araçlar',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhUZ_PKRSbWxMvZs1kdwI6OixvQxD_wuakjQG_rsbTWJJnlTdWrmgYUWSIrq60xjZ8ozybnqtU7YL7FroX0CJAxbkRzVgX1knztw_dlqWb3ksWBqgjOt45fqBKIl2fM8jOtpJvbT_IS5r9KxLmQupXecIxHgspIH98XV-Um3UvAk4BfwRGxFmszXNaJ9To/s1600/Gemini_Generated_Image_sohk87sohk87sohk(1).png',
    link: 'https://negronshow.blogspot.com/search/label/bilgisayar'
  },
  {
    id: 'Image05',
    title: 'Siber Ufuk & Yapay Zeka Laboratuvarı',
    subtitle: 'Büyük Dil Modelleri, Sinir Ağları ve Yeni Nesil Otomasyon',
    note: '*Yapay zeka ve teknoloji yer imleri',
    category: 'Siber Ufuk & Yapay Zeka',
    collectionName: 'AI',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFRjK0CU38NgZbK3aIriUnxoABDo6AxOn9pC0pFAvAsPPGney_YlATfM4o3MqtpIs-5oyovNgjK_nxfxntK2b7DQb910PS4O9fvbW7806WyrhLQyih5eSG8KDLzXjBG8_4ad1x8uK3pbFzGN0Oz28Jiki4hhU39jrrKI379ycHwcuLnJfXC5QvhBSkvgE/s1600/Gemini_Generated_Image_sohk87sohk87sohk.png',
    link: 'https://negronshow.blogspot.com/search/label/teknoloji'
  },
  {
    id: 'Image06',
    title: 'Cep Boyutunda Teknoloji',
    subtitle: 'Android & iOS İpuçları, Taşınabilir Güç ve Web Uygulamaları',
    note: '*Mobil platform rehberleri',
    category: 'Mobil İstasyon & Akıllı Ekosistem',
    collectionName: 'Web Uygulamaları',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEivnlwOLGKKLdJFSiQ1ThHSiJUsFC0-ERcNO78bww7tCtZD6tACSxBEoeXxHkibbp_oADn5FfmdcLE45TEgsEDD6egDUVSOayvys_mlcb0rFsWwXRBMhxDhVKulw61grV229AwcQWtuT1xvWXSYf60nquXSKp1_MRxJK3LzACjCMyXnjn56wTyzl-d58QI/s1600/Gemini_Generated_Image_sohk87sohk87sohk(1).png',
    link: 'https://negronshow.blogspot.com/search/label/telefon'
  },
  {
    id: 'Image01',
    title: 'Fikir Atölyesi & Serbest Kürsü',
    subtitle: 'Günlük Rutinler, İlham Verici Okumalar ve Yaşam Notları',
    note: '*Günlük rutin ve yaşam bağlantıları',
    category: 'Fikir Atölyesi & Serbest Kürsü',
    collectionName: 'Routine',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEid3ulPqvwn4qV0yInmRpfMDy3kpxMdqHKAwuzx4CJQkhHk3RtNOTp6B9mLVF6nZD-Mzp18ovK72f7h2mTdLhvZ-vCVPZ0Q7WPBSgb3zhw-T27GRao9Fpc5OVy0DtMQtW7OKE3ufzPKXHMjCuC00hs-7wiVfcQNDyiChRsXb7pZw9aeFgzy9IDFx-2-Uxk/s1600/KONU%20DI%C5%9EI.png',
    link: 'https://negronshow.blogspot.com/search/label/%C3%B6neri'
  },
  {
    id: 'Image08',
    title: 'Salon Sineması & Smart TV',
    subtitle: 'Streaming Ağları, 4K HDR İçerikler ve Akıllı TV İpuçları',
    note: '*Televizyon ve ev eğlence teknolojileri',
    category: 'Salon Sineması & Smart TV',
    collectionName: 'Medya',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjGZfy1pqBQeulkRZyZvd39QXGL0rFaLA5-cLcuh3hwUa_bpYVLnEInF8DjdJBobSv7yVvtpmaswZ0TNsIDjgoHuV5XFGS6bNHMNuxXeaIY3epNR9k7mTgCuE5z_-fAR5kAuRCEAm76vHDXjsDpHgry0dgSwSU6G4Rd-6GJXonx_oODBjVvJH6AdjQ0Vbk/s1600/Gemini_Generated_Image_sohk87sohk87sohk(2).png',
    link: 'https://negronshow.blogspot.com/search/label/televizyon'
  },
  {
    id: 'Image09',
    title: 'Görsel Sanatlar & Dijital Estetik',
    subtitle: 'Tipografi, Vektörel Tasarım, UI/UX İlkeleri ve Estetik Portföy',
    note: '*Dijital sanat ve estetik portfolyolar',
    category: 'Yaratıcı Stüdyo & Dijital Estetik',
    collectionName: 'Genel',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvoxByJKU4Xi2DZnLz9GLEo56pBlXb1iRmTtWji4ymw7CWCH3QFkYoKdJoe6NzjXwbY52_DhDsi4JLnU562wMcwyiym4Wefawa29ILzbIuykdT0LbT9WlDAlszTuiClEmhlOKz33T5EI2FuurF_tKhMFJeQ2j0iRiyRWplTsozAHGH1wiYTplJ-JQouH8/s1600/Gemini_Generated_Image_sohk87sohk87sohk.png',
    link: 'https://negronshow.blogspot.com/search/label/sanat'
  },
  {
    id: 'Image10',
    title: 'Finans, Kripto & E-Ticaret Üssü',
    subtitle: 'E-Ticaret Modelleri, Kripto Piyasaları ve Dijital Gelir Kanalları',
    note: '*Finans ve e-ticaret araçları',
    category: 'Dijital Ekonomi & Pazar Yeri',
    collectionName: 'Alışveriş',
    imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEijCrS96aJNu-AnY6tH7wXJe1Uk5z95Nypyy6gzaJTAA0AkTWDz3Ul6_vT2Yb9DY2SOVk08ONFOrOX4iCKAVAeW395wNCPNftHnxejfy7CCE2ypfcXQ4z32KTBY-aZsyMndd6kUMsYUyxGo1Sx2M23LliSEZn4mqIeXEMFbBMAN0bsmI4OOb9kkGL51OgU/s1600/Gemini_Generated_Image_sohk87sohk87sohk(1).png',
    link: 'https://aleyulala.blogspot.com/search/label/ticaret'
  }
];

const FALLBACK_BANNER = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEid3ulPqvwn4qV0yInmRpfMDy3kpxMdqHKAwuzx4CJQkhHk3RtNOTp6B9mLVF6nZD-Mzp18ovK72f7h2mTdLhvZ-vCVPZ0Q7WPBSgb3zhw-T27GRao9Fpc5OVy0DtMQtW7OKE3ufzPKXHMjCuC00hs-7wiVfcQNDyiChRsXb7pZw9aeFgzy9IDFx-2-Uxk/s1600/KONU%20DI%C5%9EI.png';

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
              {/* Wallpaper Image (Responsive Blogger CDN Banner with graceful fallback) */}
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 ease-out"
                loading={idx === 0 ? 'eager' : 'lazy'}
                draggable={false}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== FALLBACK_BANNER) {
                    target.src = FALLBACK_BANNER;
                  }
                }}
              />

              {/* Gradient overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/15 pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black/35 to-transparent pointer-events-none" />
            </div>
          );
        })}

        {/* Top-Right: External Link (.sldL 1:1 XML) */}
        {activeSlide.link && (
          <a
            href={activeSlide.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-[#60cdff] border border-white/10 transition-colors shadow-md cursor-pointer"
            title={`${activeSlide.title} (Blogger Sayfası)`}
            aria-label="Etiket Sayfası"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}

        {/* Bottom-Left: Blogger Category Badge & Subtitle (.sldT 1:1 XML) */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 max-w-[75%] sm:max-w-[70%]">
          <button
            onClick={(e) => handleCategoryClick(e, activeSlide)}
            className="group/badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/75 hover:bg-black/90 backdrop-blur-md text-white text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 shadow-lg cursor-pointer border border-white/10"
            title={`${activeSlide.category} kategorisine git`}
          >
            <TagBloggerIcon className="w-3.5 h-3.5 text-[#60cdff]" />
            <span className="tracking-wide">
              {activeSlide.category}
            </span>
          </button>
          {activeSlide.subtitle && (
            <p className="hidden sm:block text-[11px] sm:text-xs text-white/85 mt-1 line-clamp-1 drop-shadow font-medium pl-0.5">
              {activeSlide.subtitle}
            </p>
          )}
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
