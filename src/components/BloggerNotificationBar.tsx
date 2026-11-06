import React, { useState } from 'react';
import { X } from 'lucide-react';

export const BloggerNotificationBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const notifications = [
    'SAVED: Tüm yer imleriniz, kategorileriniz ve etiketleriniz Local-First olarak tarayıcınızda saklanmaktadır.',
    'Local-First mimarisiyle 352 bağlantı çevrimdışı belleğinizde tam gizlilikle çalışır.'
  ];

  if (!isVisible) return null;

  return (
    <div className="w-full mb-4">
      <div className="flex items-center justify-between gap-3 px-3.5 py-2 rounded-xl bg-[#252526] border border-transparent shadow-sm select-none">
        
        {/* Sol Kapat Butonu */}
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 rounded-md text-[#9ca3af] hover:text-white hover:bg-[#333333] transition-colors shrink-0"
          title="Bildirimi Gizle"
          aria-label="Kapat"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Bildiri Metni */}
        <p className="flex-1 text-xs text-[#d4d4d4] truncate leading-normal">
          {notifications[activeSlide]}
        </p>

        {/* Sağ Çizgi Butonlar (.car-nav) */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setActiveSlide(0)}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              activeSlide === 0
                ? 'w-6 bg-[#60cdff] shadow-[0_0_6px_rgba(96,205,255,0.6)]'
                : 'w-4 bg-white/20 hover:bg-white/40'
            }`}
            title="Slayt 1"
          />
          <button
            onClick={() => setActiveSlide(1)}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              activeSlide === 1
                ? 'w-6 bg-[#60cdff] shadow-[0_0_6px_rgba(96,205,255,0.6)]'
                : 'w-4 bg-white/20 hover:bg-white/40'
            }`}
            title="Slayt 2"
          />
        </div>

      </div>
    </div>
  );
};
