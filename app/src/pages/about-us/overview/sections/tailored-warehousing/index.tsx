import { useState } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward, Image as ImageIcon } from '@mui/icons-material';
import { Link } from 'react-router';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette, shadows } from '@/utilities/themes';
import { useGetOverviewQuery } from '@/pages/about-us/overview/sections/api-hook';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
  gap: { xs: 6, md: 8, lg: 12 },
  alignItems: 'center',
};

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

const FALLBACK_WRAP_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${palette.navySoft} 0%, ${palette.navy} 100%)`,
  color: palette.white,
};

const FALLBACK_ICON_SX: SxProps<Theme> = {
  fontSize: 48,
  opacity: 0.7,
  mb: 1,
};

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const SafeImage = ({ src, alt, sx }: { src?: string | null; alt: string; sx?: SxProps<Theme> }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <Box sx={{ position: 'absolute', inset: 0, ...FALLBACK_WRAP_SX }}>
        <ImageIcon sx={FALLBACK_ICON_SX} />
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.8,
          }}
        >
          No Image
        </Typography>
      </Box>
    );
  }

  return <Box component="img" src={src} alt={alt} onError={() => setHasError(true)} sx={sx} />;
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const TailoredWarehousingSection = () => {
  const { data } = useGetOverviewQuery();

  const overview = data?.overview;

  if (!overview) return null;

  return (
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={GRID_SX}>
          <Box sx={TEXT_COLUMN_SX}>
            <SectionEyebrow>{overview.eyebrow}</SectionEyebrow>

            <Typography component="h2" sx={TITLE_SX}>
              {overview.title}
            </Typography>

            <Typography sx={DESCRIPTION_SX}>{overview.description}</Typography>

            <Box component={Link} to={overview.ctaPath} sx={LINK_SX}>
              {overview.ctaLabel}
              <ArrowForward className="arrow-icon" sx={ARROW_SX} />
            </Box>
          </Box>

          <Box sx={IMAGE_COLUMN_SX}>
            <Box sx={IMAGE_WRAPPER_SX}>
              <SafeImage src={overview.image} alt={overview.imageAlt} sx={IMAGE_SX} />
            </Box>
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};
