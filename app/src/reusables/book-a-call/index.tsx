import { useState, type ReactNode } from 'react';
import { Box, Typography, IconButton, type SxProps, type Theme } from '@mui/material';
import { Close, Phone, AccessTime } from '@mui/icons-material';
import { palette } from '@/utilities/themes';
import {
  useBookACall,
  BookACallContext,
  type CallSlot,
} from '@/reusables/book-a-call/use-book-a-call';
import { AppButton } from '@/components/buttons';
import { Modal } from '@/components/dialogs/modals';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const CONTAINER_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: 360,
  position: 'relative',
};

const CLOSE_BTN_SX: SxProps<Theme> = {
  position: 'absolute',
  top: -10,
  right: -10,
  color: palette.navy,
  bgcolor: palette.mist,
  transition: 'all 0.2s',
  zIndex: 10,
  '&:hover': { bgcolor: palette.line, transform: 'rotate(90deg)' },
};

const EYEBROW_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  color: palette.orange,
  fontWeight: 800,
  fontSize: '0.75rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  mb: 2,
  '&::before': {
    content: '""',
    width: 22,
    height: 12,
    flex: 'none',
    background: `
      linear-gradient(${palette.orange}, ${palette.orange}) 0 0 / 5px 100% no-repeat,
      linear-gradient(${palette.orange}, ${palette.orange}) 8px 0 / 5px 100% no-repeat,
      linear-gradient(${palette.orange}, ${palette.orange}) 16px 0 / 5px 100% no-repeat`,
    transform: 'skewX(-14deg)',
    opacity: 0.95,
  },
};

const TITLE_SX: SxProps<Theme> = {
  fontSize: '1.6rem',
  fontWeight: 800,
  color: palette.navy,
  mb: 1,
  letterSpacing: '-0.02em',
};

const SUBTITLE_SX: SxProps<Theme> = {
  color: palette.muted,
  fontSize: '0.95rem',
  mb: 4,
};

const FIELD_WRAPPER_SX: SxProps<Theme> = { display: 'grid', gap: 0.5, mb: 2.5 };

const LABEL_SX: SxProps<Theme> = {
  fontSize: '0.85rem',
  fontWeight: 700,
  color: palette.navy,
  mb: 0.5,
};

const INPUT_SX: SxProps<Theme> = {
  width: '100%',
  p: '12px 14px',
  borderRadius: '10px',
  border: `1.5px solid ${palette.line}`,
  fontFamily: 'inherit',
  fontSize: '0.92rem',
  color: palette.navy,
  bgcolor: palette.mist,
  outline: 'none',
  transition: 'all 0.2s',
  '&:focus': {
    bgcolor: palette.white,
    borderColor: palette.orange,
    boxShadow: `0 0 0 3px ${palette.peach}`,
  },
};

const SLOT_GROUP_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 1.5,
  flexWrap: 'wrap',
};

const slotBtnSx = (active: boolean): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  px: 2.5,
  py: 1.5,
  borderRadius: '10px',
  border: `1.5px solid ${active ? palette.navy : palette.line}`,
  bgcolor: active ? palette.navy : palette.white,
  color: active ? palette.white : palette.navy,
  fontWeight: 600,
  fontSize: '0.9rem',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '& svg': { color: active ? palette.orange : palette.muted },
  '&:hover': { borderColor: palette.navy },
});

const PHONE_HINT_SX: SxProps<Theme> = {
  fontSize: '0.82rem',
  color: palette.muted,
  mt: 2,
  '& b': { color: palette.navy, userSelect: 'all' },
};

const DONE_SX: SxProps<Theme> = {
  display: 'grid',
  justifyItems: 'center',
  textAlign: 'center',
  gap: 2,
  py: 4,
};

const DONE_ICON_SX: SxProps<Theme> = {
  width: 72,
  height: 72,
  borderRadius: '50%',
  bgcolor: palette.peach,
  color: palette.orange,
  display: 'grid',
  placeItems: 'center',
  mb: 2,
};

