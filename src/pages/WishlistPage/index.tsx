import { useCallback, memo } from 'react';
import { SearchCountText, Typography } from '../../shared/components';
import { useWishlist } from '../../shared/hooks';
import { BookList } from '../../features/search';

const WishList = () => {
  const { likedBooks, isLoading, removeFromWishlist } = useWishlist();

  const handleLikeToggle = useCallback(
    (bookId: string) => {
      removeFromWishlist(bookId);
    },
    [removeFromWishlist]
  );

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

      {/* 찜한 책 목록 */}
      <BookList
        books={likedBooks}
        isLoading={isLoading}
        error={null}
        hasMore={false}
        onLoadMore={useCallback(() => {}, [])}
        onLikeToggle={useCallback(
          (bookId: string) => {
            const book = likedBooks.find(b => b.id === bookId);
            if (book) {
              handleLikeToggle(book.id);
            }
          },
          [likedBooks, handleLikeToggle]
        )}
      />
    </div>
  );
};

export default memo(WishList);
