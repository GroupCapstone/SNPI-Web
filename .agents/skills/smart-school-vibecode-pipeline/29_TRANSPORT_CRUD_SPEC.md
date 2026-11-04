# Module 29: Transport CRUD Architecture & Fleet Logistics Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Transport** module orchestrates the school district's entire physical transportation network, vehicle fleet, driver licensing and credentialing, GPS geospatial pickup points, route-to-vehicle allocations, ordered stop sequencing with travel times, and monthly transportation fee schedules. It provides logistics officers and financial deans with fine calculation engines (`None`, `Percentage`, `Fix Amount`), mass-copy tools (`Copy First Fees Detail For All Months`), and student transit billing registers.

- **Module Index**: `29`
- **Legacy Route Base**: `/admin/vehicle`, `/admin/route`, `/admin/transport`
- **Modern Component Root**: `/super-admin/transport`
- **Functional Domain**: `Fleet Logistics, Geospatial Routing, Vehicle Allocation & Transit Billing`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **High-Velocity GPS Telemetry & Billing Ingress**: Route allocations and transit fee charges strictly adhere to Directive 02: **Synchronous-to-Asynchronous Bridge** (`POST /api/v1/transport/route-allocations` and `POST /api/v1/transport/fees/generate` return `HTTP 202 Accepted` with a `trackingId`, buffering fleet updates to Kafka topics `school.transport.route-allocated` and `school.transport.fees-generated`).
- **Geospatial Precision**: Pickup points store decimal GPS coordinates (`latitude`, `longitude` to 14 decimal places) facilitating map visualization and student bus tracking.

---

### Complete Slug Inventory & Route Mapping

The Transport module comprises **7 sovereign slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `fees-master` | `/admin/transport/feesmaster` | `/super-admin/transport/fees-master` | 12-Month Schedule Matrix + Mass Copy | `transport_fee_masters` | Configure 12-Month Due Dates, Set Fines (Fixed/Percentage), `Copy First Fees Detail` |
| **02** | `pickup-point` | `/admin/pickuppoint` | `/super-admin/transport/pickup-point` | Full-Width Master Ledger + Modal | `transport_pickup_points` | `+ Add` Stop, GPS Coordinates (Lat/Long), Map Pin View, Edit, Delete |
| **03** | `routes` | `/admin/route` | `/super-admin/transport/routes` | Split 2-Column Master-Detail (Pattern B) | `transport_routes` | Create Route Title, List Routes, Edit, Delete |
| **04** | `vehicles` | `/admin/vehicle` | `/super-admin/transport/vehicles` | Full-Width Fleet Ledger + Modal | `transport_vehicles` | `+ Add` Vehicle, Model/Year/Chasis/Reg No, Driver Details & Licence, View, Edit, Delete |
| **05** | `assign-vehicle` | `/admin/vehicle/assign` | `/super-admin/transport/assign-vehicle` | Split 2-Column Assignment Matrix | `transport_route_vehicles` | Bind Route to Multiple Fleet Vehicles, Manage Active Allocations |
| **06** | `route-pickup-point` | `/admin/route/pickuppoint` | `/super-admin/transport/route-pickup-point`| Route Stop Sequencing Matrix | `transport_route_stops` | Sequence Pickup Points on Route, Set Pickup Time, Set Monthly Distance Fare ($) |
| **07** | `student-transport-fees` | `/admin/transport/studentfees` | `/super-admin/transport/student-fees` | Student Transit Billing Ledger | `student_transport_bills`| Audit Student Transit Dues, Collect Bus Fare, View Route/Stop Allocation |

---

### 1. Slug `fees-master`: 12-Month Transit Fee & Fine Schedule

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Transport Fees Master`
- **Active Navigation**: `Transport` -> `Fees Master` (Route: `/admin/transport/feesmaster`)
- **Mass-Automation Control**:
  - `[ ] Copy First Fees Detail For All Months` (checkbox on top left: when checked, automatically propagates April's Due Date, Fine Type, and Fine Amount to May through March).
- **12-Month Fee Table Form**:
  - Structured 12-row schedule from `April` through `March`.
  - Column Controls Per Month:
    1. **Month Label**: `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`, `January`, `February`, `March`.
    2. **Due Date**: Datepicker input formatted `MM/DD/YYYY` (e.g. `04/20/2026`, `05/20/2026`, `06/20/2026`, `07/20/2026`, `08/20/2026`, `09/20/2026`, `10/20/2026`, `11/20/2026`).
    3. **Fine Type Radio Group**:
       - `( ) None`
       - `( ) Percentage (%)` [Numeric text input]
       - `(o) Fix Amount ($)` [Numeric text input pre-filled with `50.00`]
  - Bottom Save Button: Solid purple tactile button (`#8E24AA`).

