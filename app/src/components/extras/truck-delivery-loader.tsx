import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Email, LocalShipping, Warehouse } from '@mui/icons-material';

/* =====================================================================
 * Constants
 * ===================================================================== */

/**
 * Stage definitions. `pulseDelay` is the animation delay that syncs the
 * arrival ring with the truck reaching this node. Values are derived from
 * the `drive` keyframe timeline (12s cycle):
 *   - Node 1 arrives at 12.5%  → 1.5s
 *   - Node 2 arrives at 37.5%  → 4.5s
 *   - Node 3 arrives at 75%    → 9s
 */
const STAGES = [
  { icon: Email, label: 'Enquiry & planning', pulseDelay: '1.5s' },
  { icon: Warehouse, label: 'Storage & fulfilment', pulseDelay: '4.5s' },
  { icon: LocalShipping, label: 'Delivery to your customers', pulseDelay: '9s' },
] as const;

/** Track line span — starts/ends at the first/last node centers (1/6 from each edge). */
const TRACK_EDGE = '16.66%';

/* =====================================================================
 * Keyframes
 * ===================================================================== */

/**
 * Truck position over a 12s cycle:
 *   - Pause at node 1  (0s – 1.5s)
 *   - Drive to node 2  (1.5s – 4.5s)
 *   - Pause at node 2  (4.5s – 6s)
 *   - Drive to node 3  (6s – 9s)
 *   - Pause at node 3  (9s – 10.5s)
 *   - Fade out + reset (10.5s – 12s)
 */
const DRIVE_KEYFRAMES = {
  '@keyframes drive': {
    '0%, 12.5%': { left: TRACK_EDGE, opacity: 1 },
    '37.5%': { left: '50%', opacity: 1 },
    '50%': { left: '50%', opacity: 1 },
    '75%': { left: '83.33%', opacity: 1 },
    '87.5%': { left: '83.33%', opacity: 1 },
    '90%': { left: '83.33%', opacity: 0 },
    '91%': { left: TRACK_EDGE, opacity: 0 },
    '97%, 100%': { left: TRACK_EDGE, opacity: 1 },
  },
};

/** Arrival pulse — fires once at each node, synced via `animationDelay`. */
const ARRIVAL_RING_KEYFRAMES = {
  '@keyframes arrival-ring': {
    '0%': { transform: 'scale(1)', opacity: 0 },
    '5%': { transform: 'scale(1.25)', opacity: 0.8 },
    '15%': { transform: 'scale(1.5)', opacity: 0 },
    '100%': { transform: 'scale(1.5)', opacity: 0 },
  },
};

/* =====================================================================
 * Static styles
 * ===================================================================== */

const ROOT_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: 600,
  py: 4,
};

const STAGES_ROW_SX: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  mb: 4,
};

const TRACK_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 28,
  left: TRACK_EDGE,
  right: TRACK_EDGE,
  height: 2,
  borderTop: '2px dashed var(--orange)',
  zIndex: 1,
  opacity: 0.6,
};

const TRUCK_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 12,
  zIndex: 1,
  transform: 'translateX(-50%)',
  animation: 'drive 12s infinite linear',
  '& svg': {
    fontSize: 32,
    color: 'var(--orange)',
    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))',
  },
  ...DRIVE_KEYFRAMES,
};

const STAGE_NODE_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 2,
  zIndex: 3,
  flex: 1,
  position: 'relative',
};

const ARRIVAL_RING_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  width: 56,
  height: 56,
  borderRadius: '50%',
  border: '2px solid var(--orange)',
  opacity: 0,
  animation: 'arrival-ring 12s infinite',
  ...ARRIVAL_RING_KEYFRAMES,
};

const NODE_CIRCLE_SX: SxProps<Theme> = {
  width: 56,
  height: 56,
  borderRadius: '50%',
  bgcolor: 'var(--peach)',
  border: '4px solid var(--navy-deep)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--orange)',
  boxShadow: '0 0 0 2px var(--white)',
  position: 'relative',
  zIndex: 4,
};

const NODE_ICON_SX = { fontSize: 24 } as const;

const STAGE_LABEL_SX: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '0.85rem',
  color: 'var(--white)',
  textAlign: 'center',
  maxWidth: 120,
  lineHeight: 1.2,
};

/* =====================================================================
 * TruckDeliveryLoader
 * ===================================================================== */

export const TruckDeliveryLoader = () => (
  <Box sx={ROOT_SX}>
    <Box sx={STAGES_ROW_SX}>
      {/* Dotted track */}
      <Box sx={TRACK_SX} />

      {/* Animated truck */}
      <Box sx={TRUCK_SX}>
        <LocalShipping />
      </Box>

      {/* Stage nodes */}
      {STAGES.map((stage) => {
        const Icon = stage.icon;

        return (
          <Box key={stage.label} sx={STAGE_NODE_SX}>
            {/* Arrival pulse ring */}
            <Box
              sx={{
                ...ARRIVAL_RING_SX,
                animationDelay: stage.pulseDelay,
              }}
            />

            <Box sx={NODE_CIRCLE_SX}>
              <Icon sx={NODE_ICON_SX} />
            </Box>

            <Typography sx={STAGE_LABEL_SX}>{stage.label}</Typography>
          </Box>
        );
      })}
    </Box>
  </Box>
);
