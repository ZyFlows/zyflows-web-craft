import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Send } from "lucide-react";

// Validation schema
const formSchema = z.object({
  full_name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caractères").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().min(1, "Le téléphone est obligatoire"),
  company: z.string().optional(),
  ai_need: z.string().min(1, "Veuillez sélectionner un enjeu"),
  budget: z.string().min(1, "Veuillez sélectionner un budget"),
  start_timing: z.string().min(1, "Veuillez sélectionner un délai"),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères").max(1000),
  consent: z.boolean().refine((val) => val === true, "Vous devez accepter d'être contacté"),
  honeypot: z.string().max(0), // Anti-spam honeypot
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      company: "",
      ai_need: "",
      budget: "",
      start_timing: "",
      message: "",
      consent: false,
      honeypot: "",
    },
  });

  // Rate limiting check
  const checkRateLimit = (): boolean => {
    const submissions = JSON.parse(localStorage.getItem('form_submissions') || '[]');
    const now = Date.now();
    const recentSubmissions = submissions.filter((time: number) => now - time < 3600000); // 1 hour
    
    if (recentSubmissions.length >= 3) {
      return false;
    }
    
    recentSubmissions.push(now);
    localStorage.setItem('form_submissions', JSON.stringify(recentSubmissions));
    return true;
  };

  const onSubmit = async (data: FormData) => {
    // Anti-spam honeypot check
    if (data.honeypot) {
      console.warn('Spam detected via honeypot');
      return;
    }

    // Rate limiting
    if (!checkRateLimit()) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint la limite de 3 soumissions par heure. Veuillez réessayer plus tard.",
        variant: "destructive",
      });
      return;
    }

    try {
      const webhookUrl = "https://n8n.srv945050.hstgr.cloud/webhook-test/zyflows-leads";
      const payload = {
        timestamp: new Date().toISOString(),
        form_type: 'contact_intelligent',
        full_name: data.full_name,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        ai_need: data.ai_need,
        budget: data.budget,
        start_timing: data.start_timing,
        message: data.message,
        consent: data.consent,
        source: 'zyflows-website',
        language: language,
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(payload),
      });

      toast({
        title: language === 'he' ? 'הטופס נשלח בהצלחה' : 'Message envoyé',
        description: language === 'he' ? 'נחזור אליך בהקדם' : 'Nous vous contacterons rapidement.',
      });
      
      form.reset();

    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden" dir={language === 'he' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {language === 'he' ? 'צור קשר' : 'Contact'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'he' ? 'נשמח לשמוע עליך ולעזור בפרויקט שלך' : 'Parlons de votre projet IA'}
          </p>
        </div>

        <Card className="gradient-card border-border/50">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir={language === 'he' ? 'rtl' : 'ltr'}>
                {/* Honeypot anti-spam (hidden) */}
                <FormField
                  control={form.control}
                  name="honeypot"
                  render={({ field }) => (
                    <input {...field} type="text" className="absolute opacity-0 pointer-events-none" tabIndex={-1} autoComplete="off" />
                  )}
                />

                {/* Nom complet */}
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'he' ? 'שם מלא' : 'Nom complet'} *</FormLabel>
                      <FormControl>
                        <Input placeholder={language === 'he' ? 'השם שלך' : 'Votre nom'} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email et Téléphone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@exemple.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'he' ? 'טלפון' : 'Téléphone'} *</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+972..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Entreprise */}
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'he' ? 'חברה' : 'Entreprise'}</FormLabel>
                      <FormControl>
                        <Input placeholder={language === 'he' ? 'שם החברה' : 'Nom de votre entreprise'} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Enjeu IA */}
                <FormField
                  control={form.control}
                  name="ai_need"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'he' ? 'מה האתגר שלך?' : 'Quel est votre enjeu IA / digitalisation ?'} *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={language === 'he' ? 'בחר אפשרות' : 'Sélectionnez'} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="chatbot">
                            {language === 'he' ? 'צ\'אטבוט AI (אתר/WhatsApp)' : 'Chatbot IA (site/WhatsApp)'}
                          </SelectItem>
                          <SelectItem value="automation">
                            {language === 'he' ? 'אוטומציות (Make / n8n / Zapier)' : 'Automatisations (Make / n8n / Zapier)'}
                          </SelectItem>
                          <SelectItem value="crm">
                            {language === 'he' ? 'אינטגרציית CRM / נתונים' : 'Intégration CRM / Data'}
                          </SelectItem>
                          <SelectItem value="content">
                            {language === 'he' ? 'יצירת תוכן AI' : 'Génération de contenu IA'}
                          </SelectItem>
                          <SelectItem value="process">
                            {language === 'he' ? 'אופטימיזציית תהליכים / RPA קל' : 'Optimisation process / RPA léger'}
                          </SelectItem>
                          <SelectItem value="other">
                            {language === 'he' ? 'אחר (פרט בהודעה)' : 'Autre (préciser dans le message)'}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Budget et Délai */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'he' ? 'תקציב משוער' : 'Budget estimé'} *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={language === 'he' ? 'בחר' : 'Sélectionnez'} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="< 3000">{"< 3 000 ₪"}</SelectItem>
                            <SelectItem value="3000-8000">3 000–8 000 ₪</SelectItem>
                            <SelectItem value="8000-20000">8 000–20 000 ₪</SelectItem>
                            <SelectItem value="20000-50000">20 000–50 000 ₪</SelectItem>
                            <SelectItem value="> 50000">{"> 50 000 ₪"}</SelectItem>
                            <SelectItem value="unknown">{language === 'he' ? 'לא יודע / לקבוע' : 'Je ne sais pas / À définir'}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="start_timing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{language === 'he' ? 'מתי להתחיל?' : 'Quand démarrer ?'} *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={language === 'he' ? 'בחר' : 'Sélectionnez'} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="immediate">{language === 'he' ? 'מיידי (0-2 שבועות)' : 'Immédiat (0–2 semaines)'}</SelectItem>
                            <SelectItem value="month">{language === 'he' ? 'החודש (עד 30 יום)' : 'Ce mois-ci (≤ 30 jours)'}</SelectItem>
                            <SelectItem value="1-3months">{language === 'he' ? '1-3 חודשים' : '1–3 mois'}</SelectItem>
                            <SelectItem value=">3months">{language === 'he' ? 'יותר מ-3 חודשים / לקבוע' : '> 3 mois / à confirmer'}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{language === 'he' ? 'הודעה' : 'Message'} *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder={language === 'he' ? 'תאר בקצרה את הצורך שלך' : 'Décrivez brièvement votre besoin'} 
                          className="min-h-[120px]" 
                          dir={language === 'he' ? 'rtl' : 'ltr'}
                          {...field} 
                        />
                      </FormControl>
                      <div className={language === 'he' ? 'text-xs text-muted-foreground text-left' : 'text-xs text-muted-foreground text-right'}>
                        {field.value.length}/1000
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Consentement RGPD */}
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className={language === 'he' ? 'flex flex-row-reverse items-start gap-2' : 'flex flex-row items-start gap-2'}>
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                          className="mt-0.5 h-3.5 w-3.5"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none flex-1">
                        <FormLabel className={language === 'he' ? 'text-xs font-normal text-right block' : 'text-xs font-normal text-left block'}>
                          {language === 'he' 
                            ? 'אני מסכים(ה) ש-Zyflows יצרו איתי קשר בנוגע לפניה זו *' 
                            : "J'accepte que Zyflows me contacte à propos de ma demande *"}
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Submit button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full glow-primary"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {language === 'he' ? 'שולח...' : 'Envoi...'}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      {language === 'he' ? 'שלח' : 'Envoyer'}
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
