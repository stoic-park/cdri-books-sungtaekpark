import { useState, useEffect } from 'react';
import type { Book } from '../utils/search';

const WISHLIST_STORAGE_KEY = 'likedBooks';

export const useWishlist = () => {
  const [likedBooks, setLikedBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // localStorage에서 찜한 책 목록 불러오기
  useEffect(() => {
    const loadLikedBooks = () => {
      try {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (stored) {
          const books = JSON.parse(stored);
          setLikedBooks(books);
        }
      } catch (error) {
        console.error('찜한 책 목록 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLikedBooks();
  }, []);

  // 찜하기 토글
  const toggleLike = (book: Book) => {
    setLikedBooks(prev => {
      const isLiked = prev.some(likedBook => likedBook.id === book.id);
      let newBooks: Book[];

      if (isLiked) {
        // 찜하기 취소
        newBooks = prev.filter(likedBook => likedBook.id !== book.id);
      } else {
        // 찜하기 추가
        newBooks = [...prev, { ...book, isLiked: true }];
      }

      // localStorage 업데이트
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newBooks));
      return newBooks;
    });
  };

  // 찜하기 취소
  const removeFromWishlist = (bookId: string) => {
    setLikedBooks(prev => {
      const newBooks = prev.filter(book => book.id !== bookId);
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newBooks));
      return newBooks;
    });
  };

  // 찜하기 상태 확인
  const isLiked = (bookId: string) => {
    return likedBooks.some(book => book.id === bookId);
  };

  // 찜한 책 개수
  const likedCount = likedBooks.length;

  return {
    likedBooks,
    isLoading,
    toggleLike,
    removeFromWishlist,
    isLiked,
    likedCount,
  };
};
