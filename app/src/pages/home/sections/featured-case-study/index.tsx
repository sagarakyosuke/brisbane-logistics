import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { AppButton } from '@/components/buttons';
import { Section, SectionEyebrow, SectionWrap } from '@/components/sections';
import { Reveal } from '@/reusables/animation';
import { featuredCaseStudy } from '@/utilities/_mock/home/home';

/* =====================================================================
 * Types
 * ===================================================================== */

interface CaseStudySectionProps {
  openLightbox: (index: number) => void;
}

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Section shell ────────────────────────────────────────────────── */

const CARD_SX: SxProps<Theme> = {
  bgcolor: 'var(--white)',
  borderRadius: '32px',
  p: { xs: 3, md: 5, lg: 6 },
  boxShadow: '0 24px 64px -12px rgba(18,26,87,.08)',
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: '1.1fr 1fr' },
  gap: { xs: 6, md: 8, lg: 10 },
  alignItems: 'center',
};

/* ── Collage ──────────────────────────────────────────────────────── */

const COLLAGE_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: '1.4fr 1fr',
  gridTemplateRows: '1fr 1fr',
  gap: '12px',
  aspectRatio: '1.05 / 1',
};

/** Wraps each image as an interactive button (opens lightbox). */
const COLLAGE_TILE_SX: SxProps<Theme> = {
  '&:first-of-type': { gridRow: '1 / 3' },
  border: 'none',
  p: 0,
  borderRadius: '16px',
  overflow: 'hidden',
  cursor: 'pointer',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, transparent 60%, rgba(11,16,66,.3))',
    pointerEvents: 'none',
  },
  '&:hover img': { transform: 'scale(1.06)' },
};

const COLLAGE_IMG_SX: SxProps<Theme> = {
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.6s',
};

/* ── Content column ───────────────────────────────────────────────── */

const CONTENT_COLUMN_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  pr: { lg: 2 },
};

const EYEBROW_WRAPPER_SX: SxProps<Theme> = { mb: 2 };

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  color: 'var(--navy)',
  lineHeight: 1.15,
  letterSpacing: '-0.02em',
  mb: 2,
};

const LEAD_SX: SxProps<Theme> = {
  fontSize: '1.05rem',
  color: 'var(--muted)',
  lineHeight: 1.6,
  mb: 4,
};

/* ── Facts strip ──────────────────────────────────────────────────── */

const FACTS_ROW_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  width: '100%',
  bgcolor: 'var(--mist)',
  borderRadius: '16px',
  mb: 4,
  border: '1px solid var(--line)',
  overflow: 'hidden',
};

/** Shared fact-cell base; the left divider is added conditionally per cell. */
const FACT_CELL_BASE_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.5,
  p: { xs: 2, md: 2.5 },
};

const factCellSx = (isFirst: boolean): SxProps<Theme> => ({
  ...FACT_CELL_BASE_SX,
  borderLeft: isFirst ? 'none' : '1px solid var(--line)',
});

const FACT_LABEL_SX: SxProps<Theme> = {
  color: 'var(--muted)',
  fontSize: '0.8rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const FACT_VALUE_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  fontWeight: 800,
  color: 'var(--navy)',
};

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const Collage = ({ onImageClick }: { onImageClick: (index: number) => void }) => (
  <Box sx={COLLAGE_SX}>
    {featuredCaseStudy.images.map((img, index) => (
      <Box
        key={img.src}
        component="button"
        type="button"
        onClick={() => onImageClick(index)}
        aria-label={`View image: ${img.alt}`}
        sx={COLLAGE_TILE_SX}
      >
        <Box component="img" src={img.src} alt={img.alt} sx={COLLAGE_IMG_SX} />
      </Box>
    ))}
  </Box>
);

const FactsRow = () => (
  <Box sx={FACTS_ROW_SX}>
    {featuredCaseStudy.facts.map((fact, index) => (
      <Box key={fact.label} sx={factCellSx(index === 0)}>
        <Typography sx={FACT_LABEL_SX}>{fact.label}</Typography>
        <Typography sx={FACT_VALUE_SX}>{fact.value}</Typography>
      </Box>
    ))}
  </Box>
);

/* =====================================================================
 * CaseStudySection
 * ===================================================================== */

export const CaseStudySection = ({ openLightbox }: CaseStudySectionProps) => (
  <Section delay={100}>
    <SectionWrap>
      <Box sx={CARD_SX}>
        <Reveal delay={100}>
          <Collage onImageClick={openLightbox} />
        </Reveal>

        <Reveal delay={300}>
          <Box sx={CONTENT_COLUMN_SX}>
            <Box sx={EYEBROW_WRAPPER_SX}>
              <SectionEyebrow>{featuredCaseStudy.eyebrow}</SectionEyebrow>
            </Box>

            <Typography component="h2" sx={TITLE_SX}>
              {featuredCaseStudy.title}
            </Typography>

            <Typography sx={LEAD_SX}>{featuredCaseStudy.lead}</Typography>

            <FactsRow />

            <AppButton color="outline" size="large" endIcon={<ArrowForward />}>
              Read the case study
            </AppButton>
          </Box>
        </Reveal>
      </Box>
    </SectionWrap>
  </Section>
);
