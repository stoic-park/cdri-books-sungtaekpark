import { useState } from 'react';
import { useSearchStore } from '../../shared/store/useSearchStore';
import {
  useSearchBooks,
  useAdvancedSearchBooks,
  useWishlist,
} from '../../shared/hooks';
import type { SearchCondition } from '../../shared/types/search';
import type { Book } from '../../shared/utils/search';
import { BookList, SearchBox } from '../../features/search';
import { SearchCountText, Typography } from '../../shared/components';

const SearchBook = () => {
  const { keyword, setKeyword } = useSearchStore();
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [advancedSearchConditions, setAdvancedSearchConditions] = useState<
    SearchCondition[]
  >([]);

  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
  } = useSearchBooks(searchKeyword);

  const {
    data: advancedSearchData,
    isLoading: isAdvancedSearchLoading,
    error: advancedSearchError,
    fetchNextPage: fetchNextAdvancedSearchPage,
    hasNextPage: hasNextAdvancedSearchPage,
    isFetchingNextPage: isFetchingNextAdvancedSearchPage,
  } = useAdvancedSearchBooks(advancedSearchConditions);

  const { toggleLike, isLiked } = useWishlist();

  const handleLikeToggle = (book: Book) => {
    toggleLike(book);
  };

  // 현재 활성화된 검색 모드에 따라 데이터 선택
  const isAdvancedSearchMode = advancedSearchConditions.length > 0;
  const currentData = isAdvancedSearchMode ? advancedSearchData : searchData;
  const currentIsLoading = isAdvancedSearchMode
    ? isAdvancedSearchLoading
    : isSearchLoading;
  const currentError = isAdvancedSearchMode ? advancedSearchError : searchError;
  const currentFetchNextPage = isAdvancedSearchMode
    ? fetchNextAdvancedSearchPage
    : fetchNextSearchPage;
  const currentHasNextPage = isAdvancedSearchMode
    ? hasNextAdvancedSearchPage
    : hasNextSearchPage;
  const currentIsFetchingNextPage = isAdvancedSearchMode
    ? isFetchingNextAdvancedSearchPage
    : isFetchingNextSearchPage;

  // 모든 페이지의 도서 데이터를 평면화하고 좋아요 상태 추가
  const allBooks = currentData?.pages.flatMap(page => page.books) || [];
  const booksWithLikeStatus = allBooks.map(book => ({
    ...book,
    isLiked: isLiked(book.id),
  }));

  // 전체 결과 수 계산
  const totalResults = currentData?.pages[0]?.total || 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      setSearchKeyword(keyword);
      // 전체 검색 시 상세검색 조건 초기화
      setAdvancedSearchConditions([]);
    }
  };

  const handleAdvancedSearch = (conditions: SearchCondition[]) => {
    setAdvancedSearchConditions(conditions);
    // 상세검색 시 전체 검색어 초기화
    setKeyword('');
    setSearchKeyword('');
    // TODO: 상세검색 API 호출 로직 구현
    console.log('상세검색 조건:', conditions);
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
          onAdvancedSearch={handleAdvancedSearch}
        />

        {/* 검색 결과 개수 */}
        <SearchCountText label="도서 검색 결과" total={totalResults} />

        {/* 검색 결과 */}
        <BookList
          books={booksWithLikeStatus}
          isLoading={currentIsLoading || currentIsFetchingNextPage}
          error={currentError}
          hasMore={currentHasNextPage || false}
          onLoadMore={currentFetchNextPage}
          onLikeToggle={bookId => {
            const book = allBooks.find(b => b.id === bookId);
            if (book) {
              handleLikeToggle(book);
            }
          }}
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
