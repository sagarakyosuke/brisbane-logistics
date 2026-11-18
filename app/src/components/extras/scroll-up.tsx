
import { useEffect, useState } from 'react';

import { Fade, Fab } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

import { palette, shadows } from '@/utilities/themes';

/* =====================================================================
 * Constants
 * ===================================================================== */

const SCROLL_THRESHOLD = 400;

/* =====================================================================
 * Scroll to Top
 * ===================================================================== */

const ScrollUp = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Fade in={visible} timeout={250} unmountOnExit>
      <Fab
        aria-label="Scroll to top"
        title="Back to top"
        size="medium"
        onClick={handleScrollToTop}
        sx={{
          position: 'fixed',
          right: { xs: 20, sm: 32 },
          bottom: { xs: 20, sm: 32 },
          zIndex: (theme) => theme.zIndex.speedDial,

          width: 52,
          height: 52,
          minHeight: 52,

          bgcolor: palette.orange,
          color: palette.navy,
          boxShadow: shadows.base,

          transition: 'all 0.25s ease',

          '&:hover': {
            bgcolor: palette.orange2,
            color: palette.white,
            transform: 'translateY(-4px)',
            boxShadow: shadows.base,
          },

          '&:active': {
            transform: 'translateY(-1px)',
          },

          '&:focus-visible': {
            outline: `3px solid ${palette.white}`,
            outlineOffset: 3,
          },

          '& .MuiSvgIcon-root': {
            fontSize: 30,
          },
        }}
      >
        <KeyboardArrowUp />
      </Fab>
    </Fade>
  );
};

export default ScrollUp;
