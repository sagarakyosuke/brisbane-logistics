import type { ElementType } from 'react';
import {
  Home,
  CalendarToday,
  LocalShipping,
  Inventory,
  Warehouse,
  Outbox,
  SyncAlt,
} from '@mui/icons-material';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface StorageOption {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: ElementType;
}

export interface RelatedService {
  title: string;
  icon: ElementType;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const storageOptions: StorageOption[] = [
  {
    id: 'long-term',
    title: 'Long-term storage',
    shortDesc: 'A reliable home for ongoing stock, with space to grow as your business does.',
    fullDesc:
      'Suits businesses that hold stock year-round and want a steady arrangement with regular reporting through our warehouse management system.',
    icon: Home,
  },
  {
    id: 'short-term',
    title: 'Short-term, overflow & seasonal storage',
    shortDesc:
      'Additional space when you need it, for seasonal stock, promotions or temporary overflow.',
    fullDesc:
      'Useful ahead of peak trading, for project stock or when your own site is full. Talk to us about timeframes and expected volumes.',
    icon: CalendarToday,
  },
  {
    id: 'pallet-in-out',
    title: 'Pallet in, pallet out',
    shortDesc: 'Efficient storage for palletised stock, with clear inwards and outwards handling.',
    fullDesc:
      'Pallets are received, recorded and stored, then released for collection or distribution when you need them.',
    icon: LocalShipping,
  },
];

export const relatedServices: RelatedService[] = [
  { title: 'Pick & Pack Fulfilment', icon: Inventory },
  { title: 'Transport & Distribution', icon: SyncAlt },
  { title: 'Container Handling', icon: Outbox },
];

export const quotePanelItems = [
  { title: 'Product types', desc: 'What are you storing?', icon: Inventory },
  { title: 'Pallet quantities', desc: 'How much stock do you need to store?', icon: Warehouse },
  { title: 'Storage duration', desc: 'Ongoing, seasonal or short-term?', icon: CalendarToday },
];
