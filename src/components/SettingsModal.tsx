import React, { useState } from 'react';
import { 
  X, 
  Settings as SettingsIcon, 
  Shield, 
  HardDrive, 
  Trash2, 
  RefreshCw, 
  Globe, 
  ExternalLink, 
  FileText, 
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  Copy,
  Check
} from 'lucide-react';
import { initializeDatabase, resetDatabase } from '../db';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  storageInfo: {
    formattedUsed: string;
    formattedQuota: string;
    percentage: number;
  };
  totalLinks: number;
  totalCollections: number;
  totalTags: number;
  onRefreshData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  storageInfo,
  totalLinks,
  totalCollections,
  totalTags,
  onRefreshData
}) => {
  const [showLicense, setShowLicense] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [copiedBookmarklet, setCopiedBookmarklet] = useState(false);

  const bookmarkletCode = `javascript:(function(){var u=encodeURIComponent(window.location.href);var t=encodeURIComponent(document.title);window.open('https://aleyulala.github.io/x/?url='+u+'&title='+t,'_blank');})();`;

  const handleCopyBookmarklet = () => {
    navigator.clipboard.writeText(bookmarkletCode);
    setCopiedBookmarklet(true);
    setTimeout(() => setCopiedBookmarklet(false), 2000);
  };

  if (!isOpen) return null;

  const handleReset = async () => {
    try {
      setIsResetting(true);
      await resetDatabase();
      setMessage('Veritabanı sıfırlandı ve örnek veriler yüklendi.');
      setConfirmReset(false);
      onRefreshData();
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <SettingsIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Ayarlar & Lisans
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Uygulama bilgileri, depolama ve lisans detayları
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {message && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {/* Proje Hakkında */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                saved v1.0.0
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  GPL-3.0
                </span>
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> %100 İstemci Taraflı
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Saved</strong>, açık kaynaklı Linkwarden projesinden esinlenilmiş, sunucu veya kimlik doğrulama gerektirmeyen, doğrudan tarayıcının IndexedDB hafızasında çalışan ve GitHub Pages üzerinde sıfır maliyetle barındırılabilen modern bir yer imi ve bağlantı yöneticisidir.
            </p>
          </div>

          {/* İstatistikler */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-center">
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{totalLinks}</div>
              <div className="text-[11px] font-medium text-slate-500">Bağlantı</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-center">
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{totalCollections}</div>
              <div className="text-[11px] font-medium text-slate-500">Koleksiyon</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-center">
              <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{totalTags}</div>
              <div className="text-[11px] font-medium text-slate-500">Etiket</div>
            </div>
          </div>

          {/* Tarayıcı Depolama Durumu */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-blue-500" />
                IndexedDB Depolama Alanı
              </span>
              <span>{storageInfo.formattedUsed} / {storageInfo.formattedQuota}</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.max(1, Math.min(100, storageInfo.percentage))}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Verileriniz cihazınızın yerel IndexedDB hafızasında saklanır. İçe ve Dışa Aktar menüsünden istediğiniz zaman yedek alabilirsiniz.
            </p>
          </div>

          {/* GPL 3.0 Lisans Bölümü */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-500" />
                Açık Kaynak Lisansı: GNU GPL v3.0
              </span>
              <button
                onClick={() => setShowLicense(!showLicense)}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {showLicense ? 'Gizle' : 'Lisansı İncele'}
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Bu yazılım özgür bir yazılımdır; Free Software Foundation tarafından yayımlanan GNU Genel Kamu Lisansı sürüm 3.0 (GPL-3.0) şartları altında yeniden dağıtabilir ve/veya değiştirebilirsiniz.
            </p>

            {showLicense && (
              <div className="mt-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 max-h-48 overflow-y-auto text-[11px] font-mono text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
{`GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
Everyone is permitted to copy and distribute verbatim copies
of this license document, but changing it is not allowed.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.`}
              </div>
            )}
          </div>

          {/* Hızlı Kaydetme Yer İmi (Bookmarklet) */}
          <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
              <Bookmark className="w-4 h-4" />
              Tek Tıkla Kaydet (Tarayıcı Yer İmi / Bookmarklet)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              İnternette gezinirken herhangi bir makaleyi veya web sitesini anında Saved'a kaydetmek için aşağıdaki butonu tarayıcınızın yer imleri çubuğuna sürükleyip bırakın:
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={bookmarkletCode}
                onClick={(e) => e.preventDefault()}
                draggable
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs cursor-grab active:cursor-grabbing transition-transform hover:scale-105"
                title="Bu butonu tarayıcınızın Yer İmleri (Bookmarks) çubuğuna sürükleyin"
              >
                <span>📌 Saved'a Kaydet</span>
              </a>

              <button
                type="button"
                onClick={handleCopyBookmarklet}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 transition-colors"
              >
                {copiedBookmarklet ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBookmarklet ? 'Kod Kopyalandı' : 'Kodu Kopyala'}</span>
              </button>
            </div>
          </div>

          {/* GitHub Pages Dağıtım Bilgisi */}
          <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
              <Globe className="w-4 h-4" />
              GitHub Pages Desteği
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Bu proje Vite ile göreceli yollar (`base: './'`) kullanılarak derlenir. Deponuzu GitHub'a yükleyip <strong>GitHub Actions</strong> veya <strong>Pages</strong> ayarlarından tek tıkla canlıya alabilirsiniz.
            </p>
          </div>

          {/* Veritabanını Sıfırlama */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Veritabanını Sıfırla ve Varsayılanları Yükle</span>
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-300">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  Emin misiniz?
                </div>
                <p className="text-xs text-rose-600 dark:text-rose-400">
                  Tüm yerel bağlantılarınız ve koleksiyonlarınız silinecek ve başlangıç örnek verileri yüklenecektir.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={isResetting}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
                  >
                    {isResetting ? 'Sıfırlanıyor...' : 'Evet, Sıfırla'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-400 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-800"
                  >
                    Vazgeç
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
