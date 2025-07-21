
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quote, ArrowRight, MessageSquare, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { generateEmailTemplate, openEmailClient } from "@/utils/emailTemplates";
import { emailTranslations } from '@/contexts/emailTranslations';

const Testimonials = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();

  const handleEmailProject = () => {
    const { subject, body } = generateEmailTemplate({ 
      language, 
      t, 
      type: 'testimonials' 
    });
    
    openEmailClient(subject, body);
    
    toast({
      title: t('email.send_email'),
      description: t('email.click_below'),
    });
  };

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO", 
      company: "TechFlow Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b190?w=150&h=150&fit=crop&crop=face",
      content: t('testimonials.testimonial1'),
      rating: 5,
      tags: ["E-commerce", "Automatisation"],
      project: t('testimonials.project1'),
      delay: "0s"
    },
    {
      name: "Marc Dubois",
      role: "Directeur Marketing",
      company: "Innovate Digital", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: t('testimonials.testimonial2'),
      rating: 5,
      tags: ["IA", "Chatbot", "Support"],
      project: t('testimonials.project2'),
      delay: "0.2s"
    },
    {
      name: "Elena Rodriguez",
      role: "Fondatrice",
      company: "Creative Studio",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: t('testimonials.testimonial3'),
      rating: 5,
      tags: ["Design", "Framer", "Animation"],
      project: t('testimonials.project3'),
      delay: "0.4s"
    },
    {
      name: "David Kim",
      role: "CTO",
      company: "FinTech Pro",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: t('testimonials.testimonial4'),
      rating: 5,
      tags: ["SaaS", "Scalabilité", "Performance"],
      project: t('testimonials.project4'),
      delay: "0.6s"
    },
    {
      name: "Amélie Laurent",
      role: "Responsable E-commerce",
      company: "Fashion Forward",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      content: t('testimonials.testimonial5'),
      rating: 5,
      tags: ["Shopify", "E-commerce", "Conversion"],
      project: t('testimonials.project5'),
      delay: "0.8s"
    },
    {
      name: "Thomas Weber",
      role: "Directeur Général",
      company: "AutoFlow Systems",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: t('testimonials.testimonial6'),
      rating: 5,
      tags: ["Make.com", "Workflow", "Productivité"],
      project: t('testimonials.project6'),
      delay: "1s"
    }
  ];


  return (
    <section id="testimonials" className={`py-20 relative overflow-hidden ${language === 'he' ? 'rtl' : ''}`}>
      {/* Background elements */}
      <div className={`absolute top-10 ${language === 'he' ? 'right-10' : 'left-10'} animate-float opacity-10`}>
        <MessageSquare className="h-28 w-28 text-accent" />
      </div>
      <div className={`absolute bottom-20 ${language === 'he' ? 'left-10' : 'right-10'} animate-float opacity-10`} style={{ animationDelay: '2s' }}>
        <Quote className="h-32 w-32 text-primary" />
      </div>

      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6">
            <MessageSquare className={`h-4 w-4 text-accent ${language === 'he' ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">{t('testimonials.badge')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('testimonials.title')}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Grille de témoignages */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="gradient-card border-border/50 hover:border-primary/50 transition-smooth hover:scale-105 group animate-fade-in-up"
              style={{ animationDelay: testimonial.delay }}
            >
              <CardHeader className="pb-4">
                {/* Quote icon */}
                <div className={`flex ${language === 'he' ? 'justify-start' : 'justify-end'} mb-4`}>
                  <Quote className="h-5 w-5 text-primary/50" />
                </div>

                {/* Témoignage */}
                <CardDescription className={`text-base italic mb-6 text-foreground ${language === 'he' ? 'text-right' : 'text-left'}`}>
                  "{testimonial.content}"
                </CardDescription>

                {/* Tags projet */}
                <div className={`flex flex-wrap gap-2 mb-4 ${language === 'he' ? 'justify-end' : 'justify-start'}`}>
                  {testimonial.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 border-t border-border/50">
                {/* Profil client */}
                <div className={`flex items-center gap-4 ${language === 'he' ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`flex-1 ${language === 'he' ? 'text-right' : 'text-left'}`}>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-primary">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats globaux */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[
            { number: "50+", label: t('testimonials.stat1') },
            { number: "99%", label: t('testimonials.stat2') },
            { number: "4.9/5", label: t('testimonials.stat3') },
            { number: "100%", label: t('testimonials.stat4') }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div className="text-center">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              {t('testimonials.cta_title')}
            </h3>
            <p className="text-muted-foreground mb-6">
              {t('testimonials.cta_desc')}
            </p>
            <Button size="lg" className="glow-primary" onClick={handleEmailProject}>
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

export default Testimonials;
