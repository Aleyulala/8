import React, { useState, useEffect } from 'react';
import { Plus, ArrowUp, Search, Folder, Sparkles } from 'lucide-react';

interface FloatingMenuProps {
  onOpenNewLink: () => void;
  onOpenSearch: () => void;
  onOpenCollections: () => void;
}

export const FloatingMenu: React.FC<FloatingMenuProps> = ({
  onOpenNewLink,
  onOpenSearch,
  onOpenCollections
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed z-40 bottom-18 md:bottom-8 right-4 md:right-7 flex flex-col-reverse items-center gap-2.5 select-none">
      
      {/* Primary Floating Action Button: + Yeni Link */}
      <div className="relative group">
        <button
          onClick={onOpenNewLink}
          aria-label="Yeni Link Ekle"
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#38bdf8] to-[#0284c7] text-[#0f172a] hover:text-white flex items-center justify-center shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/40 hover:-translate-y-1 active:scale-95 transition-all duration-200"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>

        {/* Tooltip Label (Median UI aria-label effect) */}
        <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#1f1f1f] text-neutral-200 border border-[#383838] text-xs font-medium shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150">
          Yeni Link Ekle
        </span>
      </div>

      {/* Floating Action 2: Hızlı Arama */}
      <div className="relative group">
        <button
          onClick={onOpenSearch}
          aria-label="Hızlı Arama"
          className="w-10 h-10 rounded-full bg-[#262626] hover:bg-[#38bdf8] text-[#a3a3a3] hover:text-[#0f172a] border border-[#3e3e3e] hover:border-[#38bdf8] flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-200"
        >
          <Search className="w-4 h-4 stroke-[2]" />
        </button>

        <span className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#1f1f1f] text-neutral-200 border border-[#383838] text-xs font-medium shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150">
          Hızlı Arama
        </span>
      </div>

      {/* Floating Action 3: Koleksiyonlar */}
      <div className="relative group">
        <button
          onClick={onOpenCollections}
          aria-label="Koleksiyonlar"
          className="w-10 h-10 rounded-full bg-[#262626] hover:bg-[#38bdf8] text-[#a3a3a3] hover:text-[#0f172a] border border-[#3e3e3e] hover:border-[#38bdf8] flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-200"
        >
          <Folder className="w-4 h-4 stroke-[2]" />
        </button>

        <span className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#1f1f1f] text-neutral-200 border border-[#383838] text-xs font-medium shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150">
          Koleksiyonlar
        </span>
      </div>

      {/* Floating Action 4: Sayfa Başına Çık (Top Scroll) */}
      <div className="relative group">
        <button
          onClick={handleScrollTop}
          aria-label="Yukarı Çık"
          className="w-10 h-10 rounded-full bg-[#262626] hover:bg-[#38bdf8] text-[#a3a3a3] hover:text-[#0f172a] border border-[#3e3e3e] hover:border-[#38bdf8] flex items-center justify-center shadow-md hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-200"
        >
          <ArrowUp className="w-4 h-4 stroke-[2]" />
        </button>

        <span className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#1f1f1f] text-neutral-200 border border-[#383838] text-xs font-medium shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150">
          Yukarı Çık
        </span>
      </div>

    </div>
  );
};
