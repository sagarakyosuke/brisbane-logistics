import { useState, useMemo, type ElementType } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import {
  ArrowForward,
  Image as ImageIcon,
  Groups,
  LocalShipping,
  MenuBook,
} from '@mui/icons-material';
import { Link } from 'react-router';
import { Section, SectionWrap } from '@/components/sections';
import { palette, shadows } from '@/utilities/themes';
import { useGetCompanyUpdatesQuery } from '@/pages/news-and-blogs/company-updates/sections/api-hook';
import type { UpdateItem } from '@/utilities/data/news-and-blogs/company-updates/company-updates';

/* =====================================================================
 * Icon Mapping
 * ===================================================================== */

const ICONS: Record<string, ElementType> = {
  groups: Groups,
  local_shipping: LocalShipping,
  menu_book: MenuBook,
};

const getIcon = (key: string) => ICONS[key] || Groups;

/* =====================================================================
 * Static styles
 * ===================================================================== */

const LIST_WRAPPER_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};

const UPDATE_CARD_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1.2fr)' },
  bgcolor: palette.white,
  borderRadius: '20px',
  overflow: 'hidden',
  border: `1px solid ${palette.line}`,
  textDecoration: 'none',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: shadows.base,
    '& .read-more': { color: palette.orange },
    '& .arrow-icon': { transform: 'translateX(4px)' },
    '& .update-img': { transform: 'scale(1.25)' },
  },
};

const IMAGE_WRAP_SX: SxProps<Theme> = {
  position: 'relative',
  overflow: 'hidden',
  minHeight: { xs: 220, md: '100%' },
  bgcolor: palette.mist,
};

const IMAGE_SX: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.4s ease',
  transform: 'scale(1.15)',
};

const CONTENT_SX: SxProps<Theme> = {
  p: { xs: 3, md: 5 },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const CAT_ROW_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  mb: 1.5,
};

const ICON_BOX_SX: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  width: 32,
  height: 32,
  borderRadius: '8px',
  bgcolor: palette.peach,
  color: palette.orange,
};

const CAT_SX: SxProps<Theme> = {
  fontSize: '0.75rem',
  fontWeight: 800,
  color: palette.orange,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
  fontWeight: 700,
  color: palette.navy,
  mb: 1.5,
  lineHeight: 1.3,
};

const DESC_SX: SxProps<Theme> = {
  fontSize: '1rem',
  color: palette.muted,
  lineHeight: 1.6,
  mb: 3,
};

const READ_MORE_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '0.9rem',
  color: palette.navy,
  transition: 'color 0.2s',
};

const ARROW_SX: SxProps<Theme> = {
  fontSize: 18,
  color: palette.orange,
  transition: 'transform 0.2s',
};

/* ── Fallback Styles ──────────────────────────────────────────────── */

const FALLBACK_WRAP_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${palette.navySoft} 0%, ${palette.navy} 100%)`,
  color: palette.white,
};

const FALLBACK_ICON_SX: SxProps<Theme> = {
  fontSize: 48,
  opacity: 0.7,
  mb: 1,
};

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const SafeImage = ({
  src,
  alt,
  className,
  sx,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  sx?: SxProps<Theme>;
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <Box sx={{ position: 'absolute', inset: 0, ...FALLBACK_WRAP_SX }}>
        <ImageIcon sx={FALLBACK_ICON_SX} />
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.8,
          }}
        >
          No Image
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      component="img"
      className={className}
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      sx={sx}
    />
  );
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const CompanyUpdatesSection = () => {
  const { data } = useGetCompanyUpdatesQuery();

  const updates = useMemo(() => {
    return (data?.updates || []) as unknown as UpdateItem[];
  }, [data?.updates]);

  if (updates.length === 0) return null;

  return (
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={LIST_WRAPPER_SX}>
          {updates.map((update) => {
            const Icon = getIcon((update as unknown as { iconKey: string }).iconKey);

            return (
              <Box key={update.id} component={Link} to={update.linkPath} sx={UPDATE_CARD_SX}>
                {/* Image Column */}
                <Box sx={IMAGE_WRAP_SX}>
                  <SafeImage
                    src={update.image}
                    alt={update.title}
                    className="update-img"
                    sx={IMAGE_SX}
                  />
                </Box>

                {/* Content Column */}
                <Box sx={CONTENT_SX}>
                  <Box sx={CAT_ROW_SX}>
                    <Box sx={ICON_BOX_SX}>
                      <Icon sx={{ fontSize: 18 }} />
                    </Box>
                    <Typography sx={CAT_SX}>Company update · {update.category}</Typography>
                  </Box>

                  <Typography component="h3" sx={TITLE_SX}>
                    {update.title}
                  </Typography>
                  <Typography sx={DESC_SX}>{update.desc}</Typography>

                  <Box className="read-more" sx={READ_MORE_SX}>
                    {update.linkLabel}
                    <ArrowForward className="arrow-icon" sx={ARROW_SX} />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </SectionWrap>
    </Section>
  );
};
