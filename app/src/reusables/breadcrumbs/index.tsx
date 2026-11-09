import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Link } from 'react-router';
import { useBreadcrumbs } from '@/reusables/breadcrumbs/use-breadcrumbs';
import { palette } from '@/utilities/themes';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const ROW_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  mb: 3,
  fontSize: '0.85rem',
  fontWeight: 600,
};

const SEGMENT_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

/** Shared style for both the hardcoded Home link and generated crumb links. */
const LINK_SX: SxProps<Theme> = {
  color: palette.muted,
  textDecoration: 'none',
  transition: 'color 0.2s',
  '&:hover': { color: palette.white },
};

const SEPARATOR_SX: SxProps<Theme> = { color: palette.muted, fontSize: '0.85rem' };

const CURRENT_SX: SxProps<Theme> = { color: palette.white, fontSize: '0.85rem' };

/* =====================================================================
 * Breadcrumbs
 * ===================================================================== */

export const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();

  // The hook returns an empty array when on the home page — nothing to render.
  if (breadcrumbs.length === 0) return null;

  return (
    <Box sx={ROW_SX}>
      {/* Root */}
      <Box component={Link} to="/" sx={LINK_SX}>
        Home
      </Box>

      {/* Generated crumbs */}
      {breadcrumbs.map((crumb) => (
        <Box key={crumb.path} sx={SEGMENT_SX}>
          <Typography sx={SEPARATOR_SX}>/</Typography>

          {crumb.isLast ? (
            <Typography sx={CURRENT_SX}>{crumb.label}</Typography>
          ) : (
            <Box component={Link} to={crumb.path} sx={LINK_SX}>
              {crumb.label}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};
