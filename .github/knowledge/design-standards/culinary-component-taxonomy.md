---
Last updated: 2026-11-03
Domain: design-standards
Version: 1.0
Reviewed by: Design Systems Committee
---

# 6-Tier Culinary Component Taxonomy

## 1. Architectural Hierarchy

The platform classifies all UI constructs into a strict 6-tier culinary taxonomy:

|    Tier    | Culinary Role   | Scope & Description                                                          | Concrete Examples                                       |
| :--------: | :-------------- | :--------------------------------------------------------------------------- | :------------------------------------------------------ |
| **Tier 1** | **Ingredients** | Design tokens, atomic color hex values, spacing units, and raw CSS variables | `--color-primary`, `--radius-sm`, 4px grid tokens       |
| **Tier 2** | **Recipes**     | Atomic UI elements (Buttons, Chips, Badges, Switches, Avatars)               | `<Button>`, `<Chip>`, `<Badge>`, `<Switch>`             |
| **Tier 3** | **Entrees**     | Molecular UI components (Data Tables, Dialogs, Dropdowns, Cards, Toasts)     | `<DataTable>`, `<Dialog>`, `<Dropdown>`, `<Card>`       |
| **Tier 4** | **Templates**   | Organism scaffolding (Nav Bars, Sidebars, App Shells, Grid layouts)          | `<AppSidebar>`, `<DocsStickyHeader>`, `<ModalShell>`    |
| **Tier 5** | **Pages**       | Composite screen views with stateful data loaders and API query hooks        | `StudentListPage`, `AttendanceMatrixView`, `Dashboard`  |
| **Tier 6** | **Cookbook**    | Global design system manual, component registry, and interactive guides      | `/document/design`, `UiLibraryView`, Component Showcase |

## 2. Downward-Only Import Invariant

- **Rule**: A component at Tier `N` may ONLY import and depend upon components from Tiers `< N`.
- **Prohibition**: Circular dependencies or upward imports (e.g., an Ingredient importing a Recipe, or an Entree importing a Page) are strictly forbidden.
