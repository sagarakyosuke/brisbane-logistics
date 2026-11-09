import {
  MenuBook,
  Warehouse,
  Inventory,
  SyncAlt,
  Laptop,
  LocalShipping,
  Outbox,
  ChatBubbleOutlined,
} from '@mui/icons-material';
import type { ElementType } from 'react';

export interface QuoteServiceOption {
  id: string;
  label: string;
  icon: ElementType;
}

export interface FeaturedGuideData {
  eyebrow: string;
  title: string;
  desc: string;
  icon: ElementType;
  checklist: string[];
  modal: {
    step: string;
    title: string;
    subtitle: string;
    services: QuoteServiceOption[];
  };
}

export const featuredGuideData: FeaturedGuideData = {
  eyebrow: 'Featured guide',
  title: 'Choosing a warehouse partner?',
  desc: 'Use these questions to prepare for your next provider conversation. Tick them off as you go.',
  icon: MenuBook,
  checklist: [
    'What products am I storing, and do any need special handling?',
    'Roughly how many pallets or cartons do I hold, and how does that change across the year?',
    'How do my orders arrive today, and what system do they come from?',
    'Where do my customers or delivery locations sit: local, interstate or overseas?',
    'What reporting do I need on stock levels and dispatched orders?',
    'When do I need the new arrangement to start?',
  ],
  modal: {
    step: 'Step 1 of 3',
    title: 'What do you need help with?',
    subtitle: 'Choose as many as you like.',
    services: [
      { id: 'warehousing', label: 'Warehousing', icon: Warehouse },
      { id: 'pick-pack', label: 'Pick & Pack', icon: Inventory },
      { id: 'cross-docking', label: 'Cross Docking', icon: SyncAlt },
      { id: 'ecommerce', label: 'E-Commerce Fulfilment', icon: Laptop },
      { id: 'transport', label: 'Transport & Distribution', icon: LocalShipping },
      { id: 'container', label: 'Container Handling', icon: Outbox },
      { id: 'unsure', label: 'Not sure yet', icon: ChatBubbleOutlined },
    ],
  },
};
