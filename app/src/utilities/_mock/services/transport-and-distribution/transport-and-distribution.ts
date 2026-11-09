import type { ElementType } from 'react';
import {
  LocalShipping,
  AccessTime,
  FlightTakeoff,
  Public,
  DirectionsBoat,
} from '@mui/icons-material';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface TransportServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const transportServices: TransportServiceItem[] = [
  {
    id: 'local',
    title: 'Local delivery',
    description: 'Delivery options for Brisbane and surrounding areas.',
    icon: LocalShipping,
  },
  {
    id: 'next-day',
    title: 'Next-day courier options',
    description: 'Time-sensitive deliveries with priority handling.',
    icon: AccessTime,
  },
  {
    id: 'national-air',
    title: 'National air freight',
    description: 'Delivery to major Australian destinations.',
    icon: FlightTakeoff,
  },
  {
    id: 'international-air',
    title: 'International air freight',
    description: 'Coordinated air freight for time-critical shipments.',
    icon: Public,
  },
  {
    id: 'international-sea',
    title: 'International sea freight',
    description: 'Shipping options for larger consignments.',
    icon: DirectionsBoat,
  },
];

export const transportInfoCard = {
  title:
    'Delivery options, timeframes and availability depend on your freight and destination. Talk to our team about the best solution.',
};
