---
name: smart-school-ux-flow-checklists
description: Authoritative UX Flow Design Checklist & Interaction Specification for the Smart School Enterprise Platform. Enforces strict Liquid Glass UI standards, Zero Emoji policy, Google Material Symbols Outlined (wght 500), and robust backend security for the 14 mission-critical user interaction flows. Trigger on: "ux flow", "flow checklist", "adding to cart", "submitting form", "uploading media", "resetting password", "making payment", "deleting account", "design checklist".
---

# UX Flows & Interaction Design Checklist Standard
## Smart School Enterprise Platform (ABLOB Architecture)

### Executive Overview & Design Quality Gates

This specification establishes the authoritative **Interaction Design & UX Flow Checklist** across fourteen (14) mission-critical user journeys in the Smart School ecosystem. Every flow is calibrated to the **Liquid Glass Design System** (`liquid-glass-design-system`, `srievi-liquid-glass-standards`, `shiliaiwei-liquid-glass-standards`) and strictly enforces:

1. **Strict Zero-Emoji Policy**: Pure typographic clarity and solid Google Material Symbols Outlined (`wght: 500`).
2. **Tactile Brutalist-Glass Physics**: Frosted glass containers (`backdrop-blur-xl`), 360-degree specular highlights (`border-t-white/95`), and hard offset shadows (`shadow-[0_4px_0_0_...]`).
3. **WCAG 2.2 Level AA Accessibility**: Unambiguous focus indicators, full keyboard traversal, and assistive screen reader attributes.
4. **Resilient Backend Handshake**: Multi-tenant PostgreSQL Row-Level Security (`RLS`), idempotency tokens, and Directive 02 Synchronous-to-Asynchronous Kafka bridging.

---

