import type { ElementType } from 'react';
import {
  ChatBubbleOutlined,
  Description,
  Inventory,
  Laptop,
  Link as LinkIcon,
  LocalShipping,
  Outbox,
  People,
  SyncAlt,
  Warehouse,
} from '@mui/icons-material';
import forkliftImg from '@/assets/home/Tile cases loaded and ready to leave.jpg';
import hydrantImg from '@/assets/home/Cases delivered to the project site.jpg';
import vanImg from '@/assets/home/Cases wrapped and strapped in the van.jpg';
import aramexLogo from '@/assets/partners/aramex.svg';
import australiaPostLogo from '@/assets/partners/australia-post.svg';
import borderExpressLogo from '@/assets/partners/border-express.svg';
import cartonCloudLogo from '@/assets/partners/cartoncloud.svg';
import couriersPleaseLogo from '@/assets/partners/couriers-please.svg';
import fedexExpressLogo from '@/assets/partners/fedex-express.svg';
import maropostLogo from '@/assets/partners/maropost.svg';
import shopifyLogo from '@/assets/partners/shopify.svg';
import tntLogo from '@/assets/partners/tnt.svg';
import unleashedLogo from '@/assets/partners/unleashed.svg';
import wooCommerceLogo from '@/assets/partners/woocommerce.svg';

/* =====================================================================
 * Types
 * ===================================================================== */

/** Canonical identifiers for the six core services. */
export type ServiceKey =
  | 'ecommerce'
  | 'pick-and-pack'
  | 'warehousing'
  | 'container-handling'
  | 'cross-docking'
  | 'transport';

/** Icon keys used by the audience tab buttons. Must match `AUD_ICONS`. */
export type AudienceIconKey = 'cart' | 'container' | 'user' | 'chart';

export interface TrustItem {
  id: string;
  title: string;
  subtitle: string;
  icon: ElementType;
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  icon: ElementType;
  /** Route path the card navigates to when clicked. */
  path: string;
}

export interface AudienceItem {
  id: string;
  icon: AudienceIconKey;
  title: string;
  heading: string;
  description: string;
  list: string[];
  services: ServiceKey[];
}

export interface CaseStudyFact {
  label: string;
  value: string;
}

export interface CaseStudyImage {
  src: string;
  alt: string;
}

export interface CaseStudy {
  eyebrow: string;
  title: string;
  lead: string;
  facts: CaseStudyFact[];
  images: CaseStudyImage[];
}

export interface Partner {
  name: string;
  type: string;
  /** Optional logo asset. If omitted, the card falls back to text-only. */
  logo?: string;
}

