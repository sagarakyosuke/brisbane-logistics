import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { SectionEyebrow, SectionWrap } from '@/components/sections';
import { useAnimation } from '@/reusables/animation/use-animation';
import { Breadcrumbs } from '@/reusables/breadcrumbs';
import { palette, shadows } from '@/utilities/themes';
import type { UrgentDeliveryHeroData } from '@/utilities/_mock/case-studies/urgent-delivery/hero';

/* =====================================================================
 * Types
 * ===================================================================== */

interface UrgentDeliveryHeroSectionProps {
  data: UrgentDeliveryHeroData;
}

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Hero Shell ───────────────────────────────────────────────────── */

const SECTION_SX: SxProps<Theme> = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  minHeight: { xs: 'auto', md: 'clamp(320px, 38vh, 460px)' },
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
  gridTemplateColumns: { xs: '1fr', md: '1.2fr auto' },
  alignItems: 'center',
  gap: 4,
  pt: { xs: 8, md: 10 },
  pb: { xs: 8, md: 10 },
};

/* ── Text Content ─────────────────────────────────────────────────── */

const TEXT_COLUMN_SX: SxProps<Theme> = { maxWidth: 640 };

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

/* ── Icon ─────────────────────────────────────────────────────────── */

const ICON_COLUMN_SX: SxProps<Theme> = {
  display: { xs: 'none', md: 'flex' },
  justifyContent: 'flex-end',
  alignItems: 'center',
};

const ICON_IMG_SX: SxProps<Theme> = {
  width: { md: 240, lg: 320 },
  height: 'auto',
  objectFit: 'contain',
  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))',
  animation: 'bob 4s ease-in-out infinite',
  '@keyframes bob': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-15px)' },
  },
};

/* ── Facts Bar ────────────────────────────────────────────────────── */

const FACTS_BAR_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
  bgcolor: palette.white,
  borderRadius: '16px',
  boxShadow: shadows.base,
  border: `1px solid ${palette.line}`,
  overflow: 'hidden',
  mt: { xs: '-40px', md: '-60px' },
  position: 'relative',
  zIndex: 10,
};

const FACT_ITEM_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  p: { xs: 2.5, md: 3 },
  borderBottom: { xs: `1px solid ${palette.line}`, md: 'none' },
  borderRight: { xs: 'none', md: `1px solid ${palette.line}` },
  '&:last-child': {
    borderBottom: 'none',
    borderRight: 'none',
  },
};

const FACT_ICON_BOX_SX: SxProps<Theme> = {
  width: 48,
  height: 48,
  borderRadius: '12px',
  bgcolor: palette.peach,
  color: palette.orange,
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
};

const FACT_TEXT_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
};

const FACT_LABEL_SX: SxProps<Theme> = {
  fontSize: '0.75rem',
  fontWeight: 600,
  color: palette.muted,
  mb: 0.5,
};

const FACT_VALUE_SX: SxProps<Theme> = {
  fontSize: '1rem',
  fontWeight: 700,
  color: palette.navy,
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const UrgentDeliveryHeroSection = ({ data }: UrgentDeliveryHeroSectionProps) => {
  const { ref, style } = useAnimation({ delay: 100 });

  return (
    <>
      <Box
        component="section"
        ref={ref}
        sx={[SECTION_SX, ...(Array.isArray(style) ? style : [style])]}
      >
        <Box sx={STRIPES_SX} />
        <Box sx={GRADIENT_OVERLAY_SX} />

        <SectionWrap>
          <Box sx={CONTENT_GRID_SX}>
            {/* Left Column — Text */}
            <Box sx={TEXT_COLUMN_SX}>
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

            {/* Right Column — Image */}
            <Box sx={ICON_COLUMN_SX}>
              <Box component="img" src={data.image} alt="Boxes icon" sx={ICON_IMG_SX} />
            </Box>
          </Box>
        </SectionWrap>
      </Box>

      {/* Overlapping Facts Bar */}
      <SectionWrap>
        <Box sx={FACTS_BAR_SX}>
          {data.facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <Box key={fact.label} sx={FACT_ITEM_SX}>
                <Box sx={FACT_ICON_BOX_SX}>
                  <Icon />
                </Box>
                <Box sx={FACT_TEXT_SX}>
                  <Typography sx={FACT_LABEL_SX}>{fact.label}</Typography>
                  <Typography sx={FACT_VALUE_SX}>{fact.value}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </SectionWrap>
    </>
  );
};
