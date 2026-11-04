# ADR-0003: Serverless Frontend & Long-Running Container Backend Proxy

## Status

Accepted

## Context

Deploying the frontend and backend under different domain origins creates Cross-Origin Resource Sharing (CORS) security risks, cookie-sharing restrictions, and preflight latency overhead. Furthermore, Serverless environments (e.g. AWS Lambda, Vercel) exhaust MongoDB connection pools and cannot sustain long-lived transaction sessions, while Container environments (Docker, ECS, VPS) excel at persistent connection pooling.

## Decision

Adopt a **Hybrid Serverless / Container Deployment Model**:

1. **Frontend (`apps/frontend`)**: Deploys as a serverless Next.js App Router application on Edge/CDN (e.g. Vercel).
2. **Backend (`apps/backend`)**: Runs as a persistent Express 5 long-running container maintain pool connections to MongoDB `rs0`.
3. **Server-Side API Proxy**: The frontend proxies all `/api/v1/*` requests server-side to `BACKEND_INTERNAL_URL` via `next.config.ts` rewrites:
   ```ts
   async rewrites() {
     return [
       {
         source: '/api/v1/:path*',
         destination: `${process.env.BACKEND_INTERNAL_URL || 'http://localhost:4000'}/api/v1/:path*`,
       },
     ];
   }
   ```

## Consequences

- **Positive**:
  - Zero CORS overhead: The browser only ever talks to the frontend origin.
  - Secure HttpOnly session cookies can be set on the primary domain without cross-domain attributes.
  - Backend maintains persistent connection pools (maxPoolSize: 50) without pool exhaustion spikes.
- **Negative**:
  - Frontend edge nodes act as an extra network hop for backend requests.
