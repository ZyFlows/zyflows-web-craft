import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Quote, ArrowRight, MessageSquare } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO",
      company: "TechFlow Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b190?w=150&h=150&fit=crop&crop=face",
      content: "zyFlows a transformé notre présence digitale. Leur automatisation des leads via Google Maps nous a permis d'augmenter nos ventes de 200% en 6 mois. Une équipe exceptionnelle !",
      rating: 5,
      tags: ["E-commerce", "Automatisation"],
      project: "Système de génération de leads",
      delay: "0s"
    },
    {
      name: "Marc Dubois",
      role: "Directeur Marketing",
      company: "Innovate Digital",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "Le chatbot IA développé par zyFlows gère maintenant 90% de nos demandes support. Notre équipe peut enfin se concentrer sur les tâches à haute valeur ajoutée. Résultat : productivité x3 !",
      rating: 5,
      tags: ["IA", "Chatbot", "Support"],
      project: "Agent IA conversationnel",
      delay: "0.2s"
    },
    {
      name: "Elena Rodriguez",
      role: "Fondatrice",
      company: "Creative Studio",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Notre site Framer est une œuvre d'art fonctionnelle. Les animations fluides et l'UX impeccable nous ont valu 3 prix design. zyFlows comprend vraiment l'esthétique ET la performance.",
      rating: 5,
      tags: ["Design", "Framer", "Animation"],
      project: "Site vitrine portfolio",
      delay: "0.4s"
    },
    {
      name: "David Kim",
      role: "CTO",
      company: "FinTech Pro",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "L'application web développée par zyFlows gère plus de 10K utilisateurs daily sans broncher. Architecture robuste, code propre et support technique au top. Je recommande vivement !",
      rating: 5,
      tags: ["SaaS", "Scalabilité", "Performance"],
      project: "Dashboard analytics temps réel",
      delay: "0.6s"
    },
    {
      name: "Amélie Laurent",
      role: "Responsable E-commerce",
      company: "Fashion Forward",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      content: "Notre boutique Shopify conçue par zyFlows convertit 3x mieux qu'avant. Les automatisations marketing et l'UX optimisée ont révolutionné notre business. ROI exceptionnel !",
      rating: 5,
      tags: ["Shopify", "E-commerce", "Conversion"],
      project: "Boutique en ligne complète",
      delay: "0.8s"
    },
    {
      name: "Thomas Weber",
      role: "Directeur Général",
      company: "AutoFlow Systems",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "Les workflows Make.com mis en place nous font économiser 25h/semaine. Tout est automatisé, de la qualification des leads au suivi client. L'efficacité à l'état pur !",
      rating: 5,
      tags: ["Make.com", "Workflow", "Productivité"],
      project: "Automatisation processus métier",
      delay: "1s"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 left-10 animate-float opacity-10">
        <MessageSquare className="h-28 w-28 text-accent" />
      </div>
      <div className="absolute bottom-20 right-10 animate-float opacity-10" style={{ animationDelay: '2s' }}>
        <Quote className="h-32 w-32 text-primary" />
      </div>

      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6">
            <MessageSquare className="h-4 w-4 text-accent mr-2" />
            <span className="text-sm font-medium">Témoignages Clients</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ce que disent nos{" "}
            <span className="gradient-hero bg-clip-text text-transparent">
              clients satisfaits
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Plus de 50 projets réalisés, des résultats concrets et mesurables. 
            Découvrez comment zyFlows a transformé leurs entreprises.
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
                {/* Rating et tags */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  <Quote className="h-5 w-5 text-primary/50" />
                </div>

                {/* Témoignage */}
                <CardDescription className="text-base italic mb-6 text-foreground">
                  "{testimonial.content}"
                </CardDescription>

                {/* Tags projet */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {testimonial.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Projet */}
                <div className="text-sm text-muted-foreground mb-4">
                  <span className="font-medium">Projet :</span> {testimonial.project}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 border-t border-border/50">
                {/* Profil client */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
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
            { number: "50+", label: "Projets réalisés" },
            { number: "99%", label: "Clients satisfaits" },
            { number: "4.9/5", label: "Note moyenne" },
            { number: "100%", label: "Projets livrés à temps" }
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
              Rejoignez nos clients satisfaits
            </h3>
            <p className="text-muted-foreground mb-6">
              Votre success story pourrait être la prochaine. Parlons de votre projet 
              et découvrons ensemble comment transformer vos défis en opportunités.
            </p>
            <Button size="lg" className="glow-primary">
              Démarrer votre projet
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;