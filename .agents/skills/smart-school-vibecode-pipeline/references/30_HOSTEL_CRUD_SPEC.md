# Module 30: Hostel CRUD Architecture & Boarding Facilities Specification

## 1. Domain Overview & Taxonomy

The **Hostel** domain manages institutional student boarding, dormitory residences, room inventories, bed capacities, room types, and residential tariffs across campus facilities. It enables residential coordinators, wardens, and campus administrators to provision boarding quarters, classify room configurations, enforce capacity constraints, and track occupancy.

```
/super-admin/hostel or /admin/hostel
├── /hostel-rooms        (Hostel Rooms - Room Number / Name, Hostel, Room Type, Bed Count, Cost Per Bed)
├── /room-type           (Room Type - Dormitory configuration taxonomy: One Bed, Two Bed AC, etc.)
└── /hostel              (Hostel - Physical dormitory buildings: Boys Hostel, Girls Hostel, Campus Address, Intake)
```

---

## 2. Exhaustive Slug Specifications

### 2.1. Slug: `hostel-rooms` (`/super-admin/hostel-rooms` or `/admin/hostelroom`)

- **Screen Layout Structure**:
  - **Split 2-Column Responsive Layout**:
    - **Left Column (35% width)**: "Add Hostel Room" Creation Form Card.
    - **Right Column (65% width)**: "Hostel Room List" Interactive Data Table Card.
- **Form Controls & Constraints (Add Hostel Room)**:
  - `Room Number / Name *`: Single-line text input (alphanumeric room identifier, e.g. `B1`, `B2`, `G1`). Mandatory.
  - `Hostel *`: Single-select dropdown referencing registered dormitories (e.g. `Boys Hostel 101`, `Boys Hostel 102`, `Girls Hostel 103`, `Girls Hostel 104`). Mandatory.
  - `Room Type *`: Single-select dropdown referencing configured room types (e.g. `One Bed`, `Two Bed AC`, `Two Bed`, `One Bed AC`, `combine bed`). Mandatory.
  - `Number Of Bed *`: Positive integer input specifying total bed slots in the room (e.g. `1`, `2`, `4`). Mandatory.
  - `Cost Per Bed *`: Decimal currency input defining the periodic residential fee per bed slot (e.g. `$300.00`, `$1,000.00`, `$500.00`). Mandatory.
  - `Description`: Multi-line textarea for room features, balcony orientation, or amenities notes. Optional.
  - `Save` Button: Solid primary button (`#6366f1` / `#7c3aed`), persists room configuration.
- **Table Controls & Data Display (Hostel Room List)**:
  - **Table Toolbar**:
    - Quick search input (`Search...`).
    - Page length selector (`50` default).
    - Export tools: Copy, Excel, CSV, PDF, Print, Column Visibility dropdown.
  - **Columns**:
    1. `Room Number / Name` (String, sortable, e.g. `B1`, `B2`, `G1`)
    2. `Hostel` (String, sortable, e.g. `Boys Hostel 101`, `Girls Hostel 104`)
    3. `Room Type` (String, sortable, e.g. `One Bed`, `Two Bed AC`)
    4. `Number Of Bed` (Integer, numeric align, e.g. `1`, `2`)
    5. `Cost Per Bed` (Currency formatted, e.g. `$300.00`, `$1,000.00`)
    6. `Action` (Control strip: Edit icon button, Delete icon button)
  - **Ground Truth Seeded Records**:
    - `B1` | `Boys Hostel 101` | `One Bed` | `1` | `$300.00`
    - `B2` | `Boys Hostel 102` | `Two Bed AC` | `2` | `$1,000.00`
    - `B3` | `Boys Hostel 101` | `One Bed` | `1` | `$500.00`
    - `B4` | `Boys Hostel 102` | `One Bed AC` | `1` | `$1,200.00`
    - `G1` | `Boys Hostel 101` | `One Bed` | `1` | `$340.00`
    - `G2` | `Girls Hostel 104` | `One Bed` | `1` | `$300.00`
    - `G3` | `Girls Hostel 103` | `Two Bed AC` | `2` | `$500.00`
    - `G4` | `Girls Hostel 104` | `Two Bed` | `2` | `$300.00`
  - **Pagination & Counter**: `Showing 1 to 8 of 8 entries`, page button `< 1 >`.

---

### 2.2. Slug: `room-type` (`/super-admin/room-type` or `/admin/roomtype`)

- **Screen Layout Structure**:
  - **Split 2-Column Layout**:
    - **Left Column (35% width)**: "Add Room Type" Master Authoring Card.
    - **Right Column (65% width)**: "Room Type List" Data Table Card.
- **Form Controls & Constraints (Add Room Type)**:
  - `Room Type *`: Text input (e.g. `One Bed`, `Two Bed AC`, `Two Bed`, `One Bed AC`, `combine bed`). Mandatory, unique constraint per institution.
  - `Description`: Textarea for specifications, air-conditioning, attached bath, or furnishing details. Optional.
  - `Save` Button: Solid purple button.
- **Table Controls & Data Display (Room Type List)**:
  - Quick search, page length (50), export tools (Copy, Excel, CSV, PDF, Print, Columns).
  - **Columns**:
    1. `Room Type` (String, sortable)
    2. `Action` (Edit icon, Delete icon)
  - **Ground Truth Seeded Records**:
    - `One Bed`
    - `Two Bed AC`
    - `Two Bed`
    - `One Bed AC`
    - `combine bed`
  - **Pagination & Counter**: `Showing 1 to 5 of 5 entries`, page button `< 1 >`.

---

### 2.3. Slug: `hostel` (`/super-admin/hostel` or `/admin/hostel`)

