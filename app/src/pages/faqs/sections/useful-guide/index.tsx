import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette, shadows } from '@/utilities/themes';
import { usefulGuideData, type UsefulGuideItem } from '@/utilities/_mock/faqs/useful-guide';

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
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
  gap: 3,
};

const CARD_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  bgcolor: palette.white,
  p: 4,
  borderRadius: '20px',
  border: `1px solid ${palette.line}`,
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  // Hover state
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: shadows.base,
    borderColor: 'transparent',
    // Animate the arrow
    '& .arrow-icon': { transform: 'translateX(6px)' },
    // Animate the icon box background
    '& .icon-box': {
      bgcolor: palette.orange,
      color: palette.white,
      transform: 'scale(1.05) rotate(-5deg)',
    },
  },
};

const ICON_BOX_SX: SxProps<Theme> = {
  width: 56,
  height: 56,
  borderRadius: '16px',
  bgcolor: palette.peach,
  color: palette.orange,
  display: 'grid',
  placeItems: 'center',
  mb: 3,
  transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
};

const CARD_TITLE_SX: SxProps<Theme> = {
  fontSize: '1.15rem',
  fontWeight: 700,
  color: palette.navy,
  mb: 1.5,
  lineHeight: 1.3,
};

const CARD_DESC_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: palette.muted,
  lineHeight: 1.6,
  mb: 4,
  flexGrow: 1,
};

const LINK_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '0.9rem',
  color: palette.navy,
  mt: 'auto',
};

const ARROW_SX: SxProps<Theme> = {
  fontSize: 18,
  color: palette.orange,
  transition: 'transform 0.3s ease',
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const UsefulGuideSection = () => {
  return (
    <Section skipAlternate={false}>
      <SectionWrap>
        {/* Header */}
        <Box sx={HEADER_WRAP_SX}>
          <SectionEyebrow>{usefulGuideData.eyebrow}</SectionEyebrow>
          <Typography component="h2" sx={TITLE_SX}>
            {usefulGuideData.title}
          </Typography>
        </Box>

        {/* Guides Grid */}
        <Box sx={GRID_SX}>
          {usefulGuideData.guides.map((guide: UsefulGuideItem) => {
            const Icon = guide.icon;

            return (
              <Box key={guide.id} component={Link} to={guide.path} sx={CARD_SX}>
                <Box className="icon-box" sx={ICON_BOX_SX}>
                  <Icon fontSize="medium" />
                </Box>

                <Typography component="h3" sx={CARD_TITLE_SX}>
                  {guide.title}
                </Typography>

                <Typography sx={CARD_DESC_SX}>{guide.desc}</Typography>

                <Box sx={LINK_SX}>
                  Read more
                  <ArrowForward className="arrow-icon" sx={ARROW_SX} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </SectionWrap>
    </Section>
  );
};
