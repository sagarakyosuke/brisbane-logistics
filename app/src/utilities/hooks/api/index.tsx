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