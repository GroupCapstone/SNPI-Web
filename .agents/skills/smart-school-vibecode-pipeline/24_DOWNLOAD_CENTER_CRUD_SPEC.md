# Module 24: Download Center CRUD Architecture & Digital Asset Management Specification
## Smart School Enterprise Platform (Super Admin Portal)

---

### Executive Overview & Architectural Scope

The **Download Center** serves as the central Digital Asset Management (DAM) and academic repository for the institution. It allows faculty, deans, and administrative officers to upload, catalog, share, and track educational resources, assignments, study materials, syllabi, exam guides, and video tutorials. It features dual-view document browsing (3-Column Card Grid vs. Data Table List), a real-time storage quota widget, time-bounded content sharing with expiration dates (`Valid Upto`), an embedded 6-column video tutorial gallery with YouTube/Vimeo/CDN streaming, and a customizable Content Type taxonomy.

- **Module Index**: `24`
- **Legacy Route Base**: `/admin/content`
- **Modern Component Root**: `/super-admin/download-center`
- **Functional Domain**: `Digital Asset Management, Courseware Distribution & Video Tutorials`
- **Database Scope**: Multi-tenant with PostgreSQL Row-Level Security (`branch_id = current_setting('app.current_branch_id')`), Super Admin bypass (`app.bypass_rls = true`).
- **High-Velocity Ingress & Media Processing**: Document and video file uploads strictly comply with Directive 02: **Synchronous-to-Asynchronous Bridge** (`POST /api/v1/download-center/contents` returns `HTTP 202 Accepted` with a `trackingId`, buffering storage indexing and anti-virus scanning to Kafka topic `school.content.uploaded`).
- **Storage Metrics**: Real-time aggregation of total document count and disk consumption displayed on the active overview panel.

---

### Complete Slug Inventory & Route Mapping

The Download Center module comprises **4 sovereign slugs**:

| # | Slug Key | Legacy Route | Modern Route | UI Pattern | Primary Entity | High-Frequency Actions |
|---|:---|:---|:---|:---|:---|:---|
| **01** | `upload-share-content` | `/admin/content/upload` | `/super-admin/download-center/upload-content` | Card Grid / List Switcher + Metric Widget | `contents` | `+ Upload`, Switch View (Grid/List), Download Asset, Delete, Batch Checkbox |
| **02** | `content-share-list` | `/admin/content/share` | `/super-admin/download-center/share-list` | Audit Ledger Table (Pattern C) | `content_shares` | View Share Details, Delete Share, Filter by Group/Class, Audit Validity |
| **03** | `video-tutorial` | `/admin/content/video-tutorial`| `/super-admin/download-center/video-tutorial` | 6-Column Video Card Grid | `content_video_tutorials` | `+ Add Video`, Search by Class/Section/Title, Play Modal, Pagination |
| **04** | `content-type` | `/admin/content/type` | `/super-admin/download-center/content-type` | Split 2-Column Master-Detail (Pattern B) | `content_types` | Create Type, Edit, Delete, Seeded Defaults (`Assignment`, `Syllabus`, etc.) |

---

### 1. Slug `upload-share-content`: Digital Asset Library & Storage Manager

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Content List`
- **Active Navigation**: `Download Center` -> `Upload/Share Content`
- **Top Actions & Controls**:
  - `Upload` button: Solid purple tactile button (`#8E24AA`) with cloud upload glyph (`cloud_upload`).
  - View Switcher: Dual toggle buttons in top-right:
    - `List View` (`view_list`)
    - `Grid View` (`grid_view` - active purple state)
  - Search Bar: Left text input field with purple search button (`search`).
- **Right Storage Quota Widget (~25% width)**:
  - Container: White card with subtle liquid border.
  - Media Illustration: Centered document icon with upward arrow enclosed in circular badge.
  - Metrics Breakdown:
    - `Total Documents`: `40`
    - `Size`: `2.93 MB`
- **Main Asset Grid (~75% width)**:
  - 3-Column fluid card grid.
  - Card Anatomy:
    - **Header**: Top-right selection checkbox (`[ ]`) for bulk delete or batch tagging.
    - **Asset Glyph / Thumbnail**:
      - Red PDF icon with downward arrow for `.pdf` documents (`School_Admission_Form_Sample_Tem...`, `Book List (1) (6).pdf`).
      - Stacked document pages glyph for generic attachments.
      - 16:9 thumbnail preview for image files (`fee-structure-(2) (3).jpg`).
    - **File Name**: Blue hyperlink triggering file preview modal.
    - **Uploader**: Staff author formatted as `Joe Black (9000)`.
    - **Timestamp**: Formatted `MM/DD/YYYY HH:MM:SS` (e.g. `07/03/2026 19:25:00`).
    - **Bottom-Right Action Buttons**:
      - Download trigger: Blue arrow icon (`download`).
      - Delete trigger: Red trash icon (`delete`).
