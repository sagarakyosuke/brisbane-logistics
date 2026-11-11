import { apiSlice } from '@/utilities/hooks/api/slice';

export interface ApiOverview {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaPath: string;
  image: string | null;
  imageAlt: string;
}

export interface OverviewResponse {
  overview: ApiOverview | null;
}

export interface ApiWhatWeHandleItem {
  id: string;
  title: string;
  desc: string;
  iconKey: string;
}

export interface WhatWeHandleResponse {
  eyebrow: string;
  title: string;
  items: ApiWhatWeHandleItem[];
}

export interface ApiWhyChooseItem {
  id: string;
  title: string;
  desc: string;
  iconKey: string;
}

export interface WhyChooseResponse {
  eyebrow: string;
  title: string;
  values: ApiWhyChooseItem[];
}

export const aboutUsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOverview: builder.query<OverviewResponse, void>({
      query: () => '/about-us/overview',
      providesTags: ['AboutUs'],
    }),
    getWhatWeHandle: builder.query<WhatWeHandleResponse, void>({
      query: () => '/about-us/what-we-handle',
      providesTags: ['AboutUs'],
    }),
    getWhyChoose: builder.query<WhyChooseResponse, void>({
      query: () => '/about-us/why-choose',
      providesTags: ['AboutUs'],
    }),
  }),
});

export const { useGetOverviewQuery, useGetWhatWeHandleQuery, useGetWhyChooseQuery } = aboutUsApi;
