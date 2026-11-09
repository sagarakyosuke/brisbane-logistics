import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  type SxProps,
  type Theme,
} from '@mui/material';
import { Search, Close, ArrowForward } from '@mui/icons-material';
import { Section, SectionWrap } from '@/components/sections';
import { Modal } from '@/components/dialogs/modals';
import { palette, shadows } from '@/utilities/themes';
import { articlesData, type ArticleItem } from '@/utilities/_mock/news-and-blogs/articles';

/* =====================================================================
 * Static styles
 * ===================================================================== */

const SEARCH_ROW_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: 4,
};

const SEARCH_INPUT_SX: SxProps<Theme> = {
  flex: 1,
  minWidth: 240,
  maxWidth: 400,
  '& .MuiOutlinedInput-root': {
    borderRadius: '999px',
    bgcolor: palette.white,
    '& fieldset': { borderColor: palette.line },
    '&:hover fieldset': { borderColor: palette.navy },
    '&.Mui-focused fieldset': { borderColor: palette.navy },
  },
};

const PILLS_SX: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  flexWrap: 'wrap',
};

const pillSx = (active: boolean): SxProps<Theme> => ({
  px: 2.5,
  py: 1,
  borderRadius: '999px',
  border: `1.5px solid ${active ? palette.navy : palette.line}`,
  bgcolor: active ? palette.navy : palette.white,
  color: active ? palette.white : palette.navy,
  fontWeight: 600,
  fontSize: '0.85rem',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    borderColor: palette.navy,
  },
});

/* ── Featured Post ────────────────────────────────────────────────── */

const FEATURED_POST_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
  bgcolor: palette.navy,
  color: palette.white,
  borderRadius: '18px',
  overflow: 'hidden',
  mb: 4,
  textDecoration: 'none',
  transition: 'transform 0.3s, box-shadow 0.3s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: shadows.base,
    '& .featured-img': { transform: 'scale(1.25)' },
  },
};

const FEATURED_IMG_WRAP_SX: SxProps<Theme> = {
  position: 'relative',
  minHeight: { xs: 200, md: 280 },
  overflow: 'hidden',
  bgcolor: palette.navySoft,
};

const FEATURED_IMG_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  position: 'absolute',
  inset: 0,
  transition: 'transform 0.4s ease',
  transform: 'scale(1.15)',
};

const FEATURED_CONTENT_SX: SxProps<Theme> = {
  p: { xs: 3, md: 5 },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const CAT_TAG_SX: SxProps<Theme> = {
  display: 'inline-block',
  bgcolor: palette.orange,
  color: palette.navy,
  px: 1.5,
  py: 0.5,
  borderRadius: '6px',
  fontSize: '0.75rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  mb: 2,
  alignSelf: 'flex-start',
};

/* ── Grid & Cards ─────────────────────────────────────────────────── */

const GRID_SX: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
  gap: 3,
};

const CARD_SX: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  bgcolor: palette.white,
  border: `1px solid ${palette.line}`,
  borderRadius: '16px',
  overflow: 'hidden',
  textDecoration: 'none',
  transition: 'transform 0.3s, box-shadow 0.3s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: shadows.base,
    '& .thumb-img': { transform: 'scale(1.25)' },
  },
};

const THUMB_WRAP_SX: SxProps<Theme> = {
  height: 200,
  width: '100%',
  overflow: 'hidden',
  bgcolor: palette.mist,
  position: 'relative',
};

const THUMB_IMG_SX: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
  transition: 'transform 0.4s ease',
  transform: 'scale(1.15)',
};

const CARD_BODY_SX: SxProps<Theme> = {
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
};

const CARD_CAT_SX: SxProps<Theme> = {
  fontSize: '0.7rem',
  fontWeight: 800,
  color: palette.orange,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  mb: 1,
};

const CARD_TITLE_SX: SxProps<Theme> = {
  fontSize: '1.15rem',
  fontWeight: 700,
  color: palette.navy,
  lineHeight: 1.4,
  mb: 1,
};

const CARD_DESC_SX: SxProps<Theme> = {
  fontSize: '0.9rem',
  color: palette.muted,
  lineHeight: 1.5,
  mb: 2,
  flexGrow: 1,
};

/* ── Modal Styles ─────────────────────────────────────────────────── */

const MODAL_HERO_SX: SxProps<Theme> = {
  height: 300,
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'flex-end',
  p: { xs: 3, md: 5 },
};

const MODAL_HERO_IMG_SX: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 0,
};

const MODAL_HERO_OVERLAY_SX: SxProps<Theme> = {
  position: 'absolute',
  inset: 0,
  background: `linear-gradient(0deg, ${palette.navyDeep} 0%, rgba(18,26,87,0.2) 100%)`,
  zIndex: 1,
};

const MODAL_CONTENT_SX: SxProps<Theme> = {
  p: { xs: 3, md: 5 },
  color: palette.ink,
};