- **Pagination Controls**: `« Previous` `1` `2` `3` `4` `Next »`.

#### B. `Upload Content` Modal Schema
| Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Content Title \*** | `title` | `TEXT_INPUT` | Required title describing the asset. |
| **Content Type \*** | `content_type_id` | `SELECT_DROPDOWN` | Foreign key referencing `content_types`. |
| **Available For \*** | `availability_scope` | `RADIO_GROUP` | `(o) All Super Admin` / `( ) Specific Roles` / `( ) Specific Class`. |
| **Upload Date \*** | `upload_date` | `DATEPICKER` | Defaults to current date. |
| **Description** | `description` | `TEXTAREA` | Optional context or instructions. |
| **Attach Document \*** | `file` | `FILE_DROPZONE` | Drag-and-drop zone. Allowed types: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG. Max: 50MB. |

---

### 2. Slug `content-share-list`: Shared Content Transmission Audit Ledger

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Content Share List`
- **Active Navigation**: `Download Center` -> `Content Share List`
- **Controls & Toolbar**:
  - `Search` text input field
  - Page size dropdown selector: `50`
  - Export Suite: `Copy`, `Excel`, `CSV`, `PDF`, `Print`

#### B. Master Data Table Schema (`content_shares`)

| Column Header | Field Name | Data Type | Rendering & Rules | Ground Truth Screen Records |
|:---|:---|:---|:---|:---|
| **Title** | `title` | `VARCHAR(255)` | Sortable document share title. | `Fees Structure`, `School Admission`, `Fees`, `Admission`, `share all`, `New CBSE Books List`, `Fess Updates Structure`, `New Books Collection`, `New Study Material Books`, `Update Fees Details`, `English Syllabus`, `Science Study Syllabus`, `Long Short Mathematics`, `Chapter 4 Fraction`. |
| **Send To** | `send_to_type` | `VARCHAR(50)` | Sortable audience target indicator (`Class` vs. `Group`). | `Class` (for rows 1 to 3), `Group` (for rows 4 to 19). |
| **Share Date** | `share_date` | `DATE` | Sortable date formatted `MM/DD/YYYY`. | `05/22/2026`, `05/04/2026`, `04/10/2026`, `04/01/2026`, `01/22/2026`, `01/02/2026`, `12/02/2025`, `11/05/2025`, `07/01/2025`, `04/01/2025`. |
| **Valid Upto** | `valid_upto` | `DATE` | Sortable expiration date formatted `MM/DD/YYYY`. Access revoked past this date. | `05/30/2026`, `05/14/2026`, `04/30/2026`, `04/16/2026`, `01/30/2026`, `01/31/2026`, `12/31/2025`, `11/30/2025`, `07/30/2025`, `04/30/2025`. |
| **Shared By** | `shared_by_name` | `VARCHAR(255)` | Sortable staff author with staff ID code. | `Joe Black (9000)`, `William Abbot (9003)`. |
| **Description** | `description` | `TEXT` | Snippet of sharing instructions or `No Description`. | `No Description`, `New CBSE Books List`, `Fees Structure`, `Fess Updates Structure`, `New Books Collection`, `English Syllabus`, `Long Short`. |
| **Action** | *Controls* | `ACTIONS` | Dual purple tactile buttons per row:<br>1. **View** (`visibility` eye icon launches sharing recipient modal)<br>2. **Delete** (`delete` trash bin icon). | Both buttons rendered on every row. |

- **Pagination & Footer**: `Showing 1 to 19 of 19 entries.` with `< [ 1 ] >`.

---

### 3. Slug `video-tutorial`: Multimedia Educational Video Library

#### A. Screen Architecture & Visual Layout
- **Screen Title**: `Video Tutorial List`
- **Active Navigation**: `Download Center` -> `Video Tutorial`
- **Top Right Action**:
  - `+ Add` button: Solid purple tactile button (`#8E24AA`) launching video modal.
