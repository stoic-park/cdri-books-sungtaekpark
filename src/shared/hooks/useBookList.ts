import { useMemo } from 'react';
import type { Book, SearchResponse } from '../utils/search';

interface InfiniteQueryData {
  pages: SearchResponse[];
}

export const useBookList = (
  currentData: InfiniteQueryData | undefined,
  isLiked: (bookId: string) => boolean
) => {
  const allBooks = useMemo(
    () =>
      currentData?.pages.flatMap((page: SearchResponse) => page.books) || [],
    [currentData?.pages]
  );

  const booksWithLikeStatus = useMemo(
    () =>
      allBooks.map((book: Book) => ({
        ...book,
        isLiked: isLiked(book.id),
      })),
    [allBooks, isLiked]
  );

  const totalResults = useMemo(
    () => currentData?.pages[0]?.total || 0,
    [currentData?.pages]
  );

  return {
    allBooks,
    booksWithLikeStatus,
    totalResults,
  };
};
