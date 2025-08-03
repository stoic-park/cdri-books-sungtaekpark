import { SearchCountText, Typography } from '../components/common';
import { useWishlist } from '../hooks';
import { BookList } from '../features/search';

const WishList = () => {
  const { likedBooks, isLoading, removeFromWishlist } = useWishlist();

  const handleLikeToggle = (bookId: string) => {
    removeFromWishlist(bookId);
  };

  // 찜한 책 목록 렌더링
  return (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-col gap-sm">
        <Typography variant="title1" color="black">
          내가 찜한 책
        </Typography>
      </div>

      {/* 찜한 책 개수 */}
      <SearchCountText total={likedBooks.length} label="찜한 책" />

      {/* 검색 결과 */}
      <BookList
        books={likedBooks}
        isLoading={isLoading}
        error={null}
        hasMore={false}
        onLoadMore={() => {}}
        onLikeToggle={bookId => {
          const book = likedBooks.find(b => b.id === bookId);
          if (book) {
            handleLikeToggle(book.id);
          }
        }}
      />
    </div>
  );
};

export default WishList;
