import { useState, useEffect, useRef } from 'react';
import { Button } from '../../shared/components';
import type { SearchCondition } from '../../shared/types/search';
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
  const modalRef = useRef<HTMLDivElement>(null);

  // 팝업이 열릴 때마다 조건 초기화
  useEffect(() => {
    if (isOpen) {
      setConditions([{ field: 'title', value: '' }]);
    }
  }, [isOpen]);

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
    <div
      ref={modalRef}
      className="absolute top-full right-0 mt-2 bg-white border border-border rounded-lg shadow-lg z-10 p-2"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-end w-full">
        <Button
          type="button"
          variant="ghost"
          onClick={handleClose}
          className="p-2 text-text-secondary hover:text-secondary"
          aria-label="상세검색 닫기"
        >
          <img
            src="src/assets/icons/close.svg"
            alt="close"
            className="w-6 h-6"
          />
        </Button>
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
        <Button
          type="button"
          variant="primary"
          onClick={handleSearch}
          fullWidth
        >
          검색하기
        </Button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
