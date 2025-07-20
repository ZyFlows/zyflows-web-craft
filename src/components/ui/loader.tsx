import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete?: () => void;
  duration?: number;
}

const Loader = ({ onComplete, duration = 3000 }: LoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateOut(true);
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 500); // Temps pour l'animation de sortie
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
        animateOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #000428 0%, #004e92 100%)'
      }}
    >
      {/* Logo Zyflows avec animation */}
      <div className="text-center mb-8">
        <h1 
          className="text-4xl md:text-6xl font-bold text-white tracking-wider animate-fade-in"
          style={{
            animation: 'fadeInPulse 2s ease-in-out infinite alternate'
          }}
        >
          Zyflows
        </h1>
      </div>

      {/* Spinner circulaire */}
      <div className="relative">
        <div 
          className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
          style={{
            animation: 'spin 1s linear infinite'
          }}
        ></div>
      </div>

      <style>
        {`
          @keyframes fadeInPulse {
            0% {
              opacity: 0.7;
              transform: scale(1);
            }
            100% {
              opacity: 1;
              transform: scale(1.02);
            }
          }
          
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;