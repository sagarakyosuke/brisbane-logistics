import type { ElementType } from 'react';

export interface TopicItem {
  id: number;
  key: string;
  title: string;
  desc: string;
  icon: ElementType;
  path: string;
}

export interface BrowseByTopicData {
  title: string;
  topics: TopicItem[];
}
