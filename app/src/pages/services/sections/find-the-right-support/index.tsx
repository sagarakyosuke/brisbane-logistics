import { useState } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router';
import { Section, SectionHeader, SectionWrap } from '@/components/sections';
import { serviceOptions, serviceTags, type ServiceTag } from '@/utilities/_mock/services/services';

/* =====================================================================
 * Constants
 * ===================================================================== */

const DEFAULT_TAG: ServiceTag = 'Show everything';

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Filter pills ─────────────────────────────────────────────────── */

const PILLS_ROW_SX: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 1.5,
  mb: 5,
};

const pillSx = (isActive: boolean): SxProps<Theme> => ({
  padding: '10px 18px',
  borderRadius: '999px',
  border: '1.5px solid',
  borderColor: isActive ? 'var(--navy)' : 'var(--line)',
  fontWeight: 600,
  fontSize: '0.88rem',
  bgcolor: isActive ? 'var(--navy)' : 'var(--white)',
  color: isActive ? 'var(--white)' : 'var(--navy)',
  transition: 'all 0.2s',
  cursor: 'pointer',
  '&:hover': { borderColor: 'var(--navy)' },
});

/* ── Services grid ────────────────────────────────────────────────── */

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

const cardSx = (isActive: boolean): SxProps<Theme> => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  bgcolor: 'var(--white)',
  border: '1px solid',
  borderColor: isActive ? 'var(--orange)' : 'var(--line)',
  borderRadius: 'var(--radius)',
  p: 4,
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  opacity: isActive ? 1 : 0.4,
  textAlign: 'left',
  textDecoration: 'none', // Remove underline from Link
  cursor: 'pointer', // Explicit pointer cursor
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: 'var(--shadow)',
    borderColor: isActive ? 'var(--orange)' : 'transparent',
  },
  '&:hover .svc-bg-stripes': { opacity: 1 },
  '&:hover .cta-arrow': { transform: 'translateX(5px)' },
  '&:hover .explore-btn': { color: 'var(--orange)' },
});

const iconBoxSx = (isActive: boolean): SxProps<Theme> => ({
  display: 'grid',
  placeItems: 'center',
  width: 56,
  height: 56,
  borderRadius: '16px',
  bgcolor: isActive ? 'var(--orange)' : 'var(--peach)',
  color: isActive ? 'var(--white)' : 'var(--orange)',
  mb: 3,
  transition: 'all 0.3s ease',
  zIndex: 1,
});

const ICON_SX = { fontSize: 28 } as const;

const NUMBER_BADGE_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 24,
  right: 24,
  fontWeight: 800,
  fontSize: '1.6rem',
  color: 'var(--line)',
  lineHeight: 1,
  zIndex: 1,
};

const TITLE_SX: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '1.25rem',
  color: 'var(--navy)',
  mb: 1,
  zIndex: 1,
};

const DESC_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: 'var(--muted)',
  lineHeight: 1.6,
  mb: 4,
  flexGrow: 1,
  zIndex: 1,
};

const CTA_ROW_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '0.9rem',
  color: 'var(--navy)',
  mt: 'auto',
  transition: 'color 0.2s',
  zIndex: 1,
};

const CTA_ARROW_SX: SxProps<Theme> = {
  fontSize: 16,
  color: 'var(--orange)',
  transition: 'transform 0.25s ease',
};

/** Decorative diagonal stripes revealed on card hover. */
const STRIPES_SX: SxProps<Theme> = {
  position: 'absolute',
  right: '-30px',
  bottom: '-30px',
  width: '120px',
  height: '120px',
  background: 'repeating-linear-gradient(-76deg, var(--peach) 0 12px, transparent 12px 24px)',
  opacity: 0,
  transition: 'opacity 0.35s ease',
  pointerEvents: 'none',
};

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const FilterPill = ({
  tag,
  isActive,
  onClick,
}: {
  tag: ServiceTag;
  isActive: boolean;
  onClick: () => void;
}) => (
  <Box component="button" type="button" onClick={onClick} sx={pillSx(isActive)}>
    {tag}
  </Box>
);

const ServiceCard = ({
  service,
  isActive,
}: {
  service: (typeof serviceOptions)[number];
  isActive: boolean;
}) => {
  const Icon = service.icon;

  return (
    // Changed to Link and using service.path
    <Box component={Link} to={service.path} sx={cardSx(isActive)}>
      <Typography sx={NUMBER_BADGE_SX}>{service.num}</Typography>

      <Box sx={iconBoxSx(isActive)}>
        <Icon sx={ICON_SX} />
      </Box>

      <Typography component="h3" sx={TITLE_SX}>
        {service.title}
      </Typography>

      <Typography sx={DESC_SX}>{service.desc}</Typography>

      <Box className="explore-btn" sx={CTA_ROW_SX}>
        Explore service
        <ArrowForward className="cta-arrow" sx={CTA_ARROW_SX} />
      </Box>

      <Box className="svc-bg-stripes" sx={STRIPES_SX} />
    </Box>
  );
};

/* =====================================================================
 * FindTheRightSupportSection
 * ===================================================================== */

export const FindTheRightSupportSection = () => {
  const [activeTag, setActiveTag] = useState<ServiceTag>(DEFAULT_TAG);

  return (
    <Section id="services" delay={100}>
      <SectionWrap>
        <SectionHeader
          eyebrow="Find the right support"
          title="What does your business need?"
          lead="Tap what sounds like you and we'll highlight the services that usually fit."
        />

        <Box sx={PILLS_ROW_SX}>
          {serviceTags.map((tag) => (
            <FilterPill
              key={tag}
              tag={tag}
              isActive={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            />
          ))}
        </Box>

        <Box sx={GRID_SX}>
          {serviceOptions.map((service) => {
            const isActive = activeTag === 'Show everything' || service.tags.includes(activeTag);

            return <ServiceCard key={service.id} service={service} isActive={isActive} />;
          })}
        </Box>
      </SectionWrap>
    </Section>
  );
};
