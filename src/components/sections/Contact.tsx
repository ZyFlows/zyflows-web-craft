// src/components/sections/Contact.tsx
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRTL } from '@/hooks/useRTL';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';
// supabase import retiré - utilisation directe de fetch avec CORS proxy

const Contact = () => {
  const { t } = useLanguage();
  const { isRTL } = useRTL();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [status, setStatus] = useState({ 
    loading: false, 
    success: false, 
    error: false,
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false, message: '' });

    try {
      // Détection de la langue
      const detectLanguage = () => {
        if (isRTL) return 'he';
        const homeText = t('nav.home');
        if (homeText === 'Accueil') return 'fr';
        if (homeText === 'Home') return 'en';
        return 'fr';
      };

      const language = detectLanguage();

      // Préparation du payload
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim() || '',
        company: formData.company.trim() || '',
        service: formData.service,
        message: formData.message.trim(),
        language: language
      };

      console.log('📤 [Contact Form] Envoi des données:', payload);

      // ✅ PROXY CORS PUBLIC
      const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
      const N8N_WEBHOOK = 'https://n8n.srv945050.hstgr.cloud/webhook/927c2e25-07e0-4aad-8363-b2fcbe8f35d8';
      const url = CORS_PROXY + encodeURIComponent(N8N_WEBHOOK);

      console.log('🌐 [Contact Form] URL utilisée:', url);

      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('📥 [Contact Form] Réponse HTTP:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      // Succès
      console.log('✅ [Contact Form] Message envoyé avec succès !');

      setStatus({ 
        loading: false, 
        success: true, 
        error: false,
        message: t('contact.success') || 'Message envoyé avec succès !'
      });
      
      // Réinitialiser le formulaire
      setFormData({ 
        firstName: '', 
        lastName: '', 
        email: '', 
        phone: '', 
        company: '',
        service: '',
        message: ''
      });

      setTimeout(() => {
        setStatus({ loading: false, success: false, error: false, message: '' });
      }, 7000);

    } catch (error) {
      console.error('❌ [Contact Form] Erreur:', error);
      
      let errorMessage = t('contact.error') || 'Erreur lors de l\'envoi. Veuillez réessayer.';
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = isRTL 
            ? 'שגיאת חיבור לשרת'
            : 'Erreur de connexion au serveur';
        }
      }

      setStatus({ 
        loading: false, 
        success: false, 
        error: true,
        message: errorMessage
      });

      setTimeout(() => {
        setStatus({ loading: false, success: false, error: false, message: '' });
      }, 7000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section 
      id="contact" 
      className="py-20 bg-gradient-to-b from-background/50 to-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulaire */}
            <div 
              className="bg-card rounded-2xl shadow-xl p-8"
              data-aos="fade-right"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Prénom + Nom */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="firstName"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t('contact.firstName')} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      minLength={2}
                      className="w-full px-4 py-3 rounded-lg border border-input 
                               focus:ring-2 focus:ring-ring focus:border-transparent
                               bg-background text-foreground
                               transition-all duration-200"
                      placeholder={t('contact.firstNamePlaceholder')}
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="lastName"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      {t('contact.lastName')} <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      minLength={2}
                      className="w-full px-4 py-3 rounded-lg border border-input 
                               focus:ring-2 focus:ring-ring focus:border-transparent
                               bg-background text-foreground
                               transition-all duration-200"
                      placeholder={t('contact.lastNamePlaceholder')}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label 
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {t('contact.email')} <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-input 
                             focus:ring-2 focus:ring-ring focus:border-transparent
                             bg-background text-foreground
                             transition-all duration-200"
                    placeholder={t('contact.email_placeholder')}
                  />
                </div>

                {/* Téléphone */}
                <div>
                  <label 
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {t('contact.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-input 
                             focus:ring-2 focus:ring-ring focus:border-transparent
                             bg-background text-foreground
                             transition-all duration-200"
                    placeholder={t('contact.phone_placeholder')}
                  />
                </div>

                {/* Société */}
                <div>
                  <label 
                    htmlFor="company"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {t('contact.company')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-input 
                             focus:ring-2 focus:ring-ring focus:border-transparent
                             bg-background text-foreground
                             transition-all duration-200"
                    placeholder={t('contact.company_placeholder')}
                  />
                </div>

                {/* Service */}
                <div>
                  <label 
                    htmlFor="service"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {t('contact.service_label')} <span className="text-destructive">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className="w-full px-4 py-3 rounded-lg border border-input 
                             focus:ring-2 focus:ring-ring focus:border-transparent
                             bg-background text-foreground
                             transition-all duration-200
                             appearance-none bg-no-repeat
                             bg-[length:1.5em_1.5em]
                             [background-position:right_0.5rem_center]
                             rtl:[background-position:left_0.5rem_center]
                             [background-image:url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27rgb(156,163,175)%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')]
                             pr-10 rtl:pl-10 rtl:pr-4"
                  >
                    <option value="">{t('contact.service_placeholder')}</option>
                    <option value="Automatisation">{t('contact.service_automation')}</option>
                    <option value="Chatbot IA">{t('contact.service_chatbot')}</option>
                    <option value="Site Web/SaaS">{t('contact.service_website')}</option>
                    <option value="CRM personnalisé">{t('contact.service_crm')}</option>
                    <option value="Conseil IA">{t('contact.service_consulting')}</option>
                    <option value="Autre">{t('contact.service_other')}</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label 
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    {t('contact.message')} <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-input 
                             focus:ring-2 focus:ring-ring focus:border-transparent
                             bg-background text-foreground
                             transition-all duration-200 resize-none"
                    placeholder={t('contact.message_placeholder')}
                  />
                </div>

                {/* Bouton Submit */}
                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                           text-white font-semibold py-4 px-6 rounded-lg
                           transition-all duration-200 transform hover:scale-[1.02]
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                           flex items-center justify-center gap-2 shadow-lg"
                >
                  {status.loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('contact.send')}
                    </>
                  )}
                </button>

                {/* Messages de statut */}
                {status.success && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 
                                text-green-500 rounded-lg flex items-start gap-3 animate-fade-in">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>{status.message}</p>
                  </div>
                )}

                {status.error && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 
                                text-destructive rounded-lg flex items-start gap-3 animate-fade-in">
                    <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>{status.message}</p>
                  </div>
                )}
              </form>
            </div>

            {/* Informations de contact */}
            <div className="space-y-6" data-aos="fade-left">
              {/* Email */}
              <div className="bg-card rounded-2xl shadow-lg p-6 
                            hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Email
                    </h3>
                    <a 
                      href="mailto:contact@zyflows.com" 
                      className="text-primary hover:underline"
                    >
                      contact@zyflows.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Téléphone */}
              <div className="bg-card rounded-2xl shadow-lg p-6 
                            hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t('contact.phone')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('contact.phoneNumber')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Localisation */}
              <div className="bg-card rounded-2xl shadow-lg p-6 
                            hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t('contact.location')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('contact.locationDetail')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Horaires */}
              <div className="bg-card rounded-2xl shadow-lg p-6 
                            hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t('contact.hours')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('contact.hoursDetail')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
