import Navigation from "@/components/ui/navigation";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { DynamicMetaTags } from "@/hooks/use-dynamic-meta";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DynamicMetaTags />
      <Navigation />
      <Hero />
      <Services />
      <Projects />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
