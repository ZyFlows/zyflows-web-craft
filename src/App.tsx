
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import CookieConsent from "@/components/CookieConsent";
import Starfield from "@/components/ui/starfield";
import "@/components/ui/rtl-support.css";

// Lazy loading des pages pour code splitting et meilleures performances
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AccessibilityStatement = lazy(() => import("./pages/AccessibilityStatement"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const EcommerceDemo = lazy(() => import("./pages/demos/EcommerceDemo"));
const SaasDemo = lazy(() => import("./pages/demos/SaasDemo"));
const FashionDemo = lazy(() => import("./pages/demos/FashionDemo"));
const TechSaasDemo = lazy(() => import("./pages/demos/TechSaasDemo"));
const LegalFirmDemo = lazy(() => import("./pages/demos/LegalFirmDemo"));
const PortfolioDemo = lazy(() => import("./pages/demos/PortfolioDemo"));
const LifestyleBlogDemo = lazy(() => import("./pages/demos/LifestyleBlogDemo"));
const RealEstateDemo = lazy(() => import("./pages/demos/RealEstateDemo"));
const LegalGPTDemo = lazy(() => import("./pages/demos/LegalGPTDemo"));
const RestaurantDemo = lazy(() => import("./pages/demos/RestaurantDemo"));
const AgencyDemo = lazy(() => import("./pages/demos/AgencyDemo"));
const AutomationDemo = lazy(() => import("./pages/demos/AutomationDemo"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <AccessibilityWidget />
          <CookieConsent />
          <Starfield />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
          </Suspense>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
