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
  InstagramIcon, 
  TelegramIcon, 
  MailIcon, 
  VkIcon,
  MatrixIcon,
  WhatsappIcon
} from './BloggerIcons';
import { CollectionItem, TagItem } from '../types';

interface BloggerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTab: string;
  onSelectTab: (tab: any) => void;
  collections?: CollectionItem[];
  tags?: TagItem[];
  counts: {
    all: number;
    pinned: number;
    trash: number;
    collections: Record<number, number>;
    tags: Record<string, number>;
  };
  activeCollectionId?: number | null;
  activeTag?: string | null;
  onSelectCollection?: (id: number) => void;
  onSelectTag?: (tag: string) => void;
  onOpenNewLink: () => void;
  onOpenManageCollections?: () => void;
  onOpenManageTags?: () => void;
  onOpenImportExport?: () => void;
  onOpenSettings?: () => void;
  onSearchSubmit?: (query: string) => void;
  onOpenSearchModal?: () => void;
}

export const BloggerDrawer: React.FC<BloggerDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
  counts,
  onOpenSearchModal
}) => {
  const [hizmetlerOpen, setHizmetlerOpen] = useState(true);
  const [klasorOpen, setKlasorOpen] = useState(true);
  const [gelistiriciOpen, setGelistiriciOpen] = useState(true);
  const [localSearch] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex select-none">
      {/* Backdrop overlay (.fCls) */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Panel (.mainL / .mnBr) */}
      <aside 
        className="blogger-drawer relative w-[85vw] max-w-[360px] bg-[#1e1e1e] border-r border-[#252526] h-full flex flex-col justify-between shadow-2xl z-10 overflow-hidden transform transition-transform duration-300 ease-out"
      >
        {/* Drawer Header (.mnH - XML 1:1) */}
        <div className="h-[60px] px-4 border-b border-[#252526] flex items-center justify-between bg-[#1e1e1e]">
          <span className="text-sm font-medium text-[#989b9f]">Gezinme Menüsü</span>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#252526] hover:bg-[#333333] text-[#a3a3a3] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Kapat"
            aria-label="Kapat"
          >
            <CloseIcon className="w-4 h-4 close-icon" />
          </button>
        </div>

        {/* Drawer Scrollable Content (.mnMen) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          
          {/* Fast Search input */}
          <div 
            onClick={() => {
              if (onOpenSearchModal) {
                onClose();
                onOpenSearchModal();
              }
            }}
            className="relative cursor-pointer group"
            title="Gelişmiş Arama & Bul Paneli (Ctrl+K)"
          >
            <input
              type="text"
              value={localSearch}
              readOnly
              placeholder="Bul... (Ctrl+K)"
              className="w-full bg-[#252526] group-hover:bg-[#28282b] border border-transparent group-hover:border-[var(--linkC,#9aa0a6)]/30 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-[#737373] outline-none transition-colors cursor-pointer"
            />
            <SearchNormalIcon className="w-[18px] h-[18px] text-[#737373] group-hover:text-[var(--linkC,#9aa0a6)] transition-colors absolute left-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Blogger Gezinme Menüsü (.mnMn) */}
          <ul className="space-y-1 mnMn">
            
            {/* 1. KÖK BUTON: Ana Sayfa (svg.home) - XML 1:1: Sadece ana sayfa DIŞINDAKİ sayfalarda gözükür (!data:view.isHomepage) */}
            {currentTab !== 'dashboard' && (
              <li>
                <button
                  onClick={() => {
                    onClose();
                    onSelectTab('dashboard');
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-colors cursor-pointer text-[#d4d4d4] hover:bg-[#252526]/70 hover:text-white"
                >
                  <div className="flex items-center gap-2.5">
                    <HomeIcon className="w-[18px] h-[18px] shrink-0 opacity-80 text-[var(--linkC,#9aa0a6)]" />
                    <span className="font-semibold text-xs">Ana Sayfa</span>
                  </div>
                </button>
              </li>
            )}

            {/* 2. KLASÖR 1: Hizmetler (svg.hierarchy-4) */}
            <li className="pt-1 relative">
              <div 
                onClick={() => setHizmetlerOpen(!hizmetlerOpen)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-[#d4d4d4] hover:bg-[#252526] hover:text-white cursor-pointer transition-colors relative"
              >
                <div className="flex items-center gap-2.5">
                  <Hierarchy4Icon className="w-[18px] h-[18px] shrink-0 opacity-80 text-[var(--linkC,#9aa0a6)]" />
                  <span>Hizmetler</span>
                </div>
                {/* xml 1:1 li.nt bildirim noktası */}
                <span className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[var(--linkC,#9aa0a6)] shadow-[0_0_8px_var(--linkC,#9aa0a6)]" />
                
                <ChevronDownIcon className={`w-3.5 h-3.5 text-[#989b9f] transition-transform duration-300 ${hizmetlerOpen ? 'rotate-180' : ''}`} />
              </div>

              {hizmetlerOpen && (
                <ul className="space-y-0.5 pl-3 border-l border-white/10 ml-4 mt-1">
                  {/* 1. Etkileşimler (svg.message-notif-1) */}
                  <li>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectTab('pinned');
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                        currentTab === 'pinned'
                          ? 'bg-[#252526] text-[var(--linkC,#9aa0a6)] font-bold'
                          : 'text-[#d4d4d4] hover:bg-[#252526] hover:text-[var(--linkC,#9aa0a6)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MessageNotif1Icon className="w-[18px] h-[18px] shrink-0 opacity-80 text-[var(--linkC,#9aa0a6)]" />
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
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[var(--linkC,#9aa0a6)] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Edit3Icon className="w-[18px] h-[18px] shrink-0 opacity-80 text-[#9ca3af]" />
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
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[var(--linkC,#9aa0a6)] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Profile2UserIcon className="w-[18px] h-[18px] shrink-0 opacity-80 text-[#9ca3af]" />
                        <span>Forumlarınız</span>
                      </div>
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* 3. KLASÖR 2: Klasör (svg.flash) */}
            <li className="pt-1">
              <div 
                onClick={() => setKlasorOpen(!klasorOpen)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-[#d4d4d4] hover:bg-[#252526] hover:text-white cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FlashIcon className="w-[18px] h-[18px] shrink-0 opacity-80 text-amber-400" />
                  <span>Klasör</span>
                  <span className="badge-new text-[var(--linkC,#9aa0a6)] text-[11px] font-bold ml-1">
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
                      onClick={() => {
                        onClose();
                        onSelectTab('links');
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                        currentTab === 'links'
                          ? 'bg-[#252526] text-[var(--linkC,#9aa0a6)] font-bold'
                          : 'text-[#d4d4d4] hover:bg-[#252526] hover:text-[var(--linkC,#9aa0a6)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <EyeIcon className="w-[18px] h-[18px] shrink-0 opacity-80 text-[#9ca3af]" />
                        <span>İlgi Alanları</span>
                      </div>
                      <span className="text-[10px] text-[#9ca3af] font-mono">{counts.all}</span>
                    </button>
                  </li>

                  {/* 2. Politikalar (svg.verify-1) */}
                  <li>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectTab('privacy');
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                        currentTab === 'privacy'
                          ? 'bg-[#252526] text-[var(--linkC,#9aa0a6)] font-bold'
                          : 'text-[#d4d4d4] hover:bg-[#252526] hover:text-[var(--linkC,#9aa0a6)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Verify1Icon className="w-[18px] h-[18px] shrink-0 opacity-80 text-[#9ca3af]" />
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
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[var(--linkC,#9aa0a6)] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <SmsEditIcon className="w-[18px] h-[18px] shrink-0 opacity-80 text-[#9ca3af]" />
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

            {/* 4. KLASÖR 3: Geliştiriciler (svg.folder-code) */}
            <li className="pt-1">
              <div 
                onClick={() => setGelistiriciOpen(!gelistiriciOpen)}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-[#d4d4d4] hover:bg-[#252526] hover:text-white cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FolderCodeIcon className="w-[18px] h-[18px] shrink-0 opacity-80 text-[var(--linkC,#9aa0a6)]" />
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
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[var(--linkC,#9aa0a6)] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <ArrowSwapHorizontalIcon className="w-[18px] h-[18px] shrink-0 opacity-80 text-[#9ca3af]" />
                        <span>Ters Çevir</span>
                        <span className="text-[var(--linkC,#9aa0a6)] text-[10px] font-bold">New!</span>
                      </div>
                    </button>
                  </li>

                  {/* 2. Detaylı Ara (svg.search-normal-1) */}
                  <li>
                    <a
                      href="https://search.google.com/test/rich-results"
                      target="_blank"
                      rel="nofollow noreferrer noopener"
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[var(--linkC,#9aa0a6)] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <SearchNormalIcon className="w-[18px] h-[18px] shrink-0 opacity-80 text-[#9ca3af]" />
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
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[var(--linkC,#9aa0a6)] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <SpeedometerIcon className="w-[18px] h-[18px] shrink-0 opacity-80 text-[#9ca3af]" />
                        <span>Hız Testi</span>
                      </div>
                    </a>
                  </li>
                </ul>
              )}
            </li>

          </ul>
        </div>

        {/* Alt Bölüm (.mnMob Footer): E-posta (.PageList02) + 6 Sosyal Buton (.LinkList04 / .mSoc) */}
        <div className="p-4 border-t border-[#252526] bg-[#1e1e1e] space-y-3">
          {/* PageList02: E-posta */}
          <div className="text-center">
            <a
              href="mailto:mrstar14155@gmail.com"
              className="text-[11px] text-[#989b9f] hover:text-[var(--linkC,#9aa0a6)] transition-colors font-mono tracking-wider"
            >
              ────Epostaৎ────
            </a>
          </div>

          <div className="mSoc flex items-center justify-between text-[#a3a3a3] px-1">
            {/* 1. Instagram */}
            <a
              href="https://www.instagram.com/aleyul.ala/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#252526] hover:bg-[#e1306c] hover:text-white flex items-center justify-center transition-all duration-200"
              title="Instagram"
            >
              <InstagramIcon className="w-[18px] h-[18px] shrink-0 opacity-80" />
            </a>

            {/* 2. Telegram */}
            <a
              href="https://t.me/aleyyulala"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#252526] hover:bg-[#229ed9] hover:text-white flex items-center justify-center transition-all duration-200"
              title="Telegram"
            >
              <TelegramIcon className="w-[18px] h-[18px] shrink-0 opacity-80" />
            </a>

            {/* 3. Element.io / Matrix */}
            <a
              href="https://matrix.to/#/#negronn-show:matrix.org"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#252526] hover:bg-[var(--linkC,#9aa0a6)] hover:text-black flex items-center justify-center transition-all duration-200"
              title="Element.io / Matrix: @negronn:matrix.org"
            >
              <MatrixIcon className="w-[18px] h-[18px] shrink-0 opacity-80" />
            </a>

            {/* 4. VKontakte */}
            <a
              href="https://vk.com/negronn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-[#252526] hover:bg-[#4680c2] hover:text-white flex items-center justify-center transition-all duration-200"
              title="VK (VKontakte)"
            >
              <VkIcon className="w-[18px] h-[18px] shrink-0 opacity-80" />
            </a>

            {/* 5. E-posta */}
            <a
              href="mailto:mrstar14155@gmail.com"
              className="w-8 h-8 rounded-full bg-[#252526] hover:bg-[#ea4335] hover:text-white flex items-center justify-center transition-all duration-200"
              title="E-posta: mrstar14155@gmail.com"
            >
              <MailIcon className="w-[18px] h-[18px] shrink-0 opacity-80" />
            </a>

            {/* 6. Whatsapp / Telefon */}
            <a
              href="tel:05446412904"
              className="w-8 h-8 rounded-full bg-[#252526] hover:bg-[#25d366] hover:text-white flex items-center justify-center transition-all duration-200"
              title="Telefon / Whatsapp: 0544 641 29 04"
            >
              <WhatsappIcon className="w-[18px] h-[18px] shrink-0 opacity-80" />
            </a>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#989b9f] font-mono px-2">
            <span>GNU GPL v3.0</span>
            <span>v1.0 • Plus UI</span>
          </div>
        </div>

      </aside>
    </div>
  );
};
