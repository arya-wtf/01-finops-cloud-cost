import { format, subDays } from "date-fns";

export type CloudProvider = "AWS" | "GCP" | "Azure";
export type Service = "EC2" | "RDS" | "S3" | "BigQuery" | "Cloud Storage" | "Compute Engine" | "Blob Storage" | "Virtual Machines";
export type Team = "Platform Infra" | "ML/AI Services" | "Frontend CDN" | "Data Warehouse" | "Security Tools" | "Dev/Staging";
export type Severity = "High" | "Medium" | "Low";

export interface CostDataPoint {
    date: string;
    provider: CloudProvider;
    service: Service;
    team: Team;
    cost: number;
}

export interface Budget {
    id: string;
    team: Team;
    allocated: number;
    spent: number;
    status: "On Track" | "Warning" | "Over Budget";
}

export interface Anomaly {
    id: string;
    service: Service;
    provider: CloudProvider;
    amount: number;
    timestamp: string;
    severity: Severity;
    description: string;
    acknowledged: boolean;
}

export type ReportType = "Cost Allocation" | "Optimization Audit" | "Compliance" | "Forecasting";

export interface Report {
    id: string;
    title: string;
    type: ReportType;
    dateGenerated: string;
    schedule: "Daily" | "Weekly" | "Monthly" | "Ad-hoc";
    format: "PDF" | "CSV" | "XLSX";
    author: string;
    miniChartData: number[];
}

// Ensure stable random data generation for the charts
const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

export function generateCostData(days: number = 30): CostDataPoint[] {
    const data: CostDataPoint[] = [];
    const today = new Date();

    // Baseline daily costs per service roughly mapping to proportions
    const baselines = {
        AWS: {
            EC2: 1500,
            RDS: 800,
            S3: 300,
        },
        GCP: {
            BigQuery: 600,
            "Compute Engine": 400,
            "Cloud Storage": 200,
        },
        Azure: {
            "Virtual Machines": 250,
            "Blob Storage": 150,
        },
    };

    const teams: Team[] = [
        "Platform Infra",
        "ML/AI Services",
        "Frontend CDN",
        "Data Warehouse",
        "Security Tools",
        "Dev/Staging",
    ];

    let seed = 42;

    for (let i = days; i >= 0; i--) {
        const currentDate = subDays(today, i);
        const dateStr = format(currentDate, "MMM dd");

        // Add some weekly seasonality (lower on weekends)
        const dayOfWeek = currentDate.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const seasonalityMultiplier = isWeekend ? 0.7 : 1.1;

        Object.entries(baselines).forEach(([provider, services]) => {
            Object.entries(services).forEach(([service, baseCost]) => {
                // Assign roughly to a team based on service
                const team = teams[Math.floor(seededRandom(seed++) * teams.length)];

                // Add random variance (+/- 15%)
                const variance = 0.85 + seededRandom(seed++) * 0.3;

                // Add an artificial upward trend over time (growth)
                const trend = 1 + ((days - i) / days) * 0.1;

                let finalCost = baseCost * seasonalityMultiplier * variance * trend;

                // Inject some intentional spikes for realism
                if (service === "EC2" && i === 12) finalCost *= 1.8; // AWS Spike
                if (service === "BigQuery" && i === 5) finalCost *= 1.5; // GCP Spike

                data.push({
                    date: dateStr,
                    provider: provider as CloudProvider,
                    service: service as Service,
                    team,
                    cost: Math.round(finalCost),
                });
            });
        });
    }

    return data;
}

export const activeBudgets: Budget[] = [
    { id: "b1", team: "Platform Infra", allocated: 50000, spent: 42100, status: "On Track" },
    { id: "b2", team: "ML/AI Services", allocated: 35000, spent: 38400, status: "Over Budget" },
    { id: "b3", team: "Frontend CDN", allocated: 10000, spent: 6200, status: "On Track" },
    { id: "b4", team: "Data Warehouse", allocated: 25000, spent: 21300, status: "Warning" },
    { id: "b5", team: "Security Tools", allocated: 8000, spent: 5100, status: "On Track" },
    { id: "b6", team: "Dev/Staging", allocated: 12000, spent: 7900, status: "On Track" },
];

