import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface WhyChooseValue {
  id: string;
  title: string;
  desc: string;
  icon: ElementType;
}

export interface WhyChooseData {
  eyebrow: string;
  title: string;
  values: WhyChooseValue[];
}
