import { Box } from '@mui/material';
import { CtaBand } from '@/reusables/cta';
import { warehousingHeroData } from '@/utilities/_mock/services/warehousing/hero';
import { WarehousingHeroSection } from '@/pages/services/warehousing/sections/hero';
import { StorageOptionsSection } from '@/pages/services/warehousing/sections/storage-options';

/* =====================================================================
 * Page
 * ===================================================================== */

const WarehousingPage = () => (
  <Box component="main">
    <WarehousingHeroSection data={warehousingHeroData} />
    <StorageOptionsSection />
    <CtaBand />
  </Box>
);

export default WarehousingPage;
