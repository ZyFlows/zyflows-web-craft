
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Github,
  Linkedin,
  Twitter,
  ArrowRight,
  Send
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const footerLinks = {
    services: [
      "Sites Web (Wix, WordPress, Shopify)",
      "Applications Sur-Mesure",
      "Automatisations (Make, Zapier, N8N)",
      "Génération de Leads Google Maps",
      "IA & GPT Personnalisés"
    ],
    company: [
      "À propos de zyFlows",
      "Notre équipe",
      "Nos valeurs",
      "Carrières",
      "Partenaires"
    ],
    resources: [
      "Blog & Actualités",
      "Guides & Tutorials",
      "Études de cas",
      "Documentation API",
      "Support technique"
    ],
    legal: [
      "Mentions légales",
      "Politique de confidentialité",
      "Conditions d'utilisation",
      "RGPD",
      "Cookies"
    ]
  };

  return (
    <footer className="relative overflow-hidden border-t border-border/50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Newsletter section */}
        <div className="py-16 border-b border-border/50">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4">
              {t('footer.newsletter_title')}
            </h3>
            <p className="text-muted-foreground mb-8">
              {t('footer.newsletter_desc')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder={t('footer.newsletter_placeholder')}
                className="glass-effect border-border/50 flex-1"
              />
              <Button className="glow-primary shrink-0">
                {t('footer.newsletter_button')}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              {t('footer.newsletter_disclaimer')}
            </p>
          </div>
        </div>

        {/* Main footer content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <img 
                  src="/lovable-uploads/da2b99fe-7ae0-4b4d-8a8d-0029ea41d97f.png" 
                  alt="zyFlows" 
                  className="h-8 w-auto"
                />
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t('footer.company_desc')}
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-accent" />
                  <span>hello@zyflows.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-accent" />
                  <span>+972 58 123 4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>Tel Aviv, Israël</span>
                </div>
              </div>
              
              {/* Social links */}
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Globe className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">{t('footer.services_title')}</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#services" 
                      className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">{t('footer.company_title')}</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#about" 
                      className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">{t('footer.resources_title')}</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">{t('footer.legal_title')}</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="py-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>{t('footer.copyright')}</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-2">
                {t('footer.made_with_love')}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <Button 
                variant="ghost" 
                size="sm"
                className="hover:bg-primary/10 group"
              >
                {t('footer.start_project')}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
