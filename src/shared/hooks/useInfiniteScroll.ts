import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  threshold?: number;
}

export const useInfiniteScroll = ({
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 100,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);
  const scrollPositionRef = useRef<number>(0);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      // 중복 호출 방지 및 조건 체크
      if (
        target.isIntersecting &&
        hasMore &&
        !isLoading &&
        !isLoadingRef.current
      ) {
        // 현재 스크롤 위치 저장
        scrollPositionRef.current = window.scrollY;
        isLoadingRef.current = true;

        // 스크롤 위치 유지를 위해 requestAnimationFrame 사용
        requestAnimationFrame(() => {
          onLoadMore();
        });
      }
    },
    [hasMore, isLoading, onLoadMore]
  );

  // isLoading 상태 변경 시 ref 업데이트 및 스크롤 위치 복원
  useEffect(() => {
    isLoadingRef.current = isLoading;

    // 로딩이 완료되면 스크롤 위치 복원
    if (!isLoading && scrollPositionRef.current > 0) {
      // 약간의 지연을 두어 DOM 업데이트 완료 후 스크롤 복원
      setTimeout(() => {
        window.scrollTo({
          top: scrollPositionRef.current,
          behavior: 'instant', // 부드러운 스크롤 대신 즉시 이동
        });
        scrollPositionRef.current = 0; // 초기화
      }, 50);
    }
  }, [isLoading]);

  useEffect(() => {
    const element = loadingRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: `${threshold}px`,
      // 스크롤이 끝에 닿았을 때 처음으로 되돌아가지 않도록 설정
      threshold: 0.1,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver, threshold]);

  return loadingRef;
};
