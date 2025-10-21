import { Helmet } from "react-helmet-async";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { toast } from "sonner";
import { 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Globe
} from "lucide-react";

const Contact = () => {
  const { t, language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const webhookUrl = "https://hook.eu2.make.com/12wrnz4dsbr1uwk4vgr5cqt6krlkjlly";
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language: language,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        toast.success(t('contact.success'));
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(t('contact.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.info.email.title'),
      value: "contact@zyflows.com",
      link: "mailto:contact@zyflows.com"
    },
    {
      icon: Phone,
      title: t('contact.info.phone.title'),
      value: "+972 58-422-9255",
      link: "tel:+972584229255"
    },
    {
      icon: MapPin,
      title: t('contact.info.location.title'),
      value: t('contact.info.location.value'),
      link: null
    },
    {
      icon: Clock,
      title: t('contact.info.hours.title'),
      value: t('contact.info.hours.value'),
      link: null
    }
  ];

  const handleWhatsAppClick = () => {
    const phoneNumber = "+972584229255";
    const message = t('whatsapp.message');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('meta.contact.title')}</title>
        <meta name="description" content={t('meta.contact.description')} />
        <link rel="canonical" href="https://zyflows.lovable.app/contact" />
      </Helmet>

      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-4 text-sm px-4 py-2">{t('contact.badge')}</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {t('contact.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('contact.hero.subtitle')}
            </p>
          </div>

          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              {t('contact.intro.paragraph1')}
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t('contact.intro.paragraph2')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">{t('contact.form.title')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    {t('contact.form.name')} *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.name_placeholder')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.email_placeholder')}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    {t('contact.form.phone')}
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.phone_placeholder')}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    {t('contact.form.subject')} *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.subject_placeholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('contact.form.message_placeholder')}
                    rows={6}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full glow-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    t('contact.form.sending')
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t('contact.form.submit')}
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">{t('contact.info.title')}</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10">
                <MessageSquare className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{t('contact.whatsapp.title')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('contact.whatsapp.description')}
                </p>
                <Button 
                  onClick={handleWhatsAppClick}
                  className="w-full"
                  variant="default"
                >
                  {t('contact.whatsapp.button')}
                </Button>
              </Card>

              <Card className="p-8">
                <Globe className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{t('contact.languages.title')}</h3>
                <p className="text-muted-foreground">
                  {t('contact.languages.description')}
                </p>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {t('contact.faq.title')}
            </h2>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((num) => (
                <Card key={num} className="p-6">
                  <h3 className="font-bold text-lg mb-2">
                    {t(`contact.faq.question${num}`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`contact.faq.answer${num}`)}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
