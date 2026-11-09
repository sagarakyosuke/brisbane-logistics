import { Box } from '@mui/material';
import { CtaBand } from '@/reusables/cta';
import { GettingStartedSection } from './sections/getting-started';
import { SisterCompanySection } from './sections/sister-company';
import { HeroSection } from './hero';

/* =====================================================================
 * Page
 * ===================================================================== */

const HowItWorksPage = () => (
  <Box component="main">
    <HeroSection />
    <GettingStartedSection />
    <SisterCompanySection />
    <CtaBand />
  </Box>
);

export default HowItWorksPage;
