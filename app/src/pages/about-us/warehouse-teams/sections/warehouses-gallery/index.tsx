import { useState, useCallback } from 'react';
import { Box, Typography, IconButton, type SxProps, type Theme } from '@mui/material';
import { Image as ImageIcon, Close, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Section, SectionWrap } from '@/components/sections';
import { Modal } from '@/components/dialogs/modals';
import { palette } from '@/utilities/themes';
import { useGetWarehouseGalleriesQuery } from '@/pages/about-us/warehouse-teams/sections/api-hook';
import type { GalleryImage } from '@/utilities/data/about-us/warehouse-team/warehouse-galleries';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const GALLERY_GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
  gridTemplateAreas: {
    xs: `
      "exterior"
      "open-space"
      "loading-access"
      "loading-dock"
      "interior"
    `,
    md: `
      "exterior open-space"
      "exterior loading-access"
      "loading-dock interior"
    `,
  },
  gap: 2,
};

const IMAGE_BUTTON_SX = (gridArea: string): SxProps<Theme> => ({
  gridArea,
  position: 'relative',
  border: 'none',
  padding: 0,
  bgcolor: 'transparent',
  cursor: 'zoom-in',
  borderRadius: '24px',
  overflow: 'hidden',
  display: 'block',
  width: '100%',
  height: { xs: 300, md: '100%' },
  minHeight: { md: 280 },
  '&:hover .gallery-img': {
    transform: 'scale(1.05)',
  },
});

const IMAGE_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
};

const LABEL_WRAPPER_SX: SxProps<Theme> = {
  position: 'absolute',
  bottom: 16,
  left: 16,
  bgcolor: palette.white,
  color: palette.navy,
  px: 2,
  py: 1,
  borderRadius: '999px',
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '0.85rem',
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  zIndex: 2,
};

const LABEL_ICON_SX: SxProps<Theme> = {
  fontSize: 16,
  color: palette.orange,
};

/* ── Lightbox Styles ──────────────────────────────────────────────── */

const MODAL_PAPER_SX: SxProps<Theme> = {
  bgcolor: palette.navyDeep,
  borderRadius: '24px',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  maxWidth: '1100px',
  boxShadow: '0 24px 64px -12px rgba(0,0,0,0.6)',
};

const CLOSE_BTN_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 20,
  right: 20,
  bgcolor: palette.white,
  color: palette.navy,
  width: 44,
  height: 44,
  zIndex: 10,
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  '&:hover': { bgcolor: palette.mist },
};

const IMAGE_WRAPPER_SX: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  height: '75vh',
  bgcolor: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const LIGHTBOX_IMG_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  display: 'block',
};

const FOOTER_OVERLAY_SX: SxProps<Theme> = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  px: { xs: 3, md: 4 },
  py: 3,
  background: 'linear-gradient(0deg, rgba(11,16,66,0.95) 0%, rgba(11,16,66,0) 100%)',
  zIndex: 5,
};

const CAPTION_SX: SxProps<Theme> = {
  fontSize: '1rem',
  fontWeight: 700,
  color: palette.white,
  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
};

const NAV_GROUP_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 1.5,
};

const NAV_BTN_SX: SxProps<Theme> = {
  bgcolor: 'rgba(255,255,255,0.15)',
  color: palette.white,
  backdropFilter: 'blur(8px)',
  width: 44,
  height: 44,
  '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
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

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const SafeImage = ({ src, alt, sx }: { src?: string | null; alt: string; sx?: SxProps<Theme> }) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <Box sx={{ position: 'absolute', inset: 0, ...FALLBACK_WRAP_SX }}>
        <ImageIcon sx={{ fontSize: 48, opacity: 0.5, mb: 1 }} />
      </Box>
    );
  }

  return <Box component="img" src={src} alt={alt} onError={() => setHasError(true)} sx={sx} />;
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const WarehousesGallerySection = () => {
  const { data } = useGetWarehouseGalleriesQuery();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const images = (data?.images || []) as unknown as GalleryImage[];
  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  const handleOpen = (index: number) => setActiveIndex(index);
  const handleClose = () => setActiveIndex(null);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <>
      <Section skipAlternate={false}>
        <SectionWrap>
          <Box sx={GALLERY_GRID_SX}>
            {images.map((img, index) => (
              <Box
                key={img.id}
                component="button"
                type="button"
                onClick={() => handleOpen(index)}
                sx={IMAGE_BUTTON_SX(img.gridArea)}
              >
                <Box
                  className="gallery-img"
                  sx={{ width: '100%', height: '100%', position: 'relative' }}
                >
                  <SafeImage src={img.image} alt={img.label} sx={IMAGE_SX} />
                </Box>

                <Box sx={LABEL_WRAPPER_SX}>
                  <ImageIcon sx={LABEL_ICON_SX} />
                  {img.label}
                </Box>
              </Box>
            ))}
          </Box>
        </SectionWrap>
      </Section>

      <Modal
        open={activeIndex !== null}
        onClose={handleClose}
        hideHeader
        size="xl"
        paperSx={MODAL_PAPER_SX}
      >
        {activeImage && activeIndex !== null && (
          <>
            <IconButton onClick={handleClose} sx={CLOSE_BTN_SX}>
              <Close />
            </IconButton>

            <Box sx={IMAGE_WRAPPER_SX}>
              <SafeImage src={activeImage.image} alt={activeImage.label} sx={LIGHTBOX_IMG_SX} />

              <Box sx={FOOTER_OVERLAY_SX}>
                <Typography sx={CAPTION_SX}>
                  {activeImage.label} · {activeIndex + 1} of {images.length}
                </Typography>

                <Box sx={NAV_GROUP_SX}>
                  <IconButton onClick={handlePrev} sx={NAV_BTN_SX}>
                    <ChevronLeft />
                  </IconButton>
                  <IconButton onClick={handleNext} sx={NAV_BTN_SX}>
                    <ChevronRight />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Modal>
    </>
  );
};
