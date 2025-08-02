interface SearchBoxProps {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

const SearchBox = ({ keyword, onKeywordChange, onSearch }: SearchBoxProps) => {
  return (
    <form
      onSubmit={onSearch}
      className="flex flex-col gap-lg justify-start items-start"
    >
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
          <input
            type="text"
            value={keyword}
            onChange={e => onKeywordChange(e.target.value)}
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
  );
};

export default SearchBox;
