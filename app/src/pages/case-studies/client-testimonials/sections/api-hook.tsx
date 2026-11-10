import { apiSlice } from '@/utilities/hooks/api/slice';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface ApiClientFeedback {
  id: number;
  quote: string;
  meta: string;
}

export interface ApiMoreClientFeedback {
  id: number;
  quote: string;
  author: string;
  tag: string;
}

export interface ApiWhyClientValue {
  id: string;
  title: string;
  description: string;
  iconKey: string;
}

export interface ApiWhyClientsStayResponse {
  eyebrow: string;
  title: string;
  values: ApiWhyClientValue[];
  cta: {
    title: string;
    description: string;
    linkLabel: string;
    linkHref: string;
    iconKey: string;
  };
}

export interface ClientFeedbacksResponse {
  feedbacks: ApiClientFeedback[];
}

export interface MoreClientFeedbacksResponse {
  feedbacks: ApiMoreClientFeedback[];
}

/* =====================================================================
 * Endpoints
 * ===================================================================== */

export const clientTestimonialsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClientFeedbacks: builder.query<ClientFeedbacksResponse, void>({
      query: () => '/case-studies/client-feedbacks',
      providesTags: ['CaseStudies'],
    }),
    getMoreClientFeedbacks: builder.query<MoreClientFeedbacksResponse, void>({
      query: () => '/case-studies/more-client-feedbacks',
      providesTags: ['CaseStudies'],
    }),
    getWhyClientsStay: builder.query<ApiWhyClientsStayResponse, void>({
      query: () => '/case-studies/why-clients-stay-with-us',
      providesTags: ['CaseStudies'],
    }),
  }),
});

export const { 
  useGetClientFeedbacksQuery, 
  useGetMoreClientFeedbacksQuery,
  useGetWhyClientsStayQuery
} = clientTestimonialsApi;