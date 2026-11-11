import { useState, useRef, useMemo, createElement, type ElementType } from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import {
  Add,
  Close,
  ArrowForward,
  Business,
  Warehouse,
  ShoppingCart,
  LocalShipping,
  Inventory,
  Settings,
  Description,
  Headset,
} from '@mui/icons-material';
import { Section, SectionWrap } from '@/components/sections';
import { AppButton } from '@/components/buttons';
import { palette, shadows } from '@/utilities/themes';
import { useGetWhatDoYouNeedQuery } from '@/pages/faqs/sections/api-hook';
import type { TopicItem } from '@/utilities/data/faqs/what-do-you-need';

/* =====================================================================
 * Icon Mapping
 * ===================================================================== */

const ICONS: Record<string, ElementType> = {
  business: Business,
  warehouse: Warehouse,
  shopping_cart: ShoppingCart,
  local_shipping: LocalShipping,
  inventory: Inventory,
  settings: Settings,
  description: Description,
  headset: Headset,
};

const DynamicIcon = ({ iconKey, sx }: { iconKey: string; sx?: SxProps<Theme> }) => {
  const Icon = ICONS[iconKey] || Business;
  return createElement(Icon, { sx });
};

/* =====================================================================
 * Static styles
 * ===================================================================== */

const HEADER_WRAP_SX: SxProps<Theme> = {
  mb: 5,
};

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  color: palette.navy,
  mb: 1.5,
  letterSpacing: '-0.02em',
};

const SUBTITLE_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  color: palette.muted,
  lineHeight: 1.6,
};

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: {
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(4, 1fr)',
  },
  gap: 2.5,
};

const cardSx = (isActive: boolean): SxProps<Theme> => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 1.5,
  p: 3,
  borderRadius: '16px',
  cursor: 'pointer',
  border: `1px solid ${isActive ? palette.navy : palette.line}`,
  bgcolor: isActive ? palette.navy : palette.white,
  transition: 'all 0.2s ease',
  boxShadow: isActive ? shadows.base : 'none',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: shadows.base,
  },
});

const ICON_BOX_SX = (isActive: boolean): SxProps<Theme> => ({
  display: 'grid',
  placeItems: 'center',
  width: 44,
  height: 44,
  borderRadius: '12px',
  bgcolor: isActive ? palette.orange : palette.peach,
  color: isActive ? palette.white : palette.orange,
  mb: 1,
});

const TITLE_CARD_SX = (isActive: boolean): SxProps<Theme> => ({
  fontSize: '1.05rem',
  fontWeight: 700,
  color: isActive ? palette.white : palette.navy,
  lineHeight: 1.3,
});

const DESC_CARD_SX = (isActive: boolean): SxProps<Theme> => ({
  fontSize: '0.9rem',
  color: isActive ? palette.mist : palette.muted,
  lineHeight: 1.5,
  flexGrow: 1,
});

const COUNT_BADGE_SX = (isActive: boolean): SxProps<Theme> => ({
  display: 'inline-flex',
  alignItems: 'center',
  fontSize: '0.75rem',
  fontWeight: 700,
  color: isActive ? palette.navy : palette.navy,
  bgcolor: isActive ? palette.white : palette.peach,
  px: 1.5,
  py: 0.5,
  borderRadius: '999px',
  mt: 1,
});

const ACC_HEADER_ROW_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  justifyContent: 'space-between',
  alignItems: { xs: 'flex-start', md: 'flex-end' },
  gap: 3,
  mb: 4,
};

const ACC_TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(1.8rem, 2.5vw, 2.2rem)',
  fontWeight: 800,
  color: palette.navy,
  mb: 0.5,
};

const ACC_SUBTITLE_SX: SxProps<Theme> = {
  fontSize: '1rem',
  color: palette.muted,
};

const ACTIONS_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
};

const LIST_WRAP_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

const accItemSx = (isOpen: boolean): SxProps<Theme> => ({
  bgcolor: palette.white,
  border: `1px solid ${isOpen ? palette.orange : palette.line}`,
  borderRadius: '12px',
  overflow: 'hidden',
  transition: 'all 0.2s',
});

const ACC_HEADER_SX: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  p: 3,
  cursor: 'pointer',
  userSelect: 'none',
};

const ACC_Q_SX: SxProps<Theme> = {
  fontSize: '1.05rem',
  fontWeight: 700,
  color: palette.navy,
};

const iconBtnSx = (isOpen: boolean): SxProps<Theme> => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  bgcolor: isOpen ? palette.orange : palette.peach,
  color: isOpen ? palette.white : palette.orange,
  display: 'grid',
  placeItems: 'center',
  transition: 'all 0.2s',
  flexShrink: 0,
});

const ACC_BODY_SX: SxProps<Theme> = {
  px: 3,
  pb: 3,
  pt: 0,
  color: palette.muted,
  fontSize: '1rem',
  lineHeight: 1.6,
};

const NEXT_TOPIC_WRAP_SX: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'flex-end',
  mt: 4,
};

const NEXT_TOPIC_LINK_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '0.95rem',
  color: palette.navy,
  cursor: 'pointer',
  borderBottom: `2px solid ${palette.orange}`,
  pb: 0.5,
  transition: 'color 0.2s',
  '&:hover': { color: palette.orange },
};

