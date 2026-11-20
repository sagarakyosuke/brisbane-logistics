/* =====================================================================
 * Types
 * ===================================================================== */

export interface HeroBreadcrumb {
  parent: string;
  current: string;
}

export interface PartnerNode {
  id: string;
  label: string;
  /** X position as a percentage of the diagram width (0–100). */
  x: number;
  /** Y position as a percentage of the diagram height (0–100). */
  y: number;
}

export interface WarehouseHeroData {
  breadcrumb: HeroBreadcrumb;
  /** Each line is rendered separately with a `<br />` between. */
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  titleLine4: string;
  description: string;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const HERO_DATA: WarehouseHeroData = {
  breadcrumb: {
    parent: 'Home',
    current: 'Our Partners',
  },
  titleLine1: 'Connected',
  titleLine2: 'systems.',
  titleLine3: 'Coordinated',
  titleLine4: 'deliveries.',
  description:
    'The platforms and freight providers behind our warehousing, fulfilment and distribution workflows.',
};

export const PARTNER_NODES: PartnerNode[] = [
  { id: 'reports', label: 'Reports', x: 50, y: 15 },
  { id: 'store', label: 'Store', x: 15, y: 40 },
  { id: 'wms', label: 'WMS', x: 85, y: 40 },
  { id: 'orders', label: 'Orders', x: 15, y: 80 },
  { id: 'freight', label: 'Freight', x: 85, y: 80 },
];
