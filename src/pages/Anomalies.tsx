import { useMemo, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { recentAnomalies } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Filter, CheckCircle2 } from "lucide-react";

export function Anomalies() {
    const { selectedProvider } = useAppStore();
    const [anomalies, setAnomalies] = useState(recentAnomalies);

    const filteredAnomalies = useMemo(() => {
        if (!selectedProvider) return anomalies;
        return anomalies.filter((a) => a.provider === selectedProvider);
    }, [anomalies, selectedProvider]);

    const handleAcknowledge = (id: string) => {
        setAnomalies(prev =>
            prev.map(a => a.id === id ? { ...a, acknowledged: true } : a)
        );
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    return (
        <div className="flex flex-col gap-6 h-full max-w-5xl mx-auto w-full">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Anomaly Feed</h1>
                <p className="text-muted-foreground">Review and investigate detected spending spikes.</p>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="px-3 py-1">
                        <AlertTriangle className="mr-2 h-3.5 w-3.5 text-red-500" />
                        {filteredAnomalies.filter(a => !a.acknowledged).length} Active
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1 text-muted-foreground">
                        {filteredAnomalies.filter(a => a.acknowledged).length} Acknowledged
                    </Badge>
                </div>
                <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                </Button>
            </div>

            <div className="flex flex-col gap-4">
                {filteredAnomalies.map((anomaly) => (
                    <Card key={anomaly.id} className={`border ${anomaly.acknowledged ? 'bg-muted/10 opacity-70' : 'shadow-sm'}`}>
                        <CardHeader className="py-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${anomaly.acknowledged ? 'bg-muted' : anomaly.severity === 'High' ? 'bg-red-500/10' : anomaly.severity === 'Medium' ? 'bg-amber-500/10' : 'bg-sky-500/10'}`}>
                                        <AlertTriangle className={`h-5 w-5 ${anomaly.acknowledged ? 'text-muted-foreground' : anomaly.severity === 'High' ? 'text-red-500' : anomaly.severity === 'Medium' ? 'text-amber-500' : 'text-sky-500'}`} />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            {anomaly.service}
                                            {anomaly.acknowledged && <span className="text-xs font-normal text-muted-foreground ml-2">(Acknowledged)</span>}
                                        </CardTitle>
                                        <p className="text-sm text-muted-foreground font-mono mt-1">{anomaly.timestamp}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-right">
                                        <p className={`font-mono text-xl font-bold ${anomaly.acknowledged ? 'text-muted-foreground' : 'text-foreground'}`}>
                                            +{formatCurrency(anomaly.amount)}
                                        </p>
                                        <div className="flex gap-2 justify-end mt-1">
                                            <Badge variant={anomaly.severity === "High" ? "destructive" : anomaly.severity === "Medium" ? "default" : "secondary"}>
                                                {anomaly.severity} Priority
                                            </Badge>
                                            <Badge variant="outline">{anomaly.provider}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0 pb-4">
                            <div className="mt-2 bg-muted/40 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <p className="text-sm font-medium">
                                    {anomaly.description}
                                </p>
                                {!anomaly.acknowledged ? (
                                    <div className="flex gap-2 w-full sm:w-auto">
                                        <Button variant="outline" size="sm" className="w-full sm:w-auto">Investigate</Button>
                                        <Button size="sm" className="w-full sm:w-auto" onClick={() => handleAcknowledge(anomaly.id)}>
                                            <CheckCircle2 className="mr-2 h-4 w-4" />
                                            Acknowledge
                                        </Button>
                                    </div>
                                ) : (
                                    <Button variant="outline" size="sm" className="w-full sm:w-auto" disabled>Resolved</Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {filteredAnomalies.length === 0 && (
                    <div className="text-center py-12 border rounded-lg border-dashed">
                        <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-medium">No Anomalies</h3>
                        <p className="text-muted-foreground">Everything looks perfectly normal for this provider.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
