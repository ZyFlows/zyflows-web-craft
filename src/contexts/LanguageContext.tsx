
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
      'services.web_title': 'Sites Web Professionnels',
      'services.web_desc': 'Création de sites performants sur Wix, WordPress, Shopify et Framer avec design moderne et optimisation SEO.',
      'services.app_title': 'Applications Sur-Mesure',
      'services.app_desc': 'Développement d\'applications web et mobile personnalisées qui répondent exactement à vos besoins métier.',
      'services.automation_title': 'Automatisations Intelligentes',
      'services.automation_desc': 'Optimisez vos processus avec Make, Zapier, N8N. Connectez vos outils et gagnez un temps précieux.',
      'services.leads_title': 'Génération de Leads',
      'services.leads_desc': 'Exploitez l\'API Google Maps pour identifier et cibler vos prospects potentiels avec précision.',
      'services.ai_title': 'IA & Agents Personnalisés',
      'services.ai_desc': 'Créez des GPT sur-mesure et des agents IA qui automatisent vos tâches et améliorent votre productivité.',
      'services.feature1': 'Design responsive',
      'services.feature2': 'Optimisation SEO',
      'services.feature3': 'Performance optimale',
      'services.feature4': 'Interface intuitive',
      'services.feature5': 'Architecture scalable',
      'services.feature6': 'API robustes',
      'services.feature7': 'UX/UI soignée',
      'services.feature8': 'Maintenance incluse',
      'services.feature9': 'Workflows personnalisés',
      'services.feature10': 'Intégrations multiples',
      'services.feature11': 'Monitoring avancé',
      'services.feature12': 'ROI mesurable',
      'services.feature13': 'Ciblage géographique',
      'services.feature14': 'Données qualifiées',
      'services.feature15': 'Export automatique',
      'services.feature16': 'CRM intégré',
      'services.feature17': 'GPT personnalisés',
      'services.feature18': 'Chatbots intelligents',
      'services.feature19': 'Analyse automatisée',
      'services.feature20': 'Formation incluse',
      'services.learn_more': 'En savoir plus',
      'services.cta_title': 'Prêt à transformer votre vision en réalité ?',
      'services.cta_desc': 'Discutons de votre projet et découvrons ensemble les solutions parfaites pour votre entreprise.',
      'services.cta_button': 'Planifier un appel gratuit',

      // Projects Section
      'projects.badge': 'Nos Réalisations',
      'projects.title': 'Des projets qui transforment les entreprises',
      'projects.subtitle': 'Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs grâce à des solutions digitales innovantes et performantes.',
      'projects.project1_title': 'E-commerce Fashion Forward',
      'projects.project1_desc': 'Boutique en ligne Shopify avec système de personnalisation avancé et automatisations marketing complètes.',
      'projects.project2_title': 'SaaS Analytics Dashboard',
      'projects.project2_desc': 'Application web complète pour l\'analyse de données avec intégrations API multiples et visualisations en temps réel.',
      'projects.project3_title': 'Automatisation Lead Gen',
      'projects.project3_desc': 'Système complet d\'acquisition de leads via Google Maps API avec CRM intégré et workflows automatisés.',
      'projects.project4_title': 'Chatbot IA Support Client',
      'projects.project4_desc': 'Agent conversationnel intelligent avec GPT personnalisé pour le support client 24/7 d\'une fintech.',
      'projects.project5_title': 'Portfolio Architecte',
      'projects.project5_desc': 'Site vitrine Framer avec animations fluides et galerie interactive pour un cabinet d\'architecture renommé.',
      'projects.project6_title': 'Workflow RH Automatisé',
      'projects.project6_desc': 'Système de gestion RH avec automatisations Zapier pour onboarding, formation et évaluation des employés.',
      'projects.view_project': 'Voir le projet',
      'projects.cta_title': 'Votre projet pourrait être le prochain',
      'projects.cta_desc': 'Chaque projet est unique. Discutons de vos défis et objectifs pour créer une solution parfaitement adaptée.',
      'projects.cta_button': 'Démarrer votre projet',

      // About Section  
      'about.badge': 'À Propos de zyFlows',
      'about.title': 'L\'expertise tech au service de vos ambitions',
      'about.mission_title': 'Notre Mission',
      'about.mission_text1': 'Chez zyFlows, nous croyons que la technologie doit servir l\'humain, pas l\'inverse. Basée en Israël, notre équipe combine l\'innovation technologique de pointe avec une approche profondément humaine et accessible.',
      'about.mission_text2': 'Nous transformons les défis complexes en solutions élégantes, que ce soit à travers des sites web performants, des automatisations intelligentes ou des agents IA sur-mesure.',
      'about.values_title': 'Nos Valeurs Fondamentales',
      'about.value1_title': 'Excellence Technique',
      'about.value1_desc': 'Nous repoussons les limites du possible avec les dernières technologies et les meilleures pratiques du développement.',
      'about.value2_title': 'Approche Humaine',
      'about.value2_desc': 'Chaque projet est unique. Nous écoutons, comprenons et créons des solutions qui reflètent vraiment vos besoins.',
      'about.value3_title': 'Innovation Continue',
      'about.value3_desc': 'L\'IA, l\'automatisation et les nouvelles technologies n\'ont plus de secrets pour nous. Nous restons à la pointe.',
      'about.value4_title': 'Vision Globale',
      'about.value4_desc': 'Basés en Israël, nous travaillons avec des clients du monde entier et maîtrisons les enjeux internationaux.',
      'about.team_button': 'Découvrir notre équipe',
      'about.cta_title': 'Prêt à rejoindre l\'aventure ?',
      'about.cta_desc': 'Que vous soyez une startup ambitieuse ou une entreprise établie, nous avons les compétences et la passion pour propulser votre projet vers le succès.',
      'about.cta_button1': 'Discuter de votre projet',
      'about.cta_button2': 'Voir nos témoignages',
      
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
      'services.web_title': 'Professional Websites',
      'services.web_desc': 'Creating high-performing websites on Wix, WordPress, Shopify and Framer with modern design and SEO optimization.',
      'services.app_title': 'Custom Applications',
      'services.app_desc': 'Development of personalized web and mobile applications that respond exactly to your business needs.',
      'services.automation_title': 'Intelligent Automations',
      'services.automation_desc': 'Optimize your processes with Make, Zapier, N8N. Connect your tools and save precious time.',
      'services.leads_title': 'Lead Generation',
      'services.leads_desc': 'Leverage Google Maps API to identify and target your potential prospects with precision.',
      'services.ai_title': 'AI & Custom Agents',
      'services.ai_desc': 'Create custom GPTs and AI agents that automate your tasks and improve your productivity.',
      'services.feature1': 'Responsive design',
      'services.feature2': 'SEO optimization',
      'services.feature3': 'Optimal performance',
      'services.feature4': 'Intuitive interface',
      'services.feature5': 'Scalable architecture',
      'services.feature6': 'Robust APIs',
      'services.feature7': 'Polished UX/UI',
      'services.feature8': 'Maintenance included',
      'services.feature9': 'Custom workflows',
      'services.feature10': 'Multiple integrations',
      'services.feature11': 'Advanced monitoring',
      'services.feature12': 'Measurable ROI',
      'services.feature13': 'Geographic targeting',
      'services.feature14': 'Qualified data',
      'services.feature15': 'Automatic export',
      'services.feature16': 'Integrated CRM',
      'services.feature17': 'Custom GPTs',
      'services.feature18': 'Intelligent chatbots',
      'services.feature19': 'Automated analysis',
      'services.feature20': 'Training included',
      'services.learn_more': 'Learn more',
      'services.cta_title': 'Ready to transform your vision into reality?',
      'services.cta_desc': 'Let\'s discuss your project and discover together the perfect solutions for your business.',
      'services.cta_button': 'Schedule a free call',

      // Projects Section
      'projects.badge': 'Our Achievements',
      'projects.title': 'Projects that transform businesses',
      'projects.subtitle': 'Discover how we helped our clients achieve their goals through innovative and high-performing digital solutions.',
      'projects.project1_title': 'E-commerce Fashion Forward',
      'projects.project1_desc': 'Shopify online store with advanced customization system and complete marketing automations.',
      'projects.project2_title': 'SaaS Analytics Dashboard',
      'projects.project2_desc': 'Complete web application for data analysis with multiple API integrations and real-time visualizations.',
      'projects.project3_title': 'Lead Gen Automation',
      'projects.project3_desc': 'Complete lead acquisition system via Google Maps API with integrated CRM and automated workflows.',
      'projects.project4_title': 'AI Customer Support Chatbot',
      'projects.project4_desc': 'Intelligent conversational agent with custom GPT for 24/7 customer support of a fintech company.',
      'projects.project5_title': 'Architect Portfolio',
      'projects.project5_desc': 'Framer showcase site with smooth animations and interactive gallery for a renowned architecture firm.',
      'projects.project6_title': 'Automated HR Workflow',
      'projects.project6_desc': 'HR management system with Zapier automations for onboarding, training and employee evaluation.',
      'projects.view_project': 'View project',
      'projects.cta_title': 'Your project could be next',
      'projects.cta_desc': 'Every project is unique. Let\'s discuss your challenges and objectives to create a perfectly adapted solution.',
      'projects.cta_button': 'Start your project',

      // About Section
      'about.badge': 'About zyFlows',
      'about.title': 'Tech expertise at the service of your ambitions',
      'about.mission_title': 'Our Mission',
      'about.mission_text1': 'At zyFlows, we believe technology should serve humans, not the other way around. Based in Israel, our team combines cutting-edge technological innovation with a deeply human and accessible approach.',
      'about.mission_text2': 'We transform complex challenges into elegant solutions, whether through high-performing websites, intelligent automations, or custom AI agents.',
      'about.values_title': 'Our Core Values',
      'about.value1_title': 'Technical Excellence',
      'about.value1_desc': 'We push the boundaries of what\'s possible with the latest technologies and development best practices.',
      'about.value2_title': 'Human Approach',
      'about.value2_desc': 'Every project is unique. We listen, understand and create solutions that truly reflect your needs.',
      'about.value3_title': 'Continuous Innovation',
      'about.value3_desc': 'AI, automation and new technologies hold no secrets for us. We stay at the cutting edge.',
      'about.value4_title': 'Global Vision',
      'about.value4_desc': 'Based in Israel, we work with clients worldwide and master international challenges.',
      'about.team_button': 'Discover our team',
      'about.cta_title': 'Ready to join the adventure?',
      'about.cta_desc': 'Whether you\'re an ambitious startup or an established company, we have the skills and passion to propel your project to success.',
      'about.cta_button1': 'Discuss your project',
      'about.cta_button2': 'View our testimonials',
      
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
      'services.web_title': 'אתרי אינטרנט מקצועיים',
      'services.web_desc': 'יצירת אתרים מתקדמים ב-Wix, WordPress, Shopify ו-Framer עם עיצוב מודרני ואופטימיזציה לקידום באינטרנט.',
      'services.app_title': 'אפליקציות מותאמות אישית',
      'services.app_desc': 'פיתוח אפליקציות אינטרנט וניידות מותאמות אישית שמותאמות בדיוק לצרכים העסקיים שלכם.',
      'services.automation_title': 'אוטומציות חכמות',
      'services.automation_desc': 'בצעו אופטימיזציה לתהליכים שלכם עם Make, Zapier, N8N. חברו את הכלים שלכם וחסכו זמן יקר.',
      'services.leads_title': 'יצירת לידים',
      'services.leads_desc': 'נצלו את ה-API של Google Maps כדי לזהות ולמקד את הלקוחות הפוטנציאליים שלכם בדיוק.',
      'services.ai_title': 'בינה מלאכותית וסוכנים מותאמים',
      'services.ai_desc': 'צרו GPT מותאמים אישית וסוכני AI שמבצעים אוטומציה למשימות שלכם ומשפרים את הפרודקטיביות.',
      'services.feature1': 'עיצוב רספונסיבי',
      'services.feature2': 'אופטימיזציה לקידום באינטרנט',
      'services.feature3': 'ביצועים אופטימליים',
      'services.feature4': 'ממשק אינטואיטיבי',
      'services.feature5': 'ארכיטקטורה ניתנת להרחבה',
      'services.feature6': 'API חזקים',
      'services.feature7': 'UX/UI מלוטשים',
      'services.feature8': 'תחזוקה כלולה',
      'services.feature9': 'זרימות עבודה מותאמות',
      'services.feature10': 'אינטגרציות מרובות',
      'services.feature11': 'ניטור מתקדם',
      'services.feature12': 'ROI ניתן למדידה',
      'services.feature13': 'מיקוד גיאוגרפי',
      'services.feature14': 'נתונים מוסמכים',
      'services.feature15': 'ייצוא אוטומטי',
      'services.feature16': 'CRM משולב',
      'services.feature17': 'GPT מותאמים אישית',
      'services.feature18': 'צ\'אטבוטים חכמים',
      'services.feature19': 'ניתוח אוטומטי',
      'services.feature20': 'הכשרה כלולה',
      'services.learn_more': 'למד עוד',
      'services.cta_title': 'מוכנים להפוך את החזון שלכם למציאות?',
      'services.cta_desc': 'בואו נדון בפרויקט שלכם ונגלה יחד את הפתרונות המושלמים לעסק שלכם.',
      'services.cta_button': 'תזמנו שיחה חינם',

      // Projects Section
      'projects.badge': 'ההישגים שלנו',
      'projects.title': 'פרויקטים שמשנים עסקים',
      'projects.subtitle': 'גלו איך עזרנו ללקוחות שלנו להשיג את המטרות שלהם באמצעות פתרונות דיגיטליים חדשניים ומתקדמים.',
      'projects.project1_title': 'מסחר אלקטרוני Fashion Forward',
      'projects.project1_desc': 'חנות אונליין ב-Shopify עם מערכת התאמה אישית מתקדמת ואוטומציות שיווק מלאות.',
      'projects.project2_title': 'לוח בקרת אנליטיקה SaaS',
      'projects.project2_desc': 'אפליקציית אינטרנט מלאה לניתוח נתונים עם אינטגרציות API מרובות והדמיות בזמן אמת.',
      'projects.project3_title': 'אוטומציית יצירת לידים',
      'projects.project3_desc': 'מערכת מלאה לרכישת לידים דרך Google Maps API עם CRM משולב וזרימות עבודה אוטומטיות.',
      'projects.project4_title': 'צ\'אטבוט AI לתמיכת לקוחות',
      'projects.project4_desc': 'סוכן שיחה חכם עם GPT מותאם אישית לתמיכת לקוחות 24/7 של חברת פינטק.',
      'projects.project5_title': 'תיק עבודות אדריכל',
      'projects.project5_desc': 'אתר תצוגה ב-Framer עם אנימציות חלקות וגלריה אינטראקטיבית למשרד אדריכלות נודע.',
      'projects.project6_title': 'זרימת עבודה אוטומטית במשאבי אנוש',
      'projects.project6_desc': 'מערכת ניהול משאבי אנוש עם אוטומציות Zapier להטמעה, הכשרה והערכת עובדים.',
      'projects.view_project': 'צפה בפרויקט',
      'projects.cta_title': 'הפרויקט שלכם יכול להיות הבא',
      'projects.cta_desc': 'כל פרויקט הוא ייחודי. בואו נדון באתגרים ובמטרות שלכם כדי ליצור פתרון מותאם במושלם.',
      'projects.cta_button': 'התחילו את הפרויקט שלכם',

      // About Section
      'about.badge': 'אודות zyFlows',
      'about.title': 'מומחיות טכנולוגית בשירות השאיפות שלכם',
      'about.mission_title': 'המשימה שלנו',
      'about.mission_text1': 'ב-zyFlows, אנחנו מאמינים שהטכנולוגיה צריכה לשרת את האדם, לא להיפך. הצוות שלנו, הממוקם בישראל, משלב חדשנות טכנולוגית מתקדמת עם גישה אנושית ונגישה.',
      'about.mission_text2': 'אנחנו הופכים אתגרים מורכבים לפתרונות אלגנטיים, בין אם דרך אתרי אינטרנט מתקדמים, אוטומציות חכמות או סוכני AI מותאמים אישית.',
      'about.values_title': 'הערכים הבסיסיים שלנו',
      'about.value1_title': 'מצוינות טכנית',
      'about.value1_desc': 'אנחנו דוחפים את הגבולות של מה שאפשר עם הטכנולוגיות האחרונות ושיטות העבודה הטובות ביותר בפיתוח.',
      'about.value2_title': 'גישה אנושית',
      'about.value2_desc': 'כל פרויקט הוא ייחודי. אנחנו מקשיבים, מבינים ויוצרים פתרונות שמשקפים באמת את הצרכים שלכם.',
      'about.value3_title': 'חדשנות מתמשכת',
      'about.value3_desc': 'בינה מלאכותית, אוטומציה וטכנולוגיות חדשות לא מסתוריות עבורנו. אנחנו נשארים בחזית.',
      'about.value4_title': 'חזון גלובלי',
      'about.value4_desc': 'מבוססים בישראל, אנחנו עובדים עם לקוחות מרחבי העולם ושולטים באתגרים הבינלאומיים.',
      'about.team_button': 'גלו את הצוות שלנו',
      'about.cta_title': 'מוכנים להצטרף להרפתקה?',
      'about.cta_desc': 'בין אם אתם סטארט-אפ שאפתני או חברה מבוססת, יש לנו את הכישורים והתשוקה להוביל את הפרויקט שלכם להצלחה.',
      'about.cta_button1': 'דונו בפרויקט שלכם',
      'about.cta_button2': 'צפו בהמלצות שלנו',
      
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
