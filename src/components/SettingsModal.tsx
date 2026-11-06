import React, { useState } from 'react';
import { 
  X, 
  Settings as SettingsIcon, 
  Shield, 
  HardDrive, 
  Trash2, 
  RefreshCw, 
  Globe, 
  FileText, 
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  Copy,
  Check
} from 'lucide-react';
import { resetDatabase } from '../db';

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

  if (!isOpen) return null;

  const handleCopyBookmarklet = () => {
    navigator.clipboard.writeText(bookmarkletCode);
    setCopiedBookmarklet(true);
    setTimeout(() => setCopiedBookmarklet(false), 2000);
  };

  const handleReset = async () => {
    try {
      setIsResetting(true);
      await resetDatabase();
      setMessage('Database reset and seed data reloaded.');
      setConfirmReset(false);
      onRefreshData();
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="w-full max-w-xl bg-[#212121] rounded-2xl shadow-2xl border border-[#3e3e3e] overflow-hidden my-8 text-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333333]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#38bdf8]/15 text-[#38bdf8] flex items-center justify-center">
              <SettingsIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Settings & License
              </h2>
              <p className="text-xs text-[#8e8e8e]">
                Application info, IndexedDB storage, and GPL-3.0 details
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#333333] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {message && (
            <div className="p-3 rounded-xl bg-emerald-950/40 text-emerald-300 text-xs font-medium border border-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {/* About Card */}
          <div className="p-4 rounded-xl bg-[#171717] border border-[#383838] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                saved v1.0.0
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#38bdf8]/15 text-[#7dd3fc] border border-[#38bdf8]/30">
                  GPL-3.0
                </span>
              </span>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> 100% Client-Side
              </span>
            </div>
            <p className="text-xs text-[#8e8e8e] leading-relaxed">
              <strong>Saved</strong> is a zero-login, privacy-first, local Linkwarden alternative running entirely in the browser using IndexedDB, deployable to GitHub Pages with zero server dependencies.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-[#171717] border border-[#383838] text-center">
              <div className="text-xl font-bold text-[#38bdf8] font-mono">{totalLinks}</div>
              <div className="text-[11px] font-medium text-neutral-400">Links</div>
            </div>
            <div className="p-3 rounded-xl bg-[#171717] border border-[#383838] text-center">
              <div className="text-xl font-bold text-emerald-400 font-mono">{totalCollections}</div>
              <div className="text-[11px] font-medium text-neutral-400">Collections</div>
            </div>
            <div className="p-3 rounded-xl bg-[#171717] border border-[#383838] text-center">
              <div className="text-xl font-bold text-purple-400 font-mono">{totalTags}</div>
              <div className="text-[11px] font-medium text-neutral-400">Tags</div>
            </div>
          </div>

          {/* Storage Bar */}
          <div className="p-4 rounded-xl bg-[#171717] border border-[#383838] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-300">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-[#38bdf8]" />
                IndexedDB Storage
              </span>
              <span className="font-mono text-neutral-400">{storageInfo.formattedUsed} / {storageInfo.formattedQuota}</span>
            </div>
            <div className="w-full bg-[#262626] rounded-full h-2 overflow-hidden">
              <div 
                className="bg-[#38bdf8] h-2 rounded-full transition-all"
                style={{ width: `${Math.max(1, Math.min(100, storageInfo.percentage))}%` }}
              />
            </div>
          </div>

          {/* Bookmarklet */}
          <div className="p-4 rounded-xl bg-[#171717] border border-[#383838] space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] flex items-center gap-1.5">
              <Bookmark className="w-4 h-4" />
              Quick Save Bookmarklet
            </div>
            <p className="text-xs text-[#8e8e8e] leading-relaxed">
              Drag this button to your browser's Bookmarks Bar. When browsing any site, click it to automatically open Saved with the page title and URL pre-filled:
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href={bookmarkletCode}
                onClick={(e) => e.preventDefault()}
                draggable
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#7dd3fc] hover:bg-[#38bdf8] text-[#0f172a] text-xs font-bold shadow-xs cursor-grab active:cursor-grabbing transition-transform hover:scale-105"
                title="Drag to your bookmarks bar"
              >
                <span>📌 Save to Saved</span>
              </a>

              <button
                type="button"
                onClick={handleCopyBookmarklet}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#262626] border border-[#404040] text-xs font-medium text-neutral-300 hover:text-white transition-colors"
              >
                {copiedBookmarklet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBookmarklet ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
          </div>

          {/* GPL 3.0 License */}
          <div className="p-4 rounded-xl bg-[#171717] border border-[#383838] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-purple-400" />
                License: GNU GPL v3.0
              </span>
              <button
                onClick={() => setShowLicense(!showLicense)}
                className="text-xs font-semibold text-[#38bdf8] hover:underline"
              >
                {showLicense ? 'Hide' : 'View License'}
              </button>
            </div>
            <p className="text-xs text-[#8e8e8e] leading-relaxed">
              Saved is free software licensed under the terms of the GNU General Public License v3.0 (GPL-3.0).
            </p>

            {showLicense && (
              <div className="mt-3 p-3 bg-[#111111] rounded-lg border border-[#333333] max-h-48 overflow-y-auto text-[11px] font-mono text-neutral-400 whitespace-pre-wrap">
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

          {/* Reset Database */}
          <div className="pt-2 border-t border-[#333333]">
            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="text-xs font-medium text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Database & Reload Linkwarden Sample Data</span>
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/50 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  Are you sure?
                </div>
                <p className="text-xs text-rose-300/80">
                  All local data will be replaced with fresh Linkwarden sample collections and links.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={isResetting}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs"
                  >
                    {isResetting ? 'Resetting...' : 'Yes, Reset'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="px-3 py-1.5 rounded-lg text-neutral-400 text-xs font-medium hover:bg-[#262626]"
                  >
                    Cancel
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
