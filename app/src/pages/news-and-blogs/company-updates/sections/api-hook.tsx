import { apiSlice } from '@/utilities/hooks/api/slice';

export interface ApiCompanyUpdate {
  id: string;
  category: string;
  title: string;
  desc: string;
  linkLabel: string;
  linkPath: string;
  image: string | null;
  iconKey: string;
}

export interface CompanyUpdatesResponse {
  updates: ApiCompanyUpdate[];
}

export const companyUpdatesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyUpdates: builder.query<CompanyUpdatesResponse, void>({
      query: () => '/news-and-blogs/company-updates',
      providesTags: ['NewsBlogs'],
    }),
  }),
});

export const { useGetCompanyUpdatesQuery } = companyUpdatesApi;
