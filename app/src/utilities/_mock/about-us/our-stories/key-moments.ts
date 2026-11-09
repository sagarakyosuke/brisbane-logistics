import { Agriculture, BarChart, Flag } from '@mui/icons-material';
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

/* =====================================================================
 * Data
 * ===================================================================== */

export const keyMomentsData: KeyMomentsData = {
  eyebrow: 'Key moments',
  title: 'The moments that shaped the business.',
  subtitle: 'A timeline of important milestones in the Brisbane Logistics story.',
  moments: [
    {
      id: 'beginning',
      title: 'The beginning',
      badge: 'Details to be confirmed',
      icon: Agriculture,
    },
    {
      id: 'turning-point',
      title: 'A key turning point',
      badge: 'Details to be confirmed',
      icon: BarChart,
    },
    {
      id: 'next-chapter',
      title: 'The next chapter',
      badge: 'Details to be confirmed',
      icon: Flag,
    },
  ],
};
