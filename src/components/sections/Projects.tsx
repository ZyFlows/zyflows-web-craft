import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight, Lightbulb, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useEffect, useState } from "react";
import { ProjectModal } from "@/components/ui/project-modal";
import MosaicCarousel from "@/components/ui/mosaic-carousel";
import OptimizedImage from "@/components/ui/optimized-image";

// Import des mockups générés
import mockupEcommerce from "@/assets/mockup-ecommerce.jpg";
import mockupEcommerceProduct from "@/assets/mockup-ecommerce-product.jpg";
import mockupEcommerceCheckout from "@/assets/mockup-ecommerce-checkout.jpg";
import mockupSaas from "@/assets/mockup-saas.jpg";
import mockupSaasPricing from "@/assets/mockup-saas-pricing.jpg";
import mockupSaasDashboard from "@/assets/mockup-saas-dashboard.jpg";
import mockupProfessional from "@/assets/mockup-professional.jpg";
import mockupProfessionalContact from "@/assets/mockup-professional-contact.jpg";
import mockupProfessionalServices from "@/assets/mockup-professional-services.jpg";
import mockupBakery from "@/assets/mockup-bakery.jpg";
import mockupBakeryMenu from "@/assets/mockup-bakery-menu.jpg";
import mockupBakeryAbout from "@/assets/mockup-bakery-about.jpg";
import mockupPortfolio from "@/assets/mockup-portfolio.jpg";
import mockupAgency from "@/assets/mockup-agency.jpg";
import mockupBlog from "@/assets/mockup-blog.jpg";
import mockupRealEstate from "@/assets/mockup-realestate.jpg";
import mockupAutomation from "@/assets/mockup-automation.jpg";
import mockupAutomationWorkflow from "@/assets/mockup-automation-workflow.jpg";
import mockupAutomationAnalytics from "@/assets/mockup-automation-analytics.jpg";
import mockupCustomGpt from "@/assets/mockup-custom-gpt.jpg";
import mockupGptTraining from "@/assets/mockup-gpt-training.jpg";
import mockupGptDeployment from "@/assets/mockup-gpt-deployment.jpg";

// Import des nouveaux mockups WordPress
import mockupWordpressSpa from "@/assets/mockup-wordpress-spa.jpg";
import mockupWordpressFitness from "@/assets/mockup-wordpress-fitness.jpg";
import mockupWordpressTravel from "@/assets/mockup-wordpress-travel.jpg";
import mockupWordpressEducation from "@/assets/mockup-wordpress-education.jpg";
import mockupWordpressHotel from "@/assets/mockup-wordpress-hotel.jpg";
import mockupWordpressStartup from "@/assets/mockup-wordpress-startup.jpg";
import mockupWordpressRestaurant from "@/assets/mockup-wordpress-restaurant.jpg";
import mockupWordpressDental from "@/assets/mockup-wordpress-dental.jpg";
import mockupWordpressArchitecture from "@/assets/mockup-wordpress-architecture.jpg";
import mockupWordpressConsultant from "@/assets/mockup-wordpress-consultant.jpg";
import mockupWordpressPhotographer from "@/assets/mockup-wordpress-photographer.jpg";
import mockupWordpressMusic from "@/assets/mockup-wordpress-music.jpg";
import mockupWordpressWedding from "@/assets/mockup-wordpress-wedding.jpg";
import mockupWordpressMedical from "@/assets/mockup-wordpress-medical.jpg";
import mockupWordpressCoaching from "@/assets/mockup-wordpress-coaching.jpg";
import mockupWordpressBeauty from "@/assets/mockup-wordpress-beauty.jpg";
import mockupWordpressSoftware from "@/assets/mockup-wordpress-software.jpg";
import mockupWordpressElearning from "@/assets/mockup-wordpress-elearning.jpg";
import mockupWordpressCharity from "@/assets/mockup-wordpress-charity.jpg";
import mockupWordpressConstruction from "@/assets/mockup-wordpress-construction.jpg";
import mockupWordpressFreelance from "@/assets/mockup-wordpress-freelance.jpg";
import mockupWordpressFoodDelivery from "@/assets/mockup-wordpress-food-delivery.jpg";
import mockupWordpressAutomotive from "@/assets/mockup-wordpress-automotive.jpg";
import mockupWordpressFinance from "@/assets/mockup-wordpress-finance.jpg";
import mockupWordpressPetcare from "@/assets/mockup-wordpress-petcare.jpg";
import mockupWordpressOrganicFarm from "@/assets/mockup-wordpress-organic-farm.jpg";

