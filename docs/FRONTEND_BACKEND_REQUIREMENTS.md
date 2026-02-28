# Frontend → Backend Requirements Document

This document describes **what the Livit/Nature Fit frontend needs from the backend** so that login, signup, cart, checkout, Stripe, programs, and plans can be fully integrated. **No backend changes are requested**—only a clear specification of APIs, data shapes, and environment setup so the frontend can be implemented against your existing backend.

---

## 1. Environment & Configuration

### 1.1 What the frontend needs from you

The frontend is a **Next.js app** and will call your backend APIs from both **server and client**. We need:

- **Base URL** for all API requests (e.g. `https://api.example.com` or `http://localhost:3001`).
- **Stripe**  
  - If Stripe Checkout or Payment Element is used from the **client**, we need the **Stripe Publishable Key** (e.g. `pk_test_...` / `pk_live_...`).  
  - If the backend creates Stripe sessions and returns a URL or `clientSecret`, we only need the base API URL; the frontend will call your backend, and you use the secret key on the server.
- Any **CORS** rules we must respect (origins, credentials).
- Whether auth uses **cookies**, **Bearer tokens**, or **other** (see Auth section).

### 1.2 Request to backend team: env setup

Please provide:

1. **List of environment variables** the frontend must set to talk to your backend (names and purpose).  
   Example:
   - `NEXT_PUBLIC_API_BASE_URL` – backend base URL
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` – (if applicable) Stripe publishable key for client
2. **`.env.example`** (or equivalent) with placeholder values and short comments, so we can create `.env.local` and document setup for other developers.
3. **Which env differs per environment** (e.g. dev vs staging vs production) and any rules (e.g. no trailing slash on base URL).

---

## 2. Authentication

### 2.1 Current frontend behavior

- **Registration page** (`/Home/Registration`): Register form, Sign in form, Forgot password (offcanvas). Buttons currently do nothing (no API calls).
- **Checkout page** (`/Home/CheckOut`): Same flows in tabs—Guest, Register, Sign in. Guest collects: first name, last name, email, phone (+ country code). Register/Sign in use the same field concepts as Registration.

We need to wire these to your auth APIs.

### 2.2 Required auth APIs and behavior

| Action | What frontend will do | What we need from backend |
|--------|------------------------|----------------------------|
| **Register** | POST with: first name, last name, email, password, confirm password, phone, country code. | Endpoint URL, request body shape, success/error response shape. How the user is considered “logged in” after signup (e.g. session cookie, JWT in body). |
| **Sign in / Login** | POST with: email (or “email or mobile”), password. | Endpoint URL, request body shape, success/error response. How the frontend receives and stores auth (cookie set by backend, or token in JSON). |
| **Forgot password** | POST with: email. | Endpoint URL, request body, success/error. Any “OTP sent” or “reset link sent” message we should show. |
| **Reset password / OTP verify** | Registration page has a hidden “Verify OTP” block; if you use OTP for reset or 2FA, we need: endpoint to submit OTP, endpoint to set new password (if separate). | Endpoint(s), request/response shapes. |
| **Session / “me”** | Call on app load or before protected actions to know current user. | Endpoint (e.g. `GET /me` or `GET /auth/session`) and response shape (e.g. `{ id, email, firstName, lastName, phone, ... }`). |
| **Logout** | User clicks logout. | Endpoint (e.g. `POST /auth/logout`) and behavior (e.g. clear cookie). |

### 2.3 Auth mechanism

Please specify:

- **Cookies**: domain, path, `httpOnly`, `secure`, sameSite. Do you set a session cookie on login/register, or do we need to send something in a header on every request?
- **Bearer token**: If you return a JWT (or similar), where is it returned (body vs header)? Where should the frontend store it (memory, localStorage, cookie) and under what name? Which requests must include it (e.g. `Authorization: Bearer <token>`)?
- **Refresh**: If tokens expire, is there a refresh endpoint and flow (e.g. refresh token in cookie or body)? We need the contract so we can implement silent refresh or redirect to login.

### 2.4 Frontend fields we will send (for alignment)

- **Register**: `firstName`, `lastName`, `email`, `password`, `confirmPassword`, `phone`, `countryCode` (e.g. +971).
- **Login**: `email` (or `emailOrMobile` if you accept both), `password`.
- **Guest checkout**: `guestFirst`, `guestLast`, `guestEmail`, `guestPhone`, `countryCode`.

If your API uses different names (e.g. `first_name`, `mobile`), please provide the exact field names and types so we can map.

---

## 3. Programs & Plans (catalog)

### 3.1 Current frontend usage

- **Cart & Checkout** use a fixed list of **programs** with numeric IDs:  
  `8` = Signature Program, `14` = RAMADAN Program, `15` = Gut Restore, `17` = Gut Restore x AL DAS CLINIC I, `18` = Gut Restore x AL DAS CLINIC II.
- **Cart options** (from `src/config/cartOptions.ts`): programs, proteins (chicken, beef, seafood, vegetarian), calorie options (300–700 kcal), meal types (breakfast, lunch, dinner, snack), days per week (5/6/7), weeks of food (1–4), weekdays (mon–fri), customizations (standard, gluten_dairy_free).
- **Program page** (`/Home/Program`): Program selector (same IDs 8, 14, 15, 17, 18), “current week” / “next week”, calorie band, protein preference. **Meal list (menu)** is currently **static** (hardcoded days and meals).

We want to **drive programs, plans, and menu from the backend** where possible.

### 3.2 Required APIs and data

| Need | What frontend will do | What we need from backend |
|------|------------------------|----------------------------|
| **List programs/plans** | Fetch on Cart, Program page, or app init. | Endpoint (e.g. `GET /programs` or `GET /plans`). Response: array of `{ id, name/label, description?, slug?, isActive? }`. Prefer numeric `id` matching 8, 14, 15, 17, 18 or a clear mapping. |
| **Program/plan options** | Optional: proteins, calorie bands, meal types, days per week, weeks, customizations. | Either same endpoint includes these options, or separate (e.g. `GET /programs/:id/options` or `GET /config/plan-options`). Shape: e.g. `proteins: [{ key, label }]`, `calories: [{ id, label, calories }]`, etc. |
| **Weekly menu (meals per program/week)** | Program page and possibly Cart: show meals by day for “current” / “next” week. | Endpoint e.g. `GET /programs/:id/menu` or `GET /menu?programId=&week=current|next` (or week start date). Response: list of days, each with list of meals: `{ type, name, calories, protein, carbs, fat, description }` (or your schema). |
| **Delivery time slots** | Checkout: “Select your time slot” dropdown. | List of available slots. Either from config endpoint (e.g. `GET /config/delivery-slots`) or from checkout/availability endpoint. Shape: e.g. `[{ id, label }]` like `"3 AM - 6 AM"`, `"6 AM - 9 AM"`, `"9 AM - 12 PM"`. |
| **Start dates / availability** | Cart: “START DATE” dropdown (e.g. next few Mondays). | Endpoint or field that returns allowed start dates (e.g. next N Mondays). Format: e.g. `YYYY-MM-DD[]` or `{ startDate, label }[]`. |

If the backend already has different endpoints (e.g. “plans” vs “programs”, or menu under “weeks”), please provide the exact paths and response JSON shape (or a sample) so we can adapt.

---

## 4. Cart (state and persistence)

### 4.1 Current frontend state

Cart state is held in **React context** (no backend yet) and has this shape:

```ts
{
  programId: number;           // 8, 14, 15, 17, 18
  selectedProteins: string[];  // e.g. ["chicken", "beef"]
  selectedCalories: { id: number; label: string; calories: number };
  selectedMeals: string[];     // e.g. ["breakfast", "lunch", "dinner", "snack"]
  daysPerWeek: { id: number; label: string; days: number };
  weekCount: { id: number; label: string; weeks: number };
  weekdays: string[];          // e.g. ["mon", "tue", "wed"]
  startDate: string;           // "YYYY-MM-DD"
  customization: string;       // "standard" | "gluten_dairy_free"
  additionalInfo: string;
}
```

### 4.2 What we need from backend

- **Optional: cart API**  
  If you support server-side cart: endpoint to **create/update cart** (e.g. `POST /cart` or `PUT /cart`) with the above (or your equivalent) and return a `cartId` or session identifier; and **get cart** (e.g. `GET /cart`) so we can restore cart for logged-in users.  
  If you have **no cart API**, we will keep cart in client state only and send it in the checkout payload.
- **Pricing**  
  Currently we use a **client-side placeholder** formula. We need either:
  - **Price from backend**: e.g. `POST /cart/price` or `GET /programs/:id/price?params...` that accepts program + options (calories, meals per day, days per week, weeks) and returns **subtotal, VAT, delivery, currency (AED)**; or
  - **Explicit pricing rules** (e.g. per meal, per program) so we can mirror the logic on the frontend (less preferred).
- **Promo codes**  
  Checkout has “Promotional code” + Apply. We need: endpoint to **validate promo** (e.g. `POST /promo/validate` with `{ code }`) and response with `{ valid, discountAmount?, discountPercent?, message? }` (or your schema). If you don’t support promo codes, we will hide or disable this and set promo amount to 0.

---

## 5. Checkout & Orders

### 5.1 Current frontend behavior

- Checkout page collects:
  - **Guest**: first name, last name, email, phone, country code.
  - **Register / Sign in**: as in Registration (we will wire to your auth).
  - **Delivery**: country, city, address, building name/villa number, floor, apartment number, **time slot**, extra information.
- **Order summary** is derived from cart state: program name, dietary preference, meals per day, calorie range, program length, days/weeks of food, start date, delivery time slot, sub total, VAT (5%), delivery charge, promo amount, **total (payable)**.
- “Order now” currently only logs the payload; there is a placeholder `#paymentContainer` for **Stripe** integration.

