import { Box } from '@mui/material';
import { CtaBand } from '@/reusables/cta';
import { containerHandlingHeroData } from '@/utilities/_mock/services/container-handling/hero';
import { ContainerHandlingHeroSection } from '@/pages/services/container-handling/sections/hero';
import { ContainerHandlingSection } from '@/pages/services/container-handling/sections/container-handling';
import { NextStepsSection } from '@/pages/services/container-handling/sections/next-steps';

const ContainerHandlingPage = () => (
  <Box component="main">
    <ContainerHandlingHeroSection data={containerHandlingHeroData} />
    <ContainerHandlingSection />
    <NextStepsSection />
    <CtaBand />
  </Box>
);

export default ContainerHandlingPage;
