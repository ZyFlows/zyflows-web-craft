// src/components/sections/Contact.tsx
import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRTL } from '@/hooks/useRTL';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { z } from 'zod';

const Contact = () => {
  const { t } = useLanguage();
  const { isRTL } = useRTL();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

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

  // Test reCAPTCHA key - remplacer par votre clé réelle en production
  const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

  // Schéma de validation Zod avec messages traduits
  const contactSchema = z.object({
    firstName: z.string()
      .trim()
      .min(2, t('contact.errors.firstNameMin') || "First name must be at least 2 characters")
      .max(50, t('contact.errors.firstNameMax') || "First name must be less than 50 characters"),
    lastName: z.string()
      .trim()
      .min(2, t('contact.errors.lastNameMin') || "Last name must be at least 2 characters")
      .max(50, t('contact.errors.lastNameMax') || "Last name must be less than 50 characters"),
    email: z.string()
      .trim()
      .email(t('contact.errors.emailInvalid') || "Invalid email address")
      .max(255, t('contact.errors.emailMax') || "Email must be less than 255 characters"),
    phone: z.string()
      .trim()
      .regex(/^[+]?[\d\s()-]{0,20}$/, t('contact.errors.phoneInvalid') || "Invalid phone format")
      .optional()
      .or(z.literal('')),
    company: z.string()
      .trim()
      .max(100, t('contact.errors.companyMax') || "Company name must be less than 100 characters")
      .optional(),
    service: z.string()
      .min(1, t('contact.errors.serviceRequired') || "Please select a service"),
    message: z.string()
      .trim()
      .min(10, t('contact.errors.messageMin') || "Message must be at least 10 characters")
      .max(2000, t('contact.errors.messageMax') || "Message must be less than 2000 characters")
  });

  // Fonction de retry avec backoff exponentiel et timeout
  const fetchWithRetry = async (url: string, options: RequestInit, maxRetries = 3) => {
    const TIMEOUT = 10000; // 10 secondes
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);
        
        const response = await fetch(url, {
          ...options,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response;
      } catch (error) {
        const isLastAttempt = i === maxRetries - 1;
        if (isLastAttempt) throw error;
        
        // Backoff exponentiel: 1s, 2s, 4s
        const delay = Math.pow(2, i) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw new Error('Max retries reached');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Empêcher les double-soumissions
    if (status.loading) return;

    // Vérifier reCAPTCHA
    const recaptchaValue = recaptchaRef.current?.getValue();
    if (!recaptchaValue) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: true,
        message: t('contact.errors.recaptchaRequired') || "Please complete the reCAPTCHA verification"
      });
      return;
    }

    // Validation avec Zod
    try {
      contactSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        setStatus({ 
          loading: false, 
          success: false, 
          error: true,
          message: firstError.message
        });
        return;
      }
    }

    setStatus({ loading: true, success: false, error: false, message: '' });

    try {
      // Sanitize data avant envoi
      const sanitizedData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        service: formData.service,
        message: formData.message.trim()
      };

      await fetchWithRetry(
        'https://n8n.srv945050.hstgr.cloud/webhook/927c2e25-07e0-4aad-8363-b2fcbe8f35d8',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sanitizedData)
        },
        3
      );

      setStatus({ 
        loading: false, 
        success: true, 
        error: false,
        message: t('contact.successMessage') || "Message sent successfully! We will respond as soon as possible."
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

      // Réinitialiser reCAPTCHA
      recaptchaRef.current?.reset();

    } catch (error) {
      console.error('Form submission error:', error);
      const errorMessage = error instanceof Error && error.name === 'AbortError'
        ? t('contact.errors.timeout') || "Request timeout. Please check your connection and try again."
        : t('contact.errors.serverError') || "Unable to contact server. Please check your connection and try again.";
      
      setStatus({ 
        loading: false, 
        success: false, 
        error: true,
        message: errorMessage
      });
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

                {/* reCAPTCHA */}
                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={RECAPTCHA_SITE_KEY}
                    theme="light"
                    hl={isRTL ? 'he' : t('nav.home') === 'Accueil' ? 'fr' : 'en'}
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

            {/* Informations de contact - RTL optimized */}
            <div className="space-y-6" data-aos="fade-left" dir={isRTL ? 'rtl' : 'ltr'}>
              {/* Email */}
              <div className="bg-card rounded-2xl shadow-lg p-6 
                            hover:shadow-xl transition-shadow duration-200">
                <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right justify-end' : ''}`}>
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                    <h3 className="font-semibold text-foreground mb-1">
                      Email
                    </h3>
                    <div className="space-y-1" style={{ direction: 'ltr' }}>
                      <a 
                        href="mailto:contact@zyflows.com" 
                        className="text-primary hover:underline block"
                      >
                        contact@zyflows.com
                      </a>
                      <a 
                        href="mailto:contact.zyflows@gmail.com" 
                        className="text-primary hover:underline block"
                      >
                        contact.zyflows@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Téléphone */}
              <div className="bg-card rounded-2xl shadow-lg p-6 
                            hover:shadow-xl transition-shadow duration-200">
                <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right justify-end' : ''}`}>
                  <div className="bg-secondary/10 p-3 rounded-lg flex-shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                    <h3 className="font-semibold text-foreground mb-1">
                      {t('contact.phone')}
                    </h3>
                    {isRTL ? (
                      <div className="text-muted-foreground flex flex-wrap items-center justify-end gap-x-2">
                        <span dir="ltr">+972 58-422-9255</span>
                        <span className="opacity-50">|</span>
                        <span dir="ltr">+33 7 69 03 58 29</span>
                      </div>
                    ) : (
                      <p className="text-muted-foreground" style={{ direction: 'ltr' }}>
                        {t('contact.phoneNumber')}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Localisation */}
              <div className="bg-card rounded-2xl shadow-lg p-6 
                            hover:shadow-xl transition-shadow duration-200">
                <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right justify-end' : ''}`}>
                  <div className="bg-accent/10 p-3 rounded-lg flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
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
                <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse text-right justify-end' : ''}`}>
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
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
