import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward, InfoOutlined } from '@mui/icons-material';
import { AppButton } from '@/components/buttons';
import { Section, SectionEyebrow, SectionWrap } from '@/components/sections';
import {
  pickAndPackNote,
  pickAndPackQuoteItems,
  pickAndPackSteps,
} from '@/utilities/_mock/services/pick-and-pack-fulfilment/pick-and-pack-fulfilment';
import { palette } from '@/utilities/themes';

/* =====================================================================
 * Constants
 * ===================================================================== */

/** Sticky top offset — clears the fixed navbar height. */
const STICKY_TOP = '100px';

/** Height of the connector between step cards. */
const CONNECTOR_HEIGHT = 16;

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Layout ───────────────────────────────────────────────────────── */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: '1.6fr 1fr' },
  gap: { xs: 6, lg: 8 },
  alignItems: 'start',
};

const STEPS_COLUMN_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

/* ── Step card ────────────────────────────────────────────────────── */

const STEP_WRAPPER_SX: SxProps<Theme> = { position: 'relative' };

const STEP_CARD_SX: SxProps<Theme> = {
  bgcolor: palette.white,
  border: '1px solid',
  borderColor: palette.line,
  borderRadius: '16px',
  p: { xs: 3, md: 4 },
  display: 'flex',
  gap: 3,
  alignItems: 'flex-start',
  position: 'relative',
  zIndex: 2,
};

const STEP_BADGE_SX: SxProps<Theme> = {
  width: 48,
  height: 48,
  borderRadius: '12px',
  bgcolor: palette.navy,
  color: palette.white,
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  fontWeight: 800,
  fontSize: '1.2rem',
};

const STEP_TITLE_SX: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: '1.2rem',
  color: palette.navy,
  mb: 0.5,
};

const STEP_SUBTITLE_SX: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '0.95rem',
  color: palette.navy,
  mb: 1,
};

const STEP_DESC_SX: SxProps<Theme> = {
  color: palette.muted,
  fontSize: '0.95rem',
  lineHeight: 1.6,
};

/** Vertical connector between cards. */
const CONNECTOR_SX: SxProps<Theme> = {
  position: 'absolute',
  left: '47px',
  bottom: -CONNECTOR_HEIGHT,
  width: '2px',
  height: CONNECTOR_HEIGHT,
  bgcolor: palette.orange,
  zIndex: 1,
};

/* ── Note banner ──────────────────────────────────────────────────── */

const NOTE_BANNER_SX: SxProps<Theme> = {
  bgcolor: '#F8F9FC',
  border: '1px solid',
  borderColor: palette.line,
  borderRadius: '16px',
  p: { xs: 3, md: 3 },
  display: 'flex',
  gap: 2,
  alignItems: 'flex-start',
  mt: 1,
};

const NOTE_ICON_SX: SxProps<Theme> = { color: palette.navy, mt: 0.5 };

const NOTE_TEXT_SX: SxProps<Theme> = {
  color: palette.muted,
  fontSize: '0.95rem',
  lineHeight: 1.6,
};

const NOTE_STRONG_SX: SxProps<Theme> = { fontWeight: 700, color: palette.navy };

/* ── Sticky quote panel ───────────────────────────────────────────── */

const QUOTE_PANEL_SX: SxProps<Theme> = {
  position: 'sticky',
  top: STICKY_TOP,
  bgcolor: palette.navy,
  color: palette.white,
  borderRadius: '22px',
  p: { xs: 4, md: 5 },
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

const QUOTE_EYEBROW_WRAPPER_SX: SxProps<Theme> = { mb: 2 };

const QUOTE_TITLE_SX: SxProps<Theme> = { fontWeight: 800, mb: 1.5, lineHeight: 1.2 };

const QUOTE_LEAD_SX: SxProps<Theme> = { color: '#d4d8f3', fontSize: '0.95rem' };

const QUOTE_ITEMS_LIST_SX: SxProps<Theme> = { display: 'flex', flexDirection: 'column' };

/** Each quote item row; top divider only on first, bottom on all. */
const quoteItemRowSx = (isFirst: boolean): SxProps<Theme> => ({
  display: 'flex',
  gap: 2,
  alignItems: 'center',
  py: 2.5,
  borderTop: isFirst ? '1px solid rgba(255,255,255,0.1)' : 'none',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
});

const QUOTE_ITEM_ICON_BOX_SX: SxProps<Theme> = {
  width: 44,
  height: 44,
  borderRadius: '50%',
  bgcolor: 'rgba(255,255,255,0.1)',
  display: 'grid',
  placeItems: 'center',
  color: palette.orange,
  flexShrink: 0,
};

const QUOTE_ITEM_ICON_SX = { fontSize: 22 } as const;

const QUOTE_ITEM_TITLE_SX: SxProps<Theme> = { fontWeight: 700, fontSize: '0.95rem' };

const QUOTE_ITEM_DESC_SX: SxProps<Theme> = { color: '#c3c8ea', fontSize: '0.85rem' };

const QUOTE_ACTIONS_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  mt: 1,
};

