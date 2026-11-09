import { useEffect, useState } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface JourneyNode {
  id: string;
  label: string;
  type: string;
  icon: string;
}

export interface JourneyProgressProps {
  timeline: JourneyNode[];
  icons: Record<string, React.ElementType>;
}

/* =====================================================================
 * Constants
 * ===================================================================== */

/** Tuned to the dot's position; matches the 40% navy / 60% orange split. */
const KENTER_SHARE = 40;
const BRISBANE_SHARE = 100 - KENTER_SHARE;

const AUTOPLAY_MS = 3500;

/* =====================================================================
 * Helpers
 * ===================================================================== */

const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

/* =====================================================================
 * Static styles
 * ===================================================================== */

const NODE_ROW_SX: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  position: 'relative',
  mb: 8,
  overflowX: 'auto',
  pb: 2,
  pt: 3,
};

const NODE_CONNECTOR_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 52,
  left: '10%',
  right: '10%',
  height: '2px',
  borderTop: '2px dashed var(--line)',
  zIndex: 0,
};

const NODE_CELL_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
  width: '20%',
  minWidth: '130px',
};

const NODE_CIRCLE_SX: SxProps<Theme> = {
  width: 64,
  height: 64,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 3,
  transition: 'all 0.8s ease',
  '@keyframes pulse': {
    '0%': { boxShadow: '0 0 0 2px var(--orange), 0 0 20px rgba(245, 130, 32, 0.4)' },
    '50%': { boxShadow: '0 0 0 8px var(--peach), 0 0 30px rgba(245, 130, 32, 0.2)' },
    '100%': { boxShadow: '0 0 0 2px var(--orange), 0 0 20px rgba(245, 130, 32, 0.4)' },
  },
};

const NODE_LABEL_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  fontWeight: 700,
  textAlign: 'center',
  lineHeight: 1.3,
  transition: 'color 0.8s ease',
  px: 1,
};

const PROGRESS_WRAPPER_SX: SxProps<Theme> = {
  width: '100%',
  px: { xs: 0, md: 8 },
};

const BAR_CONTAINER_SX: SxProps<Theme> = {
  position: 'relative',
  height: 12,
  mt: 2,
};

const TRACK_SX: SxProps<Theme> = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 3,
  height: 6,
  bgcolor: 'var(--line)',
  borderRadius: 3,
  overflow: 'hidden',
};

const KENTER_SEGMENT_SX: SxProps<Theme> = {
  position: 'absolute',
  left: 0,
  width: `${KENTER_SHARE}%`,
  height: '100%',
  bgcolor: 'var(--navy)',
};

const ORANGE_SEGMENT_SX: SxProps<Theme> = {
  position: 'absolute',
  left: `${KENTER_SHARE}%`,
  height: '100%',
  bgcolor: 'var(--orange)',
  transition: 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1)',
};

const MOVING_DOT_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 0,
  width: 12,
  height: 12,
  borderRadius: '50%',
  bgcolor: 'var(--white)',
  zIndex: 2,
  transform: 'translateX(-50%)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  transition: 'left 1.2s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.8s ease',
};

const LEGEND_ROW_SX: SxProps<Theme> = { display: 'flex', mt: 4, mb: 2 };

const LEGEND_COLUMN_SX = (widthPercent: number): SxProps<Theme> => ({
  width: `${widthPercent}%`,
  display: 'flex',
  justifyContent: 'center',
});

const LEGEND_LABEL_SX: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: '1.1rem',
  letterSpacing: '-0.01em',
};

const DISCLAIMER_SX: SxProps<Theme> = {
  textAlign: 'center',
  color: 'var(--muted)',
  fontSize: '1rem',
  mt: 6,
  lineHeight: 1.5,
};

/* =====================================================================
 * JourneyProgress
 * ===================================================================== */

export const JourneyProgress = ({ timeline, icons }: JourneyProgressProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const lastIndex = timeline.length - 1;

  useEffect(() => {
    if (lastIndex <= 0) return;

    const id = setInterval(() => {
      setActiveIndex((prev) => (prev >= lastIndex ? 0 : prev + 1));
    }, AUTOPLAY_MS);

    return () => clearInterval(id);
  }, [lastIndex]);

  // Guard against a single-node timeline (avoid divide-by-zero).
  const progressPercent = lastIndex > 0 ? (activeIndex / lastIndex) * 100 : 0;

  // The orange segment only starts rendering once we've passed Kenter.
  const orangeWidth = clamp(progressPercent - KENTER_SHARE, 0, BRISBANE_SHARE);

  const dotBorderColor = progressPercent <= KENTER_SHARE ? 'var(--navy)' : 'var(--orange)';

  return (
    <>
      {/* ── Nodes ────────────────────────────────────────────────────── */}
      <Box sx={NODE_ROW_SX}>
        <Box sx={NODE_CONNECTOR_SX} />

        {timeline.map((node, index) => {
          const Icon = icons[node.icon];
          const isActive = index === activeIndex;
          const isPassed = index < activeIndex;
          const isKenter = node.type === 'kenter';
          const filled = isActive || isPassed || isKenter;

          return (
            <Box key={node.id} sx={NODE_CELL_SX}>
              <Box
                sx={{
                  ...NODE_CIRCLE_SX,
                  bgcolor: isActive ? 'var(--orange)' : filled ? 'var(--navy)' : '#f0f0f0',
                  color: filled ? 'var(--white)' : 'var(--muted)',
                  border: isActive ? '4px solid var(--peach)' : 'none',
                  boxShadow: isActive
                    ? '0 0 0 2px var(--orange), 0 0 24px rgba(245, 130, 32, 0.4)'
                    : 'none',
                  animation: isActive ? 'pulse 2.5s infinite' : 'none',
                }}
              >
                {Icon && <Icon sx={{ fontSize: 28 }} />}
              </Box>

              <Typography
                sx={{
                  ...NODE_LABEL_SX,
                  color: isActive ? 'var(--orange)' : 'var(--navy)',
                }}
              >
                {node.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* ── Progress Bar & Legend ────────────────────────────────────── */}
      <Box sx={PROGRESS_WRAPPER_SX}>
        <Box sx={BAR_CONTAINER_SX}>
          <Box sx={TRACK_SX}>
            <Box sx={KENTER_SEGMENT_SX} />
            <Box sx={{ ...ORANGE_SEGMENT_SX, width: `${orangeWidth}%` }} />
          </Box>

          <Box
            sx={{
              ...MOVING_DOT_SX,
              left: `${progressPercent}%`,
              border: `3px solid ${dotBorderColor}`,
            }}
          />
        </Box>

        <Box sx={LEGEND_ROW_SX}>
          <Box sx={LEGEND_COLUMN_SX(KENTER_SHARE)}>
            <Typography sx={{ ...LEGEND_LABEL_SX, color: 'var(--navy)' }}>Kenter</Typography>
          </Box>
          <Box sx={LEGEND_COLUMN_SX(BRISBANE_SHARE)}>
            <Typography sx={{ ...LEGEND_LABEL_SX, color: 'var(--orange)' }}>
              Brisbane Logistics
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* ── Disclaimer ───────────────────────────────────────────────── */}
      <Typography sx={DISCLAIMER_SX}>
        Example import journey. Services and handovers depend on your shipment.
      </Typography>
    </>
  );
};
