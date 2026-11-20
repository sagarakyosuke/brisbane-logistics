import transportImg from '@/assets/hero/warehouse-side-a2.jpg'; // Replace with your actual image if different

/* =====================================================================
 * Types
 * ===================================================================== */

export interface TransportHeroData {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const transportHeroData: TransportHeroData = {
  eyebrow: 'Transport & Distribution',
  title: 'Freight options for your delivery requirements.',
  description:
    'From individual items to trailer loads, discuss a coordinated freight solution with one point of contact.',
  image: transportImg,
  imageAlt: 'Warehouse exterior with delivery vehicles',
};
