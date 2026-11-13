import { createElement, type ElementType } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Apartment, Warehouse, LocalShipping } from '@mui/icons-material';
import { Section, SectionWrap } from '@/components/sections';
import { palette, shadows } from '@/utilities/themes';
import { useGetWarehouseDetailsQuery } from '@/pages/about-us/warehouse-teams/sections/api-hook';
import type { WarehouseDetail } from '@/utilities/data/about-us/warehouse-team/warehouse-details';

/* =====================================================================
 * Icon Mapping
 * ===================================================================== */

const ICONS: Record<string, ElementType> = {
  apartment: Apartment,
  warehouse: Warehouse,
  local_shipping: LocalShipping,
};

const DynamicIcon = ({ iconKey, sx }: { iconKey: string; sx?: SxProps<Theme> }) => {
  const Icon = ICONS[iconKey] || Warehouse;
  return createElement(Icon, { sx });
};

/* =====================================================================
 * Static styles
 * ===================================================================== */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
  gap: 3,
};

const CARD_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 2.5,
  bgcolor: palette.white,
  p: { xs: 3, md: 4 },
  borderRadius: '16px',
  border: `1px solid ${palette.line}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: shadows.sm,
    borderColor: palette.orange,
    '& .icon-box': {
      bgcolor: palette.orange,
      color: palette.white,
      transform: 'scale(1.05) rotate(-5deg)',
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
  flexShrink: 0,
  transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
};

const TEXT_WRAP_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  pt: 0.5,
};

const TITLE_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  fontWeight: 800,
  color: palette.navy,
  mb: 0.5,
  lineHeight: 1.3,
};

const DESC_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: palette.muted,
  lineHeight: 1.6,
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const WarehouseDetailsSection = () => {
  const { data } = useGetWarehouseDetailsQuery();

  if (!data || data.details.length === 0) return null;

  const details = data.details as unknown as (WarehouseDetail & { iconKey: string })[];

  return (
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={GRID_SX}>
          {details.map((detail) => (
            <Box key={detail.key} sx={CARD_SX}>
              <Box className="icon-box" sx={ICON_BOX_SX}>
                <DynamicIcon iconKey={detail.iconKey} sx={{ fontSize: 24 }} />
              </Box>
              <Box sx={TEXT_WRAP_SX}>
                <Typography component="h3" sx={TITLE_SX}>
                  {detail.title}
                </Typography>
                <Typography sx={DESC_SX}>{detail.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </SectionWrap>
    </Section>
  );
};