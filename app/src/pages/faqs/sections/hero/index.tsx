import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  type SxProps,
  type Theme,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { SectionEyebrow, SectionWrap } from '@/components/sections';
import { useAnimation } from '@/reusables/animation/use-animation';
import { Breadcrumbs } from '@/reusables/breadcrumbs';
import { palette } from '@/utilities/themes';
import { faqsHeroData } from '@/utilities/_mock/faqs/hero';

/* =====================================================================
 * Static styles
 * ===================================================================== */

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
  pt: { xs: 10, md: 12 },
  pb: { xs: 8, md: 10 },
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

const CONTENT_WRAPPER_SX: SxProps<Theme> = {
  position: 'relative',
  zIndex: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  maxWidth: 800,
};

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
  mb: 5,
};

const SEARCH_INPUT_SX: SxProps<Theme> = {
  width: '100%',
  maxWidth: 560,
  '& .MuiOutlinedInput-root': {
    borderRadius: '999px',
    bgcolor: palette.white,
    boxShadow: '0 8px 24px -8px rgba(0, 0, 0, 0.4)',
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: 'transparent' },
    '&.Mui-focused fieldset': { borderColor: palette.orange },
  },
};

const SEARCH_ICON_SX: SxProps<Theme> = {
  color: palette.muted,
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const FaqsHeroSection = () => {
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
        <Box sx={CONTENT_WRAPPER_SX}>
          <Box sx={BREADCRUMBS_WRAPPER_SX}>
            <Breadcrumbs />
          </Box>

          <Box sx={EYEBROW_WRAPPER_SX}>
            <SectionEyebrow>{faqsHeroData.eyebrow || 'Support'}</SectionEyebrow>
          </Box>

          <Typography component="h1" sx={TITLE_SX}>
            {faqsHeroData.title}
            <span style={{ color: 'var(--orange)' }}>.</span>
          </Typography>

          <Typography sx={DESCRIPTION_SX}>{faqsHeroData.description}</Typography>

          <TextField
            placeholder={faqsHeroData.searchPlaceholder}
            sx={SEARCH_INPUT_SX}
            size="medium"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={SEARCH_ICON_SX} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </SectionWrap>
    </Box>
  );
};
