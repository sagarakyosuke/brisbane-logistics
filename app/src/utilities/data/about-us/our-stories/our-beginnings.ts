import type { ElementType } from 'react';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface OurBeginningsValue {
  id: string;
  title: string;
  desc: string;
  icon: ElementType;
}

export interface OurBeginningsData {
  eyebrow: string;
  title: string;
  description1: string;
  description2: string;
  badge: string;
  values: OurBeginningsValue[];
}
