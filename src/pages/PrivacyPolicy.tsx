import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/sections/Footer";
import { Shield, Cookie, Lock, Eye } from "lucide-react";

const PrivacyPolicy = () => {
  const { language } = useLanguage();

  const content = {
    he: {
      title: "מדיניות פרטיות",
      intro: "ב-zyFlows, אנו מחויבים להגן על פרטיותכם ועל נתוניכם האישיים. מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע שלכם.",
      lastUpdate: "עודכן לאחרונה: דצמבר 2024",
      sections: {
        collection: {
          title: "איסוף מידע",
          content: "אנו אוספים מידע שאתם מספקים לנו ישירות, כגון שם, כתובת אימייל, ומספר טלפון בעת יצירת קשר או הרשמה לשירותים שלנו."
        },
        usage: {
          title: "שימוש במידע",
          content: "אנו משתמשים במידע שנאסף כדי לספק ולשפר את השירותים שלנו, לתקשר איתכם, ולהתאים אישית את חווית המשתמש שלכם."
        },
        cookies: {
          title: "עוגיות",
          content: "אנו משתמשים בעוגיות לשיפור חווית הגלישה שלכם. אתם יכולים לשלוט בהעדפות העוגיות שלכם דרך תפריט ההגדרות."
        },
        security: {
          title: "אבטחה",
          content: "אנו מיישמים אמצעי אבטחה מתאימים כדי להגן על המידע האישי שלכם מפני גישה לא מורשית, שינוי או חשיפה."
        },
        rights: {
          title: "הזכויות שלכם",
          content: "יש לכם זכות לגשת, לתקן או למחוק את המידע האישי שלכם. צרו איתנו קשר כדי לממש את זכויותיכם."
        },
        contact: {
          title: "צרו קשר",
          content: "לשאלות על מדיניות הפרטיות שלנו, אנא צרו איתנו קשר:"
        }
      }
    },
    fr: {
      title: "Politique de confidentialité",
      intro: "Chez zyFlows, nous nous engageons à protéger votre vie privée et vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.",
      lastUpdate: "Dernière mise à jour : Décembre 2024",
      sections: {
        collection: {
          title: "Collecte d'informations",
          content: "Nous collectons les informations que vous nous fournissez directement, telles que votre nom, adresse e-mail et numéro de téléphone lors de la prise de contact ou de l'inscription à nos services."
        },
        usage: {
          title: "Utilisation des informations",
          content: "Nous utilisons les informations collectées pour fournir et améliorer nos services, communiquer avec vous et personnaliser votre expérience utilisateur."
        },
        cookies: {
          title: "Cookies",
          content: "Nous utilisons des cookies pour améliorer votre expérience de navigation. Vous pouvez contrôler vos préférences de cookies via le menu des paramètres."
        },
        security: {
          title: "Sécurité",
          content: "Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations personnelles contre tout accès, modification ou divulgation non autorisés."
        },
        rights: {
          title: "Vos droits",
          content: "Vous avez le droit d'accéder, de corriger ou de supprimer vos informations personnelles. Contactez-nous pour exercer vos droits."
        },
        contact: {
          title: "Nous contacter",
          content: "Pour toute question concernant notre politique de confidentialité, veuillez nous contacter :"
        }
      }
    },
    en: {
      title: "Privacy Policy",
      intro: "At zyFlows, we are committed to protecting your privacy and personal data. This privacy policy explains how we collect, use, and protect your information.",
      lastUpdate: "Last updated: December 2024",
      sections: {
        collection: {
          title: "Information Collection",
          content: "We collect information you provide directly to us, such as your name, email address, and phone number when contacting us or signing up for our services."
        },
        usage: {
          title: "Information Use",
          content: "We use the collected information to provide and improve our services, communicate with you, and personalize your user experience."
        },
        cookies: {
          title: "Cookies",
          content: "We use cookies to enhance your browsing experience. You can control your cookie preferences through the settings menu."
        },
        security: {
          title: "Security",
          content: "We implement appropriate security measures to protect your personal information from unauthorized access, modification, or disclosure."
        },
        rights: {
          title: "Your Rights",
          content: "You have the right to access, correct, or delete your personal information. Contact us to exercise your rights."
        },
        contact: {
          title: "Contact Us",
          content: "For questions about our privacy policy, please contact us:"
        }
      }
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
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {t.intro}
          </p>

          <p className="text-sm text-muted-foreground italic mb-12">
            {t.lastUpdate}
          </p>

          <div className="space-y-8">
            {/* Collection */}
            <section className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-primary h-6 w-6" />
                <h2 className="text-2xl font-bold">{t.sections.collection.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.collection.content}
              </p>
            </section>

            {/* Usage */}
            <section className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-primary h-6 w-6" />
                <h2 className="text-2xl font-bold">{t.sections.usage.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.usage.content}
              </p>
            </section>

            {/* Cookies */}
            <section className="p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Cookie className="text-primary h-6 w-6" />
                <h2 className="text-2xl font-bold">{t.sections.cookies.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.cookies.content}
              </p>
            </section>

            {/* Security */}
            <section className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="text-primary h-6 w-6" />
                <h2 className="text-2xl font-bold">{t.sections.security.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.security.content}
              </p>
            </section>

            {/* Rights */}
            <section className="p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="text-primary h-6 w-6" />
                <h2 className="text-2xl font-bold">{t.sections.rights.title}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {t.sections.rights.content}
              </p>
            </section>

            {/* Contact */}
            <section className="p-6 bg-card rounded-lg border border-border">
              <h2 className="text-2xl font-bold mb-4">{t.sections.contact.title}</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {t.sections.contact.content}
              </p>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <strong>Email:</strong>
                  <a href="mailto:privacy@zyflows.com" className="text-primary hover:underline">
                    privacy@zyflows.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <strong>WhatsApp:</strong>
                  <a href="https://wa.me/972584229255" className="text-primary hover:underline">
                    +972-58-422-9255
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;