import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Accessibility, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ACC_STORAGE_KEY = "acc_prefs_v3";
const ACC_POS_KEY = "acc_pos_v3";

type AccPrefs = {
  fontPercent: number;
  wordSpacing: number;
  letterSpacing: number;
  contrast: boolean;
  grayscale: boolean;
  invert: boolean;
  monochrome: boolean;
  underline: boolean;
  hideImages: boolean;
  readable: boolean;
  dyslexia: boolean;
  guide: boolean;
  cursorLight: boolean;
  cursorDark: boolean;
  highlightH: boolean;
  noAnim: boolean;
};

const defaultPrefs: AccPrefs = {
  fontPercent: 100,
  wordSpacing: 0,
  letterSpacing: 0,
  contrast: false,
  grayscale: false,
  invert: false,
  monochrome: false,
  underline: false,
  hideImages: false,
  readable: false,
  dyslexia: false,
  guide: false,
  cursorLight: false,
  cursorDark: false,
  highlightH: false,
  noAnim: false,
};

function loadPrefs(): AccPrefs {
  try {
    const raw = localStorage.getItem(ACC_STORAGE_KEY);
    if (!raw) return { ...defaultPrefs };
    const parsed = JSON.parse(raw);
    return { ...defaultPrefs, ...parsed };
  } catch {
    return { ...defaultPrefs };
  }
}

function savePrefs(p: AccPrefs) {
  try {
    localStorage.setItem(ACC_STORAGE_KEY, JSON.stringify(p));
  } catch {
    // ignore
  }
}

