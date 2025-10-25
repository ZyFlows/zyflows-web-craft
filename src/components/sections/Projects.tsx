import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight, Lightbulb, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { generateEmailTemplate, openEmailClient } from "@/utils/emailTemplates";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState, lazy, Suspense } from "react";
import { ProjectModal } from "@/components/ui/project-modal";
import MosaicCarousel from "@/components/ui/mosaic-carousel";

// Lazy load des images pour réduire le bundle initial
const importImage = (path: string) => {
  return lazy(() => import(path).then(module => ({ 
    default: () => <img src={module.default} alt="" className="w-full h-48 object-cover" loading="lazy" decoding="async" />
  })));
};

// Import uniquement des images critiques (visibles immédiatement)
import mockupEcommerce from "@/assets/mockup-ecommerce.jpg";
import mockupSaas from "@/assets/mockup-saas.jpg";
import mockupProfessional from "@/assets/mockup-professional.jpg";
import mockupBakery from "@/assets/mockup-bakery.jpg";

// Helper pour créer des objets d'images avec lazy loading
const createImageImports = () => ({
  // Ecommerce
  mockupEcommerceProduct: () => import("@/assets/mockup-ecommerce-product.jpg").then(m => m.default),
  mockupEcommerceCheckout: () => import("@/assets/mockup-ecommerce-checkout.jpg").then(m => m.default),
  // SaaS
  mockupSaasPricing: () => import("@/assets/mockup-saas-pricing.jpg").then(m => m.default),
  mockupSaasDashboard: () => import("@/assets/mockup-saas-dashboard.jpg").then(m => m.default),
  // Professional
  mockupProfessionalContact: () => import("@/assets/mockup-professional-contact.jpg").then(m => m.default),
  mockupProfessionalServices: () => import("@/assets/mockup-professional-services.jpg").then(m => m.default),
  // Bakery
  mockupBakeryMenu: () => import("@/assets/mockup-bakery-menu.jpg").then(m => m.default),
  mockupBakeryAbout: () => import("@/assets/mockup-bakery-about.jpg").then(m => m.default),
  // Other projects
  mockupPortfolio: () => import("@/assets/mockup-portfolio.jpg").then(m => m.default),
  mockupAgency: () => import("@/assets/mockup-agency.jpg").then(m => m.default),
  mockupBlog: () => import("@/assets/mockup-blog.jpg").then(m => m.default),
  mockupRealEstate: () => import("@/assets/mockup-realestate.jpg").then(m => m.default),
  mockupAutomation: () => import("@/assets/mockup-automation.jpg").then(m => m.default),
  mockupAutomationWorkflow: () => import("@/assets/mockup-automation-workflow.jpg").then(m => m.default),
  mockupAutomationAnalytics: () => import("@/assets/mockup-automation-analytics.jpg").then(m => m.default),
  mockupCustomGpt: () => import("@/assets/mockup-custom-gpt.jpg").then(m => m.default),
  mockupGptTraining: () => import("@/assets/mockup-gpt-training.jpg").then(m => m.default),
  mockupGptDeployment: () => import("@/assets/mockup-gpt-deployment.jpg").then(m => m.default),
  // WordPress mockups
  mockupWordpressSpa: () => import("@/assets/mockup-wordpress-spa.jpg").then(m => m.default),
  mockupWordpressFitness: () => import("@/assets/mockup-wordpress-fitness.jpg").then(m => m.default),
  mockupWordpressTravel: () => import("@/assets/mockup-wordpress-travel.jpg").then(m => m.default),
  mockupWordpressEducation: () => import("@/assets/mockup-wordpress-education.jpg").then(m => m.default),
  mockupWordpressHotel: () => import("@/assets/mockup-wordpress-hotel.jpg").then(m => m.default),
  mockupWordpressStartup: () => import("@/assets/mockup-wordpress-startup.jpg").then(m => m.default),
  mockupWordpressRestaurant: () => import("@/assets/mockup-wordpress-restaurant.jpg").then(m => m.default),
  mockupWordpressDental: () => import("@/assets/mockup-wordpress-dental.jpg").then(m => m.default),
  mockupWordpressArchitecture: () => import("@/assets/mockup-wordpress-architecture.jpg").then(m => m.default),
  mockupWordpressConsultant: () => import("@/assets/mockup-wordpress-consultant.jpg").then(m => m.default),
  mockupWordpressPhotographer: () => import("@/assets/mockup-wordpress-photographer.jpg").then(m => m.default),
  mockupWordpressMusic: () => import("@/assets/mockup-wordpress-music.jpg").then(m => m.default),
  mockupWordpressWedding: () => import("@/assets/mockup-wordpress-wedding.jpg").then(m => m.default),
  mockupWordpressMedical: () => import("@/assets/mockup-wordpress-medical.jpg").then(m => m.default),
  mockupWordpressCoaching: () => import("@/assets/mockup-wordpress-coaching.jpg").then(m => m.default),
  mockupWordpressBeauty: () => import("@/assets/mockup-wordpress-beauty.jpg").then(m => m.default),
  mockupWordpressSoftware: () => import("@/assets/mockup-wordpress-software.jpg").then(m => m.default),
  mockupWordpressElearning: () => import("@/assets/mockup-wordpress-elearning.jpg").then(m => m.default),
  mockupWordpressCharity: () => import("@/assets/mockup-wordpress-charity.jpg").then(m => m.default),
  mockupWordpressConstruction: () => import("@/assets/mockup-wordpress-construction.jpg").then(m => m.default),
  mockupWordpressFreelance: () => import("@/assets/mockup-wordpress-freelance.jpg").then(m => m.default),
  mockupWordpressFoodDelivery: () => import("@/assets/mockup-wordpress-food-delivery.jpg").then(m => m.default),
  mockupWordpressAutomotive: () => import("@/assets/mockup-wordpress-automotive.jpg").then(m => m.default),
  mockupWordpressFinance: () => import("@/assets/mockup-wordpress-finance.jpg").then(m => m.default),
  mockupWordpressPetcare: () => import("@/assets/mockup-wordpress-petcare.jpg").then(m => m.default),
  mockupWordpressOrganicFarm: () => import("@/assets/mockup-wordpress-organic-farm.jpg").then(m => m.default),
});

