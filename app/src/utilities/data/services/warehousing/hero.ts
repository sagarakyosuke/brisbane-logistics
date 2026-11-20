import warehouseImg from '@/assets/hero/warehouse-interior-a2.png';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface WarehousingHeroData {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const warehousingHeroData: WarehousingHeroData = {
  eyebrow: 'Warehousing',
  title: 'Warehousing that fits your stock and your business.',
  description: 'Flexible storage options for ongoing, seasonal and overflow requirements.',
  image: warehouseImg,
  imageAlt: 'Warehouse interior with racking and stock',
};
