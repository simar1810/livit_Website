# Stepwise Frontend Implementation Plan (Backend Integration)

This document is a **step-by-step implementation plan** for integrating the Livit/Nature Fit Next.js frontend with the existing backend APIs. Each step can be implemented and tested independently. Follow the order below.

**Reference:** Backend API spec (NutriChef / Livit / Nature Fit) — base path `/api/v1`, Bearer JWT auth, OTP-based login/register, redirect Stripe Checkout.

---

## Prerequisites

- Backend running (e.g. `http://localhost:1111`).
- Frontend env set (see Step 1).
- You have a tenant ID from `GET /api/v1/tenant/list` for auth flows.

---

## Step 1: Environment & API client

**Goal:** Frontend can call the backend with the correct base URL and read env safely.

### 1.1 Environment variables

- Ensure `.env.local` exists (or create from `frontend.env.example` if provided by backend repo).
- Set:
  - `NEXT_PUBLIC_API_BASE_URL` — backend base URL, **no trailing slash** (e.g. `http://localhost:1111`).
  - `NEXT_PUBLIC_TENANT_ID` — default tenant ObjectId (optional but recommended for auth).
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — leave empty for redirect-only Stripe Checkout.

### 1.2 API base URL helper

- Add a small util that reads `process.env.NEXT_PUBLIC_API_BASE_URL` and returns it (with a fallback or throw in dev if missing).
- Use this everywhere you build API URLs so you have a single place to change.

**Deliverable:** A file (e.g. `src/lib/api.ts` or `src/config/env.ts`) exporting `getApiBaseUrl()` or `API_BASE_URL`, and ensure `.env.local` is in `.gitignore`.

### 1.3 Optional: shared fetch wrapper

- Create a helper that:
  - Prepends base URL to paths (e.g. `/api/v1/...`).
  - Sets `Content-Type: application/json` for POST/PUT.
  - Optionally accepts an `Authorization: Bearer <token>` and `X-Tenant-Id` header.
- Use this in later steps for consistent error handling and URL building.

**Deliverable:** e.g. `apiClient.get(path)`, `apiClient.post(path, body, { token?, tenantId? })` that return parsed JSON and throw or return errors in a known shape (using backend `status_code`, `message`, `data`).

---

## Step 2: Auth – tenant & token storage

**Goal:** App can resolve tenant ID and store/retrieve access and refresh tokens.

### 2.1 Tenant ID

- On first load (or in a small bootstrap), call `GET /api/v1/tenant/list` (no auth).
- Use the first tenant’s `_id` as default, or use `NEXT_PUBLIC_TENANT_ID` if set.
- Store in memory or context so auth requests can send it (header `X-Tenant-Id` or body `tenantId`).

**Deliverable:** A way to get `tenantId` (env or from tenant list) and send it on all auth requests.

### 2.2 Token storage and retrieval

- **Access token:** Stored in memory (React state/context) and optionally in a short-lived storage (e.g. `sessionStorage`) so it survives refresh within the same tab. Do **not** put it in `localStorage` if you want stricter security; otherwise localStorage is acceptable for SPA.
- **Refresh token:** Stored in `localStorage` or `sessionStorage` (backend does not use httpOnly cookies). Prefer a single key, e.g. `livit_refresh_token`.
- Create a small **auth store** (context or module) that:
  - Exposes `accessToken`, `refreshToken`, `setTokens(access, refresh)`, `clearTokens()`.
  - On init, reads refresh token from storage; access token can be null until you restore it via refresh (Step 3).

**Deliverable:** Auth context or store with token get/set/clear and persistence of refresh token.

---

## Step 3: Auth – refresh token & “me”

**Goal:** When the app loads with a stored refresh token, get a new access token and load the current user.

### 3.1 Refresh token flow

- Implement `POST /api/v1/auth/refresh` with body `{ refreshToken }`.
- On success, update stored access and refresh tokens from response `data`.
- On 401 or failure, clear tokens and treat user as logged out.

**Deliverable:** Function `refreshAuth()` that calls refresh, updates store, and returns success/failure.

### 3.2 Get current user (profile)

- Implement `GET /api/v1/user/profile` with header `Authorization: Bearer <accessToken>`.
- On 401: call `refreshAuth()` once; if still 401, clear tokens and redirect to login/register.
- On success, store user in auth context (e.g. `user` object: `_id`, `name`, `email`, `phone`, `countryCode`, etc.).

