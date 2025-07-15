import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Target, 
  Heart, 
  Zap, 
  Globe, 
  Award,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Excellence Technique",
      description: "Nous repoussons les limites du possible avec les dernières technologies et les meilleures pratiques du développement.",
      color: "text-primary"
    },
    {
      icon: Heart,
      title: "Approche Humaine",
      description: "Chaque projet est unique. Nous écoutons, comprenons et créons des solutions qui reflètent vraiment vos besoins.",
      color: "text-accent"
    },
    {
      icon: Zap,
      title: "Innovation Continue",
      description: "L'IA, l'automatisation et les nouvelles technologies n'ont plus de secrets pour nous. Nous restons à la pointe.",
      color: "text-primary"
    },
    {
      icon: Globe,
      title: "Vision Globale",
      description: "Basés en Israël, nous travaillons avec des clients du monde entier et maîtrisons les enjeux internationaux.",
      color: "text-accent"
    }
  ];

  const achievements = [
    { number: "50+", label: "Projets réalisés", icon: Award },
    { number: "15+", label: "Pays touchés", icon: Globe },
    { number: "99%", label: "Taux de satisfaction", icon: Heart },
    { number: "5", label: "Années d'expertise", icon: Target }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 right-20 animate-float opacity-10">
        <Users className="h-32 w-32 text-primary" />
      </div>

      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6">
            <Users className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium">À Propos de zyFlows</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            L'expertise tech au service de{" "}
            <span className="gradient-hero bg-clip-text text-transparent">
              vos ambitions
            </span>
          </h2>
        </div>

        {/* Histoire et mission */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl font-semibold mb-6">Notre Mission</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Chez zyFlows, nous croyons que la technologie doit servir l'humain, pas l'inverse. 
              Basée en Israël, notre équipe combine l'innovation technologique de pointe avec une 
              approche profondément humaine et accessible.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Nous transformons les défis complexes en solutions élégantes, que ce soit à travers 
              des sites web performants, des automatisations intelligentes ou des agents IA sur-mesure.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "Solutions 100% personnalisées",
                "Support technique réactif 24/7",
                "Méthodologie agile et transparente",
                "Formation et accompagnement inclus"
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="glow-primary">
              Découvrir notre équipe
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="glass-effect rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={index} className="text-center">
                        <IconComponent className="h-8 w-8 text-primary mx-auto mb-3" />
                        <div className="text-3xl font-bold text-primary mb-2">
                          {achievement.number}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {achievement.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Badges flottants */}
              <div className="absolute -top-4 -right-4">
                <Badge className="bg-primary text-primary-foreground">
                  Made in Israel 🇮🇱
                </Badge>
              </div>
              <div className="absolute -bottom-4 -left-4">
                <Badge variant="secondary">
                  Tech Innovators
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Valeurs */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-center mb-12">
            Nos Valeurs Fondamentales
          </h3>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card 
                  key={value.title}
                  className="gradient-card border-border/50 hover:border-primary/50 transition-smooth hover:scale-105 text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-full glass-effect flex items-center justify-center mx-auto mb-4 ${value.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-center">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA de contact */}
        <div className="text-center">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              Prêt à rejoindre l'aventure ?
            </h3>
            <p className="text-muted-foreground mb-6">
              Que vous soyez une startup ambitieuse ou une entreprise établie, nous avons les compétences 
              et la passion pour propulser votre projet vers le succès.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-primary">
                Discuter de votre projet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="glass-effect border-primary/30">
                Voir nos témoignages
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;