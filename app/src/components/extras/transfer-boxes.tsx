import { Box, type SxProps, type Theme } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { palette } from '@/utilities/themes';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const CONTAINER_SX: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  maxWidth: 500,
  height: 400,
  mx: 'auto',
  display: { xs: 'none', lg: 'block' },
};

/* ── Floating Bubbles (S, W, M) ───────────────────────────────────── */

const FLOATING_ICON_SX: SxProps<Theme> = {
  position: 'absolute',
  bgcolor: palette.white,
  borderRadius: '12px',
  width: 60,
  height: 44,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 12px -4px rgba(18,26,87,.15)',
  zIndex: 3,
  fontWeight: 800,
  fontSize: '1.25rem',
  animation: 'bob 3.5s ease-in-out infinite',
  '@keyframes bob': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-8px)' },
  },
};

/* ── Laptop ───────────────────────────────────────────────────────── */

const LAPTOP_WRAPPER_SX: SxProps<Theme> = {
  position: 'absolute',
  bottom: 40,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 2,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const SCREEN_SX: SxProps<Theme> = {
  width: 180,
  height: 120,
  bgcolor: palette.white,
  border: `8px solid ${palette.navy}`,
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 12px 24px -10px rgba(18,26,87,.3)',
};

const LAPTOP_BASE_SX: SxProps<Theme> = {
  width: 220,
  height: 12,
  bgcolor: palette.navy,
  borderRadius: '4px 4px 12px 12px',
  mt: -1,
};

/* ── Warehouse ────────────────────────────────────────────────────── */

const WAREHOUSE_WRAPPER_SX: SxProps<Theme> = {
  position: 'absolute',
  bottom: 40,
  right: 0,
  zIndex: 1,
};

const WAREHOUSE_BUILDING_SX: SxProps<Theme> = {
  width: 120,
  height: 140,
  bgcolor: '#dce3f0',
  borderRadius: '4px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -30,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 0,
    height: 0,
    borderLeft: '60px solid transparent',
    borderRight: '60px solid transparent',
    borderBottom: `30px solid #dce3f0`,
  },
};

/* ── THROWING BOX ANIMATION ──────────────────────────────────────── */

const THROWING_BOX_BASE_SX: SxProps<Theme> = {
  position: 'absolute',
  bgcolor: '#e58a35',
  borderRadius: '4px',
  zIndex: 4,
  opacity: 0,
  transformOrigin: 'center center',
  willChange: 'transform, opacity',
  filter: 'drop-shadow(0 5px 4px rgba(80, 50, 20, .13))',
};

const THROW_BOX_1_SX: SxProps<Theme> = {
  ...THROWING_BOX_BASE_SX,
  width: 34,
  height: 30,
  left: '46%',
  bottom: 55,
  animation: 'throwBox1 3.8s linear infinite',
  '@keyframes throwBox1': {
    '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
    '5%': { transform: 'translate(0, 0) rotate(-8deg) scale(1)', opacity: 1 },
    '12%': { transform: 'translate(20px, -30px) rotate(12deg) scale(1.08)', opacity: 1 },
    '23%': { transform: 'translate(50px, -65px) rotate(35deg) scale(1.05)', opacity: 1 },
    '38%': { transform: 'translate(90px, -95px) rotate(65deg) scale(1)', opacity: 1 },
    '53%': { transform: 'translate(130px, -85px) rotate(105deg) scale(.98)', opacity: 1 },
    '68%': { transform: 'translate(160px, -60px) rotate(145deg) scale(.92)', opacity: 1 },
    '80%': { transform: 'translate(180px, -30px) rotate(175deg) scale(.82)', opacity: 1 },
    '88%': { transform: 'translate(190px, 10px) rotate(195deg) scale(.65)', opacity: 0.8 },
    '94%': { transform: 'translate(200px, 25px) rotate(210deg) scale(.4)', opacity: 0 },
    '100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
  },
};

