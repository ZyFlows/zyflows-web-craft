
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send, Phone, Mail, MapPin, Calendar, Clock, Globe, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";

const Contact = () => {
  const { t } = useLanguage();
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
    t('contact.service1'),
    t('contact.service2'),
    t('contact.service3'),
    t('contact.service4'),
    t('contact.service5'),
    t('contact.service6'),
    t('contact.service7'),
    t('contact.service8')
  ];

  const budgetRanges = [
    t('contact.budget1'),
    t('contact.budget2'),
    t('contact.budget3'),
    t('contact.budget4'),
    t('contact.budget5'),
    t('contact.budget6')
  ];

  const timelines = [
    t('contact.timeline1'),
    t('contact.timeline2'),
    t('contact.timeline3'),
    t('contact.timeline4'),
    t('contact.timeline5')
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi
    setTimeout(() => {
      toast({
        title: t('contact.success_title'),
        description: t('contact.success_desc'),
      });
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
    
    setIsSubmitting(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleScheduleCall = () => {
    console.log("Scheduling call...");
    toast({
      title: "Planification d'appel",
      description: "Ouverture du calendrier de réservation...",
    });
    // Simulation d'ouverture d'un calendrier externe
    window.open("https://calendly.com", "_blank");
  };

  const handleWhatsAppChat = () => {
    console.log("Opening WhatsApp...");
    const phoneNumber = "972584229255";
    const message = encodeURIComponent("Bonjour, je souhaite discuter d'un projet web avec vous.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    toast({
      title: "WhatsApp",
      description: "Ouverture de WhatsApp...",
    });
  };

  const handlePortfolioView = () => {
    console.log("Viewing portfolio...");
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    toast({
      title: "Portfolio",
      description: "Navigation vers nos projets...",
    });
  };

  const handleEmailProject = () => {
    const subject = encodeURIComponent("Demande de projet - zyFlows");
    const body = encodeURIComponent(`Bonjour,

J'aimerais discuter d'un projet avec votre équipe. Voici les détails :

**Informations sur le projet :**
- Nom : [Votre nom]
- Entreprise : [Nom de votre entreprise]
- Email : [Votre email]
- Téléphone : [Votre numéro]

**Type de service souhaité :**
[ ] Site Web (Wix/WordPress/Shopify/Framer)
[ ] Application personnalisée
[ ] Automatisation (Make/Zapier/N8N)
[ ] Génération de leads (Google Maps)
[ ] IA & GPT personnalisés
[ ] Audit & conseil
[ ] Support & maintenance
[ ] Autre : [Précisez]

**Budget estimé :**
[ ] < 5K$
[ ] 5K$ - 15K$
[ ] 15K$ - 50K$
[ ] 50K$ - 100K$
[ ] > 100K$
[ ] À discuter

**Délai souhaité :**
[ ] Urgent (< 1 mois)
[ ] Rapide (1-3 mois)
[ ] Standard (3-6 mois)
[ ] Flexible (> 6 mois)
[ ] À planifier

**Description du projet :**
[Décrivez votre projet, vos objectifs et vos attentes]

Merci pour votre temps !

Cordialement,
[Votre nom]`);
    
    const mailtoUrl = `mailto:zyflow.web@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_self');
    
    toast({
      title: "Email",
      description: "Ouverture de votre client email...",
    });
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
            <span className="text-sm font-medium">{t('contact.badge')}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('contact.title')}
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Informations de contact */}
          <div className="lg:col-span-1">
            <Card className="gradient-card border-border/50 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  {t('contact.phone_title')}
                </CardTitle>
                <CardDescription>
                  {t('contact.phone_desc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium text-center">Mail</div>
                    <div className="text-sm text-muted-foreground">zyflow.web@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium text-center">{t('contact.phone')}</div>
                    <div className="text-sm text-muted-foreground" dir="ltr">+972 58-422-9255</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium">Tel Aviv, Israël</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-medium">{t('contact.availability')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Avantages */}
            <div className="space-y-4">
              {[
                t('contact.benefit1'),
                t('contact.benefit2'),
                t('contact.benefit3'),
                t('contact.benefit4')
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
                <CardTitle className="text-2xl">Envoyer un email</CardTitle>
                <CardDescription className="text-right">
                  Contactez-nous directement par email avec un template pré-rempli pour votre projet.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center py-12">
                <Mail className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-xl font-semibold mb-4">
                  Prêt à démarrer votre projet ?
                </h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Cliquez sur le bouton ci-dessous pour ouvrir votre client email avec un template pré-rempli contenant toutes les informations nécessaires pour votre projet.
                </p>
                <Button 
                  size="lg" 
                  className="glow-primary"
                  onClick={handleEmailProject}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Envoyer un email
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Email : zyflow.web@gmail.com
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA alternatifs */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="gradient-card border-border/50 text-center p-6 hover:scale-105 transition-smooth">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">{t('contact.alt1_title')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('contact.alt1_desc')}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="glass-effect"
              onClick={handleScheduleCall}
            >
              {t('contact.alt1_button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
          
          <Card className="gradient-card border-border/50 text-center p-6 hover:scale-105 transition-smooth">
            <MessageCircle className="h-8 w-8 text-accent mx-auto mb-4" />
            <h3 className="font-semibold mb-2">{t('contact.alt2_title')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('contact.alt2_desc')}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="glass-effect"
              onClick={handleWhatsAppChat}
            >
              {t('contact.alt2_button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
          
          <Card className="gradient-card border-border/50 text-center p-6 hover:scale-105 transition-smooth">
            <Globe className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">{t('contact.alt3_title')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('contact.alt3_desc')}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="glass-effect"
              onClick={handlePortfolioView}
            >
              {t('contact.alt3_button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
