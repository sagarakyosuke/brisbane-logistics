/* =====================================================================
 * Types
 * ===================================================================== */

export interface MoreFeedback {
  id: number;
  quote: string;
  author: string;
  tag: string;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const moreClientFeedbacks: MoreFeedback[] = [
  {
    id: 1,
    quote:
      'Our orders go out on time and the team always lets us know if something needs our attention.',
    author: 'Online homewares store',
    tag: 'Pick & pack',
  },
  {
    id: 2,
    quote:
      'Having our containers unpacked and checked by the same team that stores our stock makes life easier.',
    author: 'Importer and wholesaler',
    tag: 'Container handling',
  },
  {
    id: 3,
    quote: 'We needed extra space for a seasonal run and it was sorted quickly.',
    author: 'Retail brand',
    tag: 'Warehousing',
  },
  {
    id: 4,
    quote: 'It is easy to reach someone who knows our account.',
    author: 'Small business',
    tag: 'Warehousing',
  },
  {
    id: 5,
    quote: 'They helped us move from dropshipping to holding our own stock.',
    author: 'Online store',
    tag: 'E-commerce fulfilment',
  },
  {
    id: 6,
    quote: 'A last-minute delivery was handled carefully and arrived in good shape.',
    author: 'Construction supplier',
    tag: 'Transport',
  },
];
