import Typography from '../../shared/components/Typography';

interface SearchHistoryProps {
  searchHistory: string[];
  onSelectHistory: (keyword: string) => void;
  onRemoveHistory: (keyword: string) => void;
  onClearHistory: () => void;
  isVisible: boolean;
}

const SearchHistory = ({
  searchHistory,
  onSelectHistory,
  onRemoveHistory,
  onClearHistory,
  isVisible,
}: SearchHistoryProps) => {
  if (!isVisible || searchHistory.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-10">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <Typography
            variant="body2"
            color="text-secondary"
            className="font-medium"
          >
            최근 검색어
          </Typography>
          <button
            onClick={onClearHistory}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            전체 삭제
          </button>
        </div>

        <div className="space-y-2">
          {searchHistory.map((keyword, index) => (
            <div
              key={`${keyword}-${index}`}
              className="flex items-center justify-between p-2 hover:bg-bg-secondary rounded transition-colors"
            >
              <button
                onClick={() => onSelectHistory(keyword)}
                className="flex-1 text-left text-sm text-text-primary hover:text-black transition-colors"
              >
                {keyword}
              </button>
              <button
                onClick={() => onRemoveHistory(keyword)}
                className="ml-2 p-1 text-text-secondary hover:text-secondary transition-colors"
                aria-label={`${keyword} 검색 기록 삭제`}
              >
                <img
                  src="src/assets/icons/close.svg"
                  alt="close"
                  className="w-6"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;
