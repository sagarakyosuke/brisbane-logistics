// src/reusables/loader/page-loader.ts

import { useEffect, useState } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

interface UsePageLoaderOptions {
  /** Show the loader on initial page load. Default `true`. */
  initial?: boolean;
  /** Auto-hide after N ms. Set to `0` to disable auto-hide. Default `800`. */
  delay?: number;
}

interface UsePageLoaderResult {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

/* =====================================================================
 * Constants
 * ===================================================================== */

const DEFAULT_INITIAL = true;
const DEFAULT_DELAY_MS = 800;

/* =====================================================================
 * Hook
 * ===================================================================== */

/**
 * Reusable hook to control a page loader.
 *
 * Usage:
 *   const { isLoading, startLoading, stopLoading } = usePageLoader();
 *   <OverlayLoader open={isLoading} />
 */
export const usePageLoader = ({
  initial = DEFAULT_INITIAL,
  delay = DEFAULT_DELAY_MS,
}: UsePageLoaderOptions = {}): UsePageLoaderResult => {
  const [isLoading, setIsLoading] = useState(initial);

  useEffect(() => {
    if (!initial || delay <= 0) return;

    const timer = setTimeout(() => setIsLoading(false), delay);
    return () => clearTimeout(timer);
  }, [initial, delay]);

  return {
    isLoading,
    startLoading: () => setIsLoading(true),
    stopLoading: () => setIsLoading(false),
  };
};
