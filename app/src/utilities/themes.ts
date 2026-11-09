import { createTheme } from '@mui/material/styles';

export const palette = {
  navy: '#121a57',
  navyDeep: '#0b1042',
  navySoft: '#26307a',
  orange: '#f58220',
  orange2: '#fb7636',
  peach: '#fff2e7',
  peach2: '#ffe4cf',
  white: '#ffffff',
  mist: '#f4f6fb',
  line: '#e2e5f0',
  muted: '#5b618a',
  ink: '#121a57',
  logoBlue: '#37598a',
  logoSky: '#6295c0',
  
  red: '#d32f2f',         // Danger / Error
  redDark: '#b71c1c',     // Danger hover / emphasis
  redLight: '#fdecea',    // Danger background tint
  warning: '#ed6c02',     // Warning
  success: '#2e7d32',     // Success
} as const;

export const fontFamily =
  '"Montserrat", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

export const radii = {
  base: 14,
} as const;

export const shadows = {
  base: '0 18px 40px -22px rgba(18,26,87,.35)',
  sm: '0 6px 18px -10px rgba(18,26,87,.25)',
} as const;

export const layout = {
  wrap: 1200,
  header: 76,
  slant: '7%',
} as const;

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: palette.orange,
      contrastText: palette.navy,
    },
    secondary: {
      main: palette.navy,
      contrastText: palette.white,
    },
    error: {
      main: palette.red,
      dark: palette.redDark,
      light: palette.redLight,
      contrastText: palette.white,
    },
    warning: {
      main: palette.warning,
      contrastText: palette.white,
    },
    success: {
      main: palette.success,
      contrastText: palette.white,
    },
    background: {
      default: palette.white,
      paper: palette.white,
    },
    text: {
      primary: palette.ink,
      secondary: palette.muted,
    },
    divider: palette.line,
  },
  typography: {
    fontFamily,
    h1: { fontWeight: 900, letterSpacing: '-0.035em', lineHeight: 1.02 },
    h2: { fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12 },
    h3: { fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.12 },
    h4: { fontWeight: 800, letterSpacing: '-0.01em' },
    body1: { fontSize: 16, lineHeight: 1.6 },
    body2: { fontSize: 14, lineHeight: 1.6 },
    button: { fontWeight: 700, textTransform: 'none', letterSpacing: 0 },
  },
  shape: {
    borderRadius: radii.base,
  },
  shadows: [
    'none',
    shadows.sm,
    shadows.sm,
    shadows.sm,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
    shadows.base,
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--navy': palette.navy,
          '--navy-deep': palette.navyDeep,
          '--navy-soft': palette.navySoft,
          '--orange': palette.orange,
          '--orange-2': palette.orange2,
          '--peach': palette.peach,
          '--peach-2': palette.peach2,
          '--white': palette.white,
          '--mist': palette.mist,
          '--line': palette.line,
          '--muted': palette.muted,
          '--ink': palette.ink,
          '--logo-blue': palette.logoBlue,
          '--logo-sky': palette.logoSky,
          
          '--red': palette.red,
          '--red-dark': palette.redDark,
          '--red-light': palette.redLight,
          '--warning': palette.warning,
          '--success': palette.success,

          '--font': fontFamily,
          '--radius': `${radii.base}px`,
          '--shadow': shadows.base,
          '--shadow-sm': shadows.sm,
          '--wrap': `${layout.wrap}px`,
          '--slant': layout.slant,
          '--hdr': `${layout.header}px`,
          colorScheme: 'light',
        },
        body: {
          margin: 0,
          fontFamily,
          background: palette.white,
          color: palette.ink,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700,
          fontSize: '0.95rem',
          padding: '14px 24px',
          lineHeight: 1,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 22,
          boxShadow: '0 30px 80px -20px rgba(0,0,0,.5)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: palette.white,
        },
      },
    },
  },
});