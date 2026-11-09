import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import { Link } from 'react-router';
import { Section, SectionWrap } from '@/components/sections';
import { palette } from '@/utilities/themes';
import { relatedPagesData } from '@/utilities/_mock/news-and-blogs/related-page';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const TITLE_SX: SxProps<Theme> = {
  fontSize: '1.1rem',
  fontWeight: 700,
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
  bgcolor: palette.mist,
  color: palette.navy,
  px: 2.5,
  py: 1.5,
  borderRadius: '999px',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '0.9rem',
  transition: 'all 0.2s',
  border: `1px solid ${palette.line}`,
  '&:hover': {
    bgcolor: palette.peach,
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
    <Section tight tone="default" skipAlternate>
      <SectionWrap>
        <Typography component="h3" sx={TITLE_SX}>
          Related pages
        </Typography>

        <Box sx={CHIPS_WRAPPER_SX}>
          {relatedPagesData.map((page) => {
            const Icon = page.icon;
            return (
              <Box key={page.title} component={Link} to={page.path} sx={CHIP_SX}>
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
