import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface KpiCardProps {
    title: string;
    value: string | number;
    prefix?: string;
    delta?: number;
    deltaType?: "increase" | "decrease" | "neutral";
    icon: LucideIcon;
    className?: string;
}

export function KpiCard({ title, value, prefix, delta, deltaType, icon: Icon, className }: KpiCardProps) {
    const isPositiveDelta = deltaType === "increase";
    const isNegativeDelta = deltaType === "decrease";

    return (
        <Card className={cn("relative overflow-hidden", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold font-mono">
                    {prefix}{value}
                </div>
                {delta !== undefined && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <span
                            className={cn(
                                "inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-medium leading-none",
                                isPositiveDelta && "bg-emerald-500/10 text-emerald-500",
                                isNegativeDelta && "bg-red-500/10 text-red-500",
                                !isPositiveDelta && !isNegativeDelta && "bg-slate-500/10 text-slate-500"
                            )}
                        >
                            {isPositiveDelta ? "↑" : isNegativeDelta ? "↓" : ""} {Math.abs(delta)}%
                        </span>
                        <span className="text-muted-foreground">vs last month</span>
                    </p>
                )}
            </CardContent>
            {/* Background Icon Ghost */}
            <Icon className="absolute -bottom-4 -right-4 h-24 w-24 text-primary/5 stroke-1 pointer-events-none" />
        </Card>
    );
}
