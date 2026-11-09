import { useEffect, useState } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface Slide {
  id: number | string;
  image: string;
  alt: string;
}

/* =====================================================================
 * Constants
 * ===================================================================== */

const DEFAULT_INTERVAL_MS = 5000;

/* =====================================================================
 * Hook
 * ===================================================================== */

export const useCarousel = (length: number, interval: number = DEFAULT_INTERVAL_MS) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Zero slides or a non-positive interval disables autoplay.
    if (length <= 0 || interval <= 0) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, interval);

    return () => clearInterval(timer);
  }, [length, interval]);

  return { current, setCurrent };
};
