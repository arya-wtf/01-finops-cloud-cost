import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { savedReports } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Plus, FilePieChart, Calendar, BarChart3, Users, ShieldAlert } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Reports() {
    const navigate = useNavigate();
    const [isGenerating, setIsGenerating] = useState(false);

    const getIconForType = (type: string) => {
        switch (type) {
            case "Cost Allocation": return <FilePieChart className="h-4 w-4" />;
            case "Optimization Audit": return <BarChart3 className="h-4 w-4" />;
            case "Compliance": return <ShieldAlert className="h-4 w-4" />;
            case "Forecasting": return <AreaChart className="h-4 w-4" />;
            default: return <FileText className="h-4 w-4" />;
        }
    };

    const getFormatStyle = (format: string) => {
        switch (format) {
            case "PDF": return "bg-red-500/10 text-red-500 border-red-500/20";
            case "CSV": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            case "XLSX": return "bg-green-500/10 text-green-500 border-green-500/20";
            default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
        }
    };

    const handleGenerateReport = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setIsGenerating(false);
            // Simulate navigate to a generated report or close modal
        }, 1500);
    };

    return (
        <div className="flex flex-col gap-6 h-full max-w-7xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Report Center</h1>
                    <p className="text-muted-foreground">Generate, schedule, and view detailed financial and compliance reports.</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Generate Report
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Generate Custom Report</DialogTitle>
                            <DialogDescription>
                                Configure parameters to generate a new high-fidelity financial report.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Report Title</Label>
                                <Input id="title" placeholder="e.g. End of Month AWS Spend Audit" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Report Type</Label>
                                    <Select defaultValue="allocation">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="allocation">Cost Allocation</SelectItem>
                                            <SelectItem value="optimization">Optimization Audit</SelectItem>
                                            <SelectItem value="compliance">SOC2 Compliance</SelectItem>
                                            <SelectItem value="forecast">Spend Forecast</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Format</Label>
                                    <Select defaultValue="pdf">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select format" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pdf">PDF Document</SelectItem>
                                            <SelectItem value="csv">CSV Export</SelectItem>
                                            <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Provider Scope</Label>
                                    <Select defaultValue="all">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select providers" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Providers</SelectItem>
                                            <SelectItem value="aws">AWS Only</SelectItem>
                                            <SelectItem value="gcp">GCP Only</SelectItem>
                                            <SelectItem value="azure">Azure Only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Date Range</Label>
                                    <Select defaultValue="last30">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select range" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="last7">Last 7 Days</SelectItem>
                                            <SelectItem value="last30">Last 30 Days</SelectItem>
                                            <SelectItem value="mtd">Month to Date</SelectItem>
                                            <SelectItem value="ytd">Year to Date</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label>Team Allocation (Optional)</Label>
                                <Select>
                                    <SelectTrigger className="text-muted-foreground">
                                        <SelectValue placeholder="Select specific team..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="platform">Platform Infra</SelectItem>
                                        <SelectItem value="ml">ML/AI Services</SelectItem>
                                        <SelectItem value="data">Data Warehouse</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button disabled={isGenerating} onClick={handleGenerateReport} className="w-full sm:w-auto">
                                {isGenerating ? "Generating..." : "Generate & Download"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b">
                <Badge variant="secondary" className="cursor-pointer bg-secondary/80 hover:bg-secondary">All Reports</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">Allocation</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">Optimization</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-muted">Compliance</Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {savedReports.map((report) => {
                    const chartData = report.miniChartData.map((val, i) => ({ index: i, value: val }));

                    return (
                        <Card
                            key={report.id}
                            className="border shadow-sm flex flex-col hover:border-blue-500/30 transition-colors cursor-pointer group relative overflow-hidden"
                            onClick={() => navigate(`/reports/${report.id}`)}
                        >
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <Badge variant="outline" className="bg-muted text-muted-foreground border-border/50 flex items-center gap-1.5 pb-0.5">
                                        {getIconForType(report.type)} <span className="text-[10px] uppercase font-bold tracking-wider">{report.type}</span>
                                    </Badge>
                                    <Badge variant="outline" className={getFormatStyle(report.format)}>
                                        {report.format}
                                    </Badge>
                                </div>
                                <CardTitle className="text-lg mt-3 group-hover:text-blue-500 transition-colors line-clamp-1">
                                    {report.title}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="flex flex-col gap-4 flex-1 mt-2">
                                {/* Tiny Mini Chart */}
                                <div className="h-[60px] w-full bg-muted/20 rounded-md border border-border/50 p-1">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id={`color-${report.id}`} x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <Area
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#3B82F6"
                                                strokeWidth={2}
                                                fill={`url(#color-${report.id})`}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground mt-auto">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <span className="font-mono text-xs">{report.dateGenerated}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 justify-end">
                                        <Users className="h-3.5 w-3.5" />
                                        <span className="truncate">{report.author}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
