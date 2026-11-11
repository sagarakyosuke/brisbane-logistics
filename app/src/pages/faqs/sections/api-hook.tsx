import { apiSlice } from '@/utilities/hooks/api/slice';

export interface ApiFaqQuestion {
  question: string;
  answer: string;
}

export interface ApiFaqTopic {
  id: string;
  title: string;
  desc: string;
  iconKey: string;
  questions: ApiFaqQuestion[];
}

export interface FaqsResponse {
  title: string;
  subtitle: string;
  topics: ApiFaqTopic[];
}

export interface ApiUsefulGuideItem {
  id: string;
  title: string;
  desc: string;
  iconKey: string;
  path: string;
}

export interface UsefulGuideResponse {
  eyebrow: string;
  title: string;
  guides: ApiUsefulGuideItem[];
}

export const faqsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWhatDoYouNeed: builder.query<FaqsResponse, void>({
      query: () => '/faqs/what-do-you-need',
      providesTags: ['Faqs'],
    }),
    getUsefulGuide: builder.query<UsefulGuideResponse, void>({
      query: () => '/faqs/useful-guide',
      providesTags: ['Faqs'],
    }),
  }),
});

export const { useGetWhatDoYouNeedQuery, useGetUsefulGuideQuery } = faqsApi;
