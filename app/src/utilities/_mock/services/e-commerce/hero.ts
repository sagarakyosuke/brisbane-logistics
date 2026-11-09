export interface ECommerceHeroData {
  breadcrumb: {
    parent: string;
    current: string;
  };
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
}

export const eCommerceHeroData: ECommerceHeroData = {
  breadcrumb: {
    parent: 'Services',
    current: 'E-Commerce Fulfilment',
  },
  eyebrow: 'E-Commerce Fulfilment',
  title: 'Your online store.',
  titleAccent: 'Our fulfilment support.',
  description:
    'Receive, store, pick, pack and dispatch your online orders with Brisbane Logistics.',
};
