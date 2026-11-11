// import sampleImage from '@/assets/hero/warehouse-interior-a1.jpg';

/* =====================================================================
 * Types
 * ===================================================================== */

export type PerspectiveData = {
  eyebrow: string;
  title: string;
  quote: string;
  authorName: string;
  authorRole: string;
  initials: string;
  image?: string; // Optional — falls back to placeholder if undefined
};

/* =====================================================================
 * Data
 * ===================================================================== */

export const perspectiveData: PerspectiveData = {
  eyebrow: 'A perspective from our people',
  title: 'A message from Emily.',
  quote: 'Approved message to be supplied.',
  authorName: 'Emily Jackman',
  authorRole: 'Owner',
  initials: 'EJ',
  // image: 'path-to-emily-photo.jpg'
};
