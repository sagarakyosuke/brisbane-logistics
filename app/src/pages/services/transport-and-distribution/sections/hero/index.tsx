import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { AppButton } from '@/components/buttons';
import { SectionEyebrow, SectionWrap } from '@/components/sections';
import { useAnimation } from '@/reusables/animation/use-animation';
import { Breadcrumbs } from '@/reusables/breadcrumbs';
import { palette } from '@/utilities/themes';
import type { TransportHeroData } from '@/utilities/_mock/services/transport-and-distribution/hero';

/* =====================================================================
 * Types
 * ===================================================================== */

interface TransportHeroSectionProps {
  data: TransportHeroData;
}

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Section shell ────────────────────────────────────────────────── */

const SECTION_SX: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  minHeight: { xs: '80svh', md: 'clamp(500px, 70vh, 700px)' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  bgcolor: palette.navyDeep,
  color: palette.white,
};

const BG_IMAGE_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: { xs: 'center center', md: 'center right' },
  backgroundRepeat: 'no-repeat',
  transform: { xs: 'scale(1.05)', md: 'scale(1.3)' },
  zIndex: 0,
};

/**
 * Two gradient variants — vertical on mobile (text sits over the image),
 * horizontal on desktop (image is offset to the right).
 */
const GRADIENT_OVERLAY_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: {
    xs: `linear-gradient(0deg, ${palette.navyDeep} 0%, rgba(18, 26, 87, 0.6) 100%)`,
    md: `linear-gradient(90deg, ${palette.navyDeep} 0%, rgba(18, 26, 87, 0.85) 40%, rgba(18, 26, 87, 0) 100%)`,
  },
  zIndex: 1,
};

const CONTENT_GRID_SX: SxProps<Theme> = {
  position: 'relative',
  zIndex: 3,
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: '1.1fr 0.9fr' },
  gap: { xs: 5, lg: 7 },
  alignItems: 'center',
  pt: { xs: 9, md: 11 },
  pb: { xs: 8, md: 10 },
};

/* ── Left column: text ────────────────────────────────────────────── */

const BREADCRUMBS_WRAPPER_SX: SxProps<Theme> = { mb: 2.5 };
const EYEBROW_WRAPPER_SX: SxProps<Theme> = { mb: 1.5 };

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
  fontWeight: 900,
  lineHeight: 1.1,
  letterSpacing: '-0.03em',
  mb: 2.5,
};

const DESCRIPTION_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  color: palette.mist,
  lineHeight: 1.6,
  mb: 3.5,
  maxWidth: 480,
};

/* ── Right column: placeholder ────────────────────────────────────── */

/** Empty grid cell — reserves the right half of the split so the text column width matches sibling heroes. */
const PLACEHOLDER_COLUMN_SX: SxProps<Theme> = { display: { xs: 'none', lg: 'block' } };

/* =====================================================================
 * TransportHeroSection
 * ===================================================================== */

export const TransportHeroSection = ({ data }: TransportHeroSectionProps) => {
  const { ref, style } = useAnimation({ delay: 100 });

  return (
    <Box
      component="section"
      ref={ref}
      sx={[SECTION_SX, ...(Array.isArray(style) ? style : [style])]}
    >
      <Box
        sx={{
          ...BG_IMAGE_SX,
          backgroundImage: `url(${data.image})`,
        }}
      />
      <Box sx={GRADIENT_OVERLAY_SX} />

      <SectionWrap>
        <Box sx={CONTENT_GRID_SX}>
          {/* Left — text content */}
          <Box>
            <Box sx={BREADCRUMBS_WRAPPER_SX}>
              <Breadcrumbs />
            </Box>

            <Box sx={EYEBROW_WRAPPER_SX}>
              <SectionEyebrow>{data.eyebrow}</SectionEyebrow>
            </Box>

            <Typography component="h1" sx={TITLE_SX}>
              {data.title}
            </Typography>

            <Typography sx={DESCRIPTION_SX}>{data.description}</Typography>

            <AppButton color="primary" size="large" endIcon={<ArrowForward />} href="#quote">
              Get a Transport Quote
            </AppButton>
          </Box>

          {/* Right — reserved placeholder for grid balance */}
          <Box sx={PLACEHOLDER_COLUMN_SX} />
        </Box>
      </SectionWrap>
    </Box>
  );
};