/* =====================================================================
 * Component
 * ===================================================================== */

interface BookACallProps {
  open: boolean;
  onClose: () => void;
}

export const BookACall = ({ open, onClose }: BookACallProps) => {
  const { form, updateForm } = useBookACall();
  const [isDone, setIsDone] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setIsDone(true);
  };

  const slots: CallSlot[] = ['Morning', 'Midday', 'Afternoon'];

  return (
    <Modal open={open} onClose={onClose} size="sm" hideHeader>
      <Box sx={CONTAINER_SX}>
        <IconButton onClick={onClose} sx={CLOSE_BTN_SX} aria-label="Close">
          <Close fontSize="small" />
        </IconButton>

        {isDone ? (
          <Box sx={DONE_SX}>
            <Box sx={DONE_ICON_SX}>
              <Phone fontSize="large" />
            </Box>
            <Typography sx={{ fontSize: '1.6rem', fontWeight: 800, color: palette.navy }}>
              Call request ready.
            </Typography>
            <Typography sx={{ color: palette.muted, maxWidth: '44ch', mb: 1 }}>
              On the live website our team would confirm your {form.slot.toLowerCase()} call by
              email. This prototype doesn't send anything.
            </Typography>
            <Typography sx={{ fontWeight: 700, color: palette.navy, mb: 2 }}>
              Prefer to call now? 07 3348 2100
            </Typography>
            <AppButton color="primary" onClick={onClose}>
              Back to the website
            </AppButton>
          </Box>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Box sx={EYEBROW_SX}>Book a call</Box>
            <Typography sx={TITLE_SX}>Talk to our Brisbane team.</Typography>
            <Typography sx={SUBTITLE_SX}>
              Pick a time that suits and we'll call you back.
            </Typography>

            <Box sx={FIELD_WRAPPER_SX}>
              <Typography component="label" sx={LABEL_SX}>
                Your name
              </Typography>
              <Box
                component="input"
                required
                autoComplete="name"
                sx={INPUT_SX}
                value={form.name}
                onChange={(e) => updateForm('name', e.target.value)}
              />
            </Box>

            <Box sx={FIELD_WRAPPER_SX}>
              <Typography component="label" sx={LABEL_SX}>
                Phone
              </Typography>
              <Box
                component="input"
                type="tel"
                required
                autoComplete="tel"
                sx={INPUT_SX}
                value={form.phone}
                onChange={(e) => updateForm('phone', e.target.value)}
              />
            </Box>

            <Box sx={FIELD_WRAPPER_SX}>
              <Typography component="label" sx={LABEL_SX}>
                Preferred time (AEST)
              </Typography>
              <Box sx={SLOT_GROUP_SX}>
                {slots.map((s) => (
                  <Box
                    key={s}
                    component="button"
                    type="button"
                    onClick={() => updateForm('slot', s)}
                    sx={slotBtnSx(form.slot === s)}
                  >
                    <AccessTime sx={{ fontSize: 16 }} />
                    {s}
                  </Box>
                ))}
              </Box>
            </Box>

            <AppButton type="submit" color="primary" size="medium" sx={{ mt: 1 }}>
              Request a call
            </AppButton>

            <Typography sx={PHONE_HINT_SX}>
              Or call us directly on <b>07 3348 2100</b>.
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

/* =====================================================================
 * Provider
 * ===================================================================== */

export const BookACallProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  const openBookACall = () => {
    setModalKey((k) => k + 1);
    setIsOpen(true);
  };

  const closeBookACall = () => setIsOpen(false);

  return (
    <BookACallContext.Provider value={{ openBookACall, closeBookACall }}>
      {children}
      {isOpen && <BookACall key={modalKey} open={isOpen} onClose={closeBookACall} />}
    </BookACallContext.Provider>
  );
};
