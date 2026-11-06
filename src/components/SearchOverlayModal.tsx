import React, { useState, useEffect, useRef } from 'react';
import { SearchNormalIcon, CloseIcon } from './BloggerIcons';
import { LinkItem, CollectionItem } from '../types';
import { db } from '../db';
import { getFaviconUrl } from '../utils/favicon';

interface SearchOverlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLink?: (link: LinkItem) => void;
  onApplySearchQuery?: (query: string) => void;
  initialQuery?: string;
}

const SEARCH_ENGINES = [
  { name: 'Blog Sayfasında Ara', url: 'blog' },
  { name: 'Google AI', url: 'https://www.google.com/search?udm=50&q=' },
  { name: 'Google', url: 'https://www.google.com/search?q=' },
  { name: 'GitHub', url: 'https://github.com/search?q=' },
  { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=' },
  { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
  { name: 'Perplexity', url: 'https://www.perplexity.ai/search?q=' },
  { name: 'Yandex', url: 'https://yandex.com/search/?text=' },
  { name: 'Archive', url: 'https://archive.org/search?query=' },
  { name: 'Google Hız Testi', url: 'https://pagespeed.web.dev/analysis?url=' },
  { name: 'Google Zengin Arama', url: 'https://search.google.com/test/rich-results?url=' },
  { name: 'Hakaret Mi?', url: 'https://hakaretmi.com/?s=' },
];

const SHORTCUTS: Record<string, { label: string; url: string }> = {
  blog: { label: 'Blog Sayfasında Ara', url: 'blog' },
  saved: { label: 'Blog Sayfasında Ara', url: 'blog' },
  b: { label: 'Blog Sayfasında Ara', url: 'blog' },
  yt: { label: 'YouTube', url: 'https://www.youtube.com/results?search_query=' },
  youtube: { label: 'YouTube', url: 'https://www.youtube.com/results?search_query=' },
  gh: { label: 'GitHub', url: 'https://github.com/search?q=' },
  github: { label: 'GitHub', url: 'https://github.com/search?q=' },
  wiki: { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Special:Search?search=' },
  maps: { label: 'Google Haritalar', url: 'https://www.google.com/maps/search/' },
  ps: { label: 'Google Hız Testi', url: 'https://pagespeed.web.dev/analysis?url=' },
  pagespeed: { label: 'Google Hız Testi', url: 'https://pagespeed.web.dev/analysis?url=' },
  rich: { label: 'Google Zengin Sonuçlar', url: 'https://search.google.com/test/rich-results?url=' },
  amp: { label: 'Google AMP Testi', url: 'https://search.google.com/test/amp/result?url=' },
  hm: { label: 'Hakaret Mi?', url: 'https://hakaretmi.com/?s=' },
  hakaret: { label: 'Hakaret Mi?', url: 'https://hakaretmi.com/?s=' },
  g: { label: 'Google', url: 'https://www.google.com/search?q=' },
  ddg: { label: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
};

function calculate(q: string): number | null {
  if (!/^[\d\s+\-*/().%]+$/.test(q)) return null;
  try {
    const result = Function(`"use strict"; return (${q})`)();
    return Number.isFinite(result) ? result : null;
  } catch {
    return null;
  }
}

export const SearchOverlayModal: React.FC<SearchOverlayModalProps> = ({
  isOpen,
  onClose,
  onSelectLink,
  onApplySearchQuery,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedEngine, setSelectedEngine] = useState('blog');
  const [matchingLinks, setMatchingLinks] = useState<LinkItem[]>([]);
  const [collectionMap, setCollectionMap] = useState<Map<number, string>>(new Map());
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setSelectedIndex(-1);
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);

      // Load collections
      db.collections.toArray().then(cols => {
        const map = new Map<number, string>();
        cols.forEach(c => {
          if (c.id) map.set(c.id, c.name);
        });
        setCollectionMap(map);
      });
    }
  }, [isOpen, initialQuery]);

  // Live matching saved links search
  useEffect(() => {
    let isMounted = true;
    const searchDb = async () => {
      const q = query.trim().toLowerCase();
      if (!q) {
        setMatchingLinks([]);
        return;
      }

      const all = await db.links.toArray();
      const cols = await db.collections.toArray();

      // If category / collection search @name
      if (q.startsWith('@')) {
        const cat = q.slice(1).trim();
        const matchedColIds = cols
          .filter(c => c.name.toLowerCase().includes(cat))
          .map(c => c.id);

        const filtered = all.filter(l => 
          !l.isTrash && (
            (l.collectionId && matchedColIds.includes(l.collectionId)) ||
            (l.tags && l.tags.some(t => t.toLowerCase().includes(cat)))
          )
        ).slice(0, 8);
        if (isMounted) setMatchingLinks(filtered);
        return;
      }

      const filtered = all.filter(l => {
        if (l.isTrash) return false;
        const nameMatch = l.title.toLowerCase().includes(q);
        const urlMatch = l.url.toLowerCase().includes(q);
        const descMatch = (l.description || '').toLowerCase().includes(q);
        const tagMatch = (l.tags || []).some(t => t.toLowerCase().includes(q));
        const colName = l.collectionId ? (collectionMap.get(l.collectionId) || '') : '';
        const colMatch = colName.toLowerCase().includes(q);
        return nameMatch || urlMatch || descMatch || tagMatch || colMatch;
      }).slice(0, 8);

      if (isMounted) setMatchingLinks(filtered);
    };

    searchDb();
    return () => { isMounted = false; };
  }, [query, collectionMap]);

  if (!isOpen) return null;

  const trimmedQuery = query.trim();
  const mathResult = calculate(trimmedQuery);

  // Shortcut check
  const parts = trimmedQuery.split(/\s+/);
  const prefix = (parts[0] || '').toLowerCase().replace(/:$/, '');
  const hasShortcut = SHORTCUTS[prefix] && trimmedQuery.length > prefix.length;
  const shortcutTarget = hasShortcut ? SHORTCUTS[prefix] : null;
  const shortcutPayload = hasShortcut ? trimmedQuery.slice(parts[0].length).trim() : '';

  // Direct URL check
  const isDirectUrl = /^(https?:\/\/|[\w-]+\.[a-z]{2,})(\/|$)/i.test(trimmedQuery);

  const handleExecuteSearch = (customEngineUrl?: string) => {
    if (!trimmedQuery) return;

    // 1. Math calculation
    if (mathResult !== null) {
      setQuery(`${trimmedQuery} = ${mathResult}`);
      return;
    }

    // 2. Shortcut bang
    if (hasShortcut && shortcutTarget && shortcutPayload) {
      if (shortcutTarget.url === 'blog') {
        if (onApplySearchQuery) {
          onApplySearchQuery(shortcutPayload);
        }
        onClose();
        return;
      }
      window.open(shortcutTarget.url + encodeURIComponent(shortcutPayload), '_blank', 'noopener,noreferrer');
      onClose();
      return;
    }

    // 3. Direct URL
    if (isDirectUrl) {
      const safeUrl = trimmedQuery.startsWith('http') ? trimmedQuery : `https://${trimmedQuery}`;
      window.open(safeUrl, '_blank', 'noopener,noreferrer');
      onClose();
      return;
    }

    // 4. Custom or Selected Engine
    const targetEngine = customEngineUrl || selectedEngine;
    if (targetEngine === 'blog') {
      if (onApplySearchQuery) {
        onApplySearchQuery(trimmedQuery);
      }
      onClose();
      return;
    }
    window.open(targetEngine + encodeURIComponent(trimmedQuery), '_blank', 'noopener,noreferrer');
    
    // Also update in-app filter
    if (onApplySearchQuery) {
      onApplySearchQuery(trimmedQuery);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, matchingLinks.length - 1));
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && matchingLinks[selectedIndex]) {
        const item = matchingLinks[selectedIndex];
        if (onSelectLink) {
          onSelectLink(item);
        } else {
          window.open(item.url, '_blank', 'noopener,noreferrer');
        }
        onClose();
        return;
      }

      handleExecuteSearch();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Kapat Butonu */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-lg bg-[#252526] hover:bg-[#333333] border border-transparent flex items-center justify-center text-[#989b9f] hover:text-white transition-all shadow-lg cursor-pointer"
        aria-label="Aramayı Kapat (Esc)"
        title="Kapat (Esc)"
      >
        <CloseIcon className="w-4 h-4" />
      </button>

      <div className="w-full max-w-2xl flex flex-col gap-3">
        
        {/* Arama Kutusu ve Motor Seçici (Search Wrap) */}
        <div className="flex items-center gap-2 p-1.5 sm:p-2 rounded-lg bg-[#252526] border border-transparent shadow-2xl focus-within:border-[#60cdff]/50 transition-all">
          
          {/* Arama Motoru Dropdown */}
          <select
            value={selectedEngine}
            onChange={(e) => setSelectedEngine(e.target.value)}
            className="bg-[#1e1e1e] hover:bg-[#28282b] text-[#d4d4d4] text-xs font-semibold py-2 px-2.5 rounded-lg border border-transparent outline-none cursor-pointer shrink-0 max-w-[110px] sm:max-w-[130px] truncate"
            title="Arama Motoru Seçin"
          >
            {SEARCH_ENGINES.map(eng => (
              <option key={eng.url} value={eng.url}>
                {eng.name}
              </option>
            ))}
          </select>

          {/* Arama Input */}
          <div className="relative flex-1 flex items-center">
            <span className="absolute left-2.5 text-[#989b9f] pointer-events-none">
              <SearchNormalIcon className="w-4 h-4" />
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="İnternette arayın, @kategori veya bir adres girin…"
              className="w-full bg-transparent pl-9 pr-8 py-2 text-sm text-white placeholder-[#71717a] outline-none"
              autoComplete="off"
              spellCheck="false"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2 text-[#989b9f] hover:text-white transition-colors"
              >
                <CloseIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Ara Butonu */}
          <button
            type="button"
            onClick={() => handleExecuteSearch()}
            className="w-9 h-9 rounded-lg bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#7dd3fc] hover:to-[#38bdf8] text-[#0f172a] flex items-center justify-center font-bold text-base shadow-md active:scale-95 transition-all cursor-pointer shrink-0"
            title="Ara veya Git (Enter)"
          >
            <SearchNormalIcon className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Hızlı Arama Motoru Hap Butonları */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none select-none">
          {SEARCH_ENGINES.slice(0, 8).map(eng => {
            const isActive = selectedEngine === eng.url;
            return (
              <button
                key={eng.name}
                type="button"
                onClick={() => {
                  setSelectedEngine(eng.url);
                  if (trimmedQuery) {
                    handleExecuteSearch(eng.url);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#60cdff]/15 text-[#60cdff] border-[#60cdff]/40 shadow-sm'
                    : 'bg-[#1e1e1e] hover:bg-[#28282b] text-[#a3a3a3] hover:text-white border-transparent'
                }`}
              >
                <span>{eng.name}</span>
              </button>
            );
          })}
        </div>

        {/* Canlı Kısayol / Hesap Makinesi / Doğrudan URL Önizlemesi */}
        {(mathResult !== null || hasShortcut || isDirectUrl) && (
          <div className="p-3 rounded-xl bg-[#1e1e1e]/90 border border-white/5 flex items-center justify-between text-xs animate-in fade-in duration-150">
            {mathResult !== null && (
              <div className="flex items-center gap-2 text-emerald-400 font-mono">
                <span className="text-base font-bold">🧮</span>
                <span>Hesap Sonucu: <strong>{trimmedQuery} = {mathResult}</strong></span>
              </div>
            )}
            {hasShortcut && shortcutTarget && (
              <div className="flex items-center gap-2 text-[#60cdff]">
                <span className="text-base">⚡</span>
                <span><strong>{shortcutTarget.label}</strong> üzerinde ara: <em>"{shortcutPayload}"</em></span>
              </div>
            )}
            {!hasShortcut && isDirectUrl && (
              <div className="flex items-center gap-2 text-sky-300">
                <span className="text-base">🔗</span>
                <span>Doğrudan Web Adresine Git: <strong>{trimmedQuery}</strong></span>
              </div>
            )}
            <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#252526] text-[#989b9f]">
              Enter ↵
            </kbd>
          </div>
        )}

        {/* Eşleşen Kayıtlı Linkler Paneli */}
        {matchingLinks.length > 0 && (
          <div className="max-h-72 overflow-y-auto rounded-lg bg-[#1e1e1e] border border-transparent p-1.5 space-y-1 shadow-2xl">
            <div className="px-2.5 py-1 text-[11px] font-semibold text-[#989b9f] uppercase tracking-wider flex items-center justify-between">
              <span>Kayıtlı Bağlantılarınız ({matchingLinks.length})</span>
              <span className="text-[10px] font-normal text-[#71717a]">Gezinmek için ↑ ↓</span>
            </div>

            {matchingLinks.map((link, idx) => {
              const isItemActive = idx === selectedIndex;
              const colName = link.collectionId ? collectionMap.get(link.collectionId) : null;
              return (
                <div
                  key={link.id || link.url}
                  onClick={() => {
                    if (onSelectLink) onSelectLink(link);
                    else window.open(link.url, '_blank', 'noopener,noreferrer');
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                    isItemActive
                      ? 'bg-[#252526] text-white border border-[#404045]'
                      : 'hover:bg-[#252526]/70 text-[#d4d4d4]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <img
                      src={link.favicon || getFaviconUrl(link.url)}
                      alt=""
                      className="w-4 h-4 rounded object-contain shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate text-[#f3f4f6]">
                        {link.title}
                      </div>
                      <div className="text-[11px] text-[#71717a] truncate font-mono">
                        {link.url}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {colName && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#28282b] text-[#a3a3a3]">
                        {colName}
                      </span>
                    )}
                    {link.isPinned && (
                      <span className="text-amber-400 text-xs" title="Sabitlenmiş">★</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bilgilendirme Altlığı */}
        <div className="flex items-center justify-between px-2 text-[11px] text-[#71717a] font-mono">
          <span>Kısayollar: <strong>yt</strong>, <strong>gh</strong>, <strong>wiki</strong>, <strong>ps</strong>, <strong>@kategori</strong></span>
          <span>Kapatmak için <strong>Esc</strong></span>
        </div>

      </div>
    </div>
  );
};
