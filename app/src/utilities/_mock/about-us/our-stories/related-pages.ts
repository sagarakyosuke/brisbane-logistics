import { Visibility, Image, Description } from '@mui/icons-material';
import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface RelatedPageItem {
  id: string;
  title: string;
  icon: ElementType;
  path: string;
}

export interface RelatedPagesData {
  title: string;
  pages: RelatedPageItem[];
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const relatedPagesData: RelatedPagesData = {
  title: 'Related pages',
  pages: [
    {
      id: 'our-story',
      title: 'Our Story',
      icon: Visibility,
      path: '/about/our-story',
    },
    {
      id: 'gallery',
      title: 'Warehouse Gallery',
      icon: Image,
      path: '/about/gallery',
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      icon: Description,
      path: '/case-studies',
    },
  ],
};
