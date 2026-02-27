# Nature Fit – Next.js Frontend Branding Guide

This document describes how the cloned Livit frontend has been rebranded into **Nature Fit**, and how the UI and code are organized so that backend integration and future UI improvements stay easy.

---

## 1. Brand Overview

- **Brand name**: Nature Fit  
- **Positioning**: Nature-driven, balanced meal plans focused on wellness and lifestyle.  
- **Tone**: Clean, calm, modern, health‑oriented.

---

## 2. Asset & Folder Structure

All static assets for Nature Fit should live under `public/` so that they are served by Next.js.

- `public/nature-fit/`
  - `logo-primary.jpg` – main logo (e.g. from `Nature Fit logo_page-0001.jpg`)
  - `logo-mark.jpg` – secondary or circular mark (e.g. from `Nature Fit logo_page-0002.jpg`)
  - `readme.txt` – short note explaining file usage (placeholder so folder exists in git)

> If you add or rename logo files later, just keep the same paths (`/nature-fit/logo-primary.jpg`, `/nature-fit/logo-mark.jpg`) or update `SiteShell.tsx` to match.

Existing Livit image references (hero, product shots, “why” icons, etc.) still point to the original URLs on `livit.ae`. These can be progressively replaced with local Nature Fit imagery under `public/nature-fit/` as you produce them.

---

## 3. Global Branding Changes in Code

### 3.1. App Metadata

- **File**: `src/app/layout.tsx`
- **Change**: Updated app metadata to Nature Fit:
  - `title`: `Nature Fit`
  - `description`: short phrase describing Nature Fit meal programs.

### 3.2. Header & Footer Branding

- **File**: `src/components/SiteShell.tsx`

Key changes:

- Replaced `Livit` branding with **Nature Fit** in:
  - Logo alt text
  - Footer copyright
- Swapped the logo `<img>` usage to expect Nature Fit assets:
  - Header desktop logo: `src="/nature-fit/logo-primary.jpg"`
  - Header mobile logo: `src="/nature-fit/logo-primary.jpg"`
  - Footer logo: `src="/nature-fit/logo-primary.jpg"`
- Left the **navigation structure** the same:
  - `MENU`, `OUR STORY`, `REGISTER / SIGN IN`, and quick links/policies.

> When the Nature Fit logo files are placed under `public/nature-fit/` with those names, they will be picked up automatically.

### 3.3. Home Page Copy

- **File**: `src/app/page.tsx`

Updated brand‑specific copy:

- Replaced references of “Livit” in the hero text and introductory section with **Nature Fit**.
- The overall structure (hero slider, two program tiles, “Inside next week’s menu”, “Why …?”) remains unchanged for now; only the name is updated.

### 3.4. Footer Text

- **File**: `src/components/SiteShell.tsx`

- Changed the footer copy from:
  - `EVERY MEAL IS MORE THAN FOOD, IT’S YOUR DAILY RITUAL.`
  - `© LIVIT 2025`
- To Nature Fit variants (same idea, new brand name and year):
  - `EVERY MEAL IS MORE THAN FOOD, IT’S YOUR NATURE FIT RITUAL.`
  - `© NATURE FIT 2025`

You can tune the exact phrases later if marketing wants different taglines.

---

## 4. Color System (Nature Fit)

We keep the existing layout from the Livit clone but override key colors via `src/app/globals.css` so that the brand feels nature‑focused.

### 4.1. Palette

- **Primary**: `#145A32` – Deep forest green (buttons, active states)
- **Primary Light / Accent**: `#A3D9A5` – Leafy light green (tabs, hover)
- **Background Accent**: `#F4F7F5` – Very light green‑tinted gray (section backgrounds)
- **Text Primary**: `#111827` – Near-black for good contrast
- **Text Muted**: `#4B5563`
- **Danger / Alert**: `#DC2626` (unchanged, used rarely)

### 4.2. Global Overrides

Added to `globals.css`:

- Set `body` text color to the darker neutral where helpful.
- Override key UI components that were Livit‑yellow:
  - `.top-header`, `.bottom-header` stripes → subtle green/neutral combination.
  - `.tab-button.active`, `.program-tab.active`, `.pill--highlight`, `.pill--active` → use primary green + light green.
  - `.cart-check`, `.contact_send`, `.add-checkout`, and other CTA buttons → primary green background, white text, rounded slightly.
  - `.bottom-cart-wrap` strip and checkout button background → primary green / darker neutral.

These overrides are written with **higher specificity than the imported Livit CSS**, so they take effect without needing to modify the remote stylesheet.

---

## 5. Menu / Program Data – Nature Fit Packages

The new Nature Fit packages are modeled so they can later be wired into backend APIs while already driving the UI:

### 5.1. Package Structure (for future backend)

Suggested TypeScript interface:

```ts
type NatureFitPackageId =
  | "wellness"
  | "lifestyle"
  | "balance"
  | "monster"
  | "custom_per_day";

interface NatureFitPackage {
  id: NatureFitPackageId;
  name: string;
  shortName: string;
  mealsDescription: string;
  combo: string;
  kcalRange: string;
  priceAed?: number;
  perDayPriceAed?: number;
}
```

### 5.2. Package Definitions (UI layer)

Use these as the canonical package definitions in a shared module (e.g. `src/config/natureFitPackages.ts`):

