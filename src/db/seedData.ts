export interface RawSeedLink {
  title: string;
  url: string;
  categoryName: string;
  tags: string[];
  color?: string;
  isPinned: boolean;
  description: string;
  thumbnail?: string;
  views?: number;
  commentsCount?: number;
  authorName?: string;
}

export const SEED_COLLECTIONS = [
  {
    "name": "Routine",
    "color": "#38bdf8",
    "icon": "calendar-check",
    "description": "Günlük rutinler, ajanda, mail ve notlar"
  },
  {
    "name": "Devlet",
    "color": "#ef4444",
    "icon": "landmark",
    "description": "Resmi kurumlar, e-Devlet ve kamu portalları"
  },
  {
    "name": "Eğitim",
    "color": "#f59e0b",
    "icon": "graduation-cap",
    "description": "Akademi, kurslar, üniversite ve öğrenim kaynakları"
  },
  {
    "name": "Araçlar",
    "color": "#10b981",
    "icon": "wrench",
    "description": "Çevrimiçi yardımcı araçlar, dönüştürücüler ve servisler"
  },
  {
    "name": "Genel",
    "color": "#6366f1",
    "icon": "globe",
    "description": "Genel web siteleri, portallar ve arama servisleri"
  },
  {
    "name": "Sosyal",
    "color": "#06b6d4",
    "icon": "users",
    "description": "Sosyal medya, topluluklar ve iletişim platformları"
  },
  {
    "name": "Medya",
    "color": "#ec4899",
    "icon": "tv",
    "description": "Video, müzik, yayın ve görsel içerik servisleri"
  },
  {
    "name": "Alışveriş",
    "color": "#f97316",
    "icon": "shopping-bag",
    "description": "E-ticaret, pazar yerleri ve alışveriş platformları"
  },
  {
    "name": "Konum",
    "color": "#14b8a6",
    "icon": "map-pin",
    "description": "Haritalar, navigasyon ve coğrafi bilgi servisleri"
  },
  {
    "name": "Oyun",
    "color": "#8b5cf6",
    "icon": "gamepad-2",
    "description": "Oyun platformları, web oyunları ve oyun toplulukları"
  },
  {
    "name": "Programlama",
    "color": "#3b82f6",
    "icon": "code-2",
    "description": "Yazılım geliştirme, API'ler, GitHub ve kodlama kaynakları"
  },
  {
    "name": "AI",
    "color": "#a855f7",
    "icon": "bot",
    "description": "Yapay zeka modelleri, LLM'ler, görsel ve prompt araçları"
  },
  {
    "name": "Web Uygulamaları",
    "color": "#0ea5e9",
    "icon": "layout-grid",
    "description": "Bulut tabanlı web uygulamaları ve verimlilik yazılımları"
  },
  {
    "name": "Forum",
    "color": "#84cc16",
    "icon": "messages-square",
    "description": "Tartışma panoları, soru-cevap toplulukları ve forumlar"
  }
];

export const SEED_TAGS = [
  {
    "name": "routine"
  },
  {
    "name": "gunluk"
  },
  {
    "name": "devlet"
  },
  {
    "name": "kamu"
  },
  {
    "name": "egitim"
  },
  {
    "name": "kurs"
  },
  {
    "name": "araclar"
  },
  {
    "name": "tools"
  },
  {
    "name": "genel"
  },
  {
    "name": "portal"
  },
  {
    "name": "sosyal"
  },
  {
    "name": "topluluk"
  },
  {
    "name": "medya"
  },
  {
    "name": "video"
  },
  {
    "name": "alisveris"
  },
  {
    "name": "konum"
  },
  {
    "name": "harita"
  },
  {
    "name": "oyun"
  },
  {
    "name": "games"
  },
  {
    "name": "programlama"
  },
  {
    "name": "kod"
  },
  {
    "name": "ai"
  },
  {
    "name": "yapay-zeka"
  },
  {
    "name": "web"
  },
  {
    "name": "app"
  },
  {
    "name": "forum"
  }
];

