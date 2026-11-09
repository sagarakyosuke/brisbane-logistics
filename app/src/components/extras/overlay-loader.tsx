import { Backdrop, Box, type SxProps, type Theme } from '@mui/material';

/* =====================================================================
 * Types
 * ===================================================================== */

interface OverlayLoaderProps {
  open: boolean;
}

/* =====================================================================
 * Constants
 * ===================================================================== */

const RING_SIZE = { xs: 120, md: 140 };
const GLOW_SIZE = { xs: 420, md: 620 };

const BRAND_BARS = [
  { color: 'var(--logo-sky)', delay: '0s' },
  { color: 'var(--logo-blue)', delay: '0.15s' },
  { color: 'var(--orange)', delay: '0.3s' },
] as const;

/* =====================================================================
 * Keyframes
 * ===================================================================== */

const SPIN_KEYFRAMES = {
  '@keyframes spin': {
    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
    '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
  },
};

const SPIN_REVERSE_KEYFRAMES = {
  '@keyframes spinReverse': {
    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
    '100%': { transform: 'translate(-50%, -50%) rotate(-360deg)' },
  },
};

const BREATHE_KEYFRAMES = {
  '@keyframes breathe': {
    '0%, 100%': { transform: 'scale(1)', opacity: 0.85 },
    '50%': { transform: 'scale(1.12)', opacity: 1 },
  },
};

const BAR_PULSE_KEYFRAMES = {
  '@keyframes barPulse': {
    '0%, 100%': { transform: 'scaleY(0.5)', opacity: 0.4 },
    '50%': { transform: 'scaleY(1)', opacity: 1 },
  },
};

const SHIMMER_KEYFRAMES = {
  '@keyframes shimmer': {
    '0%': { backgroundPosition: '200% 0' },
    '100%': { backgroundPosition: '-200% 0' },
  },
};

/* =====================================================================
 * Static styles
 * ===================================================================== */

const BACKDROP_SX: SxProps<Theme> = {
  zIndex: (theme) => theme.zIndex.modal + 999, 
  color: '#fff',
  backgroundColor: 'rgba(11, 16, 66, 0.85)', 
  backdropFilter: 'blur(8px)',
  pointerEvents: 'all',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 4,
  overflow: 'hidden',
  overscrollBehavior: 'contain', 
};

const GLOW_SX: SxProps<Theme> = {
  position: 'absolute',
  width: GLOW_SIZE,
  height: GLOW_SIZE,
  borderRadius: '50%',
  background:
    'radial-gradient(circle, rgba(245,130,32,0.18) 0%, rgba(245,130,32,0.06) 40%, transparent 70%)',
  filter: 'blur(40px)',
  pointerEvents: 'none',
  animation: 'breathe 4s ease-in-out infinite',
  ...BREATHE_KEYFRAMES,
};

const RINGS_CONTAINER_SX: SxProps<Theme> = {
  position: 'relative',
  width: RING_SIZE,
  height: RING_SIZE,
};

const STATIC_TRACK_SX: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  borderRadius: '50%',
  border: '2px solid rgba(255,255,255,0.06)',
};

const RING_BASE_SX: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  borderRadius: '50%',
  border: '2px solid transparent',
};

const OUTER_RING_SX: SxProps<Theme> = {
  ...RING_BASE_SX,
  width: '100%',
  height: '100%',
  borderTopColor: 'var(--orange)',
  borderRightColor: 'rgba(245,130,32,0.3)',
  filter: 'drop-shadow(0 0 8px rgba(245,130,32,0.5))',
  animation: 'spin 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
  ...SPIN_KEYFRAMES,
};

const MIDDLE_RING_SX: SxProps<Theme> = {
  ...RING_BASE_SX,
  width: '72%',
  height: '72%',
  borderBottomColor: 'var(--logo-sky)',
  borderLeftColor: 'rgba(98,149,192,0.3)',
  filter: 'drop-shadow(0 0 6px rgba(98,149,192,0.4))',
  animation: 'spinReverse 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
  ...SPIN_REVERSE_KEYFRAMES,
};

const INNER_RING_SX: SxProps<Theme> = {
  ...RING_BASE_SX,
  width: '44%',
  height: '44%',
  borderTopColor: 'var(--logo-blue)',
  opacity: 0.8,
  animation: 'spin 3.2s linear infinite',
};

const BRAND_BARS_CONTAINER_SX: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) skewX(-14deg)',
  display: 'flex',
  gap: '3px',
};

const BRAND_BAR_SX = (color: string, delay: string): SxProps<Theme> => ({
  width: 3,
  height: 24,
  bgcolor: color,
  borderRadius: '2px',
  animation: 'barPulse 1.8s ease-in-out infinite',
  animationDelay: delay,
  ...BAR_PULSE_KEYFRAMES,
});

const LOADING_TEXT_SX: SxProps<Theme> = {
  fontWeight: 800,
  letterSpacing: '0.32em',
  fontSize: '0.72rem',
  textTransform: 'uppercase',
  background:
    'linear-gradient(90deg, rgba(223,226,246,0.3) 0%, rgba(255,255,255,1) 50%, rgba(223,226,246,0.3) 100%)',
  backgroundSize: '200% 100%',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'shimmer 2.5s linear infinite',
  ...SHIMMER_KEYFRAMES,
};

/* =====================================================================
 * OverlayLoader
 * ===================================================================== */

export const OverlayLoader = ({ open }: OverlayLoaderProps) => (
  <Backdrop open={open} sx={BACKDROP_SX}>
    <Box aria-hidden sx={GLOW_SX} />
    <Box sx={RINGS_CONTAINER_SX}>
      <Box sx={STATIC_TRACK_SX} />
      <Box sx={OUTER_RING_SX} />
      <Box sx={MIDDLE_RING_SX} />
      <Box sx={INNER_RING_SX} />
      <Box sx={BRAND_BARS_CONTAINER_SX}>
        {BRAND_BARS.map((bar) => (
          <Box key={bar.color} sx={BRAND_BAR_SX(bar.color, bar.delay)} />
        ))}
      </Box>
    </Box>
    <Box sx={LOADING_TEXT_SX}>Loading</Box>
  </Backdrop>
);