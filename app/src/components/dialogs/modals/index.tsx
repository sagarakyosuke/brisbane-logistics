import { useCallback, useMemo, type ReactNode } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  type DialogProps,
  type SxProps,
  type Theme,
} from '@mui/material';
import { Close } from '@mui/icons-material';

/* =====================================================================
 * Types
 * ===================================================================== */

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  /** Preset size of the modal */
  size?: ModalSize;
  /** Full width within maxWidth */
  fullWidth?: boolean;
  /** Hide the title bar (pure lightbox mode) */
  hideHeader?: boolean;
  /** Extra styling for the paper element */
  paperSx?: DialogProps['sx'];
  /** Whether clicking the backdrop should close the modal */
  disableBackdropClick?: boolean;
}

/* =====================================================================
 * Constants
 * ===================================================================== */

const SIZE_MAP: Record<ModalSize, DialogProps['maxWidth']> = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  full: false, // MUI uses `false` for "no max width constraint"
};

/* =====================================================================
 * Static styles
 * ===================================================================== */

const BASE_PAPER_SX: SxProps<Theme> = {
  borderRadius: '16px',
  bgcolor: 'var(--white)',
  backgroundImage: 'none',
  overflow: 'hidden',
};

const FULL_SIZE_PAPER_SX: SxProps<Theme> = {
  width: '100%',
  maxWidth: 'calc(100vw - 32px)',
  height: 'calc(100vh - 32px)',
  maxHeight: 'calc(100vh - 32px)',
  m: 2,
};

const BACKDROP_SX: SxProps<Theme> = {
  bgcolor: 'rgba(11,16,66,.75)',
  backdropFilter: 'blur(4px)',
};

const TITLE_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 2,
  px: 3,
  py: 2,
  borderBottom: '1px solid var(--line)',
  fontSize: '1.1rem',
  fontWeight: 700,
  color: 'var(--navy)',
};

const CLOSE_BUTTON_SX: SxProps<Theme> = {
  bgcolor: 'var(--mist)',
  color: 'var(--navy)',
  '&:hover': { bgcolor: 'var(--line)' },
};

const CONTENT_SX: SxProps<Theme> = { p: { xs: 2, md: 3 } };

/* =====================================================================
 * Modal
 * ===================================================================== */

export const Modal = ({
  open,
  onClose,
  title,
  children,
  size = 'md',
  fullWidth = true,
  hideHeader = false,
  paperSx,
  disableBackdropClick = true,
}: ModalProps) => {
  // Prevent backdrop clicks from closing the modal if disabled
  const handleClose = useCallback<NonNullable<DialogProps['onClose']>>(
    (_event, reason) => {
      if (disableBackdropClick && reason === 'backdropClick') return;
      onClose();
    },
    [disableBackdropClick, onClose],
  );

  // Merge the base paper style, full-size override, and any custom paperSx
  const resolvedPaperSx = useMemo(() => {
    const base = size === 'full' ? [BASE_PAPER_SX, FULL_SIZE_PAPER_SX] : [BASE_PAPER_SX];
    const custom = paperSx ? (Array.isArray(paperSx) ? paperSx : [paperSx]) : [];
    return [...base, ...custom];
  }, [size, paperSx]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={SIZE_MAP[size]}
      fullWidth={fullWidth}
      slotProps={{
        paper: { sx: resolvedPaperSx },
        backdrop: { sx: BACKDROP_SX },
      }}
    >
      {!hideHeader && (
        <DialogTitle sx={TITLE_SX}>
          <Box component="span">{title ?? ' '}</Box>
          <IconButton onClick={onClose} aria-label="Close" size="small" sx={CLOSE_BUTTON_SX}>
            <Close fontSize="small" />
          </IconButton>
        </DialogTitle>
      )}

      <DialogContent sx={CONTENT_SX}>{children}</DialogContent>
    </Dialog>
  );
};
