import React, { useState } from 'react';
import { CollectionItem, LinkItem } from '../types';
import { formatDate, getDomain, getFaviconUrl } from '../utils/favicon';
import { 
  Verify1Icon, 
  EyeIcon, 
  MessageNotif1Icon, 
  ArchiveIcon,
  ArchiveAddIcon,
  ArchiveTickIcon
} from './BloggerIcons';

interface LinkCardProps {
  link: LinkItem;
  collection?: CollectionItem;
  onOpenPostPage?: (link: LinkItem) => void;
  onOpenDetail?: (link: LinkItem) => void;
  onTogglePin?: (id: number, current: boolean) => void;
  onToggleRead?: (id: number, current: boolean) => void;
  onToggleArchive?: (id: number, current: boolean) => void;
  onMoveToTrash?: (id: number) => void;
  onRestoreFromTrash?: (id: number) => void;
  onPermanentDelete?: (id: number) => void;
  onEdit?: (link: LinkItem) => void;
  isCompact?: boolean;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  link,
  collection,
  onOpenPostPage,
  onOpenDetail,
  onTogglePin,
  isCompact = false
}) => {
  const [imgError, setImgError] = useState(false);
  const domain = getDomain(link.url);
  const faviconUrl = getFaviconUrl(link.url);

  const handleCardClick = () => {
    if (onOpenPostPage) {
      onOpenPostPage(link);
    } else if (onOpenDetail) {
      onOpenDetail(link);
    }
  };

  // Fallback views & comments if not set
  const views = link.views || Math.abs(link.title.length * 3 + 12);
  const comments = link.commentsCount !== undefined ? link.commentsCount : (link.isPinned ? 3 : Math.abs(link.title.length % 3));
  const author = link.authorName || 'SAVED';

  // Thumbnail fallback: use link.thumbnail if available, else curated aesthetic background
  const hasThumbnail = Boolean(link.thumbnail && !imgError);

  return (
    <article 
      onClick={handleCardClick}
      className="group relative rounded-lg bg-[#252526] hover:bg-[#28282b] border border-transparent hover:border-[#60cdff]/30 transition-all duration-200 hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-black/60 flex flex-col justify-between overflow-hidden cursor-pointer select-none"
    >
      
      {/* 1. Blogger Post Thumbnail (.pThmb) */}
      <div className="relative w-full aspect-[16/9] bg-[#1e1e1e] overflow-hidden">
        {hasThumbnail ? (
          <img
            src={link.thumbnail}
            alt={link.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-sky-950 via-[#1c2430] to-[#252526] p-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="w-12 h-12 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center p-2.5 shadow-lg group-hover:scale-110 transition-transform">
              <img
                src={faviconUrl}
                alt={domain}
                className="w-6 h-6 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        )}

        {/* Gradient shadow overlay for crystal clear badge contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/60 pointer-events-none" />

        {/* Sol Üst: Görüntülenme Sayısı (👁 74) */}
        <div className="absolute top-2 left-2 z-10">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/65 backdrop-blur-md text-white text-[10px] font-medium shadow-sm">
            <EyeIcon className="w-3.5 h-3.5 text-[#60cdff]" />
            <span>{views}</span>
          </div>
        </div>

        {/* Sağ Üst: Yorum Sayısı (💬 6) & Sabitleme/Yer İmi (🔖) */}
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/65 backdrop-blur-md text-white text-[10px] font-medium shadow-sm">
            <MessageNotif1Icon className="w-3 h-3 text-white/90" />
            <span>{comments}</span>
          </div>

          {/* Blogger XML 1:1 Yer İmleri / Kaydet Butonu (.bm-button) */}
          <button
            type="button"
            onClick={(e) => {
              if (onTogglePin && link.id) {
                e.stopPropagation();
                onTogglePin(link.id, link.isPinned);
              }
            }}
            className={`tIc bm-button p-1.5 rounded-lg backdrop-blur-md shadow-sm transition-all duration-200 active:scale-90 cursor-pointer ${
              link.isPinned 
                ? 'added bg-amber-500/25 text-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.3)]' 
                : 'bg-black/65 text-white/80 hover:text-[#60cdff] hover:bg-black/85'
            }`}
            data-save="Kaydet"
            data-saved="Kaydedildi"
            title={link.isPinned ? 'Kaydedildi' : 'Kaydet'}
            aria-label={link.isPinned ? 'Kaydedildi' : 'Kaydet'}
          >
            {link.isPinned ? (
              <ArchiveTickIcon className="w-3.5 h-3.5 text-amber-300" />
            ) : (
              <ArchiveAddIcon className="w-3.5 h-3.5 text-white/90" />
            )}
          </button>
        </div>

        {/* Sol Alt: Yazar / Marka Rozeti (AI ✔ / NEGRONN ✔) */}
        <div className="absolute bottom-2 left-2 z-10">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/75 backdrop-blur-md text-white text-[10px] font-bold shadow-sm tracking-wide">
            <span className="w-3.5 h-3.5 rounded-full bg-[#1e1e1e] flex items-center justify-center text-[7px] text-[#60cdff] font-extrabold">
              {author.charAt(0)}
            </span>
            <span>{author}</span>
            <Verify1Icon className="w-3 h-3 text-[#60cdff]" />
          </div>
        </div>

      </div>

      {/* 2. Blogger Post Content (.pCntn) */}
      <div className="p-3.5 flex flex-col justify-between flex-1 gap-2.5">
        
        <div className="space-y-1">
          {/* Kategori Adı (Örn: videolar, oyun, bilgisayar) */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#60cdff] hover:underline lowercase tracking-wide font-medium">
            <span>{collection?.name.toLowerCase() || (link.tags[0] || 'genel')}</span>
          </div>

          {/* Başlık (.pTtl) */}
          <h3 className="text-[14px] font-bold text-white group-hover:text-[#60cdff] line-clamp-2 leading-snug transition-colors">
            {link.title || link.url}
          </h3>

          {/* Açıklama / Özet (.pSnpt) */}
          {link.description && (
            <p className="text-xs text-[#989b9f] line-clamp-2 leading-relaxed pt-0.5">
              {link.description}
            </p>
          )}
        </div>

        {/* Alt Bilgi: Yayınlandı! + Tarih + Daha (.pInf) */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-[#71717a]">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded bg-[#457f57] text-white text-[10px] font-medium">
              Yayınlandı!
            </span>
            <span>{formatDate(link.createdAt)}</span>
          </div>

          <span className="text-xs text-[#60cdff] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
            Daha →
          </span>
        </div>

      </div>

    </article>
  );
};
