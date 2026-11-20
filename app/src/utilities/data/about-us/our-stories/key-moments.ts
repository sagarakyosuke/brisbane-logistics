import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface KeyMomentItem {
  id: string;
  title: string;
  badge: string;
  icon: ElementType;
}

export interface KeyMomentsData {
  eyebrow: string;
  title: string;
  subtitle: string;
  moments: KeyMomentItem[];
}
