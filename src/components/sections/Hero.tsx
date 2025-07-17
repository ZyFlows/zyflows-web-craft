
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Code2, Smartphone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t, language } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 ${language === 'he' ? 'rtl' : ''}`}>
      {/* Background elements */}
      <div className={`absolute top-20 ${language === 'he' ? 'left-4 md:left-10' : 'right-4 md:right-10'} animate-float opacity-10`}>
        <Code2 className="h-16 w-16 md:h-24 md:w-24 text-primary" />
      </div>
      <div className={`absolute bottom-20 ${language === 'he' ? 'right-4 md:right-10' : 'left-4 md:left-10'} animate-float opacity-10`} style={{ animationDelay: '2s' }}>
        <Smartphone className="h-12 w-12 md:h-20 md:w-20 text-accent" />
      </div>
      <div className={`absolute top-1/2 ${language === 'he' ? 'right-1/4' : 'left-1/4'} animate-float opacity-5`} style={{ animationDelay: '4s' }}>
        <Zap className="h-20 w-20 md:h-32 md:w-32 text-primary" />
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-12 md:py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6 md:mb-8">
            <Zap className={`h-4 w-4 text-primary ${language === 'he' ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{t('hero.badge')}</span>
          </div>

          {/* Titre principal */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="text-foreground">{t('hero.title_part1')}</span>
            <br />
            <span className="gradient-text">{t('hero.title_part2')}</span>
          </h1>

          {/* Sous-titre */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
            {t('hero.subtitle')}
          </p>

          {/* Boutons d'action - Stack verticalement sur mobile */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 md:mb-16">
            <Button 
              size="lg" 
              className="w-full sm:w-auto glow-primary px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
              onClick={() => scrollToSection('services')}
            >
              {t('hero.cta_primary')}
              <ArrowRight className={`${language === 'he' ? 'mr-2' : 'ml-2'} h-4 w-4 md:h-5 md:w-5`} />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-primary/20 hover:border-primary/50 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
              onClick={() => scrollToSection('projects')}
            >
              {t('hero.cta_secondary')}
            </Button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm md:text-base text-muted-foreground">{t('hero.stat1')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-accent mb-2">99%</div>
              <div className="text-sm md:text-base text-muted-foreground">{t('hero.stat2')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm md:text-base text-muted-foreground">{t('hero.stat3')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de défilement */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
