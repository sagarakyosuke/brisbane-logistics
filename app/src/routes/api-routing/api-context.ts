import { createContext, useContext } from 'react';
import type {
  LatestResponse,
  PreviousResponse,
  ClientFeedbacksResponse,
  MoreClientFeedbacksResponse,
  ApiWhyClientsStayResponse,
  ArticlesResponse,
  CompanyUpdatesResponse,
  FeaturedGuideResponse,
  BrowseByTopicResponse,
  PracticalGuidesResponse,
  FaqsResponse,
  UsefulGuideResponse,
  OverviewResponse,
  WhatWeHandleResponse,
  WhyChooseResponse,
  OurBeginningsResponse,
  KeyMomentsResponse,
} from '@/utilities/hooks/api';

/* =====================================================================
 * Types
 * ===================================================================== */

interface ApiData {
  latest: LatestResponse['latest'];
  previous: PreviousResponse['previous'];
  clientFeedbacks: ClientFeedbacksResponse['feedbacks'];
  moreClientFeedbacks: MoreClientFeedbacksResponse['feedbacks'];
  whyClientsStay: ApiWhyClientsStayResponse[];
  articles: ArticlesResponse['articles'];
  companyUpdates: CompanyUpdatesResponse['updates'];
  featuredGuide: FeaturedGuideResponse['guide'];
  browseByTopic: BrowseByTopicResponse;
  practicalGuides: PracticalGuidesResponse;
  whatDoYouNeed: FaqsResponse;
  usefulGuide: UsefulGuideResponse;
  overview: OverviewResponse['overview'];
  whatWeHandle: WhatWeHandleResponse;
  whyChoose: WhyChooseResponse;
  ourBeginnings: OurBeginningsResponse;
  keyMoments: KeyMomentsResponse;
}

export interface ApiContextValue {
  data: ApiData | null;
  isLoading: boolean;
  isError: boolean;
}

/* =====================================================================
 * Context & Hook
 * ===================================================================== */

export const ApiContext = createContext<ApiContextValue>({
  data: null,
  isLoading: false,
  isError: false,
});

export const useApi = () => useContext(ApiContext);
