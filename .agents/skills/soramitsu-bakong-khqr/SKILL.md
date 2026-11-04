---
name: soramitsu-bakong-khqr
description: Authoritative technical standard and architectural knowledge base for the Soramitsu NBC Bakong KHQR digital currency and payment system. Enforces official National Bank of Cambodia (NBC) KHQR EMVCo standards (Tag 29 Individual, Tag 30 Merchant), CRC16-CCITT and MD5 transaction tracking, standardized folder architecture (docs/, resources/, src/, public/), official Keyline Icons design system, dual-font typography (Sora for English, Google Sans / Kantumruy Pro for Khmer), and strict zero-emoji compliance.
---

# SORAMITSU NBC BAKONG & KHQR DIGITAL CURRENCY SYSTEM STANDARD
## National Bank of Cambodia (NBC) & Soramitsu Architectural Specification

This skill establishes the permanent architectural standard, EMVCo payload format, branding rules, document registry, and user interface standards for the **Soramitsu Bakong KHQR Currency** payment platform.

---

## 1. Executive Overview & Soramitsu Bakong Foundation

Project Bakong is the National Bank of Cambodia's next-generation payment infrastructure developed in partnership with **Soramitsu**, leveraging Hyperledger Iroha blockchain technology. It operates as a two-tier settlement network:
* **Tier 1 (Central Bank)**: National Bank of Cambodia (NBC) operates the central ledger, core clearing switch, and currency issuance (Digital KHR and Digital USD).
* **Tier 2 (Commercial Banks & PSPs)**: Financial Institutions (FIs) and Payment Service Providers (PSPs) connect to the Bakong switch via Open APIs and KHQR EMVCo standards.

---

## 2. Document Registry & Knowledge Synthesis

