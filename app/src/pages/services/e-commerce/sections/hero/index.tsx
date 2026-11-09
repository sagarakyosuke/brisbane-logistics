import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { AppButton } from '@/components/buttons';
import { SectionEyebrow, SectionWrap } from '@/components/sections';
import { useAnimation } from '@/reusables/animation/use-animation';
import { Breadcrumbs } from '@/reusables/breadcrumbs';
import { TransferBoxes } from '@/components/extras/transfer-boxes';
import { palette } from '@/utilities/themes';
import type { ECommerceHeroData } from '@/utilities/_mock/services/e-commerce/hero';

/* =====================================================================
 * Types
 * ===================================================================== */

interface ECommerceHeroSectionProps {
  data: ECommerceHeroData;
}

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Section shell ────────────────────────────────────────────────── */

const SECTION_SX: SxProps<Theme> = {
  bgcolor: palette.peach,
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  minHeight: { xs: '80svh', md: 'clamp(500px, 70vh, 700px)' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const CONTENT_GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: '1.1fr 0.9fr' },
  gap: { xs: 5, lg: 7 },
  alignItems: 'center',
  pt: { xs: 9, md: 11 },
  pb: { xs: 8, md: 10 },
};

/* ── Left column: text ────────────────────────────────────────────── */

const BREADCRUMBS_WRAPPER_SX: SxProps<Theme> = {
  mb: 2.5,
  '& a, & span, & p': { color: `${palette.navy} !important` },
  '& a:hover': { color: `${palette.orange} !important` },
};

const EYEBROW_WRAPPER_SX: SxProps<Theme> = { mb: 1.5 };

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
  fontWeight: 900,
  lineHeight: 1.1,
  letterSpacing: '-0.03em',
  color: palette.navy,
  mb: 2.5,
};

const TITLE_ACCENT_SX: SxProps<Theme> = {
  display: 'block',
  color: palette.orange,
};

const DESCRIPTION_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  color: palette.muted,
  lineHeight: 1.6,
  mb: 3.5,
  maxWidth: 480,
};

/* =====================================================================
 * ECommerceHeroSection
 * ===================================================================== */

export const ECommerceHeroSection = ({ data }: ECommerceHeroSectionProps) => {
  const { ref, style } = useAnimation({ delay: 100 });

  return (
    <Box
      component="section"
      ref={ref}
      sx={[SECTION_SX, ...(Array.isArray(style) ? style : [style])]}
    >
      <SectionWrap>
        <Box sx={CONTENT_GRID_SX}>
          {/* Left — Text Content */}
          <Box>
            <Box sx={BREADCRUMBS_WRAPPER_SX}>
              <Breadcrumbs />
            </Box>

            <Box sx={EYEBROW_WRAPPER_SX}>
              <SectionEyebrow>{data.eyebrow}</SectionEyebrow>
            </Box>

            <Typography component="h1" sx={TITLE_SX}>
              {data.title}
              <Box component="span" sx={TITLE_ACCENT_SX}>
                {data.titleAccent}
              </Box>
            </Typography>

            <Typography sx={DESCRIPTION_SX}>{data.description}</Typography>

            <AppButton color="primary" size="large" endIcon={<ArrowForward />}>
              Get an E-Commerce Quote
            </AppButton>
          </Box>

          {/* Right — Animated Illustration */}
          <TransferBoxes />
        </Box>
      </SectionWrap>
    </Box>
  );
};
