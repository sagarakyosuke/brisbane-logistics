import {
  Home,
  Autorenew,
  Link as LinkIcon,
  Warehouse,
  Inventory,
  SyncAlt,
  Laptop,
  LocalShipping,
  Outbox,
  Description,
  FormatQuote,
  Article,
  AutoAwesome,
  MenuBook,
  Business,
  History,
  People,
  PhotoLibrary,
} from '@mui/icons-material';
import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface NavItem {
  title: string;
  desc?: string;
  icon?: ElementType;
  path?: string;
}

export interface NavGroup {
  label: string;
  isMega?: boolean;
  path?: string;
  items?: NavItem[];
}

/* =====================================================================
 * Nav links
 * ===================================================================== */

export const navLinks: NavGroup[] = [
  {
    label: 'Home',
    path: '/',
    items: [
      { title: 'Home', desc: 'Start here', icon: Home, path: '/' },
      {
        title: 'How It Works',
        desc: 'From enquiry to delivery',
        icon: Autorenew,
        path: '/home/how-it-works',
      },
      {
        title: 'Our Partners',
        desc: 'Systems and freight providers',
        icon: LinkIcon,
        path: '/home/integration-partners',
      },
    ],
  },
  {
    label: 'Services',
    path: '/services',
    isMega: true,
    items: [
      {
        title: 'Warehousing',
        desc: 'Pallet storage and inventory management',
        icon: Warehouse,
        path: '/services/warehousing',
      },
      {
        title: 'Pick & Pack Fulfilment',
        desc: 'Order picking, packing and dispatch prep',
        icon: Inventory,
        path: '/services/pick-and-pack',
      },
      {
        title: 'Cross Docking',
        desc: 'Inbound freight straight to outbound',
        icon: SyncAlt,
        path: '/services/cross-docking',
      },
      {
        title: 'E-Commerce Fulfilment',
        desc: 'Fulfilment for your online store',
        icon: Laptop,
        path: '/services/ecommerce',
      },
      {
        title: 'Transport & Distribution',
        desc: 'Local, national and international freight',
        icon: LocalShipping,
        path: '/services/transport',
      },
      {
        title: 'Container Handling',
        desc: 'Unpacking, palletising and onward movement',
        icon: Outbox,
        path: '/services/container-handling',
      },
    ],
  },
  {
    label: 'Case Studies',
    path: '/case-studies',
    items: [
      {
        title: 'Case Studies',
        desc: 'How we approach real challenges',
        icon: Description,
        path: '/case-studies',
      },
      {
        title: 'Client Testimonials',
        desc: 'What clients appreciate',
        icon: FormatQuote,
        path: '/case-studies/testimonials',
      },
    ],
  },
  {
    label: 'News & Blogs',
    path: '/news',
    items: [
      {
        title: 'Blogs',
        desc: 'Insights on warehousing and fulfilment',
        icon: Article,
        path: '/news',
      },
      {
        title: 'Company Updates',
        desc: 'The latest from our team',
        icon: AutoAwesome,
        path: '/news/company',
      },
      {
        title: 'Guides & Tips',
        desc: 'Practical help before you choose',
        icon: MenuBook,
        path: '/news/guides',
      },
    ],
  },
  {
    label: 'FAQs',
    path: '/faqs',
  },
  {
    label: 'About Us',
    path: '/about',
    items: [
      {
        title: 'Overview',
        desc: 'Your Brisbane 3PL partner',
        icon: Business,
        path: '/about',
      },
      {
        title: 'Our Story',
        desc: 'The people and the journey',
        icon: History,
        path: '/about/our-story',
      },
      {
        title: 'Our Team',
        desc: 'Meet the people behind your logistics',
        icon: People,
        path: '/about/team',
      },
      {
        title: 'Warehouse Gallery',
        desc: 'Take a look inside',
        icon: PhotoLibrary,
        path: '/about/gallery',
      },
    ],
  },
];
