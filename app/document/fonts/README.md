# Docs & Library Subdomain Custom Fonts

This directory contains custom font assets loaded exclusively for `docs.snpi.edu.kh` (`/document/*`) using Next.js `next/font/local`.

---

## Folder Hierarchy & Placement Guide

```
apps/frontend/
├── app/
│   └── document/
│       ├── fonts/
│       │   ├── sora.woff2         # [PRIMARY] Active Sora variable font for docs
│       │   └── README.md          # Architecture guide
│       ├── layout.tsx             # Scoped font loader (next/font/local)
│       ├── page.tsx               # API Documentation
│       └── design-system/
│           └── page.tsx           # Design Library & Royal Blue Brand Blueprint
└── public/
    └── fonts/
        └── docs/
            └── sora.woff2         # Static fallback copy
```

---

## How It Works (Strict Route Isolation)

1. **Scoped Loading**: `apps/frontend/app/document/layout.tsx` imports `localFont` from `next/font/local`:

   ```tsx
   import localFont from 'next/font/local';

   const docsSora = localFont({
     src: './fonts/sora.woff2',
     variable: '--font-docs-sora',
     display: 'swap',
   });
   ```

2. **Zero Pollution of Admin Dashboard**:
   - The CSS variable `--font-docs-sora` and scoped `--font-sans` override are attached **strictly to the root container of `DocumentLayout`**.
   - Admin routes (`/(dashboard)/*`) and authentication (`/(auth)/*`) continue using system/Google Sans fonts in `apps/frontend/app/globals.css`.

3. **Brand Color Blueprint**:
   - 01: Royal Blue `#0056FF`
   - 02: Azure Blue `#2277FF`
   - 03: Black `#000000`
   - 04: Soft Lavender `#E3E7FC`
   - 05: White `#FFFFFF`
   - Gradient 1: Futurewave (`#2277FF` -> `#AEC2FF`)
   - Gradient 2: Midnight Surge (`#000B26` -> `#0056FF`)
