# 📚 Certicos Books - 도서 검색 및 위시리스트 애플리케이션

## 프로젝트 개요

CERTICOS BOOKS는 도서 검색 및 상세 정보 제공, 구매링크 이동, 내가 찜한 책 정보를 확인할 수 있는 서비스입니다.

## 실행 방법 및 환경 설정

### 필수 요구사항

- Node.js 18.0.0 이상
- pnpm (권장) 또는 npm

### 설치 및 실행

```bash

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 빌드 미리보기
pnpm preview
```

### 환경 변수 설정

`.env` 파일을 생성하고 다음 변수를 설정하세요:

```env
VITE_KAKAO_API_KEY=your_kakao_api_key_here
```

## 폴더 구조 및 주요 코드 설명

- **FSD(Feature-Sliced Design)**의 레이어 구조(app, pages, widgets, features, entities, shared)보다는 간소화된 구조로 프로젝트에 적응했습니다.
- `src/features/`에 비즈니스 로직별 기능을 분리하고, `src/shared/`에 공통 모듈을 배치하여 관심사 분리 했습니다.

```
src/
├── app/                    # 애플리케이션 진입점
├── assets/                 # 정적 리소스 (이미지, 아이콘)
├── features/               # 기능별 컴포넌트
│   └── search/            # 도서 검색 기능
│       ├── BookItem.tsx           # 개별 도서 아이템 (아코디언)
│       ├── BookListItem.tsx       # 도서 목록 아이템 (축약형)
│       ├── BookListItemDetail.tsx # 도서 상세 아이템 (확장형)
│       ├── BookList.tsx           # 도서 목록 컨테이너
│       ├── SearchBox.tsx          # 검색 입력 컴포넌트
│       ├── AdvancedSearch.tsx     # 상세 검색 모달
│       ├── SearchCondition.tsx    # 검색 조건 컴포넌트
│       ├── SearchHistory.tsx      # 검색 기록 드롭다운
│       └── index.ts               # 기능 내보내기
├── pages/                  # 페이지 컴포넌트
│   ├── SearchPage/        # 도서 검색 페이지
│   └── WishlistPage/      # 위시리스트 페이지
├── shared/                 # 공통 모듈
│   ├── components/        # 공통 UI 컴포넌트
│   │   ├── Typography.tsx     # 타이포그래피 컴포넌트
│   │   ├── Button.tsx         # 버튼 컴포넌트
│   │   ├── SearchCountText.tsx # 검색 결과 개수 표시
│   │   └── index.ts           # 컴포넌트 내보내기
│   ├── hooks/             # 커스텀 훅
│   │   ├── useSearchBooks.ts        # 도서 검색 훅
│   │   ├── useAdvancedSearchBooks.ts # 상세 검색 훅
│   │   ├── useWishlist.ts           # 위시리스트 관리 훅
│   │   ├── useSearchHistory.ts      # 검색 기록 관리 훅
│   │   ├── useInfiniteScroll.ts     # 무한 스크롤 훅
│   │   ├── useSearchMode.ts         # 검색 모드 관리 훅
│   │   ├── useClickOutside.ts       # 외부 클릭 감지 훅
│   │   ├── useBookList.ts           # 도서 목록 처리 훅
│   │   └── index.ts                 # 훅 내보내기
│   ├── store/             # 상태 관리
│   │   ├── useSearchStore.ts        # 검색 상태 관리
│   │   ├── useWishlistStore.ts      # 위시리스트 상태 관리
│   │   └── index.ts                 # 스토어 내보내기
│   ├── types/             # TypeScript 타입 정의
│   │   └── search.ts               # 검색 관련 타입
│   └── utils/             # 유틸리티 함수
│       └── search.ts               # 검색 API 및 유틸리티
└── index.css              # 전역 스타일
```

## 라이브러리 선택 이유

### Frontend

- **React 19.1.0** - 최신 React 버전
- **TypeScript 5.8.3** - 타입 안전성
- **TailwindCSS 4.1.11** - 유틸리티 기반 CSS 프레임워크
- **Vite 7.0.4** - 빠른 개발 서버 및 빌드 도구

### 상태 관리 & 데이터 페칭

- **Zustand 5.0.7** - 경량 상태 관리
- **TanStack Query 5.84.0** - 서버 상태 관리 및 캐싱
- **Axios 1.11.0** - HTTP 클라이언트

### 라우팅

- **React Router DOM 7.7.1** - 클라이언트 사이드 라우팅

### 개발 도구

- **ESLint 9.30.1** - 코드 품질 관리
- **Prettier 3.6.2** - 코드 포맷팅
- **Husky 9.1.7** - Git 훅 관리
- **lint-staged 16.1.2** - 스테이징된 파일만 린트

## 강조하고 싶은 기능

### 도서 검색

- **일반 검색**: 키워드 기반 도서 검색 (Enter 키로 검색 실행)
- **상세 검색**: 제목, 저자명, 출판사별 조건 검색
- **검색 기록**: 최대 8개까지 검색 기록 저장 및 브라우저 재시작 후에도 유지
- **무한 스크롤**: 페이지당 10개 결과, 무한 스크롤로 추가 로딩

### 위시리스트

- **찜하기 기능**: 도서 찜하기/취소하기
- **위시리스트 페이지**: 찜한 도서 목록 관리
- **로컬 스토리지**: 브라우저 재시작 후에도 찜한 도서 유지

### 사용자 인터페이스

- **아코디언 패턴**: 도서 상세 정보 확장/축소
- **반응형 디자인**: 모바일 및 데스크톱 최적화
