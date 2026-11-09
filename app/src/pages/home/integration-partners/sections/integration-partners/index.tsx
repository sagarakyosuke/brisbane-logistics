import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Section, SectionHeader, SectionWrap } from '@/components/sections';
import {
  integrationPartners,
  integrationSteps,
} from '@/utilities/_mock/home/integration-partners/integration-partners';

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Shared card base ─────────────────────────────────────────────── */

/** Common card shell — border, radius, hover lift. Extended by both card types. */
const CARD_BASE_SX: SxProps<Theme> = {
  bgcolor: 'var(--white)',
  border: '1px solid var(--line)',
  borderRadius: '14px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 'var(--shadow-sm)',
    borderColor: 'transparent',
  },
};

/* ── Platform cards (top grid) ────────────────────────────────────── */

const PARTNERS_GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, minmax(0, 1fr))',
    md: 'repeat(4, minmax(0, 1fr))',
  },
  gap: 3,
  mb: 3,
};

const PARTNER_CARD_SX: SxProps<Theme> = {
  ...CARD_BASE_SX,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  p: 4,
  minHeight: 160,
  textAlign: 'center',
};

const PARTNER_LOGO_SX: SxProps<Theme> = {
  height: 48,
  width: 'auto',
  objectFit: 'contain',
  mb: 1,
};

const PARTNER_NAME_SX: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '1.15rem',
  color: 'var(--navy)',
  lineHeight: 1.2,
};

const PARTNER_TYPE_SX: SxProps<Theme> = {
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
};

/* ── Step cards (bottom grid) ─────────────────────────────────────── */

const STEPS_GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
  gap: 3,
};

const STEP_CARD_SX: SxProps<Theme> = {
  ...CARD_BASE_SX,
  display: 'flex',
  alignItems: 'center',
  gap: 2.5,
  p: 3,
};

const STEP_ICON_BOX_SX: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  flex: 'none',
  width: 56,
  height: 56,
  borderRadius: '16px',
  bgcolor: 'var(--peach)',
  color: 'var(--orange)',
};

const STEP_ICON_SX = { fontSize: 26 } as const;

const STEP_TITLE_SX: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '1.05rem',
  color: 'var(--navy)',
  mb: 0.5,
  lineHeight: 1.25,
};

const STEP_DESC_SX: SxProps<Theme> = {
  fontSize: '0.9rem',
  color: 'var(--muted)',
  lineHeight: 1.5,
};

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const PartnerCard = ({ partner }: { partner: (typeof integrationPartners)[number] }) => (
  <Box sx={PARTNER_CARD_SX}>
    {partner.logo ? (
      <Box component="img" src={partner.logo} alt={`${partner.name} logo`} sx={PARTNER_LOGO_SX} />
    ) : (
      <Typography sx={PARTNER_NAME_SX}>{partner.name}</Typography>
    )}
    <Typography sx={PARTNER_TYPE_SX}>{partner.type}</Typography>
  </Box>
);

const StepCard = ({ step }: { step: (typeof integrationSteps)[number] }) => {
  const Icon = step.icon;

  return (
    <Box sx={STEP_CARD_SX}>
      <Box sx={STEP_ICON_BOX_SX}>
        <Icon sx={STEP_ICON_SX} />
      </Box>
      <Box>
        <Typography component="h3" sx={STEP_TITLE_SX}>
          {step.title}
        </Typography>
        <Typography sx={STEP_DESC_SX}>{step.desc}</Typography>
      </Box>
    </Box>
  );
};

/* =====================================================================
 * IntegrationPartnersSection
 * ===================================================================== */

export const IntegrationPartnersSection = () => (
  <Section delay={100}>
    <SectionWrap>
      <SectionHeader
        eyebrow="Integration partners"
        title={
          <>
            Platforms that fit{' '}
            <Box component="span" sx={{ color: 'var(--orange)' }}>
              your workflow.
            </Box>
          </>
        }
        lead="Tell us which platforms you use so we can confirm your integration requirements."
      />

      {/* Top — platform cards */}
      <Box sx={PARTNERS_GRID_SX}>
        {integrationPartners.map((partner) => (
          <PartnerCard key={partner.name} partner={partner} />
        ))}
      </Box>

      {/* Bottom — "Your …" step cards */}
      <Box sx={STEPS_GRID_SX}>
        {integrationSteps.map((step) => (
          <StepCard key={step.id} step={step} />
        ))}
      </Box>
    </SectionWrap>
  </Section>
);
