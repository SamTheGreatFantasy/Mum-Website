# Fitting in Knitting

A React + Vite single-page knitting app with a professional component structure, a pattern library system, shop, basket, favourites, account management, and settings.

## Stack

- **React 19** + **Vite 8** (frontend only, no backend)
- **Vitest** + **@testing-library/react** for unit tests

## Running the app

```
npm run dev
```

Starts the dev server on port 5000. The "Start application" workflow handles this automatically.

## Other scripts

```
npm run build    # production build
npm run test     # run vitest unit tests
npm run lint     # ESLint
npm run preview  # preview production build locally
```

---

## Project structure

```
src/
  context/
    AppContext.jsx        # Global state (theme, basket, favourites, account, sound)
  hooks/
    useLocalStorage.js   # Generic localStorage-backed useState
    useBasket.js         # Basket CRUD + localStorage persistence
    useFavourites.js     # Favourites toggle + localStorage persistence
    useRecentlyViewed.js # Recently viewed pattern IDs (last 10)
  services/
    patternService.js    # Loads all patterns via import.meta.glob; filter/sort helpers
  patterns/              # ← Add new patterns here
    autumn-leaves-beanie/
      data.json          # Full pattern data (see schema below)
    cosy-cable-sweater/
      data.json
    lace-garden-shawl/
      data.json
    baby-blanket-bliss/
      data.json
    striped-fingerless-gloves/
      data.json
  components/
    PatternCard.jsx/css  # Grid card with image, badges, favourite toggle
    PatternDetail.jsx/css# Full detail view: gallery, specs, instructions, reviews
    FilterBar.jsx/css    # Search + filters + sort buttons
    Gallery.jsx/css      # Image gallery with thumbnails
    ReviewList.jsx/css   # Review cards with expand toggle
    StarRating.jsx/css   # Reusable star display
    SignOutModal.jsx     # Sign-out confirmation overlay
  pages/
    DashboardLayout.jsx  # Sidebar navigation shell
    PatternDashboardPage # Pattern grid + detail navigation
    HomePage.jsx
    FavouritesPage.jsx
    AccountPage.jsx
    ShopPage.jsx
    BasketPage.jsx
    ContactPage.jsx
    AboutPage.jsx
    SettingsPage.jsx
  data/
    catalogue.js         # Shop products + legacy pattern data (SVG placeholders)
  assets/
    About/               # About page images
    Sounds/              # click.mp3 UI sound effect
  App.jsx                # Thin shell — AppProvider + AppRouter
  App.css                # All global styles + CSS variable theming
```

---

## Adding a new pattern

1. Create `src/patterns/[your-slug]/data.json` (copy any existing pattern as a template).
2. Add images to `src/patterns/[your-slug]/images/` and reference them in `data.json`.
3. The pattern dashboard picks it up automatically — no other files need changing.

### Pattern data.json schema

```json
{
  "id": "my-pattern-slug",
  "title": "Pattern Title",
  "description": "...",
  "designer": "Name",
  "category": "Accessories|Clothing|Blankets|Toys|Home Décor",
  "difficulty": "Beginner|Intermediate|Advanced",
  "yarnWeight": "DK|Worsted|Sport|Bulky|Cotton|Fingering",
  "yarnRequirements": "...",
  "needleSize": "4 mm",
  "finishedMeasurements": { "width": "...", "length": "..." },
  "gauge": "... = 10 cm",
  "estimatedTime": "6–10 hours",
  "tags": ["tag1", "tag2"],
  "priceAmount": null,
  "downloadLink": "#",
  "featuredImage": "https://...",
  "galleryImages": ["https://...", "https://..."],
  "addedAt": "2024-01-01",
  "rating": 4.5,
  "reviewCount": 12,
  "popularity": 80,
  "materials": ["item 1", "item 2"],
  "instructions": [
    { "step": 1, "title": "Step title", "body": "Step body..." }
  ],
  "reviews": [
    { "id": 1, "author": "Name", "rating": 5, "date": "2024-06-01", "body": "..." }
  ]
}
```

---

## Connecting to a database later

`src/services/patternService.js` is the only file that loads pattern data. Replace `getAllPatterns()` with an async API call and all consumers update automatically — no component changes needed.

---

## Notes

- All global state lives in `AppContext` and is provided via `useApp()` hook.
- Basket, favourites, recently viewed, theme, and profile are all persisted to `localStorage`.
- Shop products (physical goods) are in `src/data/catalogue.js` — separate from the pattern library.
- Asset folder name is `About` (capital A) — imports must match this casing.

## User preferences
