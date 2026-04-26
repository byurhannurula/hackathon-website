# RUSE AI HACK '26 — Event Site

The official site for **[RUSE AI HACK '26](https://aihack.startupfactory.bg)** — the first 48-hour AI hackathon in Ruse, Bulgaria. Built with Next.js 16, React 19, Tailwind CSS v4, TypeScript and Supabase. Deployed on Vercel.

The site itself is in **Bulgarian**; this README and the codebase are in English.

> Want to see how the site is built and who inspired what? Visit **[/code](https://aihack.startupfactory.bg/code)** — a behind-the-scenes page covering the stack, performance techniques and credits.

---

## Highlights

- **Next.js 16 App Router** with React Server Components by default
- Route-group split: `(site)` for the public event site, `(admin)` for the dashboard
- **Multi-step registration** with `react-hook-form` + Zod, persisted to Supabase
- **Per-attendee shareable tickets** at `/tickets/[slug]` — SVG rendered client-side, exportable as PNG via `html-to-image`
- **WebGL hero** (Three.js dotted-surface) loaded client-only behind `next/dynamic` with `ssr: false`
- **Transactional emails** via Resend + `@react-email/components`
- **Admin dashboard** with stats, controls and a registrations sheet
- Two site modes via `NEXT_PUBLIC_EVENT_MODE`: `event` (pre-event landing) and `showcase` (post-event gallery)

---

## Tech stack

| Area               | Tools                                                           |
| ------------------ | --------------------------------------------------------------- |
| Framework          | Next.js 16.2, React 19.2, TypeScript 5                          |
| Styling            | Tailwind CSS v4, `clsx`, `tailwind-merge`, `lucide-react`       |
| Animation / 3D     | `framer-motion`, `three`, `vanilla-tilt`, `canvas-confetti`     |
| Forms & validation | `react-hook-form`, `zod`, `@hookform/resolvers`                 |
| Backend            | Supabase (Postgres + RLS), Resend, `@react-email/components`    |
| Ticket export      | `html-to-image`                                                 |
| Analytics          | Umami, `@vercel/speed-insights`                                 |
| Tooling            | ESLint 9, Prettier, Vitest, Testing Library, Husky, lint-staged |
| Hosting            | Vercel                                                          |

Versions live in [`package.json`](./package.json).

---

## Project structure

```
src/
├── app/
│   ├── (site)/              # Public site — homepage, info, rules, register, tickets, showcase, code
│   ├── (admin)/             # Admin dashboard + login
│   ├── api/                 # Route handlers (register, count, avatar, og, …)
│   ├── layout.tsx           # Root layout
│   └── globals.css
├── components/
│   ├── sections/            # Landing-page sections (hero, agenda, jury, prizes, FAQ, …)
│   ├── views/               # Full page-content components (info, rules, register, ticket, code, …)
│   ├── ui/                  # Reusable primitives (toasts, links, animations, shaders)
│   ├── ticket/              # Ticket SVG + visual rendering
│   ├── admin/               # Admin dashboard UI
│   ├── nav.tsx              # Site navigation
│   └── footer.tsx           # Site footer
├── constants/               # Static event data (agenda, jury, prizes, FAQ, siteConfig)
├── emails/                  # @react-email templates
├── hooks/                   # Custom hooks (tilt, decrypt-text, live-count, ticket-download, …)
└── lib/                     # Utilities, Zod schemas, types
```

Path alias `@/*` maps to `./src/*`.

Conventions and architectural rules are documented in [`CLAUDE.md`](./CLAUDE.md) and [`AGENTS.md`](./AGENTS.md).

---

## Getting started

### Prerequisites

- **Node.js 20+** (developed on 24)
- **pnpm 10+**
- A **Supabase** project (for registrations + live count)
- A **Resend** account (for transactional emails) — optional in dev

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment variables and fill them in
cp .env.example .env.local

# 3. Initialise the Supabase schema
#    Open the Supabase SQL editor and run the contents of:
#    supabase-init.sql

# 4. Start the dev server
pnpm run dev
```

The site is now running at <http://localhost:3000>.

### Scripts

```bash
pnpm run dev          # next dev
pnpm run build        # production build
pnpm run start        # serve production build
pnpm run lint         # ESLint (flat config)
pnpm run lint:fix     # ESLint with --fix
pnpm run format       # Prettier write
pnpm run format:check # Prettier check
pnpm run test         # Vitest
pnpm run test:watch   # Vitest watch mode
pnpm run email:dev    # @react-email preview server
```

---

## Environment variables

See [`.env.example`](./.env.example) for the full list. Summary:

| Variable                        | Purpose                                                         |
| ------------------------------- | --------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Public origin used for OG images and share links                |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                                            |
| `SUPABASE_PRIVATE_KEY`          | Supabase service-role key (server-only)                         |
| `NEXT_PUBLIC_VIDEO_ID`          | YouTube ID for the landing-page video section (hidden if empty) |
| `NEXT_PUBLIC_SHOWCASE_VIDEO_ID` | YouTube ID for the `/showcase` video (hidden if empty)          |
| `NEXT_PUBLIC_EVENT_MODE`        | `event` (default) or `showcase` — flips the homepage            |
| `NEXT_PUBLIC_UMAMI_TRACKING_ID` | Umami tracking ID                                               |
| `UMAMI_API_KEY`                 | Umami Cloud API key (admin stats)                               |
| `ADMIN_PASSWORD`                | Password for the admin login                                    |
| `ADMIN_SECRET`                  | 64-char hex used to sign the admin session                      |
| `RESEND_API_KEY`                | Resend API key for transactional emails                         |
| `EMAIL_FROM`                    | `From:` header used by Resend                                   |

---

## Architecture notes

- **Route groups** keep the public site (`(site)`) and admin panel (`(admin)`) cleanly separated, with their own layouts. `Nav` and `Footer` are provided by `(site)/layout.tsx` — never imported from page components.
- **Zod schemas** (`src/lib/schemas.ts`) are shared between the registration form on the client and `POST /api/register` on the server.
- **Site config** (`src/constants/site.ts`) centralises every event-specific value (dates, location, prizes, social links). Don't hardcode them in components.
- **Performance**: heavy client-only modules are loaded with `next/dynamic({ ssr: false })` (Three.js hero, cursor trail, Konami easter egg, showcase view) and library imports happen inside `useEffect` (canvas-confetti, vanilla-tilt, three). `next.config.ts` adds `experimental.optimizePackageImports` for `lucide-react`, `framer-motion` and `three`, plus security headers and AVIF/WebP image formats. See [/code](./src/components/views/info.tsx) for a longer write-up.
- **Next.js 16 caveat**: this version ships breaking changes versus Next 14/15. Read the docs in `node_modules/next/dist/docs/` before assuming an API still works the same way.

---

## Deployment

The site is deployed on **Vercel**. To deploy your own fork:

1. Push the repo to GitHub.
2. Import it into Vercel.
3. Set the environment variables from the table above in the Vercel dashboard.
4. Run [`supabase-init.sql`](./supabase-init.sql) against your Supabase project.

Every push to `main` deploys to production.

---

## Credits & inspirations

- **Ticket UX** is heavily inspired by the **[Next.js Conf](https://nextjs.org/conf)** ticket system.
- A handful of animations, components and design moments are inspired by **[21st.dev](https://21st.dev)**.
- The longer list of credits and tooling lives on the [/code](https://aihack.startupfactory.bg/code) page.

---

## License

[MIT](./LICENSE) — copyright © 2026 Byurhan Nurula.

Built with much vibe by **[@byurhannurula](https://linkedin.com/in/byurhannurula)**.
