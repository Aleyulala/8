import React, { useState, useEffect, useRef } from 'react';

export interface MediaItem {
  type: 'image' | 'youtube' | 'shorts' | 'video';
  url: string;
  title?: string;
  author?: string;
}

interface UniversalMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MediaItem[];
  initialIndex?: number;
}

export const UniversalMediaModal: React.FC<UniversalMediaModalProps> = ({
  isOpen,
  onClose,
  items,
  initialIndex = 0
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isWidescreen, setIsWidescreen] = useState(false);
  const [panPos, setPanPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const didDragRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(Math.max(0, Math.min(initialIndex, items.length - 1)));
      setIsZoomed(false);
      setIsWidescreen(false);
      setPanPos({ x: 0, y: 0 });
      didDragRef.current = false;
    }
  }, [isOpen, initialIndex, items]);

  const currentItem = items[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
        return;
      }
      if (e.key === 'z' || e.key === 'Z') {
        e.preventDefault();
        setIsZoomed(prev => !prev);
        setPanPos({ x: 0, y: 0 });
        return;
      }
      if (e.key === 'w' || e.key === 'W' || e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        setIsWidescreen(prev => !prev);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, items.length, currentIndex]);

  if (!isOpen || !currentItem) return null;

  const handlePrev = () => {
    if (items.length <= 1) return;
    setIsZoomed(false);
    setIsWidescreen(false);
    setPanPos({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    if (items.length <= 1) return;
    setIsZoomed(false);
    setIsWidescreen(false);
    setPanPos({ x: 0, y: 0 });
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    setIsDragging(true);
    didDragRef.current = false;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: panPos.x,
      posY: panPos.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isZoomed) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      didDragRef.current = true;
    }
    setPanPos({
      x: dragStartRef.current.posX + dx,
      y: dragStartRef.current.posY + dy
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleToggleZoom = () => {
    setIsZoomed((prev) => !prev);
    setPanPos({ x: 0, y: 0 });
  };

  // YouTube embed url formatter
  const getEmbedUrl = (url: string) => {
    try {
      if (url.includes('youtube.com/embed/')) return url;
      if (url.includes('youtube.com/shorts/')) {
        const id = url.split('/shorts/')[1]?.split(/[?#&]/)[0];
        return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      }
      if (url.includes('watch?v=')) {
        const id = new URL(url).searchParams.get('v');
        return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      }
      if (url.includes('youtu.be/')) {
        const id = url.split('youtu.be/')[1]?.split(/[?#&]/)[0];
        return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      }
    } catch {
      // ignore
    }
    return url;
  };

  const isVideo = currentItem.type === 'youtube' || currentItem.type === 'shorts' || currentItem.type === 'video';
  const isShorts = currentItem.type === 'shorts';

  return (
    <div
      id="fsMediaModal"
      className="fsShow select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Blogger Medya ve Video Vitrini"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Kapat Butonu (.fsClose) */}
      <button
        type="button"
        className="fsClose"
        onClick={onClose}
        title="Kapat (Esc)"
        aria-label="Kapat"
      >
        &times;
      </button>

      {/* Zoom / Widescreen Butonu (.fsWideBtn / .fsZoomBtn) */}
      {!isVideo ? (
        <button
          type="button"
          className={`fsWideBtn fsZoomBtn ${isZoomed ? 'active' : ''}`}
          onClick={() => {
            setIsZoomed(prev => !prev);
            setPanPos({ x: 0, y: 0 });
          }}
          title={isZoomed ? 'Küçült / Normal Boyut (Z)' : 'Büyüt / Yakınlaştır (Z)'}
          aria-label="Yakınlaştırma Kontrolü"
        >
          {isZoomed ? (
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          )}
        </button>
      ) : (
        <button
          type="button"
          className={`fsWideBtn ${isWidescreen ? 'active' : ''}`}
          onClick={() => setIsWidescreen(prev => !prev)}
          title={isWidescreen ? 'Standart Boyut (W / F)' : 'Geniş Ekran (W / F)'}
          aria-label="Geniş Ekran Modu"
        >
          <svg viewBox="0 0 24 24">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </button>
      )}

      {/* Sol Ok Butonu (.fsNavBtn.fsPrev) */}
      {items.length > 1 && (
        <button
          type="button"
          className="fsNavBtn fsPrev"
          onClick={handlePrev}
          title="Önceki Medya (Sol Ok)"
          aria-label="Önceki"
        >
          ‹
        </button>
      )}

      {/* Sağ Ok Butonu (.fsNavBtn.fsNext) */}
      {items.length > 1 && (
        <button
          type="button"
          className="fsNavBtn fsNext"
          onClick={handleNext}
          title="Sonraki Medya (Sağ Ok)"
          aria-label="Sonraki"
        >
          ›
        </button>
      )}

      {/* Sayaç Rozeti (.fsCounter) */}
      {items.length > 1 && (
        <div className="fsCounter">
          {currentIndex + 1} / {items.length} {currentItem.title ? `• ${currentItem.title}` : ''}
        </div>
      )}

      {/* Medya İçerik Konteyneri (.fsModalContent) */}
      <div 
        className="fsModalContent"
        onClick={(e) => e.stopPropagation()}
      >
        {currentItem.type === 'image' && (
          <img
            src={currentItem.url}
            alt={currentItem.title || 'Blogger Görsel'}
            className={`fsImg ${isZoomed ? 'is-zoomed' : ''}`}
            style={
              isZoomed
                ? {
                    transform: `scale(1.85) translate(${panPos.x / 1.85}px, ${panPos.y / 1.85}px)`,
                    cursor: isDragging ? 'grabbing' : 'grab'
                  }
                : { cursor: 'zoom-in' }
            }
            onMouseDown={handleMouseDown}
            onClick={(e) => {
              e.stopPropagation();
              if (didDragRef.current) {
                didDragRef.current = false;
                return;
              }
              handleToggleZoom();
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              handleToggleZoom();
            }}
            onWheel={(e) => {
              if (e.deltaY < 0 && !isZoomed) {
                handleToggleZoom();
              } else if (e.deltaY > 0 && isZoomed) {
                handleToggleZoom();
              }
            }}
            draggable={false}
          />
        )}

        {(currentItem.type === 'youtube' || currentItem.type === 'shorts') && (
          <div
            className={`fsVideoWrapper ${
              isShorts && !isWidescreen ? 'is-shorts' : 'is-standard'
            } ${isWidescreen ? 'is-widescreen' : ''}`}
          >
            <iframe
              src={getEmbedUrl(currentItem.url)}
              title={currentItem.title || 'Blogger Video Player'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}

        {currentItem.type === 'video' && (
          <div
            className={`fsVideoWrapper is-standard ${
              isWidescreen ? 'is-widescreen' : ''
            }`}
          >
            <video
              src={currentItem.url}
              controls
              autoPlay
              playsInline
            />
          </div>
        )}
      </div>
    </div>
  );
};
