import Navigation from "@/components/ui/navigation";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Quote, ArrowRight, MessageSquare, Mail, Star } from "lucide-react";

const ReviewsPage = () => {
  const { t, language } = useLanguage();

  const handleWhatsAppProject = () => {
    const phoneNumber = "972584229255";
    const message = language === 'fr' 
      ? "🚀 Bonjour ! J'ai vu vos témoignages clients et je souhaite démarrer un projet avec vous. Pouvons-nous en discuter ?"
      : language === 'he'
      ? "🚀 שלום! ראיתי את המלצות הלקוחות שלכם ואני רוצה להתחיל פרויקט איתכם. נוכל לדבר על זה?"
      : "🚀 Hello! I saw your client testimonials and I'd like to start a project with you. Can we discuss it?";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const metaTags = {
    fr: {
      title: "Avis et Recommandations clients – Zyflows",
      description: "Découvrez les témoignages de nos clients satisfaits. 50+ projets réalisés, 99% de satisfaction, résultats mesurables. Augmentation des ventes, automatisations efficaces."
    },
    en: {
      title: "Client Reviews and Testimonials – Zyflows",
      description: "Discover testimonials from our satisfied clients. 50+ projects completed, 99% satisfaction, measurable results. Increased sales, effective automations."
    },
    he: {
      title: "ביקורות והמלצות לקוחות – Zyflows",
      description: "גלו המלצות מלקוחות מרוצים. 50+ פרויקטים, 99% שביעות רצון, תוצאות מדידות. עלייה במכירות, אוטומציות יעילות."
    }
  };

  const meta = metaTags[language];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO", 
      company: "TechFlow Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b190?w=150&h=150&fit=crop&crop=face",
      content: t('testimonials.testimonial1'),
      rating: 5,
      tags: ["E-commerce", language === 'fr' ? "Automatisation" : language === 'he' ? "אוטומציה" : "Automation"],
      project: t('testimonials.project1'),
      highlight: language === 'fr' ? '+200% ventes en 6 mois' : language === 'he' ? '+200% מכירות ב-6 חודשים' : '+200% sales in 6 months'
    },
    {
      name: "Marc Dubois",
      role: language === 'fr' ? "Directeur Marketing" : language === 'he' ? "מנהל שיווק" : "Marketing Director",
      company: "Innovate Digital", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: t('testimonials.testimonial2'),
      rating: 5,
      tags: ["IA", "Chatbot", "Support"],
      project: t('testimonials.project2'),
      highlight: language === 'fr' ? '90% demandes résolues auto' : language === 'he' ? '90% פניות נפתרות אוטומטית' : '90% requests auto-resolved'
    },
    {
      name: "Elena Rodriguez",
      role: language === 'fr' ? "Fondatrice" : language === 'he' ? "מייסדת" : "Founder",
      company: "Creative Studio",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: t('testimonials.testimonial3'),
      rating: 5,
      tags: ["Design", "Framer", "Animation"],
      project: t('testimonials.project3'),
      highlight: language === 'fr' ? '3 prix design' : language === 'he' ? '3 פרסי עיצוב' : '3 design awards'
    },
    {
      name: "David Kim",
      role: "CTO",
      company: "FinTech Pro",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: t('testimonials.testimonial4'),
      rating: 5,
      tags: ["SaaS", language === 'fr' ? "Scalabilité" : language === 'he' ? "סקלביליות" : "Scalability", "Performance"],
      project: t('testimonials.project4'),
      highlight: language === 'fr' ? '10K+ utilisateurs/jour' : language === 'he' ? '10K+ משתמשים/יום' : '10K+ users/day'
    },
    {
      name: "Amélie Laurent",
      role: language === 'fr' ? "Responsable E-commerce" : language === 'he' ? "מנהלת אי-קומרס" : "E-commerce Manager",
      company: "Fashion Forward",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      content: t('testimonials.testimonial5'),
      rating: 5,
      tags: ["Shopify", "E-commerce", "Conversion"],
      project: t('testimonials.project5'),
      highlight: language === 'fr' ? 'Conversion ×3' : language === 'he' ? 'המרה ×3' : 'Conversion ×3'
    },
    {
      name: "Thomas Weber",
      role: language === 'fr' ? "Directeur Général" : language === 'he' ? "מנכ\"ל" : "General Manager",
      company: "AutoFlow Systems",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: t('testimonials.testimonial6'),
      rating: 5,
      tags: ["Make.com", "Workflow", language === 'fr' ? "Productivité" : language === 'he' ? "פרודוקטיביות" : "Productivity"],
      project: t('testimonials.project6'),
      highlight: language === 'fr' ? '25h économisées/semaine' : language === 'he' ? '25 שעות חסכון/שבוע' : '25h saved/week'
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": meta.title,
    "description": meta.description,
    "url": "https://zyflows.com/reviews",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": testimonials.map((testimonial, index) => ({
        "@type": "Review",
        "position": index + 1,
        "author": {
          "@type": "Person",
          "name": testimonial.name
        },
        "reviewBody": testimonial.content,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": testimonial.rating,
          "bestRating": 5
        },
        "itemReviewed": {
          "@type": "Organization",
          "name": "zyFlows"
        }
      }))
    }
  };

  const skipLinkText = language === 'fr' 
    ? 'Aller au contenu principal' 
    : language === 'he' 
    ? 'דלג לתוכן הראשי' 
    : 'Skip to main content';

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <html lang={language} dir={language === 'he' ? 'rtl' : 'ltr'} />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href="https://zyflows.com/reviews" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content="https://zyflows.com/reviews" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <a href="#main-content" className="skip-link" aria-label={skipLinkText}>
        {skipLinkText}
      </a>
      
      <header>
        <Navigation />
      </header>
      
      <main id="main-content" role="main" className={`pt-20 ${language === 'he' ? 'rtl' : ''}`}>
        <section className="py-20 relative overflow-hidden">
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
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {language === 'fr' ? 'Ce que disent nos clients' :
                 language === 'he' ? 'מה הלקוחות שלנו אומרים' :
                 'What Our Clients Say'}
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('testimonials.subtitle')}
              </p>
            </div>

            {/* Stats globaux */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {[
                { number: "50+", label: t('testimonials.stat1') },
                { number: "99%", label: t('testimonials.stat2') },
                { number: "4.9/5", label: t('testimonials.stat3') },
                { number: "100%", label: t('testimonials.stat4') }
              ].map((stat, index) => (
                <div key={index} className="text-center glass-effect rounded-xl p-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Grille de témoignages */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
              {testimonials.map((testimonial, index) => (
                <Card 
                  key={testimonial.name}
                  className="gradient-card border-border/50 hover:border-primary/50 transition-smooth hover:scale-105 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    {/* Highlight badge */}
                    <div className={`flex ${language === 'he' ? 'justify-start' : 'justify-end'} mb-4`}>
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {testimonial.highlight}
                      </Badge>
                    </div>

                    {/* Rating */}
                    <div className={`flex gap-1 mb-4 ${language === 'he' ? 'justify-end' : 'justify-start'}`}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
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

            {/* CTA final */}
            <div className="text-center">
              <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">
                  {t('testimonials.cta_title')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t('testimonials.cta_desc')}
                </p>
                <Button size="lg" className="glow-primary" onClick={handleWhatsAppProject}>
                  <Mail className={`${language === 'he' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {language === 'fr' ? 'Démarrer mon projet' : language === 'he' ? 'להתחיל את הפרויקט שלי' : 'Start My Project'}
                  <ArrowRight className={`${language === 'he' ? 'mr-2' : 'ml-2'} h-5 w-5`} />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ReviewsPage;
