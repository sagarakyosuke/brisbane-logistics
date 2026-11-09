import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { FormatQuote } from '@mui/icons-material';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { perspectiveData } from '@/utilities/_mock/about-us/our-stories/perspective-from-our-people';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const LAYOUT_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1.2fr' },
  gap: { xs: 6, md: 10 },
  alignItems: 'center',
};

/* ── Left Column (Image or Placeholder) ───────────────────────────── */

const MEDIA_WRAP_SX: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  aspectRatio: '4 / 5', // Taller portrait aspect ratio
  maxWidth: 420,
  borderRadius: '24px',
  overflow: 'hidden',
  bgcolor: palette.navy,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  mx: { xs: 'auto', md: 0 },
};

const IMAGE_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

const INITIALS_CIRCLE_SX: SxProps<Theme> = {
  width: 120,
  height: 120,
  borderRadius: '50%',
  bgcolor: palette.orange,
  color: palette.navy,
  display: 'grid',
  placeItems: 'center',
  fontSize: '2.5rem',
  fontWeight: 800,
  mb: 3,
  letterSpacing: '0.02em',
};

const PHOTO_BADGE_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  bgcolor: palette.peach,
  color: palette.navy,
  border: `1px dashed ${palette.orange2}`,
  px: 1.5,
  py: 0.5,
  borderRadius: '999px',
  fontSize: '0.7rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

/* ── Right Column (Text) ──────────────────────────────────────────── */

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
  mb: 1,
  letterSpacing: '-0.02em',
};

const QUOTE_ICON_SX: SxProps<Theme> = {
  fontSize: 56,
  color: palette.orange,
  transform: 'rotate(180deg)',
  mt: 1,
  mb: 2,
};

const QUOTE_TEXT_SX: SxProps<Theme> = {
  fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
  fontWeight: 700,
  color: palette.muted,
  lineHeight: 1.4,
  mb: 4,
  maxWidth: 500,
};

const AUTHOR_NAME_SX: SxProps<Theme> = {
  fontSize: '1rem',
  fontWeight: 800,
  color: palette.navy,
  mb: 0.5,
};

const AUTHOR_ROLE_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: palette.muted,
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const PerspectiveFromOurPeopleSection = () => {
  return (
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={LAYOUT_SX}>
          {/* Left Column — Image or Placeholder */}
          <Box sx={MEDIA_WRAP_SX}>
            {perspectiveData.image ? (
              <Box
                component="img"
                src={perspectiveData.image}
                alt={perspectiveData.authorName}
                sx={IMAGE_SX}
              />
            ) : (
              <>
                <Box sx={INITIALS_CIRCLE_SX}>{perspectiveData.initials}</Box>
                <Box sx={PHOTO_BADGE_SX}>Photo to be supplied</Box>
              </>
            )}
          </Box>

          {/* Right Column — Text */}
          <Box sx={TEXT_COLUMN_SX}>
            <SectionEyebrow>{perspectiveData.eyebrow}</SectionEyebrow>

            <Typography component="h2" sx={TITLE_SX}>
              {perspectiveData.title}
            </Typography>

            <FormatQuote sx={QUOTE_ICON_SX} />

            <Typography sx={QUOTE_TEXT_SX}>{perspectiveData.quote}</Typography>

            <Typography sx={AUTHOR_NAME_SX}>{perspectiveData.authorName}</Typography>
            <Typography sx={AUTHOR_ROLE_SX}>{perspectiveData.authorRole}</Typography>
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};
