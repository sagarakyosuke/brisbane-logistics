import { Box } from '@mui/material';

// Sections
import { WarehouseGalleryHeroSection } from '@/pages/about-us/warehouse-teams/sections/hero';
import { WarehousesGallerySection } from '@/pages/about-us/warehouse-teams/sections/warehouses-gallery';
import { WarehouseDetailsSection } from '@/pages/about-us/warehouse-teams/sections/warehouse-details';

// Components
import { AboutUsTabs } from '@/components/extras/about-us-tabs';
import { CtaBand } from '@/reusables/cta';

// Mock data
import { warehouseGalleryHeroData } from '@/utilities/_mock/about-us/warehouse-team/hero';

/* =====================================================================
 * Page
 * ===================================================================== */

const WarehouseGalleryPage = () => {
  return (
    <Box component="main">
      <WarehouseGalleryHeroSection data={warehouseGalleryHeroData} />
      <AboutUsTabs />
      <WarehousesGallerySection />
      <WarehouseDetailsSection />
      <CtaBand />
    </Box>
  );
};

export default WarehouseGalleryPage;
