import { Box } from '@mui/material';

// Sections
import { GuidesAndTipsHeroSection } from '@/pages/news-and-blogs/guides-and-tips/sections/hero';
import { FeaturedGuideSection } from '@/pages/news-and-blogs/guides-and-tips/sections/featured-guide';
import { BrowseByTopicSection } from '@/pages/news-and-blogs/guides-and-tips/sections/browse-by-topic';
import { PracticalGuidesSection } from '@/pages/news-and-blogs/guides-and-tips/sections/practical-guides';
import { NewsBlogsTabs } from '@/components/extras/news-blogs-tabs';

// Components
import { CtaBand } from '@/reusables/cta';

// Mock data
import { guidesAndTipsHeroData } from '@/utilities/_mock/news-and-blogs/guides-and-tips/hero';

/* =====================================================================
 * Page
 * ===================================================================== */

const GuidesAndTipsPage = () => {
  return (
    <Box component="main">
      <GuidesAndTipsHeroSection data={guidesAndTipsHeroData} />
      <NewsBlogsTabs />
      <FeaturedGuideSection />
      <BrowseByTopicSection />
      <PracticalGuidesSection />
      <CtaBand />
    </Box>
  );
};

export default GuidesAndTipsPage;
