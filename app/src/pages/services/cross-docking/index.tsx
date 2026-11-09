import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { AppButton } from '@/components/buttons';
import { Section, SectionEyebrow, SectionWrap } from '@/components/sections';
import { Breadcrumbs } from '@/reusables/breadcrumbs';
import { CtaBand } from '@/reusables/cta';
import { HowCrossDockingWorksSection } from './sections/how-cross-docking-works';
import { NeedStockSection } from './sections/need-stock';
import { WhyConsiderCrossDockingSection } from './sections/why-consider-cross-docking';
import { crossDockingHeroData } from '@/utilities/_mock/services/cross-docking/cross-docking';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const HERO_SECTION_SX: SxProps<Theme> = {
  pt: { xs: 14, md: 18 },
  pb: { xs: 12, md: 16 },
  textAlign: 'center',
};

const HERO_COLUMN_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '800px',
  mx: 'auto',
};

const BREADCRUMB_OVERRIDE_SX: SxProps<Theme> = {
  mb: 3,
  display: 'flex',
  justifyContent: 'center',
  '& a, & span, & p': { color: 'var(--muted) !important' },
  '& a:hover': { color: 'var(--navy) !important' },
};

const EYEBROW_WRAPPER_SX: SxProps<Theme> = { mb: 2 };

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
  fontWeight: 900,
  lineHeight: 1.05,
  letterSpacing: '-0.03em',
  mb: 3,
  color: 'var(--navy)',
};

const DESCRIPTION_SX: SxProps<Theme> = {
  fontSize: '1.15rem',
  color: 'var(--muted)',
  lineHeight: 1.6,
  mb: 5,
  maxWidth: '600px',
};

const CTA_OVERRIDE_SX: SxProps<Theme> = { px: 4, py: 1.5 };

/* =====================================================================
 * Page
 * ===================================================================== */

const CrossDockingPage = () => (
  <Box component="main">
    {/* Hero */}
    <Section sx={HERO_SECTION_SX}>
      <SectionWrap>
        <Box sx={HERO_COLUMN_SX}>
          <Box sx={BREADCRUMB_OVERRIDE_SX}>
            <Breadcrumbs />
          </Box>

          <Box sx={EYEBROW_WRAPPER_SX}>
            <SectionEyebrow>{crossDockingHeroData.eyebrow}</SectionEyebrow>
          </Box>

          <Typography component="h1" sx={TITLE_SX}>
            {crossDockingHeroData.title}
          </Typography>

          <Typography sx={DESCRIPTION_SX}>{crossDockingHeroData.description}</Typography>

          <AppButton
            color="primary"
            size="large"
            endIcon={<ArrowForward />}
            href="#quote"
            sx={CTA_OVERRIDE_SX}
          >
            Get a Cross Docking Quote
          </AppButton>
        </Box>
      </SectionWrap>
    </Section>

    {/* Content sections */}
    <HowCrossDockingWorksSection />
    <WhyConsiderCrossDockingSection />
    <NeedStockSection />

    {/* Page CTA */}
    <CtaBand />
  </Box>
);

export default CrossDockingPage;
