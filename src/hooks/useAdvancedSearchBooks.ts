import { useInfiniteQuery } from '@tanstack/react-query';
import { advancedSearchBooks } from '../services/search';
import type { SearchCondition } from '../types/search';

export const useAdvancedSearchBooks = (conditions: SearchCondition[]) => {
  return useInfiniteQuery({
    queryKey: ['advancedBooks', conditions],
    queryFn: ({ pageParam = 1 }) => advancedSearchBooks(conditions, pageParam),
    enabled:
      conditions.length > 0 &&
      conditions.some(condition => condition.value.trim()),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / lastPage.limit);
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });
};
