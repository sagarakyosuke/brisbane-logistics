// import sampleImage from '@/assets/hero/warehouse-interior-a1.jpg';

/* =====================================================================
 * Types
 * ===================================================================== */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: 'navy' | 'orange';
  image?: string; // Optional — falls back to placeholder if undefined
}

export interface MeetOurTeamData {
  eyebrow: string;
  title: string;
  members: TeamMember[];
}