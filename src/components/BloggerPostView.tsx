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
  FileText,
  Rss
} from 'lucide-react';
import { CollectionItem, LinkItem } from '../types';
import { formatDate, getDomain, getFaviconUrl } from '../utils/favicon';
import { 
  PulseIcon, 
  Verify1Icon, 
  BloggerBIcon, 
  TelegramIcon, 
  InstagramIcon, 
  MailIcon,
  ArchiveAddIcon,
  ArchiveTickIcon,
  VkIcon,
  MatrixIcon
} from './BloggerIcons';
import { MediaItem } from './UniversalMediaModal';
import { getAuthorData } from '../utils/bloggerAuthors';

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

  const currentAuthor = getAuthorData(link.authorName);

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
          {/* Blogger XML 1:1 Yer İmleri / Kaydet Butonu (.bm-button) */}
          <button
            type="button"
            onClick={() => link.id && onTogglePin(link.id, link.isPinned)}
            className={`tIc bm-button flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
              link.isPinned
                ? 'added bg-amber-500/25 text-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.3)]'
                : 'bg-[#252526] hover:bg-[#333333] text-[#d4d4d4] hover:text-[#60cdff]'
            }`}
            data-save="Kaydet"
            data-saved="Kaydedildi"
            title={link.isPinned ? 'Kaydedildi' : 'Kaydet'}
            aria-label={link.isPinned ? 'Kaydedildi' : 'Kaydet'}
          >
            {link.isPinned ? (
              <ArchiveTickIcon className="w-4 h-4 text-amber-300" />
            ) : (
              <ArchiveAddIcon className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{link.isPinned ? 'Kaydedildi' : 'Kaydet'}</span>
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
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border shadow-sm"
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
            <span className="px-3 py-1 rounded-lg bg-[#252526] text-xs text-[#a1a1aa] border border-transparent">
              Genel
            </span>
          )}

          {link.isPinned && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-transparent text-xs font-bold">
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
            <img
              src={currentAuthor.avatar}
              alt={currentAuthor.name}
              className="w-5 h-5 rounded-full object-cover shadow-sm shrink-0 ring-1 ring-white/10"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="text-white font-semibold">{currentAuthor.name}</span>
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

          {link.rss && (
            <a
              href={link.rss}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 text-xs font-semibold transition-colors"
              title={`RSS Akışı: ${link.rss}`}
            >
              <Rss className="w-3.5 h-3.5" />
              <span>RSS Akışı</span>
            </a>
          )}
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

      {/* 6. Blogger Yazar Tanıtım Kartı (.admAbt - XML 1:1) */}
      <div className="admAbt bX" id="author">
        <h2 className="title dt" data-text="Yazar Hakkında">
          <span>Yazar Hakkında</span>
        </h2>

        <div className="admPs">
          <div className="admIm">
            <div className="im relative w-11 h-11 rounded-full overflow-hidden bg-[#1e1e1e] ring-2 ring-white/10 shadow-md shrink-0">
              <img
                src={currentAuthor.avatar}
                alt={currentAuthor.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute -bottom-0.5 -right-0.5 bg-[#1e1e1e] rounded-full p-0.5">
                <Verify1Icon className="w-3.5 h-3.5 text-[#38bdf8]" />
              </div>
            </div>
          </div>

          <div className="admI">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <bdi className="admN font-bold text-sm text-white" data-write="Yazan:" data-text={currentAuthor.name}>
                <span className="text-xs text-[#71717a] font-normal mr-1">Yazan:</span>
                <span>{currentAuthor.name}</span>
                <Verify1Icon className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#ff5722]/20 text-[#ff5722] font-semibold ml-1">BLOGGER</span>
              </bdi>
              <span className="text-[11px] text-[#71717a]">{currentAuthor.role}</span>
            </div>

            <div 
              className="admA text-xs text-[#d4d4d4] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentAuthor.bio + ` Soru, öneri ve sohbet için <a href="${currentAuthor.communityUrl}" target="_blank" rel="noopener noreferrer" class="text-[#60cdff] hover:underline font-semibold">Topluluk</a> kanalımıza katılabilirsiniz.` }}
            />

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <a
                href={currentAuthor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1e1e1e] hover:bg-[#333333] text-[#d4d4d4] hover:text-white transition-colors"
                title="Blogger Profil"
              >
                <BloggerBIcon className="w-3.5 h-3.5 text-amber-500" />
                <span>Blogger</span>
              </a>

              <a
                href={currentAuthor.communityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1e1e1e] hover:bg-[#333333] text-[#60cdff] hover:text-white transition-colors border border-[#60cdff]/20 hover:border-[#60cdff]/50 font-medium"
                title="Topluluk: Matrix / Element.io (#negronn-show:matrix.org)"
              >
                <MatrixIcon className="w-3.5 h-3.5 text-[#60cdff]" />
                <span>Topluluk</span>
              </a>

              <a
                href={currentAuthor.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1e1e1e] hover:bg-[#229ed9] text-[#d4d4d4] hover:text-white transition-colors"
                title="Telegram"
              >
                <TelegramIcon className="w-3.5 h-3.5 text-sky-400" />
                <span>Telegram</span>
              </a>

              <a
                href={currentAuthor.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1e1e1e] hover:bg-[#4680c2] text-[#d4d4d4] hover:text-white transition-colors"
                title="VKontakte (VK)"
              >
                <VkIcon className="w-3.5 h-3.5 text-[#4680c2]" />
                <span>VK</span>
              </a>

              <a
                href={`mailto:${currentAuthor.email}`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1e1e1e] hover:bg-[#ea4335] text-[#d4d4d4] hover:text-white transition-colors"
                title="E-posta"
              >
                <MailIcon className="w-3.5 h-3.5 text-rose-400" />
                <span>E-posta</span>
              </a>
            </div>
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
