
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/ui/language-selector";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, language } = useLanguage();

  const handleWhatsAppClick = () => {
    const phoneNumber = "+972584229255";
    const message = t('whatsapp.message');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
    <nav 
      className={`fixed top-0 w-full z-50 transition-smooth ${scrolled ? "glass-effect shadow-lg" : ""} ${language === 'he' ? 'rtl' : ''}`}
      aria-label="Navigation principale"
      role="navigation"
    >
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between h-20 md:h-24 ${language === 'he' ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" aria-label="Retour à l'accueil - zyFlows" className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/89832acc-ee39-4d30-bb24-cf59c98cf511.png" 
                alt="Logo zyFlows - Solutions digitales innovantes" 
                className="h-12 w-12 object-contain transition-all duration-300 ease-in-out"
              />
              <span className="hidden md:block text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Zyflows
              </span>
            </a>
          </div>

          {/* Navigation desktop */}
          <div className={`hidden md:flex items-center ${
            language === 'he' 
              ? 'space-x-reverse space-x-6 lg:space-x-8' 
              : 'space-x-6 lg:space-x-8'
          }`}>
            {navItems.map(item => (
              <a 
                key={item.label} 
                href={item.href} 
                className="text-muted-foreground hover:text-primary transition-smooth hover:scale-105 whitespace-nowrap text-base lg:text-lg font-medium"
              >
                {item.label}
              </a>
            ))}
            <LanguageSelector />
            <Button 
              variant="default" 
              className="glow-primary whitespace-nowrap text-sm lg:text-base px-4 lg:px-6"
              onClick={handleWhatsAppClick}
            >
              {t('nav.start_project')}
            </Button>
          </div>

          {/* Menu mobile - Only show on small screens */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Menu mobile ouvert - Only show when menu is open on mobile */}
        {isOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden glass-effect border-t border-border"
            role="menu"
            aria-labelledby="menu-button"
          >
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
                  ? 'flex-row-reverse justify-start' 
                  : 'flex-row justify-between'
              } items-center gap-4`}>
                <LanguageSelector />
                <Button 
                  variant="default" 
                  className="glow-primary flex-shrink-0 text-sm"
                  onClick={handleWhatsAppClick}
                >
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
