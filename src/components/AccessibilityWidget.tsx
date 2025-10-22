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
      {/* Bouton flottant - Au-dessus du WhatsApp */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          fixed z-[9999]
          
          /* Position et taille - Desktop (au-dessus de WhatsApp: 25px + 56px + 12px = 93px) */
          right-[25px] bottom-[93px]
          w-[56px] h-[56px]
          
          /* Position et taille - Mobile (au-dessus de WhatsApp: 15px + 46px + 8px = 69px) */
          max-[991px]:right-[15px] max-[991px]:bottom-[69px]
          max-[991px]:w-[46px] max-[991px]:h-[46px]
          
          /* Support RTL */
          rtl:right-auto rtl:left-[25px]
          max-[991px]:rtl:left-[15px]
          
          /* Style */
          rounded-full
          bg-primary text-primary-foreground
          border-none
          cursor-pointer
          
          /* Ombre douce */
          shadow-[0_4px_12px_rgba(0,0,0,0.15)]
          max-[991px]:shadow-[0_2px_8px_rgba(0,0,0,0.12)]
          
          /* Interactions */
          transition-all duration-300
          hover:scale-[1.08] hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)]
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent
          active:scale-95
          
          /* Performance */
          transform-gpu
          will-change-transform
          
          /* Layout interne */
          flex items-center justify-center
        "
        aria-label={`${t('title')} - ${t('close')}`}
        title={t('title')}
        type="button"
      >
        <User 
          className="
            w-[26px] h-[26px]
            max-[991px]:w-[22px] max-[991px]:h-[22px]
          " 
        />
      </button>

      {/* Panel */}
      {isOpen && (
        <div 
          className="fixed top-0 right-0 w-[360px] max-w-[90vw] h-screen bg-card shadow-2xl z-[10000] overflow-y-auto animate-slide-in-right border-l border-border"
          role="dialog" 
          aria-label={t('title')}
        >
          <div className="flex justify-between items-center p-4 bg-primary text-primary-foreground rounded-br-3xl">
            <h2 className="text-lg font-bold m-0">{t('title')}</h2>
            <button
              onClick={() => setIsOpen(false)}
              title={t('close')}
              aria-label={t('close')}
              className="bg-primary-foreground/20 border-none text-primary-foreground p-1.5 rounded-lg cursor-pointer transition-all hover:bg-primary-foreground/30 hover:rotate-90"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4">
            {/* Quick Actions Grid */}
            <section className="mb-6">
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  className={`px-2 py-2 text-[10px] leading-tight rounded-2xl border-2 transition-all font-medium min-h-[52px] flex items-center justify-center ${
                    settings.contrast === 'high'
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background border-primary/30 text-foreground hover:border-primary'
                  }`}
                  onClick={() => setSettings({...settings, contrast: settings.contrast === 'high' ? 'normal' : 'high'})}
                >
                  <span className="text-center">{t('high')} {t('contrast')}</span>
                </button>
                <button
                  className={`px-2 py-2 text-[10px] leading-tight rounded-2xl border-2 transition-all font-medium min-h-[52px] flex items-center justify-center ${
                    settings.grayscale
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background border-primary/30 text-foreground hover:border-primary'
                  }`}
                  onClick={() => setSettings({...settings, grayscale: !settings.grayscale})}
                >
                  <span className="text-center">{t('grayscale')}</span>
                </button>
                <button
                  className={`px-2 py-2 text-[10px] leading-tight rounded-2xl border-2 transition-all font-medium min-h-[52px] flex items-center justify-center ${
                    settings.readableFont
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background border-primary/30 text-foreground hover:border-primary'
                  }`}
                  onClick={() => setSettings({...settings, readableFont: !settings.readableFont})}
                >
                  <span className="text-center">{t('readableFont')}</span>
                </button>
                <button
                  className={`px-2 py-2 text-[10px] leading-tight rounded-2xl border-2 transition-all font-medium min-h-[52px] flex items-center justify-center ${
                    settings.highlightLinks
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background border-primary/30 text-foreground hover:border-primary'
                  }`}
                  onClick={() => setSettings({...settings, highlightLinks: !settings.highlightLinks})}
                >
                  <span className="text-center">{t('highlightLinks')}</span>
                </button>
                <button
                  className={`px-2 py-2 text-[10px] leading-tight rounded-2xl border-2 transition-all font-medium min-h-[52px] flex items-center justify-center ${
                    settings.stopAnimations
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background border-primary/30 text-foreground hover:border-primary'
                  }`}
                  onClick={() => setSettings({...settings, stopAnimations: !settings.stopAnimations})}
                >
                  <span className="text-center">{t('stopAnimations')}</span>
                </button>
                <button
                  className={`px-2 py-2 text-[10px] leading-tight rounded-2xl border-2 transition-all font-medium min-h-[52px] flex items-center justify-center ${
                    settings.cursor === 'large'
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background border-primary/30 text-foreground hover:border-primary'
                  }`}
                  onClick={() => setSettings({...settings, cursor: settings.cursor === 'large' ? 'normal' : 'large'})}
                >
                  <span className="text-center">{t('large')} {t('cursor')}</span>
                </button>
                <button
                  className={`px-2 py-2 text-[10px] leading-tight rounded-2xl border-2 transition-all font-medium min-h-[52px] flex items-center justify-center ${
                    settings.hideImages
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background border-primary/30 text-foreground hover:border-primary'
                  }`}
                  onClick={() => setSettings({...settings, hideImages: !settings.hideImages})}
                >
                  <span className="text-center">{t('hideImages')}</span>
                </button>
                <button
                  className={`px-2 py-2 text-[10px] leading-tight rounded-2xl border-2 transition-all font-medium min-h-[52px] flex items-center justify-center ${
                    settings.readingGuide
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background border-primary/30 text-foreground hover:border-primary'
                  }`}
                  onClick={() => setSettings({...settings, readingGuide: !settings.readingGuide})}
                >
                  <span className="text-center">{t('readingGuide')}</span>
                </button>
                <button
                  className={`px-2 py-2 text-[10px] leading-tight rounded-2xl border-2 transition-all font-medium min-h-[52px] flex items-center justify-center ${
                    settings.contrast === 'inverted'
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background border-primary/30 text-foreground hover:border-primary'
                  }`}
                  onClick={() => setSettings({...settings, contrast: settings.contrast === 'inverted' ? 'normal' : 'inverted'})}
                >
                  <span className="text-center">{t('inverted')}</span>
                </button>
                <button
                  className={`px-2 py-2 text-[10px] leading-tight rounded-2xl border-2 transition-all font-medium min-h-[52px] flex items-center justify-center ${
                    settings.letterSpacing === 'wide'
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background border-primary/30 text-foreground hover:border-primary'
                  }`}
                  onClick={() => setSettings({...settings, letterSpacing: settings.letterSpacing === 'wide' ? 'normal' : 'wide'})}
                >
                  <span className="text-center">{t('wide')} {t('letterSpacing')}</span>
                </button>
              </div>
            </section>

            {/* SECTION: Taille du texte */}
            <section className="mb-6 p-4 bg-muted/30 rounded-2xl">
              <h3 className="text-sm mb-3 text-primary font-semibold text-center">{t('textSize')}</h3>
              <div className="flex items-center gap-3 justify-between">
                <button
                  onClick={() => setSettings({...settings, fontSize: Math.max(80, settings.fontSize - 10)})}
                  aria-label="Decrease text size"
                  className="w-10 h-10 rounded-full border-2 border-primary bg-background text-primary cursor-pointer font-bold text-lg transition-all hover:bg-primary hover:text-primary-foreground flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-2xl font-bold text-primary">{settings.fontSize}%</span>
                <button
                  onClick={() => setSettings({...settings, fontSize: Math.min(200, settings.fontSize + 10)})}
                  aria-label="Increase text size"
                  className="w-10 h-10 rounded-full border-2 border-primary bg-background text-primary cursor-pointer font-bold text-lg transition-all hover:bg-primary hover:text-primary-foreground flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </section>

            {/* SECTION: Luminosité */}
            <section className="mb-6 p-4 bg-muted/30 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-primary font-semibold">{t('brightness')}</h3>
                <span className="text-sm font-bold text-primary">{settings.brightness}%</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSettings({...settings, brightness: Math.max(50, settings.brightness - 10)})}
                  className="w-8 h-8 rounded-full border-2 border-primary/30 bg-background text-primary cursor-pointer font-bold transition-all hover:border-primary flex items-center justify-center"
                >
                  −
                </button>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={settings.brightness}
                  onChange={(e) => setSettings({...settings, brightness: Number(e.target.value)})}
                  aria-label="Adjust brightness"
                  className="flex-1 h-2 rounded-full appearance-none bg-muted cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <button
                  onClick={() => setSettings({...settings, brightness: Math.min(150, settings.brightness + 10)})}
                  className="w-8 h-8 rounded-full border-2 border-primary/30 bg-background text-primary cursor-pointer font-bold transition-all hover:border-primary flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </section>

            {/* SECTION: Saturation */}
            <section className="mb-6 p-4 bg-muted/30 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-primary font-semibold">{t('saturation')}</h3>
                <span className="text-sm font-bold text-primary">{settings.saturation}%</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSettings({...settings, saturation: Math.max(0, settings.saturation - 10)})}
                  className="w-8 h-8 rounded-full border-2 border-primary/30 bg-background text-primary cursor-pointer font-bold transition-all hover:border-primary flex items-center justify-center"
                >
                  −
                </button>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={settings.saturation}
                  onChange={(e) => setSettings({...settings, saturation: Number(e.target.value)})}
                  aria-label="Adjust saturation"
                  className="flex-1 h-2 rounded-full appearance-none bg-muted cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <button
                  onClick={() => setSettings({...settings, saturation: Math.min(200, settings.saturation + 10)})}
                  className="w-8 h-8 rounded-full border-2 border-primary/30 bg-background text-primary cursor-pointer font-bold transition-all hover:border-primary flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </section>

            {/* SECTION: Espacement des lignes */}
            <section className="mb-6 p-4 bg-muted/30 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-primary font-semibold">{t('lineHeight')}</h3>
                <span className="text-sm font-bold text-primary">{settings.lineHeight.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSettings({...settings, lineHeight: Math.max(1, settings.lineHeight - 0.1)})}
                  className="w-8 h-8 rounded-full border-2 border-primary/30 bg-background text-primary cursor-pointer font-bold transition-all hover:border-primary flex items-center justify-center"
                >
                  −
                </button>
                <input
                  type="range"
                  min="1"
                  max="2.5"
                  step="0.1"
                  value={settings.lineHeight}
                  onChange={(e) => setSettings({...settings, lineHeight: Number(e.target.value)})}
                  className="flex-1 h-2 rounded-full appearance-none bg-muted cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <button
                  onClick={() => setSettings({...settings, lineHeight: Math.min(2.5, settings.lineHeight + 0.1)})}
                  className="w-8 h-8 rounded-full border-2 border-primary/30 bg-background text-primary cursor-pointer font-bold transition-all hover:border-primary flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </section>

            {/* Reset and Statement */}
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <button
                onClick={resetSettings}
                className="w-full px-4 py-3 bg-destructive/10 text-destructive rounded-xl font-medium transition-all hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                {t('reset')}
              </button>
              
              <a 
                href="/accessibility-statement" 
                className="text-xs text-center text-muted-foreground hover:text-primary underline transition-colors"
              >
                {t('statement')}
              </a>
            </div>
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