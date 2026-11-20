import type { ElementType } from 'react';
import { Warehouse, Inventory, SyncAlt, Laptop, LocalShipping, Outbox } from '@mui/icons-material';

/* =====================================================================
 * Types
 * ===================================================================== */

export type ServiceTag =
  | 'Show everything'
  | 'I sell online'
  | 'I import containers'
  | 'I need more space'
  | 'I have freight to move'
  | 'Stock in and straight out';

export interface ServiceOption {
  id: string;
  num: string;
  title: string;
  desc: string;
  icon: ElementType;
  tags: ServiceTag[];
  path: string;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const serviceTags: ServiceTag[] = [
  'Show everything',
  'I sell online',
  'I import containers',
  'I need more space',
  'I have freight to move',
  'Stock in and straight out',
];

export const serviceOptions: ServiceOption[] = [
  {
    id: '01',
    num: '01',
    title: 'Warehousing',
    desc: 'Pallet storage and inventory management.',
    icon: Warehouse,
    tags: ['Show everything', 'I need more space', 'Stock in and straight out'],
    path: '/services/warehousing',
  },
  {
    id: '02',
    num: '02',
    title: 'Pick & Pack Fulfilment',
    desc: 'Order picking, packing and dispatch prep.',
    icon: Inventory,
    tags: ['Show everything', 'I sell online'],
    path: '/services/pick-and-pack',
  },
  {
    id: '03',
    num: '03',
    title: 'Cross Docking',
    desc: 'Inbound freight straight to outbound.',
    icon: SyncAlt,
    tags: ['Show everything', 'Stock in and straight out'],
    path: '/services/cross-docking',
  },
  {
    id: '04',
    num: '04',
    title: 'E-Commerce Fulfilment',
    desc: 'Fulfilment for your online store.',
    icon: Laptop,
    tags: ['Show everything', 'I sell online'],
    path: '/services/ecommerce',
  },
  {
    id: '05',
    num: '05',
    title: 'Transport & Distribution',
    desc: 'Local, national and international freight.',
    icon: LocalShipping,
    tags: ['Show everything', 'I have freight to move'],
    path: '/services/transport',
  },
  {
    id: '06',
    num: '06',
    title: 'Container Handling',
    desc: 'Unpacking, palletising and onward movement.',
    icon: Outbox,
    tags: ['Show everything', 'I import containers'],
    path: '/services/container-handling',
  },
];
