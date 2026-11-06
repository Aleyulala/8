import React from 'react';
import { 
  Globe, 
  Rss, 
  ExternalLink,
  Heart,
  ShieldCheck
} from 'lucide-react';
import { 
  InstagramIcon, 
  TelegramIcon, 
  MailIcon, 
  GithubIcon,
  Verify1Icon,
  BloggerBIcon
} from './BloggerIcons';

interface BloggerFooterProps {
  onOpenPrivacy?: () => void;
}

export const BloggerFooter: React.FC<BloggerFooterProps> = ({
  onOpenPrivacy
}) => {
  return (
    <footer className="w-full bg-[#18181b] border-t border-[#27272a] mt-14 pt-10 pb-20 md:pb-10 select-none text-xs text-[#a1a1aa]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* 4 Kolonlu Grid (.fotN) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          
          {/* Kolon 1: Logo & Marka & Takip Et & Sosyal Medya (Image21 & LinkList21) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjuF5-IgFBevlNcBbXMSdl7Egn34HcWcPccvcujWL1XU0r_22ZPQIFUySo7l_YmmIwpzmkppKZUPJVAl0ipZ-HHB4LyzCQgq39Ii7PPcvvcTbBWkPa2Z2_fYvD57BQrq9yNckevGtzc79XFgbfi9QZQ9wKVIJfVA1R3cmj98A4Ce9jxeDU4R4lvggThYP4/s150/minimize%20nsw.png"
                alt="NEGRONN SHOW"
                className="w-10 h-10 rounded-xl object-contain bg-[#252526] p-1 border border-[#383838] shadow-sm"
              />
              <div>
                <h3 className="text-white font-bold text-sm tracking-wide flex items-center gap-1.5">
                  <span>NEGRONN</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#38bdf8]/20 text-[#38bdf8] font-mono">
                    SHOW
                  </span>
                </h3>
                <p className="text-[11px] text-[#71717a]">ALİ YILDIZ Linkwarden</p>
              </div>
            </div>

            <p className="text-[11px] text-[#9ca3af] leading-relaxed">
              Local-First mimarisiyle 352 bağlantı, 14 koleksiyon ve 26 etiket tek dosya olarak çevrimdışı yanınızda.
            </p>

            {/* Blogger Takip Et Butonu (.abtFollowBtn) */}
            <div>
              <a
                href="https://www.blogger.com/followers/follow/1915278968279215939?hl=tr"
                target="_blank"
                rel="nofollow noreferrer noopener"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff5722]/15 hover:bg-[#ff5722] text-[#ff5722] hover:text-white border border-[#ff5722]/30 text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm"
              >
                <BloggerBIcon className="w-3.5 h-3.5 fill-current" />
                <span>Blogger Takip Et</span>
              </a>
            </div>

            {/* Sosyal Medya İkonları (.sL) */}
            <div className="flex items-center gap-2 pt-1 text-[#a1a1aa]">
              <a
                href="https://www.youtube.com/@ngronn/post"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-[#252526] hover:bg-[#ff0000] hover:text-white flex items-center justify-center border border-[#333333] transition-colors"
                title="YouTube"
              >
                <span className="font-bold text-[10px]">YT</span>
              </a>
              <a
                href="https://www.wa.me/+905446412904"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-[#252526] hover:bg-[#25d366] hover:text-white flex items-center justify-center border border-[#333333] transition-colors"
                title="WhatsApp"
              >
                <span className="font-bold text-[10px]">WA</span>
              </a>
              <a
                href="https://t.me/aleyyulala"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-[#252526] hover:bg-[#229ed9] hover:text-white flex items-center justify-center border border-[#333333] transition-colors"
                title="Telegram"
              >
                <TelegramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.instagram.com/aleyul.ala/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-[#252526] hover:bg-[#e1306c] hover:text-white flex items-center justify-center border border-[#333333] transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/Aleyulala/x"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-lg bg-[#252526] hover:bg-white hover:text-black flex items-center justify-center border border-[#333333] transition-colors"
                title="GitHub Repo"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:mrstar14155@gmail.com"
                className="w-7 h-7 rounded-lg bg-[#252526] hover:bg-[#ea4335] hover:text-white flex items-center justify-center border border-[#333333] transition-colors"
                title="E-posta"
              >
                <MailIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Kolon 2: Destek & İletişim */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs border-b border-[#27272a] pb-2">
              Destek
            </h4>
            <ul className="space-y-2 text-[#9ca3af]">
              <li>
                <a 
                  href="https://github.com/Aleyulala/saved/discussions/?pli=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#38bdf8] transition-colors flex items-center gap-1.5"
                >
                  <span>Geri Bildirim</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              </li>
              <li>
                <a 
                  href="https://notebooklm.google.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#38bdf8] transition-colors flex items-center gap-1.5"
                >
                  <span>Notlarınız (NotebookLM)</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              </li>
              <li>
                <a 
                  href="https://docs.google.com/forms/u/0/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#38bdf8] transition-colors flex items-center gap-1.5"
                >
                  <span>Forum & İletişim</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              </li>
              <li>
                {onOpenPrivacy ? (
                  <button
                    type="button"
                    onClick={onOpenPrivacy}
                    className="hover:text-[#38bdf8] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span>Politikalar & Gizlilik</span>
                  </button>
                ) : (
                  <a 
                    href="https://aleyulala.github.io/saved/privacy.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-[#38bdf8] transition-colors flex items-center gap-1.5"
                  >
                    <span>Politikalar & Gizlilik</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                  </a>
                )}
              </li>
            </ul>
          </div>

          {/* Kolon 3: Servis */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs border-b border-[#27272a] pb-2">
              Servis
            </h4>
            <ul className="space-y-2 text-[#9ca3af]">
              <li>
                <a 
                  href="https://aleyulala.github.io/saved/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#38bdf8] transition-colors flex items-center gap-1.5"
                >
                  <span>Bağlantılar</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/Aleyulala/saved" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#38bdf8] transition-colors flex items-center gap-1.5"
                >
                  <span>GitHub Deposu</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              </li>
              <li>
                <a 
                  href="https://asgardia.space/en/social/users/1166609" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#38bdf8] transition-colors flex items-center gap-1.5"
                >
                  <span>Asgardia Portal</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              </li>
              <li>
                <span className="text-[#64748b]">
                  IndexedDB Local-First Engine
                </span>
              </li>
            </ul>
          </div>

          {/* Kolon 4: Ödeme (LinkList24) */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs border-b border-[#27272a] pb-2">
              Ödeme & İletişim
            </h4>
            <ul className="space-y-2 text-[#9ca3af]">
              <li>
                <a 
                  href="https://aleyulala.blogspot.com/p/odeme.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#38bdf8] transition-colors flex items-center gap-1.5"
                >
                  <span>Bağışlar & Destek</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/ali-yildiz-5531a5285/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#38bdf8] transition-colors flex items-center gap-1.5"
                >
                  <span>LinkedIn Profili</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              </li>
              <li>
                <a 
                  href="https://minepi.com/?u=Aleyyulala" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#38bdf8] transition-colors flex items-center gap-1.5"
                >
                  <span>Pi Network Cüzdan</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              </li>
              <li>
                <a 
                  href="mailto:mrstar14155@gmail.com" 
                  className="hover:text-[#38bdf8] transition-colors"
                >
                  mrstar14155@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Alt Telif & Geliştirici Barı (.cdtN / .fotCd) */}
        <div className="border-t border-[#27272a] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#71717a]">
          
          {/* Telif Hakkı & Doğrulanmış Rozet */}
          <div className="flex items-center gap-1.5">
            <span>© 2026 ·</span>
            <span className="text-white font-semibold flex items-center gap-1">
              <span>ALİ YILDIZ</span>
              <Verify1Icon className="w-3.5 h-3.5 text-[#38bdf8]" />
            </span>
            <span>· All rights reserved.</span>
          </div>

          {/* Geliştirici & GitHub */}
          <div className="flex items-center gap-4">
            <span>
              Developed by{' '}
              <a 
                href="https://github.com/Aleyulala/saved" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#38bdf8] hover:underline font-medium"
              >
                NEGRONN
              </a>
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
};
