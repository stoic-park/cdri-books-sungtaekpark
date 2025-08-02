import { useQuery } from '@tanstack/react-query';
import { searchBooks } from '../services/search';
import { useSearchStore } from '../store/useSearchStore';

export const useSearchBooks = () => {
  const keyword = useSearchStore(state => state.keyword);

  return useQuery({
    queryKey: ['books', keyword],
    queryFn: () => searchBooks(keyword),
    enabled: !!keyword.trim(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
