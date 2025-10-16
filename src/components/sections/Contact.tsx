import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send } from "lucide-react";


const Contact = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Submitting form with data:', { ...formData, language });
      
      // Envoyer directement vers le webhook n8n (sans Supabase)
      const webhookUrl = "https://n8n.srv945050.hstgr.cloud/webhook-test/zyflows-leads";
      const makeData = {
        timestamp: new Date().toISOString(),
        form_type: 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        source: 'zyflows-website',
        language: language,
      };

      console.log('Sending to webhook:', webhookUrl);
      console.log('Data being sent:', makeData);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(makeData),
      });

      console.log('Response status:', response.status, 'type:', response.type);
      if (response.type === 'opaque') {
        console.warn('CORS opaque response: treating as success fallback.');
      } else {
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      }

      if (response.type !== 'opaque' && !response.ok) {
        const errorText = await response.text();
        console.error('Webhook error response:', errorText);
        console.error('Full response:', response);
        
        toast({
          title: t('contact.error_title') || "Erreur d'envoi",
          description: `Erreur ${response.status}: ${errorText || "Problème de connexion au serveur"}`,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      if (response.type !== 'opaque') {
        const responseData = await response.text();
        console.log('Success response:', responseData);
      }

      toast({
        title: t('contact.success_title'),
        description: "Votre message a été envoyé avec succès !",
      });
      
      // Réinitialiser le formulaire
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (error) {
      console.error('Form submission error:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      toast({
        title: t('contact.error_title') || "Erreur",
        description: `Erreur de connexion: ${error.message || "Vérifiez votre connexion internet"}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* En-tête de section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('contact.title')}
          </h2>
        </div>

        {/* Formulaire de contact simplifié */}
        <Card className="gradient-card border-border/50">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Ligne 1: Nom et Téléphone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('contact.phone')} *
                  </label>
                  <Input
                    type="tel"
                    placeholder={t('contact.phone_placeholder') || "הכניסו את הטלפון שלכם"}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('contact.name')} *
                  </label>
                  <Input
                    type="text"
                    placeholder={t('contact.name_placeholder') || "הכניסו את השם שלכם"}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="text-base"
                  />
                </div>
              </div>

              {/* Ligne 2: Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('contact.email')} *
                </label>
                <Input
                  type="email"
                  placeholder={t('contact.email_placeholder') || "הכניסו את האימייל שלכם"}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="text-base"
                />
              </div>

              {/* Ligne 3: Message */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t('contact.message_label') || "הודעה"}
                </label>
                <Textarea
                  placeholder={t('contact.message_placeholder') || "תאר את הצרכים הביטוחיים שלכם..."}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="min-h-[120px]"
                  rows={5}
                />
                <div className="text-xs text-muted-foreground text-right mt-1">
                  {formData.message.length}/1000
                </div>
              </div>

              {/* Bouton submit */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full glow-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {t('contact.submitting') || "שולח..."}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    {t('contact.submit') || "שלח הודעה"}
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
