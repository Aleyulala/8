import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  ExternalLink,
  Layers,
  Zap,
  MessageSquare,
  FileText,
  ClipboardList,
  Eye,
  ShieldCheck,
  Send,
  Plus
} from 'lucide-react';
import { 
  HomeIcon,
  FolderFavoriteIcon,
  SearchNormalIcon,
  CloseIcon,
  InstagramIcon, 
  TelegramIcon, 
  MailIcon, 
  GithubIcon 
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
}

export const BloggerDrawer: React.FC<BloggerDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
  counts,
  onOpenNewLink,
  onSearchSubmit
}) => {
  const [hizmetlerOpen, setHizmetlerOpen] = useState(true);
  const [klasorOpen, setKlasorOpen] = useState(true);
  const [localSearch, setLocalSearch] = useState('');

  if (!isOpen) return null;

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearchSubmit) {
      onSearchSubmit(localSearch);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex select-none">
      {/* Backdrop overlay (.fCls) */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Panel (.mainL / .mnBr) */}
      <aside 
        className="relative w-[85vw] max-w-[320px] bg-[#1e1e1e] border-r border-[#2d2d2d] h-full flex flex-col justify-between shadow-2xl z-10 overflow-hidden transform transition-transform duration-300 ease-out"
      >
        {/* Drawer Header: SAVED Brand & Close button */}
        <div className="p-4 border-b border-[#2d2d2d] flex items-center justify-between bg-[#252526]">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-wider text-white uppercase">
              SAVED
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#1e1e1e] hover:bg-[#333333] border border-[#383838] text-[#a3a3a3] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Kapat"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Scrollable Content (.mnMen) */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          
          {/* Fast Search input */}
          <div className="relative">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={handleSearchKeyPress}
              placeholder="Bul... (Enter)"
              className="w-full bg-[#252526] border border-[#383838] focus:border-[#60cdff] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#737373] outline-none transition-colors"
            />
            <SearchNormalIcon className="w-4 h-4 text-[#737373] absolute left-2.5 top-2.5" />
          </div>

          {/* + Yeni Bağlantı Ekle Butonu */}
          <button
            onClick={() => {
              onClose();
              onOpenNewLink();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#7dd3fc] hover:to-[#38bdf8] text-[#0f172a] font-bold text-xs shadow-md shadow-sky-500/20 active:scale-98 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.8]" />
            <span>Yeni Bağlantı</span>
          </button>

          {/* Blogger Gezinme Menüsü (.mnMn) */}
          <ul className="space-y-1">
            
            {/* 1. KÖK BUTON: Ana Sayfa */}
            <li>
              <button
                onClick={() => {
                  onClose();
                  onSelectTab('dashboard');
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors cursor-pointer ${
                  currentTab === 'dashboard'
                    ? 'bg-[#252526] text-[#38bdf8] border border-[#383838]'
                    : 'text-[#d4d4d4] hover:bg-[#252526]/70 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <HomeIcon className="w-4 h-4 text-[#38bdf8]" />
                  <span className="font-semibold text-xs">Ana Sayfa</span>
                </div>
              </button>
            </li>

            {/* 2. KLASÖR 1: Hizmetler (3 Buton) */}
            <li className="pt-1">
              <div 
                onClick={() => setHizmetlerOpen(!hizmetlerOpen)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#d4d4d4] hover:bg-[#252526] hover:text-white cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-[#60cdff]" />
                  <span>Hizmetler</span>
                </div>
                <div className="flex items-center gap-1 text-[#989b9f]">
                  {hizmetlerOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </div>
              </div>

              {hizmetlerOpen && (
                <ul className="space-y-0.5 pl-3 border-l-2 border-[#383838] ml-4 mt-1">
                  {/* 1. Etkileşimler (Saved Sabitlenenler) */}
                  <li>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectTab('pinned');
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                        currentTab === 'pinned'
                          ? 'bg-[#252526] text-[#38bdf8] font-bold'
                          : 'text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FolderFavoriteIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>Etkileşimler</span>
                      </div>
                      <span className="text-[10px] text-[#9ca3af] font-mono">{counts.pinned}</span>
                    </button>
                  </li>

                  {/* 2. Notlarınız (NotebookLM) */}
                  <li>
                    <a
                      href="https://notebooklm.google.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#60cdff]" />
                        <span>Notlarınız</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-[#71717a] group-hover:text-[#60cdff]" />
                    </a>
                  </li>

                  {/* 3. Forumlarınız (Google Forms) */}
                  <li>
                    <a
                      href="https://docs.google.com/forms/u/0/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <ClipboardList className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#60cdff]" />
                        <span>Forumlarınız</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-[#71717a] group-hover:text-[#60cdff]" />
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* 3. KLASÖR 2: Klasör (New! Rozeti + 3 Buton) */}
            <li className="pt-1">
              <div 
                onClick={() => setKlasorOpen(!klasorOpen)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#d4d4d4] hover:bg-[#252526] hover:text-white cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Klasör</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold">
                    New!
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#989b9f]">
                  {klasorOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </div>
              </div>

              {klasorOpen && (
                <ul className="space-y-0.5 pl-3 border-l-2 border-[#383838] ml-4 mt-1">
                  {/* 1. İlgi Alanları (Saved: Tüm Bağlantılar) */}
                  <li>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectTab('links');
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                        currentTab === 'links'
                          ? 'bg-[#252526] text-[#38bdf8] font-bold'
                          : 'text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5 text-[#9ca3af]" />
                        <span>İlgi Alanları</span>
                      </div>
                      <span className="text-[10px] text-[#9ca3af] font-mono">{counts.all}</span>
                    </button>
                  </li>

                  {/* 2. Politikalar (Saved Gizlilik Politikası) */}
                  <li>
                    <a
                      href="https://aleyulala.github.io/saved/privacy.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#60cdff]" />
                        <span>Politikalar</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-[#71717a] group-hover:text-[#60cdff]" />
                    </a>
                  </li>

                  {/* 3. Geri Bildirim (Saved GitHub Discussions) */}
                  <li>
                    <a
                      href="https://github.com/Aleyulala/saved/discussions/?pli=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <Send className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#60cdff]" />
                        <span>Geri Bildirim</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-[#71717a] group-hover:text-[#60cdff]" />
                    </a>
                  </li>
                </ul>
              )}
            </li>

          </ul>
        </div>

        {/* Drawer Footer (.mSoc) */}
        <div className="p-3 border-t border-[rgba(255,255,255,0.08)] bg-[#252526] space-y-2">
          <div className="flex items-center justify-around text-[#a3a3a3]">
            <a
              href="https://www.instagram.com/aleyul.ala/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-[#1e1e1e] hover:bg-[#e1306c] hover:text-white flex items-center justify-center transition-all duration-200"
              title="Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://t.me/aleyyulala"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-[#1e1e1e] hover:bg-[#229ed9] hover:text-white flex items-center justify-center transition-all duration-200"
              title="Telegram"
            >
              <TelegramIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://github.com/Aleyulala/saved"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-[#1e1e1e] hover:bg-white hover:text-black flex items-center justify-center transition-all duration-200"
              title="GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href="mailto:mrstar14155@gmail.com"
              className="w-7 h-7 rounded-full bg-[#1e1e1e] hover:bg-[#ea4335] hover:text-white flex items-center justify-center transition-all duration-200"
              title="E-posta"
            >
              <MailIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#989b9f] font-mono px-1">
            <span>GNU GPL v3.0</span>
            <span>saved v1.0</span>
          </div>
        </div>

      </aside>
    </div>
  );
};
