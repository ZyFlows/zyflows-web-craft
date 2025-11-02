import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/Hero";
import ThreePillars from "@/components/sections/ThreePillars";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import { DynamicMetaTags } from "@/hooks/use-dynamic-meta";

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
        <ThreePillars />
        <Services />
        <Projects />
        <About />
        <Testimonials />
        <Contact />
      </div>
      {/* Widget WhatsApp (droite) */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
