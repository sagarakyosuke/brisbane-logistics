import type { ElementType } from 'react';

export interface TopicItem {
  id: number; // ✅ Changed to number
  key: string; // ✅ Added
  title: string;
  desc: string;
  icon: ElementType;
  path: string;
}

export interface BrowseByTopicData {
  title: string;
  topics: TopicItem[];
}
