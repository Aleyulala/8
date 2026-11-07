import React, { useState, useEffect } from 'react';
import { exportDatabaseToJson, downloadFile } from '../utils/exportImport';

interface FloatingMenuProps {
  onOpenNewLink: () => void;
  onOpenSearch: () => void;
  onOpenCollections: () => void;
  onOpenSettings: () => void;
  onOpenImportExport: () => void;
  onOpenTags?: () => void;
  onOpenAllLinks?: () => void;
}

export const FloatingMenu: React.FC<FloatingMenuProps> = ({
  onOpenNewLink,
  onOpenSearch,
  onOpenCollections,
  onOpenSettings,
  onOpenImportExport,
  onOpenTags,
  onOpenAllLinks
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('mainScrollContainer');
      const scrollTop = el ? el.scrollTop : (window.scrollY || document.documentElement.scrollTop);
      const scrollHeight = el ? el.scrollHeight : document.documentElement.scrollHeight;
      const clientHeight = el ? el.clientHeight : window.innerHeight;

      const maxScroll = scrollHeight - clientHeight;
      let pct = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      if (pct < 0) pct = 0;
      if (pct > 100) pct = 100;

      setProgress(pct);
      setIsScrolled(scrollTop > 20);
    };

    const container = document.getElementById('mainScrollContainer');
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial calculation
    handleScroll();

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToggle = () => {
    const el = document.getElementById('mainScrollContainer');
    if (el) {
      if (el.scrollTop <= 20) {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      } else {
        el.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      if ((window.scrollY || document.documentElement.scrollTop) <= 20) {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleQuickBackup = async () => {
    try {
      const jsonStr = await exportDatabaseToJson();
      const dateStr = new Date().toISOString().slice(0, 10);
      downloadFile(jsonStr, `saved-backup-${dateStr}.json`, 'application/json');
    } catch (e) {
      console.error('Quick backup failed:', e);
    }
  };

  return (
    <>
      <style>{`
        /* Blogger Float Menü (.qeF) & Scroll to Top / Bottom (.tTb) */
        .blogger-float-group {
          position: fixed;
          bottom: 24px;
          inset-inline-end: 24px;
          z-index: 40;
          display: flex;
          align-items: center;
          gap: 12px;
          pointer-events: none;
        }

        .qeF {
          position: relative;
          pointer-events: auto;
        }

        .qeF svg.line {
          width: 18px;
          height: 18px;
          stroke: currentColor;
          stroke-width: 1.75;
          fill: none;
          transition: transform .2s ease;
        }
        .qeF svg.line .c {
          stroke: #989b9f;
        }

        .qeT, .qeL > button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: #252526;
          color: #ffffff;
          border: 1px solid #404045;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(.4,0,.2,1);
        }
        .qeT:hover, .qeL > button:hover {
          background-color: #333333;
          border-color: #60cdff;
          color: #60cdff;
        }

        .qeL > button {
          position: absolute;
          bottom: 2px;
          inset-inline-end: 2px;
          width: 32px;
          height: 32px;
          visibility: hidden;
          opacity: 0;
          pointer-events: none;
          transition: all 0.25s cubic-bezier(.4,0,.2,1);
          z-index: -1;
        }
        .qeL > button::before {
          content: attr(title);
          position: absolute;
          inset-inline-end: 40px;
          padding: 3px 8px;
          background: #1e1e1e;
          color: #f3f4f6;
          font-size: 11px;
          font-weight: 500;
          border-radius: 5px;
          border: 1px solid #404045;
          white-space: nowrap;
          visibility: hidden;
          opacity: 0;
          transition: opacity 0.15s ease, transform 0.15s ease;
          transform: translateX(-4px);
          pointer-events: none;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
        .qeL > button:hover::before {
          visibility: visible;
          opacity: 1;
          transform: translateX(0);
        }

        /* Fan-out radial grid coordinates from theme XML */
        .qeF.is-open .qeL > button {
          visibility: visible;
          opacity: 1;
          pointer-events: auto;
        }
        .qeF.is-open .qeL > button:nth-child(1) { z-index: 10; bottom: 42px; inset-inline-end: 0; }
        .qeF.is-open .qeL > button:nth-child(2) { z-index: 9; bottom: 0; inset-inline-end: 42px; }
        .qeF.is-open .qeL > button:nth-child(3) { z-index: 9; bottom: 42px; inset-inline-end: 42px; }
        .qeF.is-open .qeL > button:nth-child(4) { z-index: 8; bottom: 80px; inset-inline-end: 0; }
        .qeF.is-open .qeL > button:nth-child(5) { z-index: 7; bottom: 0; inset-inline-end: 80px; }
        .qeF.is-open .qeL > button:nth-child(6) { z-index: 8; bottom: 80px; inset-inline-end: 42px; }
        .qeF.is-open .qeL > button:nth-child(7) { z-index: 7; bottom: 42px; inset-inline-end: 80px; }
        .qeF.is-open .qeL > button:nth-child(8) { z-index: 7; bottom: 80px; inset-inline-end: 80px; }

        .qeF.is-open .qeT .g1 { display: none !important; }
        .qeF:not(.is-open) .qeT .g2 { display: none !important; }
        .qeF.is-open .qeT svg { transform: rotate(360deg); }

        /* Full backdrop when open */
        .fCls {
          position: fixed;
          inset: 0;
          z-index: 38;
          background: rgba(0,0,0,0.25);
          backdrop-filter: blur(1px);
        }

        /* Scroll to Top / Bottom (.tTb) */
        .tTb {
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          background: transparent;
          border: none;
          padding: 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          transition: transform 0.2s ease;
        }
        .tTb:hover {
          transform: scale(1.05);
        }
        .tTb svg {
          width: 36px;
          height: 36px;
          display: block;
        }
        .tTb circle:first-of-type {
          fill: #252526;
          stroke: #404045;
        }
        .tTb circle:last-of-type {
          stroke: transparent;
        }
        .tTb path {
          stroke: #ffffff;
          transition: transform 0.25s ease;
        }
        .tTb:not(.b) path {
          transform: none !important;
        }
      `}</style>

      {isOpen && (
        <div
          className="fCls"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="blogger-float-group">
        
        {/* Quick Edit / Admin Float Menu (.qeF) */}
        <div className={`qeF ${isOpen ? 'is-open' : ''}`}>
          <button
            type="button"
            className="qeT"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Hızlı İşlemler"
          >
            <svg className="line" viewBox="0 0 24 24">
              <g className="g1">
                <path
                  className="c"
                  d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                  strokeMiterlimit="10"
                />
                <path
                  d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z"
                  strokeMiterlimit="10"
                />
              </g>
              <g className="g2">
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
              </g>
            </svg>
          </button>

          <div className="qeL">
            {/* 1. Blog Ayarları -> Ayarlar */}
            <button
              type="button"
              title="Ayarlar & Tercihler"
              onClick={() => {
                setIsOpen(false);
                onOpenSettings();
              }}
            >
              <svg className="line" viewBox="0 0 24 24">
                <path d="M3 9.11011V14.8801C3 17.0001 3 17.0001 5 18.3501L10.5 21.5301C11.33 22.0101 12.68 22.0101 13.5 21.5301L19 18.3501C21 17.0001 21 17.0001 21 14.8901V9.11011C21 7.00011 21 7.00011 19 5.65011L13.5 2.47011C12.68 1.99011 11.33 1.99011 10.5 2.47011L5 5.65011C3 7.00011 3 7.00011 3 9.11011Z" />
                <path className="c" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
              </svg>
            </button>

            {/* 2. Yeni Link Ekle */}
            <button
              type="button"
              title="Yeni Link Ekle"
              onClick={() => {
                setIsOpen(false);
                onOpenNewLink();
              }}
            >
              <svg className="line" viewBox="0 0 24 24">
                <g transform="translate(3.500000, 3.500000)">
                  <line className="c" x1="9.8352" x2="16.2122" y1="16.0078" y2="16.0078" />
                  <path d="M12.5578,1.3589 L12.5578,1.3589 C11.2138,0.3509 9.3078,0.6229 8.2998,1.9659 C8.2998,1.9659 3.2868,8.6439 1.5478,10.9609 C-0.1912,13.2789 1.4538,16.1509 1.4538,16.1509 C1.4538,16.1509 4.6978,16.8969 6.4118,14.6119 C8.1268,12.3279 13.1638,5.6169 13.1638,5.6169 C14.1718,4.2739 13.9008,2.3669 12.5578,1.3589 Z" />
                  <line x1="7.0041" x2="11.8681" y1="3.7114" y2="7.3624" />
                </g>
              </svg>
            </button>

            {/* 3. Hızlı Arama */}
            <button
              type="button"
              title="Hızlı Arama"
              onClick={() => {
                setIsOpen(false);
                onOpenSearch();
              }}
            >
              <svg className="line" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <line className="c" x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* 4. Koleksiyonlar */}
            <button
              type="button"
              title="Koleksiyonlar"
              onClick={() => {
                setIsOpen(false);
                onOpenCollections();
              }}
            >
              <svg className="line" viewBox="0 0 24 24">
                <path d="M10.5 19.9V4.1C10.5 2.6 9.86 2 8.27 2H4.23C2.64 2 2 2.6 2 4.1V19.9C2 21.4 2.64 22 4.23 22H8.27C9.86 22 10.5 21.4 10.5 19.9Z" />
                <path className="c" d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z" />
                <path d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z" />
              </svg>
            </button>

            {/* 5. Verileri Yedekle & Dışa Aktar */}
            <button
              type="button"
              title="İçeriği Yedekle / Dışa Aktar"
              onClick={() => {
                setIsOpen(false);
                onOpenImportExport();
              }}
            >
              <svg className="line" viewBox="0 0 24 24">
                <polyline className="c" points="8 17 12 21 16 17" />
                <line className="c" x1="12" x2="12" y1="12" y2="21" />
                <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29" />
              </svg>
            </button>

            {/* 6. İstatistikler & Etiketler */}
            <button
              type="button"
              title="İstatistikler & Etiketler"
              onClick={() => {
                setIsOpen(false);
                if (onOpenTags) onOpenTags();
                else onOpenSearch();
              }}
            >
              <svg className="line" viewBox="0 0 24 24">
                <g transform="translate(2.300000, 2.300000)">
                  <line className="c" x1="5.18305279" x2="5.18305279" y1="7.960947" y2="14.6546312" />
                  <line className="c" x1="9.73684179" x2="9.73684179" y1="4.757368" y2="14.6552627" />
                  <line className="c" x1="14.2156838" x2="14.2156838" y1="11.498211" y2="14.6550531" />
                  <path d="M-3.55271368e-14,9.73684211 C-3.55271368e-14,2.43473684 2.43473684,2.13162821e-14 9.73684211,2.13162821e-14 C17.0389474,2.13162821e-14 19.4736842,2.43473684 19.4736842,9.73684211 C19.4736842,17.0389474 17.0389474,19.4736842 9.73684211,19.4736842 C2.43473684,19.4736842 -3.55271368e-14,17.0389474 -3.55271368e-14,9.73684211 Z" />
                </g>
              </svg>
            </button>

            {/* 7. Tüm Linkler Paneli */}
            <button
              type="button"
              title="Tüm Bağlantılar Paneli"
              onClick={() => {
                setIsOpen(false);
                if (onOpenAllLinks) onOpenAllLinks();
                else onOpenSearch();
              }}
            >
              <svg className="line" viewBox="0 0 24 24">
                <line x1="8" x2="21" y1="6" y2="6" />
                <line x1="8" x2="21" y1="12" y2="12" />
                <line x1="8" x2="21" y1="18" y2="18" />
                <line className="c" x1="3" x2="3.01" y1="6" y2="6" />
                <line className="c" x1="3" x2="3.01" y1="12" y2="12" />
                <line className="c" x1="3" x2="3.01" y1="18" y2="18" />
              </svg>
            </button>

            {/* 8. Hızlı JSON Yedek İndir */}
            <button
              type="button"
              title="Hızlı JSON Yedek İndir"
              onClick={() => {
                setIsOpen(false);
                handleQuickBackup();
              }}
            >
              <svg className="line" viewBox="0 0 24 24">
                <path className="c" d="M9 11V17L11 15" />
                <path className="c" d="M9 17L7 15" />
                <path d="M22 10V15C22 20 20 22 15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H14" />
                <path d="M22 10H18C15 10 14 9 14 6V2L22 10Z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll to Top / Bottom (.tTb) */}
        <button
          type="button"
          className={`tTb ${!isScrolled ? 'b' : ''}`}
          onClick={handleScrollToggle}
          aria-label={!isScrolled ? 'Sayfa Sonuna İn' : 'Sayfa Başına Çık'}
          title={!isScrolled ? 'Aşağı İn' : 'Yukarı Çık'}
          style={{ '--progress': progress } as React.CSSProperties}
        >
          <svg viewBox="0 0 34 34">
            <g transform="translate(0, 34) rotate(-90)" strokeWidth="2.2" stroke="currentColor" strokeLinecap="round">
              <circle cx="17" cy="17" r="15.92" />
              <circle
                cx="17"
                cy="17"
                r="15.92"
                fill="none"
                strokeDasharray="100, 100"
                style={{ strokeDashoffset: `calc(100 - ${progress})` }}
              />
              <path
                transform="translate(34, 34) rotate(180)"
                d="M15.07,21.06,19.16,17l-4.09-4.06"
                fill="none"
                strokeWidth="1.25"
              />
            </g>
          </svg>
        </button>

      </div>
    </>
  );
};
