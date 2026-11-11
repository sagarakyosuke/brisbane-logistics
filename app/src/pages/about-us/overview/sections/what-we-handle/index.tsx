import { useMemo, createElement, type ElementType } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Inventory, Warehouse, LocalShipping, Outbox } from '@mui/icons-material';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { useApi } from '@/routes/api-routing/api-context';
import type { WhatWeHandleItem } from '@/utilities/data/about-us/what-we-handle';

/* =====================================================================
 * Icon Mapping
 * ===================================================================== */

const ICONS: Record<string, ElementType> = {
  inventory: Inventory,
  warehouse: Warehouse,
  local_shipping: LocalShipping,
  outbox: Outbox,
};

const DynamicIcon = ({ iconKey, sx }: { iconKey: string; sx?: SxProps<Theme> }) => {
  const Icon = ICONS[iconKey] || Inventory;
  return createElement(Icon, { sx });
};

/* =====================================================================
 * Static styles
 * ===================================================================== */

const HEADER_WRAP_SX: SxProps<Theme> = {
  mb: 6,
};

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  color: palette.navy,
  lineHeight: 1.1,
  mt: 1.5,
  mb: 4,
};

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
  gap: 3,
};

const CARD_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  bgcolor: palette.white,
  p: 4,
  borderRadius: '20px',
  border: `1px solid ${palette.line}`,
  transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 24px 48px -12px rgba(18,26,87,0.15)',
    borderColor: palette.orange,
    '& .icon-box': {
      bgcolor: palette.orange,
      color: palette.white,
      transform: 'scale(1.1) rotate(-5deg)',
      boxShadow: '0 8px 16px -4px rgba(245, 130, 32, 0.4)',
    },
    '& .card-title': {
      color: palette.orange,
    },
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
  transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
};

const CARD_TITLE_SX: SxProps<Theme> = {
  fontSize: '1.15rem',
  fontWeight: 800,
  color: palette.navy,
  mb: 1,
  transition: 'color 0.3s ease',
};

const CARD_DESC_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: palette.muted,
  lineHeight: 1.5,
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const WhatWeHandleSection = () => {
  const { data } = useApi();

  const whatWeHandleData = useMemo(() => {
    if (!data?.whatWeHandle) return null;
    return data.whatWeHandle as unknown as {
      eyebrow: string;
      title: string;
      items: (WhatWeHandleItem & { iconKey: string })[];
    };
  }, [data?.whatWeHandle]);

  if (!whatWeHandleData || whatWeHandleData.items.length === 0) return null;

  return (
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={HEADER_WRAP_SX}>
          <SectionEyebrow>{whatWeHandleData.eyebrow}</SectionEyebrow>
          <Typography component="h2" sx={TITLE_SX}>
            {whatWeHandleData.title}
          </Typography>
        </Box>

        <Box sx={GRID_SX}>
          {whatWeHandleData.items.map((item) => (
            <Box key={item.id} sx={CARD_SX}>
              <Box className="icon-box" sx={ICON_BOX_SX}>
                <DynamicIcon iconKey={item.iconKey} sx={{ fontSize: 24 }} />
              </Box>

              <Typography component="h3" className="card-title" sx={CARD_TITLE_SX}>
                {item.title}
              </Typography>

              <Typography sx={CARD_DESC_SX}>{item.desc}</Typography>
            </Box>
          ))}
        </Box>
      </SectionWrap>
    </Section>
  );
};
