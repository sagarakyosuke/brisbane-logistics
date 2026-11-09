import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Link } from 'react-router';
import { SectionWrap } from '@/components/sections';
import { useAnimation } from '@/reusables/animation/use-animation';
import { HERO_DATA, PARTNER_NODES } from '@/utilities/_mock/home/warehouse-management/hero';

/* =====================================================================
 * Constants
 * ===================================================================== */

/** Diamond bond angle: bonds emanate from the diagram center. */
const ORIGIN = 50;

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Section shell ────────────────────────────────────────────────── */

const SECTION_SX: SxProps<Theme> = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  minHeight: { xs: '80svh', md: 'clamp(500px, 70vh, 700px)' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  bgcolor: 'var(--navy-deep)',
  color: 'var(--white)',
};

const STRIPES_SX: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  opacity: 0.1,
  background:
    'repeating-linear-gradient(45deg, transparent, transparent 40px, var(--white) 40px, var(--white) 80px)',
};

const GRADIENT_OVERLAY_SX: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  zIndex: 2,
  pointerEvents: 'none',
  background: 'linear-gradient(90deg, var(--navy-deep) 0%, var(--navy-deep) 40%, transparent 100%)',
};

const CONTENT_GRID_SX: SxProps<Theme> = {
  position: 'relative',
  zIndex: 3,
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: '1.1fr 0.9fr' },
  gap: { xs: 5, lg: 7 },
  alignItems: 'center',
  pt: { xs: 9, md: 11 },
  pb: { xs: 8, md: 10 },
};

/* ── Breadcrumb ───────────────────────────────────────────────────── */

const BREADCRUMB_ROW_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  mb: 2.5,
  fontSize: '0.85rem',
  fontWeight: 600,
};

const BREADCRUMB_LINK_SX: SxProps<Theme> = {
  color: 'var(--muted)',
  textDecoration: 'none',
  transition: 'color 0.2s',
  '&:hover': { color: 'var(--white)' },
};

const BREADCRUMB_SEP_SX: SxProps<Theme> = { color: 'var(--muted)', fontSize: '0.85rem' };
const BREADCRUMB_CURRENT_SX: SxProps<Theme> = { color: 'var(--white)', fontSize: '0.85rem' };

/* ── Text column ──────────────────────────────────────────────────── */

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
  fontWeight: 900,
  lineHeight: 1.1,
  letterSpacing: '-0.03em',
  mb: 2.5,
};

const TITLE_ACCENT_SX: SxProps<Theme> = { color: 'var(--orange)' };

const DESCRIPTION_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  color: 'var(--mist)',
  lineHeight: 1.6,
  mb: 3.5,
  maxWidth: 480,
};

/* ── Network diagram shell ────────────────────────────────────────── */

const DIAGRAM_SX: SxProps<Theme> = {
  position: 'relative',
  aspectRatio: '1/1',
  width: '100%',
  maxWidth: 440,
  mx: 'auto',
  display: { xs: 'none', md: 'block' },
  perspective: '1000px',
  '&:hover .molecule-core': {
    transform: 'translate(-50%, -50%) scale(1.05)',
  },
};

const RING_INNER_SX: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  height: '40%',
  borderRadius: '50%',
  border: '2px dashed rgba(255,255,255,0.15)',
  zIndex: 0,
  animation: 'spin 25s linear infinite',
  '@keyframes spin': {
    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
    '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
  },
};

const RING_OUTER_SX: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '56%',
  height: '56%',
  borderRadius: '50%',
  border: '1px dashed rgba(255,255,255,0.05)',
  zIndex: 0,
  animation: 'spin-reverse 35s linear infinite',
  '@keyframes spin-reverse': {
    '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
    '100%': { transform: 'translate(-50%, -50%) rotate(-360deg)' },
  },
};

/* ── Central core ─────────────────────────────────────────────────── */

const CORE_SX: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '24%',
  height: '24%',
  borderRadius: '50%',
  bgcolor: 'var(--white)',
  color: 'var(--navy)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  fontWeight: 800,
  fontSize: 'clamp(0.7rem, 1.2vw, 1rem)',
  lineHeight: 1.2,
  zIndex: 3,
  transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
  animation: 'core-glow 4s ease-in-out infinite',
  '@keyframes core-glow': {
    '0%': {
      boxShadow: '0 0 0 15px rgba(255,255,255,0.05), 0 0 30px 10px rgba(245, 130, 32, 0.1)',
    },
    '50%': {
      boxShadow: '0 0 0 20px rgba(255,255,255,0.1), 0 0 50px 20px rgba(245, 130, 32, 0.3)',
    },
    '100%': {
      boxShadow: '0 0 0 15px rgba(255,255,255,0.05), 0 0 30px 10px rgba(245, 130, 32, 0.1)',
    },
  },
};

