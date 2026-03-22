# CampusSwap

A peer-to-peer student marketplace for trading items on campus. The core idea: **Trade Items, Not Money** — students exchange goods directly without spending cash.

Built as an MVP for MLTIdeathon 2026.

## What it does

- Browse and list items across categories: Textbooks, Furniture, Electronics, Bikes, Clothing, Kitchen, Housing
- Filter by price range, condition, and category
- View detailed listing modals with image gallery and seller info
- Verified student community (.edu email required)
- Local campus meetups only — no shipping

**Pages:**
- `/` — Landing page with hero, category cards, featured listings, and benefits
- `/browse` — Full listing grid with sidebar filters and sort options
- `/how-it-works` — Step-by-step guide, FAQs, and example trade scenario

## Tech Stack

- **Next.js 16** with App Router + TypeScript
- **Tailwind CSS v4** + **shadcn/ui** (New York style) + Radix UI
- **React Hook Form** + **Zod** for form validation
- **Vercel Analytics** for usage tracking

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm start       # run production server
npm run lint    # lint check
```

## Project Structure

```
frontend/
├── app/
│   ├── page.tsx              # Home/landing page
│   ├── browse/page.tsx       # Browse & filter listings
│   └── how-it-works/page.tsx # Onboarding / explainer page
├── components/
│   ├── header.tsx            # Sticky nav with search and mobile menu
│   ├── footer.tsx            # 4-column footer
│   ├── listing-card.tsx      # Listing preview card
│   ├── listing-modal.tsx     # Full listing detail modal
│   ├── filter-sidebar.tsx    # Price/condition/category filters
│   └── ui/                   # shadcn/ui component library
└── lib/
    ├── sample-data.ts        # Mock listings and categories
    └── utils.ts              # Tailwind class merge utility
```

## Status

Frontend-only MVP with mock data — no backend or auth yet. Designed for Vercel deployment.
