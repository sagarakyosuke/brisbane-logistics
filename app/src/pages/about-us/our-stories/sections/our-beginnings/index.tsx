import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette } from '@/utilities/themes';
import {
  ourBeginningsData,
  type OurBeginningsValue,
} from '@/utilities/_mock/about-us/our-stories/our-beginnings';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
  gap: { xs: 6, md: 8, lg: 12 },
  alignItems: 'center',
};

/* ── Left Column (Text) ───────────────────────────────────────────── */

const TEXT_COLUMN_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
};

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  color: palette.navy,
  lineHeight: 1.1,
  mt: 2,
  mb: 3,
  letterSpacing: '-0.02em',
};

const DESCRIPTION_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  color: palette.muted,
  lineHeight: 1.7,
  mb: 3,
};

const BADGE_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  bgcolor: palette.peach,
  color: palette.navy,
  border: `1px dashed ${palette.orange2}`,
  px: 2,
  py: 1,
  borderRadius: '999px',
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  mt: 2,
};

/* ── Right Column (Values Card) ───────────────────────────────────── */

const VALUES_CARD_SX: SxProps<Theme> = {
  bgcolor: palette.mist,
  borderRadius: '24px',
  p: { xs: 4, md: 5 },
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};

const VALUE_ITEM_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 2.5,
  alignItems: 'flex-start',
};

const VALUE_ICON_BOX_SX: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  width: 56,
  height: 56,
  borderRadius: '16px',
  bgcolor: palette.white,
  color: palette.orange,
  flexShrink: 0,
  boxShadow: '0 4px 12px -4px rgba(18,26,87,0.05)',
};

const VALUE_TITLE_SX: SxProps<Theme> = {
  fontSize: '1.15rem',
  fontWeight: 800,
  color: palette.navy,
  mb: 0.5,
};

const VALUE_DESC_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: palette.muted,
  lineHeight: 1.6,
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const OurBeginningsSection = () => {
  return (
    // ✅ Uses the Section component's odd/even logic
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={GRID_SX}>
          {/* Left Column */}
          <Box sx={TEXT_COLUMN_SX}>
            <SectionEyebrow>{ourBeginningsData.eyebrow}</SectionEyebrow>

            <Typography component="h2" sx={TITLE_SX}>
              {ourBeginningsData.title}
            </Typography>

            <Typography sx={DESCRIPTION_SX}>{ourBeginningsData.description1}</Typography>
            <Typography sx={DESCRIPTION_SX}>{ourBeginningsData.description2}</Typography>

            <Box sx={BADGE_SX}>
              <InfoOutlined sx={{ fontSize: 16 }} />
              {ourBeginningsData.badge}
            </Box>
          </Box>

          {/* Right Column */}
          <Box sx={VALUES_CARD_SX}>
            {ourBeginningsData.values.map((value: OurBeginningsValue) => {
              const Icon = value.icon;

              return (
                <Box key={value.id} sx={VALUE_ITEM_SX}>
                  <Box sx={VALUE_ICON_BOX_SX}>
                    <Icon fontSize="medium" />
                  </Box>
                  <Box>
                    <Typography component="h3" sx={VALUE_TITLE_SX}>
                      {value.title}
                    </Typography>
                    <Typography sx={VALUE_DESC_SX}>{value.desc}</Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};
