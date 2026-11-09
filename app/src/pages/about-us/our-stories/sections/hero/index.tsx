import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Home as HomeIcon, Lightbulb, Handshake, Flag } from '@mui/icons-material';
import { SectionEyebrow, SectionWrap } from '@/components/sections';
import { useAnimation } from '@/reusables/animation/use-animation';
import { Breadcrumbs } from '@/reusables/breadcrumbs';
import { palette } from '@/utilities/themes';
import type { OurStoryHeroData } from '@/utilities/_mock/about-us/our-stories/hero';

/* =====================================================================
 * Types
 * ===================================================================== */

interface OurStoryHeroSectionProps {
  data: OurStoryHeroData;
}

/* =====================================================================
 * Static styles
 * ===================================================================== */

const SECTION_SX: SxProps<Theme> = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  minHeight: { xs: 'auto', md: 'clamp(500px, 70vh, 700px)' },
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
  pb: { xs: 16, md: 20 },
};

/* ── Text Content ─────────────────────────────────────────────────── */

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

/* ── Media Column ─────────────────────────────────────────────────── */

const MEDIA_COLUMN_SX: SxProps<Theme> = {
  position: 'relative',
  display: { xs: 'none', lg: 'flex' },
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
};

const MEDIA_OUTER_FRAME_SX: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  borderRadius: '24px',
  border: `2px dashed rgba(255,255,255,0.2)`,
  p: 3,
  pb: 10,
  display: 'flex',
  flexDirection: 'column',
  zIndex: 2,
  opacity: 0,
  transform: 'translateY(30px)',
  animation: 'fadeUpFrame 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
  animationDelay: '0.2s',

  '@keyframes fadeUpFrame': {
    to: { opacity: 1, transform: 'translateY(0)' },
  },

  '&:hover': {
    '& .inner-img': {
      transform: 'scale(1.03)',
    },
  },
};

const MEDIA_INNER_BOX_SX: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  aspectRatio: '4 / 3',
  borderRadius: '16px',
  overflow: 'hidden',
  bgcolor: 'rgba(255,255,255,0.02)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const PLACEHOLDER_ICON_BOX_SX: SxProps<Theme> = {
  width: 72,
  height: 72,
  borderRadius: '20px',
  bgcolor: 'rgba(255,255,255,0.06)',
  color: palette.white,
  display: 'grid',
  placeItems: 'center',
  mb: 3,
};

const PLACEHOLDER_BADGE_SX: SxProps<Theme> = {
  bgcolor: palette.peach,
  color: palette.navy,
  px: 2,
  py: 1,
  borderRadius: '6px',
  fontSize: '0.75rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const IMAGE_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
};

/* ── Journey Badges (Floating Card) ───────────────────────────────── */

const JOURNEY_CARD_SX: SxProps<Theme> = {
  position: 'absolute',
  bottom: -40,
  left: '50%',
  transform: 'translateX(-50%)',
  bgcolor: palette.white,
  borderRadius: '20px',
  px: 4,
  py: 4,
  display: 'flex',
  alignItems: 'center',
  gap: 3,
  boxShadow: '0 20px 40px -12px rgba(0,0,0,0.3)',
  zIndex: 4,
  width: 'max-content',
  opacity: 0,
  animation: 'slideUpCard 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
  animationDelay: '0.5s',

  '@keyframes slideUpCard': {
    '0%': { opacity: 0, transform: 'translate(-50%, 20px)' },
    '100%': { opacity: 1, transform: 'translate(-50%, 0)' },
  },
};

const BADGE_ITEM_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1.5,
};

const ANIMATION_KEYFRAMES = {
  '@keyframes pulseIcon': {
    '0%, 100%': { bgcolor: palette.peach, color: palette.orange },
    '15%, 45%': { bgcolor: palette.orange, color: palette.white },
  },
  '@keyframes dashMove': {
    '0%': { backgroundPosition: '0 0' },
    '100%': { backgroundPosition: '10px 0' },
  },
};

