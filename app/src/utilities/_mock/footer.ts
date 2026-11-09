/* =====================================================================
 * Types
 * ===================================================================== */

export interface FooterLink {
  label: string;
  /** Internal path (use with <Link>, not <a href>) */
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterContact {
  phone: string;
  email: string;
  location: string;
}

/* =====================================================================
 * Links
 * ===================================================================== */

export const footerLinks: FooterColumn[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'How It Works', href: '/how-it-works' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'News & Blogs', href: '/news' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'About Us', href: '/about' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Warehousing', href: '/services/warehousing' },
      { label: 'Pick & Pack', href: '/services/pick-and-pack' },
      { label: 'Cross Docking', href: '/services/cross-docking' },
      { label: 'E-Commerce Fulfilment', href: '/services/ecommerce' },
      { label: 'Transport & Distribution', href: '/services/transport' },
      { label: 'Container Handling', href: '/services/container-handling' },
    ],
  },
];

/* =====================================================================
 * Contact
 * ===================================================================== */

export const footerContact: FooterContact = {
  phone: '07 3348 2100',
  email: 'sales@brisbanelogistics.com.au',
  location: 'Brisbane, Queensland',
};
