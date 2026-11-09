import { useState } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Section, SectionWrap } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { practicalGuidesData } from '@/utilities/_mock/news-and-blogs/guides-and-tips/practical-guides';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
  fontWeight: 800,
  color: palette.navy,
  mb: 4,
};

const LIST_WRAPPER_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

// We dynamically set border and bgcolor based on `isOpen`
const ITEM_SX = (isOpen: boolean): SxProps<Theme> => ({
  bgcolor: palette.white,
  border: `1px solid ${isOpen ? palette.orange : palette.line}`,
  borderRadius: '12px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  boxShadow: isOpen ? '0 4px 20px -10px rgba(245, 130, 32, 0.2)' : 'none',
});

const HEADER_SX: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 2,
  p: { xs: 2.5, md: 3 },
  cursor: 'pointer',
};

const QUESTION_SX: SxProps<Theme> = {
  fontSize: '1.05rem',
  fontWeight: 700,
  color: palette.navy,
  lineHeight: 1.4,
};

const ICON_BTN_SX = (isOpen: boolean): SxProps<Theme> => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  bgcolor: isOpen ? palette.orange : palette.peach,
  color: isOpen ? palette.white : palette.orange,
  display: 'grid',
  placeItems: 'center',
  flexShrink: 0,
  transition: 'all 0.3s ease',
  transform: isOpen ? 'rotate(0deg)' : 'rotate(45deg)', // Rotates the X to look like a plus when closed
});

const ICON_SX: SxProps<Theme> = {
  fontSize: 18,
};

const ANSWER_WRAP_SX = (isOpen: boolean): SxProps<Theme> => ({
  display: 'grid',
  gridTemplateRows: isOpen ? '1fr' : '0fr',
  transition: 'grid-template-rows 0.3s ease',
});

const ANSWER_INNER_SX: SxProps<Theme> = {
  overflow: 'hidden',
};

const ANSWER_TEXT_SX: SxProps<Theme> = {
  p: { xs: '0 24px 24px', md: '0 32px 32px' },
  fontSize: '1rem',
  color: palette.muted,
  lineHeight: 1.6,
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const PracticalGuidesSection = () => {
  // First item is open by default
  const [openId, setOpenId] = useState<string | null>(practicalGuidesData.items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <Section tone="default" skipAlternate>
      <SectionWrap>
        <Typography component="h2" sx={TITLE_SX}>
          {practicalGuidesData.title}
        </Typography>

        <Box sx={LIST_WRAPPER_SX}>
          {practicalGuidesData.items.map((item) => {
            const isOpen = openId === item.id;

            return (
              <Box key={item.id} sx={ITEM_SX(isOpen)}>
                <Box onClick={() => toggle(item.id)} sx={HEADER_SX} role="button" tabIndex={0}>
                  <Typography sx={QUESTION_SX}>{item.question}</Typography>
                  <Box sx={ICON_BTN_SX(isOpen)}>
                    <Close sx={ICON_SX} />
                  </Box>
                </Box>

                <Box sx={ANSWER_WRAP_SX(isOpen)}>
                  <Box sx={ANSWER_INNER_SX}>
                    <Typography sx={ANSWER_TEXT_SX}>{item.answer}</Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </SectionWrap>
    </Section>
  );
};
