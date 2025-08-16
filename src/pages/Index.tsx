import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import ChatbotButton from "@/components/ui/chatbot-button";
import { DynamicMetaTags } from "@/hooks/use-dynamic-meta";

const Index = () => {
  console.log('Index.tsx - Page rendering, about to render WhatsApp Button');
  
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
        <Services />
        <Projects />
        <About />
        <Testimonials />
        <Contact />
      </div>
      <Footer />
      {/* Boutons flottants accessibles */}
      <ChatbotButton />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
