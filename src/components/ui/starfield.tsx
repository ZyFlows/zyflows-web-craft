import { useEffect, useRef, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  isNearMouse: boolean;
}

const Starfield = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const animationRef = useRef<number>();

  // Generate stars on mount
  useEffect(() => {
    const generateStars = () => {
      const starCount = 80;
      const newStars: Star[] = [];
      
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 2 + 1,
          isNearMouse: false,
        });
      }
      
      setStars(newStars);
    };

    generateStars();
  }, []);

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
    const proximityRadius = 15; // percentage of container

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
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      style={{ zIndex: 1 }}
    >
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
              ? `0 0 ${star.size * 4}px hsl(var(--primary)), 0 0 ${star.size * 8}px hsl(var(--primary) / 0.5)` 
              : `0 0 ${star.size * 2}px hsl(var(--foreground) / 0.3)`,
            animation: star.isNearMouse 
              ? 'none' 
              : `twinkle ${star.twinkleSpeed}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
      
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default Starfield;
