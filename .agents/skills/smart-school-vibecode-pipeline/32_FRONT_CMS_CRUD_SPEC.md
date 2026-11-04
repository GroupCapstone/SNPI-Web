# Module 32: Front CMS CRUD Architecture & Public Portal Management Specification

## 1. Domain Overview & Taxonomy

The **Front CMS** domain manages the institutional public-facing web presence, marketing portal, homepage banners, custom informational pages, multi-tier navigation menus, press news releases, interactive photo/video galleries, school events, and digital media assets. It decouples core administrative ERP data from public content presentation while maintaining institutional branding and public engagement.

```
/super-admin/front-cms or /admin/frontcms
├── /event           (Event - Public events calendar, dates, venues, event photo assets)
├── /gallery         (Gallery - Photo albums, category classifications, public URLs)
├── /news            (News - Press releases, circulars, announcements, editorial content)
├── /media-manager   (Media Manager - Centralized digital asset hub, file uploads, YouTube embed ingress)
├── /pages           (Pages - Custom CMS pages, page types, system-protected core page safeguards)
├── /menus           (Menus - Main & Bottom navigation builder, multi-tier nested hierarchy trees)
└── /banner-images   (Banner Images - Homepage carousel banner sliders, responsive media hero items)
```

---

## 2. Exhaustive Slug Specifications

### 2.1. Slug: `event` (`/super-admin/front-cms/event` or `/admin/front/event`)

- **Screen Layout Structure**:
  - Full-width interactive data table card with top-right `+ Add` modal trigger.
- **Table Controls & Data Display (Event List)**:
  - Toolbar with quick search, page length (`50`), export tools (Copy, Excel, CSV, PDF, Print, Columns).
  - **Columns**:
    1. `Title` (String, sortable, e.g. `Math Exhibition Model`, `Science Exhibition`)
    2. `Date` (Date range string, sortable, e.g. `03/16/2026 - 03/20/2026`, `02/13/2026`)
    3. `Venue` (Location text, sortable, e.g. `school hall`, `school campus`, `Class Room`, `School Ground`)
    4. `Action` (Control strip: Edit icon button, Delete icon button)
  - **Ground Truth Seeded Records (19 Entries)**:
    - `Math Exhibition Model` | `03/16/2026 - 03/20/2026` | `school hall` | Edit, Delete
    - `Science Exhibition` | `03/05/2026 - 03/08/2026` | `school campus` | Edit, Delete
    - `Annual Cultural Program` | `03/06/2026 - 03/09/2026` | `school` | Edit, Delete
    - `World Radio Day` | `02/13/2026` | `Class Room` | Edit, Delete
    - `Republic Day Celebration` | `01/03/2026 - 01/26/2026` | `School Ground` | Edit, Delete
    - `Math Exhibition Model` | `12/01/2025 - 12/16/2025` | `School Hall Room` | Edit, Delete
    - `National Mathematics Day Celebration` | `12/20/2025 - 12/24/2025` | `School Hall Room` | Edit, Delete
    - `Children's day program by teachers` | `11/01/2025 - 11/20/2025` | `School hall Room` | Edit, Delete
    - `School Spirit Rally` | `10/15/2025 - 10/25/2025` | `School Ground` | Edit, Delete
    - `School Year Preparation Workshops` | `10/03/2025 - 10/15/2025` | `School Hall Room` | Edit, Delete
    - `Teachers' Day Celebration` | `09/01/2025 - 09/05/2025` | `School Hall Room` | Edit, Delete
    - `Happy Independence Day Celebration` | `08/05/2025 - 08/15/2025` | `School Ground` | Edit, Delete
    - `English Recitation Competition` | `08/01/2025 - 08/20/2025` | `School Hall Room` | Edit, Delete
    - `National Level Workshop for Science Teachers Teaching in Class X to XII (Online)` | `07/07/2025 - 07/15/2025` | `School Hall Room` | Edit, Delete
    - `Conducting of NCSC 2025-26-School Level` | `06/02/2025 - 06/30/2025` | `School Play Ground` | Edit, Delete
    - `Summer School Programme` | `05/01/2025 - 05/30/2025` | `School Hall Room` | Edit, Delete
    - `Books Mela` | `04/04/2025 - 04/30/2025` | `School Play Ground` | Edit, Delete
    - `Building Leadership Skills camp` | `04/02/2025 - 04/30/2025` | `School Hall Room` | Edit, Delete
    - `Summer Learning: Activities` | `04/01/2025 - 04/30/2025` | `School Hall Room` | Edit, Delete
  - **Pagination & Counter**: `Showing 1 to 19 of 19 entries`, page button `< 1 >`.
