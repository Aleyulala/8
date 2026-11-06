import React, { useState } from 'react';
import { Link as LinkIcon, Folder, Calendar, ExternalLink } from 'lucide-react';
import { CollectionItem, LinkItem } from '../types';
import { formatDate, getDomain, getFaviconUrl } from '../utils/favicon';

interface MobileLinkItemProps {
  link: LinkItem;
  collection?: CollectionItem;
  onOpenDetail: (link: LinkItem) => void;
}

export const MobileLinkItem: React.FC<MobileLinkItemProps> = ({
  link,
  collection,
  onOpenDetail
}) => {
  const [imgError, setImgError] = useState(false);
  const domain = getDomain(link.url);
  const faviconUrl = getFaviconUrl(link.url);

  return (
    <div 
      onClick={() => onOpenDetail(link)}
      className="flex items-center justify-between p-3 rounded-xl bg-[#262626] border border-[#383838] hover:border-[#505050] cursor-pointer transition-colors gap-3"
    >
      {/* Left: Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-white truncate mb-1">
          {link.title || link.url}
        </h4>

        <div className="flex items-center gap-1.5 text-xs text-[#a3a3a3] truncate mb-1.5">
          <LinkIcon className="w-3 h-3 shrink-0 text-[#737373]" />
          <span className="truncate">{domain}</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#737373]">
          {collection && (
            <span 
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium"
              style={{ 
                backgroundColor: `${collection.color || '#38bdf8'}18`, 
                color: collection.color || '#38bdf8' 
              }}
            >
              <Folder className="w-2.5 h-2.5" />
              <span className="truncate max-w-[90px]">{collection.name}</span>
            </span>
          )}
          <span className="flex items-center gap-1">
            <Calendar className="w-2.5 h-2.5" />
            {formatDate(link.createdAt)}
          </span>
        </div>
      </div>

      {/* Right: Square Thumbnail Preview */}
      <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-950 border border-white/10 shrink-0 overflow-hidden flex items-center justify-center shadow-inner">
        {!imgError ? (
          <img
            src={faviconUrl}
            alt={domain}
            onError={() => setImgError(true)}
            className="w-7 h-7 object-contain"
            loading="lazy"
          />
        ) : (
          <span className="text-base font-bold text-[#38bdf8] uppercase">
            {domain.charAt(0)}
          </span>
        )}
      </div>
    </div>
  );
};
