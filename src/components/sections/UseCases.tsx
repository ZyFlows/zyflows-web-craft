import { UtensilsCrossed, Briefcase, Store, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UseCases = () => {
  const { language } = useLanguage();

  const handleWhatsAppContact = () => {
    const phoneNumber = "972584229255";
    const message = language === 'fr' 
      ? "🎯 Bonjour ! Je souhaite automatiser mon activité. Pouvons-nous en discuter ?"
      : language === 'he'
      ? "🎯 שלום! אני רוצה לאוטמט את העסק שלי. נוכל לדבר על זה?"
      : "🎯 Hello! I want to automate my business. Can we discuss?";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const useCases = [
    {
      icon: UtensilsCrossed,
      title: language === 'fr' ? 'Restaurants' : language === 'he' ? 'מסעדות' : 'Restaurants',
      description: language === 'fr'
        ? 'Automatisez les réservations, confirmations et paiements'
        : language === 'he'
        ? 'אוטומציה של הזמנות, אישורים ותשלומים'
        : 'Automate bookings, confirmations and payments',
      benefits: language === 'fr' 
        ? ['Réservations automatiques 24/7', 'Confirmations WhatsApp instantanées', 'Intégration paiement en ligne', 'Rappels automatiques clients']
        : language === 'he'
        ? ['הזמנות אוטומטיות 24/7', 'אישורי ווטסאפ מיידיים', 'אינטגרציית תשלום אונליין', 'תזכורות אוטומטיות ללקוחות']
        : ['24/7 automatic reservations', 'Instant WhatsApp confirmations', 'Online payment integration', 'Automatic customer reminders'],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Briefcase,
      title: language === 'fr' ? 'Consultants' : language === 'he' ? 'יועצים' : 'Consultants',
      description: language === 'fr'
        ? 'Automatisez l\'onboarding, la synchronisation CRM et la facturation'
        : language === 'he'
        ? 'אוטומציה של קליטת לקוחות, סנכרון CRM וחשבוניות'
        : 'Automate onboarding, CRM sync and invoicing',
      benefits: language === 'fr'
        ? ['Onboarding client automatisé', 'Sync CRM temps réel', 'Factures générées automatiquement', 'Suivi projet intelligent']
        : language === 'he'
        ? ['קליטת לקוחות אוטומטית', 'סנכרון CRM בזמן אמת', 'חשבוניות אוטומטיות', 'מעקב פרויקטים חכם']
        : ['Automated client onboarding', 'Real-time CRM sync', 'Auto-generated invoices', 'Smart project tracking'],
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Store,
      title: language === 'fr' ? 'Boutiques' : language === 'he' ? 'חנויות' : 'Small Shops',
      description: language === 'fr'
        ? 'Chatbots WhatsApp pour le support client et les ventes'
        : language === 'he'
        ? 'צ\'אטבוטים לווטסאפ לתמיכת לקוחות ומכירות'
        : 'WhatsApp chatbots for customer support and upsells',
      benefits: language === 'fr'
        ? ['Support client 24/7 automatisé', 'Recommandations produits IA', 'Suivi commandes automatique', 'Upsell intelligent']
        : language === 'he'
        ? ['תמיכת לקוחות 24/7 אוטומטית', 'המלצות מוצרים AI', 'מעקב הזמנות אוטומטי', 'מכירות נוספות חכמות']
        : ['24/7 automated customer support', 'AI product recommendations', 'Automatic order tracking', 'Smart upselling'],
      gradient: 'from-green-500 to-emerald-600'
    }
  ];

  return (
    <section 
      id="use-cases" 
      className={`py-16 md:py-20 relative overflow-hidden bg-muted/30 ${language === 'he' ? 'rtl' : ''}`}
      aria-labelledby="use-cases-title"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <header className="text-center mb-12 md:mb-16">
          <h2 
            id="use-cases-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
          >
            {language === 'fr' 
              ? 'Solutions pour Chaque Secteur' 
              : language === 'he' 
              ? 'פתרונות לכל תחום' 
              : 'Solutions for Every Industry'}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Découvrez comment nos automatisations transforment les entreprises de différents secteurs.'
              : language === 'he'
              ? 'גלו כיצד האוטומציות שלנו משנות עסקים בתחומים שונים.'
              : 'Discover how our automations transform businesses across different industries.'}
          </p>
        </header>

        {/* Use Cases Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12"
          role="list"
          aria-label={language === 'fr' ? "Cas d'utilisation par secteur" : language === 'he' ? "מקרי שימוש לפי תחום" : "Use cases by industry"}
        >
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            return (
              <Card 
                key={index}
                className="gradient-card border-border/50 hover:border-primary/50 transition-smooth hover:scale-105 group"
                role="listitem"
              >
                <CardHeader className="pb-4">
                  <div 
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${useCase.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    aria-hidden="true"
                  >
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                    {useCase.title}
                  </CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2" role="list">
                    {useCase.benefits.map((benefit, idx) => (
                      <li 
                        key={idx} 
                        className={`flex items-center gap-2 text-sm text-muted-foreground ${language === 'he' ? 'flex-row-reverse text-right' : ''}`}
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="glass-effect rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">
              {language === 'fr' 
                ? 'Réservez un Appel Gratuit de 20 Minutes' 
                : language === 'he' 
                ? 'קבעו שיחה חינם של 20 דקות' 
                : 'Book a Free 20-Minute Automation Call'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {language === 'fr'
                ? 'Discutons de vos défis et découvrons comment automatiser votre activité.'
                : language === 'he'
                ? 'נדבר על האתגרים שלכם ונגלה איך לאוטומציה של העסק שלכם.'
                : 'Let\'s discuss your challenges and discover how to automate your business.'}
            </p>
            <Button 
              size="lg" 
              className="glow-primary"
              onClick={handleWhatsAppContact}
              aria-label={language === 'fr' ? 'Démarrer maintenant' : language === 'he' ? 'להתחיל עכשיו' : 'Get started now'}
            >
              {language === 'fr' ? 'Démarrer' : language === 'he' ? 'להתחיל' : 'Get Started'}
              <ArrowRight className={`h-5 w-5 ${language === 'he' ? 'mr-2' : 'ml-2'}`} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;