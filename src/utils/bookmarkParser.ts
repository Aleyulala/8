import { CollectionItem, LinkItem, TagItem } from '../types';

export interface ParsedBookmark {
  url: string;
  title: string;
  collectionName?: string;
  tags?: string[];
  dateAdded?: number;
}

/**
 * Parses standard Netscape Bookmark HTML exported from Chrome, Firefox, Safari, Edge, etc.
 */
export function parseNetscapeBookmarks(htmlContent: string): ParsedBookmark[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');
  const results: ParsedBookmark[] = [];

  function traverse(node: Element, currentFolder?: string) {
    const children = Array.from(node.children);
    for (let i = 0; i < children.length; i++) {
      const el = children[i];
      const tagName = el.tagName.toUpperCase();

      if (tagName === 'DT') {
        const h3 = el.querySelector(':scope > h3');
        const a = el.querySelector(':scope > a');
        const dl = el.querySelector(':scope > dl');

        if (h3) {
          const folderName = h3.textContent?.trim() || currentFolder;
          if (dl) {
            traverse(dl, folderName);
          }
        } else if (a) {
          const href = a.getAttribute('href');
          if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
            const addDateAttr = a.getAttribute('add_date');
            let dateAdded = Date.now();
            if (addDateAttr) {
              const parsedDate = parseInt(addDateAttr, 10);
              // Netscape format uses seconds
              dateAdded = parsedDate < 10000000000 ? parsedDate * 1000 : parsedDate;
            }

            const tagsAttr = a.getAttribute('tags');
            const tags = tagsAttr ? tagsAttr.split(',').map(t => t.trim()).filter(Boolean) : [];

            results.push({
              url: href,
              title: a.textContent?.trim() || href,
              collectionName: currentFolder,
              tags: tags,
              dateAdded: dateAdded
            });
          }
        }
      } else if (tagName === 'DL') {
        traverse(el, currentFolder);
      }
    }
  }

  const rootDl = doc.querySelector('dl');
  if (rootDl) {
    traverse(rootDl);
  } else {
    // Fallback: search all <a> tags with href
    const allLinks = doc.querySelectorAll('a[href]');
    allLinks.forEach(a => {
      const href = a.getAttribute('href');
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        results.push({
          url: href,
          title: a.textContent?.trim() || href,
          dateAdded: Date.now()
        });
      }
    });
  }

  return results;
}

/**
 * Generates standard Netscape Bookmark HTML
 */
export function generateNetscapeBookmarks(links: LinkItem[], collections: CollectionItem[]): string {
  const collectionMap = new Map<number, CollectionItem>();
  collections.forEach(c => {
    if (c.id) collectionMap.set(c.id, c);
  });

  // Group links by collection
  const groups: Record<string, LinkItem[]> = {};
  links.forEach(link => {
    const colName = link.collectionId ? (collectionMap.get(link.collectionId)?.name || 'Diğer') : 'Genel';
    if (!groups[colName]) groups[colName] = [];
    groups[colName].push(link);
  });

  let html = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file by Saved. -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
`;

  for (const [folderName, items] of Object.entries(groups)) {
    html += `    <DT><H3 ADD_DATE="${Math.floor(Date.now() / 1000)}" LAST_MODIFIED="${Math.floor(Date.now() / 1000)}">${escapeHtml(folderName)}</H3>\n`;
    html += `    <DL><p>\n`;
    for (const item of items) {
      const addDate = Math.floor((item.createdAt || Date.now()) / 1000);
      const tagsStr = item.tags.length > 0 ? ` TAGS="${escapeHtml(item.tags.join(','))}"` : '';
      html += `        <DT><A HREF="${escapeHtml(item.url)}" ADD_DATE="${addDate}"${tagsStr}>${escapeHtml(item.title || item.url)}</A>\n`;
      if (item.description) {
        html += `        <DD>${escapeHtml(item.description)}\n`;
      }
    }
    html += `    </DL><p>\n`;
  }

  html += `</DL><p>\n`;
  return html;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
