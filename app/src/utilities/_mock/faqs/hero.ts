export type FaqsHeroData = {
  eyebrow: string;
  title: string;
  highlightTitle: string;
  description: string;
  searchPlaceholder: string;
};

export const faqsHeroData: FaqsHeroData = {
  eyebrow: 'FAQs',
  title: 'Your logistics questions, answered',
  highlightTitle: 'answered.', // The orange period/dot is handled in the component
  description:
    'Find answers about storage, fulfilment, deliveries and getting started with Brisbane Logistics.',
  searchPlaceholder: 'Search questions, e.g. Shopify, pallet storage or delivery',
};
