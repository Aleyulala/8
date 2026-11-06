import React, { useState, useEffect, useRef } from 'react';
import { 
  MenuHamburgerIcon, 
  SearchNormalIcon, 
  CloseIcon, 
  SunMoonIcon,
  GithubIcon
} from './BloggerIcons';
import { Plus, FileUp, Settings as SettingsIcon, Globe } from 'lucide-react';

interface BloggerHeaderProps {
  onToggleSidebar: () => void;
  onOpenDrawer: () => void;
  onOpenRightSidebar?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenNewLink: () => void;
  onOpenImportExport: () => void;
  onOpenSettings: () => void;
  onGoHome: () => void;
}

export const BloggerHeader: React.FC<BloggerHeaderProps> = ({
  onToggleSidebar,
  onOpenDrawer,
  onOpenRightSidebar,
  searchQuery,
  onSearchChange,
  onOpenNewLink,
  onOpenImportExport,
  onOpenSettings,
  onGoHome
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Ctrl + K / Cmd + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="h-[60px] bg-[#1e1e1e] border-b border-[rgba(255,255,255,0.08)] px-3 sm:px-5 flex items-center justify-between shrink-0 sticky top-0 z-30 select-none shadow-xs">
      
      {/* Sol Bölüm (.headL): Menü Butonu & Blog/Site Başlığı */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Hamburger Menu Toggle (Mobile: Open Drawer, Desktop: Toggle Sidebar) */}
        <button
          onClick={() => {
            if (window.innerWidth < 768) {
              onOpenDrawer();
            } else {
              onToggleSidebar();
            }
          }}
          className="w-9 h-9 rounded-xl bg-[#252526] hover:bg-[#2d2d30] border border-[#383838] flex items-center justify-center text-[#d4d4d4] hover:text-white transition-colors cursor-pointer"
          title="Menüyü Aç/Kapat"
        >
          <MenuHamburgerIcon className="w-4 h-4" />
        </button>

        {/* Site / Blog Logo & Title (.headT) */}
        <div 
          onClick={onGoHome}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#38bdf8] to-[#6366f1] flex items-center justify-center text-[#0f172a] font-extrabold text-sm shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            S
          </div>
          <div className="hidden sm:flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-bold text-sm text-[#fffdfc] tracking-tight group-hover:text-[#38bdf8] transition-colors">
                ALİ YILDIZ
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#ff5722]/20 text-[#ff5722] border border-[#ff5722]/30 uppercase">
                saved
              </span>
            </div>
            <span className="text-[10px] text-[#989b9f] tracking-normal mt-0.5">
              Local-First Linkwarden
            </span>
          </div>
        </div>
      </div>

      {/* Orta Bölüm (.headS): Blogger Hap Tasarımlı Arama Çubuğu */}
      <div className="flex-1 max-w-md mx-3 sm:mx-6">
        <div className="relative flex items-center w-full">
          <input
            ref={searchInputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Bağlantılarda ara..."
            className="w-full bg-[#252526] hover:bg-[#28282b] focus:bg-[#2d2d30] border border-[#383838] focus:border-[#38bdf8] rounded-full pl-9 pr-14 py-1.5 text-xs text-[#fffdfc] placeholder-[#989b9f] outline-none transition-all shadow-inner"
          />
          <span className="absolute left-3 text-[#989b9f] pointer-events-none">
            <SearchNormalIcon className="w-3.5 h-3.5" />
          </span>

          {searchQuery ? (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 text-[#989b9f] hover:text-white transition-colors"
            >
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block absolute right-3 px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#1e1e1e] text-[#989b9f] border border-[#383838]">
              Ctrl K
            </kbd>
          )}
        </div>
      </div>

      {/* Sağ Bölüm (.headR / .headIc): Hızlı Aksiyon İkonları & Profil */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* + Yeni Link Butonu */}
        <button
          onClick={onOpenNewLink}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#7dd3fc] hover:to-[#38bdf8] text-[#0f172a] font-bold text-xs shadow-md shadow-sky-500/20 active:scale-95 transition-all cursor-pointer"
          title="Yeni Bağlantı Ekle"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.8]" />
          <span className="hidden md:inline">Yeni Link</span>
        </button>

        {/* Yedek Al / İçe Aktar Butonu */}
        <button
          onClick={onOpenImportExport}
          className="w-8 h-8 rounded-full bg-[#252526] hover:bg-[#2d2d30] border border-[#383838] text-[#d4d4d4] hover:text-white flex items-center justify-center transition-colors"
          title="Yedek Al / İçe Aktar (JSON & HTML)"
        >
          <FileUp className="w-4 h-4 text-emerald-400" />
        </button>

        {/* Ayarlar Butonu */}
        <button
          onClick={onOpenSettings}
          className="w-8 h-8 rounded-full bg-[#252526] hover:bg-[#2d2d30] border border-[#383838] text-[#d4d4d4] hover:text-white flex items-center justify-center transition-colors"
          title="Ayarlar & Lisans"
        >
          <SettingsIcon className="w-4 h-4 text-[#38bdf8]" />
        </button>

        {/* Blog Dış Bağlantısı */}
        <a
          href="https://aleyulala.blogspot.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex w-8 h-8 rounded-full bg-[#252526] hover:bg-[#2d2d30] border border-[#383838] text-[#ff5722] hover:text-white flex items-center justify-center transition-colors"
          title="ALİ YILDIZ Blog"
        >
          <Globe className="w-4 h-4" />
        </a>

        {/* Blogger Profil Avatarı (.tPrfl) - Sağ Paneli / Çekmeceyi Açar */}
        <div 
          onClick={() => {
            if (onOpenRightSidebar) onOpenRightSidebar();
            else onOpenSettings();
          }}
          className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-white font-bold text-xs shadow-inner cursor-pointer hover:ring-2 hover:ring-[#38bdf8] transition-all ml-1"
          title="Ali Yıldız (Sağ Panel & Profil)"
        >
          AY
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#1e1e1e]" />
        </div>
      </div>

    </header>
  );
};
