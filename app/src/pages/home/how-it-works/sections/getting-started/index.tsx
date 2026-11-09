// src/pages/home/how-it-works/sections/getting-started/index.tsx

import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { Section, SectionHeader, SectionWrap } from '@/components/sections';
import { Reveal } from '@/reusables/animation';
import { GETTING_STARTED_DATA } from '@/utilities/_mock/home/how-it-works/how-it-works';

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Layout ───────────────────────────────────────────────────────── */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: '1fr 1.2fr' },
  gap: { xs: 6, lg: 10 },
  alignItems: 'start',
};

const STEPS_COLUMN_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
};

/** Vertical connector behind the step badges. */
const CONNECTOR_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 40,
  bottom: 40,
  left: { xs: '30px', md: '40px' },
  width: '2px',
  bgcolor: 'var(--line)',
  zIndex: 0,
};

/* ── Info box ─────────────────────────────────────────────────────── */

const INFO_BOX_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  p: 3,
  bgcolor: 'var(--mist)',
  borderRadius: '12px',
  border: '1px solid var(--line)',
};

const INFO_ICON_SX = { color: 'var(--muted)', mt: 0.25 } as const;

const INFO_TEXT_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: 'var(--muted)',
  lineHeight: 1.5,
};

/* ── Step row ─────────────────────────────────────────────────────── */

const stepRowSx = (isLast: boolean): SxProps<Theme> => ({
  display: 'flex',
  gap: { xs: 2, md: 3 },
  position: 'relative',
  zIndex: 1,
  mb: isLast ? 0 : 3,
});

const STEP_BADGE_SX: SxProps<Theme> = {
  width: { xs: 60, md: 80 },
  height: { xs: 60, md: 80 },
  flexShrink: 0,
  bgcolor: 'var(--navy)',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 'var(--shadow-sm)',
};

const STEP_BADGE_TEXT_SX: SxProps<Theme> = {
  color: 'var(--white)',
  fontWeight: 800,
  fontSize: '1.25rem',
};

const STEP_CARD_SX: SxProps<Theme> = {
  flex: 1,
  bgcolor: 'var(--white)',
  border: '1px solid var(--line)',
  borderRadius: '16px',
  p: { xs: 3, md: 4 },
  boxShadow: '0 4px 20px -10px rgba(18,26,87,0.05)',
};

const STEP_TITLE_SX: SxProps<Theme> = {
  fontSize: '1.25rem',
  fontWeight: 800,
  color: 'var(--navy)',
  mb: 1,
};

const STEP_DESC_SX: SxProps<Theme> = {
  color: 'var(--muted)',
  fontSize: '1rem',
  lineHeight: 1.5,
};

/* =====================================================================
 * GettingStartedSection
 * ===================================================================== */

export const GettingStartedSection = () => (
  <Section delay={100}>
    <SectionWrap>
      <Box sx={GRID_SX}>
        {/* Left column — header + notice */}
        <Box>
          <Reveal delay={100}>
            <SectionHeader
              eyebrow={GETTING_STARTED_DATA.eyebrow}
              title={GETTING_STARTED_DATA.title}
              lead={GETTING_STARTED_DATA.description}
            />

            <Box sx={INFO_BOX_SX}>
              <InfoOutlined sx={INFO_ICON_SX} />
              <Typography sx={INFO_TEXT_SX}>{GETTING_STARTED_DATA.notice}</Typography>
            </Box>
          </Reveal>
        </Box>

        {/* Right column — numbered process steps */}
        <Box sx={STEPS_COLUMN_SX}>
          <Box sx={CONNECTOR_SX} />

          {GETTING_STARTED_DATA.steps.map((step, index) => {
            const isLast = index === GETTING_STARTED_DATA.steps.length - 1;

            return (
              <Reveal key={step.id} delay={150 + index * 100}>
                <Box sx={stepRowSx(isLast)}>
                  <Box sx={STEP_BADGE_SX}>
                    <Typography sx={STEP_BADGE_TEXT_SX}>{step.id}</Typography>
                  </Box>

                  <Box sx={STEP_CARD_SX}>
                    <Typography component="h3" sx={STEP_TITLE_SX}>
                      {step.title}
                    </Typography>
                    <Typography sx={STEP_DESC_SX}>{step.desc}</Typography>
                  </Box>
                </Box>
              </Reveal>
            );
          })}
        </Box>
      </Box>
    </SectionWrap>
  </Section>
);
