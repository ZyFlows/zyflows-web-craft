import { useEffect, useRef, useState, useCallback } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  isNearMouse: boolean;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  length: number;
  duration: number;
  delay: number;
}

const Starfield = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  // Generate stars on mount
  useEffect(() => {
    const generateStars = () => {
      const starCount = 150; // Increased from 80
      const newStars: Star[] = [];
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1.5, // Bigger stars (1.5-4.5px instead of 1-3px)
          opacity: Math.random() * 0.6 + 0.4, // More visible (0.4-1 instead of 0.3-0.8)
          twinkleSpeed: Math.random() * 3 + 2,
          isNearMouse: false,
        });
      }
      
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Generate shooting stars periodically
  const createShootingStar = useCallback(() => {
    const newShootingStar: ShootingStar = {
      id: Date.now() + Math.random(),
      startX: Math.random() * 60 + 20, // Start from 20-80% of width
      startY: Math.random() * 30, // Start from top 30%
      angle: Math.random() * 30 + 30, // 30-60 degrees
      length: Math.random() * 100 + 80, // 80-180px trail
      duration: Math.random() * 1 + 0.8, // 0.8-1.8s
      delay: 0,
    };
    
    setShootingStars(prev => [...prev, newShootingStar]);
    
    // Remove shooting star after animation
    setTimeout(() => {
      setShootingStars(prev => prev.filter(s => s.id !== newShootingStar.id));
    }, (newShootingStar.duration + 0.5) * 1000);
  }, []);

  useEffect(() => {
    // Initial shooting stars
    const initialDelay = setTimeout(() => {
      createShootingStar();
    }, 2000);

    // Random interval for shooting stars (every 3-8 seconds)
    const interval = setInterval(() => {
      if (Math.random() > 0.3) { // 70% chance
        createShootingStar();
      }
    }, 4000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [createShootingStar]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Update stars based on mouse proximity
  useEffect(() => {
    const proximityRadius = 18; // Increased radius

    setStars(prevStars => 
      prevStars.map(star => {
        const distance = Math.sqrt(
          Math.pow(star.x - mousePos.x, 2) + Math.pow(star.y - mousePos.y, 2)
        );
        return {
          ...star,
          isNearMouse: distance < proximityRadius,
        };
      })
    );
  }, [mousePos]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-auto z-[15]"
    >
      {/* Static stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full transition-all duration-300 ${
            star.isNearMouse 
              ? 'animate-pulse scale-150' 
              : ''
          }`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.isNearMouse 
              ? 'hsl(var(--primary))' 
              : 'hsl(var(--foreground))',
            opacity: star.isNearMouse ? 1 : star.opacity,
            boxShadow: star.isNearMouse 
              ? `0 0 ${star.size * 6}px hsl(var(--primary)), 0 0 ${star.size * 12}px hsl(var(--primary) / 0.5)` 
              : `0 0 ${star.size * 3}px hsl(var(--foreground) / 0.4)`,
            animation: star.isNearMouse 
              ? 'none' 
              : `twinkle ${star.twinkleSpeed}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((shootingStar) => (
        <div
          key={shootingStar.id}
          className="absolute shooting-star"
          style={{
            left: `${shootingStar.startX}%`,
            top: `${shootingStar.startY}%`,
            width: `${shootingStar.length}px`,
            height: '2px',
            background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.8), hsl(var(--foreground)))`,
            transform: `rotate(${shootingStar.angle}deg)`,
            animation: `shootingStarMove ${shootingStar.duration}s ease-out forwards`,
            boxShadow: `0 0 6px hsl(var(--primary)), 0 0 12px hsl(var(--primary) / 0.5)`,
            borderRadius: '50%',
          }}
        />
      ))}
      
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        
        @keyframes shootingStarMove {
          0% {
            opacity: 1;
            transform: translateX(0) translateY(0) rotate(45deg) scaleX(0.3);
          }
          20% {
            opacity: 1;
            transform: translateX(30px) translateY(30px) rotate(45deg) scaleX(1);
          }
          100% {
            opacity: 0;
            transform: translateX(200px) translateY(200px) rotate(45deg) scaleX(0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default Starfield;
