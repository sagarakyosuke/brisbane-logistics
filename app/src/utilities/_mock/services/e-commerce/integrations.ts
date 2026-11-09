import type { ElementType } from 'react';
import { AccessTime } from '@mui/icons-material';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface IntegrationItem {
  id: string;
  name: string;
  type: string;
}

export interface IntegrationInfo {
  title: string;
  description: string;
  icon: ElementType;
}

export interface IntegrationsData {
  eyebrow: string;
  title: string;
  description: string;
  integrations: IntegrationItem[];
  infoCard: IntegrationInfo;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const integrationsData: IntegrationsData = {
  eyebrow: 'Integrations',
  title: 'Connect your store with your fulfilment.',
  description: 'Discuss your platform and order flow with our team.',
  integrations: [
    { id: 'shopify', name: 'Shopify', type: 'E-commerce platform' },
    { id: 'woocommerce', name: 'WooCommerce', type: 'E-commerce platform' },
    { id: 'maropost', name: 'Maropost', type: 'Commerce cloud' },
  ],
  infoCard: {
    title: 'Order cut-off times',
    description:
      'Dispatch timing and cut-off times are set during onboarding and confirmed for your operation.',
    icon: AccessTime,
  },
};
