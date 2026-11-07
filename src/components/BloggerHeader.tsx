import React, { useRef, useState, useEffect } from 'react';
import { Palette, MapPin, Settings as SettingsIcon, Sun, Moon, Laptop, Check, ChevronDown } from 'lucide-react';
import { 
  MenuHamburgerIcon, 
  SearchNormalIcon, 
  CloseIcon, 
  SunMoonIcon,
  TranslateIcon,
  ArchiveIcon,
  Profile1Icon,
  Verify1Icon,
  BloggerBIcon,
  TelegramIcon,
  MatrixIcon,
  VkIcon
} from './BloggerIcons';
import { BLOGGER_AUTHORS, getAuthorData } from '../utils/bloggerAuthors';

const THEME_COLORS = [
  { id: 0, hex: '#9aa0a6', name: 'Gri (Varsayılan)' },
  { id: 1, hex: '#ea4335', name: 'Kırmızı' },
  { id: 2, hex: '#1e8e3e', name: 'Yeşil' },
  { id: 3, hex: '#4285f4', name: 'Mavi' },
  { id: 4, hex: '#f9ab00', name: 'Sarı' },
  { id: 5, hex: '#9334e6', name: 'Mor' },
  { id: 6, hex: '#e52592', name: 'Pembe' },
  { id: 7, hex: '#12b5cb', name: 'Camgöbeği' },
  { id: 8, hex: '#fa7b17', name: 'Turuncu' },
  { id: 9, hex: '#00897b', name: 'Teal' },
  { id: 10, hex: '#3949ab', name: 'İndigo' },
  { id: 11, hex: '#1a73e8', name: 'Google Mavi' },
  { id: 12, hex: '#188038', name: 'Koyu Yeşil' },
  { id: 13, hex: '#1967d2', name: 'Derin Mavi' },
  { id: 14, hex: '#a142f4', name: 'Açık Mor' },
  { id: 15, hex: '#d93025', name: 'Koyu Kırmızı' },
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
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
  const [isThemePaletteOpen, setIsThemePaletteOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState<'dark' | 'light' | 'system'>('dark');
  const [currentThemeIndex, setCurrentThemeIndex] = useState<number>(0);
  const [currentThemeColor, setCurrentThemeColor] = useState<string>('#9aa0a6');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedAuthorKey, setSelectedAuthorKey] = useState<string>('NEGRONN');
  const translateRef = useRef<HTMLDivElement>(null);
  const appearanceRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const applyThemeColor = (color: string, themeId: number = 0) => {
    setCurrentThemeColor(color);
    setCurrentThemeIndex(themeId);
    document.documentElement.style.setProperty('--tv-nav-ring', color);
    document.documentElement.style.setProperty('--linkB', color);
    document.documentElement.style.setProperty('--linkC', color);
    document.documentElement.style.setProperty('--text-primary', color);
    document.documentElement.style.setProperty('--theme-color', color);
    document.documentElement.style.setProperty('--c', color);

    // Update root class thX
    const root = document.documentElement;
    const existingTh = root.className.match(/th\d+\b/g);
    if (existingTh) root.classList.remove(...existingTh);
    root.classList.add(`th${themeId}`);
    if (themeId !== 0) {
      root.classList.add('thS');
    } else {
      root.classList.remove('thS');
    }

    // Save in PLUS_UI_APPEARANCE and saved_theme_color
    try {
      const prev = JSON.parse(localStorage.getItem('PLUS_UI_APPEARANCE') || '{}');
      prev.theme = themeId;
      localStorage.setItem('PLUS_UI_APPEARANCE', JSON.stringify(prev));
    } catch {}
    localStorage.setItem('saved_theme_color', color);
    localStorage.setItem('saved_theme_id', String(themeId));
  };

  const applyThemeMode = (mode: 'dark' | 'light' | 'system') => {
    setCurrentMode(mode);
    const root = document.documentElement;
    if (mode === 'light') {
      root.classList.remove('drK', 'syS');
      root.classList.add('lgT');
      setIsDark(false);
    } else if (mode === 'system') {
      root.classList.remove('drK', 'lgT');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add('syS', prefersDark ? 'drK' : 'lgT');
      setIsDark(prefersDark);
    } else {
      root.classList.remove('lgT', 'syS');
      root.classList.add('drK');
      setIsDark(true);
    }

    try {
      const prev = JSON.parse(localStorage.getItem('PLUS_UI_APPEARANCE') || '{}');
      prev.mode = mode;
      localStorage.setItem('PLUS_UI_APPEARANCE', JSON.stringify(prev));
    } catch {}
    localStorage.setItem('saved_theme', mode);
  };

  // Initialize theme from PLUS_UI_APPEARANCE / localStorage
  useEffect(() => {
    try {
      const appStr = localStorage.getItem('PLUS_UI_APPEARANCE');
      if (appStr) {
        const parsed = JSON.parse(appStr);
        if (parsed.mode) {
          applyThemeMode(parsed.mode);
        } else {
          applyThemeMode('dark');
        }
        if (typeof parsed.theme === 'number' && parsed.theme !== 0 && THEME_COLORS[parsed.theme]) {
          applyThemeColor(THEME_COLORS[parsed.theme].hex, parsed.theme);
        } else {
          applyThemeColor('#9aa0a6', 0);
        }
      } else {
        const savedMode = (localStorage.getItem('saved_theme') as any) || 'dark';
        applyThemeMode(savedMode);
        const savedId = localStorage.getItem('saved_theme_id');
        if (savedId !== null && Number(savedId) > 0 && THEME_COLORS[Number(savedId)]) {
          applyThemeColor(THEME_COLORS[Number(savedId)].hex, Number(savedId));
        } else {
          applyThemeColor('#9aa0a6', 0);
        }
      }
    } catch {
      applyThemeMode('dark');
      applyThemeColor('#9aa0a6', 0);
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

  // Close popups on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (translateRef.current && !translateRef.current.contains(e.target as Node)) {
        setIsTranslateOpen(false);
      }
      if (appearanceRef.current && !appearanceRef.current.contains(e.target as Node)) {
        setIsAppearanceOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
      let gElem = document.getElementById('google_translate_element');
      if (!gElem) {
        gElem = document.createElement('div');
        gElem.id = 'google_translate_element';
        gElem.style.display = 'none';
        document.body.appendChild(gElem);
      }

      (window as any).googleTranslateElementInit = () => {
        try {
          new (window as any).google.translate.TranslateElement(
            { pageLanguage: 'tr', autoDisplay: false },
            'google_translate_element'
          );
          setTimeout(() => {
            const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
            if (select) {
              select.value = langCode;
              select.dispatchEvent(new Event('change'));
            }
          }, 350);
        } catch (e) {
          console.warn('Google Translate init failed:', e);
        }
      };

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
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
    <header className="sticky top-0 z-40 w-full h-[60px] bg-[#1e1e1e] border-b border-[#252526] px-3 sm:px-6 flex items-center justify-between select-none">
      
      {/* Sol Bölüm: Hamburger Menü Butonu (.tIc XML 1:1) + SAVED Marka Logosu */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onToggleSidebar}
          className="w-8 h-8 rounded-full text-[#989b9f] hover:text-[#fffdfc] hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center border-none outline-none"
          aria-label="Menüyü Aç/Kapat"
          title="Menüyü Aç/Kapat"
        >
          <MenuHamburgerIcon className="w-4 h-4" />
        </button>

        <div 
          onClick={onGoHome}
          className="cursor-pointer flex items-center gap-2 group select-none ml-1"
          title="Ana Sayfaya Git"
        >
          <span className="font-extrabold text-base sm:text-lg tracking-wider text-white group-hover:text-[var(--linkC,#9aa0a6)] transition-colors uppercase font-mono">
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
            className="w-full bg-[#252526] hover:bg-[#28282b] focus:bg-[#2d2d30] border border-white/5 hover:border-[var(--linkC,#9aa0a6)]/30 rounded-full pl-9 pr-14 py-1.5 text-xs text-[#fffdfc] placeholder-[#989b9f] outline-none transition-all cursor-pointer"
          />
          <span className="absolute left-3 text-[#989b9f] group-hover:text-[var(--linkC,#9aa0a6)] transition-colors pointer-events-none">
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
            <kbd className="hidden sm:inline-block absolute right-3 px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#1e1e1e] text-[#989b9f] group-hover:text-[var(--linkC,#9aa0a6)] transition-colors">
              Ctrl K
            </kbd>
          )}
        </div>
      </div>

      {/* Sağ Bölüm: Blogger XML 1:1 .headIc Butonları (1: Yazarlar, 2: Yer İmleri, 3: Ay, 4: Google Translate) */}
      <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
        
        {/* 1. Buton: Yazarlar & Profil (.isPrf - Profile1Icon & .wPrf) */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(prev => !prev)}
            className={`w-8 h-8 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center border-none outline-none ${
              isProfileOpen 
                ? 'bg-white/10 text-[var(--linkC,#9aa0a6)]' 
                : 'text-[#989b9f] hover:text-[#fffdfc] hover:bg-white/10 active:scale-95'
            }`}
            title="Yazarlar &amp; Profil"
            aria-label="Yazarlar"
          >
            <Profile1Icon className="w-4 h-4" />
          </button>

          {/* Blogger XML 1:1 Profil / Yazarlar Açılır Kartı (.wPrf.fixLs) */}
          {isProfileOpen && (() => {
            const currentProfile = getAuthorData(selectedAuthorKey);
            return (
              <div className="wPrf fixLs tm animate-in fade-in duration-200 w-72 max-w-[calc(100vw-24px)] shadow-2xl">
                <div className="prfH fixH fixT flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#d4d4d4]">Yazarlar</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-[var(--linkC,#9aa0a6)] font-semibold">2</span>
                  </div>
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    className="text-[#989b9f] hover:text-white p-0.5 rounded cursor-pointer"
                    title="Kapat"
                  >
                    <CloseIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Ekip Yazarları Listesi (.prfL - Blogger XML 1:1) */}
                <div className="p-2 border-b border-[#333333] flex items-center gap-1.5 bg-[#1e1e1e]">
                  {Object.values(BLOGGER_AUTHORS).map((author) => {
                    const isSelected = selectedAuthorKey.toLowerCase() === author.name.toLowerCase();
                    return (
                      <button
                        key={author.name}
                        type="button"
                        onClick={() => setSelectedAuthorKey(author.name)}
                        className={`flex-1 flex items-center gap-2 p-1.5 rounded-lg text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#2a2d2e] ring-1 ring-[var(--linkC,#9aa0a6)]/50 text-white shadow-sm'
                            : 'hover:bg-white/5 text-[#a1a1aa] hover:text-white'
                        }`}
                      >
                        <img
                          src={author.avatar}
                          alt={author.name}
                          className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-white/10"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold truncate flex items-center gap-1">
                            <span>{author.name}</span>
                            <Verify1Icon className="w-2.5 h-2.5 text-[var(--linkC,#9aa0a6)] shrink-0" />
                          </div>
                          <div className="text-[10px] text-[#71717a] truncate">{author.role}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Seçilen Yazarın Detay Kartı (.prfC fixC) */}
                <div className="prfC fixC">
                  <div className="sImg">
                    <div className="im relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white/10 shadow-lg mx-auto mb-2.5 bg-[#1e1e1e]">
                      <img
                        src={currentProfile.avatar}
                        alt={currentProfile.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 bg-[#1e1e1e] rounded-full p-0.5">
                        <Verify1Icon className="w-3.5 h-3.5 text-[var(--linkC,#9aa0a6)]" />
                      </div>
                    </div>
                  </div>

                  <dl className="sInf space-y-1.5">
                    <dt className="sDt">
                      <a 
                        href={currentProfile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="l extL inline-flex items-center gap-1.5 font-bold text-sm text-white hover:text-[var(--linkC,#9aa0a6)] transition-colors"
                      >
                        <bdi>{currentProfile.name}</bdi>
                        <Verify1Icon className="w-3.5 h-3.5 text-[var(--linkC,#9aa0a6)]" />
                      </a>
                    </dt>
                    <dd className="text-[11px] text-[var(--linkC,#9aa0a6)] font-medium">
                      {currentProfile.role}
                    </dd>
                    <dd className="sTxt text-xs text-[#a1a1aa] leading-relaxed line-clamp-3">
                      {currentProfile.bio}
                    </dd>
                    <dd className="lc flex items-center justify-center gap-1 text-[11px] text-[#71717a]">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      <span>{currentProfile.location}</span>
                    </dd>
                  </dl>

                  {/* Yazar Sosyal Bağlantıları */}
                  <div className="flex items-center justify-center gap-1.5 mt-3 pt-3 border-t border-[#333333]">
                    <a
                      href={currentProfile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#333333] text-[#d4d4d4] hover:text-white transition-colors"
                      title="Blogger Profil"
                    >
                      <BloggerBIcon className="w-3.5 h-3.5 text-amber-500" />
                    </a>
                    <a
                      href={currentProfile.communityUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#333333] text-[var(--linkC,#9aa0a6)] hover:text-white transition-colors border border-[var(--linkC,#9aa0a6)]/20 hover:border-[var(--linkC,#9aa0a6)]/50"
                      title="Matrix Topluluk (#negronn-show:matrix.org)"
                    >
                      <MatrixIcon className="w-3.5 h-3.5 text-[var(--linkC,#9aa0a6)]" />
                    </a>
                    <a
                      href={currentProfile.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#229ed9] text-[#d4d4d4] hover:text-white transition-colors"
                      title="Telegram"
                    >
                      <TelegramIcon className="w-3.5 h-3.5 text-sky-400" />
                    </a>
                    <a
                      href={currentProfile.vk}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#4680c2] text-[#d4d4d4] hover:text-white transition-colors"
                      title="VKontakte (VK)"
                    >
                      <VkIcon className="w-3.5 h-3.5 text-[#4680c2]" />
                    </a>
                  </div>

                  {/* Ayarlar & Yönetim Butonu */}
                  <div className="mt-3 pt-2 border-t border-[#333333]">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onOpenSettings();
                      }}
                      className="w-full py-1.5 px-3 rounded-lg bg-[#1e1e1e] hover:bg-[#333333] text-xs font-semibold text-[var(--linkC,#9aa0a6)] hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <SettingsIcon className="w-3.5 h-3.5" />
                      <span>Ayarlar &amp; Depolama</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* 2. Buton: Yer İmleri (.isBkm - svg.archive) */}
        <button
          onClick={() => {
            if (onOpenPinned) onOpenPinned();
            else onGoHome();
          }}
          className="w-8 h-8 rounded-full text-[#989b9f] hover:text-[#fffdfc] hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center border-none outline-none"
          title="Sabitlenenler &amp; Yer İmleri"
          aria-label="Yer İmleri"
        >
          <ArchiveIcon className="w-4 h-4" />
        </button>

        {/* 3. Buton: Ay / Görünüm & Tema (.isMode - svg.moon-sun-icon & .aprW & .thmW) */}
        <div className="relative" ref={appearanceRef}>
          <button
            onClick={() => setIsAppearanceOpen(prev => !prev)}
            className={`w-8 h-8 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center border-none outline-none ${
              isAppearanceOpen
                ? 'bg-white/10 text-[var(--linkC,#9aa0a6)]'
                : 'text-[#989b9f] hover:text-[#fffdfc] hover:bg-white/10 active:scale-95'
            }`}
            title="Görünüm ve Tema Ayarları"
            aria-label="Görünüm ve Tema Modu"
          >
            <SunMoonIcon className="w-4 h-4" isDark={isDark} />
          </button>

          {/* Blogger XML 1:1 Görünüm Context Menüsü (.aprW & .thmW) */}
          {isAppearanceOpen && (
            <div className="aprW absolute right-0 top-[calc(100%+8px)] w-60 bg-[#252526] border border-[#333333] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 select-none">
              
              <div className="px-2.5 py-1.5 text-[11px] font-bold text-[#989b9f] uppercase tracking-wider border-b border-white/5 flex items-center justify-between">
                <span>Görünüm</span>
                <button 
                  onClick={() => setIsAppearanceOpen(false)} 
                  className="text-[#71717a] hover:text-white p-0.5 rounded cursor-pointer"
                  title="Kapat"
                >
                  <CloseIcon className="w-3 h-3" />
                </button>
              </div>

              {/* Tema Modu Seçenekleri: Açık / Koyu / Sistem */}
              <div className="space-y-1 py-1.5">
                <button
                  type="button"
                  onClick={() => applyThemeMode('light')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    currentMode === 'light' ? 'bg-[#333333] text-white font-semibold' : 'text-[#d4d4d4] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Açık</span>
                  </div>
                  {currentMode === 'light' && <Check className="w-3.5 h-3.5 text-[var(--linkC,#9aa0a6)]" />}
                </button>

                <button
                  type="button"
                  onClick={() => applyThemeMode('dark')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    currentMode === 'dark' ? 'bg-[#333333] text-white font-semibold' : 'text-[#d4d4d4] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Moon className="w-4 h-4 text-[var(--linkC,#9aa0a6)]" />
                    <span>Koyu</span>
                  </div>
                  {currentMode === 'dark' && <Check className="w-3.5 h-3.5 text-[var(--linkC,#9aa0a6)]" />}
                </button>

                <button
                  type="button"
                  onClick={() => applyThemeMode('system')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    currentMode === 'system' ? 'bg-[#333333] text-white font-semibold' : 'text-[#d4d4d4] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Laptop className="w-4 h-4 text-[#989b9f]" />
                    <span>Sistem</span>
                  </div>
                  {currentMode === 'system' && <Check className="w-3.5 h-3.5 text-[var(--linkC,#9aa0a6)]" />}
                </button>
              </div>

              {/* Tema Vurgu Rengi (.thmB & .thmP) */}
              <div className="pt-1.5 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsThemePaletteOpen(prev => !prev)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[#d4d4d4] hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Palette className="w-4 h-4" style={{ color: currentThemeColor }} />
                    <span>Tema Rengi</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full border border-white/30" style={{ backgroundColor: currentThemeColor }} />
                    <ChevronDown className={`w-3.5 h-3.5 text-[#71717a] transition-transform duration-200 ${isThemePaletteOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* 16 Renk Paleti (.thmP) */}
                {isThemePaletteOpen && (
                  <div className="thmP grid grid-cols-4 gap-2.5 p-2 mt-1.5 bg-[#1e1e1e] rounded-lg border border-white/5 animate-in fade-in duration-150">
                    {THEME_COLORS.map(c => {
                      const isSelected = currentThemeIndex === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => applyThemeColor(c.hex, c.id)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-115 cursor-pointer relative shadow-sm ${
                            isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1e1e1e] scale-110 shadow-lg' : ''
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* 4. Buton: Otomatik Çeviri (.isTrans - svg.translate-1 & .wTrans) */}
        <div className="relative" ref={translateRef}>
          <button
            onClick={() => setIsTranslateOpen(prev => !prev)}
            className={`w-8 h-8 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center border-none outline-none ${
              isTranslateOpen || selectedLang !== 'tr'
                ? 'bg-white/10 text-[var(--linkC,#9aa0a6)]'
                : 'text-[#989b9f] hover:text-[#fffdfc] hover:bg-white/10 active:scale-95'
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
                    className="text-[var(--linkC,#9aa0a6)] hover:underline cursor-pointer lowercase"
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
                        ? 'bg-[#252526] text-[var(--linkC,#9aa0a6)] font-bold'
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

      </div>

    </header>
  );
};
