import { useSearchStore } from '../store/useSearchStore';
import { useSearchBooks } from '../hooks/useSearchBooks';
import Typography from '../components/common/Typography';

const SearchBook = () => {
  const { keyword, setKeyword } = useSearchStore();
  const { data, isLoading, error } = useSearchBooks();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-lg">
      <Typography variant="title1" color="black">
        도서 검색
      </Typography>

      <div className="flex flex-col w-full gap-xl">
        {/* 검색 폼 */}
        <form onSubmit={handleSearch} className="w-full">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </div>
              <input
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300"
            >
              상세검색
            </button>
          </div>
        </form>

        {/* 검색 결과 */}
        <div className="">
          {isLoading && (
            <div className="text-center">
              <Typography variant="body1" color="text-secondary">
                검색 중...
              </Typography>
            </div>
          )}

          {error && (
            <div className="text-center">
              <Typography variant="body1" color="red">
                검색 중 오류가 발생했습니다: {error.message}
              </Typography>
            </div>
          )}

          {!keyword.trim() ? (
            <div className="flex flex-col items-center justify-center p-xl gap-xl">
              <img
                src="src/assets/images/icon_book.png"
                alt="search-book"
                className="w-20 h-20"
              />
              <Typography
                variant="body1"
                color="text-secondary"
                className="text-center"
              >
                검색된 결과가 없습니다.
              </Typography>
            </div>
          ) : (
            data && (
              <div>
                <div className="flex gap-4 mb-6">
                  <Typography variant="body1" color="text-secondary">
                    도서 검색 결과
                  </Typography>
                  <Typography variant="body1" color="text-secondary">
                    총 {data.total}건
                  </Typography>
                </div>

                {data.books.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-xl gap-xl">
                    <img
                      src="src/assets/images/icon_book.png"
                      alt="search-book"
                      className="w-20 h-20"
                    />
                    <Typography
                      variant="body1"
                      color="text-secondary"
                      className="text-center"
                    >
                      검색된 결과가 없습니다.
                    </Typography>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.books.map(book => (
                      <div
                        key={book.id}
                        className="border border-gray rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex gap-4">
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="w-16 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <Typography
                              variant="title3"
                              color="black"
                              className="mb-2"
                            >
                              {book.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text-secondary"
                              className="mb-1"
                            >
                              {book.author}
                            </Typography>
                            <Typography variant="small" color="text-subtitle">
                              {book.publisher}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBook;
