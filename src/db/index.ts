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
    const col1 = await db.collections.add({
      name: 'Research and Studies',
      description: 'Academic papers, medical research and scientific journals',
      color: '#38bdf8', // sky
      icon: 'microscope',
      createdAt: Date.now() - 86400000 * 10
    });

    const col2 = await db.collections.add({
      name: 'Recipes',
      description: 'Baking, cooking, sourdough and international cuisine',
      color: '#fbbf24', // amber
      icon: 'cooking-pot',
      createdAt: Date.now() - 86400000 * 9
    });

    const col3 = await db.collections.add({
      name: 'Personal Finance',
      description: 'Budgeting, investments, savings and financial planning',
      color: '#4ade80', // emerald/green
      icon: 'wallet',
      createdAt: Date.now() - 86400000 * 8
    });

    const col4 = await db.collections.add({
      name: 'Technology',
      description: 'Software development, AI, automation and tools',
      color: '#a78bfa', // purple
      icon: 'laptop',
      createdAt: Date.now() - 86400000 * 7
    });

    const col5 = await db.collections.add({
      name: 'Productivity',
      description: 'Goal setting, time management and focus workflows',
      color: '#f472b6', // pink
      icon: 'trending-up',
      createdAt: Date.now() - 86400000 * 6
    });

    const col6 = await db.collections.add({
      name: 'Health and Wellness',
      description: 'Exercise, physical therapy, nutrition and wellness',
      color: '#f87171', // red
      icon: 'heart',
      createdAt: Date.now() - 86400000 * 5
    });

    const col7 = await db.collections.add({
      name: 'Project Alpha',
      description: 'Internal project management and roadmap resources',
      color: '#38bdf8', // blue
      icon: 'folder',
      createdAt: Date.now() - 86400000 * 4
    });

    // Add tags
    await db.tags.bulkAdd([
      { name: 'budgeting', color: '#4ade80' },
      { name: 'cooking', color: '#fbbf24' },
      { name: 'credit', color: '#38bdf8' },
      { name: 'debt', color: '#f87171' },
      { name: 'environment', color: '#10b981' },
      { name: 'finance', color: '#4ade80' },
      { name: 'fitness', color: '#f87171' },
      { name: 'focus', color: '#a78bfa' }
    ]);

    // Add Linkwarden-style links
    await db.links.bulkAdd([
      {
        url: 'https://www.nature.com/articles/d41586-020-03514-6',
        title: 'COVID research: a year of scientific milestones',
        description: 'How researchers around the world tackled the greatest public health crisis in a century.',
        collectionId: col1 as number,
        tags: ['research', 'science'],
        notes: 'Landmark breakthroughs and vaccine development summaries.',
        isPinned: true,
        isArchived: false,
        isRead: false,
        isTrash: false,
        createdAt: Date.now() - 3600000 * 4,
        updatedAt: Date.now() - 3600000 * 4
      },
      {
        url: 'https://www.nature.com/articles/s41586-019-1666-5',
        title: 'Quantum supremacy using a programmable superconducting processor',
        description: 'Demonstrating quantum computational advantage over classical supercomputers.',
        collectionId: col1 as number,
        tags: ['quantum', 'technology'],
        notes: 'Google Quantum AI team paper on Sycamore processor.',
        isPinned: false,
        isArchived: false,
        isRead: true,
        isTrash: false,
        createdAt: Date.now() - 3600000 * 8,
        updatedAt: Date.now() - 3600000 * 8
      },
      {
        url: 'https://www.kingarthurbaking.com/recipes/rustic-sourdough-bread-recipe',
        title: 'Homemade Sourdough Bread',
        description: 'Crispy blistered crust, chewy open crumb, and deep sourdough tang.',
        collectionId: col2 as number,
        tags: ['cooking', 'baking'],
        notes: '75% hydration formula with overnight cold retard.',
        isPinned: false,
        isArchived: false,
        isRead: false,
        isTrash: false,
        createdAt: Date.now() - 3600000 * 12,
        updatedAt: Date.now() - 3600000 * 12
      },
      {
        url: 'https://www.recipetineats.com/thai-green-curry-recipe/',
        title: 'Vegetarian Thai Green Curry',
        description: 'Authentic rich Thai green curry with coconut milk, aromatic paste, and crispy tofu.',
        collectionId: col2 as number,
        tags: ['cooking'],
        notes: 'Use fresh kaffir lime leaves and Thai sweet basil.',
        isPinned: false,
        isArchived: false,
        isRead: false,
        isTrash: false,
        createdAt: Date.now() - 3600000 * 16,
        updatedAt: Date.now() - 3600000 * 16
      },
      {
        url: 'https://www.mindtools.com/pages/article/smart-goals.htm',
        title: 'Set SMART Goals for Maximum Productivity',
        description: 'Specific, Measurable, Achievable, Relevant, and Time-Bound frameworks.',
        collectionId: col5 as number,
        tags: ['focus', 'productivity'],
        notes: 'Quarterly objective reviews and alignment checklist.',
        isPinned: true,
        isArchived: false,
        isRead: false,
        isTrash: false,
        createdAt: Date.now() - 3600000 * 20,
        updatedAt: Date.now() - 3600000 * 20
      },
      {
        url: 'https://www.healthline.com/health/desk-exercises',
        title: 'Pomodoro-Style Break Exercises',
        description: 'Quick ergonomic stretches and mobility drills designed for desk workers.',
        collectionId: col6 as number,
        tags: ['fitness', 'health'],
        notes: 'Neck retractions, thoracic extensions, hip flexor stretches.',
        isPinned: false,
        isArchived: false,
        isRead: true,
        isTrash: false,
        createdAt: Date.now() - 3600000 * 24,
        updatedAt: Date.now() - 3600000 * 24
      },
      {
        url: 'https://zapier.com/blog/automate-repetitive-tasks/',
        title: 'Automate Repetitive Tasks with Zapier',
        description: 'Connect web apps, eliminate manual data entry, and streamline notification pipelines.',
        collectionId: col4 as number,
        tags: ['automation', 'technology'],
        notes: 'Webhooks, Multi-step Zaps and filters.',
        isPinned: false,
        isArchived: false,
        isRead: false,
        isTrash: false,
        createdAt: Date.now() - 3600000 * 28,
        updatedAt: Date.now() - 3600000 * 28
      },
      {
        url: 'https://www.commonsensemedia.org/articles/digital-detox-guide',
        title: 'Digital Detox: Regain Your Focus',
        description: 'Practical tactics to reduce screen fatigue and regain cognitive clarity.',
        collectionId: col5 as number,
        tags: ['focus', 'mindset'],
        notes: 'Greyscale mode on phone, notification hygiene.',
        isPinned: false,
        isArchived: false,
        isRead: false,
        isTrash: false,
        createdAt: Date.now() - 3600000 * 32,
        updatedAt: Date.now() - 3600000 * 32
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