const SCROLL_ANCHOR_SX: SxProps<Theme> = {
  scrollMarginTop: '100px',
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const WhatDoYouNeedSection = () => {
  const { data } = useGetWhatDoYouNeedQuery();

  const faqsData = useMemo(() => {
    if (!data) return null;
    return data as unknown as {
      title: string;
      subtitle: string;
      topics: (TopicItem & { iconKey: string })[];
    };
  }, [data]);

  const [activeTopicId, setActiveTopicId] = useState<string>('getting-to-know-us');
  const [openAccordions, setOpenAccordions] = useState<number[]>([0]);

  const accordionRef = useRef<HTMLDivElement>(null);

  if (!faqsData || faqsData.topics.length === 0) return null;

  const activeTopic = faqsData.topics.find((t) => t.id === activeTopicId) || faqsData.topics[0];

  const toggleAccordion = (index: number) => {
    setOpenAccordions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const expandAll = () => {
    setOpenAccordions(activeTopic.questions.map((_, i) => i));
  };

  const collapseAll = () => {
    setOpenAccordions([]);
  };

  const scrollToAccordion = () => {
    setTimeout(() => {
      accordionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 150);
  };

  const handleNextTopic = () => {
    const currentIndex = faqsData.topics.findIndex((t) => t.id === activeTopicId);
    const nextIndex = (currentIndex + 1) % faqsData.topics.length;
    setActiveTopicId(faqsData.topics[nextIndex].id);
    setOpenAccordions([0]);

    scrollToAccordion();
  };

  const handleTopicClick = (topicId: string) => {
    setActiveTopicId(topicId);
    setOpenAccordions([0]);

    scrollToAccordion();
  };

  return (
    <>
      <Section skipAlternate={false}>
        <SectionWrap>
          <Box sx={HEADER_WRAP_SX}>
            <Typography component="h2" sx={TITLE_SX}>
              {faqsData.title}
            </Typography>
            <Typography sx={SUBTITLE_SX}>{faqsData.subtitle}</Typography>
          </Box>

          <Box sx={GRID_SX}>
            {faqsData.topics.map((topic) => {
              const isActive = activeTopicId === topic.id;

              return (
                <Box
                  key={topic.id}
                  onClick={() => handleTopicClick(topic.id)}
                  sx={cardSx(isActive)}
                >
                  <Box sx={ICON_BOX_SX(isActive)}>
                    <DynamicIcon iconKey={topic.iconKey} sx={{ fontSize: 24 }} />
                  </Box>
                  <Typography component="h3" sx={TITLE_CARD_SX(isActive)}>
                    {topic.title}
                  </Typography>
                  <Typography sx={DESC_CARD_SX(isActive)}>{topic.desc}</Typography>
                  <Box sx={COUNT_BADGE_SX(isActive)}>{topic.questions.length} questions</Box>
                </Box>
              );
            })}
          </Box>
        </SectionWrap>
      </Section>

      <Box ref={accordionRef} sx={SCROLL_ANCHOR_SX}>
        <Section skipAlternate={false} sx={{ pt: 0 }}>
          <SectionWrap>
            <Box sx={ACC_HEADER_ROW_SX}>
              <Box>
                <Typography component="h3" sx={ACC_TITLE_SX}>
                  {activeTopic.title}
                </Typography>
                <Typography sx={ACC_SUBTITLE_SX}>{activeTopic.desc}</Typography>
              </Box>

              <Box sx={ACTIONS_SX}>
                <AppButton color="outline" size="small" startIcon={<Add />} onClick={expandAll}>
                  Expand all
                </AppButton>
                <AppButton color="outline" size="small" onClick={collapseAll}>
                  Collapse all
                </AppButton>
              </Box>
            </Box>

            <Box sx={LIST_WRAP_SX}>
              {activeTopic.questions.map((q, index) => {
                const isOpen = openAccordions.includes(index);

                return (
                  <Box key={index} sx={accItemSx(isOpen)}>
                    <Box onClick={() => toggleAccordion(index)} sx={ACC_HEADER_SX}>
                      <Typography sx={ACC_Q_SX}>{q.question}</Typography>
                      <Box sx={iconBtnSx(isOpen)}>
                        {isOpen ? <Close fontSize="small" /> : <Add fontSize="small" />}
                      </Box>
                    </Box>

                    {isOpen && <Box sx={ACC_BODY_SX}>{q.answer}</Box>}
                  </Box>
                );
              })}
            </Box>

            <Box sx={NEXT_TOPIC_WRAP_SX}>
              <Box onClick={handleNextTopic} sx={NEXT_TOPIC_LINK_SX}>
                Next topic:{' '}
                {
                  faqsData.topics[
                    (faqsData.topics.findIndex((t) => t.id === activeTopicId) + 1) %
                      faqsData.topics.length
                  ].title
                }
                <ArrowForward sx={{ fontSize: 18, color: palette.orange }} />
              </Box>
            </Box>
          </SectionWrap>
        </Section>
      </Box>
    </>
  );
};
