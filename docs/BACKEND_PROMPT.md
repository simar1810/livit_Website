# Backend team: endpoint confirmation

**Please review and reply.** We need two things from you:

1. **Section A** – Confirm that the integrated endpoints exist and that our usage (paths, methods, request/response shapes) is correct. If anything is wrong, tell us the correct path, body, or response shape.
2. **Section B** – For each “not integrated” item, tell us: **Does this exist in your backend?** (Yes/No or path). If it exists, we will integrate it. If it does not exist, we will remove the corresponding UI/feature.

Base URL for all requests: `NEXT_PUBLIC_API_BASE_URL`. All paths are prefixed with **`/api/v1`** by the frontend. We send `Content-Type: application/json` and, where noted, `Authorization: Bearer <accessToken>` and/or `X-Tenant-Id: <tenantId>`. We expect responses in the shape: `{ status_code, message, data }` (with `data` holding the payload or null on error).

---

## Section A: Integrated endpoints – please confirm

Verify that these exist and that our usage is correct. If not, provide the correct path, method, request body, or response shape.

### 1. `GET /api/v1/tenant/list`
- **Auth:** None.
- **Request:** No body.
- **Response we expect:** `data` = array of objects with at least `_id` (string). We use the first item’s `_id` as default tenant when `NEXT_PUBLIC_TENANT_ID` is not set.
- **Used in:** AuthContext (on app load).

---

### 2. `POST /api/v1/auth/refresh`
- **Auth:** None (we send refresh token in body).
- **Request body:** `{ refreshToken: string }`
- **Response we expect:** `data` = `{ accessToken: string, refreshToken: string }`
- **Used in:** AuthContext (session restore, 401 retry).

---

### 3. `GET /api/v1/user/profile`
- **Auth:** `Authorization: Bearer <accessToken>`
- **Request:** No body.
- **Response we expect:** `data` = user object with at least `_id` (string), and optionally `name`, `email`, `phone`, `countryCode`, `gender`, `dob`, `heightCm`, `weightKg`, `targetWeightKg`, `goal`, `activityLevel`, `dietPreference`, `allergies`, `conditions`.
- **Used in:** AuthContext (after refresh / on load).

---

### 4. `POST /api/v1/auth/otp` (send OTP to phone)
- **Auth:** Optional `X-Tenant-Id` header (we send it).
- **Request body:** `{ phone: string, countryCode: string, tenantId: string }`
- **Response we expect:** Success (e.g. 200); we do not rely on a specific body.
- **Used in:** Registration page, Checkout (sign-in tab).

---

### 5. `POST /api/v1/auth/email` (send OTP to email)
- **Auth:** Optional `X-Tenant-Id` header (we send it).
- **Request body:** `{ email: string, tenantId: string }`
- **Response we expect:** Success (e.g. 200); we do not rely on a specific body.
- **Used in:** Registration page, Checkout (sign-in tab).

---

### 6. `PUT /api/v1/auth/otp` (verify phone OTP)
- **Auth:** Optional `X-Tenant-Id` header (we send it).
- **Request body:** `{ phone: string, countryCode: string, otp: string, tenantId: string }`
- **Response we expect:** `data` with:
  - **Existing user:** `isNewUser: false`, `accessToken`, `refreshToken`, optional `user`
  - **New user:** `isNewUser: true`, `registrationToken`, optional `user`
- **Used in:** Registration page, Checkout (sign-in tab).

---

### 7. `PUT /api/v1/auth/email` (verify email OTP)
- **Auth:** Optional `X-Tenant-Id` header (we send it).
- **Request body:** `{ email: string, otp: string, tenantId: string }`
- **Response we expect:** Same as 6 (existing vs new user with `registrationToken`).
- **Used in:** Registration page, Checkout (sign-in tab).

---

### 8. `POST /api/v1/auth/register`
- **Auth:** Optional `X-Tenant-Id` header (we send it).
- **Request body:** `{ registrationToken: string, type: "customer", name: string, email: string, phone?: string, countryCode?: string }`
- **Response we expect:** `data` = `{ accessToken: string, refreshToken: string, user: object }`
- **Used in:** Registration page (complete profile after OTP for new user).

---