const MODAL_CLOSE_SX: SxProps<Theme> = {
  position: 'absolute',
  top: 16,
  right: 16,
  bgcolor: 'rgba(255,255,255,0.2)',
  backdropFilter: 'blur(8px)',
  color: palette.white,
  zIndex: 10,
  '&:hover': { bgcolor: 'rgba(255,255,255,0.4)' },
};

/* =====================================================================
 * Component
 * ===================================================================== */

export const ArticlesSection = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  const categories = ['All', 'Warehousing', 'Fulfilment', 'Systems', 'Business Insights'];

  const filteredArticles = useMemo(() => {
    return articlesData.filter((article) => {
      const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const featured = filteredArticles.find((a) => a.isFeatured);
  const list = filteredArticles.filter((a) => !a.isFeatured);

  const handleCloseModal = () => setSelectedArticle(null);

  return (
    <>
      {/* ✅ FIXED: Force mist background with skipAlternate */}
      <Section tone="mist" skipAlternate>
        <SectionWrap>
          {/* Search & Filter Row */}
          <Box sx={SEARCH_ROW_SX}>
            <TextField
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={SEARCH_INPUT_SX}
              size="small"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: palette.muted }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Box sx={PILLS_SX}>
              {categories.map((cat) => (
                <Box
                  key={cat}
                  component="button"
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  sx={pillSx(activeCategory === cat)}
                >
                  {cat}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Featured Post */}
          {featured && (
            <Box onClick={() => setSelectedArticle(featured)} sx={FEATURED_POST_SX}>
              <Box sx={FEATURED_IMG_WRAP_SX}>
                <Box
                  component="img"
                  className="featured-img"
                  src={featured.image}
                  alt={featured.title}
                  sx={FEATURED_IMG_SX}
                />
              </Box>
              <Box sx={FEATURED_CONTENT_SX}>
                <Box sx={CAT_TAG_SX}>Featured Blog</Box>
                <Typography
                  component="h3"
                  sx={{ fontSize: { xs: '1.4rem', md: '2rem' }, fontWeight: 800, mb: 2 }}
                >
                  {featured.title}
                </Typography>
                <Typography sx={{ color: '#d4d8f3', mb: 3 }}>{featured.description}</Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontWeight: 700,
                    fontSize: '0.9rem',
                  }}
                >
                  Read blog <ArrowForward sx={{ fontSize: 16, color: palette.orange }} />
                </Box>
              </Box>
            </Box>
          )}

          {/* Article Grid */}
          {list.length > 0 ? (
            <Box sx={GRID_SX}>
              {list.map((article) => (
                <Box key={article.id} onClick={() => setSelectedArticle(article)} sx={CARD_SX}>
                  <Box sx={THUMB_WRAP_SX}>
                    <Box
                      component="img"
                      className="thumb-img"
                      src={article.image}
                      alt={article.title}
                      sx={THUMB_IMG_SX}
                    />
                  </Box>
                  <Box sx={CARD_BODY_SX}>
                    <Typography sx={CARD_CAT_SX}>{article.category}</Typography>
                    <Typography component="h4" sx={CARD_TITLE_SX}>
                      {article.title}
                    </Typography>
                    <Typography sx={CARD_DESC_SX}>{article.description}</Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        color: palette.navy,
                      }}
                    >
                      Read blog <ArrowForward sx={{ fontSize: 14, color: palette.orange }} />
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography sx={{ color: palette.muted }}>
                No articles match that search. Try another word or category.
              </Typography>
            </Box>
          )}
        </SectionWrap>
      </Section>

      {/* Custom Modal */}
      <Modal
        open={!!selectedArticle}
        onClose={handleCloseModal}
        size="md"
        hideHeader
        paperSx={{ overflow: 'hidden', borderRadius: '24px' }}
      >
        {selectedArticle && (
          <>
            <IconButton onClick={handleCloseModal} sx={MODAL_CLOSE_SX} aria-label="Close">
              <Close />
            </IconButton>

            <Box sx={MODAL_HERO_SX}>
              <Box
                component="img"
                src={selectedArticle.image}
                alt={selectedArticle.title}
                sx={MODAL_HERO_IMG_SX}
              />
              <Box sx={MODAL_HERO_OVERLAY_SX} />

              <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 600 }}>
                <Box sx={{ ...CAT_TAG_SX, mb: 2 }}>{selectedArticle.category}</Box>
                <Typography
                  component="h2"
                  sx={{
                    color: palette.white,
                    fontWeight: 800,
                    fontSize: { xs: '1.5rem', md: '2.2rem' },
                    lineHeight: 1.2,
                  }}
                >
                  {selectedArticle.title}
                </Typography>
              </Box>
            </Box>

            <Box sx={MODAL_CONTENT_SX}>
              <Typography
                sx={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  color: palette.navy,
                  mb: 3,
                  lineHeight: 1.6,
                }}
              >
                {selectedArticle.description}
              </Typography>
              <Typography
                sx={{
                  fontSize: '1rem',
                  color: palette.muted,
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line',
                }}
              >
                {selectedArticle.content}
              </Typography>
            </Box>
          </>
        )}
      </Modal>
    </>
  );
};
