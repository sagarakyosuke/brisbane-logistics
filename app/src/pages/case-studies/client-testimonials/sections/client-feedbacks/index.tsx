import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, IconButton, type SxProps, type Theme } from '@mui/material';
import { FormatQuote, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { useApi } from '@/routes/api-routing/api-context';
import type { ClientFeedback } from '@/utilities/data/case-studies/client-testimonials/client-feedbacks';

/* =====================================================================
 * Constants
 * ===================================================================== */

const AUTOPLAY_INTERVAL_MS = 5000;

/* =====================================================================
 * Static Styles
 * ===================================================================== */

const HEADER_WRAPPER_SX: SxProps<Theme> = {
  mb: 5,
};

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  color: palette.navy,
  lineHeight: 1.1,
  mt: 1,
};

const CARD_SX: SxProps<Theme> = {
  position: 'relative',
  bgcolor: palette.white,
  border: `1px solid ${palette.line}`,
  borderLeft: `4px solid ${palette.orange}`,
  borderRadius: '16px',
  p: { xs: 4, md: 6 },
  boxShadow: '0 20px 40px -20px rgba(18,26,87,0.08)',
  overflow: 'hidden',
};

const QUOTE_ICON_SX: SxProps<Theme> = {
  fontSize: 56,
  color: palette.orange,
  mb: 3,
  display: 'block',
  transform: 'rotate(180deg)',
};

const VIEWPORT_SX: SxProps<Theme> = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  mb: 4,
  minHeight: 140,
};

const trackSx = (currentIndex: number, total: number): SxProps<Theme> => ({
  display: 'flex',
  width: `${total * 100}%`,
  transform: `translateX(-${(currentIndex * 100) / total}%)`,
  transition: 'transform 0.5s ease-in-out',
});

const slideSx = (total: number): SxProps<Theme> => ({
  width: `${100 / total}%`,
  flexShrink: 0,
});

const QUOTE_TEXT_SX: SxProps<Theme> = {
  fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
  fontWeight: 700,
  color: palette.navy,
  lineHeight: 1.4,
  mb: 2,
};

const META_TEXT_SX: SxProps<Theme> = {
  fontSize: '0.9rem',
  color: palette.muted,
  fontWeight: 600,
};

const DIVIDER_SX: SxProps<Theme> = {
  height: 1,
  width: '100%',
  bgcolor: palette.line,
  mb: 3,
};

const CONTROLS_ROW_SX: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 2,
};

const NAV_GROUP_SX: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

const NAV_BUTTON_SX: SxProps<Theme> = {
  border: `1px solid ${palette.line}`,
  color: palette.navy,
  width: 40,
  height: 40,
  '&:hover': { bgcolor: palette.mist },
};

const DOTS_GROUP_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  alignItems: 'center',
};

const dotSx = (isActive: boolean): SxProps<Theme> => ({
  width: isActive ? 24 : 8,
  height: 8,
  borderRadius: '999px',
  bgcolor: isActive ? palette.orange : palette.line,
  border: 'none',
  p: 0,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
});

const DISCLAIMER_SX: SxProps<Theme> = {
  fontSize: '0.85rem',
  color: palette.muted,
};

/* =====================================================================
 * ClientFeedbacksSection
 * ===================================================================== */

export const ClientFeedbacksSection = () => {
  const { data } = useApi();
  const feedbacks = (data?.clientFeedbacks || []) as ClientFeedback[];

  const [currentIndex, setCurrentIndex] = useState(0);
  const total = feedbacks.length;

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(handleNext, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [currentIndex, handleNext, total]);

  if (total === 0) return null;

  return (
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={HEADER_WRAPPER_SX}>
          <SectionEyebrow>Client Feedback</SectionEyebrow>
          <Typography component="h2" sx={TITLE_SX}>
            What our clients appreciate.
          </Typography>
        </Box>

        <Box sx={CARD_SX}>
          <FormatQuote sx={QUOTE_ICON_SX} />

          <Box sx={VIEWPORT_SX}>
            <Box sx={trackSx(currentIndex, total)}>
              {feedbacks.map((feedback) => (
                <Box key={feedback.id} sx={slideSx(total)}>
                  <Typography sx={QUOTE_TEXT_SX}>{feedback.quote}</Typography>
                  <Typography sx={META_TEXT_SX}>{feedback.meta}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={DIVIDER_SX} />

          <Box sx={CONTROLS_ROW_SX}>
            <Box sx={NAV_GROUP_SX}>
              <IconButton
                onClick={handlePrev}
                aria-label="Previous testimonial"
                size="small"
                sx={NAV_BUTTON_SX}
              >
                <ChevronLeft fontSize="small" />
              </IconButton>

              <Box sx={DOTS_GROUP_SX}>
                {feedbacks.map((feedback, index) => (
                  <Box
                    key={feedback.id}
                    component="button"
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                    aria-current={index === currentIndex}
                    sx={dotSx(index === currentIndex)}
                  />
                ))}
              </Box>

              <IconButton
                onClick={handleNext}
                aria-label="Next testimonial"
                size="small"
                sx={NAV_BUTTON_SX}
              >
                <ChevronRight fontSize="small" />
              </IconButton>
            </Box>

            <Typography sx={DISCLAIMER_SX}>Client identities remain private.</Typography>
          </Box>
        </Box>
      </SectionWrap>
    </Section>
  );
};
