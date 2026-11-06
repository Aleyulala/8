import React, { useRef, useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { 
  MenuHamburgerIcon, 
  SearchNormalIcon, 
  CloseIcon, 
  SunMoonIcon,
  GithubIcon,
  TranslateIcon,
  ArchiveIcon,
  Profile1Icon
} from './BloggerIcons';

const THEME_COLORS = [
  { id: 0, hex: '#38bdf8', name: 'Sky Blue' },
  { id: 1, hex: '#0ea5e9', name: 'Ocean' },
  { id: 2, hex: '#06b6d4', name: 'Cyan' },
  { id: 3, hex: '#14b8a6', name: 'Teal' },
  { id: 4, hex: '#10b981', name: 'Emerald' },
  { id: 5, hex: '#22c55e', name: 'Green' },
  { id: 6, hex: '#84cc16', name: 'Lime' },
  { id: 7, hex: '#eab308', name: 'Yellow' },
  { id: 8, hex: '#f59e0b', name: 'Amber' },
  { id: 9, hex: '#f97316', name: 'Orange' },
  { id: 10, hex: '#ef4444', name: 'Red' },
  { id: 11, hex: '#f43f5e', name: 'Rose' },
  { id: 12, hex: '#ec4899', name: 'Pink' },
  { id: 13, hex: '#d946ef', name: 'Fuchsia' },
  { id: 14, hex: '#a855f7', name: 'Purple' },
  { id: 15, hex: '#6366f1', name: 'Indigo' },
];

const LANGUAGES = [
  { code: 'tr', name: 'Türkçe', native: 'Türkçe' },
  { code: 'en', name: 'English', native: 'English' },
  { code: 'de', name: 'Deutsch', native: 'Deutsch' },
  { code: 'fr', name: 'Français', native: 'Français' },
  { code: 'es', name: 'Español', native: 'Español' },
  { code: 'ru', name: 'Русский', native: 'Русский' },
  { code: 'ar', name: 'العربية', native: 'العربية' },
  { code: 'it', name: 'Italiano', native: 'Italiano' },
  { code: 'ja', name: '日本語', native: '日本語' },
  { code: 'ko', name: '한국어', native: '한국어' },
  { code: 'pt', name: 'Português', native: 'Português' },
  { code: 'zh-CN', name: '中文', native: '中文' },
];

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
  onOpenSearchModal?: () => void;
  onOpenPinned?: () => void;
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
  onGoHome,
  onOpenSearchModal,
  onOpenPinned
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isTranslateOpen, setIsTranslateOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string>('tr');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isThemePopupOpen, setIsThemePopupOpen] = useState(false);
  const [currentThemeColor, setCurrentThemeColor] = useState<string>('#38bdf8');
  const translateRef = useRef<HTMLDivElement>(null);
  const themePopupRef = useRef<HTMLDivElement>(null);

  const applyThemeColor = (color: string) => {
    setCurrentThemeColor(color);
    document.documentElement.style.setProperty('--tv-nav-ring', color);
    document.documentElement.style.setProperty('--linkB', color);
    document.documentElement.style.setProperty('--linkC', color);
    document.documentElement.style.setProperty('--text-primary', color);
    document.documentElement.style.setProperty('--theme-color', color);
    localStorage.setItem('saved_theme_color', color);
  };

  // Initialize theme from localStorage or document
  useEffect(() => {
    const saved = localStorage.getItem('saved_theme');
    if (saved === 'light') {
      document.documentElement.classList.add('lgT');
      document.documentElement.classList.remove('drK');
      setIsDark(false);
    } else {
      document.documentElement.classList.remove('lgT');
      document.documentElement.classList.add('drK');
      setIsDark(true);
    }

    const savedColor = localStorage.getItem('saved_theme_color') || '#38bdf8';
    applyThemeColor(savedColor);

    // Check existing Google Translate cookie
    const cookies = document.cookie.split(';');
    for (const c of cookies) {
      const trimmed = c.trim();
      if (trimmed.startsWith('googtrans=')) {
        const val = trimmed.split('=')[1];
        if (val) {
          const parts = val.split('/');
          const l = parts[parts.length - 1];
          if (l) setSelectedLang(l);
        }
      }
    }
  }, []);

  // Close translate popup & theme popup on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (translateRef.current && !translateRef.current.contains(e.target as Node)) {
        setIsTranslateOpen(false);
      }
      if (themePopupRef.current && !themePopupRef.current.contains(e.target as Node)) {
        setIsThemePopupOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    const willBeDark = !isDark;
    setIsDark(willBeDark);
    if (willBeDark) {
      document.documentElement.classList.remove('lgT');
      document.documentElement.classList.add('drK');
      localStorage.setItem('saved_theme', 'dark');
    } else {
      document.documentElement.classList.remove('drK');
      document.documentElement.classList.add('lgT');
      localStorage.setItem('saved_theme', 'light');
    }
  };

  const handleSelectLanguage = (langCode: string) => {
    setSelectedLang(langCode);
    setIsTranslateOpen(false);

    if (langCode === 'tr') {
      // Revert to original Turkish
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      const hostname = window.location.hostname;
      if (hostname && hostname !== 'localhost') {
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${hostname}; path=/;`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${hostname}; path=/;`;
      }
      window.location.reload();
      return;
    }

    // Set Google translate cookies
    const hostname = window.location.hostname;
    document.cookie = `googtrans=/auto/${langCode}; path=/;`;
    if (hostname && hostname !== 'localhost') {
      document.cookie = `googtrans=/auto/${langCode}; domain=.${hostname}; path=/;`;
      document.cookie = `googtrans=/auto/${langCode}; domain=${hostname}; path=/;`;
    }

    // Load Google Translate widget script
    if (!document.getElementById('google-translate-script')) {
      const gElem = document.createElement('div');
      gElem.id = 'google_translate_element';
      gElem.style.display = 'none';
      document.body.appendChild(gElem);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: 'tr', autoDisplay: false },
          'google_translate_element'
        );
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    } else {
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
      } else {
        window.location.reload();
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full h-[60px] bg-[#1e1e1e] border-b border-[#252526] px-3 sm:px-6 flex items-center justify-between select-none shadow-sm">
      
      {/* Sol Bölüm: Hamburger Menü Butonu */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-[#989b9f] hover:text-[#fffdfc] hover:bg-[#252526] transition-colors cursor-pointer flex items-center justify-center"
          aria-label="Menüyü Aç/Kapat"
          title="Menüyü Aç/Kapat"
        >
          <MenuHamburgerIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Orta Bölüm: Blogger Hap Tasarımlı Arama Çubuğu (Bul...) */}
      <div className="flex-1 max-w-md mx-3 sm:mx-8">
        <div 
          onClick={onOpenSearchModal}
          className="relative flex items-center w-full cursor-pointer group"
          title="Gelişmiş Arama & Bul Paneli (Ctrl+K)"
        >
          <input
            ref={searchInputRef}
            type="search"
            value={searchQuery}
            readOnly
            placeholder="Bul..."
            className="w-full bg-[#252526] group-hover:bg-[#28282b] focus:bg-[#2d2d30] border border-transparent group-hover:border-[#60cdff]/30 rounded-full pl-9 pr-14 py-1.5 text-xs text-[#fffdfc] placeholder-[#989b9f] outline-none transition-all shadow-inner cursor-pointer"
          />
          <span className="absolute left-3 text-[#989b9f] group-hover:text-[#60cdff] transition-colors pointer-events-none">
            <SearchNormalIcon className="w-3.5 h-3.5" />
          </span>

          {searchQuery ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSearchChange('');
              }}
              className="absolute right-3 text-[#989b9f] hover:text-white transition-colors"
            >
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block absolute right-3 px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#1e1e1e] text-[#989b9f] group-hover:text-[#60cdff] transition-colors">
              Ctrl K
            </kbd>
          )}
        </div>
      </div>

      {/* Sağ Bölüm: Blogger XML 1:1 .headIc Butonları */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        
        {/* 1. Otomatik Çeviri Butonu (.isTrans - svg.translate-1) */}
        <div className="relative" ref={translateRef}>
          <button
            onClick={() => setIsTranslateOpen(prev => !prev)}
            className={`p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
              isTranslateOpen || selectedLang !== 'tr'
                ? 'bg-[#252526] text-[#60cdff]'
                : 'text-[#989b9f] hover:text-[#fffdfc] hover:bg-[#252526]'
            }`}
            title="Otomatik Çeviri (Google Translate)"
            aria-label="Dili Değiştir"
          >
            <TranslateIcon className="w-4 h-4" />
          </button>

          {/* Blogger XML .wTrans Açılır Menüsü */}
          {isTranslateOpen && (
            <div className="absolute right-0 top-[calc(100%+8px)] w-48 max-h-72 overflow-y-auto bg-[#1f1f1f] border border-[#2d2d30] rounded-lg shadow-2xl p-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
              <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#71717a] border-b border-white/5 mb-1 flex items-center justify-between">
                <span>Diller</span>
                {selectedLang !== 'tr' && (
                  <button
                    onClick={() => handleSelectLanguage('tr')}
                    className="text-[#60cdff] hover:underline cursor-pointer lowercase"
                  >
                    sıfırla
                  </button>
                )}
              </div>
              <div className="space-y-0.5">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedLang === lang.code
                        ? 'bg-[#252526] text-[#60cdff] font-bold'
                        : 'text-[#d4d4d4] hover:bg-[#252526] hover:text-white'
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className="text-[10px] text-[#71717a] uppercase font-mono">{lang.code}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. Tema Değiştirici Butonu (.isMode - sun-moon-icon) */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-[#989b9f] hover:text-[#fffdfc] hover:bg-[#252526] transition-colors cursor-pointer flex items-center justify-center"
          title={isDark ? 'Aydınlık Mod' : 'Karanlık Mod'}
          aria-label="Tema Modunu Değiştir"
        >
          <SunMoonIcon className="w-4 h-4" isDark={isDark} />
        </button>

        {/* 2.1 Tema Vurgu Rengi Seçici Butonu (.isTheme - XML 1:1 .thmW) */}
        <div className="relative" ref={themePopupRef}>
          <button
            onClick={() => setIsThemePopupOpen(prev => !prev)}
            className={`p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
              isThemePopupOpen
                ? 'bg-[#252526] text-white'
                : 'text-[#989b9f] hover:text-[#fffdfc] hover:bg-[#252526]'
            }`}
            style={{ color: currentThemeColor }}
            title="Tema Vurgu Rengini Değiştir"
            aria-label="Tema Vurgu Rengi"
          >
            <Palette className="w-4 h-4" />
          </button>

          {/* Blogger XML .thmW Renk Paleti Pop-up */}
          {isThemePopupOpen && (
            <div className="thmW absolute right-0 top-[calc(100%+8px)] w-56 bg-[#1f1f1f] border border-[#2d2d30] rounded-xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[11px] font-bold text-white uppercase tracking-wider">
                <span>Tema Rengi</span>
                <span className="w-3.5 h-3.5 rounded-full border border-white/30" style={{ backgroundColor: currentThemeColor }} />
              </div>

              <div className="thmP grid grid-cols-4 gap-2.5 p-1">
                {THEME_COLORS.map(c => {
                  const isSelected = currentThemeColor.toLowerCase() === c.hex.toLowerCase();
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        applyThemeColor(c.hex);
                        setIsThemePopupOpen(false);
                      }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-115 cursor-pointer relative shadow-sm ${
                        isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1f1f1f] scale-110 shadow-lg' : ''
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 3. Yer İmleri Butonu (.isBkm - svg.archive) */}
        <button
          onClick={() => {
            if (onOpenPinned) onOpenPinned();
            else onGoHome();
          }}
          className="p-2 rounded-lg text-[#989b9f] hover:text-[#fffdfc] hover:bg-[#252526] transition-colors cursor-pointer flex items-center justify-center"
          title="Sabitlenenler & Yer İmleri"
          aria-label="Yer İmleri"
        >
          <ArchiveIcon className="w-4 h-4" />
        </button>

        {/* Profil / Ayarlar Butonu (.isPrf - svg.profile-1 XML 1:1) */}
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-lg text-[#989b9f] hover:text-[#fffdfc] hover:bg-[#252526] transition-colors cursor-pointer flex items-center justify-center"
          title="Ayarlar & Yönetim"
          aria-label="Ayarlar"
        >
          <Profile1Icon className="w-4 h-4" />
        </button>

      </div>

    </header>
  );
};
