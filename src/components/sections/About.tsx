
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Target, 
  Heart, 
  Zap, 
  Globe, 
  Award,
  ArrowRight,
  CheckCircle,
  Mail
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { generateEmailTemplate, openEmailClient } from "@/utils/emailTemplates";
import { emailTranslations } from '@/contexts/emailTranslations';

const About = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();

  const handleEmailContact = () => {
    const { subject, body } = generateEmailTemplate({ 
      language, 
      t, 
      type: 'contact' 
    });
    
    openEmailClient(subject, body);
    
    toast({
      title: emailTranslations[language]?.['email.send_email'] || 'Envoyer un email',
      description: emailTranslations[language]?.['email.click_below'] || 'Ouverture de votre client email...',
    });
  };

  const values = [
    {
      icon: Target,
      title: t('about.value1_title'),
      description: t('about.value1_desc'),
      color: "text-primary"
    },
    {
      icon: Heart,
      title: t('about.value2_title'),
      description: t('about.value2_desc'),
      color: "text-accent"
    },
    {
      icon: Zap,
      title: t('about.value3_title'),
      description: t('about.value3_desc'),
      color: "text-primary"
    },
    {
      icon: Globe,
      title: t('about.value4_title'),
      description: t('about.value4_desc'),
      color: "text-accent"
    }
  ];

  const achievements = [
    { number: "50+", label: t('about.achievements1'), icon: Award },
    { number: "15+", label: t('about.achievements2'), icon: Globe },
    { number: "99%", label: t('about.achievements3'), icon: Heart },
    { number: "5", label: t('about.achievements4'), icon: Target }
  ];

  const features = [
    t('about.features1'),
    t('about.features2'),
    t('about.features3'),
    t('about.features4')
  ];

  return (
    <section id="about" className={`py-20 relative overflow-hidden ${language === 'he' ? 'rtl' : ''}`}>
      {/* Background elements */}
      <div className={`absolute top-10 ${language === 'he' ? 'left-20' : 'right-20'} animate-float opacity-10`}>
        <Users className="h-32 w-32 text-primary" />
      </div>

      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6">
            <Users className={`h-4 w-4 text-primary ${language === 'he' ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{t('about.badge')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('about.title')}
          </h2>
        </div>

        {/* Histoire et mission */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className={language === 'he' ? 'order-1 lg:order-2' : 'order-2 lg:order-1'}>
            <h3 className="text-2xl font-semibold mb-6">{t('about.mission_title')}</h3>
            <p className="text-lg text-muted-foreground mb-6">
              {t('about.mission_text1')}
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              {t('about.mission_text2')}
            </p>
            
            <div className="space-y-4 mb-8">
              {features.map((item, index) => (
                <div key={index} className={`flex items-center ${language === 'he' ? 'flex-row-reverse' : ''}`}>
                  <CheckCircle className={`h-5 w-5 text-primary ${language === 'he' ? 'ml-3' : 'mr-3'}`} />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="glow-primary" onClick={handleEmailContact}>
              <Mail className={`${language === 'he' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
              {emailTranslations[language]?.['email.send_email'] || 'Envoyer un email'}
              <ArrowRight className={`${language === 'he' ? 'mr-2' : 'ml-2'} h-5 w-5`} />
            </Button>
          </div>

          <div className={language === 'he' ? 'order-2 lg:order-1' : 'order-1 lg:order-2'}>
            <div className="relative">
              <div className="glass-effect rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={index} className="text-center">
                        <IconComponent className="h-8 w-8 text-primary mx-auto mb-3" />
                        <div className="text-3xl font-bold text-primary mb-2">
                          {achievement.number}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {achievement.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Badges flottants */}
              <div className={`absolute -top-4 ${language === 'he' ? '-left-4' : '-right-4'}`}>
                <Badge className="bg-primary text-primary-foreground">
                  Crafted with Excellence 🌍
                </Badge>
              </div>
              <div className={`absolute -bottom-4 ${language === 'he' ? '-right-4' : '-left-4'}`}>
                <Badge variant="secondary">
                  Tech Innovators
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Valeurs */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-center mb-12">
            {t('about.values_title')}
          </h3>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card 
                  key={value.title}
                  className="gradient-card border-border/50 hover:border-primary/50 transition-smooth hover:scale-105 text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-full glass-effect flex items-center justify-center mx-auto mb-4 ${value.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-center">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA de contact */}
        <div className="text-center">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              {t('about.cta_title')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('about.cta_desc')}
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 justify-center ${language === 'he' ? 'sm:flex-row-reverse' : ''}`}>
              <Button size="lg" className="glow-primary" onClick={handleEmailContact}>
                <Mail className={`${language === 'he' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                {emailTranslations[language]?.['email.send_email'] || 'Envoyer un email'}
                <ArrowRight className={`${language === 'he' ? 'mr-2' : 'ml-2'} h-5 w-5`} />
              </Button>
              <Button size="lg" variant="outline" className="glass-effect border-primary/30" onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}>
                {t('about.cta_button2')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
