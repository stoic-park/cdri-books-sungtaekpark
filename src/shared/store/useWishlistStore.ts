import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description?: string;
}

interface WishlistStore {
  books: Book[];
  addBook: (book: Book) => void;
  removeBook: (bookId: string) => void;
  isWishlisted: (bookId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      books: [],
      addBook: book => {
        const { books } = get();
        if (!books.find(b => b.id === book.id)) {
          set({ books: [...books, book] });
        }
      },
      removeBook: bookId => {
        const { books } = get();
        set({ books: books.filter(book => book.id !== bookId) });
      },
      isWishlisted: bookId => {
        const { books } = get();
        return books.some(book => book.id === bookId);
      },
      clearWishlist: () => set({ books: [] }),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);
