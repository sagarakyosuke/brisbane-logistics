import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette, shadows } from '@/utilities/themes';
import { tailoredWarehousingData } from '@/utilities/_mock/about-us/overview';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
  gap: { xs: 6, md: 8, lg: 12 },
  alignItems: 'center',
};

/* ── Left Column (Text) ───────────────────────────────────────────── */

const TEXT_COLUMN_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  color: palette.navy,
  lineHeight: 1.1,
  mt: 2,
  mb: 3,
  letterSpacing: '-0.02em',
};

const DESCRIPTION_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  color: palette.muted,
  lineHeight: 1.7,
  mb: 4,
  maxWidth: '48ch',
};

const LINK_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '1rem',
  color: palette.navy,
  textDecoration: 'none',
  borderBottom: `2px solid ${palette.orange}`,
  pb: 0.5,
  transition: 'color 0.2s',
  '&:hover': {
    color: palette.orange,
    '& .arrow-icon': { transform: 'translateX(4px)' },
  },
};

const ARROW_SX: SxProps<Theme> = {
  fontSize: 18,
  color: palette.orange,
  transition: 'transform 0.2s',
};

/* ── Right Column (Image) ─────────────────────────────────────────── */

const IMAGE_COLUMN_SX: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
};

const IMAGE_WRAPPER_SX: SxProps<Theme> = {
  position: 'relative',
  borderRadius: '24px',
  overflow: 'hidden',
  aspectRatio: '4 / 3',
  boxShadow: shadows.base,
};

const IMAGE_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const TailoredWarehousingSection = () => {
  const { eyebrow, title, description, ctaLabel, ctaPath, image, imageAlt } =
    tailoredWarehousingData;

  return (
    // Uses skipAlternate={false} so it alternates based on its position on the page
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={GRID_SX}>
          {/* Left Column — Text */}
          <Box sx={TEXT_COLUMN_SX}>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>

            <Typography component="h2" sx={TITLE_SX}>
              {title}
            </Typography>

            <Typography sx={DESCRIPTION_SX}>{description}</Typography>

            <Box component={Link} to={ctaPath} sx={LINK_SX}>
              {ctaLabel}
              <ArrowForward className="arrow-icon" sx={ARROW_SX} />
            </Box>
          </Box>

          {/* Right Column — Image */}
          <Box sx={IMAGE_COLUMN_SX}>
            <Box sx={IMAGE_WRAPPER_SX}>
              <Box component="img" src={image} alt={imageAlt} sx={IMAGE_SX} />
            </Box>
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};
