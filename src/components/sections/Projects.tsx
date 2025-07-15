import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight, Lightbulb } from "lucide-react";
const Projects = () => {
  const projects = [{
    title: "E-commerce Fashion Forward",
    description: "Boutique en ligne Shopify avec système de personnalisation avancé et automatisations marketing complètes.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
    tags: ["Shopify", "E-commerce", "Automatisation", "Design"],
    metrics: ["+150% conversions", "2s temps de chargement", "99.9% uptime"],
    delay: "0s"
  }, {
    title: "SaaS Analytics Dashboard",
    description: "Application web complète pour l'analyse de données avec intégrations API multiples et visualisations en temps réel.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["React", "Dashboard", "API", "Analytics"],
    metrics: ["10K+ utilisateurs", "Real-time data", "Cloud scalable"],
    delay: "0.2s"
  }, {
    title: "Automatisation Lead Gen",
    description: "Système complet d'acquisition de leads via Google Maps API avec CRM intégré et workflows automatisés.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    tags: ["Make.com", "Google Maps", "CRM", "Automatisation"],
    metrics: ["500+ leads/mois", "80% qualification", "3h économisées/jour"],
    delay: "0.4s"
  }, {
    title: "Chatbot IA Support Client",
    description: "Agent conversationnel intelligent avec GPT personnalisé pour le support client 24/7 d'une fintech.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
    tags: ["GPT", "IA", "Chatbot", "Support"],
    metrics: ["90% résolution auto", "24/7 disponible", "-60% tickets"],
    delay: "0.6s"
  }, {
    title: "Portfolio Architecte",
    description: "Site vitrine Framer avec animations fluides et galerie interactive pour un cabinet d'architecture renommé.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    tags: ["Framer", "Animation", "Portfolio", "Architecture"],
    metrics: ["95 PageSpeed", "Design Award", "+200% trafic"],
    delay: "0.8s"
  }, {
    title: "Workflow RH Automatisé",
    description: "Système de gestion RH avec automatisations Zapier pour onboarding, formation et évaluation des employés.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    tags: ["Zapier", "RH", "Workflow", "Productivité"],
    metrics: ["5h économisées/semaine", "100% automatisé", "0 erreur manuelle"],
    delay: "1s"
  }];
  return <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-10 animate-float opacity-10">
        <Lightbulb className="h-28 w-28 text-accent" />
      </div>

      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6">
            <Lightbulb className="h-4 w-4 text-accent mr-2" />
            <span className="text-sm font-medium">Nos Réalisations</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-50">
            Des projets qui{" "}
            <span className="gradient-hero bg-clip-text text-slate-50">
              transforment les entreprises
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs grâce à des solutions 
            digitales innovantes et performantes.
          </p>
        </div>

        {/* Grille de projets */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => <Card key={project.title} className="gradient-card border-border/50 hover:border-primary/50 transition-smooth hover:scale-105 group overflow-hidden animate-fade-in-up" style={{
          animationDelay: project.delay
        }}>
              {/* Image du projet */}
              <div className="relative overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" className="rounded-full">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>)}
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-primary transition-smooth">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                {/* Métriques */}
                <div className="space-y-2 mb-6">
                  {project.metrics.map((metric, idx) => <div key={idx} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mr-3" />
                      <span className="text-muted-foreground">{metric}</span>
                    </div>)}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1 group/btn hover:bg-primary/10 transition-smooth">
                    Voir le projet
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="ghost" size="sm" className="px-3">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* CTA final */}
        <div className="text-center">
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">
              Votre projet pourrait être le prochain
            </h3>
            <p className="text-muted-foreground mb-6">
              Chaque projet est unique. Discutons de vos défis et objectifs pour créer une solution parfaitement adaptée.
            </p>
            <Button size="lg" className="glow-primary">
              Démarrer votre projet
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default Projects;