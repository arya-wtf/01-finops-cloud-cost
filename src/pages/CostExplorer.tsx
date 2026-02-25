import { useMemo, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { generateCostData } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Download, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CostExplorer() {
    const { dateRangeDays, selectedProvider } = useAppStore();
    const [searchTerm, setSearchTerm] = useState("");

    const rawData = useMemo(() => generateCostData(dateRangeDays), [dateRangeDays]);

    const filteredData = useMemo(() => {
        return rawData.filter(d => {
            const matchesProvider = selectedProvider ? d.provider === selectedProvider : true;
            const matchesSearch =
                d.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.provider.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesProvider && matchesSearch;
        }).sort((a, b) => b.cost - a.cost); // Sort highest cost first
    }, [rawData, selectedProvider, searchTerm]);

    // Format currency
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    return (
        <div className="flex flex-col gap-6 h-full">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Cost Explorer</h1>
                <p className="text-muted-foreground">Deep dive into your infrastructure spending by service, provider, and team.</p>
            </div>

            <Card className="flex-1 flex flex-col border shadow-sm overflow-hidden">
                <CardHeader className="border-b bg-muted/20 pb-4">
                    <div className="flex items-center justify-between">
                        <CardTitle>Detailed Breakdown</CardTitle>
                        <div className="flex items-center gap-2">
                            <div className="relative w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    className="pl-8 bg-background"
                                    placeholder="Filter by service or team..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="hidden sm:flex">
                                <Download className="mr-2 h-4 w-4" />
                                Export CSV
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-auto">
                    <Table>
                        <TableHeader className="bg-muted/50 sticky top-0 backdrop-blur-sm">
                            <TableRow>
                                <TableHead className="w-[100px]">Date</TableHead>
                                <TableHead>Provider</TableHead>
                                <TableHead>Service</TableHead>
                                <TableHead>Team Allocation</TableHead>
                                <TableHead className="text-right">Total Cost</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                        No cost records found for this filter.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredData.map((row, index) => (
                                    <TableRow key={`${row.date}-${index}`} className="hover:bg-muted/30">
                                        <TableCell className="font-mono text-muted-foreground whitespace-nowrap">{row.date}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${row.provider === 'AWS' ? 'bg-[#FF9900]' :
                                                        row.provider === 'GCP' ? 'bg-[#4285F4]' : 'bg-[#0089D6]'
                                                    }`} />
                                                {row.provider}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{row.service}</TableCell>
                                        <TableCell>{row.team}</TableCell>
                                        <TableCell className="text-right font-mono text-sm">
                                            {formatCurrency(row.cost)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
