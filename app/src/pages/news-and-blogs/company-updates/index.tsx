import { Box } from '@mui/material';

// Sections
import { CompanyUpdatesHeroSection } from '@/pages/news-and-blogs/company-updates/sections/hero';
import { CompanyUpdatesSection } from '@/pages/news-and-blogs/company-updates/sections/update-lists';
import { NewsBlogsTabs } from '@/components/extras/news-blogs-tabs';

// Components
import { CtaBand } from '@/reusables/cta';

// Mock data
import { companyUpdatesHeroData } from '@/utilities/_mock/news-and-blogs/company-updates/hero';

/* =====================================================================
 * Page
 * ===================================================================== */

const CompanyUpdatesPage = () => {
  return (
    <Box component="main">
      <CompanyUpdatesHeroSection data={companyUpdatesHeroData} />
      <NewsBlogsTabs />
      <CompanyUpdatesSection />
      <CtaBand />
    </Box>
  );
};

export default CompanyUpdatesPage;
