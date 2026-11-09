import {
  Business,
  Warehouse,
  ShoppingCart,
  LocalShipping,
  Inventory,
  Settings,
  Description,
  Headset,
} from '@mui/icons-material';
import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface FaqQuestion {
  question: string;
  answer: string;
}

export interface TopicItem {
  id: string;
  title: string;
  desc: string;
  icon: ElementType;
  questions: FaqQuestion[];
}

export interface WhatDoYouNeedData {
  title: string;
  subtitle: string;
  topics: TopicItem[];
}

/* =====================================================================
 * Data (Using exact text from the reference JS)
 * ===================================================================== */

export const whatDoYouNeedData: WhatDoYouNeedData = {
  title: 'What do you need answers about?',
  subtitle: 'Eight topics. Pick one or search above.',
  topics: [
    {
      id: 'getting-to-know-us',
      title: 'Getting to know us',
      desc: 'Services and business fit',
      icon: Business,
      questions: [
        {
          question: 'What does Brisbane Logistics do?',
          answer:
            'We provide third-party logistics in Brisbane: warehousing and pallet storage, pick and pack, e-commerce fulfilment, cross docking, container handling, and transport and distribution.',
        },
        {
          question: 'Do you work with small businesses?',
          answer:
            'Yes. We work with businesses of different sizes, including small businesses and sole traders. Tell us about your stock and volumes and we will talk through what fits.',
        },
        {
          question: 'Are you connected with Kenter?',
          answer:
            'Kenter International Logistics is our sister company. Kenter supports international freight, customs clearance and port transport, which can connect with our warehousing and distribution services.',
        },
      ],
    },
    {
      id: 'warehousing',
      title: 'Warehousing & storage',
      desc: 'Pallets and stock handling',
      icon: Warehouse,
      questions: [
        {
          question: 'Do you offer short-term and long-term storage?',
          answer:
            'Yes. We offer both short-term and long-term warehouse storage, with flexible options for seasonal peaks, project work or ongoing requirements.',
        },
        {
          question: 'Can you help with seasonal or overflow stock?',
          answer:
            'Yes. Short-term and overflow storage is available for seasonal stock, promotions or temporary overflow.',
        },
      ],
    },
    {
      id: 'pick-pack',
      title: 'Pick, pack & e-commerce',
      desc: 'Orders and fulfilment',
      icon: ShoppingCart,
      questions: [
        {
          question: 'Which e-commerce platforms can you work with?',
          answer:
            'We work with platforms including Shopify, WooCommerce and Maropost Commerce Cloud. Integration requirements are confirmed for each business.',
        },
        {
          question: 'What are your order cut-off times?',
          answer:
            'Dispatch arrangements and cut-off times are confirmed for your operation during setup.',
        },
      ],
    },
    {
      id: 'delivery',
      title: 'Delivery planning & freight',
      desc: 'Local and national distribution',
      icon: LocalShipping,
      questions: [
        {
          question: 'Do you deliver locally and nationally?',
          answer:
            'We offer local delivery options and coordinate national and international freight through our fleet and freight partner network.',
        },
        {
          question: 'Can you handle urgent deliveries?',
          answer:
            'Talk to us about time-critical freight. Availability depends on the freight, locations and timeframe.',
        },
      ],
    },
    {
      id: 'containers',
      title: 'Containers & cross-docking',
      desc: 'Unpacking and onward movement',
      icon: Inventory,
      questions: [
        {
          question: 'Do you unpack containers?',
          answer:
            'Yes. We unpack containers, palletise goods, and can re-label and shrink wrap stock. Any visible damage is recorded with photos.',
        },
        {
          question: 'What is cross docking?',
          answer:
            'Cross docking moves incoming freight through sorting and onto outbound vehicles without long-term storage.',
        },
      ],
    },
    {
      id: 'systems',
      title: 'Systems & integrations',
      desc: 'Platforms and stock reporting',
      icon: Settings,
      questions: [
        {
          question: 'What warehouse management system do you use?',
          answer:
            'We use CartonCloud as our warehouse management system to help manage stock, orders and reporting.',
        },
        {
          question: 'Can I see my stock levels?',
          answer:
            'Talk to us about stock visibility and reporting. Reporting is set up to suit your business.',
        },
      ],
    },
    {
      id: 'quotes',
      title: 'Quotes & pricing',
      desc: 'Costs and requirements',
      icon: Description,
      questions: [
        {
          question: 'How do I get a quote?',
          answer:
            'Use the Get a 3PL Quote button and tell us about your products, volumes and delivery requirements.',
        },
        {
          question: 'What affects the cost?',
          answer:
            'Pricing depends on factors such as storage volume and duration, handling requirements, order volumes and delivery destinations.',
        },
      ],
    },
    {
      id: 'getting-started',
      title: 'Getting started & support',
      desc: 'Switching and contacting us',
      icon: Headset,
      questions: [
        {
          question: 'How do I switch to Brisbane Logistics from another provider?',
          answer:
            'Start with a conversation about your current setup. We will agree the service scope, handling instructions and any platform connections before your stock moves.',
        },
        {
          question: 'How do I contact the team?',
          answer:
            'Call 07 3348 2100, email sales@brisbanelogistics.com.au, or use the Book a Call button.',
        },
      ],
    },
  ],
};
