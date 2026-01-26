# @movii/insights

React, Vite, Recharts를 기반으로 만든 영화 분석 대시보드 애플리케이션입니다. TMDB API의 데이터와 시뮬레이션된 메트릭을 결합하여 영화 통계, 수익 추이, 장르별 분포를 표시합니다.

> **🤖 100% 바이브코딩으로 개발됨** - 이 프로젝트는 Claude AI를 활용한 대화형 AI 코딩 방식(바이브코딩)으로 전체 개발이 진행되었습니다.

## 기술 스택

- **빌드 도구**: Vite 5.4.21+
- **프레임워크**: React 19 (React Compiler 활성화)
- **라우팅**: React Router v7.6.0 (코드 분할 및 지연 로딩 포함)
- **상태 관리**: TanStack Query v5.90.3
- **테이블**: TanStack Table v8.20.5
- **시각화**: Recharts v2.15.0
- **스타일링**: Tailwind CSS v4.1.13 (PostCSS v4 활성화)
- **API 클라이언트**: Axios v1.12.2
- **기타**:
  - React Error Boundary v6.0.0
  - Radash v12.1.1 (유틸리티 라이브러리)
  - clsx v2.1.1 (동적 클래스명 관리)
  - tailwind-merge v3.3.1 (Tailwind 클래스 병합)

## 주요 기능

- **대시보드**: 주요 지표 개요 (영화 수, 평균 평점, 총 수익, 총 조회수)
- **영화 목록**: 정렬, 페이지네이션, 시뮬레이션 메트릭이 포함된 인터랙티브 테이블
- **분석 차트**: 수익 추이, 장르별 분포, 장르별 수익 등 다양한 시각화
- **TMDB API 통합**: 실시간 영화 정보 조회
- **시뮬레이션 메트릭**: 영화 ID를 기반으로 현실감 있는 수익 및 조회수 데이터 생성
- **개발자 도구**: TanStack Query DevTools 포함 (개발 환경)

## 시작하기

### 필수 요구사항

- Node.js v22.0.0+
- pnpm v10.20.0+

### 설치

모노레포 루트에서:

```bash
pnpm install
```

### 환경 변수

`apps/insights/` 디렉토리에 `.env.development`와 `.env.production` 파일을 생성하세요:

```env
VITE_TMDB_API_ACCESS_TOKEN=your_tmdb_api_token_here
VITE_API_BASE_URL=https://api.themoviedb.org
```

TMDB API 토큰은 [TMDB API](https://developer.themoviedb.org/reference/getting-started)에서 발급받을 수 있습니다.

## 개발

### 개발 서버 시작

```bash
pnpm insights dev
```

앱은 `http://localhost:3001`에서 자동으로 열립니다.

### 프로덕션 빌드

```bash
pnpm insights build
```

빌드 결과물은 `dist/` 디렉토리에 생성됩니다.

### 빌드 결과 미리보기

```bash
pnpm insights preview
```

### 타입 체크

```bash
pnpm insights typecheck
```

### 린팅

```bash
pnpm insights lint          # 린팅 문제 확인
pnpm insights lint:fix      # 자동 린팅 수정
```

### 코드 포맷팅

```bash
pnpm insights format
```

## 페이지

### 대시보드 (`/dashboard`)

주요 성과 지표를 표시하는 대시보드:

- **영화 수**: TMDB에서 가져온 총 영화 개수
- **평균 평점**: 모든 영화의 평균 평점
- **총 수익**: 시뮬레이션된 수익의 합계
- **총 조회수**: 시뮬레이션된 조회수의 합계
- **수익 추이 차트**: 시간대별 수익 변화 (라인 차트)

### 영화 (`/movies`)

인터랙티브 테이블을 통한 영화 데이터 조회:

- **컬럼**: 제목, 개봉일, 평점, 수익, 장르
- **기능**:
  - 컬럼별 정렬
  - 페이지네이션 (페이지당 20개 항목)
  - 영화별 시뮬레이션 메트릭 표시

### 분석 (`/analytics`)

다양한 시각화를 통한 데이터 분석:

- **장르별 분포**: 파이 차트
- **장르별 수익**: 바 차트
- **시간별 수익 추이**: 라인 차트

## API 통합

### TMDB API

`src/utils/api.ts`의 Axios 인스턴스를 통해 TMDB API와 통합됩니다:

- **베이스 URL**: `https://api.themoviedb.org`
- **인증**: Bearer 토큰 (환경 변수에서 읽음)
- **데이터 변환**: 자동으로 snake_case ↔ camelCase 변환

### Query 훅

TanStack Query를 사용한 데이터 페칭:

- **캐시 설정**: 5분 staleTime, 10분 gcTime
- **지연 로딩**: Suspense와 함께 동작
- **에러 처리**: React Error Boundary와 통합

## 데이터 시뮬레이션

`src/utils/simulation.ts`의 유틸리티 함수들:

- `generateMovieMetrics()` - 영화 ID 기반 일관된 수익/조회수 생성
- `generateTimeSeriesData()` - 차트용 시계열 데이터 생성
- `enrichMovieData()` - TMDB 데이터와 시뮬레이션 메트릭 통합

## 성능 최적화

- **React Compiler**: Babel 플러그인을 통한 자동 메모이제이션
- **코드 스플리팅**: React Router의 지연 로딩으로 번들 크기 최소화
- **컴포넌트 지연 로딩**: 모든 페이지 컴포넌트는 `lazy()`로 로딩
- **Suspense Fallback**: 로딩 중 Spinner 표시
- **Tree Shaking**: Vite의 자동 트리 셰이킹

## 스타일링

- **Tailwind CSS v4**: PostCSS 4 기반 새로운 엔진 사용
- **CSS 변수**: 테마 커스터마이징을 위한 CSS 변수 활용
- **글로벌 스타일**: `src/styles/global.css`에서 정의

## 모노레포 통합

이 프로젝트는 Movii 모노레포의 일부이며 다음의 공유 설정을 사용합니다:

- `@movii/eslint-config` - ESLint 규칙
- `@movii/prettier-config` - Prettier 설정
- `@movii/typescript-config` - TypeScript 기본 설정
- `@movii/browserslist-config` - 브라우저 대상 설정
- `@movii/icons` - SVG 아이콘 컴포넌트

## 라이센스

Movii 프로젝트의 일부입니다.
