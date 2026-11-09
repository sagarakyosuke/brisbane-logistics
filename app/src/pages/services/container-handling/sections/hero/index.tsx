import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { AppButton } from '@/components/buttons';
import { SectionEyebrow, SectionWrap } from '@/components/sections';
import { useAnimation } from '@/reusables/animation/use-animation';
import { Breadcrumbs } from '@/reusables/breadcrumbs';
import { palette } from '@/utilities/themes';
import type { ContainerHandlingHeroData } from '@/utilities/_mock/services/container-handling/hero';

/* =====================================================================
 * Types
 * ===================================================================== */

interface ContainerHandlingHeroSectionProps {
  data: ContainerHandlingHeroData;
}

/* =====================================================================
 * Static styles
 * ===================================================================== */

const SECTION_SX: SxProps<Theme> = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  bgcolor: palette.white,
  color: palette.navy,
  // Removed minHeight — this section should size to its content naturally
};

const CONTENT_GRID_SX: SxProps<Theme> = {
  position: 'relative',
  zIndex: 3,
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: '1.1fr 0.9fr' },
  gap: { xs: 5, lg: 7 },
  alignItems: 'center',
  // Reduced padding to match the airy white layout in the screenshot
  pt: { xs: 8, md: 10 },
  pb: { xs: 6, md: 8 },
};

const BREADCRUMBS_WRAPPER_SX: SxProps<Theme> = {
  mb: 2.5,
  '& a, & span, & p': { color: `${palette.muted} !important` },
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

const DESCRIPTION_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  color: palette.muted,
  lineHeight: 1.6,
  mb: 3.5,
  maxWidth: 480,
};

/* ── Right column: image with diagonal accents ────────────────────── */

const IMAGE_COLUMN_SX: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  display: { xs: 'none', lg: 'flex' },
  justifyContent: 'center',
  alignItems: 'center',
};

const IMAGE_FRAME_SX: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  maxWidth: '800px',
  height: '480px',
  borderRadius: '0 24px 24px 0',
  overflow: 'hidden',
  boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  zIndex: 2,
};

const IMAGE_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: '75% center',
  display: 'block',
};

const BLUE_OVERLAY_SX: SxProps<Theme> = {
  position: 'absolute',
  top: '-10%',
  bottom: '-10%',
  left: 0,
  width: '45%',
  bgcolor: 'rgba(55, 89, 138, 0.85)',
  transform: 'skewX(-15deg) translateX(-22%)',
  zIndex: 2,
  borderRight: '2px solid #6295c0',
  pointerEvents: 'none',
  transformOrigin: 'top left',
};

const ORANGE_OVERLAY_SX: SxProps<Theme> = {
  position: 'absolute',
  top: '-10%',
  bottom: '-10%',
  left: 0,
  width: '20%',
  bgcolor: 'transparent',
  borderRight: '14px solid var(--orange)',
  transform: 'skewX(-15deg) translateX(-10%)',
  zIndex: 3,
  pointerEvents: 'none',
  transformOrigin: 'top left',
};

/* =====================================================================
 * ContainerHandlingHeroSection
 * ===================================================================== */

export const ContainerHandlingHeroSection = ({ data }: ContainerHandlingHeroSectionProps) => {
  const { ref, style } = useAnimation({ delay: 100 });

  return (
    <Box
      component="section"
      ref={ref}
      sx={[SECTION_SX, ...(Array.isArray(style) ? style : [style])]}
    >
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
              Get a Container Handling Quote
            </AppButton>
          </Box>

          {/* Right — image with diagonal accents */}
          <Box sx={IMAGE_COLUMN_SX}>
            <Box sx={IMAGE_FRAME_SX}>
              <Box component="img" src={data.image} alt={data.imageAlt} sx={IMAGE_SX} />
              <Box sx={BLUE_OVERLAY_SX} />
              <Box sx={ORANGE_OVERLAY_SX} />
            </Box>
          </Box>
        </Box>
      </SectionWrap>
    </Box>
  );
};
