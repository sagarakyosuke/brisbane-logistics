import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Drawer as MuiDrawer,
  IconButton,
  Typography,
} from '@mui/material';
import { ArrowForward, Close, ExpandMore, LocalShipping, Person } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router';
import { AppButton } from '@/components/buttons';
import { navLinks } from '@/utilities/_mock/navbar';

/* =====================================================================
 * Types
 * ===================================================================== */

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

/* =====================================================================
 * Route mapping
 * ===================================================================== */

const LABEL_TO_PATH: Record<string, string> = {
  Home: '/',
  Services: '/services',
  'Case Studies': '/case-studies',
  'News & Blogs': '/news',
  FAQs: '/faqs',
  'About Us': '/about',
};

/** Map a nav label to a route path. Fallback to root for unmapped labels. */
const labelToPath = (label: string): string => LABEL_TO_PATH[label] ?? '/';

/* =====================================================================
 * Shared styles
 * ===================================================================== */

/** Shared styles for the primary (non-accordion) nav buttons. */
const PRIMARY_NAV_BUTTON_SX = {
  justifyContent: 'flex-start',
  color: 'var(--navy)',
  fontWeight: 700,
  fontSize: '1rem',
  textTransform: 'none',
  p: 1.5,
  borderBottom: '1px solid var(--line)',
  borderRadius: 0,
} as const;

/** Shared styles for the sub-item buttons inside an accordion. */
const SUB_ITEM_BUTTON_SX = {
  justifyContent: 'flex-start',
  gap: 1.5,
  color: 'var(--muted)',
  textTransform: 'none',
  fontWeight: 500,
  fontSize: '0.9rem',
  p: 1,
  '&:hover': {
    color: 'var(--navy)',
    bgcolor: 'var(--peach)',
    '& .dd-icon-box': {
      bgcolor: 'var(--orange)',
      color: 'var(--white)',
    },
  },
} as const;

/** Icon tile shown next to each sub-item (mirrors Navbar's dd-icon-box). */
const SUB_ITEM_ICON_SX = {
  width: 28,
  height: 28,
  borderRadius: '6px',
  bgcolor: 'var(--white)',
  border: '1px solid var(--line)',
  color: 'var(--orange)',
  display: 'grid',
  placeItems: 'center',
  flex: 'none',
  transition: 'all 0.2s',
} as const;

/** Shared styles for the small client-portal links at the bottom. */
const PORTAL_LINK_SX = {
  justifyContent: 'flex-start',
  color: 'var(--muted)',
  textTransform: 'none',
  fontSize: '0.85rem',
} as const;

/**
 * Drawer CTA overrides — preserves the original `py: 1.5` (not the larger
 * AppButton "large" default). Hoisted so both CTAs share the same object.
 */
const DRAWER_CTA_OVERRIDE_SX = { py: 1.5 } as const;

/* =====================================================================
 * Static MUI slot styles (hoisted — never re-created per render)
 * ===================================================================== */

const DRAWER_PAPER_SX = {
  width: 'min(380px, 100%)',
  bgcolor: 'var(--white)',
  p: 2.5,
  pt: 'calc(env(safe-area-inset-top, 0px) + 20px)',
  pb: 'calc(env(safe-area-inset-bottom, 0px) + 20px)',
} as const;

const HEADER_SX = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
} as const;

const CLOSE_BUTTON_SX = {
  border: '1px solid var(--line)',
  borderRadius: 2,
  color: 'var(--navy)',
  p: 1,
} as const;

const NAV_SCROLL_SX = {
  flexGrow: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
} as const;

const ACCORDION_SX = {
  borderBottom: '1px solid var(--line)',
  '&:before': { display: 'none' },
  bgcolor: 'transparent',
} as const;

const ACCORDION_SUMMARY_SX = {
  px: 1.5,
  minHeight: 48,
  '& .MuiAccordionSummary-content': { my: 1.5 },
} as const;

const ACCORDION_DETAILS_SX = {
  px: 1.5,
  pb: 2,
  pt: 0,
  display: 'grid',
  gap: 1,
} as const;

const FOOTER_SX = {
  display: 'grid',
  gap: 1.5,
  mt: 3,
  pt: 3,
  borderTop: '1px solid var(--line)',
} as const;

const PORTAL_CONTAINER_SX = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  mt: 2,
} as const;

const EXPAND_ICON_SX = { color: 'var(--navy)' } as const;
const EXPAND_ICON = <ExpandMore sx={EXPAND_ICON_SX} />;

/* =====================================================================
 * Logo (local to Drawer)
 * ===================================================================== */

