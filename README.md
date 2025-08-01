# cdri-books-sungtaekpark

도서 검색 및 위시리스트 관리 애플리케이션

## 기술 스택

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Deployment**: Vercel

## 설치 및 실행

### 필수 요구사항

- Node.js 18.0.0 이상
- pnpm 8.0.0 이상

### 설치

```bash
# 의존성 설치
pnpm install
```

### Git 설정 (최초 1회)

```bash
# Git 설정 스크립트 실행
./setup-git.sh

# 또는 수동 설정
git config commit.template .gitmessage
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### 개발 서버 실행

```bash
# 개발 서버 시작
pnpm dev
```

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 빌드 미리보기
pnpm preview
```

## 개발 도구

### 코드 포맷팅

```bash
# Prettier로 코드 포맷팅
pnpm format

# 포맷팅 검사
pnpm format:check
```

### 린팅

```bash
# ESLint 검사
pnpm lint

# ESLint 자동 수정
pnpm lint:fix
```

### Git Hooks

이 프로젝트는 Husky를 사용하여 Git hooks를 설정했습니다:

- **pre-commit**: 커밋 전 자동으로 lint-staged 실행
  - 스테이징된 파일들에 대해 ESLint와 Prettier 자동 적용
  - 코드 품질 검사 및 자동 수정

- **commit-msg**: 커밋 메시지 형식 검증
  - Conventional Commits 규칙 강제
  - 타입, 스코프, 제목 형식 검증
  - 50자 이내 제목 길이 제한

```bash
# Git hooks 활성화 (Git 설치 후)
pnpm prepare
```

#### 커밋 메시지 템플릿

`git commit` 명령어 실행 시 자동으로 커밋 메시지 가이드라인이 표시됩니다.

#### 커밋 메시지 형식

```
<type>(<scope>): <subject>
```

**허용되는 타입:**

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드
- `chore`: 빌드 업무 수정

**허용되는 스코프 (선택사항):**

- `api`, `ui`, `auth`, `db`, `config`

**예시:**

```bash
feat: 검색 API 연동 및 검색어 입력 UI 구현
fix(api): 무한스크롤 중복 요청 이슈 해결
docs: README 초기 설정 및 커밋 컨벤션 추가
style: Tailwind base 스타일 적용
refactor: useBookSearch 커스텀 훅 분리
test: 도서 검색 기능 테스트 코드 작성
chore: pnpm 초기 설정 및 의존성 설치
```

## 프로젝트 구조

```
src/
├── assets/          # 이미지, 폰트 등 정적 리소스
├── components/      # 재사용 가능한 공통 컴포넌트
├── features/        # 기능별 컴포넌트 모음
│   ├── books/       # 도서 관련 기능
│   ├── wishlist/    # 위시리스트 기능
│   ├── filters/     # 필터링 기능
│   └── search/      # 검색 기능
├── hooks/           # 커스텀 훅
├── pages/           # 페이지 컴포넌트
├── services/        # API 통신 및 외부 서비스
├── types/           # TypeScript 타입 정의
├── utils/           # 유틸리티 함수
├── App.tsx          # 메인 앱 컴포넌트
└── main.tsx         # 앱 진입점
```

## 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 변수들을 설정하세요:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# Google Books API (예시)
VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key_here

# App Configuration
VITE_APP_NAME=Certicos Books
VITE_APP_VERSION=1.0.0

# Development Configuration
VITE_DEV_MODE=true
VITE_ENABLE_LOGGING=true
```

## 커밋 규칙

이 프로젝트는 아래 커밋 스타일을 사용합니다.

### 커밋 타입

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드
- `chore`: 빌드 업무 수정

### 예시

```bash
feat: 검색 API 연동 및 검색어 입력 UI 구현
fix: 무한스크롤 중복 요청 이슈 해결
docs: README 초기 설정 및 커밋 컨벤션 추가
```

## 배포

이 프로젝트는 Vercel을 통해 자동 배포됩니다.

### 배포 설정

- **Framework**: Vite
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`
- **Install Command**: `pnpm install`
