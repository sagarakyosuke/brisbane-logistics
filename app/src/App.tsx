import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Layout } from '@/components/layout';
import { OverlayLoader } from '@/components/extras/overlay-loader';
import { useApi } from '@/routes/api-routing/api-context';
import { ApiProvider } from '@/routes/api-routing/useApiRouting';

/* =====================================================================
 * Title Configuration
 * ===================================================================== */

const PAGE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/home/how-it-works': 'How It Works',
  '/home/integration-partners': 'Integration Partners',
  '/services': 'Services',
  '/services/warehousing': 'Warehousing',
  '/services/cross-docking': 'Cross Docking',
  '/services/transport': 'Transport & Distribution',
  '/services/pick-and-pack': 'Pick & Pack Fulfilment',
  '/services/ecommerce': 'E-Commerce',
  '/services/container-handling': 'Container Handling',
  '/case-studies': 'Case Studies',
  '/case-studies/testimonials': 'Client Testimonials',
  '/case-studies/urgent-delivery': 'Urgent Delivery',
  '/news': 'News & Blogs',
  '/news/company': 'Company Updates',
  '/news/guides': 'Guides & Tips',
  '/faqs': 'FAQs',
  '/about': 'About Us',
  '/about/our-story': 'Our Story',
  '/about/team': 'Our Team',
  '/about/gallery': 'Warehouse Gallery',
};

const APP_NAME = 'Brisbane Logistics';

const getTitle = (pathname: string): string => {
  if (PAGE_TITLES[pathname]) {
    return `${PAGE_TITLES[pathname]} | ${APP_NAME}`;
  }

  // Fallback to the closest parent path if no exact match
  const parentPath = Object.keys(PAGE_TITLES)
    .sort((a, b) => b.length - a.length) // longest path first
    .find((path) => path !== '/' && pathname.startsWith(path));

  if (parentPath) {
    return `${PAGE_TITLES[parentPath]} | ${APP_NAME}`;
  }

  return APP_NAME;
};

/* =====================================================================
 * Inner Layout Wrapper
 * ===================================================================== */

const AppLayout = () => {
  const { pathname } = useLocation();
  const { isLoading: isApiLoading } = useApi();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = getTitle(pathname);
  }, [pathname]);

  return (
    <>
      <OverlayLoader open={isApiLoading} />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

/* =====================================================================
 * Main App Component
 * ===================================================================== */

const App = () => {
  return (
    <ApiProvider>
      <AppLayout />
    </ApiProvider>
  );
};

export default App;
