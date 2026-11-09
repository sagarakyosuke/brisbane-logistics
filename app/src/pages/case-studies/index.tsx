import { Box } from '@mui/material';

// Sections
import { CaseStudiesHeroSection } from '@/pages/case-studies/sections/hero';
import { CaseStudySection } from '@/pages/case-studies/sections/latest-case-studies';
import { PreviousCaseStudiesSection } from '@/pages/case-studies/sections/previous-case-studies';

// Components
import { CtaBand } from '@/reusables/cta';

// Mock data
import { caseStudiesHeroData } from '@/utilities/_mock/case-studies/hero';

/* =====================================================================
 * Page
 * ===================================================================== */

const CaseStudiesPage = () => {
  return (
    <Box component="main">
      <CaseStudiesHeroSection data={caseStudiesHeroData} />
      <CaseStudySection />
      <PreviousCaseStudiesSection />
      <CtaBand />
    </Box>
  );
};

export default CaseStudiesPage;
