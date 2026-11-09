import { Inventory, Warehouse, LocalShipping, Outbox } from '@mui/icons-material';
import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface WhatWeHandleItem {
  id: string;
  title: string;
  desc: string;
  icon: ElementType;
}

export interface WhatWeHandleData {
  eyebrow: string;
  title: string;
  items: WhatWeHandleItem[];
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const whatWeHandleData: WhatWeHandleData = {
  eyebrow: 'What we handle',
  title: 'From goods arriving to orders going out.',
  items: [
    {
      id: 'receiving',
      title: 'Receiving',
      desc: 'Containers, pallets and incoming goods.',
      icon: Inventory,
    },
    {
      id: 'storage',
      title: 'Storage',
      desc: 'Organised storage and stock records.',
      icon: Warehouse,
    },
    {
      id: 'pick-pack',
      title: 'Pick & pack',
      desc: 'Orders, kitting and dispatch preparation.',
      icon: Outbox,
    },
    {
      id: 'dispatch',
      title: 'Dispatch',
      desc: 'Freight and delivery requirements.',
      icon: LocalShipping,
    },
  ],
};
