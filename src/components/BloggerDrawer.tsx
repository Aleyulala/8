import React, { useState } from 'react';
import { 
  Hash, 
  Plus, 
  Settings as SettingsIcon, 
  FileUp, 
  Trash2, 
  ExternalLink, 
  FolderPlus, 
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Globe,
  Layers,
  Zap,
  MessageSquare,
  FileText,
  ClipboardList,
  Eye,
  Send
} from 'lucide-react';
import { 
  HomeIcon,
  Link21Icon,
  FolderFavoriteIcon,
  Folder2Icon,
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
  collections: CollectionItem[];
  tags: TagItem[];
  counts: {
    all: number;
    pinned: number;
    trash: number;
    collections: Record<number, number>;
    tags: Record<string, number>;
  };
  activeCollectionId?: number | null;
  activeTag?: string | null;
  onSelectCollection: (id: number) => void;
  onSelectTag: (tag: string) => void;
  onOpenNewLink: () => void;
  onOpenManageCollections: () => void;
  onOpenManageTags: () => void;
  onOpenImportExport: () => void;
  onOpenSettings: () => void;
  onSearchSubmit?: (query: string) => void;
}

export const BloggerDrawer: React.FC<BloggerDrawerProps> = ({
  isOpen,
  onClose,
  currentTab,
  onSelectTab,
  collections,
  tags,
  counts,
  activeCollectionId,
  activeTag,
  onSelectCollection,
  onSelectTag,
  onOpenNewLink,
  onOpenManageCollections,
  onOpenManageTags,
  onOpenImportExport,
  onOpenSettings,
  onSearchSubmit
}) => {
  const [collectionsExpanded, setCollectionsExpanded] = useState(true);
  const [tagsExpanded, setTagsExpanded] = useState(false);
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
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop overlay with blur (.fCls) */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      />

      {/* Drawer Panel (.mainL / .mnBr) */}
      <aside 
        className="relative w-[85vw] max-w-[340px] sm:max-w-[370px] bg-[#1a1a1a] border-r border-[#2d2d2d] h-full flex flex-col justify-between shadow-2xl z-10 overflow-hidden transform transition-transform duration-300 ease-out select-none"
      >
        {/* Drawer Header (Profile & Close button) */}
        <div className="p-4 border-b border-[#2d2d2d] flex items-center justify-between bg-[#1f1f1f]/80">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-md shadow-sky-500/20">
              A
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#1a1a1a]" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                ALİ YILDIZ
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-sky-500/20 text-[#38bdf8] font-mono font-normal">PRO</span>
              </h2>
              <p className="text-[11px] text-[#8e8e8e] truncate max-w-[170px]">
                saved • linkwarden
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#262626] hover:bg-[#333333] border border-[#383838] text-[#a3a3a3] hover:text-white flex items-center justify-center transition-colors"
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
              placeholder="Bağlantılarda ara... (Enter)"
              className="w-full bg-[#262626] border border-[#383838] focus:border-[#38bdf8] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#737373] outline-none transition-colors"
            />
            <SearchNormalIcon className="w-4 h-4 text-[#737373] absolute left-2.5 top-2.5" />
          </div>

          {/* Quick Action: + New Link button */}
          <button
            onClick={() => {
              onClose();
              onOpenNewLink();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#0f172a] font-bold text-xs shadow-md shadow-sky-500/15 active:scale-98 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Yeni Bağlantı Ekle</span>
          </button>

          {/* Section 1: Gezinme Menüsü (Blogger Main Navigation) */}
          <div className="space-y-0.5">
            <div className="px-2.5 py-1 text-[11px] font-bold text-[#737373] uppercase tracking-wider">
              Gezinme
            </div>

            <button
              onClick={() => {
                onClose();
                onSelectTab('dashboard');
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-colors ${
                currentTab === 'dashboard'
                  ? 'bg-[#262626] text-[#38bdf8] border border-[#383838]'
                  : 'text-[#d4d4d4] hover:bg-[#262626]/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HomeIcon className="w-4 h-4 text-[#38bdf8]" />
                <span>Dashboard (Ana Sayfa)</span>
              </div>
            </button>

            <button
              onClick={() => {
                onClose();
                onSelectTab('links');
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-colors ${
                currentTab === 'links'
                  ? 'bg-[#262626] text-[#38bdf8] border border-[#383838]'
                  : 'text-[#d4d4d4] hover:bg-[#262626]/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Link21Icon className="w-4 h-4 text-neutral-400" />
                <span>Tüm Bağlantılar</span>
              </div>
              <span className="text-[11px] text-[#737373] font-mono">{counts.all}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onSelectTab('pinned');
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-colors ${
                currentTab === 'pinned'
                  ? 'bg-[#262626] text-[#38bdf8] border border-[#383838]'
                  : 'text-[#d4d4d4] hover:bg-[#262626]/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderFavoriteIcon className="w-4 h-4 text-amber-400" />
                <span>Sabitlenenler</span>
              </div>
              <span className="text-[11px] text-[#737373] font-mono">{counts.pinned}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onSelectTab('trash');
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-colors ${
                currentTab === 'trash'
                  ? 'bg-[#262626] text-rose-400 border border-[#383838]'
                  : 'text-[#d4d4d4] hover:bg-[#262626]/60 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Trash2 className="w-4 h-4 text-rose-400" />
                <span>Çöp Kutusu</span>
              </div>
              <span className="text-[11px] text-[#737373] font-mono">{counts.trash}</span>
            </button>
          </div>

          {/* KLASÖR 1: Hizmetler (3 Buton) */}
          <div className="space-y-1">
            <div 
              onClick={() => setHizmetlerOpen(!hizmetlerOpen)}
              className="flex items-center justify-between px-2.5 py-1 text-[11px] font-bold text-[#737373] uppercase tracking-wider cursor-pointer hover:text-neutral-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Hizmetler</span>
              </div>
              {hizmetlerOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#737373]" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-[#737373]" />
              )}
            </div>

            {hizmetlerOpen && (
              <div className="space-y-0.5 pl-2">
                <a
                  href="https://negronshow.blogspot.com/p/muhabbet.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#262626] hover:text-[#38bdf8] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#38bdf8]" />
                    <span>Etkileşimler</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-[#737373] group-hover:text-[#38bdf8]" />
                </a>

                <a
                  href="https://notebooklm.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#262626] hover:text-[#38bdf8] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#38bdf8]" />
                    <span>Notlarınız</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-[#737373] group-hover:text-[#38bdf8]" />
                </a>

                <a
                  href="https://docs.google.com/forms/u/0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#262626] hover:text-[#38bdf8] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <ClipboardList className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#38bdf8]" />
                    <span>Forumlarınız</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-[#737373] group-hover:text-[#38bdf8]" />
                </a>
              </div>
            )}
          </div>

          {/* KLASÖR 2: Klasör (3 Buton + New! Rozeti) */}
          <div className="space-y-1">
            <div 
              onClick={() => setKlasorOpen(!klasorOpen)}
              className="flex items-center justify-between px-2.5 py-1 text-[11px] font-bold text-[#737373] uppercase tracking-wider cursor-pointer hover:text-neutral-300 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Klasör</span>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold">
                  New!
                </span>
              </div>
              {klasorOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#737373]" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-[#737373]" />
              )}
            </div>

            {klasorOpen && (
              <div className="space-y-0.5 pl-2">
                <button
                  onClick={() => {
                    onClose();
                    onSelectTab('links');
                  }}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#262626] hover:text-[#38bdf8] transition-colors group text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#38bdf8]" />
                    <span>İlgi Alanları</span>
                  </div>
                  <span className="text-[10px] text-[#737373] font-mono">{counts.all}</span>
                </button>

                <a
                  href="https://aleyulala.github.io/saved/privacy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#262626] hover:text-[#38bdf8] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#38bdf8]" />
                    <span>Politikalar</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-[#737373] group-hover:text-[#38bdf8]" />
                </a>

                <a
                  href="https://github.com/Aleyulala/saved/discussions/?pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#262626] hover:text-[#38bdf8] transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Send className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#38bdf8]" />
                    <span>Geri Bildirim</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-[#737373] group-hover:text-[#38bdf8]" />
                </a>
              </div>
            )}
          </div>

          {/* Section 2: Koleksiyonlar (14 Collections) */}
          <div className="space-y-1">
            <div 
              onClick={() => setCollectionsExpanded(!collectionsExpanded)}
              className="flex items-center justify-between px-2.5 py-1 text-[11px] font-bold text-[#737373] uppercase tracking-wider cursor-pointer hover:text-neutral-300 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Folder2Icon className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Koleksiyonlar ({collections.length})</span>
              </div>
              {collectionsExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#737373]" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-[#737373]" />
              )}
            </div>

            {collectionsExpanded && (
              <div className="space-y-0.5 max-h-48 overflow-y-auto pr-1">
                {collections.map((col) => {
                  const active = currentTab === 'collection' && activeCollectionId === col.id;
                  const count = (col.id && counts.collections[col.id]) || 0;
                  return (
                    <button
                      key={col.id}
                      onClick={() => {
                        onClose();
                        if (col.id) onSelectCollection(col.id);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
                        active
                          ? 'bg-[#262626] text-white border border-[#383838]'
                          : 'text-[#a3a3a3] hover:bg-[#262626]/50 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span 
                          className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                          style={{ backgroundColor: col.color || '#38bdf8' }}
                        />
                        <span className="truncate">{col.name}</span>
                      </div>
                      <span className="text-[10px] text-[#737373] font-mono shrink-0 ml-1">
                        {count}
                      </span>
                    </button>
                  );
                })}

                <button
                  onClick={() => {
                    onClose();
                    onOpenManageCollections();
                  }}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[#38bdf8] hover:bg-[#262626]/50 transition-colors text-[11px]"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>Koleksiyonları Yönet...</span>
                </button>
              </div>
            )}
          </div>

          {/* Section 3: Etiketler (Tags) */}
          <div className="space-y-1">
            <div 
              onClick={() => setTagsExpanded(!tagsExpanded)}
              className="flex items-center justify-between px-2.5 py-1 text-[11px] font-bold text-[#737373] uppercase tracking-wider cursor-pointer hover:text-neutral-300 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-emerald-400" />
                <span>Etiketler ({tags.length})</span>
              </div>
              {tagsExpanded ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#737373]" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-[#737373]" />
              )}
            </div>

            {tagsExpanded && (
              <div className="flex flex-wrap gap-1.5 p-1 max-h-32 overflow-y-auto">
                {tags.map((tag) => {
                  const active = currentTab === 'tag' && activeTag === tag.name;
                  const count = counts.tags[tag.name] || 0;
                  return (
                    <button
                      key={tag.name}
                      onClick={() => {
                        onClose();
                        onSelectTag(tag.name);
                      }}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] transition-colors ${
                        active
                          ? 'bg-[#38bdf8] text-[#0f172a] font-bold'
                          : 'bg-[#262626] text-[#a3a3a3] hover:text-white hover:bg-[#333333]'
                      }`}
                    >
                      <span>#{tag.name}</span>
                      <span className="text-[9px] opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 4: Blogger Ek Bağlantılar (External & Management Links) */}
          <div className="space-y-0.5 pt-2 border-t border-[#262626]">
            <div className="px-2.5 py-1 text-[11px] font-bold text-[#737373] uppercase tracking-wider">
              Blogger & Sistem
            </div>

            <a
              href="https://aleyulala.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#d4d4d4] hover:bg-[#262626]/60 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#ff5722]" />
                <span>ALİ YILDIZ Blog</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#737373]" />
            </a>

            <a
              href="https://github.com/Aleyulala/x"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#d4d4d4] hover:bg-[#262626]/60 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub Deposu</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-[#737373]" />
            </a>

            <button
              onClick={() => {
                onClose();
                onOpenImportExport();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#d4d4d4] hover:bg-[#262626]/60 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <FileUp className="w-4 h-4 text-emerald-400" />
                <span>Yedek Al / İçe Aktar</span>
              </div>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-[#d4d4d4] hover:bg-[#262626]/60 hover:text-white transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <SettingsIcon className="w-4 h-4 text-[#38bdf8]" />
                <span>Ayarlar & Bilgi</span>
              </div>
            </button>
          </div>

        </div>

        {/* Drawer Footer with Blogger Socials (.mSoc) & License */}
        <div className="p-3 border-t border-[#2d2d2d] bg-[#1f1f1f]/80 space-y-2.5">
          {/* Blogger Socials (.mSoc) */}
          <div className="flex items-center justify-center gap-2 text-[#a3a3a3]">
            <a
              href="https://www.instagram.com/aleyul.ala/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-[#262626] hover:bg-[#e1306c] hover:text-white flex items-center justify-center transition-all duration-200"
              title="Instagram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a
              href="https://t.me/aleyyulala"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-[#262626] hover:bg-[#229ed9] hover:text-white flex items-center justify-center transition-all duration-200"
              title="Telegram"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.535-.194 1.006.128.832.941z"/>
              </svg>
            </a>

            <a
              href="mailto:mrstar14155@gmail.com"
              className="w-7 h-7 rounded-full bg-[#262626] hover:bg-[#ea4335] hover:text-white flex items-center justify-center transition-all duration-200"
              title="E-posta"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>

            <a
              href="https://aleyulala.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-[#262626] hover:bg-[#ff5722] hover:text-white flex items-center justify-center transition-all duration-200"
              title="Blog"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#737373] font-mono">
            <span>GNU GPL v3.0</span>
            <span>v1.0.0</span>
          </div>
        </div>

      </aside>
    </div>
  );
};
