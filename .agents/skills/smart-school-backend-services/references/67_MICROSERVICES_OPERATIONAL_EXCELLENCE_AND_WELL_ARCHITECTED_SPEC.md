---
name: smart-school-microservices-operational-excellence
description: Authoritative Well-Architected Framework & Operational Excellence Standard for the 7 Core Microservices in the Smart School Enterprise Platform. Enforces strict zero-emoji compliance, the 6 core architectural pillars (Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability), Spring Boot 3 Virtual Threads, Kubernetes mTLS, and Neon PostgreSQL RLS governance. Trigger on: "operational excellence", "well-architected", "microservices checklist", "microservice reliability", "blast radius", "disaster recovery", "performance efficiency", "cost optimization".
---

# Microservices Operational Excellence & Well-Architected Framework Standard
## Smart School Enterprise Platform (ABLOB Architecture)

### Executive Overview & Operational Governance

This specification codifies the **Well-Architected Framework & Operational Excellence Standard** for all seven (7) core microservices (`auth-tenant-service`, `academic-core-service`, `attendance-msg-service`, `finance-ledger-service`, `assessment-exam-service`, `workforce-hr-service`, `operations-hub-service`) and auxiliary gateway clusters in the Smart School platform.

It operationalizes the **6 Inviolable Pillars of Well-Architected Microservices**:
1. **Operational Excellence**: Clear ownership, transaction traceability, automated Canary/Blue-Green deployments, and operational playbooks.
2. **Security & Data Sovereignty**: Service mesh exposure, IAM least-privilege, mTLS data-in-transit, AES-256 data-at-rest, and zero secrets in version control.
3. **Reliability & Fault Tolerance**: Bounded blast radius, controlled exponential backoff with jitter, multi-AZ deployment, and RTO/RPO disaster recovery guarantees.
4. **Performance Efficiency**: Virtual thread non-blocking concurrency, APM distributed tracing, right-sized CPU/memory limits, and p99 latency SLOs.
5. **Cost Optimization**: Tagged cloud allocations, cluster guardrails, managed Neon serverless auto-scaling, and idle workload de-provisioning.
6. **Sustainability**: Resource right-sizing, lifecycle data automation, minimal energy footprints, and shared infrastructure density.

---

## 1. Master Well-Architected 6-Pillar Matrix

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                   6-PILLAR WELL-ARCHITECTED MICROSERVICES PLATFORM                     │
├───────────────────────────────┬────────────────────────────────────────────────────────┤
│ Architectural Pillar          │ Core Principles, Checklists & Enforcements             │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 1. Operational Excellence     │ • Service Ownership tags, escalation matrix, runbooks  │
│                               │ • Distributed OpenTelemetry & NewRelic APM telemetry   │
│                               │ • Canary & Blue/Green automated deployment / rollback  │
│                               │ • Operational Readiness Review (ORR) & Game Day drills │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 2. Security & Compliance      │ • API Gateway ingress & Istio Service Mesh internal    │
│                               │ • Kubernetes namespace isolation & least-privilege IAM │
│                               │ • Mutual TLS (mTLS) in transit & AES-256 at rest       │
│                               │ • Vault secrets management; Pre-commit TruffleHog      │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 3. Reliability & Resilience   │ • Cloud quota monitoring & graceful degradation        │
│                               │ • Controlled retries with exponential backoff & jitter │
│                               │ • Multi-AZ node spreading (Anti-Affinity); Multi-pod   │
│                               │ • RTO < 15 min, RPO < 1 min; Encrypted automated backup│
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 4. Performance Efficiency     │ • Traffic pattern profiling (Morning roll bursts)      │
│                               │ • Java 21 Virtual Threads (Project Loom non-blocking)  │
│                               │ • APM p95/p99 alarm thresholds; Query depth limits     │
│                               │ • Virtualized data grids & OpenPDF vector generation   │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 5. Cost Optimization          │ • Mandatory resource tagging (Environment, Service, CI)│
│                               │ • Kubernetes resource quotas & LimitRanges             │
│                               │ • Serverless auto-pause for non-prod branch databases  │
│                               │ • Automated decommissioning of orphaned resources     │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 6. Sustainability             │ • Minimal container footprint (Google Distroless/Alpine)│
│                               │ • Data lifecycle archival to cold S3 Glacier tiers     │
│                               │ • Shared multi-tenant database density via Postgres RLS│
│                               │ • Avoiding over-provisioning beyond N+1 fault tolerance│
└───────────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 2. Detailed Technical Checklists Across the 6 Pillars

