import { useState } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { AppButton } from '@/components/buttons';
import { Modal } from '@/components/dialogs/modals';
import { Section, SectionEyebrow, SectionWrap } from '@/components/sections';
import { HeroBays, HeroContentBlock } from '@/pages/home/sections/hero';
import { AudienceSection } from '@/pages/home/sections/who-we-work-with';
import { CaseStudySection } from '@/pages/home/sections/featured-case-study';
import { PartnersSection } from '@/pages/home/sections/connected';
import { HelpfulSection } from '@/pages/home/sections/get-to-know';
import { ServicesSection } from '@/pages/home/sections/our-services';
import { Carousel } from '@/reusables/carousel';
import { CtaBand } from '@/reusables/cta';
import { heroBays, heroContent, heroSlides } from '@/utilities/_mock/home/hero';
import {
  featuredCaseStudy,
  serviceMarquee,
  trustItems,
  type CaseStudyImage,
} from '@/utilities/_mock/home/home';

/* =====================================================================
 * Constants
 * ===================================================================== */

const SERVICE_MARQUEE_DURATION = '34s';

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Hero shell ───────────────────────────────────────────────────── */

const HERO_SECTION_SX: SxProps<Theme> = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  minHeight: { xs: '100svh', md: 'clamp(600px, 85vh, 900px)' }, // YOUR EXACT VALUE
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  bgcolor: 'var(--navy-deep)',
  color: 'var(--white)',
};

const HERO_DOTS_ROW_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 24,
  mt: 5,
  mr: 2,
  right: { xs: '20px', md: 'max(20px, env(safe-area-inset-right, 0px))' },
  zIndex: 5,
  display: 'flex',
  gap: 1,
};

const heroDotSx = (isActive: boolean): SxProps<Theme> => ({
  width: isActive ? 28 : 10,
  height: 10,
  p: 0,
  border: 'none',
  borderRadius: 999,
  cursor: 'pointer',
  background: isActive ? 'var(--orange)' : 'rgba(255,255,255,0.45)',
  transition: 'all 0.3s',
});

const HERO_OVERLAY_SX: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  zIndex: 2,
  pointerEvents: 'none',
  background:
    'linear-gradient(90deg, rgba(11,16,66,.94) 0%, rgba(11,16,66,.78) 38%, rgba(11,16,66,.25) 70%, rgba(11,16,66,.15)), linear-gradient(0deg, rgba(11,16,66,.9), transparent 45%)',
};

const HERO_CONTENT_STACK_SX: SxProps<Theme> = {
  position: 'relative',
  zIndex: 3,
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: 6, md: 10 },
  pt: { xs: '80px', md: '96px' },
  pb: { xs: '40px', md: '56px' },
  minHeight: 'inherit',
};

const HERO_TRANSPARENT_SECTION_SX: SxProps<Theme> = {
  bgcolor: 'transparent',
  paddingBlock: 0,
};

const HERO_BAYS_SECTION_SX: SxProps<Theme> = {
  ...HERO_TRANSPARENT_SECTION_SX,
  width: '100%',
  mt: 'auto',
};

/* ── Trust strip ──────────────────────────────────────────────────── */

const TRUST_STRIP_SX: SxProps<Theme> = {
  borderBottom: '1px solid var(--line)',
  paddingBlock: '0px !important',
};

const TRUST_GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
};

const trustItemSx = (isFirst: boolean): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  py: { xs: 2, md: 2.5 },
  pl: { xs: 0, md: isFirst ? 0 : 3 },
  pr: { xs: 0, md: 3 },
  borderTop: { xs: isFirst ? 'none' : '1px solid var(--line)', md: 'none' },
  borderLeft: { xs: 'none', md: isFirst ? 'none' : '1px solid var(--line)' },
});

const TRUST_ICON_BOX_SX: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  flex: 'none',
  width: 48,
  height: 48,
  borderRadius: '12px',
  bgcolor: 'var(--peach)',
  color: 'var(--orange)',
};