export interface HelpfulLink {
  id: string;
  icon: ElementType;
  title: string;
  desc: string;
  cta: string;
  /** Route path the card's CTA navigates to. */
  path: string;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const trustItems: TrustItem[] = [
  {
    id: 'receive',
    title: 'Receive · Store · Pick · Dispatch',
    subtitle: 'One team for every step',
    icon: Inventory,
  },
  {
    id: 'people',
    title: 'Talk to real people',
    subtitle: 'No call-centre runaround',
    icon: People,
  },
  {
    id: 'systems',
    title: 'Connected to your systems',
    subtitle: 'Shopify, WooCommerce, CartonCloud and more',
    icon: LinkIcon,
  },
];

export const serviceMarquee: readonly string[] = [
  'Pallet storage',
  'Pick & pack',
  'Cross docking',
  'Container unpacks',
  'E-commerce fulfilment',
  'Local & national distribution',
  'Inventory management',
];

export const serviceItems: ServiceItem[] = [
  {
    id: '01',
    title: 'Warehousing',
    desc: 'Pallet storage and inventory management.',
    icon: Warehouse,
    path: '/services/warehousing',
  },
  {
    id: '02',
    title: 'Pick & Pack Fulfilment',
    desc: 'Order picking, packing and dispatch prep.',
    icon: Inventory,
    path: '/services/pick-and-pack',
  },
  {
    id: '03',
    title: 'Cross Docking',
    desc: 'Inbound freight straight to outbound.',
    icon: SyncAlt,
    path: '/services/cross-docking',
  },
  {
    id: '04',
    title: 'E-Commerce Fulfilment',
    desc: 'Fulfilment for your online store.',
    icon: Laptop,
    path: '/services/ecommerce',
  },
  {
    id: '05',
    title: 'Transport & Distribution',
    desc: 'Local, national and international freight.',
    icon: LocalShipping,
    path: '/services/transport',
  },
  {
    id: '06',
    title: 'Container Handling',
    desc: 'Unpacking, palletising and onward movement.',
    icon: Outbox,
    path: '/services/container-handling',
  },
];

export const audiences: AudienceItem[] = [
  {
    id: 'ecom',
    icon: 'cart',
    title: 'Online stores & dropshippers',
    heading: 'Move your orders out of the garage.',
    description:
      'Whether you are outgrowing a spare room or moving away from a dropship supplier, we can receive your stock, store it and pack each order as it comes in.',
    list: [
      'Connect Shopify, WooCommerce or Maropost Commerce Cloud',
      'Orders picked and packed by a Brisbane team',
      'Handover to your preferred couriers',
    ],
    services: ['ecommerce', 'pick-and-pack', 'warehousing'],
  },
  {
    id: 'import',
    icon: 'container',
    title: 'Importers & wholesalers',
    heading: 'From container to customer.',
    description:
      'We unpack containers, palletise and check stock, then store it or move it straight on. Our sister company Kenter can support the international freight leg if you need it.',
    list: [
      'Container unpacking and palletising',
      'Damage reporting with photos',
      'Storage or cross dock to onward delivery',
    ],
    services: ['container-handling', 'cross-docking', 'warehousing'],
  },
  {
    id: 'small',
    icon: 'user',
    title: 'Small businesses & sole traders',
    heading: 'Logistics support without the overheads.',
    description:
      'Use warehouse space and a logistics team when you need them, without leasing a site or hiring staff. Start small and scale with your stock.',
    list: [
      'Pallet storage for ongoing or seasonal stock',
      'One point of contact you can call',
      'Arrangements that fit your volumes',
    ],
    services: ['warehousing', 'transport', 'pick-and-pack'],
  },
  {
    id: 'mgr',
    icon: 'chart',
    title: 'Operations & procurement managers',
    heading: 'A 3PL partner your team can rely on.',
    description:
      'Get a clear arrangement with documented handling, stock visibility through our warehouse management system, and a team that keeps you informed.',
    list: [
      'Stock visibility and reporting through CartonCloud',
      'Agreed handling instructions and service scope',
      'Overflow capacity for peaks and projects',
    ],
    services: ['warehousing', 'cross-docking', 'transport'],
  },
];

export const featuredCaseStudy: CaseStudy = {
  eyebrow: 'Featured case study',
  title: 'Urgent delivery in Brisbane CBD.',
  lead: "A hotel project needed fragile tile cases on site early the next morning after other providers couldn't help. Here's how a dedicated vehicle and careful handling got it done.",
  facts: [
    { label: 'Collected', value: '~6:30 am' },
    { label: 'Delivered', value: '~7:20 am' },
    { label: 'Cases', value: '~32 kg each' },
  ],
  images: [
    { src: forkliftImg, alt: 'Tile cases loaded and ready to leave' },
    { src: hydrantImg, alt: 'Cases delivered to the project site' },
    { src: vanImg, alt: 'Cases wrapped and strapped in the van' },
  ],
};

export const partnersList: Partner[] = [
  { name: 'CartonCloud', type: 'WMS', logo: cartonCloudLogo },
  { name: 'Shopify', type: 'E-commerce', logo: shopifyLogo },
  { name: 'WooCommerce', type: 'E-commerce', logo: wooCommerceLogo },
  { name: 'Unleashed', type: 'Inventory', logo: unleashedLogo },
  { name: 'Maropost', type: 'Commerce Cloud', logo: maropostLogo },
  { name: 'FedEx Express', type: 'Freight', logo: fedexExpressLogo },
  { name: 'TNT', type: 'Freight', logo: tntLogo },
  { name: 'Border Express', type: 'Freight', logo: borderExpressLogo },
  { name: 'CouriersPlease', type: 'Freight', logo: couriersPleaseLogo },
  { name: 'Australia Post', type: 'Freight', logo: australiaPostLogo },
  { name: 'Aramex', type: 'Freight', logo: aramexLogo },
];

export const helpfulLinks: HelpfulLink[] = [
  {
    id: 'team',
    icon: People,
    title: 'Meet our team',
    desc: 'Get to know the people behind Brisbane Logistics.',
    cta: 'Meet the team',
    path: '/about/team',
  },
  {
    id: 'faqs',
    icon: ChatBubbleOutlined,
    title: 'Find answers in our FAQs',
    desc: 'Quick answers to common questions about our services.',
    cta: 'Browse FAQs',
    path: '/faqs',
  },
  {
    id: 'articles',
    icon: Description,
    title: 'Read our latest articles',
    desc: 'Insights and practical guides from our logistics team.',
    cta: 'Read articles',
    path: '/news',
  },
];