- **Top Search & Criteria Filter Bar**:
  - `Class`: Dropdown selector with purple outline, placeholder `Select`.
  - `Section`: Dropdown selector, placeholder `Select`.
  - `Search By Title`: Text input field, placeholder `Search By Title`.
  - `Search` button: Purple tactile trigger (`#8E24AA`) with magnifying glass icon.
- **Video Card Grid**:
  - Dense 6-column fluid responsive video card matrix.
  - Card Elements:
    - **Video Thumbnail**: 16:9 aspect ratio image container. Renders video cover art or a neutral placeholder with image outline if missing.
    - **Video Title**: Centered label below thumbnail (Ubuntu 13px font, dark slate text).
- **Ground Truth Catalog Sample (30 Videos Codified)**:
  - Row 1: `Motivational Speech`, `ENVIRONMENTAL SCIENCE`, `Communication Skills`, `Parts of a Plants`, `The world of birds`, `Natural Disasters`
  - Row 2: `राख की रस्सी`, `Light, Sound, and Force`, `Long and Short Mathematics`, `ENGLISH Chapter-1`, `GK Quiz`, `THE WAY THE WORLD LOOKS`
  - Row 3: `Matter and its States`, `Maths Geometry`, `Time and Calendar`, `Place Values and Number Names`, `Life Of A Tree`, `Planets of Our Solar System`
  - Row 4: `Parts of the Body`, `Telling Time For Children`, `The Age Of Renaissance`, `Force and Pressure i`, `Simple Equations`, `Latitude and Longitude`
  - Row 5: `Shapes And Angles`, `India States & their Capital cities`, `सबसे अच्छा पेड़`, `Maths Magic`, `TEST 17`, `TEST 16`
- **Pagination**: Bottom-right numbered page strip: `1` `2` `Next`.

#### B. `+ Add Video` Modal Schema
| Field Label | Field Name | Input Type | Validation & Constraints |
|:---|:---|:---|:---|
| **Class \*** | `class_id` | `SELECT_DROPDOWN` | Required academic class. |
| **Section \*** | `section_id` | `SELECT_DROPDOWN` | Required section. |
| **Title \*** | `title` | `TEXT_INPUT` | Required video title. |
| **Video Link \*** | `video_url` | `TEXT_INPUT` | YouTube, Vimeo, or S3/Cloud CDN video stream URL. |
| **Description** | `description` | `TEXTAREA` | Optional lesson notes. |

---

### 4. Slug `content-type`: Content Category Master Taxonomy

#### A. Screen Architecture & Visual Layout (Pattern B: Split 2-Column)
- **Left Column (~35% width)**: `Add Content Type` Form
  - `Name *`: Single text input field with active purple outline.
  - `Description`: Multiline textarea.
  - `Save`: Solid purple tactile button (`#8E24AA`).
- **Right Column (~65% width)**: `Content Type List` Table
  - `Search` input field
  - Page size dropdown selector: `50`
  - Export Suite: `Copy`, `Excel`, `CSV`, `PDF`, `Print`
  - Master Columns: `Name`, `Description`, `Action`.
  - Action Controls: Dual purple tactile buttons per record:
    - **Edit** (`edit` pencil glyph)
    - **Delete** (`delete` trash bin glyph)

#### B. Seeded Master Records (Ground Truth)
| # | Name | Description | Actions Permitted |
|---|:---|:---|:---:|
| 1 | `March revision` | `No Description` | Edit, Delete |
| 2 | `Content Type Material` | `No Description` | Edit, Delete |
| 3 | `Exam material` | `No Description` | Edit, Delete |
| 4 | `Other Downloads` | `No Description` | Edit, Delete |
| 5 | `Study Material` | `No Description` | Edit, Delete |
| 6 | `Syllabus` | `No Description` | Edit, Delete |
| 7 | `Assignment` | `Assignment` | Edit, Delete |

- **Pagination & Footer**: `Showing 1 to 7 of 7 entries.` with `< [ 1 ] >`.

---

### Database Schema Architecture (PostgreSQL DDL)

