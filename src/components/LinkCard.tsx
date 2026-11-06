import React, { useState } from 'react';
import { 
  Star, 
  Calendar, 
  Globe, 
  ExternalLink,
  MoreVertical,
  Edit2,
  Trash2,
  RotateCcw,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { CollectionItem, LinkItem } from '../types';
import { formatDate, getDomain, getFaviconUrl } from '../utils/favicon';
import { PulseIcon, Link21Icon } from './BloggerIcons';

interface LinkCardProps {
  link: LinkItem;
  collection?: CollectionItem;
  onTogglePin: (id: number, current: boolean) => void;
  onToggleRead: (id: number, current: boolean) => void;
  onToggleArchive: (id: number, current: boolean) => void;
  onMoveToTrash: (id: number) => void;
  onRestoreFromTrash?: (id: number) => void;
  onPermanentDelete?: (id: number) => void;
  onEdit: (link: LinkItem) => void;
  onOpenDetail: (link: LinkItem) => void;
  isCompact?: boolean;
}

// Plus UI / Blogger inspired banner color palettes
const BANNER_GRADIENTS = [
  'from-sky-950 via-[#182635] to-[#1e1e1e]',
  'from-indigo-950 via-[#1e2238] to-[#1e1e1e]',
  'from-emerald-950 via-[#172e25] to-[#1e1e1e]',
  'from-amber-950 via-[#332214] to-[#1e1e1e]',
  'from-purple-950 via-[#2a1a38] to-[#1e1e1e]',
  'from-rose-950 via-[#351822] to-[#1e1e1e]',
  'from-teal-950 via-[#142e2b] to-[#1e1e1e]'
];

export const LinkCard: React.FC<LinkCardProps> = ({
  link,
  collection,
  onTogglePin,
  onToggleRead,
  onToggleArchive,
  onMoveToTrash,
  onRestoreFromTrash,
  onPermanentDelete,
  onEdit,
  onOpenDetail,
  isCompact = false
}) => {
  const [imgError, setImgError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const domain = getDomain(link.url);
  const faviconUrl = getFaviconUrl(link.url);

  // Pick deterministic gradient
  const gradientIndex = Math.abs(
    link.url.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  ) % BANNER_GRADIENTS.length;
  const gradientClass = BANNER_GRADIENTS[gradientIndex];

  return (
    <article 
      className="group relative rounded-2xl border border-[#383838] bg-[#252526] hover:border-[#38bdf8]/60 transition-all duration-300 hover:-translate-y-1.5 shadow-md hover:shadow-2xl hover:shadow-black/60 flex flex-col justify-between overflow-hidden select-none"
    >
      
      {/* 1. Blogger Plus UI Post Thumbnail (.pThmb) */}
      <div 
        onClick={() => onOpenDetail(link)}
        className={`relative w-full ${isCompact ? 'h-32' : 'h-36 sm:h-40'} bg-gradient-to-tr ${gradientClass} cursor-pointer flex items-center justify-center overflow-hidden border-b border-[#333333]`}
      >
        {/* Subtle dot pattern grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* Center Logo Icon */}
        <div className="relative z-10 w-12 h-12 rounded-2xl bg-[#1e1e1e]/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
          {!imgError ? (
            <img
              src={faviconUrl}
              alt={domain}
              onError={() => setImgError(true)}
              className="w-6 h-6 object-contain"
              loading="lazy"
            />
          ) : (
            <span className="text-lg font-bold text-[#38bdf8] uppercase">
              {domain.charAt(0)}
            </span>
          )}
        </div>

        {/* Top-Left: Pin / Favorite Badge (.tfxM) */}
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (link.id) onTogglePin(link.id, link.isPinned);
            }}
            className={`p-1.5 rounded-lg backdrop-blur-md transition-all active:scale-90 ${
              link.isPinned 
                ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 shadow-sm' 
                : 'bg-black/45 text-neutral-400 hover:text-white border border-white/10 opacity-0 group-hover:opacity-100'
            }`}
            title={link.isPinned ? 'Sabitlemeyi kaldır' : 'Sabitle'}
          >
            <Star className={`w-3.5 h-3.5 ${link.isPinned ? 'fill-current' : ''}`} />
          </button>

          {link.isPinned && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold tracking-wider uppercase">
              <PulseIcon className="w-2.5 h-2.5" />
              <span>SABİT</span>
            </span>
          )}
        </div>

        {/* Bottom-Left: Category / Collection Badge (.pTag / .tfxM) */}
        <div className="absolute bottom-2.5 left-2.5 z-20">
          {collection ? (
            <span 
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full backdrop-blur-md text-[11px] font-semibold border shadow-md"
              style={{ 
                backgroundColor: `${collection.color || '#38bdf8'}25`,
                borderColor: `${collection.color || '#38bdf8'}50`,
                color: '#fff'
              }}
            >
              <span 
                className="w-2 h-2 rounded-full shrink-0" 
                style={{ backgroundColor: collection.color || '#38bdf8' }} 
              />
              <span className="truncate max-w-[110px]">{collection.name}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-[10px] text-[#9ca3af] border border-white/10">
              Koleksiyonsuz
            </span>
          )}
        </div>

        {/* Bottom-Right: Domain Pill */}
        <div className="absolute bottom-2.5 right-2.5 z-10 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1 border border-white/10 text-[10px] text-neutral-300">
          <Globe className="w-2.5 h-2.5 text-[#38bdf8]" />
          <span className="max-w-[90px] truncate">{domain}</span>
        </div>
      </div>

      {/* 2. Blogger Plus UI Post Content (.pCntn) */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 gap-3">
        <div className="space-y-1.5">
          {/* Post Title (.pTtl) */}
          <h3 className="text-sm font-semibold text-[#fffdfc] group-hover:text-[#38bdf8] line-clamp-2 leading-snug transition-colors">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hover:underline flex items-start justify-between gap-1"
            >
              <span className="truncate-2">{link.title || link.url}</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 text-[#38bdf8] transition-opacity" />
            </a>
          </h3>

          {/* Post Snippet / Description (.pSnpt) */}
          {link.description ? (
            <p className="text-xs text-[#989b9f] line-clamp-2 leading-relaxed">
              {link.description}
            </p>
          ) : (
            <p className="text-xs text-[#71717a] italic truncate">
              {link.url}
            </p>
          )}

          {/* Tags Chips if present */}
          {link.tags && link.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {link.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="px-1.5 py-0.2 rounded bg-[#1e1e1e] text-[10px] text-[#a1a1aa] border border-[#333333]"
                >
                  #{tag}
                </span>
              ))}
              {link.tags.length > 3 && (
                <span className="text-[10px] text-[#71717a] self-center">
                  +{link.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* 3. Blogger Plus UI Post Footer (.pInf) */}
        <div className="pt-2.5 border-t border-[#333333] flex items-center justify-between text-xs text-[#989b9f]">
          
          {/* Date Badge (.pTtmp) */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#71717a]">
            <Calendar className="w-3 h-3 text-[#38bdf8]" />
            <span>{formatDate(link.createdAt)}</span>
          </div>

          {/* Quick Action Icons & Dropdown Menu */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (link.id) onToggleRead(link.id, link.isRead);
              }}
              className={`p-1 rounded-md transition-colors ${
                link.isRead ? 'text-emerald-400 hover:text-emerald-300' : 'text-[#71717a] hover:text-white'
              }`}
              title={link.isRead ? 'Okundu' : 'Okundu olarak işaretle'}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(link);
              }}
              className="p-1 rounded-md text-[#71717a] hover:text-[#38bdf8] transition-colors"
              title="Düzenle"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>

            {/* More Actions Menu */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                className="p-1 rounded-md hover:bg-[#333333] text-[#71717a] hover:text-white transition-colors"
                title="Daha Fazla İşlem"
              >
                <MoreVertical className="w-3.5 h-3.5" />
              </button>

              {menuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(false);
                    }} 
                  />
                  <div className="absolute right-0 bottom-7 z-40 w-40 py-1 bg-[#1e1e1e] border border-[#3c3c3c] rounded-xl shadow-2xl text-xs backdrop-blur-md">
                    {link.isTrash ? (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (link.id && onRestoreFromTrash) onRestoreFromTrash(link.id);
                            setMenuOpen(false);
                          }}
                          className="w-full px-3 py-1.5 text-left text-emerald-400 hover:bg-[#252526] flex items-center gap-2"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Geri Yükle
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (link.id && onPermanentDelete) onPermanentDelete(link.id);
                            setMenuOpen(false);
                          }}
                          className="w-full px-3 py-1.5 text-left text-rose-400 hover:bg-[#252526] flex items-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Kalıcı Sil
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenDetail(link);
                            setMenuOpen(false);
                          }}
                          className="w-full px-3 py-1.5 text-left text-neutral-200 hover:bg-[#252526] flex items-center gap-2"
                        >
                          <Bookmark className="w-3.5 h-3.5 text-[#38bdf8]" /> Detay Görüntüle
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit(link);
                            setMenuOpen(false);
                          }}
                          className="w-full px-3 py-1.5 text-left text-neutral-200 hover:bg-[#252526] flex items-center gap-2"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-amber-400" /> Düzenle
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (link.id) onTogglePin(link.id, link.isPinned);
                            setMenuOpen(false);
                          }}
                          className="w-full px-3 py-1.5 text-left text-neutral-200 hover:bg-[#252526] flex items-center gap-2"
                        >
                          <Star className="w-3.5 h-3.5 text-amber-400" /> {link.isPinned ? 'Sabitlemeyi Kaldır' : 'Sabitle'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (link.id) onMoveToTrash(link.id);
                            setMenuOpen(false);
                          }}
                          className="w-full px-3 py-1.5 text-left text-rose-400 hover:bg-[#252526] flex items-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Çöpe At
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

        </div>

      </div>
    </article>
  );
};
