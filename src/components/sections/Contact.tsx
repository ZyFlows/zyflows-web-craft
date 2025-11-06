import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRTL } from '@/hooks/useRTL';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

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
    error: false 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus({ loading: true, success: false, error: false });

    try {
      // Détection de la langue
      const language = isRTL ? 'he' : t('nav.home') === 'Accueil' ? 'fr' : 'en';

      // ✅ Données exactement comme attendues par N8N
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || '',
        company: formData.company || '',
        service: formData.service,
        message: formData.message,
        language: language
      };

      console.log('📤 Envoi des données:', payload);

      // ✅ Requête sans 'no-cors'
      const response = await fetch('https://n8n.srv945050.hstgr.cloud/webhook/zyflows-contact', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      console.log('📥 Réponse HTTP:', response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Succès:', result);

      // Succès
      setStatus({ loading: false, success: true, error: false });
      
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

      // Masquer le message de succès après 5 secondes
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: false });
      }, 5000);

    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi:', error);
      setStatus({ loading: false, success: false, error: true });

      // Masquer le message d'erreur après 5 secondes
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: false });
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Formulaire */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.firstName')} *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.lastName')} *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.company')}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.service')} *
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">{t('contact.selectService')}</option>
                    <option value="Automatisation">Automatisation</option>
                    <option value="Chatbot IA">Chatbot IA</option>
                    <option value="Site Web/SaaS">Site Web/SaaS</option>
                    <option value="CRM personnalisé">CRM personnalisé</option>
                    <option value="Conseil IA">Conseil IA</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.loading ? t('contact.sending') : t('contact.send')}
                </button>

                {status.success && (
                  <div className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg">
                    ✅ {t('contact.success')}
                  </div>
                )}

                {status.error && (
                  <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-lg">
                    ❌ {t('contact.error')}
                  </div>
                )}
              </form>
            </div>

            {/* Informations de contact */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                    <a href="mailto:contact@zyflows.com" className="text-blue-600 hover:underline">
                      contact@zyflows.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {t('contact.phone')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">+972 XX XXX XXXX</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {t('contact.location')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">Israel</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {t('contact.hours')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
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
