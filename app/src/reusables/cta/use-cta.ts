import { createContext, useContext } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface CtaContextValue {
  title: string;
  subtitle: string;
}

/* =====================================================================
 * Defaults
 * ===================================================================== */

export const DEFAULT_CONTEXT: CtaContextValue = {
  title: "Let's talk about your logistics.",
  subtitle: 'Tell us about your products, stock volumes and delivery requirements.',
};

/* =====================================================================
 * Context + hook
 * ===================================================================== */

export const CtaContext = createContext<CtaContextValue>(DEFAULT_CONTEXT);

export const useCtaContext = (): CtaContextValue => useContext(CtaContext);