### 5.2 Required checkout/order APIs

| Step | What frontend will do | What we need from backend |
|------|------------------------|----------------------------|
| **Create order / checkout session** | When user clicks “Order now”, send: cart snapshot (program + options), guest or user id, delivery address + time slot, promo code (if any), payable amount (or let backend compute). | Endpoint (e.g. `POST /orders` or `POST /checkout`). Request body shape. Response: e.g. `{ orderId, clientSecret? }` for Stripe, or `{ orderId, paymentUrl }`, or `{ orderId }` if you handle payment server-side. |
| **Stripe payment** | If you use Stripe: we need to know whether you return a **Stripe Payment Intent `clientSecret`** (we mount Stripe Elements and confirm) or a **Checkout Session URL** (we redirect). If you create the session on the backend, we only need the endpoint that creates it and the response field (e.g. `sessionUrl` or `clientSecret`). | Exact response fields for redirect URL or clientSecret; Stripe API version if relevant. |
| **Order confirmation / status** | After payment success (or redirect return), we show success and optionally fetch order details. | Endpoint e.g. `GET /orders/:id` with status and summary (and optionally invoice/receipt URL). |
| **Delivery address** | “Existing address” vs “New address”: if logged in, we can load saved addresses. | Optional: `GET /users/me/addresses`, `POST /users/me/addresses`, and shape of an address (country, city, address line, building, floor, apartment, etc.). |

