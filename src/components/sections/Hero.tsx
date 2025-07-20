
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Code2, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { generateEmailTemplate, openEmailClient } from "@/utils/emailTemplates";
import { emailTranslations } from '@/contexts/emailTranslations';
import heroTech from "@/assets/hero-tech.jpg";

const Hero = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  return (
    <section 
      id="home" 
      className={`min-h-screen flex items-center relative overflow-hidden pt-20 ${language === 'he' ? 'rtl' : ''}`}
      aria-label={t('hero.section_label') || "Section d'accueil"}
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url(${heroTech})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        role="img"
        aria-label="Image de fond représentant la technologie"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/20 z-10" />
      
      {/* Floating elements - Decorative, hidden from screen readers */}
      <div 
        className={`absolute top-20 animate-float ${language === 'he' ? 'hero-floating-left' : 'left-10'}`}
        aria-hidden="true"
      >
        <Code2 className="h-8 w-8 text-primary/30" />
      </div>
      <div 
        className={`absolute top-40 animate-float ${language === 'he' ? 'hero-floating-right' : 'right-20'}`} 
        style={{ animationDelay: '1s' }}
        aria-hidden="true"
      >
        <Zap className="h-6 w-6 text-accent/40" />
      </div>
      <div 
        className={`absolute bottom-40 animate-float ${language === 'he' ? 'hero-floating-right' : 'left-20'}`} 
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      >
        <Sparkles className="h-10 w-10 text-primary/20" />
      </div>

      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-8 animate-fade-in-up">
            <Sparkles className={`h-4 w-4 text-primary ${language === 'he' ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{t('hero.badge')}</span>
          </div>

          {/* Main title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up`} style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="glow-primary text-lg px-8 py-6 group transition-smooth hover:scale-105"
              onClick={handleEmailContact}
            >
              <Mail className={`h-5 w-5 ${language === 'he' ? 'ml-2' : 'mr-2'}`} />
              {emailTranslations[language]?.['email.send_email'] || 'Envoyer un email'}
              <ArrowRight className={`h-5 w-5 transition-transform ${
                language === 'he' 
                  ? 'mr-2 group-hover:-translate-x-1' 
                  : 'ml-2 group-hover:translate-x-1'
              }`} />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 glass-effect border-primary/30 hover:border-primary transition-smooth hover:scale-105"
              onClick={() => scrollToSection('projects')}
            >
              {t('hero.cta_projects')}
            </Button>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-3 gap-8 mt-16 animate-fade-in-up stats-container`} style={{ animationDelay: '0.8s' }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">{t('hero.stat1')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">99%</div>
              <div className="text-sm text-muted-foreground">{t('hero.stat2')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24h</div>
              <div className="text-sm text-muted-foreground">{t('hero.stat3')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
