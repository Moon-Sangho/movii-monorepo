# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo for the Movii project - a movie recommendation and information service (simplified Watcha clone).

**Tech Stack:**

- Package manager: pnpm (v10.20.0+)
- Node.js: v22.0.0+
- Build orchestrator: Turborepo
- Monorepo structure: apps/ and packages/ workspaces

## Common Commands

### Monorepo-wide commands (run from root)

```bash
# Build all packages and apps
pnpm build

# Type checking across all workspaces
pnpm typecheck

# Lint all workspaces
pnpm lint
pnpm lint:fix

# Format code
pnpm format
```

### Working with specific workspaces

```bash
# Run commands for the movii web app
pnpm web dev          # Start dev server (http://localhost:3000)
pnpm web build        # Production build
pnpm web start        # Serve built static files
pnpm web typecheck    # Type check
pnpm web lint         # Lint
pnpm web lint:fix     # Lint with auto-fix

# Run commands for the carousel package
pnpm carousel build           # Build library
pnpm carousel storybook       # Start Storybook (port 6006)
pnpm carousel build-storybook # Build Storybook
```

### Bundle analysis

```bash
pnpm web analyze  # Analyze bundle size with Next Bundle Analyzer
```

## Architecture

### Monorepo Structure

```
apps/
  movii/              - Main web application (@movii/web)
packages/
  browserslist-config - Shared browserslist targets
  carousel/           - React carousel component (published to npm as movii-carousel)
  eslint-config/      - Shared ESLint configuration
  icons/              - SVG/React icon components
  prettier-config/    - Shared Prettier configuration
  typescript-config/  - Shared TypeScript configuration
```

### Apps/Movii Architecture

**Framework:** Next.js with Pages Router (static export via `output: 'export'`)

**Key Features:**

- React Compiler enabled (`reactCompiler: true`)
- Static site generation for S3 + CloudFront deployment
- TMDB API integration for movie data
- Not responsive (desktop-focused)

**Directory Structure:**

```
src/
  add-ons/           - Additional React setup (e.g., TanStack Query DevTools)
  assets/            - Static assets
  components/        - Shared UI components (Button, Header, Layout, Spinner, etc.)
  containers/        - Page-level container components
  features/          - Feature-based modules
    genre/           - Genre-related functionality
    movie/           - Movie features (components, hooks, types)
    people/          - People/cast features
    search/          - Search functionality
    trending/        - Trending content
    tv/              - TV show types
  pages/             - Next.js pages (index, _app, _document, 404, contents/[id], people/[id], search)
  styles/            - Global styles
  utils/             - Utility functions (api, cn, object, sleep, string)
```

**Feature Module Pattern:**
Each feature follows a consistent structure:

```
features/<feature-name>/
  components/        - Feature-specific components
  hooks/
    queries/         - TanStack Query hooks (use-*-query.ts, query-keys.ts)
  types.ts           - TypeScript type definitions
```

### API Layer

**TMDB API Integration:**

- Axios instance configured in `src/utils/api.ts`
- Base URL: `https://api.themoviedb.org`
- Authentication: Bearer token from `NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN`
- Automatic key transformation: snake_case (API) ↔ camelCase (app)
- Request interceptor: converts params to snake_case
- Response interceptor: converts response data to camelCase

**Data Fetching:**

- TanStack Query for server state management
- Query hooks organized in `features/*/hooks/queries/`
- Query keys centralized in `query-keys.ts` files

### Environment Variables

**Required for TMDB API:**

- `NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN` - Get from [TMDB API](https://developer.themoviedb.org/reference/getting-started)
- Configure in `.env.development` and `.env.production` files in `apps/movii/`

### Static Export & Routing

**Static Server Setup:**

- Uses `serve` package to serve static files from `out/` directory
- `serve.json` contains rewrite rules for dynamic routes (e.g., `/contents/123` → `/contents/[id].html`)
- Production deployment: CloudFront Functions handle URI rewrites for dynamic routes

**Custom Port:**

```bash
pnpm -C apps/movii exec serve -l 3010 -c ../serve.json out
```

### Package Development

**Carousel Package:**

- Dual format: ESM and CJS
- Published to npm as `movii-carousel`
- Development: Use Storybook for component development
- Build: Vite with `vite-plugin-dts` for type declarations

### Shared Configurations

**Extending shared configs:**

- ESLint: Import from `@movii/eslint-config`
- Prettier: Set `"prettier": "@movii/prettier-config"` in package.json
- TypeScript: Extend from `@movii/typescript-config`
- Browserslist: Set `"browserslist": ["extends @movii/browserslist-config"]`

**PNPM Workspace Catalog:**
Common dependencies are managed via catalog in `pnpm-workspace.yaml`:

- `react`, `react-dom`: ^19.1.1
- `typescript`: ^5.9.2
- `eslint`: ^9.36.0
- `prettier`: ^3.6.2
- `@types/react`, `@types/react-dom`

Use `catalog:` in package.json to reference catalog versions.

### Build System

**Turborepo Configuration:**

- Build pipeline defined in `turbo.json`
- `build` task has dependency on `^build` (dependencies build first)
- Special outputs for `@movii/web#build`: `.next/**`, `out/**`
- Environment variable required for web build: `NEXT_PUBLIC_TMDB_API_ACCESS_TOKEN`

### Code Quality

**Git Hooks:**

- Husky pre-commit hook runs `lint-staged`
- Lint-staged configuration enforces code quality before commits

**Naming Conventions:**

- API responses: snake_case (converted to camelCase automatically)
- TypeScript: camelCase for variables/functions, PascalCase for types/components
- File names: kebab-case for components, utilities

### Deployment

**Movii Web App:**

- Platform: AWS S3 + CloudFront
- Build output: Static files in `out/` directory
- GitHub Secrets required: `TMDB_API_ACCESS_TOKEN`

**Carousel Package:**

- NPM package: Published manually after local build
- Storybook: Deployed to S3 + CloudFront
