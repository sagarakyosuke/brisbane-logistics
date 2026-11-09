import aramexLogo from '@/assets/partners/aramex.svg';
import australiaPostLogo from '@/assets/partners/australia-post.svg';
import borderExpressLogo from '@/assets/partners/border-express.svg';
import couriersPleaseLogo from '@/assets/partners/couriers-please.svg';
import fedexExpressLogo from '@/assets/partners/fedex-express.svg';
import tntLogo from '@/assets/partners/tnt.svg';
import type { Partner } from '@/utilities/_mock/home/home';

/* =====================================================================
 * Types
 * ===================================================================== */

export type FreightPartner = Partner;

/* =====================================================================
 * Data
 * ===================================================================== */

export const freightPartners: FreightPartner[] = [
  { name: 'Aramex', type: 'Courier', logo: aramexLogo },
  { name: 'FedEx Express', type: 'Freight', logo: fedexExpressLogo },
  { name: 'TNT', type: 'Freight', logo: tntLogo },
  { name: 'Border Express', type: 'Freight', logo: borderExpressLogo },
  { name: 'CouriersPlease', type: 'Courier', logo: couriersPleaseLogo },
  { name: 'Australia Post', type: 'Parcels', logo: australiaPostLogo },
];
