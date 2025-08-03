import { useState } from 'react';
import type { SearchCondition } from '../../shared/types/search';
import { SEARCH_FIELD_OPTIONS } from '../../shared/types/search';

interface SearchConditionProps {
  condition: SearchCondition;
  onConditionChange: (condition: SearchCondition) => void;
}

const SearchConditionComponent = ({
  condition,
  onConditionChange,
}: SearchConditionProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFieldChange = (field: SearchCondition['field']) => {
    onConditionChange({ ...condition, field });
    setIsDropdownOpen(false);
  };

  const handleValueChange = (value: string) => {
    onConditionChange({ ...condition, value });
  };

  const selectedFieldOption = SEARCH_FIELD_OPTIONS.find(
    option => option.value === condition.field
  );

  return (
    <div className="flex items-center gap-3 bg-white rounded-lg">
      {/* 검색 필드 드롭다운 */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors min-w-[80px]"
        >
          <span className="text-sm text-gray-700">
            {selectedFieldOption?.label}
          </span>
          <svg
            className={`w-4 h-4 text-gray-500 transition-transform ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* 드롭다운 메뉴 */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            {SEARCH_FIELD_OPTIONS.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleFieldChange(option.value)}
                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 검색어 입력 */}
      <input
        type="text"
        value={condition.value}
        onChange={e => handleValueChange(e.target.value)}
        placeholder="검색어 입력"
        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default SearchConditionComponent;
