import type { ElementType } from 'react';
import { Outbox, Warehouse, Inventory, LocalShipping } from '@mui/icons-material';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface CombineServiceItem {
  id: string;
  icon: ElementType;
  title: string;
  desc: string;
  isHighlighted?: boolean;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const combineServicesList: CombineServiceItem[] = [
  {
    id: 'container',
    icon: Outbox,
    title: 'Container handling',
    desc: 'Unpack and palletise on arrival',
  },
  {
    id: 'warehousing',
    icon: Warehouse,
    title: 'Warehousing',
    desc: 'Store pallets for as long as you need',
  },
  {
    id: 'pick-pack',
    icon: Inventory,
    title: 'Pick & pack',
    desc: 'Prepare each order for dispatch',
  },
  {
    id: 'distribution',
    icon: LocalShipping,
    title: 'Distribution',
    desc: 'Deliver locally, nationally or overseas',
  },
];
