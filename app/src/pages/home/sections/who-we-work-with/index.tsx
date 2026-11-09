import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import {
  ArrowForward,
  BarChart,
  CheckCircle,
  Inventory,
  LocalShipping,
  Person,
  ShoppingCart,
  SyncAlt,
  Warehouse,
} from '@mui/icons-material';
import { AppButton } from '@/components/buttons';
import { Section, SectionEyebrow, SectionHeader, SectionWrap } from '@/components/sections';
import { audiences } from '@/utilities/_mock/home/home';

/* =====================================================================
 * Constants
 * ===================================================================== */

/** Icons shown in the audience tab buttons. */
const AUD_ICONS: Record<string, typeof Person> = {
  cart: ShoppingCart,
  container: LocalShipping,
  user: Person,
  chart: BarChart,
};

/** Icons shown in the service chips at the bottom of the panel. */
const SERVICE_ICONS: Record<string, typeof Person> = {
  ecommerce: ShoppingCart,
  'pick-and-pack': Inventory,
  warehousing: Warehouse,
  'container-handling': LocalShipping,
  'cross-docking': SyncAlt,
  transport: LocalShipping,
};

/** Human-readable labels for the service chips. */
const SERVICE_LABELS: Record<string, string> = {
  ecommerce: 'E-Commerce Fulfilment',
  'pick-and-pack': 'Pick & Pack',
  warehousing: 'Warehousing',
  'container-handling': 'Container Handling',
  'cross-docking': 'Cross Docking',
  transport: 'Transport',
};

/* =====================================================================
 * Types
 * ===================================================================== */

interface AudienceSectionProps {
  activeAudience: number;
  setActiveAudience: (index: number) => void;
}

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Layout ───────────────────────────────────────────────────────── */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: '320px 1fr' },
  gap: 4,
  alignItems: 'stretch',
};

/* ── Tab column ───────────────────────────────────────────────────── */

const TABS_COLUMN_SX: SxProps<Theme> = { display: 'grid', gap: 1.5, alignContent: 'start' };

const tabButtonSx = (isActive: boolean): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  p: 2,
  borderRadius: '14px',
  border: '1.5px solid',
  borderColor: isActive ? 'var(--navy)' : 'var(--line)',
  bgcolor: isActive ? 'var(--navy)' : 'var(--white)',
  color: isActive ? 'var(--white)' : 'var(--navy)',
  textAlign: 'left',
  cursor: 'pointer',
  fontWeight: 700,
  transition: 'all 0.25s ease',
  '&:hover': { borderColor: 'var(--navy)' },
  '& .icon-box': {
    bgcolor: isActive ? 'var(--orange)' : 'var(--peach)',
    color: isActive ? 'var(--navy)' : 'var(--orange)',
  },
});

const TAB_ICON_BOX_SX: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  width: 40,
  height: 40,
  borderRadius: '10px',
  transition: 'all 0.25s ease',
  flexShrink: 0,
};

const TAB_ICON_SX = { fontSize: 20 } as const;

/* ── Panel ────────────────────────────────────────────────────────── */

const PANEL_SX: SxProps<Theme> = {
  bgcolor: 'var(--white)',
  border: '1px solid var(--line)',
  borderRadius: '22px',
  p: { xs: 3, md: 5 },
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

const EYEBROW_WRAPPER_SX: SxProps<Theme> = { mb: 2 };

const PANEL_HEADING_SX: SxProps<Theme> = {
  fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)',
  fontWeight: 800,
  color: 'var(--navy)',
  mb: 1.5,
  lineHeight: 1.2,
};

const PANEL_DESCRIPTION_SX: SxProps<Theme> = {
  color: 'var(--muted)',
  fontSize: '1.02rem',
  lineHeight: 1.6,
};

const BENEFITS_LIST_SX: SxProps<Theme> = { display: 'grid', gap: 1.5 };

const BENEFIT_ROW_SX: SxProps<Theme> = { display: 'flex', gap: 1.5, alignItems: 'flex-start' };

