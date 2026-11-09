import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Section, SectionEyebrow, SectionWrap } from '@/components/sections';
import { combineServicesList } from '@/utilities/_mock/services/combine-services/combine-services';

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Layout ───────────────────────────────────────────────────────── */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1.1fr' },
  gap: { xs: 6, md: 8 },
  alignItems: 'center',
};

const EYEBROW_WRAPPER_SX: SxProps<Theme> = { mb: 2 };

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: 'var(--navy)',
  mb: 3,
};

const LEAD_SX: SxProps<Theme> = {
  fontSize: '1.05rem',
  color: 'var(--muted)',
  lineHeight: 1.6,
  maxWidth: 500,
};

/* ── Cards column ─────────────────────────────────────────────────── */

const CARDS_COLUMN_SX: SxProps<Theme> = { display: 'grid', gap: 2 };

/**
 * Card base — `isHighlighted` promotes the border to brand orange for the
 * "featured" service in the list.
 */
const cardSx = (isHighlighted: boolean): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 3,
  bgcolor: 'var(--white)',
  border: '1px solid',
  borderColor: isHighlighted ? 'var(--orange)' : 'var(--line)',
  borderRadius: '16px',
  p: 2.5,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 'var(--shadow)',
    borderColor: 'var(--orange)',
    '& .icon-box': {
      bgcolor: 'var(--orange)',
      color: 'var(--white)',
      transform: 'rotate(-6deg)',
    },
  },
});

const ICON_BOX_SX: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  flex: 'none',
  width: 56,
  height: 56,
  borderRadius: '12px',
  bgcolor: 'var(--peach)',
  color: 'var(--orange)',
  transition: 'all 0.3s ease',
};

const ICON_SX = { fontSize: 26 } as const;

const CARD_TITLE_SX: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '1.1rem',
  color: 'var(--navy)',
  mb: 0.5,
  lineHeight: 1.2,
};

const CARD_DESC_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: 'var(--muted)',
  lineHeight: 1.4,
};

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const ServiceCard = ({ item }: { item: (typeof combineServicesList)[number] }) => {
  const Icon = item.icon;

  return (
    <Box sx={cardSx(!!item.isHighlighted)}>
      <Box className="icon-box" sx={ICON_BOX_SX}>
        <Icon sx={ICON_SX} />
      </Box>

      <Box>
        <Typography component="h3" sx={CARD_TITLE_SX}>
          {item.title}
        </Typography>
        <Typography sx={CARD_DESC_SX}>{item.desc}</Typography>
      </Box>
    </Box>
  );
};

/* =====================================================================
 * CombineServicesSection
 * ===================================================================== */

export const CombineServicesSection = () => (
  <Section delay={100}>
    <SectionWrap>
      <Box sx={GRID_SX}>
        {/* Left — text content */}
        <Box>
          <Box sx={EYEBROW_WRAPPER_SX}>
            <SectionEyebrow>Combine services</SectionEyebrow>
          </Box>

          <Typography component="h2" sx={TITLE_SX}>
            One team. One arrangement.
          </Typography>

          <Typography sx={LEAD_SX}>
            Most clients use more than one service. Container unpacks can flow into storage, storage
            into pick and pack, and orders into delivery, all coordinated by the same Brisbane team.
          </Typography>
        </Box>

        {/* Right — service cards */}
        <Box sx={CARDS_COLUMN_SX}>
          {combineServicesList.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </Box>
      </Box>
    </SectionWrap>
  </Section>
);
