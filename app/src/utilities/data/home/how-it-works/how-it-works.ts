/* =====================================================================
 * Types
 * ===================================================================== */

export interface HeroData {
  /** Rendered with `white-space: pre-line` — `\n` becomes a visual line break. */
  title: string;
  description: string;
}

export interface GettingStartedStep {
  id: string;
  title: string;
  desc: string;
}

export interface GettingStartedData {
  eyebrow: string;
  /** Rendered with `white-space: pre-line` — `\n` becomes a visual line break. */
  title: string;
  description: string;
  notice: string;
  steps: GettingStartedStep[];
}

export type TimelineNodeType = 'kenter' | 'active' | 'brisbane';

export interface SisterCompanyTimelineNode {
  id: string;
  label: string;
  type: TimelineNodeType;
  icon: string;
}

export interface SisterCompanyNotice {
  title: string;
  desc: string;
  linkText: string;
}

export interface SisterCompanyData {
  eyebrow: string;
  /** Rendered with `white-space: pre-line` — `\n` becomes a visual line break. */
  title: string;
  description: string;
  timeline: SisterCompanyTimelineNode[];
  notice: SisterCompanyNotice;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const HERO_DATA: HeroData = {
  title: 'A clear path\nfrom enquiry\nto delivery.',
  description:
    "Start with your business requirements. We'll talk through the services, systems and freight support your operation needs.",
};

export const GETTING_STARTED_DATA: GettingStartedData = {
  eyebrow: 'Getting Started',
  title: 'Build the right\narrangement for\nyour business.',
  description:
    'A simple, collaborative process to understand your needs and put the right services in place.',
  notice: 'The final scope and service arrangements are confirmed for your business.',
  steps: [
    {
      id: '01',
      title: 'Tell us what you need',
      desc: 'Share your products, stock volumes, order flow and delivery requirements.',
    },
    {
      id: '02',
      title: 'Agree the service setup',
      desc: 'Discuss handling instructions, reporting needs and any platform connections.',
    },
    {
      id: '03',
      title: 'Receive and manage your stock',
      desc: 'Arrange receiving, storage, picking, packing or cross docking to suit your operation.',
    },
    {
      id: '04',
      title: 'Coordinate onward delivery',
      desc: 'Plan dispatch and freight arrangements for your customers or delivery locations.',
    },
  ],
};

export const SISTER_COMPANY_DATA: SisterCompanyData = {
  eyebrow: 'Our Sister Company',
  title: 'Meet Kenter\nInternational Logistics.',
  description:
    "Kenter supports international freight forwarding, customs clearance and port transport. Where needed, those services connect with Brisbane Logistics' warehousing, fulfilment and distribution.",
  timeline: [
    { id: '1', label: 'International freight', type: 'kenter', icon: 'ship' },
    { id: '2', label: 'Clearance & port transport', type: 'kenter', icon: 'doc' },
    { id: '3', label: 'Warehouse receiving', type: 'active', icon: 'warehouse' },
    { id: '4', label: 'Storage or fulfilment', type: 'brisbane', icon: 'box' },
    { id: '5', label: 'Customer delivery', type: 'brisbane', icon: 'truck' },
  ],
  notice: {
    title: 'Already have freight arranged?',
    desc: "You can use Brisbane Logistics without Kenter's international freight support.",
    linkText: 'View our services',
  },
};
