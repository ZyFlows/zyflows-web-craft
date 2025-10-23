
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import Loader from "@/components/ui/loader";
import { LanguageProvider } from "@/contexts/LanguageContext";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import CookieConsent from "@/components/CookieConsent";
import "@/components/ui/rtl-support.css";

// Lazy loading des pages pour code splitting et meilleures performances
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AccessibilityStatement = lazy(() => import("./pages/AccessibilityStatement"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

const queryClient = new QueryClient();

const App = () => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <Toaster />
          <Sonner />
          <AccessibilityWidget />
          <CookieConsent />
          <BrowserRouter>
            {showLoader && <Loader onComplete={() => setShowLoader(false)} />}
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
