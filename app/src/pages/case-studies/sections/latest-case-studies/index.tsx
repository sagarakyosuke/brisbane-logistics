import { useState, useEffect, useCallback, useMemo, type ElementType } from 'react';
import { Box, Typography, IconButton, type SxProps, type Theme } from '@mui/material';
import { ArrowForward, ChevronLeft, ChevronRight, Close, Image as ImageIcon, Description, LightMode, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { AppButton } from '@/components/buttons';
import { Section, SectionWrap } from '@/components/sections';
import { Modal } from '@/components/dialogs/modals';
import { palette } from '@/utilities/themes';
import { useGetLatestCaseStudiesQuery } from '@/pages/case-studies/sections/api-hook';

// 👇 1. Make sure the map is 100% correct
const ICONS: Record<string, ElementType> = { 
  description: Description, 
  light_mode: LightMode, 
  check_circle: CheckCircle 
};

// 👇 2. Fallback to ImageIcon safely
const getIcon = (key: string | undefined | null) => {
  if (!key) return ImageIcon;
  return ICONS[key] || ImageIcon;
};

const CARD_SX: SxProps<Theme> = { display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1.1fr' }, gap: { xs: 6, lg: 10 }, alignItems: 'center', bgcolor: palette.white, borderRadius: '24px', p: { xs: 3, md: 5, lg: 6 }, boxShadow: '0 24px 64px -12px rgba(18,26,87,0.08)', border: `1px solid ${palette.line}`, mx: 'auto', maxWidth: 1200 };
const IMAGE_GRID_SX: SxProps<Theme> = { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gridTemplateRows: '1fr 1fr', gap: '16px', aspectRatio: '1.2 / 1' };
const IMAGE_BOX_SX = (isMain: boolean): SxProps<Theme> => ({ borderRadius: '16px', overflow: 'hidden', gridRow: isMain ? '1 / 3' : 'auto', bgcolor: palette.mist, cursor: 'pointer', border: 'none', padding: 0, display: 'block', width: '100%', '& img': { width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }, '&:hover img': { transform: 'scale(1.05)' } });
const FALLBACK_BOX_SX: SxProps<Theme> = { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: palette.mist, color: palette.muted, gap: 1.5, p: 2, textAlign: 'center', border: `1px dashed ${palette.line}` };
const CONTENT_COLUMN_SX: SxProps<Theme> = { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' };
const TAG_SX: SxProps<Theme> = { display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: palette.orange, color: palette.white, fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', px: 2, py: 1, borderRadius: '999px', mb: 3 };
const TITLE_SX: SxProps<Theme> = { fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color: palette.navy, lineHeight: 1.1, mb: 2 };
const DESCRIPTION_SX: SxProps<Theme> = { fontSize: '1.05rem', color: palette.muted, lineHeight: 1.6, mb: 4 };
const POINTS_LIST_SX: SxProps<Theme> = { display: 'flex', flexDirection: 'column', gap: 3, mb: 5, width: '100%' };
const POINT_ROW_SX: SxProps<Theme> = { display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 2, alignItems: 'flex-start' };
const POINT_ICON_BOX_SX: SxProps<Theme> = { display: 'grid', placeItems: 'center', width: 40, height: 40, borderRadius: '10px', bgcolor: palette.peach, color: palette.orange, flexShrink: 0 };
const POINT_LABEL_SX: SxProps<Theme> = { fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: palette.orange, mb: 0.5 };
const POINT_DESC_SX: SxProps<Theme> = { fontSize: '1rem', color: palette.muted, lineHeight: 1.5 };
const LIGHTBOX_WRAPPER_SX: SxProps<Theme> = { position: 'relative', width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: '#000', borderRadius: '16px', overflow: 'hidden' };
const LIGHTBOX_IMAGE_SX = (isActive: boolean): SxProps<Theme> => ({ position: 'absolute', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', opacity: isActive ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: isActive ? 'auto' : 'none' });
const NAV_BUTTON_SX: SxProps<Theme> = { position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: 56, height: 56, bgcolor: 'rgba(255,255,255,0.1)', color: 'white', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', zIndex: 10, '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } };
const CLOSE_BUTTON_SX: SxProps<Theme> = { position: 'absolute', top: 24, right: 24, width: 48, height: 48, bgcolor: 'rgba(255,255,255,0.1)', color: 'white', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', zIndex: 10, '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' } };
const COUNTER_SX: SxProps<Theme> = { position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', bgcolor: 'rgba(0,0,0,0.6)', color: 'white', backdropFilter: 'blur(8px)', px: 2, py: 0.5, borderRadius: '999px', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em', zIndex: 10 };

const SafeImage = ({ src, alt, sx }: { src?: string | null; alt: string; sx?: SxProps<Theme>; }) => {
  const [hasError, setHasError] = useState(false);
  if (!src || hasError) return (<Box sx={FALLBACK_BOX_SX}><ImageIcon sx={{ fontSize: 32, opacity: 0.4 }} /><Typography sx={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.6 }}>Image not available</Typography></Box>);
  return <Box component="img" src={src} alt={alt} sx={sx} onError={() => setHasError(true)} />;
};

export const CaseStudySection = () => {
  const { data } = useGetLatestCaseStudiesQuery();
  const study = data?.latest;
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const images = useMemo(() => study ? [
    { src: study.images?.main, alt: 'Tile cases loaded and ready to leave' },
    { src: study.images?.topRight, alt: 'Cases delivered to the project site' },
    { src: study.images?.bottomRight, alt: 'Cases wrapped and strapped in the van' },
  ] : [], [study]);

  const isOpen = activeIndex !== null;
  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const handlePrev = useCallback(() => setActiveIndex((prev) => (prev === null ? null : (prev - 1 + images.length) % images.length)), [images.length]);
  const handleNext = useCallback(() => setActiveIndex((prev) => (prev === null ? null : (prev + 1) % images.length)), [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLightbox, handlePrev, handleNext]);

  if (!study) return null;

  return (
    <>
      <Section>
        <SectionWrap>
          <Box sx={CARD_SX}>
            <Box sx={IMAGE_GRID_SX}>
              {images.map((img, idx) => (
                <Box key={idx} component="button" type="button" onClick={() => setActiveIndex(idx)} sx={IMAGE_BOX_SX(idx === 0)}>
                  <SafeImage src={img.src} alt={img.alt} />
                </Box>
              ))}
            </Box>

            <Box sx={CONTENT_COLUMN_SX}>
              <Box sx={TAG_SX}><span>✦</span> {study.tag}</Box>
              <Typography component="h2" sx={TITLE_SX}>{study.title}</Typography>
              <Typography sx={DESCRIPTION_SX}>{study.description}</Typography>

              <Box sx={POINTS_LIST_SX}>
                {study.points.map((point) => {
                  // 👇 3. Use a variable for the component (React Compiler allows this if it's safe)
                  const Icon = getIcon(point.iconKey);
                  return (
                    <Box key={point.id} sx={POINT_ROW_SX}>
                      <Box sx={POINT_ICON_BOX_SX}>
                        {/* 👇 4. Render safely as JSX */}
                        <Icon fontSize="small" />
                      </Box>
                      <Box>
                        <Typography sx={POINT_LABEL_SX}>{point.label}</Typography>
                        <Typography sx={POINT_DESC_SX}>{point.desc}</Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <AppButton color="primary" size="large" endIcon={<ArrowForward />} onClick={() => navigate(study.path)}>
                Read delivery case study
              </AppButton>
            </Box>
          </Box>
        </SectionWrap>
      </Section>

      <Modal open={isOpen} onClose={closeLightbox} hideHeader size="xl" paperSx={{ bgcolor: '#000', overflow: 'hidden', borderRadius: '16px' }}>
        <Box sx={LIGHTBOX_WRAPPER_SX}>
          <IconButton onClick={closeLightbox} aria-label="Close" sx={CLOSE_BUTTON_SX}><Close /></IconButton>
          <IconButton onClick={handlePrev} aria-label="Previous image" sx={{ ...NAV_BUTTON_SX, left: 24 }}><ChevronLeft fontSize="large" /></IconButton>
          {images.map((img, idx) => (
            <Box key={idx} sx={LIGHTBOX_IMAGE_SX(idx === activeIndex)}>
              <SafeImage src={img.src} alt={img.alt} sx={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </Box>
          ))}
          <IconButton onClick={handleNext} aria-label="Next image" sx={{ ...NAV_BUTTON_SX, right: 24 }}><ChevronRight fontSize="large" /></IconButton>
          <Box sx={COUNTER_SX}>{activeIndex !== null ? `${activeIndex + 1} / ${images.length}` : ''}</Box>
        </Box>
      </Modal>
    </>
  );
};