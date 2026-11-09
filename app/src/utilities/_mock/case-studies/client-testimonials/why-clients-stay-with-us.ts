import type { ElementType } from 'react';
import { ChatBubbleOutlined, VerifiedUser, PeopleOutlined, Description } from '@mui/icons-material';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface WhyClientValue {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
}

export interface WhyClientsStayData {
  eyebrow: string;
  title: string;
  values: WhyClientValue[];
  cta: {
    title: string;
    description: string;
    linkLabel: string;
    linkHref: string;
    icon: ElementType;
  };
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const whyClientsStayData: WhyClientsStayData = {
  eyebrow: 'Why Clients Stay With Us',
  title: 'What sits behind the feedback.',
  values: [
    {
      id: 'communication',
      title: 'Direct communication',
      description: 'You speak with the people who handle your stock, not a call centre.',
      icon: ChatBubbleOutlined,
    },
    {
      id: 'handling',
      title: 'Careful handling',
      description: 'Stock is checked, recorded and handled to your instructions.',
      icon: VerifiedUser,
    },
    {
      id: 'team',
      title: 'A team you know by name',
      description: 'The same small team supports your account day to day.',
      icon: PeopleOutlined,
    },
  ],
  cta: {
    title: 'See the work behind the feedback',
    description: 'Read how we handle real logistics challenges.',
    linkLabel: 'View case studies',
    linkHref: '/case-studies',
    icon: Description,
  },
};
