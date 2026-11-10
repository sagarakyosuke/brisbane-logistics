import { Box, InputBase, Typography, type SxProps, type Theme } from '@mui/material';
import { Email, LocationOn, Phone } from '@mui/icons-material';
import { AppButton } from '@/components/buttons';
import { SectionWrap } from '@/components/sections';
import { footerContact, footerLinks } from '@/utilities/_mock/footer';
import whiteLogo from '@/assets/logo/main-logo-alt-white.png';

/* =====================================================================
 * Constants
 * ===================================================================== */

const C = {
  bg: 'var(--navy-deep)',
  text: '#c9cdeb',
  textMuted: '#9aa1d4',
  white: 'var(--white)',
  accent: 'var(--orange)',
  inputBg: '#161d5e',
  inputBorder: '#39417f',
  divider: '#262e70',
} as const;

const PORTAL_LINKS = [
  { label: 'Client Portal Login', href: '#' },
  { label: 'BL Express Tracking', href: '#' },
] as const;

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Website concept prototype for review', href: '#' },
] as const;

/* =====================================================================
 * Static styles
 * ===================================================================== */

const ROOT_SX: SxProps<Theme> = {
  bgcolor: C.bg,
  color: C.text,
  pt: 8,
  pb: 4,
};

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr 1fr 1.4fr' },
  gap: { xs: 6, md: 4 },
  mb: 6,
};

const BRAND_COLUMN_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  pr: { md: 4 },
};

const LOGO_WRAPPER_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  mb: 3,
};

const LOGO_IMG_SX: SxProps<Theme> = {
  display: 'block',
  height: 80,
  width: 'auto',
  objectFit: 'contain',
};

const BRAND_COPY_SX: SxProps<Theme> = {
  fontSize: '0.9rem',
  lineHeight: 1.6,
  mb: 4,
  maxWidth: '34ch',
  textAlign: 'justify',
  textJustify: 'inter-word',
};

const NEWSLETTER_ROW_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  width: '100%',
  maxWidth: '340px',
};

const NEWSLETTER_INPUT_SX: SxProps<Theme> = {
  flex: 1,
  minWidth: 0,
  bgcolor: C.inputBg,
  color: C.white,
  border: `1px solid ${C.inputBorder}`,
  borderRadius: 999,
  px: 2,
  py: 1,
  fontSize: '0.85rem',
  '& input::placeholder': { color: C.textMuted },
  '&.Mui-focused': { borderColor: C.white },
};

const SUBSCRIBE_OVERRIDE_SX = { px: 3, flexShrink: 0 } as const;

const COLUMN_TITLE_SX: SxProps<Theme> = {
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: C.white,
  mb: 2,
};

const LIST_SX: SxProps<Theme> = {
  listStyle: 'none',
  m: 0,
  p: 0,
  display: 'grid',
  gap: 1,
};

const linkSx = (fontSize = '0.9rem'): SxProps<Theme> => ({
  color: 'inherit',
  textDecoration: 'none',
  fontSize,
  transition: 'color 0.2s',
  '&:hover': { color: C.accent },
});

const CONTACT_GROUP_SX: SxProps<Theme> = { display: 'grid', gap: 1.5 };

const CONTACT_ROW_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
};

const CONTACT_ICON_SX = { fontSize: 18, color: C.accent } as const;
const CONTACT_TEXT_SX: SxProps<Theme> = { fontSize: '0.9rem' };

const PORTAL_GROUP_SX: SxProps<Theme> = { mt: 4, display: 'grid', gap: 1 };

const BOTTOM_BAR_SX: SxProps<Theme> = {
  borderTop: `1px solid ${C.divider}`,
  pt: 3,
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 2,
  fontSize: '0.8rem',
  color: C.textMuted,
};

const LEGAL_ROW_SX: SxProps<Theme> = { display: 'flex', gap: 1 };

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const Logo = () => (
  <Box sx={LOGO_WRAPPER_SX}>
    <Box component="img" src={whiteLogo} alt="Brisbane Logistics" sx={LOGO_IMG_SX} />
  </Box>
);

const LinkColumn = ({ title, links }: (typeof footerLinks)[number]) => (
  <Box>
    <Typography sx={COLUMN_TITLE_SX}>{title}</Typography>
    <Box component="ul" sx={LIST_SX}>
      {links.map((link) => (
        <Box component="li" key={link.label}>
          <Box component="a" href={link.href} sx={linkSx()}>
            {link.label}
          </Box>
        </Box>
      ))}
    </Box>
  </Box>
);

const ContactRow = ({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <Box sx={CONTACT_ROW_SX}>
    <Icon sx={CONTACT_ICON_SX} />
    <Typography sx={CONTACT_TEXT_SX}>{children}</Typography>
  </Box>
);

/* =====================================================================
 * Footer
 * ===================================================================== */

export const Footer = () => (
  <Box component="footer">
    <Box sx={ROOT_SX}>
      <SectionWrap>
        <Box sx={GRID_SX}>
          <Box sx={BRAND_COLUMN_SX}>
            <Logo />

            <Typography sx={BRAND_COPY_SX}>
              Warehousing, fulfilment and distribution support for Australian businesses, from a
              Brisbane team you can talk to directly.
            </Typography>

            <Box sx={NEWSLETTER_ROW_SX}>
              <InputBase placeholder="Your email for logistics info" sx={NEWSLETTER_INPUT_SX} />
              <AppButton color="primary" size="medium" sx={SUBSCRIBE_OVERRIDE_SX}>
                Subscribe
              </AppButton>
            </Box>
          </Box>

          {footerLinks.map((col) => (
            <LinkColumn key={col.title} {...col} />
          ))}

          <Box>
            <Typography sx={COLUMN_TITLE_SX}>Contact</Typography>

            <Box sx={CONTACT_GROUP_SX}>
              <ContactRow icon={Phone}>{footerContact.phone}</ContactRow>
              <ContactRow icon={Email}>{footerContact.email}</ContactRow>
              <ContactRow icon={LocationOn}>{footerContact.location}</ContactRow>
            </Box>

            <Box sx={PORTAL_GROUP_SX}>
              {PORTAL_LINKS.map((link) => (
                <Box key={link.label} component="a" href={link.href} sx={linkSx()}>
                  {link.label}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box sx={BOTTOM_BAR_SX}>
          <Typography sx={{ fontSize: 'inherit' }}>
            © {new Date().getFullYear()} Brisbane Logistics. All rights reserved.
          </Typography>

          <Box sx={LEGAL_ROW_SX}>
            {LEGAL_LINKS.map((link, i) => (
              <Box key={link.label} sx={{ display: 'flex', gap: 1 }}>
                {i > 0 && <span>·</span>}
                <Box component="a" href={link.href} sx={linkSx('0.8rem')}>
                  {link.label}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </SectionWrap>
    </Box>
  </Box>
);
