import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface ResponseStep {
  step: string;
  title: string;
  desc: string;
}

export interface TheResultData {
  challenge: {
    title: string;
    desc: string;
  };
  response: {
    title: string;
    steps: ResponseStep[];
  };
  result: {
    eyebrow: string;
    icon: ElementType;
    title: string;
    subtitle: string;
    points: string[];
  };
  images: {
    main: string;
    topRight: string;
    bottomRight: string;
  };
}
