import { useQuery } from "@tanstack/react-query";
import { healthQueryKeys } from "./warmupQueryKeys";
import { getHealth } from "./warmupApi";

const MAX_RETRY_DELAY_MS = 4000;

export const useHealth = (enabled = true) => {
  const {
    isLoading: isLoadingHealth,
    isFetching: isFetchingHealth,
    isSuccess,
    error: errorHealth,
    data,
    failureCount,
  } = useQuery({
    queryKey: healthQueryKeys.all,
    queryFn: () => getHealth(),
    enabled,
    retry: true,
    retryDelay: (attemptIndex) =>
      Math.min(MAX_RETRY_DELAY_MS, 500 * Math.pow(1.35, attemptIndex)) +
      Math.floor(Math.random() * 250),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60_000,
  });

  const isHealthy = isSuccess && data === true;

  return {
    isLoadingHealth,
    isFetchingHealth,
    errorHealth,
    failureCount,
    isHealthy,
  };
};