- **Creation Modal Controls (`+ Add`)**:
  - `Title *`: Text input.
  - `Venue`: Location text input.
  - `Start Date *` & `End Date *`: Date picker controls.
  - `Description`: Rich text WYSIWYG editor.
  - `Featured Image`: Asset upload zone.
  - `Save` Button: Submits event to public portal.

---

### 2.2. Slug: `gallery` (`/super-admin/front-cms/gallery` or `/admin/front/gallery`)

- **Screen Layout Structure**:
  - Full-width table card with top-right `+ Add` modal trigger.
- **Table Controls & Data Display (Gallery List)**:
  - Toolbar with Search, Page size (50), Export tools.
  - **Columns**:
    1. `Title` (String, sortable, e.g. `Sports Events`, `Facilities`)
    2. `URL` (Clickable public route string, e.g. `https://demo.smart-school.in/read/gallery`)
    3. `Action` (Edit, Delete)
  - **Ground Truth Seeded Records (12 Entries)**:
    - `gallery` | `https://demo.smart-school.in/read/gallery`
    - `exhibition` | `https://demo.smart-school.in/read/exhibition`
    - `Sports Events` | `https://demo.smart-school.in/read/sports-events-1`
    - `bhajan sandhya good` | `https://demo.smart-school.in/read/bhajan-sandhya-good`
    - `Sports` | `https://demo.smart-school.in/read/sports`
    - `Art` | `https://demo.smart-school.in/read/art`
    - `Recreation Centre` | `https://demo.smart-school.in/read/recreation-centre`
    - `Facilities` | `https://demo.smart-school.in/read/facilities`
    - `Celebration` | `https://demo.smart-school.in/read/celebration`
    - `Pre Primary` | `https://demo.smart-school.in/read/pre-primary`
    - `Activities` | `https://demo.smart-school.in/read/activities`
    - `Campus` | `https://demo.smart-school.in/read/campus`
  - **Pagination & Counter**: `Showing 1 to 12 of 12 entries`, page button `< 1 >`.

---

### 2.3. Slug: `news` (`/super-admin/front-cms/news` or `/admin/front/notice`)

- **Screen Layout Structure**:
  - Full-width table card with top-right `+ Add` modal trigger.
- **Table Controls & Data Display (News List)**:
  - Toolbar with Search, Page size (50), Export tools.
  - **Columns**:
    1. `Title` (String, sortable)
    2. `URL` (Public news route string)
    3. `Action` (Edit, Delete)
  - **Ground Truth Seeded Records (21 Entries)**:
    - `National Level Workshop for Science Teachers Teaching in Class X to XII (Online)`
    - `New Books Added to Library`
    - `Unit Test Schedule Released`
    - `The Junior Red Cross`
    - `Parents and Guardians Teacher's Meeting`
    - `Winter Term-end Exams Start`
    - `The Opening Ceremony of Computer Science Month`
    - `Children's Day Program by teachers`
    - `Webinar for the Students of Class IX to XII on Career information.`
    - `Diwali Celebration Notice`
    - `Teachers' Day Celebration`
    - `Sports Quiz competition`
    - `Inter-House patriotic song competition`
    - `Admissions for the current academic year 2025-26 are now open.`
    - `World Environment Day program`
    - `School Vacation Notice`
    - `Books Mela`
    - `New Academic Session Admission Start (2025-26)!!!!!!!!`
    - `Date sheet Final Exam Nursery to Sr.Kg`
    - `Board Exams Preparation`
  - **Pagination & Counter**: `Showing 1 to 21 of 21 entries`, page button `< 1 >`.