```ts
export const NATURE_FIT_PACKAGES: NatureFitPackage[] = [
  {
    id: "wellness",
    name: "Wellness Package",
    shortName: "WELLNESS PACKAGE",
    mealsDescription: "2 Meals & Snack",
    combo: "Breakfast & Lunch + Snack",
    kcalRange: "800–1000 kcal",
    priceAed: 1724,
  },
  {
    id: "lifestyle",
    name: "Life Style Package",
    shortName: "LIFE STYLE PACKAGE",
    mealsDescription: "2 Meals & Snack",
    combo: "Lunch & Dinner + Snack",
    kcalRange: "1000–1200 kcal",
    priceAed: 2128,
  },
  {
    id: "balance",
    name: "Balance Package",
    shortName: "BALANCE PACKAGE",
    mealsDescription: "3 Meals & Snack",
    combo: "Breakfast & Lunch & Dinner + Snack",
    kcalRange: "1400–1600 kcal",
    priceAed: 2405,
  },
  {
    id: "monster",
    name: "Monster Package",
    shortName: "MONSTER PACKAGE",
    mealsDescription: "4 Meals & Snack",
    combo: "Breakfast & Lunch & Dinner – Extra Meal + Snack",
    kcalRange: "1800–2000 kcal",
    priceAed: 2800,
  },
  {
    id: "custom_per_day",
    name: "Custom Package (per day)",
    shortName: "CUSTOM PACKAGE PER DAY",
    mealsDescription: "2–4 Meals",
    combo: "Mix and match per day",
    kcalRange: "",
    // reference prices per day below
  },
];
```

Per‑day custom pricing:

- **2 meals**: 85 AED / day  
- **3 meals**: 105 AED / day  
- **4 meals**: 225 AED / day  

These can be attached in the Cart & Checkout calculation logic inside dedicated pricing helpers later.

---

## 6. Stepwise UI Improvement Plan

Rather than rewrite the entire UI now, improvements will be phased to keep risk low and integration simple.

### Phase 1 – Visual Polish & Responsiveness

- Replace all remaining Livit colors with the Nature Fit palette via `globals.css` overrides:
  - CTA buttons, tabs, radio/checkbox labels, offcanvas headers, sticky bars.
- Tighten spacing and typography:
  - Normalize font sizes and line heights in `prod`, `product-tab`, and cart/checkout.
  - Ensure headings and subheadings use consistent font weights and letter spacing.
- Fix small layout issues:
  - Ensure sticky bars (`bottom-cart-wrap`) don’t overlap content on shorter screens.
  - Improve stacking order of overlays/menus so header/cart offcanvas never hide content unexpectedly.

### Phase 2 – Componentization & Reuse

- Extract shared UI components into `src/components/`:
  - `PrimaryButton`, `TabButtons`, `PackageCard`, `OrderSummaryPanel`, `FormField`.
- Move program/cart/checkout shared shapes into `src/config/` and `src/types/`:
  - Package definitions (`NATURE_FIT_PACKAGES`).
  - Normalized cart state structure to be used by both Cart and Checkout pages.
- Replace inline layout markup (like repeated `cart-img` headers) with reusable components.

### Phase 3 – Cart & Checkout UX Enhancements

- Connect Cart → Checkout with a **single cart context**:
  - Store selections in `CartContext` or a dedicated `useCartStore` hook.
  - Pre‑fill checkout order summary from actual cart state (no more mock numbers).
- Add richer feedback:
  - Inline validation messages for forms (guest/registration and delivery).
  - Disable “ORDER NOW” until required fields are valid.
  - Show a small “summary toast” when cart configuration changes significantly.

### Phase 4 – Accessibility & Performance

- Ensure semantic structure:
  - Proper heading hierarchy (`h1`–`h3`), `<label htmlFor>` on all inputs, ARIA roles on offcanvas and modals.
- Keyboard and screen‑reader support:
  - Focus trapping in offcanvas menus and overlays.
  - Keyboard navigation for program tabs, calorie buttons, and weekday selectors.
- Performance:
  - Move repeated static copy to configuration modules.
  - Lazy‑load heavy images (already partially done via `loading="lazy"`).
  - Consider Next `Image` component (once assets are local).

**Phase 4 implementation:** Copy is centralized in `src/config/copy.ts`. Heading hierarchy: one `h1` per page (often `.visually-hidden` where layout uses `h2`), with `h2`/`h3` for sections. All Cart/Checkout inputs use `id`/`htmlFor` and `role="radiogroup"`/`aria-labelledby` where appropriate. Emirates and Forgot-password offcanvas use `role="dialog"`, `aria-modal="true"`, and a focus trap (`useFocusTrap`). Program/calorie/weekday controls use native radios and checkboxes (keyboard support is built-in). PackageCard and “why” images use `loading="lazy"`; when assets move to `public/`, switch to `next/image` (see comment in `PackageCard.tsx`).

### Phase 5 – Backend Integration (Later)

When you’re ready to build the Nature Fit backend:

- Define a REST or GraphQL API that exposes:
  - `/packages` → Nature Fit packages & pricing (matching `NATURE_FIT_PACKAGES`).
  - `/cart/price` → authoritative price & discounts calculation.
  - `/checkout` → order creation and payment session generation.
- Replace:
  - Hard‑coded pricing and `console.log` calls in Cart and Checkout with real API calls.
  - `initialSummary` in Checkout with data derived from cart + backend response.

---

## 7. Summary

- All visible brand text and logos are now set up for **Nature Fit** in the header, footer, and home copy.  
- A **Nature Fit asset folder** is defined under `public/nature-fit/` for logos and future imagery.  
- Color and typography overrides are centralized in `globals.css` so we can keep iterating without touching the cloned external stylesheet.  
- A clear, phased plan is in place to gradually upgrade the UI and plug in a backend while keeping the current site usable during development.

