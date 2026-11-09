import { Description, Inventory, ShoppingCart } from '@mui/icons-material';
import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface UsefulGuideItem {
  id: string;
  title: string;
  desc: string;
  icon: ElementType;
  path: string;
}

export interface UsefulGuideData {
  eyebrow: string;
  title: string;
  guides: UsefulGuideItem[];
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const usefulGuideData: UsefulGuideData = {
  eyebrow: 'Useful guides',
  title: 'A little more detail, if you need it.',
  guides: [
    {
      id: 'choosing-3pl',
      title: 'Choosing a 3PL partner',
      desc: 'Key considerations when comparing a 3PL for your business.',
      icon: Description,
      path: '/news/guides',
    },
    {
      id: 'cross-docking',
      title: 'Cross docking vs warehousing',
      desc: 'Understand the difference and when to use each.',
      icon: Inventory,
      path: '/services/cross-docking',
    },
    {
      id: 'ecommerce',
      title: 'E-commerce fulfilment',
      desc: 'How we support online stores from storage to delivery.',
      icon: ShoppingCart,
      path: '/services/ecommerce',
    },
  ],
};
