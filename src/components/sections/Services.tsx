import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Smartphone, 
  Zap, 
  MapPin, 
  Bot, 
  ArrowRight,
  Code2,
  Palette,
  Settings
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: "Sites Web Professionnels",
      description: "Création de sites performants sur Wix, WordPress, Shopify et Framer avec design moderne et optimisation SEO.",
      features: ["Design responsive", "Optimisation SEO", "Performance optimale", "Interface intuitive"],
      color: "text-primary",
      delay: "0s"
    },
    {
      icon: Smartphone,
      title: "Applications Sur-Mesure",
      description: "Développement d'applications web et mobile personnalisées qui répondent exactement à vos besoins métier.",
      features: ["Architecture scalable", "API robustes", "UX/UI soignée", "Maintenance incluse"],
      color: "text-accent",
      delay: "0.2s"
    },
    {
      icon: Zap,
      title: "Automatisations Intelligentes",
      description: "Optimisez vos processus avec Make, Zapier, N8N. Connectez vos outils et gagnez un temps précieux.",
      features: ["Workflows personnalisés", "Intégrations multiples", "Monitoring avancé", "ROI mesurable"],
      color: "text-primary",
      delay: "0.4s"
    },
    {
      icon: MapPin,
      title: "Génération de Leads",
      description: "Exploitez l'API Google Maps pour identifier et cibler vos prospects potentiels avec précision.",
      features: ["Ciblage géographique", "Données qualifiées", "Export automatique", "CRM intégré"],
      color: "text-accent",
      delay: "0.6s"
    },
    {
      icon: Bot,
      title: "IA & Agents Personnalisés",
      description: "Créez des GPT sur-mesure et des agents IA qui automatisent vos tâches et améliorent votre productivité.",
      features: ["GPT personnalisés", "Chatbots intelligents", "Analyse automatisée", "Formation incluse"],
      color: "text-primary",
      delay: "0.8s"
    }
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 right-10 animate-float opacity-10">
        <Code2 className="h-32 w-32 text-primary" />
      </div>
      <div className="absolute bottom-10 left-10 animate-float opacity-10" style={{ animationDelay: '2s' }}>
        <Settings className="h-24 w-24 text-accent" />
      </div>

      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6">
            <Palette className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium">Nos Services</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Des solutions complètes pour{" "}
            <span className="gradient-hero bg-clip-text text-transparent">
              votre transformation digitale
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            De la conception de sites web aux automatisations IA, nous maîtrisons toute la chaîne de valeur digitale 
            pour propulser votre entreprise vers l'excellence technologique.
          </p>
        </div>

        {/* Grille de services */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.title}
                className="gradient-card border-border/50 hover:border-primary/50 transition-smooth hover:scale-105 group animate-fade-in-up"
                style={{ animationDelay: service.delay }}
              >
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg glass-effect flex items-center justify-center mb-4 ${service.color} group-hover:glow-primary transition-smooth`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-smooth">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full group/btn hover:bg-primary/10 transition-smooth"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA final */}
        <div className="text-center">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              Prêt à transformer votre vision en réalité ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Discutons de votre projet et découvrons ensemble les solutions parfaites pour votre entreprise.
            </p>
            <Button size="lg" className="glow-primary">
              Planifier un appel gratuit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;