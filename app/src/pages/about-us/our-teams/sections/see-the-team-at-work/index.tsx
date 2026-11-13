import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { useGetSeeTheTeamQuery } from '@/pages/about-us/our-teams/sections/api-hook';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const HEADER_WRAP_SX: SxProps<Theme> = {
  mb: 5,
};

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  color: palette.navy,
  lineHeight: 1.1,
  mt: 1.5,
  maxWidth: 600,
};

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
  gap: 4,
};

const VIDEO_CARD_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const VIDEO_FRAME_SX: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
  borderRadius: '20px',
  overflow: 'hidden',
  bgcolor: palette.navyDeep,
  backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 30px, rgba(255,255,255,0.04) 30px, rgba(255,255,255,0.04) 60px)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.01)',
    '& .play-btn': {
      transform: 'scale(1.1)',
      boxShadow: '0 0 0 16px rgba(245, 130, 32, 0.2)',
    },
  },
};

const MEDIA_SX: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  border: 0,
  objectFit: 'cover',
};

const PLAY_BTN_SX: SxProps<Theme> = {
  width: 72,
  height: 72,
  borderRadius: '50%',
  bgcolor: palette.orange,
  color: palette.navy,
  display: 'grid',
  placeItems: 'center',
  transition: 'all 0.3s ease',
  boxShadow: '0 0 0 0 rgba(245, 130, 32, 0.4)',
  zIndex: 2,
};

const VIDEO_BADGE_SX: SxProps<Theme> = {
  position: 'absolute',
  bottom: 16,
  left: 16,
  bgcolor: palette.peach,
  color: palette.navy,
  border: `1px dashed ${palette.orange2}`,
  px: 1.5,
  py: 0.5,
  borderRadius: '999px',
  fontSize: '0.65rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  zIndex: 3,
};

const CAPTION_SX: SxProps<Theme> = {
  fontSize: '1rem',
  fontWeight: 700,
  color: palette.navy,
  textAlign: 'center',
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const SeeTheTeamAtWorkSection = () => {
  const { data } = useGetSeeTheTeamQuery();

  if (!data || data.videos.length === 0) return null;

  return (
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={HEADER_WRAP_SX}>
          <SectionEyebrow>{data.eyebrow}</SectionEyebrow>
          <Typography component="h2" sx={TITLE_SX}>
            {data.title}
          </Typography>
        </Box>

        <Box sx={GRID_SX}>
          {data.videos.map((video) => {
            const isDirectFile = video.videoUrl?.match(/\.(mp4|webm|ogg)$/i);

            return (
              <Box key={video.id} sx={VIDEO_CARD_SX}>
                <Box sx={VIDEO_FRAME_SX}>
                  {video.videoUrl ? (
                    isDirectFile ? (
                      <Box
                        component="video"
                        src={video.videoUrl}
                        controls
                        sx={MEDIA_SX}
                      />
                    ) : (
                      <Box
                        component="iframe"
                        src={video.videoUrl}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        sx={MEDIA_SX}
                      />
                    )
                  ) : (
                    <>
                      <Box className="play-btn" sx={PLAY_BTN_SX}>
                        <PlayArrow sx={{ fontSize: 36 }} />
                      </Box>
                      <Box sx={VIDEO_BADGE_SX}>Video to be supplied</Box>
                    </>
                  )}
                </Box>
                <Typography component="h3" sx={CAPTION_SX}>
                  {video.title}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </SectionWrap>
    </Section>
  );
};