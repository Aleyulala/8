export interface BloggerAuthor {
  name: string;
  role: string;
  avatar: string;
  url: string;
  bio: string;
  communityUrl: string;
  telegram: string;
  vk: string;
  email: string;
  location: string;
}

export const BLOGGER_AUTHORS: Record<string, BloggerAuthor> = {
  NEGRONN: {
    name: 'NEGRONN',
    role: 'Yazar & Yazılım Mimarı',
    avatar: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitPixdLUVLiPrAHHj7qc2zjaiK8Vh0PDfop1AvNC9IKYKGL1kyIoCe0B7u6BRjBg8n-ErQ5hSrf8-YsRxmHpz3YLSedBi92U8DUasXt9BFR9AFA5pg1GieJyqc6AyLSDIqEwMtNJCE8CJK2mq93wD5n4dY6uIVCrG8xTRnTQG84WczZA/w512-h512-p-k-no-nu/Kare_imgupscaler.ai_v2(Pro)_2K.png',
    url: 'https://aleyulala.blogspot.com/',
    bio: 'Saved Startpage ve Blogger ağının mimarı. Local-first açık kaynaklı sistemler, gizlilik odaklı web teknolojileri ve dijital içerik üretimi.',
    communityUrl: 'https://matrix.to/#/#negronn-show:matrix.org',
    telegram: 'https://t.me/aleyyulala',
    vk: 'https://vk.com/negronn',
    email: 'mrstar14155@gmail.com',
    location: 'Türkiye'
  },
  Ali: {
    name: 'Ali',
    role: 'Yazar & Tasarımcı',
    avatar: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjjT58R28e7lYqePX68NeRvRxlbijCtpeymV7MkfiBfZWKmruNrWeVitd8DBa2ByAOq1YQn4a_c5xbQY-eTs5qiYIj2OufpVa9iesFBKFzd2fQWF9MY6I6c75SY3Qd5huzOLyf6xH5E-xxcU-VQgi-6MTmVZziAbzjjJsousPItL3jGsA/w60-h60-p-k-no-nu/140423179.jpeg',
    url: 'https://negronshow.blogspot.com/',
    bio: 'İçerik üreticisi ve dijital küratör. Local-first açık kaynaklı sistemler ve web teknolojileri.',
    communityUrl: 'https://matrix.to/#/#negronn-show:matrix.org',
    telegram: 'https://t.me/aleyyulala',
    vk: 'https://vk.com/negronn',
    email: 'mrstar14155@gmail.com',
    location: 'Türkiye'
  }
};

export function getAuthorData(authorName?: string): BloggerAuthor {
  const norm = (authorName || '').trim().toLowerCase();
  if (norm === 'ali' || norm.includes('ali')) {
    return BLOGGER_AUTHORS.Ali;
  }
  return BLOGGER_AUTHORS.NEGRONN;
}