Please provide:

- **Exact endpoint(s)** for creating the order/checkout and, if applicable, for creating a Stripe session or Payment Intent.
- **Request body** schema (field names and types) for checkout. We will send at least: program/plan id, options (proteins, calories, meals, days per week, weeks, weekdays, start date, customization), delivery (address + time slot), contact (guest or user), referral code if you use it, promo code.
- **Response** schema: order id, payment URL or `clientSecret`, and any error shape (e.g. `{ code, message }`).

---

## 6. Stripe (payment)

### 6.1 Frontend expectations

- We will **not** use the Stripe secret key on the frontend; we only need to either:
  - **Redirect** to a Stripe Checkout URL you provide, or
  - **Mount Stripe.js** with your **publishable key** and use a **Payment Intent `clientSecret`** you provide.
- We need from you:
  - Whether payment is **redirect** (Stripe Checkout) or **embedded** (Payment Element / card element).
  - The **backend endpoint** that creates the Stripe Session or Payment Intent and returns the URL or `clientSecret`.
  - The **success and cancel URLs** (or route paths) we should pass or that you configure (e.g. `/checkout/success`, `/checkout/cancel`), and whether you use webhooks to confirm payment and update order status.

### 6.2 Request to backend

- Document the **exact response** of your “create payment” endpoint (e.g. `{ sessionId, url }` or `{ clientSecret }`).
- If we need to pass a **return URL** or **success/cancel URLs**, tell us the query params or path convention you expect (e.g. `?orderId=...`).

