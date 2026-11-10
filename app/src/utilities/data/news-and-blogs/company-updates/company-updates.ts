import type { ElementType } from 'react';
import { Groups, LocalShipping, MenuBook } from '@mui/icons-material';

// Using the exact hero images provided
import warehouseSide from '@/assets/hero/warehouse-side-a2.jpg';
import warehouseInteriorPng from '@/assets/hero/warehouse-interior-a2.png';
import warehouseInteriorJpg from '@/assets/hero/warehouse-interior-a1.jpg';

export interface UpdateItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  linkLabel: string;
  linkPath: string;
  image: string;
  icon: ElementType;
}

export const companyUpdatesData: UpdateItem[] = [
  {
    id: 'team',
    category: 'Team',
    title: 'Meet the people behind your logistics',
    desc: 'Get to know the Brisbane Logistics team handling receiving, storage, order preparation and dispatch.',
    linkLabel: 'Meet the team',
    linkPath: '/about/team',
    image: warehouseInteriorJpg,
    icon: Groups,
  },
  {
    id: 'case-study',
    category: 'Client story',
    title: 'Case study: an urgent Brisbane CBD delivery',
    desc: 'How a dedicated vehicle and careful handling supported a short-notice delivery of fragile tile cases.',
    linkLabel: 'Read the story',
    linkPath: '/case-studies/urgent-delivery',
    image: warehouseSide,
    icon: LocalShipping,
  },
  {
    id: 'guide',
    category: 'Guides',
    title: 'New guide: preparing for a warehouse enquiry',
    desc: 'A practical checklist of the details to have ready before you talk to a 3PL provider.',
    linkLabel: 'Read the guide',
    linkPath: '/news/guides',
    image: warehouseInteriorPng,
    icon: MenuBook,
  },
];
