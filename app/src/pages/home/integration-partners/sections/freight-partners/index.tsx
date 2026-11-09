import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Section, SectionHeader, SectionWrap } from '@/components/sections';
import { freightPartners } from '@/utilities/_mock/home/freight-partners/freight-partners';

/* =====================================================================
 * Constants
 * ===================================================================== */

/** Duration of one full marquee cycle. */
const MARQUEE_DURATION = '40s';

/** Card width — fixed so the marquee scroll speed stays constant regardless of card count. */
const CARD_WIDTH = 220;

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Marquee viewport ─────────────────────────────────────────────── */

const MARQUEE_VIEWPORT_SX: SxProps<Theme> = {
  mt: 4,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  // Fade out on both edges via a linear-gradient mask.
  maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
  WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
};

/* ── Marquee track ────────────────────────────────────────────────── */

/** Keyframes are declared once and reused by any duration. */
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
  gap: 3,
  animation: `marquee ${duration} linear infinite`,
  '&:hover': { animationPlayState: 'paused' },
  ...MARQUEE_KEYFRAMES,
});

/* ── Partner card ─────────────────────────────────────────────────── */

const CARD_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  bgcolor: 'var(--white)',
  border: '1px solid var(--line)',
  borderRadius: '14px',
  p: 3,
  width: CARD_WIDTH,
  minHeight: 140,
  textAlign: 'center',
  flexShrink: 0,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 'var(--shadow-sm)',
    borderColor: 'transparent',
  },
};

const LOGO_SX: SxProps<Theme> = {
  height: 40,
  width: '100%',
  maxWidth: 120,
  objectFit: 'contain',
  mb: 1,
};

const FALLBACK_NAME_SX: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '1.05rem',
  color: 'var(--navy)',
  lineHeight: 1.2,
};

const TYPE_LABEL_SX: SxProps<Theme> = {
  fontSize: '0.7rem',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
};

const DISCLAIMER_SX: SxProps<Theme> = {
  mt: 4,
  textAlign: 'center',
  fontSize: '0.9rem',
  color: 'var(--muted)',
};

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const PartnerCard = ({ partner }: { partner: (typeof freightPartners)[number] }) => (
  <Box sx={CARD_SX}>
    {partner.logo ? (
      <Box component="img" src={partner.logo} alt={`${partner.name} logo`} sx={LOGO_SX} />
    ) : (
      <Typography sx={FALLBACK_NAME_SX}>{partner.name}</Typography>
    )}

    <Typography sx={TYPE_LABEL_SX}>{partner.type}</Typography>
  </Box>
);

/* =====================================================================
 * FreightPartnersSection
 * ===================================================================== */

export const FreightPartnersSection = () => (
  <Section delay={100}>
    <SectionWrap>
      <SectionHeader
        eyebrow="Freight partners"
        title={
          <>
            Plan the next step{' '}
            <Box component="span" sx={{ color: 'var(--orange)' }}>
              in your deliveries.
            </Box>
          </>
        }
        lead="Discuss your destinations, delivery timeframes and freight requirements with our team."
      />
    </SectionWrap>

    {/* Marquee is intentionally outside SectionWrap so it scrolls full-bleed. */}
    <Box sx={MARQUEE_VIEWPORT_SX}>
      <Box sx={marqueeTrackSx(MARQUEE_DURATION)}>
        {/* List is duplicated for a seamless loop (translateX(-50%) wraps at the seam). */}
        {[...freightPartners, ...freightPartners].map((partner, index) => (
          <PartnerCard key={`${partner.name}-${index}`} partner={partner} />
        ))}
      </Box>
    </Box>

    <SectionWrap>
      <Typography sx={DISCLAIMER_SX}>
        Provider and service availability depends on your requirements.
      </Typography>
    </SectionWrap>
  </Section>
);
