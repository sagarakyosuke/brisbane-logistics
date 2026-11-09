import { useState, createElement, type ElementType } from 'react';
import { Box, Typography, IconButton, type SxProps, type Theme } from '@mui/material';
import { ArrowBack, CheckCircle, Close, ZoomIn, AccessTime, Image as ImageIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { AppButton } from '@/components/buttons';
import { Modal } from '@/components/dialogs/modals';
import { palette, shadows } from '@/utilities/themes';
import { useGetTheResultQuery } from '@/pages/case-studies/urgent-delivery/sections/api-hook';

/* =====================================================================
 * Icon Mapping
 * ===================================================================== */

const ICONS: Record<string, ElementType> = {
  access_time: AccessTime,
};

const getIcon = (key: string) => ICONS[key] || ImageIcon;

/* =====================================================================
 * Static styles
 * ===================================================================== */

const GALLERY_GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
  gridTemplateRows: { xs: 'auto', md: '1fr 1fr' },
  gap: { xs: '16px', md: '20px' },
  mb: { xs: 6, md: 10 },
  height: { xs: 'auto', md: '520px' },
};

const GALLERY_BTN_SX = (isMain: boolean): SxProps<Theme> => ({
  position: 'relative',
  padding: 0,
  border: 'none',
  bgcolor: palette.mist,
  cursor: 'zoom-in',
  borderRadius: '20px',
  overflow: 'hidden',
  display: 'block',
  width: '100%',
  height: '100%',
  gridRow: isMain ? '1 / 3' : 'auto',
  '&:hover .zoom-overlay': { opacity: 1 },
  '&:hover .gallery-img': { transform: 'scale(1.05)' },
});

const GALLERY_IMG_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
};

const GALLERY_FALLBACK_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: palette.muted,
  opacity: 0.4,
};

const ZOOM_OVERLAY_SX: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  bgcolor: 'rgba(18,26,87,0.3)',
  opacity: 0,
  transition: 'opacity 0.3s',
  display: 'grid',
  placeItems: 'center',
  pointerEvents: 'none',
  zIndex: 2,
};

const ZOOM_ICON_SX: SxProps<Theme> = {
  color: palette.white,
  fontSize: 48,
  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
};

const LAYOUT_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' },
  gap: { xs: 6, md: 10 },
  alignItems: 'start',
};

const LEFT_COLUMN_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};

const CONTENT_CARD_SX: SxProps<Theme> = {
  bgcolor: palette.white,
  p: { xs: 4, md: 6 },
  borderRadius: '24px',
  boxShadow: shadows.base,
  border: `1px solid ${palette.line}`,
};

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(1.8rem, 3vw, 2.2rem)',
  fontWeight: 800,
  color: palette.navy,
  mb: 3,
  lineHeight: 1.2,
};

const TEXT_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  color: palette.muted,
  lineHeight: 1.8,
  mb: 6,
};

const STEP_LIST_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
};

const STEP_ITEM_SX = (isLast: boolean): SxProps<Theme> => ({
  display: 'flex',
  gap: 3,
  position: 'relative',
  pb: isLast ? 0 : 4,
});

const STEP_LINE_SX: SxProps<Theme> = {
  position: 'absolute',
  left: 19,
  top: 40,
  bottom: 0,
  width: 2,
  bgcolor: palette.peach2,
};

const STEP_NUM_SX: SxProps<Theme> = {
  width: 40,
  height: 40,
  flexShrink: 0,
  borderRadius: '50%',
  bgcolor: palette.navy,
  color: palette.white,
  display: 'grid',
  placeItems: 'center',
  fontWeight: 800,
  fontSize: '1rem',
  position: 'relative',
  zIndex: 2,
  boxShadow: `0 0 0 4px ${palette.white}`,
};

const STEP_TITLE_SX: SxProps<Theme> = {
  fontSize: '1.15rem',
  fontWeight: 700,
  color: palette.navy,
  mb: 1,
};

const STEP_DESC_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: palette.muted,
  lineHeight: 1.6,
};

const RESULT_CARD_SX: SxProps<Theme> = {
  position: { md: 'sticky' },
  top: { md: 120 },
  bgcolor: palette.peach,
  borderRadius: '24px',
  p: { xs: 4, md: 5 },
  borderLeft: `6px solid ${palette.orange}`,
  boxShadow: shadows.sm,
};

const RESULT_ICON_WRAP_SX: SxProps<Theme> = {
  width: 56,
  height: 56,
  borderRadius: '16px',
  bgcolor: palette.white,
  color: palette.orange,
  display: 'grid',
  placeItems: 'center',
  mb: 4,
  boxShadow: shadows.sm,
};

const RESULT_TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2.2rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  color: palette.navy,
  lineHeight: 1.1,
  mb: 2,
};

const RESULT_SUBTITLE_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  color: palette.muted,
  mb: 4,
  pb: 4,
  borderBottom: `1px solid rgba(18,26,87,0.1)`,
};

