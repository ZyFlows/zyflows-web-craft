import { Helmet } from "react-helmet-async";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Cpu,
  ExternalLink,
  Search
} from "lucide-react";

// Import mockup images
import mockupEcommerce from "@/assets/mockup-ecommerce.jpg";
import mockupSaas from "@/assets/mockup-saas.jpg";
import mockupAgency from "@/assets/mockup-agency.jpg";
import mockupProfessional from "@/assets/mockup-professional.jpg";
import mockupBakery from "@/assets/mockup-bakery.jpg";
import mockupPortfolio from "@/assets/mockup-portfolio.jpg";
import mockupRealEstate from "@/assets/mockup-realestate.jpg";
import mockupBlog from "@/assets/mockup-blog.jpg";
import mockupAutomation from "@/assets/mockup-automation.jpg";
import mockupCustomGPT from "@/assets/mockup-custom-gpt.jpg";

const Portfolio = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: t('portfolio.filters.all'), icon: Globe },
    { id: "web", label: t('portfolio.filters.web'), icon: Globe },
    { id: "mobile", label: t('portfolio.filters.mobile'), icon: Smartphone },
    { id: "ecommerce", label: t('portfolio.filters.ecommerce'), icon: ShoppingCart },
    { id: "ai", label: t('portfolio.filters.ai'), icon: Cpu }
  ];

  const projects = [
    {
      id: 1,
      title: t('portfolio.projects.ecommerce.title'),
      category: "ecommerce",
      description: t('portfolio.projects.ecommerce.description'),
      image: mockupEcommerce,
      tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
      link: "/demo/ecommerce"
    },
    {
      id: 2,
      title: t('portfolio.projects.saas.title'),
      category: "web",
      description: t('portfolio.projects.saas.description'),
      image: mockupSaas,
      tags: ["React", "TypeScript", "Supabase", "Tailwind"],
      link: "/demo/saas"
    },
    {
      id: 3,
      title: t('portfolio.projects.agency.title'),
      category: "web",
      description: t('portfolio.projects.agency.description'),
      image: mockupAgency,
      tags: ["React", "Animation", "SEO", "Responsive"],
      link: "/demo/agency"
    },
    {
      id: 4,
      title: t('portfolio.projects.professional.title'),
      category: "web",
      description: t('portfolio.projects.professional.description'),
      image: mockupProfessional,
      tags: ["React", "Multi-page", "Contact Form", "Modern UI"],
      link: "/demo/legal-firm"
    },
    {
      id: 5,
      title: t('portfolio.projects.bakery.title'),
      category: "web",
      description: t('portfolio.projects.bakery.description'),
      image: mockupBakery,
      tags: ["React", "Menu System", "Booking", "Mobile-First"],
      link: "/demo/restaurant"
    },
    {
      id: 6,
      title: t('portfolio.projects.portfolio.title'),
      category: "web",
      description: t('portfolio.projects.portfolio.description'),
      image: mockupPortfolio,
      tags: ["React", "Portfolio", "Gallery", "Creative"],
      link: "/demo/portfolio"
    },
    {
      id: 7,
      title: t('portfolio.projects.realestate.title'),
      category: "web",
      description: t('portfolio.projects.realestate.description'),
      image: mockupRealEstate,
      tags: ["React", "Database", "Search", "Filters"],
      link: "/demo/real-estate"
    },
    {
      id: 8,
      title: t('portfolio.projects.blog.title'),
      category: "web",
      description: t('portfolio.projects.blog.description'),
      image: mockupBlog,
      tags: ["React", "CMS", "SEO", "Content"],
      link: "/demo/lifestyle-blog"
    },
    {
      id: 9,
      title: t('portfolio.projects.automation.title'),
      category: "ai",
      description: t('portfolio.projects.automation.description'),
      image: mockupAutomation,
      tags: ["Automation", "AI", "Workflow", "Integration"],
      link: "/demo/automation"
    },
    {
      id: 10,
      title: t('portfolio.projects.gpt.title'),
      category: "ai",
      description: t('portfolio.projects.gpt.description'),
      image: mockupCustomGPT,
      tags: ["GPT", "AI", "Custom", "Training"],
      link: "/demo/legal-gpt"
    }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('meta.portfolio.title')}</title>
        <meta name="description" content={t('meta.portfolio.description')} />
        <link rel="canonical" href="https://zyflows.lovable.app/portfolio" />
      </Helmet>

      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 text-sm px-4 py-2">{t('portfolio.badge')}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('portfolio.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('portfolio.hero.subtitle')}
            </p>
          </div>

          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              {t('portfolio.intro.paragraph1')}
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t('portfolio.intro.paragraph2')}
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filter === category.id ? "default" : "outline"}
                onClick={() => setFilter(category.id)}
                className="gap-2"
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProjects.map((project) => (
              <Card 
                key={project.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <Button 
                      size="sm"
                      onClick={() => window.location.href = project.link}
                      className="gap-2"
                    >
                      {t('portfolio.view_demo')}
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <Card className="p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">{t('portfolio.stats.completed')}</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">30+</div>
              <div className="text-sm text-muted-foreground">{t('portfolio.stats.clients')}</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-muted-foreground">{t('portfolio.stats.satisfaction')}</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">{t('portfolio.stats.support')}</div>
            </Card>
          </div>

          {/* CTA Section */}
          <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-primary/10 to-accent/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('portfolio.cta.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('portfolio.cta.description')}
            </p>
            <Button 
              size="lg"
              onClick={() => window.location.href = "/contact"}
              className="glow-primary"
            >
              {t('portfolio.cta.button')}
            </Button>
          </Card>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Portfolio;
