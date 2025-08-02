import { useState } from 'react';
import { useSearchStore } from '../store/useSearchStore';
import { useSearchBooks } from '../hooks/useSearchBooks';
import Typography from '../components/common/Typography';
import { BookList, SearchBox } from '../features/search';

// TODO: 스크롤, 데이터 페칭시 로딩 처리 필요
const SearchBook = () => {
  const { keyword, setKeyword } = useSearchStore();
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSearchBooks(searchKeyword);

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

  // 모든 페이지의 도서 데이터를 평면화하고 좋아요 상태 추가
  const allBooks = data?.pages.flatMap(page => page.books) || [];
  const booksWithLikeStatus = allBooks.map(book => ({
    ...book,
    isLiked: likedBooks.has(book.id),
  }));

  // 전체 결과 수 계산
  const totalResults = data?.pages[0]?.total || 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      setSearchKeyword(keyword);
    }
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
          total={totalResults}
          isLoading={isLoading || isFetchingNextPage}
          error={error}
          hasMore={hasNextPage || false}
          onLoadMore={fetchNextPage}
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
