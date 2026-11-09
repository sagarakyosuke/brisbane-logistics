import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import boxesImage from '@/assets/icons/boxes.png';
import { AppButton } from '@/components/buttons';
import { SectionEyebrow, SectionWrap } from '@/components/sections';
import { useAnimation } from '@/reusables/animation/use-animation';
import { Breadcrumbs } from '@/reusables/breadcrumbs';
import { palette } from '@/utilities/themes';
import type { PickAndPackHeroData } from '@/utilities/_mock/services/pick-and-pack-fulfilment/hero';

/* =====================================================================
 * Types
 * ===================================================================== */

interface PickAndPackHeroSectionProps {
  data: PickAndPackHeroData;
}

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Section shell ────────────────────────────────────────────────── */

const SECTION_SX: SxProps<Theme> = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  minHeight: { xs: '80svh', md: 'clamp(500px, 70vh, 700px)' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  bgcolor: palette.navyDeep,
  color: palette.white,
};

const STRIPES_SX: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  opacity: 0.1,
  background: `repeating-linear-gradient(45deg, transparent, transparent 40px, ${palette.white} 40px, ${palette.white} 80px)`,
};

const GRADIENT_OVERLAY_SX: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  zIndex: 2,
  pointerEvents: 'none',
  background: `linear-gradient(90deg, ${palette.navyDeep} 0%, ${palette.navyDeep} 40%, transparent 100%)`,
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

/* ── Right column: illustration ───────────────────────────────────── */

const ILLUSTRATION_COLUMN_SX: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  display: { xs: 'none', lg: 'flex' },
  justifyContent: 'center',
  alignItems: 'center',
};

const ILLUSTRATION_FRAME_SX: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  maxWidth: '480px',
  height: '480px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const ILLUSTRATION_IMG_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
};

/* =====================================================================
 * PickAndPackHeroSection
 * ===================================================================== */

export const PickAndPackHeroSection = ({ data }: PickAndPackHeroSectionProps) => {
  const { ref, style } = useAnimation({ delay: 100 });

  return (
    <Box
      component="section"
      ref={ref}
      sx={[SECTION_SX, ...(Array.isArray(style) ? style : [style])]}
    >
      <Box sx={STRIPES_SX} />
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
              Get a Pick & Pack Quote
            </AppButton>
          </Box>

          {/* Right — illustration */}
          <Box sx={ILLUSTRATION_COLUMN_SX}>
            <Box sx={ILLUSTRATION_FRAME_SX}>
              <Box
                component="img"
                src={boxesImage}
                alt="Cardboard boxes illustration"
                sx={ILLUSTRATION_IMG_SX}
              />
            </Box>
          </Box>
        </Box>
      </SectionWrap>
    </Box>
  );
};
