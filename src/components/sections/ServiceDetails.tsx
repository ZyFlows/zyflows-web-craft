import { Bot, Zap, Globe, Settings, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

const ServiceDetails = () => {
  const { language } = useLanguage();

  const handleWhatsAppContact = () => {
    const phoneNumber = "972584229255";
    const message = language === 'fr' 
      ? "💬 Bonjour ! Je souhaite en savoir plus sur vos services. Pouvons-nous en discuter ?"
      : language === 'he'
      ? "💬 שלום! אני רוצה לדעת יותר על השירותים שלכם. נוכל לדבר על זה?"
      : "💬 Hello! I want to learn more about your services. Can we discuss?";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const services = [
    {
      id: 'ai-automations',
      icon: Zap,
      title: language === 'fr' ? 'Automatisations IA' : language === 'he' ? 'אוטומציות AI' : 'AI Automations',
      whoFor: language === 'fr'
        ? 'Pour les entreprises qui perdent des heures sur des tâches répétitives et manuelles.'
        : language === 'he'
        ? 'לעסקים שמבזבזים שעות על משימות חוזרות וידניות.'
        : 'For businesses losing hours on repetitive, manual tasks.',
      problem: language === 'fr'
        ? 'Les processus manuels ralentissent votre croissance, causent des erreurs et épuisent vos équipes.'
        : language === 'he'
        ? 'תהליכים ידניים מאטים את הצמיחה שלכם, גורמים לשגיאות ומשחקים את הצוותים שלכם.'
        : 'Manual processes slow your growth, cause errors and exhaust your teams.',
      results: language === 'fr'
        ? ['Économisez 5 à 20 heures par semaine', 'Éliminez les erreurs humaines', 'Scalez sans embaucher', 'ROI mesurable dès le premier mois']
        : language === 'he'
        ? ['חסכו 5 עד 20 שעות בשבוע', 'בטלו שגיאות אנושיות', 'צמחו בלי לגייס', 'החזר השקעה מהחודש הראשון']
        : ['Save 5-20 hours per week', 'Eliminate human errors', 'Scale without hiring', 'Measurable ROI from month one'],
      gradient: 'from-purple-600 to-pink-500'
    },
    {
      id: 'whatsapp-chatbots',
      icon: MessageSquare,
      title: language === 'fr' ? 'Chatbots WhatsApp' : language === 'he' ? 'צ\'אטבוטים לווטסאפ' : 'WhatsApp Chatbots',
      whoFor: language === 'fr'
        ? 'Pour les entreprises qui veulent répondre instantanément à leurs clients, 24h/24.'
        : language === 'he'
        ? 'לעסקים שרוצים לענות ללקוחות מיידית, 24/7.'
        : 'For businesses wanting to respond instantly to customers, 24/7.',
      problem: language === 'fr'
        ? 'Vos clients attendent des réponses immédiates. Chaque minute perdue est une vente potentielle ratée.'
        : language === 'he'
        ? 'הלקוחות שלכם מצפים לתגובות מיידיות. כל דקה שאבדה היא מכירה פוטנציאלית שנפספסה.'
        : 'Your customers expect immediate responses. Every lost minute is a potential missed sale.',
      results: language === 'fr'
        ? ['Réponses instantanées 24/7', '90% des questions résolues automatiquement', 'Augmentation des conversions de 30%', 'Satisfaction client améliorée']
        : language === 'he'
        ? ['תגובות מיידיות 24/7', '90% מהשאלות נפתרות אוטומטית', 'עלייה של 30% בהמרות', 'שיפור שביעות רצון לקוחות']
        : ['Instant 24/7 responses', '90% of questions resolved automatically', '30% increase in conversions', 'Improved customer satisfaction'],
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 'websites',
      icon: Globe,
      title: language === 'fr' ? 'Sites Web & Landing Pages' : language === 'he' ? 'אתרים ודפי נחיתה' : 'Websites & Landing Pages',
      whoFor: language === 'fr'
        ? 'Pour les entreprises qui veulent une présence en ligne professionnelle qui convertit.'
        : language === 'he'
        ? 'לעסקים שרוצים נוכחות אונליין מקצועית שממירה.'
        : 'For businesses wanting a professional online presence that converts.',
      problem: language === 'fr'
        ? 'Un site web lent ou mal conçu fait fuir vos visiteurs et nuit à votre crédibilité.'
        : language === 'he'
        ? 'אתר איטי או מעוצב רע מבריח מבקרים ופוגע באמינות שלכם.'
        : 'A slow or poorly designed website drives visitors away and hurts your credibility.',
      results: language === 'fr'
        ? ['Sites ultra-rapides (< 2s)', 'Optimisation SEO complète', 'Design moderne et responsive', 'Taux de conversion optimisés']
        : language === 'he'
        ? ['אתרים מהירים במיוחד (< 2 שניות)', 'אופטימיזציית SEO מלאה', 'עיצוב מודרני ורספונסיבי', 'שיעורי המרה אופטימליים']
        : ['Ultra-fast sites (< 2s)', 'Complete SEO optimization', 'Modern responsive design', 'Optimized conversion rates'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'make-integration',
      icon: Settings,
      title: language === 'fr' ? 'Intégration Make & n8n' : language === 'he' ? 'אינטגרציית Make ו-n8n' : 'Make & n8n Integration',
      whoFor: language === 'fr'
        ? 'Pour les entreprises utilisant plusieurs outils qui ne communiquent pas entre eux.'
        : language === 'he'
        ? 'לעסקים שמשתמשים בכלים מרובים שלא מתקשרים ביניהם.'
        : 'For businesses using multiple tools that don\'t communicate with each other.',
      problem: language === 'fr'
        ? 'Copier-coller des données entre applications est une perte de temps monumentale et source d\'erreurs.'
        : language === 'he'
        ? 'העתקה והדבקה של נתונים בין אפליקציות היא בזבוז זמן עצום ומקור לשגיאות.'
        : 'Copy-pasting data between apps is a monumental waste of time and error-prone.',
      results: language === 'fr'
        ? ['Tous vos outils connectés', 'Workflows automatisés de bout en bout', 'Données synchronisées en temps réel', 'Productivité multipliée par 3']
        : language === 'he'
        ? ['כל הכלים שלכם מחוברים', 'תהליכי עבודה אוטומטיים מקצה לקצה', 'נתונים מסונכרנים בזמן אמת', 'פרודוקטיביות כפול 3']
        : ['All your tools connected', 'End-to-end automated workflows', 'Real-time data sync', 'Productivity multiplied by 3'],
      gradient: 'from-orange-500 to-amber-500'
    }
  ];

  return (
    <section 
      className={`py-16 md:py-24 relative overflow-hidden ${language === 'he' ? 'rtl' : ''}`}
      aria-label={language === 'fr' ? "Détails des services" : language === 'he' ? "פרטי שירותים" : "Service details"}
    >
      <div className="container mx-auto px-4">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          const isEven = index % 2 === 0;
          
          return (
            <article 
              key={service.id}
              id={service.id}
              className={`mb-16 md:mb-24 last:mb-0`}
            >
              <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
                {/* Icon Section */}
                <div className="flex-shrink-0">
                  <div 
                    className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}
                    aria-hidden="true"
                  >
                    <IconComponent className="h-12 w-12 md:h-16 md:w-16 text-white" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                    {service.title}
                  </h2>
                  
                  {/* Who is this for */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {language === 'fr' ? 'Pour qui ?' : language === 'he' ? 'למי זה מתאים?' : 'Who is this for?'}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.whoFor}
                    </p>
                  </div>

                  {/* The Problem */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {language === 'fr' ? 'Le problème' : language === 'he' ? 'הבעיה' : 'The Problem'}
                    </h3>
                    <p className="text-muted-foreground">
                      {service.problem}
                    </p>
                  </div>

                  {/* Results */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      {language === 'fr' ? 'Résultats attendus' : language === 'he' ? 'תוצאות צפויות' : 'Expected Results'}
                    </h3>
                    <ul className="space-y-2" role="list">
                      {service.results.map((result, idx) => (
                        <li 
                          key={idx} 
                          className={`flex items-center gap-2 text-muted-foreground ${language === 'he' ? 'flex-row-reverse justify-end' : 'justify-center lg:justify-start'}`}
                        >
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" aria-hidden="true" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={handleWhatsAppContact}
                    className="glow-primary"
                    aria-label={`${language === 'fr' ? 'En savoir plus sur' : language === 'he' ? 'למידע נוסף על' : 'Learn more about'} ${service.title}`}
                  >
                    {language === 'fr' ? 'En savoir plus' : language === 'he' ? 'למידע נוסף' : 'Learn More'}
                    <ArrowRight className={`h-4 w-4 ${language === 'he' ? 'mr-2' : 'ml-2'}`} aria-hidden="true" />
                  </Button>
                </div>
              </div>

              {/* Separator */}
              {index < services.length - 1 && (
                <div className="border-b border-border/30 mt-16 md:mt-24" aria-hidden="true" />
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default ServiceDetails;