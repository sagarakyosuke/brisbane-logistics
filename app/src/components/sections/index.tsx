import type { ReactNode } from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';
import { useAnimation } from '@/reusables/animation/use-animation';

/* =====================================================================
 * Types
 * ===================================================================== */

export type SectionTone = 'default' | 'mist' | 'peach' | 'navy';

export interface SectionProps {
  children: ReactNode;
  tone?: SectionTone;
  tight?: boolean;
  id?: string;
  reveal?: boolean;
  delay?: number;
  sx?: SxProps<Theme>;
  skipAlternate?: boolean;
}

export interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  right?: ReactNode;
  center?: boolean;
}

export interface StackProps {
  children: ReactNode;
  gap?: string;
}

/* =====================================================================
 * Constants
 * ===================================================================== */

const TONE_BG: Record<SectionTone, string> = {
  default: 'var(--white)',
  mist: 'var(--mist)',
  peach: 'var(--peach)',
  navy: 'var(--navy)',
};

const HEADER_MARGIN_BOTTOM = '40px';

const SECTION_PADDING_TIGHT = 'clamp(40px, 5vw, 64px)';
const SECTION_PADDING_REGULAR = 'clamp(56px, 8vw, 104px)';

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Eyebrow ──────────────────────────────────────────────────────── */

/** Slanted 3-bar mark injected as a `::before` pseudo-element. */
const EYEBROW_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '.74rem',
  fontWeight: 700,
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color: 'var(--orange)',
  '&::before': {
    content: '""',
    width: 26,
    height: 14,
    flex: 'none',
    background: `
      linear-gradient(var(--orange), var(--orange)) 0 0 / 6px 100% no-repeat,
      linear-gradient(var(--orange), var(--orange)) 10px 0 / 6px 100% no-repeat,
      linear-gradient(var(--orange), var(--orange)) 20px 0 / 6px 100% no-repeat`,
    transform: 'skewX(-14deg)',
    opacity: 0.95,
  },
};

/* ── SectionWrap ──────────────────────────────────────────────────── */

const WRAP_SX: SxProps<Theme> = {
  width: '100%',
  maxWidth: 'var(--wrap)',
  mx: 'auto',
  px: '20px',
  boxSizing: 'border-box',
};

/* ── SectionHeader ────────────────────────────────────────────────── */

const HEADER_CONTENT_SX: SxProps<Theme> = { display: 'grid', gap: '14px' };

const HEADER_TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(1.7rem, 3.2vw, 2.5rem)',
  fontWeight: 800,
  letterSpacing: '-.02em',
  lineHeight: 1.12,
  margin: 0,
};

const HEADER_LEAD_SX: SxProps<Theme> = {
  fontSize: 'clamp(1.02rem, 1.4vw, 1.15rem)',
  color: 'var(--muted)',
  maxWidth: '60ch',
  margin: 0,
};

const HEADER_WITH_RIGHT_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '24px',
  alignItems: 'end',
  mb: HEADER_MARGIN_BOTTOM,
};

const HEADER_DEFAULT_SX: SxProps<Theme> = {
  display: 'grid',
  gap: '14px',
  mb: HEADER_MARGIN_BOTTOM,
  maxWidth: '760px',
};

const HEADER_CENTERED_SX: SxProps<Theme> = {
  justifyItems: 'center',
  textAlign: 'center',
  mx: 'auto',
};

/* ── Stack ────────────────────────────────────────────────────────── */

const STACK_BASE_SX: SxProps<Theme> = { display: 'grid' };

/* =====================================================================
 * Helpers
 * ===================================================================== */

/** Resolve the section background from `tone` + `skipAlternate`. */
const resolveBg = (tone: SectionTone | undefined, skipAlternate: boolean): string => {
  if (tone) return TONE_BG[tone];
  if (skipAlternate) return 'transparent';
  return TONE_BG.default;
};

/* =====================================================================
 * Section
 * ===================================================================== */

export const Section = ({
  children,
  tone,
  tight = false,
  id,
  reveal = true,
  delay = 0,
  sx,
  skipAlternate = false,
}: SectionProps) => {
  const { ref, style } = useAnimation({ disabled: !reveal, delay });
  const bgcolor = resolveBg(tone, skipAlternate);

  /**
   * The alternate background is applied by the *parent* via the
   * `:nth-of-type(even)` selector below. `skipAlternate` opts THIS section
   * out of both contributing to and receiving the alternate color.
   */
  const alternateStyle: SxProps<Theme> = skipAlternate
    ? {}
    : {
        '&:nth-of-type(even)': {
          bgcolor: tone ? 'var(--peach)' : 'var(--mist)',
        },
      };

  return (
    <Box
      component="section"
      id={id}
      ref={ref}
      data-section
      sx={[
        {
          paddingBlock: tight ? SECTION_PADDING_TIGHT : SECTION_PADDING_REGULAR,
          color: tone === 'navy' ? 'var(--white)' : 'inherit',
          bgcolor,
          ...alternateStyle,
        },
        style,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
};

/* =====================================================================
 * SectionWrap
 * ===================================================================== */

export const SectionWrap = ({ children }: { children: ReactNode }) => (
  <Box sx={WRAP_SX}>{children}</Box>
);

/* =====================================================================
 * SectionEyebrow
 * ===================================================================== */

export const SectionEyebrow = ({ children }: { children: ReactNode }) => (
  <Box component="span" sx={EYEBROW_SX}>
    {children}
  </Box>
);

/* =====================================================================
 * SectionHeader
 * ===================================================================== */

export const SectionHeader = ({
  eyebrow,
  title,
  lead,
  right,
  center = false,
}: SectionHeaderProps) => {
  const content = (
    <Box sx={HEADER_CONTENT_SX}>
      {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
      <Box component="h2" sx={HEADER_TITLE_SX}>
        {title}
      </Box>
      {lead && (
        <Box component="p" sx={HEADER_LEAD_SX}>
          {lead}
        </Box>
      )}
    </Box>
  );

  if (right) {
    return (
      <Box sx={HEADER_WITH_RIGHT_SX}>
        {content}
        {right}
      </Box>
    );
  }

  return (
    <Box sx={center ? { ...HEADER_DEFAULT_SX, ...HEADER_CENTERED_SX } : HEADER_DEFAULT_SX}>
      {content}
    </Box>
  );
};

/* =====================================================================
 * Stack
 * ===================================================================== */

export const Stack = ({ children, gap = '18px' }: StackProps) => (
  <Box sx={{ ...STACK_BASE_SX, gap }}>{children}</Box>
);
