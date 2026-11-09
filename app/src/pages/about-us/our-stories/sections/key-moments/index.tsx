import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette } from '@/utilities/themes';
import {
  keyMomentsData,
  type KeyMomentItem,
} from '@/utilities/_mock/about-us/our-stories/key-moments';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const HEADER_WRAP_SX: SxProps<Theme> = {
  mb: 6,
};

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  color: palette.navy,
  lineHeight: 1.1,
  mt: 1.5,
  mb: 1.5,
  letterSpacing: '-0.02em',
};

const SUBTITLE_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  color: palette.muted,
  lineHeight: 1.6,
};

/* ── Timeline ─────────────────────────────────────────────────────── */

const TIMELINE_WRAP_SX: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  pt: 2,
  // Add a dashed line across the entire container behind the items
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 32, // Align with the center of the icon circle
    left: '5%',
    right: '5%',
    height: 2,
    backgroundImage: `linear-gradient(90deg, ${palette.orange} 50%, transparent 50%)`,
    backgroundSize: '12px 2px', // Dash size
    backgroundRepeat: 'repeat-x',
    zIndex: 0,
  },
};

const MOMENT_ITEM_SX: SxProps<Theme> = {
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flex: 1, // Distribute evenly
  pr: 2,
};

const ICON_CIRCLE_SX: SxProps<Theme> = {
  width: 64,
  height: 64,
  borderRadius: '50%',
  border: `2px solid ${palette.orange}`,
  bgcolor: palette.white,
  color: palette.orange,
  display: 'grid',
  placeItems: 'center',
  mb: 3,
};

const MOMENT_TITLE_SX: SxProps<Theme> = {
  fontSize: '1.15rem',
  fontWeight: 800,
  color: palette.navy,
  mb: 1.5,
};

const MOMENT_BADGE_SX: SxProps<Theme> = {
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

/* =====================================================================
 * Component
 * ===================================================================== */

export const KeyMomentsSection = () => {
  return (
    // Uses the Section component's odd/even logic
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={HEADER_WRAP_SX}>
          <SectionEyebrow>{keyMomentsData.eyebrow}</SectionEyebrow>
          <Typography component="h2" sx={TITLE_SX}>
            {keyMomentsData.title}
          </Typography>
          <Typography sx={SUBTITLE_SX}>{keyMomentsData.subtitle}</Typography>
        </Box>

        <Box sx={TIMELINE_WRAP_SX}>
          {keyMomentsData.moments.map((moment: KeyMomentItem) => {
            const Icon = moment.icon;

            return (
              <Box key={moment.id} sx={MOMENT_ITEM_SX}>
                <Box sx={ICON_CIRCLE_SX}>
                  <Icon fontSize="medium" />
                </Box>
                <Typography component="h3" sx={MOMENT_TITLE_SX}>
                  {moment.title}
                </Typography>
                <Box sx={MOMENT_BADGE_SX}>{moment.badge}</Box>
              </Box>
            );
          })}
        </Box>
      </SectionWrap>
    </Section>
  );
};
