import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router';
import { Section, SectionWrap } from '@/components/sections';
import { palette, shadows } from '@/utilities/themes';
import {
  browseByTopicData,
  type TopicItem,
} from '@/utilities/_mock/news-and-blogs/guides-and-tips/browse-by-topic';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const TITLE_SX: SxProps<Theme> = {
  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
  fontWeight: 800,
  color: palette.navy,
  mb: 4,
};

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
  gap: 3,
};

const CARD_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  bgcolor: palette.white,
  p: 3,
  borderRadius: '16px',
  border: `1px solid ${palette.line}`,
  textDecoration: 'none',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: shadows.base,
    '& .arrow-icon': { transform: 'translateX(4px)' },
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

const CARD_TITLE_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  fontWeight: 700,
  color: palette.navy,
  mb: 1,
};

const CARD_DESC_SX: SxProps<Theme> = {
  fontSize: '0.95rem',
  color: palette.muted,
  lineHeight: 1.5,
  mb: 3,
  flexGrow: 1,
};

const LINK_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  fontWeight: 700,
  fontSize: '0.9rem',
  color: palette.navy,
};

const ARROW_SX: SxProps<Theme> = {
  fontSize: 18,
  color: palette.orange,
  transition: 'transform 0.2s',
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const BrowseByTopicSection = () => {
  return (
    <Section tone="mist" skipAlternate>
      <SectionWrap>
        <Typography component="h2" sx={TITLE_SX}>
          {browseByTopicData.title}
        </Typography>

        <Box sx={GRID_SX}>
          {browseByTopicData.topics.map((topic: TopicItem) => {
            const Icon = topic.icon;

            return (
              <Box key={topic.id} component={Link} to={topic.path} sx={CARD_SX}>
                <Box sx={ICON_BOX_SX}>
                  <Icon fontSize="medium" />
                </Box>

                <Typography component="h3" sx={CARD_TITLE_SX}>
                  {topic.title}
                </Typography>

                <Typography sx={CARD_DESC_SX}>{topic.desc}</Typography>

                <Box sx={LINK_SX}>
                  Explore
                  <ArrowForward className="arrow-icon" sx={ARROW_SX} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </SectionWrap>
    </Section>
  );
};
