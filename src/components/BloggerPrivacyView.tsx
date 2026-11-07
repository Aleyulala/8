import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  ChevronUp, 
  Share2, 
  Check, 
  Copy,
  ExternalLink,
  BookOpen,
  Award,
  Lock,
  Layers,
  Link as LinkIcon
} from 'lucide-react';
import { PRIVACY_SECTIONS, PrivacySection } from '../data/privacyContent';
import { getAuthorData } from '../utils/bloggerAuthors';
import { 
  Verify1Icon, 
  BloggerBIcon, 
  TelegramIcon, 
  MailIcon,
  VkIcon,
  MatrixIcon
} from './BloggerIcons';

interface BloggerPrivacyViewProps {
  onBack: () => void;
  onGoHome?: () => void;
}

export const BloggerPrivacyView: React.FC<BloggerPrivacyViewProps> = ({
  onBack,
  onGoHome
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const authorData = getAuthorData('NEGRONN');

  // Generate direct canonical policy link for Blogger embedding
  const privacyDirectUrl = `${window.location.origin}${window.location.pathname}?view=privacy`;

  useEffect(() => {
    // If a hash or section is in URL, scroll to it smoothly
    const hash = window.location.hash.replace(/^#/, '');
    if (hash) {
      setActiveSectionId(hash);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(privacyDirectUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePillClick = (sectionId: string) => {
    setActiveSectionId(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // Update URL hash without full reload
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'privacy');
    url.hash = sectionId;
    window.history.replaceState({}, '', url.toString());
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('mainScrollContainer')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-[780px] mx-auto min-h-full pb-20 select-text">
      
      {/* 1. ÜST NAVİGASYON ÇUBUĞU */}
      <div className="flex items-center justify-between py-3 mb-5 border-b border-[#252526]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#252526] hover:bg-[#333333] text-xs sm:text-sm text-[#d4d4d4] hover:text-white transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#38bdf8]" />
          <span>Ana Sayfaya Dön</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#252526] hover:bg-[#333333] text-xs text-[#d4d4d4] hover:text-white transition-colors cursor-pointer"
            title="Blogger İçin Doğrudan Politika Bağlantısını Kopyala"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedLink ? 'Kopyalandı' : 'Paylaş'}</span>
          </button>
        </div>
      </div>

      {/* 2. BLOGGER GÖNDERİ BAŞLIK BLOĞU (.pHead / .pIn) */}
      <header className="mb-6 space-y-4">
        {/* Kategori Rozeti */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#1e293b] text-[#38bdf8] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Yasal İlkeler & Blogger Politikaları</span>
        </div>

        {/* Ana Başlık */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Gizlilik Politikası, Blogger Yayın İlkeleri ve GNU GPLv3 Lisansı
        </h1>

        <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed max-w-3xl">
          Saved Startpage ve Blogger ağımızın şeffaf veri egemenliği manifestosu: Sıfır veri toplama, 
          istemci taraflı yerel depolama, 5651 Sayılı Kanun sorumluluk sınırları, 6698 Sayılı KVKK uyumu 
          ve GNU Genel Kamu Lisansı v3.0 şartları.
        </p>

        {/* Blogger Yazar & Meta Çubuğu */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#9ca3af] pt-2 border-t border-[#252526]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#38bdf8] to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-sm">
              N
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-white">NEGRONN</span>
              <Verify1Icon className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span className="text-[#71717a]">(@aleyulala)</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#71717a]" />
            <span>6 Kasım 2026</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#71717a]" />
            <span>12 dk okuma süresi</span>
          </div>

          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-emerald-950/70 text-emerald-400 font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Güncel & Yayında</span>
          </div>
        </div>
      </header>

      {/* 2.1 BLOG ENTEGRASYON URL'İ KUTUSU (Blogger Sayfaları İçin Doğrudan URL Eki) */}
      <div className="p-3.5 rounded-xl bg-[#252526] border border-white/5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-white font-bold">
            <LinkIcon className="w-3.5 h-3.5 text-[#60cdff]" />
            <span>Blogger Sayfaları Doğrudan Bağlantı URL'i:</span>
          </div>
          <p className="text-[11px] text-[#9ca3af]">
            Blog şablonunuza, alt menüye veya yazılarınıza doğrudan bu bağlantıyı ekleyebilirsiniz.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <code className="px-2.5 py-1.5 rounded-lg bg-[#1e1e1e] text-[#60cdff] font-mono text-[11px] select-all truncate max-w-[260px] sm:max-w-[320px]">
            {privacyDirectUrl}
          </code>
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#0f172a] font-bold text-xs transition-all active:scale-95 cursor-pointer shrink-0 shadow-md shadow-sky-500/20"
            title="URL Bağlantısını Kopyala"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Kopyalandı!' : 'Kopyala'}</span>
          </button>
        </div>
      </div>

      {/* 3. BÖLÜMLERE HIZLI ATLAMA HAPLARI (TOC / İçindekiler - "Tüm Bölümler" BUTONU YOK) */}
      <nav className="mb-8 select-none">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
          {PRIVACY_SECTIONS.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => handlePillClick(sec.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeSectionId === sec.id
                  ? 'bg-[#38bdf8] text-[#0f172a] shadow-md shadow-sky-500/20 font-bold'
                  : 'bg-[#252526] hover:bg-[#333333] text-[#d4d4d4] hover:text-white'
              }`}
            >
              <span>{idx + 1}. {sec.title}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 4. TÜM POLİTİKA BÖLÜMLERİ (.pCntn / Post Body - Kesintisiz Tam Liste) */}
      <main className="space-y-6">
        {PRIVACY_SECTIONS.map((sec) => (
          <article
            key={sec.id}
            id={sec.id}
            className={`rounded-xl bg-[#252526] border p-6 sm:p-8 space-y-4 shadow-md transition-all duration-300 ${
              activeSectionId === sec.id ? 'border-[#38bdf8]/40 ring-1 ring-[#38bdf8]/20' : 'border-transparent'
            }`}
          >
            {/* Bölüm Başlık Alanı */}
            <div className="space-y-1 border-b border-[#333333] pb-3">
              {sec.subtitle && (
                <div className="flex items-center gap-2 text-[11px] font-bold tracking-wider text-[#38bdf8] uppercase">
                  <span className="w-3 h-0.5 bg-[#38bdf8] rounded-full" />
                  <span>{sec.subtitle}</span>
                </div>
              )}
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {sec.title}
              </h2>
            </div>

            {/* Rozet */}
            {sec.badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#1e1e1e] border border-transparent text-xs text-[#38bdf8] font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{sec.badge}</span>
              </div>
            )}

            {/* Bölüm HTML İçeriği */}
            <div 
              className="prose prose-invert max-w-none text-sm text-[#d4d4d4] leading-relaxed space-y-3 font-sans [&_strong]:text-white [&_strong]:font-bold [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_li]:text-[#d4d4d4] [&_.alert-box]:p-4 [&_.alert-box]:rounded-lg [&_.alert-box]:bg-[#1e1e1e] [&_.alert-box]:my-3 [&_.alert-box]:flex [&_.alert-box]:items-start [&_.alert-box]:gap-3 [&_.alert-box.info]:border-l-4 [&_.alert-box.info]:border-l-[#38bdf8] [&_.alert-box.warning]:border-l-4 [&_.alert-box.warning]:border-l-amber-400 [&_.table-wrap]:overflow-x-auto [&_.cookie-table]:w-full [&_.cookie-table]:text-xs [&_.cookie-table_th]:p-2.5 [&_.cookie-table_th]:bg-[#1e1e1e] [&_.cookie-table_th]:text-white [&_.cookie-table_td]:p-2.5 [&_.cookie-table_td]:border-t [&_.cookie-table_td]:border-[#333] [&_.faq-item]:p-4 [&_.faq-item]:rounded-lg [&_.faq-item]:bg-[#1e1e1e] [&_.faq-item]:mb-3 [&_.faq-trigger]:font-bold [&_.faq-trigger]:text-white [&_.faq-trigger]:text-sm [&_.faq-content]:text-xs [&_.faq-content]:text-[#a1a1aa] [&_.faq-content]:mt-2 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-black/50 [&_code]:text-[#38bdf8] [&_code]:font-mono [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:bg-black/60 [&_pre]:overflow-x-auto [&_pre]:text-xs [&_pre]:font-mono [&_a]:text-[#38bdf8] [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: sec.bodyHtml }}
            />
          </article>
        ))}
      </main>

      {/* 5. BLOGGER YAZAR TANITIM KARTI (.admAbt - XML 1:1) */}
      <section className="admAbt bX mt-12" id="author">
        <h2 className="title dt" data-text="Yazar Hakkında">
          <span>Yazar Hakkında</span>
        </h2>

        <div className="admPs">
          <div className="admIm">
            <div className="im relative w-12 h-12 rounded-full overflow-hidden bg-[#1e1e1e] ring-2 ring-white/10 shadow-lg shrink-0">
              <img
                src={authorData.avatar}
                alt={authorData.name}
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
              <bdi className="admN font-bold text-sm text-white" data-write="Yazan:" data-text={authorData.name}>
                <span className="text-xs text-[#71717a] font-normal mr-1">Yazan:</span>
                <span>{authorData.name}</span>
                <Verify1Icon className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span className="text-[10px] px-2 py-0.5 rounded-lg bg-[#1e1e1e] text-[#60cdff] font-semibold ml-1">
                  {authorData.role}
                </span>
              </bdi>
            </div>

            <p className="admA text-xs text-[#d4d4d4] leading-relaxed">
              {authorData.bio} Soru, öneri ve tartışmalara katılmak için <a href={authorData.communityUrl} target="_blank" rel="noopener noreferrer" className="text-[#60cdff] hover:underline font-semibold">Topluluk</a> kanalımıza katılabilirsiniz.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <a
                href={authorData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#333333] text-[#d4d4d4] hover:text-white transition-colors"
                title="Blogger Profil"
              >
                <BloggerBIcon className="w-3.5 h-3.5 text-amber-500" />
                <span>Blogger</span>
              </a>

              <a
                href={authorData.communityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#333333] text-[#60cdff] hover:text-white transition-colors border border-[#60cdff]/20 hover:border-[#60cdff]/50 font-medium"
                title="Topluluk: Matrix / Element.io (#negronn-show:matrix.org)"
              >
                <MatrixIcon className="w-3.5 h-3.5 text-[#60cdff]" />
                <span>Topluluk</span>
              </a>

              <a
                href={authorData.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#229ed9] text-[#d4d4d4] hover:text-white transition-colors"
                title="Telegram"
              >
                <TelegramIcon className="w-3.5 h-3.5 text-sky-400" />
                <span>Telegram</span>
              </a>

              <a
                href={authorData.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#4680c2] text-[#d4d4d4] hover:text-white transition-colors"
                title="VKontakte"
              >
                <VkIcon className="w-3.5 h-3.5 text-[#4680c2]" />
                <span>VK</span>
              </a>

              <a
                href={`mailto:${authorData.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#ea4335] text-[#d4d4d4] hover:text-white transition-colors"
                title="E-posta İletişim"
              >
                <MailIcon className="w-3.5 h-3.5 text-rose-400" />
                <span>E-posta</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ALT DÜĞMELER (.pNav / Back to top) */}
      <footer className="mt-8 flex items-center justify-between pt-4 border-t border-[#252526]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#252526] hover:bg-[#333333] text-xs font-semibold text-white transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#38bdf8]" />
          <span>Ana Sayfaya Dön</span>
        </button>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#252526] hover:bg-[#333333] text-xs text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
          title="En Başa Dön"
        >
          <ChevronUp className="w-4 h-4" />
          <span>Başa Dön</span>
        </button>
      </footer>

    </div>
  );
};
