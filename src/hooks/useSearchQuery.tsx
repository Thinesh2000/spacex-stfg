import {} from "react";
import { useQuery } from "@tanstack/react-query";

import type { UseQueryResult } from "@tanstack/react-query";

// Type definition for the props the hook will accept
interface SearchQuery<T> {
  query: string; // The search term input
  queryKey: string[]; // Unique query key for caching, should include identifying values like query
  queryFn: (value: string) => Promise<T>; // Async function that returns data based on the query
  enabled?: boolean;
}

// Constant to define the minimum number of characters required to trigger the search
// const MIN_QUERY_LENGTH = 3;

/**
 * Custom hook for performing search queries using React Query.
 * Only triggers the query if the input string is long enough (>= MIN_QUERY_LENGTH).
 */
const useSearchQuery = <T,>(props: SearchQuery<T>): UseQueryResult<T> => {
  return useQuery<T>({
    queryKey: props.queryKey, // Helps React Query cache/manage this query's data
    queryFn: () => props.queryFn(props.query), // Function to fetch data
    enabled: props.enabled ?? true, // Controls whether the query should run
    select: (data) => {
      return data; // Identity function — can transform/filter data if needed
    },
  });
};

export default useSearchQuery;
