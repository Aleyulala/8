export interface LinkItem {
  id?: number;
  url: string;
  title: string;
  description: string;
  collectionId: number | null;
  tags: string[];
  notes?: string;
  isPinned: boolean;
  isArchived: boolean;
  isRead: boolean;
  isTrash: boolean;
  favicon?: string;
  createdAt: number;
  updatedAt: number;
}

export interface CollectionItem {
  id?: number;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  createdAt: number;
}

export interface TagItem {
  id?: number;
  name: string;
  color?: string;
}

export type ViewFilter = 
  | { type: 'all' }
  | { type: 'pinned' }
  | { type: 'unread' }
  | { type: 'read' }
  | { type: 'archived' }
  | { type: 'trash' }
  | { type: 'collection'; id: number }
  | { type: 'tag'; tag: string };

export type ViewMode = 'grid' | 'list' | 'compact';
export type SortOption = 'date_desc' | 'date_asc' | 'title_asc' | 'title_desc' | 'domain';