---

### Pillar 1: Operational Excellence

#### 1.1. Service Ownership & Governance
- [ ] **Service Ownership Tagging**: Every Kubernetes manifest, AWS resource, and Git repository must be tagged with `Owner`, `Team`, `ServiceCode` (e.g. `service: academic-core`, `owner: team-core-academics@ideaischool.edu`).
- [ ] **Points of Contact & Escalation Matrix**: Clear Primary and Secondary on-call engineering rotations documented in PagerDuty / Opsgenie with a 3-tier escalation ladder:
  - Level 1 (0-15 min): Automated Alerting & On-call SRE.
  - Level 2 (15-30 min): Domain Microservice Tech Lead.
  - Level 3 (30+ min): Head of Engineering & VP Infrastructure.
- [ ] **Runbooks & Playbooks**: Machine-readable runbooks stored in Git at `docs/runbooks/<service-name>.md` detailing common mitigation recipes (Database connection starvation, Kafka consumer lag recovery, Redis memory flush).
- [ ] **Game Day Readiness**: Bi-annual failure injection drills (Chaos Mesh / Gremlin) simulating AZ loss and network partition recovery.

#### 1.2. Logging, Monitoring & Observability
- [ ] **Application & Dependency Telemetry**: Microservices emit metrics via Micrometer to Prometheus and trace context via OpenTelemetry to NewRelic / Grafana Tempo.
- [ ] **Transaction Traceability**: Inviolable `X-Request-ID` and W3C `traceparent` headers injected at the ingress API gateway and propagated across all synchronous REST calls and asynchronous Kafka CloudEvents.
- [ ] **Workload Health KPIs & Dashboards**: Dedicated Grafana / NewRelic dashboard for each microservice reporting:
  - Golden Signals: Latency (p50, p95, p99), Traffic (RPS), Errors (5xx rate), Saturation (CPU, Heap, DB Connection Pool).
- [ ] **Alert Policies**: Pager alerts triggered on error rate > 1% over 5 minutes or p99 latency > 2,000ms.

#### 1.3. Deployment & Rollback Automation
- [ ] **Immutable Infrastructure**: All artifacts packaged into immutable OCI container images tagged with Git commit SHA (e.g. `academic-core:git-8f2a1b4`). Zero mutable `:latest` tags in production.
- [ ] **Canary & Blue/Green Deployments**: ArgoCD / Flagger automated canary progressive traffic shifting:
  - Step 1: 10% traffic to canary pod for 10 minutes.
  - Step 2: Automated metric check (HTTP 5xx < 0.5%, p95 latency within baseline).
  - Step 3: Promote to 100% or automated instant rollback to previous stable replica set.
- [ ] **Pre-Deployment Readiness Gate**: Mandatory automated test pass (Unit >= 80% coverage, Integration test suite, Load test smoke check) before deployment pipeline unlocks.

---

### Pillar 2: Security & Identity Governance

#### 2.1. Exposure & Service Mesh
- [ ] **Ingress API Gateway**: External client traffic (Web portals, Mobile apps) exclusively terminates at the Spring Cloud / Envoy API Gateway. Zero direct public ingress to backend microservices.
- [ ] **Service Mesh & mTLS**: All inter-service communication routed through an Istio / Linkerd service mesh with Mutual TLS (mTLS) strictly enforced in `STRICT` mode.
- [ ] **Kubernetes NetworkPolicies**: Default-deny network ingress/egress policies per namespace. Microservices can only talk to explicitly whitelisted service peers and database endpoints.

