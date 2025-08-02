import { useState, useEffect } from 'react';

const SEARCH_HISTORY_KEY = 'certicos_books_search_history';
const MAX_HISTORY_COUNT = 8;

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // localStorage에서 검색 기록 로드
  useEffect(() => {
    const loadSearchHistory = () => {
      try {
        const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
        if (savedHistory) {
          const parsedHistory = JSON.parse(savedHistory);
          setSearchHistory(Array.isArray(parsedHistory) ? parsedHistory : []);
        }
      } catch (error) {
        console.error('검색 기록 로드 실패:', error);
        setSearchHistory([]);
      }
    };

    loadSearchHistory();
  }, []);

  // 검색 기록에 추가
  const addToSearchHistory = (keyword: string) => {
    if (!keyword.trim()) return;

    setSearchHistory(prevHistory => {
      // 중복 제거
      const filteredHistory = prevHistory.filter(item => item !== keyword);

      // 새로운 검색어를 맨 앞에 추가
      const newHistory = [keyword, ...filteredHistory];

      // 최대 8개까지만 유지
      const trimmedHistory = newHistory.slice(0, MAX_HISTORY_COUNT);

      // localStorage에 저장
      try {
        localStorage.setItem(
          SEARCH_HISTORY_KEY,
          JSON.stringify(trimmedHistory)
        );
      } catch (error) {
        console.error('검색 기록 저장 실패:', error);
      }

      return trimmedHistory;
    });
  };

  // 검색 기록에서 제거
  const removeFromSearchHistory = (keyword: string) => {
    setSearchHistory(prevHistory => {
      const newHistory = prevHistory.filter(item => item !== keyword);

      try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error('검색 기록 삭제 실패:', error);
      }

      return newHistory;
    });
  };

  // 전체 검색 기록 삭제
  const clearSearchHistory = () => {
    setSearchHistory([]);
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
      console.error('검색 기록 전체 삭제 실패:', error);
    }
  };

  return {
    searchHistory,
    addToSearchHistory,
    removeFromSearchHistory,
    clearSearchHistory,
  };
};
