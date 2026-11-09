import { Box } from '@mui/material';
import { NewsAndBlogsHeroSection } from '@/pages/news-and-blogs/sections/hero';
import { ArticlesSection } from '@/pages/news-and-blogs/sections/articles';
import { NewsBlogsTabs } from '@/components/extras/news-blogs-tabs';
import { RelatedPagesSection } from '@/pages/news-and-blogs/sections/related-pages';
import { CtaBand } from '@/reusables/cta';
import { newsAndBlogsHeroData } from '@/utilities/_mock/news-and-blogs/hero';

const NewsAndBlogsPage = () => {
  return (
    <Box component="main">
      <NewsAndBlogsHeroSection data={newsAndBlogsHeroData} />
      <NewsBlogsTabs />
      <ArticlesSection />
      <RelatedPagesSection />
      <CtaBand />
    </Box>
  );
};

export default NewsAndBlogsPage;
