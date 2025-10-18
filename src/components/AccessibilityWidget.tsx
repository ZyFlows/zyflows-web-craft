import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Accessibility } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ACC_STORAGE_KEY = "acc_prefs_v3";
const STYLE_NODE_ID = "acc-widget-global-styles";
const STYLE_UNDERLINE_ID = "acc-underline-styles";
const STYLE_HIDE_IMAGES_ID = "acc-hide-images-styles";
const STYLE_NO_ANIM_ID = "acc-no-anim-styles";
const STYLE_HIGHLIGHT_H_ID = "acc-highlight-h-styles";
const STYLE_CURSOR_LIGHT_ID = "acc-cursor-light-styles";
const STYLE_CURSOR_DARK_ID = "acc-cursor-dark-styles";
const STYLE_GUIDE_ID = "acc-guide-styles";

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

function setGlobalStyle(id: string, css: string | null) {
  let node = document.getElementById(id) as HTMLStyleElement | null;
  if (css && css.trim()) {
    if (!node) {
      node = document.createElement("style");
      node.id = id;
      node.type = "text/css";
      document.head.appendChild(node);
    }
    node.textContent = css;
  } else if (node) {
    node.remove();
  }
}

const AccessibilityWidget: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [prefs, setPrefs] = useState<AccPrefs>(() => loadPrefs());
  const [showQuickReset, setShowQuickReset] = useState(false);

  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
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
        "Alt+Shift+A לפתיחה · C ניגודיות · I היפוך · U קישורים · G אפור · M שחור־לבן · X ביטול אנימציות · R איפוס · =/-/0 טקסט",
      label: "כלי נגישות",
      speakSel: "הקרא טקסט נבחר",
      stop: "עצור דיבור",
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
        "Alt+Shift+A ouvrir · C contraste · I inverser · U liens · G gris · M mono · X anim off · R reset · =/-/0 texte",
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
        "Alt+Shift+A open · C contrast · I invert · U links · G gray · M mono · X no anim · R reset · =/-/0 text",
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

    // Base text sizing/spacing
    root.style.setProperty("--acc-font-scale", `${prefs.fontPercent}%`);
    root.style.fontSize = `${prefs.fontPercent}%`;
    root.style.wordSpacing = `${prefs.wordSpacing}px`;
    root.style.letterSpacing = `${prefs.letterSpacing}px`;

    // Font family
    if (prefs.dyslexia) {
      root.style.fontFamily = `"OpenDyslexic", "Atkinson Hyperlegible", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
    } else if (prefs.readable) {
      root.style.fontFamily = `"Atkinson Hyperlegible", system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`;
    } else {
      root.style.removeProperty("font-family");
    }

    // Filters
    const filters: string[] = [];
    if (prefs.grayscale) filters.push("grayscale(1)");
    if (prefs.invert) filters.push("invert(1) hue-rotate(180deg)");
    if (prefs.monochrome) filters.push("grayscale(1) contrast(1.2)");
    (document.body as HTMLElement).style.filter = filters.join(" ");

    // High contrast via global CSS
    setGlobalStyle(
      STYLE_NODE_ID,
      prefs.contrast
        ? `
html, body {
  background: #000 !important;
  color: #fff !important;
}
a, button {
  color: #0ff !important;
}
*, *::before, *::after {
  border-color: #fff !important;
  box-shadow: none !important;
}
img { opacity: 0.95; }
`
        : null
    );

    // Underline links
    setGlobalStyle(
      STYLE_UNDERLINE_ID,
      prefs.underline
        ? `
a, [role="link"] {
  text-decoration: underline !important;
  text-underline-offset: 2px;
}
`
        : null
    );

    // Hide images
    setGlobalStyle(
      STYLE_HIDE_IMAGES_ID,
      prefs.hideImages
        ? `
img, picture, video, figure {
  display: none !important;
  visibility: hidden !important;
}
`
        : null
    );

    // No animations
    setGlobalStyle(
      STYLE_NO_ANIM_ID,
      prefs.noAnim
        ? `
* {
  animation: none !important;
  transition: none !important;
  scroll-behavior: auto !important;
}
html { scroll-behavior: auto !important; }
`
        : null
    );

    // Highlight headings
    setGlobalStyle(
      STYLE_HIGHLIGHT_H_ID,
      prefs.highlightH
        ? `
h1, h2, h3, h4, h5, h6, [role="heading"] {
  outline: 2px dashed #ff0 !important;
  outline-offset: 4px;
}
`
        : null
    );

    // Cursor styles
    setGlobalStyle(
      STYLE_CURSOR_LIGHT_ID,
      prefs.cursorLight
        ? `
* { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><circle cx="6" cy="6" r="6" fill="white" stroke="black" stroke-width="2"/></svg>') 6 6, default !important; }
`
        : null
    );
    setGlobalStyle(
      STYLE_CURSOR_DARK_ID,
      prefs.cursorDark
        ? `
* { cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><circle cx="6" cy="6" r="6" fill="black" stroke="white" stroke-width="2"/></svg>') 6 6, default !important; }
`
        : null
    );

    // Reading guide
    setGlobalStyle(
      STYLE_GUIDE_ID,
      prefs.guide
        ? `
.acc-reading-guide {
  position: fixed;
  left: 0; right: 0;
  height: 40px;
  background: rgba(138, 99, 210, 0.2);
  pointer-events: none;
  z-index: 2147483647;
}
`
        : null
    );

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
      if (e.altKey && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setIsOpen((v) => !v);
        return;
      }
      const k = e.key.toLowerCase();
      if (k === "c") setPrefs((p) => ({ ...p, contrast: !p.contrast }));
      if (k === "i") setPrefs((p) => ({ ...p, invert: !p.invert }));
      if (k === "u") setPrefs((p) => ({ ...p, underline: !p.underline }));
      if (k === "g") setPrefs((p) => ({ ...p, grayscale: !p.grayscale }));
      if (k === "m") setPrefs((p) => ({ ...p, monochrome: !p.monochrome }));
      if (k === "x") setPrefs((p) => ({ ...p, noAnim: !p.noAnim }));
      if (k === "r") handleReset();
      if (k === "=" || k === "+")
        setPrefs((p) => ({ ...p, fontPercent: Math.min(250, p.fontPercent + 10) }));
      if (k === "-")
        setPrefs((p) => ({ ...p, fontPercent: Math.max(60, p.fontPercent - 10) }));
      if (k === "0") setPrefs((p) => ({ ...p, fontPercent: 100 }));
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
      setPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    }
    function onMouseUp() {
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
    if (!e.shiftKey) return;
    const rect = togglerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setIsDragging(true);
    setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setPosition({ x: rect.left, y: rect.top });
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
    window.speechSynthesis.speak(utter);
  }
  function stopSpeak() {
    if (!canSpeak) return;
    window.speechSynthesis.cancel();
  }

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
      {/* Skip link */}
      <a
        href="#main-content"
        style={{
          position: "fixed",
          left: -9999,
          top: 8,
          background: "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))",
          padding: "8px 16px",
          zIndex: 2147483647,
          borderRadius: 8,
          fontWeight: 600,
          textDecoration: "none",
        }}
        onFocus={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.left = "8px";
        }}
        onBlur={(e) => {
          (e.currentTarget as HTMLAnchorElement).style.left = "-9999px";
        }}
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
