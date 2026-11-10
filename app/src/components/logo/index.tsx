import { Box, type SxProps, type Theme } from '@mui/material';
import { Link } from 'react-router';
import mainLogo from '@/assets/logo/main-logo.png';

/* =====================================================================
 * Constants
 * ===================================================================== */
const LOGO_HEIGHT = 70;

/* =====================================================================
 * Static styles
 * ===================================================================== */

const LOGO_WRAPPER_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifySelf: 'start',
  flex: 'none',
  lineHeight: 0,
  transition: 'opacity 0.2s',
  my: '-10px',
  '&:hover': { opacity: 0.85 },
};

const logoImgSx = (height: number): SxProps<Theme> => ({
  display: 'block',
  height,
  width: 'auto',
  maxWidth: 'none',
  objectFit: 'contain',
});

/* =====================================================================
 * Logo
 * ===================================================================== */

interface LogoProps {
  to?: string | null;
  height?: number;
  sx?: SxProps<Theme>;
  alt?: string;
}

export const Logo = ({
  to = '/',
  height = LOGO_HEIGHT,
  sx,
  alt = 'Brisbane Logistics',
}: LogoProps) => {
  const img = <Box component="img" src={mainLogo} alt={alt} sx={logoImgSx(height)} />;

  if (to === null) {
    return <Box sx={{ ...LOGO_WRAPPER_SX, ...sx }}>{img}</Box>;
  }

  return (
    <Box component={Link} to={to} aria-label={alt} sx={{ ...LOGO_WRAPPER_SX, ...sx }}>
      {img}
    </Box>
  );
};

export default Logo;
