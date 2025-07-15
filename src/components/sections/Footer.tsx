import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Code2, 
  Zap, 
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

const Footer = () => {
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
              Restez à la pointe de l'innovation
            </h3>
            <p className="text-muted-foreground mb-8">
              Recevez nos insights tech, études de cas et conseils pour optimiser 
              votre transformation digitale. Newsletter mensuelle, 0 spam.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="votre@email.com"
                className="glass-effect border-border/50 flex-1"
              />
              <Button className="glow-primary shrink-0">
                S'abonner
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              En vous abonnant, vous acceptez notre politique de confidentialité.
            </p>
          </div>
        </div>

        {/* Main footer content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative">
                  <Code2 className="h-8 w-8 text-primary" />
                  <Zap className="h-4 w-4 text-accent absolute -top-1 -right-1" />
                </div>
                <span className="text-xl font-bold gradient-hero bg-clip-text text-transparent">
                  zyFlows
                </span>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Solutions digitales innovantes depuis Israël. Nous transformons vos idées 
                en applications performantes, sites web exceptionnels et automatisations intelligentes.
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
              <h4 className="font-semibold mb-4 text-foreground">Services</h4>
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
              <h4 className="font-semibold mb-4 text-foreground">Entreprise</h4>
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
              <h4 className="font-semibold mb-4 text-foreground">Ressources</h4>
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
              <h4 className="font-semibold mb-4 text-foreground">Légal</h4>
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
              <span>© 2024 zyFlows. Tous droits réservés.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-2">
                Made with <span className="text-red-500">♥</span> in Israel
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <Button 
                variant="ghost" 
                size="sm"
                className="hover:bg-primary/10 group"
              >
                Démarrer un projet
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