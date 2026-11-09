import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { LocalShipping as LocalShippingIcon } from '@mui/icons-material';
import { Section, SectionEyebrow, SectionWrap } from '@/components/sections';
import {
  crossDockingBenefits,
  crossDockingFeatureImage,
} from '@/utilities/_mock/services/cross-docking/cross-docking';
import { palette } from '@/utilities/themes';

/* =====================================================================
 * Static styles
 * ===================================================================== */

/* ── Layout ───────────────────────────────────────────────────────── */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
  gap: { xs: 6, lg: 10 },
  alignItems: 'center',
};

const BENEFITS_COLUMN_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
};

const EYEBROW_WRAPPER_SX: SxProps<Theme> = { mb: 4 };

/* ── Benefit row ──────────────────────────────────────────────────── */

const benefitRowSx = (isLast: boolean): SxProps<Theme> => ({
  display: 'flex',
  gap: 3,
  alignItems: 'flex-start',
  py: 4,
  borderBottom: isLast ? 'none' : '1px solid var(--line)',
});

const BENEFIT_ICON_BOX_SX: SxProps<Theme> = {
  width: 56,
  height: 56,
  borderRadius: '16px',
  bgcolor: 'var(--peach)',
  color: 'var(--orange)',
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
};

const BENEFIT_ICON_SX = { fontSize: 28 } as const;

const BENEFIT_TITLE_SX: SxProps<Theme> = {
  fontWeight: 800,
  fontSize: '1.15rem',
  color: 'var(--navy)',
  mb: 0.5,
};

const BENEFIT_DESC_SX: SxProps<Theme> = {
  color: 'var(--muted)',
  fontSize: '0.95rem',
  lineHeight: 1.6,
};

/* ── Feature image ────────────────────────────────────────────────── */

const IMAGE_FRAME_SX: SxProps<Theme> = {
  position: 'relative',
  borderRadius: '24px',
  overflow: 'hidden',
  boxShadow: 'var(--shadow)',
  aspectRatio: '4/5',
  bgcolor: 'var(--mist)',
};

const IMAGE_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
};

const IMAGE_LABEL_BADGE_SX: SxProps<Theme> = {
  position: 'absolute',
  bottom: 20,
  left: 20,
  bgcolor: palette.white,
  color: palette.navy,
  borderRadius: '999px',
  px: 2,
  py: 1,
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  boxShadow: 'var(--shadow-sm)',
  fontWeight: 700,
  fontSize: '0.85rem',
};

const IMAGE_LABEL_ICON_SX = { fontSize: 18, color: palette.orange } as const;

/* =====================================================================
 * Sub-components
 * ===================================================================== */

const BenefitRow = ({
  benefit,
  isLast,
}: {
  benefit: (typeof crossDockingBenefits)[number];
  isLast: boolean;
}) => {
  const Icon = benefit.icon;

  return (
    <Box sx={benefitRowSx(isLast)}>
      <Box sx={BENEFIT_ICON_BOX_SX}>
        <Icon sx={BENEFIT_ICON_SX} />
      </Box>
      <Box>
        <Typography component="h3" sx={BENEFIT_TITLE_SX}>
          {benefit.title}
        </Typography>
        <Typography sx={BENEFIT_DESC_SX}>{benefit.description}</Typography>
      </Box>
    </Box>
  );
};

/* =====================================================================
 * WhyConsiderCrossDockingSection
 * ===================================================================== */

export const WhyConsiderCrossDockingSection = () => (
  <Section delay={100}>
    <SectionWrap>
      <Box sx={GRID_SX}>
        {/* Left — text & benefits */}
        <Box>
          <Box sx={EYEBROW_WRAPPER_SX}>
            <SectionEyebrow>Why Consider Cross Docking?</SectionEyebrow>
          </Box>

          <Box sx={BENEFITS_COLUMN_SX}>
            {crossDockingBenefits.map((benefit, index) => (
              <BenefitRow
                key={benefit.id}
                benefit={benefit}
                isLast={index === crossDockingBenefits.length - 1}
              />
            ))}
          </Box>
        </Box>

        {/* Right — feature image */}
        <Box>
          <Box sx={IMAGE_FRAME_SX}>
            <Box
              component="img"
              src={crossDockingFeatureImage.src}
              alt={crossDockingFeatureImage.alt}
              sx={IMAGE_SX}
            />

            <Box sx={IMAGE_LABEL_BADGE_SX}>
              <LocalShippingIcon sx={IMAGE_LABEL_ICON_SX} />
              {crossDockingFeatureImage.label}
            </Box>
          </Box>
        </Box>
      </Box>
    </SectionWrap>
  </Section>
);
