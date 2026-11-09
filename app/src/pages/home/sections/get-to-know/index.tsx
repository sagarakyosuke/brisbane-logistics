import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router';
import { Section, SectionHeader, SectionWrap } from '@/components/sections';
import { helpfulLinks } from '@/utilities/_mock/home/home';

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Grid ─────────────────────────────────────────────────────────── */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
  gap: 3,
};

/* ── Card ─────────────────────────────────────────────────────────── */

const CARD_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  bgcolor: 'var(--white)',
  border: '1px solid var(--line)',
  borderRadius: '14px',
  p: 3.5,
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: 'var(--shadow)',
    borderColor: 'transparent',
    '& .icon-box': {
      bgcolor: 'var(--orange)',
      color: 'var(--white)',
      transform: 'rotate(-6deg)',
    },
    '& .cta-arrow': { transform: 'translateX(5px)' },
  },
};

const CARD_ICON_BOX_SX: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  width: 56,
  height: 56,
  borderRadius: '16px',
  bgcolor: 'var(--peach)',
  color: 'var(--orange)',
  transition: 'all 0.3s ease',
  mb: 2,
};

const CARD_ICON_SX = { fontSize: 28 } as const;

const CARD_TITLE_SX: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '1.15rem',
  color: 'var(--navy)',
  mb: 1,
};

const CARD_DESC_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: 'var(--muted)',
  lineHeight: 1.5,
  mb: 3,
  flexGrow: 1,
};

const CARD_CTA_ROW_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '0.9rem',
  color: 'var(--navy)',
  mt: 'auto',
};

const CARD_CTA_ICON_SX: SxProps<Theme> = {
  fontSize: 16,
  color: 'var(--orange)',
  transition: 'transform 0.25s ease',
};

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const HelpfulCard = ({ item }: { item: (typeof helpfulLinks)[number] }) => {
  const Icon = item.icon;

  return (
    <Box component={Link} to={item.path} sx={CARD_SX}>
      <Box className="icon-box" sx={CARD_ICON_BOX_SX}>
        <Icon sx={CARD_ICON_SX} />
      </Box>

      <Typography component="h3" sx={CARD_TITLE_SX}>
        {item.title}
      </Typography>

      <Typography sx={CARD_DESC_SX}>{item.desc}</Typography>

      <Box sx={CARD_CTA_ROW_SX}>
        {item.cta}
        <ArrowForward className="cta-arrow" sx={CARD_CTA_ICON_SX} />
      </Box>
    </Box>
  );
};

/* =====================================================================
 * HelpfulSection
 * ===================================================================== */

export const HelpfulSection = () => (
  <Section delay={100}>
    <SectionWrap>
      <SectionHeader
        eyebrow="Get to know Brisbane Logistics"
        title="Helpful information at your fingertips."
      />

      <Box sx={GRID_SX}>
        {helpfulLinks.map((item) => (
          <HelpfulCard key={item.id} item={item} />
        ))}
      </Box>
    </SectionWrap>
  </Section>
);