**Deliverable:** Function `fetchProfile()` (or `getMe()`) that uses access token and optional refresh retry; auth context exposes `user` and `isAuthenticated`.

### 3.3 Restore session on app load

- In layout or root component: if there is a refresh token, call refresh then fetch profile. Set user and tokens in context.
- If no refresh token or refresh fails, leave user null and show public UI (e.g. Register / Sign in links).

**Deliverable:** On load, session is restored when possible; header/nav can show “Register / Sign in” vs user name and Logout.

---

## Step 4: Auth – OTP send & verify (phone and email)

**Goal:** User can “Sign in” or “Register” via phone OTP or email OTP, and we get either tokens (existing user) or a registration token (new user).

### 4.1 Send OTP (phone)

- Add UI: phone input + country code (reuse existing dropdown). “Send OTP” button.
- On submit: `POST /api/v1/auth/otp` with body `{ phone, countryCode, tenantId }` (tenant from Step 2).
- Show success message (“OTP sent”) or display backend error (e.g. `message` or `data[].message`).

**Deliverable:** Registration page (or a dedicated “Sign in” flow) can send phone OTP and show feedback.

### 4.2 Verify OTP (phone)

- After sending OTP, show 6-digit OTP input and “Verify” button.
- On submit: `PUT /api/v1/auth/otp` with body `{ phone, countryCode, otp, tenantId }`.
- **If** response `data.isNewUser === false`: save `accessToken` and `refreshToken`, set user from `data.user`, then redirect to home or intended page.
- **If** `data.isNewUser === true`: save `data.registrationToken` in state (or temp storage); show “Complete registration” form (Step 5). Do **not** navigate away until register is done.

**Deliverable:** Phone verify step that either logs in or transitions to register form with `registrationToken`.

### 4.3 Send & verify email OTP

- Same flow as phone but use `POST /api/v1/auth/email` (body: `{ email, tenantId }`) and `PUT /api/v1/auth/email` (body: `{ email, otp, tenantId }`).
- Same handling: existing user → tokens + redirect; new user → `registrationToken` + show register form.

**Deliverable:** Email OTP send/verify on Registration (and optionally Checkout “Sign in” tab) with same success/error handling.

### 4.4 UI alignment

- **Registration page:** Replace “email + password” sign-in with “Sign in with Phone OTP” and “Sign in with Email OTP” (or tabs). Keep “Register” as the path for new users after OTP (complete profile with `registrationToken`).
- **Checkout “Sign in” tab:** Same: phone or email OTP → verify → if existing user, use tokens and prefill or link to profile; if new user, either complete register in place or redirect to Registration with `registrationToken` in state.

**Deliverable:** Registration and Checkout sign-in use only OTP flows; no password login.

---

## Step 5: Auth – register (complete profile with registrationToken)

**Goal:** After OTP verify returns `isNewUser: true`, user completes registration and receives tokens.

### 5.1 Register API

- Implement `POST /api/v1/auth/register` with body including:
  - `registrationToken` (required) from Step 4.
  - `type: "customer"`.
  - Optional profile: `name`, `email`, `gender`, `dob`, `heightCm`, `weightKg`, `targetWeightKg`, `goal`, `activityLevel`, `dietPreference`, `allergies`, `conditions`, `fcmToken`.
- Map frontend “First name” + “Last name” to single `name` (e.g. `"firstName lastName"`).

### 5.2 Register UI

- After verify OTP (phone or email) with `isNewUser: true`, show a “Complete your profile” form with at least: name (or first + last combined), email (if not already from email OTP), phone/countryCode (if from phone OTP). Optional: other profile fields if you want to collect them.
- On submit: call register with `registrationToken` and collected fields. On success: save tokens and user, clear `registrationToken`, redirect to home or checkout.

**Deliverable:** New users can complete registration after OTP; they are logged in and profile is stored in context.

---

## Step 6: Auth – logout & header state

**Goal:** Logout clears tokens and user; header reflects auth state.

### 6.1 Logout

- No backend call. On “Log out”: clear access and refresh tokens from store and storage, set user to null. Redirect to home or Registration if needed.

