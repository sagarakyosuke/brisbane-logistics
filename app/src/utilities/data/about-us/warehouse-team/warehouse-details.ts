import { Apartment, Warehouse, LocalShipping } from '@mui/icons-material';
import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface WarehouseDetail {
  id: string;
  title: string;
  desc: string;
  icon: ElementType;
}

export interface WarehouseDetailsData {
  details: WarehouseDetail[];
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const warehouseDetailsData: WarehouseDetailsData = {
  details: [
    {
      id: 'exterior',
      title: 'Warehouse exterior',
      desc: 'Modern facility with secure, fenced access and hardstand space.',
      icon: Apartment,
    },
    {
      id: 'open-space',
      title: 'Open warehouse space',
      desc: 'A modern, open layout for storage and handling.',
      icon: Warehouse,
    },
    {
      id: 'loading',
      title: 'Loading and access',
      desc: 'Roller doors and a covered loading area for receiving and dispatch.',
      icon: LocalShipping,
    },
  ],
};
