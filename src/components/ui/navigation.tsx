
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
    const phoneNumber = "972584229255";
    const message = language === 'fr' 
      ? "🚀 Bonjour ! Je souhaite démarrer un projet avec vous. Pouvons-nous discuter des détails ?"
      : language === 'he'
      ? "🚀 שלום! אני רוצה להתחיל פרויקט איתכם. נוכל לדבר על הפרטים?"
      : "🚀 Hello! I'd like to start a project with you. Can we discuss the details?";
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

  const baseNavItems = [
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

  // Inverser l'ordre en mode hébreu pour desktop seulement
  const navItems = language === 'he' ? [...baseNavItems].reverse() : baseNavItems;
  // Pour mobile, toujours commencer par בית (home)
  const mobileNavItems = baseNavItems;

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-smooth ${scrolled ? "glass-effect shadow-lg" : ""} ${language === 'he' ? 'rtl' : ''}`}
      aria-label="Navigation principale"
      role="navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - toujours à droite en mode hébreu, à gauche en FR/EN */}
          <div className={`flex items-center ${language === 'he' ? 'order-3' : 'order-1'}`}>
            <a href="#home" aria-label={t('nav.home')} className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/89832acc-ee39-4d30-bb24-cf59c98cf511.png" 
                alt="Logo zyFlows" 
                width="40"
                height="40"
                className="h-10 w-10 object-contain transition-all duration-300 ease-in-out"
              />
              <span className="hidden lg:block text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Zyflows
              </span>
            </a>
          </div>

          {/* Navigation desktop - au centre */}
          <div className={`hidden md:flex items-center justify-center order-2 ${
            language === 'he' ? 'flex-row-reverse' : ''
          } gap-7`}>
            {navItems.map(item => (
              <a 
                key={item.label} 
                href={item.href} 
                className="text-white/90 hover:text-primary transition-all duration-300 hover:scale-105 whitespace-nowrap text-base font-medium relative group py-2 px-0"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Bouton CTA + Langue - toujours à gauche en mode hébreu, à droite en FR/EN */}
          <div className={`hidden md:flex items-center gap-4 h-10 ${language === 'he' ? 'order-1' : 'order-3'}`}>
            <LanguageSelector />
            <Button 
              variant="default" 
              size="sm"
              className="glow-primary whitespace-nowrap text-sm px-4 h-10"
              onClick={handleWhatsAppClick}
            >
              {t('nav.start_project')}
            </Button>
          </div>

          {/* Menu mobile - Only show on small screens */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="h-10 w-10"
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
              {mobileNavItems.map(item => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  className="block px-3 py-2 text-muted-foreground hover:text-primary transition-smooth" 
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="px-3 py-2 border-t border-border mt-2 pt-3">
                <div className="mb-3">
                  <LanguageSelector />
                </div>
                <Button 
                  variant="default" 
                  className="glow-primary w-full text-sm"
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
