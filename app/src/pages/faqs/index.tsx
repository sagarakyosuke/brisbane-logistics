import { Box } from '@mui/material';

// Sections
import { FaqsHeroSection } from '@/pages/faqs/sections/hero';
import { WhatDoYouNeedSection } from '@/pages/faqs/sections/what-do-you-need';
import { UsefulGuideSection } from '@/pages/faqs/sections/useful-guide';

// Components
import { CtaBand } from '@/reusables/cta';

/* =====================================================================
 * Page
 * ===================================================================== */

const FaqsPage = () => {
  return (
    <Box component="main">
      <FaqsHeroSection />
      <WhatDoYouNeedSection />
      <UsefulGuideSection />
      <CtaBand />
    </Box>
  );
};

export default FaqsPage;
