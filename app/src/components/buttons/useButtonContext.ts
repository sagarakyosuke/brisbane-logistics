import { createContext, useContext } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonColor = 'primary' | 'outline' | 'ghost' | 'ghostLight';

export interface ButtonContextValue {
  size: ButtonSize;
  color: ButtonColor;
}

/* =====================================================================
 * Defaults
 * ===================================================================== */

export const DEFAULT_CONTEXT: ButtonContextValue = {
  size: 'medium',
  color: 'primary',
};

/* =====================================================================
 * Context + hook
 * ===================================================================== */

export const ButtonContext = createContext<ButtonContextValue>(DEFAULT_CONTEXT);

export const useButtonContext = (): ButtonContextValue => useContext(ButtonContext);
