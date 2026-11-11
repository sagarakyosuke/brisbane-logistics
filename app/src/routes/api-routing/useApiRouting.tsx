import { useMemo, useEffect, type ReactNode } from 'react';
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
} from '@/utilities/hooks/api';
import { showError } from '@/components/dialogs/alerts';
import { ApiContext } from './api-context';

/* =====================================================================
 * ApiProvider
 * ===================================================================== */

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  /* ── Queries ──────────────────────────────────────────────────────── */

  const latestQuery = useGetLatestCaseStudiesQuery();
  const previousQuery = useGetPreviousCaseStudiesQuery();
  const clientFeedbacksQuery = useGetClientFeedbacksQuery();
  const moreClientFeedbacksQuery = useGetMoreClientFeedbacksQuery();
  const whyClientsStayQuery = useGetWhyClientsStayQuery();
  const articlesQuery = useGetArticlesQuery();
  const companyUpdatesQuery = useGetCompanyUpdatesQuery();
  const featuredGuideQuery = useGetFeaturedGuideQuery();
  const browseByTopicQuery = useGetBrowseByTopicQuery();
  const practicalGuidesQuery = useGetPracticalGuidesQuery();
  const whatDoYouNeedQuery = useGetWhatDoYouNeedQuery();
  const usefulGuideQuery = useGetUsefulGuideQuery();
  const overviewQuery = useGetOverviewQuery();
  const whatWeHandleQuery = useGetWhatWeHandleQuery();
  const whyChooseQuery = useGetWhyChooseQuery();
  const ourBeginningsQuery = useGetOurBeginningsQuery();
  const keyMomentsQuery = useGetKeyMomentsQuery();

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
  ];

  /* ── Loading & Error States ───────────────────────────────────────── */

  const isError = queries.some((q) => q.isError);
  const isLoading = isError ? false : queries.some((q) => q.isLoading);

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
  ]);

  /* ── Render ───────────────────────────────────────────────────────── */

  return (
    <ApiContext.Provider value={{ data: formattedData, isLoading, isError }}>
      {children}
    </ApiContext.Provider>
  );
};
