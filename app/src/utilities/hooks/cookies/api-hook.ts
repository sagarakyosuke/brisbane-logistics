import { apiSlice } from '@/utilities/hooks/api/slice';

import type {
  CookieConsentResponse,
  SaveCookiePreferencesRequest,
  SaveCookiePreferencesResponse,
} from './types';

export const cookieApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCookieConsent: builder.query<CookieConsentResponse, void>({
      query: () => ({
        url: '/cookies/consent',
        method: 'GET',
      }),
      providesTags: ['Cookies'],
    }),

    saveCookieConsent: builder.mutation<
      SaveCookiePreferencesResponse,
      SaveCookiePreferencesRequest
    >({
      query: (body) => ({
        url: '/cookies/consent',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cookies'],
    }),

    updateCookieConsent: builder.mutation<
      SaveCookiePreferencesResponse,
      SaveCookiePreferencesRequest
    >({
      query: (body) => ({
        url: '/cookies/consent',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Cookies'],
    }),

    withdrawCookieConsent: builder.mutation<
      SaveCookiePreferencesResponse,
      void
    >({
      query: () => ({
        url: '/cookies/consent',
        method: 'DELETE',
      }),
      invalidatesTags: ['Cookies'],
    }),
  }),
});

export const {
  useGetCookieConsentQuery,
  useSaveCookieConsentMutation,
  useUpdateCookieConsentMutation,
  useWithdrawCookieConsentMutation,
} = cookieApi;