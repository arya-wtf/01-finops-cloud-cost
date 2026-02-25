import { useAppStore } from "@/store/useAppStore";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Search, Cloud } from "lucide-react";

export function Header() {
    const { dateRangeDays, setDateRangeDays, selectedProvider, setSelectedProvider } = useAppStore();

    return (
        <header className="flex h-16 w-full items-center justify-between border-b bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex flex-1 items-center gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        placeholder="Search resources, tags, or anomalies..."
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-9"
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 flex-shrink-0">
                <div className="flex items-center space-x-2">
                    <Select
                        value={selectedProvider || "all"}
                        onValueChange={(v) => setSelectedProvider(v === "all" ? null : v)}
                    >
                        <SelectTrigger className="w-[140px] h-9">
                            <Cloud className="w-4 h-4 mr-2 text-muted-foreground" />
                            <SelectValue placeholder="All Providers" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Providers</SelectItem>
                            <SelectItem value="AWS">Amazon Web Services</SelectItem>
                            <SelectItem value="GCP">Google Cloud Platform</SelectItem>
                            <SelectItem value="Azure">Microsoft Azure</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center space-x-2">
                    <Select
                        value={dateRangeDays.toString()}
                        onValueChange={(v) => setDateRangeDays(parseInt(v))}
                    >
                        <SelectTrigger className="w-[130px] h-9">
                            <SelectValue placeholder="Last 30 days" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7">Last 7 days</SelectItem>
                            <SelectItem value="30">Last 30 days</SelectItem>
                            <SelectItem value="90">Last 90 days</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-px h-6 bg-border mx-2" />

                <Button variant="ghost" size="icon" className="relative h-9 w-9">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                </Button>
            </div>
        </header>
    );
}
