/* eslint-disable react-refresh/only-export-components */
export { apiSlice } from './slice';

export {
  caseStudiesApi,
  useGetLatestCaseStudiesQuery,
  useGetPreviousCaseStudiesQuery,
  type ApiCaseStudyPoint,
  type ApiCaseStudy,
  type ApiPreviousCaseStudy,
  type LatestResponse,
  type PreviousResponse,
} from '@/pages/case-studies/sections/api-hook';

export {
  theResultApi,
  useGetTheResultQuery,
  type TheResultResponse,
  type ResultStep,
} from '@/pages/case-studies/urgent-delivery/sections/api-hook';

export {
  clientFeedbacksApi,
  useGetClientFeedbacksQuery,
  useGetMoreClientFeedbacksQuery,
  type ApiClientFeedback,
  type ApiMoreClientFeedback,
  type ClientFeedbacksResponse,
  type MoreClientFeedbacksResponse,
} from '@/pages/case-studies/client-testimonials/sections/api-hook';