---

### 2.4. Slug: `media-manager` (`/super-admin/front-cms/media-manager` or `/admin/front/media`)

- **Screen Layout Structure**:
  - **Top Card: Dual Ingress Hub**:
    - **Left Ingress**: `Upload Your File` (Drag and drop a file here or click - PNG, JPG, PDF, SVG).
    - **Separator**: `— or —`.
    - **Right Ingress**: `Upload Youtube Video Link *` (URL input box).
    - **Action Button**: `Submit` (Purple button).
  - **Middle Toolbar**:
    - `Search By File Name`: Text input (`Enter Keyword...`).
    - `Filter By File Type`: Dropdown (`All`, `Images`, `Videos`, `Documents`).
  - **Bottom Gallery Grid**:
    - Responsive 6-column fluid image/video gallery card matrix.
    - Each media asset card displays:
      - High-resolution visual thumbnail (16:9 or 4:3 aspect ratio).
      - File name label (e.g. `tv.jpg`, `1763790460.jpg`, `ready-set-school_lm.jpg`, `34.png`, `tg.png`, `M_Admission-side-banner.png`, `download.png`, `Celebrations-Ideas.jpeg`).
      - Media type icon indicator badge in top-right corner (Photo Frame glyph for image files, Play Triangle glyph for video files).
      - Hover control overlay: Copy URL, View full size, Delete asset.

---

### 2.5. Slug: `pages` (`/super-admin/front-cms/pages` or `/admin/front/page`)

- **Screen Layout Structure**:
  - Full-width table card with top-right `+ Add` modal trigger for custom page creation.
- **Table Controls & Data Display (Page List)**:
  - Toolbar with Search, Page size (50), Export tools.
  - **Columns**:
    1. `Title` (String, sortable, e.g. `Home`, `About Us`, `Gallery`)
    2. `URL` (Public route, e.g. `https://demo.smart-school.in/page/home`)
    3. `Page Type` (Visual badge: gray `Standard`, green `Gallery`, cyan `Event`)
    4. `Action` (Control strip: Edit pencil, Delete cross)
  - **Architectural Security Directives (System Protected Pages)**:
    - Core system foundational pages (`Home`, `Complain`, `404 page`, `Contact us`) have their `Delete` button strictly suppressed to prevent portal routing breakdown. Only the `Edit` pencil is rendered.
    - Custom institutional CMS pages (`About Us`, `Course`, `School Uniform`, `Facilities`, etc.) render both `Edit` and `Delete` actions.
  - **Ground Truth Seeded Records (22 Entries)**:
    - `Home` | `/page/home` | `Standard` | Edit only
    - `Complain` | `/page/complain` | `Standard` | Edit only
    - `404 page` | `/page/404-page` | `Standard` | Edit only
    - `Contact us` | `/page/contact-us` | `Standard` | Edit only
    - `Complain` | `/page/complain-1` | `Standard` | Edit, Delete
    - `About Us` | `/page/about-us` | `Standard` | Edit, Delete
    - `Course` | `/page/course` | `Standard` | Edit, Delete
    - `School Uniform` | `/page/school-uniform` | `Standard` | Edit, Delete
    - `Gallery` | `/page/gallery` | `Gallery` | Edit, Delete
    - `News` | `/page/news` | `Standard` | Edit, Delete
    - `Events` | `/page/events` | `Event` | Edit, Delete
    - `Teacher` | `/page/teacher` | `Standard` | Edit, Delete
    - `Introduction` | `/page/introduction` | `Standard` | Edit, Delete
    - `School History` | `/page/school-history` | `Standard` | Edit, Delete
    - `Facilities` | `/page/facilities` | `Standard` | Edit, Delete
    - `Principal Message` | `/page/principal-message` | `Standard` | Edit, Delete
    - `School Management` | `/page/school-management` | `Standard` | Edit, Delete
    - `Know Us` | `/page/know-us` | `Standard` | Edit, Delete
    - `Approach` | `/page/approach` | `Standard` | Edit, Delete
    - `Pre Primary` | `/page/pre-primary` | `Standard` | Edit, Delete
    - `Primary` | `/page/primary` | `Standard` | Edit, Delete
    - `Sports` | `/page/sports` | `Standard` | Edit, Delete
  - **Pagination & Counter**: `Showing 1 to 22 of 22 entries`, page button `< 1 >`.

