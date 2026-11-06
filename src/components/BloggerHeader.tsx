import React, { useRef } from 'react';
import { 
  MenuHamburgerIcon, 
  SearchNormalIcon, 
  CloseIcon, 
  SunMoonIcon,
  GithubIcon
} from './BloggerIcons';
import { Plus, Bookmark, Globe } from 'lucide-react';

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

  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-[#1e1e1e] border-b border-[rgba(255,255,255,0.08)] px-3 sm:px-5 flex items-center justify-between select-none shadow-sm">
      
      {/* Sol Bölüm: Hamburger + NSONE Marka Başlığı */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-[#989b9f] hover:text-[#fffdfc] hover:bg-[#252526] transition-colors cursor-pointer"
          aria-label="Menüyü Aç/Kapat"
          title="Menüyü Aç/Kapat"
        >
          <MenuHamburgerIcon className="w-5 h-5" />
        </button>

        <div 
          onClick={onGoHome}
          className="cursor-pointer flex items-center gap-2 group"
          title="Ana Sayfaya Git"
        >
          <span className="font-extrabold text-base sm:text-lg tracking-wider text-white group-hover:text-[#60cdff] transition-colors uppercase">
            SAVED
          </span>
        </div>
      </div>

      {/* Orta Bölüm: Blogger Hap Tasarımlı Arama Çubuğu (Bul...) */}
      <div className="flex-1 max-w-md mx-3 sm:mx-8">
        <div className="relative flex items-center w-full">
          <input
            ref={searchInputRef}
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Bul..."
            className="w-full bg-[#252526] hover:bg-[#28282b] focus:bg-[#2d2d30] border border-[#383838] focus:border-[#60cdff] rounded-full pl-9 pr-14 py-1.5 text-xs text-[#fffdfc] placeholder-[#989b9f] outline-none transition-all shadow-inner"
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

      {/* Sağ Bölüm: İkonlar ve Sadece 'saved' Butonu (Logo Yok!) */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        
        {/* + Yeni Link Ekle Butonu */}
        <button
          onClick={onOpenNewLink}
          className="hidden sm:flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#252526] hover:bg-[#2d2d30] border border-[#383838] hover:border-[#60cdff]/60 text-xs text-[#fffdfc] font-semibold transition-all cursor-pointer active:scale-95"
          title="Yeni Bağlantı Ekle"
        >
          <Plus className="w-3.5 h-3.5 text-[#60cdff]" />
          <span>Ekle</span>
        </button>

        {/* Yer İmleri İkonu */}
        <button
          onClick={onGoHome}
          className="p-1.5 rounded-lg text-[#989b9f] hover:text-[#fffdfc] hover:bg-[#252526] transition-colors"
          title="Yer İmleri"
        >
          <Bookmark className="w-4 h-4" />
        </button>

        {/* Karanlık/Aydınlık Tema İkonu */}
        <button
          onClick={() => {}}
          className="p-1.5 rounded-lg text-[#989b9f] hover:text-[#fffdfc] hover:bg-[#252526] transition-colors"
          title="Karanlık Mod"
        >
          <SunMoonIcon className="w-4 h-4" />
        </button>

        {/* GitHub Depo Bağlantısı */}
        <a
          href="https://github.com/Aleyulala/saved"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex p-1.5 rounded-lg text-[#989b9f] hover:text-[#60cdff] hover:bg-[#252526] transition-colors"
          title="GitHub: Aleyulala/saved"
        >
          <GithubIcon className="w-4 h-4" />
        </a>

        {/* SAĞ ÜST: LOGO YOK, SADECE 'saved' YAZISI */}
        <button
          onClick={onOpenSettings}
          className="px-3.5 py-1 rounded-full bg-[#252526] hover:bg-[#2f2f34] border border-[#444444] hover:border-[#60cdff] text-[#60cdff] font-mono text-xs font-bold tracking-wider transition-all select-none shadow-sm active:scale-95 cursor-pointer ml-1"
          title="Saved Ayarları & Yönetim"
        >
          saved
        </button>

      </div>

    </header>
  );
};
