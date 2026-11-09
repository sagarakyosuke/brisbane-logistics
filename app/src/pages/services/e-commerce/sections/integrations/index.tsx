// src/pages/services/e-commerce/sections/integrations/index.tsx

import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Section, SectionWrap, SectionHeader } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { integrationsData } from '@/utilities/_mock/services/e-commerce/integrations';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: '1.2fr 1fr' },
  gap: { xs: 8, lg: 10 },
  alignItems: 'center',
};

const LEFT_COLUMN_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
};

const CARDS_GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
  gap: 2.5,
  mt: 4,
};

const PLATFORM_CARD_SX: SxProps<Theme> = {
  bgcolor: palette.white,
  border: `1px solid ${palette.line}`,
  borderRadius: '12px',
  p: { xs: 3, md: 4 },
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
};

const PLATFORM_NAME_SX: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: '1.1rem',
  color: palette.navy,
};

const PLATFORM_TYPE_SX: SxProps<Theme> = {
  fontWeight: 600,
  fontSize: '0.65rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: palette.muted,
};

const INFO_CARD_SX: SxProps<Theme> = {
  bgcolor: palette.white,
  border: `1px solid ${palette.line}`,
  borderRadius: '16px',
  p: { xs: 4, md: 5 },
  boxShadow: 'var(--shadow-sm)',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const INFO_ICON_BOX_SX: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  width: 56,
  height: 56,
  borderRadius: '12px',
  bgcolor: palette.peach,
  color: palette.orange,
  mb: 1,
};

const INFO_TITLE_SX: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: '1.25rem',
  color: palette.navy,
};

const INFO_DESC_SX: SxProps<Theme> = {
  fontSize: '1rem',
  color: palette.muted,
  lineHeight: 1.6,
};

/* =====================================================================
 * IntegrationsSection
 * ===================================================================== */

export const IntegrationsSection = () => {
  const { eyebrow, title, description, integrations, infoCard } = integrationsData;
  const InfoIcon = infoCard.icon;

  return (
    <Section>
      <SectionWrap>
        <Box sx={GRID_SX}>
          <Box sx={LEFT_COLUMN_SX}>
            <SectionHeader eyebrow={eyebrow} title={title} lead={description} />

            <Box sx={CARDS_GRID_SX}>
              {integrations.map((platform) => (
                <Box key={platform.id} sx={PLATFORM_CARD_SX}>
                  <Typography sx={PLATFORM_NAME_SX}>{platform.name}</Typography>
                  <Typography sx={PLATFORM_TYPE_SX}>{platform.type}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={INFO_CARD_SX}>
            <Box sx={INFO_ICON_BOX_SX}>
              <InfoIcon sx={{ fontSize: 28 }} />
            </Box>
            <Typography sx={INFO_TITLE_SX}>{infoCard.title}</Typography>
            <Typography sx={INFO_DESC_SX}>{infoCard.description}</Typography>
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};
