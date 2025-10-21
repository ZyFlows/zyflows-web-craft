import { useState, useEffect } from 'react';
import { Cookie, X, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const CookieConsent = () => {
  const { language } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
        applyCookiePreferences(saved);
      } catch (e) {
        console.error('Failed to parse cookie consent');
      }
    }
  }, []);

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Analytics cookies
    if (prefs.analytics && typeof window !== 'undefined') {
      // Google Analytics 4 (remplacer par votre ID)
      // window.dataLayer = window.dataLayer || [];
      // function gtag(...args: any[]){ window.dataLayer.push(arguments); }
      // gtag('js', new Date());
      // gtag('config', 'G-XXXXXXXXXX');
    }

    // Marketing cookies
    if (prefs.marketing) {
      // Facebook Pixel, Google Ads, etc.
    }

    // Preferences cookies (déjà géré par localStorage)
  };

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    saveConsent(allAccepted);
  };

  const acceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    saveConsent(necessaryOnly);
  };

  const savePreferences = () => {
    saveConsent(preferences);
    setShowSettings(false);
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setPreferences(prefs);
    applyCookiePreferences(prefs);
    setShowBanner(false);
  };

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      he: {
        title: 'אנחנו משתמשים בעוגיות',
        description: 'אנו משתמשים בעוגיות כדי לשפר את חווית המשתמש, לנתח תנועה ולהציג תוכן מותאם אישית.',
        learnMore: 'מדיניות פרטיות',
        acceptAll: 'קבל הכל',
        necessaryOnly: 'הכרחיים בלבד',
        customize: 'התאמה אישית',
        settingsTitle: 'הגדרות עוגיות',
        necessary: 'עוגיות הכרחיות',
        necessaryDesc: 'נדרשות לתפקוד בסיסי של האתר',
        necessaryDetails: 'עוגיות אלה חיוניות לתפקוד תקין של האתר ולא ניתן לכבות אותן.',
        analytics: 'ניתוח ומדידה',
        analyticsDesc: 'עוזרות לנו להבין כיצד משתמשים באתר',
        analyticsDetails: 'Google Analytics ושירותים דומים לניתוח התנהגות משתמשים.',
        marketing: 'שיווק',
        marketingDesc: 'משמשות להצגת פרסומות מותאמות',
        marketingDetails: 'Facebook Pixel, Google Ads ושירותי שיווק נוספים.',
        preferences: 'העדפות',
        preferencesDesc: 'שומרות את הבחירות שלך',
        preferencesDetails: 'שפה, ערכת צבעים והגדרות נגישות.',
        savePreferences: 'שמור העדפות'
      },
      fr: {
        title: 'Nous utilisons des cookies',
        description: 'Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu.',
        learnMore: 'Politique de confidentialité',
        acceptAll: 'Tout accepter',
        necessaryOnly: 'Nécessaires uniquement',
        customize: 'Personnaliser',
        settingsTitle: 'Paramètres des cookies',
        necessary: 'Cookies nécessaires',
        necessaryDesc: 'Requis pour le fonctionnement de base du site',
        necessaryDetails: 'Ces cookies sont essentiels au bon fonctionnement du site.',
        analytics: 'Analyse et mesure',
        analyticsDesc: 'Nous aident à comprendre l\'utilisation du site',
        analyticsDetails: 'Google Analytics et services similaires pour analyser le comportement.',
        marketing: 'Marketing',
        marketingDesc: 'Utilisés pour afficher des publicités pertinentes',
        marketingDetails: 'Facebook Pixel, Google Ads et autres services marketing.',
        preferences: 'Préférences',
        preferencesDesc: 'Enregistrent vos choix',
        preferencesDetails: 'Langue, thème de couleur et paramètres d\'accessibilité.',
        savePreferences: 'Enregistrer les préférences'
      },
      en: {
        title: 'We use cookies',
        description: 'We use cookies to enhance your experience, analyze traffic, and personalize content.',
        learnMore: 'Privacy Policy',
        acceptAll: 'Accept All',
        necessaryOnly: 'Necessary Only',
        customize: 'Customize',
        settingsTitle: 'Cookie Settings',
        necessary: 'Necessary Cookies',
        necessaryDesc: 'Required for basic site functionality',
        necessaryDetails: 'These cookies are essential for the website to function properly.',
        analytics: 'Analytics & Measurement',
        analyticsDesc: 'Help us understand how the site is used',
        analyticsDetails: 'Google Analytics and similar services to analyze user behavior.',
        marketing: 'Marketing',
        marketingDesc: 'Used to display relevant advertisements',
        marketingDetails: 'Facebook Pixel, Google Ads and other marketing services.',
        preferences: 'Preferences',
        preferencesDesc: 'Save your choices',
        preferencesDetails: 'Language, color theme and accessibility settings.',
        savePreferences: 'Save Preferences'
      }
    };
    return translations[language]?.[key] || key;
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Bannière principale */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-background border-t-2 border-border shadow-2xl z-[9997] p-5 animate-slide-up"
        role="dialog" 
        aria-label={t('title')}
      >
        <div className="max-w-7xl mx-auto flex items-center gap-5 flex-wrap">
          <div className="text-primary flex-shrink-0">
            <Cookie className="h-8 w-8" />
          </div>
          
          <div className="flex-1 min-w-[250px]">
            <h3 className="text-lg font-semibold mb-2 text-foreground">{t('title')}</h3>
            <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
              {t('description')}
            </p>
            <a 
              href="/privacy-policy" 
              className="text-primary underline text-sm hover:text-primary/80"
            >
              {t('learnMore')}
            </a>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={acceptNecessary} 
              className="px-5 py-2 rounded-md text-sm font-semibold cursor-pointer transition-all border-2 border-border bg-background text-foreground hover:bg-muted whitespace-nowrap"
            >
              {t('necessaryOnly')}
            </button>
            <button 
              onClick={() => setShowSettings(true)} 
              className="px-5 py-2 rounded-md text-sm font-semibold cursor-pointer transition-all border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground whitespace-nowrap flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              {t('customize')}
            </button>
            <button 
              onClick={acceptAll} 
              className="px-5 py-2 rounded-md text-sm font-semibold cursor-pointer transition-all border-none bg-primary text-primary-foreground hover:bg-primary/90 whitespace-nowrap"
            >
              {t('acceptAll')}
            </button>
          </div>
        </div>
      </div>

      {/* Modal des paramètres */}
      {showSettings && (
        <div 
          className="fixed inset-0 bg-black/60 z-[9998] flex items-center justify-center p-5 animate-fade-in"
          onClick={() => setShowSettings(false)}
        >
          <div 
            className="bg-background rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col animate-scale-in shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-border">
              <h2 className="text-xl font-bold m-0">{t('settingsTitle')}</h2>
              <button 
                onClick={() => setShowSettings(false)} 
                aria-label="Close"
                className="bg-transparent border-none cursor-pointer text-muted-foreground p-1 flex items-center hover:text-foreground transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto flex-1">
              {/* Nécessaires */}
              <div className="mb-5 pb-5 border-b border-border">
                <div className="flex justify-between items-start gap-5 mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold mb-1 text-foreground">{t('necessary')}</h3>
                    <p className="text-sm text-muted-foreground m-0">{t('necessaryDesc')}</p>
                  </div>
                  <label className="relative inline-block w-[50px] h-[26px] flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={true}
                      disabled
                      className="opacity-0 w-0 h-0"
                    />
                    <span className="absolute cursor-not-allowed top-0 left-0 right-0 bottom-0 bg-primary/50 rounded-[26px] transition-all before:absolute before:content-[''] before:h-5 before:w-5 before:left-[3px] before:bottom-[3px] before:bg-white before:transition-all before:rounded-full before:translate-x-[24px]"></span>
                  </label>
                </div>
                <div className="mt-2 p-2 bg-muted/50 rounded-md">
                  <p className="text-xs text-muted-foreground m-0">{t('necessaryDetails')}</p>
                </div>
              </div>

              {/* Analytics */}
              <div className="mb-5 pb-5 border-b border-border">
                <div className="flex justify-between items-start gap-5 mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold mb-1 text-foreground">{t('analytics')}</h3>
                    <p className="text-sm text-muted-foreground m-0">{t('analyticsDesc')}</p>
                  </div>
                  <label className="relative inline-block w-[50px] h-[26px] flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({...preferences, analytics: e.target.checked})}
                      className="opacity-0 w-0 h-0"
                    />
                    <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-[26px] transition-all ${preferences.analytics ? 'bg-primary' : 'bg-muted'} before:absolute before:content-[''] before:h-5 before:w-5 before:left-[3px] before:bottom-[3px] before:bg-white before:transition-all before:rounded-full ${preferences.analytics ? 'before:translate-x-[24px]' : ''}`}></span>
                  </label>
                </div>
                <div className="mt-2 p-2 bg-muted/50 rounded-md">
                  <p className="text-xs text-muted-foreground m-0">{t('analyticsDetails')}</p>
                </div>
              </div>

              {/* Marketing */}
              <div className="mb-5 pb-5 border-b border-border">
                <div className="flex justify-between items-start gap-5 mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold mb-1 text-foreground">{t('marketing')}</h3>
                    <p className="text-sm text-muted-foreground m-0">{t('marketingDesc')}</p>
                  </div>
                  <label className="relative inline-block w-[50px] h-[26px] flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({...preferences, marketing: e.target.checked})}
                      className="opacity-0 w-0 h-0"
                    />
                    <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-[26px] transition-all ${preferences.marketing ? 'bg-primary' : 'bg-muted'} before:absolute before:content-[''] before:h-5 before:w-5 before:left-[3px] before:bottom-[3px] before:bg-white before:transition-all before:rounded-full ${preferences.marketing ? 'before:translate-x-[24px]' : ''}`}></span>
                  </label>
                </div>
                <div className="mt-2 p-2 bg-muted/50 rounded-md">
                  <p className="text-xs text-muted-foreground m-0">{t('marketingDetails')}</p>
                </div>
              </div>

              {/* Préférences */}
              <div className="mb-5">
                <div className="flex justify-between items-start gap-5 mb-3">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold mb-1 text-foreground">{t('preferences')}</h3>
                    <p className="text-sm text-muted-foreground m-0">{t('preferencesDesc')}</p>
                  </div>
                  <label className="relative inline-block w-[50px] h-[26px] flex-shrink-0">
                    <input
                      type="checkbox"
                      checked={preferences.preferences}
                      onChange={(e) => setPreferences({...preferences, preferences: e.target.checked})}
                      className="opacity-0 w-0 h-0"
                    />
                    <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-[26px] transition-all ${preferences.preferences ? 'bg-primary' : 'bg-muted'} before:absolute before:content-[''] before:h-5 before:w-5 before:left-[3px] before:bottom-[3px] before:bg-white before:transition-all before:rounded-full ${preferences.preferences ? 'before:translate-x-[24px]' : ''}`}></span>
                  </label>
                </div>
                <div className="mt-2 p-2 bg-muted/50 rounded-md">
                  <p className="text-xs text-muted-foreground m-0">{t('preferencesDetails')}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-border">
              <button 
                onClick={savePreferences} 
                className="w-full p-3 bg-primary text-primary-foreground border-none rounded-md text-base font-semibold cursor-pointer transition-colors hover:bg-primary/90"
              >
                {t('savePreferences')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;