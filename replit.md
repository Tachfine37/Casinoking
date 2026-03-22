# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── casino-blog/        # CasinoKing Blog frontend (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## CasinoKing Blog

A production-ready casino & gambling blog with dark luxury aesthetics.

### Design System
- Background: #0a0a0f (very dark near-black)
- Primary accent: rich gold (#C9A84C)
- Secondary: deep emerald (#1a5c3a)
- Fonts: Playfair Display (headings) + DM Sans (body)

### Pages
- `/` — Homepage with hero, featured article, affiliate cards, article grid, newsletter bar, footer
- `/articles/:slug` — Article page with reading progress, breadcrumb, rich HTML content, affiliates sidebar
- `/category/:category` — Category page with paginated article grid
- `/about` — Static about page

### Components
- `ArticleCard` — Dark glass card with image, category badge, Playfair title
- `AffiliateCard` — Gold shimmer border, logo, rating, bonus text, CTA button
- `ReadingProgress` — Gold progress bar fixed at top on article pages
- `Layout` — Sticky navbar + footer with responsible gambling disclaimer

### Database Schema
- `articles` table: id, title, slug (unique), excerpt, content, category, image, author, author_bio, author_avatar, focus_keyword, meta_description, date, read_time, featured, published, created_at
- `affiliates` table: id, name, logo, rating, bonus, description, link, badge, position, active

### API Routes
- `GET /api/articles` — paginated articles (params: page, limit, category, featured)
- `GET /api/articles/slugs/all` — all published slugs
- `GET /api/articles/:slug` — single article
- `GET /api/categories` — categories with counts
- `GET /api/affiliates` — active affiliates ordered by position

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers
- Depends on: `@workspace/db`, `@workspace/api-zod`

### `artifacts/casino-blog` (`@workspace/casino-blog`)

React + Vite frontend for CasinoKing blog.

- Dark luxury casino theme with gold accents
- Uses `@workspace/api-client-react` hooks for data fetching
- Routing via Wouter
- UI: Tailwind CSS + shadcn/ui components

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

- `src/schema/articles.ts` — articles table
- `src/schema/affiliates.ts` — affiliates table
- `drizzle.config.ts` — Drizzle Kit config

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`).

Run codegen: `pnpm --filter @workspace/api-spec run codegen`
