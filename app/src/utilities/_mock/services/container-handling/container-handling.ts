import type { ElementType } from 'react';
import { Inventory2, LocalOffer, PhotoCamera, Warehouse, SyncAlt } from '@mui/icons-material';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface ContainerHandlingStep {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
}

export interface ContainerHandlingData {
  eyebrow: string;
  title: string;
  description: string;
  steps: ContainerHandlingStep[];
}

export interface NextStepCard {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  path: string;
  icon: ElementType;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const containerHandlingData: ContainerHandlingData = {
  eyebrow: 'Our Container Handling',
  title: 'From unpacking to onward movement.',
  description:
    "We prepare container freight so it's ready for storage or distribution, handled carefully and documented throughout.",
  steps: [
    {
      id: '1',
      title: 'Unpacking & palletising',
      description:
        'Goods are unpacked from the container and palletised for storage or distribution.',
      icon: Inventory2,
    },
    {
      id: '2',
      title: 'Re-labelling & shrink wrapping',
      description:
        'Stock can be re-labelled to your requirements and shrink-wrapped to keep pallets secure.',
      icon: LocalOffer,
    },
    {
      id: '3',
      title: 'Damage reporting with photos',
      description:
        'Any visible damage found on unpacking is recorded and photographed so you have a clear record.',
      icon: PhotoCamera,
    },
  ],
};

export const nextStepsData: NextStepCard[] = [
  {
    id: 'storage',
    title: 'Need storage?',
    description: 'Pallet storage and inventory management for your stock.',
    ctaLabel: 'Explore warehousing',
    path: '/services/warehousing',
    icon: Warehouse,
  },
  {
    id: 'cross-docking',
    title: 'Ready to move freight onward?',
    description: 'Coordinate incoming freight and onward dispatch.',
    ctaLabel: 'Explore cross docking',
    path: '/services/cross-docking',
    icon: SyncAlt,
  },
];