const Projects = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, string>>({});
  
  const autoplayPlugin = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  );

  const lazyImages = createImageImports();

  // Fonction pour charger une image à la demande
  const loadImage = async (key: keyof ReturnType<typeof createImageImports>) => {
    if (!loadedImages[key]) {
      const imageSrc = await lazyImages[key]();
      setLoadedImages(prev => ({ ...prev, [key]: imageSrc }));
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProjectView = (projectTitle: string) => {
    const project = detailedProjects.find(p => p.title === projectTitle);
    if (project) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const handleGithubView = (projectTitle: string) => {
    toast({
      title: "GitHub",
      description: `Code source du projet: ${projectTitle}`,
    });
  };

  const handleEmailProject = () => {
    const { subject, body } = generateEmailTemplate({ 
      language, 
      t, 
      type: 'projects' 
    });
    
    openEmailClient(subject, body);
    
    toast({
      title: t('email.send_email'),
      description: t('email.click_below'),
    });
  };

  // Données des projets avec images lazy-loaded
  const detailedProjects = [
    {
      title: language === 'he' ? 'חנות אופנה אונליין' : language === 'en' ? 'Fashion E-commerce Store' : 'Boutique E-commerce Mode',
      description: language === 'he' ? 'פלטפורמת מכירות אלגנטה עם עיצוב מינימליסטי ותחושה חמה' : language === 'en' ? 'Elegant sales platform with minimalist design and warm feel' : 'Plateforme de vente élégante avec design minimaliste et ambiance chaleureuse',
      detailedDescription: language === 'he' ? 'פיתחנו חנות אופנה מקוונת מתוחכמת העוצבה במיוחד לקהל צעיר ועכשווי...' : language === 'en' ? 'We developed a sophisticated online fashion store...' : 'Nous avons développé une boutique de mode en ligne sophistiquée...',
      image: mockupEcommerce,
      gallery: [mockupEcommerce], // Autres images chargées à la demande
      tags: ["WordPress", "WooCommerce", "UI/UX", language === 'he' ? 'עיצוב רספונסיבי' : language === 'en' ? 'Responsive Design' : 'Design Responsive'],
      metrics: [
        language === 'he' ? 'עלייה של 40% במכירות' : language === 'en' ? '+40% increase in sales' : '+40% d\'augmentation des ventes',
        language === 'he' ? 'זמן טעינה מתחת ל-2 שניות' : language === 'en' ? 'Loading time under 2s' : 'Temps de chargement < 2s',
      ],
      features: [
        language === 'he' ? 'מערכת ניהול מלאי מתקדמת' : language === 'en' ? 'Advanced inventory management' : 'Gestion d\'inventaire avancée',
      ],
      duration: language === 'he' ? '3 חודשים' : language === 'en' ? '3 months' : '3 mois',
      team: language === 'he' ? '4 מפתחים, מעצב UI/UX' : language === 'en' ? '4 developers, UI/UX designer' : '4 développeurs, designer UI/UX',
      objective: language === 'he' ? 'יצירת חוויית קנייה מעולה' : language === 'en' ? 'Create excellent shopping experience' : 'Créer une excellente expérience d\'achat',
      delay: "0s"
    },
    {
      title: language === 'he' ? 'פלטפורמת SaaS טכנולוגית' : language === 'en' ? 'Tech SaaS Platform' : 'Plateforme SaaS Tech',
      description: language === 'he' ? 'דף נחיתה מודרני עם שיעורי המרה גבוהים' : language === 'en' ? 'Modern landing page with high conversion rates' : 'Page d\'atterrissage moderne avec taux de conversion élevés',
      detailedDescription: language === 'he' ? 'יצרנו דף נחיתה מודרני עבור חברת SaaS טכנולוגית...' : language === 'en' ? 'We created a modern landing page for a tech SaaS company...' : 'Nous avons créé une page d\'atterrissage moderne pour une entreprise SaaS tech...',
      image: mockupSaas,
      gallery: [mockupSaas],
      tags: ["Landing Page", "Conversion", "Tech"],
      metrics: [
        language === 'he' ? 'שיפור של 50% בלידים' : language === 'en' ? '+50% improvement in leads' : '+50% d\'amélioration des leads',
        language === 'he' ? 'זמן שהייה ממוצע של 3 דקות' : language === 'en' ? 'Average session time of 3 minutes' : 'Temps de session moyen de 3 minutes',
      ],
      features: [
        language === 'he' ? 'טופס הרשמה מותאם אישית' : language === 'en' ? 'Custom registration form' : 'Formulaire d\'inscription personnalisé',
      ],
      duration: language === 'he' ? '2 חודשים' : language === 'en' ? '2 months' : '2 mois',
      team: language === 'he' ? '3 מפתחים, מומחה SEO' : language === 'en' ? '3 developers, SEO expert' : '3 développeurs, expert SEO',
      objective: language === 'he' ? 'הגדלת לידים והמרות' : language === 'en' ? 'Increase leads and conversions' : 'Augmenter les leads et les conversions',
      delay: "0.2s"
    },
    {
      title: language === 'he' ? 'משרד עורכי דין מקצועי' : language === 'en' ? 'Professional Law Firm' : 'Cabinet d\'Avocat',
      description: language === 'he' ? 'אתר מקצועי עם אמינות גבוהה ועיצוב נקי' : language === 'en' ? 'Professional website with high credibility and clean design' : 'Site professionnel avec une crédibilité élevée et un design épuré',
      detailedDescription: language === 'he' ? 'בנינו אתר תדמיתי עבור משרד עורכי דין מוביל...' : language === 'en' ? 'We built a corporate website for a leading law firm...' : 'Nous avons construit un site web d\'entreprise pour un cabinet d\'avocats de premier plan...',
      image: mockupProfessional,
      gallery: [mockupProfessional],
      tags: ["Services", language === 'he' ? 'מקצועי' : language === 'en' ? 'Professional' : 'Professionnel'],
      metrics: [
        language === 'he' ? 'עלייה של 25% בפניות' : language === 'en' ? '+25% increase in inquiries' : '+25% d\'augmentation des demandes',
        language === 'he' ? 'דירוג גבוה במנועי חיפוש' : language === 'en' ? 'High ranking in search engines' : 'Classement élevé dans les moteurs de recherche',
      ],
      features: [
        language === 'he' ? 'בלוג משפטי עם מאמרים' : language === 'en' ? 'Legal blog with articles' : 'Blog juridique avec des articles',
      ],
      duration: language === 'he' ? '4 חודשים' : language === 'en' ? '4 months' : '4 mois',
      team: language === 'he' ? '2 מפתחים, קופירייטר' : language === 'en' ? '2 developers, copywriter' : '2 développeurs, rédacteur',
      objective: language === 'he' ? 'חיזוק תדמית וגיוס לקוחות' : language === 'en' ? 'Strengthen image and attract clients' : 'Renforcer l\'image et attirer des clients',
      delay: "0.4s"
    },
    {
      title: language === 'he' ? 'מאפייה מקומית חמה' : language === 'en' ? 'Cozy Local Bakery' : 'Boulangerie Locale',
      description: language === 'he' ? 'אתר ויטרינה עם אווירה חמה ועיצוב מזמין' : language === 'en' ? 'Showcase website with warm atmosphere and inviting design' : 'Site vitrine chaleureux avec une ambiance conviviale et un design invitant',
      detailedDescription: language === 'he' ? 'עיצבנו אתר למאפייה מקומית עם דגש על חוויית משתמש נעימה...' : language === 'en' ? 'We designed a website for a local bakery with an emphasis on a pleasant user experience...' : 'Nous avons conçu un site web pour une boulangerie locale en mettant l\'accent sur une expérience utilisateur agréable...',
      image: mockupBakery,
      gallery: [mockupBakery],
      tags: [language === 'he' ? 'עסק מקומי' : language === 'en' ? 'Local Business' : 'Commerce Local'],
      metrics: [
        language === 'he' ? 'עלייה של 30% בהזמנות אונליין' : language === 'en' ? '+30% increase in online orders' : '+30% d\'augmentation des commandes en ligne',
        language === 'he' ? 'ביקורות חיוביות רבות' : language === 'en' ? 'Many positive reviews' : 'Nombreux avis positifs',
      ],
      features: [
        language === 'he' ? 'מערכת הזמנות אונליין' : language === 'en' ? 'Online ordering system' : 'Système de commande en ligne',
      ],
      duration: language === 'he' ? '1 חודש' : language === 'en' ? '1 month' : '1 mois',
      team: language === 'he' ? 'מעצב, מפתח' : language === 'en' ? 'Designer, developer' : 'Concepteur, développeur',
      objective: language === 'he' ? 'הגדלת מכירות ושיפור חוויית לקוח' : language === 'en' ? 'Increase sales and improve customer experience' : 'Augmenter les ventes et améliorer l\'expérience client',
      delay: "0.6s"
    },
  ];

  const projects = [
    {
      title: language === 'he' ? 'חנות אופנה אונליין' : language === 'en' ? 'Fashion E-commerce Store' : 'Boutique E-commerce Mode',
      description: language === 'he' ? 'פלטפורמת מכירות אלגנטה' : language === 'en' ? 'Elegant sales platform' : 'Plateforme de vente élégante',
      image: mockupEcommerce,
      tags: ["WordPress", "WooCommerce", "UI/UX"],
      link: "/demos/ecommerce",
      delay: "0s"
    },
    {
      title: language === 'he' ? 'פלטפורמת SaaS טכנולוגית' : language === 'en' ? 'Tech SaaS Platform' : 'Plateforme SaaS Tech',
      description: language === 'he' ? 'דף נחיתה מודרני' : language === 'en' ? 'Modern landing page' : 'Page d\'atterrissage moderne',
      image: mockupSaas,
      tags: ["Landing Page", "Conversion", "Tech"],
      link: "/demos/saas",
      delay: "0.2s"
    },
    {
      title: language === 'he' ? 'משרד עורכי דין מקצועי' : language === 'en' ? 'Professional Law Firm' : 'Cabinet d\'Avocat',
      description: language === 'he' ? 'אתר מקצועי עם אמינות גבוהה' : language === 'en' ? 'Professional website with high credibility' : 'Site professionnel',
      image: mockupProfessional,
      tags: ["Services", language === 'he' ? 'מקצועי' : language === 'en' ? 'Professional' : 'Professionnel'],
      link: "/demos/legal-firm",
      delay: "0.4s"
    },
    {
      title: language === 'he' ? 'מאפייה מקומית חמה' : language === 'en' ? 'Cozy Local Bakery' : 'Boulangerie Locale',
      description: language === 'he' ? 'אתר ויטרינה עם אווירה חמה' : language === 'en' ? 'Showcase website with warm atmosphere' : 'Site vitrine chaleureux',
      image: mockupBakery,
      tags: [language === 'he' ? 'עסק מקומי' : language === 'en' ? 'Local Business' : 'Commerce Local'],
      link: "/demos/restaurant",
      delay: "0.6s"
    },
  ];

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 animate-fade-in-up">
          {t('projects.title')}
        </h2>
        <p className="text-muted-foreground animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {t('projects.subtitle')}
        </p>
        <Button 
          variant="secondary" 
          size="sm"
          onClick={() => scrollToSection('contact')}
          className="mt-8 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          <Mail className="h-4 w-4 mr-2" />
          {t('contact.cta')}
        </Button>
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden animate-fade-in"
              style={{ animationDelay: project.delay }}
            >
              <div className="relative overflow-hidden h-48">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  width="370"
                  height="208"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleProjectView(project.title)}
                    className="flex-1"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {language === 'he' ? 'צפה בפרויקט' : language === 'en' ? 'View Project' : 'Voir le projet'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Projects;