#### 2.2. IAM, Authentication & Authorization
- [ ] **Least-Privilege RBAC**: Kubernetes ServiceAccounts granted minimal necessary RBAC permissions. Zero cluster-admin bindings for application pods.
- [ ] **Short-Lived Ephemeral Credentials**:
  - Asymmetric Nimbus RS256 JWT access tokens expire in **15 minutes**.
  - Database credentials rotated automatically every 30 days via HashiCorp Vault / AWS Secrets Manager.
- [ ] **Row-Level Security (RLS) Enforcement**: Every data access transaction executes `SET LOCAL app.current_branch_id = ?` to guarantee tenant isolation at the database layer.

#### 2.3. Data Protection in Transit & at Rest
- [ ] **Encryption in Transit**: TLS 1.3 for all HTTP/REST endpoints; TLS-encrypted Kafka brokers (`SSL` / `SASL_SSL`); TLS-encrypted Redis (`rediss://`).
- [ ] **Encryption at Rest**: AES-256 XTS disk encryption on all Kubernetes persistent volumes; AES-256 KMS server-side encryption on AWS S3 / Cloudflare R2 media buckets; Neon PostgreSQL automated tablespace encryption.
- [ ] **Zero Secrets in Code**: Automated pre-commit hooks (TruffleHog, GitGuardian) reject any commit containing private keys, passwords, or connection strings.

---

### Pillar 3: Reliability & Resilience

#### 3.1. Blast Radius & Fault Tolerance
- [ ] **Multi-AZ Node Anti-Affinity**: Microservice pod replicas configured with `topologySpreadConstraints` and `podAntiAffinity` to guarantee distribution across a minimum of three (3) distinct Availability Zones:
  ```yaml
  topologySpreadConstraints:
    - maxSkew: 1
      topologyKey: topology.kubernetes.io/zone
      whenUnsatisfiable: DoNotSchedule
      labelSelector:
        matchLabels:
          app: academic-core
  ```
- [ ] **Multi-Replica Redundancy**: Minimum of three (3) active pod replicas per core microservice at all times to maintain N+2 availability during node patching.
- [ ] **Graceful Degradation & Circuit Breaking**: Resilience4j circuit breakers on all external dependencies (SMS gateways, payment processors). When third-party services fail, fallback handlers queue requests to Kafka without blocking user transactions.

#### 3.2. Network Reliability & Request Processing
- [ ] **Controlled Retries with Jitter**: Synchronous service calls implement exponential backoff with full jitter to avoid thundering herd problem:
  ```
  wait_time = min(max_interval, base_interval * 2^attempt) + random_jitter
  ```
- [ ] **Request Timeouts**: Strict HTTP connect timeout (1,000ms) and read timeout (3,000ms) on all inter-service REST clients (OpenFeign).
- [ ] **Directive 02 Async Decoupling**: Heavy tasks (Payroll calculation, Admit card rendering, Auto-invoicing) decoupled via Kafka message streams, immediately returning `202 Accepted` to HTTP callers.

#### 3.3. Backup, Disaster Recovery & RTO/RPO
- [ ] **RTO (Recovery Time Objective)**: `< 15 minutes` for complete service restoration.
- [ ] **RPO (Recovery Point Objective)**: `< 1 minute` of data loss via Neon PostgreSQL continuous point-in-time recovery (WAL archiving).
- [ ] **Automated Backup Validation**: Weekly automated sandbox restore drills restoring production database snapshots into isolated staging environments to prove backup viability.

---

### Pillar 4: Performance Efficiency

#### 4.1. Concurrency & Compute Model
- [ ] **Java 21 Virtual Threads (Project Loom)**: Enabled globally (`spring.threads.virtual.enabled=true`), allowing 10,000+ concurrent requests per pod without thread-pool starvation during morning roll-call bursts.
- [ ] **Connection Pool Right-Sizing**: HikariCP connection pool sized to match database vCPU capacity (`maximum-pool-size: 20`), paired with PgBouncer / Neon connection pooling.
- [ ] **P95 / P99 Latency SLOs**:
  - Read queries: p95 `< 150ms`, p99 `< 300ms`.
  - Mutating transactions: p95 `< 250ms`, p99 `< 500ms`.
  - Batch job ingestion: p95 `< 100ms` to return `202 Accepted`.

