import { useState, useCallback } from 'react';
import { Box, Typography, IconButton, type SxProps, type Theme } from '@mui/material';
import { Image as ImageIcon, Close, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Section, SectionWrap } from '@/components/sections';
import { Modal } from '@/components/dialogs/modals';
import { palette } from '@/utilities/themes';
import {
  warehouseGalleriesData,
  type GalleryImage,
} from '@/utilities/_mock/about-us/warehouse-team/warehouse-galleries';

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Grid ─────────────────────────────────────────────────────────── */

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
  maxWidth: '1100px', // Slightly wider
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
  height: '75vh', // Fixed height, content won't cause scrollbars
  bgcolor: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const LIGHTBOX_IMG_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'contain', // Keeps the whole image visible
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
  // Gradient fade so text is readable over any image
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

/* =====================================================================
 * Component
 * ===================================================================== */

export const WarehousesGallerySection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const images = warehouseGalleriesData.images;
  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  const handleOpen = (index: number) => setActiveIndex(index);
  const handleClose = () => setActiveIndex(null);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % images.length));
  }, [images.length]);

  return (
    <>
      <Section skipAlternate={false}>
        <SectionWrap>
          <Box sx={GALLERY_GRID_SX}>
            {images.map((img: GalleryImage, index: number) => (
              <Box
                key={img.id}
                component="button"
                type="button"
                onClick={() => handleOpen(index)}
                sx={IMAGE_BUTTON_SX(img.gridArea)}
              >
                <Box
                  className="gallery-img"
                  component="img"
                  src={img.image}
                  alt={img.label}
                  sx={IMAGE_SX}
                />

                <Box sx={LABEL_WRAPPER_SX}>
                  <ImageIcon sx={LABEL_ICON_SX} />
                  {img.label}
                </Box>
              </Box>
            ))}
          </Box>
        </SectionWrap>
      </Section>

      {/* Lightbox Modal */}
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
              <Box
                component="img"
                src={activeImage.image}
                alt={activeImage.label}
                sx={LIGHTBOX_IMG_SX}
              />

              {/* Overlaid Footer */}
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
