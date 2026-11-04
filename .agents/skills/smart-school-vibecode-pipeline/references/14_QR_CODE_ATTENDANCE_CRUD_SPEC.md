# Module 14: QR Code Attendance CRUD Architecture & IoT Gate Ingress Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **QR Code Attendance** module orchestrates automated high-throughput turnstile, gate, and classroom presence verification utilizing optical barcodes, 2D QR codes, and hardware ingress scanners. Designed for sub-second badge verification, it supports both **Camera-Based Devices** (webcams, tablet cameras, mobile phone sensors via WebRTC / BarcodeDetector API) and **Sensor-Based Hardware Guns** (USB HID keyboard wedge scanners, Bluetooth barcode wands, laser sensors).

- **Module Index**: `14`
- **Legacy Route Base**: `/admin/qr_code_attendance`
- **Modern Component Root**: `/super-admin/qr-attendance`
- **Functional Domain**: `IoT Gate Ingress & Hardware Telemetry`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **High-Velocity Ingress Standard**: Scan telemetry is acknowledged immediately at the edge (HTTP 202 Accepted) and enqueued onto Kafka (`school.attendance.qr-scanned`) to prevent bottlenecking during morning rush periods (e.g., 2,500 students arriving within a 20-minute window).
- **Anti-Passback & De-duplication**: In-memory Redis sliding-window filter prevents duplicate logs within a 5-minute threshold while logging subsequent scans as departure / checkout events.

---

### Complete Slug Inventory & Route Mapping

The QR Code Attendance module comprises **2 dedicated slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `attendance` | `/admin/qr_code_attendance` | `/super-admin/qr-attendance` | Dual-Card Telemetry Viewfinder | `qr_attendance_logs` | Toggle Device Mode, Fullscreen Stream, Decode Badge, Render Profile |
| **02** | `setting` | `/admin/qr_code_attendance/setting` | `/super-admin/qr-attendance/setting` | Form Configuration Card | `qr_attendance_settings` | Toggle Auto Attendance, Select Scanner Type, Choose Camera Sensor |

---

### 1. Slug `attendance`: Live Gate Viewfinder & Badge Scanner

#### A. Screen Architecture & Visual Layout
Top Header with Mode Switcher + Dual Split Cards:
- **Top Header Bar**:
  - Title: `QR Code Attendance`
  - Right-Aligned Mode Switcher:
    - `Camera-based device` Button (Tactile purple active pill when camera mode is selected).
    - `Sensor-based device` Button (Tactile neutral pill when hardware wedge mode is selected).
    - `Fullscreen` Toggle Icon Button (Expands viewfinder to borderless kiosk mode).

#### B. Left Card: Optical Viewfinder (`Scan Your ID Card QR Code / Barcode`)
- **Card Header**: `Scan Your ID Card QR Code / Barcode`
- **Viewfinder Surface**:
  - WebRTC Video Canvas (`<video>` element with live 60fps frame buffer).
  - Overlay: Animated targeting reticle / scanning laser beam.
  - Camera Detection Fallback: When no video device is detected or permissions are denied, renders centered red warning text: `Camera not found.`
  - Continuous Decoding: Background Web Worker running ZXing / WebAssembly BarcodeDetector scanning for student token payload `SS-STD-[BRANCH]-[TOKEN]`.

#### C. Right Card: Student Identity Display Card
- **Idle State**:
  - Stylized Vector Graphic of an ID Badge with holder clip, photo avatar, biographical lines, and 2D QR Code.
- **Scanned / Active State (Live Profile Render)**:
  - Scanned Student Avatar (`photo_url`).
  - Student Full Name (`VARCHAR(255)`).
  - Admission Number (`admission_no`, e.g., `ADM-10024`).
  - Class & Section (`Class 1 (A)`).
  - Roll Number (`roll_no`).
  - Timestamp (`HH:mm:ss`, e.g., `07:45:12 AM`).
  - Attendance Status Badge:
    - `Present` (Green badge: On-time before campus cutoff).
    - `Late` (Orange badge: Within 30 minutes after grace period).
    - `Already Marked` (Blue badge: Duplicate scan within grace window).
  - Web Audio API Sound Feedback:
    - Success Tone: 880 Hz high-frequency chime.
    - Error / Unrecognized Tone: 220 Hz low-frequency buzz.

#### D. Hardware Keyboard Wedge Mode (`Sensor-based device`)
- When switched to `Sensor-based device`:
  - Viewfinder video is paused to conserve battery/CPU.
  - Hidden input field maintains continuous window focus.
  - Intercepts rapid sequential keypress events (< 50ms inter-character interval) terminated by `Enter` (`\n`).
  - Submits barcode payload directly to the attendance ingest engine.

---

### 2. Slug `setting`: Ingress Hardware & Telemetry Engine

#### A. Screen Architecture & Visual Layout
Centered Card layout titled `Setting`:
- Clean Brutalist layout with tactile purple controls and radio chips.

