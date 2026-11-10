export interface ArticleItem {
  id: string;
  category: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  isFeatured?: boolean;
}
