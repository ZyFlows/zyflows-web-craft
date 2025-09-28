import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Accessibility, 
  X, 
  Sun, 
  Moon, 
  Eye, 
  MousePointer, 
  Keyboard,
  RotateCcw,
  Link,
  Volume2,
  Contrast,
  ZoomIn,
  ZoomOut,
  Type
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface AccessibilitySettings {
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  contrast: boolean;
  darkMode: boolean;
  highlightLinks: boolean;
  highlightHeaders: boolean;
  bigCursor: boolean;
  readingGuide: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  reducedMotion: boolean;
}

const AccessibilityWidget = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('main');
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    letterSpacing: 0,
    lineHeight: 100,
    contrast: false,
    darkMode: false,
    highlightLinks: false,
    highlightHeaders: false,
    bigCursor: false,
    readingGuide: false,
    screenReader: false,
    keyboardNavigation: false,
    reducedMotion: false,
  });

  const translations = {
    fr: {
      accessibility: 'Accessibilité',
      close: 'Fermer',
      reset: 'Réinitialiser',
      textSize: 'Taille du texte',
      letterSpacing: 'Espacement des lettres',
      lineHeight: 'Hauteur de ligne',
      visualAdjustments: 'Ajustements visuels',
      contrast: 'Contraste élevé',
      darkMode: 'Mode sombre',
      highlightLinks: 'Surligner les liens',
      highlightHeaders: 'Surligner les titres',
      navigation: 'Navigation',
      bigCursor: 'Gros curseur',
      keyboardNav: 'Navigation clavier',
      readingGuide: 'Guide de lecture',
      screenReader: 'Lecteur d\'écran',
      reducedMotion: 'Réduire les animations',
      increase: 'Augmenter',
      decrease: 'Diminuer',
      reset_all: 'Tout réinitialiser'
    },
    en: {
      accessibility: 'Accessibility',
      close: 'Close',
      reset: 'Reset',
      textSize: 'Text Size',
      letterSpacing: 'Letter Spacing',
      lineHeight: 'Line Height',
      visualAdjustments: 'Visual Adjustments',
      contrast: 'High Contrast',
      darkMode: 'Dark Mode',
      highlightLinks: 'Highlight Links',
      highlightHeaders: 'Highlight Headers',
      navigation: 'Navigation',
      bigCursor: 'Big Cursor',
      keyboardNav: 'Keyboard Navigation',
      readingGuide: 'Reading Guide',
      screenReader: 'Screen Reader',
      reducedMotion: 'Reduce Motion',
      increase: 'Increase',
      decrease: 'Decrease',
      reset_all: 'Reset All'
    },
    he: {
      accessibility: 'נגישות',
      close: 'סגור',
      reset: 'איפוס',
      textSize: 'גודל טקסט',
      letterSpacing: 'ריווח בין אותיות',
      lineHeight: 'גובה שורה',
      visualAdjustments: 'התאמות ויזואליות',
      contrast: 'ניגודיות גבוהה',
      darkMode: 'מצב כהה',
      highlightLinks: 'הדגש קישורים',
      highlightHeaders: 'הדגש כותרות',
      navigation: 'ניווט',
      bigCursor: 'סמן גדול',
      keyboardNav: 'ניווט מקלדת',
      readingGuide: 'מדריך קריאה',
      screenReader: 'קורא מסך',
      reducedMotion: 'הפחת תנועה',
      increase: 'הגדל',
      decrease: 'הקטן',
      reset_all: 'איפוס הכל'
    }
  };

  const getText = (key: string) => {
    const currentLanguage = language as keyof typeof translations;
    const langTranslations = translations[currentLanguage] || translations.en;
    return langTranslations[key as keyof typeof langTranslations] || key;
  };

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Font size
    root.style.setProperty('--accessibility-font-scale', `${settings.fontSize / 100}`);
    document.body.classList.toggle('accessibility-font-scaling', settings.fontSize !== 100);
    
    // Letter spacing
    root.style.setProperty('--accessibility-letter-spacing', `${settings.letterSpacing}px`);
    document.body.classList.toggle('accessibility-letter-spacing', settings.letterSpacing !== 0);
    
    // Line height
    root.style.setProperty('--accessibility-line-height', `${settings.lineHeight / 100}`);
    document.body.classList.toggle('accessibility-line-height', settings.lineHeight !== 100);
    
    // Apply classes
    document.body.classList.toggle('accessibility-high-contrast', settings.contrast);
    document.body.classList.toggle('accessibility-dark-mode', settings.darkMode);
    document.body.classList.toggle('accessibility-highlight-links', settings.highlightLinks);
    document.body.classList.toggle('accessibility-highlight-headers', settings.highlightHeaders);
    document.body.classList.toggle('accessibility-big-cursor', settings.bigCursor);
    document.body.classList.toggle('accessibility-reading-guide', settings.readingGuide);
    document.body.classList.toggle('accessibility-reduced-motion', settings.reducedMotion);
    document.body.classList.toggle('accessibility-keyboard-navigation', settings.keyboardNavigation);
    
    console.log('Accessibility settings applied:', settings);
  }, [settings]);

  const resetSettings = () => {
    setSettings({
      fontSize: 100,
      letterSpacing: 0,
      lineHeight: 100,
      contrast: false,
      darkMode: false,
      highlightLinks: false,
      highlightHeaders: false,
      bigCursor: false,
      readingGuide: false,
      screenReader: false,
      keyboardNavigation: false,
      reducedMotion: false,
    });
    console.log('Accessibility settings reset');
  };

  const adjustFontSize = (increment: number) => {
    setSettings(prev => ({
      ...prev,
      fontSize: Math.max(50, Math.min(200, prev.fontSize + increment))
    }));
  };

  // Floating button when closed
  if (!isOpen) {
    return (
      <div className={cn(
        "fixed z-50 transition-all duration-300",
        language === 'he' ? "left-4" : "right-4",
        "top-1/2 -translate-y-1/2"
      )}>
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label={getText('accessibility')}
        >
          <Accessibility className="w-8 h-8" />
        </Button>
      </div>
    );
  }

  // Full widget when open
  return (
    <div className={cn(
      "fixed z-50 transition-all duration-300",
      language === 'he' ? "left-4" : "right-4",
      "top-4 w-80"
    )}>
      <Card className="shadow-2xl border-2 border-primary/20 bg-background">
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Accessibility className="w-5 h-5" />
              {getText('accessibility')}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex gap-1 mt-3">
            <Button
              variant={activeTab === 'main' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('main')}
              className="text-xs h-8"
            >
              {getText('visualAdjustments')}
            </Button>
            <Button
              variant={activeTab === 'navigation' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('navigation')}
              className="text-xs h-8"
            >
              {getText('navigation')}
            </Button>
          </div>
        </div>

        <CardContent className="p-4 max-h-96 overflow-y-auto">
          {activeTab === 'main' && (
            <div className="space-y-4">
              {/* Font Size */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{getText('textSize')}</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => adjustFontSize(-10)}
                    disabled={settings.fontSize <= 50}
                    className="h-8 w-8 p-0"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <span className="text-sm min-w-[3rem] text-center">{settings.fontSize}%</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => adjustFontSize(10)}
                    disabled={settings.fontSize >= 200}
                    className="h-8 w-8 p-0"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Letter Spacing */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{getText('letterSpacing')}</label>
                <Slider
                  value={[settings.letterSpacing]}
                  onValueChange={([value]) => setSettings(prev => ({ ...prev, letterSpacing: value }))}
                  max={5}
                  min={-2}
                  step={0.5}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">{settings.letterSpacing}px</span>
              </div>

              {/* Line Height */}
              <div className="space-y-2">
                <label className="text-sm font-medium">{getText('lineHeight')}</label>
                <Slider
                  value={[settings.lineHeight]}
                  onValueChange={([value]) => setSettings(prev => ({ ...prev, lineHeight: value }))}
                  max={200}
                  min={50}
                  step={10}
                  className="w-full"
                />
                <span className="text-xs text-muted-foreground">{settings.lineHeight}%</span>
              </div>

              {/* Visual toggles */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Contrast className="w-4 h-4" />
                    {getText('contrast')}
                  </label>
                  <Switch
                    checked={settings.contrast}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, contrast: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    {getText('darkMode')}
                  </label>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, darkMode: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Link className="w-4 h-4" />
                    {getText('highlightLinks')}
                  </label>
                  <Switch
                    checked={settings.highlightLinks}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, highlightLinks: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Type className="w-4 h-4" />
                    {getText('highlightHeaders')}
                  </label>
                  <Switch
                    checked={settings.highlightHeaders}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, highlightHeaders: checked }))}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'navigation' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MousePointer className="w-4 h-4" />
                  {getText('bigCursor')}
                </label>
                <Switch
                  checked={settings.bigCursor}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, bigCursor: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Keyboard className="w-4 h-4" />
                  {getText('keyboardNav')}
                </label>
                <Switch
                  checked={settings.keyboardNavigation}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, keyboardNavigation: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {getText('readingGuide')}
                </label>
                <Switch
                  checked={settings.readingGuide}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, readingGuide: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  {getText('screenReader')}
                </label>
                <Switch
                  checked={settings.screenReader}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, screenReader: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  {getText('reducedMotion')}
                </label>
                <Switch
                  checked={settings.reducedMotion}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, reducedMotion: checked }))}
                />
              </div>
            </div>
          )}

          <div className="pt-4 border-t mt-4">
            <Button
              variant="outline"
              onClick={resetSettings}
              className="w-full"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              {getText('reset_all')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessibilityWidget;