import { Box } from '@mui/material';
import { NavLink } from 'react-router';
import { palette } from '@/utilities/themes';

/* =====================================================================
 * Constants
 * ===================================================================== */

const TABS = [
  { label: 'Blogs', path: '/news-and-blogs' },
  { label: 'Company Updates', path: '/news-and-blogs/company' },
  { label: 'Guides & Tips', path: '/news-and-blogs/guides' },
];

/* =====================================================================
 * Static styles
 * ===================================================================== */

const WRAPPER_SX = {
  bgcolor: palette.white,
  borderBottom: `1px solid ${palette.line}`,
  position: 'sticky',
  top: 'var(--hdr)',
  zIndex: 30,
} as const;

const INNER_SX = {
  display: 'flex',
  gap: 1,
  overflowX: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
} as const;

/* =====================================================================
 * Component
 * ===================================================================== */

export const NewsBlogsTabs = () => {
  return (
    <Box sx={WRAPPER_SX}>
      <Box sx={{ maxWidth: 'var(--wrap)', mx: 'auto', px: '20px' }}>
        <Box sx={INNER_SX}>
          {TABS.map((tab) => (
            <NavLink
              key={tab.label}
              to={tab.path}
              end={tab.path === '/news-and-blogs'}
              style={({ isActive }) => ({
                padding: '16px 24px',
                fontWeight: 600,
                fontSize: '0.95rem',
                color: isActive ? palette.navy : palette.muted,
                borderBottom: `3px solid ${isActive ? palette.orange : 'transparent'}`,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                display: 'block',
              })}
            >
              {tab.label}
            </NavLink>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
