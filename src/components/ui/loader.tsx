import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete?: () => void;
  duration?: number;
}

const Loader = ({ onComplete, duration = 4000 }: LoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [magnetismActive, setMagnetismActive] = useState(false);
  const [logoFormed, setLogoFormed] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  console.log('Loader rendered - isVisible:', isVisible, 'magnetismActive:', magnetismActive);

  useEffect(() => {
    console.log('Loader useEffect started');
    
    // Séquence d'animation magnétique
    const timeline = [
      // Phase 1: Activation du magnétisme
      setTimeout(() => {
        setMagnetismActive(true);
      }, 500),

      // Phase 2: Formation du logo
      setTimeout(() => {
        setLogoFormed(true);
      }, 1800),

      // Phase 3: Texte et progression
      setTimeout(() => {
        setTextVisible(true);
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return prev + 4;
          });
        }, 40);
      }, 2200),

      // Phase 4: Sortie
      setTimeout(() => {
        setAnimateOut(true);
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 800);
      }, duration),
    ];

    return () => timeline.forEach(timer => clearTimeout(timer));
  }, [duration, onComplete]);

  if (!isVisible) return null;

  // Générer les particules avec positions prédéfinies
  const generateParticles = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      targetX: 50 + (Math.cos((i / count) * Math.PI * 2) * 15),
      targetY: 50 + (Math.sin((i / count) * Math.PI * 2) * 15),
      delay: Math.random() * 1000,
      size: Math.random() * 3 + 1,
    }));
  };

  const particles = generateParticles(40);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-800 backdrop-blur-md ${
        animateOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
      style={{
        background: `
          radial-gradient(circle at 50% 50%, hsl(258 90% 66% / 0.1) 0%, transparent 70%),
          radial-gradient(circle at 20% 80%, hsl(184 90% 56% / 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, hsl(258 90% 66% / 0.08) 0%, transparent 50%),
          rgba(36, 38, 54, 0.3)
        `
      }}
    >
      {/* Champ magnétique visuel */}
      <div className="absolute inset-0 overflow-hidden">
        {magnetismActive && (
          <div className="absolute inset-0">
            {/* Lignes de champ magnétique */}
            <svg className="w-full h-full opacity-20" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="magnetGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(258 90% 66%)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              {[...Array(8)].map((_, i) => (
                <ellipse
                  key={i}
                  cx="50"
                  cy="50"
                  rx={15 + i * 5}
                  ry={10 + i * 3}
                  fill="none"
                  stroke="url(#magnetGradient)"
                  strokeWidth="0.5"
                  className="animate-pulse"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: '2s'
                  }}
                />
              ))}
            </svg>
          </div>
        )}
      </div>

      {/* Particules magnétiques */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: magnetismActive && logoFormed ? `${particle.targetX}%` : `${particle.initialX}%`,
              top: magnetismActive && logoFormed ? `${particle.targetY}%` : `${particle.initialY}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              transition: `all ${1 + Math.random()}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${particle.delay}ms`,
              boxShadow: magnetismActive ? `0 0 ${particle.size * 4}px hsl(258 90% 66% / 0.8)` : 'none',
              opacity: magnetismActive ? 1 : 0.3,
            }}
          />
        ))}
      </div>

      {/* Logo central avec effet magnétique */}
      <div className={`relative mb-8 z-10 transition-all duration-1000 ${logoFormed ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <div 
          className="relative"
          style={{
            filter: logoFormed ? 'drop-shadow(0 0 30px hsl(258 90% 66% / 0.6)) brightness(1.2)' : 'drop-shadow(0 0 10px hsl(258 90% 66% / 0.3))',
          }}
        >
          <img 
            src="/lovable-uploads/8107f4f8-aed3-4dda-9c37-698139a71449.png" 
            alt="Zyflows Logo" 
            className="h-32 w-auto object-contain"
            style={{
              filter: `saturate(${logoFormed ? 1.3 : 1})`,
              transition: 'all 1s ease'
            }}
          />
        </div>
        
        {/* Champ magnétique autour du logo */}
        {magnetismActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="absolute w-40 h-40 border border-primary/20 rounded-full"
              style={{
                animation: 'magneticPulse 2s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute w-48 h-48 border border-secondary/15 rounded-full"
              style={{
                animation: 'magneticPulse 2.5s ease-in-out infinite reverse'
              }}
            />
          </div>
        )}
      </div>

      {/* Texte et informations */}
      <div className={`text-center mb-6 transition-all duration-1000 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h1 className="text-4xl md:text-6xl font-bold text-primary tracking-wider mb-2">
          Zyflows
        </h1>
        <p className="text-secondary/80 text-lg md:text-xl font-light">
          Connecting Digital Solutions
        </p>
      </div>

      {/* Barre de connexion */}
      <div className={`w-80 max-w-sm mx-auto mb-4 transition-all duration-800 ${textVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-all duration-300 ease-out"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 10px hsl(258 90% 66% / 0.5)'
            }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
          <span>Establishing connections...</span>
          <span className="font-mono">{progress}%</span>
        </div>
      </div>

      {/* Indicateurs de connexion */}
      <div className={`flex space-x-2 transition-all duration-800 ${textVisible ? 'opacity-100' : 'opacity-0'}`}>
        {['API', 'Automation', 'Database'].map((item, i) => (
          <div 
            key={item}
            className={`px-3 py-1 rounded-full text-xs font-mono border transition-all duration-500 ${
              progress > (i + 1) * 25 
                ? 'bg-primary/20 border-primary text-primary' 
                : 'bg-muted/20 border-muted-foreground/30 text-muted-foreground'
            }`}
            style={{
              transitionDelay: `${i * 200}ms`
            }}
          >
            {item}
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes magneticPulse {
            0%, 100% { 
              transform: scale(1);
              opacity: 0.3;
            }
            50% { 
              transform: scale(1.1);
              opacity: 0.6;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;