const RESULT_POINT_ROW_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  alignItems: 'flex-start',
  mb: 2.5,
  '&:last-child': { mb: 0 },
};

const RESULT_POINT_ICON_SX: SxProps<Theme> = {
  color: palette.orange,
  fontSize: 22,
  mt: 0.2,
};

const RESULT_POINT_TEXT_SX: SxProps<Theme> = {
  fontSize: '1rem',
  color: palette.navy,
  fontWeight: 600,
  lineHeight: 1.5,
};

const LIGHTBOX_CONTENT_SX: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: '#000',
  position: 'relative',
  p: 0,
};

const LIGHTBOX_IMG_SX: SxProps<Theme> = {
  maxWidth: '100%',
  maxHeight: '85vh',
  objectFit: 'contain',
  display: 'block',
};

const LIGHTBOX_CLOSE_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 16,
  right: 16,
  bgcolor: 'rgba(255,255,255,0.15)',
  color: palette.white,
  backdropFilter: 'blur(8px)',
  zIndex: 10,
  '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const TheResultSection = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetTheResultQuery();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (isLoading || !data) return null;

  const galleryImages = [
    { src: data.images.main, alt: 'Tile cases loaded', isMain: true },
    { src: data.images.topRight, alt: 'Cases delivered', isMain: false },
    { src: data.images.bottomRight, alt: 'Cases wrapped', isMain: false },
  ];

  return (
    <>
      <Section tone="mist" skipAlternate>
        <SectionWrap>
          <Box sx={GALLERY_GRID_SX}>
            {galleryImages.map((img, idx) => (
              <Box
                key={idx}
                component="button"
                type="button"
                onClick={() => img.src && setActiveImage(img.src)}
                sx={GALLERY_BTN_SX(img.isMain)}
              >
                {img.src ? (
                  <Box component="img" src={img.src} alt={img.alt} className="gallery-img" sx={GALLERY_IMG_SX} />
                ) : (
                  <Box sx={GALLERY_FALLBACK_SX}><ImageIcon sx={{ fontSize: 48 }} /></Box>
                )}
                <Box className="zoom-overlay" sx={ZOOM_OVERLAY_SX}>
                  <ZoomIn sx={ZOOM_ICON_SX} />
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={LAYOUT_SX}>
            <Box sx={LEFT_COLUMN_SX}>
              <Box sx={CONTENT_CARD_SX}>
                <Box>
                  <Typography component="h2" sx={TITLE_SX}>{data.challenge.title}</Typography>
                  <Typography sx={TEXT_SX}>{data.challenge.desc}</Typography>
                </Box>

                <Box>
                  <Typography component="h2" sx={TITLE_SX}>{data.response.title}</Typography>
                  <Box sx={STEP_LIST_SX}>
                    {data.response.steps.map((step, index) => {
                      const isLast = index === data.response.steps.length - 1;
                      return (
                        <Box key={step.step} sx={STEP_ITEM_SX(isLast)}>
                          {!isLast && <Box sx={STEP_LINE_SX} />}
                          <Box sx={STEP_NUM_SX}>{step.step}</Box>
                          <Box sx={{ pt: 0.5 }}>
                            <Typography sx={STEP_TITLE_SX}>{step.title}</Typography>
                            <Typography sx={STEP_DESC_SX}>{step.desc}</Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>

              <Box>
                <AppButton color="outline" size="large" startIcon={<ArrowBack />} onClick={() => navigate('/case-studies')}>
                  Back to case studies
                </AppButton>
              </Box>
            </Box>

            <Box sx={RESULT_CARD_SX}>
              <SectionEyebrow>{data.result.eyebrow}</SectionEyebrow>

              <Box sx={RESULT_ICON_WRAP_SX}>
                {createElement(getIcon(data.result.iconKey), { fontSize: 'large' })}
              </Box>

              <Typography component="h3" sx={RESULT_TITLE_SX}>{data.result.title}</Typography>
              <Typography sx={RESULT_SUBTITLE_SX}>{data.result.subtitle}</Typography>
              <Box>
                {data.result.points.map((point, idx) => (
                  <Box key={idx} sx={RESULT_POINT_ROW_SX}>
                    <CheckCircle sx={RESULT_POINT_ICON_SX} />
                    <Typography sx={RESULT_POINT_TEXT_SX}>{point}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </SectionWrap>
      </Section>

      <Modal
        open={!!activeImage}
        onClose={() => setActiveImage(null)}
        hideHeader
        size="lg"
        paperSx={{ bgcolor: '#000', overflow: 'hidden', borderRadius: '16px', boxShadow: '0 24px 64px -12px rgba(0,0,0,0.8)' }}
      >
        <Box sx={LIGHTBOX_CONTENT_SX}>
          <IconButton onClick={() => setActiveImage(null)} sx={LIGHTBOX_CLOSE_SX}>
            <Close />
          </IconButton>
          {activeImage && <Box component="img" src={activeImage} alt="Enlarged view" sx={LIGHTBOX_IMG_SX} />}
        </Box>
      </Modal>
    </>
  );
};