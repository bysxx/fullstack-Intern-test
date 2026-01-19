# Next.js 15 + TypeScript Template

Modern full-stack starter powered by Next.js 15 (App Router), React 19, and TypeScript. It ships with feature-based file structure, Tailwind CSS, React Query, and Zustand.

## Tech Stack

- Next.js 15 (App Router, Server Components, Server Actions)
- React 19 + TypeScript
- Tailwind CSS
- TanStack Query (React Query) v5
- Zustand state management

## Requirements

- Node.js >= 18
- pnpm (recommended; the repo specifies a `packageManager`)

## Quick Start

```bash
pnpm install

pnpm dev
```

Production run:

```bash
pnpm build
pnpm start
```

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
  types/                      # Shared types
  utils/                      # Utilities
```

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

1. Build command: `pnpm build`
2. Output: Next.js defaults

## License

MIT — see `license.md`.
