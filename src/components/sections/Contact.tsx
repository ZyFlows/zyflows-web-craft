import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRTL } from '@/hooks/useRTL';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
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
    error: false 
  });

  // Remplacez cette clé par votre clé reCAPTCHA site key de Google
  const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Clé de test - à remplacer

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier reCAPTCHA
    const recaptchaValue = recaptchaRef.current?.getValue();
    if (!recaptchaValue) {
      setStatus({ loading: false, success: false, error: true });
      return;
    }
    
    setStatus({ loading: true, success: false, error: false });
    
    try {
      await fetch('https://n8n.srv945050.hstgr.cloud/webhook-test/zyflows-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({
          ...formData,
          full_name: `${formData.firstName} ${formData.lastName}`,
          language: isRTL ? 'he' : t('nav.home') === 'Accueil' ? 'fr' : 'en',
          timestamp: new Date().toISOString(),
          source: 'zyflows-contact-form',
          form_type: 'contact_optimized',
          recaptcha_token: recaptchaValue
        })
      });

      // Avec mode: 'no-cors', on ne peut pas vérifier la réponse, donc on considère que c'est réussi
      setStatus({ loading: false, success: true, error: false });
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
      
      // Auto-hide success message after 5s
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: false });
      }, 5000);
    } catch (error) {
      setStatus({ loading: false, success: false, error: true });
      
      // Auto-hide error message after 5s
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: false });
      }, 5000);
    }
  };

  return (
    <div id="contact" className="min-h-screen py-20 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Hero Simple */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 gradient-hero bg-clip-text text-transparent">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          
          {/* Formulaire - 3 cols */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
              
              {/* Nom/Prénom - Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                    {t('contact.firstName')} *
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                    {t('contact.lastName')} *
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    aria-required="true"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('contact.email')} *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="contact@example.com"
                  aria-required="true"
                  dir="ltr"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* Téléphone/Entreprise */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    {t('contact.phone')}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+972584229255"
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    {t('contact.company')}
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder={t('contact.company_placeholder')}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Service souhaité */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-2">
                  {t('contact.service_label')} *
                </label>
                <div className="relative">
                  <select
                    id="service"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    aria-required="true"
                    className={`w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all appearance-none ${isRTL ? 'pr-10 pl-4' : 'pl-4 pr-10'}`}
                  >
                    <option value="">{t('contact.service_placeholder')}</option>
                    <option value="website">{t('contact.service_website')}</option>
                    <option value="automation">{t('contact.service_automation')}</option>
                    <option value="chatbot">{t('contact.service_chatbot')}</option>
                    <option value="consulting">{t('contact.service_consulting')}</option>
                    <option value="other">{t('contact.service_other')}</option>
                  </select>
                  <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none ${isRTL ? 'left-3' : 'right-3'}`}>
                    <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t('contact.message')} *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder={t('contact.message_placeholder')}
                  aria-required="true"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* reCAPTCHA */}
              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  theme="dark"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.loading}
                aria-label={status.loading ? t('contact.sending') : t('contact.submit')}
                className="w-full gradient-hero text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-glow hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status.loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {t('contact.sending')}
                  </span>
                ) : (
                  t('contact.submit')
                )}
              </button>

              {/* Success Message */}
              {status.success && (
                <div role="alert" className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 animate-scale-in">
                  ✓ {t('contact.success')}
                </div>
              )}

              {/* Error Message */}
              {status.error && (
                <div role="alert" className="p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-destructive animate-scale-in">
                  ✗ {t('contact.error')}
                </div>
              )}

            </form>
          </div>

          {/* Info - 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Email */}
            <a 
              href="mailto:contact@zyflows.com" 
              className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className={isRTL ? 'text-right flex-1' : 'text-left flex-1'}>
                <p className="text-sm text-muted-foreground">{t('contact.email_label')}</p>
                <p className="font-semibold">contact@zyflows.com</p>
              </div>
            </a>

            {/* Téléphone */}
            <a 
              href="tel:+972584229255" 
              className="flex items-center gap-4 p-6 bg-card rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div className={isRTL ? 'text-right flex-1' : 'text-left flex-1'}>
                <p className="text-sm text-muted-foreground">{t('contact.phone_label')}</p>
                <p className="font-semibold" dir="ltr">+972 58-422-9255</p>
              </div>
            </a>

            {/* Localisation */}
            <div className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div className={isRTL ? 'text-right flex-1' : 'text-left flex-1'}>
                <p className="text-sm text-muted-foreground mb-2">{t('contact.location_label')}</p>
                <p className="font-semibold">Paris, France</p>
                <p className="font-semibold">Tel Aviv, Israel</p>
              </div>
            </div>

            {/* Horaires */}
            <div className="flex items-start gap-4 p-6 bg-card rounded-xl border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className={isRTL ? 'text-right flex-1' : 'text-left flex-1'}>
                <p className="text-sm text-muted-foreground mb-2">{t('contact.hours_label')}</p>
                <p className="font-semibold">{t('contact.hours')}</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
