import React, { useState, useEffect, useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, initializeDatabase } from './db';
import { CollectionItem, LinkItem, SortOption, ViewMode } from './types';
import { BloggerHeader } from './components/BloggerHeader';
import { BloggerSidebar } from './components/BloggerSidebar';
import { BloggerRightSidebar } from './components/BloggerRightSidebar';
import { BloggerMobileNav } from './components/BloggerMobileNav';
import { BloggerDrawer } from './components/BloggerDrawer';
import { FloatingMenu } from './components/FloatingMenu';
import { SearchOverlayModal } from './components/SearchOverlayModal';
import { DashboardView } from './components/DashboardView';
import { LinksView } from './components/LinksView';
import { CollectionsView } from './components/CollectionsView';
import { TagsView } from './components/TagsView';
import { AddEditLinkModal } from './components/AddEditLinkModal';
import { ManageCollectionsModal } from './components/ManageCollectionsModal';
import { ManageTagsModal } from './components/ManageTagsModal';
import { LinkDetailModal } from './components/LinkDetailModal';
import { ImportExportModal } from './components/ImportExportModal';
import { SettingsModal } from './components/SettingsModal';
import { BloggerFooter } from './components/BloggerFooter';
import { BloggerPostView } from './components/BloggerPostView';
import { BloggerPrivacyView } from './components/BloggerPrivacyView';
import { UniversalMediaModal, MediaItem } from './components/UniversalMediaModal';
import { getStorageUsage } from './utils/exportImport';
import { getDomain } from './utils/favicon';
import { initTvNavigation } from './utils/tvNavigation';
import { Search, Plus, Home, Bookmark, Moon, Sun, FileUp, Menu } from 'lucide-react';

type MainViewType = 
  | 'dashboard' 
  | 'links' 
  | 'pinned' 
  | 'collection' 
  | 'tag' 
  | 'collections_list' 
  | 'tags_list' 
  | 'trash'
  | 'post_detail'
  | 'privacy';

