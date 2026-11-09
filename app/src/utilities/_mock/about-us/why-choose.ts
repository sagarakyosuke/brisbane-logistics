import { Groups, WbSunny, BarChart, Shield } from '@mui/icons-material';
import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface WhyChooseValue {
  id: string;
  title: string;
  desc: string;
  icon: ElementType;
}

export interface WhyChooseData {
  eyebrow: string;
  title: string;
  values: WhyChooseValue[];
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const whyChooseData: WhyChooseData = {
  eyebrow: 'Why choose Brisbane Logistics',
  title: 'Our values, in practice.',
  values: [
    {
      id: 'communication',
      title: 'Direct communication',
      desc: 'You deal with people who understand your business.',
      icon: Groups,
    },
    {
      id: 'practical',
      title: 'Practical people, real solutions',
      desc: 'We focus on getting the job done safely and carefully.',
      icon: WbSunny,
    },
    {
      id: 'tracking',
      title: 'Tracking and accountability',
      desc: 'Clear information about your stock and orders.',
      icon: BarChart,
    },
    {
      id: 'care',
      title: 'Care with your stock',
      desc: 'Handled carefully, recorded properly and ready when you need it.',
      icon: Shield,
    },
  ],
};
