import Typography from '../../../components/common/Typography';

import type { Book } from '../../../services/search';

interface BookListItemDetailProps {
  book: Book;
  onLikeToggle?: (bookId: string) => void;
  onViewDetail?: (bookId: string) => void;
  onPurchase?: (bookId: string) => void;
}

const BookListItemDetail = ({
  book,
  onLikeToggle,
  onViewDetail,
  onPurchase,
}: BookListItemDetailProps) => {
  const handleLikeToggle = () => {
    onLikeToggle?.(book.id);
  };

  const handleViewDetail = () => {
    onViewDetail?.(book.id);
  };

  const handlePurchase = () => {
    onPurchase?.(book.id);
  };

  const hasDiscount =
    book.originalPrice && book.price && book.originalPrice > book.price;

  return (
    <div className="flex gap-6 p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors">
      {/* 도서 이미지 및 좋아요 버튼 */}
      <div className="relative">
        <img
          src={book.cover}
          alt={book.title}
          className="w-52 h-70 object-cover rounded select-none pointer-events-none"
          draggable="false"
        />
        <button
          onClick={handleLikeToggle}
          className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center"
          aria-label={book.isLiked ? '좋아요 취소' : '좋아요'}
        >
          {book.isLiked ? (
            <span className="text-red-500 text-lg">❤️</span>
          ) : (
            <span className="text-gray-400 text-lg">🤍</span>
          )}
        </button>
      </div>

      {/* 도서 정보 */}
      <div className="flex-1 flex flex-col">
        {/* 제목과 저자 */}
        <div className="mb-4">
          <Typography
            variant="title2"
            color="black"
            className="mb-2 font-bold text-lg"
          >
            {book.title}
          </Typography>
          <Typography
            variant="body1"
            color="text-secondary"
            className="text-sm"
          >
            {book.author}
          </Typography>
        </div>

        {/* 책 소개 */}
        {book.description && (
          <div className="mb-6 flex-1">
            <Typography
              variant="body2"
              color="black"
              className="font-bold mb-2"
            >
              책 소개
            </Typography>
            <Typography
              variant="body2"
              color="text-secondary"
              className="leading-relaxed"
            >
              {book.description}
            </Typography>
          </div>
        )}
      </div>

      {/* 오른쪽 영역: 상세보기 버튼, 가격 정보, 구매하기 버튼 */}
      <div className="flex flex-col items-end gap-sm justify-between w-[240px]">
        {/* 상세보기 버튼 (상단) */}
        <button
          onClick={handleViewDetail}
          className="flex items-center gap-sm px-md py-lg bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          <Typography variant="body1" color="text-secondary">
            상세보기
          </Typography>
          <img src="src/assets/icons/arrow_down_icon.svg" alt="arrow-down" />
        </button>

        <div className="flex flex-col gap-lg">
          {/* 가격 정보 */}
          <div className="text-right">
            {hasDiscount ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 justify-end">
                  <Typography variant="small" color="text-secondary">
                    원가
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text-secondary"
                    className="line-through"
                  >
                    {book.originalPrice?.toLocaleString()}원
                  </Typography>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <Typography variant="small" color="text-secondary">
                    할인가
                  </Typography>
                  <Typography
                    variant="title3"
                    color="black"
                    className="font-bold"
                  >
                    {book.price?.toLocaleString()}원
                  </Typography>
                </div>
              </div>
            ) : (
              <Typography variant="title3" color="black" className="font-bold">
                {book.price
                  ? `${book.price.toLocaleString()}원`
                  : '가격 정보 없음'}
              </Typography>
            )}
          </div>

          {/* 구매하기 버튼 (하단) */}
          <button
            onClick={handlePurchase}
            className="w-[240px] px-md py-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookListItemDetail;