/* ── Bond lines & satellite nodes ─────────────────────────────────── */

const BOND_SX: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  height: '2px',
  backgroundImage: 'linear-gradient(90deg, var(--orange) 50%, transparent 50%)',
  backgroundSize: '12px 100%',
  transformOrigin: '0 50%',
  zIndex: 1,
  animation: 'bond-pulse 3s ease-in-out infinite, dash 1.5s linear infinite',
  '@keyframes dash': {
    '0%': { backgroundPosition: '0 0' },
    '100%': { backgroundPosition: '-24px 0' },
  },
  '@keyframes bond-pulse': {
    '0%': { opacity: 0.5, filter: 'drop-shadow(0 0 0px var(--orange))' },
    '50%': { opacity: 1, filter: 'drop-shadow(0 0 4px var(--orange))' },
    '100%': { opacity: 0.5, filter: 'drop-shadow(0 0 0px var(--orange))' },
  },
};

const NODE_SX: SxProps<Theme> = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  width: '14%',
  height: '14%',
  borderRadius: '50%',
  bgcolor: 'var(--white)',
  color: 'var(--navy)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  fontSize: 'clamp(0.6rem, 1vw, 0.85rem)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  zIndex: 2,
  animation: 'float 5s ease-in-out infinite',
  '@keyframes float': {
    '0%': { transform: 'translate(-50%, -50%) translateY(0px)' },
    '50%': { transform: 'translate(-50%, -50%) translateY(-10px)' },
    '100%': { transform: 'translate(-50%, -50%) translateY(0px)' },
  },
};

/* =====================================================================
 * Helpers
 * ===================================================================== */

/** Compute the visual angle (deg) and length (%) of a bond to a node. */
const computeBond = (nodeX: number, nodeY: number) => {
  const dx = nodeX - ORIGIN;
  const dy = nodeY - ORIGIN;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  return { distance, angle };
};

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const Breadcrumb = () => (
  <Box sx={BREADCRUMB_ROW_SX}>
    <Box component={Link} to="/" sx={BREADCRUMB_LINK_SX}>
      {HERO_DATA.breadcrumb.parent}
    </Box>
    <Typography sx={BREADCRUMB_SEP_SX}>/</Typography>
    <Typography sx={BREADCRUMB_CURRENT_SX}>{HERO_DATA.breadcrumb.current}</Typography>
  </Box>
);

const TitleBlock = () => (
  <Typography component="h1" sx={TITLE_SX}>
    {HERO_DATA.titleLine1}
    <br />
    {HERO_DATA.titleLine2}
    <br />
    <Box component="span" sx={TITLE_ACCENT_SX}>
      {HERO_DATA.titleLine3}
      <br />
      {HERO_DATA.titleLine4}
    </Box>
  </Typography>
);

const NetworkDiagram = () => (
  <Box sx={DIAGRAM_SX}>
    {/* Rotating rings */}
    <Box sx={RING_INNER_SX} />
    <Box sx={RING_OUTER_SX} />

    {/* Bonds from center to each node */}
    {PARTNER_NODES.map((node) => {
      const { distance, angle } = computeBond(node.x, node.y);
      return (
        <Box
          key={`bond-${node.id}`}
          sx={{ ...BOND_SX, width: `${distance}%`, transform: `rotate(${angle}deg)` }}
        />
      );
    })}

    {/* Central core */}
    <Box className="molecule-core" sx={CORE_SX}>
      YOUR
      <br />
      STOCK
    </Box>

    {/* Floating satellite nodes */}
    {PARTNER_NODES.map((node, index) => (
      <Box
        key={node.id}
        sx={{
          ...NODE_SX,
          top: `${node.y}%`,
          left: `${node.x}%`,
          animationDelay: `${index * 0.4}s`,
        }}
      >
        {node.label}
      </Box>
    ))}
  </Box>
);

/* =====================================================================
 * HeroSection
 * ===================================================================== */

export const HeroSection = () => {
  const { ref, style } = useAnimation({ delay: 100 });

  return (
    <Box
      component="section"
      ref={ref}
      sx={[SECTION_SX, ...(Array.isArray(style) ? style : [style])]}
    >
      <Box sx={STRIPES_SX} />
      <Box sx={GRADIENT_OVERLAY_SX} />

      <SectionWrap>
        <Box sx={CONTENT_GRID_SX}>
          {/* Left — text content */}
          <Box>
            <Breadcrumb />
            <TitleBlock />
            <Typography sx={DESCRIPTION_SX}>{HERO_DATA.description}</Typography>
          </Box>

          {/* Right — network diagram */}
          <NetworkDiagram />
        </Box>
      </SectionWrap>
    </Box>
  );
};
