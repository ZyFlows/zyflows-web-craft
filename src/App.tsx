
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
import FashionDemo from "./pages/demos/FashionDemo";
import TechSaasDemo from "./pages/demos/TechSaasDemo";
import LegalFirmDemo from "./pages/demos/LegalFirmDemo";
import PortfolioDemo from "./pages/demos/PortfolioDemo";
import LifestyleBlogDemo from "./pages/demos/LifestyleBlogDemo";
import RealEstateDemo from "./pages/demos/RealEstateDemo";
import LegalGPTDemo from "./pages/demos/LegalGPTDemo";
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
            <Route path="/demo/fashion" element={<FashionDemo />} />
            <Route path="/demo/tech-saas" element={<TechSaasDemo />} />
            <Route path="/demo/legal-firm" element={<LegalFirmDemo />} />
            <Route path="/demo/portfolio" element={<PortfolioDemo />} />
            <Route path="/demo/lifestyle-blog" element={<LifestyleBlogDemo />} />
            <Route path="/demo/real-estate" element={<RealEstateDemo />} />
            <Route path="/demo/legal-gpt" element={<LegalGPTDemo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
