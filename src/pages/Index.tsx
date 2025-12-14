import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/Hero";
import ThreePillars from "@/components/sections/ThreePillars";
import ServiceDetails from "@/components/sections/ServiceDetails";
import UseCases from "@/components/sections/UseCases";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import { DynamicMetaTags } from "@/hooks/use-dynamic-meta";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { language } = useLanguage();
  
  const skipLinkText = language === 'fr' 
    ? 'Aller au contenu principal' 
    : language === 'he' 
    ? 'דלג לתוכן הראשי' 
    : 'Skip to main content';

  return (
    <div className="min-h-screen bg-background">
      <DynamicMetaTags />
      {/* Skip link for keyboard accessibility */}
      <a href="#main-content" className="skip-link" aria-label={skipLinkText}>
        {skipLinkText}
      </a>
      <header>
        <Navigation />
      </header>
      <main id="main-content" role="main">
        <Hero />
        <ThreePillars />
        <ServiceDetails />
        <UseCases />
        <Services />
        <Projects />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      {/* WhatsApp Widget */}
      <WhatsAppButton />
    </div>
  );
};

export default Index;
