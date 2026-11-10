import type { ElementType } from 'react';

export interface UpdateItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  linkLabel: string;
  linkPath: string;
  image?: string;
  icon: ElementType;
}
