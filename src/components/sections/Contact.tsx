import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Clock,
  Globe,
  MessageCircle,
  ArrowRight,
  CheckCircle
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    project: "",
    budget: "",
    message: "",
    timeline: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const services = [
    "Site Web (Wix/WordPress/Shopify/Framer)",
    "Application Sur-Mesure", 
    "Automatisation (Make/Zapier/N8N)",
    "Génération de Leads (Google Maps)",
    "IA & GPT Personnalisés",
    "Audit & Conseil",
    "Support & Maintenance",
    "Autre"
  ];

  const budgetRanges = [
    "< 5K€",
    "5K€ - 15K€",
    "15K€ - 50K€",
    "50K€ - 100K€",
    "> 100K€",
    "À discuter"
  ];

  const timelines = [
    "Urgent (< 1 mois)",
    "Rapide (1-3 mois)",
    "Standard (3-6 mois)",
    "Flexible (> 6 mois)",
    "À planifier"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi
    setTimeout(() => {
      toast({
        title: "Message envoyé avec succès !",
        description: "Nous vous répondrons dans les 24h. Merci pour votre confiance.",
      });
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        project: "",
        budget: "",
        message: "",
        timeline: ""
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 right-10 animate-float opacity-10">
        <Send className="h-28 w-28 text-primary" />
      </div>

      <div className="container mx-auto px-4">
        {/* En-tête de section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6">
            <MessageCircle className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium">Contactez-nous</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transformons votre vision en réalité digitale
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Prêt à révolutionner votre présence digitale ? Discutons de votre projet 
            et découvrons ensemble les solutions parfaites pour votre entreprise.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Informations de contact */}
          <div className="lg:col-span-1">
            <Card className="gradient-card border-border/50 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Parlons de votre projet
                </CardTitle>
                <CardDescription>
                  Contactez-nous pour un appel découverte gratuit de 30 minutes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">hello@zyflows.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium">Téléphone</div>
                    <div className="text-sm text-muted-foreground">+972 58 123 4567</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium">Localisation</div>
                    <div className="text-sm text-muted-foreground">Tel Aviv, Israël</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium">Disponibilité</div>
                    <div className="text-sm text-muted-foreground">Lun-Ven 9h-18h CET</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Avantages */}
            <div className="space-y-4">
              {[
                "Réponse garantie sous 24h",
                "Appel découverte gratuit",
                "Devis personnalisé offert",
                "Support technique inclus"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">Démarrons votre projet</CardTitle>
                <CardDescription>
                  Plus vous nous en dites, mieux nous pourrons vous conseiller. 
                  Tous les champs marqués * sont obligatoires.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Informations personnelles */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Nom complet *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Votre nom et prénom"
                        required
                        className="glass-effect border-border/50"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Email professionnel *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="votre@email.com"
                        required
                        className="glass-effect border-border/50"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Entreprise
                      </label>
                      <Input
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="Nom de votre entreprise"
                        className="glass-effect border-border/50"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Téléphone
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+33 6 12 34 56 78"
                        className="glass-effect border-border/50"
                      />
                    </div>
                  </div>

                  {/* Détails du projet */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Service souhaité *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {services.map((service) => (
                        <Badge
                          key={service}
                          variant={formData.service === service ? "default" : "outline"}
                          className="cursor-pointer justify-center py-2 transition-smooth hover:scale-105"
                          onClick={() => handleInputChange("service", service)}
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Budget estimé
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {budgetRanges.map((budget) => (
                          <Badge
                            key={budget}
                            variant={formData.budget === budget ? "default" : "outline"}
                            className="cursor-pointer justify-center py-2 transition-smooth hover:scale-105"
                            onClick={() => handleInputChange("budget", budget)}
                          >
                            {budget}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Timeline souhaitée
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {timelines.map((timeline) => (
                          <Badge
                            key={timeline}
                            variant={formData.timeline === timeline ? "default" : "outline"}
                            className="cursor-pointer justify-center py-2 transition-smooth hover:scale-105"
                            onClick={() => handleInputChange("timeline", timeline)}
                          >
                            {timeline}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Décrivez votre projet *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Décrivez vos objectifs, vos défis actuels, et ce que vous aimeriez accomplir avec ce projet..."
                      className="min-h-32 glass-effect border-border/50"
                      required
                    />
                  </div>

                  {/* Bouton d'envoi */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full glow-primary group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer ma demande
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    En soumettant ce formulaire, vous acceptez que nous vous contactions 
                    concernant votre projet. Vos données sont protégées et ne seront jamais partagées.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA alternatifs */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="gradient-card border-border/50 text-center p-6 hover:scale-105 transition-smooth">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Planifier un appel</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Réservez directement un créneau pour discuter de votre projet
            </p>
            <Button variant="outline" size="sm" className="glass-effect">
              Calendly
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
          
          <Card className="gradient-card border-border/50 text-center p-6 hover:scale-105 transition-smooth">
            <MessageCircle className="h-8 w-8 text-accent mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Chat en direct</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Posez vos questions via notre chat support
            </p>
            <Button variant="outline" size="sm" className="glass-effect">
              WhatsApp
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
          
          <Card className="gradient-card border-border/50 text-center p-6 hover:scale-105 transition-smooth">
            <Globe className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Audit gratuit</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Recevez une analyse de votre situation actuelle
            </p>
            <Button variant="outline" size="sm" className="glass-effect">
              Demander
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
