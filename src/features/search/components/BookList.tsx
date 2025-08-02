import { useState } from 'react';
import Typography from '../../../components/common/Typography';
import BookListItem from './BookListItem';
import BookListItemDetail from './BookListItemDetail';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';

import type { Book } from '../../../services/search';

interface BookListProps {
  books: Book[];
  total: number;
  isLoading?: boolean;
  error?: Error | null;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onLikeToggle?: (bookId: string) => void;
  onViewDetail?: (bookId: string) => void;
  onPurchase?: (bookId: string) => void;
}

const BookList = ({
  books,
  total,
  isLoading,
  error,
  hasMore = false,
  onLoadMore,
  onLikeToggle,
  onViewDetail,
  onPurchase,
}: BookListProps) => {
  const [expandedBookId, setExpandedBookId] = useState<string | null>(null);

  const loadingRef = useInfiniteScroll({
    onLoadMore: onLoadMore || (() => {}),
    hasMore,
    isLoading: isLoading || false,
  });

  const handleViewDetail = (bookId: string) => {
    if (expandedBookId === bookId) {
      setExpandedBookId(null); // 접기
    } else {
      setExpandedBookId(bookId); // 펼치기
    }
    onViewDetail?.(bookId);
  };
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <Typography variant="body1" color="text-secondary">
          검색 중...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <Typography variant="body1" color="red">
          검색 중 오류가 발생했습니다: {error.message}
        </Typography>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-8">
        <img
          src="src/assets/images/icon_book.png"
          alt="search-book"
          className="w-20 h-20 select-none pointer-events-none"
          draggable="false"
        />
        <Typography
          variant="body1"
          color="text-secondary"
          className="text-center"
        >
          검색된 결과가 없습니다.
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 검색 결과 헤더 */}
      <div className="flex gap-4 mb-6">
        <Typography variant="body1" color="text-secondary">
          도서 검색 결과
        </Typography>
        <Typography variant="body1" color="text-secondary">
          총 {total}건
        </Typography>
      </div>

      {/* 도서 목록 */}
      <div className="space-y-4">
        {books.map(book => {
          const isExpanded = expandedBookId === book.id;

          return isExpanded ? (
            <BookListItemDetail
              key={book.id}
              book={book}
              onLikeToggle={onLikeToggle}
              onViewDetail={handleViewDetail}
              onPurchase={onPurchase}
            />
          ) : (
            <BookListItem
              key={book.id}
              book={book}
              onLikeToggle={onLikeToggle}
              onViewDetail={handleViewDetail}
              onPurchase={onPurchase}
            />
          );
        })}
      </div>

      {/* 무한 스크롤 로딩 인디케이터 */}
      {hasMore && (
        <div ref={loadingRef} className="py-4 text-center">
          {isLoading ? (
            <Typography variant="body2" color="text-secondary">
              더 많은 도서를 불러오는 중...
            </Typography>
          ) : (
            <div className="h-4" />
          )}
        </div>
      )}

      {/* 더 이상 로드할 데이터가 없을 때 */}
      {!hasMore && books.length > 0 && (
        <div className="py-4 text-center">
          <Typography variant="body2" color="text-secondary">
            모든 도서를 불러왔습니다.
          </Typography>
        </div>
      )}
    </div>
  );
};

export default BookList;
