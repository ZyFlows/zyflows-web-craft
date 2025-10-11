import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accessibility, X } from 'lucide-react';

const ACC_STORAGE_KEY = 'acc_prefs_v3';

interface AccPrefs {
  fontPercent?: number;
  wordSpacing?: number;
  letterSpacing?: number;
  contrast?: boolean;
  grayscale?: boolean;
  invert?: boolean;
  monochrome?: boolean;
  underline?: boolean;
  hideImages?: boolean;
  readable?: boolean;
  dyslexia?: boolean;
  guide?: boolean;
  cursorLight?: boolean;
  cursorDark?: boolean;
  highlightH?: boolean;
  noAnim?: boolean;
}

const AccessibilityWidget = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [prefs, setPrefs] = useState<AccPrefs>({});
  const [showQuickReset, setShowQuickReset] = useState(false);
  const guideRef = useRef<HTMLDivElement | null>(null);

  // Widget position state
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragStartTime, setDragStartTime] = useState(0);
  const togglerRef = useRef<HTMLButtonElement | null>(null);

  const texts = {
    he: {
      skip: 'דלג לתוכן הראשי',
      title: 'כְּלֵי נְגִישׁוּת',
      grayscale: 'גווני אפור',
      contrast: 'ניגודית גבוהה',
      invert: 'ניגודיות הפוכה',
      monochrome: 'שחור לבן',
      underline: 'הדגשת קישורים',
      hideImages: 'הסתרת תמונות',
      readable: 'גופן קריא',
      dyslexia: 'גופן דיסלקסיה',
      reading: 'הקראת טקסט',
      guide: 'מדריך קריאה',
      cursorLight: 'סמן גדול בהיר',
      cursorDark: 'סמן גדול כהה',
      highlightH: 'הדגשת כותרות',
      noAnim: 'ביטול אנימציות',
      reset: 'איפוס הגדרות',
      fontSize: 'התאמת גודל גופן',
      wordSpacing: 'התאמת ריווח בין מילים',
      letterSpacing: 'התאמת ריווח בין אותיות',
      statement: 'הצהרת נגישות',
      shortcuts: 'קיצורי דרך: Alt+Shift+A לפתיחה',
      label: 'כלי נגישות'
    },
    fr: {
      skip: 'Aller au contenu principal',
      title: 'Outils d\'accessibilité',
      grayscale: 'Niveaux de gris',
      contrast: 'Contraste élevé',
      invert: 'Inverser les couleurs',
      monochrome: 'Noir et blanc',
      underline: 'Souligner les liens',
      hideImages: 'Masquer les images',
      readable: 'Police lisible',
      dyslexia: 'Police dyslexie',
      reading: 'Lecture vocale',
      guide: 'Guide de lecture',
      cursorLight: 'Grand curseur clair',
      cursorDark: 'Grand curseur foncé',
      highlightH: 'Surligner les titres',
      noAnim: 'Désactiver animations',
      reset: 'Réinitialiser',
      fontSize: 'Taille du texte',
      wordSpacing: 'Espacement des mots',
      letterSpacing: 'Espacement des lettres',
      statement: 'Déclaration d\'accessibilité',
      shortcuts: 'Raccourcis: Alt+Shift+A ouvrir',
      label: 'Outils d\'accessibilité'
    },
    en: {
      skip: 'Skip to main content',
      title: 'Accessibility Tools',
      grayscale: 'Grayscale',
      contrast: 'High contrast',
      invert: 'Invert colors',
      monochrome: 'Monochrome',
      underline: 'Underline links',
      hideImages: 'Hide images',
      readable: 'Readable font',
      dyslexia: 'Dyslexia font',
      reading: 'Text to speech',
      guide: 'Reading guide',
      cursorLight: 'Large light cursor',
      cursorDark: 'Large dark cursor',
      highlightH: 'Highlight headings',
      noAnim: 'Disable animations',
      reset: 'Reset settings',
      fontSize: 'Text size',
      wordSpacing: 'Word spacing',
      letterSpacing: 'Letter spacing',
      statement: 'Accessibility statement',
      shortcuts: 'Shortcuts: Alt+Shift+A open',
      label: 'Accessibility tools'
    }
  };

  const l = texts[language as keyof typeof texts] || texts.en;

  // Load preferences
  useEffect(() => {
    try {
      const saved = localStorage.getItem(ACC_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setPrefs(parsed);
        applyPrefs(parsed);
      }
    } catch (e) {
      console.error('Failed to load accessibility preferences', e);
    }
  }, []);

  // Apply preferences to DOM
  const applyPrefs = (p: AccPrefs) => {
    const root = document.documentElement;
    const body = document.body;

    // Font size: change root font-size to scale rem-based text globally
    if (p.fontPercent && p.fontPercent !== 100) {
      root.style.fontSize = `${p.fontPercent}%`;
    } else {
      root.style.removeProperty('font-size');
    }

    // Spacing (inherit from body)
    if (typeof p.wordSpacing === 'number') {
      document.body.style.wordSpacing = `${p.wordSpacing}px`;
    } else {
      document.body.style.removeProperty('word-spacing');
    }

    if (typeof p.letterSpacing === 'number') {
      document.body.style.letterSpacing = `${p.letterSpacing}px`;
    } else {
      document.body.style.removeProperty('letter-spacing');
    }

    // Visual filters
    body.classList.toggle('acc-contrast', !!p.contrast);
    body.classList.toggle('acc-grayscale', !!p.grayscale);
    body.classList.toggle('acc-invert', !!p.invert);
    body.classList.toggle('acc-monochrome', !!p.monochrome);
    body.classList.toggle('acc-underline', !!p.underline);
    body.classList.toggle('acc-hide-images', !!p.hideImages);
    body.classList.toggle('acc-readable', !!p.readable);
    body.classList.toggle('acc-dyslexia', !!p.dyslexia);
    body.classList.toggle('acc-cursor-light', !!p.cursorLight);
    body.classList.toggle('acc-cursor-dark', !!p.cursorDark);
    body.classList.toggle('acc-highlight-h', !!p.highlightH);
    body.classList.toggle('acc-no-anim', !!p.noAnim);

    // Check if any setting is active
    const hasActive = Object.values(p).some(v => v && v !== 0);
    setShowQuickReset(hasActive);
  };

  const updatePref = (key: keyof AccPrefs, value: any) => {
    const newPrefs = { ...prefs, [key]: value };
    setPrefs(newPrefs);
    applyPrefs(newPrefs);
    localStorage.setItem(ACC_STORAGE_KEY, JSON.stringify(newPrefs));
  };

  const resetAll = () => {
    setPrefs({});
    applyPrefs({});
    localStorage.removeItem(ACC_STORAGE_KEY);
    setShowQuickReset(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setIsOpen(o => !o);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!e.shiftKey || !togglerRef.current) return;
    
    setIsDragging(true);
    setDragStartTime(Date.now());
    const rect = togglerRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      // If drag was very short, treat as click
      if (Date.now() - dragStartTime < 200) {
        setIsOpen(o => !o);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, dragStartTime]);

  // Reading guide
  useEffect(() => {
    if (!prefs.guide) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (guideRef.current) {
        guideRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefs.guide]);

  const togglerStyle = position
    ? { position: 'fixed' as const, left: `${position.x}px`, top: `${position.y}px` }
    : {};

  return createPortal(
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="fixed top-[-100px] left-2 z-[10000] bg-primary text-primary-foreground px-4 py-2 rounded focus:top-2 transition-all"
      >
        {l.skip}
      </a>

      {/* Floating button */}
      <button
        ref={togglerRef}
        onClick={() => !isDragging && setIsOpen(o => !o)}
        onMouseDown={handleMouseDown}
        className="fixed bottom-[140px] right-5 z-[999999] w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary flex items-center justify-center transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        style={togglerStyle}
        aria-label={l.label}
        title={`${l.label} (Alt+Shift+A)`}
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {/* Quick reset button */}
      {showQuickReset && !isOpen && (
        <button
          onClick={resetAll}
          className="fixed bottom-[200px] right-5 z-[999998] w-10 h-10 rounded-full bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg flex items-center justify-center transition-all hover:scale-110"
          aria-label={l.reset}
          title={l.reset}
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Widget panel */}
      {isOpen && (
        <div
          className="fixed bottom-[200px] right-5 z-[999999] w-80 max-h-[80vh] overflow-y-auto bg-card border border-border rounded-lg shadow-lg glow-primary animate-scale-in"
          role="dialog"
          aria-label={l.title}
        >
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Accessibility className="w-5 h-5 text-primary" />
              {l.title}
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Font size */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {l.fontSize}: {prefs.fontPercent || 100}%
              </label>
              <input
                type="range"
                min="80"
                max="150"
                value={prefs.fontPercent || 100}
                onChange={(e) => updatePref('fontPercent', Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Word spacing */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {l.wordSpacing}: {prefs.wordSpacing || 0}px
              </label>
              <input
                type="range"
                min="0"
                max="20"
                value={prefs.wordSpacing || 0}
                onChange={(e) => updatePref('wordSpacing', Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Letter spacing */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {l.letterSpacing}: {prefs.letterSpacing || 0}px
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={prefs.letterSpacing || 0}
                onChange={(e) => updatePref('letterSpacing', Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Toggle options */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'contrast', label: l.contrast },
                { key: 'grayscale', label: l.grayscale },
                { key: 'invert', label: l.invert },
                { key: 'monochrome', label: l.monochrome },
                { key: 'underline', label: l.underline },
                { key: 'hideImages', label: l.hideImages },
                { key: 'readable', label: l.readable },
                { key: 'dyslexia', label: l.dyslexia },
                { key: 'guide', label: l.guide },
                { key: 'cursorLight', label: l.cursorLight },
                { key: 'cursorDark', label: l.cursorDark },
                { key: 'highlightH', label: l.highlightH },
                { key: 'noAnim', label: l.noAnim },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => updatePref(key as keyof AccPrefs, !prefs[key as keyof AccPrefs])}
                  className={`p-3 text-sm rounded border transition-all ${
                    prefs[key as keyof AccPrefs]
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted text-muted-foreground border-border hover:border-primary'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Reset button */}
            <button
              onClick={resetAll}
              className="w-full py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded transition-colors"
            >
              {l.reset}
            </button>

            {/* Shortcuts hint */}
            <p className="text-xs text-muted-foreground text-center">
              {l.shortcuts}
            </p>
          </div>
        </div>
      )}

      {/* Reading guide */}
      {prefs.guide && (
        <div
          ref={guideRef}
          className="fixed left-0 right-0 h-0.5 bg-primary shadow-glow pointer-events-none z-[999997]"
          style={{ top: 0 }}
        />
      )}
    </>,
    document.body
  );
};

export default AccessibilityWidget;