---

### 2.6. Slug: `menus` (`/super-admin/front-cms/menus` or `/admin/front/menus`)

- **Screen Layout Structure**:
  - **Split 2-Column Responsive Layout**:
    - **Left Column (35% width)**: "Add Menu Item" Form Card.
    - **Right Column (65% width)**: "Menu Item List" Nested Sortable Hierarchy Tree Card.
- **Top Tab Switcher (Right Card Header)**:
  - `Main Menu` (Solid purple button, active).
  - `Bottom Menu` (Outlined purple button, secondary footer menu).
- **Form Controls & Constraints (Add Menu Item)**:
  - `Menu Item *`: Text input for navigation label. Mandatory.
  - `External URL`: Toggle switch (`OFF` / `ON`).
  - `Open In New Tab`: Toggle switch (`OFF` / `ON`).
  - `External URL Address`: Text input (visible/active when External URL toggle is ON).
  - `Pages`: Single-select dropdown referencing active CMS pages (disabled when External URL is ON).
  - `Save` Button: Solid primary button.
- **Tree Controls & Data Display (Menu Item List)**:
  - **Nested Hierarchical Drag-and-Drop Tree Structure**:
    - Level 1 Root Nodes:
      - `HOME` (Edit, Delete)
      - `ONLINE COURSE` (Edit, Delete)
      - `ONLINE ADMISSION` (Edit, Delete)
      - `CBSE EXAM RESULT` (Edit, Delete)
      - `EXAM RESULT` (Edit, Delete)
      - `ANNUAL CALENDAR` (Edit, Delete)
      - `ABOUT US` (Edit, Delete)
      - `ACADEMICS` (Parent Node with 13 nested Level 2 children):
        - `FACILITIES`
        - `ANNUAL SPORTS DAY`
        - `COURSE`
        - `SCHOOL UNIFORM`
        - `PRINCIPAL MESSAGE`
        - `SCHOOL MANAGEMENT`
        - `KNOW US`
        - `APPROACH`
        - `PRE PRIMARY`
        - `TEACHER`
        - `HOUSES & MENTORING`
        - `STUDENT COUNCIL`
        - `CAREER COUNSELLING`
      - `GALLERY` (Edit, Delete)
      - `EVENTS` (Edit, Delete)
      - `NEWS` (Edit, Delete)
      - `CONTACT` (Edit, Delete)
    - Every node features visual drag handle icons and direct Edit/Delete control buttons.

---

### 2.7. Slug: `banner-images` (`/super-admin/front-cms/banner-images` or `/admin/front/banner`)

- **Screen Layout Structure**:
  - Full-width card with top-right `+ Add Images` modal trigger.
- **Visual Banner Management Carousel**:
  - Horizontal card grid of active homepage banner sliders.
  - Ground truth active banner assets:
    - `-4banner1.jpg`
    - `-4banner4.jpg`
    - `op-banner2-2.jpg`
    - `-4banner3-3.jpg`
    - `DCC Sports Day (3).jfif`
    - `tcp-banner2-2.jpg`
  - Each banner card provides an image preview, file name label, drag-and-drop sort ordering, and 1-click delete action.

---

## 3. Database Schema Blueprint (PostgreSQL DDL)

