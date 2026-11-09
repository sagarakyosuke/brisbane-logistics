import { useState, type ElementType } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward, Inventory, Warehouse, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router';
import { Section, SectionHeader, SectionWrap } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { useGetPreviousCaseStudiesQuery } from '@/pages/case-studies/sections/api-hook';

/* =====================================================================
 * Icon Mapping
 * ===================================================================== */
const ICONS: Record<string, ElementType> = { inventory: Inventory, warehouse: Warehouse, shopping_cart: ShoppingCart };

/* =====================================================================
 * Styles
 * ===================================================================== */
const GRID_SX: SxProps<Theme> = { display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, mb: 6 };
const CARD_SX: SxProps<Theme> = { display: 'flex', flexDirection: 'column', bgcolor: palette.white, border: `1px solid ${palette.line}`, borderRadius: '16px', overflow: 'hidden', textDecoration: 'none', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-6px)', boxShadow: 'var(--shadow)', borderColor: 'transparent' } };
const BANNER_CONTAINER_SX: SxProps<Theme> = { height: 180, bgcolor: palette.navy, display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden' };
const ICON_BANNER_SX: SxProps<Theme> = { ...BANNER_CONTAINER_SX, '&::before': { content: '""', position: 'absolute', inset: 0, opacity: 0.15, background: `repeating-linear-gradient(45deg, transparent, transparent 20px, ${palette.white} 20px, ${palette.white} 40px)` } };
const BANNER_ICON_SX: SxProps<Theme> = { fontSize: 48, color: palette.orange, position: 'relative', zIndex: 1 };
const BANNER_IMAGE_SX: SxProps<Theme> = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };
const CONTENT_SX: SxProps<Theme> = { p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 };
const CATEGORY_SX: SxProps<Theme> = { fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: palette.orange, mb: 1 };
const TITLE_SX: SxProps<Theme> = { fontSize: '1.15rem', fontWeight: 800, color: palette.navy, mb: 1 };
const DESC_SX: SxProps<Theme> = { fontSize: '0.95rem', color: palette.muted, lineHeight: 1.5, mb: 3, flexGrow: 1 };
const STATUS_BADGE_SX: SxProps<Theme> = { display: 'inline-flex', alignSelf: 'flex-start', px: 1.5, py: 0.5, borderRadius: '999px', border: `1px dashed ${palette.orange}`, color: palette.orange, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' };
const ARROW_LINK_SX: SxProps<Theme> = { display: 'inline-flex', alignItems: 'center', gap: 1, fontWeight: 700, fontSize: '1rem', color: palette.navy, textDecoration: 'none', borderBottom: `2px solid ${palette.orange}`, pb: 0.5, transition: 'opacity 0.2s', '&:hover': { opacity: 0.7 }, '&:hover .arrow': { transform: 'translateX(4px)' } };
const ARROW_ICON_SX: SxProps<Theme> = { fontSize: 20, color: palette.orange, transition: 'transform 0.25s ease' };

const CaseStudyBanner = ({ image, icon: Icon, alt }: { image: string | null; icon: ElementType; alt: string }) => {
  const [hasError, setHasError] = useState(false);
  if (!image || hasError) return (<Box sx={ICON_BANNER_SX}><Icon sx={BANNER_ICON_SX} /></Box>);
  return (<Box sx={BANNER_CONTAINER_SX}><Box component="img" src={image} alt={alt} onError={() => setHasError(true)} sx={BANNER_IMAGE_SX} /></Box>);
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const PreviousCaseStudiesSection = () => {
  const { data, isLoading } = useGetPreviousCaseStudiesQuery();
  const previousStudies = data?.previous || [];

  if (isLoading || previousStudies.length === 0) return null;

  return (
    <Section>
      <SectionWrap>
        <SectionHeader eyebrow="Previous Case Studies" title="More ways we've helped clients." lead="Earlier client stories move here each time a new case study is published." />
        
        <Box sx={GRID_SX}>
          {previousStudies.map((study) => {
            const isClickable = study.path !== '#';
            const CardWrapper = isClickable ? Link : 'div';
            const linkProps = isClickable ? { to: study.path } : {};
            const Icon = ICONS[study.iconKey] || Inventory;

            return (
              <Box key={study.id} component={CardWrapper} {...linkProps} sx={{ ...CARD_SX, cursor: isClickable ? 'pointer' : 'default' }}>
                <CaseStudyBanner image={study.image} icon={Icon} alt={study.title} />
                <Box sx={CONTENT_SX}>
                  <Typography sx={CATEGORY_SX}>{study.category}</Typography>
                  <Typography sx={TITLE_SX}>{study.title}</Typography>
                  <Typography sx={DESC_SX}>{study.description}</Typography>
                  <Box sx={STATUS_BADGE_SX}>{study.status}</Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
          <Box component={Link} to="/case-studies/testimonials" sx={ARROW_LINK_SX}>
            What our clients appreciate
            <ArrowForward className="arrow" sx={ARROW_ICON_SX} />
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};