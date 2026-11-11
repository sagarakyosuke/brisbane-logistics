import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface UsefulGuideItem {
  id: string;
  title: string;
  desc: string;
  icon: ElementType;
  path: string;
}

export interface UsefulGuideData {
  eyebrow: string;
  title: string;
  guides: UsefulGuideItem[];
}
