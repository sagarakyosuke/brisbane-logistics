import type { ElementType } from 'react';
import { Inventory, SyncAlt, LocalShipping, Timer, AltRoute, Warehouse } from '@mui/icons-material';

import crossDockingImg from '@/assets/hero/warehouse-side-a2.jpg';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface CrossDockingHeroData {
  eyebrow: string;
  title: string;
  description: string;
}

export interface CrossDockingStep {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
}

export interface CrossDockingBenefit {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
}

export interface CrossDockingNeedStockData {
  eyebrow: string;
  title: string;
  description: string;
  icon: ElementType;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const crossDockingHeroData: CrossDockingHeroData = {
  eyebrow: 'Cross Docking',
  title: 'Keep freight moving without long-term storage.',
  description: 'Cross docking connects incoming freight with sorting and onward distribution.',
};

export const crossDockingSteps: CrossDockingStep[] = [
  {
    id: 'incoming',
    title: 'Incoming freight',
    description: 'Receive and verify inbound deliveries.',
    icon: Inventory,
  },
  {
    id: 'sort',
    title: 'Sort & consolidate',
    description: 'Organise and prepare freight for dispatch.',
    icon: SyncAlt,
  },
  {
    id: 'outbound',
    title: 'Outbound freight',
    description: 'Transfer to outbound vehicles for delivery.',
    icon: LocalShipping,
  },
];

export const crossDockingBenefits: CrossDockingBenefit[] = [
  {
    id: 'storage-time',
    title: 'Minimise storage time',
    description: 'Move freight through quickly without long-term storage.',
    icon: Timer,
  },
  {
    id: 'reduce-handling',
    title: 'Reduce handling',
    description: 'Fewer touchpoints help keep freight moving through the supply chain.',
    icon: AltRoute,
  },
  {
    id: 'onward-delivery',
    title: 'Coordinate onward delivery',
    description: 'We help align inbound and outbound shipments for smooth dispatch.',
    icon: LocalShipping,
  },
];

export const crossDockingFeatureImage = {
  src: crossDockingImg,
  alt: 'Covered loading access',
  label: 'Covered loading access',
};

export const crossDockingNeedStockData: CrossDockingNeedStockData = {
  eyebrow: 'Need stock held for longer?',
  title: 'Explore warehousing.',
  description:
    'If your business needs pallet storage and inventory management, warehousing may be a better fit.',
  icon: Warehouse,
};