**Deliverable:** Logout button/link that clears tokens and updates UI.

### 6.2 Header / nav

- If `user` is set: show user name (or email) and “Log out”.
- If not: show “Register / Sign in” (link to `/Home/Registration` or open sign-in flow).
- Optional: use `fetchProfile()` on protected routes and redirect to login if 401 after refresh.

**Deliverable:** SiteShell (or layout) shows correct auth state and logout.

---

## Step 7: Programs & plans – fetch and use plan IDs

**Goal:** Cart and checkout use backend plan `_id` instead of numeric program IDs where the API requires it.

### 7.1 Fetch plans (authenticated)

- Implement `GET /api/v1/menu/plans` with `Authorization: Bearer <accessToken>`.
- Parse `data` as array of plans; each has `_id` (ObjectId string), `title`, `goalType`, `dietType`, `structure`, `pricing`, etc.

### 7.2 Plan ID in the app

- **Option A:** Replace numeric IDs (8, 14, 15, 17, 18) with backend `_id` everywhere. Update `CartState.programId` to `string` and cart options to use `_id` and `title` from API.
- **Option B:** Keep numeric IDs in UI and maintain a **mapping** `numericId → backend _id` (e.g. from config or from plan `title`/custom field). When calling APIs, send the backend `_id`.

Choose one approach and apply it to Cart page, Checkout, and any Program page that selects a plan.

**Deliverable:** Plans loaded from API (or mapping defined); cart/checkout use `templateId` = plan `_id` when calling backend.

### 7.3 Menu list (optional)

- If Program page should show dynamic menu: implement `GET /api/v1/menu/list` with query e.g. `type=templates` or `type=recipes`, and optional `completePlan=true`. Use response to render weekly menu instead of static `DAYS` data.

**Deliverable:** Optional: Program page menu driven by `/menu/list`; otherwise keep static menu until backend supports the exact structure you need.

---

## Step 8: Cart – keep client state; compute amount for checkout

**Goal:** Cart remains client-only; we compute payable amount and pass it to checkout session.

### 8.1 No cart API

- Keep current cart in React context (program/plan, proteins, calories, meals, days per week, weeks, weekdays, start date, customization, additional info). No sync with backend.

### 8.2 Amount calculation

- Backend has no dedicated pricing API. Use **plan `pricing`** from `GET /menu/plans` if available (e.g. by meal type and duration) to compute subtotal in AED.
- If plan `pricing` is missing or not applicable, keep your existing client-side formula (e.g. in `cartUtils.calculatePrice`) to get subtotal.
- Apply VAT (e.g. 5%) and delivery (0 or fixed) and any promo (0 for now). **Total in AED** → convert to **smallest currency unit** (fils) for backend: e.g. `amountInFils = Math.round(totalAed * 100)`.

**Deliverable:** Single source of “payable amount in AED” and “payable amount in fils” used at checkout.

### 8.3 Promo and referral

- No promo API: hide or disable “Promotional code” in checkout, or leave UI but always send 0 discount. No referral API: keep field for future or ignore in payload.

**Deliverable:** Checkout order summary shows correct total; promo/referral do not call backend.

---

## Step 9: Checkout – create session and redirect to Stripe

**Goal:** “Order now” creates a checkout session and redirects the user to Stripe.

### 9.1 Build checkout payload

- From cart state and checkout form, build:
  - `templateId`: selected plan’s backend `_id` (from Step 7).
  - `amount`: payable amount in **smallest unit** (fils for AED), integer.
  - `currency`: `"aed"`.
  - `productName`: e.g. plan title + “ – N weeks” (for display in Stripe).
  - `successUrl`: your app’s success URL with placeholder, e.g. `https://yourdomain.com/Home/CheckoutSuccess?session_id={CHECKOUT_SESSION_ID}` (in dev use `http://localhost:3000` or your Next.js port).
  - `cancelUrl`: e.g. `https://yourdomain.com/Home/CheckOut` or `/Home/CheckoutCancel`.

Use `window.location.origin` in client code so it works in dev and production.

### 9.2 Create session API

