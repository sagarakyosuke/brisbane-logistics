import { Warehouse, Inventory, BarChart, LocalShipping } from '@mui/icons-material';
import type { ElementType } from 'react';

export interface TopicItem {
  id: string;
  title: string;
  desc: string;
  icon: ElementType;
  path: string;
}

export interface BrowseByTopicData {
  title: string;
  topics: TopicItem[];
}

export const browseByTopicData: BrowseByTopicData = {
  title: 'Browse by topic',
  topics: [
    {
      id: 'warehousing',
      title: 'Warehousing',
      desc: 'Receiving, storage and warehouse planning.',
      icon: Warehouse,
      path: '/services/warehousing',
    },
    {
      id: 'fulfilment',
      title: 'Fulfilment',
      desc: 'Picking, packing and order preparation.',
      icon: Inventory,
      path: '/services/pick-and-pack',
    },
    {
      id: 'systems',
      title: 'Systems & stock',
      desc: 'Stock visibility and integration questions.',
      icon: BarChart,
      path: '/news/company',
    },
    {
      id: 'freight',
      title: 'Freight & dispatch',
      desc: 'Preparing information for delivery planning.',
      icon: LocalShipping,
      path: '/services/transport',
    },
  ],
};
