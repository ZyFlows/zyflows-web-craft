import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, Globe, Send, Sparkles, Zap, Users } from "lucide-react";
import { useEffect, useState } from "react";

// Validation schema
const formSchema = z.object({
  full_name: z.string().trim().min(2, "השם חייב להכיל לפחות 2 תווים").max(100),
  email: z.string().trim().email("אימייל לא תקין").max(255),
  phone: z.string().min(1, "טלפון הוא שדה חובה"),
  company: z.string().optional(),
  subject: z.string().min(1, "אנא בחר נושא"),
  budget: z.string().min(1, "אנא בחר תקציב"),
  message: z.string().min(10, "אנא הוסף תיאור של הפרויקט").max(1000),
  consent: z.boolean().refine((val) => val === true, "עליך לאשר כדי להמשיך"),
  honeypot: z.string().max(0),
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      budget: "",
      message: "",
      consent: false,
      honeypot: "",
    },
  });

  const checkRateLimit = (): boolean => {
    const submissions = JSON.parse(localStorage.getItem('form_submissions') || '[]');
    const now = Date.now();
    const recentSubmissions = submissions.filter((time: number) => now - time < 3600000);
    
    if (recentSubmissions.length >= 3) {
      return false;
    }
    
    recentSubmissions.push(now);
    localStorage.setItem('form_submissions', JSON.stringify(recentSubmissions));
    return true;
  };

  const onSubmit = async (data: FormData) => {
    if (data.honeypot) {
      console.warn('Spam detected');
      return;
    }

    if (!checkRateLimit()) {
      toast({
        title: language === 'he' ? 'הגעת למגבלה' : 'Limite atteinte',
        description: language === 'he' ? 'נא להמתין שעה לפני שליחה נוספת' : 'Veuillez attendre une heure avant de soumettre à nouveau',
        variant: "destructive",
      });
      return;
    }

    try {
      const webhookUrl = "https://n8n.srv945050.hstgr.cloud/webhook-test/zyflows-leads";
      const payload = {
        timestamp: new Date().toISOString(),
        form_type: 'contact_premium',
        ...data,
        source: 'zyflows-website',
        language: language,
      };

      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(payload),
      });

      toast({
        title: language === 'he' ? '✅ תודה! נחזור אליך בהקדם' : '✅ Merci ! Nous vous contacterons très vite',
        description: language === 'he' ? 'הפנייה נשלחה בהצלחה' : 'Votre demande a été envoyée avec succès',
      });
      
      form.reset();

    } catch (error) {
      console.error('Form error:', error);
      toast({
        title: language === 'he' ? 'שגיאה' : 'Erreur',
        description: language === 'he' ? 'אנא נסה שוב' : 'Veuillez réessayer',
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-[128px] animate-pulse-glow delay-700" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass-effect border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              {language === 'he' ? 'צור קשר עם הצוות שלנו' : 'Contactez notre équipe'}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            {language === 'he' ? 'בואו ניצור משהו יוצא דופן ביחד' : "Let's build something extraordinary together"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'he' 
              ? 'אנחנו עוזרים לעסקים להתממש, לחדש ולצמוח עם AI ו-no-code'
              : 'Nous aidons les entreprises à automatiser, innover et se développer grâce à l\'IA et au no-code'}
          </p>
        </div>

        {/* Main Content - 2 Columns */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Contact Info */}
          <div className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <Card className="glass-effect border-primary/20 p-8 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(123,76,255,0.2)]">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" dir={language === 'he' ? 'rtl' : 'ltr'}>
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                {language === 'he' ? 'פרטי הקשר שלנו' : 'Nos coordonnées'}
              </h2>
              
              <div className="space-y-5">
                <a 
                  href="mailto:contact@zyflows.com" 
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary/5 transition-all duration-300 group"
                  dir="ltr"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs text-muted-foreground mb-1">Email</div>
                    <div className="font-medium text-foreground">contact@zyflows.com</div>
                  </div>
                </a>

                <a 
                  href="https://wa.me/972584229255" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-accent/5 transition-all duration-300 group"
                  dir="ltr"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs text-muted-foreground mb-1">WhatsApp / Phone</div>
                    <div className="font-medium text-foreground">+972 58-422-9255</div>
                  </div>
                </a>


                <a 
                  href="https://zyflows.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all duration-300 group"
                  dir="ltr"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-xs text-muted-foreground mb-1">Website</div>
                    <div className="font-medium text-foreground">zyflows.com</div>
                  </div>
                </a>
              </div>
            </Card>

            {/* Trust Section */}
            <Card className="glass-effect border-primary/10 p-6">
              <h3 className="text-lg font-semibold mb-4 text-center" dir={language === 'he' ? 'rtl' : 'ltr'}>
                {language === 'he' ? 'למה לבחור ב-Zyflows?' : 'Pourquoi choisir Zyflows?'}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors" dir={language === 'he' ? 'rtl' : 'ltr'}>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium mb-1">
                      {language === 'he' ? 'מהירות תגובה' : 'Réactivité'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'he' ? 'מענה תוך 24 שעות' : 'Réponse en 24h'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors" dir={language === 'he' ? 'rtl' : 'ltr'}>
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium mb-1">
                      {language === 'he' ? 'מומחיות AI' : 'Expertise IA'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'he' ? 'אוטומציות חכמות ואמינות' : 'Automatisations intelligentes'}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors" dir={language === 'he' ? 'rtl' : 'ltr'}>
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium mb-1">
                      {language === 'he' ? 'ליווי אישי' : 'Accompagnement'}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'he' ? 'מהייעוץ ועד המימוש' : 'Du conseil à la livraison'}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Form */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <Card className="glass-effect border-primary/20 p-8 hover:shadow-[0_0_40px_rgba(123,76,255,0.15)] transition-all duration-500">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" dir={language === 'he' ? 'rtl' : 'ltr'}>
                  {/* Honeypot */}
                  <FormField
                    control={form.control}
                    name="honeypot"
                    render={({ field }) => (
                      <input {...field} type="text" className="absolute opacity-0 pointer-events-none" tabIndex={-1} />
                    )}
                  />

                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {language === 'he' ? 'שם מלא *' : 'Nom complet *'}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={language === 'he' ? 'שם מלא' : 'Votre nom'}
                            className="h-12 border-border/50 focus:border-primary bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {language === 'he' ? 'אימייל *' : 'Email *'}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="email@company.com"
                            className="h-12 border-border/50 focus:border-primary bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50"
                            dir="ltr"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {language === 'he' ? 'טלפון *' : 'Téléphone *'}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="+972 50-123-4567"
                            className="h-12 border-border/50 focus:border-primary bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50"
                            dir="ltr"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Company */}
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {language === 'he' ? 'חברה (אופציונלי)' : 'Société (optionnel)'}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={language === 'he' ? 'שם החברה' : 'Nom de la société'}
                            className="h-12 border-border/50 focus:border-primary bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Subject */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {language === 'he' ? 'מה הצורך העיקרי שלך? *' : 'Quel est votre besoin principal? *'}
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-border/50 focus:border-primary bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50">
                              <SelectValue placeholder={language === 'he' ? 'בחר נושא' : 'Sélectionner'} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="glass-effect border-primary/20">
                            <SelectItem value="wordpress">
                              {language === 'he' ? 'אתר WordPress / Framer' : 'Site WordPress / Framer'}
                            </SelectItem>
                            <SelectItem value="automation">
                              {language === 'he' ? 'אוטומציה Make / n8n' : 'Automatisation Make / n8n'}
                            </SelectItem>
                            <SelectItem value="chatbot">
                              {language === 'he' ? 'צ\'אטבוט AI' : 'Chatbot IA'}
                            </SelectItem>
                            <SelectItem value="crm">
                              {language === 'he' ? 'אינטגרציית CRM / Data' : 'Intégration CRM / Data'}
                            </SelectItem>
                            <SelectItem value="consulting">
                              {language === 'he' ? 'ייעוץ וניהול פרויקט' : 'Conseil & gestion de projet'}
                            </SelectItem>
                            <SelectItem value="other">
                              {language === 'he' ? 'אחר' : 'Autre'}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Budget */}
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {language === 'he' ? 'תקציב משוער *' : 'Budget estimé *'}
                        </FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-border/50 focus:border-primary bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50">
                              <SelectValue placeholder={language === 'he' ? 'בחר תקציב' : 'Sélectionner'} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="glass-effect border-primary/20">
                            <SelectItem value="3000-8000">₪ 3,000 – 8,000</SelectItem>
                            <SelectItem value="8000-20000">₪ 8,000 – 20,000</SelectItem>
                            <SelectItem value="20000-50000">₪ 20,000 – 50,000</SelectItem>
                            <SelectItem value="50000+">₪ 50,000 +</SelectItem>
                            <SelectItem value="undefined">
                              {language === 'he' ? 'לא יודע / לקבוע' : 'À définir'}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {language === 'he' ? 'תיאור הפרויקט שלך *' : 'Description de votre projet *'}
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={language === 'he' ? 'ספר לנו על הפרויקט שלך...' : 'Parlez-nous de votre projet...'}
                            className="min-h-[120px] border-border/50 focus:border-primary bg-background/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Consent */}
                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start gap-3 space-y-0">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange}
                            className="mt-1 border-border/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-xs font-normal text-muted-foreground cursor-pointer">
                            {language === 'he' 
                              ? 'אני מסכים(ה) ש-Zyflows יצרו איתי קשר *'
                              : 'J\'accepte que Zyflows me contacte concernant cette demande *'
                            }
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary via-primary-glow to-accent hover:shadow-[0_0_30px_rgba(123,76,255,0.5)] transition-all duration-500 hover:scale-[1.02] group"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {language === 'he' ? 'שולח...' : 'Envoi en cours...'}
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span>{language === 'he' ? 'שלח את הפנייה שלי' : 'Envoyer ma demande'}</span>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
