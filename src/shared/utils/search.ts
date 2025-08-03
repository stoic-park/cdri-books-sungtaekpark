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
const generateMockBooks = (): KakaoBookResponse['documents'] => {
  const books = [];
  const titles = [
    'React 완전 가이드',
    'TypeScript 핵심 가이드',
    'Next.js 실전 프로젝트',
    'JavaScript ES6+ 완벽 가이드',
    'Vue.js 3 마스터',
    'Node.js 백엔드 개발',
    'Python 데이터 분석',
    'Java 스프링 부트',
    'Go 언어 프로그래밍',
    'Docker 컨테이너 기술',
  ];

  const authors = [
    '김철수',
    '이영희',
    '박민수',
    '최지원',
    '정수민',
    '한소희',
    '강동원',
    '윤서연',
    '임태현',
    '송미라',
  ];

  const publishers = [
    '테크북스',
    '코딩북스',
    '웹북스',
    '프론트북스',
    '뷰북스',
    '백엔드북스',
    '데이터북스',
    '자바북스',
    '고북스',
    '도커북스',
  ];

  for (let i = 0; i < 50; i++) {
    const titleIndex = i % titles.length;
    const authorIndex = i % authors.length;
    const publisherIndex = i % publishers.length;

    books.push({
      authors: [authors[authorIndex]],
      contents: `${titles[titleIndex]}에 대한 상세한 내용입니다. 이 책은 ${authors[authorIndex]}가 집필한 ${publishers[publisherIndex]}의 대표작입니다.`,
      datetime: `2024-${String(Math.floor(i / 12) + 1).padStart(2, '0')}-${String((i % 12) + 1).padStart(2, '0')}T00:00:00.000+09:00`,
      isbn: `978-${String(i + 1).padStart(10, '0')}`,
      price: 20000 + i * 1000,
      publisher: publishers[publisherIndex],
      sale_price: 18000 + i * 900,
      status: '정상판매',
      thumbnail: `https://via.placeholder.com/150x200/cccccc/666666?text=Book${i + 1}`,
      title: `${titles[titleIndex]} ${i + 1}`,
      translators: [],
      url: `https://example.com/book${i + 1}`,
    });
  }

  return books;
};

const mockKakaoResponse: KakaoBookResponse = {
  documents: generateMockBooks(),
  meta: {
    is_end: false,
    pageable_count: 50,
    total_count: 50,
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

      // 페이지네이션 적용 - 전체 필터링된 데이터에서 해당 페이지만 추출
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
      page: page, // 실제 페이지 번호 반환
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

      // 페이지네이션 적용 - 전체 필터링된 데이터에서 해당 페이지만 추출
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

    // 페이지네이션 적용 - 전체 필터링된 데이터에서 해당 페이지만 추출
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
