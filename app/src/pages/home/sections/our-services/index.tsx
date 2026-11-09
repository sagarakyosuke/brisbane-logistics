import type { ReactNode } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router';
import { Section, SectionHeader, SectionWrap } from '@/components/sections';
import { serviceItems } from '@/utilities/_mock/home/home';

/* =====================================================================
 * Constants
 * ===================================================================== */

const DEFAULT_ARROW_LINK_TO = '/services';

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Grid ─────────────────────────────────────────────────────────── */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    md: 'repeat(2, minmax(0, 1fr))',
    lg: 'repeat(3, minmax(0, 1fr))',
  },
  gap: 3,
};

/* ── Service card ─────────────────────────────────────────────────── */

const CARD_SX: SxProps<Theme> = {
  position: 'relative',
  bgcolor: 'var(--white)',
  border: '1px solid var(--line)',
  borderRadius: '14px',
  p: 3.5,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: 'var(--shadow)',
    borderColor: 'transparent',
    '& .icon-box': {
      bgcolor: 'var(--orange)',
      color: 'var(--white)',
      transform: 'rotate(-6deg)',
    },
    '& .explore-arrow': { transform: 'translateX(5px)' },
  },
};

const CARD_HEADER_SX: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  mb: 2,
};

const ICON_BOX_SX: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  width: 56,
  height: 56,
  borderRadius: '16px',
  bgcolor: 'var(--peach)',
  color: 'var(--orange)',
  transition: 'all 0.3s ease',
};

const ICON_SX = { fontSize: 28 } as const;

const CARD_NUMBER_SX: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: '1.6rem',
  color: 'var(--line)',
  lineHeight: 1,
};

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

const CARD_LINK_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '0.9rem',
  color: 'var(--navy)',
  textDecoration: 'none',
  mt: 'auto',
};

const CARD_LINK_ARROW_SX: SxProps<Theme> = {
  fontSize: 16,
  color: 'var(--orange)',
  transition: 'transform 0.25s ease',
};

/* ── Arrow link ───────────────────────────────────────────────────── */

const ARROW_LINK_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '1rem',
  color: 'var(--navy)',
  textDecoration: 'none',
  borderBottom: '2px solid var(--orange)',
  pb: 0.5,
  transition: 'opacity 0.2s',
  '&:hover': { opacity: 0.7 },
  '&:hover .arrow': { transform: 'translateX(4px)' },
};

const ARROW_ICON_SX: SxProps<Theme> = {
  fontSize: 20,
  color: 'var(--orange)',
  transition: 'transform 0.25s ease',
};

const ARROW_LINK_WRAPPER_SX: SxProps<Theme> = { mt: 6 };

/* =====================================================================
 * Sub-components
 * ===================================================================== */

interface ArrowLinkProps {
  to?: string;
  children: ReactNode;
}

const ArrowLink = ({ to = DEFAULT_ARROW_LINK_TO, children }: ArrowLinkProps) => (
  <Box component={Link} to={to} sx={ARROW_LINK_SX}>
    {children}
    <ArrowForward className="arrow" sx={ARROW_ICON_SX} />
  </Box>
);

const ServiceCard = ({ item }: { item: (typeof serviceItems)[number] }) => {
  const Icon = item.icon;

  return (
    <Box sx={CARD_SX}>
      <Box sx={CARD_HEADER_SX}>
        <Box className="icon-box" sx={ICON_BOX_SX}>
          <Icon sx={ICON_SX} />
        </Box>
        <Typography sx={CARD_NUMBER_SX}>{item.id}</Typography>
      </Box>

      <Typography component="h3" sx={CARD_TITLE_SX}>
        {item.title}
      </Typography>

      <Typography sx={CARD_DESC_SX}>{item.desc}</Typography>

      <Box component={Link} to={item.path} sx={CARD_LINK_SX}>
        Explore service
        <ArrowForward className="explore-arrow" sx={CARD_LINK_ARROW_SX} />
      </Box>
    </Box>
  );
};

/* =====================================================================
 * ServicesSection
 * ===================================================================== */

export const ServicesSection = () => (
  <Section delay={100}>
    <SectionWrap>
      <SectionHeader
        eyebrow="Our Services"
        title="Where do you need support?"
        lead="Choose a service to see how it works, or combine several into one arrangement."
      />

      <Box sx={GRID_SX}>
        {serviceItems.map((item) => (
          <ServiceCard key={item.id} item={item} />
        ))}
      </Box>

      <Box sx={ARROW_LINK_WRAPPER_SX}>
        <ArrowLink>Compare all services</ArrowLink>
      </Box>
    </SectionWrap>
  </Section>
);
