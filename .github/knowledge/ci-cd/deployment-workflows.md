---
Last updated: 2026-11-03
Domain: ci-cd
Version: 1.0
Reviewed by: DevOps & Platform Engineering Board
---

# Enterprise Deployment Workflows

## 1. Hybrid Serverless & Container Topology

- **Frontend Architecture**: Next.js App Router deployed serverlessly on Vercel Edge/Serverless Functions with static page pre-rendering.
- **Backend Architecture**: Express 5 modular monolith packaged into a lightweight Alpine Docker container deployed behind an edge reverse proxy.
- **Unified Domain Routing**: Reverse proxy routes `/api/v1/*` to backend containers while serving frontend assets on root routes under single-domain architecture.

## 2. Zero-Downtime Rollover & Healthchecks

- **Readiness Probes**: Containers expose `/api/v1/health` verifying MongoDB connection state and memory ceilings before traffic cutover.
- **Liveness Probes**: Periodic watchdog pings ensuring unresponsive worker processes are gracefully restarted.
- **Graceful Shutdown**: Intercept `SIGTERM` and `SIGINT` signals; drain in-flight HTTP requests within 10 seconds before closing MongoDB connection pools.
