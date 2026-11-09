import type { ElementType } from 'react';
import { Storefront, Inventory2, LocalShipping } from '@mui/icons-material';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface ReceiveStoreTab {
  id: string;
  label: string;
  icon: ElementType;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const receiveStoreTabs: ReceiveStoreTab[] = [
  {
    id: 'receive',
    label: 'Receive & store',
    icon: Storefront,
    title: 'Receive & store',
    subtitle: 'Inventory logged in our warehouse management system.',
    description:
      'We receive your stock, check it and log it into our warehouse management system, so your products are ready for fulfilment when orders come in.',
    points: [
      'Stock checked on arrival',
      'Logged by SKU in CartonCloud',
      'Visibility of what you hold',
    ],
  },
  {
    id: 'pick',
    label: 'Pick & pack',
    icon: Inventory2,
    title: 'Pick & pack',
    subtitle: 'Accurate picking, careful packing.',
    description:
      'Our team picks your orders using barcode scanning, packs them securely according to your brand guidelines, and prepares them for dispatch.',
    points: ['Barcode-verified picking', 'Custom packaging options', 'Daily dispatch cut-offs'],
  },
  {
    id: 'dispatch',
    label: 'Dispatch & deliver',
    icon: LocalShipping,
    title: 'Dispatch & deliver',
    subtitle: 'Handed to your preferred couriers.',
    description:
      'We hand your parcels over to your preferred courier network, complete with tracking details so both you and your customers know exactly where the order is.',
    points: [
      'Integrated with major couriers',
      'Live tracking updates',
      'Proof of dispatch reports',
    ],
  },
];
