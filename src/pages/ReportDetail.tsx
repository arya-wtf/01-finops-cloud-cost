import { useParams, useNavigate } from "react-router-dom";
import { savedReports } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Share2, Printer, Calendar, Clock, User, FileText } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export function ReportDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const report = savedReports.find(r => r.id === id);

    if (!report) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-4">
                <h2 className="text-2xl font-bold">Report Not Found</h2>
                <p className="text-muted-foreground">The report you are looking for does not exist.</p>
                <Button variant="outline" onClick={() => navigate("/reports")}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Reports
                </Button>
            </div>
        );
    }

    // Generate richer mock data for the full view based on the mini chart data
    const fullChartData = report.miniChartData.map((val, i) => ({
        date: `Day ${i + 1}`,
        value: val * 1000, // Scale up to realistic numbers
        forecast: (val * 1000) * 1.1 // Add a forecast line
    }));

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="flex flex-col gap-6 h-full max-w-7xl mx-auto w-full pb-10">

            {/* Top Action Bar */}
            <div className="flex items-center justify-between border-b pb-4">
                <Button variant="ghost" size="sm" onClick={() => navigate("/reports")} className="-ml-3 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Report Center
                </Button>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" /> Share
                    </Button>
                    <Button variant="outline" size="sm">
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                    <Button size="sm">
                        <Download className="mr-2 h-4 w-4" /> Download {report.format}
                    </Button>
                </div>
            </div>

            {/* Report Hero */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <Badge variant="secondary">{report.type}</Badge>
                    <Badge variant="outline">{report.schedule} Schedule</Badge>
                </div>
                <h1 className="text-4xl font-bold tracking-tight">{report.title}</h1>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" /> Generated: {report.dateGenerated}
                    </div>
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4" /> Author: {report.author}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" /> Timeframe: Last 30 Days
                    </div>
                    <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" /> ID: {report.id.toUpperCase()}
                    </div>
                </div>
            </div>

            {/* Report Content Grid */}
            <div className="grid gap-6 md:grid-cols-3 mt-4">

                {/* Main Chart */}
                <Card className="col-span-3 lg:col-span-2 border shadow-sm">
                    <CardHeader>
                        <CardTitle>Spend vs Forecast Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-0">
                        <div className="h-[400px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={fullChartData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.5} />
                                    <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value / 1000}k`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0F172A', borderColor: '#1E293B', borderRadius: '8px' }}
                                        labelStyle={{ color: '#F8FAFC' }}
                                        itemStyle={{ fontFamily: 'JetBrains Mono' }}
                                        // @ts-ignore Recharts typing
                                        formatter={(value: any, name: string) => [formatCurrency(value), name === 'value' ? 'Actual Spend' : 'Forecast']}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                                    <Area type="monotone" dataKey="forecast" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorForecast)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Executive Summary */}
                <div className="col-span-3 lg:col-span-1 flex flex-col gap-6">
                    <Card className="border shadow-sm">
                        <CardHeader>
                            <CardTitle>Executive Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-sm dark:prose-invert">
                                <p>
                                    This report provides a granular breakdown of infrastructure costs across all major teams.
                                    We observed a <strong>12% increase</strong> in overall spend, primarily driven by the ML/AI Services team scaling up GPU instances.
                                </p>
                                <ul>
                                    <li>Total Spend: $142,500</li>
                                    <li>Forecast variance: +4.2%</li>
                                    <li>Highest Driver: EC2 (us-east-1)</li>
                                </ul>
                                <p>
                                    Optimization recommendations include purchasing Compute Savings Plans and identifying 14 idle RDS instances.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border shadow-sm flex-1">
                        <CardHeader>
                            <CardTitle>Key Findings</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1 border-l-2 border-red-500 pl-4">
                                <span className="font-semibold text-sm">Critical: RDS Spend</span>
                                <span className="text-xs text-muted-foreground">Unused staging databases costing $4.2k/mo.</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l-2 border-amber-500 pl-4">
                                <span className="font-semibold text-sm">Warning: S3 Storage</span>
                                <span className="text-xs text-muted-foreground">Standard tier usage up 24%. Needs lifecycle rules.</span>
                            </div>
                            <div className="flex flex-col gap-1 border-l-2 border-emerald-500 pl-4">
                                <span className="font-semibold text-sm">Success: CDN Optimization</span>
                                <span className="text-xs text-muted-foreground">CloudFront changes reduced egress by 18%.</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
