/* =====================================================================
 * Types
 * ===================================================================== */

export interface WmsPartner {
  name: string;
  description: string;
  note: string;
}

export interface WmsPartnerData {
  eyebrow: string;
  /** Rendered on its own line — the consumer renders `titleLine1`, `<br />`, `titleLine2`. */
  titleLine1: string;
  /** Rendered on its own line, with the orange accent color. */
  titleLine2: string;
  description: string;
  /** Label for the CTA button. */
  cta: string;
  partner: WmsPartner;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const WMS_PARTNER_DATA: WmsPartnerData = {
  eyebrow: 'Warehouse Management',
  titleLine1: 'A clearer view',
  titleLine2: 'of your stock.',
  description: 'Talk to us about stock visibility and warehouse reporting for your business.',
  cta: 'Discuss your systems',
  partner: {
    name: 'CartonCloud',
    description:
      'We use CartonCloud as our warehouse management system (WMS) to help manage stock, orders and reporting.',
    note: 'Integration requirements are confirmed per business.',
  },
};
