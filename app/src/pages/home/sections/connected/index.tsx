import type { ReactNode } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router';
import { Section, SectionHeader, SectionWrap } from '@/components/sections';
import { partnersList } from '@/utilities/_mock/home/home';

/* =====================================================================
 * Constants
 * ===================================================================== */

/** Duration of one full marquee cycle. */
const MARQUEE_DURATION = '40s';

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Marquee ──────────────────────────────────────────────────────── */

const MARQUEE_KEYFRAMES = {
  '@keyframes marquee': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  },
};

const marqueeTrackSx = (duration: string): SxProps<Theme> => ({
  display: 'flex',
  width: 'max-content',
  alignItems: 'center',
  animation: `marquee ${duration} linear infinite`,
  '&:hover': { animationPlayState: 'paused' },
  ...MARQUEE_KEYFRAMES,
});

const MARQUEE_VIEWPORT_SX: SxProps<Theme> = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  maskImage: 'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)',
  WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)',
  py: 2,
};

/* ── Partner card ─────────────────────────────────────────────────── */

const PARTNER_CARD_SX: SxProps<Theme> = {
  flex: 'none',
  width: { xs: 200, md: 260 },
  height: 120,
  bgcolor: 'var(--white)',
  border: '1px solid var(--line)',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1,
  px: 2.5,
  mx: 1.5,
};

const PARTNER_LOGO_SX: SxProps<Theme> = {
  display: 'block',
  height: 44,
  width: 'auto',
  maxWidth: '100%',
  objectFit: 'contain',
};

const PARTNER_NAME_SX: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: '1.3rem',
  color: 'var(--navy)',
  letterSpacing: '-0.01em',
  lineHeight: 1.2,
  textAlign: 'center',
};

const PARTNER_TYPE_SX: SxProps<Theme> = {
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
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

const ARROW_LINK_WRAPPER_SX: SxProps<Theme> = { mt: 4 };

/* =====================================================================
 * Sub-components
 * ===================================================================== */

interface ArrowLinkProps {
  to?: string;
  children: ReactNode;
}

const ArrowLink = ({ to = '/partners', children }: ArrowLinkProps) => (
  <Box component={Link} to={to} sx={ARROW_LINK_SX}>
    {children}
    <ArrowForward className="arrow" sx={ARROW_ICON_SX} />
  </Box>
);

const PartnerCard = ({ partner }: { partner: (typeof partnersList)[number] }) => (
  <Box sx={PARTNER_CARD_SX}>
    {partner.logo ? (
      <Box component="img" src={partner.logo} alt={partner.name} sx={PARTNER_LOGO_SX} />
    ) : (
      <Typography sx={PARTNER_NAME_SX}>{partner.name}</Typography>
    )}
    <Typography sx={PARTNER_TYPE_SX}>{partner.type}</Typography>
  </Box>
);

/* =====================================================================
 * PartnersSection
 * ===================================================================== */

export const PartnersSection = () => (
  <Section delay={100}>
    <SectionWrap>
      <SectionHeader
        eyebrow="Connected"
        title="Works with the platforms and carriers you already use."
      />

      <Box sx={MARQUEE_VIEWPORT_SX}>
        <Box sx={marqueeTrackSx(MARQUEE_DURATION)}>
          {/* List is duplicated for a seamless loop (translateX(-50%) wraps at the seam). */}
          {[...partnersList, ...partnersList].map((partner, index) => (
            <PartnerCard key={`${partner.name}-${index}`} partner={partner} />
          ))}
        </Box>
      </Box>

      <Box sx={ARROW_LINK_WRAPPER_SX}>
        <ArrowLink to="/partners">See our partners</ArrowLink>
      </Box>
    </SectionWrap>
  </Section>
);
