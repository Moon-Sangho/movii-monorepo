# Movii Monorepo

이 프로젝트는 영화 추천 사이트 Movii 서비스의 모노레포입니다.

## 소개

- 영화 추천 사이트 Movii와 기타 재사용 가능한 패키지들을 하나의 레포에서 관리합니다.

## 폴더 구조

```
apps/
  movii/         : 영화 추천 및 정보 제공 서비스

packages/
  browserslist-config: Browserslist 대상들을 모아둔 패키지
  carousel/      : 커스텀 React 캐러셀 컴포넌트
  eslint-config/ : 프로젝트용 ESLint 설정 패키지
  icons/         : SVG/React 기반 아이콘 컴포넌트 모음
  prettier-config/: 프로젝트용 Prettier 설정 패키지
  typescript-config/: TypeScript 공통 설정 패키지
```

## 각 패키지/프로젝트 소개

### apps/movii

- 영화 추천 및 정보 제공 서비스 (왓챠 클론코딩 간소화 버전)
- Next.js(pages router) 기반
- 주요 기능: 영화 목록, 상세 정보, 검색, 인물 정보 제공
- 현재 반응형 View는 지원하지 않습니다.

### packages/browserslist-config

- 모노레포에서 공통으로 사용하는 Browserslist 타깃을 모아둔 설정 패키지입니다.
- 각 앱/패키지의 `package.json`에서 `browserslist: ["extends @movii/browserslist-config"]` 형태로 확장해 사용합니다.

### packages/carousel

- 다양한 옵션을 지원하는 React 캐러셀 UI 컴포넌트
- 독립적으로 재사용 가능하며, movii 등 여러 프로젝트에서 활용 가능
- 주요 기능: 커스텀 스타일, 다양한 슬라이드 효과, 접근성 지원
- ESM과 CJS 동시 지원
- [NPM](https://www.npmjs.com/package/movii-carousel)에서 확인하실 수 있습니다.

### packages/eslint-config

- 모노레포 전체에서 사용할 수 있는 ESLint 규칙 모음.

### packages/icons

- SVG를 React 컴포넌트 형태의 아이콘 모음. 모노레포 내에서 사용가능.
- 다음과 같이 색상, 크기 등을 커스텀하여 사용할 수 있습니다.
  ```tsx
  <StarIcon className="fill-white size-6 mr-1" />
  ```

### packages/prettier-config

- 코드 스타일 일관성을 위한 Prettier 설정 공유 패키지. 모노레포 내에서 사용 가능

### packages/typescript-config

- TypeScript 프로젝트의 공통 설정을 제공하는 패키지. 모노레포 내에서 사용가능

## 개발 및 배포

- apps/movii: S3 + Cloudfront
- packages/carousel
  - npm 배포: local build 후 npm publish
  - storybook 배포: S3 + Cloudfront
