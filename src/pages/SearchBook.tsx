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
    <div className="p-6 mx-auto">
      <Typography variant="title1" color="black" className="mb-6">
        도서 검색
      </Typography>

      {/* 임시 검색 폼 */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="검색어를 입력하세요"
            className="flex-1 px-4 py-2 border border-gray rounded-md focus:outline-none focus:border-primary"
          />
          {/* 임시 검색 버튼 */}
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            검색
          </button>
        </div>
      </form>

      {/* 임시 검색 결과 */}
      <div className="space-y-4">
        {isLoading && (
          <Typography variant="body1" color="text-secondary">
            검색 중...
          </Typography>
        )}

        {error && (
          <Typography variant="body1" color="red">
            검색 중 오류가 발생했습니다: {error.message}
          </Typography>
        )}

        {data && (
          <div>
            <Typography variant="body1" color="text-secondary" className="mb-4">
              검색 결과: {data.total}건
            </Typography>

            {data.books.length === 0 ? (
              <Typography variant="body1" color="text-secondary">
                검색된 결과가 없습니다.
              </Typography>
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
        )}
      </div>
    </div>
  );
};

export default SearchBook;
