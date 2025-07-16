
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
  const { t, language } = useLanguage();

  const footerLinks = {
    services: [
      t('footer.service1'),
      t('footer.service2'),
      t('footer.service3'),
      t('footer.service4'),
      t('footer.service5')
    ],
    company: [
      t('footer.company1'),
      t('footer.company2'),
      t('footer.company3'),
      t('footer.company4'),
      t('footer.company5')
    ],
    resources: [
      t('footer.resource1'),
      t('footer.resource2'),
      t('footer.resource3'),
      t('footer.resource4'),
      t('footer.resource5')
    ],
    legal: [
      t('footer.legal1'),
      t('footer.legal2'),
      t('footer.legal3'),
      t('footer.legal4'),
      t('footer.legal5')
    ]
  };

  return (
    <footer className={`relative overflow-hidden border-t border-border/50 ${language === 'he' ? 'rtl' : ''}`}>
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
            
            <div className={`flex flex-col sm:flex-row gap-4 max-w-md mx-auto ${language === 'he' ? 'sm:flex-row-reverse' : ''}`}>
              <Input 
                type="email" 
                placeholder={t('footer.newsletter_placeholder')}
                className="glass-effect border-border/50 flex-1"
                style={{ direction: language === 'he' ? 'rtl' : 'ltr' }}
              />
              <Button className="glow-primary shrink-0">
                {t('footer.newsletter_button')}
                <Send className={`${language === 'he' ? 'mr-2' : 'ml-2'} h-4 w-4`} />
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
              <div className={`flex items-center space-x-2 mb-6 ${language === 'he' ? 'flex-row-reverse space-x-reverse' : ''}`}>
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
                <div className={`flex items-center gap-3 text-sm ${language === 'he' ? 'flex-row-reverse' : ''}`}>
                  <Mail className="h-4 w-4 text-accent" />
                  <span>zyflow.web@gmail.com</span>
                </div>
                <div className={`flex items-center gap-3 text-sm ${language === 'he' ? 'flex-row-reverse' : ''}`}>
                  <Phone className="h-4 w-4 text-accent" />
                  <span>+972 58-422-9255</span>
                </div>
                <div className={`flex items-center gap-3 text-sm ${language === 'he' ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>{t('footer.location')}</span>
                </div>
              </div>
              
              {/* Social links */}
              <div className={`flex gap-3 ${language === 'he' ? 'flex-row-reverse' : ''}`}>
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
          <div className={`flex flex-col md:flex-row items-center justify-between gap-4 ${language === 'he' ? 'md:flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-6 text-sm text-muted-foreground ${language === 'he' ? 'flex-row-reverse' : ''}`}>
              <span>{t('footer.copyright')}</span>
              <span className="hidden md:inline">•</span>
              <span className={`flex items-center gap-2 ${language === 'he' ? 'flex-row-reverse' : ''}`}>
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
                <ArrowRight className={`${language === 'he' ? 'mr-2 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'} h-4 w-4 transition-transform`} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
