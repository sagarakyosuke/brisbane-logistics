/* eslint-disable react-refresh/only-export-components */

export { apiSlice } from './slice';

export {
  useGetLatestCaseStudiesQuery,
  useGetPreviousCaseStudiesQuery,
  type LatestResponse,
  type PreviousResponse,
} from '@/pages/case-studies/sections/api-hook';

export {
  useGetTheResultQuery,
  type TheResultResponse,
} from '@/pages/case-studies/urgent-delivery/sections/api-hook';

export {
  useGetClientFeedbacksQuery,
  useGetMoreClientFeedbacksQuery,
  type ClientFeedbacksResponse,
  type MoreClientFeedbacksResponse,
} from '@/pages/case-studies/client-testimonials/sections/api-hook';

export {
  useGetArticlesQuery,
  type ArticlesResponse,
} from '@/pages/news-and-blogs/sections/api-hook';

export {
  useGetCompanyUpdatesQuery,
  type CompanyUpdatesResponse,
} from '@/pages/news-and-blogs/company-updates/sections/api-hook';

export {
  useGetFeaturedGuideQuery,
  useGetBrowseByTopicQuery,
  type FeaturedGuideResponse,
  type BrowseByTopicResponse,
} from '@/pages/news-and-blogs/guides-and-tips/sections/api-hook';