function loadPosition(): { x: number; y: number; isCustom: boolean } | null {
  try {
    const raw = localStorage.getItem(ACC_POS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function savePosition(x: number, y: number, isCustom: boolean) {
  try {
    localStorage.setItem(ACC_POS_KEY, JSON.stringify({ x, y, isCustom }));
  } catch {
    // ignore
  }
}

const AccessibilityWidget: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [prefs, setPrefs] = useState<AccPrefs>(() => loadPrefs());
  const [showQuickReset, setShowQuickReset] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [position, setPosition] = useState<{ x: number; y: number; isCustom: boolean } | null>(
    () => loadPosition()
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const togglerRef = useRef<HTMLButtonElement | null>(null);

  const guideRef = useRef<HTMLDivElement | null>(null);

  const texts = useMemo(() => ({
    he: {
      skip: "דלג לתוכן הראשי",
      title: "כְּלֵי נְגִישׁוּת",
      grayscale: "גווני אפור",
      contrast: "ניגודיות גבוהה",
      invert: "היפוך צבעים",
      monochrome: "שחור־לבן",
      underline: "הדגשת קישורים",
      hideImages: "הסתרת תמונות",
      readable: "גופן קריא",
      dyslexia: "גופן דיסלקסיה",
      reading: "הקראת טקסט",
      guide: "מדריך קריאה",
      cursorLight: "סמן גדול בהיר",
      cursorDark: "סמן גדול כהה",
      highlightH: "הדגשת כותרות",
      noAnim: "ביטול אנימציות",
      reset: "איפוס הגדרות",
      fontSize: "גודל טקסט",
      wordSpacing: "ריווח בין מילים",
      letterSpacing: "ריווח בין אותיות",
      statement: "הצהרת נגישות",
      shortcuts:
        "Alt+Shift+A לפתיחה · C ניגודיות · I היפוך · U קישורים · G אפור · M שחור־לבן · H כותרות · L תמונות · X אנימציות · R איפוס · +/- גודל · 0 איפוס גודל · Esc סגור",
      label: "כלי נגישות",
      speakSel: "הקרא טקסט נבחר",
      stop: "עצור הקראה",
    },
    fr: {
      skip: "Aller au contenu principal",
      title: "Outils d'accessibilité",
      grayscale: "Niveaux de gris",
      contrast: "Contraste élevé",
      invert: "Inverser les couleurs",
      monochrome: "Noir et blanc",
      underline: "Souligner les liens",
      hideImages: "Masquer les images",
      readable: "Police lisible",
      dyslexia: "Police dyslexie",
      reading: "Lecture vocale",
      guide: "Guide de lecture",
      cursorLight: "Grand curseur clair",
      cursorDark: "Grand curseur foncé",
      highlightH: "Surligner les titres",
      noAnim: "Désactiver animations",
      reset: "Réinitialiser",
      fontSize: "Taille du texte",
      wordSpacing: "Espacement des mots",
      letterSpacing: "Espacement des lettres",
      statement: "Déclaration d'accessibilité",
      shortcuts:
        "Alt+Shift+A ouvrir · C contraste · I inverser · U liens · G gris · M mono · H titres · L images · X anim · R reset · +/- taille · 0 reset taille · Esc fermer",
      label: "Outils d'accessibilité",
      speakSel: "Lire la sélection",
      stop: "Arrêter la lecture",
    },
    en: {
      skip: "Skip to main content",
      title: "Accessibility Tools",
      grayscale: "Grayscale",
      contrast: "High contrast",
      invert: "Invert colors",
      monochrome: "Monochrome",
      underline: "Underline links",
      hideImages: "Hide images",
      readable: "Readable font",
      dyslexia: "Dyslexia font",
      reading: "Text to speech",
      guide: "Reading guide",
      cursorLight: "Large light cursor",
      cursorDark: "Large dark cursor",
      highlightH: "Highlight headings",
      noAnim: "Disable animations",
      reset: "Reset settings",
      fontSize: "Text size",
      wordSpacing: "Word spacing",
      letterSpacing: "Letter spacing",
      statement: "Accessibility statement",
      shortcuts:
        "Alt+Shift+A open · C contrast · I invert · U links · G gray · M mono · H headings · L images · X anim off · R reset · +/- size · 0 reset size · Esc close",
      label: "Accessibility tools",
      speakSel: "Speak selection",
      stop: "Stop speech",
    },
  }), []);

  const l =
    (texts as any)[(language as keyof typeof texts) ?? "en"] ??
    (texts as any).en;

  // Apply preferences to document
  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement as HTMLElement;
    const mainContent = document.getElementById("main-app-content") || document.body;

    // Base text sizing/spacing
    root.style.setProperty("--acc-font-scale", `${prefs.fontPercent}%`);
    root.style.fontSize = `${prefs.fontPercent}%`;
    root.style.wordSpacing = `${prefs.wordSpacing}px`;
    root.style.letterSpacing = `${prefs.letterSpacing}px`;

    // Font family
    if (prefs.dyslexia) {
      root.style.fontFamily = `"OpenDyslexic", "Comic Sans MS", "Atkinson Hyperlegible", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
    } else if (prefs.readable) {
      root.style.fontFamily = `"Atkinson Hyperlegible", Arial, Helvetica, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
    } else {
      root.style.removeProperty("font-family");
    }

    // Filters on main content only
    const filters: string[] = [];
    if (prefs.grayscale) filters.push("grayscale(1)");
    if (prefs.invert) filters.push("invert(1) hue-rotate(180deg)");
    if (prefs.monochrome) filters.push("grayscale(1) contrast(1.2)");
    mainContent.style.filter = filters.join(" ");

    // High contrast
    if (prefs.contrast) {
      root.classList.add("acc-contrast");
    } else {
      root.classList.remove("acc-contrast");
    }

    // Underline links
    if (prefs.underline) {
      root.classList.add("acc-underline");
    } else {
      root.classList.remove("acc-underline");
    }

    // Hide images
    if (prefs.hideImages) {
      root.classList.add("acc-hide-images");
    } else {
      root.classList.remove("acc-hide-images");
    }

    // No animations
    if (prefs.noAnim) {
      root.classList.add("acc-no-anim");
    } else {
      root.classList.remove("acc-no-anim");
    }

    // Highlight headings
    if (prefs.highlightH) {
      root.classList.add("acc-highlight-h");
    } else {
      root.classList.remove("acc-highlight-h");
    }

    // Cursor styles (mutually exclusive)
    if (prefs.cursorLight) {
      root.classList.add("acc-cursor-light");
      root.classList.remove("acc-cursor-dark");
    } else if (prefs.cursorDark) {
      root.classList.add("acc-cursor-dark");
      root.classList.remove("acc-cursor-light");
    } else {
      root.classList.remove("acc-cursor-light", "acc-cursor-dark");
    }

    savePrefs(prefs);
  }, [prefs]);

  // Create/remove reading guide element
  useEffect(() => {
    if (!prefs.guide) {
      if (guideRef.current) {
        guideRef.current.remove();
        guideRef.current = null;
      }
      return;
    }
    if (!guideRef.current) {
      const el = document.createElement("div");
      el.className = "acc-reading-guide";
      document.body.appendChild(el);
      guideRef.current = el;
    }
    const onMove = (e: MouseEvent) => {
      if (guideRef.current) {
        const y = e.clientY - 20;
        guideRef.current.style.top = `${Math.max(0, y)}px`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [prefs.guide]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Main toggle
      if (e.altKey && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setIsOpen((v) => !v);
        return;
      }

      // Close on Escape
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      // All other shortcuts require Alt+Shift
      if (!e.altKey || !e.shiftKey) return;

      const k = e.key.toLowerCase();
      e.preventDefault();

      if (k === "c") setPrefs((p) => ({ ...p, contrast: !p.contrast }));
      if (k === "i") setPrefs((p) => ({ ...p, invert: !p.invert }));
      if (k === "u") setPrefs((p) => ({ ...p, underline: !p.underline }));
      if (k === "g") setPrefs((p) => ({ ...p, grayscale: !p.grayscale }));
      if (k === "m") setPrefs((p) => ({ ...p, monochrome: !p.monochrome }));
      if (k === "x") setPrefs((p) => ({ ...p, noAnim: !p.noAnim }));
      if (k === "h") setPrefs((p) => ({ ...p, highlightH: !p.highlightH }));
      if (k === "l") setPrefs((p) => ({ ...p, hideImages: !p.hideImages }));
      if (k === "r") handleReset();
      if (k === "=" || k === "+")
        setPrefs((p) => ({ ...p, fontPercent: Math.min(160, p.fontPercent + 10) }));
      if (k === "-")
        setPrefs((p) => ({ ...p, fontPercent: Math.max(80, p.fontPercent - 10) }));
      if (k === "0") setPrefs((p) => ({ ...p, fontPercent: 100 }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Quick reset bubble visibility
  useEffect(() => {
    const anyCustom =
      JSON.stringify(prefs) !== JSON.stringify(defaultPrefs);
    setShowQuickReset(anyCustom);
  }, [prefs]);

  function handleReset() {
    setPrefs({ ...defaultPrefs });
  }

  // Drag logic
  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      if (!isDragging || !position) return;
      const newPos = { 
        x: e.clientX - dragOffset.x, 
        y: e.clientY - dragOffset.y,
        isCustom: true 
      };
      setPosition(newPos);
    }
    function onMouseUp() {
      if (isDragging && position) {
        savePosition(position.x, position.y, true);
      }
      setIsDragging(false);
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, position, dragOffset]);

  function onTogglerMouseDown(e: React.MouseEvent) {
    if (!e.shiftKey && !e.altKey) return;
    const rect = togglerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setIsDragging(true);
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    if (!position) {
      setPosition({ x: rect.left, y: rect.top, isCustom: true });
    }
    e.preventDefault();
  }

  // Text-to-speech
  const canSpeak = typeof window !== "undefined" && "speechSynthesis" in window;
  
  function speakSelection() {
    if (!canSpeak) return;
    const selection = window.getSelection()?.toString().trim();
    if (!selection) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(selection);
    utter.lang = (language === "he" ? "he-IL" : language === "fr" ? "fr-FR" : "en-US");
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
  }
  
  function stopSpeak() {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }

  // Monitor speaking state
  useEffect(() => {
    if (!canSpeak) return;
    const interval = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        setIsSpeaking(true);
      } else {
        setIsSpeaking(false);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [canSpeak]);

  // Panel UI - Compact design matching piexpertises.com
  const Panel = (
    <div
      role="dialog"
      aria-label={l.title}
      aria-modal="false"
      className="acc-panel"
      style={{
        position: "fixed",
        zIndex: 2147483646,
        bottom: position ? "auto" : 24,
        right: 24,
        top: position ? position.y + 56 : "auto",
        left: position ? position.x : "auto",
        maxWidth: 370,
        width: 370,
        background: "#ffffff",
        color: "#333",
        borderRadius: 12,
        border: "none",
        boxShadow: "0 15px 50px rgba(0,0,0,0.2)",
        padding: 0,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        direction: language === "he" ? "rtl" : "ltr",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)",
          padding: "12px 16px",
          borderRadius: "12px 12px 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <strong style={{ fontSize: 16, color: "#fff", fontWeight: 600 }}>{l.title}</strong>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            color: "#fff",
            width: 28,
            height: 28,
            borderRadius: "50%",
            cursor: "pointer",
            fontSize: 18,
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.2)";
          }}
        >
          ×
        </button>
      </div>

      <div style={{ padding: 16 }}>
        {/* Toggles Grid - 3 columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
          }}
        >
          {[
            ["grayscale", l.grayscale],
            ["contrast", l.contrast],
            ["invert", l.invert],
            ["monochrome", l.monochrome],
            ["underline", l.underline],
            ["hideImages", l.hideImages],
            ["dyslexia", l.dyslexia],
            ["readable", l.readable],
            ["guide", l.guide],
            ["highlightH", l.highlightH],
            ["cursorLight", l.cursorLight],
            ["cursorDark", l.cursorDark],
            ["noAnim", l.noAnim],
          ].map(([key, label]) => {
            const active = (prefs as any)[key];
            return (
              <button
                key={key}
                type="button"
                aria-pressed={!!active}
                onClick={() => setPrefs((p) => ({ ...p, [key]: !active } as any))}
                style={{
                  textAlign: "center",
                  fontSize: 11.5,
                  padding: "10px 6px",
                  borderRadius: 10,
                  border: "2px solid #1e88e5",
                  background: active ? "#1e88e5" : "#f5f5f5",
                  color: active ? "#fff" : "#333",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  fontWeight: 500,
                  lineHeight: 1.3,
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "#e3f2fd";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "#f5f5f5";
                  }
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Reset button - full width */}
        <button
          type="button"
          onClick={handleReset}
          style={{
            width: "100%",
            marginTop: 8,
            padding: "10px",
            borderRadius: 10,
            border: "2px solid #1e88e5",
            background: "#f5f5f5",
            color: "#1e88e5",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#e3f2fd";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#f5f5f5";
          }}
        >
          {l.reset}
        </button>

        {/* Font size slider */}
        <div
          style={{
            marginTop: 12,
            padding: "12px",
            background: "#f9f9f9",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <label style={{ fontSize: 13, fontWeight: 600, color: "#1e88e5" }}>
              {l.fontSize}
            </label>
            <button
              type="button"
              onClick={() => setPrefs((p) => ({ ...p, fontPercent: Math.max(60, p.fontPercent - 10) }))}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 20,
                color: "#1e88e5",
                cursor: "pointer",
                padding: "0 6px",
              }}
            >
              −
            </button>
            <span style={{ fontSize: 14, fontWeight: 600, minWidth: 50, textAlign: "center" }}>
              {prefs.fontPercent}%
            </span>
            <button
              type="button"
              onClick={() => setPrefs((p) => ({ ...p, fontPercent: Math.min(250, p.fontPercent + 10) }))}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 20,
                color: "#1e88e5",
                cursor: "pointer",
                padding: "0 6px",
              }}
            >
              +
            </button>
          </div>
          <input
            aria-label={l.fontSize}
            type="range"
            min={60}
            max={250}
            value={prefs.fontPercent}
            onChange={(e) =>
              setPrefs((p) => ({ ...p, fontPercent: parseInt(e.target.value, 10) }))
            }
            style={{
              width: "100%",
              accentColor: "#1e88e5",
            }}
          />
        </div>

        {/* Word spacing slider */}
        <div
          style={{
            marginTop: 12,
            padding: "12px",
            background: "#f9f9f9",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <label style={{ fontSize: 13, fontWeight: 600, color: "#1e88e5" }}>
              {l.wordSpacing}
            </label>
            <button
              type="button"
              onClick={() => setPrefs((p) => ({ ...p, wordSpacing: Math.max(0, p.wordSpacing - 1) }))}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 20,
                color: "#1e88e5",
                cursor: "pointer",
                padding: "0 6px",
              }}
            >
              −
            </button>
            <span style={{ fontSize: 14, fontWeight: 600, minWidth: 50, textAlign: "center" }}>
              {prefs.wordSpacing.toFixed(1)}
            </span>
            <button
              type="button"
              onClick={() => setPrefs((p) => ({ ...p, wordSpacing: Math.min(16, p.wordSpacing + 1) }))}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 20,
                color: "#1e88e5",
                cursor: "pointer",
                padding: "0 6px",
              }}
            >
              +
            </button>
          </div>
          <input
            aria-label={l.wordSpacing}
            type="range"
            min={0}
            max={16}
            step={0.1}
            value={prefs.wordSpacing}
            onChange={(e) =>
              setPrefs((p) => ({ ...p, wordSpacing: parseFloat(e.target.value) }))
            }
            style={{
              width: "100%",
              accentColor: "#1e88e5",
            }}
          />
        </div>

        {/* Letter spacing slider */}
        <div
          style={{
            marginTop: 12,
            padding: "12px",
            background: "#f9f9f9",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <label style={{ fontSize: 13, fontWeight: 600, color: "#1e88e5" }}>
              {l.letterSpacing}
            </label>
            <button
              type="button"
              onClick={() => setPrefs((p) => ({ ...p, letterSpacing: Math.max(0, p.letterSpacing - 0.1) }))}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 20,
                color: "#1e88e5",
                cursor: "pointer",
                padding: "0 6px",
              }}
            >
              −
            </button>
            <span style={{ fontSize: 14, fontWeight: 600, minWidth: 50, textAlign: "center" }}>
              {prefs.letterSpacing.toFixed(2)}
            </span>
            <button
              type="button"
              onClick={() => setPrefs((p) => ({ ...p, letterSpacing: Math.min(8, p.letterSpacing + 0.1) }))}
              style={{
                background: "transparent",
                border: "none",
                fontSize: 20,
                color: "#1e88e5",
                cursor: "pointer",
                padding: "0 6px",
              }}
            >
              +
            </button>
          </div>
          <input
            aria-label={l.letterSpacing}
            type="range"
            min={0}
            max={8}
            step={0.01}
            value={prefs.letterSpacing}
            onChange={(e) =>
              setPrefs((p) => ({ ...p, letterSpacing: parseFloat(e.target.value) }))
            }
            style={{
              width: "100%",
              accentColor: "#1e88e5",
            }}
          />
        </div>

        {/* Text-to-speech controls */}
        {canSpeak && (
          <div
            style={{
              marginTop: 12,
              padding: "12px",
              background: "#f9f9f9",
              borderRadius: 10,
              display: "flex",
              gap: 8,
            }}
          >
            <button
              type="button"
              onClick={speakSelection}
              disabled={isSpeaking}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: 8,
                border: "2px solid #1e88e5",
                background: isSpeaking ? "#e3f2fd" : "#1e88e5",
                color: isSpeaking ? "#1e88e5" : "#fff",
                fontSize: 12,
                fontWeight: 600,
                cursor: isSpeaking ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                opacity: isSpeaking ? 0.7 : 1,
              }}
            >
              <Volume2 size={16} />
              {l.speakSel}
            </button>
            <button
              type="button"
              onClick={stopSpeak}
              disabled={!isSpeaking}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: 8,
                border: "2px solid #d32f2f",
                background: !isSpeaking ? "#f5f5f5" : "#d32f2f",
                color: !isSpeaking ? "#d32f2f" : "#fff",
                fontSize: 12,
                fontWeight: 600,
                cursor: !isSpeaking ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                opacity: !isSpeaking ? 0.7 : 1,
              }}
            >
              <VolumeX size={16} />
              {l.stop}
            </button>
          </div>
        )}

        {/* Accessibility statement */}
        <div
          style={{
            marginTop: 12,
            padding: "12px",
            background: "#f9f9f9",
            borderRadius: 10,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1e88e5", marginBottom: 6, textAlign: "center" }}>
            {l.statement}
          </div>
          <div style={{ fontSize: 11, color: "#666", lineHeight: 1.5, textAlign: language === "he" ? "right" : "left" }}>
            {l.shortcuts}
          </div>
        </div>
      </div>
    </div>
  );

  // Floating toggle button - zyFlows purple
  const Toggler = (
    <button
      ref={togglerRef}
      type="button"
      aria-label={l.label}
      title={`${l.label} (Shift + drag pour déplacer)`}
      onMouseDown={onTogglerMouseDown}
      onClick={(e) => {
        if (isDragging) return;
        setIsOpen((v) => !v);
      }}
      style={{
        position: "fixed",
        zIndex: 2147483647,
        width: 56,
        height: 56,
        borderRadius: "999px",
        border: "none",
        right: position ? "auto" : 24,
        bottom: position ? "auto" : 140,
        left: position ? position.x : "auto",
        top: position ? position.y : "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "hsl(var(--primary))",
        color: "hsl(var(--primary-foreground))",
        boxShadow: "var(--shadow-glow), 0 10px 20px rgba(0,0,0,.4)",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <Accessibility aria-hidden />
      <span className="sr-only">{l.label}</span>
    </button>
  );

  // Quick reset
  const QuickReset =
    showQuickReset && !isOpen &&
    createPortal(
      <button
        type="button"
        onClick={handleReset}
        aria-label={l.reset}
        style={{
          position: "fixed",
          zIndex: 2147483647,
          bottom: position ? "auto" : 208,
          right: position ? 24 : 24,
          top: position ? (position.y ?? 0) + 64 : "auto",
          left: position ? (position.x ?? 0) : "auto",
          background: "hsl(var(--destructive))",
          color: "hsl(var(--destructive-foreground))",
          border: "none",
          padding: "8px 12px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 600,
          boxShadow: "0 6px 16px rgba(0,0,0,.3)",
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        {l.reset}
      </button>,
      document.body
    );

  return (
    <>
      {/* Integrated CSS Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Skip link */
        .acc-skip-link {
          position: fixed;
          left: -9999px;
          top: 8px;
          z-index: 2147483647;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          background: #8a63d2;
          color: #fff;
        }
        .acc-skip-link:focus {
          left: 8px !important;
        }

        /* High contrast */
        .acc-contrast html,
        .acc-contrast body {
          background: #000 !important;
          color: #fff !important;
        }
        .acc-contrast a,
        .acc-contrast button {
          color: #0ff !important;
        }
        .acc-contrast *,
        .acc-contrast *::before,
        .acc-contrast *::after {
          border-color: #fff !important;
          box-shadow: none !important;
        }
        .acc-contrast img {
          opacity: 0.95;
        }

        /* Underline links */
        .acc-underline a,
        .acc-underline [role="link"] {
          text-decoration: underline !important;
          text-decoration-thickness: 2px !important;
          text-underline-offset: 3px !important;
        }

        /* Hide images - but not accessibility widget */
        .acc-hide-images img:not(.acc-widget *),
        .acc-hide-images picture:not(.acc-widget *),
        .acc-hide-images video:not(.acc-widget *),
        .acc-hide-images figure:not(.acc-widget *) {
          opacity: 0 !important;
          visibility: hidden !important;
        }

        /* Disable animations */
        .acc-no-anim *,
        .acc-no-anim *::before,
        .acc-no-anim *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          transition-delay: 0s !important;
        }

        /* Highlight headings */
        .acc-highlight-h h1,
        .acc-highlight-h h2,
        .acc-highlight-h h3,
        .acc-highlight-h h4,
        .acc-highlight-h h5,
        .acc-highlight-h h6,
        .acc-highlight-h [role="heading"] {
          background-color: rgba(138, 99, 210, 0.2) !important;
          padding: 8px !important;
          border-left: 4px solid #8a63d2 !important;
          border-radius: 4px !important;
        }

        /* Large light cursor */
        .acc-cursor-light,
        .acc-cursor-light * {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="white" stroke="black" stroke-width="2"/><circle cx="24" cy="24" r="4" fill="black"/></svg>') 24 24, auto !important;
        }

        /* Large dark cursor */
        .acc-cursor-dark,
        .acc-cursor-dark * {
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="black" stroke="white" stroke-width="2"/><circle cx="24" cy="24" r="4" fill="white"/></svg>') 24 24, auto !important;
        }

        /* Reading guide */
        .acc-reading-guide {
          position: fixed;
          left: 0;
          right: 0;
          height: 40px;
          background: rgba(255, 255, 0, 0.3);
          pointer-events: none;
          z-index: 2147483646;
          transition: top 0.05s ease;
        }

        /* Screen reader only */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        /* Isolation for widget */
        .acc-widget {
          isolation: isolate;
          transform: translateZ(0);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .acc-widget button[aria-label*="Accessibility"] {
            width: 52px !important;
            height: 52px !important;
          }
        }

        @media (max-width: 480px) {
          .acc-widget button[aria-label*="Accessibility"] {
            width: 50px !important;
            height: 50px !important;
          }
        }
      `}} />

      {/* Skip link */}
      <a
        href="#main-content"
        className="acc-skip-link"
      >
        {l.skip}
      </a>

      {createPortal(Toggler, document.body)}
      {isOpen && createPortal(Panel, document.body)}
      {QuickReset}
    </>
  );
};

export default AccessibilityWidget;
