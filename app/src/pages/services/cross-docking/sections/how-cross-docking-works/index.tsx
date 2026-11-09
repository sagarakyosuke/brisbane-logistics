import { Box, Typography } from '@mui/material';

// Components
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { LineLoader } from '@/components/extras/line-loader';

// Mock data
import { crossDockingSteps } from '@/utilities/_mock/services/cross-docking/cross-docking';

// Theme
import { palette } from '@/utilities/themes';

/* =====================================================================
 * Style Constants
 * ===================================================================== */

const CARD_CONTAINER_SX = {
  bgcolor: palette.navySoft,
  borderRadius: '24px',
  p: { xs: 4, md: 6 },
  color: palette.white,
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 24px 48px -12px rgba(18, 26, 87, 0.25)',
} as const;

const ICON_CIRCLE_SX = {
  width: 64,
  height: 64,
  borderRadius: '50%',
  bgcolor: palette.white,
  color: palette.orange,
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  border: '2px solid rgba(245, 130, 32, 0.2)',
  boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.05)',
} as const;

const STEP_TITLE_SX = {
  fontWeight: 800,
  fontSize: '1.15rem',
  mb: 0.5,
  color: palette.white,
} as const;

const STEP_DESC_SX = {
  color: '#e2e5f0',
  fontSize: '0.95rem',
  lineHeight: 1.5,
} as const;

/* =====================================================================
 * HowCrossDockingWorksSection
 * ===================================================================== */

export const HowCrossDockingWorksSection = () => {
  return (
    <Section delay={100}>
      <SectionWrap>
        <Box sx={CARD_CONTAINER_SX}>
          {/* ── Header ────────────────────────────────────────── */}
          <Box sx={{ mb: 6 }}>
            <SectionEyebrow>How Cross Docking Works</SectionEyebrow>
          </Box>

          {/* ── Steps Grid ────────────────────────────────────── */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: { xs: 4, md: 6 },
              position: 'relative',
              zIndex: 1,
            }}
          >
            {crossDockingSteps.map((step) => {
              const Icon = step.icon;

              return (
                <Box key={step.id} sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                  <Box sx={ICON_CIRCLE_SX}>
                    <Icon sx={{ fontSize: 30 }} />
                  </Box>

                  <Box sx={{ pt: 0.5 }}>
                    <Typography component="h3" sx={STEP_TITLE_SX}>
                      {step.title}
                    </Typography>
                    <Typography sx={STEP_DESC_SX}>{step.description}</Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* ── Marquee Progress Bar ──────────────────────────── */}
          <Box sx={{ mt: 8, display: { xs: 'none', md: 'block' } }}>
            <LineLoader trackColor="rgba(255, 255, 255, 0.15)" activeColor={palette.orange} />
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};
