import { useMemo, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query';
import {
  useGetLatestCaseStudiesQuery,
  useGetPreviousCaseStudiesQuery,
  useGetClientFeedbacksQuery,
  useGetMoreClientFeedbacksQuery,
  useGetWhyClientsStayQuery,
  useGetArticlesQuery,
  useGetCompanyUpdatesQuery,
  useGetFeaturedGuideQuery,
  useGetBrowseByTopicQuery,
  useGetPracticalGuidesQuery,
  useGetWhatDoYouNeedQuery,
  useGetUsefulGuideQuery,
  useGetOverviewQuery,
  useGetWhatWeHandleQuery,
  useGetWhyChooseQuery,
  useGetOurBeginningsQuery,
  useGetKeyMomentsQuery,
  useGetMeetOurTeamQuery,
  useGetSeeTheTeamQuery,
} from '@/utilities/hooks/api';
import { showError } from '@/components/dialogs/alerts';
import { ApiContext } from './api-context';

/* =====================================================================
 * Route Configuration
 * ===================================================================== */

const PAGE_CONFIG = {
  '/case-studies': [
    'latest',
    'previous',
    'clientFeedbacks',
    'moreClientFeedbacks',
    'whyClientsStay',
  ],
  '/news-and-blogs': [
    'articles',
    'companyUpdates',
    'featuredGuide',
    'browseByTopic',
    'practicalGuides',
  ],
  '/faqs': ['whatDoYouNeed', 'usefulGuide'],
  '/about-us': [
    'overview',
    'whatWeHandle',
    'whyChoose',
    'ourBeginnings',
    'keyMoments',
    'meetOurTeam',
    'seeTheTeam',
  ],
} as const;

type PageKey = keyof typeof PAGE_CONFIG;

/* =====================================================================
 * ApiProvider
 * ===================================================================== */

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const currentPage = Object.keys(PAGE_CONFIG).find((path) =>
    location.pathname.startsWith(path),
  ) as PageKey | undefined;

  const shouldFetch = (endpoint: string) => {
    if (!currentPage) return false;
    return (PAGE_CONFIG[currentPage] as readonly string[]).includes(endpoint);
  };

  /* ── Queries ──────────────────────────────────────────────────────── */

  const latestQuery = useGetLatestCaseStudiesQuery(shouldFetch('latest') ? undefined : skipToken);
  const previousQuery = useGetPreviousCaseStudiesQuery(
    shouldFetch('previous') ? undefined : skipToken,
  );
  const clientFeedbacksQuery = useGetClientFeedbacksQuery(
    shouldFetch('clientFeedbacks') ? undefined : skipToken,
  );
  const moreClientFeedbacksQuery = useGetMoreClientFeedbacksQuery(
    shouldFetch('moreClientFeedbacks') ? undefined : skipToken,
  );
  const whyClientsStayQuery = useGetWhyClientsStayQuery(
    shouldFetch('whyClientsStay') ? undefined : skipToken,
  );

  const articlesQuery = useGetArticlesQuery(shouldFetch('articles') ? undefined : skipToken);
  const companyUpdatesQuery = useGetCompanyUpdatesQuery(
    shouldFetch('companyUpdates') ? undefined : skipToken,
  );
  const featuredGuideQuery = useGetFeaturedGuideQuery(
    shouldFetch('featuredGuide') ? undefined : skipToken,
  );
  const browseByTopicQuery = useGetBrowseByTopicQuery(
    shouldFetch('browseByTopic') ? undefined : skipToken,
  );
  const practicalGuidesQuery = useGetPracticalGuidesQuery(
    shouldFetch('practicalGuides') ? undefined : skipToken,
  );

  const whatDoYouNeedQuery = useGetWhatDoYouNeedQuery(
    shouldFetch('whatDoYouNeed') ? undefined : skipToken,
  );
  const usefulGuideQuery = useGetUsefulGuideQuery(
    shouldFetch('usefulGuide') ? undefined : skipToken,
  );

  const overviewQuery = useGetOverviewQuery(shouldFetch('overview') ? undefined : skipToken);
  const whatWeHandleQuery = useGetWhatWeHandleQuery(
    shouldFetch('whatWeHandle') ? undefined : skipToken,
  );
  const whyChooseQuery = useGetWhyChooseQuery(shouldFetch('whyChoose') ? undefined : skipToken);
  const ourBeginningsQuery = useGetOurBeginningsQuery(
    shouldFetch('ourBeginnings') ? undefined : skipToken,
  );
  const keyMomentsQuery = useGetKeyMomentsQuery(shouldFetch('keyMoments') ? undefined : skipToken);
  const meetOurTeamQuery = useGetMeetOurTeamQuery(
    shouldFetch('meetOurTeam') ? undefined : skipToken,
  );
  const seeTheTeamQuery = useGetSeeTheTeamQuery(shouldFetch('seeTheTeam') ? undefined : skipToken);

  const queries = [
    latestQuery,
    previousQuery,
    clientFeedbacksQuery,
    moreClientFeedbacksQuery,
    whyClientsStayQuery,
    articlesQuery,
    companyUpdatesQuery,
    featuredGuideQuery,
    browseByTopicQuery,
    practicalGuidesQuery,
    whatDoYouNeedQuery,
    usefulGuideQuery,
    overviewQuery,
    whatWeHandleQuery,
    whyChooseQuery,
    ourBeginningsQuery,
    keyMomentsQuery,
    meetOurTeamQuery,
    seeTheTeamQuery,
  ];

  /* ── Loading & Error States ───────────────────────────────────────── */

  const isError = queries.some((q) => q.isError);
  const isLoading = !isError && queries.some((q) => q.isLoading);

  /* ── Error Alert ──────────────────────────────────────────────────── */

  useEffect(() => {
    if (!isError || isLoading) return;

    showError({
      title: 'Failed to load data',
      text: 'We could not connect to the server. Please check your connection and try again.',
      confirmText: 'Dismiss',
      onRetry: () => {
        queries.forEach((q) => {
          if (q.isError) q.refetch();
        });
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isLoading]);

  /* ── Formatted Data ───────────────────────────────────────────────── */

  const formattedData = useMemo(() => {
    const hasAnyData = queries.some((q) => q.data);

    if (!hasAnyData) return null;

    return {
      latest: latestQuery.data?.latest ?? null,
      previous: previousQuery.data?.previous ?? [],
      clientFeedbacks: clientFeedbacksQuery.data?.feedbacks ?? [],
      moreClientFeedbacks: moreClientFeedbacksQuery.data?.feedbacks ?? [],
      whyClientsStay: whyClientsStayQuery.data ?? [],
      articles: articlesQuery.data?.articles ?? [],
      companyUpdates: companyUpdatesQuery.data?.updates ?? [],
      featuredGuide: featuredGuideQuery.data?.guide ?? null,
      browseByTopic: browseByTopicQuery.data ?? { title: '', topics: [] },
      practicalGuides: practicalGuidesQuery.data ?? { title: '', items: [] },
      whatDoYouNeed: whatDoYouNeedQuery.data ?? { title: '', subtitle: '', topics: [] },
      usefulGuide: usefulGuideQuery.data ?? { eyebrow: '', title: '', guides: [] },
      overview: overviewQuery.data?.overview ?? null,
      whatWeHandle: whatWeHandleQuery.data ?? { eyebrow: '', title: '', items: [] },
      whyChoose: whyChooseQuery.data ?? { eyebrow: '', title: '', values: [] },
      ourBeginnings: ourBeginningsQuery.data ?? {
        eyebrow: '',
        title: '',
        description1: '',
        description2: '',
        badge: '',
        values: [],
      },
      keyMoments: keyMomentsQuery.data ?? {
        eyebrow: '',
        title: '',
        subtitle: '',
        moments: [],
      },
      meetOurTeam: meetOurTeamQuery.data ?? {
        eyebrow: '',
        title: '',
        members: [],
      },
      seeTheTeam: seeTheTeamQuery.data ?? {
        eyebrow: '',
        title: '',
        videos: [],
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    latestQuery.data,
    previousQuery.data,
    clientFeedbacksQuery.data,
    moreClientFeedbacksQuery.data,
    whyClientsStayQuery.data,
    articlesQuery.data,
    companyUpdatesQuery.data,
    featuredGuideQuery.data,
    browseByTopicQuery.data,
    practicalGuidesQuery.data,
    whatDoYouNeedQuery.data,
    usefulGuideQuery.data,
    overviewQuery.data,
    whatWeHandleQuery.data,
    whyChooseQuery.data,
    ourBeginningsQuery.data,
    keyMomentsQuery.data,
    meetOurTeamQuery.data,
    seeTheTeamQuery.data,
  ]);

  /* ── Render ───────────────────────────────────────────────────────── */

  return (
    <ApiContext.Provider value={{ data: formattedData, isLoading, isError }}>
      {children}
    </ApiContext.Provider>
  );
};
