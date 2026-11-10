import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface CaseStudyPoint {
  id: number;
  label: string;
  desc: string;
  icon: ElementType;
}

export interface CaseStudy {
  id: string;
  key: string;
  tag: string;
  title: string;
  description: string;
  path: string;
  images: {
    main: string | null;
    topRight: string | null;
    bottomRight: string | null;
  };
  points: CaseStudyPoint[];
}

export interface PreviousCaseStudy {
  id: string;
  key: string;
  category: string;
  title: string;
  description: string;
  status: string;
  icon: ElementType;
  image: string | null;
  path: string;
}
