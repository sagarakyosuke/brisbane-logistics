import type { ElementType } from 'react';
import { DescriptionOutlined, LaptopMac, WbSunny } from '@mui/icons-material';
import maropostLogo from '@/assets/partners/maropost.svg';
import shopifyLogo from '@/assets/partners/shopify.svg';
import unleashedLogo from '@/assets/partners/unleashed.svg';
import wooCommerceLogo from '@/assets/partners/woocommerce.svg';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface IntegrationPartner {
  name: string;
  type: string;
  logo?: string;
}

export interface IntegrationStep {
  id: string;
  icon: ElementType;
  title: string;
  desc: string;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const integrationPartners: IntegrationPartner[] = [
  { name: 'Shopify', type: 'E-commerce', logo: shopifyLogo },
  { name: 'WooCommerce', type: 'E-commerce', logo: wooCommerceLogo },
  { name: 'Unleashed', type: 'Inventory', logo: unleashedLogo },
  { name: 'Maropost', type: 'Commerce Cloud', logo: maropostLogo },
];

export const integrationSteps: IntegrationStep[] = [
  {
    id: 'platform',
    icon: LaptopMac,
    title: 'Your platform',
    desc: 'Share your current e-commerce or inventory system.',
  },
  {
    id: 'flow',
    icon: WbSunny,
    title: 'Your order flow',
    desc: 'Explain how orders reach your warehouse team.',
  },
  {
    id: 'requirements',
    icon: DescriptionOutlined,
    title: 'Your requirements',
    desc: 'Discuss what needs to connect before you commit.',
  },
];
