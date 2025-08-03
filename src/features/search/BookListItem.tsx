import { memo, useCallback } from 'react';
import { Typography, Button } from '../../shared/components';

import type { Book } from '../../shared/utils/search';

interface BookListItemProps {
  book: Book;
  onLikeToggle?: (bookId: string) => void;
  onViewDetail?: (bookId: string) => void;
  onPurchase?: (bookId: string) => void;
}

const BookListItem = ({
  book,
  onLikeToggle,
  onViewDetail,
  onPurchase,
}: BookListItemProps) => {
  const handleLikeToggle = useCallback(() => {
    onLikeToggle?.(book.id);
  }, [book.id, onLikeToggle]);

  const handleViewDetail = useCallback(() => {
    onViewDetail?.(book.id);
  }, [book.id, onViewDetail]);

  const handlePurchase = useCallback(() => {
    if (book.url) {
      window.open(book.url, '_blank', 'noopener,noreferrer');
    }
    onPurchase?.(book.id);
  }, [book.url, book.id, onPurchase]);

  return (
    <div className="flex items-center gap-6 p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* 도서 이미지 및 좋아요 버튼 */}
      <div className="relative">
        <img
          src={book.cover}
          alt={book.title}
          className="w-12 h-16 object-cover rounded select-none pointer-events-none"
          draggable="false"
        />
        <button
          onClick={handleLikeToggle}
          className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center"
          aria-label={book.isLiked ? '좋아요 취소' : '좋아요'}
        >
          {book.isLiked ? (
            <img
              src="src/assets/icons/heart_fill.svg"
              alt="heart"
              className="w-6"
            />
          ) : (
            <img
              src="src/assets/icons/heart_line.svg"
              alt="heart"
              className="w-6"
            />
          )}
        </button>
      </div>

      {/* 도서 정보 */}
      <div className="flex-1">
        <Typography variant="title3" color="black" className="mb-1 font-bold">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text-secondary" className="mb-1">
          {book.author}
        </Typography>
        {book.publisher && (
          <Typography variant="small" color="text-subtitle">
            {book.publisher}
          </Typography>
        )}
      </div>

      {/* 가격 */}
      <div className="text-right">
        <Typography variant="body1" color="black" className="font-bold">
          {book.price ? `${book.price.toLocaleString()}원` : '가격 정보 없음'}
        </Typography>
      </div>

      {/* 액션 버튼들 */}
      <div className="flex gap-2">
        <Button
          variant={book.url ? 'primary' : 'secondary'}
          onClick={handlePurchase}
          disabled={!book.url}
          aria-label={book.url ? `${book.title} 구매하기` : '구매 링크 없음'}
          size="lg"
        >
          구매하기
        </Button>
        <Button
          variant="secondary"
          onClick={handleViewDetail}
          rightIcon={
            <img src="src/assets/icons/arrow_down_icon.svg" alt="arrow-down" />
          }
          size="lg"
        >
          상세보기
        </Button>
      </div>
    </div>
  );
};

export default memo(BookListItem);