const TRUST_ICON_SX = { fontSize: 24 } as const;

const TRUST_TITLE_SX: SxProps<Theme> = {
  mb: 0.25,
  fontWeight: 700,
  fontSize: '0.95rem',
  lineHeight: 1.3,
  color: 'var(--navy)',
};

const TRUST_SUBTITLE_SX: SxProps<Theme> = {
  fontSize: '0.85rem',
  lineHeight: 1.4,
  color: 'var(--muted)',
};

/* ── Service marquee ──────────────────────────────────────────────── */

const SERVICE_MARQUEE_SECTION_SX: SxProps<Theme> = {
  paddingBlock: '0px !important',
};

const MARQUEE_KEYFRAMES = {
  '@keyframes marquee': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  },
};

const marqueeTrackSx = (duration: string): SxProps<Theme> => ({
  display: 'flex',
  width: 'max-content',
  alignItems: 'center',
  animation: `marquee ${duration} linear infinite`,
  '&:hover': { animationPlayState: 'paused' },
  ...MARQUEE_KEYFRAMES,
});

const MARQUEE_VIEWPORT_SX: SxProps<Theme> = {
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  mx: '-20px',
  py: 1.5,
};

const MARQUEE_ITEM_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
};

const MARQUEE_TEXT_SX: SxProps<Theme> = {
  whiteSpace: 'nowrap',
  fontWeight: 700,
  fontSize: '1.05rem',
  color: 'var(--white)',
  lineHeight: 1,
};

const MARQUEE_SEPARATOR_SX: SxProps<Theme> = {
  width: 9,
  height: 9,
  bgcolor: 'var(--orange)',
  transform: 'skewX(-14deg)',
  mx: 4,
  flexShrink: 0,
};

/* ── Lightbox ─────────────────────────────────────────────────────── */

const LIGHTBOX_PAPER_SX = { maxWidth: 'min(1100px, calc(100vw - 32px))' } as const;

const LIGHTBOX_GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' },
  gap: { xs: 3, md: 4 },
  alignItems: 'stretch',
};

const LIGHTBOX_LEFT_COLUMN_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const LIGHTBOX_IMAGE_CONTAINER_SX: SxProps<Theme> = {
  position: 'relative',
  bgcolor: 'var(--mist)',
  borderRadius: '12px',
  overflow: 'hidden',
  display: 'grid',
  placeItems: 'center',
  minHeight: { xs: 240, md: 460 },
};

const LIGHTBOX_IMAGE_SX: SxProps<Theme> = {
  display: 'block',
  width: '100%',
  maxHeight: '70vh',
  objectFit: 'contain',
};

const LIGHTBOX_CAPTION_SX: SxProps<Theme> = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  p: 1.5,
  color: 'var(--white)',
  fontSize: '0.8rem',
  fontWeight: 600,
  background: 'linear-gradient(0deg, rgba(11,16,66,.85), transparent)',
};

const LIGHTBOX_COUNTER_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 12,
  right: 12,
  px: 1.25,
  py: 0.5,
  borderRadius: 999,
  bgcolor: 'rgba(11,16,66,.75)',
  color: 'var(--white)',
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
};