export const SEED_LINKS: RawSeedLink[] = [
  {
    "title": "Google Calendar",
    "url": "https://calendar.google.com/",
    "categoryName": "Routine",
    "tags": [
      "routine",
      "gunluk"
    ],
    "color": "#1a73e8",
    "isPinned": false,
    "description": "Google Calendar - Routine"
  },
  {
    "title": "Gmail",
    "url": "https://mail.google.com/",
    "categoryName": "Routine",
    "tags": [
      "routine",
      "gunluk"
    ],
    "color": "#ea4335",
    "isPinned": true,
    "description": "Gmail - Routine"
  },
  {
    "title": "ALİ YILDIZ Blog",
    "url": "https://aleyulala.blogspot.com/",
    "categoryName": "Routine",
    "tags": [
      "routine",
      "gunluk"
    ],
    "color": "#ff5722",
    "isPinned": false,
    "description": "ALİ YILDIZ Blog - Routine"
  },
  {
    "title": "Google Tasks",
    "url": "https://tasks.google.com/",
    "categoryName": "Routine",
    "tags": [
      "routine",
      "gunluk"
    ],
    "color": "#1a73e8",
    "isPinned": false,
    "description": "Google Tasks - Routine"
  },
  {
    "title": "Google Keep",
    "url": "https://keep.google.com/",
    "categoryName": "Routine",
    "tags": [
      "routine",
      "gunluk"
    ],
    "color": "#fbbc04",
    "isPinned": false,
    "description": "Google Keep - Routine"
  },
  {
    "title": "e-Devlet",
    "url": "https://www.turkiye.gov.tr/",
    "categoryName": "Devlet",
    "tags": [
      "devlet",
      "kamu"
    ],
    "color": "#e11d48",
    "isPinned": true,
    "description": "e-Devlet - Devlet"
  },
  {
    "title": "Kadim Hukuk Makaleler",
    "url": "https://kadimhukuk.com.tr/makaleler/",
    "categoryName": "Devlet",
    "tags": [
      "devlet",
      "kamu"
    ],
    "color": "#1e3a8a",
    "isPinned": true,
    "description": "Kadim Hukuk Makaleler - Devlet"
  },
  {
    "title": "BTK Akademi",
    "url": "https://www.btkakademi.gov.tr/",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#e11d48",
    "isPinned": false,
    "description": "BTK Akademi - Eğitim"
  },
  {
    "title": "Nextcloud",
    "url": "https://nextcloud.com/",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#0082c9",
    "isPinned": false,
    "description": "Nextcloud - Araçlar"
  },
  {
    "title": "Feedly RSS",
    "url": "https://feedly.com/",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#2bb24c",
    "isPinned": false,
    "description": "Feedly RSS - Araçlar"
  },
  {
    "title": "Inoreader RSS",
    "url": "https://www.inoreader.com/",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#0077b5",
    "isPinned": false,
    "description": "Inoreader RSS - Araçlar"
  },
  {
    "title": "RSS.app (RSS Bulucu)",
    "url": "https://rss.app/",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#ff6600",
    "isPinned": false,
    "description": "RSS.app (RSS Bulucu) - Araçlar"
  },
  {
    "title": "Google Saved",
    "url": "https://www.google.com/interests/saved?authuser=0",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#fbbc05",
    "isPinned": false,
    "description": "Google Saved - Genel"
  },
  {
    "title": "Google Products",
    "url": "https://about.google/intl/tr_ALL/products/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#34a853",
    "isPinned": false,
    "description": "Google Products - Genel"
  },
  {
    "title": "Google Search",
    "url": "https://www.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#4285f4",
    "isPinned": true,
    "description": "Google Search - Genel"
  },
  {
    "title": "Google Drive",
    "url": "https://drive.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#0f9d58",
    "isPinned": true,
    "description": "Google Drive - Genel"
  },
  {
    "title": "Google Docs",
    "url": "https://docs.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#4285f4",
    "isPinned": true,
    "description": "Google Docs - Genel"
  },
  {
    "title": "Google Sheets",
    "url": "https://sheets.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#0f9d58",
    "isPinned": false,
    "description": "Google Sheets - Genel"
  },
  {
    "title": "Google Slides",
    "url": "https://slides.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#f4b400",
    "isPinned": false,
    "description": "Google Slides - Genel"
  },
  {
    "title": "Google Forms",
    "url": "https://forms.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#7248b9",
    "isPinned": false,
    "description": "Google Forms - Genel"
  },
  {
    "title": "Google Calendar",
    "url": "https://calendar.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#1a73e8",
    "isPinned": false,
    "description": "Google Calendar - Genel"
  },
  {
    "title": "Google Keep",
    "url": "https://keep.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#fbbc04",
    "isPinned": false,
    "description": "Google Keep - Genel"
  },
  {
    "title": "Google Photos",
    "url": "https://photos.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#ea4335",
    "isPinned": false,
    "description": "Google Photos - Genel"
  },
  {
    "title": "Google Meet",
    "url": "https://meet.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#00ac47",
    "isPinned": false,
    "description": "Google Meet - Genel"
  },
  {
    "title": "Google News",
    "url": "https://news.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#ea4335",
    "isPinned": false,
    "description": "Google News - Genel"
  },
  {
    "title": "Google Play",
    "url": "https://play.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#01875f",
    "isPinned": false,
    "description": "Google Play - Genel"
  },
  {
    "title": "Google Scholar",
    "url": "https://scholar.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#4285f4",
    "isPinned": false,
    "description": "Google Scholar - Genel"
  },
  {
    "title": "Google Translate",
    "url": "https://translate.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#1a73e8",
    "isPinned": true,
    "description": "Google Translate - Genel"
  },
  {
    "title": "Google",
    "url": "https://www.google.com",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#482dff",
    "isPinned": true,
    "description": "Google - Genel"
  },
  {
    "title": "Google Lens",
    "url": "https://lens.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#ea4335",
    "isPinned": false,
    "description": "Google Lens - Genel"
  },
  {
    "title": "Google One",
    "url": "https://one.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#4285f4",
    "isPinned": false,
    "description": "Google One - Genel"
  },
  {
    "title": "Google Contacts",
    "url": "https://contacts.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#1a73e8",
    "isPinned": false,
    "description": "Google Contacts - Genel"
  },
  {
    "title": "Google Fonts",
    "url": "https://fonts.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#ff5252",
    "isPinned": false,
    "description": "Google Fonts - Genel"
  },
  {
    "title": "Google Tasks",
    "url": "https://tasks.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#1a73e8",
    "isPinned": false,
    "description": "Google Tasks - Genel"
  },
  {
    "title": "Blogger",
    "url": "https://www.blogger.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#ff5722",
    "isPinned": false,
    "description": "Blogger - Genel"
  },
  {
    "title": "Gmail",
    "url": "https://mail.google.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#ea4335",
    "isPinned": true,
    "description": "Gmail - Genel"
  },
  {
    "title": "Yandex",
    "url": "https://yandex.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#ff0000",
    "isPinned": false,
    "description": "Yandex - Genel"
  },
  {
    "title": "Vuhuv",
    "url": "https://vuhuv.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#e11d48",
    "isPinned": false,
    "description": "Vuhuv - Genel"
  },
  {
    "title": "Biliver",
    "url": "https://www.biliver.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#0ea5e9",
    "isPinned": false,
    "description": "Biliver - Genel"
  },
  {
    "title": "Wikipedia",
    "url": "https://www.wikipedia.org",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#3366cc",
    "isPinned": true,
    "description": "Wikipedia - Genel"
  },
  {
    "title": "DeepL",
    "url": "https://www.deepl.com",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#0f2b46",
    "isPinned": false,
    "description": "DeepL - Genel"
  },
  {
    "title": "Translate",
    "url": "https://translate.google.com",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#00b4d8",
    "isPinned": true,
    "description": "Translate - Genel"
  },
  {
    "title": "Photo Search",
    "url": "https://photosearch.tv",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#10b981",
    "isPinned": false,
    "description": "Photo Search - Genel"
  },
  {
    "title": "Internet Archive",
    "url": "https://archive.org",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#f59e0b",
    "isPinned": false,
    "description": "Internet Archive - Genel"
  },
  {
    "title": "Yandex Mail",
    "url": "https://mail.yandex.com.tr",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#fc3f1d",
    "isPinned": false,
    "description": "Yandex Mail - Genel"
  },
  {
    "title": "U18.net",
    "url": "https://u18.net",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#ef4444",
    "isPinned": false,
    "description": "U18.net - Genel"
  },
  {
    "title": "Yandex Translate",
    "url": "https://translate.yandex.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#fc3f1d",
    "isPinned": false,
    "description": "Yandex Translate - Genel"
  },
  {
    "title": "Yandex Disk",
    "url": "https://disk.yandex.com.tr/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#ec4899",
    "isPinned": false,
    "description": "Yandex Disk - Genel"
  },
  {
    "title": "Yandex Video",
    "url": "https://yandex.com/video/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#ff3333",
    "isPinned": false,
    "description": "Yandex Video - Genel"
  },
  {
    "title": "Yandex Calendar",
    "url": "https://calendar.yandex.com/",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#fc3f1d",
    "isPinned": false,
    "description": "Yandex Calendar - Genel"
  },
  {
    "title": "mail.com.tr",
    "url": "https://mail.com.tr",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#8b5cf6",
    "isPinned": false,
    "description": "mail.com.tr - Genel"
  },
  {
    "title": "Türk Telekom",
    "url": "https://www.turktelekom.com.tr",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#0056b3",
    "isPinned": false,
    "description": "Türk Telekom - Genel"
  },
  {
    "title": "Yapı Kredi",
    "url": "https://www.yapikredi.com.tr",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#003399",
    "isPinned": false,
    "description": "Yapı Kredi - Genel"
  },
  {
    "title": "Ziraat",
    "url": "https://www.ziraatbank.com.tr",
    "categoryName": "Genel",
    "tags": [
      "genel",
      "portal"
    ],
    "color": "#e30613",
    "isPinned": false,
    "description": "Ziraat - Genel"
  },
  {
    "title": "Google Chat",
    "url": "https://chat.google.com/",
    "categoryName": "Sosyal",
    "tags": [
      "sosyal",
      "topluluk"
    ],
    "color": "#06b6d4",
    "isPinned": false,
    "description": "Google Chat - Sosyal"
  },
  {
    "title": "Google Messages Web",
    "url": "https://messages.google.com/web/",
    "categoryName": "Sosyal",
    "tags": [
      "sosyal",
      "topluluk"
    ],
    "color": "#14b8a6",
    "isPinned": false,
    "description": "Google Messages Web - Sosyal"
  },
  {
    "title": "Reddit",
    "url": "https://www.reddit.com",
    "categoryName": "Sosyal",
    "tags": [
      "sosyal",
      "topluluk"
    ],
    "color": "#ff4500",
    "isPinned": true,
    "description": "Reddit - Sosyal"
  },
  {
    "title": "X",
    "url": "https://x.com",
    "categoryName": "Sosyal",
    "tags": [
      "sosyal",
      "topluluk"
    ],
    "color": "#1da1f2",
    "isPinned": true,
    "description": "X - Sosyal"
  },
  {
    "title": "Discord",
    "url": "https://discord.com",
    "categoryName": "Sosyal",
    "tags": [
      "sosyal",
      "topluluk"
    ],
    "color": "#5865f2",
    "isPinned": false,
    "description": "Discord - Sosyal"
  },
  {
    "title": "WhatsApp Web",
    "url": "https://web.whatsapp.com",
    "categoryName": "Sosyal",
    "tags": [
      "sosyal",
      "topluluk"
    ],
    "color": "#25d366",
    "isPinned": true,
    "description": "WhatsApp Web - Sosyal"
  },
  {
    "title": "Video Chat",
    "url": "https://liveeds.com",
    "categoryName": "Sosyal",
    "tags": [
      "sosyal",
      "topluluk"
    ],
    "color": "#f97316",
    "isPinned": false,
    "description": "Video Chat - Sosyal"
  },
  {
    "title": "Chat",
    "url": "https://worldchat.tv",
    "categoryName": "Sosyal",
    "tags": [
      "sosyal",
      "topluluk"
    ],
    "color": "#6366f1",
    "isPinned": false,
    "description": "Chat - Sosyal"
  },
  {
    "title": "Telegram Web",
    "url": "https://web.telegram.org/a/",
    "categoryName": "Sosyal",
    "tags": [
      "sosyal",
      "topluluk"
    ],
    "color": "#24a1de",
    "isPinned": false,
    "description": "Telegram Web - Sosyal"
  },
  {
    "title": "Instagram",
    "url": "https://www.instagram.com/",
    "categoryName": "Sosyal",
    "tags": [
      "sosyal",
      "topluluk"
    ],
    "color": "#e1306c",
    "isPinned": true,
    "description": "Instagram - Sosyal"
  },
  {
    "title": "Yandex Zen",
    "url": "https://zen.yandex.com/",
    "categoryName": "Sosyal",
    "tags": [
      "sosyal",
      "topluluk"
    ],
    "color": "#111111",
    "isPinned": false,
    "description": "Yandex Zen - Sosyal"
  },
  {
    "title": "ok.ru",
    "url": "https://ok.ru/",
    "categoryName": "Sosyal",
    "tags": [
      "sosyal",
      "topluluk"
    ],
    "color": "#ee8208",
    "isPinned": false,
    "description": "ok.ru - Sosyal"
  },
  {
    "title": "VK",
    "url": "https://vk.com/",
    "categoryName": "Sosyal",
    "tags": [
      "sosyal",
      "topluluk"
    ],
    "color": "#4a76a8",
    "isPinned": false,
    "description": "VK - Sosyal"
  },
  {
    "title": "Ask.fm",
    "url": "https://ask.fm/",
    "categoryName": "Sosyal",
    "tags": [
      "sosyal",
      "topluluk"
    ],
    "color": "#db3552",
    "isPinned": false,
    "description": "Ask.fm - Sosyal"
  },
  {
    "title": "Facebook",
    "url": "https://www.facebook.com/",
    "categoryName": "Sosyal",
    "tags": [
      "sosyal",
      "topluluk"
    ],
    "color": "#1877f2",
    "isPinned": false,
    "description": "Facebook - Sosyal"
  },
  {
    "title": "YouTube",
    "url": "https://www.youtube.com",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#ff0000",
    "isPinned": true,
    "description": "YouTube - Medya"
  },
  {
    "title": "Twitch",
    "url": "https://www.twitch.tv/",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#9146ff",
    "isPinned": true,
    "description": "Twitch - Medya"
  },
  {
    "title": "DLive",
    "url": "https://dlive.tv/",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#ffd300",
    "isPinned": false,
    "description": "DLive - Medya"
  },
  {
    "title": "Kick",
    "url": "https://kick.com/",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#53fc18",
    "isPinned": false,
    "description": "Kick - Medya"
  },
  {
    "title": "Rumble",
    "url": "https://rumble.com/",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#85c742",
    "isPinned": false,
    "description": "Rumble - Medya"
  },
  {
    "title": "Odysee",
    "url": "https://odysee.com/",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#ef1952",
    "isPinned": false,
    "description": "Odysee - Medya"
  },
  {
    "title": "Vimeo",
    "url": "https://vimeo.com/",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#1ab7ea",
    "isPinned": false,
    "description": "Vimeo - Medya"
  },
  {
    "title": "Dailymotion",
    "url": "https://www.dailymotion.com/",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#0066dc",
    "isPinned": false,
    "description": "Dailymotion - Medya"
  },
  {
    "title": "Spotify",
    "url": "https://open.spotify.com",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#1db954",
    "isPinned": true,
    "description": "Spotify - Medya"
  },
  {
    "title": "Netflix",
    "url": "https://www.netflix.com",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#e50914",
    "isPinned": true,
    "description": "Netflix - Medya"
  },
  {
    "title": "Radio",
    "url": "https://radiobrowser.com",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#84cc16",
    "isPinned": false,
    "description": "Radio - Medya"
  },
  {
    "title": "YouTube Music",
    "url": "https://music.youtube.com/",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#ff0033",
    "isPinned": true,
    "description": "YouTube Music - Medya"
  },
  {
    "title": "Yandex Music",
    "url": "https://music.yandex.com/",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#fc3f1d",
    "isPinned": false,
    "description": "Yandex Music - Medya"
  },
  {
    "title": "YouTube Studio",
    "url": "https://studio.youtube.com/",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#ff4e45",
    "isPinned": false,
    "description": "YouTube Studio - Medya"
  },
  {
    "title": "IPTVnator Web",
    "url": "https://iptvnator.vercel.app/",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#3b82f6",
    "isPinned": false,
    "description": "IPTVnator Web - Medya"
  },
  {
    "title": "HLS.js Demo",
    "url": "https://hlsjs.video-dev.org/demo/",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#d946ef",
    "isPinned": false,
    "description": "HLS.js Demo - Medya"
  },
  {
    "title": "OpenTV Player",
    "url": "https://opentvplayer.com/",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#e11d48",
    "isPinned": false,
    "description": "OpenTV Player - Medya"
  },
  {
    "title": "StreamingTVGuides",
    "url": "http://player.streamingtvguides.com",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#0ea5e9",
    "isPinned": false,
    "description": "StreamingTVGuides - Medya"
  },
  {
    "title": "M3U8 Play",
    "url": "https://m3u8play.dev",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#eab308",
    "isPinned": false,
    "description": "M3U8 Play - Medya"
  },
  {
    "title": "SS-IPTV",
    "url": "https://www.ss-iptv.com/en/users/playlist",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#a855f7",
    "isPinned": false,
    "description": "SS-IPTV - Medya"
  },
  {
    "title": "Golden Player",
    "url": "https://play.google.com/store/apps/details?id=com.lamdaticket.goldenplayer",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#22c55e",
    "isPinned": false,
    "description": "Golden Player - Medya"
  },
  {
    "title": "Query-Streamlink",
    "url": "https://github.com/LaneSh4d0w/query-streamlink",
    "categoryName": "Medya",
    "tags": [
      "medya",
      "video"
    ],
    "color": "#8957e5",
    "isPinned": false,
    "description": "Query-Streamlink - Medya"
  },
  {
    "title": "AliExpress",
    "url": "https://tr.aliexpress.com",
    "categoryName": "Alışveriş",
    "tags": [
      "alisveris"
    ],
    "color": "#ff4747",
    "isPinned": false,
    "description": "AliExpress - Alışveriş"
  },
  {
    "title": "Hepsiburada",
    "url": "https://www.hepsiburada.com",
    "categoryName": "Alışveriş",
    "tags": [
      "alisveris"
    ],
    "color": "#ff6000",
    "isPinned": false,
    "description": "Hepsiburada - Alışveriş"
  },
  {
    "title": "Sahibinden",
    "url": "https://www.sahibinden.com/",
    "categoryName": "Alışveriş",
    "tags": [
      "alisveris"
    ],
    "color": "#ffe800",
    "isPinned": true,
    "description": "Sahibinden - Alışveriş"
  },
  {
    "title": "Trendyol",
    "url": "https://www.trendyol.com",
    "categoryName": "Alışveriş",
    "tags": [
      "alisveris"
    ],
    "color": "#f27a1a",
    "isPinned": true,
    "description": "Trendyol - Alışveriş"
  },
  {
    "title": "Amazon.com.tr",
    "url": "https://www.amazon.com.tr",
    "categoryName": "Alışveriş",
    "tags": [
      "alisveris"
    ],
    "color": "#ff9900",
    "isPinned": false,
    "description": "Amazon.com.tr - Alışveriş"
  },
  {
    "title": "Yemek Sepeti",
    "url": "https://www.yemeksepeti.com",
    "categoryName": "Alışveriş",
    "tags": [
      "alisveris"
    ],
    "color": "#ea004b",
    "isPinned": false,
    "description": "Yemek Sepeti - Alışveriş"
  },
  {
    "title": "Amazon",
    "url": "https://www.amazon.com",
    "categoryName": "Alışveriş",
    "tags": [
      "alisveris"
    ],
    "color": "#ff9900",
    "isPinned": false,
    "description": "Amazon - Alışveriş"
  },
  {
    "title": "Google My Maps",
    "url": "https://www.google.com/maps/d/edit",
    "categoryName": "Konum",
    "tags": [
      "konum",
      "harita"
    ],
    "color": "#1a73e8",
    "isPinned": false,
    "description": "Google My Maps - Konum"
  },
  {
    "title": "Google Maps",
    "url": "https://maps.google.com/",
    "categoryName": "Konum",
    "tags": [
      "konum",
      "harita"
    ],
    "color": "#34a853",
    "isPinned": true,
    "description": "Google Maps - Konum"
  },
  {
    "title": "OpenStreetMap",
    "url": "https://www.openstreetmap.org/",
    "categoryName": "Konum",
    "tags": [
      "konum",
      "harita"
    ],
    "color": "#0284c7",
    "isPinned": false,
    "description": "OpenStreetMap - Konum"
  },
  {
    "title": "Yandex Maps",
    "url": "https://yandex.com/maps",
    "categoryName": "Konum",
    "tags": [
      "konum",
      "harita"
    ],
    "color": "#fc3f1d",
    "isPinned": false,
    "description": "Yandex Maps - Konum"
  },
  {
    "title": "Nokta",
    "url": "https://nokta.com/harita",
    "categoryName": "Konum",
    "tags": [
      "konum",
      "harita"
    ],
    "color": "#482dff",
    "isPinned": false,
    "description": "Nokta - Konum"
  },
  {
    "title": "Windy",
    "url": "https://www.windy.com",
    "categoryName": "Konum",
    "tags": [
      "konum",
      "harita"
    ],
    "color": "#00b4d8",
    "isPinned": false,
    "description": "Windy - Konum"
  },
  {
    "title": "Bing Harita",
    "url": "https://www.bing.com/maps",
    "categoryName": "Konum",
    "tags": [
      "konum",
      "harita"
    ],
    "color": "#10b981",
    "isPinned": false,
    "description": "Bing Harita - Konum"
  },
  {
    "title": "Zepva Games",
    "url": "https://zepva.com/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#6366f1",
    "isPinned": true,
    "description": "Zepva Games - Oyun"
  },
  {
    "title": "Impact (PlayerTwo)",
    "url": "https://playertwo.lol/game/impact",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#06b6d4",
    "isPinned": true,
    "description": "Impact (PlayerTwo) - Oyun"
  },
  {
    "title": "Krunker.io",
    "url": "https://krunker.io/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#f59e0b",
    "isPinned": true,
    "description": "Krunker.io - Oyun"
  },
  {
    "title": "Strikeborn (Roblox)",
    "url": "https://www.roblox.com/games/80167904212435/Strikeborn",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#ef4444",
    "isPinned": true,
    "description": "Strikeborn (Roblox) - Oyun"
  },
  {
    "title": "Roblox",
    "url": "https://www.roblox.com/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#dc2626",
    "isPinned": true,
    "description": "Roblox - Oyun"
  },
  {
    "title": "PlayerTwo",
    "url": "https://playertwo.lol/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#06b6d4",
    "isPinned": false,
    "description": "PlayerTwo - Oyun"
  },
  {
    "title": "Steam",
    "url": "https://store.steampowered.com/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#171a21",
    "isPinned": true,
    "description": "Steam - Oyun"
  },
  {
    "title": "Epic Games Store",
    "url": "https://store.epicgames.com/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#000000",
    "isPinned": false,
    "description": "Epic Games Store - Oyun"
  },
  {
    "title": "GOG.com",
    "url": "https://www.gog.com/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#8a2be2",
    "isPinned": false,
    "description": "GOG.com - Oyun"
  },
  {
    "title": "Xbox Cloud Gaming",
    "url": "https://www.xbox.com/play",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#107c10",
    "isPinned": true,
    "description": "Xbox Cloud Gaming - Oyun"
  },
  {
    "title": "GeForce NOW",
    "url": "https://play.geforcenow.com/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#76b900",
    "isPinned": true,
    "description": "GeForce NOW - Oyun"
  },
  {
    "title": "Itch.io",
    "url": "https://itch.io/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#fa5c5c",
    "isPinned": false,
    "description": "Itch.io - Oyun"
  },
  {
    "title": "CrazyGames",
    "url": "https://www.crazygames.com/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#8b5cf6",
    "isPinned": true,
    "description": "CrazyGames - Oyun"
  },
  {
    "title": "1v1.LOL",
    "url": "https://1v1.lol/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#3b82f6",
    "isPinned": false,
    "description": "1v1.LOL - Oyun"
  },
  {
    "title": "Venge.io",
    "url": "https://venge.io/#BBA9A3",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#10b981",
    "isPinned": true,
    "description": "Venge.io - Oyun"
  },
  {
    "title": "NFSMWO",
    "url": "https://web.nfsmwo.com/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#f59e0b",
    "isPinned": true,
    "description": "NFSMWO - Oyun"
  },
  {
    "title": "Shell Shockers",
    "url": "https://shellshockers.io/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#f97316",
    "isPinned": false,
    "description": "Shell Shockers - Oyun"
  },
  {
    "title": "Smash Karts",
    "url": "https://smashkarts.io/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#ec4899",
    "isPinned": false,
    "description": "Smash Karts - Oyun"
  },
  {
    "title": "Ev.io",
    "url": "https://ev.io/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#06b6d4",
    "isPinned": false,
    "description": "Ev.io - Oyun"
  },
  {
    "title": "Armor Games",
    "url": "https://armorgames.com/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#d97706",
    "isPinned": false,
    "description": "Armor Games - Oyun"
  },
  {
    "title": "Y8 Games",
    "url": "https://www.y8.com/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#b91c1c",
    "isPinned": false,
    "description": "Y8 Games - Oyun"
  },
  {
    "title": "Nexus Mods",
    "url": "https://www.nexusmods.com/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#da8e35",
    "isPinned": false,
    "description": "Nexus Mods - Oyun"
  },
  {
    "title": "SteamDB",
    "url": "https://steamdb.info/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#1b2838",
    "isPinned": false,
    "description": "SteamDB - Oyun"
  },
  {
    "title": "Games",
    "url": "https://arcadeok.com",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#f59e0b",
    "isPinned": false,
    "description": "Games - Oyun"
  },
  {
    "title": "Prime Gaming",
    "url": "https://gaming.amazon.com/lp/freegames",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#ff9900",
    "isPinned": false,
    "description": "Prime Gaming - Oyun"
  },
  {
    "title": "GG.deals Freebies",
    "url": "https://gg.deals/deals/freebies/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#ef4444",
    "isPinned": false,
    "description": "GG.deals Freebies - Oyun"
  },
  {
    "title": "Piano",
    "url": "https://virtualpiano.eu",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#ec4899",
    "isPinned": false,
    "description": "Piano - Oyun"
  },
  {
    "title": "Steam Free Games",
    "url": "https://store.steampowered.com/genre/Free%20to%20Play/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#8b5cf6",
    "isPinned": false,
    "description": "Steam Free Games - Oyun"
  },
  {
    "title": "Epic Free Games",
    "url": "https://store.epicgames.com/en-US/free-games",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#06b6d4",
    "isPinned": false,
    "description": "Epic Free Games - Oyun"
  },
  {
    "title": "GOG Free Games",
    "url": "https://www.gog.com/en/partner/free_games",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#14b8a6",
    "isPinned": false,
    "description": "GOG Free Games - Oyun"
  },
  {
    "title": "Humble Store",
    "url": "https://www.humblebundle.com/store",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#f97316",
    "isPinned": false,
    "description": "Humble Store - Oyun"
  },
  {
    "title": "Xbox Free Games",
    "url": "https://www.xbox.com/en-US/games/free-games",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "Xbox Free Games - Oyun"
  },
  {
    "title": "itch.io Free Games",
    "url": "https://itch.io/games/free",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#6366f1",
    "isPinned": false,
    "description": "itch.io Free Games - Oyun"
  },
  {
    "title": "IndieGala Freebies",
    "url": "https://freebies.indiegala.com/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#84cc16",
    "isPinned": false,
    "description": "IndieGala Freebies - Oyun"
  },
  {
    "title": "Free To Keep",
    "url": "https://freetokeep.gg/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#3b82f6",
    "isPinned": false,
    "description": "Free To Keep - Oyun"
  },
  {
    "title": "Reddit FreeGameFindings",
    "url": "https://www.reddit.com/r/FreeGameFindings/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#ff4500",
    "isPinned": false,
    "description": "Reddit FreeGameFindings - Oyun"
  },
  {
    "title": "FreeGames.lol",
    "url": "https://freegames.lol/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#d946ef",
    "isPinned": false,
    "description": "FreeGames.lol - Oyun"
  },
  {
    "title": "IndieBundle Free",
    "url": "https://www.indiegamebundles.com/category/free/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#e11d48",
    "isPinned": false,
    "description": "IndieBundle Free - Oyun"
  },
  {
    "title": "EmuOS",
    "url": "https://emupedia.net/beta/emuos/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#0ea5e9",
    "isPinned": false,
    "description": "EmuOS - Oyun"
  },
  {
    "title": "Archive Software Library",
    "url": "https://archive.org/details/softwarelibrary",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#eab308",
    "isPinned": false,
    "description": "Archive Software Library - Oyun"
  },
  {
    "title": "PlayClassic.Games",
    "url": "https://playclassic.games/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#a855f7",
    "isPinned": false,
    "description": "PlayClassic.Games - Oyun"
  },
  {
    "title": "RetroGames.cc",
    "url": "https://www.retrogames.cc/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#22c55e",
    "isPinned": false,
    "description": "RetroGames.cc - Oyun"
  },
  {
    "title": "Poki",
    "url": "https://poki.com/",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#0284c7",
    "isPinned": false,
    "description": "Poki - Oyun"
  },
  {
    "title": "Unreal Engine",
    "url": "https://www.unrealengine.com",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#482dff",
    "isPinned": false,
    "description": "Unreal Engine - Oyun"
  },
  {
    "title": "Fanatical Free",
    "url": "https://www.fanatical.com/en/free",
    "categoryName": "Oyun",
    "tags": [
      "oyun",
      "games"
    ],
    "color": "#00b4d8",
    "isPinned": false,
    "description": "Fanatical Free - Oyun"
  },
  {
    "title": "Google Trends",
    "url": "https://trends.google.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#4285f4",
    "isPinned": false,
    "description": "Google Trends - Araçlar"
  },
  {
    "title": "OmniTools",
    "url": "https://omnitools.app/",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#14b8a6",
    "isPinned": false,
    "description": "OmniTools - Araçlar"
  },
  {
    "title": "Toolixy",
    "url": "https://toolixy.online/",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#f97316",
    "isPinned": false,
    "description": "Toolixy - Araçlar"
  },
  {
    "title": "Google Ads",
    "url": "https://ads.google.com/",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#fbbc04",
    "isPinned": false,
    "description": "Google Ads - Araçlar"
  },
  {
    "title": "Tracking",
    "url": "https://trackingcode.net",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#10b981",
    "isPinned": false,
    "description": "Tracking - Araçlar"
  },
  {
    "title": "SpeedTest",
    "url": "https://browserspeed.net",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#f59e0b",
    "isPinned": false,
    "description": "SpeedTest - Araçlar"
  },
  {
    "title": "Antivirus",
    "url": "https://freeantivirus.pro",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#ef4444",
    "isPinned": false,
    "description": "Antivirus - Araçlar"
  },
  {
    "title": "Upload",
    "url": "https://deliverbit.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#ec4899",
    "isPinned": false,
    "description": "Upload - Araçlar"
  },
  {
    "title": "Software",
    "url": "https://rcpsoft.net",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#8b5cf6",
    "isPinned": false,
    "description": "Software - Araçlar"
  },
  {
    "title": "Apps",
    "url": "https://softenjoy.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#06b6d4",
    "isPinned": false,
    "description": "Apps - Araçlar"
  },
  {
    "title": "Webmaster",
    "url": "https://internetindexer.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "Webmaster - Araçlar"
  },
  {
    "title": "Temp Mail Ninja",
    "url": "https://tempmail.ninja",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#14b8a6",
    "isPinned": false,
    "description": "Temp Mail Ninja - Araçlar"
  },
  {
    "title": "SmallPDF",
    "url": "https://smallpdf.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#f97316",
    "isPinned": false,
    "description": "SmallPDF - Araçlar"
  },
  {
    "title": "Wayback Machine",
    "url": "https://web.archive.org",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#6366f1",
    "isPinned": false,
    "description": "Wayback Machine - Araçlar"
  },
  {
    "title": "ShareX",
    "url": "https://getsharex.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "ShareX - Araçlar"
  },
  {
    "title": "Temp Mail",
    "url": "https://temp-mail.org",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#84cc16",
    "isPinned": false,
    "description": "Temp Mail - Araçlar"
  },
  {
    "title": "TinyURL",
    "url": "https://tinyurl.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#3b82f6",
    "isPinned": false,
    "description": "TinyURL - Araçlar"
  },
  {
    "title": "PDFescape",
    "url": "https://www.pdfescape.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#d946ef",
    "isPinned": false,
    "description": "PDFescape - Araçlar"
  },
  {
    "title": "CloudConvert",
    "url": "https://cloudconvert.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#e11d48",
    "isPinned": false,
    "description": "CloudConvert - Araçlar"
  },
  {
    "title": "WeTransfer",
    "url": "https://wetransfer.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#0ea5e9",
    "isPinned": false,
    "description": "WeTransfer - Araçlar"
  },
  {
    "title": "Sender",
    "url": "https://www.sender.net",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#eab308",
    "isPinned": false,
    "description": "Sender - Araçlar"
  },
  {
    "title": "Ocoya",
    "url": "https://www.ocoya.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#a855f7",
    "isPinned": false,
    "description": "Ocoya - Araçlar"
  },
  {
    "title": "Ubersuggest",
    "url": "https://ubersuggest.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#22c55e",
    "isPinned": false,
    "description": "Ubersuggest - Araçlar"
  },
  {
    "title": "HubSpot",
    "url": "https://www.hubspot.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#0284c7",
    "isPinned": false,
    "description": "HubSpot - Araçlar"
  },
  {
    "title": "Designify",
    "url": "https://www.designify.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#482dff",
    "isPinned": false,
    "description": "Designify - Araçlar"
  },
  {
    "title": "Buffer",
    "url": "https://buffer.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#00b4d8",
    "isPinned": false,
    "description": "Buffer - Araçlar"
  },
  {
    "title": "AnswerThePublic",
    "url": "https://answerthepublic.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#10b981",
    "isPinned": false,
    "description": "AnswerThePublic - Araçlar"
  },
  {
    "title": "Buzzsumo",
    "url": "https://buzzsumo.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#f59e0b",
    "isPinned": false,
    "description": "Buzzsumo - Araçlar"
  },
  {
    "title": "Mem.ai",
    "url": "https://mem.ai",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#ef4444",
    "isPinned": false,
    "description": "Mem.ai - Araçlar"
  },
  {
    "title": "Trevor AI",
    "url": "https://www.trevorai.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#ec4899",
    "isPinned": false,
    "description": "Trevor AI - Araçlar"
  },
  {
    "title": "Reclaim.ai",
    "url": "https://reclaim.ai",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#8b5cf6",
    "isPinned": false,
    "description": "Reclaim.ai - Araçlar"
  },
  {
    "title": "Clockwise",
    "url": "https://www.getclockwise.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#06b6d4",
    "isPinned": false,
    "description": "Clockwise - Araçlar"
  },
  {
    "title": "Motion",
    "url": "https://www.usemotion.com",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#14b8a6",
    "isPinned": false,
    "description": "Motion - Araçlar"
  },
  {
    "title": "Yandex Metrica",
    "url": "https://metrika.yandex.com/",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#fc3f1d",
    "isPinned": false,
    "description": "Yandex Metrica - Araçlar"
  },
  {
    "title": "Yandex Wordstat",
    "url": "https://wordstat.yandex.com/",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#f97316",
    "isPinned": false,
    "description": "Yandex Wordstat - Araçlar"
  },
  {
    "title": "Hakaret Mi?",
    "url": "https://hakaretmi.com/",
    "categoryName": "Araçlar",
    "tags": [
      "araclar",
      "tools"
    ],
    "color": "#e11d48",
    "isPinned": false,
    "description": "Hakaret Mi? - Araçlar"
  },
  {
    "title": "Google Colab",
    "url": "https://colab.research.google.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#f9ab00",
    "isPinned": false,
    "description": "Google Colab - Programlama"
  },
  {
    "title": "ythls-FastAPI",
    "url": "https://github.com/keyiflerolsun/ythls-FastAPI",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#8957e5",
    "isPinned": false,
    "description": "ythls-FastAPI - Programlama"
  },
  {
    "title": "Stack Overflow",
    "url": "https://stackoverflow.com",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#f48024",
    "isPinned": false,
    "description": "Stack Overflow - Programlama"
  },
  {
    "title": "GitHub",
    "url": "https://github.com",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#8957e5",
    "isPinned": true,
    "description": "GitHub - Programlama"
  },
  {
    "title": "GeeksforGeeks",
    "url": "https://www.geeksforgeeks.org",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#2f8d46",
    "isPinned": false,
    "description": "GeeksforGeeks - Programlama"
  },
  {
    "title": "CS50",
    "url": "https://cs50.harvard.edu",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#6366f1",
    "isPinned": false,
    "description": "CS50 - Programlama"
  },
  {
    "title": "LeetCode",
    "url": "https://leetcode.com",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#ffa116",
    "isPinned": false,
    "description": "LeetCode - Programlama"
  },
  {
    "title": "Exercism",
    "url": "https://exercism.org",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "Exercism - Programlama"
  },
  {
    "title": "SoloLearn",
    "url": "https://www.sololearn.com",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#84cc16",
    "isPinned": false,
    "description": "SoloLearn - Programlama"
  },
  {
    "title": "Programiz",
    "url": "https://www.programiz.com",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#3b82f6",
    "isPinned": false,
    "description": "Programiz - Programlama"
  },
  {
    "title": "freeCodeCamp",
    "url": "https://www.freecodecamp.org",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#0a0a23",
    "isPinned": false,
    "description": "freeCodeCamp - Programlama"
  },
  {
    "title": "W3Schools",
    "url": "https://www.w3schools.com",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#04aa6d",
    "isPinned": false,
    "description": "W3Schools - Programlama"
  },
  {
    "title": "Codecademy",
    "url": "https://www.codecademy.com",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1f425f",
    "isPinned": false,
    "description": "Codecademy - Programlama"
  },
  {
    "title": "CodeHype",
    "url": "https://codehype.in",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#d946ef",
    "isPinned": false,
    "description": "CodeHype - Programlama"
  },
  {
    "title": "GitHub Copilot",
    "url": "https://github.com/features/copilot",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#8957e5",
    "isPinned": false,
    "description": "GitHub Copilot - Programlama"
  },
  {
    "title": "Yandex Cloud",
    "url": "https://cloud.yandex.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#fc3f1d",
    "isPinned": false,
    "description": "Yandex Cloud - Programlama"
  },
  {
    "title": "DistroSea",
    "url": "https://distrosea.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#e11d48",
    "isPinned": false,
    "description": "DistroSea - Programlama"
  },
  {
    "title": "v86 Emulator",
    "url": "https://copy.sh/v86/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#0ea5e9",
    "isPinned": false,
    "description": "v86 Emulator - Programlama"
  },
  {
    "title": "JSLinux",
    "url": "https://bellard.org/jslinux/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "JSLinux - Programlama"
  },
  {
    "title": "IPTV-org Database",
    "url": "https://github.com/iptv-org/iptv",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#8957e5",
    "isPinned": false,
    "description": "IPTV-org Database - Programlama"
  },
  {
    "title": "IPTV-org Awesome",
    "url": "https://github.com/iptv-org/awesome-iptv",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#eab308",
    "isPinned": false,
    "description": "IPTV-org Awesome - Programlama"
  },
  {
    "title": "Legal-IPTV",
    "url": "https://github.com/UzunMuhalefet/Legal-IPTV",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#8957e5",
    "isPinned": false,
    "description": "Legal-IPTV - Programlama"
  },
  {
    "title": "devsolux Playlist",
    "url": "https://github.com/devsolux/iptv-playlist",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "devsolux Playlist - Programlama"
  },
  {
    "title": "Kekik M3U",
    "url": "https://github.com/KekikAkademi/m3u-indir",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#8957e5",
    "isPinned": false,
    "description": "Kekik M3U - Programlama"
  },
  {
    "title": "IPTV-Proxy",
    "url": "https://github.com/pierre-emmanuelJ/iptv-proxy",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "IPTV-Proxy - Programlama"
  },
  {
    "title": "m3u_parser",
    "url": "https://github.com/pawanpaudel93/m3u_parser",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#8957e5",
    "isPinned": false,
    "description": "m3u_parser - Programlama"
  },
  {
    "title": "ArchWiki",
    "url": "https://wiki.archlinux.org/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1793d1",
    "isPinned": false,
    "description": "ArchWiki - Programlama"
  },
  {
    "title": "Linux.com",
    "url": "https://www.linux.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "Linux.com - Programlama"
  },
  {
    "title": "Kernel.org",
    "url": "https://www.kernel.org/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#f59e0b",
    "isPinned": false,
    "description": "Kernel.org - Programlama"
  },
  {
    "title": "GNU.org",
    "url": "https://www.gnu.org/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#a855f7",
    "isPinned": false,
    "description": "GNU.org - Programlama"
  },
  {
    "title": "TLDP",
    "url": "https://tldp.org/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#22c55e",
    "isPinned": false,
    "description": "TLDP - Programlama"
  },
  {
    "title": "Debian Wiki",
    "url": "https://wiki.debian.org/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#a81d33",
    "isPinned": false,
    "description": "Debian Wiki - Programlama"
  },
  {
    "title": "Ubuntu Docs",
    "url": "https://help.ubuntu.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#e95420",
    "isPinned": false,
    "description": "Ubuntu Docs - Programlama"
  },
  {
    "title": "Fedora Docs",
    "url": "https://docs.fedoraproject.org/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#294172",
    "isPinned": false,
    "description": "Fedora Docs - Programlama"
  },
  {
    "title": "Linux Journey",
    "url": "https://linuxjourney.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "Linux Journey - Programlama"
  },
  {
    "title": "OverTheWire",
    "url": "https://overthewire.org/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#0284c7",
    "isPinned": false,
    "description": "OverTheWire - Programlama"
  },
  {
    "title": "ExplainShell",
    "url": "https://explainshell.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "ExplainShell - Programlama"
  },
  {
    "title": "Linux Survival",
    "url": "https://linuxsurvival.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#482dff",
    "isPinned": false,
    "description": "Linux Survival - Programlama"
  },
  {
    "title": "Crontab.guru",
    "url": "https://crontab.guru/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#00b4d8",
    "isPinned": false,
    "description": "Crontab.guru - Programlama"
  },
  {
    "title": "Bash Academy",
    "url": "https://www.bash.academy/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#10b981",
    "isPinned": false,
    "description": "Bash Academy - Programlama"
  },
  {
    "title": "Linux Handbook",
    "url": "https://linuxhandbook.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "Linux Handbook - Programlama"
  },
  {
    "title": "Webminal",
    "url": "https://www.webminal.org/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#f59e0b",
    "isPinned": false,
    "description": "Webminal - Programlama"
  },
  {
    "title": "Phoronix",
    "url": "https://www.phoronix.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "Phoronix - Programlama"
  },
  {
    "title": "It's FOSS",
    "url": "https://itsfoss.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#ef4444",
    "isPinned": false,
    "description": "It's FOSS - Programlama"
  },
  {
    "title": "OMG! Ubuntu!",
    "url": "https://www.omgubuntu.co.uk/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#e95420",
    "isPinned": false,
    "description": "OMG! Ubuntu! - Programlama"
  },
  {
    "title": "9to5Linux",
    "url": "https://9to5linux.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "9to5Linux - Programlama"
  },
  {
    "title": "Linux Today",
    "url": "https://www.linuxtoday.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#ec4899",
    "isPinned": false,
    "description": "Linux Today - Programlama"
  },
  {
    "title": "LWN.net",
    "url": "https://lwn.net/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#8b5cf6",
    "isPinned": false,
    "description": "LWN.net - Programlama"
  },
  {
    "title": "Linux Journal",
    "url": "https://www.linuxjournal.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "Linux Journal - Programlama"
  },
  {
    "title": "FOSS Linux",
    "url": "https://www.fosslinux.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#06b6d4",
    "isPinned": false,
    "description": "FOSS Linux - Programlama"
  },
  {
    "title": "Linux Insider",
    "url": "https://www.linuxinsider.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "Linux Insider - Programlama"
  },
  {
    "title": "TecMint",
    "url": "https://www.tecmint.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#14b8a6",
    "isPinned": false,
    "description": "TecMint - Programlama"
  },
  {
    "title": "Unixmen",
    "url": "https://www.unixmen.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "Unixmen - Programlama"
  },
  {
    "title": "DistroWatch",
    "url": "https://distrowatch.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#f97316",
    "isPinned": false,
    "description": "DistroWatch - Programlama"
  },
  {
    "title": "Linux Mint",
    "url": "https://linuxmint.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#87cf3e",
    "isPinned": false,
    "description": "Linux Mint - Programlama"
  },
  {
    "title": "Ubuntu",
    "url": "https://ubuntu.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#e95420",
    "isPinned": false,
    "description": "Ubuntu - Programlama"
  },
  {
    "title": "Fedora Project",
    "url": "https://fedoraproject.org/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#294172",
    "isPinned": false,
    "description": "Fedora Project - Programlama"
  },
  {
    "title": "Arch Linux",
    "url": "https://archlinux.org/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1793d1",
    "isPinned": false,
    "description": "Arch Linux - Programlama"
  },
  {
    "title": "Debian",
    "url": "https://www.debian.org/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#a81d33",
    "isPinned": false,
    "description": "Debian - Programlama"
  },
  {
    "title": "Manjaro",
    "url": "https://manjaro.org/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#35bf5c",
    "isPinned": false,
    "description": "Manjaro - Programlama"
  },
  {
    "title": "Pop!_OS",
    "url": "https://pop.system76.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#48b9c7",
    "isPinned": false,
    "description": "Pop!_OS - Programlama"
  },
  {
    "title": "GitLab",
    "url": "https://about.gitlab.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#fc6d26",
    "isPinned": false,
    "description": "GitLab - Programlama"
  },
  {
    "title": "Docker Hub",
    "url": "https://hub.docker.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#2496ed",
    "isPinned": false,
    "description": "Docker Hub - Programlama"
  },
  {
    "title": "Linode",
    "url": "https://www.linode.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#6366f1",
    "isPinned": false,
    "description": "Linode - Programlama"
  },
  {
    "title": "DigitalOcean Tutorials",
    "url": "https://www.digitalocean.com/community/tutorials",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#84cc16",
    "isPinned": false,
    "description": "DigitalOcean Tutorials - Programlama"
  },
  {
    "title": "Reddit /r/linux",
    "url": "https://www.reddit.com/r/linux/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#ff4500",
    "isPinned": false,
    "description": "Reddit /r/linux - Programlama"
  },
  {
    "title": "Unix & Linux SE",
    "url": "https://unix.stackexchange.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "Unix & Linux SE - Programlama"
  },
  {
    "title": "Ask Ubuntu",
    "url": "https://askubuntu.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#e95420",
    "isPinned": false,
    "description": "Ask Ubuntu - Programlama"
  },
  {
    "title": "Linux Questions",
    "url": "https://www.linuxquestions.org/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "Linux Questions - Programlama"
  },
  {
    "title": "GamingOnLinux",
    "url": "https://www.gamingonlinux.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#3b82f6",
    "isPinned": false,
    "description": "GamingOnLinux - Programlama"
  },
  {
    "title": "ProtonDB",
    "url": "https://www.protondb.com/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#d946ef",
    "isPinned": false,
    "description": "ProtonDB - Programlama"
  },
  {
    "title": "GNOME Look",
    "url": "https://www.gnome-look.org/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#e11d48",
    "isPinned": false,
    "description": "GNOME Look - Programlama"
  },
  {
    "title": "KDE Store",
    "url": "https://store.kde.org/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#0ea5e9",
    "isPinned": false,
    "description": "KDE Store - Programlama"
  },
  {
    "title": "Flathub",
    "url": "https://flathub.org/",
    "categoryName": "Programlama",
    "tags": [
      "programlama",
      "kod"
    ],
    "color": "#eab308",
    "isPinned": false,
    "description": "Flathub - Programlama"
  },
  {
    "title": "JobStep",
    "url": "https://www.jobstep.io/",
    "categoryName": "AI",
    "tags": [
      "ai",
      "kariyer",
      "cv",
      "araçlar"
    ],
    "color": "#0ea5e9",
    "isPinned": false,
    "description": "JobStep - Yapay zeka destekli CV hazırlama, ATS uyumluluk analizi ve iş başvuru takip platformu.",
    "views": 182,
    "commentsCount": 4,
    "authorName": "NEGRONN"
  },
  {
    "title": "Google AI Studio",
    "url": "https://aistudio.google.com/",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#1a73e8",
    "isPinned": false,
    "description": "Google AI Studio - AI"
  },
  {
    "title": "Screenshot to Code",
    "url": "https://screenshottocode.com/",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#ec4899",
    "isPinned": false,
    "description": "Screenshot to Code - AI"
  },
  {
    "title": "ScrapeGraphAI",
    "url": "https://scrapegraphai.com/",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#8b5cf6",
    "isPinned": false,
    "description": "ScrapeGraphAI - AI"
  },
  {
    "title": "AI Tool",
    "url": "https://datracks.com",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#a855f7",
    "isPinned": false,
    "description": "AI Tool - AI"
  },
  {
    "title": "Gemini",
    "url": "https://gemini.google.com/",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#1ba1e2",
    "isPinned": true,
    "description": "Gemini - AI"
  },
  {
    "title": "ChatGPT",
    "url": "https://chatgpt.com",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#10a37f",
    "isPinned": true,
    "description": "ChatGPT - AI"
  },
  {
    "title": "Claude",
    "url": "https://claude.ai",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#d97706",
    "isPinned": false,
    "description": "Claude - AI"
  },
  {
    "title": "Duck.ai",
    "url": "https://duck.ai",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#de5833",
    "isPinned": false,
    "description": "Duck.ai - AI"
  },
  {
    "title": "Perplexity",
    "url": "https://www.perplexity.ai",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#22b8cf",
    "isPinned": false,
    "description": "Perplexity - AI"
  },
  {
    "title": "Leonardo.ai",
    "url": "https://leonardo.ai",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#7c3aed",
    "isPinned": false,
    "description": "Leonardo.ai - AI"
  },
  {
    "title": "Nano Banana",
    "url": "https://aistudio.google.com/models/nano-banana",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#22c55e",
    "isPinned": false,
    "description": "Nano Banana - AI"
  },
  {
    "title": "Ideogram",
    "url": "https://ideogram.ai",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#f43f5e",
    "isPinned": false,
    "description": "Ideogram - AI"
  },
  {
    "title": "Tensor.art",
    "url": "https://tensor.art",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#0284c7",
    "isPinned": false,
    "description": "Tensor.art - AI"
  },
  {
    "title": "Lexica.art",
    "url": "https://lexica.art",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "Lexica.art - AI"
  },
  {
    "title": "BlueWillow",
    "url": "https://www.bluewillow.ai",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#482dff",
    "isPinned": false,
    "description": "BlueWillow - AI"
  },
  {
    "title": "NightCafe",
    "url": "https://creator.nightcafe.studio",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#00b4d8",
    "isPinned": false,
    "description": "NightCafe - AI"
  },
  {
    "title": "Artbreeder",
    "url": "https://www.artbreeder.com",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#10b981",
    "isPinned": false,
    "description": "Artbreeder - AI"
  },
  {
    "title": "Deep Dream Generator",
    "url": "https://deepdreamgenerator.com",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#f59e0b",
    "isPinned": false,
    "description": "Deep Dream Generator - AI"
  },
  {
    "title": "Prodia",
    "url": "https://app.prodia.com",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#ef4444",
    "isPinned": false,
    "description": "Prodia - AI"
  },
  {
    "title": "Kling AI",
    "url": "https://klingai.com",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#e11d48",
    "isPinned": false,
    "description": "Kling AI - AI"
  },
  {
    "title": "Captions",
    "url": "https://www.captions.ai",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#ec4899",
    "isPinned": false,
    "description": "Captions - AI"
  },
  {
    "title": "HeyGen",
    "url": "https://www.heygen.com",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#3b82f6",
    "isPinned": false,
    "description": "HeyGen - AI"
  },
  {
    "title": "Animaker",
    "url": "https://www.animaker.com",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#8b5cf6",
    "isPinned": false,
    "description": "Animaker - AI"
  },
  {
    "title": "Unscreen",
    "url": "https://www.unscreen.com",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#06b6d4",
    "isPinned": false,
    "description": "Unscreen - AI"
  },
  {
    "title": "Opus Clip",
    "url": "https://www.opus.pro",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#14b8a6",
    "isPinned": false,
    "description": "Opus Clip - AI"
  },
  {
    "title": "Wisecut",
    "url": "https://www.wisecut.ai",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#f97316",
    "isPinned": false,
    "description": "Wisecut - AI"
  },
  {
    "title": "Adobe Podcast",
    "url": "https://podcast.adobe.com/enhance",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#6366f1",
    "isPinned": false,
    "description": "Adobe Podcast - AI"
  },
  {
    "title": "Fliki",
    "url": "https://fliki.ai",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#84cc16",
    "isPinned": false,
    "description": "Fliki - AI"
  },
  {
    "title": "Steve.ai",
    "url": "https://www.steve.ai",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#3b82f6",
    "isPinned": false,
    "description": "Steve.ai - AI"
  },
  {
    "title": "Copy.ai",
    "url": "https://www.copy.ai",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#10b981",
    "isPinned": false,
    "description": "Copy.ai - AI"
  },
  {
    "title": "Jasper",
    "url": "https://www.jasper.ai",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#6366f1",
    "isPinned": false,
    "description": "Jasper - AI"
  },
  {
    "title": "Hemingway",
    "url": "https://hemingwayapp.com",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#d946ef",
    "isPinned": false,
    "description": "Hemingway - AI"
  },
  {
    "title": "ProWritingAid",
    "url": "https://prowritingaid.com",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#e11d48",
    "isPinned": false,
    "description": "ProWritingAid - AI"
  },
  {
    "title": "Smart Copy",
    "url": "https://unbounce.com/product/smart-copy/",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#0ea5e9",
    "isPinned": false,
    "description": "Smart Copy - AI"
  },
  {
    "title": "Wordtune",
    "url": "https://www.wordtune.com",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#eab308",
    "isPinned": false,
    "description": "Wordtune - AI"
  },
  {
    "title": "Readsy",
    "url": "https://readsy.co",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#a855f7",
    "isPinned": false,
    "description": "Readsy - AI"
  },
  {
    "title": "Airstory",
    "url": "https://airstory.co",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#22c55e",
    "isPinned": false,
    "description": "Airstory - AI"
  },
  {
    "title": "Headline Analyzer",
    "url": "https://coschedule.com/headline-analyzer",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#0284c7",
    "isPinned": false,
    "description": "Headline Analyzer - AI"
  },
  {
    "title": "Cliche Finder",
    "url": "http://clichefinder.net",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#482dff",
    "isPinned": false,
    "description": "Cliche Finder - AI"
  },
  {
    "title": "CanIRank",
    "url": "https://canirank.com",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#00b4d8",
    "isPinned": false,
    "description": "CanIRank - AI"
  },
  {
    "title": "YandexART",
    "url": "https://ya.ru/art/",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#fc3f1d",
    "isPinned": false,
    "description": "YandexART - AI"
  },
  {
    "title": "NotebookLM",
    "url": "https://notebooklm.google.com/",
    "categoryName": "AI",
    "tags": [
      "ai",
      "yapay-zeka"
    ],
    "color": "#4285f4",
    "isPinned": false,
    "description": "NotebookLM - AI"
  },
  {
    "title": "Google Careers",
    "url": "https://careers.google.com/",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#10b981",
    "isPinned": false,
    "description": "Google Careers - Eğitim"
  },
  {
    "title": "AngelList",
    "url": "https://angel.co",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#f59e0b",
    "isPinned": false,
    "description": "AngelList - Eğitim"
  },
  {
    "title": "Naukri",
    "url": "https://www.naukri.com",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#ef4444",
    "isPinned": false,
    "description": "Naukri - Eğitim"
  },
  {
    "title": "Wellfound",
    "url": "https://wellfound.com",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#ec4899",
    "isPinned": false,
    "description": "Wellfound - Eğitim"
  },
  {
    "title": "FlexJobs",
    "url": "https://www.flexjobs.com",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "FlexJobs - Eğitim"
  },
  {
    "title": "Levels.fyi",
    "url": "https://www.levels.fyi",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#8b5cf6",
    "isPinned": false,
    "description": "Levels.fyi - Eğitim"
  },
  {
    "title": "Jobscan",
    "url": "https://www.jobscan.co",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#06b6d4",
    "isPinned": false,
    "description": "Jobscan - Eğitim"
  },
  {
    "title": "LinkedIn",
    "url": "https://www.linkedin.com",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#0a66c2",
    "isPinned": false,
    "description": "LinkedIn - Eğitim"
  },
  {
    "title": "Indeed",
    "url": "https://www.indeed.com",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#14b8a6",
    "isPinned": false,
    "description": "Indeed - Eğitim"
  },
  {
    "title": "Glassdoor",
    "url": "https://www.glassdoor.com",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#f97316",
    "isPinned": false,
    "description": "Glassdoor - Eğitim"
  },
  {
    "title": "MindTools",
    "url": "https://www.mindtools.com",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#6366f1",
    "isPinned": false,
    "description": "MindTools - Eğitim"
  },
  {
    "title": "TED",
    "url": "https://www.ted.com",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#84cc16",
    "isPinned": false,
    "description": "TED - Eğitim"
  },
  {
    "title": "Udemy",
    "url": "https://www.udemy.com",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#3b82f6",
    "isPinned": false,
    "description": "Udemy - Eğitim"
  },
  {
    "title": "Duolingo",
    "url": "https://www.duolingo.com",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#d946ef",
    "isPinned": false,
    "description": "Duolingo - Eğitim"
  },
  {
    "title": "FutureLearn",
    "url": "https://www.futurelearn.com",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#e11d48",
    "isPinned": false,
    "description": "FutureLearn - Eğitim"
  },
  {
    "title": "Brilliant",
    "url": "https://brilliant.org",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#0ea5e9",
    "isPinned": false,
    "description": "Brilliant - Eğitim"
  },
  {
    "title": "edX",
    "url": "https://www.edx.org",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "edX - Eğitim"
  },
  {
    "title": "Coursera",
    "url": "https://www.coursera.org",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#eab308",
    "isPinned": false,
    "description": "Coursera - Eğitim"
  },
  {
    "title": "Skillshare",
    "url": "https://www.skillshare.com",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#a855f7",
    "isPinned": false,
    "description": "Skillshare - Eğitim"
  },
  {
    "title": "Khan Academy",
    "url": "https://www.khanacademy.org",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#22c55e",
    "isPinned": false,
    "description": "Khan Academy - Eğitim"
  },
  {
    "title": "Grow with Google",
    "url": "https://grow.google/",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#34a853",
    "isPinned": false,
    "description": "Grow with Google - Eğitim"
  },
  {
    "title": "Türkiye Spor Federasyonu",
    "url": "https://www.tssf.gov.tr",
    "categoryName": "Eğitim",
    "tags": [
      "egitim",
      "kurs"
    ],
    "color": "#0284c7",
    "isPinned": false,
    "description": "Türkiye Spor Federasyonu - Eğitim"
  },
  {
    "title": "Photopea",
    "url": "https://www.photopea.com/",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#179a83",
    "isPinned": false,
    "description": "Photopea - Web Uygulamaları"
  },
  {
    "title": "Suno Studio",
    "url": "https://suno.com",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#482dff",
    "isPinned": false,
    "description": "Suno Studio - Web Uygulamaları"
  },
  {
    "title": "Photoskop",
    "url": "https://photoskop.com",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#00b4d8",
    "isPinned": false,
    "description": "Photoskop - Web Uygulamaları"
  },
  {
    "title": "Canva",
    "url": "https://www.canva.com",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#00c4cc",
    "isPinned": true,
    "description": "Canva - Web Uygulamaları"
  },
  {
    "title": "Notion",
    "url": "https://www.notion.so",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#37352f",
    "isPinned": false,
    "description": "Notion - Web Uygulamaları"
  },
  {
    "title": "Image Edit",
    "url": "https://upperpix.com",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "Image Edit - Web Uygulamaları"
  },
  {
    "title": "Adobe Express",
    "url": "https://www.adobe.com/express/",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#10b981",
    "isPinned": false,
    "description": "Adobe Express - Web Uygulamaları"
  },
  {
    "title": "Figma",
    "url": "https://www.figma.com",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#f24e1e",
    "isPinned": false,
    "description": "Figma - Web Uygulamaları"
  },
  {
    "title": "Coolors",
    "url": "https://coolors.co",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#f59e0b",
    "isPinned": false,
    "description": "Coolors - Web Uygulamaları"
  },
  {
    "title": "Unsplash",
    "url": "https://unsplash.com",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#ef4444",
    "isPinned": false,
    "description": "Unsplash - Web Uygulamaları"
  },
  {
    "title": "WatermarkRemover",
    "url": "https://www.watermarkremover.io",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#ec4899",
    "isPinned": false,
    "description": "WatermarkRemover - Web Uygulamaları"
  },
  {
    "title": "Flaticon",
    "url": "https://www.flaticon.com",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#8b5cf6",
    "isPinned": false,
    "description": "Flaticon - Web Uygulamaları"
  },
  {
    "title": "Dribbble",
    "url": "https://dribbble.com",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#06b6d4",
    "isPinned": false,
    "description": "Dribbble - Web Uygulamaları"
  },
  {
    "title": "Behance",
    "url": "https://www.behance.net",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#14b8a6",
    "isPinned": false,
    "description": "Behance - Web Uygulamaları"
  },
  {
    "title": "Spline",
    "url": "https://spline.design",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#f97316",
    "isPinned": false,
    "description": "Spline - Web Uygulamaları"
  },
  {
    "title": "ClickUp",
    "url": "https://clickup.com",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#6366f1",
    "isPinned": false,
    "description": "ClickUp - Web Uygulamaları"
  },
  {
    "title": "Asana",
    "url": "https://asana.com",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#84cc16",
    "isPinned": false,
    "description": "Asana - Web Uygulamaları"
  },
  {
    "title": "Cobalt",
    "url": "https://cobalt.tools/",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#3b82f6",
    "isPinned": false,
    "description": "Cobalt - Web Uygulamaları"
  },
  {
    "title": "AlternativeTo",
    "url": "https://alternativeto.net/",
    "categoryName": "Web Uygulamaları",
    "tags": [
      "web",
      "app"
    ],
    "color": "#d946ef",
    "isPinned": false,
    "description": "AlternativeTo - Web Uygulamaları"
  },
  {
    "title": "Google Groups",
    "url": "https://groups.google.com/",
    "categoryName": "Forum",
    "tags": [
      "forum",
      "topluluk"
    ],
    "color": "#4285f4",
    "isPinned": false,
    "description": "Google Groups - Forum"
  },
  {
    "title": "Ekşi Sözlük",
    "url": "https://eksisozluk.com/",
    "categoryName": "Forum",
    "tags": [
      "forum",
      "topluluk"
    ],
    "color": "#53a653",
    "isPinned": true,
    "description": "Ekşi Sözlük - Forum"
  },
  {
    "title": "NesiKomik",
    "url": "https://nesikomik.com/",
    "categoryName": "Forum",
    "tags": [
      "forum",
      "topluluk"
    ],
    "color": "#c89d66",
    "isPinned": false,
    "description": "NesiKomik - Forum"
  },
  {
    "title": "Forum Sinetech",
    "url": "https://forum.sinetech.tr",
    "categoryName": "Forum",
    "tags": [
      "forum",
      "topluluk"
    ],
    "color": "#e11d48",
    "isPinned": false,
    "description": "Forum Sinetech - Forum"
  },
  {
    "title": "NSONE",
    "url": "https://negronshow.blogspot.com",
    "categoryName": "Forum",
    "tags": [
      "forum",
      "topluluk"
    ],
    "color": "#0ea5e9",
    "isPinned": false,
    "description": "NSONE - Forum"
  },
  {
    "title": "TNCTR",
    "url": "https://tnctr.com",
    "categoryName": "Forum",
    "tags": [
      "forum",
      "topluluk"
    ],
    "color": "#eab308",
    "isPinned": false,
    "description": "TNCTR - Forum"
  },
  {
    "title": "BTT",
    "url": "https://btt.community",
    "categoryName": "Forum",
    "tags": [
      "forum",
      "topluluk"
    ],
    "color": "#a855f7",
    "isPinned": false,
    "description": "BTT - Forum"
  },
  {
    "title": "Simülasyon Türk Park",
    "url": "https://park.simulasyonturk.com/",
    "categoryName": "Forum",
    "tags": [
      "forum",
      "topluluk"
    ],
    "color": "#22c55e",
    "isPinned": false,
    "description": "Simülasyon Türk Park - Forum"
  },
  {
    "title": "XDA Forums",
    "url": "https://xdaforums.com",
    "categoryName": "Forum",
    "tags": [
      "forum",
      "topluluk"
    ],
    "color": "#1da1f2",
    "isPinned": false,
    "description": "XDA Forums - Forum"
  }
];
