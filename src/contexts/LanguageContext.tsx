
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en' | 'he';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const translations = {
    fr: {
      // Navigation
      'nav.home': 'Accueil',
      'nav.services': 'Services',
      'nav.projects': 'Projets',
      'nav.about': 'À propos',
      'nav.testimonials': 'Témoignages',
      'nav.contact': 'Contact',
      'nav.start_project': 'Démarrer un projet',
      
      // Hero Section
      'hero.badge': 'Solutions digitales innovantes depuis Israël',
      'hero.title': 'Transformons vos idées digitales en réalité',
      'hero.subtitle': 'zyFlows conçoit des sites web performants, des applications sur-mesure et des automatisations intelligentes qui propulsent votre entreprise vers le futur.',
      'hero.cta_services': 'Découvrir nos services',
      'hero.cta_projects': 'Voir nos projets',
      'hero.stat1': 'Projets réalisés',
      'hero.stat2': 'Clients satisfaits',
      'hero.stat3': 'Support réactif',
      
      // Services Section
      'services.badge': 'Nos Services',
      'services.title': 'Des solutions complètes pour votre transformation digitale',
      'services.subtitle': 'De la conception de sites web aux automatisations IA, nous maîtrisons toute la chaîne de valeur digitale pour propulser votre entreprise vers l\'excellence technologique.',
      
      // About Section
      'about.badge': 'À Propos de zyFlows',
      'about.title': 'L\'expertise tech au service de vos ambitions',
      'about.mission_title': 'Notre Mission',
      'about.mission_text1': 'Chez zyFlows, nous croyons que la technologie doit servir l\'humain, pas l\'inverse. Basée en Israël, notre équipe combine l\'innovation technologique de pointe avec une approche profondément humaine et accessible.',
      'about.mission_text2': 'Nous transformons les défis complexes en solutions élégantes, que ce soit à travers des sites web performants, des automatisations intelligentes ou des agents IA sur-mesure.',
      
      // Language Selector
      'language.translate': 'Traduire',
      'language.select': 'Choisir la langue',
      'language.french': 'Français',
      'language.english': 'English',
      'language.hebrew': 'עברית'
    },
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.projects': 'Projects',
      'nav.about': 'About',
      'nav.testimonials': 'Testimonials',
      'nav.contact': 'Contact',
      'nav.start_project': 'Start a project',
      
      // Hero Section
      'hero.badge': 'Innovative digital solutions from Israel',
      'hero.title': 'Transform your digital ideas into reality',
      'hero.subtitle': 'zyFlows designs high-performing websites, custom applications and intelligent automations that propel your business toward the future.',
      'hero.cta_services': 'Discover our services',
      'hero.cta_projects': 'View our projects',
      'hero.stat1': 'Projects completed',
      'hero.stat2': 'Satisfied clients',
      'hero.stat3': 'Responsive support',
      
      // Services Section
      'services.badge': 'Our Services',
      'services.title': 'Complete solutions for your digital transformation',
      'services.subtitle': 'From website design to AI automations, we master the entire digital value chain to propel your business toward technological excellence.',
      
      // About Section
      'about.badge': 'About zyFlows',
      'about.title': 'Tech expertise at the service of your ambitions',
      'about.mission_title': 'Our Mission',
      'about.mission_text1': 'At zyFlows, we believe technology should serve humans, not the other way around. Based in Israel, our team combines cutting-edge technological innovation with a deeply human and accessible approach.',
      'about.mission_text2': 'We transform complex challenges into elegant solutions, whether through high-performing websites, intelligent automations, or custom AI agents.',
      
      // Language Selector
      'language.translate': 'Translate',
      'language.select': 'Choose language',
      'language.french': 'Français',
      'language.english': 'English',
      'language.hebrew': 'עברית'
    },
    he: {
      // Navigation
      'nav.home': 'בית',
      'nav.services': 'שירותים',
      'nav.projects': 'פרויקטים',
      'nav.about': 'אודות',
      'nav.testimonials': 'המלצות',
      'nav.contact': 'צור קשר',
      'nav.start_project': 'התחל פרויקט',
      
      // Hero Section
      'hero.badge': 'פתרונות דיגיטליים חדשניים מישראל',
      'hero.title': 'הופכים את הרעיונות הדיגיטליים שלכם למציאות',
      'hero.subtitle': 'zyFlows מעצבת אתרי אינטרנט מתקדמים, אפליקציות מותאמות אישית ואוטומציות חכמות שמניעות את העסק שלכם קדימה.',
      'hero.cta_services': 'גלו את השירותים שלנו',
      'hero.cta_projects': 'צפו בפרויקטים שלנו',
      'hero.stat1': 'פרויקטים שהושלמו',
      'hero.stat2': 'לקוחות מרוצים',
      'hero.stat3': 'תמיכה מהירה',
      
      // Services Section
      'services.badge': 'השירותים שלנו',
      'services.title': 'פתרונות מלאים לטרנספורמציה דיגיטלית',
      'services.subtitle': 'מעיצוב אתרים ועד אוטומציות AI, אנחנו שולטים בכל שרשרת הערך הדיגיטלית כדי להוביל את העסק שלכם למצוינות טכנולוגית.',
      
      // About Section
      'about.badge': 'אודות zyFlows',
      'about.title': 'מומחיות טכנולוגית בשירות השאיפות שלכם',
      'about.mission_title': 'המשימה שלנו',
      'about.mission_text1': 'ב-zyFlows, אנחנו מאמינים שהטכנולוגיה צריכה לשרת את האדם, לא להיפך. הצוות שלנו, הממוקם בישראל, משלב חדשנות טכנולוגית מתקדמת עם גישה אנושית ונגישה.',
      'about.mission_text2': 'אנחנו הופכים אתגרים מורכבים לפתרונות אלגנטיים, בין אם דרך אתרי אינטרנט מתקדמים, אוטומציות חכמות או סוכני AI מותאמים אישית.',
      
      // Language Selector
      'language.translate': 'תרגם',
      'language.select': 'בחר שפה',
      'language.french': 'צרפתית',
      'language.english': 'אנגלית',
      'language.hebrew': 'עברית'
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'he' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};
