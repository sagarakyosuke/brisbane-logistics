import { apiSlice } from '@/utilities/hooks/api/slice';

/* =====================================================================
 * Our Beginnings
 * ===================================================================== */

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

/* =====================================================================
 * Key Moments
 * ===================================================================== */

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

/* =====================================================================
 * Our Perspective
 * ===================================================================== */

export interface ApiOurPerspective {
  id: number;
  eyebrow: string;
  title: string;
  quote: string;
  authorName: string;
  authorRole: string;
  initials: string;
  image: string | null;
}

export interface OurPerspectiveResponse {
  perspective: ApiOurPerspective | null;
}

/* =====================================================================
 * API Endpoints
 * ===================================================================== */

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

    getOurPerspective: builder.query<OurPerspectiveResponse, void>({
      query: () => '/about-us/our-perspective',
      providesTags: ['AboutUs'],
    }),
  }),
});

export const { useGetOurBeginningsQuery, useGetKeyMomentsQuery, useGetOurPerspectiveQuery } =
  aboutUsStoriesApi;
