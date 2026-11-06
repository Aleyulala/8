import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Star, 
  Calendar, 
  Globe, 
  Folder, 
  CheckCircle2, 
  Edit2, 
  Trash2, 
  Copy, 
  Check, 
  Share2, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { CollectionItem, LinkItem } from '../types';
import { formatDate, getDomain, getFaviconUrl } from '../utils/favicon';
import { 
  PulseIcon, 
  Verify1Icon, 
  BloggerBIcon, 
  TelegramIcon, 
  InstagramIcon, 
  MailIcon 
} from './BloggerIcons';
import { MediaItem } from './UniversalMediaModal';

interface BloggerPostViewProps {
  link: LinkItem;
  allLinks: LinkItem[];
  collection?: CollectionItem;
  onBack: () => void;
  onNavigatePost: (link: LinkItem) => void;
  onTogglePin: (id: number, current: boolean) => void;
  onToggleRead: (id: number, current: boolean) => void;
  onToggleArchive: (id: number, current: boolean) => void;
  onMoveToTrash: (id: number) => void;
  onEdit: (link: LinkItem) => void;
  onOpenMedia?: (items: MediaItem[]) => void;
}

export const BloggerPostView: React.FC<BloggerPostViewProps> = ({
  link,
  allLinks,
  collection,
  onBack,
  onNavigatePost,
  onTogglePin,
  onToggleRead,
  onToggleArchive,
  onMoveToTrash,
  onEdit,
  onOpenMedia
}) => {
  const [copied, setCopied] = useState(false);
  const domain = getDomain(link.url);
  const faviconUrl = getFaviconUrl(link.url);

  const isYoutube = link.url.includes('youtube.com/watch') || link.url.includes('youtu.be') || link.url.includes('youtube.com/shorts');
  const isShorts = link.url.includes('youtube.com/shorts');
  const isDirectVideo = /\.(mp4|webm|ogg)$/i.test(link.url);
  const hasThumbnail = Boolean(link.thumbnail);

  const getYoutubeEmbed = (u: string) => {
    try {
      if (u.includes('youtube.com/shorts/')) {
        const id = u.split('/shorts/')[1]?.split(/[?#&]/)[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (u.includes('watch?v=')) {
        const id = new URL(u).searchParams.get('v');
        return `https://www.youtube.com/embed/${id}`;
      }
      if (u.includes('youtu.be/')) {
        const id = u.split('youtu.be/')[1]?.split(/[?#&]/)[0];
        return `https://www.youtube.com/embed/${id}`;
      }
    } catch {}
    return u;
  };

  // Find previous and next links for pagination (.aChp)
  const activeLinks = allLinks.filter(l => !l.isTrash && !l.isArchived);
  const currentIndex = activeLinks.findIndex(l => l.id === link.id);
  const prevLink = currentIndex > 0 ? activeLinks[currentIndex - 1] : null;
  const nextLink = currentIndex >= 0 && currentIndex < activeLinks.length - 1 ? activeLinks[currentIndex + 1] : null;

  const handleCopy = () => {
    navigator.clipboard.writeText(link.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article className="space-y-6 max-w-[780px] mx-auto animate-in fade-in duration-200">
      
      {/* 1. Üst Kontrol & Ekmek Kırıntısı Barı (.brdCmb) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#252526] hover:bg-[#333333] text-white border border-transparent transition-colors font-medium active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Geri Dön</span>
          </button>

          <span className="text-[#52525b]">/</span>
          <button onClick={onBack} className="hover:text-white transition-colors">
            Ana Sayfa
          </button>
          
          {collection && (
            <>
              <span className="text-[#52525b]">/</span>
              <span 
                className="font-medium truncate max-w-[140px]"
                style={{ color: collection.color || '#38bdf8' }}
              >
                {collection.name}
              </span>
            </>
          )}

          <span className="text-[#52525b] hidden sm:inline">/</span>
          <span className="text-[#71717a] truncate max-w-[180px] hidden sm:inline">
            {link.title || domain}
          </span>
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => link.id && onTogglePin(link.id, link.isPinned)}
            className={`p-2 rounded-lg transition-all ${
              link.isPinned
                ? 'bg-amber-500/20 text-amber-300'
                : 'bg-[#252526] text-[#a1a1aa] hover:text-white'
            }`}
            title={link.isPinned ? 'Sabitlemeyi kaldır' : 'Sabitle'}
          >
            <Star className={`w-4 h-4 ${link.isPinned ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => link.id && onToggleRead(link.id, link.isRead)}
            className={`p-2 rounded-lg transition-all ${
              link.isRead
                ? 'bg-emerald-500/20 text-emerald-300'
                : 'bg-[#252526] text-[#a1a1aa] hover:text-white'
            }`}
            title={link.isRead ? 'Okundu' : 'Okundu olarak işaretle'}
          >
            <CheckCircle2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onEdit(link)}
            className="p-2 rounded-lg bg-[#252526] hover:bg-[#333333] text-[#a1a1aa] hover:text-[#38bdf8] transition-colors"
            title="Düzenle"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => link.id && onMoveToTrash(link.id)}
            className="p-2 rounded-lg bg-[#252526] hover:bg-[#333333] text-[#a1a1aa] hover:text-rose-400 transition-colors"
            title="Çöpe At"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Gönderi Başlık ve Meta Bilgileri (.postHeaders) */}
      <div className="space-y-3">
        {/* Kategori Rozeti & Sabit Etiketi */}
        <div className="flex items-center gap-2">
          {collection ? (
            <span 
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shadow-sm"
              style={{ 
                backgroundColor: `${collection.color || '#38bdf8'}20`,
                borderColor: `${collection.color || '#38bdf8'}40`,
                color: collection.color || '#38bdf8'
              }}
            >
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: collection.color || '#38bdf8' }} 
              />
              <span>{collection.name}</span>
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-[#252526] text-xs text-[#a1a1aa] border border-transparent">
              Genel
            </span>
          )}

          {link.isPinned && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-transparent text-xs font-bold">
              <PulseIcon className="w-3 h-3" />
              <span>SABİTLENDİ</span>
            </span>
          )}
        </div>

        {/* Ana Başlık */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
          {link.title || link.url}
        </h1>

        {/* Yazar & Tarih Meta Bilgisi (.pInf) */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#a1a1aa] pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center text-[10px] text-white font-bold">
              AY
            </span>
            <span className="text-white font-semibold">Ali Yıldız</span>
            <Verify1Icon className="w-3.5 h-3.5 text-[#38bdf8]" />
          </div>

          <div className="flex items-center gap-1.5 text-[#71717a]">
            <Calendar className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>{formatDate(link.createdAt)}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#71717a]">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{domain}</span>
          </div>
        </div>
      </div>

      {/* 3. Büyük Görsel / Önizleme Bannerı (.pThmb) */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-transparent bg-gradient-to-tr from-sky-950 via-[#1c2430] to-[#18181b] p-8 sm:p-12 shadow-2xl flex flex-col items-center justify-center text-center space-y-5">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0f_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Logo Avatar */}
        <div className="relative z-10 w-20 h-20 rounded-3xl bg-[#1e1e1e]/90 backdrop-blur-md flex items-center justify-center shadow-2xl p-4">
          <img
            src={faviconUrl}
            alt={domain}
            className="w-10 h-10 object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Domain & URL Açıklama */}
        <div className="relative z-10 space-y-2 max-w-lg">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
            {domain}
          </h2>
          <p className="text-xs sm:text-sm text-[#9ca3af] break-all font-mono bg-black/40 px-4 py-2 rounded-xl">
            {link.url}
          </p>
        </div>

        {/* Büyük Dış Bağlantıya Git Butonu */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#7dd3fc] hover:to-[#38bdf8] text-[#0f172a] font-bold text-sm shadow-xl shadow-sky-500/25 active:scale-95 transition-all duration-200"
          >
            <span>Siteyi Ziyaret Et</span>
            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
          </a>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#252526] hover:bg-[#333333] text-white text-xs font-semibold active:scale-95 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Kopyalandı' : 'URL Kopyala'}</span>
          </button>
        </div>
      </div>

      {/* 3.1. Blogger Medya Player Vitrini (YouTube, Shorts, Video veya Görsel) */}
      {(isYoutube || isDirectVideo || hasThumbnail) && (
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#18181b] border border-transparent shadow-xl">
          {isYoutube && (
            <div className={`relative w-full ${isShorts ? 'max-w-xs mx-auto aspect-[9/16]' : 'aspect-video'} bg-black overflow-hidden`}>
              <iframe
                src={getYoutubeEmbed(link.url)}
                title={link.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {isDirectVideo && (
            <div className="relative w-full aspect-video bg-black overflow-hidden">
              <video
                src={link.url}
                controls
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {!isYoutube && !isDirectVideo && hasThumbnail && (
            <div 
              className="relative w-full aspect-video bg-black overflow-hidden cursor-pointer group/thumb"
              onClick={() => onOpenMedia && onOpenMedia([{ type: 'image', url: link.thumbnail!, title: link.title }])}
            >
              <img
                src={link.thumbnail}
                alt={link.title}
                className="w-full h-full object-contain group-hover/thumb:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {onOpenMedia && (
            <div className="p-3 bg-[#252526] flex items-center justify-between text-xs">
              <span className="text-[#989b9f] font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#60cdff] animate-pulse" />
                <span>Blogger Medya Player</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  if (isYoutube) {
                    onOpenMedia([{ type: isShorts ? 'shorts' : 'youtube', url: link.url, title: link.title }]);
                  } else if (isDirectVideo) {
                    onOpenMedia([{ type: 'video', url: link.url, title: link.title }]);
                  } else if (hasThumbnail) {
                    onOpenMedia([{ type: 'image', url: link.thumbnail!, title: link.title }]);
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#333333] text-[#60cdff] hover:text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Tam Ekranda Aç</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* 4. Gönderi Açıklaması ve Notlar (.post-body) */}
      <div className="rounded-2xl bg-[#252526] border border-transparent p-6 space-y-4 shadow-md">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-[#333333] pb-2 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#38bdf8]" />
          <span>Bağlantı Detayı & Açıklama</span>
        </h3>

        {link.description ? (
          <p className="text-sm text-[#d4d4d4] leading-relaxed whitespace-pre-wrap">
            {link.description}
          </p>
        ) : (
          <p className="text-xs text-[#71717a] italic">
            Bu bağlantı için ek bir açıklama girilmemiş.
          </p>
        )}

        {link.notes && (
          <div className="mt-4 p-4 rounded-lg bg-[#1e1e1e] border border-transparent space-y-1.5">
            <h4 className="text-xs font-bold text-[#38bdf8] uppercase tracking-wider">
              Kullanıcı Notu
            </h4>
            <p className="text-xs text-[#a1a1aa] leading-relaxed whitespace-pre-wrap">
              {link.notes}
            </p>
          </div>
        )}
      </div>

      {/* 5. Etiketler (.lbHt - Blogger Stili) */}
      {link.tags && link.tags.length > 0 && (
        <div className="rounded-lg bg-[#252526] border border-transparent p-5 space-y-2.5 shadow-md">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#989b9f]">
            İlgili Etiketler
          </h4>
          <div className="flex flex-wrap gap-2">
            {link.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#38bdf8] text-[#d4d4d4] hover:text-[#0f172a] border border-transparent hover:border-[#38bdf8] text-xs font-medium transition-all"
              >
                <span>#{tag}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 6. Blogger Yazar Tanıtım Kartı (.admAbt) */}
      <div className="rounded-lg bg-[#252526] border border-transparent p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-md text-center sm:text-left">
        <div className="relative w-14 h-14 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-0.5 shadow-md shrink-0">
          <div className="w-full h-full rounded-md bg-[#1e1e1e] flex items-center justify-center font-bold text-base text-[#fffdfc]">
            AY
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <h4 className="font-bold text-sm text-white">Ali Yıldız</h4>
              <Verify1Icon className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#ff5722]/20 text-[#ff5722] font-semibold">BLOGGER</span>
            </div>
            <span className="text-[11px] text-[#71717a]">Yazar & Geliştirici</span>
          </div>

          <p className="text-xs text-[#989b9f] leading-relaxed">
            Local-First Linkwarden yöneticisi. 352 bağlantı ve 14 kategoriyle tüm web akışınız çevrimdışı elinizin altında.
          </p>

          <div className="flex items-center justify-center sm:justify-start gap-2 pt-1 text-xs">
            <a
              href="https://github.com/Aleyulala/saved"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-[#1e1e1e] hover:bg-white hover:text-black text-[#d4d4d4] border border-transparent transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://t.me/aleyyulala"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-[#1e1e1e] hover:bg-[#229ed9] text-[#d4d4d4] hover:text-white border border-transparent transition-colors"
            >
              Telegram
            </a>
            <a
              href="https://www.instagram.com/aleyul.ala/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-[#1e1e1e] hover:bg-[#e1306c] text-[#d4d4d4] hover:text-white border border-transparent transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* 7. Önceki / Sonraki Gönderi Navigasyonu (.aChp) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {prevLink ? (
          <button
            onClick={() => onNavigatePost(prevLink)}
            className="group flex flex-col items-start p-4 rounded-lg bg-[#252526] hover:bg-[#2b2b2e] border border-transparent hover:border-[#38bdf8]/50 text-left transition-all active:scale-[0.99] shadow-sm"
          >
            <div className="flex items-center gap-1.5 text-xs text-[#71717a] group-hover:text-[#38bdf8] font-semibold uppercase tracking-wider">
              <ChevronLeft className="w-4 h-4" />
              <span>Önceki Bağlantı</span>
            </div>
            <div className="text-sm font-semibold text-white group-hover:text-[#38bdf8] truncate w-full mt-1">
              {prevLink.title || prevLink.url}
            </div>
          </button>
        ) : (
          <div className="p-4 rounded-lg bg-[#1e1e1e]/40 border border-transparent text-xs text-[#52525b]">
            İlk bağlantıdasınız
          </div>
        )}

        {nextLink ? (
          <button
            onClick={() => onNavigatePost(nextLink)}
            className="group flex flex-col items-end p-4 rounded-lg bg-[#252526] hover:bg-[#2b2b2e] border border-transparent hover:border-[#38bdf8]/50 text-right transition-all active:scale-[0.99] shadow-sm"
          >
            <div className="flex items-center gap-1.5 text-xs text-[#71717a] group-hover:text-[#38bdf8] font-semibold uppercase tracking-wider">
              <span>Sonraki Bağlantı</span>
              <ChevronRight className="w-4 h-4" />
            </div>
            <div className="text-sm font-semibold text-white group-hover:text-[#38bdf8] truncate w-full mt-1">
              {nextLink.title || nextLink.url}
            </div>
          </button>
        ) : (
          <div className="p-4 rounded-lg bg-[#1e1e1e]/40 border border-transparent text-xs text-[#52525b] text-right">
            Son bağlantıdasınız
          </div>
        )}
      </div>

    </article>
  );
};
