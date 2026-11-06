import React, { useState } from 'react';
import { 
  Star, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  Archive, 
  Trash2, 
  Edit3, 
  FileText, 
  RotateCcw,
  Globe
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
  onRestoreFromTrash: (id: number) => void;
  onPermanentDelete: (id: number) => void;
  onEdit: (link: LinkItem) => void;
  onOpenDetail: (link: LinkItem) => void;
  onSelectTag: (tag: string) => void;
}

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
  onSelectTag
}) => {
  const [imgError, setImgError] = useState(false);
  const domain = getDomain(link.url);
  const faviconUrl = getFaviconUrl(link.url);

  return (
    <div className={`group relative flex flex-col justify-between bg-white dark:bg-slate-900 border rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 ${
      link.isPinned 
        ? 'border-blue-300 dark:border-blue-800/80 ring-1 ring-blue-500/10' 
        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
    }`}>
      {/* Üst Alan: Favicon, Alan Adı, Pin & Durum Butonları */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            {/* Favicon veya Varsayılan İkon */}
            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
              {!imgError ? (
                <img
                  src={faviconUrl}
                  alt={domain}
                  onError={() => setImgError(true)}
                  className="w-4 h-4 object-contain"
                  loading="lazy"
                />
              ) : (
                <Globe className="w-3.5 h-3.5 text-slate-400" />
              )}
            </div>

            {/* Alan Adı */}
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate hover:text-slate-700 dark:hover:text-slate-200">
              {domain}
            </span>
          </div>

          {/* Hızlı Eylemler (Pin, Okuma) */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => link.id && onTogglePin(link.id, link.isPinned)}
              className={`p-1.5 rounded-lg transition-colors ${
                link.isPinned
                  ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={link.isPinned ? 'Sabitlemeyi kaldır' : 'Sabitle (Favori)'}
            >
              <Star className={`w-4 h-4 ${link.isPinned ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => link.id && onToggleRead(link.id, link.isRead)}
              className={`p-1.5 rounded-lg transition-colors ${
                link.isRead
                  ? 'text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={link.isRead ? 'Okunmadı olarak işaretle' : 'Okundu olarak işaretle'}
            >
              {link.isRead ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Başlık */}
        <h3 className="text-base font-semibold text-slate-900 dark:text-white line-clamp-2 leading-snug mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-baseline gap-1"
          >
            <span>{link.title || link.url}</span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </h3>

        {/* Açıklama */}
        {link.description && (
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
            {link.description}
          </p>
        )}

        {/* Not Bildirgesi (Eğer varsa) */}
        {link.notes && (
          <div 
            onClick={() => onOpenDetail(link)}
            className="mb-3 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span className="truncate italic">Not: {link.notes}</span>
          </div>
        )}

        {/* Etiketler */}
        {link.tags && link.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {link.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSelectTag(tag)}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Alt Alan: Koleksiyon, Tarih & İşlemler */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        {/* Koleksiyon & Tarih */}
        <div className="flex items-center gap-2 min-w-0">
          {collection && (
            <span 
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium"
              style={{ 
                backgroundColor: `${collection.color || '#3b82f6'}15`, 
                color: collection.color || '#3b82f6' 
              }}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full" 
                style={{ backgroundColor: collection.color || '#3b82f6' }}
              />
              <span className="truncate max-w-[90px]">{collection.name}</span>
            </span>
          )}
          <span className="text-[11px] text-slate-400">
            {formatDate(link.createdAt)}
          </span>
        </div>

        {/* Butonlar */}
        <div className="flex items-center gap-1">
          {link.isTrash ? (
            <>
              <button
                onClick={() => link.id && onRestoreFromTrash(link.id)}
                className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                title="Geri Yükle"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => link.id && onPermanentDelete(link.id)}
                className="p-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Kalıcı Olarak Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onOpenDetail(link)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Detay & Notlar"
              >
                <FileText className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => link.id && onToggleArchive(link.id, link.isArchived)}
                className={`p-1 rounded-lg transition-colors ${
                  link.isArchived
                    ? 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/40'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                title={link.isArchived ? 'Arşivden çıkar' : 'Arşive taşı'}
              >
                <Archive className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onEdit(link)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Düzenle"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => link.id && onMoveToTrash(link.id)}
                className="p-1 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                title="Çöp Kutusuna Taşı"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
