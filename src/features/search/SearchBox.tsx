import { useState, useRef } from 'react';
import { useSearchHistory, useClickOutside } from '../../shared/hooks';
import { Button } from '../../shared/components';
import type { SearchCondition } from '../../shared/types/search';
import SearchHistory from './SearchHistory';
import AdvancedSearch from './AdvancedSearch';

interface SearchBoxProps {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onAdvancedSearch: (conditions: SearchCondition[]) => void;
}

const SearchBox = ({
  keyword,
  onKeywordChange,
  onSearch,
  onAdvancedSearch,
}: SearchBoxProps) => {
  const {
    searchHistory,
    addToSearchHistory,
    removeFromSearchHistory,
    clearSearchHistory,
  } = useSearchHistory();
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => setIsHistoryVisible(false));

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

  const handleAdvancedSearchClick = () => {
    setIsAdvancedSearchOpen(true);
  };

  const handleAdvancedSearchClose = () => {
    setIsAdvancedSearchOpen(false);
  };

  const handleAdvancedSearch = (conditions: SearchCondition[]) => {
    onAdvancedSearch(conditions);
    setIsAdvancedSearchOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-lg justify-start items-start"
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
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
              className="w-full pl-10 pr-4 py-3 bg-bg-secondary border border-border rounded-full focus:outline-none focus:border-primary focus:bg-white transition-colors"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleAdvancedSearchClick}
          >
            상세검색
          </Button>
        </div>
      </form>

      <SearchHistory
        searchHistory={searchHistory}
        onSelectHistory={handleHistorySelect}
        onRemoveHistory={handleHistoryRemove}
        onClearHistory={handleClearHistory}
        isVisible={isHistoryVisible}
      />

      <AdvancedSearch
        isOpen={isAdvancedSearchOpen}
        onClose={handleAdvancedSearchClose}
        onSearch={handleAdvancedSearch}
      />
    </div>
  );
};

export default SearchBox;
