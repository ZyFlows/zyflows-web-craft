import Navigation from "@/components/ui/navigation";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Smartphone, 
  Zap, 
  MapPin, 
  Bot, 
  ArrowRight, 
  Code2, 
  Palette, 
  Settings, 
  Mail,
  CheckCircle,
  Clock,
  Users,
  TrendingUp
} from "lucide-react";

const ServicesPage = () => {
  const { t, language } = useLanguage();

  const handleWhatsAppContact = (serviceName?: string) => {
    const phoneNumber = "972584229255";
    const serviceText = serviceName ? ` concernant ${serviceName}` : '';
    const message = language === 'fr' 
      ? `💬 Bonjour ! Je souhaite discuter de mes besoins${serviceText}. Pouvons-nous organiser un appel ?`
      : language === 'he'
      ? `💬 שלום! אני מעוניין לדבר על הצרכים שלי. נוכל לתאם שיחה?`
      : `💬 Hello! I would like to discuss my needs${serviceName ? ` regarding ${serviceName}` : ''}. Can we schedule a call?`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const metaTags = {
    fr: {
      title: "Services Zyflows – Automatisation IA, Chatbots WhatsApp, Sites Web, Intégrations Make & n8n",
      description: "Découvrez nos services : automatisations IA qui économisent 5-20h/semaine, chatbots WhatsApp 24/7, sites web haute conversion, intégrations Make & n8n. Réservez votre appel gratuit."
    },
    en: {
      title: "Zyflows Services – AI Automation, WhatsApp Chatbots, Websites, Make & n8n Integrations",
      description: "Explore our services: AI automations saving 5-20h/week, 24/7 WhatsApp chatbots, high-conversion websites, Make & n8n integrations. Book your free call."
    },
    he: {
      title: "שירותי Zyflows – אוטומציה AI, צ'אטבוטים WhatsApp, אתרים, אינטגרציות Make & n8n",
      description: "גלו את השירותים שלנו: אוטומציות AI שחוסכות 5-20 שעות בשבוע, צ'אטבוטים 24/7, אתרים עם המרה גבוהה, אינטגרציות Make & n8n."
    }
  };

  const meta = metaTags[language];

  const services = [
    {
      id: "automatisations-ia",
      icon: Zap,
      title: language === 'fr' ? 'Automatisations IA' : language === 'he' ? 'אוטומציות AI' : 'AI Automations',
      whoFor: language === 'fr' 
        ? 'Entreprises qui perdent des heures sur des tâches répétitives'
        : language === 'he' 
        ? 'עסקים שמבזבזים שעות על משימות חוזרות'
        : 'Businesses losing hours on repetitive tasks',
      problem: language === 'fr'
        ? 'Processus manuels ralentissant la croissance et provoquant des erreurs coûteuses'
        : language === 'he'
        ? 'תהליכים ידניים שמאטים צמיחה וגורמים לטעויות יקרות'
        : 'Manual processes slowing growth and causing costly errors',
      results: [
        language === 'fr' ? 'Économisez 5–20 heures/semaine' : language === 'he' ? 'חסכו 5-20 שעות בשבוע' : 'Save 5-20 hours/week',
        language === 'fr' ? 'Éliminez les erreurs manuelles' : language === 'he' ? 'הסירו טעויות ידניות' : 'Eliminate manual errors',
        language === 'fr' ? 'Scalez sans embaucher' : language === 'he' ? 'צמחו בלי לגייס' : 'Scale without hiring',
        language === 'fr' ? 'ROI dès le 1er mois' : language === 'he' ? 'החזר השקעה מהחודש הראשון' : 'ROI from month 1'
      ],
      gradient: "from-primary to-accent"
    },
    {
      id: "chatbots-whatsapp",
      icon: Smartphone,
      title: language === 'fr' ? 'Chatbots WhatsApp' : language === 'he' ? 'צ\'אטבוטים WhatsApp' : 'WhatsApp Chatbots',
      whoFor: language === 'fr' 
        ? 'Entreprises voulant répondre instantanément 24/7'
        : language === 'he' 
        ? 'עסקים שרוצים לענות מיד 24/7'
        : 'Businesses wanting instant 24/7 responses',
      problem: language === 'fr'
        ? 'Chaque minute de délai est une vente potentielle perdue'
        : language === 'he'
        ? 'כל דקה של עיכוב היא מכירה פוטנציאלית שאבדה'
        : 'Every minute of delay is a potential lost sale',
      results: [
        language === 'fr' ? 'Réponses instantanées 24/7' : language === 'he' ? 'תשובות מיידיות 24/7' : 'Instant 24/7 responses',
        language === 'fr' ? '90% de questions résolues automatiquement' : language === 'he' ? '90% מהשאלות נפתרות אוטומטית' : '90% questions resolved automatically',
        language === 'fr' ? '+30% de conversions' : language === 'he' ? '+30% המרות' : '+30% conversions',
        language === 'fr' ? 'Satisfaction client améliorée' : language === 'he' ? 'שביעות רצון לקוחות משופרת' : 'Improved customer satisfaction'
      ],
      gradient: "from-accent to-primary"
    },
    {
      id: "sites-web",
      icon: Globe,
      title: language === 'fr' ? 'Sites Web & Landing Pages' : language === 'he' ? 'אתרים ודפי נחיתה' : 'Websites & Landing Pages',
      whoFor: language === 'fr' 
        ? 'Entreprises voulant une présence en ligne professionnelle qui convertit'
        : language === 'he' 
        ? 'עסקים שרוצים נוכחות מקוונת מקצועית שממירה'
        : 'Businesses wanting a professional online presence that converts',
      problem: language === 'fr'
        ? 'Un site lent ou mal conçu fait fuir les visiteurs et nuit à la crédibilité'
        : language === 'he'
        ? 'אתר איטי או שתכנון לקוי מרחיק מבקרים ופוגע באמינות'
        : 'A slow or poorly designed site drives away visitors and hurts credibility',
      results: [
        language === 'fr' ? 'Sites ultra-rapides (< 2s)' : language === 'he' ? 'אתרים מהירים במיוחד (< 2s)' : 'Ultra-fast sites (< 2s)',
        language === 'fr' ? 'Optimisation SEO complète' : language === 'he' ? 'אופטימיזציה מלאה ל-SEO' : 'Complete SEO optimization',
        language === 'fr' ? 'Design responsive parfait' : language === 'he' ? 'עיצוב רספונסיבי מושלם' : 'Perfect responsive design',
        language === 'fr' ? 'Taux de conversion optimisés' : language === 'he' ? 'שיעורי המרה אופטימליים' : 'Optimized conversion rates'
      ],
      gradient: "from-primary to-accent"
    },
    {
      id: "integrations-make-n8n",
      icon: Settings,
      title: language === 'fr' ? 'Intégrations Make & n8n' : language === 'he' ? 'אינטגרציות Make & n8n' : 'Make & n8n Integrations',
      whoFor: language === 'fr' 
        ? 'Entreprises utilisant plusieurs outils qui ne communiquent pas'
        : language === 'he' 
        ? 'עסקים שמשתמשים בכלים מרובים שלא מתקשרים'
        : 'Businesses using multiple tools that don\'t communicate',
      problem: language === 'fr'
        ? 'Copier-coller des données entre apps est une perte de temps et source d\'erreurs'
        : language === 'he'
        ? 'העתקה-הדבקה של נתונים בין אפליקציות זה בזבוז זמן ומקור לטעויות'
        : 'Copy-pasting data between apps wastes time and causes errors',
      results: [
        language === 'fr' ? 'Outils connectés intelligemment' : language === 'he' ? 'כלים מחוברים בחוכמה' : 'Smartly connected tools',
        language === 'fr' ? 'Workflows automatisés de bout en bout' : language === 'he' ? 'תהליכי עבודה אוטומטיים מקצה לקצה' : 'End-to-end automated workflows',
        language === 'fr' ? 'Synchronisation temps réel' : language === 'he' ? 'סנכרון בזמן אמת' : 'Real-time synchronization',
        language === 'fr' ? 'Productivité ×3' : language === 'he' ? 'פרודוקטיביות ×3' : 'Productivity ×3'
      ],
      gradient: "from-accent to-primary"
    },
    {
      id: "generation-leads",
      icon: MapPin,
      title: t('services.leads_title'),
      whoFor: language === 'fr' 
        ? 'Entreprises B2B cherchant des prospects qualifiés'
        : language === 'he' 
        ? 'עסקי B2B שמחפשים לידים מוסמכים'
        : 'B2B businesses looking for qualified leads',
      problem: language === 'fr'
        ? 'Trouver des prospects manuellement prend trop de temps'
        : language === 'he'
        ? 'למצוא לידים ידנית לוקח יותר מדי זמן'
        : 'Finding prospects manually takes too much time',
      results: [
        language === 'fr' ? 'Ciblage géographique précis' : language === 'he' ? 'מיקוד גאוגרפי מדויק' : 'Precise geographic targeting',
        language === 'fr' ? 'Données qualifiées automatiquement' : language === 'he' ? 'נתונים מוסמכים אוטומטית' : 'Automatically qualified data',
        language === 'fr' ? 'Export vers votre CRM' : language === 'he' ? 'יצוא ל-CRM שלכם' : 'Export to your CRM',
        language === 'fr' ? '500+ leads/mois possibles' : language === 'he' ? '500+ לידים/חודש אפשריים' : '500+ leads/month possible'
      ],
      gradient: "from-primary to-accent"
    },
    {
      id: "ia-agents",
      icon: Bot,
      title: t('services.ai_title'),
      whoFor: language === 'fr' 
        ? 'Entreprises voulant augmenter leur productivité avec l\'IA'
        : language === 'he' 
        ? 'עסקים שרוצים להגדיל פרודוקטיביות עם AI'
        : 'Businesses wanting to boost productivity with AI',
      problem: language === 'fr'
        ? 'Les tâches complexes nécessitent trop de temps humain'
        : language === 'he'
        ? 'משימות מורכבות דורשות יותר מדי זמן אנושי'
        : 'Complex tasks require too much human time',
      results: [
        language === 'fr' ? 'GPT personnalisés pour votre métier' : language === 'he' ? 'GPT מותאם לעסק שלכם' : 'Custom GPTs for your business',
        language === 'fr' ? 'Agents IA autonomes' : language === 'he' ? 'סוכני AI אוטונומיים' : 'Autonomous AI agents',
        language === 'fr' ? 'Analyse automatisée des données' : language === 'he' ? 'ניתוח נתונים אוטומטי' : 'Automated data analysis',
        language === 'fr' ? 'Formation et support inclus' : language === 'he' ? 'הדרכה ותמיכה כלולים' : 'Training and support included'
      ],
      gradient: "from-accent to-primary"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": meta.title,
    "description": meta.description,
    "url": "https://zyflows.com/services",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": services.map((service, index) => ({
        "@type": "Service",
        "position": index + 1,
        "name": service.title,
        "description": service.problem,
        "provider": {
          "@type": "Organization",
          "name": "zyFlows"
        }
      }))
    }
  };

  const skipLinkText = language === 'fr' 
    ? 'Aller au contenu principal' 
    : language === 'he' 
    ? 'דלג לתוכן הראשי' 
    : 'Skip to main content';

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <html lang={language} dir={language === 'he' ? 'rtl' : 'ltr'} />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href="https://zyflows.com/services" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content="https://zyflows.com/services" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <a href="#main-content" className="skip-link" aria-label={skipLinkText}>
        {skipLinkText}
      </a>
      
      <header>
        <Navigation />
      </header>
      
      <main id="main-content" role="main" className={`pt-20 ${language === 'he' ? 'rtl' : ''}`}>
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className={`absolute top-10 ${language === 'he' ? 'left-10' : 'right-10'} animate-float opacity-10`}>
            <Code2 className="h-32 w-32 text-primary" />
          </div>
          
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6">
                <Palette className={`h-4 w-4 text-primary ${language === 'he' ? 'ml-2' : 'mr-2'}`} />
                <span className="text-sm font-medium">{t('services.badge')}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {t('services.title')}
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('services.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Services détaillés */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="space-y-20">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <article 
                    key={service.id} 
                    id={service.id}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6`}>
                        <IconComponent className="h-8 w-8 text-primary-foreground" />
                      </div>
                      
                      <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            {language === 'fr' ? 'Pour qui ?' : language === 'he' ? 'למי זה מתאים?' : 'Who is this for?'}
                          </h3>
                          <p className="text-muted-foreground">{service.whoFor}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-accent mb-2 flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            {language === 'fr' ? 'Le problème' : language === 'he' ? 'הבעיה' : 'The problem'}
                          </h3>
                          <p className="text-muted-foreground">{service.problem}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-3 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            {language === 'fr' ? 'Résultats attendus' : language === 'he' ? 'תוצאות צפויות' : 'Expected results'}
                          </h3>
                          <ul className="space-y-2">
                            {service.results.map((result, idx) => (
                              <li key={idx} className={`flex items-center gap-3 ${language === 'he' ? 'flex-row-reverse' : ''}`}>
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <span className="text-foreground">{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <Button 
                          size="lg" 
                          className="glow-primary mt-4"
                          onClick={() => handleWhatsAppContact(service.title)}
                        >
                          <Mail className={`${language === 'he' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                          {language === 'fr' ? 'En savoir plus' : language === 'he' ? 'למידע נוסף' : 'Learn more'}
                          <ArrowRight className={`${language === 'he' ? 'mr-2' : 'ml-2'} h-5 w-5`} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                      <Card className="gradient-card border-border/50 p-8">
                        <div className="text-center">
                          <IconComponent className="h-24 w-24 text-primary mx-auto mb-6 opacity-20" />
                          <div className="grid grid-cols-2 gap-4">
                            {service.results.map((result, idx) => (
                              <div key={idx} className="glass-effect p-4 rounded-lg">
                                <CheckCircle className="h-6 w-6 text-primary mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground">{result}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">
                  {t('services.cta_title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('services.cta_desc')}
                </p>
                <Button 
                  size="lg" 
                  className="glow-primary"
                  onClick={() => handleWhatsAppContact()}
                >
                  <Mail className={`${language === 'he' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {language === 'fr' ? 'Réserver un appel gratuit' : language === 'he' ? 'לקבוע שיחה חינם' : 'Book a Free Call'}
                  <ArrowRight className={`${language === 'he' ? 'mr-2' : 'ml-2'} h-5 w-5`} />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ServicesPage;
