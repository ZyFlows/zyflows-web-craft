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
  const {
    t
  } = useLanguage();
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
  const {
    toast
  } = useToast();
  const services = [t('contact.service1'), t('contact.service2'), t('contact.service3'), t('contact.service4'), t('contact.service5'), t('contact.service6'), t('contact.service7'), t('contact.service8')];
  const budgetRanges = [t('contact.budget1'), t('contact.budget2'), t('contact.budget3'), t('contact.budget4'), t('contact.budget5'), t('contact.budget6')];
  const timelines = [t('contact.timeline1'), t('contact.timeline2'), t('contact.timeline3'), t('contact.timeline4'), t('contact.timeline5')];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi
    setTimeout(() => {
      toast({
        title: t('contact.success_title'),
        description: t('contact.success_desc')
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
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return <section id="contact" className="py-20 relative overflow-hidden">
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
              {[t('contact.benefit1'), t('contact.benefit2'), t('contact.benefit3'), t('contact.benefit4')].map((benefit, index) => <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>)}
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl">{t('contact.form_title')}</CardTitle>
                <CardDescription className="text-right">
                  {t('contact.form_subtitle')}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Informations personnelles */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t('contact.name')} *
                      </label>
                      <Input value={formData.name} onChange={e => handleInputChange("name", e.target.value)} placeholder={t('contact.name_placeholder')} required className="glass-effect border-border/50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t('contact.email')} *
                      </label>
                      <Input type="email" value={formData.email} onChange={e => handleInputChange("email", e.target.value)} placeholder={t('contact.email_placeholder')} required className="glass-effect border-border/50" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t('contact.company')}
                      </label>
                      <Input value={formData.company} onChange={e => handleInputChange("company", e.target.value)} placeholder={t('contact.company_placeholder')} className="glass-effect border-border/50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t('contact.phone')}
                      </label>
                      <Input value={formData.phone} onChange={e => handleInputChange("phone", e.target.value)} placeholder={t('contact.phone_placeholder')} className="glass-effect border-border/50" />
                    </div>
                  </div>

                  {/* Détails du projet */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t('contact.service')} *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {services.map(service => <Badge key={service} variant={formData.service === service ? "default" : "outline"} className="cursor-pointer justify-center py-2 transition-smooth hover:scale-105" onClick={() => handleInputChange("service", service)}>
                          {service}
                        </Badge>)}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t('contact.budget')}
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {budgetRanges.map(budget => <Badge key={budget} variant={formData.budget === budget ? "default" : "outline"} className="cursor-pointer justify-center py-2 transition-smooth hover:scale-105" onClick={() => handleInputChange("budget", budget)}>
                            {budget}
                          </Badge>)}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        {t('contact.timeline')}
                      </label>
                      <div className="grid grid-cols-1 gap-2">
                        {timelines.map(timeline => <Badge key={timeline} variant={formData.timeline === timeline ? "default" : "outline"} className="cursor-pointer justify-center py-2 transition-smooth hover:scale-105" onClick={() => handleInputChange("timeline", timeline)}>
                            {timeline}
                          </Badge>)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t('contact.message')} *
                    </label>
                    <Textarea value={formData.message} onChange={e => handleInputChange("message", e.target.value)} placeholder={t('contact.message_placeholder')} className="min-h-32 glass-effect border-border/50" required />
                  </div>

                  {/* Bouton d'envoi */}
                  <Button type="submit" size="lg" className="w-full glow-primary group" disabled={isSubmitting}>
                    {isSubmitting ? <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2" />
                        {t('contact.submitting')}
                      </> : <>
                        {t('contact.submit')}
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>}
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    {t('contact.disclaimer')}
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
            <h3 className="font-semibold mb-2">{t('contact.alt1_title')}</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('contact.alt1_desc')}
            </p>
            <Button variant="outline" size="sm" className="glass-effect">
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
            <Button variant="outline" size="sm" className="glass-effect">
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
            <Button variant="outline" size="sm" className="glass-effect">
              {t('contact.alt3_button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </div>
      </div>
    </section>;
};

export default Contact;
