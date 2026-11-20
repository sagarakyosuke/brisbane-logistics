import warehouseImg from '@/assets/hero/warehouse-interior-a2.png';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface ContainerHandlingHeroData {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const containerHandlingHeroData: ContainerHandlingHeroData = {
  eyebrow: 'Container Handling',
  title: 'Prepare your container freight for its next move.',
  description: 'Container unpacking, palletising and preparation for storage or distribution.',
  image: warehouseImg,
  imageAlt: 'Warehouse exterior with container handling area',
};
