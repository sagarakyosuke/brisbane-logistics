import { Business, Description, Forum, Groups } from '@mui/icons-material';
import type { ElementType } from 'react';

export interface RelatedPageItem {
  title: string;
  path: string;
  icon: ElementType;
}

export const relatedPagesData: RelatedPageItem[] = [
  { title: 'Our Services', path: '/services', icon: Business },
  { title: 'Case Studies', path: '/case-studies', icon: Description },
  { title: 'FAQs', path: '/faqs', icon: Forum },
  { title: 'About Us', path: '/about', icon: Groups },
];
