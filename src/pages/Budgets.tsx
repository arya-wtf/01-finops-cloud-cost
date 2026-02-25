import { useMemo } from "react";
import { activeBudgets } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Target, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function Budgets() {
    // Sort by highest utilization percentage
    const sortedBudgets = useMemo(() => {
        return [...activeBudgets].sort((a, b) => {
            const pA = a.spent / a.allocated;
            const pB = b.spent / b.allocated;
            return pB - pA;
        });
    }, []);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
    };

    return (
        <div className="flex flex-col gap-6 h-full w-full mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Budget Caps</h1>
                    <p className="text-muted-foreground">Manage spending limits and team allocations across the organization.</p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Budget
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedBudgets.map((budget) => {
                    const percent = Math.min((budget.spent / budget.allocated) * 100, 100);
                    const rawPercent = (budget.spent / budget.allocated) * 100;
                    const isOver = percent >= 100;
                    const isWarning = percent >= 80 && percent < 100;

                    return (
                        <Card key={budget.id} className={cn("border shadow-sm flex flex-col", isOver && "border-red-500/50 bg-red-500/5")}>
                            <CardHeader className="pb-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            {budget.team}
                                        </CardTitle>
                                        <CardDescription className="mt-1 flex items-center gap-1">
                                            <Users className="h-3 w-3" /> Core Engineering
                                        </CardDescription>
                                    </div>
                                    <Badge variant="outline" className={cn(
                                        isOver ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                            isWarning ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                                                "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                    )}>
                                        {budget.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col justify-end">
                                <div className="space-y-4">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <div className="text-3xl font-bold font-mono">
                                                {formatCurrency(budget.spent)}
                                            </div>
                                            <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                                                <Target className="h-4 w-4" /> Limit: {formatCurrency(budget.allocated)}
                                            </div>
                                        </div>
                                        <div className={cn("text-xl font-bold", isOver ? "text-red-500" : "text-muted-foreground")}>
                                            {rawPercent.toFixed(1)}%
                                        </div>
                                    </div>

                                    <div className="h-3 w-full overflow-hidden rounded-full bg-secondary relative">
                                        <div
                                            className={cn(
                                                "h-full transition-all duration-500",
                                                isOver ? "bg-red-500" : isWarning ? "bg-amber-500" : "bg-emerald-500"
                                            )}
                                            style={{ width: `${percent}%` }}
                                        />
                                        {/* Tick mark at 80% */}
                                        <div className="absolute top-0 bottom-0 left-[80%] w-0.5 bg-background z-10 hidden sm:block" />
                                    </div>

                                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                                        <Button variant="outline" size="sm" className="w-full">Edit</Button>
                                        <Button variant="outline" size="sm" className="w-full">View Details</Button>
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
