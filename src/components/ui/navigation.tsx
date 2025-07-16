
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/ui/language-selector";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      label: t('nav.home'),
      href: "#home"
    },
    {
      label: t('nav.services'),
      href: "#services"
    },
    {
      label: t('nav.projects'),
      href: "#projects"
    },
    {
      label: t('nav.about'),
      href: "#about"
    },
    {
      label: t('nav.testimonials'),
      href: "#testimonials"
    },
    {
      label: t('nav.contact'),
      href: "#contact"
    }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-smooth ${scrolled ? "glass-effect shadow-lg" : ""} ${language === 'he' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Même taille que les boutons */}
          <div className={`flex items-center ${language === 'he' ? 'logo-container' : ''}`}>
            <img 
              src="/lovable-uploads/8107f4f8-aed3-4dda-9c37-698139a71449.png" 
              alt="zyFlows" 
              className="h-9 w-auto object-contain transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Navigation desktop */}
          <div className={`hidden md:flex items-center ${
            language === 'he' 
              ? 'space-x-reverse space-x-6 lg:space-x-8 nav-items' 
              : 'space-x-6 lg:space-x-8'
          }`}>
            {navItems.map(item => (
              <a 
                key={item.label} 
                href={item.href} 
                className="text-muted-foreground hover:text-primary transition-smooth hover:scale-105 whitespace-nowrap text-sm lg:text-base"
              >
                {item.label}
              </a>
            ))}
            <LanguageSelector />
            <Button variant="default" className="glow-primary whitespace-nowrap text-sm lg:text-base px-4 lg:px-6">
              {t('nav.start_project')}
            </Button>
          </div>

          {/* Menu mobile */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Menu mobile ouvert */}
        {isOpen && (
          <div className="md:hidden glass-effect border-t border-border">
            <div className={`px-2 pt-2 pb-3 space-y-1 ${language === 'he' ? 'text-right' : ''}`}>
              {navItems.map(item => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  className="block px-3 py-2 text-muted-foreground hover:text-primary transition-smooth" 
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className={`px-3 py-2 flex ${
                language === 'he' 
                  ? 'flex-row-reverse' 
                  : 'flex-row'
              } justify-between items-center gap-4`}>
                <LanguageSelector />
                <Button variant="default" className="glow-primary flex-shrink-0 text-sm">
                  {t('nav.start_project')}
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
