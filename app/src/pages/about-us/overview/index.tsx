import { Box } from '@mui/material';

// Sections
import { AboutHeroSection } from '@/pages/about-us/overview/sections/hero';

// Components
import { CtaBand } from '@/reusables/cta';

// Mock data
import { aboutHeroData } from '@/utilities/_mock/about-us/hero';

/* =====================================================================
 * Page
 * ===================================================================== */

const AboutOverviewPage = () => {
  return (
    <Box component="main">
      <AboutHeroSection data={aboutHeroData} />

      {/* Body content for About Us will go here */}

      <CtaBand />
    </Box>
  );
};

export default AboutOverviewPage;
