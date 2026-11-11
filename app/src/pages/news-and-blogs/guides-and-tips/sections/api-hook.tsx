import { apiSlice } from '@/utilities/hooks/api/slice';

export interface ApiQuoteServiceOption {
  id: string;
  label: string;
  iconKey: string;
}

export interface ApiFeaturedGuide {
  id: number;
  key: string;
  eyebrow: string;
  title: string;
  desc: string;
  iconKey: string;
  checklist: string[];
  modal: {
    step: string;
    title: string;
    subtitle: string;
    services: ApiQuoteServiceOption[];
  };
}

export interface ApiBrowseTopic {
  id: number;
  key: string;
  title: string;
  desc: string;
  iconKey: string;
  path: string;
}

export interface ApiPracticalGuide {
  id: string;
  question: string;
  answer: string;
}

export interface FeaturedGuideResponse {
  guide: ApiFeaturedGuide | null;
}

export interface BrowseByTopicResponse {
  title: string;
  topics: ApiBrowseTopic[];
}

export interface PracticalGuidesResponse {
  title: string;
  items: ApiPracticalGuide[];
}

export const guidesAndTipsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeaturedGuide: builder.query<FeaturedGuideResponse, void>({
      query: () => '/news-and-blogs/featured-guide',
      providesTags: ['NewsBlogs'],
    }),
    getBrowseByTopic: builder.query<BrowseByTopicResponse, void>({
      query: () => '/news-and-blogs/browse-by-topic',
      providesTags: ['NewsBlogs'],
    }),
    getPracticalGuides: builder.query<PracticalGuidesResponse, void>({
      query: () => '/news-and-blogs/practical-guides',
      providesTags: ['NewsBlogs'],
    }),
  }),
});

export const { useGetFeaturedGuideQuery, useGetBrowseByTopicQuery, useGetPracticalGuidesQuery } =
  guidesAndTipsApi;
