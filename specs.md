# Technical & Design Specifications — CostPilot Web App

This document outlines the refined technical and design specifications for the CostPilot Web App, optimizing for a high-fidelity "Bloomberg Terminal meets Linear" prototype suitable for a premium Dribbble/Behance portfolio showcase.

## 1. Core Tech Stack
To avoid reinventing the wheel and achieve agency-grade polish quickly:
- **Framework:** React (Vite or Next.js App Router for optimal routing/layout structure)
- **Styling:** Tailwind CSS
- **Component Library:** `shadcn/ui` (accessible, customizable, unstyled components that perfectly match the "Linear" aesthetic out-of-the-box).
- **Charts:** Tremor (built on tailwind/recharts, specifically designed for dashboards/metrics) or Visx (for highly custom, interactive data visualization). *Tremor is highly recommended for financial data density.*
- **Icons:** Lucide React (pairs natively with shadcn/ui, clean outline style).
- **State/Data:** Zustand (for lightweight global state, e.g., Date Range selections) + an internal mock data generator to ensure charts react to user inputs.

## 2. Scope & Implementation Priorities
To ensure maximum quality, we will focus on **fidelity over volume**. We will build out the 4 highest-impact "Hero" screens first, which tell the complete FinOps story.

**Phase 1 Core Routes:**
1. **`/dashboard` (Overview):** The executive view. Burn rate, top anomalies, and high-level KPIs.
2. **`/explorer` (Cost Explorer):** The engineer's view. Deep-dive stacked area charts, multi-level filtering (Service > Region > Tag), data-grid table.
3. **`/anomalies` (Anomaly Feed):** The operational view. Feed of specific cost spikes, severity tags, and sparkline charts.
4. **`/budgets` (Budget Caps):** The finance view. Progress bars, utilization rings, and "Create Budget" modal flow.

*Remaining pages (Settings, Teams, Reports) will be stubbed or visually mocked if necessary, but interaction will focus on the top 4.*

## 3. Design System & Aesthetics
**Theme:** "Bloomberg Terminal meets Linear"
- **Mode:** Dark Mode First (`bg-slate-950` base, `bg-slate-900` surfaces). Light mode supported via standard shadcn theming.
- **Typography:**
  - UI/Nav: `Inter`
  - Financial Data / Monospace: `JetBrains Mono` or `Geist Mono` (crucial for tabular lining on prices).
- **Colors:**
  - Primary: Brand Blue (`#2563EB`)
  - Semantic: Green/Success (`#10B981`), Red/Danger (`#EF4444`), Amber/Warning (`#F59E0B`).
  - Chart series: Differentiated but harmonious palette avoiding overwhelming primary colors (e.g., using Tailwind's indigo, violet, blue, sky).
- **Interactions:**
  - Rely on `shadcn/ui` primitives for flawless keyboard navigation, focus rings, and dropdown animations.
  - Command Palette (`⌘K`) for jumping between cloud accounts or searching for specific AWS/GCP services.
  - Subtle hover states on table rows and chart data points.

## 4. Dynamic Mock Data Strategy
To make the portfolio piece feel "alive", we will implement a client-side mock data engine.
- Generate realistic, seeded random data (so the charts look the same on every load, but look organic).
- When a user changes the global date picker (e.g., `Last 7 Days` to `Last 30 Days`), the data engine recalculates and triggers a smooth re-render/animation in the charts.
- **Mock Entities needed:** Cloud Accounts (AWS, GCP), Services (EC2, BigQuery), Teams (Platform, Frontend), and time-series cost arrays.

## 5. UI Component Architecture (shadcn/ui mapping)
- **Layout:** Standard sidebar navigation (`app-shell` pattern).
- **KPI Cards:** Built using `Card` primitive.
- **Data Tables:** `DataTable` (TanStack Table integrated with shadcn) for sortable, filterable cost breakdowns.
- **Modals:** `Dialog` for "Create Budget" and "Acknowledge Anomaly".
- **Filtering:** `Select`, `Popover`, `Command` (for multi-select tags/services), and `Calendar`/`DatePicker`.

## 6. Next Steps for Development
1. Initialize project with React/Vite/Next.js and Tailwind.
2. Setup `shadcn/ui` and configure the custom dark theme (colors, fonts).
3. Build the App Shell (Sidebar, Header, Date Range Picker).
4. Implement the Mock Data Engine.
5. Build the 4 core views sequentially.
