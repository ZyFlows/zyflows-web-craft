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
  first_name: z.string().trim().min(2, "השם חייב להכיל לפחות 2 תווים").max(50),
  last_name: z.string().trim().min(2, "שם המשפחה חייב להכיל לפחות 2 תווים").max(50),
  email: z.string().trim().email("אימייל לא תקין").max(255),
  phone: z.string().min(1, "טלפון הוא שדה חובה"),
  company: z.string().optional(),
  ai_need: z.string().min(1, "אנא בחר אתגר"),
  budget: z.string().min(1, "אנא בחר תקציב"),
  start_timing: z.string().min(1, "אנא בחר מועד התחלה"),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, "עליך לאשר כדי להמשיך"),
  honeypot: z.string().max(0),
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
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
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        company: data.company || '',
        ai_need: data.ai_need,
        budget: data.budget,
        start_timing: data.start_timing,
        message: data.message || '',
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
        title: 'הטופס נשלח בהצלחה',
        description: 'נחזור אליך בהקדם',
      });
      
      form.reset();

    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה. אנא נסה שוב.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden" dir="rtl" lang="he">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            צור קשר
          </h2>
          <p className="text-muted-foreground">
            נשמח לשמוע עליך ולעזור בפרויקט שלך
          </p>
        </div>

        <Card className="gradient-card border-border/50">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir="rtl">
                {/* Honeypot anti-spam (hidden) */}
                <FormField
                  control={form.control}
                  name="honeypot"
                  render={({ field }) => (
                    <input {...field} type="text" className="absolute opacity-0 pointer-events-none" tabIndex={-1} autoComplete="off" />
                  )}
                />

                {/* Prénom et Nom sur la même ligne - RTL order */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>שם משפחה *</FormLabel>
                        <FormControl>
                          <Input placeholder="שם משפחה" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>שם פרטי *</FormLabel>
                        <FormControl>
                          <Input placeholder="שם פרטי" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>אימייל עבודה *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="example@company.co.il" {...field} dir="ltr" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Téléphone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>מספר טלפון *</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="050-123-4567" {...field} dir="ltr" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Entreprise */}
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>חברה</FormLabel>
                      <FormControl>
                        <Input placeholder="שם החברה" {...field} />
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
                      <FormLabel>מה האתגר שלך ? *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger dir="rtl" className="rtl:flex-row-reverse rtl:[&>span]:text-right">
                            <SelectValue placeholder="בחר אפשרות" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent dir="rtl">
                          <SelectItem value="chatbot">צ'אטבוט AI (אתר/WhatsApp)</SelectItem>
                          <SelectItem value="automation">אוטומציות (Make / n8n / Zapier)</SelectItem>
                          <SelectItem value="crm">אינטגרציית CRM / נתונים</SelectItem>
                          <SelectItem value="content">יצירת תוכן AI</SelectItem>
                          <SelectItem value="process">אופטימיזציית תהליכים / RPA קל</SelectItem>
                          <SelectItem value="other">אחר (פרט בהודעה)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Budget et Délai - RTL order: start_timing right, budget left */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="start_timing"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>מתי להתחיל ? *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger dir="rtl" className="rtl:flex-row-reverse rtl:[&>span]:text-right">
                              <SelectValue placeholder="בחר מועד" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent dir="rtl">
                            <SelectItem value="immediate">מיידי (0-2 שבועות)</SelectItem>
                            <SelectItem value="month">החודש (עד 30 יום)</SelectItem>
                            <SelectItem value="1-3months">1-3 חודשים</SelectItem>
                            <SelectItem value=">3months">יותר מ-3 חודשים / לקבוע</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>תקציב משוער *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger dir="rtl" className="rtl:flex-row-reverse rtl:[&>span]:text-right">
                              <SelectValue placeholder="בחר תקציב" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent dir="rtl">
                            <SelectItem value="< 3000">{"< 3,000 ₪"}</SelectItem>
                            <SelectItem value="3000-8000">3,000–8,000 ₪</SelectItem>
                            <SelectItem value="8000-20000">8,000–20,000 ₪</SelectItem>
                            <SelectItem value="20000-50000">20,000–50,000 ₪</SelectItem>
                            <SelectItem value="> 50000">{"> 50,000 ₪"}</SelectItem>
                            <SelectItem value="unknown">לא יודע / לקבוע</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Message (optionnel) */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>משהו נוסף ? (אופציונלי)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="ספר לנו יותר על הפרויקט שלך..." 
                          className="min-h-[120px]" 
                          dir="rtl"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Consentement RGPD */}
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row-reverse items-start gap-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                          className="mt-0.5 h-3.5 w-3.5"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none flex-1">
                        <FormLabel className="text-xs font-normal text-right block">
                          אני מסכים(ה) ש-Zyflows יצרו איתי קשר בנוגע לפניה זו *
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
                      שולח...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      שלח
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