const QUOTE_CTA_SX: SxProps<Theme> = { py: 1.5 };

const QUOTE_SECONDARY_CTA_SX: SxProps<Theme> = {
  py: 1.5,
  border: '1px solid rgba(255,255,255,0.3)',
};

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const StepCard = ({
  step,
  isLast,
}: {
  step: (typeof pickAndPackSteps)[number];
  isLast: boolean;
}) => (
  <Box sx={STEP_WRAPPER_SX}>
    <Box sx={STEP_CARD_SX}>
      <Box sx={STEP_BADGE_SX}>{step.id}</Box>
      <Box>
        <Typography component="h3" sx={STEP_TITLE_SX}>
          {step.title}
        </Typography>
        <Typography sx={STEP_SUBTITLE_SX}>{step.subtitle}</Typography>
        <Typography sx={STEP_DESC_SX}>{step.description}</Typography>
      </Box>
    </Box>

    {!isLast && <Box sx={CONNECTOR_SX} />}
  </Box>
);

const NoteBanner = () => (
  <Box sx={NOTE_BANNER_SX}>
    <InfoOutlined sx={NOTE_ICON_SX} />
    <Typography sx={NOTE_TEXT_SX}>
      <Box component="span" sx={NOTE_STRONG_SX}>
        Please note:
      </Box>{' '}
      {pickAndPackNote.replace('Please note: ', '')}
    </Typography>
  </Box>
);

const StickyQuotePanel = () => (
  <Box sx={QUOTE_PANEL_SX}>
    <Box>
      <Box sx={QUOTE_EYEBROW_WRAPPER_SX}>
        <SectionEyebrow>Get a Quote</SectionEyebrow>
      </Box>
      <Typography variant="h4" sx={QUOTE_TITLE_SX}>
        Let's plan your pick and pack solution.
      </Typography>
      <Typography sx={QUOTE_LEAD_SX}>
        Every business is different. Tell us about your products and order requirements.
      </Typography>
    </Box>

    <Box sx={QUOTE_ITEMS_LIST_SX}>
      {pickAndPackQuoteItems.map((item, i) => {
        const Icon = item.icon;
        return (
          <Box key={item.title} sx={quoteItemRowSx(i === 0)}>
            <Box sx={QUOTE_ITEM_ICON_BOX_SX}>
              <Icon sx={QUOTE_ITEM_ICON_SX} />
            </Box>
            <Box>
              <Typography sx={QUOTE_ITEM_TITLE_SX}>{item.title}</Typography>
              <Typography sx={QUOTE_ITEM_DESC_SX}>{item.desc}</Typography>
            </Box>
          </Box>
        );
      })}
    </Box>

    <Box sx={QUOTE_ACTIONS_SX}>
      <AppButton
        color="primary"
        size="large"
        endIcon={<ArrowForward />}
        href="#quote"
        fullWidth
        sx={QUOTE_CTA_SX}
      >
        Get a Pick & Pack Quote
      </AppButton>
      <AppButton color="ghostLight" size="large" href="#call" fullWidth sx={QUOTE_SECONDARY_CTA_SX}>
        Book a Call
      </AppButton>
    </Box>
  </Box>
);

/* =====================================================================
 * QuotationSection
 * ===================================================================== */

export const QuotationSection = () => (
  <Section delay={100}>
    <SectionWrap>
      <Box sx={GRID_SX}>
        {/* Left — steps + note */}
        <Box sx={STEPS_COLUMN_SX}>
          {pickAndPackSteps.map((step, index) => (
            <StepCard key={step.id} step={step} isLast={index === pickAndPackSteps.length - 1} />
          ))}
          <NoteBanner />
        </Box>

        {/* Right — sticky quote panel */}
        <StickyQuotePanel />
      </Box>
    </SectionWrap>
  </Section>
);
