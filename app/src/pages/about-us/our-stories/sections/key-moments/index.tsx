import { useMemo, createElement, type ElementType } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Agriculture, BarChart, Flag } from '@mui/icons-material';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { useApi } from '@/routes/api-routing/api-context';
import type { KeyMomentItem } from '@/utilities/data/about-us/our-stories/key-moments';

/* =====================================================================
 * Icon Mapping
 * ===================================================================== */

const ICONS: Record<string, ElementType> = {
  agriculture: Agriculture,
  bar_chart: BarChart,
  flag: Flag,
};

const DynamicIcon = ({ iconKey, sx }: { iconKey: string; sx?: SxProps<Theme> }) => {
  const Icon = ICONS[iconKey] || Flag;
  return createElement(Icon, { sx });
};

/* =====================================================================
 * Static styles
 * ===================================================================== */

const HEADER_WRAP_SX: SxProps<Theme> = {
  mb: 8,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
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
  maxWidth: '60ch',
};

const TIMELINE_WRAP_SX: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: { xs: 6, md: 0 },
  maxWidth: '900px',
  mx: 'auto',
  width: '100%',

  // Desktop Dashed Line
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 32, // Exactly halfway down the 64px icon circle
    left: 'calc(16.666% + 32px)',
    right: 'calc(16.666% + 32px)',
    height: 2,
    backgroundImage: `linear-gradient(90deg, ${palette.orange} 50%, transparent 50%)`,
    backgroundSize: '12px 2px',
    backgroundRepeat: 'repeat-x',
    zIndex: 0,
    display: { xs: 'none', md: 'block' },
  },

  // Mobile Dashed Line
  '@media (max-width: 899px)': {
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 64, // Starts just below the first circle
      bottom: 64, // Stops just above the last circle
      left: 32, // Center of the circle
      width: 2,
      backgroundImage: `linear-gradient(0deg, ${palette.orange} 50%, transparent 50%)`,
      backgroundSize: '2px 12px',
      backgroundRepeat: 'repeat-y',
      zIndex: 0,
    },
  },
};

const MOMENT_ITEM_SX: SxProps<Theme> = {
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: { xs: 'flex-start', md: 'center' },
  textAlign: { xs: 'left', md: 'center' },
  flex: 1,
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
  boxShadow: '0 4px 12px -4px rgba(245, 130, 32, 0.2)',
  position: 'relative',
  zIndex: 2,
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
  const { data } = useApi();

  const keyMomentsData = useMemo(() => {
    if (!data?.keyMoments) return null;
    return data.keyMoments as unknown as {
      eyebrow: string;
      title: string;
      subtitle: string;
      moments: (KeyMomentItem & { iconKey: string })[];
    };
  }, [data?.keyMoments]);

  if (!keyMomentsData || keyMomentsData.moments.length === 0) return null;

  return (
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
          {keyMomentsData.moments.map((moment) => (
            <Box key={moment.id} sx={MOMENT_ITEM_SX}>
              <Box sx={ICON_CIRCLE_SX}>
                <DynamicIcon iconKey={moment.iconKey} sx={{ fontSize: 28 }} />
              </Box>
              <Typography component="h3" sx={MOMENT_TITLE_SX}>
                {moment.title}
              </Typography>
              <Box sx={MOMENT_BADGE_SX}>{moment.badge}</Box>
            </Box>
          ))}
        </Box>
      </SectionWrap>
    </Section>
  );
};
