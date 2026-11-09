/* =====================================================================
 * Types
 * ===================================================================== */

export interface ClientFeedback {
  id: number;
  quote: string;
  meta: string;
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const clientFeedbacks: ClientFeedback[] = [
  {
    id: 1,
    quote: 'We appreciate a team that listens, keeps us informed and helps us move forward.',
    meta: 'Sample testimonial · E-commerce retailer',
  },
  {
    id: 2,
    quote: 'Thank you for your support and attention to detail.',
    meta: 'Sample testimonial · Warehousing client',
  },
  {
    id: 3,
    quote: 'It is reassuring to know who to contact and what happens next.',
    meta: 'Sample testimonial · Import & wholesale',
  },
  {
    id: 4,
    quote: "We appreciate your team's practical support.",
    meta: 'Sample testimonial · Small business',
  },
];
