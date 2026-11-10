import { createContext, useContext } from 'react';
import type { LatestResponse, PreviousResponse } from '@/pages/case-studies/sections/api-hook';
import type {
  ClientFeedbacksResponse,
  MoreClientFeedbacksResponse,
  ApiWhyClientsStayResponse,
} from '@/pages/case-studies/client-testimonials/sections/api-hook';
import type { ArticlesResponse } from '@/pages/news-and-blogs/sections/api-hook';
import type { CompanyUpdatesResponse } from '@/pages/news-and-blogs/company-updates/sections/api-hook';
import type {
  FeaturedGuideResponse,
  BrowseByTopicResponse,
} from '@/pages/news-and-blogs/guides-and-tips/sections/api-hook';

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
