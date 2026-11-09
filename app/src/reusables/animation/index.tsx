import type { ReactNode } from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';
import { useAnimation } from '@/reusables/animation/use-animation';

/* =====================================================================
 * Re-exports
 * ===================================================================== */

// eslint-disable-next-line react-refresh/only-export-components
export { useAnimation };
export type { UseAnimationOptions } from '@/reusables/animation/use-animation';

/* =====================================================================
 * Types
 * ===================================================================== */

type RevealDirection = 'up' | 'down' | 'left' | 'right';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: RevealDirection;
  duration?: number;
  distance?: number;
  blur?: number;
}

/* =====================================================================
 * Helpers
 * ===================================================================== */

/** Entry transform for each direction (before reveal). */
const START_OFFSET: Record<RevealDirection, (distance: number) => string> = {
  up: (d) => `translateY(${d}px)`,
  down: (d) => `translateY(-${d}px)`,
  left: (d) => `translateX(${d}px)`,
  right: (d) => `translateX(-${d}px)`,
};

/** End transform — always returns to origin. */
const END_OFFSET: Record<RevealDirection, string> = {
  up: 'translateY(0)',
  down: 'translateY(0)',
  left: 'translateX(0)',
  right: 'translateX(0)',
};

/**
 * Build the `sx` for a Reveal wrapper. Extracted as a function so the
 * four keyframes are generated only for the active direction, and the
 * shared `from`/`to` values stay in one place.
 */
const revealSx = ({
  direction,
  duration,
  delay,
  distance,
  blur,
}: Required<Omit<RevealProps, 'children'>>): SxProps<Theme> => {
  const start = START_OFFSET[direction](distance);
  const end = END_OFFSET[direction];
  const startFilter = blur > 0 ? `blur(${blur}px)` : 'none';

  return {
    opacity: 0,
    transform: start,
    filter: startFilter,
    animation: `reveal-${direction} ${duration}s ease forwards`,
    animationDelay: `${delay}ms`,
    [`@keyframes reveal-${direction}`]: {
      '0%': { opacity: 0, transform: start, filter: startFilter },
      '100%': { opacity: 1, transform: end, filter: 'blur(0px)' },
    },
  };
};

/* =====================================================================
 * Reveal
 * ===================================================================== */

export const Reveal = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  distance = 30,
  blur = 10,
}: RevealProps) => (
  <Box sx={revealSx({ direction, duration, delay, distance, blur })}>{children}</Box>
);
