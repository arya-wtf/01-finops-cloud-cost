# Knowledge Base — CostPilot: FinOps & Cloud Cost Control

## Domain Context

### What is FinOps?
FinOps (Financial Operations) is a cloud financial management practice that brings together engineering, finance, and business teams to take joint ownership of cloud spending. The core principle: everyone makes data-driven spending decisions in real time rather than discovering budget overruns at month-end.

### The Problem Space
Modern SaaS companies run multi-cloud infrastructure that generates thousands of cost events per day. Without tooling, teams face:
- **Bill shock:** Unexpected cost spikes discovered weeks after they happen
- **No accountability:** No clear owner per service or team for cloud spend
- **Wasted resources:** Idle compute, unattached storage, over-provisioned instances
- **Compliance gaps:** Inability to produce auditable cost allocation reports

### Key User Personas

**1. DevOps / Platform Engineer**
- Wants real-time anomaly detection, integration with existing alerting (PagerDuty, Slack)
- Cares about: service-level granularity, tagging hygiene, API access
- Pain: manually grepping AWS Cost Explorer is slow and error-prone

**2. VP of Engineering / CTO**
- Wants dashboard-level visibility, team cost accountability
- Cares about: burn rate, monthly forecast, team-level attribution
- Pain: finance team asks for cost breakdowns they can't quickly produce

**3. CFO / Finance Lead**
- Wants budget governance, compliance-ready reports
- Cares about: budget vs. actuals, variance analysis, audit trail
- Pain: cloud bills are opaque and constantly changing

---

## Core Concepts & Terminology

| Term | Definition |
|---|---|
| **Cloud spend** | Total cost of infrastructure services across all providers |
| **Anomaly** | A spend spike that deviates significantly from historical baseline |
| **Budget cap** | A defined spend ceiling for a team, project, or service |
| **Showback** | Reporting what each team costs without enforcing limits |
| **Chargeback** | Allocating actual costs to cost centers or teams financially |
| **Burn rate** | How fast the current monthly budget is being consumed |
| **Reserved Instances (RI)** | Pre-purchased compute capacity at a discount |
| **Savings Plans** | Flexible discount agreements with cloud providers |
| **Tag** | Metadata key-value pair attached to cloud resources for attribution |
| **Cost allocation** | Assigning cloud costs to specific teams, products, or projects |
| **Rightsizing** | Adjusting resource sizes to match actual usage requirements |
| **Idle resource** | A provisioned resource with near-zero utilization consuming spend |

---

## Dummy Data Reference

### Cloud Providers (shown in app)
- AWS (primary, ~60% of spend)
- Google Cloud Platform (GCP, ~30%)
- Microsoft Azure (~10%)

### Fictional Company Name
**CostPilot** — used in all UI labels, email addresses, and marketing copy

### Sample Monthly Spend Figures
- Total spend this month: **$124,830**
- vs. last month: **+8.2%** (↑ $9,480)
- Forecasted month-end: **$148,200**
- Budget cap: **$150,000**

### Sample Team Budget Allocations
| Team | Budget | Spent | Status |
|---|---|---|---|
| Platform Infra | $50,000 | $42,100 | On Track |
| ML/AI Services | $35,000 | $38,400 | Over Budget |
| Frontend CDN | $10,000 | $6,200 | On Track |
| Data Warehouse | $25,000 | $21,300 | Warning |
| Security Tools | $8,000 | $5,100 | On Track |
| Dev/Staging | $12,000 | $7,900 | On Track |

### Sample Anomaly Events
1. EC2 spike — us-east-1 — $4,200 above baseline — Aug 14 02:31 UTC — High
2. BigQuery export job — asia-southeast1 — $820 unexpected — Aug 15 11:05 UTC — Medium
3. Azure Blob egress — $310 untagged resource — Aug 13 — Low

### Pricing Tiers (landing page)
| Plan | Price | Included |
|---|---|---|
| Starter | $49/mo | 1 cloud account, 3 users, 30-day history |
| Growth | $199/mo | 5 cloud accounts, 15 users, 1-year history, Slack alerts |
| Enterprise | Custom | Unlimited accounts, SSO, custom reports, dedicated CSM |

---

## Competitive Landscape (for copywriting context)
Real tools in this space: CloudHealth (VMware), Apptio Cloudability, AWS Cost Explorer, Spot.io, Harness Cloud Cost Management. CostPilot is positioned as simpler and faster to set up than enterprise alternatives, cheaper than CloudHealth, and more powerful than native AWS Cost Explorer.

---

## Content & Copy Principles
- Speak to engineers first, finance second
- Lead with impact numbers ("Reduce cloud waste by 30%")
- Use technical credibility signals: mention specific services (EC2, BigQuery, Azure Blob)
- Compliance terms to use: SOC 2 Type II, GDPR, ISO 27001
- Avoid: jargon overload, generic "save money" messaging without specifics
- CTA language: "Book a Demo", "Start Free Trial", "See It Live"

---

## Integration Reference (Settings page)
| Integration | Type | Use Case |
|---|---|---|
| Slack | Alerting | Post anomaly and budget alerts to channels |
| PagerDuty | Incident | Escalate critical spend events |
| Jira | Ticketing | Auto-create tickets for anomaly investigations |
| Datadog | Observability | Correlate cost spikes with performance events |
| Terraform | IaC | Tag enforcement in infrastructure pipelines |
| AWS Organizations | Cloud | Multi-account cost aggregation |
