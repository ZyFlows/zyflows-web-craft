import { useLanguage } from "@/contexts/LanguageContext";
import { Globe, Mail, Phone, MapPin } from "lucide-react";

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
        email: "infos.zyflows@gmail.com",
        address: "Tel Aviv",
        tagline: "zyFlows הוא משרד בוטיק ליעוץ בפינטק, בינה מלאכותית ופתרונות דיגיטליים מותאמים אישית",
        poweredBy: "מבוסס על ידי",
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
        contactTitle: "Contact",
        quickContact: "Contact rapide",
        chooseLanguage: "Choisir la langue",
        hebrew: "עברית",
        english: "English",
        french: "Français",
        phone: "050-730-0720",
        email: "infos.zyflows@gmail.com",
        address: "Tel Aviv",
        tagline: "zyFlows est un cabinet boutique spécialisé en conseil fintech, IA et solutions numériques sur mesure",
        poweredBy: "Propulsé par",
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
        contactTitle: "Contact",
        quickContact: "Quick Contact",
        chooseLanguage: "Choose Language",
        hebrew: "עברית",
        english: "English",
        french: "Français",
        phone: "050-730-0720",
        email: "infos.zyflows@gmail.com",
        address: "Tel Aviv",
        tagline: "zyFlows is a boutique consulting firm specializing in fintech, AI and customized digital solutions",
        poweredBy: "Powered by",
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
    <footer className="relative bg-primary text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Logo & Description */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h2 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                zyFlows
              </h2>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              {t('tagline')}
            </p>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#FFA500]" />
              {t('company')}
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-white/90 hover:text-white transition-colors text-sm block"
                >
                  {t('aboutUs')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-white/90 hover:text-white transition-colors text-sm block"
                >
                  {t('services')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-white/90 hover:text-white transition-colors text-sm block"
                >
                  {t('contact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Phone className="h-5 w-5 text-[#FFA500]" />
              {t('contactTitle')}
            </h3>
            <ul className="space-y-4 mb-6">
              <li>
                <a 
                  href={`tel:${t('phone').replace(/\s/g, '')}`}
                  className="text-white/90 hover:text-white transition-colors text-base flex items-center gap-3"
                >
                  <Phone className="h-5 w-5 text-[#FFA500]" />
                  <span style={{ direction: 'ltr' }}>{t('phone')}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${t('email')}`}
                  className="text-white/90 hover:text-white transition-colors text-base flex items-center gap-3"
                >
                  <Mail className="h-5 w-5 text-[#FFA500]" />
                  <span style={{ direction: 'ltr' }}>{t('email')}</span>
                </a>
              </li>
              <li>
                <div className="text-white/90 text-base flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-[#FFA500]" />
                  {t('address')}
                </div>
              </li>
            </ul>

            {/* Quick Contact Icons */}
            <div>
              <p className="text-sm text-white/80 mb-3">{t('quickContact')}</p>
              <div className="flex gap-3">
                <a
                  href="/"
                  className="w-12 h-12 bg-white rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Website"
                >
                  <Globe className="h-6 w-6 text-primary" />
                </a>
                <a
                  href={`mailto:${t('email')}`}
                  className="w-12 h-12 bg-white rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Email"
                >
                  <Mail className="h-6 w-6 text-primary" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Language Selector */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#FFA500]" />
              {t('chooseLanguage')}
            </h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setLanguage('he')}
                className={`px-5 py-3 rounded-xl border-2 text-base font-medium transition-all ${
                  language === 'he'
                    ? 'bg-white text-primary border-white'
                    : 'bg-transparent text-white border-white/40 hover:border-white/70'
                }`}
              >
                {t('hebrew')} 🇮🇱
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-5 py-3 rounded-xl border-2 text-base font-medium transition-all ${
                  language === 'en'
                    ? 'bg-white text-primary border-white'
                    : 'bg-transparent text-white border-white/40 hover:border-white/70'
                }`}
              >
                {t('english')} 🇬🇧
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-5 py-3 rounded-xl border-2 text-base font-medium transition-all ${
                  language === 'fr'
                    ? 'bg-white text-primary border-white'
                    : 'bg-transparent text-white border-white/40 hover:border-white/70'
                }`}
              >
                {t('french')} 🇫🇷
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-3 text-white/70">
              <span>{t('poweredBy')} zyFlows</span>
              <span>•</span>
              <a href="/privacy-policy" className="hover:text-white transition-colors">
                {t('terms')}
              </a>
              <span>•</span>
              <a href="/privacy-policy" className="hover:text-white transition-colors">
                {t('privacy')}
              </a>
            </div>

            <div 
              className="text-white/70"
              style={{ direction: 'ltr' }}
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
            </div>

            <a
              href="/accessibility-statement"
              className="text-white/70 hover:text-white transition-colors flex items-center gap-2"
            >
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
