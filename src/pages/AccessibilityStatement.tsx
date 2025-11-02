import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/sections/Footer";
import { CheckCircle2 } from "lucide-react";

const AccessibilityStatement = () => {
  const { language } = useLanguage();

  const content = {
    he: {
      title: "הצהרת נגישות",
      intro: "zyFlows מחויבת להנגיש את האתר לאנשים עם מוגבלויות, ועושה מאמצים רבים להבטיח חווית גלישה נוחה ונגישה לכולם.",
      complianceTitle: "עמידה בתקנים",
      complianceText: "האתר עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע״ג-2013 ובתקן הבינלאומי WCAG 2.1 ברמת התאימות AA.",
      featuresTitle: "תכונות נגישות באתר",
      features: [
        "ניווט מקלדת מלא בכל חלקי האתר",
        "תמיכה בקוראי מסך (NVDA, JAWS, VoiceOver)",
        "ניגודיות צבעים מספקת לקריאה נוחה",
        "טקסט חלופי לכל התמונות",
        "כותרות מובנות בצורה היררכית נכונה",
        "פונטים קריאים וברורים",
        "אפשרות להגדלת טקסט עד 200%",
        "עיצוב רספונסיבי למכשירים שונים",
        "תפריט נגישות מתקדם עם אפשרויות התאמה אישיות"
      ],
      widgetTitle: "תפריט הנגישות",
      widgetText: "באתר קיים תפריט נגישות מתקדם המאפשר התאמה אישית של חוויית הגלישה. ניתן להגיע אליו באמצעות לחיצה על כפתור הנגישות הצף בפינת המסך.",
      widgetFeatures: [
        "שינוי גודל טקסט",
        "התאמת ניגודיות צבעים",
        "מצב צבעוניות מופחתת (grayscale)",
        "הדגשת קישורים",
        "שינוי גופן לקריא יותר",
        "עצירת אנימציות",
        "הגדלת סמן העכבר",
        "התאמת בהירות ורוויית צבעים",
        "מדריך קריאה"
      ],
      issuesTitle: "דיווח על בעיות נגישות",
      issuesText: "אם נתקלתם בבעיית נגישות באתר, אנא צרו איתנו קשר:",
      contactEmail: "נגישות@zyflows.com",
      contactWhatsApp: "+972-58-422-9255",
      responseTime: "נשתדל לטפל בכל פנייה תוך 7 ימי עסקים.",
      updateTitle: "עדכונים ושיפורים",
      updateText: "אנו ממשיכים לעבוד על שיפור נגישות האתר באופן שוטף ומתחייבים לעמוד בסטנדרטים המחמירים ביותר.",
      lastUpdate: "עודכן לאחרונה: דצמבר 2024"
    },
    fr: {
      title: "Déclaration d'accessibilité",
      intro: "zyFlows s'engage à rendre son site accessible aux personnes en situation de handicap et fait des efforts considérables pour garantir une expérience de navigation confortable et accessible à tous.",
      complianceTitle: "Conformité aux normes",
      complianceText: "Le site est conforme aux exigences du standard international WCAG 2.1 niveau AA pour l'accessibilité web.",
      featuresTitle: "Fonctionnalités d'accessibilité du site",
      features: [
        "Navigation complète au clavier sur toutes les sections",
        "Support des lecteurs d'écran (NVDA, JAWS, VoiceOver)",
        "Contraste de couleurs suffisant pour une lecture confortable",
        "Texte alternatif pour toutes les images",
        "Structure hiérarchique correcte des titres",
        "Polices lisibles et claires",
        "Possibilité d'agrandissement du texte jusqu'à 200%",
        "Design responsive pour différents appareils",
        "Menu d'accessibilité avancé avec options de personnalisation"
      ],
      widgetTitle: "Menu d'accessibilité",
      widgetText: "Le site dispose d'un menu d'accessibilité avancé permettant une personnalisation complète de l'expérience de navigation. Il est accessible via le bouton flottant d'accessibilité en coin d'écran.",
      widgetFeatures: [
        "Modification de la taille du texte",
        "Ajustement du contraste des couleurs",
        "Mode niveaux de gris",
        "Surbrillance des liens",
        "Changement de police pour une meilleure lisibilité",
        "Arrêt des animations",
        "Agrandissement du curseur",
        "Ajustement de la luminosité et saturation",
        "Guide de lecture"
      ],
      issuesTitle: "Signaler un problème d'accessibilité",
      issuesText: "Si vous rencontrez un problème d'accessibilité sur le site, veuillez nous contacter :",
      contactEmail: "accessibility@zyflows.com",
      contactWhatsApp: "+972-58-422-9255",
      responseTime: "Nous nous efforçons de traiter toute demande sous 7 jours ouvrables.",
      updateTitle: "Mises à jour et améliorations",
      updateText: "Nous continuons à travailler sur l'amélioration de l'accessibilité du site de manière continue et nous engageons à respecter les standards les plus stricts.",
      lastUpdate: "Dernière mise à jour : Décembre 2024"
    },
    en: {
      title: "Accessibility Statement",
      intro: "zyFlows is committed to making its website accessible to people with disabilities and makes considerable efforts to ensure a comfortable and accessible browsing experience for everyone.",
      complianceTitle: "Standards Compliance",
      complianceText: "The site complies with the requirements of the international WCAG 2.1 Level AA standard for web accessibility.",
      featuresTitle: "Site Accessibility Features",
      features: [
        "Full keyboard navigation across all sections",
        "Screen reader support (NVDA, JAWS, VoiceOver)",
        "Sufficient color contrast for comfortable reading",
        "Alternative text for all images",
        "Proper hierarchical heading structure",
        "Clear and readable fonts",
        "Text enlargement capability up to 200%",
        "Responsive design for various devices",
        "Advanced accessibility menu with customization options"
      ],
      widgetTitle: "Accessibility Menu",
      widgetText: "The site features an advanced accessibility menu allowing complete customization of the browsing experience. It can be accessed via the floating accessibility button in the corner of the screen.",
      widgetFeatures: [
        "Text size modification",
        "Color contrast adjustment",
        "Grayscale mode",
        "Link highlighting",
        "Font change for better readability",
        "Animation control",
        "Cursor enlargement",
        "Brightness and saturation adjustment",
        "Reading guide"
      ],
      issuesTitle: "Report an Accessibility Issue",
      issuesText: "If you encounter an accessibility issue on the site, please contact us:",
      contactEmail: "accessibility@zyflows.com",
      contactWhatsApp: "+972-58-422-9255",
      responseTime: "We strive to address all requests within 7 business days.",
      updateTitle: "Updates and Improvements",
      updateText: "We continue to work on improving site accessibility on an ongoing basis and are committed to meeting the strictest standards.",
      lastUpdate: "Last updated: December 2024"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t.title}
          </h1>
          
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              {t.intro}
            </p>

            {/* Conformité */}
            <section className="mb-12 p-8 bg-card rounded-lg border border-border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <CheckCircle2 className="text-primary h-8 w-8" />
                {t.complianceTitle}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.complianceText}
              </p>
            </section>

            {/* Fonctionnalités */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{t.featuresTitle}</h2>
              <ul className="space-y-3">
                {t.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary h-6 w-6 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Widget */}
            <section className="mb-12 p-8 bg-primary/5 rounded-lg border-2 border-primary/20">
              <h2 className="text-2xl font-bold mb-4">{t.widgetTitle}</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t.widgetText}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {t.widgetFeatures.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Signalement */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">{t.issuesTitle}</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {t.issuesText}
              </p>
              <div className="space-y-2 p-6 bg-card rounded-lg border border-border">
                <p className="flex items-center gap-2">
                  <strong>Email:</strong>
                  <a href={`mailto:${t.contactEmail}`} className="text-primary hover:underline">
                    {t.contactEmail}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <strong>WhatsApp:</strong>
                  <a href={`https://wa.me/${t.contactWhatsApp.replace(/[^0-9]/g, '')}`} className="text-primary hover:underline" dir="ltr">
                    {t.contactWhatsApp}
                  </a>
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  {t.responseTime}
                </p>
              </div>
            </section>

            {/* Mises à jour */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">{t.updateTitle}</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {t.updateText}
              </p>
              <p className="text-sm text-muted-foreground italic">
                {t.lastUpdate}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccessibilityStatement;