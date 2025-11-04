import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Mail, Linkedin, Phone, User, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
const Footer = () => {
  const {
    t,
    language,
    setLanguage
  } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  const handleWhatsApp = () => {
    const phoneNumber = "972584229255";
    const message = language === 'fr' ? "💬 Bonjour ! Je souhaite discuter avec vous." : language === 'he' ? "💬 שלום! אני רוצה לדבר איתכם." : "💬 Hello! I would like to chat with you.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };
  return <>
      <footer className={`bg-gradient-to-br from-background via-background to-primary/5 border-t border-primary/10 py-12 ${language === 'he' ? 'rtl' : ''}`}>
        <div className="container mx-auto px-4">
          
          {/* Layout Mobile-first: centré et empilé */}
          <div className="flex flex-col items-center text-center space-y-8 lg:hidden">
            
            {/* Logo et Description */}
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <img src="/lovable-uploads/89832acc-ee39-4d30-bb24-cf59c98cf511.png" alt="zyFlows Logo" className="h-12 w-12 object-contain" />
                <span className="text-2xl font-bold gradient-text">zyFlows</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                {language === 'fr' ? 'Solutions digitales innovantes pour automatiser et développer votre entreprise.' : language === 'he' ? 'פתרונות דיגיטליים חדשניים לאוטומציה והצמחת העסק שלך.' : 'Innovative digital solutions to automate and scale your business.'}
              </p>
            </div>

            {/* Contact */}
            <div className="w-full max-w-sm">
              <h3 className="font-semibold text-lg mb-4 text-primary">
                {language === 'fr' ? 'Contact' : language === 'he' ? 'יצור קשר' : 'Contact'}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <a href="tel:+972584229255" className="text-muted-foreground hover:text-primary transition-colors" style={{ direction: 'ltr' }}>
                    +972 58 422 9255
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <a href="mailto:contact@zyflows.com" className="text-muted-foreground hover:text-primary transition-colors">
                    contact@zyflows.com
                  </a>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">
                    {language === 'fr' ? 'Israël' : language === 'he' ? 'ישראל' : 'Israel'}
                  </span>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="w-full max-w-sm">
              <h3 className="font-semibold text-lg mb-4 text-primary">
                {language === 'fr' ? 'Réseaux sociaux' : language === 'he' ? 'רשתות חברתיות' : 'Social Media'}
              </h3>
              <div className="flex justify-center gap-3">
                <Button variant="outline" size="icon" onClick={handleWhatsApp} className="rounded-full h-10 w-10 hover:bg-green-500/10 hover:border-green-500">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" asChild className="rounded-full h-10 w-10 hover:bg-blue-500/10 hover:border-blue-500">
                  <a href="https://www.linkedin.com/in/raphael-belhassen" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Langue */}
            <div className="w-full max-w-sm">
              <h3 className="font-semibold text-lg mb-4 text-primary">
                {language === 'fr' ? 'Choisissez la langue' : language === 'he' ? 'בחרו שפה' : 'Choose Language'}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  variant={language === 'fr' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setLanguage('fr')} 
                  className="flex flex-col items-center py-3 h-auto"
                >
                  <span className="text-xs">FR</span>
                  <span className="text-xs font-normal">Français</span>
                </Button>
                <Button 
                  variant={language === 'en' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setLanguage('en')} 
                  className="flex flex-col items-center py-3 h-auto"
                >
                  <span className="text-xs">GB</span>
                  <span className="text-xs font-normal">English</span>
                </Button>
                <Button 
                  variant={language === 'he' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setLanguage('he')} 
                  className="flex flex-col items-center py-3 h-auto"
                >
                  <span className="text-xs">IL</span>
                  <span className="text-xs font-normal">עברית</span>
                </Button>
              </div>
            </div>

            {/* Copyright et liens légaux */}
            <div className="w-full pt-6 border-t border-primary/10 space-y-3">
              <p className="text-xs text-muted-foreground" style={{ direction: 'ltr' }}>
                Copyright © 2025 - 
                <button onClick={() => setIsDialogOpen(true)} className="text-primary hover:text-primary/80 hover:underline transition-all duration-200 cursor-pointer bg-transparent border-none p-0 mx-1">
                  Raphael Belhassen
                </button>
              </p>
              
              <div className="flex justify-center gap-4 text-xs">
                <a href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                  {language === 'fr' ? 'Confidentialité' : language === 'he' ? 'פרטיות' : 'Privacy'}
                </a>
                <a href="/accessibility-statement" className="text-muted-foreground hover:text-primary transition-colors">
                  {language === 'fr' ? 'Accessibilité' : language === 'he' ? 'נגישות' : 'Accessibility'}
                </a>
              </div>
            </div>
          </div>

          {/* Layout Desktop: grille classique */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8 mb-8">
            
            {/* Logo et Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/lovable-uploads/89832acc-ee39-4d30-bb24-cf59c98cf511.png" alt="zyFlows Logo" className="h-10 w-10 object-contain" />
                <span className="text-2xl font-bold gradient-text">zyFlows</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {language === 'fr' ? 'Solutions digitales innovantes pour automatiser et développer votre entreprise.' : language === 'he' ? 'פתרונות דיגיטליים חדשניים לאוטומציה והצמחת העסק שלך.' : 'Innovative digital solutions to automate and scale your business.'}
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                {language === 'fr' ? 'Navigation' : language === 'he' ? 'ניווט' : 'Navigation'}
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => scrollToSection('home')} className="text-muted-foreground hover:text-primary transition-colors">
                    {t('nav.home')}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('services')} className="text-muted-foreground hover:text-primary transition-colors">
                    {t('nav.services')}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('projects')} className="text-muted-foreground hover:text-primary transition-colors">
                    {t('nav.projects')}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="text-muted-foreground hover:text-primary transition-colors">
                    {t('nav.about')}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('testimonials')} className="text-muted-foreground hover:text-primary transition-colors">
                    {t('nav.testimonials')}
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="text-muted-foreground hover:text-primary transition-colors">
                    {t('nav.contact')}
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                {language === 'fr' ? 'Contact' : language === 'he' ? 'צור קשר' : 'Contact'}
              </h3>
              <ul className="space-y-3 text-sm">
                <li className={`flex items-start gap-2 ${language === 'he' ? 'flex-row-reverse text-right' : ''}`}>
                  <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <a href="tel:+972584229255" className="text-muted-foreground hover:text-primary transition-colors" style={{ direction: 'ltr' }}>
                    +972 58 422 9255
                  </a>
                </li>
                <li className={`flex items-start gap-2 ${language === 'he' ? 'flex-row-reverse text-right' : ''}`}>
                  <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <a href="mailto:contact@zyflows.com" className="text-muted-foreground hover:text-primary transition-colors break-all">
                    contact@zyflows.com
                  </a>
                </li>
                <li className={`flex items-start gap-2 ${language === 'he' ? 'flex-row-reverse text-right' : ''}`}>
                  <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    {language === 'fr' ? 'Israël' : language === 'he' ? 'ישראל' : 'Israel'}
                  </span>
                </li>
              </ul>
            </div>

            {/* Langue et Réseaux */}
            <div>
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                {language === 'fr' ? 'Langue' : language === 'he' ? 'שפה' : 'Language'}
              </h3>
              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <Button variant={language === 'he' ? 'default' : 'outline'} size="sm" onClick={() => setLanguage('he')} className="w-full justify-start">
                    🇮🇱 עברית
                  </Button>
                  <Button variant={language === 'en' ? 'default' : 'outline'} size="sm" onClick={() => setLanguage('en')} className="w-full justify-start">
                    🇬🇧 English
                  </Button>
                  <Button variant={language === 'fr' ? 'default' : 'outline'} size="sm" onClick={() => setLanguage('fr')} className="w-full justify-start">
                    🇫🇷 Français
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-primary/10">
                  <p className="text-xs text-muted-foreground mb-2">
                    {language === 'fr' ? 'Réseaux sociaux' : language === 'he' ? 'רשתות חברתיות' : 'Social Media'}
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={handleWhatsApp} className="hover:bg-green-500/10 hover:border-green-500">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" asChild className="hover:bg-blue-500/10 hover:border-blue-500">
                      <a href="https://www.linkedin.com/in/raphael-belhassen" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ligne de séparation Desktop uniquement */}
          <div className="hidden lg:block border-t border-primary/10 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <p className="text-center" style={{ direction: 'ltr' }}>
                Copyright © 2025 - 
                <button onClick={() => setIsDialogOpen(true)} className="text-primary hover:text-primary/80 hover:underline transition-all duration-200 cursor-pointer bg-transparent border-none p-0 mx-1">
                  Raphael Belhassen
                </button>
              </p>
              
              <div className="flex gap-4">
                <a href="/privacy-policy" className="hover:text-primary transition-colors">
                  {language === 'fr' ? 'Confidentialité' : language === 'he' ? 'פרטיות' : 'Privacy'}
                </a>
                <a href="/accessibility-statement" className="hover:text-primary transition-colors">
                  {language === 'fr' ? 'Accessibilité' : language === 'he' ? 'נגישות' : 'Accessibility'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              {language === 'fr' ? 'Contact' : language === 'he' ? 'צור קשר' : 'Contact'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'fr' ? 'Nom' : language === 'he' ? 'שם' : 'Name'}
                </p>
                <p className="font-semibold">Raphael Belhassen</p>
              </div>
            </div>
            
            <a href="mailto:contact@zyflows.com" className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="font-semibold">contact@zyflows.com</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/raphael-belhassen" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
              <Linkedin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">LinkedIn</p>
                <p className="font-semibold">linkedin.com/in/raphael-belhassen</p>
              </div>
            </a>

            <a href="tel:+972584229255" className={`flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors ${language === 'he' ? 'flex-row-reverse' : ''}`}>
              <Phone className="h-5 w-5 text-primary" />
              <div className={language === 'he' ? 'text-right' : ''}>
                <p className="text-sm font-medium text-muted-foreground">
                  {language === 'fr' ? 'Téléphone' : language === 'he' ? 'טלפון' : 'Phone'}
                </p>
                <p className="font-semibold" style={{ direction: 'ltr' }}>+972 58 422 9255</p>
              </div>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>;
};
export default Footer;