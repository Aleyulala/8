import React, { useState } from 'react';
import { 
  Plus, 
  ExternalLink,
  Layers,
  Zap,
  MessageSquare,
  FileText,
  ClipboardList,
  Eye,
  ShieldCheck,
  Send,
  Code2,
  Phone
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
  GithubIcon,
  VkIcon,
  MatrixIcon
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
  const [socialExpanded, setSocialExpanded] = useState(false);

  return (
    <aside className="w-[230px] bg-[#1e1e1e] border-r border-[#252526] flex flex-col justify-between h-[calc(100vh-60px)] shrink-0 text-xs select-none shadow-xs">
      
      {/* Üst Menü Bölümü (.mnMen) */}
      <div className="p-3 space-y-4 overflow-y-auto flex-1">
        
        {/* Blogger Gezinme Menüsü (.mnMn) */}
        <ul className="space-y-1">
          
          {/* 1. KÖK BUTON: Ana Sayfa */}
          <li>
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${
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

          {/* 2. TOPLULUK: Element.io / Matrix Grubu */}
          <li>
            <a
              href="https://matrix.to/#/#negronn-show:matrix.org"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium bg-[#1e293b]/40 hover:bg-[#1e293b] text-[#38bdf8] transition-colors group cursor-pointer border border-transparent"
              title="Element.io Matrix Topluluğu (Oda: !CYfB8T6Ikr-o54o-gK1nOkET7s1pxixgZ-GJEGIFIT0)"
            >
              <div className="flex items-center gap-2">
                <MatrixIcon className="w-4 h-4 text-[#38bdf8]" />
                <div className="flex flex-col text-left">
                  <span className="font-bold text-xs text-white group-hover:text-[#38bdf8]">Topluluk</span>
                  <span className="text-[9px] text-[#9ca3af] font-mono">@negronn:matrix.org</span>
                </div>
              </div>
              <ExternalLink className="w-3 h-3 text-[#38bdf8] opacity-70 group-hover:opacity-100" />
            </a>
          </li>

          {/* 3. KLASÖR 1: Hizmetler (+ / − Genişletilebilir) */}
          <li className="pt-1">
            <div 
              onClick={() => setHizmetlerOpen(!hizmetlerOpen)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-[#d4d4d4] hover:bg-[#252526] hover:text-white cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-[#60cdff]" />
                <span>Hizmetler</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setHizmetlerOpen(!hizmetlerOpen);
                }}
                className="w-5 h-5 rounded-full bg-[#1e1e1e] hover:bg-[#333333] border border-white/10 flex items-center justify-center text-xs font-bold text-[#60cdff] transition-all cursor-pointer"
                aria-label={hizmetlerOpen ? "Daralt" : "Genişlet"}
              >
                {hizmetlerOpen ? '−' : '+'}
              </button>
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

          {/* 4. KLASÖR 2: Klasör (+ / − Genişletilebilir) */}
          <li className="pt-1">
            <div 
              onClick={() => setKlasorOpen(!klasorOpen)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-[#d4d4d4] hover:bg-[#252526] hover:text-white cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Klasör</span>
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 text-[9px] font-bold">
                  New!
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setKlasorOpen(!klasorOpen);
                }}
                className="w-5 h-5 rounded-full bg-[#1e1e1e] hover:bg-[#333333] border border-white/10 flex items-center justify-center text-xs font-bold text-[#60cdff] transition-all cursor-pointer"
                aria-label={klasorOpen ? "Daralt" : "Genişlet"}
              >
                {klasorOpen ? '−' : '+'}
              </button>
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

                {/* 2. Politikalar (Saved Gizlilik Politikası & Lisans) */}
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
                      <ShieldCheck className="w-3.5 h-3.5 text-[#9ca3af]" />
                      <span>Politikalar</span>
                    </div>
                    <span className="text-[10px] text-[#9ca3af] font-mono">Yasal</span>
                  </button>
                </li>

                {/* 3. Geri Bildirim (Saved GitHub Discussions) */}
                <li>
                  <a
                    href="https://github.com/Aleyulala/saved/discussions"
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

          {/* 5. KLASÖR 3: Geliştirici (+ / − Genişletilebilir) */}
          <li className="pt-1">
            <div 
              onClick={() => setGelistiriciOpen(!gelistiriciOpen)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-[#d4d4d4] hover:bg-[#252526] hover:text-white cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Code2 className="w-4 h-4 text-[#60cdff]" />
                <span>Geliştirici</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setGelistiriciOpen(!gelistiriciOpen);
                }}
                className="w-5 h-5 rounded-full bg-[#1e1e1e] hover:bg-[#333333] border border-white/10 flex items-center justify-center text-xs font-bold text-[#60cdff] transition-all cursor-pointer"
                aria-label={gelistiriciOpen ? "Daralt" : "Genişlet"}
              >
                {gelistiriciOpen ? '−' : '+'}
              </button>
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

          {/* 6. KLASÖR 4 kaldırıldı */}

        </ul>
      </div>

      {/* Alt Bölüm (.mnBrs Footer): Sosyal Ağlar (.mSoc + Genişletme) */}
      <div className="p-3 border-t border-[#252526] bg-[#1e1e1e] space-y-2">
        <div className="flex items-center justify-around text-[#a3a3a3]">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/aleyul.ala/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-[#e1306c] hover:text-white flex items-center justify-center transition-all duration-200"
            title="Instagram"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/aleyyulala"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-[#229ed9] hover:text-white flex items-center justify-center transition-all duration-200"
            title="Telegram"
          >
            <TelegramIcon className="w-3.5 h-3.5" />
          </a>

          {/* Element.io / Matrix */}
          <a
            href="https://matrix.to/#/#negronn-show:matrix.org"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-[#38bdf8] hover:text-black flex items-center justify-center transition-all duration-200"
            title="Element.io / Matrix: @negronn:matrix.org"
          >
            <MatrixIcon className="w-3.5 h-3.5" />
          </a>

          {/* VKontakte */}
          <a
            href="https://vk.com/negronn"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-[#4680c2] hover:text-white flex items-center justify-center transition-all duration-200"
            title="VK (VKontakte)"
          >
            <VkIcon className="w-3.5 h-3.5" />
          </a>

          {/* E-posta */}
          <a
            href="mailto:mrstar14155@gmail.com"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-[#ea4335] hover:text-white flex items-center justify-center transition-all duration-200"
            title="E-posta"
          >
            <MailIcon className="w-3.5 h-3.5" />
          </a>

          {/* Genişlet Butonu (.mSocT) */}
          <button
            type="button"
            onClick={() => setSocialExpanded(!socialExpanded)}
            className="w-6 h-6 rounded-full border border-white/20 hover:border-[#60cdff] text-white hover:text-[#60cdff] flex items-center justify-center font-bold text-xs transition-all cursor-pointer"
            title={socialExpanded ? "Sosyal Medyayı Daralt" : "Daha Fazla Sosyal Bağlantı"}
          >
            {socialExpanded ? '−' : '+'}
          </button>
        </div>

        {/* Genişletilmiş İletişim / Sosyal Menü */}
        {socialExpanded && (
          <div className="pt-2 border-t border-white/5 flex items-center justify-center gap-3 text-[11px] animate-in fade-in duration-200">
            <a
              href="tel:05446412904"
              className="inline-flex items-center gap-1 text-[#9ca3af] hover:text-[#60cdff] transition-colors"
              title="Telefon ile İletişim"
            >
              <Phone className="w-3 h-3" />
              <span>0544 641 29 04</span>
            </a>
            <span className="text-[#52525b]">•</span>
            <a
              href="https://github.com/Aleyulala/saved"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#9ca3af] hover:text-white transition-colors"
            >
              <GithubIcon className="w-3 h-3" />
              <span>GitHub</span>
            </a>
          </div>
        )}

        <div className="flex items-center justify-between text-[10px] text-[#989b9f] font-mono px-1">
          <span>GNU GPL v3.0</span>
          <span>v1.0 • Plus UI</span>
        </div>
      </div>

    </aside>
  );
};
