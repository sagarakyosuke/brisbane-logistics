// src/pages/case-studies/client-testimonials/sections/hero/index.tsx

import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { SectionEyebrow, SectionWrap } from '@/components/sections';
import { useAnimation } from '@/reusables/animation/use-animation';
import { Breadcrumbs } from '@/reusables/breadcrumbs';
import { palette } from '@/utilities/themes';
import type { ClientTestimonialsHeroData } from '@/utilities/_mock/case-studies/client-testimonials/hero';

/* =====================================================================
 * Types
 * ===================================================================== */

interface ClientTestimonialsHeroSectionProps {
  data: ClientTestimonialsHeroData;
}

/* =====================================================================
 * Static styles
 * ===================================================================== */

const SECTION_SX: SxProps<Theme> = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  minHeight: { xs: '40svh', md: 'clamp(280px, 32vh, 400px)' },
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

/** Large decorative quote mark in the top-right of the hero. */
const QUOTE_GRAPHIC_SX: SxProps<Theme> = {
  position: 'absolute',
  top: '15%',
  right: '5%',
  zIndex: 2,
  fontSize: '12rem',
  fontWeight: 900,
  lineHeight: 1,
  color: 'rgba(255,255,255,0.05)',
  userSelect: 'none',
  pointerEvents: 'none',
};

const GRADIENT_OVERLAY_SX: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  zIndex: 2,
  pointerEvents: 'none',
  background: `linear-gradient(90deg, ${palette.navyDeep} 0%, ${palette.navyDeep} 40%, transparent 100%)`,
};

const CONTENT_WRAPPER_SX: SxProps<Theme> = {
  position: 'relative',
  zIndex: 3,
  pt: { xs: 8, md: 10 },
  pb: { xs: 8, md: 10 },
};

/* ── Text content ─────────────────────────────────────────────────── */

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
  maxWidth: 480,
};

/* =====================================================================
 * ClientTestimonialsHeroSection
 * ===================================================================== */

export const ClientTestimonialsHeroSection = ({ data }: ClientTestimonialsHeroSectionProps) => {
  const { ref, style } = useAnimation({ delay: 100 });

  return (
    <Box
      component="section"
      ref={ref}
      sx={[SECTION_SX, ...(Array.isArray(style) ? style : [style])]}
    >
      <Box sx={STRIPES_SX} />
      <Box sx={GRADIENT_OVERLAY_SX} />

      {/* Decorative quote mark */}
      <Box component="span" aria-hidden sx={QUOTE_GRAPHIC_SX}>
        &rdquo;
      </Box>

      <SectionWrap>
        <Box sx={CONTENT_WRAPPER_SX}>
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
        </Box>
      </SectionWrap>
    </Box>
  );
};