const Projects = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const autoplayPlugin = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectView = (projectTitle: string) => {
    console.log('handleProjectView called with:', projectTitle);
    console.log('detailedProjects:', detailedProjects);
    const project = detailedProjects.find(p => p.title === projectTitle);
    console.log('Found project:', project);
    if (project) {
      console.log('Setting selectedProject and opening modal');
      setSelectedProject(project);
      setIsModalOpen(true);
    } else {
      console.log('Project not found!');
    }
  };

  const handleGithubView = (projectTitle: string) => {
    console.log(`Viewing GitHub for project: ${projectTitle}`);
    toast({
      title: "GitHub",
      description: `Code source du projet: ${projectTitle}`,
    });
  };

  const handleWhatsAppProject = () => {
    const phoneNumber = "972584229255";
    const message = language === 'fr' 
      ? "💼 Bonjour ! J'ai vu vos projets et je suis impressionné. Je souhaite discuter d'un projet similaire. Êtes-vous disponible ?"
      : language === 'he'
      ? "💼 שלום! ראיתי את הפרויקטים שלכם ואני מתרשם. אני רוצה לדבר על פרויקט דומה. אתם פנויים?"
      : "💼 Hello! I saw your projects and I'm impressed. I'd like to discuss a similar project. Are you available?";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Données détaillées pour la modale
  const detailedProjects = [
    {
      title: language === 'he' ? 'חנות אופנה אונליין' : language === 'en' ? 'Fashion E-commerce Store' : 'Boutique E-commerce Mode',
      description: language === 'he' ? 'פלטפורמת מכירות אלגנטה עם עיצוב מינימליסטי ותחושה חמה' : language === 'en' ? 'Elegant sales platform with minimalist design and warm feel' : 'Plateforme de vente élégante avec design minimaliste et ambiance chaleureuse',
      detailedDescription: language === 'he' ? 'פיתחנו חנות אופנה מקוונת מתוחכמת העוצבה במיוחד לקהל צעיר ועכשווי. החנות כוללת מערכת ניהול מלאי מתקדמת, מערכת תשלומים מאובטחת ויישום נייד נלווה. העיצוב מדגיש את המוצרים תוך שמירה על נוחות גלישה ורכישה.' : language === 'en' ? 'We developed a sophisticated online fashion store designed specifically for a young, contemporary audience. The store features an advanced inventory management system, secure payment system, and companion mobile app. The design emphasizes products while maintaining browsing and purchase comfort.' : 'Nous avons développé une boutique de mode en ligne sophistiquée conçue spécifiquement pour un public jeune et contemporain. La boutique dispose d\'un système de gestion des stocks avancé, d\'un système de paiement sécurisé et d\'une application mobile complémentaire. Le design met l\'accent sur les produits tout en maintenant le confort de navigation et d\'achat.',
      image: mockupEcommerce,
      gallery: [mockupEcommerce, mockupEcommerceProduct, mockupEcommerceCheckout],
      tags: ["WordPress", "WooCommerce", "UI/UX", language === 'he' ? 'עיצוב רספונסיבי' : language === 'en' ? 'Responsive Design' : 'Design Responsive'],
      metrics: [
        language === 'he' ? 'עלייה של 40% במכירות' : language === 'en' ? '+40% increase in sales' : '+40% d\'augmentation des ventes',
        language === 'he' ? 'זמן טעינה מתחת ל-2 שניות' : language === 'en' ? 'Loading time under 2s' : 'Temps de chargement < 2s',
        language === 'he' ? 'חוויית משתמש אופטימלית' : language === 'en' ? 'Optimal user experience' : 'Expérience utilisateur optimale'
      ],
      features: [
        language === 'he' ? 'מערכת ניהול מלאי מתקדמת' : language === 'en' ? 'Advanced inventory management' : 'Gestion d\'inventaire avancée',
        language === 'he' ? 'תשלומים מאובטחים' : language === 'en' ? 'Secure payments' : 'Paiements sécurisés',
        language === 'he' ? 'עיצוב רספונסיבי' : language === 'en' ? 'Responsive design' : 'Design responsive',
        language === 'he' ? 'יישום נייד נלווה' : language === 'en' ? 'Companion mobile app' : 'Application mobile complémentaire'
      ],
      duration: language === 'he' ? '3 חודשים' : language === 'en' ? '3 months' : '3 mois',
      team: language === 'he' ? '4 מפתחים, מעצב UI/UX' : language === 'en' ? '4 developers, UI/UX designer' : '4 développeurs, designer UI/UX',
      objective: language === 'he' ? 'יצירת חוויית קנייה מעולה שתגדיל את ההמרות ותחזק את נאמנות הלקוחות' : language === 'en' ? 'Create an excellent shopping experience that will increase conversions and strengthen customer loyalty' : 'Créer une excellente expérience d\'achat qui augmentera les conversions et renforcera la fidélité des clients',
      delay: "0s"
    },
    {
      title: language === 'he' ? 'פלטפורמת SaaS טכנולוגית' : language === 'en' ? 'Tech SaaS Platform' : 'Plateforme SaaS Technologique',
      description: language === 'he' ? 'דף נחיתה מודרני לשירות טכנולוגי עם ממשק אינטואיטיבי' : language === 'en' ? 'Modern landing page for tech service with intuitive interface' : 'Page d\'atterrissage moderne pour service tech avec interface intuitive',
      detailedDescription: language === 'he' ? 'יצרנו דף נחיתה מתוחכם לפלטפורמת SaaS טכנולוגית עם דגש על המרת מבקרים ללקוחות. הדף כולל אנימציות חלקות, מחשבונים אינטראקטיביים ומערכת בדיקות A/B מתקדמת. העיצוב מושתת על טרנדים חדשניים בתחום הטכנולוגיה.' : language === 'en' ? 'We created a sophisticated landing page for a technological SaaS platform with emphasis on converting visitors to customers. The page includes smooth animations, interactive calculators, and an advanced A/B testing system. The design is based on innovative trends in technology.' : 'Nous avons créé une page d\'atterrissage sophistiquée pour une plateforme SaaS technologique en mettant l\'accent sur la conversion des visiteurs en clients. La page comprend des animations fluides, des calculateurs interactifs et un système de tests A/B avancé. Le design est basé sur les tendances innovantes en technologie.',
      image: mockupSaas,
      gallery: [mockupSaas, mockupSaasPricing, mockupSaasDashboard],
      tags: ["Landing Page", "Conversion", "Tech", language === 'he' ? 'גרדיאנטים' : language === 'en' ? 'Gradients' : 'Gradients'],
      metrics: [
        language === 'he' ? 'שיעור המרה של 25%' : language === 'en' ? '25% conversion rate' : 'Taux de conversion 25%',
        language === 'he' ? 'ממשק משתמש מודרני' : language === 'en' ? 'Modern user interface' : 'Interface utilisateur moderne',
        language === 'he' ? 'אופטימיזציה למובייל' : language === 'en' ? 'Mobile optimization' : 'Optimisation mobile'
      ],
      features: [
        language === 'he' ? 'אנימציות חלקות' : language === 'en' ? 'Smooth animations' : 'Animations fluides',
        language === 'he' ? 'מחשבונים אינטראקטיביים' : language === 'en' ? 'Interactive calculators' : 'Calculateurs interactifs',
        language === 'he' ? 'בדיקות A/B מתקדמות' : language === 'en' ? 'Advanced A/B testing' : 'Tests A/B avancés',
        language === 'he' ? 'עיצוב רספונסיבי' : language === 'en' ? 'Responsive design' : 'Design responsive'
      ],
      duration: language === 'he' ? '6 שבועות' : language === 'en' ? '6 weeks' : '6 semaines',
      team: language === 'he' ? '3 מפתחים, מעצב UX' : language === 'en' ? '3 developers, UX designer' : '3 développeurs, designer UX',
      objective: language === 'he' ? 'הגדלת שיעור ההמרה והצגת הפלטפורמה בצורה מקצועית ואמינה' : language === 'en' ? 'Increase conversion rate and present the platform professionally and reliably' : 'Augmenter le taux de conversion et présenter la plateforme de manière professionnelle et fiable',
      delay: "0.2s"
    },
    {
      title: language === 'he' ? 'משרד עורכי דין מקצועי' : language === 'en' ? 'Professional Law Firm' : 'Cabinet d\'Avocat Professionnel',
      description: language === 'he' ? 'אתר מקצועי עם אמינות גבוהה וגישה אישית לקוחות' : language === 'en' ? 'Professional website with high credibility and personal client approach' : 'Site professionnel avec haute crédibilité et approche client personnelle',
      detailedDescription: language === 'he' ? 'פיתחנו אתר מקצועי למשרד עורכי דין המתמחה בדיני חברות ומקרקעין. האתר בונה אמינות מיידית באמצעות עיצוב קלאסי ואלגנטי, תוכן משפטי מקצועי ומערכת הזמנת פגישות מתקדמת. כל רכיב תוכנן להשרות ביטחון ומקצועיות.' : language === 'en' ? 'We developed a professional website for a law firm specializing in corporate and real estate law. The site builds immediate credibility through classic and elegant design, professional legal content, and an advanced appointment booking system. Every component was designed to instill confidence and professionalism.' : 'Nous avons développé un site web professionnel pour un cabinet d\'avocats spécialisé en droit des sociétés et immobilier. Le site établit une crédibilité immédiate grâce à un design classique et élégant, un contenu juridique professionnel et un système de prise de rendez-vous avancé. Chaque composant a été conçu pour inspirer confiance et professionnalisme.',
      image: mockupProfessional,
      gallery: [mockupProfessional, mockupProfessionalContact, mockupProfessionalServices],
      tags: ["Services", language === 'he' ? 'מקצועי' : language === 'en' ? 'Professional' : 'Professionnel', "Trust", language === 'he' ? 'אלגנטי' : language === 'en' ? 'Elegant' : 'Élégant'],
      metrics: [
        language === 'he' ? 'עלייה של 60% בפניות' : language === 'en' ? '+60% increase in inquiries' : '+60% d\'augmentation des demandes',
        language === 'he' ? 'חוויה מקצועית' : language === 'en' ? 'Professional experience' : 'Expérience professionnelle',
        language === 'he' ? 'בניית אמון ומהימנות' : language === 'en' ? 'Trust and credibility building' : 'Construction de confiance'
      ],
      features: [
        language === 'he' ? 'מערכת הזמנת פגישות' : language === 'en' ? 'Appointment booking system' : 'Système de prise de rendez-vous',
        language === 'he' ? 'תוכן משפטי מקצועי' : language === 'en' ? 'Professional legal content' : 'Contenu juridique professionnel',
        language === 'he' ? 'עיצוב אלגנטי ואמין' : language === 'en' ? 'Elegant and trustworthy design' : 'Design élégant et fiable',
        language === 'he' ? 'אופטימיזציה למנועי חיפוש' : language === 'en' ? 'SEO optimization' : 'Optimisation SEO'
      ],
      duration: language === 'he' ? '8 שבועות' : language === 'en' ? '8 weeks' : '8 semaines',
      team: language === 'he' ? '3 מפתחים, כותב תוכן משפטי' : language === 'en' ? '3 developers, legal content writer' : '3 développeurs, rédacteur de contenu juridique',
      objective: language === 'he' ? 'הקמת נוכחות דיגיטלית מקצועית שתבסס אמינות ותגדיל את מספר הלקוחות' : language === 'en' ? 'Establish a professional digital presence that will build credibility and increase the number of clients' : 'Établir une présence numérique professionnelle qui renforcera la crédibilité et augmentera le nombre de clients',
      delay: "0.4s"
    },
    {
      title: language === 'he' ? 'מאפייה מקומית חמה' : language === 'en' ? 'Cozy Local Bakery' : 'Boulangerie Locale Chaleureuse',
      description: language === 'he' ? 'אתר ויטרינה עם אווירה חמה ותחושת בית לעסק מקומי' : language === 'en' ? 'Showcase website with warm atmosphere and homey feel for local business' : 'Site vitrine avec atmosphère chaleureuse et ambiance maison pour commerce local',
      detailedDescription: language === 'he' ? 'יצרנו אתר ויטרינה חם ומזמין למאפייה מקומית עם דגש על אווירה ביתית ואותנטית. האתר כולל גלריית תמונות מפתה, מערכת הזמנות מקוונת ופרטי מוצרים מפורטים. כל האלמנטים תוכננו ליצור חיבור רגשי עם הלקוחות.' : language === 'en' ? 'We created a warm and inviting showcase website for a local bakery with emphasis on homey and authentic atmosphere. The site includes a tempting photo gallery, online ordering system, and detailed product information. All elements were designed to create an emotional connection with customers.' : 'Nous avons créé un site vitrine chaleureux et accueillant pour une boulangerie locale en mettant l\'accent sur une atmosphère familiale et authentique. Le site comprend une galerie de photos alléchantes, un système de commande en ligne et des informations détaillées sur les produits. Tous les éléments ont été conçus pour créer une connexion émotionnelle avec les clients.',
      image: mockupBakery,
      gallery: [mockupBakery, mockupBakeryMenu, mockupBakeryAbout],
      tags: [language === 'he' ? 'עסק מקומי' : language === 'en' ? 'Local Business' : 'Commerce Local', language === 'he' ? 'חם' : language === 'en' ? 'Warm' : 'Chaleureux', language === 'he' ? 'ויטרינה' : language === 'en' ? 'Showcase' : 'Vitrine', language === 'he' ? 'אותנטי' : language === 'en' ? 'Authentic' : 'Authentique'],
      metrics: [
        language === 'he' ? 'עלייה של 80% בהזמנות' : language === 'en' ? '+80% increase in orders' : '+80% d\'augmentation des commandes',
        language === 'he' ? 'חיבור רגשי לקהל המטרה' : language === 'en' ? 'Emotional connection with target audience' : 'Connexion émotionnelle avec la cible',
        language === 'he' ? 'זיהוי מותג חזק' : language === 'en' ? 'Strong brand recognition' : 'Reconnaissance de marque forte'
      ],
      features: [
        language === 'he' ? 'גלריית תמונות מפתה' : language === 'en' ? 'Tempting photo gallery' : 'Galerie de photos alléchantes',
        language === 'he' ? 'מערכת הזמנות מקוונת' : language === 'en' ? 'Online ordering system' : 'Système de commande en ligne',
        language === 'he' ? 'פרטי מוצרים מפורטים' : language === 'en' ? 'Detailed product information' : 'Informations détaillées sur les produits',
        language === 'he' ? 'עיצוב חם ומזמין' : language === 'en' ? 'Warm and inviting design' : 'Design chaleureux et accueillant'
      ],
      duration: language === 'he' ? '4 שבועות' : language === 'en' ? '4 weeks' : '4 semaines',
      team: language === 'he' ? '2 מפתחים, צלם מוצרים' : language === 'en' ? '2 developers, product photographer' : '2 développeurs, photographe de produits',
      objective: language === 'he' ? 'יצירת נוכחות דיגיטלית חמה שתחבר רגשית ללקוחות ותגדיל מכירות' : language === 'en' ? 'Create a warm digital presence that will emotionally connect with customers and increase sales' : 'Créer une présence numérique chaleureuse qui se connectera émotionnellement avec les clients et augmentera les ventes',
      delay: "0.6s"
    },
    {
      title: language === 'he' ? 'פורטפוליו יוצר תוכן' : language === 'en' ? 'Creative Portfolio' : 'Portfolio Créatif',
      description: language === 'he' ? 'פורטפוליו אמנותי לצלם עם גלריה אלגנטיה ועיצוב מתוחכם' : language === 'en' ? 'Artistic portfolio for photographer with elegant gallery and sophisticated design' : 'Portfolio artistique pour photographe avec galerie élégante et design sophistiqué',
      detailedDescription: language === 'he' ? 'בנינו פורטפוליו דיגיטלי מתוחכם לצלם מקצועי עם דגש על תצוגה ויזואלית מושלמת. הפורטפוליו כולל גלריות מסווגות, מערכת צפייה במסך מלא ומנגנון אחסון ענן מתקדם. כל תמונה מוצגת באיכות הגבוהה ביותר.' : language === 'en' ? 'We built a sophisticated digital portfolio for a professional photographer with emphasis on perfect visual display. The portfolio includes categorized galleries, full-screen viewing system, and advanced cloud storage mechanism. Every image is displayed in the highest quality.' : 'Nous avons construit un portfolio numérique sophistiqué pour un photographe professionnel en mettant l\'accent sur un affichage visuel parfait. Le portfolio comprend des galeries catégorisées, un système de visualisation plein écran et un mécanisme de stockage cloud avancé. Chaque image est affichée dans la plus haute qualité.',
      image: mockupPortfolio,
      gallery: [mockupPortfolio, mockupAgency, mockupBlog],
      tags: ["Portfolio", language === 'he' ? 'אמנותי' : language === 'en' ? 'Artistic' : 'Artistique', language === 'he' ? 'גלריה' : language === 'en' ? 'Gallery' : 'Galerie', language === 'he' ? 'מינימליסטי' : language === 'en' ? 'Minimalist' : 'Minimaliste'],
      metrics: [
        language === 'he' ? 'עלייה של 120% בפניות לקוחות' : language === 'en' ? '+120% increase in client inquiries' : '+120% d\'augmentation des demandes clients',
        language === 'he' ? 'חוויה ויזואלית מושלמת' : language === 'en' ? 'Perfect visual experience' : 'Expérience visuelle parfaite',
        language === 'he' ? 'תצוגה אופטימלית לעבודות' : language === 'en' ? 'Optimal work showcase' : 'Présentation optimale des travaux'
      ],
      features: [
        language === 'he' ? 'גלריות מסווגות' : language === 'en' ? 'Categorized galleries' : 'Galeries catégorisées',
        language === 'he' ? 'צפייה במסך מלא' : language === 'en' ? 'Full-screen viewing' : 'Visualisation plein écran',
        language === 'he' ? 'איכות תמונה גבוהה' : language === 'en' ? 'High image quality' : 'Haute qualité d\'image',
        language === 'he' ? 'עיצוב מינימליסטי' : language === 'en' ? 'Minimalist design' : 'Design minimaliste'
      ],
      duration: language === 'he' ? '5 שבועות' : language === 'en' ? '5 weeks' : '5 semaines',
      team: language === 'he' ? '2 מפתחים, מעצב UI' : language === 'en' ? '2 developers, UI designer' : '2 développeurs, designer UI',
      objective: language === 'he' ? 'יצירת פלטפורמה ויזואלית מושלמת להצגת עבודות אמנותיות באיכות גבוהה' : language === 'en' ? 'Create a perfect visual platform for showcasing artistic works in high quality' : 'Créer une plateforme visuelle parfaite pour présenter des œuvres artistiques en haute qualité',
      delay: "0.8s"
    },
    {
      title: language === 'he' ? 'סטארט-אפ חדשני' : language === 'en' ? 'Innovative Startup' : 'Startup Innovant',
      description: language === 'he' ? 'אתר סוכנות דינמי עם אנרגיה צעירה ומראה מודרני' : language === 'en' ? 'Dynamic agency website with youthful energy and modern look' : 'Site d\'agence dynamique avec énergie jeune et look moderne',
      detailedDescription: language === 'he' ? 'פיתחנו אתר דינמי וחדשני לסטארט-אפ טכנולוגי עם דגש על חדשנות ואנרגיה צעירה. האתר כולל אנימציות אינטראקטיביות, מקטעי וידאו משובצים ומערכת ניהול תוכן גמישה. העיצוב משקף את הרוח החדשנית של החברה.' : language === 'en' ? 'We developed a dynamic and innovative website for a tech startup with emphasis on innovation and youthful energy. The site includes interactive animations, embedded video sections, and a flexible content management system. The design reflects the innovative spirit of the company.' : 'Nous avons développé un site web dynamique et innovant pour une startup technologique en mettant l\'accent sur l\'innovation et l\'énergie jeune. Le site comprend des animations interactives, des sections vidéo intégrées et un système de gestion de contenu flexible. Le design reflète l\'esprit innovant de l\'entreprise.',
      image: mockupAgency,
      gallery: [mockupAgency, mockupSaas, mockupPortfolio],
      tags: ["Startup", language === 'he' ? 'חדשנות' : language === 'en' ? 'Innovation' : 'Innovation', language === 'he' ? 'דינמי' : language === 'en' ? 'Dynamic' : 'Dynamique', language === 'he' ? 'מודרני' : language === 'en' ? 'Modern' : 'Moderne'],
      metrics: [
        language === 'he' ? 'משיכת 200+ לקוחות בחודש' : language === 'en' ? 'Attracted 200+ clients per month' : 'Attraction de 200+ clients par mois',
        language === 'he' ? 'זיהוי מותג בולט' : language === 'en' ? 'Outstanding brand recognition' : 'Reconnaissance de marque remarquable',
        language === 'he' ? 'חוויה אינטראקטיבית' : language === 'en' ? 'Interactive experience' : 'Expérience interactive'
      ],
      features: [
        language === 'he' ? 'אנימציות אינטראקטיביות' : language === 'en' ? 'Interactive animations' : 'Animations interactives',
        language === 'he' ? 'מקטעי וידאו משובצים' : language === 'en' ? 'Embedded video sections' : 'Sections vidéo intégrées',
        language === 'he' ? 'ניהול תוכן גמיש' : language === 'en' ? 'Flexible content management' : 'Gestion de contenu flexible',
        language === 'he' ? 'עיצוב חדשני' : language === 'en' ? 'Innovative design' : 'Design innovant'
      ],
      duration: language === 'he' ? '7 שבועות' : language === 'en' ? '7 weeks' : '7 semaines',
      team: language === 'he' ? '4 מפתחים, אנימטור' : language === 'en' ? '4 developers, animator' : '4 développeurs, animateur',
      objective: language === 'he' ? 'יצירת זהות דיגיטלית חדשנית שתמשוך משקיעים ולקוחות פוטנציאליים' : language === 'en' ? 'Create an innovative digital identity that will attract investors and potential clients' : 'Créer une identité numérique innovante qui attirera les investisseurs et les clients potentiels',
      delay: "1s"
    },
    {
      title: language === 'he' ? 'בלוג אורח חיים' : language === 'en' ? 'Lifestyle Blog' : 'Blog Lifestyle',
      description: language === 'he' ? 'פלטפורמת תוכן עם עיצוב מגזיני ואסתטיקה נשית עדינה' : language === 'en' ? 'Content platform with magazine design and delicate feminine aesthetic' : 'Plateforme de contenu avec design magazine et esthétique féminine délicate',
      detailedDescription: language === 'he' ? 'יצרנו פלטפורמת תוכן אלגנטית לבלוג אורח חיים עם עיצוב מגזיני מתוחכם. הפלטפורמה כוללת מערכת ניהול תוכן מתקדמת, כלי שיתוף חברתי ומנגנון הזנות RSS. העיצוב משלב אסתטיקה נשית עדינה עם פונקציונליות מודרנית.' : language === 'en' ? 'We created an elegant content platform for a lifestyle blog with sophisticated magazine design. The platform includes an advanced content management system, social sharing tools, and RSS feed mechanism. The design combines delicate feminine aesthetic with modern functionality.' : 'Nous avons créé une plateforme de contenu élégante pour un blog lifestyle avec un design de magazine sophistiqué. La plateforme comprend un système de gestion de contenu avancé, des outils de partage social et un mécanisme de flux RSS. Le design combine une esthétique féminine délicate avec une fonctionnalité moderne.',
      image: mockupBlog,
      gallery: [mockupBlog, mockupPortfolio, mockupAgency],
      tags: ["Blog", language === 'he' ? 'תוכן' : language === 'en' ? 'Content' : 'Contenu', language === 'he' ? 'מגזין' : language === 'en' ? 'Magazine' : 'Magazine', language === 'he' ? 'אלגנטי' : language === 'en' ? 'Elegant' : 'Élégant'],
      metrics: [
        language === 'he' ? '50K+ צפיות חודשיות' : language === 'en' ? '50K+ monthly views' : '50K+ vues mensuelles',
        language === 'he' ? 'קהילה מעורבת' : language === 'en' ? 'Engaged community' : 'Communauté engagée',
        language === 'he' ? 'חוויית קריאה מהנה' : language === 'en' ? 'Enjoyable reading experience' : 'Expérience de lecture agréable'
      ],
      features: [
        language === 'he' ? 'ניהול תוכן מתקדם' : language === 'en' ? 'Advanced content management' : 'Gestion de contenu avancée',
        language === 'he' ? 'כלי שיתוף חברתי' : language === 'en' ? 'Social sharing tools' : 'Outils de partage social',
        language === 'he' ? 'עיצוב מגזיני' : language === 'en' ? 'Magazine design' : 'Design de magazine',
        language === 'he' ? 'אסתטיקה נשית עדינה' : language === 'en' ? 'Delicate feminine aesthetic' : 'Esthétique féminine délicate'
      ],
      duration: language === 'he' ? '6 שבועות' : language === 'en' ? '6 weeks' : '6 semaines',
      team: language === 'he' ? '3 מפתחים, כותב תוכן' : language === 'en' ? '3 developers, content writer' : '3 développeurs, rédacteur de contenu',
      objective: language === 'he' ? 'בניית קהילה מעורבת של קוראות ויצירת פלטפורמה אלגנטית לתוכן איכותי' : language === 'en' ? 'Build an engaged community of readers and create an elegant platform for quality content' : 'Construire une communauté engagée de lecteurs et créer une plateforme élégante pour un contenu de qualité',
      delay: "1.2s"
    },
    {
      title: language === 'he' ? 'סוכנות נדל"ן יוקרתית' : language === 'en' ? 'Luxury Real Estate Agency' : 'Agence Immobilière de Luxe',
      description: language === 'he' ? 'פלטפורמה מתוחכמת לנכסי יוקרה עם מראה מקצועי ואמין' : language === 'en' ? 'Sophisticated platform for luxury properties with professional and trustworthy look' : 'Plateforme sophistiquée pour propriétés de luxe avec look professionnel et fiable',
      detailedDescription: language === 'he' ? 'פיתחנו פלטפורמה מתוחכמת לסוכנות נדל"ן יוקרתית עם דגש על מקצועיות ואמינות. הפלטפורמה כוללת מנוע חיפוש מתקדם, טיולים וירטואליים בנכסים ומערכת CRM משולבת. כל נכס מוצג בצורה יוקרתית ומפורטת.' : language === 'en' ? 'We developed a sophisticated platform for a luxury real estate agency with emphasis on professionalism and reliability. The platform includes an advanced search engine, virtual property tours, and integrated CRM system. Every property is presented in a luxurious and detailed manner.' : 'Nous avons développé une plateforme sophistiquée pour une agence immobilière de luxe en mettant l\'accent sur le professionnalisme et la fiabilité. La plateforme comprend un moteur de recherche avancé, des visites virtuelles de propriétés et un système CRM intégré. Chaque propriété est présentée de manière luxueuse et détaillée.',
      image: mockupRealEstate,
      gallery: [mockupRealEstate, mockupProfessional, mockupSaas],
      tags: [language === 'he' ? 'נדל"ן' : language === 'en' ? 'Real Estate' : 'Immobilier', language === 'he' ? 'יוקרה' : language === 'en' ? 'Luxury' : 'Luxe', language === 'he' ? 'מקצועי' : language === 'en' ? 'Professional' : 'Professionnel', language === 'he' ? 'אמין' : language === 'en' ? 'Trustworthy' : 'Fiable'],
      metrics: [
        language === 'he' ? 'עלייה של 90% במכירות' : language === 'en' ? '+90% increase in sales' : '+90% d\'augmentation des ventes',
        language === 'he' ? 'לקוחות VIP מרוצים' : language === 'en' ? 'Satisfied VIP clients' : 'Clients VIP satisfaits',
        language === 'he' ? 'מותג יוקרה מוכר' : language === 'en' ? 'Recognized luxury brand' : 'Marque de luxe reconnue'
      ],
      features: [
        language === 'he' ? 'מנוע חיפוש מתקדם' : language === 'en' ? 'Advanced search engine' : 'Moteur de recherche avancé',
        language === 'he' ? 'טיולים וירטואליים' : language === 'en' ? 'Virtual tours' : 'Visites virtuelles',
        language === 'he' ? 'מערכת CRM משולבת' : language === 'en' ? 'Integrated CRM system' : 'Système CRM intégré',
        language === 'he' ? 'תצוגה יוקרתית' : language === 'en' ? 'Luxurious presentation' : 'Présentation luxueuse'
      ],
      duration: language === 'he' ? '10 שבועות' : language === 'en' ? '10 weeks' : '10 semaines',
      team: language === 'he' ? '5 מפתחים, מעצב UX/UI' : language === 'en' ? '5 developers, UX/UI designer' : '5 développeurs, designer UX/UI',
      objective: language === 'he' ? 'יצירת פלטפורמה יוקרתית שתמשוך לקוחות VIP ותגדיל מכירות נדל"ן יוקרה' : language === 'en' ? 'Create a luxury platform that will attract VIP clients and increase luxury real estate sales' : 'Créer une plateforme de luxe qui attirera des clients VIP et augmentera les ventes immobilières de luxe',
      delay: "1.4s"
    },
    {
      title: language === 'he' ? 'מערכת אוטומציה חכמה' : language === 'en' ? 'Smart Automation System' : 'Système d\'Automatisation Intelligent',
      description: language === 'he' ? 'פלטפורמה מתקדמת לאוטומציה של תהליכים עסקיים מורכבים' : language === 'en' ? 'Advanced platform for automating complex business processes' : 'Plateforme avancée pour automatiser des processus métier complexes',
      detailedDescription: language === 'he' ? 'פיתחנו מערכת אוטומציה מתוחכמת המחברת בין כלים שונים בחברה ומאפשרת אוטומציה מלאה של תהליכים עסקיים. המערכת כוללת ממשק ויזואלי לבניית זרימות עבודה, מנוע כללי חכם ומערכת ניטור מתקדמת. החיסכון בזמן והשיפור ביעילות מדהימים.' : language === 'en' ? 'We developed a sophisticated automation system that connects different company tools and enables full automation of business processes. The system includes a visual interface for building workflows, smart rules engine, and advanced monitoring system. The time savings and efficiency improvements are remarkable.' : 'Nous avons développé un système d\'automatisation sophistiqué qui connecte différents outils d\'entreprise et permet l\'automatisation complète des processus métier. Le système comprend une interface visuelle pour construire des workflows, un moteur de règles intelligent et un système de surveillance avancé. Les économies de temps et les améliorations d\'efficacité sont remarquables.',
      image: mockupAutomation,
      gallery: [mockupAutomation, mockupAutomationWorkflow, mockupAutomationAnalytics],
      tags: [language === 'he' ? 'אוטומציה' : language === 'en' ? 'Automation' : 'Automatisation', "Make.com", "Zapier", language === 'he' ? 'זרימות עבודה' : language === 'en' ? 'Workflows' : 'Workflows'],
      metrics: [
        language === 'he' ? 'חיסכון של 40 שעות שבועיות' : language === 'en' ? '40 hours saved weekly' : '40 heures économisées par semaine',
        language === 'he' ? '95% הפחתת שגיאות' : language === 'en' ? '95% error reduction' : '95% de réduction d\'erreurs',
        language === 'he' ? 'ROI של 300%' : language === 'en' ? '300% ROI' : 'ROI de 300%'
      ],
      features: [
        language === 'he' ? 'ממשק ויזואלי לבניית זרימות' : language === 'en' ? 'Visual workflow builder' : 'Constructeur visuel de workflows',
        language === 'he' ? 'חיבור לכלים קיימים' : language === 'en' ? 'Integration with existing tools' : 'Intégration avec outils existants',
        language === 'he' ? 'ניטור וריפורטים מתקדמים' : language === 'en' ? 'Advanced monitoring and reports' : 'Surveillance et rapports avancés',
        language === 'he' ? 'מנוע כללים חכם' : language === 'en' ? 'Smart rules engine' : 'Moteur de règles intelligent'
      ],
      duration: language === 'he' ? '8 שבועות' : language === 'en' ? '8 weeks' : '8 semaines',
      team: language === 'he' ? '3 מפתחים, אנליסט תהליכים' : language === 'en' ? '3 developers, process analyst' : '3 développeurs, analyste de processus',
      objective: language === 'he' ? 'חיסכון זמן ועלויות משמעותיים תוך שיפור דיוק ויעילות התהליכים העסקיים' : language === 'en' ? 'Significant time and cost savings while improving accuracy and efficiency of business processes' : 'Économies significatives de temps et de coûts tout en améliorant la précision et l\'efficacité des processus métier',
      delay: "1.6s"
    },
    {
      title: language === 'he' ? 'GPT מותאם אישית למשפטים' : language === 'en' ? 'Custom Legal GPT Assistant' : 'Assistant GPT Légal Personnalisé',
      description: language === 'he' ? 'בינה מלאכותית מותאמת לתחום המשפטי עם מיומנות מקצועית' : language === 'en' ? 'Artificial intelligence tailored for legal domain with professional expertise' : 'Intelligence artificielle adaptée au domaine juridique avec expertise professionnelle',
      detailedDescription: language === 'he' ? 'יצרנו GPT מותאם אישית למשרד עורכי דין הכולל אימון על מאגר המידע המשפטי של המשרד, פסיקות מקומיות וחקיקה עדכנית. הבוט מסוגל לספק ייעוץ משפטי ראשוני, לנתח חוזים ולעזור בכתיבת מסמכים משפטיים. התוצאה: יעילות משופרת ושירות לקוחות מעולה.' : language === 'en' ? 'We created a custom GPT for a law firm that includes training on the firm\'s legal database, local precedents, and current legislation. The bot can provide initial legal advice, analyze contracts, and assist in writing legal documents. The result: improved efficiency and excellent client service.' : 'Nous avons créé un GPT personnalisé pour un cabinet d\'avocats qui inclut un entraînement sur la base de données juridiques du cabinet, les précédents locaux et la législation actuelle. Le bot peut fournir des conseils juridiques initiaux, analyser des contrats et aider à rédiger des documents juridiques. Le résultat : efficacité améliorée et excellent service client.',
      image: mockupCustomGpt,
      gallery: [mockupCustomGpt, mockupGptTraining, mockupGptDeployment],
      tags: [language === 'he' ? 'בינה מלאכותית' : language === 'en' ? 'AI' : 'IA', "GPT", language === 'he' ? 'משפטים' : language === 'en' ? 'Legal' : 'Juridique', language === 'he' ? 'אוטומציה' : language === 'en' ? 'Automation' : 'Automatisation'],
      metrics: [
        language === 'he' ? '70% הפחתת זמן מחקר' : language === 'en' ? '70% research time reduction' : '70% de réduction du temps de recherche',
        language === 'he' ? '24/7 זמינות לקוחות' : language === 'en' ? '24/7 client availability' : 'Disponibilité client 24/7',
        language === 'he' ? '90% דיוק בניתוח חוזים' : language === 'en' ? '90% accuracy in contract analysis' : '90% de précision dans l\'analyse de contrats'
      ],
      features: [
        language === 'he' ? 'אימון על מידע משפטי מקצועי' : language === 'en' ? 'Training on professional legal data' : 'Entraînement sur données juridiques professionnelles',
        language === 'he' ? 'ניתוח חוזים אוטומטי' : language === 'en' ? 'Automated contract analysis' : 'Analyse automatisée de contrats',
        language === 'he' ? 'יצירת מסמכים משפטיים' : language === 'en' ? 'Legal document generation' : 'Génération de documents juridiques',
        language === 'he' ? 'ממשק בטוח ומוגן' : language === 'en' ? 'Secure and protected interface' : 'Interface sécurisée et protégée'
      ],
      duration: language === 'he' ? '6 שבועות' : language === 'en' ? '6 weeks' : '6 semaines',
      team: language === 'he' ? '2 מפתחי AI, יועץ משפטי' : language === 'en' ? '2 AI developers, legal consultant' : '2 développeurs IA, consultant juridique',
      objective: language === 'he' ? 'יצירת עוזר IA חכם שימשיך את יכולות המשרד ויספק שירות מקצועי ומדויק' : language === 'en' ? 'Create a smart AI assistant that extends the firm\'s capabilities and provides professional and accurate service' : 'Créer un assistant IA intelligent qui étend les capacités du cabinet et fournit un service professionnel et précis',
      delay: "1.8s"
    }
  ];

  // Données pour le carrousel de mockups WordPress
  const wordpressMockups = [
    {
      src: mockupWordpressSpa,
      alt: language === 'he' ? 'תבנית WordPress לספא' : language === 'en' ? 'WordPress Spa Template' : 'Template WordPress Spa',
      title: language === 'he' ? 'תבנית WordPress לספא ורווחה' : language === 'en' ? 'WordPress Wellness & Spa Template' : 'Template WordPress Spa & Bien-être'
    },
    {
      src: mockupWordpressFitness,
      alt: language === 'he' ? 'תבנית WordPress לחדר כושר' : language === 'en' ? 'WordPress Fitness Template' : 'Template WordPress Fitness',
      title: language === 'he' ? 'תבנית WordPress לחדר כושר' : language === 'en' ? 'WordPress Fitness Gym Template' : 'Template WordPress Salle de Sport'
    },
    {
      src: mockupWordpressTravel,
      alt: language === 'he' ? 'תבנית WordPress לסוכנות נסיעות' : language === 'en' ? 'WordPress Travel Template' : 'Template WordPress Voyage',
      title: language === 'he' ? 'תבנית WordPress לסוכנות נסיעות' : language === 'en' ? 'WordPress Travel Agency Template' : 'Template WordPress Agence de Voyage'
    },
    {
      src: mockupWordpressEducation,
      alt: language === 'he' ? 'תבנית WordPress לחינוך' : language === 'en' ? 'WordPress Education Template' : 'Template WordPress Éducation',
      title: language === 'he' ? 'תבנית WordPress לפלטפורמת חינוך' : language === 'en' ? 'WordPress Education Platform Template' : 'Template WordPress Plateforme Éducative'
    },
    {
      src: mockupWordpressHotel,
      alt: language === 'he' ? 'תבנית WordPress למלון יוקרה' : language === 'en' ? 'WordPress Luxury Hotel Template' : 'Template WordPress Hôtel de Luxe',
      title: language === 'he' ? 'תבנית WordPress למלון יוקרה' : language === 'en' ? 'WordPress Luxury Hotel Template' : 'Template WordPress Hôtel de Luxe'
    },
    {
      src: mockupWordpressStartup,
      alt: language === 'he' ? 'תבנית WordPress לסטארט-אפ' : language === 'en' ? 'WordPress Startup Template' : 'Template WordPress Startup',
      title: language === 'he' ? 'תבנית WordPress לחברת סטארט-אפ' : language === 'en' ? 'WordPress Tech Startup Template' : 'Template WordPress Startup Tech'
    },
    {
      src: mockupWordpressRestaurant,
      alt: language === 'he' ? 'תבנית WordPress למסעדה' : language === 'en' ? 'WordPress Restaurant Template' : 'Template WordPress Restaurant',
      title: language === 'he' ? 'תבנית WordPress למסעדה אלגנטית' : language === 'en' ? 'WordPress Elegant Restaurant Template' : 'Template WordPress Restaurant Élégant'
    },
    {
      src: mockupWordpressDental,
      alt: language === 'he' ? 'תבנית WordPress לרופא שיניים' : language === 'en' ? 'WordPress Dental Template' : 'Template WordPress Dentaire',
      title: language === 'he' ? 'תבנית WordPress למרפאת שיניים' : language === 'en' ? 'WordPress Dental Clinic Template' : 'Template WordPress Clinique Dentaire'
    },
    {
      src: mockupWordpressArchitecture,
      alt: language === 'he' ? 'תבנית WordPress לאדריכלות' : language === 'en' ? 'WordPress Architecture Template' : 'Template WordPress Architecture',
      title: language === 'he' ? 'תבנית WordPress למשרד אדריכלות' : language === 'en' ? 'WordPress Architecture Firm Template' : 'Template WordPress Cabinet d\'Architecture'
    },
    {
      src: mockupWordpressConsultant,
      alt: language === 'he' ? 'תבנית WordPress ליועץ עסקי' : language === 'en' ? 'WordPress Consultant Template' : 'Template WordPress Consultant',
      title: language === 'he' ? 'תבנית WordPress ליועץ עסקי' : language === 'en' ? 'WordPress Business Consultant Template' : 'Template WordPress Consultant Business'
    },
    {
      src: mockupWordpressPhotographer,
      alt: language === 'he' ? 'תבנית WordPress לצלם' : language === 'en' ? 'WordPress Photographer Template' : 'Template WordPress Photographe',
      title: language === 'he' ? 'תבנית WordPress לפורטפוליו צלם' : language === 'en' ? 'WordPress Photographer Portfolio Template' : 'Template WordPress Portfolio Photographe'
    },
    {
      src: mockupWordpressMusic,
      alt: language === 'he' ? 'תבנית WordPress לאולפן מוזיקה' : language === 'en' ? 'WordPress Music Template' : 'Template WordPress Musique',
      title: language === 'he' ? 'תבנית WordPress לאולפן מוזיקה' : language === 'en' ? 'WordPress Music Studio Template' : 'Template WordPress Studio Musique'
    },
    {
      src: mockupWordpressWedding,
      alt: language === 'he' ? 'תבנית WordPress למתכנן חתונות' : language === 'en' ? 'WordPress Wedding Template' : 'Template WordPress Mariage',
      title: language === 'he' ? 'תבנית WordPress למתכנן חתונות' : language === 'en' ? 'WordPress Wedding Planner Template' : 'Template WordPress Organisateur Mariage'
    },
    {
      src: mockupWordpressMedical,
      alt: language === 'he' ? 'תבנית WordPress לרפואה' : language === 'en' ? 'WordPress Medical Template' : 'Template WordPress Médical',
      title: language === 'he' ? 'תבנית WordPress למרפאה רפואית' : language === 'en' ? 'WordPress Medical Clinic Template' : 'Template WordPress Clinique Médicale'
    },
    {
      src: mockupWordpressCoaching,
      alt: language === 'he' ? 'תבנית WordPress לקואץ' : language === 'en' ? 'WordPress Coaching Template' : 'Template WordPress Coaching',
      title: language === 'he' ? 'תבנית WordPress לקואץ אישי' : language === 'en' ? 'WordPress Life Coach Template' : 'Template WordPress Coach de Vie'
    },
    {
      src: mockupWordpressBeauty,
      alt: language === 'he' ? 'תבנית WordPress ליופי' : language === 'en' ? 'WordPress Beauty Template' : 'Template WordPress Beauté',
      title: language === 'he' ? 'תבנית WordPress לסלון יופי' : language === 'en' ? 'WordPress Beauty Salon Template' : 'Template WordPress Salon de Beauté'
    },
    {
      src: mockupWordpressSoftware,
      alt: language === 'he' ? 'תבנית WordPress לתוכנה' : language === 'en' ? 'WordPress Software Template' : 'Template WordPress Logiciel',
      title: language === 'he' ? 'תבנית WordPress לחברת תוכנה' : language === 'en' ? 'WordPress Software Company Template' : 'Template WordPress Société de Logiciels'
    },
    {
      src: mockupWordpressElearning,
      alt: language === 'he' ? 'תבנית WordPress ללמידה מקוונת' : language === 'en' ? 'WordPress E-learning Template' : 'Template WordPress E-learning',
      title: language === 'he' ? 'תבנית WordPress לפלטפורמת למידה' : language === 'en' ? 'WordPress Online Learning Platform Template' : 'Template WordPress Plateforme d\'Apprentissage'
    },
    {
      src: mockupWordpressCharity,
      alt: language === 'he' ? 'תבנית WordPress לצדקה' : language === 'en' ? 'WordPress Charity Template' : 'Template WordPress Charité',
      title: language === 'he' ? 'תבנית WordPress לארגון צדקה' : language === 'en' ? 'WordPress Charity Organization Template' : 'Template WordPress Organisation Caritative'
    },
    {
      src: mockupWordpressConstruction,
      alt: language === 'he' ? 'תבנית WordPress לבנייה' : language === 'en' ? 'WordPress Construction Template' : 'Template WordPress Construction',
      title: language === 'he' ? 'תבנית WordPress לחברת בנייה' : language === 'en' ? 'WordPress Construction Company Template' : 'Template WordPress Entreprise Construction'
    },
    {
      src: mockupWordpressFreelance,
      alt: language === 'he' ? 'תבנית WordPress לעצמאי' : language === 'en' ? 'WordPress Freelance Template' : 'Template WordPress Freelance',
      title: language === 'he' ? 'תבנית WordPress למעצב עצמאי' : language === 'en' ? 'WordPress Freelance Designer Template' : 'Template WordPress Designer Freelance'
    },
    {
      src: mockupWordpressFoodDelivery,
      alt: language === 'he' ? 'תבנית WordPress למשלוח אוכל' : language === 'en' ? 'WordPress Food Delivery Template' : 'Template WordPress Livraison Nourriture',
      title: language === 'he' ? 'תבנית WordPress לאפליקציית משלוח אוכל' : language === 'en' ? 'WordPress Food Delivery App Template' : 'Template WordPress App Livraison Nourriture'
    },
    {
      src: mockupWordpressAutomotive,
      alt: language === 'he' ? 'תבנית WordPress לרכב' : language === 'en' ? 'WordPress Automotive Template' : 'Template WordPress Automobile',
      title: language === 'he' ? 'תבנית WordPress לסוכנות רכב' : language === 'en' ? 'WordPress Automotive Dealership Template' : 'Template WordPress Concessionnaire Auto'
    },
    {
      src: mockupWordpressFinance,
      alt: language === 'he' ? 'תבנית WordPress לכספים' : language === 'en' ? 'WordPress Finance Template' : 'Template WordPress Finance',
      title: language === 'he' ? 'תבנית WordPress ליועץ פיננסי' : language === 'en' ? 'WordPress Financial Advisor Template' : 'Template WordPress Conseiller Financier'
    },
    {
      src: mockupWordpressPetcare,
      alt: language === 'he' ? 'תבנית WordPress לטיפול בחיות' : language === 'en' ? 'WordPress Pet Care Template' : 'Template WordPress Soins Animaux',
      title: language === 'he' ? 'תבנית WordPress למרפאה וטרינרית' : language === 'en' ? 'WordPress Pet Care Clinic Template' : 'Template WordPress Clinique Vétérinaire'
    },
    {
      src: mockupWordpressOrganicFarm,
      alt: language === 'he' ? 'תבנית WordPress לחווה אורגנית' : language === 'en' ? 'WordPress Organic Farm Template' : 'Template WordPress Ferme Biologique',
      title: language === 'he' ? 'תבנית WordPress לחווה אורגנית' : language === 'en' ? 'WordPress Organic Farm Template' : 'Template WordPress Ferme Biologique'
    },
    // Ajout d'autres mockups existants pour plus de variété
    {
      src: mockupEcommerce,
      alt: language === 'he' ? 'תבנית WordPress לחנות אופנה' : language === 'en' ? 'WordPress Fashion Store Template' : 'Template WordPress Boutique Mode',
      title: language === 'he' ? 'תבנית WordPress לחנות אופנה' : language === 'en' ? 'WordPress Fashion E-commerce Template' : 'Template WordPress E-commerce Mode'
    },
    {
      src: mockupSaas,
      alt: language === 'he' ? 'תבנית WordPress לSaaS' : language === 'en' ? 'WordPress SaaS Template' : 'Template WordPress SaaS',
      title: language === 'he' ? 'תבנית WordPress לפלטפורמת SaaS' : language === 'en' ? 'WordPress SaaS Platform Template' : 'Template WordPress Plateforme SaaS'
    },
    {
      src: mockupProfessional,
      alt: language === 'he' ? 'תבנית WordPress מקצועית' : language === 'en' ? 'WordPress Professional Template' : 'Template WordPress Professionnel',
      title: language === 'he' ? 'תבנית WordPress מקצועית' : language === 'en' ? 'WordPress Professional Services Template' : 'Template WordPress Services Professionnels'
    },
    {
      src: mockupBakery,
      alt: language === 'he' ? 'תבנית WordPress למאפייה' : language === 'en' ? 'WordPress Bakery Template' : 'Template WordPress Boulangerie',
      title: language === 'he' ? 'תבנית WordPress למאפייה מקומית' : language === 'en' ? 'WordPress Local Bakery Template' : 'Template WordPress Boulangerie Locale'
    },
    {
      src: mockupPortfolio,
      alt: language === 'he' ? 'תבנית WordPress לפורטפוליו' : language === 'en' ? 'WordPress Portfolio Template' : 'Template WordPress Portfolio',
      title: language === 'he' ? 'תבנית WordPress לפורטפוליו יוצר' : language === 'en' ? 'WordPress Creative Portfolio Template' : 'Template WordPress Portfolio Créatif'
    },
    {
      src: mockupRealEstate,
      alt: language === 'he' ? 'תבנית WordPress לנדל"ן' : language === 'en' ? 'WordPress Real Estate Template' : 'Template WordPress Immobilier',
      title: language === 'he' ? 'תבנית WordPress לסוכנות נדל"ן' : language === 'en' ? 'WordPress Real Estate Agency Template' : 'Template WordPress Agence Immobilière'
    },
    {
      src: mockupBlog,
      alt: language === 'he' ? 'תבנית WordPress לבלוג' : language === 'en' ? 'WordPress Blog Template' : 'Template WordPress Blog',
      title: language === 'he' ? 'תבנית WordPress לבלוג אורח חיים' : language === 'en' ? 'WordPress Lifestyle Blog Template' : 'Template WordPress Blog Lifestyle'
    },
    {
      src: mockupAgency,
      alt: language === 'he' ? 'תבנית WordPress לסוכנות' : language === 'en' ? 'WordPress Agency Template' : 'Template WordPress Agence',
      title: language === 'he' ? 'תבנית WordPress לסוכנות דיגיטל' : language === 'en' ? 'WordPress Digital Agency Template' : 'Template WordPress Agence Digitale'
    }
  ];

  return (
    <section id="projects" className={`py-20 relative overflow-hidden ${language === 'he' ? 'rtl' : ''}`}>
      {/* Background elements */}
      <div className={`absolute top-20 ${language === 'he' ? 'right-10' : 'left-10'} animate-float opacity-10`}>
        <Lightbulb className="h-28 w-28 text-accent" />
      </div>

      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6">
            <Lightbulb className={`h-4 w-4 text-accent ${language === 'he' ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{t('projects.badge')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-50">
            {t('projects.title')}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Carousel de projets */}
        <div className="relative group">
          <Carousel
            plugins={[autoplayPlugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onMouseEnter={() => autoplayPlugin.current.stop()}
            onMouseLeave={() => autoplayPlugin.current.play()}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {detailedProjects.map((project, index) => (
                <CarouselItem key={project.title} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 px-2">
                  <Card 
                    className="gradient-card border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-102 group overflow-hidden h-full relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/0 before:via-primary/5 before:to-primary/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 before:ease-out hover:shadow-xl hover:shadow-primary/10 cursor-pointer" 
                    onClick={() => handleProjectView(project.title)}
                  >
                    {/* Image du projet */}
                    <div className="relative overflow-hidden">
                      <OptimizedImage
                        src={project.image} 
                        alt={project.title}
                        width={796}
                        height={448}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-all duration-500 ease-out"
                        sizes="(max-width: 768px) 648px, 796px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out"></div>
                      <div className={`absolute top-4 ${language === 'he' ? 'left-4' : 'right-4'} opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105`}>
                        <Button 
                          size="sm" 
                          variant="secondary" 
                          className="rounded-full backdrop-blur-md bg-background/50 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                          onClick={() => handleProjectView(project.title)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                      {/* Particules flottantes */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                        <div className="absolute top-6 left-6 w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
                        <div className="absolute bottom-8 right-8 w-1 h-1 bg-accent rounded-full animate-pulse delay-200"></div>
                      </div>
                    </div>

                    <CardHeader className={`pb-4 ${language === 'he' ? 'text-right' : ''}`}>
                      <div className={`flex flex-wrap gap-2 mb-3 ${language === 'he' ? 'flex-row-reverse justify-end' : ''}`}>
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <CardTitle className={`text-xl font-semibold group-hover:text-primary group-hover:scale-105 transition-all duration-500 ${language === 'he' ? 'text-right' : ''}`}>
                        {project.title}
                      </CardTitle>
                      <CardDescription className={`text-muted-foreground group-hover:text-foreground transition-colors duration-300 ${language === 'he' ? 'text-right' : ''}`}>
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className={`pt-0 ${language === 'he' ? 'text-right' : ''}`}>
                      {/* Métriques */}
                       <div className="space-y-2 mb-6">
                        {project.metrics.map((metric, idx) => (
                          <div key={idx} className={`flex items-center text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 ${language === 'he' ? 'flex-row-reverse justify-end' : ''}`} style={{ transitionDelay: `${idx * 100}ms` }}>
                            {language === 'he' ? (
                              <>
                                <span className="text-muted-foreground text-right group-hover:text-foreground transition-colors duration-300">{metric}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-accent ml-8 flex-shrink-0 group-hover:bg-primary group-hover:animate-pulse transition-colors duration-300" />
                              </>
                            ) : (
                              <>
                                <div className="w-1.5 h-1.5 rounded-full bg-accent mr-4 flex-shrink-0 group-hover:bg-primary group-hover:animate-pulse transition-colors duration-300" />
                                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{metric}</span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                      
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation du carousel avec animations */}
            <CarouselPrevious className={`${language === 'he' ? 'right-12 left-auto' : 'left-12'} glass-effect hover:glass-effect-hover hover:scale-110 hover:rotate-12 transition-all duration-300 opacity-0 group-hover:opacity-100`} />
            <CarouselNext className={`${language === 'he' ? 'left-12 right-auto' : 'right-12'} glass-effect hover:glass-effect-hover hover:scale-110 hover:-rotate-12 transition-all duration-300 opacity-0 group-hover:opacity-100`} />
          </Carousel>
          
          {/* Indicateur de défilement avec animation */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse delay-200"></div>
                <div className="w-2 h-2 rounded-full bg-primary/30 animate-pulse delay-500"></div>
              </div>
              <span className="text-sm text-muted-foreground">
                {language === 'he' ? 'החליקו לראות פרויקטים נוספים' : language === 'en' ? 'Swipe to see more projects' : 'Défilement automatique • Survolez pour arrêter'}
              </span>
            </div>
          </div>
        </div>

        {/* Carrousel de mockups WordPress en mosaïque */}
        <div className="mt-20 mb-16">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-4">
              {language === 'he' ? 'תבניות WordPress שיצרנו' : language === 'en' ? 'WordPress Templates We\'ve Created' : 'Templates WordPress que nous avons créés'}
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === 'he' ? 'הצגת תבניות שפותחו עם WordPress, קידוד אינטואיטיבי או גישות קוד קלאסיות' : language === 'en' ? 'Showcasing templates developed with WordPress, vibe coding, or classic code approaches.' : 'Showcasing templates developed with WordPress, vibe coding, or classic code approaches.'}
            </p>
          </div>
          
          <MosaicCarousel images={wordpressMockups} />
        </div>

        {/* CTA final */}
        <div className="text-center mt-16">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              {t('projects.cta_title')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('projects.cta_desc')}
            </p>
            <Button 
              size="lg" 
              className="glow-primary"
              onClick={handleWhatsAppProject}
            >
              <Mail className={`${language === 'he' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
              {language === 'fr' ? 'Démarrer mon projet' : language === 'he' ? 'להתחיל את הפרויקט שלי' : 'Start My Project'}
              <ArrowRight className={`${language === 'he' ? 'mr-2' : 'ml-2'} h-5 w-5`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Modal pour les détails du projet */}
      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      )}
    </section>
  );
};

export default Projects;