const badgeIconWrapSx = (delay: string): SxProps<Theme> => ({
  width: 48,
  height: 48,
  borderRadius: '50%',
  bgcolor: palette.peach,
  color: palette.orange,
  display: 'grid',
  placeItems: 'center',
  animation: 'pulseIcon 3.6s ease-in-out infinite',
  animationDelay: delay,
  ...ANIMATION_KEYFRAMES,
});

const BADGE_TEXT_SX: SxProps<Theme> = {
  fontSize: '0.7rem',
  fontWeight: 800,
  color: palette.navy,
  textAlign: 'center',
  maxWidth: 70,
  lineHeight: 1.2,
};

const DASH_LINE_SX: SxProps<Theme> = {
  width: 50,
  height: 2,
  backgroundImage: `linear-gradient(90deg, ${palette.orange} 50%, transparent 50%)`,
  backgroundSize: '10px 2px',
  backgroundRepeat: 'repeat-x',
  mb: 4,
  animation: 'dashMove 1s linear infinite',
  ...ANIMATION_KEYFRAMES,
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const OurStoryHeroSection = ({ data }: OurStoryHeroSectionProps) => {
  const { ref, style } = useAnimation({ delay: 100 });

  const titleParts = data.title.split(' and ');
  const hasAccent = titleParts.length > 1;

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
          {/* Left Column — Text */}
          <Box>
            <Box sx={BREADCRUMBS_WRAPPER_SX}>
              <Breadcrumbs />
            </Box>

            <Box sx={EYEBROW_WRAPPER_SX}>
              <SectionEyebrow>{data.eyebrow}</SectionEyebrow>
            </Box>

            <Typography component="h1" sx={TITLE_SX}>
              {hasAccent ? (
                <>
                  {titleParts[0]} and <br />
                  <span style={{ color: palette.orange }}>{titleParts[1]}</span>
                </>
              ) : (
                data.title
              )}
            </Typography>

            <Typography sx={DESCRIPTION_SX}>{data.description}</Typography>
          </Box>

          {/* Right Column — Image and Floating Card */}
          <Box sx={MEDIA_COLUMN_SX}>
            {/* Outer dashed frame */}
            <Box sx={MEDIA_OUTER_FRAME_SX}>
              {/* Inner image box with conditional rendering */}
              <Box sx={MEDIA_INNER_BOX_SX}>
                {data.image ? (
                  <Box
                    className="inner-img"
                    component="img"
                    src={data.image}
                    alt={data.title}
                    sx={IMAGE_SX}
                  />
                ) : (
                  <>
                    <Box sx={PLACEHOLDER_ICON_BOX_SX}>
                      <HomeIcon fontSize="large" />
                    </Box>
                    <Box sx={PLACEHOLDER_BADGE_SX}>Team photo to be supplied</Box>
                  </>
                )}
              </Box>
            </Box>

            {/* Floating Journey Badges */}
            <Box sx={JOURNEY_CARD_SX}>
              <Box sx={BADGE_ITEM_SX}>
                <Box sx={badgeIconWrapSx('0s')}>
                  <Lightbulb fontSize="small" />
                </Box>
                <Typography sx={BADGE_TEXT_SX}>Where we started</Typography>
              </Box>

              <Box sx={DASH_LINE_SX} />

              <Box sx={BADGE_ITEM_SX}>
                <Box sx={badgeIconWrapSx('1.2s')}>
                  <Handshake fontSize="small" />
                </Box>
                <Typography sx={BADGE_TEXT_SX}>How we've grown</Typography>
              </Box>

              <Box sx={DASH_LINE_SX} />

              <Box sx={BADGE_ITEM_SX}>
                <Box sx={badgeIconWrapSx('2.4s')}>
                  <Flag fontSize="small" />
                </Box>
                <Typography sx={BADGE_TEXT_SX}>Where we're heading</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </SectionWrap>
    </Box>
  );
};
