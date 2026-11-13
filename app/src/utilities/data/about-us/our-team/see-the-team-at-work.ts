export interface TeamVideo {
  id: string;
  title: string;
  videoUrl?: string | null;
}

export interface SeeTheTeamData {
  eyebrow: string;
  title: string;
  videos: TeamVideo[];
}