const BENEFIT_ICON_SX: SxProps<Theme> = {
  fontSize: 20,
  color: 'var(--orange)',
  flexShrink: 0,
  mt: 0.2,
};

const BENEFIT_TEXT_SX: SxProps<Theme> = { color: 'var(--navy)', fontSize: '0.95rem' };

const CHIPS_HEADER_SX: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '0.9rem',
  color: 'var(--navy)',
  mb: 1.5,
};

const CHIPS_ROW_SX: SxProps<Theme> = { display: 'flex', flexWrap: 'wrap', gap: 1 };

const CHIP_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  px: 2,
  py: 1,
  borderRadius: 999,
  bgcolor: 'var(--peach)',
  color: 'var(--navy)',
  fontWeight: 600,
  fontSize: '0.85rem',
};

const CHIP_ICON_SX = { fontSize: 16, color: 'var(--orange)' } as const;

const CTA_WRAPPER_SX: SxProps<Theme> = { mt: 2 };

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const AudienceTab = ({
  item,
  isActive,
  onClick,
}: {
  item: (typeof audiences)[number];
  isActive: boolean;
  onClick: () => void;
}) => {
  const Icon = AUD_ICONS[item.icon] || Person;

  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      sx={tabButtonSx(isActive)}
    >
      <Box className="icon-box" sx={TAB_ICON_BOX_SX}>
        <Icon sx={TAB_ICON_SX} />
      </Box>
      {item.title}
    </Box>
  );
};

const ServiceChips = ({ services }: { services: string[] }) => (
  <Box sx={CHIPS_ROW_SX}>
    {services.map((serviceKey) => {
      const Icon = SERVICE_ICONS[serviceKey] || Inventory;
      const label = SERVICE_LABELS[serviceKey] || serviceKey;

      return (
        <Box key={serviceKey} sx={CHIP_SX}>
          <Icon sx={CHIP_ICON_SX} />
          {label}
        </Box>
      );
    })}
  </Box>
);

/* =====================================================================
 * AudienceSection
 * ===================================================================== */

export const AudienceSection = ({ activeAudience, setActiveAudience }: AudienceSectionProps) => {
  const currentAudience = audiences[activeAudience];

  return (
    <Section delay={100}>
      <SectionWrap>
        <SectionHeader
          eyebrow="Who we work with"
          title="Built for the way your business runs."
          lead="Pick the one that sounds most like you."
        />

        <Box sx={GRID_SX}>
          {/* Tabs */}
          <Box sx={TABS_COLUMN_SX}>
            {audiences.map((item, index) => (
              <AudienceTab
                key={item.id}
                item={item}
                isActive={index === activeAudience}
                onClick={() => setActiveAudience(index)}
              />
            ))}
          </Box>

          {/* Panel */}
          <Box sx={PANEL_SX}>
            <Box>
              <Box sx={EYEBROW_WRAPPER_SX}>
                <SectionEyebrow>{currentAudience.title}</SectionEyebrow>
              </Box>
              <Typography component="h3" sx={PANEL_HEADING_SX}>
                {currentAudience.heading}
              </Typography>
              <Typography sx={PANEL_DESCRIPTION_SX}>{currentAudience.description}</Typography>
            </Box>

            <Box sx={BENEFITS_LIST_SX}>
              {currentAudience.list.map((point) => (
                <Box key={point} sx={BENEFIT_ROW_SX}>
                  <CheckCircle sx={BENEFIT_ICON_SX} />
                  <Typography sx={BENEFIT_TEXT_SX}>{point}</Typography>
                </Box>
              ))}
            </Box>

            <Box>
              <Typography sx={CHIPS_HEADER_SX}>Services that usually fit</Typography>
              <ServiceChips services={currentAudience.services} />
            </Box>

            <Box sx={CTA_WRAPPER_SX}>
              <AppButton color="primary" size="large" endIcon={<ArrowForward />}>
                Get a 3PL Quote
              </AppButton>
            </Box>
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};
