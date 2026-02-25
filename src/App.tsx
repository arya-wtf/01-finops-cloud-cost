import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Dashboard } from "./pages/Dashboard";
import { CostExplorer } from "./pages/CostExplorer";
import { Anomalies } from "./pages/Anomalies";
import { Budgets } from "./pages/Budgets";
import { Reports } from "./pages/Reports";
import { ReportDetail } from "./pages/ReportDetail";

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="explorer" element={<CostExplorer />} />
            <Route path="anomalies" element={<Anomalies />} />
            <Route path="budgets" element={<Budgets />} />
            <Route path="reports" element={<Reports />} />
            <Route path="reports/:id" element={<ReportDetail />} />
            <Route path="*" element={<div className="p-6">Page not found...</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}

export default App;
