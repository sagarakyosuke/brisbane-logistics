import { createElement, type ElementType } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import {
  ArrowForward,
  ChatBubbleOutlined,
  VerifiedUser,
  PeopleOutlined,
  Description,
  Image as ImageIcon,
} from '@mui/icons-material';
import { Link } from 'react-router';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { useApi } from '@/routes/api-routing/api-context';

/* =====================================================================
 * Icon Mapping
 * ===================================================================== */

const ICONS: Record<string, ElementType> = {
  chat: ChatBubbleOutlined,
  verified_user: VerifiedUser,
  people: PeopleOutlined,
  description: Description,
};

const getIcon = (key: string | null | undefined) => {
  if (!key) return ImageIcon;
  return ICONS[key] || ImageIcon;
};

/* =====================================================================
 * Static Styles
 * ===================================================================== */

const HEADER_WRAPPER_SX: SxProps<Theme> = { mb: 5 };

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  color: palette.navy,
  lineHeight: 1.1,
  mt: 1,
};

const VALUES_GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
  gap: 3,
  mb: 4,
};

const VALUE_CARD_SX: SxProps<Theme> = {
  bgcolor: palette.white,
  border: `1px solid ${palette.line}`,
  borderRadius: '16px',
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: 'var(--shadow-sm)',
  },
};

const VALUE_ICON_BOX_SX: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  width: 56,
  height: 56,
  borderRadius: '16px',
  bgcolor: palette.peach,
  color: palette.orange,
  mb: 3,
};

const VALUE_ICON_SX = { fontSize: 28 } as const;

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

const BOTTOM_CTA_SX: SxProps<Theme> = {
  bgcolor: palette.navy,
  borderRadius: '16px',
  p: { xs: 3, md: 4 },
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  justifyContent: 'space-between',
  alignItems: { xs: 'flex-start', md: 'center' },
  gap: 3,
};

const CTA_LEFT_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 2.5,
};

const CTA_ICON_BOX_SX: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  width: 56,
  height: 56,
  borderRadius: '12px',
  bgcolor: 'rgba(255,255,255,0.08)',
  color: palette.orange,
  flexShrink: 0,
};

const CTA_ICON_SX = { fontSize: 28 } as const;

const CTA_TITLE_SX: SxProps<Theme> = {
  fontSize: '1.15rem',
  fontWeight: 800,
  color: palette.white,
  mb: 0.5,
};

const CTA_DESC_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: '#d4d8f3',
};

const CTA_LINK_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '0.95rem',
  color: palette.white,
  textDecoration: 'none',
  borderBottom: `2px solid ${palette.orange}`,
  pb: 0.5,
  transition: 'color 0.2s',
  whiteSpace: 'nowrap',
  '&:hover': { color: palette.orange },
  '&:hover .arrow': { transform: 'translateX(4px)' },
};

const CTA_ARROW_SX: SxProps<Theme> = {
  fontSize: 18,
  transition: 'transform 0.25s ease',
};

/* =====================================================================
 * WhyClientsStayWithUsSection
 * ===================================================================== */

export const WhyClientsStayWithUsSection = () => {
  const { data } = useApi();
  const section = data?.whyClientsStay;

  if (!section) return null;

  return (
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={HEADER_WRAPPER_SX}>
          <SectionEyebrow>{section.eyebrow}</SectionEyebrow>
          <Typography component="h2" sx={TITLE_SX}>
            {section.title}
          </Typography>
        </Box>

        <Box sx={VALUES_GRID_SX}>
          {section.values.map((value) => (
            <Box key={value.id} sx={VALUE_CARD_SX}>
              <Box sx={VALUE_ICON_BOX_SX}>
                {createElement(getIcon(value.iconKey), { sx: VALUE_ICON_SX })}
              </Box>
              <Typography sx={VALUE_TITLE_SX}>{value.title}</Typography>
              <Typography sx={VALUE_DESC_SX}>{value.description}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={BOTTOM_CTA_SX}>
          <Box sx={CTA_LEFT_SX}>
            <Box sx={CTA_ICON_BOX_SX}>
              {createElement(getIcon(section.cta.iconKey), { sx: CTA_ICON_SX })}
            </Box>
            <Box>
              <Typography sx={CTA_TITLE_SX}>{section.cta.title}</Typography>
              <Typography sx={CTA_DESC_SX}>{section.cta.description}</Typography>
            </Box>
          </Box>

          <Box component={Link} to={section.cta.linkHref} sx={CTA_LINK_SX}>
            {section.cta.linkLabel}
            <ArrowForward className="arrow" sx={CTA_ARROW_SX} />
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};
