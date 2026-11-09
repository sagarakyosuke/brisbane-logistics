import { Box } from '@mui/material';

// Sections
import { HeroSection } from '@/pages/home/integration-partners/hero';
import { WarehouseManagementSection } from '@/pages/home/integration-partners/sections/warehouse-management';
import { IntegrationPartnersSection } from '@/pages/home/integration-partners/sections/integration-partners';
import { FreightPartnersSection } from '@/pages/home/integration-partners/sections/freight-partners';
import { CtaBand } from '@/reusables/cta';

const IntegrationPartners = () => {
  return (
    <Box component="main">
      <HeroSection />
      <WarehouseManagementSection />
      <IntegrationPartnersSection />
      <FreightPartnersSection />
      <CtaBand />
    </Box>
  );
};

export default IntegrationPartners;
