import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { Section, SectionHeader, SectionWrap } from '@/components/sections';
import {
  transportInfoCard,
  transportServices,
} from '@/utilities/_mock/services/transport-and-distribution/transport-and-distribution';
import { palette } from '@/utilities/themes';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    md: 'repeat(2, 1fr)',
    lg: 'repeat(3, 1fr)',
  },
  gap: 3,
};

/* ── Service card ─────────────────────────────────────────────────── */

const SERVICE_CARD_SX: SxProps<Theme> = {
  bgcolor: palette.white,
  border: '1px solid',
  borderColor: palette.line,
  borderRadius: '16px',
  p: { xs: 3, md: 4 },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: palette.orange,
    boxShadow: 'var(--shadow-sm)',
    transform: 'translateY(-4px)',
  },
};

const SERVICE_ICON_BOX_SX: SxProps<Theme> = {
  width: 56,
  height: 56,
  borderRadius: '16px',
  bgcolor: palette.peach,
  color: palette.orange,
  display: 'grid',
  placeItems: 'center',
  mb: 3,
};

const SERVICE_ICON_SX = { fontSize: 28 } as const;

const SERVICE_TITLE_SX: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '1.15rem',
  color: palette.navy,
  mb: 1,
};

const SERVICE_DESC_SX: SxProps<Theme> = {
  color: palette.muted,
  fontSize: '0.95rem',
  lineHeight: 1.5,
};

/* ── Info card ────────────────────────────────────────────────────── */

const INFO_CARD_SX: SxProps<Theme> = {
  bgcolor: palette.mist,
  border: '1px solid',
  borderColor: palette.line,
  borderRadius: '16px',
  p: { xs: 3, md: 4 },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const INFO_ICON_BOX_SX: SxProps<Theme> = {
  width: 56,
  height: 56,
  borderRadius: '16px',
  bgcolor: palette.white,
  color: palette.navy,
  display: 'grid',
  placeItems: 'center',
  mb: 3,
  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
};

const INFO_ICON_SX = { fontSize: 28 } as const;

const INFO_TEXT_SX: SxProps<Theme> = {
  color: palette.muted,
  fontSize: '0.95rem',
  lineHeight: 1.6,
};

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const ServiceCard = ({ service }: { service: (typeof transportServices)[number] }) => {
  const Icon = service.icon;

  return (
    <Box sx={SERVICE_CARD_SX}>
      <Box sx={SERVICE_ICON_BOX_SX}>
        <Icon sx={SERVICE_ICON_SX} />
      </Box>
      <Typography component="h3" sx={SERVICE_TITLE_SX}>
        {service.title}
      </Typography>
      <Typography sx={SERVICE_DESC_SX}>{service.description}</Typography>
    </Box>
  );
};

const InfoCard = () => (
  <Box sx={INFO_CARD_SX}>
    <Box sx={INFO_ICON_BOX_SX}>
      <InfoOutlined sx={INFO_ICON_SX} />
    </Box>
    <Typography sx={INFO_TEXT_SX}>{transportInfoCard.title}</Typography>
  </Box>
);

/* =====================================================================
 * OurTransportDistributionSection
 * ===================================================================== */

export const OurTransportDistributionSection = () => (
  <Section delay={100}>
    <SectionWrap>
      <SectionHeader
        eyebrow="Our Transport & Distribution Services"
        title="Flexible freight solutions."
        lead="Our fleet and freight partner network support a range of delivery needs, with one point of contact to coordinate your freight."
      />

      <Box sx={GRID_SX}>
        {transportServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
        <InfoCard />
      </Box>
    </SectionWrap>
  </Section>
);