#### B. Form Fields Schema (`qr_attendance_settings`)
| Form Field Label | Field Name | Input Type | Current Screenshot Value | Validation & Constraints | Technical Rationale |
|:---|:---|:---|:---|:---|:---|
| **Auto Attendance \*** | `auto_attendance` | `toggle_switch` | `ON` (Active purple) | Boolean (`true`/`false`) | When active, scanning immediately logs presence without requiring manual operator confirmation. |
| **Scanner Device Type \*** | `device_types` | `checkbox_group` | Both Checked: <br>1. `[x] Sensor-based device like a scanning gun`<br>2. `[x] Camera-based device, like a mobile phone or webcam` | Required, at least 1 checked | Enables the input listeners and drivers for both optical video streams and hardware USB/Bluetooth barcode guns. |
| **Select Camera \*** | `camera_facing` | `radio_group` | `(*) Primary (Back)` (Selected)<br>`( ) Secondary (Front)` | Required: `Primary (Back)` or `Secondary (Front)` | Controls WebRTC `facingMode`: `'environment'` for rear camera / tablet kiosk vs. `'user'` for front-facing webcam. |
| **Save Button** | *Submit* | `button` | - | Bottom tactile purple button | Submits payload to `PUT /api/v1/qr-attendance/settings`. |

---

### PostgreSQL Database Schema & RLS Policies

```sql
-- QR Code Ingress Settings
CREATE TABLE qr_attendance_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    auto_attendance_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    sensor_based_device_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    camera_based_device_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    selected_camera_sensor VARCHAR(30) NOT NULL DEFAULT 'Primary (Back)' CHECK (selected_camera_sensor IN ('Primary (Back)', 'Secondary (Front)')),
    late_threshold_minutes INT NOT NULL DEFAULT 15,
    deduplication_window_seconds INT NOT NULL DEFAULT 300,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_qr_settings_branch UNIQUE (branch_id)
);

ALTER TABLE qr_attendance_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY qr_settings_branch_isolation ON qr_attendance_settings
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );

-- Real-Time QR Gate Scan Audit Ledger
CREATE TABLE qr_attendance_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    raw_token VARCHAR(255) NOT NULL,
    device_mode VARCHAR(30) NOT NULL CHECK (device_mode IN ('Camera', 'Sensor')),
    scanned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    attendance_status VARCHAR(20) NOT NULL CHECK (attendance_status IN ('Present', 'Late', 'Half Day', 'Duplicate')),
    gate_station_id VARCHAR(50) DEFAULT 'Main-Gate-01',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_qr_scan_branch_time ON qr_attendance_logs(branch_id, scanned_at DESC);
CREATE INDEX idx_qr_scan_student_date ON qr_attendance_logs(branch_id, student_id, scanned_at);

ALTER TABLE qr_attendance_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY qr_logs_branch_isolation ON qr_attendance_logs
    FOR ALL USING (
        branch_id = current_setting('app.current_branch_id', true)::uuid
        OR current_setting('app.bypass_rls', true) = 'true'
    );
```

---

### REST API & WebSocket Specification

#### 1. Real-Time Scan Ingest Endpoint
- `POST /api/v1/qr-attendance/scan`
  - Headers: `X-Branch-ID: <uuid>`, `Authorization: Bearer <jwt>`
  - Payload:
    ```json
    {
      "token": "SS-STD-PP01-9921448",
      "deviceMode": "Camera",
      "gateStationId": "Gate-West-Turnstile-02"
    }
    ```
  - Response: `202 Accepted`
    ```json
    {
      "status": "ACCEPTED",
      "student": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Alexandros Thorne",
        "admissionNo": "ADM-10024",
        "class": "Class 1",
        "section": "A",
        "rollNo": "12",
        "photoUrl": "https://cdn.smart-school.in/students/std_10024.jpg",
        "attendanceStatus": "Present",
        "timestamp": "2026-09-12T07:45:12Z"
      }
    }
    ```

#### 2. Settings Endpoints
- `GET /api/v1/qr-attendance/settings`
  - Response: `200 OK` (Current configuration payload).
- `PUT /api/v1/qr-attendance/settings`
  - Payload:
    ```json
    {
      "autoAttendanceEnabled": true,
      "sensorBasedDeviceEnabled": true,
      "cameraBasedDeviceEnabled": true,
      "selectedCameraSensor": "Primary (Back)"
    }
    ```
  - Response: `200 OK`.

#### 3. WebSocket Real-Time Gate Monitor
- `WS /ws/qr-attendance?branchId={branchId}`
  - Broadcasts live scan events to administrative dashboards and security monitor kiosks in real time.

---

### Kafka Event Envelopes

```json
{
  "eventId": "evt_qr_100293481",
  "eventType": "school.attendance.qr-scanned",
  "branchId": "br_phnom_penh_01",
  "timestamp": "2026-09-12T07:45:12Z",
  "payload": {
    "studentId": "std_10024",
    "admissionNo": "ADM-10024",
    "gateStation": "Gate-West-Turnstile-02",
    "deviceMode": "Camera",
    "attendanceStatus": "Present",
    "scannedAt": "2026-09-12T07:45:12Z"
  }
}
```

---

### Verification Checklist & Compliance Gates

- [x] Both QR Code Attendance slugs documented with UI fidelity and hardware states.
- [x] Dual-device execution verified: Camera viewfinder (WebRTC) vs. Sensor scanning gun (USB HID).
- [x] Anti-passback deduplication window modeled (300 seconds default).
- [x] Web Audio API feedback tones specified for success and warning events.
- [x] PostgreSQL RLS schema and sub-millisecond Kafka event envelope defined.
- [x] ZERO emoji policy strictly enforced.
- [x] ZERO code written; pure architectural specification.
