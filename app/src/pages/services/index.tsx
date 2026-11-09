import { Box } from '@mui/material';

// Sections
import { ServiceHeroSection } from '@/pages/services/sections/hero';
import { FindTheRightSupportSection } from '@/pages/services/sections/find-the-right-support';
import { CombineServicesSection } from '@/pages/services/sections/combine-services';

// Components
import { CtaBand } from '@/reusables/cta';

// Mock data
import { servicesOverviewHeroData } from '@/utilities/_mock/services/hero';

/* =====================================================================
 * Page
 * ===================================================================== */

const ServicesPage = () => {
  return (
    <Box component="main">
      <ServiceHeroSection data={servicesOverviewHeroData} ctaHref="#services" />
      <FindTheRightSupportSection />
      <CombineServicesSection />
      <CtaBand />
    </Box>
  );
};

export default ServicesPage;
