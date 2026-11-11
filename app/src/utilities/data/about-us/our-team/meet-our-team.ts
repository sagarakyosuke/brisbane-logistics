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

/* =====================================================================
 * Data
 * ===================================================================== */

export const meetOurTeamData: MeetOurTeamData = {
  eyebrow: 'Meet our team',
  title: 'Meet your Brisbane Logistics team.',
  members: [
    {
      id: 'emily',
      name: 'Emily Jackman',
      role: 'Owner',
      initials: 'EJ',
      color: 'navy',
    },
    {
      id: 'andrew-w',
      name: 'Andrew Wall',
      role: 'Operations Manager',
      initials: 'AW',
      color: 'orange',
      //   image: sampleImage,
    },
    {
      id: 'andrew-p',
      name: 'Andrew Peal',
      role: 'ICT Manager',
      initials: 'AP',
      color: 'navy',
    },
    {
      id: 'dave',
      name: 'Dave Cañeda',
      role: 'Operations Assistant Team Lead',
      initials: 'DC',
      color: 'navy',
    },
    {
      id: 'geralyn',
      name: 'Geralyn Canoy',
      role: 'Operations Assistant',
      initials: 'GC',
      color: 'orange',
    },
    {
      id: 'cecile',
      name: 'Cecile Sybico',
      role: 'Account Administrator',
      initials: 'CS',
      color: 'navy',
    },
    {
      id: 'crisleyn',
      name: 'Crisleyn Gabayan',
      role: 'Account Administrator',
      initials: 'CG',
      color: 'navy',
    },
  ],
};
