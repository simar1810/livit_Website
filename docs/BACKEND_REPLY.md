# Backend team: endpoint confirmation — reply

This document is the **backend team's reply** to the frontend endpoint confirmation request. Use it to align paths, methods, request/response shapes and to decide what to integrate vs remove.

---

## Section A: Integrated endpoints — confirmed / corrections

- **1–12:** All confirmed. Only clarifications: (1) Do not send `phone`/`countryCode` in register body. (2) Checkout/session does not require auth; optional `userId`/`tenantId` in body are accepted. (3) Logout: no endpoint; clearing tokens on client is correct.

---

## Section B: Not integrated — do these exist?

| # | Feature | Exists? | Action taken |
|---|---------|--------|--------------|
| B1 | Forgot password | No | Removed forgot-password offcanvas from Registration page. |
| B2 | Logout | No | No change (already clear tokens only). |
| B3 | Delivery time slots | No | Kept hardcoded dropdown. |
| B4 | Start dates (cart) | No | Kept client-side. |
| B5 | Cart API | No | No change (client state only). |
| B6 | Pricing | No | No change (client-side; plan has `pricing` field). |
| B7 | Promo codes | No | Hidden promo code input on checkout (OrderSummaryPanel `hidePromoCode`). |
| B8 | GET order by ID | No | No change (use checkout/session/:sessionId). |
| B9 | User addresses | No | Kept as UI-only. |
| B10 | Referral code | No | Removed unused referral state from Checkout; no UI was present. |
| B11 | Countries / cities | No | Kept hardcoded. |
| B12 | Newsletter / community | No | Removed footer “Join our community” form (name + email + submit). |

---

## Code changes applied (from this reply)

1. **Register:** Removed `phone` and `countryCode` from `POST auth/register` body; backend encodes identity in `registrationToken`.
2. **Forgot password:** Removed offcanvas and `useFocusTrap` import from Registration page.
3. **Promo code:** OrderSummaryPanel accepts `hidePromoCode`; Checkout passes it so promo input is hidden. Discount remains 0.
4. **Referral:** Removed `referralCode` state from Checkout (was unused).
5. **Newsletter:** Removed footer form (name, email, submit) from SiteShell; left heading and subtitle with a comment.
