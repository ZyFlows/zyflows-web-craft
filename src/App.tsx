
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Loader from "@/components/ui/loader";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "next-themes";
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
import RestaurantDemo from "./pages/demos/RestaurantDemo";
import AgencyDemo from "./pages/demos/AgencyDemo";
import AutomationDemo from "./pages/demos/AutomationDemo";
import "@/components/ui/rtl-support.css";

const queryClient = new QueryClient();

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  
  console.log('App.tsx - showLoader:', showLoader);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <LanguageProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {showLoader && <Loader onComplete={() => {
              console.log('Loader completed, hiding loader');
              setShowLoader(false);
            }} />}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/demo/fashion" element={<FashionDemo />} />
            <Route path="/demo/ecommerce" element={<EcommerceDemo />} />
            <Route path="/demo/saas" element={<SaasDemo />} />
            <Route path="/demo/tech-saas" element={<TechSaasDemo />} />
            <Route path="/demo/legal-firm" element={<LegalFirmDemo />} />
            <Route path="/demo/portfolio" element={<PortfolioDemo />} />
            <Route path="/demo/lifestyle-blog" element={<LifestyleBlogDemo />} />
            <Route path="/demo/real-estate" element={<RealEstateDemo />} />
            <Route path="/demo/legal-gpt" element={<LegalGPTDemo />} />
            <Route path="/demo/restaurant" element={<RestaurantDemo />} />
            <Route path="/demo/agency" element={<AgencyDemo />} />
            <Route path="/demo/automation" element={<AutomationDemo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
       </LanguageProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
