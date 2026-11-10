import { Box, Typography, Divider, type SxProps, type Theme } from '@mui/material';
import { FormatQuote } from '@mui/icons-material';
import { Section, SectionWrap, SectionEyebrow } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { useApi } from '@/routes/api-routing/api-context';
import type { MoreFeedback } from '@/utilities/data/case-studies/client-testimonials/more-client-feedbacks';

/* =====================================================================
 * Static Styles
 * ===================================================================== */

const HEADER_WRAPPER_SX: SxProps<Theme> = {
  mb: 6,
};

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
  fontWeight: 800,
  color: palette.navy,
  lineHeight: 1.1,
  mt: 1,
};

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
  gap: 3,
  alignItems: 'stretch',
};

const CARD_SX: SxProps<Theme> = {
  position: 'relative',
  bgcolor: palette.white,
  border: `1px solid ${palette.line}`,
  borderRadius: '16px',
  p: 4,
  pt: 5,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 280,
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: 'var(--shadow-sm)',
  },
};

const TOP_RIGHT_TAG_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 16,
  right: 16,
  fontSize: '0.75rem',
  fontWeight: 600,
  color: palette.navy,
  bgcolor: palette.peach,
  px: 1.5,
  py: 0.5,
  borderRadius: '999px',
  whiteSpace: 'nowrap',
};

const QUOTE_ICON_SX: SxProps<Theme> = {
  fontSize: 36,
  color: palette.orange,
  mb: 2.5,
  display: 'block',
  transform: 'rotate(180deg)',
  lineHeight: 0,
};

const QUOTE_TEXT_SX: SxProps<Theme> = {
  fontSize: '1.05rem',
  fontWeight: 600,
  color: palette.navy,
  lineHeight: 1.6,
};

const CARD_FOOTER_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
  mt: 'auto',
  pt: 3,
};

const DIVIDER_SX: SxProps<Theme> = {
  borderColor: palette.line,
};

const AUTHOR_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  fontWeight: 700,
  color: palette.navy,
  lineHeight: 1.5,
};

const SAMPLE_BADGE_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignSelf: 'flex-start',
  px: 1.5,
  py: 0.5,
  borderRadius: '999px',
  border: `1px dashed ${palette.orange}`,
  color: palette.orange,
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
};

/* =====================================================================
 * MoreClientFeedbacksSection
 * ===================================================================== */

export const MoreClientFeedbacksSection = () => {
  const { data } = useApi();
  const feedbacks = (data?.moreClientFeedbacks || []) as MoreFeedback[];

  if (feedbacks.length === 0) return null;

  return (
    <Section skipAlternate={false}>
      <SectionWrap>
        <Box sx={HEADER_WRAPPER_SX}>
          <SectionEyebrow>More Client Feedback</SectionEyebrow>
          <Typography component="h2" sx={TITLE_SX}>
            From businesses we support.
          </Typography>
        </Box>

        <Box sx={GRID_SX}>
          {feedbacks.map((feedback) => (
            <Box key={feedback.id} sx={CARD_SX}>
              <Box sx={TOP_RIGHT_TAG_SX}>{feedback.tag}</Box>

              <Box>
                <FormatQuote sx={QUOTE_ICON_SX} />
                <Typography sx={QUOTE_TEXT_SX}>{feedback.quote}</Typography>
              </Box>

              <Box sx={CARD_FOOTER_SX}>
                <Divider sx={DIVIDER_SX} />
                <Typography sx={AUTHOR_SX}>{feedback.author}</Typography>
                <Box sx={SAMPLE_BADGE_SX}>Sample</Box>
              </Box>
            </Box>
          ))}
        </Box>
      </SectionWrap>
    </Section>
  );
};
