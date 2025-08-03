import axios from 'axios';
import type { SearchCondition } from '../types/search';

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description?: string;
  isbn?: string;
  publisher?: string;
  publishedDate?: string;
  price?: number;
  originalPrice?: number;
  isLiked?: boolean;
  url?: string;
}

export interface SearchResponse {
  books: Book[];
  total: number;
  page: number;
  limit: number;
}

// Kakao Book API 응답 타입 (실제 API 문서 기반)
interface KakaoBookResponse {
  documents: Array<{
    authors: string[];
    contents: string;
    datetime: string;
    isbn: string;
    price: number;
    publisher: string;
    sale_price: number;
    status: string;
    thumbnail: string;
    title: string;
    translators: string[];
    url: string;
  }>;
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}

// 실제 카카오 API 응답을 시뮬레이션하는 목업 데이터
// 목업 데이터 제거 - API 키가 없을 때는 빈 결과 반환

export const searchBooks = async (
  keyword: string,
  page: number = 1
): Promise<SearchResponse> => {
  if (!keyword.trim()) {
    return {
      books: [],
      total: 0,
      page: 1,
      limit: 10,
    };
  }

  try {
    const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

    if (!KAKAO_API_KEY) {
      console.warn(
        'Kakao API 키가 설정되지 않았습니다. 환경 변수 VITE_KAKAO_API_KEY를 설정해주세요.'
      );
      return {
        books: [],
        total: 0,
        page: 1,
        limit: 10,
      };
    }

    const response = await axios.get<KakaoBookResponse>(
      'https://dapi.kakao.com/v3/search/book',
      {
        params: {
          query: keyword,
          size: 10,
          page: page, // 페이지 파라미터 동적 적용
        },
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      }
    );

    const books: Book[] = response.data.documents.map((doc, index) => ({
      id: doc.isbn || `kakao-${index}`,
      title: doc.title,
      author: doc.authors.join(', '),
      cover: doc.thumbnail,
      description: doc.contents,
      isbn: doc.isbn,
      publisher: doc.publisher,
      publishedDate: doc.datetime.split('T')[0], // YYYY-MM-DD 형식으로 변환
      price: doc.sale_price,
      originalPrice: doc.price,
      url: doc.url,
    }));

    return {
      books,
      total: response.data.meta.total_count,
      page: page, // 실제 페이지 번호 반환
      limit: 10,
    };
  } catch (error) {
    console.error('Kakao Book API 호출 실패:', error);
    return {
      books: [],
      total: 0,
      page: 1,
      limit: 10,
    };
  }
};

export const advancedSearchBooks = async (
  conditions: SearchCondition[],
  page: number = 1
): Promise<SearchResponse> => {
  if (
    !conditions.length ||
    conditions.every(condition => !condition.value.trim())
  ) {
    return {
      books: [],
      total: 0,
      page: 1,
      limit: 10,
    };
  }

  try {
    const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

    if (!KAKAO_API_KEY) {
      console.warn(
        'Kakao API 키가 설정되지 않았습니다. 환경 변수 VITE_KAKAO_API_KEY를 설정해주세요.'
      );
      return {
        books: [],
        total: 0,
        page: 1,
        limit: 10,
      };
    }

    // 상세검색: 첫 번째 조건으로 API 호출 후 클라이언트에서 필터링
    const firstCondition = conditions[0];
    const target =
      firstCondition.field === 'author' ? 'person' : firstCondition.field;

    const response = await axios.get<KakaoBookResponse>(
      'https://dapi.kakao.com/v3/search/book',
      {
        params: {
          query: firstCondition.value,
          target: target,
          size: 50, // 더 많은 결과를 가져와서 필터링
          page: page,
        },
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      }
    );

    // 모든 조건을 만족하는 도서만 필터링
    const filteredDocuments = response.data.documents.filter(doc => {
      return conditions.every(condition => {
        const searchValue = condition.value.toLowerCase();
        switch (condition.field) {
          case 'title':
            return doc.title.toLowerCase().includes(searchValue);
          case 'author':
            return doc.authors.some(author =>
              author.toLowerCase().includes(searchValue)
            );
          case 'publisher':
            return doc.publisher.toLowerCase().includes(searchValue);
          default:
            return true;
        }
      });
    });

    const books: Book[] = filteredDocuments.map((doc, index) => ({
      id: doc.isbn || `kakao-${index}`,
      title: doc.title,
      author: doc.authors.join(', '),
      cover: doc.thumbnail,
      description: doc.contents,
      isbn: doc.isbn,
      publisher: doc.publisher,
      publishedDate: doc.datetime.split('T')[0],
      price: doc.sale_price,
      originalPrice: doc.price,
      url: doc.url,
    }));

    // 페이지네이션 적용
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    const paginatedBooks = books.slice(startIndex, endIndex);

    return {
      books: paginatedBooks,
      total: books.length,
      page,
      limit: 10,
    };
  } catch (error) {
    console.error('Kakao Book API 상세검색 호출 실패:', error);
    return {
      books: [],
      total: 0,
      page: 1,
      limit: 10,
    };
  }
};
