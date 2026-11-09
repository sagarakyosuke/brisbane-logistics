import { Box } from '@mui/material';
import { CtaBand } from '@/reusables/cta';
import { pickAndPackHeroData } from '@/utilities/_mock/services/pick-and-pack-fulfilment/hero';
import { PickAndPackHeroSection } from './sections/hero';
import { NeedOnlineStoreSection } from './sections/need-online-store/need-online-store';
import { QuotationSection } from './sections/quotation';

/* =====================================================================
 * Page
 * ===================================================================== */

const PickAndPackPage = () => (
  <Box component="main">
    <PickAndPackHeroSection data={pickAndPackHeroData} />
    <QuotationSection />
    <NeedOnlineStoreSection />
    <CtaBand />
  </Box>
);

export default PickAndPackPage;