## 1. Master UX Flow Matrix (14 Core Journeys)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          14 CORE UX INTERACTION FLOWS                                  │
├────────────────────────────────┬───────────────────────────────────────────────────────┤
│ Journey Category               │ Interaction Flow Checklist                            │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 1. Commerce & Payments         │ • Flow 01: Adding to Cart (Fee Cart / Uniform / Store)│
│                                │ • Flow 02: Canceling Subscription / Service Opt-Out   │
│                                │ • Flow 03: Entering Promo Code / Discount Voucher     │
│                                │ • Flow 14: Making a Card Payment (Stripe / 3DS Gate)  │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 2. Form & Data Management      │ • Flow 05: Submitting a Form (Multi-Step / Validation)│
│                                │ • Flow 06: Uploading Media & Document Vault           │
│                                │ • Flow 07: Filtering Items & Faceted Search           │
│                                │ • Flow 08: Showing Input Error (RFC 7807 In-line)    │
│                                │ • Flow 12: Saving Changes (Sticky Bar / Dirty State)  │
├────────────────────────────────┼───────────────────────────────────────────────────────┤
│ 3. Identity, Security & Support│ • Flow 04: Deleting Account & Critical Entity Purge   │
│                                │ • Flow 09: Contacting Support & Front Desk Enquiries  │
│                                │ • Flow 10: Search Checklists & Universal Navigation   │
│                                │ • Flow 11: Verifying Account (SMS / Email OTP 6-PIN) │
│                                │ • Flow 13: Resetting Password (Entropy & Reset Link)  │
└────────────────────────────────┴───────────────────────────────────────────────────────┘
```

---

## 2. Comprehensive Flow-by-Flow Design Checklists

---

### Flow 01: Adding to Cart (`Adding to cart`)
*Context: Student Fee Cart, School Bookstore, Uniform Purchasing, and Online Course Subscriptions.*

- [ ] **Trigger & Feedback**: Instant visual confirmation via a flying badge micro-animation into the header cart icon (`shopping_cart`).
- [ ] **Button State**: CTA button transitions to a brief loading state (`progress_activity`), then displays `Added` with `check` icon for 1.5 seconds before resetting.
- [ ] **Quantity & Duplicate Handling**: If the item already exists in the cart, automatically increments quantity and presents a subtle bottom-right Toast notification (`shopping_bag`: "Cart updated to 2 items").
- [ ] **Floating Cart Drawer**: Supports 1-click preview via a right-sliding Liquid Glass drawer showing line-item amounts, subtotal, and direct checkout trigger (`arrow_forward`).
- [ ] **Stock / Quota Validation**: Checks item availability; if out of stock, disables trigger with red pill badge (`OUT_OF_STOCK`).

---

### Flow 02: Canceling Subscription / Service (`Canceling subscription`)
*Context: Transport Bus Route Opt-Out, Hostel Meal Plan Cancellation, or SaaS School Add-On.*

- [ ] **Impact Transparency Callout**: Liquid Glass modal clearly lists what benefits terminate and the exact effective date (e.g. "Access ends on September 30, 2026").
- [ ] **Two-Step Confirmation**: Mandatory secondary confirmation modal; avoids accidental 1-click cancellations.
- [ ] **Reason Feedback Selector**: Radio button group for cancellation reason (`Financial`, `Relocated`, `Scheduling Conflict`, `Other`).
- [ ] **Retention Alternative**: Offers alternative adjustment before final termination (e.g. "Switch to One-Way Transit" or "Pause for 1 Month").
- [ ] **Destructive CTA**: Red tactile danger button (`bg-[#EF4444] shadow-[0_4px_0_0_#991B1B]`) labeled `Confirm Cancellation`.
- [ ] **Post-Cancellation State**: Updates service badge to `PENDING_CANCELLATION` in amber, and emails an audit receipt to parent/guardian.

---

### Flow 03: Entering Promo Code (`Entering promo code`)
*Context: Sibling Concession Vouchers, Early-Bird Enrollment Codes, Scholarship Waivers.*

- [ ] **Input & Action Pairing**: Compact input with uppercase auto-capitalization (`font-mono tracking-wider`) and inline `Apply` button (`check_circle`).
- [ ] **Client Validation**: Prevents blank submission; disables `Apply` until at least 3 characters are typed.
- [ ] **Instant Feedback & Discount Breakdown**: On success, displays emerald discount line item (`-$50.00 (15% OFF)`) with a removable pill chip (`close`).
- [ ] **RFC 7807 Error Feedback**: If code is invalid or expired, turns input border rose (`border-rose-500`) and displays specific error copy (e.g. "Code expired on August 31, 2026").
- [ ] **Total Calculation**: Immediately recalculates gross, concession, and net due with smooth spring number animation.

---

### Flow 04: Deleting Account & Entity Purge (`Deleting account`)
*Context: Permanent Student/Staff Record Purge, Branch De-provisioning, High-Stakes Entity Deletion.*

- [ ] **High-Stakes Warning Alert**: Crimson alert banner (`bg-rose-50 border-rose-200 text-rose-900`) detailing irreversible data loss (Academic records, fee history, biometric attendance).
- [ ] **Explicit Typing Guard**: User must explicitly type the entity name or `DELETE` into a confirmation field before the submit button unlocks.
- [ ] **Password / OTP Re-Authentication**: Prompts for current administrator password or 2FA token to prevent unauthorized terminal execution.
- [ ] **Destructive Action Physics**: Tactile crimson button with hard shadow (`shadow-[0_4px_0_0_#7F1D1D]`), labeled `Permanently Delete Account`.
- [ ] **Backend Hard Isolation**: Database executes soft-delete flag or cascades purge within an isolated transaction with tenant RLS validation (`app.bypass_rls` check).

---

### Flow 05: Submitting a Form (`Submitting a form`)
*Context: Student Admission Wizard, Leave Applications, Marks Entry, Staff Profile Edit.*

- [ ] **Client-Side Schema Validation**: Validated via **Zod** prior to network dispatch; prevents empty required fields or invalid regex patterns.
- [ ] **Focus on First Error**: If validation fails, automatically scrolls to and focuses on the first invalid field with an accessibility announcement.
- [ ] **Submit Button Loading Physics**: Replaces button text with spinning indicator (`progress_activity`) and sets `disabled={true}` to prevent double-submission.
- [ ] **Unsaved Changes Guard**: Warns user if attempting to navigate away with dirty form state via browser `beforeunload` or router navigation blocker.
- [ ] **Idempotent Network Request**: Every submission passes a unique header (`X-Request-ID: REQ-...`), ensuring duplicate clicks do not create duplicate database records.

---

### Flow 06: Uploading Media & Document Vault (`Uploading media`)
*Context: Student Passport Photo, National ID Scan, Transfer Certificate PDF, Medical Report.*

- [ ] **Dropzone UI**: Liquid Glass dashed border container (`border-2 border-dashed border-slate-300 hover:border-purple-500 bg-white/50`) with `cloud_upload` symbol.
- [ ] **File Type & Size Restrictions**: Client-side rejection for unsupported extensions (allowed: `.jpg`, `.png`, `.pdf`) and files exceeding size limit (e.g. `Max 5MB`).
- [ ] **Real-Time Progress Bar**: Displays upload progress percentage (`w-full bg-slate-100 rounded-full h-2` with purple indicator) during chunked upload to S3 / Object Store.
- [ ] **Image Cropper & Preview**: For student/staff passport photos, opens an integrated 1:1 or 4:3 squircle crop tool before final upload.
- [ ] **Delete / Replace Trigger**: Once uploaded, displays file preview card with filename, file size, download link (`download`), and delete button (`delete_outline`).

---

### Flow 07: Filtering Items & Faceted Search (`Filtering items`)
*Context: Student Roster Filtering (Class, Section, Gender, Status), Fee Dues Search, Book Catalog.*

- [ ] **Multi-Dimension Facets**: Dropdown filters for Class, Section, Academic Session, and Status pills.
- [ ] **Active Filter Chips**: Applied filters render as removable pill badges (`Class: 1-A`, `Status: Active`) with an `x` glyph and a global `Clear All` link.
- [ ] **Debounced Execution**: Text search inputs debounce for 300ms to eliminate server query flooding.
- [ ] **Zero-Result State**: When no records match, displays a clean Liquid Glass empty state card with `search_off` symbol, friendly copy ("No students match selected criteria"), and a `Reset Filters` button.
- [ ] **URL Query Synchronization**: Mirrors active filters into browser URL parameters (`?class=1&section=A&status=ACTIVE`) for bookmarkable and shareable rosters.

---

### Flow 08: Showing Input Error (`Showing input error`)
*Context: Form field validation, duplicate admission numbers, invalid date range, past due dates.*

- [ ] **Three-Part Visual Cue**:
  - Input border transitions from slate-200 to solid rose-500 (`border-rose-500 ring-2 ring-rose-100`).
  - Right-aligned warning symbol (`error_outline`) inside the input slot.
  - Dedicated error caption below input (`text-xs text-rose-600 font-medium mt-1`).
- [ ] **RFC 7807 Alignment**: Server-side validation errors map directly to individual form fields via backend error response DTO.
- [ ] **Real-Time Clearing**: Error state clears immediately when the user alters the input value to correct the mistake.
- [ ] **WAI-ARIA Accessibility**: Input binds `aria-invalid="true"` and references the error text container via `aria-describedby="error-field-id"`.

---

### Flow 09: Contacting Support (`Contacting support`)
*Context: Front Desk Inquiries, IT Helpdesk Tickets, Parent Grievance Desk, Emergency Hotline.*

- [ ] **Multi-Channel Contact Card**: Liquid Glass card providing Direct Phone (`call`), WhatsApp / Telegram channel, Office Address (`location_on`), and Ticket Form.
- [ ] **Category Routing**: Dropdown to select issue department (`Admissions`, `Fee Accounting`, `Academic Timetable`, `IT Portal Access`).
- [ ] **Ticket Submission Feedback**: Generates instant tracking ticket ID (`TCK-2026-09-0042`) with estimated resolution SLA (e.g. "Response within 24 business hours").
- [ ] **Emergency Hotline Pinning**: Direct-dial link for campus security and health clinic highlighted in amber glass capsule.

---

### Flow 10: Search Checklists & Universal Navigation (`Search checklists...`)
*Context: Universal `Cmd+K` Spotlight Search, Module Navigation, Student & Staff Master Search.*

- [ ] **Global Keyboard Shortcut**: Triggerable from anywhere in the application via `Cmd+K` (macOS) or `Ctrl+K` (Windows/Linux).
- [ ] **Categorized Search Results**: Results grouped with subtle uppercase headers: `Modules`, `Students`, `Staff`, `Quick Actions`.
- [ ] **Keyboard Navigation**: Full arrow-up / arrow-down navigation with visual highlight (`bg-purple-50 text-purple-900`) and Enter key selection.
- [ ] **Match Highlighting**: Matches bolded in title and description.
- [ ] **Recent Searches**: Displays last 5 searched queries when the search box is opened without input.

---

### Flow 11: Verifying Account (`Verifying account`)
*Context: Staff Onboarding, Parent Portal Activation, Two-Factor Authentication (2FA).*

- [ ] **6-Digit PIN Box Input**: Auto-focusing 6-segment single-digit input array with automatic focus jump to the next segment upon number entry.
- [ ] **Clipboard Paste Handling**: Automatically distributes a pasted 6-digit verification code across all 6 segments simultaneously.
- [ ] **Resend Countdown Timer**: Disables resend trigger for 60 seconds with live countdown timer (`Resend code in 48s`); unlocks with tactile action link.
- [ ] **Destination Masking**: Clearly displays masked destination address (e.g. `Code sent to +855 ••• ••8 999` or `a•••@domain.edu`).
- [ ] **Automated Submission**: Once the 6th digit is populated, automatically triggers verification handshake without requiring extra Enter click.

---

### Flow 12: Saving Changes (`Saving changes`)
*Context: School Brand Rebranding (`src/config/brand.ts`), Grading Rules, Fees Master Configuration.*

- [ ] **Dirty State Detection**: Detects deep equality difference between initial database values and current form state.
- [ ] **Sticky Action Bar**: When changes exist, a floating bottom Liquid Glass action bar glides up (`fixed bottom-6 inset-x-0 mx-auto max-w-2xl bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-2xl p-3 flex justify-between items-center`).
- [ ] **Action Bar Controls**: Displays `Unsaved Changes` badge, a `Discard` button (`undo`), and a `Save Changes` button (`save`).
- [ ] **Autosave Indication**: For inline editing fields, displays subtle saving indicator (`Saving...` -> `Saved` with `check` icon).
- [ ] **Confirmation Toast**: Dispatches a green toast on success: "Changes saved and synchronized across all campus portals."

---

### Flow 13: Resetting Password (`Resetting password`)
*Context: Forgotten Password, Staff Security Credential Renewal, First-Time Student Setup.*

- [ ] **Step 1 (Request)**: Simple email or username input field; dispatches password reset token via transactional email.
- [ ] **Generic Enumeration Defense**: Always responds with success copy regardless of whether the email exists ("If this account is registered, a password reset link has been dispatched").
- [ ] **Step 2 (Entropy & Password Rules)**: Live 4-criterion password checklist that turns green in real time:
  - At least 8 characters (`check` / `radio_button_unchecked`)
  - At least 1 uppercase letter
  - At least 1 number
  - At least 1 special character (`!@#$%^&*`)
- [ ] **Confirmation Matching**: Shows green match badge when `Confirm Password` exactly matches `New Password`.
- [ ] **Post-Reset Action**: Automatically signs out of all other active sessions and routes to portal login with success banner.

---

### Flow 14: Making a Card Payment (`Making a card payment`)
*Context: Student Tuition Fee Online Checkout, Stripe / PayPal / Razorpay Gateway Ingress.*

- [ ] **Summary Ledger Card**: Clean line-item breakdown of fees being settled, payment gateway processing charges (if applicable), and total charge.
- [ ] **Card Element Embedding**: Embedded PCI-DSS compliant iframe (Stripe Elements / Razorpay) styled to blend with the Liquid Glass frosted canvas.
- [ ] **3D Secure (3DS) Modal Flow**: Handles OTP authentication within a secure popover or redirect without losing shopping cart state.
- [ ] **Processing State & Lock**: Disables backdrop interaction and displays an animated transaction processing spinner with message: "Securing transaction with your bank. Please do not refresh."
- [ ] **Thermal Receipt Print & PDF Download**: On completion (`201 Created`), displays payment confirmation screen with:
  - Transaction Reference Number (`TXN-202609-00912`)
  - Instant `Print Receipt` button (`print`)
  - `Download PDF` button (`download`)
  - Return to Student Dashboard link.

---

## 3. Production Verification & Architectural Sign-Off

- [x] All 14 interaction flows specified with precise component pairings and visual cues.
- [x] Strict Zero-Emoji Policy enforced across all alerts, badges, buttons, and toasts.
- [x] Google Material Symbols Outlined (`wght: 500`) bound to all flow triggers.
- [x] PostgreSQL RLS tenant boundaries and idempotent header conventions verified.
