import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight, Lightbulb, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { generateEmailTemplate, openEmailClient } from "@/utils/emailTemplates";
import { emailTranslations } from '@/contexts/emailTranslations';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useEffect } from "react";

// Import des mockups générés
import mockupEcommerce from "@/assets/mockup-ecommerce.jpg";
import mockupSaas from "@/assets/mockup-saas.jpg";
import mockupProfessional from "@/assets/mockup-professional.jpg";
import mockupBakery from "@/assets/mockup-bakery.jpg";
import mockupPortfolio from "@/assets/mockup-portfolio.jpg";
import mockupAgency from "@/assets/mockup-agency.jpg";
import mockupBlog from "@/assets/mockup-blog.jpg";
import mockupRealEstate from "@/assets/mockup-realestate.jpg";

const Projects = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
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
    console.log(`Viewing project: ${projectTitle}`);
    toast({
      title: "Projet sélectionné",
      description: `Ouverture du projet: ${projectTitle}`,
    });
  };

  const handleGithubView = (projectTitle: string) => {
    console.log(`Viewing GitHub for project: ${projectTitle}`);
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

  const projects = [
    {
      title: language === 'he' ? 'חנות אופנה אונליין' : language === 'en' ? 'Fashion E-commerce Store' : 'Boutique E-commerce Mode',
      description: language === 'he' ? 'פלטפורמת מכירות אלגנטה עם עיצוב מינימליסטי ותחושה חמה' : language === 'en' ? 'Elegant sales platform with minimalist design and warm feel' : 'Plateforme de vente élégante avec design minimaliste et ambiance chaleureuse',
      image: mockupEcommerce,
      tags: ["WordPress", "WooCommerce", "UI/UX", language === 'he' ? 'עיצוב רספונסיבי' : language === 'en' ? 'Responsive Design' : 'Design Responsive'],
      metrics: [
        language === 'he' ? 'עלייה של 40% במכירות' : language === 'en' ? '+40% increase in sales' : '+40% d\'augmentation des ventes',
        language === 'he' ? 'זמן טעינה מתחת ל-2 שניות' : language === 'en' ? 'Loading time under 2s' : 'Temps de chargement < 2s',
        language === 'he' ? 'חוויית משתמש אופטימלית' : language === 'en' ? 'Optimal user experience' : 'Expérience utilisateur optimale'
      ],
      delay: "0s"
    },
    {
      title: language === 'he' ? 'פלטפורמת SaaS טכנולוגית' : language === 'en' ? 'Tech SaaS Platform' : 'Plateforme SaaS Technologique',
      description: language === 'he' ? 'דף נחיתה מודרני לשירות טכנולוגי עם ממשק אינטואיטיבי' : language === 'en' ? 'Modern landing page for tech service with intuitive interface' : 'Page d\'atterrissage moderne pour service tech avec interface intuitive',
      image: mockupSaas,
      tags: ["Landing Page", "Conversion", "Tech", language === 'he' ? 'גרדיאנטים' : language === 'en' ? 'Gradients' : 'Gradients'],
      metrics: [
        language === 'he' ? 'שיעור המרה של 25%' : language === 'en' ? '25% conversion rate' : 'Taux de conversion 25%',
        language === 'he' ? 'ממשק משתמש מודרני' : language === 'en' ? 'Modern user interface' : 'Interface utilisateur moderne',
        language === 'he' ? 'אופטימיזציה למובייל' : language === 'en' ? 'Mobile optimization' : 'Optimisation mobile'
      ],
      delay: "0.2s"
    },
    {
      title: language === 'he' ? 'משרד עורכי דין מקצועי' : language === 'en' ? 'Professional Law Firm' : 'Cabinet d\'Avocat Professionnel',
      description: language === 'he' ? 'אתר מקצועי עם אמינות גבוהה וגישה אישית לקוחות' : language === 'en' ? 'Professional website with high credibility and personal client approach' : 'Site professionnel avec haute crédibilité et approche client personnelle',
      image: mockupProfessional,
      tags: ["Services", language === 'he' ? 'מקצועי' : language === 'en' ? 'Professional' : 'Professionnel', "Trust", language === 'he' ? 'אלגנטי' : language === 'en' ? 'Elegant' : 'Élégant'],
      metrics: [
        language === 'he' ? 'עלייה של 60% בפניות' : language === 'en' ? '+60% increase in inquiries' : '+60% d\'augmentation des demandes',
        language === 'he' ? 'חוויה מקצועית' : language === 'en' ? 'Professional experience' : 'Expérience professionnelle',
        language === 'he' ? 'בניית אמון ומהימנות' : language === 'en' ? 'Trust and credibility building' : 'Construction de confiance'
      ],
      delay: "0.4s"
    },
    {
      title: language === 'he' ? 'מאפייה מקומית חמה' : language === 'en' ? 'Cozy Local Bakery' : 'Boulangerie Locale Chaleureuse',
      description: language === 'he' ? 'אתר ויטרינה עם אווירה חמה ותחושת בית לעסק מקומי' : language === 'en' ? 'Showcase website with warm atmosphere and homey feel for local business' : 'Site vitrine avec atmosphère chaleureuse et ambiance maison pour commerce local',
      image: mockupBakery,
      tags: [language === 'he' ? 'עסק מקומי' : language === 'en' ? 'Local Business' : 'Commerce Local', language === 'he' ? 'חם' : language === 'en' ? 'Warm' : 'Chaleureux', language === 'he' ? 'ויטרינה' : language === 'en' ? 'Showcase' : 'Vitrine', language === 'he' ? 'אותנטי' : language === 'en' ? 'Authentic' : 'Authentique'],
      metrics: [
        language === 'he' ? 'עלייה של 80% בהזמנות' : language === 'en' ? '+80% increase in orders' : '+80% d\'augmentation des commandes',
        language === 'he' ? 'חיבור רגשי לקהל המטרה' : language === 'en' ? 'Emotional connection with target audience' : 'Connexion émotionnelle avec la cible',
        language === 'he' ? 'זיהוי מותג חזק' : language === 'en' ? 'Strong brand recognition' : 'Reconnaissance de marque forte'
      ],
      delay: "0.6s"
    },
    {
      title: language === 'he' ? 'פורטפוליו יוצר תוכן' : language === 'en' ? 'Creative Portfolio' : 'Portfolio Créatif',
      description: language === 'he' ? 'פורטפוליו אמנותי לצלם עם גלריה אלגנטיה ועיצוב מתוחכם' : language === 'en' ? 'Artistic portfolio for photographer with elegant gallery and sophisticated design' : 'Portfolio artistique pour photographe avec galerie élégante et design sophistiqué',
      image: mockupPortfolio,
      tags: ["Portfolio", language === 'he' ? 'אמנותי' : language === 'en' ? 'Artistic' : 'Artistique', language === 'he' ? 'גלריה' : language === 'en' ? 'Gallery' : 'Galerie', language === 'he' ? 'מינימליסטי' : language === 'en' ? 'Minimalist' : 'Minimaliste'],
      metrics: [
        language === 'he' ? 'עלייה של 120% בפניות לקוחות' : language === 'en' ? '+120% increase in client inquiries' : '+120% d\'augmentation des demandes clients',
        language === 'he' ? 'חוויה ויזואלית מושלמת' : language === 'en' ? 'Perfect visual experience' : 'Expérience visuelle parfaite',
        language === 'he' ? 'תצוגה אופטימלית לעבודות' : language === 'en' ? 'Optimal work showcase' : 'Présentation optimale des travaux'
      ],
      delay: "0.8s"
    },
    {
      title: language === 'he' ? 'סטארט-אפ חדשני' : language === 'en' ? 'Innovative Startup' : 'Startup Innovant',
      description: language === 'he' ? 'אתר סוכנות דינמי עם אנרגיה צעירה ומראה מודרני' : language === 'en' ? 'Dynamic agency website with youthful energy and modern look' : 'Site d\'agence dynamique avec énergie jeune et look moderne',
      image: mockupAgency,
      tags: ["Startup", language === 'he' ? 'חדשנות' : language === 'en' ? 'Innovation' : 'Innovation', language === 'he' ? 'דינמי' : language === 'en' ? 'Dynamic' : 'Dynamique', language === 'he' ? 'מודרני' : language === 'en' ? 'Modern' : 'Moderne'],
      metrics: [
        language === 'he' ? 'משיכת 200+ לקוחות בחודש' : language === 'en' ? 'Attracted 200+ clients per month' : 'Attraction de 200+ clients par mois',
        language === 'he' ? 'זיהוי מותג בולט' : language === 'en' ? 'Outstanding brand recognition' : 'Reconnaissance de marque remarquable',
        language === 'he' ? 'חוויה אינטראקטיבית' : language === 'en' ? 'Interactive experience' : 'Expérience interactive'
      ],
      delay: "1s"
    },
    {
      title: language === 'he' ? 'בלוג אורח חיים' : language === 'en' ? 'Lifestyle Blog' : 'Blog Lifestyle',
      description: language === 'he' ? 'פלטפורמת תוכן עם עיצוב מגזיני ואסתטיקה נשית עדינה' : language === 'en' ? 'Content platform with magazine design and delicate feminine aesthetic' : 'Plateforme de contenu avec design magazine et esthétique féminine délicate',
      image: mockupBlog,
      tags: ["Blog", language === 'he' ? 'תוכן' : language === 'en' ? 'Content' : 'Contenu', language === 'he' ? 'מגזין' : language === 'en' ? 'Magazine' : 'Magazine', language === 'he' ? 'אלגנטי' : language === 'en' ? 'Elegant' : 'Élégant'],
      metrics: [
        language === 'he' ? '50K+ צפיות חודשיות' : language === 'en' ? '50K+ monthly views' : '50K+ vues mensuelles',
        language === 'he' ? 'קהילה מעורבת' : language === 'en' ? 'Engaged community' : 'Communauté engagée',
        language === 'he' ? 'חוויית קריאה מהנה' : language === 'en' ? 'Enjoyable reading experience' : 'Expérience de lecture agréable'
      ],
      delay: "1.2s"
    },
    {
      title: language === 'he' ? 'סוכנות נדל"ן יוקרתית' : language === 'en' ? 'Luxury Real Estate Agency' : 'Agence Immobilière de Luxe',
      description: language === 'he' ? 'פלטפורמה מתוחכמת לנכסי יוקרה עם מראה מקצועי ואמין' : language === 'en' ? 'Sophisticated platform for luxury properties with professional and trustworthy look' : 'Plateforme sophistiquée pour propriétés de luxe avec look professionnel et fiable',
      image: mockupRealEstate,
      tags: [language === 'he' ? 'נדל"ן' : language === 'en' ? 'Real Estate' : 'Immobilier', language === 'he' ? 'יוקרה' : language === 'en' ? 'Luxury' : 'Luxe', language === 'he' ? 'מקצועי' : language === 'en' ? 'Professional' : 'Professionnel', language === 'he' ? 'אמין' : language === 'en' ? 'Trustworthy' : 'Fiable'],
      metrics: [
        language === 'he' ? 'עלייה של 90% במכירות' : language === 'en' ? '+90% increase in sales' : '+90% d\'augmentation des ventes',
        language === 'he' ? 'לקוחות VIP מרוצים' : language === 'en' ? 'Satisfied VIP clients' : 'Clients VIP satisfaits',
        language === 'he' ? 'מותג יוקרה מוכר' : language === 'en' ? 'Recognized luxury brand' : 'Marque de luxe reconnue'
      ],
      delay: "1.4s"
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
              {projects.map((project, index) => (
                <CarouselItem key={project.title} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3 px-2">
                  <Card 
                    className="gradient-card border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-102 group overflow-hidden h-full relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/0 before:via-primary/5 before:to-primary/0 before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 before:ease-out hover:shadow-xl hover:shadow-primary/10" 
                  >
                    {/* Image du projet */}
                    <div className="relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-48 object-cover group-hover:scale-110 transition-all duration-500 ease-out" 
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
              onClick={handleEmailProject}
            >
              <Mail className={`${language === 'he' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
              {emailTranslations[language]?.['email.send_email'] || 'Envoyer un email'}
              <ArrowRight className={`${language === 'he' ? 'mr-2' : 'ml-2'} h-5 w-5`} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