- Implement `POST /api/v1/checkout/session` with the payload above.
- **Logged-in users:** Frontend sends `Authorization: Bearer <token>` and `userId` (and optionally `tenantId`) in the body. Backend should accept this and link the order to the user.
- **Guest checkout:** If your backend supports orders without a logged-in user, the frontend can call this endpoint without auth and without `userId` (and may send guest contact details in the body if your API accepts them). **Confirm with your backend team** whether guest checkout is supported; if not, the “Continue as Guest” option will only work once the backend accepts unauthenticated session creation or you require sign-in before checkout.
- On success: read `data.url` and `data.orderId`. Redirect browser to `data.url` (Stripe Checkout page).

### 9.3 “Order now” button

- On click: validate required fields (guest info or logged-in user, delivery time slot, etc.). Compute amount (Step 8). Call create session. On success, `window.location.href = data.url`. On error, show backend `message` or validation errors from `data`.

**Deliverable:** Checkout “Order now” creates session and redirects to Stripe; user can pay on Stripe and is redirected back to your success URL.

---

## Step 10: Checkout – success and cancel pages

**Goal:** After payment, user lands on a success page; cancel shows a clear message.

### 10.1 Success page

- Create route e.g. `/Home/CheckoutSuccess` (or `/checkout/success`). Read `session_id` from query (Stripe replaces `{CHECKOUT_SESSION_ID}` in the URL).
- Call `GET /api/v1/checkout/session/:sessionId` with that id. Use response to show: payment status, order ID (from metadata if present), and a thank-you message. Optional: show order summary if backend returns it in session metadata.

**Deliverable:** Success page that confirms payment and shows order/session info.

### 10.2 Cancel page

- Create route e.g. `/Home/CheckoutCancel`. Optionally call `GET /api/v1/checkout/cancel` or just show “Payment canceled” and a link back to cart or checkout.

**Deliverable:** Cancel page with clear message and navigation back to checkout or cart.

---

## Step 11: Error handling and validation

**Goal:** All API errors are handled consistently; validation errors are shown next to fields when possible.

### 11.1 API error shape

- Assume backend returns `{ status_code, message, data }`. On 4xx/5xx, parse body and show `message`. If `data` is an array of `{ path, message }`, map `path` to field names (e.g. `body.email` → “Email”) and show under the right inputs.

### 11.2 Frontend validation

- Mirror backend rules where useful: OTP length (e.g. 4+ digits), email format, required fields for register and checkout. Validate before submit to avoid unnecessary round-trips.

### 11.3 401 and refresh

- In API client or interceptors: on 401, try refresh once; if refresh fails or returns 401, clear tokens and redirect to Registration (or show “Session expired”). Retry the original request after successful refresh if desired.

**Deliverable:** Centralized error handling; validation errors shown per field; 401 triggers refresh or logout.

---

## Step 12: Optional improvements

**Goal:** Polish and edge cases.

- **Delivery time slots / start dates:** Backend has no API. Keep static options in frontend (e.g. time slots and start dates in config). When backend adds endpoints, replace with API calls.
- **User addresses:** No CRUD. Keep collecting address in checkout form; when backend accepts address in order payload, add it to the checkout session request.
- **GET order by ID:** Not implemented. Rely on `GET /checkout/session/:sessionId` for confirmation. When backend adds `GET /orders/:id`, add an “Order details” page if needed.
- **Profile edit:** Use `PUT /api/v1/user/profile` for “Edit profile” with optional form and same field mapping as register.

**Deliverable:** Document what remains client-only until backend adds support; implement profile update if you have a profile page.

---

## Implementation order summary

| Step | Focus |
|------|--------|
| 1 | Env & API client (base URL, fetch wrapper) |
| 2 | Tenant ID & token storage (auth store) |
| 3 | Refresh token & profile (“me”), restore session on load |
| 4 | OTP send/verify (phone + email); UI for “Sign in” |
| 5 | Register with `registrationToken`; complete profile UI |
| 6 | Logout & header auth state |
| 7 | Fetch plans; use plan `_id` (or mapping) in cart/checkout |
| 8 | Cart stays client-side; compute amount (AED → fils); no promo |
| 9 | Checkout: build payload, POST session, redirect to Stripe |
| 10 | Success and cancel pages; GET session by id on success |
| 11 | Error handling, validation, 401/refresh |
| 12 | Optional: addresses, profile edit, delivery/start-date config |

You can ask the frontend agent to “implement Step N” and then test before moving to the next step.
