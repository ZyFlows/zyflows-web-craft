import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Language = 'fr' | 'en' | 'he';

// Déclaration globale pour TypeScript
declare global {
  interface Window {}
}

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
  const [language, setLanguage] = useState<Language>('he');
  const [isDetecting, setIsDetecting] = useState(true);

  // Fonction de détection géographique
  const detectLanguageFromGeo = async (): Promise<Language> => {
    try {
      // Tentative de géolocalisation via ipapi.co
      const response = await fetch('https://ipapi.co/json/', {
        signal: AbortSignal.timeout(3000) // Timeout après 3 secondes
      });
      
      if (response.ok) {
        const data = await response.json();
        const countryCode = data.country_code;
        
        // France → Français
        if (countryCode === 'FR') {
          return 'fr';
        }
        // Fallback si pas de pays détecté → Langue du navigateur
      }
    } catch (error) {
      console.log('Geo detection failed, using fallback');
    }
    
    // Fallback : langue du navigateur
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'fr') return 'fr';
    if (browserLang === 'en') return 'en';
    if (browserLang === 'he' || browserLang === 'iw') return 'he';
    
    // Défaut : Hébreu
    return 'he';
  };

  // Effet pour détecter et charger la langue
  useEffect(() => {
    const initializeLanguage = async () => {
      // 1. Vérifier s'il y a une préférence sauvegardée (priorité absolue)
      const savedLang = localStorage.getItem('preferred-language') as Language;
      const supportedLangs: Language[] = ['fr', 'en', 'he'];
      
      if (savedLang && supportedLangs.includes(savedLang)) {
        setLanguage(savedLang);
        setIsDetecting(false);
        return;
      }
      
      // 2. Détecter automatiquement via géolocalisation
      const detectedLang = await detectLanguageFromGeo();
      setLanguage(detectedLang);
      setIsDetecting(false);
    };

    initializeLanguage();
  }, []);

  // Synchroniser la direction du document et la classe body pour RTL/LTR (ex: Chatbase)
  useEffect(() => {
    const dir = language === 'he' ? 'rtl' : 'ltr';
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', dir);
      document.body.classList.remove('rtl', 'ltr');
      document.body.classList.add(dir);
    }
  }, [language]);
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
      'hero.badge': 'Solutions digitales innovantes',
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
      // Project tags
      'projects.tag_automation': 'Automatisation',
      'projects.tag_design': 'Design',
      'projects.tag_support': 'Support',
      'projects.tag_animation': 'Animation',
      'projects.tag_architecture': 'Architecture',
      'projects.tag_productivity': 'Productivité',
      // Project metrics
      'projects.metric1_1': '+150% conversions',
      'projects.metric1_2': '2s temps de chargement',
      'projects.metric1_3': '99.9% uptime',
      'projects.metric2_1': '10K+ utilisateurs',
      'projects.metric2_2': 'Données temps réel',
      'projects.metric2_3': 'Cloud scalable',
      'projects.metric3_1': '500+ leads/mois',
      'projects.metric3_2': '80% qualification',
      'projects.metric3_3': '3h économisées/jour',
      'projects.metric4_1': '90% résolution auto',
      'projects.metric4_2': '24/7 disponible',
      'projects.metric4_3': '-60% tickets',
      'projects.metric5_1': '95 PageSpeed',
      'projects.metric5_2': 'Design Award',
      'projects.metric5_3': '+200% trafic',
      'projects.metric6_1': '5h économisées/semaine',
      'projects.metric6_2': '100% automatisé',
      'projects.metric6_3': '0 erreur manuelle',

      // About Section  
      'about.badge': 'À Propos de zyFlows',
      'about.title': 'L\'expertise tech au service de vos ambitions',
      'about.mission_title': 'Notre Mission',
      'about.mission_text1': 'Chez zyFlows, nous croyons que la technologie doit servir l\'humain, pas l\'inverse. Notre équipe combine l\'innovation technologique de pointe avec une approche profondément humaine et accessible.',
      'about.mission_text2': 'Nous transformons les défis complexes en solutions élégantes, que ce soit à travers des sites web performants, des automatisations intelligentes ou des agents IA sur-mesure.',
      'about.values_title': 'Nos Valeurs Fondamentales',
      'about.value1_title': 'Excellence Technique',
      'about.value1_desc': 'Nous repoussons les limites du possible avec les dernières technologies et les meilleures pratiques du développement.',
      'about.value2_title': 'Approche Humaine',
      'about.value2_desc': 'Chaque projet est unique. Nous écoutons, comprenons et créons des solutions qui reflètent vraiment vos besoins.',
      'about.value3_title': 'Innovation Continue',
      'about.value3_desc': 'L\'IA, l\'automatisation et les nouvelles technologies n\'ont plus de secrets pour nous. Nous restons à la pointe.',
      'about.value4_title': 'Vision Globale',
      'about.value4_desc': 'Nous travaillons avec des clients du monde entier et maîtrisons les enjeux internationaux.',
      'about.team_button': 'Découvrir notre équipe',
      'about.cta_title': 'Prêt à rejoindre l\'aventure ?',
      'about.cta_desc': 'Que vous soyez une startup ambitieuse ou une entreprise établie, nous avons les compétences et la passion pour propulser votre projet vers le succès.',
      'about.cta_button1': 'Discuter de votre projet',
      'about.cta_button2': 'Voir nos témoignages',
      'about.achievements1': 'Projets réalisés',
      'about.achievements2': 'Pays touchés',
      'about.achievements3': 'Clients satisfaits',
      'about.achievements4': 'Années d\'expertise',
      'about.features1': 'Solutions 100% personnalisées',
      'about.features2': 'Support technique réactif 24/7',
      'about.features3': 'Méthodologie agile et transparente',
      'about.features4': 'Formation et accompagnement inclus',

      // Testimonials Section
      'testimonials.badge': 'Témoignages Clients',
      'testimonials.title': 'Ce que disent nos clients satisfaits',
      'testimonials.subtitle': 'Plus de 50 projets réalisés, des résultats concrets et mesurables. Découvrez comment zyFlows a transformé leurs entreprises.',
      'testimonials.cta_title': 'Rejoignez nos clients satisfaits',
      'testimonials.cta_desc': 'Votre success story pourrait être la prochaine. Parlons de votre projet et découvrons ensemble comment transformer vos défis en opportunités.',
      'testimonials.cta_button': 'Démarrer votre projet',
      'testimonials.stat1': 'Projets réalisés',
      'testimonials.stat2': 'Clients satisfaits',
      'testimonials.stat3': 'Note moyenne',
      'testimonials.stat4': 'Projets livrés à temps',
      'testimonials.testimonial1': 'zyFlows a transformé notre présence digitale. Leur automatisation des leads via Google Maps nous a permis d\'augmenter nos ventes de 200% en 6 mois. Une équipe exceptionnelle !',
      'testimonials.testimonial2': 'Le chatbot IA développé par zyFlows gère maintenant 90% de nos demandes support. Notre équipe peut enfin se concentrer sur les tâches à haute valeur ajoutée. Résultat : productivité x3 !',
      'testimonials.testimonial3': 'Notre site Framer est une œuvre d\'art fonctionnelle. Les animations fluides et l\'UX impeccable nous ont valu 3 prix design. zyFlows comprend vraiment l\'esthétique ET la performance.',
      'testimonials.testimonial4': 'L\'application web développée par zyFlows gère plus de 10K utilisateurs daily sans broncher. Architecture robuste, code propre et support technique au top. Je recommande vivement !',
      'testimonials.testimonial5': 'Notre boutique Shopify conçue par zyFlows convertit 3x mieux qu\'avant. Les automatisations marketing et l\'UX optimisée ont révolutionné notre business. ROI exceptionnel !',
      'testimonials.testimonial6': 'Les workflows Make.com mis en place nous font économiser 25h/semaine. Tout est automatisé, de la qualification des leads au suivi client. L\'efficacité à l\'état pur !',
      'testimonials.project1': 'Système de génération de leads',
      'testimonials.project2': 'Agent IA conversationnel',
      'testimonials.project3': 'Site vitrine portfolio',
      'testimonials.project4': 'Dashboard analytics temps réel',
      'testimonials.project5': 'Boutique en ligne complète',
      'testimonials.project6': 'Automatisation processus métier',

      // Contact Section
      'contact.badge': 'Contactez-nous',
      'contact.title': 'Parlons de votre projet',
      'contact.subtitle': 'Notre équipe est prête à transformer vos idées en solutions concrètes',
      'contact.firstName': 'Prénom',
      'contact.lastName': 'Nom',
      'contact.email': 'Email',
      'contact.phone': 'Téléphone',
      'contact.company': 'Entreprise',
      'contact.message': 'Message',
      'contact.message_placeholder': 'Décrivez-nous votre projet et vos objectifs...',
      'contact.email_placeholder': 'votre@email.com',
      'contact.phone_placeholder': '+33 6 12 34 56 78',
      'contact.company_placeholder': 'Nom de votre entreprise',
      'contact.gdpr': 'J\'accepte la',
      'contact.privacy': 'politique de confidentialité',
      'contact.submit': 'Envoyer ma demande',
      'contact.sending': 'Envoi en cours...',
      'contact.success': 'Merci ! Nous vous recontacterons sous 24h.',
      'contact.error': 'Erreur lors de l\'envoi. Veuillez réessayer.',
      'contact.email_label': 'Email',
      'contact.phone_label': 'Téléphone',
      'contact.location_label': 'Bureaux',
      'contact.hours_label': 'Horaires',
      'contact.hours': 'Lun-Ven: 9h-18h (CET/IST)',
      
      // Footer
      'footer.developed_by': 'Développé par',
      'contact.service1': 'Site Web (Wix/WordPress/Shopify/Framer)',
      'contact.service2': 'Application Sur-Mesure',
      'contact.service3': 'Automatisation (Make/Zapier/N8N)',
      'contact.service4': 'Génération de Leads (Google Maps)',
      'contact.service5': 'IA & GPT Personnalisés',
      'contact.service6': 'Audit & Conseil',
      'contact.service7': 'Support & Maintenance',
      'contact.service8': 'Autre',
      'contact.budget1': '< 5K€',
      'contact.budget2': '5K€ - 15K€',
      'contact.budget3': '15K€ - 50K€',
      'contact.budget4': '50K€ - 100K€',
      'contact.budget5': '> 100K€',
      'contact.budget6': 'À discuter',
      'contact.timeline1': 'Urgent (< 1 mois)',
      'contact.timeline2': 'Rapide (1-3 mois)',
      'contact.timeline3': 'Standard (3-6 mois)',
      'contact.timeline4': 'Flexible (> 6 mois)',
      'contact.timeline5': 'À planifier',
      'contact.benefit1': 'Réponse garantie sous 24h',
      'contact.benefit2': 'Appel découverte gratuit',
      'contact.benefit3': 'Devis personnalisé offert',
      'contact.benefit4': 'Support technique inclus',
      'contact.alt1_title': 'Planifier un appel',
      'contact.alt1_desc': 'Réservez directement un créneau pour discuter de votre projet',
      'contact.alt1_button': 'Calendly',
      'contact.alt2_title': 'Chat en direct',
      'contact.alt2_desc': 'Posez vos questions via notre chat support',
      'contact.alt2_button': 'WhatsApp',
      'contact.alt3_title': 'Audit gratuit',
      'contact.alt3_desc': 'Recevez une analyse de votre situation actuelle',
      'contact.alt3_button': 'Demander',
      'contact.availability': 'Lun-Ven 9h-18h CET',

      // Footer Section
      'footer.newsletter_title': 'Restez à la pointe de l\'innovation',
      'footer.newsletter_desc': 'Recevez nos insights tech, études de cas et conseils pour optimiser votre transformation digitale. Newsletter mensuelle, 0 spam.',
      'footer.newsletter_placeholder': 'votre@email.com',
      'footer.newsletter_button': 'S\'abonner',
      'footer.newsletter_disclaimer': 'En vous abonnant, vous acceptez notre politique de confidentialité.',
      'footer.company_desc': 'Solutions digitales innovantes. Nous transformons vos idées en applications performantes, sites web exceptionnels et automatisations intelligentes.',
      'footer.services_title': 'Services',
      'footer.company_title': 'Entreprise',
      'footer.resources_title': 'Ressources',
      'footer.legal_title': 'Légal',
      'footer.copyright': '© 2024 zyFlows. Tous droits réservés.',
      'footer.made_with_love': 'Crafted with ♥ Excellence',
      'footer.start_project': 'Démarrer un projet',
      'footer.service1': 'Sites Web (Wix, WordPress, Shopify)',
      'footer.service2': 'Applications Sur-Mesure',
      'footer.service3': 'Automatisations (Make, Zapier, N8N)',
      'footer.service4': 'Génération de Leads Google Maps',
      'footer.service5': 'IA & GPT Personnalisés',
      'footer.company1': 'À propos de zyFlows',
      'footer.company2': 'Notre équipe',
      'footer.company3': 'Nos valeurs',
      'footer.company4': 'Carrières',
      'footer.company5': 'Partenaires',
      'footer.resource1': 'Blog & Actualités',
      'footer.resource2': 'Guides & Tutorials',
      'footer.resource3': 'Études de cas',
      'footer.resource4': 'Documentation API',
      'footer.resource5': 'Support technique',
      'footer.legal1': 'Mentions légales',
      'footer.legal2': 'Politique de confidentialité',
      'footer.legal3': 'Conditions d\'utilisation',
      'footer.legal4': 'RGPD',
      'footer.legal5': 'Cookies',
      
      // Language Selector
      'language.translate': 'Traduire',
      'language.select': 'Choisir la langue',
      'language.french': 'Français',
      'language.english': 'English',
      'language.hebrew': 'עברית',
      
      // WhatsApp
      'whatsapp.message': 'Bonjour 👋 Je suis intéressé(e) par vos services digitaux (site web, automation, IA). Pouvez-vous m\'en dire plus ?',
      'whatsapp.aria_label': 'Contacter par WhatsApp',
      'whatsapp.tooltip': 'Envoyer un message WhatsApp'
    },
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.services': 'Services',
      'nav.projects': 'Projects',
      'nav.about': 'About',
      'nav.testimonials': 'Testimonials',
      'nav.contact': 'Contact',
      'nav.start_project': 'Start a Project',
      
      // Hero Section
      'hero.badge': 'Innovative Digital Solutions',
      'hero.title': 'Transform Your Digital Ideas into Reality',
      'hero.subtitle': 'zyFlows designs high-performing websites, custom applications and intelligent automations that propel your business toward the future.',
      'hero.cta_services': 'Discover Our Services',
      'hero.cta_projects': 'View Our Projects',
      'hero.stat1': 'Projects Completed',
      'hero.stat2': 'Satisfied Clients',
      'hero.stat3': 'Responsive Support',
      
      // Services Section
      'services.badge': 'Our Services',
      'services.title': 'Complete Solutions for Your Digital Transformation',
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
      'services.feature1': 'Responsive Design',
      'services.feature2': 'SEO Optimization',
      'services.feature3': 'Optimal Performance',
      'services.feature4': 'Intuitive Interface',
      'services.feature5': 'Scalable Architecture',
      'services.feature6': 'Robust APIs',
      'services.feature7': 'Polished UX/UI',
      'services.feature8': 'Maintenance Included',
      'services.feature9': 'Custom Workflows',
      'services.feature10': 'Multiple Integrations',
      'services.feature11': 'Advanced Monitoring',
      'services.feature12': 'Measurable ROI',
      'services.feature13': 'Geographic Targeting',
      'services.feature14': 'Qualified Data',
      'services.feature15': 'Automatic Export',
      'services.feature16': 'Integrated CRM',
      'services.feature17': 'Custom GPTs',
      'services.feature18': 'Intelligent Chatbots',
      'services.feature19': 'Automated Analysis',
      'services.feature20': 'Training Included',
      'services.learn_more': 'Learn More',
      'services.cta_title': 'Ready to Transform Your Vision into Reality?',
      'services.cta_desc': 'Let\'s discuss your project and discover together the perfect solutions for your business.',
      'services.cta_button': 'Schedule a Free Call',

      // Projects Section
      'projects.badge': 'Our Achievements',
      'projects.title': 'Projects That Transform Businesses',
      'projects.subtitle': 'Discover how we helped our clients achieve their goals through innovative and high-performing digital solutions.',
      'projects.project1_title': 'E-commerce Fashion Forward',
      'projects.project1_desc': 'Shopify online store with advanced customization system and complete marketing automations.',
      'projects.project2_title': 'SaaS Analytics Dashboard',
      'projects.project2_desc': 'Complete web application for data analysis with multiple API integrations and real-time visualizations.',
      'projects.project3_title': 'Lead Generation Automation',
      'projects.project3_desc': 'Complete lead acquisition system via Google Maps API with integrated CRM and automated workflows.',
      'projects.project4_title': 'AI Customer Support Chatbot',
      'projects.project4_desc': 'Intelligent conversational agent with custom GPT for 24/7 customer support of a fintech company.',
      'projects.project5_title': 'Architect Portfolio',
      'projects.project5_desc': 'Framer showcase site with smooth animations and interactive gallery for a renowned architecture firm.',
      'projects.project6_title': 'Automated HR Workflow',
      'projects.project6_desc': 'HR management system with Zapier automations for onboarding, training and employee evaluation.',
      'projects.view_project': 'View Project',
      'projects.cta_title': 'Your Project Could Be Next',
      'projects.cta_desc': 'Every project is unique. Let\'s discuss your challenges and objectives to create a perfectly adapted solution.',
      'projects.cta_button': 'Start Your Project',
      // Project tags
      'projects.tag_automation': 'Automation',
      'projects.tag_design': 'Design',
      'projects.tag_support': 'Support',
      'projects.tag_animation': 'Animation',
      'projects.tag_architecture': 'Architecture',
      'projects.tag_productivity': 'Productivity',
      // Project metrics
      'projects.metric1_1': '+150% conversions',
      'projects.metric1_2': '2s loading time',
      'projects.metric1_3': '99.9% uptime',
      'projects.metric2_1': '10K+ users',
      'projects.metric2_2': 'Real-time data',
      'projects.metric2_3': 'Cloud scalable',
      'projects.metric3_1': '500+ leads/month',
      'projects.metric3_2': '80% qualification',
      'projects.metric3_3': '3h saved/day',
      'projects.metric4_1': '90% auto resolution',
      'projects.metric4_2': '24/7 available',
      'projects.metric4_3': '-60% tickets',
      'projects.metric5_1': '95 PageSpeed',
      'projects.metric5_2': 'Design Award',
      'projects.metric5_3': '+200% traffic',
      'projects.metric6_1': '5h saved/week',
      'projects.metric6_2': '100% automated',
      'projects.metric6_3': '0 manual errors',

      // About Section
      'about.badge': 'About zyFlows',
      'about.title': 'Tech Expertise at the Service of Your Ambitions',
      'about.mission_title': 'Our Mission',
      'about.mission_text1': 'At zyFlows, we believe technology should serve humans, not the other way around. Our team combines cutting-edge technological innovation with a deeply human and accessible approach.',
      'about.mission_text2': 'We transform complex challenges into elegant solutions, whether through high-performing websites, intelligent automations, or custom AI agents.',
      'about.values_title': 'Our Core Values',
      'about.value1_title': 'Technical Excellence',
      'about.value1_desc': 'We push the boundaries of what\'s possible with the latest technologies and development best practices.',
      'about.value2_title': 'Human Approach',
      'about.value2_desc': 'Every project is unique. We listen, understand and create solutions that truly reflect your needs.',
      'about.value3_title': 'Continuous Innovation',
      'about.value3_desc': 'AI, automation and new technologies hold no secrets for us. We stay at the cutting edge.',
      'about.value4_title': 'Global Vision',
      'about.value4_desc': 'We work with clients worldwide and master international challenges.',
      'about.team_button': 'Discover Our Team',
      'about.cta_title': 'Ready to Join the Adventure?',
      'about.cta_desc': 'Whether you\'re an ambitious startup or an established company, we have the skills and passion to propel your project to success.',
      'about.cta_button1': 'Discuss Your Project',
      'about.cta_button2': 'View Our Testimonials',
      'about.achievements1': 'Projects Completed',
      'about.achievements2': 'Countries Reached',
      'about.achievements3': 'Satisfied Clients',
      'about.achievements4': 'Years of Expertise',
      'about.features1': '100% customized solutions',
      'about.features2': 'Responsive 24/7 technical support',
      'about.features3': 'Agile and transparent methodology',
      'about.features4': 'Training and support included',

      // Testimonials Section
      'testimonials.badge': 'Client Testimonials',
      'testimonials.title': 'What Our Satisfied Clients Say',
      'testimonials.subtitle': 'Over 50 completed projects, concrete and measurable results. Discover how zyFlows transformed their businesses.',
      'testimonials.cta_title': 'Join Our Satisfied Clients',
      'testimonials.cta_desc': 'Your success story could be next. Let\'s talk about your project and discover together how to turn your challenges into opportunities.',
      'testimonials.cta_button': 'Start Your Project',
      'testimonials.stat1': 'Projects Completed',
      'testimonials.stat2': 'Satisfied Clients',
      'testimonials.stat3': 'Average Rating',
      'testimonials.stat4': 'Projects Delivered on Time',
      'testimonials.testimonial1': 'zyFlows transformed our digital presence. Their lead automation via Google Maps allowed us to increase our sales by 200% in 6 months. An exceptional team!',
      'testimonials.testimonial2': 'The AI chatbot developed by zyFlows now handles 90% of our support requests. Our team can finally focus on high-value tasks. Result: 3x productivity!',
      'testimonials.testimonial3': 'Our Framer site is a functional work of art. The smooth animations and flawless UX earned us 3 design awards. zyFlows truly understands aesthetics AND performance.',
      'testimonials.testimonial4': 'The web application developed by zyFlows handles over 10K daily users without breaking a sweat. Robust architecture, clean code and top-notch technical support. Highly recommend!',
      'testimonials.testimonial5': 'Our Shopify store designed by zyFlows converts 3x better than before. Marketing automations and optimized UX revolutionized our business. Exceptional ROI!',
      'testimonials.testimonial6': 'The Make.com workflows implemented save us 25h/week. Everything is automated, from lead qualification to customer follow-up. Pure efficiency!',
      'testimonials.project1': 'Lead generation system',
      'testimonials.project2': 'Conversational AI agent',
      'testimonials.project3': 'Portfolio showcase site',
      'testimonials.project4': 'Real-time analytics dashboard',
      'testimonials.project5': 'Complete online store',
      'testimonials.project6': 'Business process automation',

      // Contact Section
      'contact.badge': 'Contact Us',
      'contact.title': 'Let\'s Talk About Your Project',
      'contact.subtitle': 'Our team is ready to transform your ideas into concrete solutions',
      'contact.firstName': 'First Name',
      'contact.lastName': 'Last Name',
      'contact.email': 'Email',
      'contact.phone': 'Phone',
      'contact.company': 'Company',
      'contact.message': 'Message',
      'contact.message_placeholder': 'Tell us about your project and goals...',
      'contact.email_placeholder': 'your@email.com',
      'contact.phone_placeholder': '+1 555 123 4567',
      'contact.company_placeholder': 'Your company name',
      'contact.gdpr': 'I accept the',
      'contact.privacy': 'privacy policy',
      'contact.submit': 'Send My Request',
      'contact.sending': 'Sending...',
      'contact.success': 'Thank you! We\'ll get back to you within 24h.',
      'contact.error': 'Error sending. Please try again.',
      'contact.email_label': 'Email',
      'contact.phone_label': 'Phone',
      'contact.location_label': 'Offices',
      'contact.hours_label': 'Hours',
      'contact.hours': 'Mon-Fri: 9am-6pm (CET/IST)',
      
      // Footer
      'footer.developed_by': 'Developed by',
      'contact.service1': 'Website (Wix/WordPress/Shopify/Framer)',
      'contact.service2': 'Custom Application',
      'contact.service3': 'Automation (Make/Zapier/N8N)',
      'contact.service4': 'Lead Generation (Google Maps)',
      'contact.service5': 'AI & Custom GPTs',
      'contact.service6': 'Audit & Consulting',
      'contact.service7': 'Support & Maintenance',
      'contact.service8': 'Other',
      'contact.budget1': '< $5K',
      'contact.budget2': '$5K - $15K',
      'contact.budget3': '$15K - $50K',
      'contact.budget4': '$50K - $100K',
      'contact.budget5': '> $100K',
      'contact.budget6': 'To be discussed',
      'contact.timeline1': 'Urgent (< 1 month)',
      'contact.timeline2': 'Fast (1-3 months)',
      'contact.timeline3': 'Standard (3-6 months)',
      'contact.timeline4': 'Flexible (> 6 months)',
      'contact.timeline5': 'To be planned',
      'contact.benefit1': 'Guaranteed response within 24h',
      'contact.benefit2': 'Free discovery call',
      'contact.benefit3': 'Free personalized quote',
      'contact.benefit4': 'Technical support included',
      'contact.alt1_title': 'Schedule a Call',
      'contact.alt1_desc': 'Book directly a slot to discuss your project',
      'contact.alt1_button': 'Calendly',
      'contact.alt2_title': 'Live Chat',
      'contact.alt2_desc': 'Ask your questions via our support chat',
      'contact.alt2_button': 'WhatsApp',
      'contact.alt3_title': 'Free Audit',
      'contact.alt3_desc': 'Receive an analysis of your current situation',
      'contact.alt3_button': 'Request',
      'contact.availability': 'Mon-Fri 9am-6pm EST',

      // Footer Section
      'footer.newsletter_title': 'Stay at the Forefront of Innovation',
      'footer.newsletter_desc': 'Receive our tech insights, case studies and tips to optimize your digital transformation. Monthly newsletter, 0 spam.',
      'footer.newsletter_placeholder': 'your@email.com',
      'footer.newsletter_button': 'Subscribe',
      'footer.newsletter_disclaimer': 'By subscribing, you accept our privacy policy.',
      'footer.company_desc': 'Innovative digital solutions. We transform your ideas into high-performing applications, exceptional websites and intelligent automations.',
      'footer.services_title': 'Services',
      'footer.company_title': 'Company',
      'footer.resources_title': 'Resources',
      'footer.legal_title': 'Legal',
      'footer.copyright': '© 2024 zyFlows. All rights reserved.',
      'footer.made_with_love': 'Crafted with ♥ Excellence',
      'footer.start_project': 'Start a Project',
      'footer.service1': 'Websites (Wix, WordPress, Shopify)',
      'footer.service2': 'Custom Applications',
      'footer.service3': 'Automations (Make, Zapier, N8N)',
      'footer.service4': 'Google Maps Lead Generation',
      'footer.service5': 'AI & Custom GPTs',
      'footer.company1': 'About zyFlows',
      'footer.company2': 'Our Team',
      'footer.company3': 'Our Values',
      'footer.company4': 'Careers',
      'footer.company5': 'Partners',
      'footer.resource1': 'Blog & News',
      'footer.resource2': 'Guides & Tutorials',
      'footer.resource3': 'Case Studies',
      'footer.resource4': 'API Documentation',
      'footer.resource5': 'Technical Support',
      'footer.legal1': 'Legal Notice',
      'footer.legal2': 'Privacy Policy',
      'footer.legal3': 'Terms of Service',
      'footer.legal4': 'GDPR',
      'footer.legal5': 'Cookies',
      
      // Language Selector
      'language.translate': 'Translate',
      'language.select': 'Choose Language',
      'language.french': 'Français',
      'language.english': 'English',
      'language.hebrew': 'עברית',

      // Email Templates
      'email.subject': 'Project Request - zyFlows',
      'email.greeting': 'Hello,',
      'email.intro_contact': "I would like to discuss a project with your team. Here are the details:",
      'email.intro_projects': "After reviewing your portfolio, I would like to discuss a similar project with your team.",
      'email.intro_testimonials': "After reading your satisfied clients' testimonials, I would like to join this list and discuss a project with your team.",
      'email.project_info': '**Project Information:**',
      'email.name_field': '- Name: [Your name]',
      'email.company_field': '- Company: [Your company name]',
      'email.email_field': '- Email: [Your email]',
      'email.phone_field': '- Phone: [Your phone number]',
      'email.service_type': '**Desired Service Type:**',
      'email.service1': '[ ] Website (Wix/WordPress/Shopify/Framer)',
      'email.service2': '[ ] Custom Application',
      'email.service3': '[ ] Automation (Make/Zapier/N8N)',
      'email.service4': '[ ] Lead Generation (Google Maps)',
      'email.service5': '[ ] AI & Custom GPTs',
      'email.service6': '[ ] Audit & Consulting',
      'email.service7': '[ ] Support & Maintenance',
      'email.service8': '[ ] Other: [Please specify]',
      'email.portfolio_inspiration': '**Portfolio project that interests me:**',
      'email.portfolio_placeholder': '[Mention the project that inspires you]',
      'email.budget': '**Estimated Budget:**',
      'email.budget1': '[ ] < $5K',
      'email.budget2': '[ ] $5K - $15K',
      'email.budget3': '[ ] $15K - $50K',
      'email.budget4': '[ ] $50K - $100K',
      'email.budget5': '[ ] > $100K',
      'email.budget6': '[ ] To be discussed',
      'email.timeline': '**Desired Timeline:**',
      'email.timeline1': '[ ] Urgent (< 1 month)',
      'email.timeline2': '[ ] Fast (1-3 months)',
      'email.timeline3': '[ ] Standard (3-6 months)',
      'email.timeline4': '[ ] Flexible (> 6 months)',
      'email.timeline5': '[ ] To be planned',
      'email.description': '**Project Description:**',
      'email.description_placeholder': '[Describe your project, objectives, and expectations]',
      'email.expected_results': '**Expected Results:**',
      'email.results_placeholder': '[Mention what type of results you expect, inspired by the testimonials]',
      'email.closing': 'Thank you for your time!',
      'email.signature': 'Best regards,',
      'email.signature_name': '[Your name]',
      'email.send_email': 'Send an email',
      'email.send_email_desc': 'Contact us directly by email with a pre-filled template for your project.',
      'email.ready_to_start': 'Ready to start your project?',
      'email.click_below': 'Click the button below to open your email client with a pre-filled template containing all the necessary information for your project.',
      
      // WhatsApp
      'whatsapp.message': 'Hello 👋 I am interested in your digital services (website, automation, AI). Can you tell me more?',
      'whatsapp.aria_label': 'Contact via WhatsApp',
      'whatsapp.tooltip': 'Send a WhatsApp message'
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
      'hero.badge': 'פתרונות דיגיטליים חדשניים',
      'hero.title': 'נהפוך את הרעיונות הדיגיטליים שלכם למציאות',
      'hero.subtitle': 'zyFlows מעצבת אתרי אינטרנט מתקדמים, יישומים מותאמים אישית ואוטומציות חכמות שמניעות את העסק שלכם קדימה לעתיד.',
      'hero.cta_services': 'גלו את השירותים שלנו',
      'hero.cta_projects': 'צפו בפרויקטים שלנו',
      'hero.stat1': 'פרויקטים שהושלמו',
      'hero.stat2': 'לקוחות מרוצים',
      'hero.stat3': 'תמיכה מהירה',
      
      // Services Section
      'services.badge': 'השירותים שלנו',
      'services.title': 'פתרונות מלאים לטרנספורמציה דיגיטלית',
      'services.subtitle': 'מעיצוב אתרים ועד אוטומציות בינה מלאכותית, אנו שולטים בכל שרשרת הערך הדיגיטלית כדי להוביל את העסק שלכם למצוינות טכנולוגית.',
      'services.web_title': 'אתרי אינטרנט מקצועיים',
      'services.web_desc': 'יצירת אתרים מתקדמים ב-Wix, WordPress, Shopify ו-Framer עם עיצוב מודרני ואופטימיזציה לקידום באינטרנט.',
      'services.app_title': 'יישומים מותאמים אישית',
      'services.app_desc': 'פיתוח יישומי אינטרנט וניידות מותאמים אישית המותאמים בדיוק לצרכים העסקיים שלכם.',
      'services.automation_title': 'אוטומציות חכמות',
      'services.automation_desc': 'ייעלו את התהליכים שלכם עם Make, Zapier, N8N. חברו את הכלים שלכם וחסכו זמן יקר.',
      'services.leads_title': 'יצירת לידים',
      'services.leads_desc': 'נצלו את ה-API של Google Maps כדי לזהות ולמקד את הלקוחות הפוטנציאליים שלכם בדיוק.',
      'services.ai_title': 'בינה מלאכותית וסוכנים מותאמים',
      'services.ai_desc': 'צרו GPT מותאמים אישית וסוכני בינה מלאכותית המבצעים אוטומציה למשימות שלכם ומשפרים את הפרודקטיביות.',
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
      'services.feature12': 'החזר השקעה ניתן למדידה',
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
      'services.cta_button': 'תזמנו שיחה חינמית',

      // Projects Section
      'projects.badge': 'ההישגים שלנו',
      'projects.title': 'פרויקטים שמשנים עסקים',
      'projects.subtitle': 'גלו איך עזרנו ללקוחות שלנו להשיג את המטרות שלהם באמצעות פתרונות דיגיטליים חדשניים ומתקדמים.',
      'projects.project1_title': 'מסחר אלקטרוני אופנה מתקדמת',
      'projects.project1_desc': 'חנות אונליין ב-Shopify עם מערכת התאמה אישית מתקדמת ואוטומציות שיווק מלאות.',
      'projects.project2_title': 'לוח בקרת אנליטיקה SaaS',
      'projects.project2_desc': 'יישום אינטרנט מלא לניתוח נתונים עם אינטגרציות API מרובות והדמיות בזמן אמת.',
      'projects.project3_title': 'אוטומציית יצירת לידים',
      'projects.project3_desc': 'מערכת מלאה לרכישת לידים דרך Google Maps API עם CRM משולב וזרימות עבודה אוטומטיות.',
      'projects.project4_title': 'צ\'אטבוט בינה מלאכותית לתמיכת לקוחות',
      'projects.project4_desc': 'סוכן שיחה חכם עם GPT מותאם אישית לתמיכת לקוחות 24/7 של חברת פינטק.',
      'projects.project5_title': 'תיק עבודות אדריכל',
      'projects.project5_desc': 'אתר תצוגה ב-Framer עם אנימציות חלקות וגלריה אינטראקטיבית למשרד אדריכלות נודע.',
      'projects.project6_title': 'זרימת עבודה אוטומטית במשאבי אנוש',
      'projects.project6_desc': 'מערכת ניהול משאבי אנוש עם אוטומציות Zapier להטמעה, הכשרה והערכת עובדים.',
      'projects.view_project': 'צפה בפרויקט',
      'projects.cta_title': 'הפרויקט שלכם יכול להיות הבא',
      'projects.cta_desc': 'כל פרויקט הוא ייחודי. בואו נדון באתגרים ובמטרות שלכם כדי ליצור פתרון מותאם במושלם.',
      'projects.cta_button': 'התחילו את הפרויקט שלכם',
      // Project tags
      'projects.tag_automation': 'אוטומציה',
      'projects.tag_design': 'עיצוב',
      'projects.tag_support': 'תמיכה',
      'projects.tag_animation': 'אנימציה',
      'projects.tag_architecture': 'אדריכלות',
      'projects.tag_productivity': 'פרודקטיביות',
      // Project metrics
      'projects.metric1_1': '+150% המרות',
      'projects.metric1_2': '2 שניות זמן טעינה',
      'projects.metric1_3': '99.9% זמינות',
      'projects.metric2_1': '+10K משתמשים',
      'projects.metric2_2': 'נתונים בזמן אמת',
      'projects.metric2_3': 'ענן ניתן להרחבה',
      'projects.metric3_1': '+500 לידים לחודש',
      'projects.metric3_2': '80% הסמכה',
      'projects.metric3_3': '3 שעות חסכון ליום',
      'projects.metric4_1': '90% פתרון אוטומטי',
      'projects.metric4_2': '24/7 זמינות',
      'projects.metric4_3': '-60% כרטיסי תמיכה',
      'projects.metric5_1': '95 PageSpeed',
      'projects.metric5_2': 'פרס עיצוב',
      'projects.metric5_3': '+200% תנועה',
      'projects.metric6_1': '5 שעות חסכון לשבוע',
      'projects.metric6_2': '100% אוטומטי',
      'projects.metric6_3': '0 שגיאות ידניות',

      // About Section
      'about.badge': 'אודות zyFlows',
      'about.title': 'מומחיות טכנולוגית בשירות השאיפות שלכם',
      'about.mission_title': 'המשימה שלנו',
      'about.mission_text1': 'ב-zyFlows, אנו מאמינים שהטכנולוגיה צריכה לשרת את האדם, לא להיפך. הצוות שלנו משלב חדשנות טכנולוגית מתקדמת עם גישה אנושית ונגישה עמוקה.',
      'about.mission_text2': 'אנו הופכים אתגרים מורכבים לפתרונות אלגנטיים, בין אם דרך אתרי אינטרנט מתקדמים, אוטומציות חכמות או סוכני בינה מלאכותית מותאמים אישית.',
      'about.values_title': 'הערכים הבסיסיים שלנו',
      'about.value1_title': 'מצוינות טכנית',
      'about.value1_desc': 'אנו דוחפים את הגבולות של מה שאפשר עם הטכנולוגיות האחרונות ושיטות העבודה הטובות ביותר בפיתוח.',
      'about.value2_title': 'גישה אנושית',
      'about.value2_desc': 'כל פרויקט הוא ייחודי. אנו מקשיבים, מבינים ויוצרים פתרונות המשקפים באמת את הצרכים שלכם.',
      'about.value3_title': 'חדשנות מתמשכת',
      'about.value3_desc': 'בינה מלאכותית, אוטומציה וטכנולוגיות חדשות אינן מסתוריות עבורנו. אנו נשארים בחזית.',
      'about.value4_title': 'חזון גלובלי',
      'about.value4_desc': 'אנו עובדים עם לקוחות מרחבי העולם ושולטים באתגרים הבינלאומיים.',
      'about.team_button': 'גלו את הצוות שלנו',
      'about.cta_title': 'מוכנים להצטרף להרפתקה?',
      'about.cta_desc': 'בין אם אתם סטארט-אפ שאפתני או חברה מבוססת, יש לנו את הכישורים והתשוקה להוביל את הפרויקט שלכם להצלחה.',
      'about.cta_button1': 'דונו בפרויקט שלכם',
      'about.cta_button2': 'צפו בהמלצות שלנו',
      'about.achievements1': 'פרויקטים שהושלמו',
      'about.achievements2': 'מדינות שהושפעו',
      'about.achievements3': 'לקוחות מרוצים',
      'about.achievements4': 'שנות מומחיות',
      'about.features1': 'פתרונות מותאמים 100%',
      'about.features2': 'תמיכה טכנית מהירה 24/7',
      'about.features3': 'מתודולוגיה זריזה ושקופה',
      'about.features4': 'הכשרה וליווי כלולים',

      // Testimonials Section
      'testimonials.badge': 'המלצות לקוחות',
      'testimonials.title': 'מה אומרים הלקוחות המרוצים שלנו',
      'testimonials.subtitle': 'יותר מ-50 פרויקטים שהושלמו, תוצאות קונקרטיות וניתנות למדידה. גלו איך zyFlows שינתה את העסקים שלהם.',
      'testimonials.cta_title': 'הצטרפו ללקוחות המרוצים שלנו',
      'testimonials.cta_desc': 'סיפור ההצלחה שלכם יכול להיות הבא. בואו נדבר על הפרויקט שלכם ונגלה יחד איך להפוך את האתגרים שלכם להזדמנויות.',
      'testimonials.cta_button': 'התחילו את הפרויקט שלכם',
      'testimonials.stat1': 'פרויקטים שהושלמו',
      'testimonials.stat2': 'לקוחות מרוצים',
      'testimonials.stat3': 'ציון ממוצע',
      'testimonials.stat4': 'פרויקטים שנמסרו בזמן',
      'testimonials.testimonial1': 'zyFlows שינתה את הנוכחות הדיגיטלית שלנו. האוטומציה שלהם ללידים דרך Google Maps אפשרה לנו להגדיל את המכירות ב-200% תוך 6 חודשים. צוות יוצא דופן!',
      'testimonials.testimonial2': 'הצ\'אטבוט בינה מלאכותית שפיתחה zyFlows מטפל כעת ב-90% מבקשות התמיכה שלנו. הצוות שלנו יכול סוף סוף להתמקד במשימות בעלות ערך גבוה. תוצאה: פרודקטיביות פי 3!',
      'testimonials.testimonial3': 'האתר Framer שלנו הוא יצירת אמנות פונקציונלית. האנימציות החלקות וה-UX המושלם זיכו אותנו ב-3 פרסי עיצוב. zyFlows באמת מבינה אסתטיקה וביצועים.',
      'testimonials.testimonial4': 'יישום האינטרנט שפיתחה zyFlows מטפל ביותר מ-10K משתמשים יומיים בקלות. ארכיטקטורה חזקה, קוד נקי ותמיכה טכנית מעולה. ממליץ בחום!',
      'testimonials.testimonial5': 'החנות Shopify שלנו שעוצבה על ידי zyFlows ממירה פי 3 יותר מקודם. האוטומציות השיווקיות וה-UX המותאם חוללו מהפכה בעסק שלנו. החזר השקעה יוצא דופן!',
      'testimonials.testimonial6': 'זרימות העבודה Make.com שהוקמו חוסכות לנו 25 שעות שבועיות. הכל אוטומטי, מהכשרת הלידים ועד מעקב לקוחות. יעילות במיטבה!',
      'testimonials.project1': 'מערכת יצירת לידים',
      'testimonials.project2': 'סוכן שיחה בינה מלאכותית',
      'testimonials.project3': 'אתר תצוגה לפורטפוליו',
      'testimonials.project4': 'לוח בקרת אנליטיקה בזמן אמת',
      'testimonials.project5': 'חנות אונליין מלאה',
      'testimonials.project6': 'אוטומציית תהליכים עסקיים',

      // Contact Section
      'contact.badge': 'צרו קשר',
      'contact.title': 'בואו נדבר על הפרויקט שלכם',
      'contact.subtitle': 'הצוות שלנו מוכן להפוך את הרעיונות שלכם לפתרונות קונקרטיים',
      'contact.firstName': 'שם פרטי',
      'contact.lastName': 'שם משפחה',
      'contact.email': 'אימייל',
      'contact.phone': 'טלפון',
      'contact.company': 'חברה',
      'contact.message': 'הודעה',
      'contact.message_placeholder': 'ספרו לנו על הפרויקט והמטרות שלכם...',
      'contact.email_placeholder': 'האימייל@שלכם.com',
      'contact.phone_placeholder': '+972 50 123 4567',
      'contact.company_placeholder': 'שם החברה שלכם',
      'contact.gdpr': 'אני מסכים/ה ל',
      'contact.privacy': 'מדיניות הפרטיות',
      'contact.submit': 'שלחו את הבקשה',
      'contact.sending': 'שולח...',
      'contact.success': 'תודה! ניצור איתך קשר תוך 24 שעות.',
      'contact.error': 'שגיאה בשליחה. אנא נסו שוב.',
      'contact.email_label': 'אימייל',
      'contact.phone_label': 'טלפון',
      'contact.location_label': 'משרדים',
      'contact.hours_label': 'שעות פעילות',
      'contact.hours': 'א\'-ה\': 9:00-18:00 (CET/IST)',
      
      // Footer
      'footer.developed_by': 'פותח על ידי',
      'contact.service1': 'אתר אינטרנט (Wix/WordPress/Shopify/Framer)',
      'contact.service2': 'יישום מותאם אישית',
      'contact.service3': 'אוטומציה (Make/Zapier/N8N)',
      'contact.service4': 'יצירת לידים (Google Maps)',
      'contact.service5': 'בינה מלאכותית ו-GPT מותאמים',
      'contact.service6': 'ביקורת וייעוץ',
      'contact.service7': 'תמיכה ותחזוקה',
      'contact.service8': 'אחר',
      'contact.budget1': '< 20K ₪',
      'contact.budget2': '20K-60K ₪',
      'contact.budget3': '60K-200K ₪',
      'contact.budget4': '200K-400K ₪',
      'contact.budget5': '> 400K ₪',
      'contact.budget6': 'לדיון',
      'contact.timeline1': 'דחוף (< חודש)',
      'contact.timeline2': 'מהיר (1-3 חודשים)',
      'contact.timeline3': 'סטנדרטי (3-6 חודשים)',
      'contact.timeline4': 'גמיש (> 6 חודשים)',
      'contact.timeline5': 'לתכנון',
      'contact.benefit1': 'מענה מובטח תוך 24 שעות',
      'contact.benefit2': 'שיחת היכרות חינמית',
      'contact.benefit3': 'הצעת מחיר מותאמת חינם',
      'contact.benefit4': 'תמיכה טכנית כלולה',
      'contact.alt1_title': 'תזמנו שיחה',
      'contact.alt1_desc': 'הזמינו ישירות משבצת לדיון על הפרויקט שלכם',
      'contact.alt1_button': 'Calendly',
      'contact.alt2_title': 'צ\'אט חי',
      'contact.alt2_desc': 'שאלו שאלות דרך הצ\'אט תמיכה שלנו',
      'contact.alt2_button': 'WhatsApp',
      'contact.alt3_title': 'ביקורת חינמית',
      'contact.alt3_desc': 'קבלו ניתוח של המצב הנוכחי שלכם',
      'contact.alt3_button': 'בקשה',
      'contact.availability': 'א\'-ה\' 9:00-18:00',

      // Footer Section
      'footer.newsletter_title': 'הישארו בחזית החדשנות',
      'footer.newsletter_desc': 'קבלו את התובנות הטכנולוגיות שלנו, מקרי בוחן וטיפים לייעול הטרנספורמציה הדיגיטלית שלכם. ניוזלטר חודשי, אפס ספאם.',
      'footer.newsletter_placeholder': 'האימייל@שלכם.com',
      'footer.newsletter_button': 'הרשמה',
      'footer.newsletter_disclaimer': 'על ידי ההרשמה, אתם מסכימים למדיניות הפרטיות שלנו.',
      'footer.company_desc': 'פתרונות דיגיטליים חדשניים. אנו הופכים את הרעיונות שלכם ליישומים מתקדמים, אתרי אינטרנט יוצאי דופן ואוטומציות חכמות.',
      'footer.services_title': 'שירותים',
      'footer.company_title': 'החברה',
      'footer.resources_title': 'משאבים',
      'footer.legal_title': 'משפטי',
      'footer.copyright': '© 2024 zyFlows. כל הזכויות שמורות.',
      'footer.made_with_love': 'נוצר עם ♥ מצוינות',
      'footer.start_project': 'התחל פרויקט',
      'footer.service1': 'אתרי אינטרנט (Wix, WordPress, Shopify)',
      'footer.service2': 'יישומים מותאמים אישית',
      'footer.service3': 'אוטומציות (Make, Zapier, N8N)',
      'footer.service4': 'יצירת לידים Google Maps',
      'footer.service5': 'בינה מלאכותית ו-GPT מותאמים',
      'footer.company1': 'אודות zyFlows',
      'footer.company2': 'הצוות שלנו',
      'footer.company3': 'הערכים שלנו',
      'footer.company4': 'קריירה',
      'footer.company5': 'שותפים',
      'footer.resource1': 'בלוג וחדשות',
      'footer.resource2': 'מדריכים וטוטוריאלים',
      'footer.resource3': 'מקרי בוחן',
      'footer.resource4': 'תיעוד API',
      'footer.resource5': 'תמיכה טכנית',
      'footer.legal1': 'הודעה משפטית',
      'footer.legal2': 'מדיניות פרטיות',
      'footer.legal3': 'תנאי שירות',
      'footer.legal4': 'GDPR',
      'footer.legal5': 'עוגיות',
      
      // Language Selector
      'language.translate': 'תרגם',
      'language.select': 'בחר שפה',
      'language.french': 'צרפתית',
      'language.english': 'אנגלית',
      'language.hebrew': 'עברית',

      // Email Templates
      'email.subject': 'בקשת פרויקט - zyFlows',
      'email.greeting': 'שלום,',
      'email.intro_contact': 'הייתי רוצה לדון על פרויקט עם הצוות שלכם. הנה הפרטים:',
      'email.intro_projects': 'לאחר שעיינתי בפורטפוליו שלכם, הייתי רוצה לדון על פרויקט דומה עם הצוות שלכם.',
      'email.intro_testimonials': 'לאחר שקראתי את ההמלצות של הלקוחות המרוצים שלכם, הייתי רוצה להצטרף לרשימה הזו ולדון על פרויקט עם הצוות שלכם.',
      'email.project_info': '**מידע על הפרויקט:**',
      'email.name_field': '- שם: [השם שלכם]',
      'email.company_field': '- חברה: [שם החברה שלכם]',
      'email.email_field': '- אימייל: [האימייל שלכם]',
      'email.phone_field': '- טלפון: [מספר הטלפון שלכם]',
      'email.service_type': '**סוג השירות הרצוי:**',
      'email.service1': '[ ] אתר אינטרנט (Wix/WordPress/Shopify/Framer)',
      'email.service2': '[ ] יישום מותאם אישית',
      'email.service3': '[ ] אוטומציה (Make/Zapier/N8N)',
      'email.service4': '[ ] יצירת לידים (Google Maps)',
      'email.service5': '[ ] בינה מלאכותית ו-GPT מותאמים',
      'email.service6': '[ ] ביקורת וייעוץ',
      'email.service7': '[ ] תמיכה ותחזוקה',
      'email.service8': '[ ] אחר: [אנא פרטו]',
      'email.portfolio_inspiration': '**פרויקט מהפורטפוליו שמעניין אותי:**',
      'email.portfolio_placeholder': '[ציינו את הפרויקט שמעורר בכם השראה]',
      'email.budget': '**תקציב משוער:**',
      'email.budget1': '[ ] < 20K ₪',
      'email.budget2': '[ ] 20K-60K ₪',
      'email.budget3': '[ ] 60K-200K ₪',
      'email.budget4': '[ ] 200K-400K ₪',
      'email.budget5': '[ ] > 400K ₪',
      'email.budget6': '[ ] לדיון',
      'email.timeline': '**לוח זמנים רצוי:**',
      'email.timeline1': '[ ] דחוף (< חודש)',
      'email.timeline2': '[ ] מהיר (1-3 חודשים)',
      'email.timeline3': '[ ] סטנדרטי (3-6 חודשים)',
      'email.timeline4': '[ ] גמיש (> 6 חודשים)',
      'email.timeline5': '[ ] לתכנון',
      'email.description': '**תיאור הפרויקט:**',
      'email.description_placeholder': '[תארו את הפרויקט, המטרות והציפיות שלכם]',
      'email.expected_results': '**תוצאות צפויות:**',
      'email.results_placeholder': '[ציינו איזה סוג תוצאות אתם מצפים לקבל, בהשראת ההמלצות]',
      'email.closing': 'תודה על זמנכם!',
      'email.signature': 'בכבוד רב,',
      'email.signature_name': '[השם שלכם]',
      'email.send_email': 'שלח אימייל',
      'email.send_email_desc': 'צרו איתנו קשר ישירות באימייל עם תבנית מוכנה מראש לפרויקט שלכם.',
      'email.ready_to_start': 'מוכנים להתחיל את הפרויקט שלכם?',
      'email.click_below': 'לחצו על הכפתור למטה כדי לפתוח את לקוח האימייל שלכם עם תבנית מוכנה מראש המכילה את כל המידע הדרוש לפרויקט שלכם.',
      
      // WhatsApp
      'whatsapp.message': 'שלום 👋 אני מעוניין/ת בשירותים הדיגיטליים שלכם (אתר אינטרנט, אוטומציה, בינה מלאכותית). אתם יכולים לספר לי יותר?',
      'whatsapp.aria_label': 'יצירת קשר דרך WhatsApp',
      'whatsapp.tooltip': 'שליחת הודעת WhatsApp'
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Wrapper pour setLanguage qui sauvegarde la préférence
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('preferred-language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {isDetecting ? (
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      ) : (
        <div className={language === 'he' ? 'rtl' : 'ltr'}>
          {children}
        </div>
      )}
    </LanguageContext.Provider>
  );
};
