import { Box } from '@mui/material';

// Sections
import { OurTeamHeroSection } from '@/pages/about-us/our-teams/sections/hero';
import { MeetOurTeamSection } from '@/pages/about-us/our-teams/sections/meet-our-team';
import { SeeTheTeamAtWorkSection } from '@/pages/about-us/our-teams/sections/see-the-team-at-work';
import { RelatedPagesSection } from '@/pages/about-us/our-teams/sections/related-pages';

// Components
import { AboutUsTabs } from '@/components/extras/about-us-tabs';
import { CtaBand } from '@/reusables/cta';

// Mock data
import { ourTeamHeroData } from '@/utilities/_mock/about-us/our-team/hero';

/* =====================================================================
 * Page
 * ===================================================================== */

const OurTeamPage = () => {
  return (
    <Box component="main">
      <OurTeamHeroSection data={ourTeamHeroData} />
      <AboutUsTabs />
      <MeetOurTeamSection />
      <SeeTheTeamAtWorkSection />
      <RelatedPagesSection />
      <CtaBand />
    </Box>
  );
};

export default OurTeamPage;