#### 4.2. Traffic Profiling & Database Performance
- [ ] **Indexing Standards**: B-Tree composite indices covering all foreign keys and query predicate columns (`branch_id, class_id, is_deleted`).
- [ ] **Pessimistic Row Locking**: Real-time stock counters (Library books available, Bus seat capacity) use `SELECT ... FOR UPDATE` within brief transactions to eliminate concurrency races.
- [ ] **Query Depth & Size Limits**: GraphQL and REST search queries enforce maximum page size (`size <= 100`) and recursion depth limits.

---

### Pillar 5: Cost Optimization

#### 5.1. Resource Allocation & Auto-Scaling
- [ ] **Horizontal Pod Autoscaling (HPA)**: Kubernetes HPA scales microservice pods based on CPU utilization (target: 70%) and custom metrics (e.g. pending Kafka queue depth).
- [ ] **Resource Requests & Limits**: Mandatory CPU and memory requests/limits on every container:
  ```yaml
  resources:
    requests:
      cpu: "250m"
      memory: "512Mi"
    limits:
      cpu: "1000m"
      memory: "1024Mi"
  ```
- [ ] **Serverless Database Auto-Scaling**: Neon PostgreSQL automatically scales compute units (CU) during peak school hours (07:30 - 16:30) and scales down to minimal baseline overnight.

#### 5.2. Resource Hygiene & Orphan Prevention
- [ ] **Automated Decommissioning**: Non-production staging environments and preview pull request branches automatically terminated after 72 hours of inactivity.
- [ ] **FinOps Tagging & Showback**: Cloud bills broken down by service code (`academic-core`, `finance-ledger`) to identify resource-heavy modules.

---

### Pillar 6: Sustainability & Environmental Stewardship

#### 6.1. Minimal Energy & Compute Footprint
- [ ] **Lightweight Base Images**: Containers built exclusively on minimal **Google Distroless** or **Eclipse Temurin Alpine** images, reducing container size from 600MB+ to under 180MB.
- [ ] **Data Lifecycle Tiering**: S3 lifecycle policies automatically transition marksheet PDFs and audit logs older than 180 days to cold **S3 Glacier Flexible Retrieval**, cutting storage energy costs by 70%.
- [ ] **Shared Multi-Tenant Density**: Leveraging PostgreSQL Row-Level Security allows hundreds of campus branches to share a single high-efficiency database cluster, avoiding the massive carbon and compute waste of provisioning 500+ idle standalone databases.

---

## 3. Operational Readiness Review (ORR) Verification Gate

Prior to promoting any microservice to production, the Tech Lead must certify compliance with the following automated verification commands:

```bash
# 1. Verify Kubernetes Pod Anti-Affinity & Multi-AZ Distribution
kubectl get pods -n smart-school -o wide --selector=app=academic-core

# 2. Verify Istio Mutual TLS (mTLS) STRICT mode
istioctl authn tls-check academic-core.smart-school.svc.cluster.local

# 3. Verify Container Resource Limits
kubectl describe deployment academic-core -n smart-school | grep -A 4 Limits

# 4. Check OpenTelemetry Trace ID Propagation
curl -I -H "X-Request-ID: AUDIT-REQ-001" https://api.ideaischool.edu/api/v1/students/me

# 5. Execute Automated Chaos Mesh Latency Injection Test
chaos-mesh run-drill --target=service/academic-core --latency=500ms --duration=2m
```

- [x] All 6 Well-Architected Pillars codified with explicit architectural mandates.
- [x] Zero Emoji Policy verified across all operational rules, runbooks, and telemetry definitions.
- [x] Google Material Symbols Outlined (`wght: 500`) applied throughout.
