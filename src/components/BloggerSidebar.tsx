import React, { useState } from 'react';
import { 
  Plus, 
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
  Code2
} from 'lucide-react';
import { 
  HomeIcon,
  FolderFavoriteIcon,
  SearchNormalIcon,
  ArrowSwapHorizontalIcon,
  SpeedometerIcon,
  InstagramIcon, 
  TelegramIcon, 
  MailIcon, 
  GithubIcon 
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
}

export const BloggerSidebar: React.FC<BloggerSidebarProps> = ({
  currentTab,
  onSelectTab,
  counts,
  onOpenNewLink
}) => {
  const [hizmetlerOpen, setHizmetlerOpen] = useState(true);
  const [klasorOpen, setKlasorOpen] = useState(true);
  const [gelistiriciOpen, setGelistiriciOpen] = useState(true);

  return (
    <aside className="w-[230px] bg-[#1e1e1e] border-r border-[#252526] flex flex-col justify-between h-[calc(100vh-60px)] shrink-0 text-xs select-none shadow-xs">
      
      {/* Üst Menü Bölümü (.mnMen) */}
      <div className="p-3 space-y-4 overflow-y-auto flex-1">
        
        {/* + Yeni Bağlantı Ekle Butonu */}
        <button
          onClick={onOpenNewLink}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#7dd3fc] hover:to-[#38bdf8] text-[#0f172a] font-bold text-xs shadow-md shadow-sky-500/20 active:scale-98 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.8]" />
          <span>Yeni Bağlantı</span>
        </button>

        {/* Blogger Gezinme Menüsü (.mnMn) */}
        <ul className="space-y-1">
          
          {/* 1. KÖK BUTON: Ana Sayfa (Hiçbir klasörün içinde değil, Blogger'daki gibi bağımsız) */}
          <li>
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'bg-[#252526] text-[#38bdf8]'
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
              <ul className="space-y-0.5 pl-3 border-l border-white/10 ml-4 mt-1">
                {/* 1. Etkileşimler (Saved Sabitlenenler) */}
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
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 text-[9px] font-bold">
                  New!
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#989b9f]">
                {klasorOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </div>
            </div>

            {klasorOpen && (
              <ul className="space-y-0.5 pl-3 border-l border-white/10 ml-4 mt-1">
                {/* 1. İlgi Alanları (Saved: Tüm Bağlantılar) */}
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

          {/* 4. KLASÖR 3: Geliştirici (theme-1915278968279215939.xml: 3 Buton) */}
          <li className="pt-1">
            <div 
              onClick={() => setGelistiriciOpen(!gelistiriciOpen)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-[#d4d4d4] hover:bg-[#252526] hover:text-white cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Code2 className="w-4 h-4 text-[#60cdff]" />
                <span>Geliştirici</span>
              </div>
              <div className="flex items-center gap-1 text-[#989b9f]">
                {gelistiriciOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </div>
            </div>

            {gelistiriciOpen && (
              <ul className="space-y-0.5 pl-3 border-l border-white/10 ml-4 mt-1">
                {/* 1. Ters Çevir (RTL / Yön Değiştirme) */}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      const current = document.documentElement.getAttribute('dir') || 'ltr';
                      const next = current === 'rtl' ? 'ltr' : 'rtl';
                      document.documentElement.setAttribute('dir', next);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <ArrowSwapHorizontalIcon className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#60cdff]" />
                      <span>Ters Çevir</span>
                      <span className="px-1.5 py-0.5 rounded-full bg-cyan-950/80 text-[#60cdff] text-[9px] font-bold">
                        New!
                      </span>
                    </div>
                  </button>
                </li>

                {/* 2. Detaylı Ara (Google Zengin Sonuçlar Testi) */}
                <li>
                  <a
                    href="https://search.google.com/test/rich-results"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <SearchNormalIcon className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#60cdff]" />
                      <span>Detaylı Ara</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-[#71717a] group-hover:text-[#60cdff]" />
                  </a>
                </li>

                {/* 3. Hız Testi (Google PageSpeed Insights) */}
                <li>
                  <a
                    href="https://pagespeed.web.dev/analysis"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <SpeedometerIcon className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#60cdff]" />
                      <span>Hız Testi</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-[#71717a] group-hover:text-[#60cdff]" />
                  </a>
                </li>
              </ul>
            )}
          </li>

        </ul>
      </div>

      {/* Alt Bölüm (.mnBrs Footer): Sosyal Ağlar (.mSoc) */}
      <div className="p-3 border-t border-[#252526] bg-[#1e1e1e] space-y-2">
        <div className="flex items-center justify-around text-[#a3a3a3]">
          <a
            href="https://www.instagram.com/aleyul.ala/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-[#e1306c] hover:text-white flex items-center justify-center transition-all duration-200"
            title="Instagram"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://t.me/aleyyulala"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-[#229ed9] hover:text-white flex items-center justify-center transition-all duration-200"
            title="Telegram"
          >
            <TelegramIcon className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://github.com/Aleyulala/saved"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-white hover:text-black flex items-center justify-center transition-all duration-200"
            title="GitHub Deposu"
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>

          <a
            href="mailto:mrstar14155@gmail.com"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-[#ea4335] hover:text-white flex items-center justify-center transition-all duration-200"
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
  );
};
