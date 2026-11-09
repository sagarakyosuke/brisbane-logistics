import type { ReactNode } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Box, Typography } from '@mui/material';
import { 
  ErrorOutlined, 
  CheckCircleOutlined, 
  InfoOutlined, 
  WarningAmberOutlined 
} from '@mui/icons-material';
import { AppButton } from '@/components/buttons';
import { palette, radii, shadows } from '@/utilities/themes';

const MySwal = withReactContent(Swal);

/* =====================================================================
 * Types
 * ===================================================================== */

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

export interface AlertOptions {
  title: string;
  text?: ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
}

export interface StatusAlertOptions extends AlertOptions {
  variant: AlertVariant;
  retryText?: string;
  onRetry?: () => void;
}

/* =====================================================================
 * Configuration (Dynamic Icons & Colors from Theme)
 * ===================================================================== */

const VARIANTS = {
  success: { icon: CheckCircleOutlined, color: palette.success },
  error: { icon: ErrorOutlined, color: palette.red },
  warning: { icon: WarningAmberOutlined, color: palette.warning },
  info: { icon: InfoOutlined, color: palette.navy },
};

/* =====================================================================
 * Shared Styles
 * ===================================================================== */

const CONTENT_SX = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: 1.5,
  pt: 2,
  pb: 1,
};

const TITLE_SX = {
  fontSize: '1.25rem',
  fontWeight: 800,
  color: palette.navy,
  lineHeight: 1.2,
};

const TEXT_SX = {
  fontSize: '0.95rem',
  color: palette.muted,
  lineHeight: 1.6,
  maxWidth: '35ch',
};

const ACTIONS_SX = {
  display: 'flex',
  gap: 1.5,
  width: '100%',
  mt: 2,
  justifyContent: 'center',
};

/* =====================================================================
 * Core Composable Method
 * ===================================================================== */

export const showStatusAlert = ({
  variant,
  title,
  text,
  confirmText = 'Okay',
  retryText = 'Try Again',
  onConfirm,
  onRetry,
}: StatusAlertOptions) => {
  const config = VARIANTS[variant];
  const Icon = config.icon;
  
  const redButtonSx = variant === 'error' ? {
    bgcolor: palette.red,
    color: palette.white,
    boxShadow: 'none',
    '&:hover': {
      bgcolor: palette.redDark,
      transform: 'translateY(-2px)',
      boxShadow: 'none',
    },
  } : undefined;

  MySwal.fire({
    html: (
      <Box sx={CONTENT_SX}>
        <Icon sx={{ fontSize: 56, color: config.color }} />
        <Typography sx={TITLE_SX}>{title}</Typography>
        {text && <Typography sx={TEXT_SX}>{text}</Typography>}

        <Box sx={ACTIONS_SX}>
          {onRetry && (
            <AppButton
              color="outline"
              fullWidth
              sx={{ boxShadow: 'none', '&:hover': { boxShadow: 'none' } }}
              onClick={() => {
                MySwal.close();
                onRetry();
              }}
            >
              {retryText}
            </AppButton>
          )}
          
          <AppButton
            color="primary"
            fullWidth
            sx={redButtonSx} 
            onClick={() => {
              MySwal.close();
              if (onConfirm) onConfirm();
            }}
          >
            {confirmText}
          </AppButton>
        </Box>
      </Box>
    ),
    showConfirmButton: false,
    background: palette.white,
    color: palette.ink,
    allowOutsideClick: false,
    allowEscapeKey: false,
    customClass: { popup: 'custom-swal-popup' },
    didOpen: (popup) => {
      popup.style.borderRadius = `${radii.base + 6}px`;
      popup.style.boxShadow = shadows.base;
      popup.style.border = `1px solid ${palette.line}`;
      popup.style.padding = '32px';
    },
  });
};

/* =====================================================================
 * Composed Helpers
 * ===================================================================== */

export const showSuccess = (options: AlertOptions) =>
  showStatusAlert({ ...options, variant: 'success', confirmText: options.confirmText ?? 'Okay' });

export const showInfo = (options: AlertOptions) =>
  showStatusAlert({ ...options, variant: 'info', confirmText: options.confirmText ?? 'Got it' });

export const showWarning = (options: AlertOptions) =>
  showStatusAlert({ ...options, variant: 'warning', confirmText: options.confirmText ?? 'Understood' });

export const showError = (options: AlertOptions & { onRetry?: () => void }) =>
  showStatusAlert({ ...options, variant: 'error', confirmText: options.confirmText ?? 'Dismiss' });