import { useEffect, useState } from 'react';
import { Box, Paper, Typography, type SxProps, type Theme } from '@mui/material';
import {
  ArrowForward,
  Email,
  ExpandMore,
  LocalShipping,
  Menu as MenuIcon,
  Person,
  Phone,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router';
import { AppButton } from '@/components/buttons';
import { Drawer } from '@/components/extras/drawer';
import { ProgressBar } from '@/components/extras/progress-bar';
import { Logo } from '@/components/logo';
import { SectionWrap } from '@/components/sections';
import { Reveal } from '@/reusables/animation';

import { QuotationProvider } from '@/reusables/quotation';
import { useQuotationModal } from '@/reusables/quotation/use-quotation';
import { BookACallProvider } from '@/reusables/book-a-call';
import { useBookACallModal } from '@/reusables/book-a-call/use-book-a-call';

import { palette } from '@/utilities/themes';
import { navLinks } from '@/utilities/_mock/navbar';

/* =====================================================================
 * Constants
 * ===================================================================== */

const LABEL_TO_PATH: Record<string, string> = {
  Home: '/',
  Services: '/services',
  'Case Studies': '/case-studies',
  'News & Blogs': '/news',
  FAQs: '/faqs',
  'About Us': '/about',
};

const labelToPath = (label: string): string => LABEL_TO_PATH[label] ?? '/';

//  Reduced the height from 96 to 88 to fit the new 70px logo nicely
const NAVBAR_HEIGHT = 88; 
const SCROLL_THRESHOLD = 10;

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Top bar ──────────────────────────────────────────────────────── */

const TOPBAR_BUTTON_SX: SxProps<Theme> = {
  color: 'inherit',
  textTransform: 'none',
  fontSize: '0.8rem',
  gap: 1,
  p: 0,
  minWidth: 0,
  '&:hover': { color: palette.white, bgcolor: 'transparent' },
};

const TOPBAR_INFO_ROW_SX: SxProps<Theme> = { display: 'flex', gap: 3, alignItems: 'center', whiteSpace: 'nowrap' };
const TOPBAR_INFO_ITEM_SX: SxProps<Theme> = { display: 'flex', gap: 1, alignItems: 'center' };
const TOPBAR_ICON_SX = { fontSize: 15, color: palette.orange } as const;
const TOPBAR_TEXT_SX: SxProps<Theme> = { fontSize: '0.8rem', fontWeight: 500 };
const TOPBAR_UTILITY_ROW_SX: SxProps<Theme> = { display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center', whiteSpace: 'nowrap' };
const TOPBAR_INNER_ROW_SX: SxProps<Theme> = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 };

/* ── Main bar ─────────────────────────────────────────────────────── */

const MAIN_BAR_SX: SxProps<Theme> = {
  bgcolor: 'rgba(255,255,255,0.96)',
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${palette.line}`,
  transition: 'box-shadow 0.3s ease',
};

const NAV_GRID_SX: SxProps<Theme> = {
  display: 'grid',
  //  'max-content' prevents the logo and buttons from shrinking.
  // 'minmax(0, 1fr)' allows the center nav links to take the middle space.
  gridTemplateColumns: { 
    xs: 'max-content 1fr max-content', 
    lg: 'max-content minmax(0, 1fr) max-content' 
  },
  alignItems: 'center',
  height: NAVBAR_HEIGHT,
  width: '100%',
};

/* ── Desktop nav ──────────────────────────────────────────────────── */

const DESKTOP_NAV_SX: SxProps<Theme> = {
  display: { xs: 'none', lg: 'flex' },
  justifyContent: 'center',
  gap: 0,
  height: '100%',
  justifySelf: 'center',
};

const NAV_ITEM_WRAPPER_SX: SxProps<Theme> = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  '&:hover .nav-dropdown': { opacity: 1, visibility: 'visible', transform: 'translateY(0) translateX(-50%)' },
  '&:hover .nav-dropdown-standard': { opacity: 1, visibility: 'visible', transform: 'translateY(0) translateX(0)' },
  '&:hover .nav-expand-icon': { transform: 'rotate(180deg)' },
};

const navLinkSx = (active: boolean): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0.5,
  color: active ? palette.orange : palette.navy,
  fontWeight: 600,
  fontSize: '0.85rem',
  textTransform: 'none',
  height: '100%',
  px: 1.25,
  textDecoration: 'none',
  transition: 'color 0.2s',
  position: 'relative',
  whiteSpace: 'nowrap',
  '&:hover': { color: palette.orange },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '22px',
    left: '10px',
    right: '10px',
    height: '3px',
    bgcolor: palette.orange,
    borderRadius: '3px',
    transform: active ? 'scaleX(1)' : 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.3s ease',
  },
});

const EXPAND_ICON_SX: SxProps<Theme> = { transition: 'transform 0.3s', fontSize: 16 };

/* ── Dropdowns ────────────────────────────────────────────────────── */

const dropdownSx = (isMega: boolean): SxProps<Theme> => ({
  position: 'absolute',
  top: 'calc(100% - 2px)',
  left: '50%',
  opacity: 0,
  visibility: 'hidden',
  transform: isMega ? 'translateY(10px) translateX(-50%)' : 'translateY(10px)',
  width: isMega ? 600 : 300,
  bgcolor: palette.white,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${palette.line}`,
  borderRadius: '16px',
  boxShadow: '0 24px 48px -12px rgba(18,26,87,.18)',
  p: 1,
  display: 'grid',
  gridTemplateColumns: isMega ? '1fr 1fr' : '1fr',
  gap: 0.5,
  transition: 'opacity 0.2s ease, transform 0.2s ease, visibility 0.2s',
  zIndex: 100,
  '&::before': { content: '""', position: 'absolute', top: -12, left: 0, right: 0, height: 12 },
});