---

## 7. Other endpoints that may be needed

- **Referral code**  
  Checkout has a referral code field. If you validate or apply it: endpoint and request/response (e.g. apply with order or separate validation).
- **Countries / cities**  
  Delivery has Country and City dropdowns. If these are dynamic: e.g. `GET /config/countries`, `GET /config/cities?countryId=`.
- **Footer “Join our community”**  
  Form with name + email. If you collect this: endpoint (e.g. `POST /newsletter` or `POST /community`) and body shape.

---

## 8. Error handling and validation

- Preferred **HTTP status codes** (e.g. 400 validation, 401 unauthorized, 404, 409 conflict).
- **Error response body** shape (e.g. `{ message: string, errors?: { field: string; message: string }[] }`) so we can show field-level or global messages.
- Any **validation rules** we should mirror on the frontend (e.g. password length, phone format) to avoid unnecessary round-trips.

---

## 9. Summary checklist for backend team

Please provide (without changing your backend behavior, only documenting it):

1. **Environment**
   - [ ] List of env vars for the frontend (names + purpose).
   - [ ] `.env.example` (or equivalent) and how to run the backend locally.

2. **Auth**
   - [ ] Register, Login, Forgot password (and optional OTP/reset) endpoints and body/response shapes.
   - [ ] How auth is persisted (cookie vs token, header name, storage expectations).
   - [ ] Session/me and Logout endpoints.

3. **Programs & plans**
   - [ ] List programs/plans endpoint and response shape.
   - [ ] Optional: plan options (proteins, calories, etc.) and menu-by-week endpoint and response shape.
   - [ ] Delivery time slots and start-date availability (endpoint or field).

4. **Cart & pricing**
   - [ ] Whether you have a cart API; if yes, create/update and get cart.
   - [ ] Pricing endpoint (or rules) for program + options (AED, VAT, delivery, promo).
   - [ ] Promo validation endpoint and response.

5. **Checkout & orders**
   - [ ] Create order/checkout endpoint, request body, and response (order id, payment URL or clientSecret).
   - [ ] Get order by id (for confirmation/status).
   - [ ] Optional: user addresses CRUD.

6. **Stripe**
   - [ ] Which flow (redirect vs embedded) and which backend endpoint returns URL or clientSecret.
   - [ ] Success/cancel URLs or query params we should use.

7. **Misc**
   - [ ] Error response shape and validation conventions.
   - [ ] Referral, countries/cities, newsletter/community if applicable.

Once we have this, we will implement the frontend integration step by step (login, signup, cart, checkout, Stripe, programs, plans) and optionally a short implementation plan document for your reference.
