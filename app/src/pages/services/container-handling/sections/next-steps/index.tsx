import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { nextStepsData } from '@/utilities/_mock/services/container-handling/container-handling';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
  gap: 3,
  mt: 4,
};

const CARD_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 2.5,
  bgcolor: palette.white,
  border: `1px solid ${palette.line}`,
  borderRadius: '12px',
  p: 3,
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 'var(--shadow-sm)',
    borderColor: 'transparent',
    '& .icon-box': {
      bgcolor: palette.orange,
      color: palette.white,
    },
    '& .cta-arrow': {
      transform: 'translateX(4px)',
    },
  },
};

const ICON_BOX_SX: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  width: 48,
  height: 48,
  borderRadius: '12px',
  bgcolor: palette.peach,
  color: palette.orange,
  flexShrink: 0,
  transition: 'all 0.3s ease',
};

const ICON_SX = { fontSize: 24 } as const;

const TITLE_SX: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: '1.15rem',
  color: palette.navy,
  mb: 0.5,
};

const DESC_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: palette.muted,
  lineHeight: 1.5,
  mb: 1.5,
};

const CTA_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '0.9rem',
  color: palette.navy,
};

const CTA_ARROW_SX = {
  fontSize: 16,
  color: palette.orange,
  transition: 'transform 0.25s',
} as const;

/* =====================================================================
 * NextStepsSection
 * ===================================================================== */

export const NextStepsSection = () => {
  return (
    <Section>
      <SectionWrap>
        <Box sx={{ mb: 4 }}>
          <SectionEyebrow>Next Steps</SectionEyebrow>
          <Typography
            component="h2"
            sx={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 800,
              color: palette.navy,
              lineHeight: 1.1,
              mt: 1,
            }}
          >
            Need something else?
          </Typography>
        </Box>

        <Box sx={GRID_SX}>
          {nextStepsData.map((step) => {
            const Icon = step.icon;
            return (
              <Box key={step.id} component={Link} to={step.path} sx={CARD_SX}>
                <Box className="icon-box" sx={ICON_BOX_SX}>
                  <Icon sx={ICON_SX} />
                </Box>
                <Box>
                  <Typography sx={TITLE_SX}>{step.title}</Typography>
                  <Typography sx={DESC_SX}>{step.description}</Typography>
                  <Box sx={CTA_SX}>
                    {step.ctaLabel}
                    <ArrowForward className="cta-arrow" sx={CTA_ARROW_SX} />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </SectionWrap>
    </Section>
  );
};
