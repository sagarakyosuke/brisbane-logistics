// src/pages/home/integration-partners/sections/warehouse-management/index.tsx

import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward, ViewInAr } from '@mui/icons-material';
import { AppButton } from '@/components/buttons';
import { Section, SectionEyebrow, SectionWrap } from '@/components/sections';
import { Reveal } from '@/reusables/animation';
import { WMS_PARTNER_DATA } from '@/utilities/_mock/home/warehouse-management/warehouse-management';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1.2fr' },
  gap: { xs: 6, md: 10 },
  alignItems: 'center',
};

/* ── Left column: text & CTA ──────────────────────────────────────── */

const TEXT_COLUMN_SX: SxProps<Theme> = { textAlign: 'left', mb: 4 };

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 900,
  color: 'var(--navy)',
  lineHeight: 1.1,
  mt: 2,
  mb: 3,
};

const TITLE_ACCENT_SX: SxProps<Theme> = { color: 'var(--orange)' };

const DESCRIPTION_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  color: 'var(--muted)',
  lineHeight: 1.6,
  mb: 4,
  maxWidth: 450,
};

/* ── Right column: partner card ───────────────────────────────────── */

const CARD_SX: SxProps<Theme> = {
  bgcolor: 'var(--white)',
  borderRadius: '16px',
  p: { xs: 4, md: 5 },
  boxShadow: '0 20px 40px -10px rgba(18,26,87,0.08)',
  border: '1px solid var(--line)',
};

const CARD_HEADER_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  mb: 3,
};

const CARD_ICON_BOX_SX: SxProps<Theme> = {
  width: 64,
  height: 64,
  borderRadius: '16px',
  bgcolor: 'var(--navy)',
  color: 'var(--white)',
  display: 'grid',
  placeItems: 'center',
};

const CARD_ICON_SX = { fontSize: 32 } as const;

const CARD_TITLE_SX: SxProps<Theme> = {
  fontSize: '1.8rem',
  fontWeight: 800,
  color: 'var(--navy)',
  letterSpacing: '-0.02em',
};

const CARD_DESCRIPTION_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  color: 'var(--muted)',
  lineHeight: 1.6,
  mb: 3,
};

const CARD_DIVIDER_SX: SxProps<Theme> = {
  height: '1px',
  bgcolor: 'var(--line)',
  width: '100%',
  mb: 3,
};

const CARD_NOTE_SX: SxProps<Theme> = {
  fontSize: '0.9rem',
  color: 'var(--muted)',
};

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const TextColumn = () => (
  <Box sx={TEXT_COLUMN_SX}>
    <SectionEyebrow>{WMS_PARTNER_DATA.eyebrow}</SectionEyebrow>

    <Typography component="h2" sx={TITLE_SX}>
      {WMS_PARTNER_DATA.titleLine1}
      <br />
      <Box component="span" sx={TITLE_ACCENT_SX}>
        {WMS_PARTNER_DATA.titleLine2}
      </Box>
    </Typography>

    <Typography sx={DESCRIPTION_SX}>{WMS_PARTNER_DATA.description}</Typography>

    <AppButton color="primary" size="large" endIcon={<ArrowForward />}>
      {WMS_PARTNER_DATA.cta}
    </AppButton>
  </Box>
);

const PartnerCard = () => (
  <Box sx={CARD_SX}>
    <Box sx={CARD_HEADER_SX}>
      <Box sx={CARD_ICON_BOX_SX}>
        <ViewInAr sx={CARD_ICON_SX} />
      </Box>
      <Typography sx={CARD_TITLE_SX}>{WMS_PARTNER_DATA.partner.name}</Typography>
    </Box>

    <Typography sx={CARD_DESCRIPTION_SX}>{WMS_PARTNER_DATA.partner.description}</Typography>

    <Box sx={CARD_DIVIDER_SX} />

    <Typography sx={CARD_NOTE_SX}>{WMS_PARTNER_DATA.partner.note}</Typography>
  </Box>
);

/* =====================================================================
 * WarehouseManagementSection
 * ===================================================================== */

export const WarehouseManagementSection = () => (
  <Section delay={100}>
    <SectionWrap>
      <Box sx={GRID_SX}>
        <Reveal delay={100}>
          <TextColumn />
        </Reveal>

        <Reveal delay={200}>
          <PartnerCard />
        </Reveal>
      </Box>
    </SectionWrap>
  </Section>
);
