import { createContext, useContext, useMemo, useEffect, type ReactNode } from 'react';
import { 
  useGetLatestCaseStudiesQuery, 
  useGetPreviousCaseStudiesQuery,
  type LatestResponse,
  type PreviousResponse 
} from '@/pages/case-studies/sections/api-hook';
import { showError } from '@/components/dialogs/alerts';

interface ApiData {
  latest: LatestResponse['latest'];
  previous: PreviousResponse['previous'];
}

interface ApiContextValue {
  data: ApiData | null;
  isLoading: boolean;
  isError: boolean;
}

const ApiContext = createContext<ApiContextValue>({
  data: null,
  isLoading: false,
  isError: false,
});

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const latestQuery = useGetLatestCaseStudiesQuery();
  const previousQuery = useGetPreviousCaseStudiesQuery();

  const isError = latestQuery.isError || previousQuery.isError;
  
  const isLoading = isError ? false : (latestQuery.isLoading || previousQuery.isLoading);

  useEffect(() => {
    if (isError && !isLoading) {
      showError({
        title: 'Failed to load data',
        text: 'We could not connect to the Brisbane Logistics server. Please check your connection and try again.',
        confirmText: 'Dismiss',
        onRetry: () => {
          if (latestQuery.isError) latestQuery.refetch();
          if (previousQuery.isError) previousQuery.refetch();
        },
      });
    }
  }, [isError, isLoading, latestQuery, previousQuery]);

  const formattedData = useMemo((): ApiData | null => {
    if (!latestQuery.data && !previousQuery.data) return null;
    return {
      latest: latestQuery.data?.latest || null,
      previous: previousQuery.data?.previous || [],
    };
  }, [latestQuery.data, previousQuery.data]);

  return (
    <ApiContext.Provider value={{ data: formattedData, isLoading, isError }}>
      {children}
    </ApiContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApi = () => useContext(ApiContext);