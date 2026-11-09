import { createBrowserRouter } from 'react-router';

// Layout
import App from '@/App';

// ── Pages ────────────────────────────────────────────────────────────
import Home from '@/pages/home';
import HowItWorks from '@/pages/home/how-it-works';
import IntegrationPartners from '@/pages/home/integration-partners';

import ServicesPage from '@/pages/services';
import WarehousingPage from '@/pages/services/warehousing';
import CrossDockingPage from '@/pages/services/cross-docking';
import TransportAndDistributionPage from '@/pages/services/transport-and-distribution';
import PickAndPackPage from '@/pages/services/pick-and-pack-fulfilment';
import ECommercePage from '@/pages/services/e-commerce';
import ContainerHandlingPage from '@/pages/services/container-handling';

import CaseStudiesPage from '@/pages/case-studies';
import ClientTestimonialsPage from '@/pages/case-studies/client-testimonials';
import UrgentDeliveryPage from '@/pages/case-studies/urgent-delivery';

import NewsAndBlogsPage from '@/pages/news-and-blogs';
import CompanyUpdatesPage from '@/pages/news-and-blogs/company-updates';
import GuidesAndTipsPage from '@/pages/news-and-blogs/guides-and-tips';

import FaqsPage from '@/pages/faqs';

import AboutPage from '@/pages/about-us';
import OurStoryPage from '@/pages/about-us/our-stories';
import OurTeamPage from '@/pages/about-us/our-teams';
import WarehouseGalleryPage from '@/pages/about-us/warehouse-teams';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      // ── Home ──
      { index: true, Component: Home },
      { path: 'home/how-it-works', Component: HowItWorks },
      { path: 'home/integration-partners', Component: IntegrationPartners },

      // ── Services ──
      { path: 'services', Component: ServicesPage },
      { path: 'services/warehousing', Component: WarehousingPage },
      { path: 'services/cross-docking', Component: CrossDockingPage },
      { path: 'services/transport', Component: TransportAndDistributionPage },
      { path: 'services/pick-and-pack', Component: PickAndPackPage },
      { path: 'services/ecommerce', Component: ECommercePage },
      { path: 'services/container-handling', Component: ContainerHandlingPage },

      // ── Case Studies ──
      { path: 'case-studies', Component: CaseStudiesPage },
      { path: 'case-studies/testimonials', Component: ClientTestimonialsPage },
      { path: 'case-studies/urgent-delivery', Component: UrgentDeliveryPage },

      // ── News & Blogs ──
      { path: 'news', Component: NewsAndBlogsPage },
      { path: 'news/company', Component: CompanyUpdatesPage },
      { path: 'news/guides', Component: GuidesAndTipsPage },

      // ── FAQs ──
      { path: 'faqs', Component: FaqsPage },

      // ── About Us ──
      { path: 'about', Component: AboutPage },
      { path: 'about/our-story', Component: OurStoryPage },
      { path: 'about/team', Component: OurTeamPage },
      { path: 'about/gallery', Component: WarehouseGalleryPage },
    ],
  },
]);
