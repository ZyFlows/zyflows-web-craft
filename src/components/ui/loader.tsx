import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete?: () => void;
  duration?: number;
}

const Loader = ({ onComplete, duration = 4000 }: LoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logoScale, setLogoScale] = useState(0.5);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    // Animation séquentielle
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 50);

    // Logo animation
    setTimeout(() => setLogoScale(1), 300);
    setTimeout(() => setTextVisible(true), 800);

    const timer = setTimeout(() => {
      setAnimateOut(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 800);
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-800 ${
        animateOut ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
      style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3), transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3), transparent 50%),
          linear-gradient(135deg, #000428 0%, #004e92 100%)
        `
      }}
    >
      {/* Particules flottantes en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Logo avec animations interactives */}
      <div className="relative mb-8 z-10">
        <div 
          className={`transition-all duration-1000 ease-out ${
            logoScale === 1 ? 'transform-none' : 'scale-50'
          }`}
          style={{
            filter: 'drop-shadow(0 0 30px rgba(255, 255, 255, 0.5))',
            transform: `scale(${logoScale}) rotate(${progress * 3.6}deg)`
          }}
        >
          <img 
            src="/lovable-uploads/8107f4f8-aed3-4dda-9c37-698139a71449.png" 
            alt="Zyflows Logo" 
            className="h-32 w-auto object-contain"
            style={{
              filter: `brightness(${1 + progress/200}) saturate(${1 + progress/100})`
            }}
          />
        </div>
        
        {/* Cercles orbitaux autour du logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-white/30 rounded-full"
              style={{
                width: `${140 + i * 40}px`,
                height: `${140 + i * 40}px`,
                animation: `spin ${3 + i}s linear infinite ${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Texte avec effet de machine à écrire */}
      <div className={`text-center mb-8 transition-all duration-1000 ${textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider mb-2">
          <span className="inline-block animate-pulse">Z</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.1s' }}>y</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.2s' }}>f</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.3s' }}>l</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.4s' }}>o</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.5s' }}>w</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.6s' }}>s</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl font-light">
          Solutions Digitales Innovantes
        </p>
      </div>

      {/* Barre de progression interactive */}
      <div className="w-80 max-w-sm mx-auto mb-4">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all duration-300 ease-out"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 20px rgba(147, 197, 253, 0.8)'
            }}
          />
        </div>
        <div className="text-center mt-2">
          <span className="text-white/70 text-sm font-mono">{progress}%</span>
        </div>
      </div>

      {/* Spinner géométrique */}
      <div className="relative">
        <div className="flex items-center justify-center">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
              style={{
                transform: `rotate(${i * 60}deg) translateY(-30px)`,
                animation: `pulse 1.5s ease-in-out infinite ${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { 
              opacity: 0.4; 
              transform: rotate(var(--rotation)) translateY(-30px) scale(0.8);
            }
            50% { 
              opacity: 1; 
              transform: rotate(var(--rotation)) translateY(-30px) scale(1.2);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;