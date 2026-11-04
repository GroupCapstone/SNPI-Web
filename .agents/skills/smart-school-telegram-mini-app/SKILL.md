---
name: smart-school-telegram-mini-app
description: Standard for the Smart School Educational System Telegram Mini App featuring role-based workflows (Student, Teacher, Parent, Admin), GitLab Pajamas Design System UI components, Vercel subdomain edge proxying, and strict solid-color zero-emoji rules.
---

# Smart School Educational System Telegram Mini App Standard

Defines the architecture and interface standards for the Smart School Educational Platform running as a Telegram Mini App.

## 1. Educational Domain Mission
- This mini app is an **Institutional School Education Management System** for students, teachers, parents, and administrators—not a cryptocurrency wallet.
- Integrates Cambridge IGCSE curriculum progress, daily classroom roll-call, student rewards and vouchers, teacher grading, parent alerts, and NBC Bakong KHQR tuition settlements.

## 2. Role-Based Capabilities (RBAC)
When a user logs in via Telegram or enters school credentials, the interface dynamically displays role-specific portals:

| Role | Scope | Primary Features & Dashboard Views |
| :--- | :--- | :--- |
| `STUDENT` | Self Scope | Cambridge IGCSE courses, syllabus progress, roll-call status, academic perks/vouchers, Socratic AI study tutor, tuition fee invoice. |
| `TEACHER` | Classroom Scope | Assigned classes and rosters, live attendance roll-call marker (Present/Absent/Late), gradebook and exam records, lesson plans. |
| `PARENT` | Family Scope | Linked children academic overview, attendance roll notifications, term report cards, tuition billing with NBC Bakong KHQR. |
| `ADMIN` | Campus Scope | Multi-branch campus overview, live API Gateway microservice telemetry, user directory, system audit and terms compliance. |

## 3. GitLab Pajamas Design Standards
- **Design Tokens**: Solid flat colors conforming to the GitLab Pajamas Design System (`#0F1722` obsidian canvas, `#17212D` card surfaces, `#1C2735` elevated tiles, `#1F75CB` GitLab Blue, `#108548` Success Green, `#DD2B0E` Alert Red, `#D97706` Warning Amber, `#FFFFFF` text).
- **Zero Gradient & Zero Mixed Colors**: Pure solid flat fills only. No linear, radial, or conic gradients.
- **Zero Emojis**: Use vector SVGs (`IconBook`, `IconGraduationCap`, `IconUserCheck`, `IconCheck`, `IconShield`, etc.) instead of unicode emojis.
- **Full Responsiveness**: Mobile webview (360px-480px), tablet (768px), and desktop widescreen (1024px+) with zero clipped or hidden elements.

## 4. API Endpoints & Subdomain Proxying
All browser requests use relative paths (`/api/v1/...`) routed through Vercel Edge rewrites (`vercel.json`) to `https://api.kesararamwithdigital.tech/`:
- `POST /api/v1/auth/telegram`: Cryptographic Telegram WebApp SSO
- `POST /api/v1/auth/login`: Direct institutional role authentication
- `GET /api/v1/student/rewards/profile`: Live student profile and credits
- `GET /api/v1/student/rewards/catalog`: Academic vouchers and cafeteria perks
- `POST /api/v1/student/rewards/claim`: Daily roll-call streak claim (+50 pts)
- `POST /api/v1/student/rewards/redeem`: Instant voucher code issuance
- `GET /api/v1/student/learning-path`: Cambridge IGCSE curriculum milestones
- `POST /api/v1/finances/khqr/generate`: NBC Bakong EMVCo KHQR tuition invoice
- `GET /api/v1/apis/health-check`: Live Edge microservice telemetry
