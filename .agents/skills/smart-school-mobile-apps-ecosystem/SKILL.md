---
name: smart-school-mobile-apps-ecosystem
description: Authoritative Architecture, Real-Time Ingress, UI/UX Standards, and Technical Specifications for the Smart School Mobile Applications Ecosystem across three core stakeholder roles - Student / Parent Mobile App (9 features), Teacher Mobile App (9 features), and Trustee / Principal Executive Mobile App (6 features). Enforces strict zero-emoji compliance, Liquid Glass design DNA, FCM/APNs push pipelines, offline synchronization, and biometrics authentication. Trigger whenever developing, generating, refactoring, or testing native iOS/Android mobile clients or mobile API endpoints.
---

# Smart School Mobile Applications Ecosystem
## Student / Parent, Teacher & Trustee / Principal Native Applications (ABLOB Architecture)

### Sovereign Declaration of Primary Skill Status
By institutional architectural directive, the **smart-school-mobile-apps-ecosystem** skill is ratified as a **PRIMARY TIER-1 CAPABILITY** of the Smart School Enterprise Platform.

This skill governs the complete lifecycle, user experience, offline data persistence, hardware device integrations (camera document scanning, GPS transit tracking, biometrics, turnstile gate passes), and push notification dispatch pipelines for all mobile clients connecting to the platform.

---

## 1. Master Mobile Applications Triad

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                     SMART SCHOOL MOBILE APPLICATION TRIAD                              │
├───────────────────────────┬───────────────────────────┬────────────────────────────────┤
│ STUDENT / PARENT APP      │ TEACHER MOBILE APP        │ TRUSTEE / PRINCIPAL APP        │
├───────────────────────────┼───────────────────────────┼────────────────────────────────┤
│ 1. Classwork / Homework   │ 1. Attendance & Messaging │ 1. Class/Stream Fees Recovery  │
│ 2. Online Exam & CBT      │ 2. Online Exam & Results  │ 2. Faculty/Student Attendance  │
│ 3. Assignment & Materials │ 3. Task & Event Mgmt      │ 3. Day-to-Day Staff Activity   │
│ 4. Fees Mgmt & E-Challan  │ 4. Homework Uploading     │ 4. Task Allocation Telemetry   │
│ 5. Student & Bus Tracking │ 5. Question Paper Gen     │ 5. Events, News & Circulars    │
│ 6. Syllabus & Achievements│ 6. Timetable & Gallery    │ 6. Sovereign Executive Chat    │
│ 7. Attendance & Messaging │ 7. Assign Syllabus & Notes│                                │
│ 8. Timetable, Library/Res │ 8. Lesson & Circulars     │                                │
│ 9. Hostel & Food Menu     │ 9. Location & Media Feeds │                                │
├───────────────────────────┴───────────────────────────┴────────────────────────────────┤
│ PUSH NOTIFICATION: Firebase Cloud Messaging (FCM) + Apple Push Notifications (APNs)    │
│ OFFLINE PERSISTENCE: Room DB (Android) + SwiftData / CoreData (iOS) with Sync Queue    │
│ REAL-TIME STREAMS: MQTT v5.0 / WebSockets (STOMP) for Bus Coordinates & Turnstile Logs │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Inviolable Mobile Directives for Agents

1. **Directive M-01 (Offline-First Architecture)**: Every read-view (timetables, fee summaries, homework briefs, notices) MUST load instantaneously from local SQLite/Room/SwiftData storage before revalidating in the background.
2. **Directive M-02 (Zero Raw Tokens on Device)**: Tokens MUST be stored exclusively in platform-native secure hardware storage: iOS Keychain (`kSecClassGenericPassword` with `kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly`) and Android Keystore with `EncryptedSharedPreferences`.
3. **Directive M-03 (Sub-45-Second Classroom Attendance)**: The Teacher roll-call screen MUST default to "All Present" and allow single-tap toggling to Absent or Late, completing section submission within 45 seconds.
4. **Directive M-04 (15-Second CBT Autosave)**: Any active Computer-Based Test (CBT) on mobile MUST persist answers locally every 15 seconds to prevent student data loss during cellular dropouts.
5. **Directive M-05 (1km Geofence Bus Alerts)**: Real-time transit telemetry MUST evaluate student pickup point geofences and trigger a high-priority FCM/APNs alert when the bus is within 1 km (5 minutes ETA).
6. **Directive M-06 (Strict Zero Emoji Directive)**: Zero emojis across all mobile copy, alerts, push payloads, and labels. Use Google Material Symbols Outlined exclusively.
7. **Directive M-07 (Liquid Glass Mobile Physics)**: All cards feature frosted glass styling `bg-white/85 backdrop-blur-xl border border-white/60`, tactile buttons with `48x48px` minimum touch targets, and haptic feedback.

---

## 3. Reference Blueprints
For exhaustive technical schemas, REST contracts, and architectural workflows, agents MUST consult:
- **Spec 69**: [`references/69_MOBILE_APPS_ECOSYSTEM_STUDENT_TEACHER_TRUSTEE_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/69_MOBILE_APPS_ECOSYSTEM_STUDENT_TEACHER_TRUSTEE_SPEC.md)
- **Spec 71**: [`references/71_FINANCIAL_ACCOUNTING_ANALYTICS_AND_ADVANCED_REPORTING_SPEC.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/71_FINANCIAL_ACCOUNTING_ANALYTICS_AND_ADVANCED_REPORTING_SPEC.md)
- **Spec 72**: [`references/72_ENTERPRISE_BENEFITS_STAKEHOLDER_MATRIX_AND_HRM_EXAM_BLUEPRINT.md`](file:///Users/Apple16/Desktop/skill-ibecode-pipeline/references/72_ENTERPRISE_BENEFITS_STAKEHOLDER_MATRIX_AND_HRM_EXAM_BLUEPRINT.md)
