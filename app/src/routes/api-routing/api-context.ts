import { createContext, useContext } from 'react';
import type { LatestResponse, PreviousResponse } from '@/pages/case-studies/sections/api-hook';
import type { 
  ClientFeedbacksResponse, 
  MoreClientFeedbacksResponse,
  ApiWhyClientsStayResponse
} from '@/pages/case-studies/client-testimonials/sections/api-hook';

/* =====================================================================
 * Types
 * ===================================================================== */

interface ApiData {
  latest: LatestResponse['latest'];
  previous: PreviousResponse['previous'];
  clientFeedbacks: ClientFeedbacksResponse['feedbacks'];
  moreClientFeedbacks: MoreClientFeedbacksResponse['feedbacks'];
  whyClientsStay: ApiWhyClientsStayResponse | null;
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