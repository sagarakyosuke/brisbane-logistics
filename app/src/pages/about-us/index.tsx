import { Box } from '@mui/material';

// Sections
import { AboutHeroSection } from '@/pages/about-us/overview/sections/hero';
import { TailoredWarehousingSection } from '@/pages/about-us/overview/sections/tailored-warehousing';
import { WhatWeHandleSection } from '@/pages/about-us/overview/sections/what-we-handle';
import { WhyChooseSection } from '@/pages/about-us/overview/sections/why-choose';
import { ExploreSection } from '@/pages/about-us/overview/sections/explore';

// Components
import { AboutUsTabs } from '@/components/extras/about-us-tabs';
import { CtaBand } from '@/reusables/cta';

// Mock data
import { aboutHeroData } from '@/utilities/_mock/about-us/hero';

/* =====================================================================
 * Page
 * ===================================================================== */

const AboutPage = () => {
  return (
    <Box component="main">
      <AboutHeroSection data={aboutHeroData} />
      <AboutUsTabs />
      <TailoredWarehousingSection />
      <WhatWeHandleSection />
      <WhyChooseSection />
      <ExploreSection />
      <CtaBand />
    </Box>
  );
};

export default AboutPage;