const lightboxThumbsSx = (total: number): SxProps<Theme> => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))`,
  gap: 1.5,
});

const thumbButtonSx = (isActive: boolean): SxProps<Theme> => ({
  p: 0,
  border: '2px solid',
  borderColor: isActive ? 'var(--orange)' : 'transparent',
  borderRadius: '10px',
  overflow: 'hidden',
  cursor: 'pointer',
  bgcolor: 'var(--mist)',
  transition: 'border-color 0.2s, opacity 0.2s',
  opacity: isActive ? 1 : 0.7,
  '&:hover': { opacity: 1 },
});

const LIGHTBOX_THUMB_IMG_SX: SxProps<Theme> = {
  display: 'block',
  width: '100%',
  height: 64,
  objectFit: 'cover',
};

const LIGHTBOX_RIGHT_COLUMN_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
  py: { xs: 0, md: 1 },
};

const LIGHTBOX_TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(1.4rem, 2.4vw, 1.9rem)',
  fontWeight: 800,
  color: 'var(--navy)',
  lineHeight: 1.2,
  letterSpacing: '-0.01em',
};

const LIGHTBOX_LEAD_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: 'var(--muted)',
  lineHeight: 1.6,
};

const LIGHTBOX_FACTS_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  width: '100%',
  bgcolor: 'var(--mist)',
  borderRadius: '14px',
  border: '1px solid var(--line)',
  overflow: 'hidden',
};

const lightboxFactCellSx = (isFirst: boolean): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
  p: 2,
  borderLeft: isFirst ? 'none' : '1px solid var(--line)',
});

const LIGHTBOX_FACT_LABEL_SX: SxProps<Theme> = {
  color: 'var(--muted)',
  fontSize: '0.7rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const LIGHTBOX_FACT_VALUE_SX: SxProps<Theme> = {
  fontSize: '1rem',
  fontWeight: 800,
  color: 'var(--navy)',
};

const LIGHTBOX_NAV_ROW_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 1.5,
  mt: 'auto',
  pt: 1,
};

/* =====================================================================
 * Sub-components
 * ===================================================================== */

/* ── Hero ─────────────────────────────────────────────────────────── */

const HeroSection = () => (
  <Box component="section" sx={HERO_SECTION_SX}>
    <Carousel slides={heroSlides}>
      {(current, setCurrent) => (
        <Box sx={HERO_DOTS_ROW_SX}>
          {heroSlides.map((_, index) => {
            const isActive = index === current;
            return (
              <Box
                key={index}
                component="button"
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive}
                sx={heroDotSx(isActive)}
              />
            );
          })}
        </Box>
      )}
    </Carousel>

    <Box sx={HERO_OVERLAY_SX} />

    <SectionWrap>
      <Box sx={HERO_CONTENT_STACK_SX}>
        <Section reveal delay={300} skipAlternate sx={HERO_TRANSPARENT_SECTION_SX}>
          <HeroContentBlock content={heroContent} />
        </Section>

        <Section reveal delay={600} skipAlternate sx={HERO_BAYS_SECTION_SX}>
          <HeroBays bays={heroBays} />
        </Section>
      </Box>
    </SectionWrap>
  </Box>
);

/* ── Trust strip ──────────────────────────────────────────────────── */

const TrustStrip = () => (
  <Section tone="default" tight delay={100} sx={TRUST_STRIP_SX}>
    <SectionWrap>
      <Box sx={TRUST_GRID_SX}>
        {trustItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Box key={item.id} sx={trustItemSx(index === 0)}>
              <Box sx={TRUST_ICON_BOX_SX}>
                <Icon sx={TRUST_ICON_SX} />
              </Box>
              <Box>
                <Typography sx={TRUST_TITLE_SX}>{item.title}</Typography>
                <Typography sx={TRUST_SUBTITLE_SX}>{item.subtitle}</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </SectionWrap>
  </Section>
);

/* ── Service marquee ──────────────────────────────────────────────── */

const ServiceMarquee = () => (
  <Section tone="navy" tight delay={100} skipAlternate sx={SERVICE_MARQUEE_SECTION_SX}>
    <SectionWrap>
      <Box sx={MARQUEE_VIEWPORT_SX}>
        <Box sx={marqueeTrackSx(SERVICE_MARQUEE_DURATION)}>
          {/* List is duplicated for a seamless loop (translateX(-50%) wraps at the seam). */}
          {[...serviceMarquee, ...serviceMarquee].map((item, index) => (
            <Box key={`${item}-${index}`} sx={MARQUEE_ITEM_SX}>
              <Typography sx={MARQUEE_TEXT_SX}>{item}</Typography>
              <Box component="span" sx={MARQUEE_SEPARATOR_SX} />
            </Box>
          ))}
        </Box>
      </Box>
    </SectionWrap>
  </Section>
);

/* ── Lightbox ─────────────────────────────────────────────────────── */

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  images: CaseStudyImage[];
  index: number;
  onIndexChange: (index: number) => void;
}

const Lightbox = ({ open, onClose, images, index, onIndexChange }: LightboxProps) => {
  const image = images[index];
  const total = images.length;
  const hasPrev = index > 0;
  const hasNext = index < total - 1;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={featuredCaseStudy.title}
      size="xl"
      paperSx={LIGHTBOX_PAPER_SX}
    >
      <Box sx={LIGHTBOX_GRID_SX}>
        {/* Left — image + thumbs */}
        <Box sx={LIGHTBOX_LEFT_COLUMN_SX}>
          <Box sx={LIGHTBOX_IMAGE_CONTAINER_SX}>
            {image && (
              <Box component="img" src={image.src} alt={image.alt} sx={LIGHTBOX_IMAGE_SX} />
            )}
            {image && <Box sx={LIGHTBOX_CAPTION_SX}>{image.alt}</Box>}
            <Box sx={LIGHTBOX_COUNTER_SX}>
              {index + 1} / {total}
            </Box>
          </Box>

          <Box sx={lightboxThumbsSx(total)}>
            {images.map((img, i) => {
              const isActive = i === index;
              return (
                <Box
                  key={img.src}
                  component="button"
                  type="button"
                  onClick={() => onIndexChange(i)}
                  aria-label={`View image ${i + 1}: ${img.alt}`}
                  aria-current={isActive}
                  sx={thumbButtonSx(isActive)}
                >
                  <Box component="img" src={img.src} alt="" sx={LIGHTBOX_THUMB_IMG_SX} />
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Right — details */}
        <Box sx={LIGHTBOX_RIGHT_COLUMN_SX}>
          <Box>
            <SectionEyebrow>{featuredCaseStudy.eyebrow}</SectionEyebrow>
          </Box>

          <Typography component="h3" sx={LIGHTBOX_TITLE_SX}>
            {featuredCaseStudy.title}
          </Typography>

          <Typography sx={LIGHTBOX_LEAD_SX}>{featuredCaseStudy.lead}</Typography>

          <Box sx={LIGHTBOX_FACTS_SX}>
            {featuredCaseStudy.facts.map((fact, i) => (
              <Box key={fact.label} sx={lightboxFactCellSx(i === 0)}>
                <Typography sx={LIGHTBOX_FACT_LABEL_SX}>{fact.label}</Typography>
                <Typography sx={LIGHTBOX_FACT_VALUE_SX}>{fact.value}</Typography>
              </Box>
            ))}
          </Box>

          <Box sx={LIGHTBOX_NAV_ROW_SX}>
            <AppButton
              color="outline"
              size="small"
              disabled={!hasPrev}
              onClick={() => onIndexChange(index - 1)}
            >
              Previous
            </AppButton>
            <AppButton
              color="primary"
              size="small"
              disabled={!hasNext}
              endIcon={<ArrowForward />}
              onClick={() => onIndexChange(index + 1)}
            >
              Next
            </AppButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

/* =====================================================================
 * Page
 * ===================================================================== */

const HomePage = () => {
  const [activeAudience, setActiveAudience] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Box component="main">
      <HeroSection />
      <TrustStrip />
      <ServiceMarquee />
      <ServicesSection />
      <AudienceSection activeAudience={activeAudience} setActiveAudience={setActiveAudience} />
      <CaseStudySection openLightbox={openLightbox} />
      <PartnersSection />
      <HelpfulSection />
      <CtaBand />
      <Lightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={featuredCaseStudy.images}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
      />
    </Box>
  );
};

export default HomePage;
