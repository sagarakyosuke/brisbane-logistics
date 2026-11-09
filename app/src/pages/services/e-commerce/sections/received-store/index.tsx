// src/pages/services/e-commerce/sections/receive-store/index.tsx

import { useState } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Section, SectionWrap } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { receiveStoreTabs } from '@/utilities/_mock/services/e-commerce/receive-store';

/* =====================================================================
 * Static styles
 * ===================================================================== */

// NO bgcolor here. Let the Section handle it.
const SECTION_SX: SxProps<Theme> = {};

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '320px 1fr' },
  gap: { xs: 4, md: 5 },
  alignItems: 'stretch',
  maxWidth: 1000,
  mx: 'auto',
};

const TABS_COLUMN_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const tabButtonSx = (isActive: boolean): SxProps<Theme> => ({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  p: 2.5,
  bgcolor: isActive ? palette.peach : palette.white,
  border: `1px solid ${isActive ? palette.orange : palette.line}`,
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: palette.orange,
  },
});

const tabIconBoxSx = (isActive: boolean): SxProps<Theme> => ({
  display: 'grid',
  placeItems: 'center',
  width: 44,
  height: 44,
  borderRadius: '10px',
  bgcolor: isActive ? palette.orange : palette.peach,
  color: isActive ? palette.white : palette.orange,
  flexShrink: 0,
  transition: 'all 0.2s ease',
});

const TAB_LABEL_SX: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '1.05rem',
  color: palette.navy,
};

const PANEL_SX: SxProps<Theme> = {
  bgcolor: palette.white, // Keep this white so it stands out against the section bg
  border: `1px solid ${palette.line}`,
  borderRadius: '16px',
  p: { xs: 4, md: 5 },
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

const PANEL_HEADER_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 3,
};

const PANEL_ICON_BOX_SX: SxProps<Theme> = {
  display: 'grid',
  placeItems: 'center',
  width: 64,
  height: 64,
  borderRadius: '50%',
  bgcolor: palette.peach,
  color: palette.orange,
  flexShrink: 0,
};

const PANEL_TITLE_SX: SxProps<Theme> = {
  fontSize: '1.8rem',
  fontWeight: 800,
  color: palette.navy,
  mb: 0.5,
};

const PANEL_SUBTITLE_SX: SxProps<Theme> = {
  fontWeight: 700,
  color: palette.navy,
  fontSize: '1.05rem',
};

const PANEL_DESC_SX: SxProps<Theme> = {
  color: palette.muted,
  lineHeight: 1.6,
  fontSize: '1.05rem',
};

const BENEFITS_LIST_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  mt: 1,
};

const BENEFIT_ROW_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 1.5,
  alignItems: 'center',
};

const BENEFIT_ICON_SX: SxProps<Theme> = {
  color: palette.orange,
  fontSize: 20,
  flexShrink: 0,
};

const BENEFIT_TEXT_SX: SxProps<Theme> = {
  color: palette.navy,
  fontSize: '1rem',
};

/* =====================================================================
 * ReceiveStoreSection
 * ===================================================================== */

export const ReceiveStoreSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeData = receiveStoreTabs[activeTab];
  const ActiveIcon = activeData.icon;

  return (
    <Section sx={SECTION_SX}>
      <SectionWrap>
        <Box sx={GRID_SX}>
          <Box sx={TABS_COLUMN_SX}>
            {receiveStoreTabs.map((tab, index) => {
              const isActive = index === activeTab;
              const Icon = tab.icon;
              return (
                <Box key={tab.id} onClick={() => setActiveTab(index)} sx={tabButtonSx(isActive)}>
                  <Box sx={tabIconBoxSx(isActive)}>
                    <Icon sx={{ fontSize: 20 }} />
                  </Box>
                  <Typography sx={TAB_LABEL_SX}>{tab.label}</Typography>
                </Box>
              );
            })}
          </Box>

          <Box sx={PANEL_SX}>
            <Box sx={PANEL_HEADER_SX}>
              <Box sx={PANEL_ICON_BOX_SX}>
                <ActiveIcon sx={{ fontSize: 32 }} />
              </Box>
              <Box>
                <Typography component="h2" sx={PANEL_TITLE_SX}>
                  {activeData.title}
                </Typography>
                <Typography sx={PANEL_SUBTITLE_SX}>{activeData.subtitle}</Typography>
              </Box>
            </Box>
            <Typography sx={PANEL_DESC_SX}>{activeData.description}</Typography>
            <Box sx={BENEFITS_LIST_SX}>
              {activeData.points.map((point) => (
                <Box key={point} sx={BENEFIT_ROW_SX}>
                  <CheckCircle sx={BENEFIT_ICON_SX} />
                  <Typography sx={BENEFIT_TEXT_SX}>{point}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};
