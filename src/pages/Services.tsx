import { Helmet } from "react-helmet-async";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Cpu, 
  Code, 
  Palette,
  Search,
  BarChart,
  Shield,
  Zap,
  Check,
  ArrowRight
} from "lucide-react";
import { generateEmailTemplate, openEmailClient } from "@/utils/emailTemplates";
import { toast } from "sonner";

const Services = () => {
  const { t, language } = useLanguage();

  const handleEmailContact = (service?: string) => {
    const { subject, body } = generateEmailTemplate({
      language,
      t,
      type: 'contact'
    });
    
    openEmailClient(subject, body);
    toast.success(t('contact.email_opened'));
  };

  const services = [
    {
      icon: Globe,
      title: t('services.web.title'),
      description: t('services.web.description'),
      features: [
        t('services.web.feature1'),
        t('services.web.feature2'),
        t('services.web.feature3'),
        t('services.web.feature4')
      ],
      color: "from-blue-500 to-cyan-500",
      price: t('services.web.price')
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
      color: "from-purple-500 to-pink-500",
      price: t('services.mobile.price')
    },
    {
      icon: ShoppingCart,
      title: t('services.ecommerce.title'),
      description: t('services.ecommerce.description'),
      features: [
        t('services.ecommerce.feature1'),
        t('services.ecommerce.feature2'),
        t('services.ecommerce.feature3'),
        t('services.ecommerce.feature4')
      ],
      color: "from-green-500 to-emerald-500",
      price: t('services.ecommerce.price')
    },
    {
      icon: Cpu,
      title: t('services.ai.title'),
      description: t('services.ai.description'),
      features: [
        t('services.ai.feature1'),
        t('services.ai.feature2'),
        t('services.ai.feature3'),
        t('services.ai.feature4')
      ],
      color: "from-orange-500 to-red-500",
      price: t('services.ai.price')
    },
    {
      icon: Code,
      title: t('services.custom.title'),
      description: t('services.custom.description'),
      features: [
        t('services.custom.feature1'),
        t('services.custom.feature2'),
        t('services.custom.feature3'),
        t('services.custom.feature4')
      ],
      color: "from-indigo-500 to-blue-500",
      price: t('services.custom.price')
    },
    {
      icon: Palette,
      title: t('services.design.title'),
      description: t('services.design.description'),
      features: [
        t('services.design.feature1'),
        t('services.design.feature2'),
        t('services.design.feature3'),
        t('services.design.feature4')
      ],
      color: "from-pink-500 to-rose-500",
      price: t('services.design.price')
    }
  ];

  const additionalServices = [
    {
      icon: Search,
      title: t('services.additional.seo.title'),
      description: t('services.additional.seo.description')
    },
    {
      icon: BarChart,
      title: t('services.additional.analytics.title'),
      description: t('services.additional.analytics.description')
    },
    {
      icon: Shield,
      title: t('services.additional.security.title'),
      description: t('services.additional.security.description')
    },
    {
      icon: Zap,
      title: t('services.additional.performance.title'),
      description: t('services.additional.performance.description')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('meta.services.title')}</title>
        <meta name="description" content={t('meta.services.description')} />
        <link rel="canonical" href="https://zyflows.lovable.app/services" />
      </Helmet>

      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 text-sm px-4 py-2">{t('services.badge')}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('services.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('services.hero.subtitle')}
            </p>
          </div>

          {/* Introduction Text */}
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              {t('services.intro.paragraph1')}
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t('services.intro.paragraph2')}
            </p>
          </div>

          {/* Main Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <h2 className="text-2xl font-bold mb-3">{service.title}</h2>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-lg font-semibold text-primary">{service.price}</span>
                  <Button 
                    size="sm"
                    onClick={() => handleEmailContact(service.title)}
                    className="group-hover:gap-3 transition-all"
                  >
                    {t('services.get_quote')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('services.additional.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                  <service.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('services.process.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((step) => (
                <Card key={step} className="p-6 text-center relative">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step}
                  </div>
                  <h3 className="text-lg font-bold mb-2">
                    {t(`services.process.step${step}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`services.process.step${step}.description`)}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-primary/10 to-accent/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('services.cta.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('services.cta.description')}
            </p>
            <Button 
              size="lg"
              onClick={() => handleEmailContact()}
              className="glow-primary"
            >
              {t('services.cta.button')}
            </Button>
          </Card>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Services;