---

### 2. Slug `pickup-point`: GPS Geospatial Transit Stops

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Pickup Point List`
- **Active Navigation**: `Transport` -> `Pickup Point` (Route: `/admin/pickuppoint`)
- **Top Right Action Button**:
  - `+ Add`: Solid purple tactile button (`#8E24AA`) with plus glyph launching stop registration modal.
- **Controls & Toolbar**:
  - `Search` text input field
  - Page size dropdown selector: `50`
  - Export Suite: `Copy`, `Excel`, `CSV`, `PDF`, `Print`
- **Master Data Table Schema (`transport_pickup_points`)**:

| Column Header | Field Name | Data Type | Rendering & Formatting Rules | Ground Truth Screen Records |
|:---|:---|:---|:---|:---|
| **Name** | `name` | `VARCHAR(255)` | Sortable pickup stop name. | `Brooklyn North`, `Brooklyn South`, `Brooklyn West`, `Brooklyn East`, `Brooklyn Central`, `Manhattan`, `Railway Station`, `High Court`, `civil Line`, `Vijay Nagar`, `Ranital Chowk`. |
| **Latitude** | `latitude` | `NUMERIC(18, 14)` | Decimal GPS coordinate. | `23.21953720694316`, `23.204761722973813`, `23.19324172686614`, `23.193952567195506`, `23.21230494959826`, `23.2066336675236`, `23.16662749489289`, `23.168615566293845`, `23.166120045559563`, `23.190170327286668`, `23.170504563243085`. |
| **Longitude** | `longitude` | `NUMERIC(18, 14)` | Decimal GPS coordinate. | `79.92068396109676`, `79.89751486729702`, `79.91536320113687`, `79.9243812546212`, `79.92914139397962`, `80.00451042401824`, `79.95054096414184`, `79.94726999887004`, `79.95531910260692`, `79.89643280559972`, `79.92385377983044`. |
| **Action** | *Controls* | `ACTIONS` | Three purple tactile buttons per row:<br>1. **Location / Map Pin** (`location_on` pin glyph)<br>2. **Edit** (`edit` pencil glyph)<br>3. **Delete** (`close` / `delete` trash glyph). | All 3 triggers rendered across every record. |

- **Pagination & Footer**: `Showing 1 to 11 of 11 entries.` with `< [ 1 ] >`.

#### B. `+ Add Pickup Point` Modal Schema
| Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Pickup Point Name \*** | `name` | `TEXT_INPUT` | Required transit stop landmark. |
| **Latitude \*** | `latitude` | `NUMERIC_INPUT` | Required decimal coordinate (-90 to +90). |
| **Longitude \*** | `longitude` | `NUMERIC_INPUT` | Required decimal coordinate (-180 to +180). |

---

### 3. Slug `routes`: Transit Line Master Taxonomy

#### A. Screen Architecture & Visual Layout (Pattern B: Split 2-Column)
- **Left Column (~35% width)**: `Create Route` Form
  - `Route Title *`: Single text input field with active purple outline (`rgba(142, 36, 170, 0.6)`).
  - `Save`: Solid purple tactile button (`#8E24AA`).
