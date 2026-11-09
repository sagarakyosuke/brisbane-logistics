import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { whyChooseData, type WhyChooseValue } from '@/utilities/_mock/about-us/why-choose';

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
};

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
  gap: 3,
};

const CARD_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 3,
  bgcolor: palette.white,
  p: { xs: 3, md: 4 },
  borderRadius: '16px',
  border: `1px solid ${palette.line}`,
  position: 'relative',
  overflow: 'hidden',
  // Premium easing curve
  transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
  cursor: 'pointer',

  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 20px 40px -12px rgba(18,26,87,0.12)',
    borderColor: palette.orange,
    // Animate the icon box
    '& .icon-box': {
      bgcolor: palette.orange,
      color: palette.white,
      transform: 'scale(1.05) rotate(-5deg)',
    },
    // Animate the card title
    '& .card-title': {
      color: palette.orange,
    },
  },
};

const ICON_BOX_SX: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  width: 56,
  height: 56,
  borderRadius: '16px',
  bgcolor: palette.peach,
  color: palette.orange,
  flexShrink: 0,
  // Smooth easing for the icon animation
  transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
};

const TEXT_WRAP_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  pt: 0.5,
};

const CARD_TITLE_SX: SxProps<Theme> = {
  fontSize: '1.15rem',
  fontWeight: 800,
  color: palette.navy,
  mb: 0.5,
  transition: 'color 0.3s ease',
};

const CARD_DESC_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: palette.muted,
  lineHeight: 1.5,
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const WhyChooseSection = () => {
  return (
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={HEADER_WRAP_SX}>
          <SectionEyebrow>{whyChooseData.eyebrow}</SectionEyebrow>
          <Typography component="h2" sx={TITLE_SX}>
            {whyChooseData.title}
          </Typography>
        </Box>

        <Box sx={GRID_SX}>
          {whyChooseData.values.map((value: WhyChooseValue) => {
            const Icon = value.icon;
            return (
              <Box key={value.id} sx={CARD_SX}>
                <Box className="icon-box" sx={ICON_BOX_SX}>
                  <Icon fontSize="medium" />
                </Box>
                <Box sx={TEXT_WRAP_SX}>
                  <Typography component="h3" className="card-title" sx={CARD_TITLE_SX}>
                    {value.title}
                  </Typography>
                  <Typography sx={CARD_DESC_SX}>{value.desc}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </SectionWrap>
    </Section>
  );
};
