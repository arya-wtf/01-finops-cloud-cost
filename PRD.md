# PRD — CostPilot: FinOps & Cloud Cost Control SaaS

**Target Market:** US / EU B2B SaaS teams, DevOps/Platform engineering leads, CFOs at Series A–C startups
**Portfolio Purpose:** Dribbble/Behance showcase — frontend only, dummy data
**Tech Stack:** React + Tailwind CSS
**Regions:** North America (primary), Europe (secondary)

---

## 1. Product Overview

CostPilot is a FinOps intelligence platform that helps engineering and finance teams monitor, alert on, and optimize cloud infrastructure spend across AWS, GCP, and Azure. The product surfaces anomalies, enforces budget caps, and generates compliance-ready cost reports.

**Core Value Props:**
- Real-time cost anomaly detection with Slack/email alerts
- Budget cap enforcement per team, project, or service
- Executive-ready spend summaries with forecast curves
- Multi-cloud unified view (AWS + GCP + Azure)

---

## 2. Landing Page

**Goal:** Drive demo bookings from DevOps leads and CFOs
**Tone:** Professional, data-forward, trust-heavy
**Key Sections:**

| Section | Description |
|---|---|
| Hero | Bold headline + animated cost graph + "Book a Demo" CTA |
| Social proof bar | Logos of 6 fictional companies + "Trusted by 200+ engineering teams" |
| Feature highlights | 3-column cards: Anomaly Detection, Budget Caps, Multi-Cloud View |
| Live dashboard preview | Mockup screenshot of the app embedded in a browser frame |
| Pricing tiers | 3 cards: Starter ($49/mo), Growth ($199/mo), Enterprise (custom) |
| Security & compliance | SOC 2, GDPR, ISO 27001 badges + short trust copy |
| Testimonials | 2 quotes from fictional CTOs/VPs of Engineering |
| Footer | Navigation, links, newsletter signup |

---

## 3. Web App / Dashboard — 10 Pages

### 3.1 Overview Dashboard
- **Purpose:** At-a-glance cost health for the current month
- **Key elements:** Total spend KPI card, vs. last month delta, burn rate gauge, top 5 cost drivers bar chart, budget utilization ring charts (per team), recent anomalies feed, quick-action buttons

### 3.2 Cost Explorer
- **Purpose:** Drill-down analysis by service, region, team, or tag
- **Key elements:** Date range picker, groupBy selector (service / region / tag), stacked area chart, cost breakdown table with sortable columns, export CSV button

### 3.3 Budget Manager
- **Purpose:** Create and manage budget caps per team/project
- **Key elements:** Budget list table (name, allocated, spent, % used, status), "Create Budget" modal (name, amount, period, alert threshold, assignees), progress bar per budget row, status badges (On Track / Warning / Over Budget)

### 3.4 Anomaly Detection
- **Purpose:** Surface unusual spend spikes with root cause hints
- **Key elements:** Anomaly feed cards (service, spike amount, timestamp, severity badge), sparkline mini-charts per anomaly, filter by severity / service / date, "Acknowledge" and "Investigate" actions

### 3.5 Alerts & Notifications
- **Purpose:** Configure and review all alerts
- **Key elements:** Active alerts list (rule name, condition, channel, last triggered), "Create Alert Rule" form (metric, threshold, comparison operator, channel), alert history log table

### 3.6 Multi-Cloud Accounts
- **Purpose:** Manage connected cloud accounts
- **Key elements:** Connected accounts grid (AWS / GCP / Azure cards with status indicators), "Add Account" flow (provider selector + credentials hint), last sync timestamp, sync health badge

### 3.7 Reports
- **Purpose:** Generate and schedule cost reports
- **Key elements:** Report template gallery (Monthly Summary, Team Breakdown, Anomaly Report), schedule picker (frequency, recipients), generated reports list with download links, report preview panel

### 3.8 Team & Access Management
- **Purpose:** Manage users, roles, and team assignments
- **Key elements:** Members table (name, email, role, teams, last active), invite form, role selector (Admin / Analyst / Viewer), team assignment multi-select

### 3.9 Settings — Integrations
- **Purpose:** Connect Slack, Jira, PagerDuty, etc.
- **Key elements:** Integration cards grid (name, logo, status toggle, "Configure" button), connected webhook list, test connection button

### 3.10 Settings — Billing & Plan
- **Purpose:** Manage subscription and usage
- **Key elements:** Current plan card, usage meters (seats, data ingestion GB), next invoice preview, payment method (masked card), plan upgrade CTA

---

## 4. Mobile App — 20 Screens

| # | Screen | Description |
|---|---|---|
| 1 | Splash / Loading | Animated logo + loading bar |
| 2 | Onboarding 1 | "Connect your cloud in 60 seconds" value prop |
| 3 | Onboarding 2 | Feature highlight: anomaly alerts |
| 4 | Onboarding 3 | Feature highlight: budget caps |
| 5 | Login | Email + password, SSO button |
| 6 | Home / Summary | Monthly spend card, budget ring, top alert banner |
| 7 | Cost Trend Chart | Full-screen area chart with date toggle (7d / 30d / 90d) |
| 8 | Budget List | List of budgets with progress bars and status badges |
| 9 | Budget Detail | Single budget: allocated vs. spent breakdown, team list |
| 10 | Anomaly Feed | Scrollable list of anomaly cards with severity tags |
| 11 | Anomaly Detail | Spike chart, root cause hint, acknowledge button |
| 12 | Alerts List | Active alert rules, quick enable/disable toggles |
| 13 | Create Alert | Step-form: metric → threshold → channel → confirm |
| 14 | Multi-Cloud Overview | Cloud provider cards with spend totals |
| 15 | Account Detail | Single cloud account: service breakdown list |
| 16 | Reports List | Generated reports with download icons |
| 17 | Report Preview | PDF-style cost report viewer |
| 18 | Team Members | Avatar list with roles and quick message action |
| 19 | Notifications | Push notifications feed with read/unread states |
| 20 | Profile & Settings | Avatar, plan badge, dark mode toggle, logout |

---

## 5. Design Constraints

- All data is dummy/fictional — no real API calls
- React components with Tailwind utility classes only
- Mobile app screens sized at 390×844px (iPhone 14 viewport)
- Dashboard designed for 1440px wide desktop
- Dark mode support encouraged (toggle in settings)
