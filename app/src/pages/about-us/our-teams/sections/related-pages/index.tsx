import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Link } from 'react-router';
import { Section, SectionWrap } from '@/components/sections';
import { palette } from '@/utilities/themes';
import {
  relatedPagesData,
  type RelatedPageItem,
} from '@/utilities/_mock/about-us/our-stories/related-pages';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const TITLE_SX: SxProps<Theme> = {
  fontSize: '1.15rem',
  fontWeight: 800,
  color: palette.navy,
  mb: 3,
};

const CHIPS_WRAPPER_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 1.5,
  flexWrap: 'wrap',
};

const CHIP_SX: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1.5,
  bgcolor: palette.peach, // Soft peach background matching the screenshot
  color: palette.navy,
  px: 3,
  py: 1.5,
  borderRadius: '999px',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '0.95rem',
  transition: 'all 0.2s',
  border: '1px solid transparent',
  '&:hover': {
    bgcolor: palette.white,
    borderColor: palette.orange,
    '& .chip-icon': { color: palette.orange },
  },
};

const ICON_SX: SxProps<Theme> = {
  fontSize: 20,
  color: palette.navy,
  transition: 'color 0.2s',
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const RelatedPagesSection = () => {
  return (
    // Uses odd/even background logic
    <Section skipAlternate={false}>
      <SectionWrap>
        <Typography component="h3" sx={TITLE_SX}>
          {relatedPagesData.title}
        </Typography>

        <Box sx={CHIPS_WRAPPER_SX}>
          {relatedPagesData.pages.map((page: RelatedPageItem) => {
            const Icon = page.icon;
            return (
              <Box key={page.id} component={Link} to={page.path} sx={CHIP_SX}>
                <Icon className="chip-icon" sx={ICON_SX} />
                {page.title}
              </Box>
            );
          })}
        </Box>
      </SectionWrap>
    </Section>
  );
};
