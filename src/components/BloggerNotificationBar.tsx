import React, { useState, useEffect, useRef } from 'react';
import { X, ExternalLink, MessageCircle } from 'lucide-react';
import { MatrixIcon } from './BloggerIcons';

export const BloggerNotificationBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const totalSlides = 2;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, 7000);
    return () => clearInterval(timer);
  }, [totalSlides, isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 35) {
      setActiveSlide((prev) => (prev + 1) % totalSlides);
    } else if (diff < -35) {
      setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
    touchStartX.current = null;
  };

  if (!isVisible) return null;

  return (
    <div className="w-full mb-4">
      <div 
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-[#252526] border border-transparent shadow-sm select-none min-h-[46px] touch-pan-y"
      >
        
        {/* Sol Kapat Butonu */}
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded-md text-[#9ca3af] hover:text-white hover:bg-[#333333] transition-colors shrink-0 cursor-pointer"
          title="Bildirimi Gizle"
          aria-label="Kapat"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Orta Slayt İçeriği (.bar-slider) */}
        <div className="flex-1 overflow-hidden flex items-center justify-center text-center">
          
          {/* SLAYT 0: ALİ & NSONE (Blogger XML 1:1 & Screenshot Birebir) */}
          {activeSlide === 0 && (
            <div className="ali-nsone-text-wrap inline-flex items-center justify-center gap-4 sm:gap-6 select-none animate-in fade-in duration-300">
              <a
                href="https://aleyulala.blogspot.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="ali-nsone-slide-btn font-extrabold text-[15px] sm:text-[16px] tracking-[6px] uppercase text-white hover:text-[var(--linkC,#9aa0a6)] transition-colors cursor-pointer"
                title="ALİ"
              >
                ALİ
              </a>
              <a
                href="https://aleyulala.github.io/saved/"
                className="ali-nsone-amp font-bold text-[15px] sm:text-[16px] text-[var(--linkC,#9aa0a6)] px-2 py-0.5 rounded-md hover:bg-white/10 transition-all cursor-pointer"
                title="ALİ &amp; NSONE"
              >
                &amp;
              </a>
              <a
                href="https://negronshow.blogspot.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="ali-nsone-slide-btn font-extrabold text-[15px] sm:text-[16px] tracking-[6px] uppercase text-white hover:text-[var(--linkC,#9aa0a6)] transition-colors cursor-pointer"
                title="NSONE"
              >
                NSONE
              </a>
            </div>
          )}

          {/* SLAYT 1: Element.io */}
          {activeSlide === 1 && (
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm animate-in fade-in duration-300">
              <a
                href="https://matrix.to/#/#negronn-show:matrix.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[var(--linkC,#9aa0a6)] hover:text-white hover:underline transition-colors font-semibold"
                title="Element.io"
              >
                <MatrixIcon className="w-3.5 h-3.5 text-[var(--linkC,#9aa0a6)]" />
                <span className="font-bold">Element.io</span>
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
            </div>
          )}

        </div>

        {/* Sağ 2 Çizgi Buton (.panel-slider-dots) */}
        <div className="flex items-center gap-1.5 shrink-0">
          {[0, 1].map((idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                activeSlide === idx
                  ? 'w-6 bg-[var(--linkC,#9aa0a6)] shadow-[0_0_6px_var(--linkC,#9aa0a6)]'
                  : 'w-3.5 bg-white/20 hover:bg-white/40'
              }`}
              title={`Slayt ${idx + 1}`}
              aria-label={`Slayt ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
