import { useMemo, useEffect, type ReactNode } from 'react';
import {
  useGetLatestCaseStudiesQuery,
  useGetPreviousCaseStudiesQuery,
} from '@/pages/case-studies/sections/api-hook';
import {
  useGetClientFeedbacksQuery,
  useGetMoreClientFeedbacksQuery,
  useGetWhyClientsStayQuery,
} from '@/pages/case-studies/client-testimonials/sections/api-hook';
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

  const queries = [
    latestQuery,
    previousQuery,
    clientFeedbacksQuery,
    moreClientFeedbacksQuery,
    whyClientsStayQuery,
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
      whyClientsStay: whyClientsStayQuery.data ?? null,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    latestQuery.data,
    previousQuery.data,
    clientFeedbacksQuery.data,
    moreClientFeedbacksQuery.data,
    whyClientsStayQuery.data,
  ]);

  /* ── Render ───────────────────────────────────────────────────────── */

  return (
    <ApiContext.Provider value={{ data: formattedData, isLoading, isError }}>
      {children}
    </ApiContext.Provider>
  );
};