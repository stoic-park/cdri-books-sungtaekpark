import Typography from '../../../components/common/Typography';

import type { Book } from '../../../services/search';

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
  const handleLikeToggle = () => {
    onLikeToggle?.(book.id);
  };

  const handleViewDetail = () => {
    onViewDetail?.(book.id);
  };

  const handlePurchase = () => {
    onPurchase?.(book.id);
  };

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
        <button
          onClick={handlePurchase}
          className="px-md py-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          구매하기
        </button>
        <button
          onClick={handleViewDetail}
          className="flex items-center gap-sm px-md py-lg bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          <Typography variant="body1" color="text-secondary">
            상세보기
          </Typography>
          <img src="src/assets/icons/arrow_up_icon.svg" alt="arrow-up" />
        </button>
      </div>
    </div>
  );
};

export default BookListItem;
