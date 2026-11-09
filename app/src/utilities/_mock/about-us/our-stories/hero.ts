// import heroImage from '@/assets/hero/warehouse-side-a2.jpg';

/* =====================================================================
 * Types
 * ===================================================================== */

export type OurStoryHeroData = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

/* =====================================================================
 * Data
 * ===================================================================== */

export const ourStoryHeroData: OurStoryHeroData = {
  eyebrow: 'Our Story',
  title: 'Built on people and relationships.',
  description:
    "Get to know Brisbane Logistics: the team, the journey and the clients we've grown alongside.",
  // image: heroImage,
  imageAlt: 'Brisbane Logistics warehouse exterior',
};
