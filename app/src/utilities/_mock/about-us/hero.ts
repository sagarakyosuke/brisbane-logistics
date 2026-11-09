import heroImage from '@/assets/hero/warehouse-side-a2.jpg';

/* =====================================================================
 * Types
 * ===================================================================== */

export type AboutHeroData = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

/* =====================================================================
 * Data
 * ===================================================================== */

export const aboutHeroData: AboutHeroData = {
  eyebrow: 'About Brisbane Logistics',
  title: 'Your Brisbane warehousing and 3PL partner.',
  description:
    'Warehousing, pick and pack, container unpacks and distribution for businesses across Brisbane and South East Queensland.',
  image: heroImage,
  imageAlt: 'Brisbane Logistics warehouse exterior',
};
