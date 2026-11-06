import Dexie, { type Table } from 'dexie';
import { CollectionItem, LinkItem, TagItem } from '../types';

export interface AppSetting {
  key: string;
  value: any;
}

export class SavedDatabase extends Dexie {
  links!: Table<LinkItem, number>;
  collections!: Table<CollectionItem, number>;
  tags!: Table<TagItem, number>;
  settings!: Table<AppSetting, string>;

  constructor() {
    super('SavedDB');
    this.version(1).stores({
      links: '++id, url, title, collectionId, *tags, isPinned, isArchived, isRead, isTrash, createdAt, updatedAt',
      collections: '++id, name, createdAt',
      tags: '++id, &name',
      settings: 'key'
    });
  }
}

export const db = new SavedDatabase();

export async function initializeDatabase() {
  const collectionsCount = await db.collections.count();
  if (collectionsCount === 0) {
    const defaultColId = await db.collections.add({
      name: 'Genel',
      description: 'Genel yer imleri ve hızlı kayıtlar',
      color: '#3b82f6', // blue
      icon: 'folder',
      createdAt: Date.now()
    });

    const devColId = await db.collections.add({
      name: 'Yazılım & Web',
      description: 'Geliştirici araçları ve açık kaynak projeler',
      color: '#10b981', // emerald
      icon: 'code',
      createdAt: Date.now()
    });

    const readColId = await db.collections.add({
      name: 'Okuma Listesi',
      description: 'Daha sonra okunacak makaleler ve rehberler',
      color: '#8b5cf6', // purple
      icon: 'book',
      createdAt: Date.now()
    });

    // Add tags
    await db.tags.bulkAdd([
      { name: 'açık-kaynak', color: '#10b981' },
      { name: 'gpl-3.0', color: '#3b82f6' },
      { name: 'araçlar', color: '#f59e0b' },
      { name: 'rehber', color: '#8b5cf6' }
    ]);

    // Add sample links
    await db.links.bulkAdd([
      {
        url: 'https://linkwarden.app',
        title: 'Linkwarden - Open-source collaborative bookmark manager',
        description: 'Projemizin esinlendiği açık kaynaklı yer imi ve arşiv yöneticisi.',
        collectionId: defaultColId,
        tags: ['açık-kaynak', 'araçlar'],
        notes: 'Saved projesi, Linkwarden\'ın giriş gerektirmeyen ve 100% istemci tarafında IndexedDB ile çalışan hafif bir alternatifidir.',
        isPinned: true,
        isArchived: false,
        isRead: false,
        isTrash: false,
        createdAt: Date.now() - 3600000,
        updatedAt: Date.now() - 3600000
      },
      {
        url: 'https://www.gnu.org/licenses/gpl-3.0.html',
        title: 'GNU General Public License v3.0 (GPL-3.0)',
        description: 'Özgür Yazılım Vakfı (FSF) tarafından yayınlanan GPL v3.0 lisans metni ve detayları.',
        collectionId: devColId,
        tags: ['gpl-3.0', 'açık-kaynak'],
        notes: 'Saved tamamen GPL 3.0 ile lisanslanmıştır.',
        isPinned: true,
        isArchived: false,
        isRead: true,
        isTrash: false,
        createdAt: Date.now() - 7200000,
        updatedAt: Date.now() - 7200000
      },
      {
        url: 'https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API',
        title: 'IndexedDB API - MDN Web Docs',
        description: 'Tarayıcıda istemci tarafında yüksek miktarda yapısal veri depolamak için kullanılan IndexedDB rehberi.',
        collectionId: devColId,
        tags: ['rehber', 'araçlar'],
        notes: 'Verilerinizin tamamı güvenle tarayıcınızın IndexedDB hafızasında saklanır, hiçbir sunucuya gönderilmez.',
        isPinned: false,
        isArchived: false,
        isRead: false,
        isTrash: false,
        createdAt: Date.now() - 10800000,
        updatedAt: Date.now() - 10800000
      }
    ]);
  }
}

export async function resetDatabase() {
  await db.transaction('rw', db.links, db.collections, db.tags, db.settings, async () => {
    await db.links.clear();
    await db.collections.clear();
    await db.tags.clear();
    await db.settings.clear();
  });
  await initializeDatabase();
}
