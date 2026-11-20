import type { ElementType } from 'react';
import { Inventory, LocalShipping, Outbox, Warehouse } from '@mui/icons-material';
import coveredLoadingA2 from '@/assets/hero/covered-loading-a2.png';
import warehouseInteriorA1 from '@/assets/hero/warehouse-interior-a1.jpg';
import warehouseInteriorA2 from '@/assets/hero/warehouse-interior-a2.png';
import warehouseSideA2 from '@/assets/hero/warehouse-side-a2.jpg';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface HeroSlide {
  id: number;
  image: string;
  alt: string;
}

export interface HeroBay {
  id: string;
  title: string;
  subtitle: string;
  icon: ElementType;
  path: string;
}

export interface HeroContent {
  badge: string;
  /**
   * Reserved for the headline; not currently rendered — `HeroHeadline`
   * hardcodes its own copy. Wire this up or remove it if that changes.
   */
  title: string;
  rotatingWords: string[];
  lead: string;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const heroSlides: HeroSlide[] = [
  { id: 1, image: coveredLoadingA2, alt: 'Covered Loading Bay A2' },
  { id: 2, image: warehouseInteriorA1, alt: 'Warehouse Interior A1' },
  { id: 3, image: warehouseInteriorA2, alt: 'Warehouse Interior A2' },
  { id: 4, image: warehouseSideA2, alt: 'Warehouse Side A2' },
];

export const heroBays: HeroBay[] = [
  {
    id: '01',
    title: 'Store stock',
    subtitle: 'BAY 1',
    icon: Warehouse,
    path: '/services/warehousing',
  },
  {
    id: '02',
    title: 'Fulfil online orders',
    subtitle: 'BAY 2',
    icon: Inventory,
    path: '/services/ecommerce',
  },
  {
    id: '03',
    title: 'Unpack containers',
    subtitle: 'BAY 3',
    icon: Outbox,
    path: '/services/container-handling',
  },
  {
    id: '04',
    title: 'Move freight',
    subtitle: 'BAY 4',
    icon: LocalShipping,
    path: '/services/transport',
  },
];

export const heroContent: HeroContent = {
  badge: 'Dock open · Brisbane QLD',
  title: 'Your stock. Your orders.',
  rotatingWords: ['Packed.', 'Stored.', 'Shipped.', 'Delivered.'],
  lead: 'A Brisbane logistics team for warehousing, fulfilment and distribution, from container receipt to customer delivery.',
};
