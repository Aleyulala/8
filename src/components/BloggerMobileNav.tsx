import React from 'react';
import { 
  HomeIcon, 
  SearchNormalIcon, 
  MenuHamburgerIcon, 
  FolderFavoriteIcon, 
  ArrowUp4Icon 
} from './BloggerIcons';

interface BloggerMobileNavProps {
  currentTab: 'dashboard' | 'links' | 'pinned' | 'collection' | 'tag' | 'trash';
  onSelectTab: (tab: 'dashboard' | 'links' | 'pinned') => void;
  onOpenDrawer: () => void;
  onOpenSearch: () => void;
}

export const BloggerMobileNav: React.FC<BloggerMobileNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenDrawer,
  onOpenSearch
}) => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    {
      id: 'dashboard',
      label: 'Ana Sayfa',
      icon: HomeIcon,
      isActive: currentTab === 'dashboard',
      onClick: () => onSelectTab('dashboard')
    },
    {
      id: 'search',
      label: 'Ara',
      icon: SearchNormalIcon,
      isActive: false,
      onClick: onOpenSearch
    },
    {
      id: 'menu',
      label: 'Menü',
      icon: MenuHamburgerIcon,
      isActive: false,
      onClick: onOpenDrawer,
      isSpecial: true
    },
    {
      id: 'pinned',
      label: 'Sabitler',
      icon: FolderFavoriteIcon,
      isActive: currentTab === 'pinned',
      onClick: () => onSelectTab('pinned')
    },
    {
      id: 'top',
      label: 'Yukarı',
      icon: ArrowUp4Icon,
      isActive: false,
      onClick: handleScrollTop
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 select-none pb-safe">
      {/* Blogger .mobC container */}
      <div className="relative mx-auto max-w-lg bg-[#18181b]/95 backdrop-blur-2xl border-t border-[#333333]/90 shadow-[0_-12px_35px_rgba(0,0,0,0.6)] rounded-t-2xl px-2 py-1.5 transition-all duration-200">
        <ul className="flex items-center justify-around h-12 m-0 p-0 list-none">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <li 
                key={item.id} 
                className="flex items-center justify-center flex-1"
              >
                <button
                  onClick={item.onClick}
                  aria-label={item.label}
                  title={item.label}
                  className={`group relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 active:scale-95 ${
                    item.isActive
                      ? 'bg-[#38bdf8]/15 text-[#38bdf8] font-bold shadow-inner'
                      : item.isSpecial
                        ? 'text-white hover:text-[#38bdf8] hover:bg-[#27272a]'
                        : 'text-[#a1a1aa] hover:text-white hover:bg-[#27272a]'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 transition-transform duration-150 ${
                    item.isActive ? 'stroke-[2.5] scale-110' : 'stroke-[1.8] group-hover:scale-110'
                  }`} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
