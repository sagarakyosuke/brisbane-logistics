import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface WarehouseDetail {
  id: number;
  key: string;
  title: string;
  desc: string;
  icon: ElementType;
}

export interface WarehouseDetailsData {
  details: WarehouseDetail[];
}