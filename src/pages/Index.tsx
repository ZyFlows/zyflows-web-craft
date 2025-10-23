import { lazy, Suspense } from "react";
import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/Hero";
import WhyChoose from "@/components/sections/WhyChoose";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import { DynamicMetaTags } from "@/hooks/use-dynamic-meta";

// Lazy load des sections non-critiques pour améliorer les performances
const Services = lazy(() => import("@/components/sections/Services"));
const Projects = lazy(() => import("@/components/sections/Projects"));
const About = lazy(() => import("@/components/sections/About"));
const Testimonials = lazy(() => import("@/components/sections/Testimonials"));
const Contact = lazy(() => import("@/components/sections/Contact"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DynamicMetaTags />
      {/* Skip link pour l'accessibilité clavier */}
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <Navigation />
      <div id="main-content">
        <Hero />
        <WhyChoose />
        <Suspense fallback={null}>
          <Services />
          <Projects />
          <About />
          <Testimonials />
          <Contact />
        </Suspense>
      </div>
      {/* Widget WhatsApp (droite) */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
