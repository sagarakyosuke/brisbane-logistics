import { Box } from '@mui/material';

// Sections
import { UrgentDeliveryHeroSection } from '@/pages/case-studies/urgent-delivery/sections/hero';
import { TheResultSection } from '@/pages/case-studies/urgent-delivery/sections/the-result';

// Components
import { CtaBand } from '@/reusables/cta';

// Mock data
import { urgentDeliveryHeroData } from '@/utilities/_mock/case-studies/urgent-delivery/hero';

/* =====================================================================
 * Page
 * ===================================================================== */

const UrgentDeliveryPage = () => {
  return (
    <Box component="main">
      <UrgentDeliveryHeroSection data={urgentDeliveryHeroData} />
      <TheResultSection />
      <CtaBand />
    </Box>
  );
};

export default UrgentDeliveryPage;
