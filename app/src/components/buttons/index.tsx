import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Button, type ButtonProps, type SxProps, type Theme } from '@mui/material';
import {
  ButtonContext,
  DEFAULT_CONTEXT,
  useButtonContext,
  type ButtonColor,
  type ButtonContextValue,
  type ButtonSize,
} from '@/components/buttons/useButtonContext';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface AppButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  children: ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
}

/* =====================================================================
 * Sizing
 * ===================================================================== */

const SIZE_MAP: Record<ButtonSize, { px: number; py: number; fontSize: string; gap: number }> = {
  small: { px: 2, py: 1, fontSize: '0.85rem', gap: 1 },
  medium: { px: 3, py: 1.2, fontSize: '0.95rem', gap: 1 },
  large: { px: 3.5, py: 1.5, fontSize: '1rem', gap: 1.25 },
};

/* =====================================================================
 * Palette
 * ===================================================================== */

const COLOR_MAP: Record<ButtonColor, SxProps<Theme>> = {
  primary: {
    bgcolor: 'var(--orange)',
    color: 'var(--navy)',
    boxShadow: '0 8px 20px -8px rgba(245, 130, 32, 0.6)',
    '&:hover': {
      bgcolor: 'var(--orange-2)',
      transform: 'translateY(-2px)',
      boxShadow: '0 12px 24px -8px rgba(245, 130, 32, 0.8)',
    },
    '&:hover .MuiButton-endIcon svg': {
      transform: 'translateX(4px)',
      transition: 'transform 0.25s ease',
    },
  },
  outline: {
    bgcolor: 'transparent',
    color: 'var(--navy)',
    borderColor: 'var(--navy)',
    borderWidth: 2,
    '&:hover': {
      borderWidth: 2,
      bgcolor: 'var(--navy)',
      color: 'var(--white)',
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 16px -8px rgba(18, 26, 87, 0.4)',
    },
  },
  ghost: {
    bgcolor: 'transparent',
    color: 'var(--muted)',
    boxShadow: 'none',
    '&:hover': {
      bgcolor: 'var(--peach)',
      color: 'var(--navy)',
    },
  },
  ghostLight: {
    bgcolor: 'transparent',
    color: 'var(--white)',
    borderColor: 'rgba(255,255,255,0.7)',
    borderWidth: 2,
    '&:hover': {
      borderWidth: 2,
      bgcolor: 'var(--white)',
      color: 'var(--navy)',
    },
  },
};

/* =====================================================================
 * ButtonProvider
 * ===================================================================== */

interface ButtonProviderProps extends Partial<ButtonContextValue> {
  children: ReactNode;
}

export const ButtonProvider = ({
  size = DEFAULT_CONTEXT.size,
  color = DEFAULT_CONTEXT.color,
  children,
}: ButtonProviderProps) => (
  <ButtonContext.Provider value={{ size, color }}>{children}</ButtonContext.Provider>
);

/* =====================================================================
 * AppButton
 * ===================================================================== */

export const AppButton = ({
  children,
  size,
  color,
  startIcon,
  endIcon,
  fullWidth = false,
  sx,
  onClick,
  disabled = false,
  href,
  ...rest
}: AppButtonProps) => {
  const ctx = useButtonContext();
  const resolvedSize = size ?? ctx.size;
  const resolvedColor = color ?? ctx.color;

  const sz = SIZE_MAP[resolvedSize];
  const palette = COLOR_MAP[resolvedColor];

  const muiVariant: ButtonProps['variant'] =
    resolvedColor === 'outline' || resolvedColor === 'ghostLight'
      ? 'outlined'
      : resolvedColor === 'ghost'
        ? 'text'
        : 'contained';

  return (
    <Button
      variant={muiVariant}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      disabled={disabled}
      href={href}
      sx={[
        {
          borderRadius: 999,
          fontWeight: 700,
          textTransform: 'none',
          whiteSpace: 'nowrap',
          px: sz.px,
          py: sz.py,
          fontSize: sz.fontSize,
          transition: 'all 0.25s ease',
          justifyContent: 'center',
          '& .MuiButton-startIcon': {
            marginLeft: 0,
            marginRight: `${sz.gap * 4}px`,
          },
          '& .MuiButton-endIcon': {
            marginLeft: `${sz.gap * 4}px`,
            marginRight: 0,
          },
        },
        palette,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    >
      {children}
    </Button>
  );
};

/* =====================================================================
 * Barrel re-export
 * ===================================================================== */

export { AppButton as Button };
