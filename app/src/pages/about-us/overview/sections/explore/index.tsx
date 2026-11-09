import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router';
import { Section, SectionWrap } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { exploreData, type ExploreItem } from '@/utilities/_mock/about-us/explore';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
  gap: 3,
};

const CARD_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  bgcolor: palette.white,
  p: 4,
  borderRadius: '20px',
  border: `1px solid ${palette.line}`,
  textDecoration: 'none',
  transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
  cursor: 'pointer',

  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 20px 40px -12px rgba(18,26,87,0.12)',
    borderColor: palette.orange,
    '& .icon-box': {
      bgcolor: palette.orange,
      color: palette.white,
      transform: 'scale(1.05) rotate(-5deg)',
    },
    '& .arrow-icon': {
      transform: 'translateX(4px)',
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
  transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
};

const CARD_TITLE_SX: SxProps<Theme> = {
  fontSize: '1.15rem',
  fontWeight: 800,
  color: palette.navy,
  mb: 1,
};

const CARD_DESC_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: palette.muted,
  lineHeight: 1.5,
  mb: 3,
  flexGrow: 1,
};

const LINK_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '0.9rem',
  color: palette.navy,
};

const ARROW_SX: SxProps<Theme> = {
  fontSize: 18,
  color: palette.orange,
  transition: 'transform 0.2s',
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const ExploreSection = () => {
  return (
    // Uses the Section component's odd/even logic
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={GRID_SX}>
          {exploreData.items.map((item: ExploreItem) => {
            const Icon = item.icon;

            return (
              <Box key={item.id} component={Link} to={item.path} sx={CARD_SX}>
                <Box className="icon-box" sx={ICON_BOX_SX}>
                  <Icon fontSize="medium" />
                </Box>

                <Typography component="h3" sx={CARD_TITLE_SX}>
                  {item.title}
                </Typography>

                <Typography sx={CARD_DESC_SX}>{item.desc}</Typography>

                <Box sx={LINK_SX}>
                  View
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
