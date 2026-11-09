import { useEffect, useState } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router';
import { AppButton } from '@/components/buttons';
import { Section, SectionWrap } from '@/components/sections';
import { Carousel } from '@/reusables/carousel';
import {
  heroBays,
  heroContent,
  heroSlides,
  type HeroBay,
  type HeroContent,
} from '@/utilities/_mock/home/hero';

export type { HeroBay, HeroContent };

const HERO_WRAPPER_SX: SxProps<Theme> = {
  position: 'relative',
  width: '100%',
  height: 'calc(100svh - var(--hdr) + 40px)',
  mt: 'calc(var(--hdr) * -1)',
};

const HERO_SECTION_SX: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  bgcolor: 'var(--navy-deep)',
  color: 'var(--white)',
  overflow: 'hidden',
};

const HERO_DOTS_ROW_SX: SxProps<Theme> = {
  position: 'absolute',
  top: { xs: '140px', md: '160px' },
  right: { xs: '20px', md: '40px' },
  zIndex: 10,
  display: 'flex',
  gap: 1.5,
};

const heroDotSx = (isActive: boolean): SxProps<Theme> => ({
  width: isActive ? 36 : 14,
  height: 14,
  p: 0,
  border: 'none',
  borderRadius: 999,
  cursor: 'pointer',
  background: isActive ? 'var(--orange)' : 'rgba(255,255,255,0.55)',
  transition: 'all 0.3s',
  '&:hover': { background: isActive ? 'var(--orange)' : 'rgba(255,255,255,0.8)' },
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
  pt: { xs: '140px', md: '160px' },
  pb: { xs: '40px', md: '56px' },
  height: '100%',
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

const ROTATE_INTERVAL_MS = 3000;
const ROTATE_TRANSITION_MS = 350;

const BADGE_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1.5,
  px: 2,
  py: 1,
  border: '2px solid var(--orange)',
  borderRadius: '6px',
  fontSize: '0.74rem',
  fontWeight: 800,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--white)',
  background: 'rgba(245,130,32,.12)',
  width: 'fit-content',
};

const LIVE_DOT_SX: SxProps<Theme> = {
  width: 9,
  height: 9,
  borderRadius: '50%',
  bgcolor: '#3ddc84',
  animation: 'live 1.8s ease-out infinite',
  '@keyframes live': {
    '0%': { boxShadow: '0 0 0 0 rgba(61,220,132,.7)' },
    '100%': { boxShadow: '0 0 0 10px rgba(61,220,132,0)' },
  },
};

const HEADLINE_SX: SxProps<Theme> = {
  fontSize: { xs: '2.6rem', md: 'clamp(2.6rem, 6.4vw, 5.2rem)' },
  lineHeight: 1.02,
  letterSpacing: '-0.035em',
  fontWeight: 900,
  display: 'block',
};

const rotatingWordSx = (isOut: boolean): SxProps<Theme> => ({
  display: 'inline-block',
  color: 'var(--orange)',
  opacity: isOut ? 0 : 1,
  transform: isOut ? 'translateY(-18px)' : 'none',
  transition: `opacity ${ROTATE_TRANSITION_MS}ms, transform ${ROTATE_TRANSITION_MS}ms`,
});

const LEAD_SX: SxProps<Theme> = {
  fontSize: { xs: '1.02rem', md: '1.15rem' },
  color: '#dfe2f6',
  maxWidth: '48ch',
  lineHeight: 1.6,
};

const ACTIONS_SX: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 2,
  alignItems: 'center',
  mt: 0.5,
};

const BAYS_GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'auto repeat(4, 1fr)' },
  gap: { xs: '8px', md: '10px' },
  alignItems: 'stretch',
  width: '100%',
};

const BAYS_LABEL_SX: SxProps<Theme> = {
  alignSelf: 'center',
  width: '84px',
  mr: 1.5,
  fontWeight: 800,
  fontSize: '0.74rem',
  letterSpacing: '0.16em',
  lineHeight: 1.25,
  textTransform: 'uppercase',
  color: 'var(--orange-2)',
  display: { xs: 'none', lg: 'block' },
};

const BAY_CARD_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  gap: 1.25,
  alignItems: 'center',
  textAlign: 'left',
  p: '8px 12px 8px 8px',
  borderRadius: '14px',
  background: 'rgba(255,255,255,.08)',
  border: '1px solid rgba(255,255,255,.18)',
  backdropFilter: 'blur(8px)',
  transition: 'all 0.3s',
  cursor: 'pointer',
  color: 'inherit',
  width: '100%',
  minWidth: 0,
  textDecoration: 'none',
  '&:hover, &:focus-visible': {
    background: 'var(--white)',
    color: 'var(--navy)',
    borderColor: 'var(--white)',
    transform: 'translateY(-4px)',
  },
  '&:hover .bay-door, &:focus-visible .bay-door': { transform: 'translateY(-82%)' },
  '&:hover .bay-subtitle, &:focus-visible .bay-subtitle': { color: 'var(--orange)' },
  '&:hover .bay-go, &:focus-visible .bay-go': { transform: 'translateX(4px)' },
};

