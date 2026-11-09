import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router';
import { Section, SectionWrap } from '@/components/sections';
import { needOnlineStoreData } from '@/utilities/_mock/services/pick-and-pack-fulfilment/pick-and-pack-fulfilment';
import { palette } from '@/utilities/themes';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const CARD_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  alignItems: { xs: 'flex-start', md: 'center' },
  justifyContent: 'space-between',
  gap: 4,
  bgcolor: palette.white,
  border: '1px solid',
  borderColor: palette.line,
  borderRadius: '16px',
  p: { xs: 3, md: 4 },
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: palette.orange,
    boxShadow: 'var(--shadow-sm)',
    transform: 'translateY(-4px)',
    '& .cta-arrow': { transform: 'translateX(4px)' },
    '& .icon-box': { bgcolor: palette.orange, color: palette.white },
  },
};

/* ── Left column: icon + text ─────────────────────────────────────── */

const TEXT_ROW_SX: SxProps<Theme> = { display: 'flex', gap: 3, alignItems: 'center' };

const ICON_BOX_SX: SxProps<Theme> = {
  width: 64,
  height: 64,
  borderRadius: '16px',
  bgcolor: palette.peach,
  color: palette.orange,
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  transition: 'all 0.3s ease',
};

const ICON_SX = { fontSize: 32 } as const;

const TITLE_SX: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: '1.25rem',
  color: palette.navy,
  mb: 0.5,
};

const DESCRIPTION_SX: SxProps<Theme> = {
  color: palette.muted,
  fontSize: '0.95rem',
  lineHeight: 1.5,
};

/* ── Right column: CTA ────────────────────────────────────────────── */

const CTA_ROW_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '0.95rem',
  color: palette.navy,
  flexShrink: 0,
  mt: { xs: 1, md: 0 },
};

const CTA_ARROW_SX: SxProps<Theme> = {
  fontSize: 20,
  color: palette.orange,
  transition: 'transform 0.3s',
};

/* =====================================================================
 * NeedOnlineStoreSection
 * ===================================================================== */

export const NeedOnlineStoreSection = () => {
  const { icon: Icon, title, description, ctaLabel, ctaHref } = needOnlineStoreData;

  return (
    <Section tight delay={100}>
      <SectionWrap>
        <Box component={Link} to={ctaHref} sx={CARD_SX}>
          {/* Left — icon + text */}
          <Box sx={TEXT_ROW_SX}>
            <Box className="icon-box" sx={ICON_BOX_SX}>
              <Icon sx={ICON_SX} />
            </Box>

            <Box>
              <Typography component="h3" sx={TITLE_SX}>
                {title}
              </Typography>
              <Typography sx={DESCRIPTION_SX}>{description}</Typography>
            </Box>
          </Box>

          {/* Right — CTA */}
          <Box sx={CTA_ROW_SX}>
            {ctaLabel}
            <ArrowForward className="cta-arrow" sx={CTA_ARROW_SX} />
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};
