import { Box, Typography } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';

import { palette, radii, shadows } from '@/utilities/themes';
import { useGoogleMap } from './use-google-map';

/* =====================================================================
 * Styles
 * ===================================================================== */

const ROOT_SX = {
  width: '100%',
  mb: 6,
};

const HEADER_SX = {
  display: 'flex',
  flexDirection: {
    xs: 'column',
    sm: 'row',
  },
  justifyContent: 'space-between',
  alignItems: {
    xs: 'flex-start',
    sm: 'flex-end',
  },
  gap: 2,
  mb: 3,
};

const EYEBROW_SX = {
  display: 'block',
  color: palette.orange,
  fontSize: '0.72rem',
  fontWeight: 800,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  mb: 1,
};

const TITLE_SX = {
  color: palette.white,
  fontSize: {
    xs: '1.45rem',
    md: '1.85rem',
  },
  fontWeight: 800,
  lineHeight: 1.2,
  mb: 1,
};

const DESCRIPTION_SX = {
  color: palette.mist,
  fontSize: '0.9rem',
  lineHeight: 1.6,
  maxWidth: '52ch',
};

const MAP_CARD_SX = {
  position: 'relative',
  width: '100%',
  height: {
    xs: 280,
    sm: 340,
    md: 400,
  },
  overflow: 'hidden',
  borderRadius: `${radii.base + 4}px`,
  border: `1px solid ${palette.navySoft}`,
  bgcolor: palette.navy,
  boxShadow: shadows.base,

  '& iframe': {
    display: 'block',
    width: '100%',
    height: '100%',
    border: 0,
  },
};

const MAP_LINK_SX = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.75,
  color: palette.orange,
  fontSize: '0.85rem',
  fontWeight: 700,
  textDecoration: 'none',
  transition: 'color 0.2s ease',

  '&:hover': {
    color: palette.orange2,
  },

  '&:focus-visible': {
    outline: `2px solid ${palette.orange}`,
    outlineOffset: 4,
    borderRadius: 1,
  },
};

/* =====================================================================
 * Google Map
 * ===================================================================== */

const GoogleMap = () => {
  const { embedUrl, mapsUrl, title } = useGoogleMap();

  return (
    <Box component="section" sx={ROOT_SX}>
      <Box sx={HEADER_SX}>
        <Box>
          <Typography sx={EYEBROW_SX}>Find Us</Typography>

          <Typography component="h2" sx={TITLE_SX}>
            Visit Brisbane Logistics
          </Typography>

          <Typography sx={DESCRIPTION_SX}>
            Explore our location and find your way to Brisbane Logistics using Google Maps.
          </Typography>
        </Box>

        <Box
          component="a"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={MAP_LINK_SX}
        >
          Open in Google Maps
          <OpenInNew sx={{ fontSize: 17 }} />
        </Box>
      </Box>

      <Box sx={MAP_CARD_SX}>
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </Box>
    </Box>
  );
};

export default GoogleMap;
