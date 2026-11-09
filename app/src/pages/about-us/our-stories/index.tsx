import { Box } from '@mui/material';

// Sections
import { OurStoryHeroSection } from '@/pages/about-us/our-stories/sections/hero';
import { OurBeginningsSection } from '@/pages/about-us/our-stories/sections/our-beginnings';
import { KeyMomentsSection } from '@/pages/about-us/our-stories/sections/key-moments';
import { PerspectiveFromOurPeopleSection } from '@/pages/about-us/our-stories/sections/perspective-from-our-people';

// Components
import { AboutUsTabs } from '@/components/extras/about-us-tabs';
import { CtaBand } from '@/reusables/cta';

// Mock data
import { ourStoryHeroData } from '@/utilities/_mock/about-us/our-stories/hero';

/* =====================================================================
 * Page
 * ===================================================================== */

const OurStoryPage = () => {
  return (
    <Box component="main">
      <OurStoryHeroSection data={ourStoryHeroData} />
      <AboutUsTabs />
      <OurBeginningsSection />
      <KeyMomentsSection />
      <PerspectiveFromOurPeopleSection />
      <CtaBand />
    </Box>
  );
};

export default OurStoryPage;
