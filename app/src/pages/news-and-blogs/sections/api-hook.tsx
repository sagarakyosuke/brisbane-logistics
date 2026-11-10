import { apiSlice } from '@/utilities/hooks/api/slice';

export interface ApiArticle {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  content: string;
  image: string | null;
  isFeatured: boolean;
}

export interface ArticlesResponse {
  articles: ApiArticle[];
}

export const newsBlogsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesResponse, void>({
      query: () => '/news-and-blogs/articles',
      providesTags: ['NewsBlogs'],
    }),
  }),
});

export const { useGetArticlesQuery } = newsBlogsApi;
