# Bookora

A responsive front-end prototype of a ticketing and travel marketplace. It is inspired by the layout of a South African ticket site, with original Bookora branding and mock data only.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The same homepage is also available at `/page/home`.

```bash
npm run build
npm start
```

## Stack

- Next.js 14 App Router, TypeScript, Tailwind CSS
- shadcn-style primitives (Dialog, Sheet, Tabs, Input, Button, Select, Popover, Calendar)
- embla-carousel-react, Zustand, Zod, react-hook-form, sonner, date-fns, react-day-picker

## Folders

- `app/` routes: home, search, event detail, flights, bus, accommodation, vouchers, stores, FAQ, contact, legal, cart
- `components/layout/` header, mobile navigation, footer, announcement bar
- `components/home/` homepage sections
- `components/ui/` cards, skeletons, and form primitives
- `data/` typed mock catalogues
- `lib/api.ts` async data access with a short artificial delay
- `lib/cart-store.ts` Zustand cart persisted in localStorage
- `types/` shared TypeScript types

## Swap the mock API

All UI reads go through async functions in `lib/api.ts`. To use a real backend:

1. Keep the return types in `types/index.ts`.
2. Replace each function body in `lib/api.ts` with `fetch` (or your client) and map the JSON into those types.
3. Leave the components as they are. They already `await` those functions or call them from client effects (search suggestions).

The cart stays in the browser until a checkout endpoint exists. Point the checkout form in `components/cart/CartView.tsx` at that endpoint when you have one.
