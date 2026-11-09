import { useLocation } from 'react-router';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface BreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

/* =====================================================================
 * Constants
 * ===================================================================== */

/** Segments that should never appear as a breadcrumb (root aliases). */
const HIDDEN_SEGMENTS = new Set(['home']);

/* =====================================================================
 * Helpers
 * ===================================================================== */

/** Convert a URL segment like `cross-docking` → `Cross Docking`. */
const segmentToLabel = (segment: string): string =>
  segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

/* =====================================================================
 * Hook
 * ===================================================================== */

export const useBreadcrumbs = (): BreadcrumbItem[] => {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return [];

  // Build the full trail first so "isLast" and "path" use the original indices,
  // then filter hidden segments out.
  const trail: Array<BreadcrumbItem & { segment: string }> = segments.map((segment, index) => ({
    label: segmentToLabel(segment),
    path: `/${segments.slice(0, index + 1).join('/')}`,
    isLast: index === segments.length - 1,
    segment,
  }));

  return trail
    .filter(({ segment }) => !HIDDEN_SEGMENTS.has(segment))
    .map(({ label, path, isLast }) => ({ label, path, isLast }));
};