- **Screen Layout Structure**:
  - **Split 2-Column Layout**:
    - **Left Column (35% width)**: "Add Hostel" Facility Registration Card.
    - **Right Column (65% width)**: "Hostel List" Real-time Facility Overview Card.
- **Form Controls & Constraints (Add Hostel)**:
  - `Hostel Name *`: Single-line text input (e.g. `Boys Hostel 101`, `Girls Hostel 103`). Mandatory.
  - `Type *`: Single-select dropdown specifying gender residency classification (`Boys`, `Girls`, `Combine`). Mandatory.
  - `Address`: Text input for physical campus location, block, or wing (e.g. `School Campus`). Optional.
  - `Intake`: Positive integer input denoting total institutional boarding intake capacity (e.g. `200`, `150`, `456`). Optional.
  - `Description`: Multi-line textarea for building warden contact, curfew rules, or emergency provisions. Optional.
  - `Save` Button: Solid primary button.
- **Table Controls & Data Display (Hostel List)**:
  - Toolbar with Search, Page size (50), Copy, Excel, CSV, PDF, Print, Column selector.
  - **Columns**:
    1. `Hostel Name` (String, sortable)
    2. `Type` (Classification badge/text: `Boys`, `Girls`, `Combine`)
    3. `Address` (Physical location text)
    4. `Intake` (Integer capacity count)
    5. `Action` (Edit, Delete)
  - **Ground Truth Seeded Records**:
    - `Boys Hostel 101` | `Boys` | `School Campus` | `200`
    - `Boys Hostel 102` | `Boys` | `School Campus` | `200`
    - `Girls Hostel 103` | `Girls` | `School Campus` | `150`
    - `Girls Hostel 104` | `Girls` | `School Campus` | `150`
    - `hostel` | `Boys` | *(blank)* | `456`
  - **Pagination & Counter**: `Showing 1 to 5 of 5 entries`, page button `< 1 >`.

---

## 3. Database Schema Blueprint (PostgreSQL DDL)

```sql
-- Hostel Buildings Master Table
CREATE TABLE hostels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    hostel_name VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Boys', 'Girls', 'Combine')),
    address VARCHAR(255),
    intake INTEGER CHECK (intake >= 0),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_hostel_name_branch UNIQUE (branch_id, hostel_name)
);

-- Room Types Master Table
CREATE TABLE hostel_room_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    room_type VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_room_type_branch UNIQUE (branch_id, room_type)
);

-- Hostel Rooms Inventory Table
CREATE TABLE hostel_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    hostel_id UUID NOT NULL REFERENCES hostels(id) ON DELETE RESTRICT,
    room_type_id UUID NOT NULL REFERENCES hostel_room_types(id) ON DELETE RESTRICT,
    room_number VARCHAR(50) NOT NULL,
    number_of_bed INTEGER NOT NULL CHECK (number_of_bed > 0),
    cost_per_bed NUMERIC(10, 2) NOT NULL CHECK (cost_per_bed >= 0),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_room_number_hostel UNIQUE (hostel_id, room_number)
);

-- Indexes for high performance lookup
CREATE INDEX idx_hostels_branch ON hostels(branch_id);
CREATE INDEX idx_hostel_rooms_hostel ON hostel_rooms(hostel_id);
CREATE INDEX idx_hostel_rooms_type ON hostel_rooms(room_type_id);
```

---

## 4. REST API Endpoint Specifications

| Method | Endpoint | Description | Payload / Params | Response |
|---|---|---|---|---|
| `GET` | `/api/v1/hostels` | List all hostels | `?branchId=uuid` | `200 OK` (Array of Hostels) |
| `POST` | `/api/v1/hostels` | Register new hostel | `{ hostelName, type, address, intake, description }` | `201 Created` |
| `PUT` | `/api/v1/hostels/{id}` | Update hostel details | `{ hostelName, type, address, intake, description }` | `200 OK` |
| `DELETE`| `/api/v1/hostels/{id}` | Delete hostel | *(none)* | `204 No Content` |
| `GET` | `/api/v1/hostel-room-types` | List all room types | `?branchId=uuid` | `200 OK` (Array of Room Types) |
| `POST` | `/api/v1/hostel-room-types` | Create room type | `{ roomType, description }` | `201 Created` |
| `GET` | `/api/v1/hostel-rooms` | List rooms with bed costs | `?branchId=uuid&hostelId=uuid` | `200 OK` (Array of Rooms) |
| `POST` | `/api/v1/hostel-rooms` | Provision new room | `{ roomNumber, hostelId, roomTypeId, numberOfBed, costPerBed, description }` | `201 Created` |
| `PUT` | `/api/v1/hostel-rooms/{id}` | Update room details | `{ roomNumber, hostelId, roomTypeId, numberOfBed, costPerBed, description }` | `200 OK` |
| `DELETE`| `/api/v1/hostel-rooms/{id}` | Delete room | *(none)* | `204 No Content` |

---

## 5. Event Envelope & Telemetry Architecture (Kafka)

Whenever hostel inventory or residential allotments change, the platform emits immutable audit envelopes to the `school.hostel.events` topic:

```json
{
  "eventId": "e932b104-58bc-4672-91f1-32cb5631b819",
  "eventType": "school.hostel.room-provisioned",
  "aggregateId": "room-uuid-4482-bb30",
  "timestamp": "2026-09-12T03:36:00Z",
  "branchId": "branch-main-001",
  "actor": {
    "userId": "user-super-admin-01",
    "role": "SUPER_ADMIN"
  },
  "payload": {
    "hostelId": "hostel-boys-101",
    "hostelName": "Boys Hostel 101",
    "roomNumber": "B1",
    "roomTypeId": "type-one-bed",
    "numberOfBed": 1,
    "costPerBed": 300.00
  }
}
```
