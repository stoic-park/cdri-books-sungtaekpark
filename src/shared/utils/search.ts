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
const mockKakaoResponse: KakaoBookResponse = {
  documents: [
    {
      authors: ['김철수'],
      contents:
        'React의 모든 것을 배우는 완벽한 가이드. 컴포넌트 기반 개발부터 상태 관리, 라우팅까지 React의 핵심 개념을 체계적으로 학습할 수 있습니다.',
      datetime: '2024-01-01T00:00:00.000+09:00',
      isbn: '978-1234567890',
      price: 25000,
      publisher: '테크북스',
      sale_price: 22500,
      status: '정상판매',
      thumbnail: 'https://via.placeholder.com/150x200',
      title: 'React 완전 가이드',
      translators: [],
      url: 'https://example.com/book1',
    },
    {
      authors: ['이영희'],
      contents:
        'TypeScript의 핵심 개념을 쉽게 배우기. 타입 시스템부터 제네릭, 인터페이스까지 TypeScript의 모든 기능을 실습을 통해 익힐 수 있습니다.',
      datetime: '2024-02-01T00:00:00.000+09:00',
      isbn: '978-0987654321',
      price: 28000,
      publisher: '코딩북스',
      sale_price: 25200,
      status: '정상판매',
      thumbnail: 'https://via.placeholder.com/150x200',
      title: 'TypeScript 핵심 가이드',
      translators: [],
      url: 'https://example.com/book2',
    },
    {
      authors: ['박민수'],
      contents:
        'Next.js로 실제 프로젝트를 만들어보자. SSR, SSG, API Routes 등 Next.js의 강력한 기능들을 활용한 실전 프로젝트 개발 방법을 다룹니다.',
      datetime: '2024-03-01T00:00:00.000+09:00',
      isbn: '978-1122334455',
      price: 30000,
      publisher: '웹북스',
      sale_price: 27000,
      status: '정상판매',
      thumbnail: 'https://via.placeholder.com/150x200',
      title: 'Next.js 실전 프로젝트',
      translators: [],
      url: 'https://example.com/book3',
    },
    {
      authors: ['최지원'],
      contents:
        'ES6부터 최신 JavaScript 문법까지 완벽하게 정리. 화살표 함수, 클래스, 모듈, 비동기 처리 등 현대 JavaScript의 모든 기능을 배워보세요.',
      datetime: '2024-04-01T00:00:00.000+09:00',
      isbn: '978-5566778899',
      price: 22000,
      publisher: '프론트북스',
      sale_price: 19800,
      status: '정상판매',
      thumbnail: 'https://via.placeholder.com/150x200',
      title: 'JavaScript ES6+ 완벽 가이드',
      translators: [],
      url: 'https://example.com/book4',
    },
    {
      authors: ['정수민'],
      contents:
        'Vue.js 3의 Composition API와 새로운 기능들을 활용한 현대적인 웹 개발. 반응형 시스템부터 상태 관리까지 Vue.js의 모든 것을 배워보세요.',
      datetime: '2024-05-01T00:00:00.000+09:00',
      isbn: '978-9988776655',
      price: 26000,
      publisher: '뷰북스',
      sale_price: 23400,
      status: '정상판매',
      thumbnail: 'https://via.placeholder.com/150x200',
      title: 'Vue.js 3 마스터',
      translators: [],
      url: 'https://example.com/book5',
    },
  ],
  meta: {
    is_end: false,
    pageable_count: 5,
    total_count: 5,
  },
};

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
        'Kakao API 키가 설정되지 않았습니다. 목업 데이터를 사용합니다.'
      );
      // 실제 카카오 API 응답 형식을 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500));

      const filteredDocuments = mockKakaoResponse.documents.filter(
        doc =>
          doc.title.toLowerCase().includes(keyword.toLowerCase()) ||
          doc.authors.some(author =>
            author.toLowerCase().includes(keyword.toLowerCase())
          ) ||
          doc.contents.toLowerCase().includes(keyword.toLowerCase())
      );

      const books: Book[] = filteredDocuments.map((doc, index) => ({
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
    }

    const response = await axios.get<KakaoBookResponse>(
      'https://dapi.kakao.com/v3/search/book',
      {
        params: {
          query: keyword,
          size: 10,
          page: 1,
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
      page: 1,
      limit: 10,
    };
  } catch (error) {
    console.error('Kakao Book API 호출 실패:', error);

    // 에러 발생 시 실제 카카오 API 응답 형식으로 폴백
    await new Promise(resolve => setTimeout(resolve, 300));

    const filteredDocuments = mockKakaoResponse.documents.filter(
      doc =>
        doc.title.toLowerCase().includes(keyword.toLowerCase()) ||
        doc.authors.some(author =>
          author.toLowerCase().includes(keyword.toLowerCase())
        ) ||
        doc.contents.toLowerCase().includes(keyword.toLowerCase())
    );

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

    return {
      books,
      total: filteredDocuments.length,
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
        'Kakao API 키가 설정되지 않았습니다. 목업 데이터를 사용합니다.'
      );
      // 실제 카카오 API 응답 형식을 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 500));

      const filteredDocuments = mockKakaoResponse.documents.filter(doc => {
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

    // 에러 발생 시 목업 데이터로 폴백
    await new Promise(resolve => setTimeout(resolve, 300));

    const filteredDocuments = mockKakaoResponse.documents.filter(doc => {
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
  }
};
