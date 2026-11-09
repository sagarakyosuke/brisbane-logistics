import { Box } from '@mui/material';
import { CtaBand } from '@/reusables/cta';
import { transportHeroData } from '@/utilities/_mock/services/transport-and-distribution/hero';
import { TransportHeroSection } from './sections/hero';
import { OurTransportDistributionSection } from './sections/our-transport-distribution';

/* =====================================================================
 * Page
 * ===================================================================== */

const TransportAndDistributionPage = () => (
  <Box component="main">
    <TransportHeroSection data={transportHeroData} />
    <OurTransportDistributionSection />
    <CtaBand />
  </Box>
);

export default TransportAndDistributionPage;
