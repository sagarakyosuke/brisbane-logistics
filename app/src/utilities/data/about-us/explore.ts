import { Handshake, Groups, Image } from '@mui/icons-material';
import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface ExploreItem {
  id: string;
  title: string;
  desc: string;
  icon: ElementType;
  path: string;
}

export interface ExploreData {
  items: ExploreItem[];
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const exploreData: ExploreData = {
  items: [
    {
      id: 'our-story',
      title: 'Our Story',
      desc: 'The people and the journey behind the business.',
      icon: Handshake,
      path: '/about/our-story',
    },
    {
      id: 'our-team',
      title: 'Our Team',
      desc: 'Meet the people supporting your logistics.',
      icon: Groups,
      path: '/about/team',
    },
    {
      id: 'gallery',
      title: 'Warehouse Gallery',
      desc: 'Take a look at our warehouse spaces.',
      icon: Image,
      path: '/about/gallery',
    },
  ],
};
