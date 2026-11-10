import { apiSlice } from '@/utilities/hooks/api/slice';

export interface ApiCaseStudyPoint {
  id: number;
  label: string;
  desc: string;
  iconKey: string;
}

export interface ApiCaseStudy {
  id: string;
  tag: string;
  title: string;
  description: string;
  path: string;
  images: { main: string | null; topRight: string | null; bottomRight: string | null };
  points: ApiCaseStudyPoint[];
}

export interface ApiPreviousCaseStudy {
  id: string;
  category: string;
  title: string;
  description: string;
  status: string;
  iconKey: string;
  image: string | null;
  path: string;
}

export interface LatestResponse {
  latest: ApiCaseStudy | null;
}
export interface PreviousResponse {
  previous: ApiPreviousCaseStudy[];
}

export const caseStudiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLatestCaseStudies: builder.query<LatestResponse, void>({
      query: () => '/case-studies/latest-case-studies',
      providesTags: ['CaseStudies'],
    }),
    getPreviousCaseStudies: builder.query<PreviousResponse, void>({
      query: () => '/case-studies/previous-case-studies',
      providesTags: ['CaseStudies'],
    }),
  }),
});

export const { useGetLatestCaseStudiesQuery, useGetPreviousCaseStudiesQuery } = caseStudiesApi;
