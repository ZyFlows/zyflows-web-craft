
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send, Phone, Mail, MapPin, Calendar, Clock, Globe, MessageCircle, ArrowRight, CheckCircle, Settings } from "lucide-react";
import { generateEmailTemplate, openEmailClient } from "@/utils/emailTemplates";
import { emailTranslations } from '@/contexts/emailTranslations';
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    countryCode: "+1",
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

    try {
      console.log('Submitting form with data:', { ...formData, language });
      
      // Envoyer vers la fonction edge Supabase
      const { data, error } = await supabase.functions.invoke('send-to-make', {
        body: {
          ...formData,
          phone: formData.countryCode + ' ' + formData.phone,
          language: language
        }
      });

      console.log('Supabase function response:', { data, error });

      if (error) {
        console.error('Supabase function error details:', error);
        toast({
          title: "Erreur d'envoi",
          description: `Impossible d'envoyer le formulaire: ${error.message || 'Erreur inconnue'}`,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      if (data?.success) {
        toast({
          title: t('contact.success_title'),
          description: "Votre message a été envoyé avec succès !",
        });
        
        // Réinitialiser le formulaire
        setFormData({
          name: "",
          email: "",
          company: "",
          countryCode: "+1",
          phone: "",
          service: "",
          project: "",
          budget: "",
          message: "",
          timeline: ""
        });
      } else {
        toast({
          title: "Erreur d'envoi",
          description: data?.error || "Erreur lors de l'envoi du formulaire",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'phone') {
      // Limiter à 10 chiffres et formater automatiquement
      const cleanValue = value.replace(/\D/g, '').substring(0, 10);
      const formattedValue = formatPhoneNumber(cleanValue);
      setFormData(prev => ({ ...prev, [field]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)} ${phoneNumber.slice(3, 6)} ${phoneNumber.slice(6, 10)}`;
  };

  const getPhonePlaceholder = (countryCode: string) => {
    const placeholders: { [key: string]: string } = {
      '+1': '123 456 7890',
      '+33': '06 12 34 56 78',
      '+972': '050 123 4567',
      '+44': '020 1234 5678',
      '+49': '030 12345678',
      '+34': '612 34 56 78',
      '+39': '320 123 4567',
      '+86': '138 0013 8000',
      '+81': '090 1234 5678',
      '+91': '098765 43210',
      '+55': '11 99999 9999',
      '+7': '495 123 4567',
      '+61': '0412 345 678',
      '+27': '082 123 4567'
    };
    return placeholders[countryCode] || '123 456 7890';
  };

  const countries = [
    { code: '+1', country: 'us', name: 'États-Unis' },
    { code: '+33', country: 'fr', name: 'France' },
    { code: '+972', country: 'il', name: 'Israël' },
    { code: '+44', country: 'gb', name: 'Royaume-Uni' },
    { code: '+49', country: 'de', name: 'Allemagne' },
    { code: '+34', country: 'es', name: 'Espagne' },
    { code: '+39', country: 'it', name: 'Italie' },
    { code: '+86', country: 'cn', name: 'Chine' },
    { code: '+81', country: 'jp', name: 'Japon' },
    { code: '+91', country: 'in', name: 'Inde' },
    { code: '+55', country: 'br', name: 'Brésil' },
    { code: '+7', country: 'ru', name: 'Russie' },
    { code: '+61', country: 'au', name: 'Australie' },
    { code: '+27', country: 'za', name: 'Afrique du Sud' }
  ];

  const getSelectedCountry = () => {
    return countries.find(c => c.code === formData.countryCode) || countries[0];
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
    const { subject, body } = generateEmailTemplate({ 
      language, 
      t, 
      type: 'contact' 
    });
    
    openEmailClient(subject, body);
    
    const eT = (key: string) => emailTranslations[language]?.[key] || t(key) || key;
    toast({
      title: eT('email.send_email'),
      description: eT('email.click_below'),
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
                    <div className="text-sm text-muted-foreground">contact.zyflows@gmail.com</div>
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
                <div>
                  <CardTitle className="text-2xl">{t('contact.form_title')}</CardTitle>
                  <CardDescription>
                    {t('contact.form_subtitle')}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('contact.name')} *
                      </label>
                      <Input
                        type="text"
                        placeholder={t('contact.name_placeholder')}
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('contact.email')} *
                      </label>
                      <Input
                        type="email"
                        placeholder={t('contact.email_placeholder')}
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('contact.company')}
                      </label>
                      <Input
                        type="text"
                        placeholder={t('contact.company_placeholder')}
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                      />
                    </div>
                     <div>
                       <label className="block text-sm font-medium mb-2">
                         {t('contact.phone')}
                       </label>
                        <div className="flex gap-2">
                          <div className="relative">
                            <select 
                              className="appearance-none px-3 py-3 pr-8 border rounded-md bg-background text-foreground min-w-[140px] z-10 relative border-input focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                              value={formData.countryCode}
                              onChange={(e) => handleInputChange('countryCode', e.target.value)}
                              style={{ 
                                backgroundImage: `url(https://flagcdn.com/24x18/${getSelectedCountry().country}.png)`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: '8px center',
                                paddingLeft: '40px'
                              }}
                            >
                              {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                  {country.name} ({country.code})
                                </option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                          <Input
                            type="tel"
                            placeholder={getPhonePlaceholder(formData.countryCode)}
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="flex-1"
                            maxLength={12}
                          />
                        </div>
                     </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('contact.service')}
                    </label>
                    <select 
                      className="w-full p-3 border rounded-md bg-background text-foreground"
                      value={formData.service}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                    >
                      <option value="">{t('contact.service_placeholder')}</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service.replace(/[()]/g, '')}
                        </option>
                      ))}
                    </select>
                  </div>


                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('contact.message')} *
                    </label>
                    <Textarea
                      placeholder={t('contact.message_placeholder')}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full glow-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {t('contact.submitting')}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        {t('contact.submit')}
                      </div>
                    )}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    {t('contact.disclaimer')}
                  </p>
                </form>

                {/* Email alternatif */}
                <div className="mt-8 pt-8 border-t border-border/50">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      {language === 'he' ? 'או לשלוח לנו מייל ישירות:' : emailTranslations[language]?.['email.or_send_email'] || 'Ou envoyez-nous un email directement :'}
                    </p>
                    <Button 
                      variant="outline"
                      onClick={handleEmailProject}
                    >
                      <Mail className={`${language === 'he' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                      {emailTranslations[language]?.['email.send_email'] || 'Envoyer un email'}
                    </Button>
                  </div>
                </div>
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