```sql
-- 1. Content Types Taxonomy
CREATE TABLE content_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_system BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE content_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_content_types ON content_types
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 2. Digital Assets (Contents)
CREATE TYPE content_availability_enum AS ENUM ('ALL_SUPER_ADMIN', 'ROLES', 'CLASS');

CREATE TABLE contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    session_id UUID NOT NULL REFERENCES academic_sessions(id) ON DELETE RESTRICTED,
    content_type_id UUID NOT NULL REFERENCES content_types(id) ON DELETE RESTRICTED,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(512) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    availability content_availability_enum NOT NULL DEFAULT 'ALL_SUPER_ADMIN',
    uploaded_by UUID NOT NULL REFERENCES staff(id),
    upload_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE contents ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_contents ON contents
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 3. Content Sharing Log
CREATE TYPE share_target_enum AS ENUM ('CLASS', 'GROUP');

CREATE TABLE content_shares (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    content_id UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    send_to_type share_target_enum NOT NULL DEFAULT 'CLASS',
    target_class_id UUID REFERENCES classes(id),
    target_section_id UUID REFERENCES sections(id),
    target_roles JSONB, -- Array of role strings if send_to_type = 'GROUP'
    share_date DATE NOT NULL DEFAULT CURRENT_DATE,
    valid_upto DATE NOT NULL,
    description TEXT,
    shared_by UUID NOT NULL REFERENCES staff(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE content_shares ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_content_shares ON content_shares
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);

-- 4. Video Tutorials
CREATE TABLE content_video_tutorials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE RESTRICTED,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE RESTRICTED,
    title VARCHAR(255) NOT NULL,
    video_url VARCHAR(512) NOT NULL,
    thumbnail_url VARCHAR(512),
    description TEXT,
    created_by UUID NOT NULL REFERENCES staff(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE content_video_tutorials ENABLE ROW LEVEL SECURITY;
CREATE POLICY rls_content_video_tutorials ON content_video_tutorials
    FOR ALL USING (current_setting('app.bypass_rls', true)::boolean = true OR branch_id = current_setting('app.current_branch_id', true)::uuid);
```

---

### REST API Endpoints & Request Contracts

#### 1. Upload Content (Sync-to-Async HTTP 202)
- **Endpoint**: `POST /api/v1/download-center/contents`
- **Headers**: `X-Branch-ID: <uuid>`, `X-Correlation-ID: <uuid>`
- **Content-Type**: `multipart/form-data`
- **Response**: `HTTP 202 Accepted`
```json
{
  "status": "ACCEPTED",
  "trackingId": "e1f2a3b4-5678-90ab-cdef-1234567890ab",
  "message": "Content file uploaded successfully and queued for virus scanning and CDN propagation."
}
```

#### 2. Share Content
- **Endpoint**: `POST /api/v1/download-center/shares`
- **Payload**:
```json
{
  "contentId": "d1c2b3a4-0000-0000-0000-111122223333",
  "title": "Fees Structure",
  "sendToType": "CLASS",
  "targetClassId": "a1b2c3d4-1111-2222-3333-444455556666",
  "targetSectionId": "b2c3d4e5-2222-3333-4444-555566667777",
  "shareDate": "2026-05-22",
  "validUpto": "2026-05-30",
  "description": "Tuition and lab fee schedules for term 1."
}
```

#### 3. Add Video Tutorial
- **Endpoint**: `POST /api/v1/download-center/video-tutorials`
- **Payload**:
```json
{
  "classId": "a1b2c3d4-1111-2222-3333-444455556666",
  "sectionId": "b2c3d4e5-2222-3333-4444-555566667777",
  "title": "ENVIRONMENTAL SCIENCE",
  "videoUrl": "https://www.youtube.com/watch?v=sample-video-id",
  "description": "Introductory lecture on ecosystem balance."
}
```

---

### Canonical Kafka Event Envelope Specification

#### Topic: `school.content.uploaded`
- **Partition Key**: `{branchId}#{contentTypeId}`
- **Payload Contract**:
```json
{
  "metadata": {
    "eventId": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "eventType": "school.content.uploaded",
    "tenantId": "c4d3e2a1-0000-0000-0000-000000000001",
    "branchId": "7d9b7182-358b-4a5f-b5a1-77e8dfc80121",
    "timestamp": "2026-09-12T12:30:00.000Z",
    "correlationId": "d4e5f6a7-8b9c-0d1e-2f3a-4b5c6d7e8f9a",
    "version": "1.0.0"
  },
  "payload": {
    "contentId": "d1c2b3a4-0000-0000-0000-111122223333",
    "contentTypeId": "f1e2d3c4-9999-8888-7777-666655554444",
    "title": "School_Admission_Form_Sample_Template.pdf",
    "fileSizeBytes": 154820,
    "mimeType": "application/pdf",
    "uploadedBy": "9000"
  }
}
```
