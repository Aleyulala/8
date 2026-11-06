import React from 'react';
import { Home, Link as LinkIcon, Folder, Hash, Settings as SettingsIcon } from 'lucide-react';

interface MobileNavBarProps {
  currentTab: 'dashboard' | 'links' | 'collections' | 'tags' | 'settings';
  onSelectTab: (tab: 'dashboard' | 'links' | 'collections' | 'tags' | 'settings') => void;
}

export const MobileNavBar: React.FC<MobileNavBarProps> = ({
  currentTab,
  onSelectTab
}) => {
  const items = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
    { id: 'links' as const, label: 'Links', icon: LinkIcon },
    { id: 'collections' as const, label: 'Collections', icon: Folder },
    { id: 'tags' as const, label: 'Tags', icon: Hash },
    { id: 'settings' as const, label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#1b1b1b]/95 backdrop-blur-md border-t border-[#2e2e2e] py-2 px-3 md:hidden">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const active = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all duration-150 ${
                active 
                  ? 'text-[#38bdf8] scale-105 font-bold' 
                  : 'text-[#8e8e8e] hover:text-white font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
