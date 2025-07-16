
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, MessageSquare, Zap, BarChart3, Code, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t, language } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      icon: Bot,
      title: t('services.chatbot.title'),
      description: t('services.chatbot.description'),
      features: [
        t('services.chatbot.feature1'),
        t('services.chatbot.feature2'),
        t('services.chatbot.feature3'),
        t('services.chatbot.feature4')
      ],
      tags: ["GPT", "IA", "Chatbot", t('services.chatbot.support')],
      stats: [
        { label: t('services.chatbot.automation'), value: "90%" },
        { label: t('services.chatbot.availability'), value: "24/7" },
        { label: t('services.chatbot.cost_reduction'), value: "60%" }
      ]
    },
    {
      icon: Smartphone,
      title: t('services.mobile.title'),
      description: t('services.mobile.description'),
      features: [
        t('services.mobile.feature1'),
        t('services.mobile.feature2'),
        t('services.mobile.feature3'),
        t('services.mobile.feature4')
      ],
      tags: ["React Native", "iOS", "Android", t('services.mobile.native')],
      stats: [
        { label: t('services.mobile.performance'), value: "95%" },
        { label: t('services.mobile.platforms'), value: "2+" },
        { label: t('services.mobile.development_time'), value: "50%" }
      ]
    },
    {
      icon: Code,
      title: t('services.web.title'),
      description: t('services.web.description'),
      features: [
        t('services.web.feature1'),
        t('services.web.feature2'),
        t('services.web.feature3'),
        t('services.web.feature4')
      ],
      tags: ["React", "Node.js", "PostgreSQL", t('services.web.cloud')],
      stats: [
        { label: t('services.web.speed'), value: "99%" },
        { label: t('services.web.security'), value: "100%" },
        { label: t('services.web.scalability'), value: "∞" }
      ]
    }
  ];

  return (
    <section id="services" className={`py-20 bg-background relative overflow-hidden ${language === 'he' ? 'rtl' : ''}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 ${language === 'he' ? 'text-right' : 'text-left'}`}>
          <Badge variant="secondary" className="mb-4 text-sm font-medium">
            {t('services.badge')}
          </Badge>
          <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 ${language === 'he' ? 'text-center' : 'text-center'}`}>
            {t('services.title')}
          </h2>
          <p className={`text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed ${language === 'he' ? 'text-center' : 'text-center'}`}>
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-primary/50 service-card ${language === 'he' ? 'text-right' : 'text-left'}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="p-8 relative z-10">
                {/* Icon & Title */}
                <div className={`flex items-center gap-4 mb-6 ${language === 'he' ? 'flex-row-reverse' : ''}`}>
                  <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Tags */}
                <div className={`flex flex-wrap gap-2 mb-6 ${language === 'he' ? 'justify-end' : 'justify-start'}`}>
                  {service.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="text-xs bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors duration-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <p className={`text-muted-foreground mb-8 leading-relaxed ${language === 'he' ? 'text-right' : 'text-left'}`}>
                  {service.description}
                </p>

                {/* Features */}
                <ul className={`space-y-3 mb-8 ${language === 'he' ? 'text-right' : 'text-left'}`}>
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-center gap-3 text-sm text-muted-foreground ${language === 'he' ? 'flex-row-reverse' : ''}`}>
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {service.stats.map((stat, statIndex) => (
                    <div key={statIndex} className={`text-center ${language === 'he' ? 'stat-item' : ''}`}>
                      <div className="text-2xl font-bold text-primary mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full group/btn bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 ${language === 'he' ? 'flex-row-reverse' : ''}`}
                  size="lg"
                >
                  <span>{t('services.cta')}</span>
                  <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${
                    language === 'he' 
                      ? 'group-hover/btn:-translate-x-1 rotate-180' 
                      : 'group-hover/btn:translate-x-1'
                  }`} />
                </Button>
              </CardContent>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-lg transition-all duration-500" />
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center ${language === 'he' ? 'text-center' : 'text-center'}`}>
          <p className="text-lg text-muted-foreground mb-6">
            {t('services.bottom_cta.text')}
          </p>
          <Button 
            size="lg" 
            className={`bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 ${language === 'he' ? 'flex-row-reverse' : ''}`}
          >
            <span>{t('services.bottom_cta.button')}</span>
            <ArrowRight className={`h-5 w-5 ml-2 transition-transform duration-300 ${
              language === 'he' 
                ? 'group-hover:-translate-x-1 rotate-180 mr-2 ml-0' 
                : 'group-hover:translate-x-1'
            }`} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
