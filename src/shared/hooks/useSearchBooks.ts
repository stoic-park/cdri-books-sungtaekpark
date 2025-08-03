import { useInfiniteQuery } from '@tanstack/react-query';
import { searchBooks } from '../utils/search';

export const useSearchBooks = (searchKeyword?: string) => {
  return useInfiniteQuery({
    queryKey: ['books', searchKeyword],
    queryFn: ({ pageParam = 1 }) => searchBooks(searchKeyword!, pageParam),
    enabled: !!searchKeyword?.trim(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    getNextPageParam: lastPage => {
      const { page, total, limit } = lastPage;
      const totalPages = Math.ceil(total / limit);
      // 마지막 페이지에 도달했을 때 undefined를 반환하여 더 이상 로드하지 않음
      return page < totalPages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
