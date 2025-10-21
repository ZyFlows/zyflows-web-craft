import { Helmet } from "react-helmet-async";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Target, 
  Eye, 
  Heart,
  Users,
  Award,
  Globe,
  Rocket,
  Shield,
  Lightbulb,
  TrendingUp
} from "lucide-react";
import { generateEmailTemplate, openEmailClient } from "@/utils/emailTemplates";
import { toast } from "sonner";

const About = () => {
  const { t, language } = useLanguage();

  const handleEmailContact = () => {
    const { subject, body } = generateEmailTemplate({
      language,
      t,
      type: 'contact'
    });
    
    openEmailClient(subject, body);
    toast.success(t('contact.email_opened'));
  };

  const values = [
    {
      icon: Target,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: Heart,
      title: t('about.values.passion.title'),
      description: t('about.values.passion.description')
    },
    {
      icon: Users,
      title: t('about.values.collaboration.title'),
      description: t('about.values.collaboration.description')
    },
    {
      icon: Lightbulb,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    }
  ];

  const achievements = [
    {
      icon: Globe,
      number: "50+",
      label: t('about.achievements.projects')
    },
    {
      icon: Users,
      number: "30+",
      label: t('about.achievements.clients')
    },
    {
      icon: Award,
      number: "98%",
      label: t('about.achievements.satisfaction')
    },
    {
      icon: TrendingUp,
      number: "5+",
      label: t('about.achievements.years')
    }
  ];

  const team = [
    {
      icon: Rocket,
      title: t('about.team.expertise.title'),
      description: t('about.team.expertise.description')
    },
    {
      icon: Shield,
      title: t('about.team.reliability.title'),
      description: t('about.team.reliability.description')
    },
    {
      icon: Eye,
      title: t('about.team.vision.title'),
      description: t('about.team.vision.description')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('meta.about.title')}</title>
        <meta name="description" content={t('meta.about.description')} />
        <link rel="canonical" href="https://zyflows.lovable.app/about" />
      </Helmet>

      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 text-sm px-4 py-2">{t('about.badge')}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('about.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('about.hero.subtitle')}
            </p>
          </div>

          {/* Story Section */}
          <div className="max-w-4xl mx-auto mb-20">
            <Card className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                {t('about.story.title')}
              </h2>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
                <p>{t('about.story.paragraph1')}</p>
                <p>{t('about.story.paragraph2')}</p>
                <p>{t('about.story.paragraph3')}</p>
                <p>{t('about.story.paragraph4')}</p>
              </div>
            </Card>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <Card className="p-8 hover:shadow-xl transition-all duration-300">
              <Target className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-2xl font-bold mb-4">{t('about.mission.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.mission.description')}
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all duration-300">
              <Eye className="w-12 h-12 text-accent mb-4" />
              <h2 className="text-2xl font-bold mb-4">{t('about.vision.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.vision.description')}
              </p>
            </Card>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('about.values.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('about.achievements.title')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                  <achievement.icon className="w-10 h-10 text-primary mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {achievement.label}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Strengths */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('about.team.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((item, index) => (
                <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300">
                  <item.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-primary/10 to-accent/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('about.cta.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('about.cta.description')}
            </p>
            <Button 
              size="lg"
              onClick={handleEmailContact}
              className="glow-primary"
            >
              {t('about.cta.button')}
            </Button>
          </Card>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
