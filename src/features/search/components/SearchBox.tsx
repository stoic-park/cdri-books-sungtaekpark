import { useState, useRef, useEffect } from 'react';
import { useSearchHistory } from '../../../hooks/useSearchHistory';
import SearchHistory from './SearchHistory';

interface SearchBoxProps {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

const SearchBox = ({ keyword, onKeywordChange, onSearch }: SearchBoxProps) => {
  const {
    searchHistory,
    addToSearchHistory,
    removeFromSearchHistory,
    clearSearchHistory,
  } = useSearchHistory();
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsHistoryVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputFocus = () => {
    if (searchHistory.length > 0) {
      setIsHistoryVisible(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onKeywordChange(e.target.value);
    if (e.target.value.trim()) {
      setIsHistoryVisible(false);
    } else if (searchHistory.length > 0) {
      setIsHistoryVisible(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      addToSearchHistory(keyword);
      setIsHistoryVisible(false);
      onSearch(e);
    }
  };

  const handleHistorySelect = (selectedKeyword: string) => {
    onKeywordChange(selectedKeyword);
    setIsHistoryVisible(false);
    inputRef.current?.focus();
  };

  const handleHistoryRemove = (keywordToRemove: string) => {
    removeFromSearchHistory(keywordToRemove);
  };

  const handleClearHistory = () => {
    clearSearchHistory();
    setIsHistoryVisible(false);
  };
  return (
    <div ref={containerRef} className="relative w-full">
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-lg justify-start items-start"
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <img
                src="src/assets/icons/search_icon.svg"
                alt="search"
                className="w-6"
              />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={keyword}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch(e);
                }
              }}
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

      <SearchHistory
        searchHistory={searchHistory}
        onSelectHistory={handleHistorySelect}
        onRemoveHistory={handleHistoryRemove}
        onClearHistory={handleClearHistory}
        isVisible={isHistoryVisible}
      />
    </div>
  );
};

export default SearchBox;
