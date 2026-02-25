import { useMemo } from "react";
import { useAppStore } from "@/store/useAppStore";
import { generateCostData, activeBudgets, recentAnomalies, aggregateCostByDate } from "@/lib/mock-data";
import { KpiCard } from "@/components/ui/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DollarSign, AlertTriangle, TrendingUp, Target } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";

export function Dashboard() {
    const { dateRangeDays, selectedProvider } = useAppStore();

    // Generate mock data based on global state
    const rawData = useMemo(() => generateCostData(dateRangeDays), [dateRangeDays]);

    // Filter by provider if selected
    const filteredData = useMemo(() => {
        if (!selectedProvider) return rawData;
        return rawData.filter((d) => d.provider === selectedProvider);
    }, [rawData, selectedProvider]);

    // Aggregate for the main chart
    const aggregatedData = useMemo(() => aggregateCostByDate(filteredData), [filteredData]);

    // Calculate totals for KPI cards
    const totalCost = filteredData.reduce((acc, curr) => acc + curr.cost, 0);
    const prevPeriodCost = totalCost * 0.92; // Mock previous period is 8% lower
    const costDelta = Math.round(((totalCost - prevPeriodCost) / prevPeriodCost) * 100);

    // Top drivers (mocked aggregation by service)
    const topServices = useMemo(() => {
        const serviceMap = filteredData.reduce((acc, curr) => {
            acc[curr.service] = (acc[curr.service] || 0) + curr.cost;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(serviceMap)
            .map(([name, total]) => ({ name, total }))
            .sort((a, b) => b.total - a.total)
            .slice(0, 5);
    }, [filteredData]);

    // Format currency
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                <p className="text-muted-foreground">Monitor your cloud infrastructure spend and anomalies across teams.</p>
            </div>

            {/* KPI Row */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard
                    title="Total Spend"
                    value={formatCurrency(totalCost).replace("$", "")}
                    prefix="$"
                    delta={costDelta}
                    deltaType={costDelta > 0 ? "increase" : "decrease"}
                    icon={DollarSign}
                />
                <KpiCard
                    title="Forecast (Month End)"
                    value={formatCurrency(totalCost * 1.15).replace("$", "")}
                    prefix="$"
                    icon={TrendingUp}
                />
                <KpiCard
                    title="Budget Utilization"
                    value="82%"
                    delta={4}
                    deltaType="increase"
                    icon={Target}
                />
                <KpiCard
                    title="Active Anomalies"
                    value={recentAnomalies.filter(a => !a.acknowledged).length.toString()}
                    icon={AlertTriangle}
                    className="border-red-500/20 bg-red-500/5 dark:bg-red-500/10"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 md:grid-cols-7">

                {/* Spend Trend Chart (Spans 4 columns) */}
                <Card className="col-span-7 lg:col-span-4 border shadow-sm">
                    <CardHeader>
                        <CardTitle>Spend Trend ({dateRangeDays} Days)</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-0">
                        <div className="h-[300px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={aggregatedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '8px' }}
                                        labelStyle={{ color: '#F8FAFC' }}
                                        itemStyle={{ color: '#38BDF8', fontFamily: 'JetBrains Mono' }}
                                        // @ts-ignore Recharts generic mismatch
                                        formatter={(value: any) => [formatCurrency(value), 'Spend']}
                                    />
                                    <Area type="monotone" dataKey={selectedProvider ? selectedProvider : "total"} stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Top Cost Drivers (Spans 3 columns) */}
                <Card className="col-span-7 lg:col-span-3 border shadow-sm flex flex-col">
                    <CardHeader>
                        <CardTitle>Top Cost Drivers</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="h-[300px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={topServices} layout="vertical" margin={{ top: 0, right: 20, left: 40, bottom: 0 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={12} stroke="#888888" width={100} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '8px' }}
                                        labelStyle={{ color: '#F8FAFC' }}
                                        itemStyle={{ color: '#38BDF8', fontFamily: 'JetBrains Mono' }}
                                        // @ts-ignore Recharts generic mismatch
                                        formatter={(value: any) => [formatCurrency(value), 'Spend']}
                                    />
                                    <Bar dataKey="total" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Recent Anomalies */}
                <Card className="border shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Anomalies</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentAnomalies.map((anomaly) => (
                                <div key={anomaly.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{anomaly.service}</span>
                                            <Badge variant={anomaly.severity === "High" ? "destructive" : anomaly.severity === "Medium" ? "default" : "secondary"}>
                                                {anomaly.severity}
                                            </Badge>
                                            <Badge variant="outline" className="text-muted-foreground">{anomaly.provider}</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                                        <p className="text-xs font-mono text-muted-foreground">{anomaly.timestamp}</p>
                                    </div>
                                    <div className="font-mono font-bold text-red-500">
                                        +{formatCurrency(anomaly.amount)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Budget Status */}
                <Card className="border shadow-sm">
                    <CardHeader>
                        <CardTitle>Team Budgets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-5">
                            {activeBudgets.slice(0, 4).map((budget) => {
                                const percent = Math.min((budget.spent / budget.allocated) * 100, 100);
                                const isOver = percent >= 100;
                                const isWarning = percent >= 80 && percent < 100;

                                return (
                                    <div key={budget.id} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium">{budget.team}</span>
                                            <div className="text-sm text-muted-foreground font-mono">
                                                {formatCurrency(budget.spent)} <span className="text-muted-foreground/50">/ {formatCurrency(budget.allocated)}</span>
                                            </div>
                                        </div>
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                                            <div
                                                className={cn(
                                                    "h-full transition-all duration-500",
                                                    isOver ? "bg-red-500" : isWarning ? "bg-amber-500" : "bg-emerald-500"
                                                )}
                                                style={{ width: `${percent}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
}
