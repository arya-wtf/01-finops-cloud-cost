import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Compass, Activity, Banknote, Settings, Users, FileText, Blocks } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Overview", href: "/", icon: LayoutDashboard },
    { name: "Cost Explorer", href: "/explorer", icon: Compass },
    { name: "Anomalies", href: "/anomalies", icon: Activity },
    { name: "Budgets", href: "/budgets", icon: Banknote },
    { name: "Reports", href: "/reports", icon: FileText },
    { name: "Teams", href: "/teams", icon: Users },
    { name: "Integrations", href: "/integrations", icon: Blocks },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const location = useLocation();

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-card/50 backdrop-blur-xl">
            <div className="flex h-16 items-center px-6 border-b">
                <Link to="/" className="flex items-center gap-2 font-bold text-lg max-w-full">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                        <Banknote className="h-5 w-5 text-white" />
                    </div>
                    <span className="truncate">CostPilot</span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto py-6">
                <nav className="space-y-1 px-3">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-blue-600/10 text-blue-600 dark:text-blue-400"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                                        isActive ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground group-hover:text-foreground"
                                    )}
                                    aria-hidden="true"
                                />
                                <span className="truncate">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t p-4">
                <div className="flex items-center gap-3 rounded-lg border p-3 bg-muted/40 transition-colors hover:bg-muted/80 cursor-pointer">
                    <div className="h-9 w-9 overflow-hidden rounded-full bg-slate-800">
                        <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User avatar" />
                    </div>
                    <div className="flex flex-col text-sm overflow-hidden">
                        <span className="font-medium truncate">Demo Admin</span>
                        <span className="text-xs text-muted-foreground truncate">admin@costpilot.io</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
