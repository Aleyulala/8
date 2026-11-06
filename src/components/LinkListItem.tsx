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
import { CollectionItem, LinkItem, ViewMode } from '../types';
import { formatDate, getDomain, getFaviconUrl } from '../utils/favicon';

interface LinkListItemProps {
  link: LinkItem;
  collection?: CollectionItem;
  viewMode: ViewMode;
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

export const LinkListItem: React.FC<LinkListItemProps> = ({
  link,
  collection,
  viewMode,
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
    <div className={`group flex items-center justify-between gap-3 bg-white dark:bg-slate-900 border rounded-xl px-4 py-3 shadow-2xs hover:shadow-xs transition-all ${
      link.isPinned 
        ? 'border-blue-300 dark:border-blue-800/80 bg-blue-50/20 dark:bg-blue-950/10' 
        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
    }`}>
      {/* Sol: İkon, Başlık ve Alan Adı */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Favicon */}
        <div className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
          {!imgError ? (
            <img
              src={faviconUrl}
              alt={domain}
              onError={() => setImgError(true)}
              className="w-3.5 h-3.5 object-contain"
              loading="lazy"
            />
          ) : (
            <Globe className="w-3 h-3 text-slate-400" />
          )}
        </div>

        {/* Başlık ve Alan Adı / Açıklama */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-slate-900 dark:text-white truncate hover:text-blue-600 dark:hover:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>{link.title || link.url}</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
            <span className="font-medium text-slate-600 dark:text-slate-300">{domain}</span>
            {link.description && (
              <>
                <span>•</span>
                <span className="truncate">{link.description}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Orta: Koleksiyon ve Etiketler */}
      <div className="hidden md:flex items-center gap-2 shrink-0">
        {collection && (
          <span 
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium"
            style={{ 
              backgroundColor: `${collection.color || '#3b82f6'}15`, 
              color: collection.color || '#3b82f6' 
            }}
          >
            <span 
              className="w-1.5 h-1.5 rounded-full" 
              style={{ backgroundColor: collection.color || '#3b82f6' }}
            />
            <span className="max-w-[100px] truncate">{collection.name}</span>
          </span>
        )}

        {link.tags && link.tags.length > 0 && (
          <div className="flex items-center gap-1">
            {link.tags.slice(0, 2).map((tag) => (
              <button
                key={tag}
                onClick={() => onSelectTag(tag)}
                className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition-colors"
              >
                #{tag}
              </button>
            ))}
            {link.tags.length > 2 && (
              <span className="text-[10px] text-slate-400">+{link.tags.length - 2}</span>
            )}
          </div>
        )}

        <span className="text-[11px] text-slate-400 w-16 text-right">
          {formatDate(link.createdAt)}
        </span>
      </div>

      {/* Sağ: Eylemler */}
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
          <Star className={`w-3.5 h-3.5 ${link.isPinned ? 'fill-current' : ''}`} />
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
          {link.isRead ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
        </button>

        {link.isTrash ? (
          <>
            <button
              onClick={() => link.id && onRestoreFromTrash(link.id)}
              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
              title="Geri Yükle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => link.id && onPermanentDelete(link.id)}
              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Kalıcı Olarak Sil"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onOpenDetail(link)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Detay & Notlar"
            >
              <FileText className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => link.id && onToggleArchive(link.id, link.isArchived)}
              className={`p-1.5 rounded-lg transition-colors ${
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
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Düzenle"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => link.id && onMoveToTrash(link.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="Çöp Kutusuna Taşı"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
