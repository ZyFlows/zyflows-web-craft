import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Code2, Mail, Clock, Bot, TrendingUp, CheckCircle2 } from "lucide-react";
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
      ? "📞 Bonjour ! Je souhaite réserver une consultation gratuite de 20 minutes pour discuter de mon projet. Quand êtes-vous disponible ?"
      : language === 'he'
      ? "📞 שלום! אני מעוניין לקבוע פגישת ייעוץ חינם של 20 דקות כדי לדבר על הפרויקט שלי. מתי אתם פנויים?"
      : "📞 Hello! I would like to book a free 20-minute consultation to discuss my project. When are you available?";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Results section data
  const results = [
    {
      icon: Clock,
      text: language === 'fr' 
        ? 'Les automatisations réduisent le travail manuel de 5 à 20 heures par semaine'
        : language === 'he'
        ? 'אוטומציות מפחיתות עבודה ידנית ב-5 עד 20 שעות בשבוע'
        : 'Automations reduce manual work by 5-20 hours per week'
    },
    {
      icon: Bot,
      text: language === 'fr'
        ? 'Les chatbots IA répondent instantanément 24 heures sur 24'
        : language === 'he'
        ? 'צ\'אטבוטים AI עונים מיידית 24 שעות ביממה'
        : 'AI chatbots answer instantly 24 hours a day'
    },
    {
      icon: TrendingUp,
      text: language === 'fr'
        ? 'Sites web optimisés pour des taux de conversion élevés'
        : language === 'he'
        ? 'אתרים מותאמים לשיעורי המרה גבוהים'
        : 'Websites optimized for high conversion rates'
    }
  ];

  return (
    <section 
      id="home" 
      className={`min-h-screen flex items-center relative overflow-hidden pt-20 ${language === 'he' ? 'rtl' : ''}`}
      aria-label={language === 'fr' ? "Section d'accueil principale" : language === 'he' ? "אזור ראשי של עמוד הבית" : "Main homepage section"}
    >
      {/* Background image optimized for LCP */}
      <OptimizedImage
        src={heroTech}
        alt={language === 'fr' 
          ? "Technologie moderne et innovation digitale - Automatisations IA et développement web" 
          : language === 'he'
          ? "טכנולוגיה מודרנית וחדשנות דיגיטלית - אוטומציות AI ופיתוח אתרים"
          : "Modern technology and digital innovation - AI automations and web development"}
        width={1920}
        height={1080}
        priority={true}
        className="absolute inset-0 z-0 w-full h-full object-cover opacity-20"
        sizes="100vw"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/20 z-10" aria-hidden="true" />
      
      {/* Floating elements - Decorative */}
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
            <Sparkles className={`h-4 w-4 text-accent ${language === 'he' ? 'ml-2' : 'mr-2'}`} aria-hidden="true" />
            <span className="text-sm font-medium">
              {language === 'fr' ? 'Agence IA & Automatisation' : language === 'he' ? 'סוכנות AI ואוטומציה' : 'AI & Automation Agency'}
            </span>
          </div>

          {/* Main H1 - SEO Optimized */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up leading-tight" style={{ animationDelay: '0.2s' }}>
            <span className="gradient-text">
              {language === 'fr' 
                ? 'Automatisations, Sites Web et Solutions IA pour Entreprises' 
                : language === 'he' 
                ? 'אוטומציות, אתרים ופתרונות AI לעסקים' 
                : 'Automations, Websites and AI Solutions for Businesses'}
            </span>
          </h1>

          {/* Subtitle - Clear value proposition */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {language === 'fr'
              ? 'Construisez des systèmes intelligents qui économisent du temps, réduisent la charge de travail et accélèrent votre croissance.'
              : language === 'he'
              ? 'בנו מערכות חכמות שחוסכות זמן, מפחיתות עומס עבודה ומאיצות את הצמיחה שלכם.'
              : 'Build smart systems that save time, reduce workload and boost growth.'
            }
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up mb-12`} style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-primary text-white text-base sm:text-lg px-6 sm:px-8 py-6 group transition-smooth hover:scale-105 glow-primary"
              onClick={handleWhatsAppConsultation}
              aria-label={language === 'fr' ? 'Réserver un appel gratuit de 20 minutes' : language === 'he' ? 'לקבוע שיחה חינם של 20 דקות' : 'Book a free 20-minute call'}
            >
              <Mail className={`h-5 w-5 ${language === 'he' ? 'ml-2' : 'mr-2'}`} aria-hidden="true" />
              {language === 'fr' ? 'Réserver un Appel Gratuit' : language === 'he' ? 'לקבוע שיחה חינם' : 'Book a Free Call'}
              <ArrowRight className={`h-5 w-5 transition-transform ${
                language === 'he' 
                  ? 'mr-2 group-hover:-translate-x-1' 
                  : 'ml-2 group-hover:translate-x-1'
              }`} aria-hidden="true" />
            </Button>
            
            <Button 
              size="lg" 
              className="glass-effect border-2 border-primary/50 hover:border-primary text-base sm:text-lg px-6 sm:px-10 py-6 transition-smooth hover:scale-105 whitespace-nowrap"
              onClick={() => scrollToSection('services')}
              aria-label={language === 'fr' ? 'Voir nos services' : language === 'he' ? 'ראה את השירותים שלנו' : 'View our services'}
            >
              {language === 'fr' ? 'Voir les Services' : language === 'he' ? 'ראה שירותים' : 'View Services'}
            </Button>
          </div>

          {/* Results Section */}
          <div className="animate-fade-in-up mb-12" style={{ animationDelay: '0.7s' }}>
            <div className="glass-effect rounded-2xl p-6 max-w-2xl mx-auto">
              <h2 className="text-lg font-semibold mb-4 text-primary">
                {language === 'fr' ? 'Résultats Concrets' : language === 'he' ? 'תוצאות מוכחות' : 'Proven Results'}
              </h2>
              <ul className="space-y-3" role="list">
                {results.map((result, index) => (
                  <li 
                    key={index} 
                    className={`flex items-center gap-3 text-sm sm:text-base text-muted-foreground ${language === 'he' ? 'flex-row-reverse text-right' : 'text-left'}`}
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" aria-hidden="true" />
                    <span>{result.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-3 gap-4 sm:gap-8 animate-fade-in-up stats-container`} style={{ animationDelay: '0.8s' }}>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{t('hero.stat1')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">99%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{t('hero.stat2')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-2">24h</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{t('hero.stat3')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;