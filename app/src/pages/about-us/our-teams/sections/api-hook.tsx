import { apiSlice } from '@/utilities/hooks/api/slice';

export interface ApiTeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: 'navy' | 'orange';
  image: string | null;
}

export interface MeetOurTeamResponse {
  eyebrow: string;
  title: string;
  members: ApiTeamMember[];
}

export interface ApiTeamVideo {
  id: string;
  title: string;
  videoUrl: string | null;
}

export interface SeeTheTeamResponse {
  eyebrow: string;
  title: string;
  videos: ApiTeamVideo[];
}

export const aboutUsTeamsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMeetOurTeam: builder.query<MeetOurTeamResponse, void>({
      query: () => '/about-us/meet-our-team',
      providesTags: ['AboutUs'],
    }),
    getSeeTheTeam: builder.query<SeeTheTeamResponse, void>({
      query: () => '/about-us/see-the-team',
      providesTags: ['AboutUs'],
    }),
  }),
});

export const { useGetMeetOurTeamQuery, useGetSeeTheTeamQuery } = aboutUsTeamsApi;
