import Dexie, { type Table } from 'dexie';
import { CollectionItem, LinkItem, TagItem } from '../types';
import { SEED_COLLECTIONS, SEED_TAGS, SEED_LINKS } from './seedData';
import { resolveRss } from '../utils/rssResolver';

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

export async function seedSavedMainData(force = false) {
  const collectionsCount = await db.collections.count();
  const dummyCol = await db.collections.where('name').equals('Research and Studies').first();
  const seedSetting = await db.settings.get('seed_version');

  // Trigger migration if empty, if it still contains dummy collection, if force is requested, or if seed version not recorded
  if (collectionsCount === 0 || dummyCol || force || !seedSetting || seedSetting.value !== 'saved-main-352-clean-v4') {
    if (collectionsCount === 0 || dummyCol || force || collectionsCount < 14 || !seedSetting || seedSetting.value !== 'saved-main-352-clean-v4') {
      await db.transaction('rw', db.links, db.collections, db.tags, db.settings, async () => {
        // Clear previous dummy data
        await db.links.clear();
        await db.collections.clear();
        await db.tags.clear();

        // 1. Insert 14 Collections
        const colMap = new Map<string, number>();
        const now = Date.now();

        for (let i = 0; i < SEED_COLLECTIONS.length; i++) {
          const colDef = SEED_COLLECTIONS[i];
          const id = await db.collections.add({
            name: colDef.name,
            description: colDef.description,
            color: colDef.color,
            icon: colDef.icon,
            createdAt: now - (SEED_COLLECTIONS.length - i) * 86400000
          });
          colMap.set(colDef.name, id as number);
        }

        // 2. Insert Tags
        await db.tags.bulkAdd(
          SEED_TAGS.map(t => ({
            name: t.name,
            color: '#38bdf8'
          }))
        );

        // 3. Insert 352 Links
        const linksToAdd: LinkItem[] = SEED_LINKS.map((item, index) => {
          const collectionId = colMap.get(item.categoryName) || null;
          return {
            url: item.url,
            title: item.title,
            description: item.description,
            collectionId: collectionId,
            tags: item.tags,
            thumbnail: item.thumbnail,
            views: item.views,
            commentsCount: item.commentsCount,
            authorName: item.authorName,
            rss: resolveRss(item.url) || undefined,
            notes: item.color ? `Özgün Renk: ${item.color}` : '',
            isPinned: item.isPinned,
            isArchived: false,
            isRead: false,
            isTrash: false,
            createdAt: now - index * 60000,
            updatedAt: now - index * 60000
          };
        });

        await db.links.bulkAdd(linksToAdd);
        await db.settings.put({ key: 'seed_version', value: 'saved-main-352-clean-v4' });
      });
    } else {
      await db.settings.put({ key: 'seed_version', value: 'saved-main-352-clean-v4' });
    }
  }
}

export async function initializeDatabase() {
  await seedSavedMainData();

  // Otomatik RSS Akış Çözücü Göçü (Eski veya RSS'i boş siteleri otomatik tarar)
  try {
    const rssMigration = await db.settings.get('rss_migration_v1');
    if (!rssMigration) {
      const allLinks = await db.links.toArray();
      const updates: Promise<number>[] = [];
      for (const link of allLinks) {
        if (!link.rss && link.id) {
          const autoRss = resolveRss(link.url);
          if (autoRss) {
            updates.push(db.links.update(link.id, { rss: autoRss }));
          }
        }
      }
      if (updates.length > 0) {
        await Promise.all(updates);
      }
      await db.settings.put({ key: 'rss_migration_v1', value: true });
    }
  } catch {
    // ignore
  }
}

export async function resetDatabase() {
  await seedSavedMainData(true);
}
