export interface PracticalGuideItem {
  id: string;
  question: string;
  answer: string;
}

export interface PracticalGuidesData {
  title: string;
  items: PracticalGuideItem[];
}
