import { useInfiniteQuery } from '@tanstack/react-query';
import { searchBooks } from '../utils/search';

export const useSearchBooks = (searchKeyword?: string) => {
  return useInfiniteQuery({
    queryKey: ['books', searchKeyword],
    queryFn: ({ pageParam = 1 }) => searchBooks(searchKeyword!, pageParam),
    enabled: !!searchKeyword?.trim(),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 방지
    refetchOnMount: false, // 컴포넌트 마운트 시 재요청 방지
    refetchOnReconnect: false, // 네트워크 재연결 시 재요청 방지
    getNextPageParam: lastPage => {
      const { page, total, limit } = lastPage;
      const totalPages = Math.ceil(total / limit);
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
