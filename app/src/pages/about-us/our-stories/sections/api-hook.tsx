import { apiSlice } from '@/utilities/hooks/api/slice';

export interface ApiOurBeginningItem {
  id: string;
  title: string;
  desc: string;
  iconKey: string;
}

export interface OurBeginningsResponse {
  eyebrow: string;
  title: string;
  description1: string;
  description2: string;
  badge: string;
  values: ApiOurBeginningItem[];
}

export interface ApiKeyMomentItem {
  id: string;
  title: string;
  badge: string;
  iconKey: string;
}

export interface KeyMomentsResponse {
  eyebrow: string;
  title: string;
  subtitle: string;
  moments: ApiKeyMomentItem[];
}

export const aboutUsStoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOurBeginnings: builder.query<OurBeginningsResponse, void>({
      query: () => '/about-us/our-beginnings',
      providesTags: ['AboutUs'],
    }),
    getKeyMoments: builder.query<KeyMomentsResponse, void>({
      query: () => '/about-us/key-moments',
      providesTags: ['AboutUs'],
    }),
  }),
});

export const { useGetOurBeginningsQuery, useGetKeyMomentsQuery } = aboutUsStoriesApi;
