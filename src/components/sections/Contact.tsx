// src/components/sections/Contact.tsx
import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRTL } from '@/hooks/useRTL';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation minimale
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: true,
        message: "Veuillez remplir tous les champs obligatoires"
      });
      return;
    }

    // Formatage du message WhatsApp
    const whatsappMessage = `
🔷 *Nouveau message de contact*

👤 *Nom:* ${formData.firstName} ${formData.lastName}
📧 *Email:* ${formData.email}
${formData.phone ? `📱 *Téléphone:* ${formData.phone}\n` : ''}${formData.company ? `🏢 *Entreprise:* ${formData.company}\n` : ''}${formData.service ? `🎯 *Service:* ${formData.service}\n` : ''}
💬 *Message:*
${formData.message}
    `.trim();

    // Numéro WhatsApp
    const phoneNumber = "+972584229255";
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Ouvrir WhatsApp
    window.open(whatsappUrl, '_blank');

    // Message de succès
    setStatus({ 
      loading: false, 
      success: true, 
      error: false,
      message: "Redirection vers WhatsApp..."
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
