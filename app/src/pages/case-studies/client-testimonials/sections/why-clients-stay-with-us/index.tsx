import { useMemo, createElement, type ElementType } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward, Chat, Shield, VerifiedUser, People } from '@mui/icons-material';
import { Link } from 'react-router';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { useApi } from '@/routes/api-routing/api-context';

/* =====================================================================
 * Icon Mapping
 * ===================================================================== */

const ICONS: Record<string, ElementType> = {
  chat: Chat,
  verified_user: VerifiedUser,
  people: People,
  shield: Shield,
};

const getIcon = (key: string) => ICONS[key] || Chat;

/* =====================================================================
 * Static styles
 * ===================================================================== */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
  gap: 4,
  mb: 8,
};

const CARD_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  bgcolor: palette.white,
  p: 4,
  borderRadius: '16px',
  border: `1px solid ${palette.line}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 20px 40px -12px rgba(18,26,87,0.12)',
    borderColor: palette.orange,
  },
};

const ICON_BOX_SX: SxProps<Theme> = {
  width: 56,
  height: 56,
  borderRadius: '16px',
  bgcolor: palette.peach,
  color: palette.orange,
  display: 'grid',
  placeItems: 'center',
  mb: 3,
};

const VALUE_TITLE_SX: SxProps<Theme> = {
  fontSize: '1.15rem',
  fontWeight: 800,
  color: palette.navy,
  mb: 1,
};

const VALUE_DESC_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: palette.muted,
  lineHeight: 1.6,
};

const CTA_WRAP_SX: SxProps<Theme> = {
  bgcolor: palette.navy,
  borderRadius: '20px',
  p: { xs: 4, md: 6 },
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  alignItems: { xs: 'flex-start', md: 'center' },
  justifyContent: 'space-between',
  gap: 4,
};

const CTA_TEXT_WRAP_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  maxWidth: '60ch',
};

const CTA_ICON_WRAP_SX: SxProps<Theme> = {
  color: palette.orange,
  mb: 1,
};

const CTA_TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
  fontWeight: 800,
  color: palette.white,
  lineHeight: 1.2,
};

const CTA_DESC_SX: SxProps<Theme> = {
  fontSize: '1rem',
  color: palette.mist,
  lineHeight: 1.6,
};

const CTA_LINK_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '1rem',
  color: palette.navy,
  bgcolor: palette.orange,
  px: 3,
  py: 1.5,
  borderRadius: '999px',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  flexShrink: 0,
  '&:hover': {
    bgcolor: palette.white,
  },
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const WhyClientsStayWithUsSection = () => {
  const { data } = useApi();

  const values = useMemo(() => {
    return (data?.whyClientsStay || []) as unknown as {
      id: string;
      key: string;
      title: string;
      description: string;
      iconKey: string;
    }[];
  }, [data?.whyClientsStay]);

  if (!values || values.length === 0) return null;

  return (
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={{ mb: 6 }}>
          <SectionEyebrow>Why our clients stay with us</SectionEyebrow>
          <Typography
            component="h2"
            sx={{
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 800,
              color: palette.navy,
              mt: 1.5,
            }}
          >
            Direct communication, careful handling and a team you know.
          </Typography>
        </Box>

        <Box sx={GRID_SX}>
          {values.map((value) => (
            <Box key={value.id} sx={CARD_SX}>
              <Box sx={ICON_BOX_SX}>
                {createElement(getIcon(value.iconKey), { sx: { fontSize: 28 } })}
              </Box>
              <Typography component="h3" sx={VALUE_TITLE_SX}>
                {value.title}
              </Typography>
              <Typography sx={VALUE_DESC_SX}>{value.description}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={CTA_WRAP_SX}>
          <Box sx={CTA_TEXT_WRAP_SX}>
            <Box sx={CTA_ICON_WRAP_SX}>
              {createElement(getIcon('chat'), { sx: { fontSize: 32 } })}
            </Box>
            <Typography component="h3" sx={CTA_TITLE_SX}>
              Ready to work with a team that knows your name?
            </Typography>
            <Typography sx={CTA_DESC_SX}>
              Get in touch to talk through your warehousing and 3PL needs.
            </Typography>
          </Box>
          <Box component={Link} to="/contact" sx={CTA_LINK_SX}>
            Talk to the team
            <ArrowForward sx={{ fontSize: 18 }} />
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};