import { apiSlice } from '@/utilities/hooks/api/slice';

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

export interface ClientFeedbacksResponse {
  feedbacks: ApiClientFeedback[];
}

export interface MoreClientFeedbacksResponse {
  feedbacks: ApiMoreClientFeedback[];
}

export const clientFeedbacksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClientFeedbacks: builder.query<ClientFeedbacksResponse, void>({
      query: () => '/case-studies/client-feedbacks',
      providesTags: ['CaseStudies'],
    }),
    getMoreClientFeedbacks: builder.query<MoreClientFeedbacksResponse, void>({
      query: () => '/case-studies/more-client-feedbacks',
      providesTags: ['CaseStudies'],
    }),
  }),
});

export const { 
  useGetClientFeedbacksQuery, 
  useGetMoreClientFeedbacksQuery 
} = clientFeedbacksApi;