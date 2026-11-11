import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface FaqQuestion {
  question: string;
  answer: string;
}

export interface TopicItem {
  id: string;
  title: string;
  desc: string;
  icon: ElementType;
  questions: FaqQuestion[];
}

export interface WhatDoYouNeedData {
  title: string;
  subtitle: string;
  topics: TopicItem[];
}
