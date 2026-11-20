import type { ElementType } from 'react';
import { Inventory, LocalShipping, Description, LaptopMac } from '@mui/icons-material';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface PickAndPackStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface PickAndPackQuoteItem {
  title: string;
  desc: string;
  icon: ElementType;
}

export interface NeedOnlineStoreData {
  icon: ElementType;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const pickAndPackSteps: PickAndPackStep[] = [
  {
    id: '01',
    title: 'Picking',
    subtitle: 'Products selected for each order.',
    description:
      'We pick the right products and quantities from your stock, following your order details and any special handling instructions.',
  },
  {
    id: '02',
    title: 'Packing',
    subtitle: 'Orders packed for dispatch.',
    description:
      'Orders are packed with suitable materials to help protect your products in transit, with options to match your brand and presentation requirements.',
  },
  {
    id: '03',
    title: 'Distribution handover',
    subtitle: 'Order preparation connected to delivery.',
    description:
      'We prepare orders for collection or handover to your preferred freight or courier partners, keeping dispatch organised.',
  },
];

export const pickAndPackNote =
  'Please note: dispatch arrangements and cut-off times are confirmed for your operation.';

export const pickAndPackQuoteItems: PickAndPackQuoteItem[] = [
  {
    title: 'Product sizes',
    desc: 'Small items, multiple SKUs or larger products',
    icon: Inventory,
  },
  {
    title: 'Typical order volumes',
    desc: 'Regular volumes or seasonal peaks',
    icon: LocalShipping,
  },
  {
    title: 'Packing requirements',
    desc: 'Materials, presentation and special handling',
    icon: Description,
  },
];

export const needOnlineStoreData: NeedOnlineStoreData = {
  icon: LaptopMac,
  title: 'Need online store connections?',
  description: 'See how e-commerce fulfilment links your store to our warehouse.',
  ctaLabel: 'Explore e-commerce fulfilment',
  ctaHref: '/services/ecommerce',
};
