import { useState, useCallback, memo } from 'react';
import { useSearchStore } from '../../shared/store/useSearchStore';
import {
  useSearchBooks,
  useAdvancedSearchBooks,
  useWishlist,
  useSearchMode,
  useBookList,
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
    error: searchError,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
  } = useSearchBooks(searchKeyword);

  const {
    data: advancedSearchData,
    error: advancedSearchError,
    fetchNextPage: fetchNextAdvancedSearchPage,
    hasNextPage: hasNextAdvancedSearchPage,
    isFetchingNextPage: isFetchingNextAdvancedSearchPage,
  } = useAdvancedSearchBooks(advancedSearchConditions);

  const { toggleLike, isLiked } = useWishlist();

  // 검색 모드 관리
  const {
    currentData,
    currentError,
    currentFetchNextPage,
    currentHasNextPage,
    currentIsFetchingNextPage,
  } = useSearchMode(
    {
      data: searchData,
      error: searchError,
      fetchNextPage: fetchNextSearchPage,
      hasNextPage: hasNextSearchPage,
      isFetchingNextPage: isFetchingNextSearchPage,
    },
    {
      data: advancedSearchData,
      error: advancedSearchError,
      fetchNextPage: fetchNextAdvancedSearchPage,
      hasNextPage: hasNextAdvancedSearchPage,
      isFetchingNextPage: isFetchingNextAdvancedSearchPage,
    },
    advancedSearchConditions
  );

  // 책 목록 데이터 처리
  const { allBooks, booksWithLikeStatus, totalResults } = useBookList(
    currentData,
    isLiked
  );

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (keyword.trim()) {
        setSearchKeyword(keyword);
        setAdvancedSearchConditions([]);
      }
    },
    [keyword]
  );

  const handleAdvancedSearch = useCallback(
    (conditions: SearchCondition[]) => {
      setAdvancedSearchConditions(conditions);
      // 상세검색 시 전체 검색어 초기화
      setKeyword('');
      setSearchKeyword('');
    },
    [setKeyword]
  );

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
          isLoading={currentIsFetchingNextPage} // 다음 페이지 로딩 중일 때만
          error={currentError}
          hasMore={currentHasNextPage || false}
          onLoadMore={currentFetchNextPage}
          onLikeToggle={useCallback(
            (bookId: string) => {
              const book = allBooks.find((b: Book) => b.id === bookId);
              if (book) {
                toggleLike(book);
              }
            },
            [allBooks, toggleLike]
          )}
        />
      </div>
    </div>
  );
};

export default memo(SearchBook);