const dropdownItemSx = (active: boolean): SxProps<Theme> => ({
  display: 'flex',
  gap: 1.5,
  alignItems: 'flex-start',
  p: 1.5,
  borderRadius: '10px',
  textDecoration: 'none',
  transition: 'all 0.2s',
  bgcolor: active ? palette.peach : 'transparent',
  '&:hover': { bgcolor: palette.peach, '& .dd-icon-box': { bgcolor: palette.orange, color: palette.white } },
  ...(active && { '& .dd-icon-box': { bgcolor: palette.orange, color: palette.white }, '& .dd-title': { color: palette.orange } }),
});

const DROPDOWN_ICON_BOX_SX: SxProps<Theme> = {
  width: 34, height: 34, borderRadius: '8px', bgcolor: palette.white, border: `1px solid ${palette.line}`, color: palette.orange, display: 'grid', placeItems: 'center', flex: 'none', transition: 'all 0.2s',
};

const DROPDOWN_ICON_SX = { fontSize: 18 } as const;
const DROPDOWN_TITLE_SX: SxProps<Theme> = { fontWeight: 700, fontSize: '0.85rem', color: palette.navy, mb: 0.25, whiteSpace: 'nowrap' };
const DROPDOWN_DESC_SX: SxProps<Theme> = { fontSize: '0.75rem', color: palette.muted, lineHeight: 1.3 };

/* ── CTAs & burger ────────────────────────────────────────────────── */

const CTA_ROW_SX: SxProps<Theme> = { display: { xs: 'none', lg: 'flex' }, gap: 1.5, alignItems: 'center', justifySelf: 'end' };
const NAV_CTA_OVERRIDE_SX = { fontSize: '0.8rem', px: 2.5, py: 1 } as const;
const BURGER_WRAPPER_SX: SxProps<Theme> = { display: { xs: 'flex', lg: 'none' }, justifySelf: 'end' };
const BURGER_BUTTON_SX: SxProps<Theme> = { minWidth: 0, p: 1, border: `1px solid ${palette.line}`, borderRadius: 2, color: palette.navy, bgcolor: 'transparent', cursor: 'pointer' };

/* =====================================================================
 * Navbar Content
 * ===================================================================== */

