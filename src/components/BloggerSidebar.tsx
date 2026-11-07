import React, { useState } from 'react';
import { 
  HomeIcon,
  Hierarchy4Icon,
  FlashIcon,
  FolderCodeIcon,
  MessageNotif1Icon,
  Edit3Icon,
  Profile2UserIcon,
  EyeIcon,
  Verify1Icon,
  SmsEditIcon,
  ArrowSwapHorizontalIcon,
  SearchNormalIcon,
  SpeedometerIcon,
  CloseIcon,
  ChevronDownIcon,
  PlusNavIcon,
  InstagramIcon, 
  TelegramIcon, 
  MailIcon, 
  VkIcon,
  MatrixIcon,
  WhatsappIcon
} from './BloggerIcons';
import { CollectionItem, TagItem } from '../types';

interface BloggerSidebarProps {
  currentTab: string;
  activeCollectionId?: number | null;
  activeTag?: string | null;
  onSelectTab: (tab: any) => void;
  onSelectCollection?: (id: number) => void;
  onSelectTag?: (tag: string) => void;
  collections?: CollectionItem[];
  tags?: TagItem[];
  counts: {
    all: number;
    pinned: number;
    trash: number;
    collections: Record<number, number>;
    tags: Record<string, number>;
  };
  onOpenNewLink: () => void;
  onOpenManageCollections?: () => void;
  onOpenManageTags?: () => void;
  onOpenSettings?: () => void;
  onOpenImportExport?: () => void;
  isCollapsed?: boolean;
  onToggleSidebar?: () => void;
}

