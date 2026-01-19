# Next.js 15 + Supabase + TypeScript Template

Modern full‑stack starter powered by Next.js 15 (App Router), React 19, Supabase, and TypeScript. It ships with SSR-friendly Supabase auth, feature‑based file structure, Tailwind CSS, React Query, Zustand, and a ready-to-use testing setup.

## Tech Stack

- Next.js 15 (App Router, Server Components, Server Actions)
- React 19 + TypeScript
- Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- Tailwind CSS
- TanStack Query (React Query) v5
- Zustand state management

## Requirements

- Node.js >= 18
- pnpm (recommended; the repo specifies a `packageManager`)

## Quick Start

```bash
pnpm install

# Create .env.local with Supabase credentials (see below)

pnpm dev
```

Production run:

```bash
pnpm build
pnpm start
```

## Environment Variables

Create a `.env.local` at the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These are required by:

- `src/utils/supabase-client.ts` (client-side)
- `src/utils/supabase-server.ts` (server-side)
- `src/utils/supabase-middleware.ts` and `src/middleware.ts` (SSR auth session)

## Scripts

- `pnpm dev`: Start the development server
- `pnpm build`: Build for production
- `pnpm start`: Run the production server
- `pnpm lint`: Lint `./src` with Biome
- `pnpm format`: Format `./src` with Biome
- `pnpm check`: Biome check (lint + format diagnostics)
- `pnpm check:fix`: Autofix with Biome
- `pnpm type`: Type-check with `tsc --noEmit`

## Project Structure (Feature-Oriented)

This template organizes code by feature/domain. Auth-related pages, components, and server actions live together, improving cohesion and maintainability.

```
src/
  app/
    (auth)/
      actions.ts              # Server Actions for auth
      login/
        components/
          form.tsx
        page.tsx
      register/
        components/
          form.tsx
        page.tsx
    (main)/
      page.tsx                # Example main page
    layout.tsx                # Root layout
    provider.tsx              # App-wide providers (e.g., React Query)

  components/
    auth/
      logout-button.tsx
    ui/                       # Shared UI components

  hooks/                      # Shared hooks
  stores/                     # Zustand stores
  styles/                     # Global styles (Tailwind)
  types/                      # Shared types (e.g., Supabase typed DB)
  utils/                      # Utilities (Supabase client/server/middleware)

middleware.ts                 # Supabase session middleware
```

## Supabase Auth (SSR‑friendly)

- Client: `src/utils/supabase-client.ts` initializes the browser client.
- Server: `src/utils/supabase-server.ts` creates a cookie-aware server client.
- Middleware: `src/middleware.ts` + `src/utils/supabase-middleware.ts` keep sessions in sync and can gate routes (redirects unauthenticated users to `/login`).

Auth UI is scaffolded under `src/app/(auth)/login` and `src/app/(auth)/register`, using Server Actions in `src/app/(auth)/actions.ts`.

## Styling

- Tailwind CSS is preconfigured. Global styles live in `src/styles/global.css` and `tailwind.config.js`.

## State & Data Fetching

- React Query v5 is set up in the app provider for declarative data fetching and caching.
- Zustand is available for local, composable state.

## Linting, Formatting, and Types

- Lint: `pnpm lint`
- Format: `pnpm format`
- Check (report only): `pnpm check`
- Autofix: `pnpm check:fix`
- Type-check: `pnpm type`

## Deployment

This template works great on Vercel:

1. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your project environment.
2. Build command: `pnpm build`
3. Output: Next.js defaults

## License

MIT — see `license.md`.
