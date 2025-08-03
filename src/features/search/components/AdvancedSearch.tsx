import { useState, useEffect } from 'react';
import type { SearchCondition } from '../../../types/search';
import SearchConditionComponent from './SearchCondition';

interface AdvancedSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (conditions: SearchCondition[]) => void;
}

const AdvancedSearch = ({ isOpen, onClose, onSearch }: AdvancedSearchProps) => {
  const [conditions, setConditions] = useState<SearchCondition[]>([
    { field: 'title', value: '' },
  ]);

  // 팝업이 열릴 때마다 조건 초기화
  useEffect(() => {
    if (isOpen) {
      setConditions([{ field: 'title', value: '' }]);
    }
  }, [isOpen]);

  const handleConditionChange = (index: number, condition: SearchCondition) => {
    const newConditions = [...conditions];
    newConditions[index] = condition;
    setConditions(newConditions);
  };

  const handleSearch = () => {
    const validConditions = conditions.filter(condition =>
      condition.value.trim()
    );
    if (validConditions.length > 0) {
      onSearch(validConditions);
      onClose();
    }
  };

  const handleClose = () => {
    setConditions([{ field: 'title', value: '' }]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
      {/* 헤더 */}
      <div className="flex items-center justify-end w-full">
        <button
          type="button"
          onClick={handleClose}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="상세검색 닫기"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* 검색 조건들 */}
      <div className="px-6">
        {conditions.map((condition, index) => (
          <SearchConditionComponent
            key={index}
            condition={condition}
            onConditionChange={condition =>
              handleConditionChange(index, condition)
            }
          />
        ))}
      </div>

      {/* 하단 버튼 */}
      <div className="flex items-center gap-3 px-6 py-4 w-full">
        <button
          type="button"
          onClick={handleSearch}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full"
        >
          검색하기
        </button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