export const BloggerSidebar: React.FC<BloggerSidebarProps> = ({
  currentTab,
  onSelectTab,
  counts,
  onOpenNewLink,
  isCollapsed = false,
  onToggleSidebar
}) => {
  const [hizmetlerOpen, setHizmetlerOpen] = useState(true);
  const [klasorOpen, setKlasorOpen] = useState(true);
  const [gelistiriciOpen, setGelistiriciOpen] = useState(true);

  // 1. ÇEKMECE KAPALIYKEN: Daraltılmış 75px Mini Bar (negronn.xml 1:1 Masaüstü Rail Modu)
  if (isCollapsed) {
    return (
      <aside className="w-[75px] bg-[#1e1e1e] border-r border-[#252526] flex flex-col justify-between h-[calc(100vh-60px)] shrink-0 select-none shadow-xs transition-all duration-300 ease-in-out relative z-30">
        
        {/* Üst Menü İkonları (.mnMn Rail) */}
        <div className="p-2 space-y-2 flex-1 overflow-visible pt-3">
          <ul className="space-y-2">
            
            {/* 1. Ana Sayfa (svg.home) - XML 1:1: Sadece ana sayfa DIŞINDAKİ sayfalarda gözükür (!data:view.isHomepage) */}
            {currentTab !== 'dashboard' && (
              <li className="relative group flex justify-center">
                <button
                  onClick={() => onSelectTab('dashboard')}
                  className="w-11 h-11 flex items-center justify-center rounded-xl transition-all cursor-pointer text-[#9ca3af] hover:bg-[#252526] hover:text-white"
                  title="Ana Sayfa"
                  aria-label="Ana Sayfa"
                >
                  <HomeIcon className="w-5 h-5 text-[#38bdf8]" />
                </button>
                {/* Uçan Etiket (Flyout Tooltip) */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 rounded-lg bg-[#252526] border border-white/10 text-white text-xs font-semibold whitespace-nowrap shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                  Ana Sayfa
                </div>
              </li>
            )}

            {/* 2. Hizmetler (svg.hierarchy-4) */}
            <li className="relative group flex justify-center nt">
              <button
                onClick={() => onSelectTab('pinned')}
                className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all cursor-pointer relative ${
                  currentTab === 'pinned'
                    ? 'bg-[#252526] text-[#60cdff] shadow-sm ring-1 ring-[#60cdff]/30'
                    : 'text-[#9ca3af] hover:bg-[#252526] hover:text-[#60cdff]'
                }`}
                title="Hizmetler"
                aria-label="Hizmetler"
              >
                <Hierarchy4Icon className="w-5 h-5 text-[#60cdff]" />
                {/* xml 1:1 li.nt bildirim noktası */}
                <span className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#60cdff] shadow-[0_0_8px_#60cdff]" />
              </button>
              {/* Uçan Menü (Flyout Submenu) */}
              <div className="absolute left-full top-0 ml-2 w-52 p-2 rounded-xl bg-[#252526] border border-white/10 shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50 space-y-1">
                <div className="px-2.5 py-1 text-xs font-bold text-[#60cdff] border-b border-white/10 flex items-center gap-2">
                  <Hierarchy4Icon className="w-4 h-4" />
                  <span>Hizmetler</span>
                </div>
                {/* 1. Etkileşimler */}
                <button
                  onClick={() => onSelectTab('pinned')}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    currentTab === 'pinned' ? 'bg-[#1e1e1e] text-[#38bdf8] font-bold' : 'text-[#d4d4d4] hover:bg-[#1e1e1e] hover:text-[#38bdf8]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <MessageNotif1Icon className="w-4 h-4 text-[#60cdff]" />
                    Etkileşimler
                  </span>
                  <span className="text-[10px] text-[#9ca3af] font-mono">{counts.pinned}</span>
                </button>
                {/* 2. Notlarınız */}
                <a
                  href="https://notebooklm.google.com/"
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                  className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#1e1e1e] hover:text-[#60cdff] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Edit3Icon className="w-4 h-4 text-[#9ca3af]" />
                    Notlarınız
                  </span>
                </a>
                {/* 3. Forumlarınız */}
                <a
                  href="https://docs.google.com/forms/u/0/"
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                  className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#1e1e1e] hover:text-[#60cdff] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Profile2UserIcon className="w-4 h-4 text-[#9ca3af]" />
                    Forumlarınız
                  </span>
                </a>
              </div>
            </li>

            {/* 3. Klasör (svg.flash) - New! */}
            <li className="relative group flex justify-center">
              <button
                onClick={() => onSelectTab('links')}
                className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all cursor-pointer relative ${
                  currentTab === 'links' || currentTab === 'privacy'
                    ? 'bg-[#252526] text-amber-400 shadow-sm ring-1 ring-amber-400/30'
                    : 'text-[#9ca3af] hover:bg-[#252526] hover:text-amber-400'
                }`}
                title="Klasör"
                aria-label="Klasör"
              >
                <FlashIcon className="w-5 h-5 text-amber-400" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              </button>
              {/* Uçan Menü (Flyout Submenu) */}
              <div className="absolute left-full top-0 ml-2 w-52 p-2 rounded-xl bg-[#252526] border border-white/10 shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50 space-y-1">
                <div className="px-2.5 py-1 text-xs font-bold text-amber-400 border-b border-white/10 flex items-center gap-2">
                  <FlashIcon className="w-4 h-4" />
                  <span>Klasör</span>
                  <span className="ml-auto text-[#60cdff] text-[11px] font-bold">New!</span>
                </div>
                {/* 1. İlgi Alanları */}
                <button
                  onClick={() => onSelectTab('links')}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    currentTab === 'links' ? 'bg-[#1e1e1e] text-[#38bdf8] font-bold' : 'text-[#d4d4d4] hover:bg-[#1e1e1e] hover:text-[#38bdf8]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <EyeIcon className="w-4 h-4 text-[#9ca3af]" />
                    İlgi Alanları
                  </span>
                  <span className="text-[10px] text-[#9ca3af] font-mono">{counts.all}</span>
                </button>
                {/* 2. Politikalar */}
                <button
                  onClick={() => onSelectTab('privacy')}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    currentTab === 'privacy' ? 'bg-[#1e1e1e] text-[#38bdf8] font-bold' : 'text-[#d4d4d4] hover:bg-[#1e1e1e] hover:text-[#38bdf8]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Verify1Icon className="w-4 h-4 text-[#9ca3af]" />
                    Politikalar
                  </span>
                  <span className="text-[10px] text-[#9ca3af] font-mono">Yasal</span>
                </button>
                {/* 3. Geri Bildirim */}
                <a
                  href="https://github.com/Aleyulala/saved/discussions/?pli=1"
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                  className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#1e1e1e] hover:text-[#60cdff] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <SmsEditIcon className="w-4 h-4 text-[#9ca3af]" />
                    Geri Bildirim
                  </span>
                </a>
              </div>
            </li>

            {/* XML 1:1 Bölücü Çizgi (.mnMn > li.br::after) */}
            <li className="flex justify-center py-1">
              <div className="w-6 h-px bg-white/10" />
            </li>

            {/* 4. Geliştiriciler (svg.folder-code) */}
            <li className="relative group flex justify-center">
              <button
                onClick={() => setGelistiriciOpen(!gelistiriciOpen)}
                className="w-11 h-11 flex items-center justify-center rounded-xl transition-all cursor-pointer text-[#9ca3af] hover:bg-[#252526] hover:text-[#60cdff]"
                title="Geliştiriciler"
                aria-label="Geliştiriciler"
              >
                <FolderCodeIcon className="w-5 h-5 text-[#60cdff]" />
              </button>
              {/* Uçan Menü (Flyout Submenu) */}
              <div className="absolute left-full top-0 ml-2 w-52 p-2 rounded-xl bg-[#252526] border border-white/10 shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50 space-y-1">
                <div className="px-2.5 py-1 text-xs font-bold text-[#60cdff] border-b border-white/10 flex items-center gap-2">
                  <FolderCodeIcon className="w-4 h-4" />
                  <span>Geliştiriciler</span>
                </div>
                {/* 1. Ters Çevir */}
                <button
                  type="button"
                  onClick={() => {
                    const current = document.documentElement.getAttribute('dir') || 'ltr';
                    const next = current === 'rtl' ? 'ltr' : 'rtl';
                    document.documentElement.setAttribute('dir', next);
                  }}
                  className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#1e1e1e] hover:text-[#60cdff] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <ArrowSwapHorizontalIcon className="w-4 h-4 text-[#9ca3af]" />
                    Ters Çevir
                  </span>
                  <span className="text-[#60cdff] text-[10px] font-bold">New!</span>
                </button>
                {/* 2. Detaylı Ara */}
                <a
                  href="https://search.google.com/test/rich-results"
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                  className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#1e1e1e] hover:text-[#60cdff] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <SearchNormalIcon className="w-4 h-4 text-[#9ca3af]" />
                    Detaylı Ara
                  </span>
                </a>
                {/* 3. Hız Testi */}
                <a
                  href="https://pagespeed.web.dev/analysis"
                  target="_blank"
                  rel="nofollow noreferrer noopener"
                  className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#1e1e1e] hover:text-[#60cdff] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <SpeedometerIcon className="w-4 h-4 text-[#9ca3af]" />
                    Hız Testi
                  </span>
                </a>
              </div>
            </li>

          </ul>
        </div>

        {/* Alt Bölüm (.mnMob / .mNav): XML 1:1 Tek + Butonu (Menüyü Genişletir / Çekmeceyi Açar) */}
        <div className="p-3 border-t border-[#252526] bg-[#1e1e1e] flex justify-center items-center">
          <button
            type="button"
            onClick={onToggleSidebar || onOpenNewLink}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-[#9ca3af] hover:text-white hover:bg-[#252526] transition-colors cursor-pointer"
            title="Gezinme Menüsü (Genişlet)"
            aria-label="Navigation menu"
          >
            <PlusNavIcon className="w-5 h-5 text-[#9ca3af] hover:text-white" />
          </button>
        </div>

      </aside>
    );
  }

  // 2. ÇEKMECE AÇIKKEN: Genişletilmiş 230px Tam Menü (negronn.xml 1:1)
  return (
    <aside className="w-[230px] bg-[#1e1e1e] border-r border-[#252526] flex flex-col justify-between h-[calc(100vh-60px)] shrink-0 text-xs select-none shadow-xs transition-all duration-300 ease-in-out">
      
      {/* Üst Kapatma Başlığı (.mnH - XML 1:1) */}
      {onToggleSidebar && (
        <div className="px-4 py-2.5 border-b border-[#252526] flex items-center">
          <button
            onClick={onToggleSidebar}
            className="inline-flex items-center gap-2 text-[#989b9f] hover:text-white transition-colors cursor-pointer"
            title="Kapat"
            aria-label="Kapat"
          >
            <CloseIcon className="w-4 h-4" />
            <span className="text-[11px] opacity-70">Kapat</span>
          </button>
        </div>
      )}

      {/* Menü Öğeleri (.mnMen) */}
      <div className="p-3 space-y-4 overflow-y-auto flex-1">
        
        {/* Blogger Gezinme Menüsü (.mnMn) */}
        <ul className="space-y-1">
          
          {/* 1. Ana Sayfa (svg.home) - XML 1:1: Sadece ana sayfa DIŞINDAKİ sayfalarda gözükür (!data:view.isHomepage) */}
          {currentTab !== 'dashboard' && (
            <li>
              <button
                onClick={() => onSelectTab('dashboard')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-colors cursor-pointer text-[#d4d4d4] hover:bg-[#252526]/70 hover:text-white"
              >
                <div className="flex items-center gap-2.5">
                  <HomeIcon className="w-4 h-4 text-[#38bdf8]" />
                  <span className="font-semibold text-xs">Ana Sayfa</span>
                </div>
              </button>
            </li>
          )}

          {/* 2. Hizmetler (svg.hierarchy-4) */}
          <li className="pt-1 relative">
            <div 
              onClick={() => setHizmetlerOpen(!hizmetlerOpen)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-[#d4d4d4] hover:bg-[#252526] hover:text-white cursor-pointer transition-colors relative"
            >
              <div className="flex items-center gap-2.5">
                <Hierarchy4Icon className="w-4 h-4 text-[#60cdff]" />
                <span>Hizmetler</span>
              </div>
              {/* xml 1:1 li.nt bildirim noktası */}
              <span className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#60cdff] shadow-[0_0_8px_#60cdff]" />
              
              <ChevronDownIcon className={`w-3.5 h-3.5 text-[#989b9f] transition-transform duration-300 ${hizmetlerOpen ? 'rotate-180' : ''}`} />
            </div>

            {hizmetlerOpen && (
              <ul className="space-y-0.5 pl-3 border-l border-white/10 ml-4 mt-1">
                {/* 1. Etkileşimler (svg.message-notif-1) */}
                <li>
                  <button
                    onClick={() => onSelectTab('pinned')}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                      currentTab === 'pinned'
                        ? 'bg-[#252526] text-[#38bdf8] font-bold'
                        : 'text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MessageNotif1Icon className="w-3.5 h-3.5 text-[#60cdff]" />
                      <span>Etkileşimler</span>
                    </div>
                    <span className="text-[10px] text-[#9ca3af] font-mono">{counts.pinned}</span>
                  </button>
                </li>

                {/* 2. Notlarınız (svg.edit-3) */}
                <li>
                  <a
                    href="https://notebooklm.google.com/"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Edit3Icon className="w-3.5 h-3.5 text-[#9ca3af]" />
                      <span>Notlarınız</span>
                    </div>
                  </a>
                </li>

                {/* 3. Forumlarınız (svg.profile-2user) */}
                <li>
                  <a
                    href="https://docs.google.com/forms/u/0/"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Profile2UserIcon className="w-3.5 h-3.5 text-[#9ca3af]" />
                      <span>Forumlarınız</span>
                    </div>
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* 3. Klasör (svg.flash) */}
          <li className="pt-1">
            <div 
              onClick={() => setKlasorOpen(!klasorOpen)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-[#d4d4d4] hover:bg-[#252526] hover:text-white cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FlashIcon className="w-4 h-4 text-amber-400" />
                <span>Klasör</span>
                <span className="badge-new text-[#60cdff] text-[11px] font-bold ml-1">
                  New!
                </span>
              </div>
              <ChevronDownIcon className={`w-3.5 h-3.5 text-[#989b9f] transition-transform duration-300 ${klasorOpen ? 'rotate-180' : ''}`} />
            </div>

            {klasorOpen && (
              <ul className="space-y-0.5 pl-3 border-l border-white/10 ml-4 mt-1">
                {/* 1. İlgi Alanları (svg.eye) */}
                <li>
                  <button
                    onClick={() => onSelectTab('links')}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                      currentTab === 'links'
                        ? 'bg-[#252526] text-[#38bdf8] font-bold'
                        : 'text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <EyeIcon className="w-3.5 h-3.5 text-[#9ca3af]" />
                      <span>İlgi Alanları</span>
                    </div>
                    <span className="text-[10px] text-[#9ca3af] font-mono">{counts.all}</span>
                  </button>
                </li>

                {/* 2. Politikalar (svg.verify-1) */}
                <li>
                  <button
                    onClick={() => onSelectTab('privacy')}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                      currentTab === 'privacy'
                        ? 'bg-[#252526] text-[#38bdf8] font-bold'
                        : 'text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Verify1Icon className="w-3.5 h-3.5 text-[#9ca3af]" />
                      <span>Politikalar</span>
                    </div>
                    <span className="text-[10px] text-[#9ca3af] font-mono">Yasal</span>
                  </button>
                </li>

                {/* 3. Geri Bildirim (svg.sms-edit) */}
                <li>
                  <a
                    href="https://github.com/Aleyulala/saved/discussions/?pli=1"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <SmsEditIcon className="w-3.5 h-3.5 text-[#9ca3af]" />
                      <span>Geri Bildirim</span>
                    </div>
                  </a>
                </li>
              </ul>
            )}
          </li>

          {/* XML 1:1 Bölücü Çizgi (.mnMn > li.br::after) */}
          <li className="py-1">
            <div className="w-full h-px bg-white/10 my-1" />
          </li>

          {/* 4. Geliştiriciler (svg.folder-code) */}
          <li className="pt-1">
            <div 
              onClick={() => setGelistiriciOpen(!gelistiriciOpen)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-[#d4d4d4] hover:bg-[#252526] hover:text-white cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FolderCodeIcon className="w-4 h-4 text-[#60cdff]" />
                <span>Geliştiriciler</span>
              </div>
              <ChevronDownIcon className={`w-3.5 h-3.5 text-[#989b9f] transition-transform duration-300 ${gelistiriciOpen ? 'rotate-180' : ''}`} />
            </div>

            {gelistiriciOpen && (
              <ul className="space-y-0.5 pl-3 border-l border-white/10 ml-4 mt-1">
                {/* 1. Ters Çevir (svg.arrow-swap-horizontal) */}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      const current = document.documentElement.getAttribute('dir') || 'ltr';
                      const next = current === 'rtl' ? 'ltr' : 'rtl';
                      document.documentElement.setAttribute('dir', next);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <ArrowSwapHorizontalIcon className="w-3.5 h-3.5 text-[#9ca3af]" />
                      <span>Ters Çevir</span>
                      <span className="text-[#60cdff] text-[10px] font-bold">New!</span>
                    </div>
                  </button>
                </li>

                {/* 2. Detaylı Ara (svg.search-normal-1) */}
                <li>
                  <a
                    href="https://search.google.com/test/rich-results"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <SearchNormalIcon className="w-3.5 h-3.5 text-[#9ca3af]" />
                      <span>Detaylı Ara</span>
                    </div>
                  </a>
                </li>

                {/* 3. Hız Testi (svg.speedometer) */}
                <li>
                  <a
                    href="https://pagespeed.web.dev/analysis"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <SpeedometerIcon className="w-3.5 h-3.5 text-[#9ca3af]" />
                      <span>Hız Testi</span>
                    </div>
                  </a>
                </li>
              </ul>
            )}
          </li>

        </ul>
      </div>

      {/* Alt Bölüm (.mnMob): E-posta (.PageList02) + 6 Sosyal Ağ Butonu (.LinkList04 / .mSoc) */}
      <div className="p-3 border-t border-[#252526] bg-[#1e1e1e] space-y-2.5">
        {/* PageList02: E-posta */}
        <div className="text-center">
          <a
            href="mailto:mrstar14155@gmail.com"
            className="text-[11px] text-[#989b9f] hover:text-[#60cdff] transition-colors font-mono tracking-wider"
          >
            ────Epostaৎ────
          </a>
        </div>

        {/* LinkList04: .mSoc 6 Sosyal Buton */}
        <div className="flex items-center justify-between text-[#a3a3a3] px-1">
          {/* 1. Instagram */}
          <a
            href="https://www.instagram.com/aleyul.ala/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-[#e1306c] hover:text-white flex items-center justify-center transition-all duration-200"
            title="Instagram"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
          </a>

          {/* 2. Telegram */}
          <a
            href="https://t.me/aleyyulala"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-[#229ed9] hover:text-white flex items-center justify-center transition-all duration-200"
            title="Telegram"
          >
            <TelegramIcon className="w-3.5 h-3.5" />
          </a>

          {/* 3. Element.io / Matrix */}
          <a
            href="https://matrix.to/#/#negronn-show:matrix.org"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-[#38bdf8] hover:text-black flex items-center justify-center transition-all duration-200"
            title="Element.io / Matrix: @negronn:matrix.org"
          >
            <MatrixIcon className="w-3.5 h-3.5" />
          </a>

          {/* 4. VKontakte */}
          <a
            href="https://vk.com/negronn"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-[#4680c2] hover:text-white flex items-center justify-center transition-all duration-200"
            title="VK (VKontakte)"
          >
            <VkIcon className="w-3.5 h-3.5" />
          </a>

          {/* 5. E-posta */}
          <a
            href="mailto:mrstar14155@gmail.com"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-[#ea4335] hover:text-white flex items-center justify-center transition-all duration-200"
            title="E-posta: mrstar14155@gmail.com"
          >
            <MailIcon className="w-3.5 h-3.5" />
          </a>

          {/* 6. Whatsapp / Telefon */}
          <a
            href="tel:05446412904"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-[#25d366] hover:text-white flex items-center justify-center transition-all duration-200"
            title="Telefon / Whatsapp: 0544 641 29 04"
          >
            <WhatsappIcon className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex items-center justify-between text-[10px] text-[#989b9f] font-mono px-1">
          <span>GNU GPL v3.0</span>
          <span>v1.0 • Plus UI</span>
        </div>
      </div>

    </aside>
  );
};
