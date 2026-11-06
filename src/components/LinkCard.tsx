import React, { useState } from 'react';
import { 
  Link as LinkIcon, 
  Star, 
  Calendar, 
  Folder, 
  FileText, 
  FileCode, 
  Globe, 
  FileImage,
  ExternalLink,
  MoreVertical,
  Edit2,
  Trash2,
  RotateCcw
} from 'lucide-react';
import { CollectionItem, LinkItem } from '../types';
import { formatDate, getDomain, getFaviconUrl } from '../utils/favicon';

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

// Curated sleek gradients inspired by Linkwarden banners
const BANNER_GRADIENTS = [
  'from-emerald-950 via-teal-900 to-slate-900',
  'from-blue-950 via-indigo-900 to-slate-900',
  'from-amber-950 via-orange-950 to-slate-900',
  'from-purple-950 via-fuchsia-950 to-slate-900',
  'from-rose-950 via-pink-950 to-slate-900',
  'from-cyan-950 via-sky-950 to-slate-900',
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

  // Pick deterministic gradient based on link URL hash
  const gradientIndex = Math.abs(
    link.url.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  ) % BANNER_GRADIENTS.length;
  const gradientClass = BANNER_GRADIENTS[gradientIndex];

  return (
    <div className="group relative rounded-xl border border-[#404040] bg-[#262626] hover:border-[#606060] transition-all duration-150 flex flex-col justify-between overflow-hidden shadow-md">
      
      {/* Top Banner Image / Preview */}
      <div 
        onClick={() => onOpenDetail(link)}
        className={`relative w-full ${isCompact ? 'h-32' : 'h-36 sm:h-40'} bg-gradient-to-tr ${gradientClass} cursor-pointer flex items-center justify-center overflow-hidden border-b border-[#383838]`}
      >
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:12px_12px] opacity-40" />

        {/* Center Website Logo Icon */}
        <div className="relative z-10 w-12 h-12 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
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

        {/* Pin Button at Top-Left */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (link.id) onTogglePin(link.id, link.isPinned);
          }}
          className={`absolute top-2.5 left-2.5 z-20 p-1.5 rounded-lg backdrop-blur-md transition-colors ${
            link.isPinned 
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
              : 'bg-black/40 text-neutral-400 hover:text-white border border-white/5 opacity-0 group-hover:opacity-100'
          }`}
          title={link.isPinned ? 'Sabitlemeyi kaldır' : 'Sabitle'}
        >
          <Star className={`w-3.5 h-3.5 ${link.isPinned ? 'fill-current' : ''}`} />
        </button>

        {/* Format Icons at Bottom-Right */}
        <div className="absolute bottom-2 right-2 z-10 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1.5 border border-white/10 text-[10px] text-neutral-300">
          <span title="Web Adresi"><Globe className="w-3 h-3 text-[#38bdf8]" /></span>
          <span title="Metin İçeriği"><FileText className="w-3 h-3 text-neutral-400" /></span>
          <span title="HTML Arşivi"><FileCode className="w-3 h-3 text-neutral-400" /></span>
          <span title="Görsel Önizleme"><FileImage className="w-3 h-3 text-neutral-400" /></span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3.5 flex flex-col justify-between flex-1 gap-2">
        <div>
          {/* Title */}
          <h3 className="text-sm font-semibold text-[#7dd3fc] hover:text-[#bae6fd] line-clamp-2 leading-snug mb-1">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-start gap-1"
            >
              <span>{link.title || link.url}</span>
              <ExternalLink className="w-3 h-3 shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </h3>

          {/* Domain with link icon */}
          <div className="flex items-center gap-1.5 text-xs text-[#a3a3a3] hover:text-neutral-200 truncate">
            <LinkIcon className="w-3 h-3 shrink-0 text-[#737373]" />
            <span className="truncate">{domain}</span>
          </div>
        </div>

        {/* Bottom Section: Collection & Date */}
        <div className="pt-2 border-t border-[#333333] flex items-center justify-between text-xs text-[#a3a3a3]">
          <div className="flex items-center gap-1.5 min-w-0">
            {collection ? (
              <span 
                className="flex items-center gap-1 truncate text-[11px] font-medium px-1.5 py-0.5 rounded-md"
                style={{ 
                  backgroundColor: `${collection.color || '#38bdf8'}18`, 
                  color: collection.color || '#38bdf8' 
                }}
              >
                <Folder className="w-3 h-3 shrink-0" />
                <span className="truncate max-w-[100px]">{collection.name}</span>
              </span>
            ) : (
              <span className="text-[11px] text-[#737373]">Koleksiyonsuz</span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#737373] shrink-0">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(link.createdAt)}</span>

            {/* Actions Menu Trigger */}
            <div className="relative ml-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                }}
                className="p-1 rounded hover:bg-[#333333] text-[#a3a3a3] hover:text-white transition-colors"
                title="İşlemler"
              >
                <MoreVertical className="w-3.5 h-3.5" />
              </button>

              {menuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setMenuOpen(false)} 
                  />
                  <div className="absolute right-0 bottom-6 z-40 w-36 py-1 bg-[#1e1e1e] border border-[#404040] rounded-xl shadow-xl text-xs">
                    {link.isTrash ? (
                      <>
                        <button
                          onClick={() => {
                            if (link.id && onRestoreFromTrash) onRestoreFromTrash(link.id);
                            setMenuOpen(false);
                          }}
                          className="w-full px-3 py-1.5 text-left text-emerald-400 hover:bg-[#2a2a2a] flex items-center gap-2"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Geri Yükle
                        </button>
                        <button
                          onClick={() => {
                            if (link.id && onPermanentDelete) onPermanentDelete(link.id);
                            setMenuOpen(false);
                          }}
                          className="w-full px-3 py-1.5 text-left text-rose-400 hover:bg-[#2a2a2a] flex items-center gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Kalıcı Sil
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            onEdit(link);
                            setMenuOpen(false);
                          }}
                          className="w-full px-3 py-1.5 text-left text-neutral-200 hover:bg-[#2a2a2a] flex items-center gap-2"
                        >
                          <Edit2 className="w-3.5 h-3.5" /> Düzenle
                        </button>
                        <button
                          onClick={() => {
                            if (link.id) onTogglePin(link.id, link.isPinned);
                            setMenuOpen(false);
                          }}
                          className="w-full px-3 py-1.5 text-left text-neutral-200 hover:bg-[#2a2a2a] flex items-center gap-2"
                        >
                          <Star className="w-3.5 h-3.5" /> {link.isPinned ? 'Sabitlemeyi Kaldır' : 'Sabitle'}
                        </button>
                        <button
                          onClick={() => {
                            if (link.id) onMoveToTrash(link.id);
                            setMenuOpen(false);
                          }}
                          className="w-full px-3 py-1.5 text-left text-rose-400 hover:bg-[#2a2a2a] flex items-center gap-2"
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
    </div>
  );
};
