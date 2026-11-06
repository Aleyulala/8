/**
 * Automatic RSS / Atom Resolver Helper
 * Birebir saved-main/index.html motoru ve genişletilmiş RSS tespit mantığı
 */

export function resolveRss(urlOrLink: string | { url?: string; rss?: string }): string {
  if (!urlOrLink) return '';
  
  if (typeof urlOrLink !== 'string') {
    if (urlOrLink.rss && String(urlOrLink.rss).trim()) {
      return String(urlOrLink.rss).trim();
    }
    return resolveRss(urlOrLink.url || '');
  }

  const u = String(urlOrLink).trim();
  if (!u) return '';

  try {
    const parsed = new URL(/^https?:\/\//i.test(u) ? u : 'https://' + u);
    const host = parsed.hostname.toLowerCase();
    const origin = parsed.origin;
    const pathname = parsed.pathname.replace(/\/+$/, '');

    // 1. YouTube
    if (host.includes('youtube.com')) {
      if (pathname.includes('/channel/')) {
        const id = pathname.split('/channel/')[1]?.split('/')[0];
        if (id) return `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`;
      }
      if (pathname.includes('/user/')) {
        const user = pathname.split('/user/')[1]?.split('/')[0];
        if (user) return `https://www.youtube.com/feeds/videos.xml?user=${user}`;
      }
      return '';
    }

    // 2. Reddit
    if (host.includes('reddit.com')) {
      return pathname ? `${origin}${pathname}/.rss` : `${origin}/.rss`;
    }

    // 3. Blogger & Blogspot
    if (host.includes('blogspot.com') || host.includes('blogger.com')) {
      return `${origin}/feeds/posts/default?alt=rss`;
    }

    // 4. Medium
    if (host.includes('medium.com')) {
      return pathname ? `${origin}/feed${pathname}` : `${origin}/feed`;
    }

    // 5. GitHub Releases / Commits
    if (host.includes('github.com')) {
      const parts = pathname.split('/').filter(Boolean);
      if (parts.length >= 2) {
        return `${origin}/${parts[0]}/${parts[1]}/releases.atom`;
      }
    }

    // 6. Bilinen Platformlar & Servisler (saved-main birebir)
    if (host.includes('gitlab.com')) return 'https://about.gitlab.com/atom.xml';
    if (host.includes('dropbox.com')) return 'https://blog.dropbox.com/feed';
    if (host.includes('fiverr.com')) return 'https://blog.fiverr.com/feed';
    if (host.includes('shopify.com')) return 'https://www.shopify.com/blog.atom';
    if (host.includes('hubspot.com')) return 'https://blog.hubspot.com/rss.xml';
    if (host.includes('trello.com')) return 'https://blog.trello.com/feed';
    if (host.includes('toptal.com')) return 'https://www.toptal.com/blog.rss';
    if (host.includes('matrix.org')) return 'https://matrix.org/blog/feed.xml';
    if (host.includes('pcloud.com')) return 'https://blog.pcloud.com/feed/';
    if (host.includes('multcloud.com')) return 'https://www.multcloud.com/rss.xml';
    if (host.includes('terabox.com')) return 'https://www.terabox.com/rss.xml';
    if (host.includes('sync.com')) return 'https://www.sync.com/rss.xml';
    if (host.includes('nextcloud.com')) return 'https://nextcloud.com/blog/feed/';
    if (host.includes('substack.com')) return `${origin}/feed`;
    if (host.includes('dev.to')) {
      const parts = pathname.split('/').filter(Boolean);
      return parts.length >= 1 ? `https://dev.to/feed/${parts[0]}` : 'https://dev.to/feed';
    }

    // 7. Popüler Türk & Global Web Siteleri / CMS
    if (
      host.includes('wordpress') || 
      host.includes('shiftdelete') || 
      host.includes('webtekno') || 
      host.includes('donanimhaber') || 
      host.includes('bundlehaber') || 
      host.includes('bebarbilim') || 
      host.includes('siberkurs') || 
      host.includes('yazbel') || 
      host.includes('r10.net') ||
      host.includes('spunkram') ||
      host.includes('tulinkayalar') ||
      host.includes('inxanitylabs') ||
      host.includes('rasulov')
    ) {
      return `${origin}/feed/`;
    }

    if (host.includes('deviantart.com')) {
      return 'https://backend.deviantart.com/rss.xml?q=boost%3Apopular+max_age%3A8h';
    }

    // 8. Standart Blog / Haber URL Desenleri
    if (pathname.includes('/blog') || pathname.includes('/news') || pathname.includes('/articles')) {
      return `${origin}/feed/`;
    }

    return '';
  } catch {
    return '';
  }
}

/**
 * Site için alternatif RSS / Atom aday bağlantıları listeler
 */
export function getCandidateRssUrls(url: string): string[] {
  if (!url) return [];
  try {
    const parsed = new URL(/^https?:\/\//i.test(url) ? url : 'https://' + url);
    const origin = parsed.origin;
    const resolved = resolveRss(url);
    const candidates = new Set<string>();

    if (resolved) candidates.add(resolved);
    candidates.add(`${origin}/feed/`);
    candidates.add(`${origin}/feed`);
    candidates.add(`${origin}/rss.xml`);
    candidates.add(`${origin}/atom.xml`);
    candidates.add(`${origin}/feeds/posts/default?alt=rss`);
    candidates.add(`${origin}/feed.xml`);
    
    return Array.from(candidates);
  } catch {
    return [];
  }
}
