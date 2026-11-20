/* =====================================================================
 * Types
 * ===================================================================== */

export interface HeroData {
  title: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  title: string;
  desc: string;
  points: string[];
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const HERO_DATA: HeroData = {
  title: 'A clear path\nfrom enquiry\nto delivery.',
  description:
    "Start with your business requirements. We'll talk through the services, systems and freight support your operation needs.",
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'enquiry',
    title: 'Enquiry & planning',
    desc: "Start with your business requirements. We'll talk through the services, systems and freight support your operation needs.",
    points: ['Initial consultation', 'Site tour & assessment', 'Tailored 3PL proposal'],
  },
  {
    id: 'storage',
    title: 'Storage & fulfilment',
    desc: 'Our team onboards your stock into our warehouse. We set up the systems, processes and integrations tailored to your business.',
    points: ['Seamless stock transfer', 'System integration', 'Quality checks & tracking'],
  },
  {
    id: 'delivery',
    title: 'Delivery to your customers',
    desc: 'Orders are picked, packed and dispatched. Our carriers handle the last mile, getting your products to customers safely and on time.',
    points: ['Efficient pick & pack', 'National freight network', 'Live tracking & updates'],
  },
];
