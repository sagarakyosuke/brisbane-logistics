import warehouseImg from '@/assets/hero/warehouse-interior-a1.jpg';
import warehouseSideImg from '@/assets/hero/warehouse-side-a2.jpg';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface ServiceHeroData {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

/* =====================================================================
 * Data
 * ===================================================================== */

/** Hero data for the main /services overview page */
export const servicesOverviewHeroData: ServiceHeroData = {
  eyebrow: 'Our Services',
  title: 'Logistics services built around your business.',
  description:
    'Explore warehousing, fulfilment, container handling and distribution support for your operation.',
  image: warehouseSideImg,
  imageAlt: 'Brisbane Logistics facility exterior',
};

/** Hero data for the specific /services/warehousing page */
export const warehousingHeroData: ServiceHeroData = {
  eyebrow: 'Warehousing',
  title: 'Warehousing that fits your stock and your business.',
  description: 'Flexible storage options for ongoing, seasonal and overflow requirements.',
  image: warehouseImg,
  imageAlt: 'Warehouse facility exterior with loading bays',
};
