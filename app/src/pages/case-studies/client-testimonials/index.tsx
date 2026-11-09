import { Box } from '@mui/material';

// Sections
import { ClientTestimonialsHeroSection } from '@/pages/case-studies/client-testimonials/sections/hero';
import { ClientFeedbacksSection } from '@/pages/case-studies/client-testimonials/sections/client-feedbacks';
import { MoreClientFeedbacksSection } from '@/pages/case-studies/client-testimonials/sections/more-client-feedbacks';
import { WhyClientsStayWithUsSection } from '@/pages/case-studies/client-testimonials/sections/why-clients-stay-with-us';

// Components
import { CtaBand } from '@/reusables/cta';

// Mock data
import { clientTestimonialsHeroData } from '@/utilities/_mock/case-studies/client-testimonials/hero';

/* =====================================================================
 * Page
 * ===================================================================== */

const ClientTestimonialsPage = () => {
  return (
    <Box component="main">
      <ClientTestimonialsHeroSection data={clientTestimonialsHeroData} />
      <ClientFeedbacksSection />
      <MoreClientFeedbacksSection />
      <WhyClientsStayWithUsSection />
      <CtaBand />
    </Box>
  );
};

export default ClientTestimonialsPage;
