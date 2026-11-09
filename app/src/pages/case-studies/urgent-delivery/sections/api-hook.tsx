import { apiSlice } from '@/utilities/hooks/api/slice';

export interface ResultStep {
  step: string;
  title: string;
  desc: string;
}

export interface TheResultResponse {
  challenge: { title: string; desc: string };
  response: { title: string; steps: ResultStep[] };
  result: {
    eyebrow: string;
    iconKey: string;
    title: string;
    subtitle: string;
    points: string[];
  };
  images: { main: string | null; topRight: string | null; bottomRight: string | null };
}

export const theResultApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTheResult: builder.query<TheResultResponse, void>({
      query: () => '/case-studies/the-result',
      providesTags: ['CaseStudies'],
    }),
  }),
});

export const { useGetTheResultQuery } = theResultApi;