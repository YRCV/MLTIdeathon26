# CampusSwap — Claude Code Guide

## Project Overview
CampusSwap is a peer-to-peer student marketplace where college students **trade items** (no cash) with each other. Frontend-only MVP using mock data.

## Tech Stack
- **Framework**: React 19 + Vite 6
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4 + PostCSS
- **Components**: shadcn/ui (Radix UI primitives, New York style)
- **Animations**: Framer Motion v12
- **Language**: TypeScript 5.7

## Project Structure
```
frontend/
├── src/
│   ├── main.tsx          # Entry point
│   ├── App.tsx           # Router (AnimatePresence for page transitions)
│   ├── pages/            # Route-level pages
│   │   ├── Home.tsx
│   │   ├── Browse.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Trade.tsx     # /trade/:id — shows match-ranked trade offers
│   │   └── Messages.tsx  # /messages — split-pane chat UI
│   └── components/
│       └── PageTransition.tsx  # Shared animation variants
├── components/           # Shared UI components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── listing-card.tsx
│   ├── listing-modal.tsx
│   ├── filter-sidebar.tsx
│   ├── category-card.tsx
│   └── ui/               # shadcn/ui primitives (do not edit manually)
├── lib/
│   ├── sample-data.ts    # All mock listings & categories
│   └── utils.ts          # cn() utility
├── hooks/
├── app/globals.css       # Tailwind + CSS variables (imported by src/main.tsx)
├── index.html            # Entry HTML with iOS PWA meta tags
├── vite.config.ts
├── tsconfig.json
└── public/
    └── _redirects        # Cloudflare Pages SPA routing
```

## Path Aliases
`@/*` maps to the `frontend/` root directory. Components import like:
```ts
import { Button } from "@/components/ui/button"
import { listings } from "@/lib/sample-data"
import { PageTransition } from "@/src/components/PageTransition"
```

## Key Design Decisions
- **No cash/prices shown**: This is a trade-only platform. Prices exist in data but are never shown in the UI. Only "Free" is shown for free items.
- **Trade matching algorithm**: In `src/pages/Trade.tsx` — scores items by category match (3pts), price proximity (up to 3pts), and condition match (up to 2pts). Groups into High/Medium/Low.
- **Page transitions**: Every page wraps its root in `<PageTransition>`. `AnimatePresence` in `App.tsx` handles cross-page fade+slide animations.
- **iOS PWA**: `index.html` has apple-mobile-web-app meta tags so it can be added to iPhone home screen.

## Dev Commands
```bash
cd frontend
npm install
npm run dev      # Vite dev server → http://localhost:5173
npm run build    # TypeScript check + Vite build → dist/
npm run preview  # Preview built output
```

## Deployment (Cloudflare Pages)
- Build command: `npm run build`
- Build output: `dist/`
- Root directory: `frontend/`
- `public/_redirects` handles SPA client-side routing

## Adding New Pages
1. Create `src/pages/NewPage.tsx`, wrap root in `<PageTransition>`
2. Add route in `src/App.tsx`
3. Link from header/footer if needed

## Mock Data
All listings live in `lib/sample-data.ts`. The `ListingDetails` type is defined in `components/listing-modal.tsx` and re-exported from `lib/sample-data.ts`.
