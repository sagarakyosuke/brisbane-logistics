import { useState } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { Section, SectionWrap } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { containerHandlingData } from '@/utilities/_mock/services/container-handling/container-handling';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: '1fr 1.2fr' },
  gap: { xs: 8, lg: 10 },
  alignItems: 'start',
};

/* ── Left Column ──────────────────────────────────────────────────── */

const LEFT_COLUMN_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const EYEBROW_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  fontSize: '0.74rem',
  fontWeight: 700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: palette.orange,
  '&::before': {
    content: '""',
    width: 24,
    height: 12,
    background: `
      linear-gradient(${palette.orange}, ${palette.orange}) 0 0 / 6px 100% no-repeat,
      linear-gradient(${palette.orange}, ${palette.orange}) 10px 0 / 6px 100% no-repeat,
      linear-gradient(${palette.orange}, ${palette.orange}) 20px 0 / 6px 100% no-repeat`,
    transform: 'skewX(-14deg)',
  },
};

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  color: palette.navy,
  lineHeight: 1.1,
  mt: 1,
  mb: 2,
};

const DESCRIPTION_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  color: palette.muted,
  lineHeight: 1.6,
  maxWidth: '48ch',
};

/* ── Right Column (Accordion) ─────────────────────────────────────── */

const ACCORDION_LIST_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const accordionItemSx = (isOpen: boolean): SxProps<Theme> => ({
  bgcolor: palette.white,
  border: `1.5px solid ${isOpen ? palette.orange : palette.line}`,
  borderRadius: '12px',
  p: 3,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
});

const ACCORDION_HEADER_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 2.5,
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
};

const ICON_SX = { fontSize: 24 } as const;

const ACCORDION_TITLE_SX: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: '1rem',
  color: palette.navy,
  flexGrow: 1,
};

const toggleButtonSx = (isOpen: boolean): SxProps<Theme> => ({
  display: 'grid',
  placeItems: 'center',
  width: 32,
  height: 32,
  borderRadius: '50%',
  bgcolor: isOpen ? palette.orange : palette.peach,
  color: isOpen ? palette.white : palette.orange,
  flexShrink: 0,
});

const ACCORDION_BODY_SX: SxProps<Theme> = {
  mt: 2,
  color: palette.muted,
  fontSize: '0.95rem',
  lineHeight: 1.6,
  pl: '68px',
};

/* =====================================================================
 * ContainerHandlingSection
 * ===================================================================== */

export const ContainerHandlingSection = () => {
  const { eyebrow, title, description, steps } = containerHandlingData;

  // Default only the first item to be open
  const [openId, setOpenId] = useState<string | null>(steps[0]?.id || null);

  return (
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={GRID_SX}>
          {/* Left Column */}
          <Box sx={LEFT_COLUMN_SX}>
            <Typography sx={EYEBROW_SX}>{eyebrow}</Typography>
            <Typography component="h2" sx={TITLE_SX}>
              {title}
            </Typography>
            <Typography sx={DESCRIPTION_SX}>{description}</Typography>
          </Box>

          {/* Right Column (Accordion) */}
          <Box sx={ACCORDION_LIST_SX}>
            {steps.map((step) => {
              const isOpen = openId === step.id;
              const Icon = step.icon;

              return (
                <Box
                  key={step.id}
                  onClick={() => setOpenId(isOpen ? null : step.id)}
                  sx={accordionItemSx(isOpen)}
                >
                  <Box sx={ACCORDION_HEADER_SX}>
                    <Box sx={ICON_BOX_SX}>
                      <Icon sx={ICON_SX} />
                    </Box>
                    <Typography sx={ACCORDION_TITLE_SX}>
                      {step.id}. {step.title}
                    </Typography>

                    <Box sx={toggleButtonSx(isOpen)}>
                      {isOpen ? <Close sx={{ fontSize: 18 }} /> : <Add sx={{ fontSize: 20 }} />}
                    </Box>
                  </Box>

                  {isOpen && <Typography sx={ACCORDION_BODY_SX}>{step.description}</Typography>}
                </Box>
              );
            })}
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};
