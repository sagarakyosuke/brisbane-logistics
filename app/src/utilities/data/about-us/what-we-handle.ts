import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface WhatWeHandleItem {
  id: string;
  title: string;
  desc: string;
  icon: ElementType;
}

export interface WhatWeHandleData {
  eyebrow: string;
  title: string;
  items: WhatWeHandleItem[];
}
