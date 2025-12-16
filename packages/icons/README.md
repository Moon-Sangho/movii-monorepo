# @movii/icons

모노레포에서 공통으로 사용하는 SVG 기반 React 아이콘 컴포넌트 모음입니다.

## 사용법

```tsx
import StarIcon from '@movii/icons/star';
import SearchIcon from '@movii/icons/search';

export function Example() {
  return (
    <div className="flex items-center gap-2">
      <StarIcon className="size-5 fill-white" />
      <SearchIcon className="size-5 fill-(--color-tertiary-text)" />
    </div>
  );
}
```

- 스타일링은 `className`으로 제어합니다. (`size-*`, `fill-*`, `stroke-*` 등)
- 각 아이콘은 기본적으로 `default export`입니다.

## 아이콘 추가하기

1. `src/` 아래에 파일을 추가합니다. 예: `src/new-icon.tsx`
2. 컴포넌트는 `default export`로 내보냅니다.
3. SVG에는 `viewBox`를 포함하고, `...props`를 `<svg>`에 전달합니다.

예시:

```tsx
const NewIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
    <path d="..." />
  </svg>
);

export default NewIcon;
```
