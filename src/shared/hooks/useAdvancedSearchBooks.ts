import { useInfiniteQuery } from '@tanstack/react-query';
import { advancedSearchBooks } from '../utils/search';
import type { SearchCondition } from '../types/search';

export const useAdvancedSearchBooks = (conditions: SearchCondition[]) => {
  return useInfiniteQuery({
    queryKey: ['advancedBooks', conditions],
    queryFn: ({ pageParam = 1 }) => advancedSearchBooks(conditions, pageParam),
    enabled:
      conditions.length > 0 &&
      conditions.some(condition => condition.value.trim()),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 방지
    refetchOnMount: false, // 컴포넌트 마운트 시 재요청 방지
    refetchOnReconnect: false, // 네트워크 재연결 시 재요청 방지
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / lastPage.limit);
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
  });
};
