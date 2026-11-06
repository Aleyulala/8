import React, { useRef, useState, useEffect } from 'react';
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
  const translateRef = useRef<HTMLDivElement>(null);

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

  // Close translate popup on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (translateRef.current && !translateRef.current.contains(e.target as Node)) {
        setIsTranslateOpen(false);
      }
    };
    if (isTranslateOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTranslateOpen]);

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
      
      {/* Sol Bölüm: Hamburger + SAVED Marka Başlığı */}
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

        {/* 4. GitHub Depo Bağlantısı */}
        <a
          href="https://github.com/Aleyulala/x"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex p-2 rounded-lg text-[#989b9f] hover:text-[#60cdff] hover:bg-[#252526] transition-colors"
          title="GitHub: Aleyulala/x"
          aria-label="GitHub Deposu"
        >
          <GithubIcon className="w-4 h-4" />
        </a>

        {/* 5. Profil / Ayarlar Butonu (.isPrf - svg.profile-1 & saved pill) */}
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#252526] hover:bg-[#2f2f34] border border-transparent hover:border-[#60cdff]/50 text-[#60cdff] font-mono text-xs font-bold tracking-wider transition-all select-none shadow-sm active:scale-95 cursor-pointer ml-0.5"
          title="Saved Ayarları & Yönetim"
          aria-label="Ayarlar"
        >
          <Profile1Icon className="w-3.5 h-3.5 text-[#60cdff]" />
          <span>saved</span>
        </button>

      </div>

    </header>
  );
};
