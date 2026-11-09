import warehouseImage from '@/assets/hero/warehouse-interior-a1.jpg';

/* =====================================================================
 * Types
 * ===================================================================== */

export type TailoredWarehousingData = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaPath: string;
  image: string;
  imageAlt: string;
};

/* =====================================================================
 * Data
 * ===================================================================== */

export const tailoredWarehousingData: TailoredWarehousingData = {
  eyebrow: 'Tailored warehousing and 3PL solutions',
  title: 'A partner that understands your business.',
  description:
    'Every business is different. Our team works with you to understand your products, volumes and delivery requirements, then builds an arrangement that fits. From short-term needs to long-term growth, we provide flexible warehousing and 3PL services in Brisbane and South East Queensland.',
  ctaLabel: 'Explore our services',
  ctaPath: '/services',
  image: warehouseImage,
  imageAlt: 'Inside the Brisbane Logistics warehouse',
};