const LOGO_ROOT_SX = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.25,
  textDecoration: 'none',
  flexShrink: 0,
} as const;

const LOGO_BARS_SX = {
  display: 'flex',
  gap: '3px',
  alignItems: 'center',
  transform: 'skewX(-14deg)',
} as const;

const LOGO_TEXT_SX = { display: 'flex', flexDirection: 'column', lineHeight: 1 } as const;

const Logo = () => (
  <Box sx={LOGO_ROOT_SX}>
    <Box sx={LOGO_BARS_SX}>
      <Box sx={{ width: 5, height: 30, bgcolor: 'var(--logo-sky)' }} />
      <Box sx={{ width: 5, height: 30, bgcolor: 'var(--logo-blue)' }} />
      <Box sx={{ width: 3, height: 30, bgcolor: 'var(--orange)' }} />
    </Box>

    <Box sx={LOGO_TEXT_SX}>
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: '1.15rem',
          color: 'var(--logo-blue)',
          letterSpacing: '-0.03em',
          lineHeight: 0.9,
        }}
      >
        BRISBANE
      </Typography>
      <Typography
        sx={{
          fontSize: '0.78rem',
          letterSpacing: '0.08em',
          color: 'var(--navy)',
          fontWeight: 800,
          lineHeight: 1.1,
        }}
      >
        LOGISTICS
      </Typography>
    </Box>
  </Box>
);

/* =====================================================================
 * Drawer
 * ===================================================================== */

export const Drawer = ({ open, onClose }: DrawerProps) => {
  const navigate = useNavigate();
  const { pathname: currentPath } = useLocation();

  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  const isActive = (label: string) => {
    const path = labelToPath(label);
    return path === '/' ? currentPath === '/' : currentPath.startsWith(path);
  };

  return (
    <MuiDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: { sx: DRAWER_PAPER_SX },
      }}
    >
      {/* Header */}
      <Box sx={HEADER_SX}>
        <Logo />
        <IconButton onClick={onClose} aria-label="Close menu" sx={CLOSE_BUTTON_SX}>
          <Close fontSize="small" />
        </IconButton>
      </Box>

      {/* Navigation */}
      <Box sx={NAV_SCROLL_SX}>
        {navLinks.map((link) => {
          const active = isActive(link.label);
          const activeColor = active ? 'var(--orange)' : 'var(--navy)';

          // No sub-items → plain nav button
          if (!link.items || link.items.length === 0) {
            return (
              <AppButton
                key={link.label}
                color="ghost"
                size="medium"
                onClick={() => go(labelToPath(link.label))}
                sx={{ ...PRIMARY_NAV_BUTTON_SX, color: activeColor }}
              >
                {link.label}
              </AppButton>
            );
          }

          // Has sub-items → accordion
          return (
            <Accordion key={link.label} disableGutters elevation={0} sx={ACCORDION_SX}>
              <AccordionSummary expandIcon={EXPAND_ICON} sx={ACCORDION_SUMMARY_SX}>
                <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: activeColor }}>
                  {link.label}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={ACCORDION_DETAILS_SX}>
                {link.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <AppButton
                      key={item.title}
                      color="ghost"
                      size="medium"
                      onClick={() => go(labelToPath(link.label))}
                      sx={SUB_ITEM_BUTTON_SX}
                    >
                      {Icon && (
                        <Box className="dd-icon-box" sx={SUB_ITEM_ICON_SX}>
                          <Icon sx={{ fontSize: 16 }} />
                        </Box>
                      )}
                      {item.title}
                    </AppButton>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>

      {/* Bottom CTAs & Links */}
      <Box sx={FOOTER_SX}>
        <AppButton
          color="primary"
          size="medium"
          fullWidth
          endIcon={<ArrowForward />}
          sx={DRAWER_CTA_OVERRIDE_SX}
        >
          Get a 3PL Quote
        </AppButton>
        <AppButton color="outline" size="medium" fullWidth sx={DRAWER_CTA_OVERRIDE_SX}>
          Book a Call
        </AppButton>

        {/* Client Portals */}
        <Box sx={PORTAL_CONTAINER_SX}>
          <AppButton color="ghost" size="small" startIcon={<Person />} sx={PORTAL_LINK_SX}>
            Client Portal Login
          </AppButton>
          <AppButton color="ghost" size="small" startIcon={<LocalShipping />} sx={PORTAL_LINK_SX}>
            BL Express Tracking
          </AppButton>
        </Box>
      </Box>
    </MuiDrawer>
  );
};
