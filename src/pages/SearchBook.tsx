import { useState } from 'react';
import { useSearchStore } from '../store/useSearchStore';
import { useSearchBooks } from '../hooks/useSearchBooks';
import Typography from '../components/common/Typography';
import { BookList, SearchBox } from '../features/search';

const SearchBook = () => {
  const { keyword, setKeyword } = useSearchStore();
  const { data, isLoading, error, refetch } = useSearchBooks();
  const [likedBooks, setLikedBooks] = useState<Set<string>>(new Set());

  const handleLikeToggle = (bookId: string) => {
    setLikedBooks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(bookId)) {
        newSet.delete(bookId);
      } else {
        newSet.add(bookId);
      }
      return newSet;
    });
  };

  // 좋아요 상태가 포함된 도서 데이터 생성
  const booksWithLikeStatus =
    data?.books.map(book => ({
      ...book,
      isLiked: likedBooks.has(book.id),
    })) || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="flex flex-col gap-lg">
      <Typography variant="title1" color="black">
        도서 검색
      </Typography>

      <div className="flex flex-col w-full gap-xl">
        {/* 검색 폼 */}
        <SearchBox
          keyword={keyword}
          onKeywordChange={setKeyword}
          onSearch={handleSearch}
        />

        {/* 검색 결과 */}
        <BookList
          books={booksWithLikeStatus}
          total={data?.total || 0}
          isLoading={isLoading}
          error={error}
          onLikeToggle={handleLikeToggle}
          onViewDetail={bookId => {
            // TODO: 상세보기 로직 구현
            console.log('상세보기:', bookId);
          }}
          onPurchase={bookId => {
            // TODO: 구매하기 로직 구현
            console.log('구매하기:', bookId);
          }}
        />
      </div>
    </div>
  );
};

export default SearchBook;