```sql
-- Front CMS Pages Master Table
CREATE TABLE front_cms_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL,
    url VARCHAR(255) NOT NULL,
    page_type VARCHAR(50) NOT NULL DEFAULT 'Standard' CHECK (page_type IN ('Standard', 'Gallery', 'Event')),
    content TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    is_system_page BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_page_slug_branch UNIQUE (branch_id, slug)
);

-- Front CMS Navigation Menus
CREATE TABLE front_cms_menus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    menu_type VARCHAR(50) NOT NULL DEFAULT 'MAIN' CHECK (menu_type IN ('MAIN', 'BOTTOM')),
    title VARCHAR(100) NOT NULL,
    page_id UUID REFERENCES front_cms_pages(id) ON DELETE SET NULL,
    external_url VARCHAR(255),
    is_external BOOLEAN DEFAULT FALSE,
    open_in_new_tab BOOLEAN DEFAULT FALSE,
    parent_id UUID REFERENCES front_cms_menus(id) ON DELETE CASCADE,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Front CMS Events & News Table
CREATE TABLE front_cms_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    post_type VARCHAR(50) NOT NULL CHECK (post_type IN ('EVENT', 'NEWS', 'GALLERY')),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    venue VARCHAR(150),
    start_date DATE,
    end_date DATE,
    description TEXT,
    featured_image_url TEXT,
    gallery_images JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_post_slug_branch UNIQUE (branch_id, post_type, slug)
);

-- Front CMS Media Asset Repository
CREATE TABLE front_cms_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch_id UUID NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    media_type VARCHAR(50) NOT NULL CHECK (media_type IN ('IMAGE', 'VIDEO', 'DOCUMENT')),
    file_path TEXT NOT NULL,
    file_size_bytes BIGINT,
    youtube_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. REST API Endpoint Specifications

| Method | Endpoint | Description | Payload / Params | Response |
|---|---|---|---|---|
| `GET` | `/api/v1/front-cms/pages` | List CMS pages | `?branchId=uuid` | `200 OK` (Array of Pages) |
| `POST` | `/api/v1/front-cms/pages` | Create custom page | `{ title, slug, pageType, content... }` | `201 Created` |
| `GET` | `/api/v1/front-cms/menus` | Get navigation tree | `?branchId=uuid&menuType=MAIN|BOTTOM` | `200 OK` (Hierarchical Tree) |
| `POST` | `/api/v1/front-cms/menus/reorder`| Save drag-and-drop hierarchy | `{ items: [{ id, parentId, displayOrder }] }`| `200 OK` |
| `GET` | `/api/v1/front-cms/events` | List events | `?branchId=uuid` | `200 OK` (Array of Events) |
| `POST` | `/api/v1/front-cms/events` | Create new event | `{ title, venue, startDate, endDate, description }` | `201 Created` |
| `GET` | `/api/v1/front-cms/media` | Browse media repository | `?branchId=uuid&search=str&type=IMAGE` | `200 OK` (Media Grid) |
| `POST` | `/api/v1/front-cms/media/upload`| Upload file or embed YouTube | `multipart/form-data` or `{ youtubeUrl }` | `201 Created` |

---

## 5. Event Envelope & Telemetry Architecture (Kafka)

Whenever public content or portal layout is modified, the system dispatches an audit envelope to `school.frontcms.events`:

```json
{
  "eventId": "f7841c29-382a-4311-897d-d4013ba0c082",
  "eventType": "school.frontcms.page-updated",
  "aggregateId": "page-uuid-9921-aa01",
  "timestamp": "2026-09-12T03:36:00Z",
  "branchId": "branch-main-001",
  "actor": {
    "userId": "user-super-admin-01",
    "role": "SUPER_ADMIN"
  },
  "payload": {
    "pageId": "page-about-us",
    "title": "About Us",
    "slug": "about-us",
    "isSystemPage": false,
    "action": "CONTENT_UPDATED"
  }
}
```