export const App: React.FC = () => {
  // Navigation View State (URL Query ?view=privacy ve Hash #privacy Desteğiyle Başlat)
  const [activeView, setActiveView] = useState<MainViewType>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view') || params.get('tab') || params.get('page');
      const hash = window.location.hash.replace(/^#/, '').toLowerCase();

      if (viewParam === 'privacy' || hash === 'privacy' || hash === 'politikalar') {
        return 'privacy';
      }
      if (viewParam === 'links' || hash === 'links') return 'links';
      if (viewParam === 'pinned' || hash === 'pinned') return 'pinned';
      if (viewParam === 'collections' || viewParam === 'collections_list' || hash === 'collections') return 'collections_list';
      if (viewParam === 'tags' || viewParam === 'tags_list' || hash === 'tags') return 'tags_list';
      if (viewParam === 'trash' || hash === 'trash') return 'trash';
    } catch {
      // ignore
    }
    return 'dashboard';
  });
  const [selectedPost, setSelectedPost] = useState<LinkItem | null>(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Universal Media Modal State (#fsMediaModal)
  const [mediaModal, setMediaModal] = useState<{
    isOpen: boolean;
    items: MediaItem[];
    initialIndex: number;
  }>({
    isOpen: false,
    items: [],
    initialIndex: 0
  });

  const handleOpenMedia = (items: MediaItem[], initialIndex = 0) => {
    setMediaModal({
      isOpen: true,
      items,
      initialIndex
    });
  };

  // Search, View & Sort States
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('date_desc');

  // Storage estimation
  const [storageInfo, setStorageInfo] = useState({
    formattedUsed: '...',
    formattedQuota: '...',
    percentage: 0
  });

  // Modals, Drawer & Sidebar (Sol çekmece başlangıçta kapalı!)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [detailLink, setDetailLink] = useState<LinkItem | null>(null);
  const [isCollectionsModalOpen, setIsCollectionsModalOpen] = useState(false);
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOverlayOpen, setIsSearchOverlayOpen] = useState(false);

  // Global Keyboard Shortcuts (Ctrl+K, /, Ctrl+F for Search Overlay)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K' || e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        setIsSearchOverlayOpen(prev => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsSearchOverlayOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Initialize DB on start & check Bookmarklet query params
  useEffect(() => {
    initializeDatabase();
    const cleanupTv = initTvNavigation();

    const params = new URLSearchParams(window.location.search);
    const addUrl = params.get('add_url') || params.get('url');
    if (addUrl) {
      const addTitle = params.get('add_title') || params.get('title') || '';
      const addDesc = params.get('add_desc') || params.get('desc') || '';
      setEditingLink({
        url: addUrl,
        title: addTitle,
        description: addDesc,
        collectionId: null,
        tags: [],
        isPinned: false,
        isArchived: false,
        isRead: false,
        isTrash: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      setIsAddModalOpen(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    return () => {
      cleanupTv();
    };
  }, []);

  const updateStorage = async () => {
    const stats = await getStorageUsage();
    const pct = stats.quotaBytes > 0 ? (stats.usedBytes / stats.quotaBytes) * 100 : 0;
    setStorageInfo({
      formattedUsed: stats.formattedUsed,
      formattedQuota: stats.formattedQuota,
      percentage: pct
    });
  };

  useEffect(() => {
    updateStorage();
  }, []);

  // URL Query & Hash Değişikliklerini Dinle (Blogger Deep-Linking & Browser History)
  useEffect(() => {
    const handleUrlChange = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const viewParam = params.get('view') || params.get('tab') || params.get('page');
        const hash = window.location.hash.replace(/^#/, '').toLowerCase();

        if (viewParam === 'privacy' || hash === 'privacy' || hash === 'politikalar') {
          setActiveView('privacy');
        } else if (viewParam === 'links' || hash === 'links') {
          setActiveView('links');
        } else if (viewParam === 'pinned' || hash === 'pinned') {
          setActiveView('pinned');
        } else if (viewParam === 'collections' || viewParam === 'collections_list' || hash === 'collections') {
          setActiveView('collections_list');
        } else if (viewParam === 'tags' || viewParam === 'tags_list' || hash === 'tags') {
          setActiveView('tags_list');
        } else if (viewParam === 'trash' || hash === 'trash') {
          setActiveView('trash');
        } else if (!viewParam && !hash) {
          setActiveView('dashboard');
        }
      } catch {
        // ignore
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // activeView Değiştiğinde URL Query Parametresini Güncelle (?view=privacy vb.)
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (activeView === 'privacy') {
        if (url.searchParams.get('view') !== 'privacy') {
          url.searchParams.set('view', 'privacy');
          window.history.replaceState({}, '', url.toString());
        }
      } else if (activeView === 'dashboard') {
        if (url.searchParams.has('view') || url.searchParams.has('tab') || url.searchParams.has('page')) {
          url.searchParams.delete('view');
          url.searchParams.delete('tab');
          url.searchParams.delete('page');
          const cleanPath = url.pathname + (url.search ? url.search : '') + (url.hash ? url.hash : '');
          window.history.replaceState({}, '', cleanPath);
        }
      } else if (['links', 'pinned', 'collections_list', 'tags_list', 'trash'].includes(activeView)) {
        if (url.searchParams.get('view') !== activeView) {
          url.searchParams.set('view', activeView);
          window.history.replaceState({}, '', url.toString());
        }
      }
    } catch {
      // ignore
    }
  }, [activeView]);

  // Reactive IndexedDB data via Dexie
  const allLinks = useLiveQuery(() => db.links.toArray(), []) || [];
  const collections = useLiveQuery(() => db.collections.toArray(), []) || [];
  const tags = useLiveQuery(() => db.tags.toArray(), []) || [];

  // Map collections for O(1) lookups
  const collectionMap = useMemo(() => {
    const map = new Map<number, CollectionItem>();
    collections.forEach((c) => {
      if (c.id) map.set(c.id, c);
    });
    return map;
  }, [collections]);

  // Realtime counters
  const counts = useMemo(() => {
    let all = 0;
    let pinned = 0;
    let trash = 0;
    const colCounts: Record<number, number> = {};
    const tagCounts: Record<string, number> = {};

    allLinks.forEach((link) => {
      if (link.isTrash) {
        trash++;
        return;
      }
      all++;
      if (link.isPinned) pinned++;

      if (link.collectionId) {
        colCounts[link.collectionId] = (colCounts[link.collectionId] || 0) + 1;
      }

      if (link.tags) {
        link.tags.forEach((t) => {
          tagCounts[t] = (tagCounts[t] || 0) + 1;
        });
      }
    });

    return {
      all,
      pinned,
      trash,
      collections: colCounts,
      tags: tagCounts
    };
  }, [allLinks]);

  // Filtered links for current view
  const currentViewLinks = useMemo(() => {
    let items = allLinks.filter((link) => {
      if (activeView === 'trash') return link.isTrash;
      if (link.isTrash) return false;

      switch (activeView) {
        case 'pinned':
          return link.isPinned;
        case 'collection':
          return link.collectionId === selectedCollectionId;
        case 'tag':
          return link.tags && selectedTag && link.tags.includes(selectedTag);
        case 'links':
        default:
          return true;
      }
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter((link) => {
        return (
          link.title?.toLowerCase().includes(q) ||
          link.url.toLowerCase().includes(q) ||
          link.description?.toLowerCase().includes(q) ||
          link.notes?.toLowerCase().includes(q) ||
          (link.tags && link.tags.some((t) => t.toLowerCase().includes(q)))
        );
      });
    }

    return items.sort((a, b) => {
      switch (sortBy) {
        case 'date_asc':
          return a.createdAt - b.createdAt;
        case 'title_asc':
          return (a.title || a.url).localeCompare(b.title || b.url);
        case 'title_desc':
          return (b.title || b.url).localeCompare(a.title || a.url);
        case 'domain':
          return getDomain(a.url).localeCompare(getDomain(b.url));
        case 'date_desc':
        default:
          return b.createdAt - a.createdAt;
      }
    });
  }, [allLinks, activeView, selectedCollectionId, selectedTag, searchQuery, sortBy]);

  // Actions
  const handleSaveLink = async (data: Partial<LinkItem>) => {
    if (editingLink && editingLink.id) {
      await db.links.update(editingLink.id, {
        ...data,
        updatedAt: Date.now()
      });
    } else {
      await db.links.add({
        url: data.url!,
        title: data.title || data.url!,
        description: data.description || '',
        collectionId: data.collectionId ?? null,
        tags: data.tags || [],
        notes: data.notes || '',
        isPinned: data.isPinned || false,
        isRead: data.isRead || false,
        isArchived: data.isArchived || false,
        isTrash: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });

      if (data.tags) {
        for (const t of data.tags) {
          const exists = await db.tags.where('name').equalsIgnoreCase(t).first();
          if (!exists) {
            await db.tags.add({ name: t.toLowerCase() });
          }
        }
      }
    }
    updateStorage();
  };

  const handleOpenPostPage = (link: LinkItem) => {
    setSelectedPost(link);
    setActiveView('post_detail');
    if (window.innerWidth < 768) {
      setIsDrawerOpen(true);
    } else {
      setIsSidebarOpen(true);
    }
    document.getElementById('mainScrollContainer')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTogglePin = async (id: number, current: boolean) => {
    await db.links.update(id, { isPinned: !current, updatedAt: Date.now() });
  };

  const handleToggleRead = async (id: number, current: boolean) => {
    await db.links.update(id, { isRead: !current, updatedAt: Date.now() });
  };

  const handleToggleArchive = async (id: number, current: boolean) => {
    await db.links.update(id, { isArchived: !current, updatedAt: Date.now() });
  };

  const handleMoveToTrash = async (id: number) => {
    await db.links.update(id, { isTrash: true, updatedAt: Date.now() });
    updateStorage();
  };

  const handleRestoreFromTrash = async (id: number) => {
    await db.links.update(id, { isTrash: false, updatedAt: Date.now() });
    updateStorage();
  };

  const handlePermanentDelete = async (id: number) => {
    await db.links.delete(id);
    updateStorage();
  };

  const handleEmptyTrash = async () => {
    await db.links.filter((l) => l.isTrash).delete();
    updateStorage();
  };

  const handleUpdateNotes = async (id: number, notes: string) => {
    await db.links.update(id, { notes, updatedAt: Date.now() });
    if (detailLink && detailLink.id === id) {
      setDetailLink({ ...detailLink, notes });
    }
  };

  const handleAddCollection = async (data: { name: string; description?: string; color: string }) => {
    await db.collections.add({
      name: data.name,
      description: data.description,
      color: data.color,
      createdAt: Date.now()
    });
  };

  const handleUpdateCollection = async (id: number, data: { name: string; description?: string; color: string }) => {
    await db.collections.update(id, data);
  };

  const handleDeleteCollection = async (id: number) => {
    await db.links.where('collectionId').equals(id).modify({ collectionId: null });
    await db.collections.delete(id);
  };

  const handleAddTag = async (name: string) => {
    const exists = await db.tags.where('name').equalsIgnoreCase(name).first();
    if (!exists) {
      await db.tags.add({ name });
    }
  };

  const handleDeleteTag = async (name: string) => {
    await db.tags.where('name').equalsIgnoreCase(name).delete();
    const linksWithTag = await db.links.where('tags').equals(name).toArray();
    for (const l of linksWithTag) {
      if (l.id) {
        await db.links.update(l.id, {
          tags: l.tags.filter((t) => t.toLowerCase() !== name.toLowerCase())
        });
      }
    }
  };

  // Mobile Bottom Bar active mapper
  const mobileCurrentTab = useMemo(() => {
    if (activeView === 'dashboard') return 'dashboard';
    if (activeView === 'links' || activeView === 'pinned') return 'links';
    if (activeView === 'collection' || activeView === 'collections_list') return 'collections';
    if (activeView === 'tag' || activeView === 'tags_list') return 'tags';
    return 'dashboard';
  }, [activeView]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#1e1e1e] text-[#fffdfc] font-sans antialiased">
      
      {/* 1. ÜST BAR: Blogger Header (.mainH - Fixed at Top) */}
      <BloggerHeader
        onToggleSidebar={() => {
          if (window.innerWidth < 768) {
            setIsDrawerOpen(prev => !prev);
          } else {
            setIsSidebarOpen(prev => !prev);
          }
        }}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenRightSidebar={() => setIsRightDrawerOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim() && activeView !== 'links') {
            setActiveView('links');
          }
        }}
        onOpenNewLink={() => {
          setEditingLink(null);
          setIsAddModalOpen(true);
        }}
        onOpenImportExport={() => setIsImportExportOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onGoHome={() => {
          setActiveView('dashboard');
          setSearchQuery('');
        }}
        onOpenPinned={() => {
          setActiveView('pinned');
          setSearchQuery('');
        }}
        onOpenSearchModal={() => setIsSearchOverlayOpen(true)}
      />

      {/* 2. ANA GÖVDE: SOL BAR + ORTA İÇERİK + SAĞ BAR */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        
        {/* SOL BAR: Blogger Navigation Sidebar (.mainL - Desktop: Kapalıyken 72px Mini Bar, Açıkken 230px) */}
        <div className="hidden md:flex shrink-0">
          <BloggerSidebar
            isCollapsed={!isSidebarOpen}
            currentTab={activeView === 'post_detail' ? 'dashboard' : activeView}
            activeCollectionId={selectedCollectionId}
            activeTag={selectedTag}
            onSelectTab={(tab) => {
              setActiveView(tab);
              setSearchQuery('');
            }}
            onSelectCollection={(id) => {
              setSelectedCollectionId(id);
              setActiveView('collection');
              setSearchQuery('');
            }}
            onSelectTag={(tag) => {
              setSelectedTag(tag);
              setActiveView('tag');
              setSearchQuery('');
            }}
            collections={collections}
            tags={tags}
            counts={counts}
            onOpenNewLink={() => {
              setEditingLink(null);
              setIsAddModalOpen(true);
            }}
            onOpenManageCollections={() => setIsCollectionsModalOpen(true)}
            onOpenManageTags={() => setIsTagsModalOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenImportExport={() => setIsImportExportOpen(true)}
          />
        </div>

        {/* BİRLEŞİK KAYDIRMA ALANI: Orta İçerik ve Sağ Bar BİRLİKTE Kayar (.mainW) */}
        <div 
          id="mainScrollContainer"
          className="flex-1 h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden min-w-0 bg-[#1e1e1e] flex flex-col justify-between"
        >
          {/* Ana İçerik ve Sağ Bar Konteyneri */}
          <div className="w-full flex-1">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-[25px] pt-4 sm:pt-[30px] pb-12">
              <div className="flex flex-col lg:flex-row gap-[25px] items-start">
                
                {/* ORTA BÖLÜM: Ana İçerik Alanı (.blogB) */}
                <main className="flex-1 min-w-0 w-full lg:w-[calc(100%-325px)]">
                {activeView === 'dashboard' && (
                  <DashboardView
                    links={allLinks}
                    collections={collections}
                    tagsCount={tags.length}
                    pinnedCount={counts.pinned}
                    collectionMap={collectionMap}
                    onNavigateTab={(tab) => {
                      setActiveView(tab);
                      setSearchQuery('');
                    }}
                    onSelectTag={(tag) => {
                      setSelectedTag(tag);
                      setActiveView('tag');
                      setSearchQuery('');
                    }}
                    onViewAllRecent={() => {
                      setActiveView('links');
                      setSearchQuery('');
                    }}
                    onViewCollection={(id) => {
                      setSelectedCollectionId(id);
                      setActiveView('collection');
                      setSearchQuery('');
                    }}
                    onOpenNewLink={() => {
                      setEditingLink(null);
                      setIsAddModalOpen(true);
                    }}
                    onOpenDetail={(link) => setDetailLink(link)}
                    onOpenPostPage={handleOpenPostPage}
                    onTogglePin={handleTogglePin}
                    onToggleRead={handleToggleRead}
                    onToggleArchive={handleToggleArchive}
                    onMoveToTrash={handleMoveToTrash}
                    onEditLink={(link) => {
                      setEditingLink(link);
                      setIsAddModalOpen(true);
                    }}
                  />
                )}

                {activeView === 'post_detail' && selectedPost && (
                  <BloggerPostView
                    link={selectedPost}
                    allLinks={allLinks}
                    collection={selectedPost.collectionId ? collectionMap.get(selectedPost.collectionId) : undefined}
                    onBack={() => {
                      setActiveView('dashboard');
                      document.getElementById('mainScrollContainer')?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onNavigatePost={(nextPost) => {
                      setSelectedPost(nextPost);
                      document.getElementById('mainScrollContainer')?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onTogglePin={handleTogglePin}
                    onToggleRead={handleToggleRead}
                    onToggleArchive={handleToggleArchive}
                    onMoveToTrash={handleMoveToTrash}
                    onEdit={(link) => {
                      setEditingLink(link);
                      setIsAddModalOpen(true);
                    }}
                    onOpenMedia={handleOpenMedia}
                  />
                )}

                {activeView === 'privacy' && (
                  <BloggerPrivacyView
                    onBack={() => {
                      setActiveView('dashboard');
                      document.getElementById('mainScrollContainer')?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onGoHome={() => {
                      setActiveView('dashboard');
                      document.getElementById('mainScrollContainer')?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                )}

          {activeView === 'links' && (
            <LinksView
              title="Tüm Bağlantılar"
              subtitle="Tüm kayıtlı web bağlantılarınız ve yer imleriniz"
              links={currentViewLinks}
              collections={collections}
              collectionMap={collectionMap}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onOpenNewLink={() => {
                setEditingLink(null);
                setIsAddModalOpen(true);
              }}
              onOpenDetail={(link) => setDetailLink(link)}
              onTogglePin={handleTogglePin}
              onToggleRead={handleToggleRead}
              onToggleArchive={handleToggleArchive}
              onMoveToTrash={handleMoveToTrash}
              onEditLink={(link) => {
                setEditingLink(link);
                setIsAddModalOpen(true);
              }}
            />
          )}

          {activeView === 'pinned' && (
            <LinksView
              title="Etkileşimler"
              subtitle="Favori ve sabitlenmiş yer imleriniz"
              links={currentViewLinks}
              collections={collections}
              collectionMap={collectionMap}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onOpenNewLink={() => {
                setEditingLink(null);
                setIsAddModalOpen(true);
              }}
              onOpenDetail={(link) => setDetailLink(link)}
              onTogglePin={handleTogglePin}
              onToggleRead={handleToggleRead}
              onToggleArchive={handleToggleArchive}
              onMoveToTrash={handleMoveToTrash}
              onEditLink={(link) => {
                setEditingLink(link);
                setIsAddModalOpen(true);
              }}
            />
          )}

          {activeView === 'collection' && selectedCollectionId && (
            <LinksView
              title={collectionMap.get(selectedCollectionId)?.name || 'Koleksiyon'}
              subtitle={collectionMap.get(selectedCollectionId)?.description}
              links={currentViewLinks}
              collections={collections}
              collectionMap={collectionMap}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onOpenNewLink={() => {
                setEditingLink(null);
                setIsAddModalOpen(true);
              }}
              onOpenDetail={(link) => setDetailLink(link)}
              onTogglePin={handleTogglePin}
              onToggleRead={handleToggleRead}
              onToggleArchive={handleToggleArchive}
              onMoveToTrash={handleMoveToTrash}
              onEditLink={(link) => {
                setEditingLink(link);
                setIsAddModalOpen(true);
              }}
            />
          )}

          {activeView === 'tag' && selectedTag && (
            <LinksView
              title={`#${selectedTag}`}
              subtitle="Etiketlenen bağlantılar"
              links={currentViewLinks}
              collections={collections}
              collectionMap={collectionMap}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onOpenNewLink={() => {
                setEditingLink(null);
                setIsAddModalOpen(true);
              }}
              onOpenDetail={(link) => setDetailLink(link)}
              onTogglePin={handleTogglePin}
              onToggleRead={handleToggleRead}
              onToggleArchive={handleToggleArchive}
              onMoveToTrash={handleMoveToTrash}
              onEditLink={(link) => {
                setEditingLink(link);
                setIsAddModalOpen(true);
              }}
            />
          )}

          {activeView === 'collections_list' && (
            <CollectionsView
              collections={collections}
              counts={counts.collections}
              onSelectCollection={(id) => {
                setSelectedCollectionId(id);
                setActiveView('collection');
              }}
              onOpenManageCollections={() => setIsCollectionsModalOpen(true)}
            />
          )}

          {activeView === 'tags_list' && (
            <TagsView
              tags={tags}
              counts={counts.tags}
              onSelectTag={(tag) => {
                setSelectedTag(tag);
                setActiveView('tag');
              }}
              onOpenManageTags={() => setIsTagsModalOpen(true)}
            />
          )}

          {activeView === 'trash' && (
            <LinksView
              title="Çöp Kutusu"
              subtitle="Silinen bağlantılar burada saklanır. Kalıcı olarak silebilir veya geri yükleyebilirsiniz."
              links={currentViewLinks}
              collections={collections}
              collectionMap={collectionMap}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onOpenNewLink={() => {}}
              onOpenDetail={(link) => setDetailLink(link)}
              onTogglePin={() => {}}
              onToggleRead={() => {}}
              onToggleArchive={() => {}}
              onMoveToTrash={() => {}}
              onRestoreFromTrash={handleRestoreFromTrash}
              onPermanentDelete={handlePermanentDelete}
              onEditLink={() => {}}
              isTrashView={true}
              onEmptyTrash={handleEmptyTrash}
            />
          )}

              </main>

              {/* SAĞ BAR: Popüler Post, Etiketler, Bize Ulaşın (.sideB) */}
              <aside className="w-full lg:w-[300px] shrink-0">
                <BloggerRightSidebar
                  pinnedLinks={allLinks.filter(l => l.isPinned && !l.isTrash && !l.isArchived)}
                  allLinks={allLinks}
                  collections={collections}
                  tags={tags}
                  counts={counts}
                  onSelectCollection={(id) => {
                    setSelectedCollectionId(id);
                    setActiveView('collection');
                    setSearchQuery('');
                  }}
                  onSelectTag={(tag) => {
                    setSelectedTag(tag);
                    setActiveView('tag');
                    setSearchQuery('');
                  }}
                  onOpenPostPage={handleOpenPostPage}
                  isDrawerOpen={isRightDrawerOpen}
                  onCloseDrawer={() => setIsRightDrawerOpen(false)}
                />
              </aside>

              </div>
            </div>
          </div>

          {/* Blogger Alt Footer Bölümü (.mainF) - Tam Genişlik (Full Width) */}
          <BloggerFooter onOpenPrivacy={() => setActiveView('privacy')} />
        </div>

      </div>

      {/* Blogger Mobile Fixed Bottom Navigation Bar (.mobM / .mobC) */}
      <BloggerMobileNav
        currentTab={
          activeView === 'dashboard' ? 'dashboard' :
          activeView === 'pinned' ? 'pinned' :
          activeView === 'collection' ? 'collection' :
          activeView === 'tag' ? 'tag' :
          activeView === 'trash' ? 'trash' : 'links'
        }
        onSelectTab={(tab) => {
          setActiveView(tab);
          setSearchQuery('');
        }}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenSearch={() => {
          setIsSearchOverlayOpen(true);
        }}
      />

      {/* Blogger Float Sistemi: Hızlı İşlemler (.qeF) & Başa Dön / İlerleme (.tTb) */}
      <FloatingMenu
        onOpenNewLink={() => {
          setEditingLink(null);
          setIsAddModalOpen(true);
        }}
        onOpenSearch={() => {
          setIsSearchOverlayOpen(true);
        }}
        onOpenCollections={() => {
          setActiveView('collections_list');
        }}
        onOpenSettings={() => {
          setIsSettingsOpen(true);
        }}
        onOpenImportExport={() => {
          setIsImportExportOpen(true);
        }}
        onOpenTags={() => {
          setActiveView('tags_list');
        }}
        onOpenAllLinks={() => {
          setActiveView('links');
        }}
      />

      {/* Blogger Side Drawer (.mainL / .mnBr) */}
      <BloggerDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentTab={activeView}
        onSelectTab={(tab) => {
          setActiveView(tab);
          setSearchQuery('');
        }}
        collections={collections}
        tags={tags}
        counts={counts}
        activeCollectionId={selectedCollectionId}
        activeTag={selectedTag}
        onSelectCollection={(id) => {
          setSelectedCollectionId(id);
          setActiveView('collection');
          setSearchQuery('');
        }}
        onSelectTag={(tag) => {
          setSelectedTag(tag);
          setActiveView('tag');
          setSearchQuery('');
        }}
        onOpenNewLink={() => {
          setEditingLink(null);
          setIsAddModalOpen(true);
        }}
        onOpenManageCollections={() => setIsCollectionsModalOpen(true)}
        onOpenManageTags={() => setIsTagsModalOpen(true)}
        onOpenImportExport={() => setIsImportExportOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onSearchSubmit={(q) => {
          setSearchQuery(q);
          setActiveView('links');
        }}
        onOpenSearchModal={() => setIsSearchOverlayOpen(true)}
      />

      {/* Modals */}
      <AddEditLinkModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingLink(null);
        }}
        onSave={handleSaveLink}
        editingLink={editingLink}
        collections={collections}
        allTags={tags}
        defaultCollectionId={selectedCollectionId}
      />

      <ManageCollectionsModal
        isOpen={isCollectionsModalOpen}
        onClose={() => setIsCollectionsModalOpen(false)}
        collections={collections}
        onAddCollection={handleAddCollection}
        onUpdateCollection={handleUpdateCollection}
        onDeleteCollection={handleDeleteCollection}
      />

      <ManageTagsModal
        isOpen={isTagsModalOpen}
        onClose={() => setIsTagsModalOpen(false)}
        tags={tags}
        tagCounts={counts.tags}
        onAddTag={handleAddTag}
        onDeleteTag={handleDeleteTag}
      />

      <LinkDetailModal
        isOpen={!!detailLink}
        onClose={() => setDetailLink(null)}
        link={detailLink}
        collection={detailLink?.collectionId ? collectionMap.get(detailLink.collectionId) : undefined}
        onUpdateNotes={handleUpdateNotes}
        onTogglePin={handleTogglePin}
        onToggleRead={handleToggleRead}
        onToggleArchive={handleToggleArchive}
        onMoveToTrash={handleMoveToTrash}
      />

      <ImportExportModal
        isOpen={isImportExportOpen}
        onClose={() => setIsImportExportOpen(false)}
        onDataChanged={updateStorage}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        storageInfo={storageInfo}
        totalLinks={counts.all + counts.trash}
        totalCollections={collections.length}
        totalTags={tags.length}
        onRefreshData={updateStorage}
      />

      {/* Gelişmiş Arama / Bul Paneli (saved-main Search Overlay & Engine Switcher) */}
      <SearchOverlayModal
        isOpen={isSearchOverlayOpen}
        onClose={() => setIsSearchOverlayOpen(false)}
        initialQuery={searchQuery}
        onApplySearchQuery={(q) => {
          setSearchQuery(q);
          setActiveView('links');
        }}
        onSelectLink={(link) => {
          setSelectedPost(link);
          setActiveView('post_detail');
        }}
      />

      {/* Blogger Universal Medya Lightbox (#fsMediaModal) */}
      <UniversalMediaModal
        isOpen={mediaModal.isOpen}
        onClose={() => setMediaModal(prev => ({ ...prev, isOpen: false }))}
        items={mediaModal.items}
        initialIndex={mediaModal.initialIndex}
      />

    </div>
  );
};

export default App;
