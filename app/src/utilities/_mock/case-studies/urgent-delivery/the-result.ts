import { AccessTime } from '@mui/icons-material';
import type { ElementType } from 'react';

import casesDeliveredImg from '@/assets/home/Cases delivered to the project site.jpg';
import casesWrappedImg from '@/assets/home/Cases wrapped and strapped in the van.jpg';
import tileCasesImg from '@/assets/home/Tile cases loaded and ready to leave.jpg';

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

/* =====================================================================
 * Data
 * ===================================================================== */

export const theResultData: TheResultData = {
  challenge: {
    title: 'The challenge',
    desc: 'The client needed fragile tile cases on site early the next morning after other providers were unable to complete the delivery. Each case weighed about 32 kilograms and needed careful handling and manual unloading.',
  },
  response: {
    title: 'Our response',
    steps: [
      {
        step: '1',
        title: 'Dedicated vehicle and crew',
        desc: 'A dedicated vehicle was arranged, with Andy and Mitch assigned to the delivery.',
      },
      {
        step: '2',
        title: 'Secure collection',
        desc: 'The freight was collected at about 6:30 am, checked, wrapped and securely strapped.',
      },
      {
        step: '3',
        title: 'Careful site delivery',
        desc: 'The team travelled into Brisbane CBD and unloaded the cases by hand at the project site.',
      },
    ],
  },
  result: {
    eyebrow: 'The result',
    icon: AccessTime,
    title: 'Around 2 hours early',
    subtitle: 'Delivery completed at about 7:20 am.',
    points: [
      'All cases arrived safely and intact.',
      'The early arrival helped tradespeople begin work sooner.',
    ],
  },
  images: {
    main: tileCasesImg,
    topRight: casesDeliveredImg,
    bottomRight: casesWrappedImg,
  },
};
