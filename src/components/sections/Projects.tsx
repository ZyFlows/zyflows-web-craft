import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Code, Palette, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { generateEmailTemplate, openEmailClient } from "@/utils/emailTemplates";

const Projects = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();

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
      icon: Code,
      title: language === 'he' ? 'פיתוח אתרים מתקדם' : language === 'en' ? 'Advanced Web Development' : 'Développement Web Avancé',
      description: language === 'he' ? 'אתרים מודרניים עם ביצועים מעולים' : language === 'en' ? 'Modern websites with excellent performance' : 'Sites web modernes avec d\'excellentes performances',
      tags: ["React", "TypeScript", "Tailwind"],
      delay: "0s"
    },
    {
      icon: Palette,
      title: language === 'he' ? 'עיצוב UI/UX' : language === 'en' ? 'UI/UX Design' : 'Design UI/UX',
      description: language === 'he' ? 'חווי משתמש אינטואיטיבי ומעוצב' : language === 'en' ? 'Intuitive and designed user experience' : 'Expérience utilisateur intuitive et stylée',
      tags: ["Figma", "Design System", "Responsive"],
      delay: "0.2s"
    },
    {
      icon: Zap,
      title: language === 'he' ? 'אוטומציות חכמות' : language === 'en' ? 'Smart Automations' : 'Automatisations Intelligentes',
      description: language === 'he' ? 'אוטומציה של תהליכים עסקיים' : language === 'en' ? 'Business process automation' : 'Automatisation de processus métier',
      tags: ["Make", "n8n", "AI"],
      delay: "0.4s"
    },
  ];

  return (
    <section id="projects" className={`py-20 relative overflow-hidden ${language === 'he' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="gradient-card border-border/50 hover:border-primary/50 transition-smooth hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: project.delay }}
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <project.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <CardTitle className={language === 'he' ? 'text-right' : ''}>{project.title}</CardTitle>
                <CardDescription className={language === 'he' ? 'text-right' : ''}>
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`flex flex-wrap gap-2 ${language === 'he' ? 'justify-end' : ''}`}>
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="glow-primary" onClick={handleEmailProject}>
            <Mail className={`${language === 'he' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
            {t('projects.cta')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
