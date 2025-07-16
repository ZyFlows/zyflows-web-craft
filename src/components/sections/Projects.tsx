
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Projects = () => {
  const { t, language } = useLanguage();

  const projects = [
    {
      title: t('projects.project1_title'),
      description: t('projects.project1_desc'),
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
      tags: ["Shopify", "E-commerce", t('projects.tag_automation'), t('projects.tag_design')],
      metrics: [t('projects.metric1_1'), t('projects.metric1_2'), t('projects.metric1_3')],
      delay: "0s"
    },
    {
      title: t('projects.project2_title'),
      description: t('projects.project2_desc'),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tags: ["React", "Dashboard", "API", "Analytics"],
      metrics: [t('projects.metric2_1'), t('projects.metric2_2'), t('projects.metric2_3')],
      delay: "0.2s"
    },
    {
      title: t('projects.project3_title'),
      description: t('projects.project3_desc'),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      tags: ["Make.com", "Google Maps", "CRM", t('projects.tag_automation')],
      metrics: [t('projects.metric3_1'), t('projects.metric3_2'), t('projects.metric3_3')],
      delay: "0.4s"
    },
    {
      title: t('projects.project4_title'),
      description: t('projects.project4_desc'),
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
      tags: ["GPT", "IA", "Chatbot", t('projects.tag_support')],
      metrics: [t('projects.metric4_1'), t('projects.metric4_2'), t('projects.metric4_3')],
      delay: "0.6s"
    },
    {
      title: t('projects.project5_title'),
      description: t('projects.project5_desc'),
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
      tags: ["Framer", t('projects.tag_animation'), "Portfolio", t('projects.tag_architecture')],
      metrics: [t('projects.metric5_1'), t('projects.metric5_2'), t('projects.metric5_3')],
      delay: "0.8s"
    },
    {
      title: t('projects.project6_title'),
      description: t('projects.project6_desc'),
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      tags: ["Zapier", "RH", "Workflow", t('projects.tag_productivity')],
      metrics: [t('projects.metric6_1'), t('projects.metric6_2'), t('projects.metric6_3')],
      delay: "1s"
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

        {/* Grille de projets */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <Card 
              key={project.title} 
              className="gradient-card border-border/50 hover:border-primary/50 transition-smooth hover:scale-105 group overflow-hidden animate-fade-in-up project-card" 
              style={{ animationDelay: project.delay }}
            >
              {/* Image du projet */}
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className={`absolute top-4 ${language === 'he' ? 'left-4' : 'right-4'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <Button size="sm" variant="secondary" className="rounded-full">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
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
                <CardTitle className={`text-xl font-semibold group-hover:text-primary transition-smooth ${language === 'he' ? 'text-right' : ''}`}>
                  {project.title}
                </CardTitle>
                <CardDescription className={`text-muted-foreground ${language === 'he' ? 'text-right' : ''}`}>
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className={`pt-0 ${language === 'he' ? 'text-right' : ''}`}>
                {/* Métriques */}
                <div className="space-y-2 mb-6">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className={`flex items-center text-sm ${language === 'he' ? 'justify-end' : ''}`}>
                      {language === 'he' ? (
                        <>
                          <span className="text-muted-foreground">{metric}</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-accent ml-3" />
                        </>
                      ) : (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mr-3" />
                          <span className="text-muted-foreground">{metric}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className={`flex gap-2 ${language === 'he' ? 'flex-row-reverse' : ''}`}>
                  <Button variant="ghost" size="sm" className="flex-1 group/btn hover:bg-primary/10 transition-smooth">
                    {t('projects.view_project')}
                    <ArrowRight className={`${language === 'he' ? 'mr-2 group-hover/btn:-translate-x-1' : 'ml-2 group-hover/btn:translate-x-1'} h-4 w-4 transition-transform`} />
                  </Button>
                  <Button variant="ghost" size="sm" className="px-3">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA final */}
        <div className="text-center">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              {t('projects.cta_title')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('projects.cta_desc')}
            </p>
            <Button size="lg" className="glow-primary">
              {t('projects.cta_button')}
              <ArrowRight className={`${language === 'he' ? 'mr-2' : 'ml-2'} h-5 w-5`} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
