import React from 'react';
import { 
  Globe, 
  ExternalLink, 
  Tag as TagIcon, 
  Folder, 
  HardDrive, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Hash
} from 'lucide-react';
import { 
  PulseIcon, 
  InstagramIcon, 
  TelegramIcon, 
  MailIcon 
} from './BloggerIcons';
import { CollectionItem, LinkItem, TagItem } from '../types';
import { getDomain, getFaviconUrl } from '../utils/favicon';

interface BloggerRightSidebarProps {
  pinnedLinks: LinkItem[];
  collections: CollectionItem[];
  tags: TagItem[];
  counts: {
    all: number;
    pinned: number;
    trash: number;
    collections: Record<number, number>;
    tags: Record<string, number>;
  };
  storageInfo: {
    formattedUsed: string;
    formattedQuota: string;
    percentage: number;
  };
  onSelectCollection: (id: number) => void;
  onSelectTag: (tag: string) => void;
  onOpenDetail: (link: LinkItem) => void;
}

export const BloggerRightSidebar: React.FC<BloggerRightSidebarProps> = ({
  pinnedLinks,
  collections,
  tags,
  counts,
  storageInfo,
  onSelectCollection,
  onSelectTag,
  onOpenDetail
}) => {
  // Top 5 largest collections
  const sortedCollections = [...collections]
    .map(c => ({ ...c, count: (c.id && counts.collections[c.id]) || 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Top pinned / popular links
  const featuredLinks = pinnedLinks.slice(0, 5);

  return (
    <aside className="w-72 xl:w-80 bg-[#1e1e1e] border-l border-[rgba(255,255,255,0.08)] h-[calc(100vh-60px)] overflow-y-auto p-4 space-y-5 hidden lg:block select-none shadow-xs text-xs">
      
      {/* Widget 1: Blogger Yazar Kartı (Profile01) */}
      <div className="rounded-2xl bg-[#252526] border border-[#383838] p-4 space-y-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5 shadow-md">
            <div className="w-full h-full rounded-[14px] bg-[#1e1e1e] flex items-center justify-center font-bold text-sm text-[#fffdfc]">
              AY
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#1e1e1e]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-sm text-[#fffdfc] truncate">Ali Yıldız</h3>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#ff5722]/20 text-[#ff5722] font-semibold">BLOGGER</span>
            </div>
            <p className="text-[11px] text-[#989b9f] truncate">
              aleyulala.blogspot.com
            </p>
          </div>
        </div>

        <p className="text-[11px] text-[#989b9f] leading-relaxed">
          Local-First Linkwarden yöneticisi. 352 bağlantı ve 14 kategoriyle tüm web akışınız çevrimdışı elinizin altında.
        </p>

        {/* Social Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <a
            href="https://aleyulala.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-[#1e1e1e] hover:bg-[#ff5722] text-[#d4d4d4] hover:text-white border border-[#383838] hover:border-transparent transition-all font-semibold text-[11px]"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Blog</span>
          </a>
          <a
            href="https://t.me/aleyyulala"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-xl bg-[#1e1e1e] hover:bg-[#229ed9] text-[#d4d4d4] hover:text-white border border-[#383838] hover:border-transparent flex items-center justify-center transition-all"
            title="Telegram"
          >
            <TelegramIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="https://www.instagram.com/aleyul.ala/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-xl bg-[#1e1e1e] hover:bg-[#e1306c] text-[#d4d4d4] hover:text-white border border-[#383838] hover:border-transparent flex items-center justify-center transition-all"
            title="Instagram"
          >
            <InstagramIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href="mailto:mrstar14155@gmail.com"
            className="w-8 h-8 rounded-xl bg-[#1e1e1e] hover:bg-[#ea4335] text-[#d4d4d4] hover:text-white border border-[#383838] hover:border-transparent flex items-center justify-center transition-all"
            title="E-posta"
          >
            <MailIcon className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Widget 2: Sabitlenmiş & Popüler Bağlantılar (PopularPosts01) */}
      <div className="rounded-2xl bg-[#252526] border border-[#383838] p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#333333] pb-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-[#38bdf8]/15 text-[#38bdf8] flex items-center justify-center">
              <PulseIcon className="w-3.5 h-3.5" />
            </span>
            <h3 className="font-bold text-xs text-[#fffdfc] uppercase tracking-wider">
              Popüler Bağlantılar
            </h3>
          </div>
          <span className="text-[10px] text-[#989b9f] font-mono">{pinnedLinks.length}</span>
        </div>

        <div className="space-y-2">
          {featuredLinks.map((link) => {
            const domain = getDomain(link.url);
            const favicon = getFaviconUrl(link.url);
            return (
              <div
                key={link.id}
                onClick={() => onOpenDetail(link)}
                className="group flex items-center justify-between p-2 rounded-xl bg-[#1e1e1e]/60 hover:bg-[#1e1e1e] border border-[#333333] hover:border-[#4d4d4d] cursor-pointer transition-all gap-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-black/40 border border-white/10 shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={favicon}
                    alt={domain}
                    className="w-4 h-4 object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs text-[#fffdfc] group-hover:text-[#38bdf8] truncate transition-colors">
                    {link.title || domain}
                  </h4>
                  <p className="text-[10px] text-[#989b9f] truncate">
                    {domain}
                  </p>
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 rounded-md text-[#737373] hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* Widget 3: Popüler Koleksiyonlar (LinkList07) */}
      <div className="rounded-2xl bg-[#252526] border border-[#383838] p-4 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 border-b border-[#333333] pb-2">
          <Folder className="w-4 h-4 text-amber-400" />
          <h3 className="font-bold text-xs text-[#fffdfc] uppercase tracking-wider">
            En Çok Kaydedilenler
          </h3>
        </div>

        <div className="space-y-2">
          {sortedCollections.map((col) => {
            const max = sortedCollections[0]?.count || 1;
            const pct = Math.min(100, Math.round((col.count / max) * 100));
            return (
              <div 
                key={col.id}
                onClick={() => col.id && onSelectCollection(col.id)}
                className="group p-2 rounded-xl bg-[#1e1e1e]/60 hover:bg-[#1e1e1e] border border-[#333333] hover:border-[#4d4d4d] cursor-pointer transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <span 
                      className="w-2.5 h-2.5 rounded-full shrink-0 shadow-xs" 
                      style={{ backgroundColor: col.color || '#38bdf8' }}
                    />
                    <span className="font-medium text-xs text-[#fffdfc] group-hover:text-[#38bdf8] truncate transition-colors">
                      {col.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#989b9f] font-mono font-bold">
                    {col.count}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1 bg-[#252526] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${pct}%`,
                      backgroundColor: col.color || '#38bdf8'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Widget 4: Etiket Bulutu (Label01) */}
      <div className="rounded-2xl bg-[#252526] border border-[#383838] p-4 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 border-b border-[#333333] pb-2">
          <Hash className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-xs text-[#fffdfc] uppercase tracking-wider">
            Etiket Bulutu
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {tags.slice(0, 15).map((t) => {
            const count = counts.tags[t.name] || 0;
            return (
              <button
                key={t.name}
                onClick={() => onSelectTag(t.name)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1e1e1e] hover:bg-[#38bdf8] text-[#a3a3a3] hover:text-[#0f172a] border border-[#383838] hover:border-[#38bdf8] font-medium text-[11px] transition-all"
              >
                <span>#{t.name}</span>
                <span className="text-[9px] opacity-75 font-mono">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Widget 5: Depolama & Sistem Durumu (Stats41) */}
      <div className="rounded-2xl bg-[#252526] border border-[#383838] p-4 space-y-3 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#333333] pb-2">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-[#38bdf8]" />
            <h3 className="font-bold text-xs text-[#fffdfc] uppercase tracking-wider">
              Yerel Depolama
            </h3>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold">ONLINE</span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-[#989b9f]">
            <span>Kullanılan Alan:</span>
            <span className="font-mono text-[#fffdfc] font-semibold">{storageInfo.formattedUsed}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#989b9f]">
            <span>Toplam Kota:</span>
            <span className="font-mono text-[#fffdfc] font-semibold">{storageInfo.formattedQuota}</span>
          </div>
          <div className="w-full h-1.5 bg-[#1e1e1e] rounded-full overflow-hidden mt-1">
            <div 
              className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(3, storageInfo.percentage)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400/90 font-medium">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>IndexedDB Güvenli Çevrimdışı Bellek</span>
        </div>
      </div>

    </aside>
  );
};
