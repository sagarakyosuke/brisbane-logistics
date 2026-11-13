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
  useGetWhyClientsStayQuery,
  type ClientFeedbacksResponse,
  type MoreClientFeedbacksResponse,
  type ApiWhyClientsStayResponse,
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
  useGetPracticalGuidesQuery,
  type FeaturedGuideResponse,
  type BrowseByTopicResponse,
  type PracticalGuidesResponse,
} from '@/pages/news-and-blogs/guides-and-tips/sections/api-hook';

export {
  useGetWhatDoYouNeedQuery,
  useGetUsefulGuideQuery,
  type FaqsResponse,
  type UsefulGuideResponse,
} from '@/pages/faqs/sections/api-hook';

export {
  useGetOverviewQuery,
  useGetWhatWeHandleQuery,
  useGetWhyChooseQuery,
  type OverviewResponse,
  type WhatWeHandleResponse,
  type WhyChooseResponse,
} from '@/pages/about-us/overview/sections/api-hook';

export {
  useGetOurBeginningsQuery,
  useGetKeyMomentsQuery,
  type OurBeginningsResponse,
  type KeyMomentsResponse,
} from '@/pages/about-us/our-stories/sections/api-hook';

export {
  useGetMeetOurTeamQuery,
  useGetSeeTheTeamQuery,
  type MeetOurTeamResponse,
  type SeeTheTeamResponse,
} from '@/pages/about-us/our-teams/sections/api-hook';

export {
  useGetWarehouseGalleriesQuery,
  useGetWarehouseDetailsQuery,
  type WarehouseGalleriesResponse,
  type WarehouseDetailsResponse,
} from '@/pages/about-us/warehouse-teams/sections/api-hook';