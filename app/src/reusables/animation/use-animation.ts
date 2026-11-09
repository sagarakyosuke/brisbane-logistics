import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { SxProps, Theme } from '@mui/material';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface UseAnimationOptions {
  disabled?: boolean;
  delay?: number;
  distance?: number;
  blur?: number;
  duration?: number;
  threshold?: number;
}

interface UseAnimationResult {
  ref: RefObject<HTMLDivElement | null>;
  style: SxProps<Theme>;
}

/* =====================================================================
 * Constants
 * ===================================================================== */

/** Trigger the reveal slightly before the element fully enters the viewport. */
const ROOT_MARGIN = '0px 0px -50px 0px';

/** Smooth easing that settles gently — the classic "reveal" curve. */
const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

/* =====================================================================
 * Hook
 * ===================================================================== */

export const useAnimation = ({
  disabled = false,
  delay = 0,
  distance = 30,
  blur = 8,
  duration = 1,
  threshold = 0.1,
}: UseAnimationOptions = {}): UseAnimationResult => {
  const [hasEntered, setHasEntered] = useState(disabled);
  const domRef = useRef<HTMLDivElement>(null);

  const isVisible = disabled || hasEntered;

  useEffect(() => {
    if (disabled) return;

    const current = domRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHasEntered(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin: ROOT_MARGIN },
    );

    observer.observe(current);

    return () => observer.disconnect();
  }, [disabled, threshold]);

  return {
    ref: domRef,
    style: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
      filter: isVisible ? 'blur(0px)' : `blur(${blur}px)`,
      transitionProperty: 'opacity, transform, filter',
      transitionDuration: `${duration}s`,
      transitionTimingFunction: EASING,
      transitionDelay: `${delay}ms`,
      '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',
        transform: 'none',
        opacity: 1,
        filter: 'none',
      },
    },
  };
};
