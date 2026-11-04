# SNPI-SMS Developer Documentation Portal (Nextra)

> Official developer documentation and REST API reference for the **SNPI School Management System**, built with [Nextra](https://nextra.site) and [Next.js](https://nextjs.org).

---

## 1. Quick Start

```bash
# 1. Navigate to the documentation directory
cd snp-sms-docs

# 2. Install dependencies
npm install

# 3. Start local development server (runs on port 3002)
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser.

---

## 2. Project Architecture

```text
snp-sms-docs/
├── pages/
│   ├── _app.tsx                 # Nextra theme stylesheet injector
│   ├── _meta.json               # Top-level navigation sidebar ordering
│   ├── index.mdx                # Welcome / Overview homepage
│   ├── getting-started/         # Quickstart, Base URLs, JWT authentication
│   ├── rest-api/                # REST conventions, RFC 7807, Student API
│   ├── security/                # OWASP API Top 10, RFC 8725 JWT, ASVS 4.0
│   └── guidelines/              # Industry standards (Zalando, Google AIP)
├── theme.config.jsx             # Documentation branding, logo, GitHub links
├── next.config.mjs              # Nextra plugin configuration
├── package.json                 # Standalone dependencies
└── tsconfig.json                # TypeScript compiler options
```

---

## 3. Adding New Documentation Pages

1. Create a new `.md` or `.mdx` file inside the appropriate `pages/<section>/` directory.
2. Register the page title in that directory's `_meta.json`:
   ```json
   {
     "my-new-page": "My New Page Title"
   }
   ```
3. Use Nextra components like `<Callout>`, `<Tabs>`, `<Cards>`, and code blocks.

---

## 4. Production Deployment (Vercel)

1. Connect the repository to Vercel.
2. Set the **Root Directory** to `snp-sms-docs`.
3. Set the custom domain to `docs.snpi.edu.kh`.
4. Deploy! Nextra compiles to 100% static HTML with instant search indexing.
