@AGENTS.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Event website for **RUSE AI HACK '26** — a 48-hour AI hackathon in Ruse, Bulgaria. Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and TypeScript. Deployed on Vercel.

The site is primarily in Bulgarian. Content strings and UI copy are in Bulgarian.

Use pnpm for all package management commands in this project.

## Commands

```bash
pnpm run dev          # Start dev server (next dev)
pnpm run build        # Production build
pnpm run lint         # ESLint (flat config, eslint.config.mjs)
pnpm run lint:fix     # ESLint with auto-fix
pnpm run format       # Prettier format src/**
pnpm run format:check # Prettier check
```

## Architecture

### Path alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

### Route groups

- `src/app/(site)/` — Public-facing pages (homepage, info, rules, register, tickets). Pages that need Nav/Footer (homepage, info, rules) include them via their own `layout.tsx` or directly. Register and ticket pages are full-screen standalone and do **not** include Nav/Footer.
- `src/app/(admin)/` — Admin panel pages (dashboard, login). No shared Nav/Footer — the admin dashboard uses its own `AdminNav` component.
- `src/app/api/` — API routes (stays at root, not inside route groups).

### Key directories

- `src/app/` — Next.js App Router pages and API routes (organized with `(site)` and `(admin)` route groups)
- `src/components/views/` — Full page content components (info, rules, register, ticket), barrel-exported via `index.ts`
- `src/components/sections/` — Landing page sections (hero, sponsors, agenda, jury, prizes, FAQ, CTA, about, organizer), barrel-exported via `index.ts`
- `src/components/admin/` — Admin-specific components (dashboard, nav, modals, sheet, table, stats, controls, status badge), barrel-exported via `index.ts`
- `src/components/ui/` — Reusable UI primitives (form fields, toast, animations), barrel-exported via `index.ts`
- `src/components/ticket/` — Ticket SVG rendering and visual components (for post-registration shareable tickets)
- `src/constants/` — Static data (agenda, jury, sponsors, prizes, FAQ, site config, form options, registration status), barrel-exported
- `src/lib/` — Utilities (`cn` helper, ticket helpers), Zod schemas, types; barrel-exported via `index.ts`
- `src/hooks/` — Custom hooks (tilt, scroll, clipboard, ticket download, live count, decrypt text, toast, in-view, admin registrations); barrel-exported

### Data flow

- **Registration**: Multi-step form (`register-page.tsx`) validated with Zod schemas (`lib/schemas.ts`) + react-hook-form. Submits to `POST /api/register` which writes to **Supabase** (provides ticket number).
- **Tickets**: After registration, users get a shareable ticket page at `/tickets/[slug]` (slug = `ticket_id` UUID). Ticket SVG is rendered client-side for download/sharing.
- **Live count**: `/api/count` endpoint calls Supabase `get_registration_count()` RPC; consumed by `useLiveCount` hook.
- **Avatar proxy**: `/api/avatar` proxies GitHub avatar fetches to avoid CORS issues.

### Site configuration

All event-specific values (dates, location, prizes, descriptions) are centralized in `src/constants/site.ts` (`siteConfig`).

### Database

Supabase PostgreSQL. Schema defined in `supabase-init.sql`. Single `registrations` table with auto-incrementing ticket numbers via a sequence. RLS enabled with public insert/select policies.

### Environment variables

See `.env.example`. Required for full functionality: Supabase URL + keys, Umami tracking ID + API key, site URL.

### Styling

Tailwind CSS v4 with `@tailwindcss/postcss`. Global styles in `src/app/globals.css`. Utility: `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge). Font variables: `--font-bebas` (Oswald), `--font-mono-google` (JetBrains Mono), `--font-serif-google` (Playfair Display), `--font-syne` (Manrope).

### ESLint

Flat config (`eslint.config.mjs`): next/core-web-vitals + next/typescript + prettier. `no-explicit-any` is warn-only. Unused vars with `_` prefix are allowed.

## Code Rules

### Styling

- Use `cn()` from `@/lib` for conditional or merged class names — never manual string concatenation.
- Prefer Tailwind utility classes over inline styles or CSS modules.

### Server vs Client Components

- Components are Server Components by default. Only add `"use client"` when the component actually needs browser APIs, hooks, or event handlers.
- Push `"use client"` boundaries as low as possible — wrap only the interactive leaf, not the whole page or section.
- Keep data fetching and async work in Server Components; pass data down as props to client components.

### Images

- Always use `next/image` instead of `<img>`. Provide `width`/`height` or use `fill` with a sized container. Set `alt` text.
- For remote images, ensure the hostname is listed in `next.config.ts` `images.remotePatterns`.

### Links & Navigation

- Use `next/link` for internal navigation, never `<a>` with relative paths.

### Imports

- Use the `@/*` path alias for all project imports.
- Import from barrel `index.ts` files where they exist (`@/lib`, `@/hooks`, `@/components/ui`, `@/components/sections`, `@/constants`).

### Performance

- Prefer `next/dynamic` with `ssr: false` for heavy client-only components (e.g., Three.js, confetti) instead of loading them synchronously.
- Avoid importing large libraries at the top level of Server Components if they're only needed client-side.
- Use `loading.tsx` or `<Suspense>` boundaries for async page segments.

### Forms & Validation

- All form validation schemas live in `src/lib/schemas.ts` using Zod. Reuse the same schemas on both client and server (API route).
- Use `react-hook-form` with `@hookform/resolvers/zod` for client-side form state.

### Data & Constants

- Static event data belongs in `src/constants/`. Types for data shapes live in `src/lib/types.ts`.
- Event-specific values (dates, names, copy) go in `siteConfig` — don't hardcode them in components.

### Component Organization

- **Route groups**: Public pages go in `(site)/`, admin pages go in `(admin)/`. Never mix them.
- **Nav & Footer**: These live in the `(site)/layout.tsx`. Never import `Nav` or `Footer` directly in page content components — they are provided by the layout.
- **Views vs Sections**: Full page content components belong in `src/components/views/`. Landing page sections belong in `src/components/sections/`.
- **Admin components**: All admin-specific UI belongs in `src/components/admin/`. Extract inline modals, sheets, and panels into separate component files.
- **Component size**: Keep components under ~200 lines. When a component grows larger, split UI into sub-components and logic into custom hooks.
- **Hook extraction**: When a component has 5+ `useState` calls or complex logic (debouncing, data fetching, pagination), extract that logic into a custom hook in `src/hooks/`.
- **Reusable UI**: Shared patterns (toast, modal, badges) belong in `src/components/ui/`. Don't inline them in page components.

### API Routes

- Validate all incoming request bodies with Zod schemas before processing.
- Return structured JSON (`{ ok, error?, ... }`) with appropriate HTTP status codes.