All authoritative documents are permanently stored under [`docs/`](file:///Users/Apple16/Desktop/soramitsu/docs/README.md) and organized by domain:

### Core Bakong Specifications (`docs/bakong/`)
* **`nbc-bakong-white-paper.pdf`**:
  * Architectural blueprint of the Bakong payment system.
  * Real-time gross settlement (RTGS) using Hyperledger Iroha distributed ledger.
  * Solves national payment fragmentation and promotes digital financial inclusion across Cambodia.
* **`bakong-open-api-specification.pdf` (v1.0.2)**:
  * Open API documentation for FIs and merchants.
  * Core endpoints: `check_transaction_by_md5`, `check_bakong_account`, `renew_token`, and webhook callbacks.
* **`bakong-tourist-guidelines.pdf`**:
  * Onboarding and payment workflows for international visitors using mobile app accounts.

### KHQR Specifications & Implementation (`docs/khqr/`)
* **`khqr-card-branding-guidelines.pdf`**:
  * Standardized card aspect ratio: **20:29** (`height = width * 1.45`).
  * Square widget ratio: **8:9** (`width 400px`, `height 450px`).
  * Color palette:
    * Bakong Bravery Red: `#E1232E` / `#E11931` (RGB: 225, 35, 46)
    * Raven Dark Black: `#000000` (RGB: 0, 0, 0)
    * Pearl White: `#FFFFFF` (RGB: 255, 255, 255)
    * Information Blue / ABA Blue: `#003E6B` / `#002244`
  * Typography: Left-aligned receiver name (3% card height), amount (6.5% card height), currency (3% card height).
* **`khqr-content-specification-v1.3.pdf`**:
  * EMVCo QR code convention rules.
  * Payload format indicator: `000201` (Tag 00, Length 02, Value 01).
  * Point of Initiation Method: `010211` (Static QR) or `010212` (Dynamic QR).
  * Tag 29: Individual / Solo Merchant Account.
  * Tag 30: Corporate Merchant Account.
  * Tag 53: Transaction Currency (`116` for KHR, `840` for USD).
  * Tag 58: Country Code (`KH`).
  * Tag 62: Additional Data Field (Bill Number, Mobile Number, Store Label, Terminal Label).
  * Tag 63: Cyclic Redundancy Check (CRC16-CCITT 4-character hex).
  * Tag 99: Timestamp in milliseconds.
* **`khqr-sdk-implementation-guide-v2.9.pdf` (May 2025 Standard)**:
  * Active SDK release for JavaScript, Java, iOS, and C#.
  * Methods: `generateIndividual()`, `generateMerchant()`, `verify()`, `decode()`, `generateDeeplink()`.
  * Deep link URL structure: `https://bakong.nbc.org.kh` and `bakongsit.page.link`.
* **`khqr-payment-integration-guide.pdf` (v1.0.1)**:
  * Interaction workflows between cashier, customer mobile banking app, acquiring bank, and payment switch.

---

## 3. Standardized Project Directory Architecture

```
soramitsu/
├── docs/                     # Authoritative technical specifications
│   ├── README.md             # Registry and reading guide
│   ├── bakong/               # Core NBC Bakong infrastructure docs
│   └── khqr/                 # Official KHQR specifications & branding
├── resources/                # Master design and brand resources
│   ├── README.md             # Asset catalog
│   ├── bank-logos/           # 32 Cambodian commercial banks (kebab-case SVGs)
│   ├── khqr-brand/           # Official KHQR identity vectors & badges
│   └── merchant-materials/   # Merchant POS stands, frames, and USD/KHR badges
├── public/                   # Public runtime web assets
│   └── images/               # Web application runtime logos & icons
├── src/                      # Next.js 14 application codebase
│   ├── app/                  # Pages, layout, globals.css, API endpoints
│   ├── components/           # UI components, Keyline Icons, KHQR Card
│   ├── lib/                  # EMVCo generator, CRC16, MD5, Bakong API, i18n
│   └── types/                # TypeScript interface definitions
└── test/                     # Vitest test suite for EMVCo & CRC verification
```

---

## 4. KHQR EMVCo Technical Specification & Tag Reference

| Tag | Sub-tag | Name | Format | Description / Rules |
| :--- | :--- | :--- | :--- | :--- |
| **00** | - | Payload Format Indicator | String (02) | Strictly `01` (`000201`) |
| **01** | - | Point of Initiation | String (02) | `11` = Static (Open Price), `12` = Dynamic (Fixed Amount) |
| **29** | **00** | Individual Global Unique ID | String | Bakong Account ID (e.g. `user@bkrt`) |
| **29** | **01** | Account Information | String | Bank account number or mobile number |
| **29** | **02** | Acquiring Bank Name | String | Member bank name (e.g. `ABA Bank`) |
| **30** | **00** | Merchant Global Unique ID | String | Bakong Merchant Account ID |
| **30** | **01** | Merchant ID | String | Assigned merchant terminal identifier |
| **30** | **02** | Acquiring Bank Name | String | Member acquiring institution |
| **52** | - | Merchant Category Code | String (04) | Merchant MCC (Default: `5999`) |
| **53** | - | Transaction Currency | String (03) | `840` for USD, `116` for KHR |
| **54** | - | Transaction Amount | String (Var) | Fixed amount formatted to 2 decimals (USD) or integer (KHR) |
| **58** | - | Country Code | String (02) | Strictly `KH` (`5802KH`) |
| **59** | - | Merchant Name | String (Var) | Merchant / Account Holder Legal Name |
| **60** | - | Merchant City | String (Var) | Merchant City (e.g. `Phnom Penh`, `Siem Reap`) |
| **62** | **01** | Bill Number | String (Var) | Invoice / Bill reference number |
| **62** | **02** | Mobile Number | String (Var) | Contact mobile number |
| **62** | **03** | Store Label | String (Var) | Physical outlet / branch identifier |
| **62** | **07** | Terminal Label | String (Var) | POS cashier terminal identifier |
| **63** | - | CRC Checksum | String (04) | CRC16-CCITT 4-digit hexadecimal calculated over preceding string |
| **99** | **00** | Timestamp | String (13) | Epoch timestamp in milliseconds |

---

## 5. Checksum & Hash Verification Algorithms

### CRC16-CCITT (`0xFFFF`, Polynomial `0x1021`)
* Computed over the entire EMVCo string up to `6304`.
* Initial value: `0xFFFF`.
* Polynomial: `0x1021`.
* Formatted as uppercase 4-digit zero-padded hexadecimal string.

### MD5 Transaction Hashing (RFC 1321)
* Calculated over the generated raw KHQR string.
* Returned in lowercase 32-character hexadecimal format.
* Used as the transaction identifier for polling NBC Bakong Open API: `check_transaction_by_md5`.

---

## 6. Official Currency Rules

* **USD (United States Dollar)**:
  * EMVCo Currency Code: `840` (Tag 53: `5303840`).
  * Formatting: 2 decimal places (e.g., `10.50`).
  * Symbol: `$`.
* **KHR (Cambodian Riel)**:
  * EMVCo Currency Code: `116` (Tag 53: `5303116`).
  * Formatting: Integer rounding with zero decimal places (e.g., `4000`, `20000`).
  * Symbol: `៛`.

---

## 7. Official Keyline Icons Design System

As established in the official UI specification, all graphical icons must strictly follow the **Keyline Icons** design system:
* **Geometry**: 24x24 viewBox, 2px stroke width, rounded caps (`stroke-linecap="round"`, `stroke-linejoin="round"`).
* **Style**: Minimalist stroke and two-tone vector geometry built for modern interfaces.
* **Component Suite**: [`src/components/KeylineIcons.tsx`](file:///Users/Apple16/Desktop/soramitsu/src/components/KeylineIcons.tsx)
  * `IconSettings`: Controls and configuration panel toggle.
  * `IconGlobe`: Dual-language switcher (English / Khmer).
  * `IconShieldCheck`: Central bank security and verification indicator.
  * `IconRefresh`: Regenerate invoice and bill number.
  * `IconDownload`: Export and download QR card image.
  * `IconCopy`: Copy MD5 hash and raw EMVCo payload.
  * `IconCheckCircle`: Transaction confirmation badge.
  * `IconClock`: Countdown timer indicator.
  * `IconBolt`: Fast developer simulation trigger.
  * `IconExternalLink`: Deep link launch indicator.
  * `IconQrCode`: QR code matrix indicator.

---

## 8. Dual-Font Typography System

* **English Typography**:
  * **Sora** (`var(--font-sora, 'Sora'), sans-serif` from Google Fonts).
  * Selected as the primary English brand typeface in honor of Soramitsu.
* **Khmer Typography**:
  * **Google Sans / Kantumruy Pro** (`'Google Sans', 'Google Sans Khmer', 'Kantumruy Pro', sans-serif`).
  * Adheres to Cambodian national standards with authentic Khmer iteration marks and natural ligatures.
* **Language Switching**:
  * Interactive switcher in the header toggles between `en` (Sora) and `km` (Google Sans / Kantumruy Pro).
  * Real-time document attribute synchronization: `html[lang="en"]` vs `html[lang="km"]`.
  * Dictionary definitions maintained in [`src/lib/i18n.ts`](file:///Users/Apple16/Desktop/soramitsu/src/lib/i18n.ts).

---

## 9. Strict Workspace Constraints

1. **Strictly Zero Emojis**: Never use emojis in UI buttons, status cards, badges, code, or documentation. Use Keyline Icons or status pills (`ACTIVE`, `VERIFIED`, `POLLING`, `EXPIRED`).
2. **Zero Empty Directory Rule**: Never pre-create empty directory stubs. Create directories just-in-time when files are written, and clean up empty directories immediately.
3. **No Breaking Changes**: Preserve existing API contracts, Vitest test suites, and Next.js production builds.
