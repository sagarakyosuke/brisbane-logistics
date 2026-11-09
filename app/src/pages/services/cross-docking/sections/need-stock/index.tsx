import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { AppButton } from '@/components/buttons';
import { Section, SectionEyebrow, SectionWrap } from '@/components/sections';
import { crossDockingNeedStockData } from '@/utilities/_mock/services/cross-docking/cross-docking';
import { palette } from '@/utilities/themes';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const BANNER_SX: SxProps<Theme> = {
  bgcolor: 'var(--mist)',
  borderRadius: '16px',
  p: { xs: 3, md: 4 },
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  alignItems: { xs: 'flex-start', md: 'center' },
  justifyContent: 'space-between',
  gap: 4,
};

/* ── Left column: icon + text ─────────────────────────────────────── */

const TEXT_ROW_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 3,
  alignItems: 'flex-start',
};

const ICON_TILE_SX: SxProps<Theme> = {
  width: 64,
  height: 64,
  borderRadius: '16px',
  bgcolor: palette.white,
  color: palette.orange,
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
};

const ICON_SX = { fontSize: 32 } as const;

const EYEBROW_WRAPPER_SX: SxProps<Theme> = { mb: 1 };

const TITLE_SX: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: '1.25rem',
  color: 'var(--navy)',
  mb: 0.5,
};

const DESCRIPTION_SX: SxProps<Theme> = {
  color: 'var(--muted)',
  fontSize: '0.95rem',
  lineHeight: 1.5,
};

/* ── Right column: CTA ────────────────────────────────────────────── */

const CTA_WRAPPER_SX: SxProps<Theme> = {
  flexShrink: 0,
  width: { xs: '100%', md: 'auto' },
};

const CTA_BUTTON_SX: SxProps<Theme> = {
  border: `2px solid ${palette.navy}`,
  color: palette.navy,
  py: 1.25,
  px: 3,
  '&:hover': {
    bgcolor: palette.navy,
    color: palette.white,
  },
};

/* =====================================================================
 * NeedStockSection
 * ===================================================================== */

export const NeedStockSection = () => {
  const { eyebrow, title, description, icon: Icon } = crossDockingNeedStockData;

  return (
    <Section tight delay={100}>
      <SectionWrap>
        <Box sx={BANNER_SX}>
          {/* Left — icon + text */}
          <Box sx={TEXT_ROW_SX}>
            <Box sx={ICON_TILE_SX}>
              <Icon sx={ICON_SX} />
            </Box>

            <Box>
              <Box sx={EYEBROW_WRAPPER_SX}>
                <SectionEyebrow>{eyebrow}</SectionEyebrow>
              </Box>
              <Typography component="h3" sx={TITLE_SX}>
                {title}
              </Typography>
              <Typography sx={DESCRIPTION_SX}>{description}</Typography>
            </Box>
          </Box>

          {/* Right — CTA */}
          <Box sx={CTA_WRAPPER_SX}>
            <AppButton
              color="outline"
              size="large"
              endIcon={<ArrowForward />}
              href="/services/warehousing"
              fullWidth
              sx={CTA_BUTTON_SX}
            >
              View Warehousing
            </AppButton>
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};