export const recentAnomalies: Anomaly[] = [
    {
        id: "a1",
        service: "EC2",
        provider: "AWS",
        amount: 4200,
        timestamp: "Aug 14, 02:31 UTC",
        severity: "High",
        description: "Unexpected i3.8xlarge instance scaling in us-east-1",
        acknowledged: false,
    },
    {
        id: "a4",
        service: "RDS",
        provider: "AWS",
        amount: 1850,
        timestamp: "Aug 16, 08:45 UTC",
        severity: "High",
        description: "Aurora Serverless v2 ACU spike due to unoptimized queries",
        acknowledged: false,
    },
    {
        id: "a2",
        service: "BigQuery",
        provider: "GCP",
        amount: 820,
        timestamp: "Aug 15, 11:05 UTC",
        severity: "Medium",
        description: "Unoptimized table scan query exceeding 10TB limit",
        acknowledged: false,
    },
    {
        id: "a5",
        service: "Cloud Storage",
        provider: "GCP",
        amount: 450,
        timestamp: "Aug 16, 14:20 UTC",
        severity: "Medium",
        description: "Unusually high cross-region data transfer egress",
        acknowledged: false,
    },
    {
        id: "a6",
        service: "Virtual Machines",
        provider: "Azure",
        amount: 620,
        timestamp: "Aug 17, 04:15 UTC",
        severity: "Medium",
        description: "Zombie VMs running during non-business hours",
        acknowledged: false,
    },
    {
        id: "a3",
        service: "Blob Storage",
        provider: "Azure",
        amount: 310,
        timestamp: "Aug 13, 09:12 UTC",
        severity: "Low",
        description: "Untagged egress traffic spike",
        acknowledged: true,
    },
    {
        id: "a7",
        service: "S3",
        provider: "AWS",
        amount: 120,
        timestamp: "Aug 12, 18:30 UTC",
        severity: "Low",
        description: "Increase in standard tier storage (consider standard-IA)",
        acknowledged: true,
    }
];

// Helper to aggregate costs for high-level charts
export function aggregateCostByDate(data: CostDataPoint[]) {
    const aggregated = data.reduce((acc, curr) => {
        if (!acc[curr.date]) {
            acc[curr.date] = { date: curr.date, total: 0, AWS: 0, GCP: 0, Azure: 0 };
        }
        acc[curr.date].total += curr.cost;
        acc[curr.date][curr.provider] += curr.cost;
        return acc;
    }, {} as Record<string, any>);

    return Object.values(aggregated);
}

export const savedReports: Report[] = [
    {
        id: "r1",
        title: "Q3 Global Infrastructure Spend",
        type: "Cost Allocation",
        dateGenerated: "Aug 15, 2024",
        schedule: "Monthly",
        format: "PDF",
        author: "System",
        miniChartData: [45, 52, 48, 61, 59, 72, 68]
    },
    {
        id: "r2",
        title: "Idle Resource Candidates",
        type: "Optimization Audit",
        dateGenerated: "Aug 14, 2024",
        schedule: "Weekly",
        format: "CSV",
        author: "Elena R.",
        miniChartData: [85, 82, 78, 65, 50, 42, 38] // Trending down is good here
    },
    {
        id: "r3",
        title: "SOC2 Cost Compliance",
        type: "Compliance",
        dateGenerated: "Aug 01, 2024",
        schedule: "Monthly",
        format: "PDF",
        author: "Security Team",
        miniChartData: [10, 10, 12, 10, 10, 10, 15]
    },
    {
        id: "r4",
        title: "E-Commerce Holiday Forecast",
        type: "Forecasting",
        dateGenerated: "Aug 10, 2024",
        schedule: "Ad-hoc",
        format: "XLSX",
        author: "David K.",
        miniChartData: [100, 120, 150, 180, 250, 310, 450]
    },
    {
        id: "r5",
        title: "Data Warehouse Usage (GCP)",
        type: "Cost Allocation",
        dateGenerated: "Aug 16, 2024",
        schedule: "Weekly",
        format: "PDF",
        author: "Data Eng",
        miniChartData: [20, 25, 30, 28, 35, 40, 42]
    }
];
