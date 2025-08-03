import { useMemo } from 'react';
import type { SearchCondition } from '../types/search';
import type { SearchResponse } from '../utils/search';

interface InfiniteQueryData {
  pages: SearchResponse[];
}

interface SearchModeData {
  data: InfiniteQueryData | undefined;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

export const useSearchMode = (
  searchData: SearchModeData,
  advancedSearchData: SearchModeData,
  advancedSearchConditions: SearchCondition[]
) => {
  const isAdvancedSearchMode = useMemo(
    () => advancedSearchConditions.length > 0,
    [advancedSearchConditions.length]
  );

  const currentData = useMemo(
    () => (isAdvancedSearchMode ? advancedSearchData.data : searchData.data),
    [isAdvancedSearchMode, advancedSearchData.data, searchData.data]
  );

  const currentError = useMemo(
    () => (isAdvancedSearchMode ? advancedSearchData.error : searchData.error),
    [isAdvancedSearchMode, advancedSearchData.error, searchData.error]
  );

  const currentFetchNextPage = useMemo(
    () =>
      isAdvancedSearchMode
        ? advancedSearchData.fetchNextPage
        : searchData.fetchNextPage,
    [
      isAdvancedSearchMode,
      advancedSearchData.fetchNextPage,
      searchData.fetchNextPage,
    ]
  );

  const currentHasNextPage = useMemo(
    () =>
      isAdvancedSearchMode
        ? advancedSearchData.hasNextPage
        : searchData.hasNextPage,
    [
      isAdvancedSearchMode,
      advancedSearchData.hasNextPage,
      searchData.hasNextPage,
    ]
  );

  const currentIsFetchingNextPage = useMemo(
    () =>
      isAdvancedSearchMode
        ? advancedSearchData.isFetchingNextPage
        : searchData.isFetchingNextPage,
    [
      isAdvancedSearchMode,
      advancedSearchData.isFetchingNextPage,
      searchData.isFetchingNextPage,
    ]
  );

  return {
    isAdvancedSearchMode,
    currentData,
    currentError,
    currentFetchNextPage,
    currentHasNextPage,
    currentIsFetchingNextPage,
  };
};
