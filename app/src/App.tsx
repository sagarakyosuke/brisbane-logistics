import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { Layout } from '@/components/layout';
import { OverlayLoader } from '@/components/extras/overlay-loader';
import { useApi } from '@/routes/api-routing/api-context';

const App = () => {
  const { pathname } = useLocation();

  const { isLoading: isApiLoading } = useApi();

  useEffect(() => {
    window.scrollTo(0, 0);
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

export default App;
