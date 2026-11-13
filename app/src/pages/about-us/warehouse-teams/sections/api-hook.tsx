import { apiSlice } from '@/utilities/hooks/api/slice';

export interface ApiGalleryImage {
  id: number;
  key: string;
  label: string;
  image: string | null;
  gridArea: string;
}

export interface WarehouseGalleriesResponse {
  images: ApiGalleryImage[];
}

export interface ApiWarehouseDetail {
  id: number;
  key: string;
  title: string;
  desc: string;
  iconKey: string;
}

export interface WarehouseDetailsResponse {
  details: ApiWarehouseDetail[];
}

export const aboutUsWarehouseTeamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWarehouseGalleries: builder.query<WarehouseGalleriesResponse, void>({
      query: () => '/about-us/warehouse-galleries',
      providesTags: ['AboutUs'],
    }),
    getWarehouseDetails: builder.query<WarehouseDetailsResponse, void>({
      query: () => '/about-us/warehouse-details',
      providesTags: ['AboutUs'],
    }),
  }),
});

export const {
  useGetWarehouseGalleriesQuery,
  useGetWarehouseDetailsQuery,
} = aboutUsWarehouseTeamsApi;