- **Right Column (~65% width)**: `Route List` Table
  - `Search` input field, page size `50`, export suite (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`).
  - Master Columns: `Route Title`, `Action` (Edit, Delete).

#### B. Ground Truth Seeded Routes
| # | Route Title | Actions Permitted |
|---|:---|:---:|
| 1 | `Brooklyn Central` | Edit, Delete |
| 2 | `Brooklyn East` | Edit, Delete |
| 3 | `Brooklyn West` | Edit, Delete |
| 4 | `Brooklyn South` | Edit, Delete |
| 5 | `Brooklyn North` | Edit, Delete |
| 6 | `Railway station` | Edit, Delete |
| 7 | `High Court` | Edit, Delete |
| 8 | `Vijay Nagar` | Edit, Delete |
| 9 | `Civil Line` | Edit, Delete |
| 10 | `Dindayal Chowk` | Edit, Delete |
| 11 | `Ranitaal` | Edit, Delete |

- **Pagination & Footer**: `Showing 1 to 11 of 11 entries.` with `< [ 1 ] >`.

---

### 4. Slug `vehicles`: Fleet Vehicle & Driver Credential Registry

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Vehicle List`
- **Active Navigation**: `Transport` -> `Vehicles` (Route: `/admin/vehicle`)
- **Top Right Action Button**:
  - `+ Add`: Solid purple tactile button (`#8E24AA`) with plus glyph launching vehicle registration modal.
- **Controls & Toolbar**:
  - `Search` text input field
  - Page size dropdown selector: `50`
  - Export Suite: `Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`
- **Master Data Table Schema (`transport_vehicles`)**:

| Column Header | Field Name | Data Type | Rendering & Rules | Ground Truth Screen Records |
|:---|:---|:---|:---|:---|
| **Vehicle Number** | `vehicle_no` | `VARCHAR(50)` | Sortable fleet registration code. | `VH4584`, `VH5645`, `VH1001`. |
| **Vehicle Model** | `vehicle_model` | `VARCHAR(100)` | Sortable vehicle make/model. | `Ford CAB`, `Volvo Bus`, `Volvo Bus`. |
| **Year Made** | `manufacture_year`| `INTEGER` | Sortable 4-digit manufacture year. | `2015`, `2018`, `2017`. |
| **Registration Number**| `registration_no` | `VARCHAR(100)` | Sortable governmental road license plate. | `FFG-76575676787`, `BGBFDF787987956`, `FVFF-08797865`. |
| **Chasis Number** | `chasis_no` | `VARCHAR(100)` | Sortable VIN / chassis serial number. | `523422`, `45433`, `45453`. |
| **Max Seating Capacity**| `seating_capacity`| `INTEGER` | Sortable passenger seating limit. | `50`, `50`, `50`. |
| **Driver Name** | `driver_name` | `VARCHAR(255)` | Sortable assigned chauffeur / operator. | `Jasper`, `Maximus`, `Michel`. |
| **Driver Licence** | `driver_licence` | `VARCHAR(100)` | Sortable official commercial driver's license. | `258714545`, `545645666776`, `R534534`. |
| **Driver Contact** | `driver_contact` | `VARCHAR(50)` | Sortable emergency telephone number. | `8521479630`, `885456456`, `8667777869`. |
| **Action** | *Controls* | `ACTIONS` | Three purple tactile buttons per row:<br>1. **View Details** (`view_headline` list glyph)<br>2. **Edit** (`edit` pencil glyph)<br>3. **Delete** (`close` / `delete` trash glyph). | All 3 triggers rendered across every vehicle. |

- **Pagination & Footer**: `Showing 1 to 3 of 3 entries.` with `< [ 1 ] >`.

---

### 5. Slug `assign-vehicle`: Vehicle-to-Route Multi-Allocation Desk

#### A. Screen Architecture & Visual Layout (Pattern B: Split 2-Column)
- **Screen Title**: `Assign Vehicle On Route` / `Vehicle Route List`
- **Active Navigation**: `Transport` -> `Assign Vehicle` (Route: `/admin/vehicle/assign`)
- **Left Column (~35% width)**: `Assign Vehicle On Route` Form Card
  - `Route *`: Single-select dropdown referencing active transport corridors (e.g. `Brooklyn Central`, `Brooklyn East`). Mandatory.
  - `Vehicle *`: Multi-select checkbox array displaying all available fleet vehicles:
    - `[ ] VH4584`
    - `[ ] VH5645`
    - `[ ] VH1001`
  - `Save`: Solid purple tactile button (`#8E24AA`).
- **Right Column (~65% width)**: `Vehicle Route List` Table Card
  - `Search` text input field, page size dropdown selector `50`, export suite (`Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`).
  - Master Columns:
    1. `Route` (Sortable transit corridor title)
    2. `Vehicle` (Comma-separated fleet vehicle numbers assigned to the route)
    3. `Action` (Two purple tactile buttons: Edit pencil, Delete cross)

#### B. Ground Truth Seeded Vehicle Route Allocations
| Route | Vehicle(s) Assigned | Actions Permitted |
|:---|:---|:---:|
| `Brooklyn Central` | `VH1001` | Edit, Delete |
| `Brooklyn East` | `VH4584, VH1001` | Edit, Delete |
| `Brooklyn West` | `VH4584, VH5645` | Edit, Delete |
| `Brooklyn South` | `VH5645` | Edit, Delete |
| `Brooklyn North` | `VH5645` | Edit, Delete |
| `High Court` | `VH4584` | Edit, Delete |
| `Ranitaal` | `VH5645` | Edit, Delete |

- **Pagination & Footer**: `Showing 1 to 7 of 7 entries.` with `< [ 1 ] >`.

---

### 6. Slug `route-pickup-point`: Waypoint Sequencing & Transit Fare Matrix

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Route Pickup Point`
- **Active Navigation**: `Transport` -> `Route Pickup Point` (Route: `/admin/route/routepickuppoint`)
- **Top Right Action Button**:
  - `+ Add`: Solid purple tactile button (`#8E24AA`) with plus glyph launching waypoint configuration modal.
- **Controls & Toolbar**:
  - `Search` text input field
  - Page size dropdown selector: `50`
  - Export Suite: `Copy`, `Excel`, `CSV`, `PDF`, `Print`, `Column visibility`
- **Master Data Table Schema**:
  1. `Route` (Sortable route title)
  2. `Pickup Point` (Ordered sequence of stops with integer prefix, e.g. `1 Brooklyn North`, `2 Brooklyn South`)
  3. `Monthly Fees ($)` (Periodic fare charge, currency decimal)
  4. `Distance (km)` (Decimal route milestone from starting terminal)
  5. `Pickup Time` (12-hour formatted departure/arrival time, e.g. `7:10 AM`)
  6. `Action` (Control strip: View Details [three lines], Edit [pencil], Delete [cross])

#### B. Ground Truth Seeded Route Waypoint Schedules
| Route | Seq & Pickup Point | Monthly Fees ($) | Distance (km) | Pickup Time | Actions |
|:---|:---|:---:|:---:|:---:|:---:|
| `Brooklyn Central` | `1 Brooklyn North` | `700.00` | `12.0` | `7:00 AM` | View, Edit, Delete |
| `Brooklyn East` | `1 Brooklyn North`<br>`2 Brooklyn South`<br>`3 Railway Station`<br>`4 Ranital Chowk`<br>`5 Manhattan` | `600.00`<br>`600.00`<br>`500.00`<br>`700.00`<br>`600.00` | `12.0`<br>`13.0`<br>`10.0`<br>`14.0`<br>`13.0` | `7:10 AM`<br>`7:20 AM`<br>`7:25 AM`<br>`7:10 PM`<br>`7:25 AM` | View, Edit, Delete |
| `High Court` | `1 High Court` | `700.00` | `14.0` | `7:15 AM` | View, Edit, Delete |
| `Vijay Nagar` | `1 Vijay Nagar` | `600.00` | `12.0` | `7:15 AM` | View, Edit, Delete |

- **Pagination & Footer**: `Showing 1 to 4 of 4 entries.` with `< [ 1 ] >`.

---

### 7. Slug `student-transport-fees`: Student Transit Billing & Ledger

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Select Criteria`
- **Active Navigation**: `Transport` -> `Student Transport Fees` (Route: `/admin/studenttransportfees`)
- **Criteria Filter Card**:
  - `Class *`: Single-select dropdown referencing academic classes (e.g. `Class 1`, `Class 2`). Mandatory, red asterisk with active purple outline.
  - `Section`: Single-select dropdown of sections (`A`, `B`, `C`, etc.). Optional.
  - `Search`: Solid purple tactile button (`#8E24AA`) with search magnifying glyph.
- **Data Table Ledger (Post-Query)**:
  - Columns: `Admission No`, `Student Name`, `Class`, `Father Name`, `Route Title`, `Pickup Point`, `Monthly Fees ($)`, `Fees Due`, `Status` (`Paid`, `Unpaid`, `Partial`), `Action` (`Collect Fees` button opening receipt settlement drawer).

---

### Database Schema Architecture (PostgreSQL DDL)

```sql
-- 1. Routes Master
CREATE TABLE transport_routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_route_title UNIQUE (branch_id, title)
);

ALTER TABLE transport_routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_transport_routes ON transport_routes
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 2. Geospatial Pickup Points
CREATE TABLE transport_pickup_points (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    latitude NUMERIC(18, 14) NOT NULL,
    longitude NUMERIC(18, 14) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE transport_pickup_points ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_transport_pickup_points ON transport_pickup_points
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 3. Vehicle Fleet
CREATE TABLE transport_vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    vehicle_no VARCHAR(50) NOT NULL,
    vehicle_model VARCHAR(100),
    manufacture_year INTEGER,
    registration_no VARCHAR(100) NOT NULL,
    chasis_no VARCHAR(100),
    seating_capacity INTEGER NOT NULL DEFAULT 50,
    driver_name VARCHAR(255) NOT NULL,
    driver_licence VARCHAR(100) NOT NULL,
    driver_contact VARCHAR(50) NOT NULL,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_vehicle_no UNIQUE (branch_id, vehicle_no)
);

ALTER TABLE transport_vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_transport_vehicles ON transport_vehicles
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 4. Route Vehicle Allocation
CREATE TABLE transport_route_vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    route_id UUID NOT NULL REFERENCES transport_routes(id) ON DELETE CASCADE,
    vehicle_id UUID NOT NULL REFERENCES transport_vehicles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_route_vehicle UNIQUE (route_id, vehicle_id)
);

ALTER TABLE transport_route_vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_transport_route_vehicles ON transport_route_vehicles
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 5. Route Pickup Points (Ordered Sequence & Fare)
CREATE TABLE transport_route_stops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    route_id UUID NOT NULL REFERENCES transport_routes(id) ON DELETE CASCADE,
    pickup_point_id UUID NOT NULL REFERENCES transport_pickup_points(id) ON DELETE RESTRICTED,
    stop_order INTEGER NOT NULL DEFAULT 1,
    distance_km NUMERIC(6, 2) NOT NULL DEFAULT 0.00,
    pickup_time TIME NOT NULL,
    monthly_fare NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_route_stop_order UNIQUE (route_id, stop_order)
);

ALTER TABLE transport_route_stops ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_transport_route_stops ON transport_route_stops
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 6. Transport Fee Master (12 Months Schedule)
CREATE TYPE fine_type_enum AS ENUM ('NONE', 'PERCENTAGE', 'FIX_AMOUNT');

CREATE TABLE transport_fee_masters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES academic_sessions(id) ON DELETE RESTRICTED,
    month_number INTEGER NOT NULL CHECK (month_number BETWEEN 1 AND 12),
    month_name VARCHAR(20) NOT NULL,
    due_date DATE NOT NULL,
    fine_type fine_type_enum NOT NULL DEFAULT 'NONE',
    fine_percentage NUMERIC(5, 2) DEFAULT 0.00,
    fine_amount NUMERIC(8, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_branch_session_month UNIQUE (branch_id, session_id, month_number)
);

ALTER TABLE transport_fee_masters ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_transport_fee_masters ON transport_fee_masters
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);
```

---

### REST API Endpoints & Request Contracts

#### 1. Add Pickup Point
- **Endpoint**: `POST /api/v1/transport/pickup-points`
- **Headers**: `X-Branch-ID: <uuid>`, `X-Correlation-ID: <uuid>`
- **Payload**:
```json
{
  "name": "Brooklyn North",
  "latitude": 23.21953720694316,
  "longitude": 79.92068396109676
}
```

#### 2. Configure 12-Month Transport Fee Schedule
- **Endpoint**: `PUT /api/v1/transport/fee-masters`
- **Payload**:
```json
{
  "sessionId": "a1b2c3d4-1111-2222-3333-444455556666",
  "copyFirstMonthForAll": true,
  "months": [
    {
      "monthNumber": 1,
      "monthName": "April",
      "dueDate": "2026-04-20",
      "fineType": "FIX_AMOUNT",
      "fineAmount": 50.00
    }
  ]
}
```

---

### Canonical Kafka Event Envelope Specification

#### Topic: `school.transport.route-allocated`
- **Partition Key**: `{branchId}#{routeId}`
- **Payload Contract**:
```json
{
  "metadata": {
    "eventId": "f1e2d3c4-8b9a-0123-4567-89abcdef0123",
    "eventType": "school.transport.route-allocated",
    "tenantId": "c4d3e2a1-0000-0000-0000-000000000001",
    "branchId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
    "timestamp": "2026-09-12T13:45:00.000Z",
    "correlationId": "c9d0e1f2-3a4b-5c6d-7e8f-9a0b1c2d3e4f",
    "version": "1.0.0"
  },
  "payload": {
    "routeId": "a1b2c3d4-7777-8888-9999-000011112222",
    "routeTitle": "Brooklyn Central",
    "vehicleId": "f1e2d3c4-1111-2222-3333-444455556666",
    "vehicleNo": "VH4584",
    "driverName": "Jasper",
    "seatingCapacity": 50
  }
}
```
