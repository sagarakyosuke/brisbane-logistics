import { Box, type SxProps, type Theme } from '@mui/material';

/* =====================================================================
 * Types
 * ===================================================================== */

interface LineLoaderProps {
  /** The overall width of the track. Defaults to '100%'. */
  width?: string | number;
  /** The color of the track background. Defaults to a translucent white. */
  trackColor?: string;
  /** The color of the moving animation line. Defaults to the brand orange. */
  activeColor?: string;
  /** How long one full cycle takes. Defaults to 2.5s. */
  speed?: string;
}

/* =====================================================================
 * Constants
 * ===================================================================== */

const DEFAULT_WIDTH = '100%';
const DEFAULT_TRACK_COLOR = 'rgba(255, 255, 255, 0.1)';
const DEFAULT_ACTIVE_COLOR = 'var(--orange)';
const DEFAULT_SPEED = '2.5s';

/** Width of the moving glowing segment, as a percentage of the track. */
const SEGMENT_WIDTH = '30%';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const TRACK_SX: SxProps<Theme> = {
  position: 'relative',
  height: '3px',
  borderRadius: '3px',
  overflow: 'hidden',
  // Keyframes are injected inline so the loader works without any global setup.
  '@keyframes lineMarquee': {
    '0%': { left: '-30%' },
    '100%': { left: '100%' },
  },
};

const SEGMENT_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: SEGMENT_WIDTH,
  borderRadius: '3px',
  animation: `lineMarquee ${DEFAULT_SPEED} ease-in-out infinite`,
};

/* =====================================================================
 * LineLoader
 * ===================================================================== */

export const LineLoader = ({
  width = DEFAULT_WIDTH,
  trackColor = DEFAULT_TRACK_COLOR,
  activeColor = DEFAULT_ACTIVE_COLOR,
  speed = DEFAULT_SPEED,
}: LineLoaderProps) => (
  <Box sx={{ ...TRACK_SX, width, bgcolor: trackColor }}>
    <Box
      sx={{
        ...SEGMENT_SX,
        bgcolor: activeColor,
        boxShadow: `0 0 10px ${activeColor}`,
        animation: `lineMarquee ${speed} ease-in-out infinite`,
      }}
    />
  </Box>
);
