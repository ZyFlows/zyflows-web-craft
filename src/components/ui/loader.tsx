import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete?: () => void;
  duration?: number;
}

const Loader = ({ onComplete, duration = 4000 }: LoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [textPhase, setTextPhase] = useState(0);

  useEffect(() => {
    // Séquence d'animation holographique
    const timeline = [
      // Phase 1: Scan laser
      setTimeout(() => {
        const scanInterval = setInterval(() => {
          setScanProgress(prev => {
            if (prev >= 100) {
              clearInterval(scanInterval);
              setLogoVisible(true);
              return 100;
            }
            return prev + 3;
          });
        }, 50);
      }, 500),

      // Phase 2: Révélation du logo avec glitch
      setTimeout(() => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 300);
      }, 2000),

      // Phase 3: Texte holographique
      setTimeout(() => setTextPhase(1), 2500),
      setTimeout(() => setTextPhase(2), 3000),

      // Phase 4: Glitch final et sortie
      setTimeout(() => {
        setGlitchActive(true);
        setTimeout(() => {
          setAnimateOut(true);
          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 800);
        }, 200);
      }, duration),
    ];

    return () => timeline.forEach(timer => clearTimeout(timer));
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-800 backdrop-blur-md ${
        animateOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{
        background: `
          linear-gradient(45deg, rgba(0, 255, 255, 0.03) 25%, transparent 25%), 
          linear-gradient(-45deg, rgba(0, 255, 255, 0.03) 25%, transparent 25%), 
          linear-gradient(45deg, transparent 75%, rgba(0, 255, 255, 0.03) 75%), 
          linear-gradient(-45deg, transparent 75%, rgba(0, 255, 255, 0.03) 75%),
          rgba(0, 4, 40, 0.2)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
      }}
    >
      {/* Grille holographique */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
          {[...Array(400)].map((_, i) => (
            <div 
              key={i} 
              className="border border-cyan-400/20" 
              style={{
                animation: `holoPulse ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Laser scanner vertical */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent ${scanProgress}%, rgba(0, 255, 255, 0.8) ${scanProgress + 1}%, transparent ${scanProgress + 2}%)`,
          animation: scanProgress < 100 ? 'scanFlicker 0.1s infinite' : 'none'
        }}
      />

      {/* Particules holographiques */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `holoFloat ${2 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 2}s`,
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)'
            }}
          />
        ))}
      </div>

      {/* Logo avec effet holographique */}
      <div className={`relative mb-8 z-10 transition-all duration-1000 ${logoVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div 
          className={`relative ${glitchActive ? 'animate-pulse' : ''}`}
          style={{
            filter: logoVisible ? 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.6)) brightness(1.2)' : 'none',
            transform: glitchActive ? 'translateX(2px)' : 'none'
          }}
        >
          <img 
            src="/lovable-uploads/8107f4f8-aed3-4dda-9c37-698139a71449.png" 
            alt="Zyflows Logo" 
            className="h-32 w-auto object-contain"
            style={{
              filter: `hue-rotate(${glitchActive ? 180 : 0}deg) saturate(${logoVisible ? 1.5 : 1})`,
              transition: 'all 0.3s ease'
            }}
          />
          
          {/* Effet de glitch sur le logo */}
          {glitchActive && (
            <>
              <img 
                src="/lovable-uploads/8107f4f8-aed3-4dda-9c37-698139a71449.png" 
                alt="" 
                className="absolute top-0 left-0 h-32 w-auto object-contain opacity-70"
                style={{
                  filter: 'hue-rotate(120deg)',
                  transform: 'translateX(-2px) translateY(1px)',
                  mixBlendMode: 'screen'
                }}
              />
              <img 
                src="/lovable-uploads/8107f4f8-aed3-4dda-9c37-698139a71449.png" 
                alt="" 
                className="absolute top-0 left-0 h-32 w-auto object-contain opacity-70"
                style={{
                  filter: 'hue-rotate(240deg)',
                  transform: 'translateX(2px) translateY(-1px)',
                  mixBlendMode: 'screen'
                }}
              />
            </>
          )}
        </div>
        
        {/* Lignes de scan autour du logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-40 h-40 border border-cyan-400/30 rounded-full animate-spin" style={{ animationDuration: '8s' }} />
          <div className="absolute w-48 h-48 border border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
        </div>
      </div>

      {/* Texte holographique avec effet machine à écrire */}
      <div className={`text-center mb-8 transition-all duration-1000 ${textPhase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h1 className="text-4xl md:text-6xl font-mono font-bold text-cyan-300 tracking-wider mb-2 relative">
          <span 
            className="relative"
            style={{
              textShadow: '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.4)',
              animation: glitchActive ? 'textGlitch 0.3s ease-in-out' : 'none'
            }}
          >
            Zyflows
          </span>
          {/* Curseur clignotant */}
          <span className="animate-pulse text-cyan-400">|</span>
        </h1>
        
        <div className={`transition-all duration-800 ${textPhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-cyan-200/80 text-lg md:text-xl font-mono font-light">
            <span className="text-cyan-400">&gt;</span> Initializing Digital Solutions...
          </p>
          <div className="flex justify-center mt-2 space-x-1">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="w-2 h-1 bg-cyan-400 opacity-60"
                style={{
                  animation: `loadingBar 1.5s ease-in-out infinite ${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Console de chargement */}
      <div className={`font-mono text-sm text-cyan-300/70 text-center ${textPhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
        <p>&gt; Loading AI Systems... [OK]</p>
        <p>&gt; Connecting Automation Tools... [OK]</p>
        <p>&gt; Ready for Digital Innovation... [OK]</p>
      </div>

      <style>
        {`
          @keyframes holoPulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.3; }
          }
          
          @keyframes scanFlicker {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          
          @keyframes holoFloat {
            0%, 100% { 
              transform: translateY(0px) scale(1);
              opacity: 0.6;
            }
            50% { 
              transform: translateY(-20px) scale(1.2);
              opacity: 1;
            }
          }
          
          @keyframes textGlitch {
            0% { transform: translateX(0); filter: hue-rotate(0deg); }
            20% { transform: translateX(-2px); filter: hue-rotate(90deg); }
            40% { transform: translateX(2px); filter: hue-rotate(180deg); }
            60% { transform: translateX(-1px); filter: hue-rotate(270deg); }
            80% { transform: translateX(1px); filter: hue-rotate(360deg); }
            100% { transform: translateX(0); filter: hue-rotate(0deg); }
          }
          
          @keyframes loadingBar {
            0%, 100% { opacity: 0.3; transform: scaleY(0.5); }
            50% { opacity: 1; transform: scaleY(1); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;