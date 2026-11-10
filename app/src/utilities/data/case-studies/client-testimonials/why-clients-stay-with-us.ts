import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface WhyClientValue {
  id: string;
  key: string;
  title: string;
  description: string;
  icon: ElementType;
}

export interface WhyClientsStayData {
  eyebrow: string;
  title: string;
  values: WhyClientValue[];
  cta: {
    title: string;
    description: string;
    linkLabel: string;
    linkHref: string;
    icon: ElementType;
  };
}
