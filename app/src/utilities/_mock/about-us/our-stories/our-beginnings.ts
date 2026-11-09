import { Handshake, Groups, Agriculture } from '@mui/icons-material';
import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface OurBeginningsValue {
  id: string;
  title: string;
  desc: string;
  icon: ElementType;
}

export interface OurBeginningsData {
  eyebrow: string;
  title: string;
  description1: string;
  description2: string;
  badge: string;
  values: OurBeginningsValue[];
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const ourBeginningsData: OurBeginningsData = {
  eyebrow: 'Our beginnings',
  title: 'Where it began.',
  description1:
    'Brisbane Logistics was founded to deliver practical, people-focused 3PL solutions for Australian businesses.',
  description2:
    "Our story is one of steady growth, strong partnerships and a commitment to looking after our clients' stock as if it were our own.",
  badge: 'Founding details to be confirmed',
  values: [
    {
      id: 'relationships',
      title: 'Relationships first',
      desc: 'Most of our work comes from long-standing client relationships, built one conversation at a time.',
      icon: Handshake,
    },
    {
      id: 'team',
      title: 'A team you know by name',
      desc: 'Clients talk to the same people who handle their stock every day.',
      icon: Groups,
    },
    {
      id: 'growth',
      title: 'Growing with our clients',
      desc: 'As our clients have grown, so has the range of services we offer.',
      icon: Agriculture,
    },
  ],
};
