
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Code2, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { generateEmailTemplate, openEmailClient } from "@/utils/emailTemplates";
import { emailTranslations } from '@/contexts/emailTranslations';
import heroTech from "@/assets/hero-tech.jpg";
import OptimizedImage from "@/components/ui/optimized-image";

const Hero = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppConsultation = () => {
    const phoneNumber = "972584229255";
    const message = language === 'fr' 
      ? "Bonjour, je souhaite réserver une consultation gratuite pour discuter de mon projet."
      : language === 'he'
      ? "שלום, אני מעוניין לקבוע פגישת ייעוץ חינם כדי לדבר על הפרויקט שלי."
      : "Hello, I would like to book a free consultation to discuss my project.";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
      {/* Background image optimisée pour LCP - Élément critique pour PageSpeed */}
      <OptimizedImage
        src={heroTech}
        alt="Technologie moderne et innovation digitale - Développement web et applications mobiles"
        width={1920}
        height={1080}
        priority={true}
        className="absolute inset-0 z-0 w-full h-full object-cover opacity-20"
        sizes="100vw"
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
            <Sparkles className={`h-4 w-4 text-accent ${language === 'he' ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">
              {language === 'fr' ? 'Agence IA & Automatisation' : language === 'he' ? 'סוכנות AI ואוטומציה' : 'AI & Automation Agency'}
            </span>
          </div>

          {/* Main title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up leading-tight" style={{ animationDelay: '0.2s' }}>
            <span className="gradient-text">
              {language === 'fr' ? 'Automatisez.' : language === 'he' ? 'אוטומציה.' : 'Automate.'}
            </span>
            <br />
            <span className="gradient-text">
              {language === 'fr' ? 'Innovez.' : language === 'he' ? 'חדשנות.' : 'Innovate.'}
            </span>
            <br />
            <span className="gradient-text">
              {language === 'fr' ? 'Évoluez.' : language === 'he' ? 'התפתחות.' : 'Elevate.'}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-4xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {language === 'fr'
              ? 'Nous créons des automatisations intelligentes, des chatbots IA et des solutions digitales qui vous font gagner du temps et développent votre entreprise.'
              : language === 'he'
              ? 'אנחנו בונים אוטומציות חכמות, צ\'אטבוטים AI ופתרונות דיגיטליים שחוסכים לך זמן ומגדילים את העסק שלך.'
              : 'We build intelligent automations, AI chatbots, and digital solutions that save you time and scale your business.'
            }
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up`} style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="bg-gradient-primary text-white text-lg px-8 py-6 group transition-smooth hover:scale-105 glow-primary"
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
              className="glass-effect border-2 border-primary/50 hover:border-primary text-lg px-8 py-6 transition-smooth hover:scale-105"
              onClick={() => scrollToSection('projects')}
            >
              {language === 'fr' ? 'Voir Nos Projets' : language === 'he' ? 'ראו את הפרויקטים שלנו' : 'View Our Work'}
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
