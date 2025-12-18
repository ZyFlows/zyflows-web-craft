import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from 'react-helmet-async';
import { 
  Users, 
  Target, 
  Heart, 
  Zap, 
  Globe, 
  Award,
  ArrowRight,
  CheckCircle,
  Mail,
  Bot,
  Database,
  Link2
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t, language } = useLanguage();

  const handleWhatsAppContact = () => {
    const phoneNumber = "972584229255";
    const message = language === 'fr' 
      ? "👋 Bonjour ! Je souhaite discuter de mon projet avec vous. Pouvons-nous organiser un appel ?"
      : language === 'he'
      ? "👋 שלום! אני מעוניין לדבר על הפרויקט שלי. האם נוכל לתאם שיחה?"
      : "👋 Hello! I'd like to discuss my project with you. Can we schedule a call?";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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

  const pillars = [
    {
      icon: Link2,
      title: language === 'fr' ? "Connexion d'applications (API)" : language === 'he' ? "חיבור אפליקציות (API)" : "Application Connection (API)",
      description: language === 'fr' 
        ? "Pour fluidifier vos échanges de données entre CRM, ERP et outils marketing."
        : language === 'he'
        ? "לייעול העברת הנתונים בין CRM, ERP וכלי שיווק."
        : "Streamline data exchange between CRM, ERP and marketing tools."
    },
    {
      icon: Bot,
      title: language === 'fr' ? "Agents IA & Chatbots" : language === 'he' ? "סוכני AI וצ'אטבוטים" : "AI Agents & Chatbots",
      description: language === 'fr'
        ? "Pour automatiser votre service client et qualifier vos leads 24/7."
        : language === 'he'
        ? "לאוטומציה של שירות הלקוחות שלך וסינון לידים 24/7."
        : "Automate customer service and qualify leads 24/7."
    },
    {
      icon: Database,
      title: language === 'fr' ? "Structuration de données" : language === 'he' ? "מבנה נתונים" : "Data Structuring",
      description: language === 'fr'
        ? "Pour bâtir des processus durables qui soutiennent votre croissance."
        : language === 'he'
        ? "לבניית תהליכים ברי קיימא שתומכים בצמיחה שלך."
        : "Build sustainable processes that support your growth."
    }
  ];

  // JSON-LD structured data for SEO/AIO
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Raphaël",
    "jobTitle": language === 'fr' 
      ? "Consultant IA & Architecte d'Automatisations" 
      : language === 'he'
      ? "יועץ AI ואדריכל אוטומציות"
      : "AI Consultant & Automation Architect",
    "url": "https://zyflows.com",
    "worksFor": {
      "@type": "Organization",
      "name": "Zyflows",
      "url": "https://zyflows.com"
    },
    "description": language === 'fr'
      ? "Expert en automatisation (Make, n8n) et création d'agents IA pour les entreprises. Spécialisé dans la transformation digitale et l'optimisation des processus métiers."
      : language === 'he'
      ? "מומחה באוטומציה (Make, n8n) ויצירת סוכני AI לעסקים. מתמחה בטרנספורמציה דיגיטלית ואופטימיזציה של תהליכים עסקיים."
      : "Expert in automation (Make, n8n) and AI agent creation for businesses. Specialized in digital transformation and business process optimization.",
    "knowsAbout": [
      "Artificial Intelligence",
      "Automation",
      "Make (Integromat)",
      "n8n",
      "Business Process Automation",
      "Web Development"
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "France"
      },
      {
        "@type": "Country",
        "name": "Israel"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(personJsonLd)}
        </script>
      </Helmet>
      
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
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'fr' 
                ? "Raphaël – Consultant IA & Architecte d'Automatisations (Make / n8n)"
                : language === 'he'
                ? "רפאל – יועץ AI ואדריכל אוטומציות (Make / n8n)"
                : "Raphaël – AI Consultant & Automation Architect (Make / n8n)"}
            </h1>
            
            <h2 className="text-xl md:text-2xl text-primary font-semibold mb-4">
              {language === 'fr'
                ? "Fondateur de Zyflows – Transformez vos processus manuels en systèmes intelligents."
                : language === 'he'
                ? "מייסד Zyflows – הפכו את התהליכים הידניים שלכם למערכות חכמות."
                : "Founder of Zyflows – Transform your manual processes into intelligent systems."}
            </h2>
          </div>

          {/* Histoire et mission - Contenu principal */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
            <div className={language === 'he' ? 'order-2 lg:order-1' : 'order-1 lg:order-2'}>
              <p className="text-lg text-muted-foreground mb-6">
                {language === 'fr'
                  ? "Je m'appelle Raphaël, fondateur de l'agence Zyflows. Nous vivons une époque où la technologie évolue vite. Trop d'entreprises finissent par se noyer sous les tâches administratives et la gestion de données éparses. Ma mission est de changer cette dynamique par la transformation digitale."
                  : language === 'he'
                  ? "שמי רפאל, מייסד סוכנות Zyflows. אנחנו חיים בתקופה שבה הטכנולוגיה מתפתחת מהר. יותר מדי עסקים נטבעים תחת משימות אדמיניסטרטיביות וניהול נתונים מפוזרים. המשימה שלי היא לשנות את הדינמיקה הזו דרך טרנספורמציה דיגיטלית."
                  : "My name is Raphaël, founder of Zyflows agency. We live in an era where technology evolves fast. Too many businesses end up drowning in administrative tasks and scattered data management. My mission is to change this dynamic through digital transformation."}
              </p>
              
              <p className="text-lg text-muted-foreground mb-6">
                {language === 'fr'
                  ? <>En tant que <strong>Consultant IA</strong> et expert en <strong>automatisation des processus (BPA)</strong>, je ne me contente pas d'installer des logiciels. Je conçois des <strong>écosystèmes digitaux sur-mesure</strong> utilisant la puissance de l'<strong>Intelligence Artificielle</strong>, de <strong>Make</strong> et de <strong>n8n</strong>.</>
                  : language === 'he'
                  ? <>כ<strong>יועץ AI</strong> ומומחה ב<strong>אוטומציה של תהליכים עסקיים (BPA)</strong>, אני לא מסתפק בהתקנת תוכנות. אני מעצב <strong>אקוסיסטמות דיגיטליות מותאמות אישית</strong> תוך שימוש בכוח של <strong>בינה מלאכותית</strong>, <strong>Make</strong> ו-<strong>n8n</strong>.</>
                  : <>As an <strong>AI Consultant</strong> and <strong>Business Process Automation (BPA)</strong> expert, I don't just install software. I design <strong>custom digital ecosystems</strong> using the power of <strong>Artificial Intelligence</strong>, <strong>Make</strong> and <strong>n8n</strong>.</>}
              </p>
              
              <p className="text-lg text-muted-foreground mb-8">
                {language === 'fr'
                  ? "Mon approche d'architecte vise à redonner aux dirigeants leur ressource la plus précieuse : le temps. J'interviens sur trois piliers stratégiques :"
                  : language === 'he'
                  ? "הגישה האדריכלית שלי שואפת להחזיר למנהלים את המשאב היקר ביותר שלהם: הזמן. אני פועל על שלושה עמודי תווך אסטרטגיים:"
                  : "My architect approach aims to give executives back their most precious resource: time. I work on three strategic pillars:"}
              </p>

              {/* Trois piliers stratégiques */}
              <div className="space-y-4 mb-8">
                {pillars.map((pillar, index) => {
                  const IconComponent = pillar.icon;
                  return (
                    <div key={index} className={`flex items-start gap-4 p-4 rounded-lg glass-effect ${language === 'he' ? 'flex-row-reverse text-right' : ''}`}>
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{pillar.title}</h3>
                        <p className="text-sm text-muted-foreground">{pillar.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-lg font-semibold text-primary mb-8">
                {language === 'fr'
                  ? "Mon objectif ? Remplacer des centaines d'heures de travail manuel par des flux automatisés, invisibles et efficaces, garantissant un ROI immédiat."
                  : language === 'he'
                  ? "המטרה שלי? להחליף מאות שעות של עבודה ידנית בזרימות אוטומטיות, בלתי נראות ויעילות, שמבטיחות ROI מיידי."
                  : "My goal? Replace hundreds of hours of manual work with automated, invisible and efficient workflows, guaranteeing immediate ROI."}
              </p>

              <Button size="lg" className="glow-primary" onClick={handleWhatsAppContact}>
                <Mail className={`${language === 'he' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                {language === 'fr' ? 'Discuter de mon projet' : language === 'he' ? 'לדבר על הפרויקט שלי' : 'Discuss My Project'}
                <ArrowRight className={`${language === 'he' ? 'mr-2' : 'ml-2'} h-5 w-5`} />
              </Button>
            </div>

            <div className={language === 'he' ? 'order-1 lg:order-2' : 'order-2 lg:order-1'}>
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
                    Make & n8n Expert 🚀
                  </Badge>
                </div>
                <div className={`absolute -bottom-4 ${language === 'he' ? '-right-4' : '-left-4'}`}>
                  <Badge variant="secondary">
                    France & Israël 🌍
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
                <Button size="lg" className="glow-primary" onClick={handleWhatsAppContact}>
                  <Mail className={`${language === 'he' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {language === 'fr' ? 'Démarrer mon projet' : language === 'he' ? 'להתחיל את הפרויקט שלי' : 'Start My Project'}
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
    </>
  );
};

export default About;
