
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Smartphone, Zap, MapPin, Bot, ArrowRight, Code2, Palette, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t, language } = useLanguage();

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
    <section id="services" className={`py-20 relative overflow-hidden ${language === 'he' ? 'rtl' : ''}`}>
      {/* Background elements */}
      <div className={`absolute top-10 ${language === 'he' ? 'left-10' : 'right-10'} animate-float opacity-10`}>
        <Code2 className="h-32 w-32 text-primary" />
      </div>
      <div className={`absolute bottom-10 ${language === 'he' ? 'right-10' : 'left-10'} animate-float opacity-10`} style={{ animationDelay: '2s' }}>
        <Settings className="h-24 w-24 text-accent" />
      </div>

      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6">
            <Palette className={`h-4 w-4 text-primary ${language === 'he' ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{t('services.badge')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('services.title')}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('services.subtitle')}
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
                      <li key={idx} className={`flex items-center text-sm text-muted-foreground ${language === 'he' ? 'flex-row-reverse justify-end' : ''}`}>
                        {language === 'he' ? (
                          <>
                            <span className="text-right">{feature}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-primary ml-8 flex-shrink-0" />
                          </>
                        ) : (
                          <>
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mr-4 flex-shrink-0" />
                            <span>{feature}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="ghost" className="w-full group/btn hover:bg-primary/10 transition-smooth">
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
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              {t('services.cta_title')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('services.cta_desc')}
            </p>
            <Button size="lg" className="glow-primary">
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
