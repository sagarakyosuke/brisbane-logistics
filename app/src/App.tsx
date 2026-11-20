import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router';
import { Layout } from '@/components/layout';
import { OverlayLoader } from '@/components/extras/overlay-loader';
import { showError } from '@/components/dialogs/alerts';
import { apiSlice } from '@/utilities/hooks/api/slice';
import type { RootState, AppDispatch } from '@/utilities/store';

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

  const parentPath = Object.keys(PAGE_TITLES)
    .sort((a, b) => b.length - a.length)
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
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, isError } = useSelector((state: RootState) => {
    const queries = Object.values(state.api.queries);

    return {
      isLoading: queries.some((query) => query?.status === 'pending'),
      isError: queries.some((query) => query?.status === 'rejected'),
    };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = getTitle(pathname);
  }, [pathname]);

  useEffect(() => {
    if (!isError || isLoading) return;

    showError({
      title: 'Failed to load data',
      text: 'We could not connect to the server. Please check your connection and try again.',
      confirmText: 'Dismiss',
      onRetry: () => {
        dispatch(apiSlice.util.invalidateTags(['CaseStudies', 'NewsBlogs', 'Faqs', 'AboutUs']));
      },
    });
  }, [isError, isLoading, dispatch]);

  return (
    <>
      <OverlayLoader open={isLoading} />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

/* =====================================================================
 * Main App Component
 * ===================================================================== */

const App = () => <AppLayout />;

export default App;
