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

    // Validation reCAPTCHA
    const recaptchaValue = recaptchaRef.current?.getValue();
    if (!recaptchaValue) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: true,
        message: t('contact.recaptcha_required') || 'Veuillez valider le reCAPTCHA'
      });
      return;
    }

    setStatus({ loading: true, success: false, error: false, message: '' });

    try {
      // Détection de la langue basée sur le contexte
      const detectLanguage = () => {
        if (isRTL) return 'he';
        const homeText = t('nav.home');
        if (homeText === 'Accueil') return 'fr';
        if (homeText === 'Home') return 'en';
        return 'fr'; // Fallback
      };

      const language = detectLanguage();

      // ✅ Payload simplifié - exactement comme attendu par N8N
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
      console.log('🌐 [Contact Form] Langue détectée:', language);

      // ✅ Requête sans 'no-cors' pour permettre l'envoi du body JSON
      const response = await fetch('https://n8n.srv945050.hstgr.cloud/webhook/zyflows-contact', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('📥 [Contact Form] Réponse HTTP:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      // Vérification du statut HTTP
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}: ${response.statusText}`);
      }

      // Tentative de lecture de la réponse JSON
      let result;
      try {
        result = await response.json();
        console.log('✅ [Contact Form] Réponse JSON:', result);
      } catch (jsonError) {
        console.warn('⚠️ [Contact Form] Pas de JSON dans la réponse (normal si workflow OK)');
        result = { success: true };
      }

      // Succès
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

      // Réinitialiser reCAPTCHA
      recaptchaRef.current?.reset();

      // Masquer le message de succès après 7 secondes
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: false, message: '' });
      }, 7000);

    } catch (error) {
      console.error('❌ [Contact Form] Erreur détaillée:', error);
      
      let errorMessage = t('contact.error') || 'Une erreur est survenue. Veuillez réessayer.';
      
      if (error instanceof Error) {
        console.error('❌ [Contact Form] Message d\'erreur:', error.message);
        // En production, ne pas exposer les détails techniques
        if (process.env.NODE_ENV === 'development') {
          errorMessage += ` (${error.message})`;
        }
      }

      setStatus({ 
        loading: false, 
        success: false, 
        error: true,
        message: errorMessage
      });

      // Masquer le message d'erreur après 7 secondes
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
      className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulaire */}
            <div 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
              data-aos="fade-right"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Prénom + Nom */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t('contact.firstName')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      minLength={2}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               dark:bg-gray-700 dark:text-white
                               transition-all duration-200"
                      placeholder={t('contact.firstNamePlaceholder') || 'Jean'}
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      {t('contact.lastName')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      minLength={2}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               dark:bg-gray-700 dark:text-white
                               transition-all duration-200"
                      placeholder={t('contact.lastNamePlaceholder') || 'Dupont'}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label 
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t('contact.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             dark:bg-gray-700 dark:text-white
                             transition-all duration-200"
                    placeholder={t('contact.emailPlaceholder') || 'jean.dupont@example.com'}
                  />
                </div>

                {/* Téléphone */}
                <div>
                  <label 
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t('contact.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             dark:bg-gray-700 dark:text-white
                             transition-all duration-200"
                    placeholder={t('contact.phonePlaceholder') || '+33 6 12 34 56 78'}
                  />
                </div>

                {/* Société */}
                <div>
                  <label 
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t('contact.company')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             dark:bg-gray-700 dark:text-white
                             transition-all duration-200"
                    placeholder={t('contact.companyPlaceholder') || 'Ma Société'}
                  />
                </div>

                {/* Service */}
                <div>
                  <label 
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t('contact.service')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             dark:bg-gray-700 dark:text-white
                             transition-all duration-200"
                  >
                    <option value="">{t('contact.selectService') || 'Sélectionner un service'}</option>
                    <option value="Automatisation">{t('services.automation.title') || 'Automatisation'}</option>
                    <option value="Chatbot IA">{t('services.chatbot.title') || 'Chatbot IA'}</option>
                    <option value="Site Web/SaaS">{t('services.website.title') || 'Site Web/SaaS'}</option>
                    <option value="CRM personnalisé">{t('services.crm.title') || 'CRM personnalisé'}</option>
                    <option value="Conseil IA">{t('services.consulting.title') || 'Conseil IA'}</option>
                    <option value="Autre">{t('contact.other') || 'Autre'}</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label 
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t('contact.message')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             dark:bg-gray-700 dark:text-white
                             transition-all duration-200 resize-none"
                    placeholder={t('contact.messagePlaceholder') || 'Décrivez votre projet...'}
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
                      {t('contact.sending') || 'Envoi en cours...'}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('contact.send') || 'Envoyer le message'}
                    </>
                  )}
                </button>

                {/* Messages de statut */}
                {status.success && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 
                                text-green-800 dark:text-green-200 rounded-lg flex items-start gap-3 animate-fade-in">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>{status.message}</p>
                  </div>
                )}

                {status.error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 
                                text-red-800 dark:text-red-200 rounded-lg flex items-start gap-3 animate-fade-in">
                    <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>{status.message}</p>
                  </div>
                )}
              </form>
            </div>

            {/* Informations de contact */}
            <div className="space-y-6" data-aos="fade-left">
              {/* Email */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 
                            hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Email
                    </h3>
                    <a 
                      href="mailto:contact@zyflows.com" 
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      contact@zyflows.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Téléphone */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 
                            hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {t('contact.phone')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('contact.phoneNumber') || '+972 XX XXX XXXX'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Localisation */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 
                            hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {t('contact.location')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('contact.locationDetail') || 'Israel'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Horaires */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 
                            hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
                    <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {t('contact.hours')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('contact.hoursDetail') || 'Lun - Ven: 9h - 18h'}
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
