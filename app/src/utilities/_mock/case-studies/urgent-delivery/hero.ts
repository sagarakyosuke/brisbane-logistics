import { LocalShipping, LocationOn, Inventory } from '@mui/icons-material';
import type { ElementType } from 'react';
import boxesIcon from '@/assets/icons/boxes.png';

/* =====================================================================
 * Types
 * ===================================================================== */

export type FactItem = {
  label: string;
  value: string;
  icon: ElementType;
};

export type UrgentDeliveryHeroData = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  facts: FactItem[];
};

/* =====================================================================
 * Data
 * ===================================================================== */

export const urgentDeliveryHeroData: UrgentDeliveryHeroData = {
  eyebrow: 'Client Story',
  title: 'An urgent Brisbane delivery, completed ahead of schedule.',
  description:
    'How Brisbane Logistics handled a short-notice delivery of fragile tile cases to a Brisbane CBD hotel project.',
  image: boxesIcon,
  facts: [
    { label: 'Service', value: 'Urgent delivery', icon: LocalShipping },
    { label: 'Location', value: 'Brisbane CBD', icon: LocationOn },
    { label: 'Freight', value: 'Fragile tile cases', icon: Inventory },
  ],
};
