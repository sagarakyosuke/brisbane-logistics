import type { ElementType } from 'react';
import {
  Description,
  LightMode,
  CheckCircle,
  Inventory,
  Warehouse,
  ShoppingCart,
} from '@mui/icons-material';

// import casesDeliveredImg from '@/assets/home/Cases delivered to the project site.jpg';
// import casesWrappedImg from '@/assets/home/Cases wrapped and strapped in the van.jpg';
// import tileCasesImg from '@/assets/home/Tile cases loaded and ready to leave.jpg';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface CaseStudyPoint {
  id: string;
  label: string;
  desc: string;
  icon: ElementType;
}

export interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  description: string;
  images: {
    main: string | null;
    topRight: string | null;
    bottomRight: string | null;
  };
  points: CaseStudyPoint[];
}

export interface PreviousCaseStudy {
  id: string;
  category: string;
  title: string;
  description: string;
  status: string;
  icon: ElementType;
  path: string;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const latestCaseStudies: CaseStudy[] = [
  {
    id: 'urgent-delivery',
    tag: 'Latest Case Study',
    title: 'Urgent delivery in Brisbane CBD.',
    description: 'An urgent Brisbane delivery, completed ahead of schedule.',
    images: {
      main: null,
      topRight: null,
      bottomRight: null,
    },
    points: [
      {
        id: 'challenge',
        label: 'Challenge',
        desc: 'Fragile tile cases needed at a hotel project on short notice.',
        icon: Description,
      },
      {
        id: 'approach',
        label: 'Approach',
        desc: 'Dedicated vehicle, secured freight and careful manual unloading.',
        icon: LightMode,
      },
      {
        id: 'result',
        label: 'Result',
        desc: 'Around two hours early. All cases arrived safely and intact.',
        icon: CheckCircle,
      },
    ],
  },
];

export const previousCaseStudies: PreviousCaseStudy[] = [
  {
    id: 'container-handling',
    category: 'Container Handling',
    title: 'Case study coming soon',
    description:
      'A client story about container handling will appear here once it is approved for publishing.',
    status: 'Placeholder',
    icon: Inventory,
    path: '#',
  },
  {
    id: 'warehousing',
    category: 'Warehousing',
    title: 'Case study coming soon',
    description:
      'A client story about warehousing will appear here once it is approved for publishing.',
    status: 'Placeholder',
    icon: Warehouse,
    path: '#',
  },
  {
    id: 'ecommerce',
    category: 'E-commerce Fulfilment',
    title: 'Case study coming soon',
    description:
      'A client story about e-commerce fulfilment will appear here once it is approved for publishing.',
    status: 'Placeholder',
    icon: ShoppingCart,
    path: '#',
  },
];