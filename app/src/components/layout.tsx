import type { ReactNode } from 'react';
import { Box, type SxProps, type Theme } from '@mui/material';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

/* =====================================================================
 * Types
 * ===================================================================== */

interface LayoutProps {
  children: ReactNode;
}

/* =====================================================================
 * Static styles
 * ===================================================================== */

const ROOT_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

/**
 * Spacer for the fixed `<Navbar>`.
 *
 * The top bar collapses on scroll, so we only need to reserve space for the
 * main navbar height. The top bar overlays the page content when present
 * and slides away smoothly on scroll — no layout shift required.
 */
const HEADER_SPACER_SX: SxProps<Theme> = {
  height: 'var(--hdr)',
  flexShrink: 0,
};

const MAIN_SX: SxProps<Theme> = { flexGrow: 1 };

/* =====================================================================
 * Layout
 * ===================================================================== */

export const Layout = ({ children }: LayoutProps) => (
  <Box sx={ROOT_SX}>
    <Navbar />
    <Box sx={HEADER_SPACER_SX} />
    <Box component="main" sx={MAIN_SX}>
      {children}
    </Box>
    <Footer />
  </Box>
);
