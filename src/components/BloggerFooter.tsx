import React from 'react';
import { Rss } from 'lucide-react';
import { BloggerBIcon } from './BloggerIcons';

interface BloggerFooterProps {
  onOpenPrivacy?: () => void;
}

export const BloggerFooter: React.FC<BloggerFooterProps> = ({
  onOpenPrivacy
}) => {
  return (
    <footer className="mainF w-full bg-[#1e1e1e] border-t border-[#333333] select-none text-xs text-[#989b9f]">
      <div className="fotC w-full py-10 sm:py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-[25px]">
          
          {/* Blogger Plus UI 1:1 Footer (.abtU & LinkList21..24) */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-16">
            
            {/* Sol Kısım: Yazar / Marka Kartı (.abtU) */}
            <div className="space-y-4 shrink-0">
              {/* Profil & Başlık */}
              <div className="flex items-center gap-3.5">
                <img
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjuF5-IgFBevlNcBbXMSdl7Egn34HcWcPccvcujWL1XU0r_22ZPQIFUySo7l_YmmIwpzmkppKZUPJVAl0ipZ-HHB4LyzCQgq39Ii7PPcvvcTbBWkPa2Z2_fYvD57BQrq9yNckevGtzc79XFgbfi9QZQ9wKVIJfVA1R3cmj98A4Ce9jxeDU4R4lvggThYP4/s150/minimize%20nsw.png"
                  alt="NSW Logo"
                  className="w-14 h-14 rounded-2xl object-cover shadow-md"
                />
                <div className="space-y-1">
                  <h3 className="text-white font-bold text-base tracking-wider uppercase leading-none">
                    NEGRONN
                  </h3>
                  <a
                    href="https://www.blogger.com/followers/follow/1915278968279215939?hl=tr"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 hover:bg-black/80 border border-white/10 text-white text-[11px] font-semibold tracking-wider transition-colors shadow-sm"
                    title="Blogger Takip Et: SHOW"
                  >
                    <BloggerBIcon className="w-3 h-3 text-white fill-current" />
                    <span>SHOW</span>
                  </a>
                </div>
              </div>

              {/* Sosyal Alt Bağlantılar: Youtube / Whatsapp / Haritalar */}
              <div className="flex items-center gap-2 text-xs text-[#989b9f]">
                <a
                  href="https://www.youtube.com/@ngronn/post"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Youtube
                </a>
                <span className="text-[#52525b]">/</span>
                <a
                  href="https://www.wa.me/+905446412904"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Whatsapp
                </a>
                <span className="text-[#52525b]">/</span>
                <a
                  href="https://asgardia.space/en/social/users/1166609"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Haritalar
                </a>
              </div>

              {/* RSS Feed Bağlantısı */}
              <div className="pt-1">
                <a
                  href="https://negronshow.blogspot.com/feeds/posts/default?alt=rss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#989b9f] hover:text-[#60cdff] transition-colors"
                  title="Feed"
                >
                  <Rss className="w-3.5 h-3.5" />
                  <span>Feed</span>
                </a>
              </div>
            </div>

            {/* Sağ Kısım: 3 Kolonlu Blogger Menüsü (Forum, Servis, Ödeme) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-14 lg:gap-20 text-xs">
              
              {/* Kolon 1: Forum */}
              <div className="space-y-3">
                <h4 className="text-white font-bold text-sm tracking-wide">
                  Forum
                </h4>
                <ul className="space-y-2 text-[#9ca3af]">
                  <li>
                    {onOpenPrivacy ? (
                      <button
                        type="button"
                        onClick={onOpenPrivacy}
                        className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                      >
                        <span className="text-[#71717a]">–</span>
                        <span>Hakkında</span>
                      </button>
                    ) : (
                      <a
                        href="https://negronshow.blogspot.com/p/hakknda.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        <span className="text-[#71717a]">–</span>
                        <span>Hakkında</span>
                      </a>
                    )}
                  </li>
                  <li>
                    <a
                      href="https://github.com/Aleyulala/saved/discussions/?pli=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#71717a]">–</span>
                      <span>İstekler</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://matrix.to/#/#negronn-show:matrix.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#71717a]">–</span>
                      <span>Topluluk</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Kolon 2: Servis */}
              <div className="space-y-3">
                <h4 className="text-white font-bold text-sm tracking-wide">
                  Servis
                </h4>
                <ul className="space-y-2 text-[#9ca3af]">
                  <li>
                    <a
                      href="https://negronshow.blogspot.com/p/muhabbet.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#71717a]">–</span>
                      <span>Öneriler</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://negronshow.blogspot.com/search"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#71717a]">–</span>
                      <span>İçerikler</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://classroom.google.com/c/ODg5NDgxOTk3NTUx?cjc=3jmlj4w2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#71717a]">–</span>
                      <span>Döküman</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Kolon 3: Ödeme */}
              <div className="space-y-3">
                <h4 className="text-white font-bold text-sm tracking-wide">
                  Ödeme
                </h4>
                <ul className="space-y-2 text-[#9ca3af]">
                  <li>
                    <a
                      href="https://negronshow.blogspot.com/p/odeme.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#71717a]">–</span>
                      <span>Bağışlar</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/ali-yildiz-5531a5285/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#71717a]">–</span>
                      <span>LinkedIn</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://minepi.com/?u=Aleyyulala"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#71717a]">–</span>
                      <span>Cüzdan</span>
                    </a>
                  </li>
                </ul>
              </div>

            </div>

          </div>

        </div>
      </div>
    </footer>
  );
};
