# CLAUDE.md - AI Assistant Guide for Adel Restaurant Website

## Project Overview

Czech restaurant website for "Restaurace Adéla" — a full-stack Next.js application with a Convex real-time backend. All user-facing content is in **Czech (cs-CZ)**.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict mode) |
| React | v19 |
| Styling | Tailwind CSS v4 + CSS variables |
| Animation | Framer Motion 12 |
| Backend/DB | Convex 1.32 (serverless, real-time) |
| Icons | @hugeicons/react |
| PDF | @react-pdf/renderer |
| Fonts | Inter (sans), Playfair Display (serif) |

## Commands

```bash
npm run dev      # Start dev server (Next.js + Convex)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, metadata, JSON-LD)
│   ├── globals.css         # Global styles, CSS variables, theme
│   ├── page.tsx            # Home (/)
│   ├── menu/page.tsx       # Full menu (/menu)
│   ├── admin/page.tsx      # Admin panel (/admin) — auth-protected
│   ├── svatby/page.tsx     # Weddings (/svatby)
│   ├── galerie/page.tsx    # Gallery (/galerie)
│   ├── kontakt/page.tsx    # Contact (/kontakt)
│   └── rezervace/page.tsx  # Reservations (/rezervace)
├── components/
│   ├── sections/           # Page-level composable blocks (Hero, About, Footer, etc.)
│   ├── motion/             # Framer Motion wrappers (FadeIn, SlideUp, StaggerContainer)
│   ├── ui/                 # Reusable primitives (Button, Container, SectionWrapper)
│   ├── Navigation.tsx      # Sticky responsive header
│   ├── ConvexProvider.tsx  # Convex React provider
│   ├── DailyMenuPDF.tsx    # PDF export trigger
│   └── DailyMenuPDFDocument.tsx  # PDF document layout
├── lib/
│   ├── constants.ts        # Restaurant info, hours, features, sample menus, reviews
│   ├── utils.ts            # cn(), formatPrice(), formatDate()
│   └── images.ts           # Centralized image path definitions
└── types/
    └── index.ts            # Shared TypeScript interfaces

convex/
├── schema.ts               # DB schema (dailyMenu, dailyMenuHistory, adminSessions)
├── auth.ts                 # login/logout/verifySession mutations & queries
├── dailyMenu.ts            # Menu CRUD — public queries + token-protected admin mutations
└── _generated/             # Auto-generated Convex types (DO NOT EDIT)

public/
├── fonts/                  # TTF font files (Inter, Playfair Display)
├── images/                 # Restaurant photography organized by section
├── Logo.svg                # Restaurant logo
└── bg.mp4                  # Hero background video
```

## Key Conventions

### Path Alias
- `@/*` maps to `./src/*` — always use `@/` imports (e.g., `import { cn } from "@/lib/utils"`)

### Styling
- Use Tailwind CSS utility classes; compose with `cn()` from `@/lib/utils` (clsx + tailwind-merge)
- Theme colors are CSS variables defined in `globals.css`:
  - `--gold: #B8860B` (primary accent)
  - `--charcoal: #1C1C1C` (dark text)
  - `--cream: #FDFBF7` (light background)
  - `--ivory: #F5F3EE` (section background)
  - `--stone: #E8E4DD` (borders)

### Components
- **Sections** (`components/sections/`) are page-level blocks composed into route pages
- **UI** (`components/ui/`) are small reusable primitives
- **Motion** (`components/motion/`) wrap Framer Motion — use these for scroll animations
- Animations respect `prefers-reduced-motion`

### Data & State
- **Convex** for all backend data — use `useQuery()` and `useMutation()` hooks from `convex/react`
- Real-time sync, no manual refetching needed
- Admin endpoints require a session token (validated server-side in Convex functions)
- Constants (restaurant info, static content) live in `src/lib/constants.ts`

### Convex Backend
- `convex/_generated/` is auto-generated — never edit these files
- All admin mutations validate the session token before performing operations
- Schema uses indexes (`by_date`, `by_token`, `by_menu_date`) for efficient queries
- `dailyMenu` table stores current menus; `dailyMenuHistory` stores version snapshots

### Currency & Locale
- All prices formatted with `formatPrice()` → `"305 Kč"` format
- Dates formatted with `formatDate()` using `cs-CZ` locale
- All UI text is in Czech — maintain this when adding or editing content

### Images
- Use Next.js `<Image>` component with optimization
- Image paths centralized in `src/lib/images.ts`
- Remote images allowed from: unsplash, pexels, cdn.kudyznudy.cz, d48-a.sdn.cz (configured in `next.config.ts`)

### TypeScript
- Strict mode enabled — no `any` types
- Shared interfaces in `src/types/index.ts`
- Convex schema types auto-generated in `convex/_generated/dataModel.d.ts`

## Environment Variables

Required env vars (not committed — see `.env.local`):
- `NEXT_PUBLIC_CONVEX_URL` — Convex deployment URL
- Admin password configured in Convex environment (checked in `auth.ts`)

## Deployment

- Deployed on **Vercel** (`.vercel` in gitignore)
- Convex backend deployed separately via Convex CLI