const THROW_BOX_2_SX: SxProps<Theme> = {
  ...THROWING_BOX_BASE_SX,
  width: 28,
  height: 26,
  left: '48%',
  bottom: 55,
  animation: 'throwBox2 3.8s linear 0.75s infinite',
  '@keyframes throwBox2': {
    '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
    '5%': { transform: 'translate(0, 0) rotate(8deg) scale(1)', opacity: 1 },
    '12%': { transform: 'translate(15px, -25px) rotate(-12deg) scale(1.08)', opacity: 1 },
    '23%': { transform: 'translate(45px, -60px) rotate(-35deg) scale(1.05)', opacity: 1 },
    '38%': { transform: 'translate(80px, -85px) rotate(-65deg) scale(1)', opacity: 1 },
    '53%': { transform: 'translate(115px, -75px) rotate(-105deg) scale(.98)', opacity: 1 },
    '68%': { transform: 'translate(145px, -50px) rotate(-145deg) scale(.92)', opacity: 1 },
    '80%': { transform: 'translate(165px, -25px) rotate(-175deg) scale(.82)', opacity: 1 },
    '88%': { transform: 'translate(175px, 10px) rotate(-195deg) scale(.65)', opacity: 0.8 },
    '94%': { transform: 'translate(185px, 25px) rotate(-220deg) scale(.4)', opacity: 0 },
    '100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
  },
};

const THROW_BOX_3_SX: SxProps<Theme> = {
  ...THROWING_BOX_BASE_SX,
  width: 24,
  height: 22,
  left: '50%',
  bottom: 55,
  animation: 'throwBox3 3.8s linear 1.5s infinite',
  '@keyframes throwBox3': {
    '0%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
    '5%': { transform: 'translate(0, 0) rotate(-5deg) scale(1)', opacity: 1 },
    '12%': { transform: 'translate(10px, -20px) rotate(15deg) scale(1.08)', opacity: 1 },
    '23%': { transform: 'translate(40px, -55px) rotate(40deg) scale(1.05)', opacity: 1 },
    '38%': { transform: 'translate(70px, -75px) rotate(75deg) scale(1)', opacity: 1 },
    '53%': { transform: 'translate(105px, -65px) rotate(115deg) scale(.98)', opacity: 1 },
    '68%': { transform: 'translate(135px, -40px) rotate(155deg) scale(.92)', opacity: 1 },
    '80%': { transform: 'translate(160px, -15px) rotate(190deg) scale(.82)', opacity: 1 },
    '88%': { transform: 'translate(170px, 10px) rotate(215deg) scale(.65)', opacity: 0.8 },
    '94%': { transform: 'translate(180px, 25px) rotate(240deg) scale(.4)', opacity: 0 },
    '100%': { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 0 },
  },
};

/* ── SVG Lines ────────────────────────────────────────────────────── */

const SVG_STYLES: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: 1,
  '& line': {
    strokeDasharray: '6 6',
    animation: 'flow 1.5s linear infinite',
  },
  '@keyframes flow': {
    '0%': { strokeDashoffset: 24 },
    '100%': { strokeDashoffset: 0 },
  },
};

/* =====================================================================
 * TransferBoxes
 * ===================================================================== */

export const TransferBoxes = () => (
  <Box sx={CONTAINER_SX}>
    {/* SVG Connecting Dashed Lines */}
    <Box component="svg" viewBox="0 0 500 400" sx={SVG_STYLES}>
      <line
        x1="160"
        y1="140"
        x2="250"
        y2="232"
        stroke={palette.orange}
        strokeWidth="2"
        opacity="0.8"
      />
      <line
        x1="250"
        y1="120"
        x2="250"
        y2="232"
        stroke={palette.orange}
        strokeWidth="2"
        opacity="0.8"
      />
      <line
        x1="340"
        y1="140"
        x2="250"
        y2="232"
        stroke={palette.orange}
        strokeWidth="2"
        opacity="0.8"
      />
    </Box>

    {/* Floating Platform Bubbles (S, W, M) */}
    <Box sx={{ ...FLOATING_ICON_SX, top: 118, left: 130, color: '#63a643' }}>S</Box>
    <Box sx={{ ...FLOATING_ICON_SX, top: 98, left: 220, color: '#7e57c2', animationDelay: '0.4s' }}>
      W
    </Box>
    <Box
      sx={{ ...FLOATING_ICON_SX, top: 118, left: 310, color: palette.navy, animationDelay: '0.8s' }}
    >
      M
    </Box>

    {/* Laptop */}
    <Box sx={LAPTOP_WRAPPER_SX}>
      <Box sx={SCREEN_SX}>
        <ShoppingCart sx={{ fontSize: 48, color: palette.navy }} />
      </Box>
      <Box sx={LAPTOP_BASE_SX} />
    </Box>

    {/* Warehouse */}
    <Box sx={WAREHOUSE_WRAPPER_SX}>
      <Box sx={WAREHOUSE_BUILDING_SX} />
    </Box>

    {/* Animated Throwing Boxes */}
    <Box sx={THROW_BOX_1_SX} />
    <Box sx={THROW_BOX_2_SX} />
    <Box sx={THROW_BOX_3_SX} />
  </Box>
);