const NavbarContent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname: currentPath } = useLocation();

  const { openQuotation } = useQuotationModal();
  const { openBookACall } = useBookACallModal();

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > SCROLL_THRESHOLD;
      setIsScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkActiveState = (parentPath: string, items?: { path?: string }[]): boolean => {
    const isChildActive = items?.some((item) => item.path === currentPath) ?? false;
    if (isChildActive) return true;
    if (parentPath === '/') return currentPath === '/' || currentPath.startsWith('/home/');
    if (currentPath === parentPath || currentPath.startsWith(`${parentPath}/`)) return true;
    return false;
  };

  return (
    <Box component="header" sx={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 50 }}>
      {/* Top Bar */}
      <Box
        sx={{
          bgcolor: palette.navy,
          color: palette.mist,
          fontSize: '0.8rem',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          maxHeight: isScrolled ? 0 : 60,
          opacity: isScrolled ? 0 : 1,
          py: isScrolled ? 0 : 1,
        }}
      >
        <SectionWrap>
          <Reveal delay={100} distance={-20} blur={0}>
            <Box sx={TOPBAR_INNER_ROW_SX}>
              <Box sx={TOPBAR_INFO_ROW_SX}>
                <Box sx={TOPBAR_INFO_ITEM_SX}>
                  <Email sx={TOPBAR_ICON_SX} />
                  <Typography sx={TOPBAR_TEXT_SX}>sales@brisbanelogistics.com.au</Typography>
                </Box>
                <Box sx={TOPBAR_INFO_ITEM_SX}>
                  <Phone sx={TOPBAR_ICON_SX} />
                  <Typography sx={TOPBAR_TEXT_SX}>07 3348 2100</Typography>
                </Box>
              </Box>

              <Box sx={TOPBAR_UTILITY_ROW_SX}>
                <AppButton color="ghost" size="small" startIcon={<Person sx={{ fontSize: 16 }} />} sx={TOPBAR_BUTTON_SX}>
                  Client Portal Login
                </AppButton>
                <AppButton color="ghost" size="small" startIcon={<LocalShipping sx={{ fontSize: 16 }} />} sx={TOPBAR_BUTTON_SX}>
                  BL Express Tracking
                </AppButton>
              </Box>
            </Box>
          </Reveal>
        </SectionWrap>
      </Box>

      {/* Main Navbar */}
      <Box
        sx={{
          ...MAIN_BAR_SX,
          boxShadow: isScrolled ? '0 10px 30px -18px rgba(18,26,87,.35)' : 'none',
        }}
      >
        <SectionWrap>
          <Box sx={NAV_GRID_SX}>
            <Logo />

            {/* Desktop nav */}
            <Box sx={DESKTOP_NAV_SX}>
              {navLinks.map((link) => {
                const hasDropdown = !!link.items?.length;
                const parentPath = link.path ?? labelToPath(link.label);
                const isActive = getLinkActiveState(parentPath, link.items);

                return (
                  <Box key={link.label} sx={NAV_ITEM_WRAPPER_SX}>
                    <Box
                      component={Link}
                      to={parentPath}
                      aria-haspopup={hasDropdown ? 'menu' : undefined}
                      sx={navLinkSx(isActive)}
                    >
                      <span className="nav-label">{link.label}</span>
                      {hasDropdown && <ExpandMore className="nav-expand-icon" sx={EXPAND_ICON_SX} />}
                    </Box>

                    {hasDropdown && (
                      <Paper
                        elevation={0}
                        role="menu"
                        className={link.isMega ? 'nav-dropdown' : 'nav-dropdown-standard'}
                        sx={dropdownSx(!!link.isMega)}
                      >
                        {link.items!.map((item) => {
                          const Icon = item.icon;
                          const itemPath = item.path ?? parentPath;
                          const isItemActive = currentPath === itemPath;

                          return (
                            <Box
                              key={item.title}
                              component={Link}
                              to={itemPath}
                              role="menuitem"
                              sx={dropdownItemSx(isItemActive)}
                            >
                              {Icon && (
                                <Box className="dd-icon-box" sx={DROPDOWN_ICON_BOX_SX}>
                                  <Icon sx={DROPDOWN_ICON_SX} />
                                </Box>
                              )}
                              <Box>
                                <Typography
                                  className="dd-title"
                                  sx={{ ...DROPDOWN_TITLE_SX, color: isItemActive ? palette.orange : palette.navy }}
                                >
                                  {item.title}
                                </Typography>
                                {item.desc && <Typography sx={DROPDOWN_DESC_SX}>{item.desc}</Typography>}
                              </Box>
                            </Box>
                          );
                        })}
                      </Paper>
                    )}
                  </Box>
                );
              })}
            </Box>

            {/* CTAs */}
            <Box sx={CTA_ROW_SX}>
              <AppButton color="outline" size="medium" sx={NAV_CTA_OVERRIDE_SX} onClick={openBookACall}>
                Book a Call
              </AppButton>
              <AppButton color="primary" size="medium" endIcon={<ArrowForward sx={{ fontSize: 16 }} />} sx={NAV_CTA_OVERRIDE_SX} onClick={openQuotation}>
                Get a 3PL Quote
              </AppButton>
            </Box>

            {/* Mobile burger */}
            <Box sx={BURGER_WRAPPER_SX}>
              <Box component="button" type="button" onClick={() => setIsDrawerOpen(true)} aria-label="Open menu" sx={BURGER_BUTTON_SX}>
                <MenuIcon />
              </Box>
            </Box>
          </Box>
        </SectionWrap>

        <ProgressBar />
      </Box>

      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </Box>
  );
};

/* =====================================================================
 * Navbar Wrapper (Provides Contexts)
 * ===================================================================== */

export const Navbar = () => (
  <QuotationProvider>
    <BookACallProvider>
      <NavbarContent />
    </BookACallProvider>
  </QuotationProvider>
);