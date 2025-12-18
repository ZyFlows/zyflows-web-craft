
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Code2, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroTech from "@/assets/hero-tech.jpg";
import OptimizedImage from "@/components/ui/optimized-image";

const Hero = () => {
  const { t, language } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppConsultation = () => {
    const phoneNumber = "972584229255";
    const message = language === 'fr' 
      ? "📞 Bonjour ! Je souhaite réserver une consultation gratuite pour discuter de mon projet. Quand êtes-vous disponible ?"
      : language === 'he'
      ? "📞 שלום! אני מעוניין לקבוע פגישת ייעוץ חינם כדי לדבר על הפרויקט שלי. מתי אתם פנויים?"
      : "📞 Hello! I would like to book a free consultation to discuss my project. When are you available?";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section 
      id="home" 
      className={`min-h-screen flex items-center relative overflow-hidden pt-20 bg-background ${language === 'he' ? 'rtl' : ''}`}
      aria-label={t('hero.section_label') || "Section d'accueil"}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent z-10" />
      
      {/* Subtle floating elements */}
      <div 
        className={`absolute top-32 opacity-20 animate-float ${language === 'he' ? 'hero-floating-left' : 'left-10'}`}
        aria-hidden="true"
      >
        <Code2 className="h-6 w-6 text-primary" />
      </div>
      <div 
        className={`absolute top-48 opacity-20 animate-float ${language === 'he' ? 'hero-floating-right' : 'right-20'}`} 
        style={{ animationDelay: '1s' }}
        aria-hidden="true"
      >
        <Zap className="h-5 w-5 text-primary" />
      </div>
      <div 
        className={`absolute bottom-48 opacity-20 animate-float ${language === 'he' ? 'hero-floating-right' : 'left-20'}`} 
        style={{ animationDelay: '2s' }}
        aria-hidden="true"
      >
        <Sparkles className="h-8 w-8 text-primary" />
      </div>

      <div className="container mx-auto px-4 z-20 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in-up">
            <Sparkles className={`h-4 w-4 text-primary ${language === 'he' ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium text-foreground">
              {language === 'fr' ? 'Agence IA & Automatisation' : language === 'he' ? 'סוכנות AI ואוטומציה' : 'AI & Automation Agency'}
            </span>
          </div>

          {/* Main title - Clean Typography */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up leading-tight tracking-tight" style={{ animationDelay: '0.1s' }}>
            <span className="text-foreground block">
              {language === 'fr' ? 'Automatisez.' : language === 'he' ? 'אוטומציה.' : 'Automate.'}
            </span>
            <span className="text-primary block">
              {language === 'fr' ? 'Innovez.' : language === 'he' ? 'חדשנות.' : 'Innovate.'}
            </span>
            <span className="text-foreground block">
              {language === 'fr' ? 'Évoluez.' : language === 'he' ? 'התפתחות.' : 'Elevate.'}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {language === 'fr'
              ? 'Nous créons des automatisations intelligentes, des chatbots IA et des solutions digitales qui vous font gagner du temps et développent votre entreprise.'
              : language === 'he'
              ? 'אנחנו בונים אוטומציות חכמות, צ\'אטבוטים AI ופתרונות דיגיטליים שחוסכים לך זמן ומגדילים את העסק שלך.'
              : 'We build intelligent automations, AI chatbots, and digital solutions that save you time and scale your business.'
            }
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up`} style={{ animationDelay: '0.3s' }}>
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground text-base px-8 py-6 group transition-smooth hover:bg-primary/90"
              onClick={handleWhatsAppConsultation}
            >
              <Mail className={`h-5 w-5 ${language === 'he' ? 'ml-2' : 'mr-2'}`} />
              {language === 'fr' ? 'Consultation Gratuite' : language === 'he' ? 'ייעוץ חינם' : 'Book Free Consultation'}
              <ArrowRight className={`h-5 w-5 transition-transform ${
                language === 'he' 
                  ? 'mr-2 group-hover:-translate-x-1' 
                  : 'ml-2 group-hover:translate-x-1'
              }`} />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="text-base px-8 py-6 transition-smooth"
              onClick={() => scrollToSection('projects')}
            >
              {language === 'fr' ? 'Voir Nos Projets' : language === 'he' ? 'הפרויקטים שלנו' : 'View Our Work'}
            </Button>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-3 gap-8 mt-16 animate-fade-in-up stats-container`} style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">{t('hero.stat1')}</div>
            </div>
            <div className="text-center border-x border-border px-4">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">99%</div>
              <div className="text-sm text-muted-foreground">{t('hero.stat2')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24h</div>
              <div className="text-sm text-muted-foreground">{t('hero.stat3')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
