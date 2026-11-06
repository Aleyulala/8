import { db } from '../db';
import { CollectionItem, LinkItem, TagItem } from '../types';

export interface BackupData {
  version: number;
  appName: string;
  exportDate: string;
  links: LinkItem[];
  collections: CollectionItem[];
  tags: TagItem[];
}

export async function exportDatabaseToJson(): Promise<string> {
  const links = await db.links.toArray();
  const collections = await db.collections.toArray();
  const tags = await db.tags.toArray();

  const backup: BackupData = {
    version: 1,
    appName: 'saved',
    exportDate: new Date().toISOString(),
    links,
    collections,
    tags
  };

  return JSON.stringify(backup, null, 2);
}

export async function importDatabaseFromJson(jsonStr: string, overwrite: boolean = false): Promise<{ linksCount: number; collectionsCount: number }> {
  const data: BackupData = JSON.parse(jsonStr);

  if (!data.links || !Array.isArray(data.links)) {
    throw new Error('Geçersiz yedek dosyası: Bağlantı verisi bulunamadı.');
  }

  return await db.transaction('rw', db.links, db.collections, db.tags, async () => {
    if (overwrite) {
      await db.links.clear();
      await db.collections.clear();
      await db.tags.clear();
    }

    // Map old collection IDs to new collection IDs if not overwriting
    const collectionIdMap = new Map<number, number>();

    if (data.collections && Array.isArray(data.collections)) {
      for (const col of data.collections) {
        const oldId = col.id;
        delete col.id; // allow Dexie to auto-increment or preserve if overwriting
        if (overwrite && oldId) {
          col.id = oldId;
          await db.collections.put(col);
          collectionIdMap.set(oldId, oldId);
        } else {
          // Check if already exists by name
          const existing = await db.collections.where('name').equalsIgnoreCase(col.name).first();
          if (existing && existing.id) {
            if (oldId) collectionIdMap.set(oldId, existing.id);
          } else {
            const newId = await db.collections.add(col);
            if (oldId) collectionIdMap.set(oldId, newId as number);
          }
        }
      }
    }

    // Add tags
    if (data.tags && Array.isArray(data.tags)) {
      for (const tag of data.tags) {
        const existing = await db.tags.where('name').equalsIgnoreCase(tag.name).first();
        if (!existing) {
          delete tag.id;
          await db.tags.add(tag);
        }
      }
    }

    // Add links
    let addedCount = 0;
    for (const link of data.links) {
      const targetColId = link.collectionId ? (collectionIdMap.get(link.collectionId) ?? null) : null;
      delete link.id;
      link.collectionId = targetColId;
      await db.links.add(link);
      addedCount++;
    }

    return {
      linksCount: addedCount,
      collectionsCount: data.collections?.length || 0
    };
  });
}

export function downloadFile(content: string, filename: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function getStorageUsage(): Promise<{ usedBytes: number; quotaBytes: number; formattedUsed: string; formattedQuota: string }> {
  if (navigator.storage && navigator.storage.estimate) {
    const estimate = await navigator.storage.estimate();
    const used = estimate.usage || 0;
    const quota = estimate.quota || 0;

    const formatBytes = (bytes: number) => {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return {
      usedBytes: used,
      quotaBytes: quota,
      formattedUsed: formatBytes(used),
      formattedQuota: formatBytes(quota)
    };
  }

  return {
    usedBytes: 0,
    quotaBytes: 0,
    formattedUsed: 'Bilinmiyor',
    formattedQuota: 'Bilinmiyor'
  };
}
