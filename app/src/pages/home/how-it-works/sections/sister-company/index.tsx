import type { ElementType, ReactNode } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import {
  ArrowForward,
  ChatBubbleOutlined,
  Description,
  DirectionsBoat,
  Inventory2,
  LocalShipping,
  OpenInNew,
  Warehouse,
} from '@mui/icons-material';
import { AppButton } from '@/components/buttons';
import { JourneyProgress } from '@/components/extras/journey-progress';
import { Section, SectionEyebrow, SectionWrap } from '@/components/sections';
import { Reveal } from '@/reusables/animation';
import { SISTER_COMPANY_DATA } from '@/utilities/_mock/home/how-it-works/how-it-works';

/* =====================================================================
 * Constants
 * ===================================================================== */

/** Maps `timeline[].icon` string keys to MUI icon components. */
const ICONS: Record<string, ElementType> = {
  ship: DirectionsBoat,
  doc: Description,
  warehouse: Warehouse,
  box: Inventory2,
  truck: LocalShipping,
};

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Intro row (left: brand lockup, right: description + CTA) ─────── */

const INTRO_GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
  gap: { xs: 6, md: 10 },
  alignItems: 'center',
  mb: 8,
};

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 4vw, 3rem)',
  fontWeight: 900,
  color: 'var(--navy)',
  lineHeight: 1.1,
  mb: 4,
  whiteSpace: 'pre-line',
};

const DESCRIPTION_SX: SxProps<Theme> = {
  color: 'var(--muted)',
  fontSize: '1.1rem',
  lineHeight: 1.6,
  mb: 4,
};

/* ── Kenter brand lockup ──────────────────────────────────────────── */

const LOCKUP_ROW_SX: SxProps<Theme> = { display: 'flex', alignItems: 'center', gap: 1 };

const LOCKUP_DOTS_SX: SxProps<Theme> = { display: 'flex', gap: '4px' };

const LOCKUP_DOT_SX: SxProps<Theme> = {
  width: 16,
  height: 16,
  borderRadius: '50%',
  border: '4px solid var(--orange)',
};

/** Second dot overlaps the first via `ml: -2`. Kept separate so the base stays shared. */
const LOCKUP_DOT_OVERLAP_SX: SxProps<Theme> = { ...LOCKUP_DOT_SX, ml: -2 };

const LOCKUP_TEXT_SX: SxProps<Theme> = {
  fontSize: '2.5rem',
  fontWeight: 800,
  color: 'var(--navy)',
  letterSpacing: '-0.03em',
};

/* ── Timeline card ────────────────────────────────────────────────── */

const TIMELINE_CARD_SX: SxProps<Theme> = {
  bgcolor: 'var(--white)',
  borderRadius: '24px',
  p: { xs: 4, md: 6 },
  boxShadow: 'var(--shadow-sm)',
  border: '1px solid var(--line)',
};

/* ── Notice bar ───────────────────────────────────────────────────── */

const NOTICE_BAR_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 3,
  bgcolor: 'var(--white)',
  p: 3,
  borderRadius: '12px',
  border: '1px solid var(--line)',
  mt: 4,
};

const NOTICE_TEXT_ROW_SX: SxProps<Theme> = { display: 'flex', gap: 2, alignItems: 'center' };

const NOTICE_ICON_SX = { color: 'var(--muted)' } as const;

const NOTICE_TEXT_SX: SxProps<Theme> = { color: 'var(--muted)' };

const NOTICE_STRONG_SX = { color: 'var(--navy)' } as const;

const NOTICE_LINK_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  color: 'var(--navy)',
  fontWeight: 800,
  textDecoration: 'underline',
  textUnderlineOffset: '4px',
  '&:hover': { color: 'var(--orange)' },
};

const NOTICE_LINK_ICON_SX = { fontSize: 18 } as const;

/* ── CTA ──────────────────────────────────────────────────────────── */

/** Open-in-new icon — sized down from the button's default. */
const CTA_ICON_SX = { fontSize: '18px !important' } as const;

const CTA_EXTERNAL_PROPS = { target: '_blank', rel: 'noopener noreferrer' } as const;

/* =====================================================================
 * Sub-components
 * ===================================================================== */

/** The overlapping orange dots + "kenter" wordmark. */
const KenterLockup = () => (
  <Box sx={LOCKUP_ROW_SX}>
    <Box sx={LOCKUP_DOTS_SX}>
      <Box sx={LOCKUP_DOT_SX} />
      <Box sx={LOCKUP_DOT_OVERLAP_SX} />
    </Box>
    <Typography sx={LOCKUP_TEXT_SX}>kenter</Typography>
  </Box>
);

/**
 * Rich-text notice bar. Accepts pre-built `<strong>` content so the caller
 * can style the bold fragment (e.g. with `NOTICE_STRONG_SX`).
 */
const NoticeBar = ({
  title,
  description,
  linkText,
  linkHref,
}: {
  title: ReactNode;
  description: ReactNode;
  linkText: string;
  linkHref: string;
}) => (
  <Box sx={NOTICE_BAR_SX}>
    <Box sx={NOTICE_TEXT_ROW_SX}>
      <ChatBubbleOutlined sx={NOTICE_ICON_SX} />
      <Typography sx={NOTICE_TEXT_SX}>
        <strong style={NOTICE_STRONG_SX as unknown as React.CSSProperties}>{title}</strong>{' '}
        {description}
      </Typography>
    </Box>
    <Box component="a" href={linkHref} sx={NOTICE_LINK_SX}>
      {linkText}
      <ArrowForward sx={NOTICE_LINK_ICON_SX} />
    </Box>
  </Box>
);

/* =====================================================================
 * SisterCompanySection
 * ===================================================================== */

export const SisterCompanySection = () => (
  <Section delay={100}>
    <SectionWrap>
      {/* ── Intro row ──────────────────────────────────────────────── */}
      <Reveal delay={100}>
        <Box sx={INTRO_GRID_SX}>
          <Box>
            <SectionEyebrow>{SISTER_COMPANY_DATA.eyebrow}</SectionEyebrow>
            <Typography component="h2" sx={TITLE_SX}>
              {SISTER_COMPANY_DATA.title}
            </Typography>
            <KenterLockup />
          </Box>

          <Box>
            <Typography sx={DESCRIPTION_SX}>{SISTER_COMPANY_DATA.description}</Typography>

            <AppButton
              href="https://kenter.com.au/"
              color="outline"
              size="large"
              endIcon={<OpenInNew sx={CTA_ICON_SX} />}
              {...CTA_EXTERNAL_PROPS}
            >
              Explore Kenter
            </AppButton>
          </Box>
        </Box>
      </Reveal>

      {/* ── Journey timeline ───────────────────────────────────────── */}
      <Reveal delay={200}>
        <Box sx={TIMELINE_CARD_SX}>
          <JourneyProgress timeline={SISTER_COMPANY_DATA.timeline} icons={ICONS} />
        </Box>
      </Reveal>

      {/* ── Notice bar ─────────────────────────────────────────────── */}
      <Reveal delay={300}>
        <NoticeBar
          title={SISTER_COMPANY_DATA.notice.title}
          description={SISTER_COMPANY_DATA.notice.desc}
          linkText={SISTER_COMPANY_DATA.notice.linkText}
          linkHref="#"
        />
      </Reveal>
    </SectionWrap>
  </Section>
);
