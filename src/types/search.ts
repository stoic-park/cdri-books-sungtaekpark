export interface SearchCondition {
  field: 'title' | 'author' | 'publisher';
  value: string;
}

export interface AdvancedSearchState {
  isOpen: boolean;
  conditions: SearchCondition[];
}

export type SearchField = 'title' | 'author' | 'publisher';

export const SEARCH_FIELD_OPTIONS = [
  { value: 'title', label: '제목' },
  { value: 'author', label: '저자명' },
  { value: 'publisher', label: '출판사' },
] as const;
