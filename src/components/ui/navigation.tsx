
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Accueil", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Projets", href: "#projects" },
    { label: "À propos", href: "#about" },
    { label: "Témoignages", href: "#testimonials" },
    { label: "Contact", href: "#contact" }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-smooth ${scrolled ? "glass-effect shadow-lg" : ""}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/da2b99fe-7ae0-4b4d-8a8d-0029ea41d97f.png" 
              alt="zyFlows" 
              className="h-8 w-auto"
            />
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-smooth hover:scale-105"
              >
                {item.label}
              </a>
            ))}
            <Button variant="default" className="glow-primary">
              Démarrer un projet
            </Button>
          </div>

          {/* Menu mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Menu mobile ouvert */}
        {isOpen && (
          <div className="md:hidden glass-effect border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-muted-foreground hover:text-primary transition-smooth"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="px-3 py-2">
                <Button variant="default" className="w-full glow-primary">
                  Démarrer un projet
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