### 9. `GET /api/v1/menu/plans`
- **Auth:** `Authorization: Bearer <accessToken>` (we send it when user is logged in).
- **Request:** No body.
- **Response we expect:** `data` = array of plan objects with at least `_id` (string), `title` (string). We also use optional `goalType`, `dietType`, `structure`, `pricing`, `createdAt`, `updatedAt`.
- **Used in:** Cart, Program page, Checkout (plan selector and order).

---

### 10. `GET /api/v1/menu/list`
- **Auth:** `Authorization: Bearer <accessToken>`
- **Request:** No body (we do not currently send planId or type in query).
- **Response we expect:** `data` with optional `recipes` and/or `templates` (arrays). We render `templates` if present.
- **Used in:** Program page (weekly menu).

---

### 11. `POST /api/v1/checkout/session`
- **Auth:** Optional. When user is logged in we send `Authorization: Bearer <accessToken>` and include `userId` (and optionally `tenantId`) in body.
- **Request body:** `{ templateId: string, amount: number, currency: "aed", productName: string, successUrl: string, cancelUrl: string, userId?: string, tenantId?: string }`  
  `amount` is in smallest unit (fils for AED). `successUrl` / `cancelUrl` are full URLs (we use `window.location.origin` + path; Stripe replaces `{CHECKOUT_SESSION_ID}` in success URL).
- **Response we expect:** `data` = `{ url: string, orderId: string }`. We redirect the user to `data.url` (Stripe Checkout).
- **Used in:** Checkout page (“Pay with Stripe” button).

---

### 12. `GET /api/v1/checkout/session/:sessionId`
- **Auth:** We currently call without auth (sessionId in URL). If your API requires auth, tell us.
- **Request:** No body. Path: `checkout/session/<sessionId>` (sessionId from Stripe redirect query).
- **Response we expect:** `data` with at least one of: `id`, `payment_status`, `status`, `metadata` (e.g. `metadata.orderId`), `amount_total`, `currency`.
- **Used in:** Checkout success page (show payment status and order id).

---

**Logout:** We do **not** call any logout endpoint; we only clear tokens in the frontend. If you have `POST /api/v1/auth/logout` (or similar) and we should call it on logout, please confirm and we will add it.

---

## Section B: Not integrated – do these exist?

For each item below, please answer: **Does this exist in your backend?** If yes, give the exact path, method, and a short description of request/response (or point to your API doc). We will then integrate it. If no, we will remove or hide the corresponding UI.

| # | Feature / requirement | Current frontend behavior | Does it exist? (Yes + path/method, or No) |
|---|------------------------|----------------------------|-------------------------------------------|
| B1 | **Forgot password** | Offcanvas with email field; no API call. | |
| B2 | **Logout** | We only clear tokens locally. Should we call an endpoint? | |
| B3 | **Delivery time slots** | Checkout dropdown is hardcoded (e.g. "3 AM - 6 AM", "6 AM - 9 AM", "9 AM - 12 PM"). | |
| B4 | **Start dates (cart)** | Cart “START DATE” dropdown is hardcoded (e.g. next few Mondays). | |
| B5 | **Cart API** | No create/update/get cart; cart is client state only. | |
| B6 | **Pricing** | We compute price in the frontend (cartUtils). No price API. | |
| B7 | **Promo / discount codes** | Checkout “Promotional code” + Apply; we do nothing with it. | |
| B8 | **GET order by ID** | We only use `GET checkout/session/:sessionId` for success. Do you have `GET /orders/:id`? | |
| B9 | **User addresses** | Checkout “Existing address” / “New address” are UI only; we don’t load or save addresses. | |
| B10 | **Referral code** | Checkout has a referral field; we don’t send it to the backend. | |
| B11 | **Countries / cities** | Delivery country and city are hardcoded (e.g. UAE, Dubai). | |
| B12 | **Newsletter / community** | Footer “Join our community” (name + email) is not wired to any endpoint. | |

---

## How to reply

You can reply in any format, for example:

- **Section A:** “All correct” or list corrections, e.g. “auth/otp expects `mobile` not `phone`” or “user/profile returns `user` not at root of data.”
- **Section B:** For each B1–B12, either “No” or “Yes: GET /api/v1/config/delivery-slots returns …” (and brief request/response).

Once we have your answers, we will: integrate every endpoint you confirm exists (and fix any usage you correct), and remove or hide UI for features that do not exist.
