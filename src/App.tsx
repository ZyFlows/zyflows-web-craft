
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EcommerceDemo from "./pages/demos/EcommerceDemo";
import SaasDemo from "./pages/demos/SaasDemo";
import AutomationDemo from "./pages/demos/AutomationDemo";
import LegalDemo from "./pages/demos/LegalDemo";
import RestaurantDemo from "./pages/demos/RestaurantDemo";
import AgencyDemo from "./pages/demos/AgencyDemo";
import "@/components/ui/rtl-support.css";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/demo/ecommerce" element={<EcommerceDemo />} />
            <Route path="/demo/saas" element={<SaasDemo />} />
            <Route path="/demo/automation" element={<AutomationDemo />} />
            <Route path="/demo/legal" element={<LegalDemo />} />
            <Route path="/demo/restaurant" element={<RestaurantDemo />} />
            <Route path="/demo/agency" element={<AgencyDemo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
