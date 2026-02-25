# Style Guide — CostPilot: FinOps & Cloud Cost Control

## Visual Identity

**Design Language:** Data-dense, technical precision with executive polish. Think Bloomberg Terminal meets Linear. Dark-mode-first with a clean light mode.

**Mood Board Keywords:** Midnight blue, electric accents, sharp grid layouts, monospace data labels, subtle gradients on charts

---

## Color Palette

### Primary Colors
| Token | Hex | Usage |
|---|---|---|
| `brand-blue` | `#2563EB` | Primary CTAs, links, active states |
| `brand-indigo` | `#4F46E5` | Gradient partner, hero accents |
| `bg-dark` | `#0F172A` | Dark mode base background |
| `bg-surface` | `#1E293B` | Dark mode card/panel background |
| `bg-light` | `#F8FAFC` | Light mode base background |

### Semantic Colors
| Token | Hex | Usage |
|---|---|---|
| `status-success` | `#10B981` | On Track budgets, positive deltas |
| `status-warning` | `#F59E0B` | Warning state budgets, approaching limit |
| `status-danger` | `#EF4444` | Over budget, high-severity anomalies |
| `status-info` | `#38BDF8` | Neutral info, low anomalies |
| `text-primary` | `#0F172A` | Light mode body text |
| `text-muted` | `#64748B` | Secondary labels, timestamps |

### Chart Colors (sequential)
```
AWS:   #FF9900 (Amazon orange)
GCP:   #4285F4 (Google blue)
Azure: #0089D6 (Microsoft blue)
Other: #8B5CF6 (violet)
```

### Gradient (hero + feature cards)
```css
background: linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #0F172A 100%);
```

---

## Typography

### Font Stack
```css
/* Headings */
font-family: 'Inter', 'SF Pro Display', system-ui, sans-serif;

/* Body */
font-family: 'Inter', system-ui, sans-serif;

/* Monospace (data labels, code, cost figures) */
font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

### Type Scale (Tailwind)
| Role | Class | Size |
|---|---|---|
| Display / Hero H1 | `text-5xl font-bold` | 48px |
| Section H2 | `text-3xl font-semibold` | 30px |
| Card H3 | `text-xl font-semibold` | 20px |
| Body | `text-sm` | 14px |
| Caption / Meta | `text-xs text-muted` | 12px |
| KPI Number | `text-4xl font-bold font-mono` | 36px — use monospace for all $$ figures |

---

## Spacing & Layout

- **Dashboard grid:** 12-column CSS Grid, 24px gutter
- **Card padding:** `p-6` (24px)
- **Section spacing:** `gap-6` between cards, `mb-10` between sections
- **Sidebar width:** 240px fixed, collapsible to 64px (icon-only)
- **Top navbar height:** 64px
- **Mobile bottom nav height:** 64px

---

## Component Styles

### Cards
```
bg-white dark:bg-slate-800
rounded-xl
border border-slate-200 dark:border-slate-700
shadow-sm hover:shadow-md transition-shadow
p-6
```

### KPI Cards (dashboard top row)
- Large monospace number in brand-blue or status color
- Delta badge (↑ / ↓) with green/red background
- Subtle background icon (ghost opacity 0.05)
- 4-column grid across the top of dashboard

### Status Badges
```
On Track:     bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30
Warning:      bg-amber-100 text-amber-700 dark:bg-amber-900/30
Over Budget:  bg-red-100 text-red-700 dark:bg-red-900/30
Anomaly High: bg-red-500 text-white (filled)
Anomaly Med:  bg-amber-400 text-white (filled)
Anomaly Low:  bg-sky-400 text-white (filled)
```

### Primary Button
```
bg-blue-600 hover:bg-blue-700
text-white font-medium text-sm
px-4 py-2 rounded-lg
transition-colors duration-150
```

### Tables
- Striped rows: `even:bg-slate-50 dark:even:bg-slate-800/50`
- Sticky header with `bg-white dark:bg-slate-900`
- Row hover: `hover:bg-blue-50 dark:hover:bg-slate-700`
- Sortable column headers with chevron icons

### Charts (Recharts recommended)
- Area charts: gradient fill from brand-blue → transparent
- Bar charts: solid `brand-blue` bars, muted grid lines (`#E2E8F0`)
- Tooltips: dark floating card with monospace numbers
- No chart borders — let data breathe
- Animate on mount (500ms ease-in)

---

## Mobile-Specific Styles

### Navigation
- Bottom tab bar (5 tabs max): Home, Budgets, Anomalies, Reports, Settings
- Active tab: filled icon + `text-blue-600` label
- Inactive: outline icon + `text-slate-400`

### Cards (mobile)
- Full-width, `mx-4`, `rounded-2xl`
- Swipeable anomaly cards (swipe-left to acknowledge)
- Collapsible budget rows with expand arrow

### Safe areas
- Top: `pt-safe` (respect dynamic island / notch)
- Bottom: `pb-safe` (respect home indicator)

---

## Landing Page Specific

### Hero Section
- Dark gradient background (`bg-dark` → `bg-indigo`)
- Large white H1, muted subtitle
- Two CTAs: "Book a Demo" (filled blue) + "See Pricing" (ghost/outline)
- Animated dashboard screenshot in a browser chrome mockup frame
- Subtle grid dot pattern overlay on hero background

### Pricing Cards
- 3 cards, middle card ("Growth") elevated with `ring-2 ring-blue-500` + "Most Popular" badge
- White background on light, `bg-slate-800` on dark
- Price in large bold number, billing period in muted text

### Trust Section
- Grayscale company logos (opacity 60%) in a horizontal scroll bar
- Security badges in a row: SOC 2, GDPR, ISO 27001 (icon + label)

---

## Iconography

- **Library:** Heroicons (outline style for nav/actions, solid for filled states)
- **Cloud provider icons:** Use colored SVG logos (AWS/GCP/Azure official mark colors)
- **Chart type icons:** Custom mini SVG line/bar/pie icons for report type selectors
- Icon size: `w-5 h-5` for inline, `w-6 h-6` for nav, `w-8 h-8` for feature cards

---

## Animation & Interaction

| Element | Animation |
|---|---|
| Page load | Stagger-in cards top-to-bottom (50ms delay each) |
| KPI numbers | Count-up animation on mount (800ms) |
| Chart data | Draw-in animation (left to right, 600ms) |
| Modals | Scale from 0.95 + fade in (150ms) |
| Sidebar collapse | Slide transition (200ms ease) |
| Alert badge | Pulse ring animation on unread count |

---

## Accessibility

- WCAG AA contrast on all text/background combinations
- Focus rings: `focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`
- All chart data available as table alternative
- ARIA labels on all icon-only buttons
- Keyboard-navigable data tables
