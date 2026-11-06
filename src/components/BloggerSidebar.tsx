import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  FolderPlus, 
  Hash,
  ChevronDown, 
  ChevronRight, 
  Globe, 
  ExternalLink,
  Settings as SettingsIcon,
  FileUp,
  Layers,
  Zap,
  MessageSquare,
  FileText,
  ClipboardList,
  Eye,
  ShieldCheck,
  Send
} from 'lucide-react';
import { 
  HomeIcon,
  Link21Icon,
  FolderFavoriteIcon,
  Folder2Icon,
  ArchiveIcon,
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
  onSelectCollection: (id: number) => void;
  onSelectTag: (tag: string) => void;
  collections: CollectionItem[];
  tags: TagItem[];
  counts: {
    all: number;
    pinned: number;
    trash: number;
    collections: Record<number, number>;
    tags: Record<string, number>;
  };
  onOpenNewLink: () => void;
  onOpenManageCollections: () => void;
  onOpenManageTags: () => void;
  onOpenSettings: () => void;
  onOpenImportExport: () => void;
}

export const BloggerSidebar: React.FC<BloggerSidebarProps> = ({
  currentTab,
  activeCollectionId,
  activeTag,
  onSelectTab,
  onSelectCollection,
  onSelectTag,
  collections,
  tags,
  counts,
  onOpenNewLink,
  onOpenManageCollections,
  onOpenManageTags,
  onOpenSettings,
  onOpenImportExport
}) => {
  const [collectionsOpen, setCollectionsOpen] = useState(true);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [hizmetlerOpen, setHizmetlerOpen] = useState(true);
  const [klasorOpen, setKlasorOpen] = useState(true);

  return (
    <aside className="w-64 bg-[#1e1e1e] border-r border-[rgba(255,255,255,0.08)] flex flex-col justify-between h-[calc(100vh-60px)] shrink-0 text-xs select-none shadow-xs">
      
      {/* Üst Kaydırılabilir Bölüm (.mnMen) */}
      <div className="p-3 space-y-4 overflow-y-auto flex-1">
        
        {/* + Yeni Link Ekle Butonu */}
        <button
          onClick={onOpenNewLink}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#7dd3fc] hover:to-[#38bdf8] text-[#0f172a] font-bold text-xs shadow-md shadow-sky-500/20 active:scale-98 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.8]" />
          <span>Yeni Bağlantı</span>
        </button>

        {/* Bölüm 1: Ana Gezinme Menüsü */}
        <div className="space-y-0.5">
          <div className="px-2.5 py-1 text-[11px] font-bold text-[#989b9f] uppercase tracking-wider">
            Gezinme
          </div>

          <button
            onClick={() => onSelectTab('dashboard')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-colors ${
              currentTab === 'dashboard'
                ? 'bg-[#252526] text-[#38bdf8] border border-[#383838]'
                : 'text-[#d4d4d4] hover:bg-[#252526]/70 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <HomeIcon className="w-4 h-4 text-[#38bdf8]" />
              <span>Ana Sayfa</span>
            </div>
          </button>

          <button
            onClick={() => onSelectTab('links')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-colors ${
              currentTab === 'links'
                ? 'bg-[#252526] text-[#38bdf8] border border-[#383838]'
                : 'text-[#d4d4d4] hover:bg-[#252526]/70 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Link21Icon className="w-4 h-4 text-[#989b9f]" />
              <span>Tüm Bağlantılar</span>
            </div>
            <span className="text-[11px] text-[#989b9f] font-mono">{counts.all}</span>
          </button>

          <button
            onClick={() => onSelectTab('pinned')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-colors ${
              currentTab === 'pinned'
                ? 'bg-[#252526] text-[#38bdf8] border border-[#383838]'
                : 'text-[#d4d4d4] hover:bg-[#252526]/70 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FolderFavoriteIcon className="w-4 h-4 text-amber-400" />
              <span>Sabitlenenler</span>
            </div>
            <span className="text-[11px] text-[#989b9f] font-mono">{counts.pinned}</span>
          </button>

          <button
            onClick={() => onSelectTab('trash')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-colors ${
              currentTab === 'trash'
                ? 'bg-[#252526] text-rose-400 border border-[#383838]'
                : 'text-[#d4d4d4] hover:bg-[#252526]/70 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Trash2 className="w-4 h-4 text-rose-400" />
              <span>Çöp Kutusu</span>
            </div>
            <span className="text-[11px] text-[#989b9f] font-mono">{counts.trash}</span>
          </button>
        </div>

        {/* KLASÖR 1: Hizmetler (3 Buton) */}
        <div className="space-y-1">
          <div 
            onClick={() => setHizmetlerOpen(!hizmetlerOpen)}
            className="flex items-center justify-between px-2.5 py-1 text-[11px] font-bold text-[#989b9f] uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#60cdff]" />
              <span>Hizmetler</span>
            </div>
            <div className="flex items-center gap-1 text-[#989b9f]">
              {hizmetlerOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </div>
          </div>

          {hizmetlerOpen && (
            <div className="space-y-0.5 pl-2">
              <a
                href="https://negronshow.blogspot.com/p/muhabbet.html"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#60cdff]" />
                  <span>Etkileşimler</span>
                </div>
                <ExternalLink className="w-3 h-3 text-[#71717a] group-hover:text-[#60cdff]" />
              </a>

              <a
                href="https://notebooklm.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#60cdff]" />
                  <span>Notlarınız</span>
                </div>
                <ExternalLink className="w-3 h-3 text-[#71717a] group-hover:text-[#60cdff]" />
              </a>

              <a
                href="https://docs.google.com/forms/u/0/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#60cdff]" />
                  <span>Forumlarınız</span>
                </div>
                <ExternalLink className="w-3 h-3 text-[#71717a] group-hover:text-[#60cdff]" />
              </a>
            </div>
          )}
        </div>

        {/* KLASÖR 2: Klasör (3 Buton + New! Rozeti) */}
        <div className="space-y-1">
          <div 
            onClick={() => setKlasorOpen(!klasorOpen)}
            className="flex items-center justify-between px-2.5 py-1 text-[11px] font-bold text-[#989b9f] uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Klasör</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold lowercase">
                New!
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#989b9f]">
              {klasorOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </div>
          </div>

          {klasorOpen && (
            <div className="space-y-0.5 pl-2">
              <button
                onClick={() => onSelectTab('links')}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors group text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#60cdff]" />
                  <span>İlgi Alanları</span>
                </div>
                <span className="text-[10px] text-[#9ca3af] font-mono">{counts.all}</span>
              </button>

              <a
                href="https://aleyulala.github.io/saved/privacy.html"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#60cdff]" />
                  <span>Politikalar</span>
                </div>
                <ExternalLink className="w-3 h-3 text-[#71717a] group-hover:text-[#60cdff]" />
              </a>

              <a
                href="https://github.com/Aleyulala/saved/discussions/?pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-[#d4d4d4] hover:bg-[#252526] hover:text-[#60cdff] transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <Send className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#60cdff]" />
                  <span>Geri Bildirim</span>
                </div>
                <ExternalLink className="w-3 h-3 text-[#71717a] group-hover:text-[#60cdff]" />
              </a>
            </div>
          )}
        </div>

        {/* Bölüm 2: Koleksiyonlar (14 Kategori) */}
        <div className="space-y-1">
          <div 
            onClick={() => setCollectionsOpen(!collectionsOpen)}
            className="flex items-center justify-between px-2.5 py-1 text-[11px] font-bold text-[#989b9f] uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <Folder2Icon className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Koleksiyonlar</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-[#989b9f]">{collections.length}</span>
              {collectionsOpen ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </div>
          </div>

          {collectionsOpen && (
            <div className="space-y-0.5 max-h-52 overflow-y-auto pr-1">
              {collections.map((col) => {
                const active = currentTab === 'collection' && activeCollectionId === col.id;
                const count = (col.id && counts.collections[col.id]) || 0;
                return (
                  <button
                    key={col.id}
                    onClick={() => col.id && onSelectCollection(col.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
                      active
                        ? 'bg-[#252526] text-white border border-[#383838]'
                        : 'text-[#a3a3a3] hover:bg-[#252526]/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs"
                        style={{ backgroundColor: col.color || '#38bdf8' }}
                      />
                      <span className="truncate">{col.name}</span>
                    </div>
                    <span className="text-[10px] text-[#989b9f] font-mono shrink-0 ml-1">
                      {count}
                    </span>
                  </button>
                );
              })}

              <button
                onClick={onOpenManageCollections}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[#38bdf8] hover:bg-[#252526]/50 transition-colors text-[11px]"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span>Koleksiyonları Yönet...</span>
              </button>
            </div>
          )}
        </div>

        {/* Bölüm 3: Etiketler (Tags) */}
        <div className="space-y-1">
          <div 
            onClick={() => setTagsOpen(!tagsOpen)}
            className="flex items-center justify-between px-2.5 py-1 text-[11px] font-bold text-[#989b9f] uppercase tracking-wider cursor-pointer hover:text-white transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-emerald-400" />
              <span>Etiketler</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-[#989b9f]">{tags.length}</span>
              {tagsOpen ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </div>
          </div>

          {tagsOpen && (
            <div className="flex flex-wrap gap-1 p-1 max-h-28 overflow-y-auto">
              {tags.map((tag) => {
                const active = currentTab === 'tag' && activeTag === tag.name;
                const count = counts.tags[tag.name] || 0;
                return (
                  <button
                    key={tag.name}
                    onClick={() => onSelectTag(tag.name)}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] transition-colors ${
                      active
                        ? 'bg-[#38bdf8] text-[#0f172a] font-bold'
                        : 'bg-[#252526] text-[#a3a3a3] hover:text-white hover:bg-[#2d2d30]'
                    }`}
                  >
                    <span>#{tag.name}</span>
                    <span className="opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Bölüm 4: Blogger & Sistem Bağlantıları */}
        <div className="space-y-0.5 pt-2 border-t border-[#2d2d2d]">
          <div className="px-2.5 py-1 text-[11px] font-bold text-[#989b9f] uppercase tracking-wider">
            Blogger & Sistem
          </div>

          <a
            href="https://aleyulala.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[#d4d4d4] hover:bg-[#252526]/70 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-[#ff5722]" />
              <span>ALİ YILDIZ Blog</span>
            </div>
            <ExternalLink className="w-3 h-3 text-[#989b9f]" />
          </a>

          <a
            href="https://github.com/Aleyulala/x"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[#d4d4d4] hover:bg-[#252526]/70 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <GithubIcon className="w-3.5 h-3.5 text-white" />
              <span>GitHub Deposu</span>
            </div>
            <ExternalLink className="w-3 h-3 text-[#989b9f]" />
          </a>

          <button
            onClick={onOpenImportExport}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-[#d4d4d4] hover:bg-[#252526]/70 hover:text-white transition-colors"
          >
            <FileUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Yedek Al / İçe Aktar</span>
          </button>

          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-[#d4d4d4] hover:bg-[#252526]/70 hover:text-white transition-colors"
          >
            <SettingsIcon className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Ayarlar & Bilgi</span>
          </button>
        </div>

      </div>

      {/* Alt Bölüm (.mnBrs Footer): Blogger Sosyal Ağlar (.mSoc) */}
      <div className="p-3 border-t border-[rgba(255,255,255,0.08)] bg-[#1e1e1e] space-y-2">
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
            href="mailto:mrstar14155@gmail.com"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-[#ea4335] hover:text-white flex items-center justify-center transition-all duration-200"
            title="E-posta"
          >
            <MailIcon className="w-3.5 h-3.5" />
          </a>

          <a
            href="https://aleyulala.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-7 h-7 rounded-full bg-[#252526] hover:bg-[#ff5722] hover:text-white flex items-center justify-center transition-all duration-200"
            title="Blog"
          >
            <Globe className="w-3.5 h-3.5" />
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
