import type { ElementType } from 'react';

export interface QuoteServiceOption {
  id: string;
  label: string;
  icon: ElementType;
}

export interface FeaturedGuideData {
  eyebrow: string;
  title: string;
  desc: string;
  icon: ElementType;
  checklist: string[];
  modal: {
    step: string;
    title: string;
    subtitle: string;
    services: QuoteServiceOption[];
  };
}
