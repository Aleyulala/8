import React, { useState } from 'react';
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
  Layers
} from 'lucide-react';
import { PRIVACY_SECTIONS, PrivacySection } from '../data/privacyContent';
import { Verify1Icon, BloggerBIcon, TelegramIcon, MailIcon } from './BloggerIcons';

interface BloggerPrivacyViewProps {
  onBack: () => void;
  onGoHome?: () => void;
}

export const BloggerPrivacyView: React.FC<BloggerPrivacyViewProps> = ({
  onBack,
  onGoHome
}) => {
  const [activeSectionId, setActiveSectionId] = useState<string>('all');
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayedSections = activeSectionId === 'all' 
    ? PRIVACY_SECTIONS 
    : PRIVACY_SECTIONS.filter(s => s.id === activeSectionId);

  return (
    <div className="w-full min-h-full pb-20 select-text">
      
      {/* 1. ÜST NAVİGASYON ÇUBUĞU */}
      <div className="flex items-center justify-between py-3 mb-6 border-b border-[#252526]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#252526] hover:bg-[#333333] text-sm text-[#d4d4d4] hover:text-white transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#38bdf8]" />
          <span>Ana Sayfaya Dön</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#252526] hover:bg-[#333333] text-xs text-[#d4d4d4] hover:text-white transition-colors cursor-pointer"
            title="Politika Bağlantısını Kopyala"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Kopyalandı' : 'Paylaş'}</span>
          </button>
        </div>
      </div>

      {/* 2. BLOGGER GÖNDERİ BAŞLIK BLOĞU (.pHead / .pIn) */}
      <header className="mb-8 space-y-4">
        {/* Kategori Rozeti */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e293b] text-[#38bdf8] text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Yasal İlkeler & Blogger Politikaları</span>
        </div>

        {/* Ana Başlık */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Gizlilik Politikası, Blogger Yayın İlkeleri ve GNU GPLv3 Lisansı
        </h1>

        <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed max-w-3xl">
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

          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-400 font-semibold text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Güncel & Yayında</span>
          </div>
        </div>
      </header>

      {/* 3. HIZLI BÖLÜM GEÇİŞİ HAPLARI (TOC / Pills) */}
      <nav className="mb-8 select-none">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveSectionId('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeSectionId === 'all'
                ? 'bg-[#38bdf8] text-[#0f172a] shadow-md shadow-sky-500/20 font-bold'
                : 'bg-[#252526] hover:bg-[#333333] text-[#d4d4d4]'
            }`}
          >
            Tüm Bölümler ({PRIVACY_SECTIONS.length})
          </button>

          {PRIVACY_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSectionId(sec.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeSectionId === sec.id
                  ? 'bg-[#38bdf8] text-[#0f172a] shadow-md shadow-sky-500/20 font-bold'
                  : 'bg-[#252526] hover:bg-[#333333] text-[#a1a1aa] hover:text-white'
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>
      </nav>

      {/* 4. POLİTİKA BÖLÜMLERİ LİSTESİ (.pCntn / Post Body) */}
      <main className="space-y-6">
        {displayedSections.map((sec, idx) => (
          <article
            key={sec.id}
            id={sec.id}
            className="rounded-lg bg-[#252526] border border-transparent p-6 sm:p-8 space-y-4 shadow-md transition-all duration-200"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-transparent text-xs text-[#38bdf8] font-medium">
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

      {/* 5. BLOGGER YAZAR TANITIM KARTI (.admAbt) */}
      <section className="mt-12 rounded-lg bg-[#252526] border border-transparent p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-md">
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#38bdf8] to-indigo-600 p-0.5 shadow-lg shrink-0">
          <div className="w-full h-full rounded-full bg-[#1e1e1e] flex items-center justify-center font-bold text-xl text-white">
            N
          </div>
        </div>

        <div className="flex-1 space-y-3 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <h3 className="text-base font-bold text-white">NEGRONN</h3>
              <Verify1Icon className="w-4 h-4 text-[#38bdf8]" />
              <span className="text-xs text-[#71717a]">(@aleyulala)</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1e1e1e] text-[11px] font-semibold text-[#60cdff]">
              Blogger & Yazılım Mimarı
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
            Saved Startpage, açık kaynak yazılım felsefesi ve gizlilik odaklı mimarisiyle 
            geliştirilmiş yer imi ve bilgi yönetim sistemidir. Tüm kullanıcı verileri yalnızca 
            kullanıcının yerel tarayıcısında (IndexedDB / localStorage) barındırılır.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs">
            <a
              href="https://aleyulala.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#333333] text-[#d4d4d4] hover:text-white transition-colors"
            >
              <BloggerBIcon className="w-3.5 h-3.5 text-amber-500" />
              <span>Blogger</span>
            </a>

            <a
              href="https://t.me/aleyulala"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#333333] text-[#d4d4d4] hover:text-white transition-colors"
            >
              <TelegramIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>Telegram</span>
            </a>

            <a
              href="mailto:contact@saved.local"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e1e1e] hover:bg-[#333333] text-[#d4d4d4] hover:text-white transition-colors"
            >
              <MailIcon className="w-3.5 h-3.5 text-rose-400" />
              <span>İletişim & Destek</span>
            </a>
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
