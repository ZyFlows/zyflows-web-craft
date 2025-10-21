import { useState, useEffect } from 'react';
import { User, X, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const [settings, setSettings] = useState({
    fontSize: 100,
    contrast: 'normal' as 'normal' | 'high' | 'inverted',
    grayscale: false,
    highlightLinks: false,
    readableFont: false,
    lineHeight: 1.5,
    letterSpacing: 'normal' as 'normal' | 'wide',
    cursor: 'normal' as 'normal' | 'large',
    hideImages: false,
    stopAnimations: false,
    readingGuide: false,
    invertColors: false,
    brightness: 100,
    saturation: 100
  });

  // Appliquer les paramètres
  useEffect(() => {
    const root = document.documentElement;
    
    // Taille du texte
    root.style.fontSize = `${settings.fontSize}%`;
    
    // Contraste
    if (settings.contrast === 'high') {
      root.classList.add('accessibility-high-contrast');
      root.classList.remove('accessibility-inverted');
    } else if (settings.contrast === 'inverted') {
      root.classList.add('accessibility-inverted');
      root.classList.remove('accessibility-high-contrast');
    } else {
      root.classList.remove('accessibility-high-contrast', 'accessibility-inverted');
    }
    
    // Niveaux de gris
    if (settings.grayscale) {
      root.classList.add('accessibility-grayscale');
    } else {
      root.classList.remove('accessibility-grayscale');
    }
    
    // Surbrillance liens
    if (settings.highlightLinks) {
      root.classList.add('accessibility-highlight-links');
    } else {
      root.classList.remove('accessibility-highlight-links');
    }
    
    // Police lisible
    if (settings.readableFont) {
      root.classList.add('accessibility-readable-font');
    } else {
      root.classList.remove('accessibility-readable-font');
    }
    
    // Espacement
    root.style.setProperty('--accessibility-line-height', settings.lineHeight.toString());
    root.style.setProperty('--accessibility-letter-spacing', settings.letterSpacing === 'wide' ? '0.1em' : 'normal');
    
    // Curseur
    if (settings.cursor === 'large') {
      root.classList.add('accessibility-large-cursor');
    } else {
      root.classList.remove('accessibility-large-cursor');
    }
    
    // Masquer images
    if (settings.hideImages) {
      root.classList.add('accessibility-hide-images');
    } else {
      root.classList.remove('accessibility-hide-images');
    }
    
    // Arrêter animations
    if (settings.stopAnimations) {
      root.classList.add('accessibility-no-animations');
    } else {
      root.classList.remove('accessibility-no-animations');
    }
    
    // Guide de lecture
    if (settings.readingGuide) {
      root.classList.add('accessibility-reading-guide');
    } else {
      root.classList.remove('accessibility-reading-guide');
    }
    
    // Filtres visuels
    if (settings.invertColors) {
      root.style.filter = `invert(1) brightness(${settings.brightness}%) saturate(${settings.saturation}%)`;
    } else {
      root.style.filter = `brightness(${settings.brightness}%) saturate(${settings.saturation}%)`;
    }
    
    // Sauvegarder les préférences
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
  }, [settings]);

  // Charger les préférences sauvegardées
  useEffect(() => {
    const saved = localStorage.getItem('accessibilitySettings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load accessibility settings');
      }
    }
  }, []);

  const resetSettings = () => {
    setSettings({
      fontSize: 100,
      contrast: 'normal',
      grayscale: false,
      highlightLinks: false,
      readableFont: false,
      lineHeight: 1.5,
      letterSpacing: 'normal',
      cursor: 'normal',
      hideImages: false,
      stopAnimations: false,
      readingGuide: false,
      invertColors: false,
      brightness: 100,
      saturation: 100
    });
    localStorage.removeItem('accessibilitySettings');
  };

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      he: {
        title: 'נגישות',
        reset: 'איפוס',
        close: 'סגור',
        textSize: 'גודל טקסט',
        contrast: 'ניגודיות',
        normal: 'רגיל',
        high: 'גבוה',
        inverted: 'הפוך',
        brightness: 'בהירות',
        saturation: 'רוויה',
        visualOptions: 'אפשרויות חזותיות',
        grayscale: 'גווני אפור',
        highlightLinks: 'הדגשת קישורים',
        readableFont: 'גופן קריא',
        hideImages: 'הסתר תמונות',
        stopAnimations: 'עצור אנימציות',
        readingGuide: 'מדריך קריאה',
        spacing: 'ריווח',
        lineHeight: 'גובה שורה',
        letterSpacing: 'ריווח אותיות',
        wide: 'רחב',
        cursor: 'סמן',
        large: 'גדול',
        navigation: 'ניווט',
        statement: 'הצהרת נגישות',
        statementText: 'האתר נבנה בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות ועומד בתקן WCAG 2.1 ברמה AA.',
        readMore: 'קרא עוד'
      },
      fr: {
        title: 'Accessibilité',
        reset: 'Réinitialiser',
        close: 'Fermer',
        textSize: 'Taille du texte',
        contrast: 'Contraste',
        normal: 'Normal',
        high: 'Élevé',
        inverted: 'Inversé',
        brightness: 'Luminosité',
        saturation: 'Saturation',
        visualOptions: 'Options visuelles',
        grayscale: 'Niveaux de gris',
        highlightLinks: 'Surligner les liens',
        readableFont: 'Police lisible',
        hideImages: 'Masquer les images',
        stopAnimations: 'Arrêter les animations',
        readingGuide: 'Guide de lecture',
        spacing: 'Espacement',
        lineHeight: 'Hauteur de ligne',
        letterSpacing: 'Espacement des lettres',
        wide: 'Large',
        cursor: 'Curseur',
        large: 'Grand',
        navigation: 'Navigation',
        statement: 'Déclaration d\'accessibilité',
        statementText: 'Ce site est conforme aux normes d\'accessibilité WCAG 2.1 niveau AA.',
        readMore: 'En savoir plus'
      },
      en: {
        title: 'Accessibility',
        reset: 'Reset',
        close: 'Close',
        textSize: 'Text Size',
        contrast: 'Contrast',
        normal: 'Normal',
        high: 'High',
        inverted: 'Inverted',
        brightness: 'Brightness',
        saturation: 'Saturation',
        visualOptions: 'Visual Options',
        grayscale: 'Grayscale',
        highlightLinks: 'Highlight Links',
        readableFont: 'Readable Font',
        hideImages: 'Hide Images',
        stopAnimations: 'Stop Animations',
        readingGuide: 'Reading Guide',
        spacing: 'Spacing',
        lineHeight: 'Line Height',
        letterSpacing: 'Letter Spacing',
        wide: 'Wide',
        cursor: 'Cursor',
        large: 'Large',
        navigation: 'Navigation',
        statement: 'Accessibility Statement',
        statementText: 'This site meets WCAG 2.1 Level AA accessibility standards.',
        readMore: 'Read more'
      }
    };
    return translations[language]?.[key] || key;
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-[9999] w-[60px] h-[60px] rounded-full bg-primary text-primary-foreground border-none cursor-pointer shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={`${t('title')} - ${t('close')}`}
        title={t('title')}
      >
        <User className="h-6 w-6" />
      </button>

      {/* Panel */}
      {isOpen && (
        <div 
          className="fixed top-0 right-0 w-[400px] h-screen bg-background shadow-2xl z-[10000] overflow-y-auto animate-slide-in-right"
          role="dialog" 
          aria-label={t('title')}
        >
          <div className="flex justify-between items-center p-5 bg-primary text-primary-foreground">
            <h2 className="text-xl font-bold m-0">{t('title')}</h2>
            <div className="flex gap-2">
              <button
                onClick={resetSettings}
                title={t('reset')}
                aria-label={t('reset')}
                className="bg-primary-foreground/20 border-none text-primary-foreground p-2 rounded cursor-pointer transition-colors hover:bg-primary-foreground/30"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title={t('close')}
                aria-label={t('close')}
                className="bg-primary-foreground/20 border-none text-primary-foreground p-2 rounded cursor-pointer transition-colors hover:bg-primary-foreground/30"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-5">
            {/* SECTION: Taille du texte */}
            <section className="mb-8 pb-5 border-b border-border">
              <h3 className="text-base mb-4 text-foreground font-semibold">{t('textSize')}</h3>
              <div className="flex items-center gap-4 justify-center">
                <button
                  onClick={() => setSettings({...settings, fontSize: Math.max(80, settings.fontSize - 10)})}
                  aria-label="Decrease text size"
                  className="px-5 py-2 border-2 border-primary bg-background text-primary rounded-md cursor-pointer font-bold transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  A-
                </button>
                <span className="min-w-[60px] text-center font-semibold">{settings.fontSize}%</span>
                <button
                  onClick={() => setSettings({...settings, fontSize: Math.min(200, settings.fontSize + 10)})}
                  aria-label="Increase text size"
                  className="px-5 py-2 border-2 border-primary bg-background text-primary rounded-md cursor-pointer font-bold transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  A+
                </button>
              </div>
            </section>

            {/* SECTION: Contraste */}
            <section className="mb-8 pb-5 border-b border-border">
              <h3 className="text-base mb-4 text-foreground font-semibold">{t('contrast')}</h3>
              <div className="flex gap-2 flex-wrap">
                {(['normal', 'high', 'inverted'] as const).map((type) => (
                  <button
                    key={type}
                    className={`px-4 py-2 border-2 rounded-md cursor-pointer transition-all flex-1 min-w-[80px] ${
                      settings.contrast === type 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-background border-border hover:border-primary hover:text-primary'
                    }`}
                    onClick={() => setSettings({...settings, contrast: type})}
                  >
                    {t(type)}
                  </button>
                ))}
              </div>
            </section>

            {/* SECTION: Luminosité */}
            <section className="mb-8 pb-5 border-b border-border">
              <h3 className="text-base mb-4 text-foreground font-semibold">{t('brightness')}</h3>
              <input
                type="range"
                min="50"
                max="150"
                value={settings.brightness}
                onChange={(e) => setSettings({...settings, brightness: Number(e.target.value)})}
                aria-label="Adjust brightness"
                className="w-full my-2"
              />
              <div className="text-center font-semibold">{settings.brightness}%</div>
            </section>

            {/* SECTION: Saturation */}
            <section className="mb-8 pb-5 border-b border-border">
              <h3 className="text-base mb-4 text-foreground font-semibold">{t('saturation')}</h3>
              <input
                type="range"
                min="0"
                max="200"
                value={settings.saturation}
                onChange={(e) => setSettings({...settings, saturation: Number(e.target.value)})}
                aria-label="Adjust saturation"
                className="w-full my-2"
              />
              <div className="text-center font-semibold">{settings.saturation}%</div>
            </section>

            {/* SECTION: Options visuelles */}
            <section className="mb-8 pb-5 border-b border-border">
              <h3 className="text-base mb-4 text-foreground font-semibold">{t('visualOptions')}</h3>
              {[
                { key: 'grayscale', label: t('grayscale') },
                { key: 'highlightLinks', label: t('highlightLinks') },
                { key: 'readableFont', label: t('readableFont') },
                { key: 'hideImages', label: t('hideImages') },
                { key: 'stopAnimations', label: t('stopAnimations') },
                { key: 'readingGuide', label: t('readingGuide') }
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 mb-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings[key as keyof typeof settings] as boolean}
                    onChange={(e) => setSettings({...settings, [key]: e.target.checked})}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </section>

            {/* SECTION: Espacement */}
            <section className="mb-8 pb-5 border-b border-border">
              <h3 className="text-base mb-4 text-foreground font-semibold">{t('spacing')}</h3>
              <label className="block mb-4">
                <span className="text-sm block mb-2">{t('lineHeight')}</span>
                <input
                  type="range"
                  min="1"
                  max="2.5"
                  step="0.1"
                  value={settings.lineHeight}
                  onChange={(e) => setSettings({...settings, lineHeight: Number(e.target.value)})}
                  className="w-full"
                />
                <div className="text-center font-semibold mt-1">{settings.lineHeight}</div>
              </label>
              
              <div className="text-sm mb-2">{t('letterSpacing')}</div>
              <div className="flex gap-2">
                {(['normal', 'wide'] as const).map((type) => (
                  <button
                    key={type}
                    className={`px-4 py-2 border-2 rounded-md cursor-pointer transition-all flex-1 ${
                      settings.letterSpacing === type 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-background border-border hover:border-primary hover:text-primary'
                    }`}
                    onClick={() => setSettings({...settings, letterSpacing: type})}
                  >
                    {t(type)}
                  </button>
                ))}
              </div>
            </section>

            {/* SECTION: Curseur */}
            <section className="mb-8 pb-5 border-b border-border">
              <h3 className="text-base mb-4 text-foreground font-semibold">{t('cursor')}</h3>
              <div className="flex gap-2">
                {(['normal', 'large'] as const).map((type) => (
                  <button
                    key={type}
                    className={`px-4 py-2 border-2 rounded-md cursor-pointer transition-all flex-1 ${
                      settings.cursor === type 
                        ? 'bg-primary text-primary-foreground border-primary' 
                        : 'bg-background border-border hover:border-primary hover:text-primary'
                    }`}
                    onClick={() => setSettings({...settings, cursor: type})}
                  >
                    {t(type)}
                  </button>
                ))}
              </div>
            </section>

            {/* SECTION: Déclaration d'accessibilité */}
            <section className="mb-8">
              <h3 className="text-base mb-4 text-foreground font-semibold">{t('statement')}</h3>
              <p className="text-sm mb-3 leading-relaxed">{t('statementText')}</p>
              <a 
                href="/accessibility-statement" 
                className="text-primary underline text-sm inline-block hover:text-primary/80"
              >
                {t('readMore')}
              </a>
            </section>
          </div>
        </div>
      )}

      {/* Guide de lecture (overlay) */}
      {settings.readingGuide && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998] bg-gradient-to-b from-black/70 via-transparent to-black/70"></div>
      )}
    </>
  );
};

export default AccessibilityWidget;