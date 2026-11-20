// src/reusables/loader/page-progress.tsx

import { useEffect, useState } from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';

/* =====================================================================
 * Constants
 * ===================================================================== */

const BAR_SX: SxProps<Theme> = {
  position: 'absolute',
  left: 0,
  bottom: -1,
  height: '3px',
  bgcolor: 'var(--orange)',
  transition: 'width 0.1s linear',
  zIndex: 10,
};

/* =====================================================================
 * ScrollProgress
 * ===================================================================== */

export const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      setProgress((window.scrollY / scrollHeight) * 100);
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    // Run once on mount so the bar reflects a pre-scrolled page (e.g. hash links).
    updateScroll();

    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return <Box sx={[BAR_SX, { width: `${progress}%` }]} />;
};
