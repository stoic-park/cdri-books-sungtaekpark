import { useState, useCallback, memo } from 'react';
import BookListItem from './BookListItem';
import BookListItemDetail from './BookListItemDetail';

import type { Book } from '../../shared/utils/search';

interface BookItemProps {
  book: Book;
  onLikeToggle?: (bookId: string) => void;
  onViewDetail?: (bookId: string) => void;
  onPurchase?: (bookId: string) => void;
}

const BookItem = ({
  book,
  onLikeToggle,
  onViewDetail,
  onPurchase,
}: BookItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleViewDetail = useCallback(() => {
    setIsExpanded(prev => !prev);
    onViewDetail?.(book.id);
  }, [book.id, onViewDetail]);

  return (
    <div className="border-b border-border">
      <div className="transition-all duration-500 ease-in-out transform">
        {isExpanded ? (
          <div className="animate-in slide-in-from-top-2 duration-300">
            <BookListItemDetail
              book={book}
              onLikeToggle={onLikeToggle}
              onViewDetail={handleViewDetail}
              onPurchase={onPurchase}
            />
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-2 duration-300">
            <BookListItem
              book={book}
              onLikeToggle={onLikeToggle}
              onViewDetail={handleViewDetail}
              onPurchase={onPurchase}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(BookItem);
