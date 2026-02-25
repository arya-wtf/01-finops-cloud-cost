import { create } from "zustand";

interface AppState {
    dateRangeDays: number;
    setDateRangeDays: (days: number) => void;
    selectedProvider: string | null;
    setSelectedProvider: (provider: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
    dateRangeDays: 30, // Default to 30 days
    setDateRangeDays: (days) => set({ dateRangeDays: days }),
    selectedProvider: null, // null means "All"
    setSelectedProvider: (provider) => set({ selectedProvider: provider }),
}));
