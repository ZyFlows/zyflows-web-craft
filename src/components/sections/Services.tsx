
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Smartphone, Zap, MapPin, Bot, ArrowRight, Code2, Palette, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t, language } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: Globe,
      title: t('services.web_title'),
      description: t('services.web_desc'),
      features: [t('services.feature1'), t('services.feature2'), t('services.feature3'), t('services.feature4')],
      color: "text-primary",
      delay: "0s"
    },
    {
      icon: Smartphone,
      title: t('services.app_title'),
      description: t('services.app_desc'),
      features: [t('services.feature5'), t('services.feature6'), t('services.feature7'), t('services.feature8')],
      color: "text-accent",
      delay: "0.2s"
    },
    {
      icon: Zap,
      title: t('services.automation_title'),
      description: t('services.automation_desc'),
      features: [t('services.feature9'), t('services.feature10'), t('services.feature11'), t('services.feature12')],
      color: "text-primary",
      delay: "0.4s"
    },
    {
      icon: MapPin,
      title: t('services.leads_title'),
      description: t('services.leads_desc'),
      features: [t('services.feature13'), t('services.feature14'), t('services.feature15'), t('services.feature16')],
      color: "text-accent",
      delay: "0.6s"
    },
    {
      icon: Bot,
      title: t('services.ai_title'),
      description: t('services.ai_desc'),
      features: [t('services.feature17'), t('services.feature18'), t('services.feature19'), t('services.feature20')],
      color: "text-primary",
      delay: "0.8s"
    }
  ];

  return (
    <section id="services" className={`py-12 md:py-20 relative overflow-hidden ${language === 'he' ? 'rtl' : ''}`}>
      {/* Background elements */}
      <div className={`absolute top-10 ${language === 'he' ? 'left-4 md:left-10' : 'right-4 md:right-10'} animate-float opacity-10`}>
        <Code2 className="h-16 w-16 md:h-32 md:w-32 text-primary" />
      </div>
      <div className={`absolute bottom-10 ${language === 'he' ? 'right-4 md:right-10' : 'left-4 md:left-10'} animate-float opacity-10`} style={{ animationDelay: '2s' }}>
        <Settings className="h-12 w-12 md:h-24 md:w-24 text-accent" />
      </div>

      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6">
            <Palette className={`h-4 w-4 text-primary ${language === 'he' ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{t('services.badge')}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 px-2">
            {t('services.title')}
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Grille de services */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
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
                  <CardTitle className="text-lg md:text-xl font-semibold group-hover:text-primary transition-smooth">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm md:text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className={`flex items-center text-sm text-muted-foreground ${language === 'he' ? 'flex-row-reverse justify-end' : ''}`}>
                        {language === 'he' ? (
                          <>
                            <span className="text-right text-xs md:text-sm">{feature}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mr-4 md:mr-8 flex-shrink-0" />
                          </>
                        ) : (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3 md:mr-4 flex-shrink-0" />
                            <span className="text-xs md:text-sm">{feature}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full group/btn hover:bg-primary/10 transition-smooth text-sm md:text-base"
                    onClick={() => scrollToSection('contact')}
                  >
                    {t('services.learn_more')}
                    <ArrowRight className={`${language === 'he' ? 'mr-2 group-hover/btn:-translate-x-1' : 'ml-2 group-hover/btn:translate-x-1'} h-4 w-4 transition-transform`} />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA final */}
        <div className="text-center">
          <div className="glass-effect rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">
              {t('services.cta_title')}
            </h3>
            <p className="text-muted-foreground mb-6 text-sm md:text-base px-2">
              {t('services.cta_desc')}
            </p>
            <Button 
              size="lg" 
              className="glow-primary w-full sm:w-auto"
              onClick={() => scrollToSection('contact')}
            >
              {t('services.cta_button')}
              <ArrowRight className={`${language === 'he' ? 'mr-2' : 'ml-2'} h-5 w-5`} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