const BAY_ICON_TILE_SX: SxProps<Theme> = {
  position: 'relative',
  width: 48,
  height: 48,
  borderRadius: '10px',
  overflow: 'hidden',
  background: 'var(--orange)',
  display: 'grid',
  placeItems: 'center',
  color: 'var(--navy)',
  flex: 'none',
};

const BAY_ICON_SX: SxProps<Theme> = { position: 'relative', zIndex: 1, fontSize: 22 };

const BAY_DOOR_SX: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  background: 'repeating-linear-gradient(180deg,#d9dcea 0 5px,#b9bdd3 5px 7px)',
  zIndex: 2,
  transition: 'transform .45s cubic-bezier(.2,.8,.2,1)',
};

const BAY_TEXT_COLUMN_SX: SxProps<Theme> = { display: 'grid', minWidth: 0 };

const BAY_SUBTITLE_SX: SxProps<Theme> = {
  fontSize: '0.65rem',
  fontWeight: 800,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--orange-2)',
  transition: 'color 0.3s',
};

const BAY_TITLE_SX: SxProps<Theme> = {
  fontSize: '0.88rem',
  lineHeight: 1.2,
  fontWeight: 700,
};

const BAY_GO_SX: SxProps<Theme> = {
  display: { xs: 'none', sm: 'block' },
  ml: 'auto',
  transition: 'transform 0.25s',
};

const BAY_GO_ICON_SX = { fontSize: 16, color: 'var(--orange)' } as const;

const CONTENT_BLOCK_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 2,
  maxWidth: 640,
};

const HeroBadge = ({ label }: { label: string }) => (
  <Box sx={BADGE_SX}>
    <Box component="span" sx={LIVE_DOT_SX} />
    {label}
  </Box>
);

interface HeroHeadlineProps {
  title: string;
  words: string[];
}

const HeroHeadline = ({ title, words }: HeroHeadlineProps) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isOut, setIsOut] = useState(false);
  const hasWords = words.length > 0;

  useEffect(() => {
    if (!hasWords) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setIsOut(true);
      timeoutId = setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % words.length);
        setIsOut(false);
      }, ROTATE_TRANSITION_MS);
    }, ROTATE_INTERVAL_MS);
    return () => {
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, [hasWords, words.length]);

  const lines = title.split(/\.\s+/).map((line) => line.trim());

  return (
    <Typography variant="h1" sx={HEADLINE_SX}>
      {lines.map((line, i) => (
        <span key={line}>
          {line}
          {i < lines.length - 1 || hasWords ? (
            <>
              .
              <br />
            </>
          ) : (
            '.'
          )}
        </span>
      ))}
      {hasWords && (
        <Box component="span" sx={rotatingWordSx(isOut)}>
          {words[wordIndex]}
        </Box>
      )}
    </Typography>
  );
};

const HeroLead = ({ text }: { text: string }) => <Typography sx={LEAD_SX}>{text}</Typography>;

const HeroActions = () => (
  <Box sx={ACTIONS_SX}>
    <AppButton color="primary" size="large" endIcon={<ArrowForward />}>
      Get a 3PL Quote
    </AppButton>
    <AppButton color="ghostLight" size="large" endIcon={<ArrowForward />}>
      Explore our services
    </AppButton>
  </Box>
);

const HeroBayCard = ({ bay }: { bay: HeroBay }) => {
  const BayIcon = bay.icon;
  return (
    <Box component={Link} to={bay.path} sx={BAY_CARD_SX}>
      <Box sx={BAY_ICON_TILE_SX}>
        <BayIcon sx={BAY_ICON_SX} />
        <Box className="bay-door" sx={BAY_DOOR_SX} />
      </Box>
      <Box sx={BAY_TEXT_COLUMN_SX}>
        <Typography className="bay-subtitle" sx={BAY_SUBTITLE_SX}>
          {bay.subtitle}
        </Typography>
        <Typography sx={BAY_TITLE_SX}>{bay.title}</Typography>
      </Box>
      <Box className="bay-go" sx={BAY_GO_SX}>
        <ArrowForward sx={BAY_GO_ICON_SX} />
      </Box>
    </Box>
  );
};

export const HeroBays = ({ bays }: { bays: HeroBay[] }) => (
  <Box sx={BAYS_GRID_SX}>
    <Box sx={BAYS_LABEL_SX}>What do you need?</Box>
    {bays.map((bay) => (
      <HeroBayCard key={bay.id} bay={bay} />
    ))}
  </Box>
);

export const HeroContentBlock = ({ content }: { content: HeroContent }) => (
  <Box sx={CONTENT_BLOCK_SX}>
    <HeroBadge label={content.badge} />
    <HeroHeadline title={content.title} words={content.rotatingWords} />
    <HeroLead text={content.lead} />
    <HeroActions />
  </Box>
);

export const HeroSection = () => (
  <Box sx={HERO_WRAPPER_SX}>
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
  </Box>
);
