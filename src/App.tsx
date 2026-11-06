import React, { useState, useEffect, useMemo } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, initializeDatabase } from './db';
import { CollectionItem, LinkItem, SortOption, ViewFilter, ViewMode } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LinkCard } from './components/LinkCard';
import { LinkListItem } from './components/LinkListItem';
import { AddEditLinkModal } from './components/AddEditLinkModal';
import { ManageCollectionsModal } from './components/ManageCollectionsModal';
import { ManageTagsModal } from './components/ManageTagsModal';
import { LinkDetailModal } from './components/LinkDetailModal';
import { ImportExportModal } from './components/ImportExportModal';
import { SettingsModal } from './components/SettingsModal';
import { getStorageUsage } from './utils/exportImport';
import { getDomain } from './utils/favicon';
import { Bookmark, Plus, Search, Folder, Trash2, RotateCcw } from 'lucide-react';

export const App: React.FC = () => {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('saved_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('saved_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('saved_theme', 'light');
    }
  }, [isDarkMode]);

  // View & Filter states
  const [currentFilter, setCurrentFilter] = useState<ViewFilter>({ type: 'all' });
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('date_desc');
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);

  // Storage info
  const [storageInfo, setStorageInfo] = useState({
    formattedUsed: '...',
    formattedQuota: '...',
    percentage: 0
  });

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<LinkItem | null>(null);
  const [detailLink, setDetailLink] = useState<LinkItem | null>(null);
  const [isCollectionsModalOpen, setIsCollectionsModalOpen] = useState(false);
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Initialize DB on start
  useEffect(() => {
    initializeDatabase();
  }, []);

  // Update storage stats
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

  // Reactive DB queries
  const allLinks = useLiveQuery(() => db.links.toArray(), []) || [];
  const collections = useLiveQuery(() => db.collections.toArray(), []) || [];
  const tags = useLiveQuery(() => db.tags.toArray(), []) || [];

  // Map collections for quick lookup
  const collectionMap = useMemo(() => {
    const map = new Map<number, CollectionItem>();
    collections.forEach((c) => {
      if (c.id) map.set(c.id, c);
    });
    return map;
  }, [collections]);

  // Calculate live counts
  const counts = useMemo(() => {
    let all = 0;
    let pinned = 0;
    let unread = 0;
    let read = 0;
    let archived = 0;
    let trash = 0;
    const colCounts: Record<number, number> = {};
    const tagCounts: Record<string, number> = {};

    allLinks.forEach((link) => {
      if (link.isTrash) {
        trash++;
        return; // Trash items don't count towards active views
      }

      if (link.isArchived) {
        archived++;
      } else {
        all++;
        if (link.isPinned) pinned++;
        if (link.isRead) read++;
        else unread++;

        if (link.collectionId) {
          colCounts[link.collectionId] = (colCounts[link.collectionId] || 0) + 1;
        }

        if (link.tags) {
          link.tags.forEach((t) => {
            tagCounts[t] = (tagCounts[t] || 0) + 1;
          });
        }
      }
    });

    return {
      all,
      pinned,
      unread,
      read,
      archived,
      trash,
      collections: colCounts,
      tags: tagCounts
    };
  }, [allLinks]);

  // Filter links
  const filteredLinks = useMemo(() => {
    let items = allLinks.filter((link) => {
      // Trash filter check
      if (currentFilter.type === 'trash') {
        return link.isTrash;
      }
      if (link.isTrash) return false;

      // Archive filter check
      if (currentFilter.type === 'archived') {
        return link.isArchived;
      }
      if (link.isArchived) return false;

      // Normal filters
      switch (currentFilter.type) {
        case 'pinned':
          return link.isPinned;
        case 'unread':
          return !link.isRead;
        case 'read':
          return link.isRead;
        case 'collection':
          return link.collectionId === currentFilter.id;
        case 'tag':
          return link.tags && link.tags.includes(currentFilter.tag);
        case 'all':
        default:
          return true;
      }
    });

    // Search query
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

    // Sort
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
  }, [allLinks, currentFilter, searchQuery, sortBy]);

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

      // Auto add new tags to tag table
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

  // Collection Actions
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
    // Unlink links from this collection
    await db.links.where('collectionId').equals(id).modify({ collectionId: null });
    await db.collections.delete(id);
  };

  // Tag Actions
  const handleAddTag = async (name: string) => {
    const exists = await db.tags.where('name').equalsIgnoreCase(name).first();
    if (!exists) {
      await db.tags.add({ name });
    }
  };

  const handleDeleteTag = async (name: string) => {
    await db.tags.where('name').equalsIgnoreCase(name).delete();
    // Also remove from links
    const linksWithTag = await db.links.where('tags').equals(name).toArray();
    for (const l of linksWithTag) {
      if (l.id) {
        await db.links.update(l.id, {
          tags: l.tags.filter((t) => t.toLowerCase() !== name.toLowerCase())
        });
      }
    }
  };

  // Header Title derivation
  const getHeaderTitle = () => {
    switch (currentFilter.type) {
      case 'pinned':
        return 'Sabitlenen Bağlantılar';
      case 'unread':
        return 'Okuma Listesi (Okunmamış)';
      case 'read':
        return 'Okunan Bağlantılar';
      case 'archived':
        return 'Arşivlenmiş Bağlantılar';
      case 'trash':
        return 'Çöp Kutusu';
      case 'collection': {
        const col = collectionMap.get(currentFilter.id);
        return col ? `Koleksiyon: ${col.name}` : 'Koleksiyon';
      }
      case 'tag':
        return `Etiket: #${currentFilter.tag}`;
      case 'all':
      default:
        return 'Tüm Bağlantılar';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        onOpenAddModal={() => {
          setEditingLink(null);
          setIsAddModalOpen(true);
        }}
        onOpenImportExport={() => setIsImportExportOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleSidebar={() => setSidebarOpenMobile(!sidebarOpenMobile)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        totalLinksCount={counts.all}
      />

      {/* Main Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          collections={collections}
          tags={tags}
          counts={counts}
          storageInfo={storageInfo}
          onOpenManageCollections={() => setIsCollectionsModalOpen(true)}
          onOpenManageTags={() => setIsTagsModalOpen(true)}
          isOpenMobile={sidebarOpenMobile}
          onCloseMobile={() => setSidebarOpenMobile(false)}
        />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
                <span>{getHeaderTitle()}</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {filteredLinks.length}
                </span>
              </h1>
              {searchQuery && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  "{searchQuery}" araması için sonuçlar gösteriliyor
                </p>
              )}
            </div>

            {/* Empty Trash Button if viewing trash */}
            {currentFilter.type === 'trash' && counts.trash > 0 && (
              <button
                onClick={handleEmptyTrash}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-xs font-semibold border border-rose-200 dark:border-rose-900/50 transition-colors self-start sm:self-auto"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Çöp Kutusunu Boşalt</span>
              </button>
            )}
          </div>

          {/* Links Listing */}
          {filteredLinks.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLinks.map((link) => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    collection={link.collectionId ? collectionMap.get(link.collectionId) : undefined}
                    onTogglePin={handleTogglePin}
                    onToggleRead={handleToggleRead}
                    onToggleArchive={handleToggleArchive}
                    onMoveToTrash={handleMoveToTrash}
                    onRestoreFromTrash={handleRestoreFromTrash}
                    onPermanentDelete={handlePermanentDelete}
                    onEdit={(l) => {
                      setEditingLink(l);
                      setIsAddModalOpen(true);
                    }}
                    onOpenDetail={(l) => setDetailLink(l)}
                    onSelectTag={(tag) => setCurrentFilter({ type: 'tag', tag })}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredLinks.map((link) => (
                  <LinkListItem
                    key={link.id}
                    link={link}
                    viewMode={viewMode}
                    collection={link.collectionId ? collectionMap.get(link.collectionId) : undefined}
                    onTogglePin={handleTogglePin}
                    onToggleRead={handleToggleRead}
                    onToggleArchive={handleToggleArchive}
                    onMoveToTrash={handleMoveToTrash}
                    onRestoreFromTrash={handleRestoreFromTrash}
                    onPermanentDelete={handlePermanentDelete}
                    onEdit={(l) => {
                      setEditingLink(l);
                      setIsAddModalOpen(true);
                    }}
                    onOpenDetail={(l) => setDetailLink(l)}
                    onSelectTag={(tag) => setCurrentFilter({ type: 'tag', tag })}
                  />
                ))}
              </div>
            )
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4 bg-white/50 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">
                {searchQuery ? 'Eşleşen bağlantı bulunamadı' : 'Bu görünümde henüz bağlantı yok'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
                {searchQuery
                  ? 'Farklı bir anahtar kelime veya etiket aramayı deneyebilirsiniz.'
                  : 'Yeni bir web sitesi veya makale kaydederek koleksiyonunuzu oluşturmaya başlayın.'}
              </p>
              {!searchQuery && currentFilter.type !== 'trash' && (
                <button
                  onClick={() => {
                    setEditingLink(null);
                    setIsAddModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Bağlantı Ekle</span>
                </button>
              )}
            </div>
          )}
        </main>
      </div>

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
        defaultCollectionId={currentFilter.type === 'collection' ? currentFilter.id : null}
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
        totalLinks={counts.all + counts.archived + counts.trash}
        totalCollections={collections.length}
        totalTags={tags.length}
        onRefreshData={updateStorage}
      />
    </div>
  );
};
export default App;
