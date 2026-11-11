/* =====================================================================
 * Types
 * ===================================================================== */

export interface TeamVideo {
  id: string;
  title: string;
  videoUrl?: string; // Optional — falls back to placeholder if undefined
}

export interface SeeTheTeamData {
  eyebrow: string;
  title: string;
  videos: TeamVideo[];
}

/* =====================================================================
 * Data
 * ===================================================================== */

export const seeTheTeamData: SeeTheTeamData = {
  eyebrow: 'See the team at work',
  title: 'A closer look at our people and operations.',
  videos: [
    {
      id: 'order-prep',
      title: 'Order preparation at work',
      // videoUrl: 'https://www.youtube.com/embed/...', // Uncomment to add
    },
    {
      id: 'warehouse-ops',
      title: 'Inside daily warehouse operations',
      // videoUrl: 'https://www.youtube.com/embed/...', // Uncomment to add
    },
  ],
};
