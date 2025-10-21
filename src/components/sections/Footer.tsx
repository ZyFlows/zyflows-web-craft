import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Mail, Phone, MapPin, Accessibility } from "lucide-react";

const Footer = () => {
  const { language, setLanguage } = useLanguage();

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      he: {
        company: "החברה",
        aboutUs: "אודותינו",
        ourOffers: "הצעות שלנו",
        services: "שירותים",
        contact: "צור קשר",
        contactTitle: "צור קשר",
        quickContact: "קשר מהיר",
        chooseLanguage: "בחר שפה",
        hebrew: "עברית",
        english: "English",
        french: "Français",
        phone: "050-730-0720",
        email: "contact@zyflows.com",
        address: "Tel Aviv, Israël",
        tagline: "zyFlows הוא משרד בוטיק ליעוץ בפיטוק, ממן ופתרונות בסחומים מותאמים אישית",
        poweredBy: "מבוא על ידי zyFlows",
        terms: "תנאי השירות",
        privacy: "מדיניות פרטיות",
        copyright: "כל הזכויות שמורות לפאי אקספרטיזס",
        accessibilityStatement: "הצהרת נגישות"
      },
      fr: {
        company: "Entreprise",
        aboutUs: "À propos",
        ourOffers: "Nos offres",
        services: "Services",
        contact: "Contact",
        contactTitle: "Contactez-nous",
        quickContact: "Contact rapide",
        chooseLanguage: "Choisir la langue",
        hebrew: "עברית",
        english: "English",
        french: "Français",
        phone: "050-730-0720",
        email: "contact@zyflows.com",
        address: "Tel Aviv, Israël",
        tagline: "zyFlows est un cabinet boutique spécialisé dans le conseil en fintech, IA et solutions numériques personnalisées",
        poweredBy: "Propulsé par zyFlows",
        terms: "Conditions d'utilisation",
        privacy: "Politique de confidentialité",
        copyright: "Tous droits réservés à zyFlows",
        accessibilityStatement: "Déclaration d'accessibilité"
      },
      en: {
        company: "Company",
        aboutUs: "About Us",
        ourOffers: "Our Offers",
        services: "Services",
        contact: "Contact",
        contactTitle: "Contact Us",
        quickContact: "Quick Contact",
        chooseLanguage: "Choose Language",
        hebrew: "עברית",
        english: "English",
        french: "Français",
        phone: "050-730-0720",
        email: "contact@zyflows.com",
        address: "Tel Aviv, Israel",
        tagline: "zyFlows is a boutique consulting firm specializing in fintech, AI, and customized digital solutions",
        poweredBy: "Powered by zyFlows",
        terms: "Terms of Service",
        privacy: "Privacy Policy",
        copyright: "All rights reserved to zyFlows",
        accessibilityStatement: "Accessibility Statement"
      }
    };
    return translations[language]?.[key] || key;
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info & Logo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-start">
            <div className="mb-4">
              <div className="text-3xl font-bold text-white mb-2">zyFlows</div>
              <div className="h-1 w-16 bg-white/80 rounded mx-auto md:mx-0"></div>
            </div>
            <p className="text-white/90 text-sm leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t('company')}
            </h3>
            <ul className="space-y-2">
              {[
                { key: 'aboutUs', id: 'about' },
                { key: 'services', id: 'services' },
                { key: 'contact', id: 'contact' }
              ].map(({ key, id }) => (
                <li key={key}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className="text-white/80 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block"
                  >
                    {t(key)}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/privacy-policy"
                  className="text-white/80 hover:text-white transition-colors text-sm hover:translate-x-1 inline-block"
                >
                  {t('privacy')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              {t('contactTitle')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href={`tel:${t('phone')}`}
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  {t('phone')}
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${t('email')}`}
                  className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  {t('email')}
                </a>
              </li>
              <li>
                <div className="text-white/80 text-sm flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {t('address')}
                </div>
              </li>
            </ul>

            {/* Quick Contact Icons */}
            <div className="mt-4">
              <p className="text-xs text-white/60 mb-2">{t('quickContact')}</p>
              <div className="flex gap-2">
                <a
                  href="/"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
                  aria-label="Website"
                >
                  <Globe className="h-5 w-5" />
                </a>
                <a
                  href={`mailto:${t('email')}`}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              {t('chooseLanguage')}
            </h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setLanguage('he')}
                className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all text-start ${
                  language === 'he'
                    ? 'bg-white text-primary border-white'
                    : 'bg-transparent text-white border-white/30 hover:border-white/60'
                }`}
              >
                🇮🇱 {t('hebrew')}
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all text-start ${
                  language === 'en'
                    ? 'bg-white text-primary border-white'
                    : 'bg-transparent text-white border-white/30 hover:border-white/60'
                }`}
              >
                🇬🇧 {t('english')}
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all text-start ${
                  language === 'fr'
                    ? 'bg-white text-primary border-white'
                    : 'bg-transparent text-white border-white/30 hover:border-white/60'
                }`}
              >
                🇫🇷 {t('french')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left Links */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
              <span>{t('poweredBy')}</span>
              <span>•</span>
              <a href="/privacy-policy" className="hover:text-white transition-colors">
                {t('terms')}
              </a>
              <span>•</span>
              <a href="/privacy-policy" className="hover:text-white transition-colors">
                {t('privacy')}
              </a>
            </div>

            {/* Center Copyright */}
            <div className="text-xs text-white/70 text-center">
              <p 
                style={{ 
                  direction: 'ltr',
                  whiteSpace: 'nowrap' 
                }}
              >
                Copyright © 2025 - 
                <a 
                  href="https://www.linkedin.com/in/raphael-belhassen" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors ml-1"
                >
                  Raphael Belhassen
                </a>
              </p>
              <p className="mt-1">{t('copyright')}</p>
            </div>

            {/* Right Accessibility */}
            <a
              href="/accessibility-statement"
              className="flex items-center gap-2 text-xs text-white/70 hover:text-white transition-colors"
              title={t('accessibilityStatement')}
            >
              <Accessibility className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
