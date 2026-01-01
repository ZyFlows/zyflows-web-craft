import { useEffect, useRef, useState, useCallback } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  isNearMouse: boolean;
  depth: number;
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

interface MouseTrail {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  velocity: number;
  angle: number;
  isActive: boolean;
}

const Starfield = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [mouseTrail, setMouseTrail] = useState<MouseTrail>({
    x: -1000, y: -1000, prevX: -1000, prevY: -1000, velocity: 0, angle: 0, isActive: false
  });
  const [scrollY, setScrollY] = useState(0);
  const prevMousePosRef = useRef({ x: -1000, y: -1000 });

  // Responsive star count
  const getStarCount = useCallback(() => {
    if (typeof window === 'undefined') return 100;
    const width = window.innerWidth;
    if (width < 640) return 60;
    if (width < 1024) return 100;
    return 150;
  }, []);

  // Generate stars on mount
  useEffect(() => {
    const generateStars = () => {
      const starCount = getStarCount();
      const newStars: Star[] = [];
      
      for (let i = 0; i < starCount; i++) {
        const depth = Math.random() * 0.9 + 0.1;
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: depth * 3 + 1,
          opacity: depth * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 3 + 2,
          isNearMouse: false,
          depth,
        });
      }
      
      setStars(newStars);
    };

    generateStars();

    const handleResize = () => generateStars();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getStarCount]);

  // Handle scroll for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate shooting stars periodically
  const createShootingStar = useCallback(() => {
    const newShootingStar: ShootingStar = {
      id: Date.now() + Math.random(),
      startX: Math.random() * 60 + 20,
      startY: Math.random() * 30,
      angle: Math.random() * 30 + 30,
      length: Math.random() * 100 + 80,
      duration: Math.random() * 1 + 0.8,
      delay: 0,
    };
    
    setShootingStars(prev => [...prev, newShootingStar]);
    
    setTimeout(() => {
      setShootingStars(prev => prev.filter(s => s.id !== newShootingStar.id));
    }, (newShootingStar.duration + 0.5) * 1000);
  }, []);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      createShootingStar();
    }, 2000);

    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        createShootingStar();
      }
    }, 4000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [createShootingStar]);

  // Handle mouse and touch movement
  useEffect(() => {
    const updatePosition = (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      
      setMousePos({ x, y });
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
      setMouseTrail(prev => ({ ...prev, isActive: false, velocity: 0 }));
    };

    const handleTouchEnd = () => {
      setTimeout(() => {
        setMousePos({ x: -1000, y: -1000 });
        setMouseTrail(prev => ({ ...prev, isActive: false, velocity: 0 }));
      }, 300);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, []);

  // Calculate mouse trail velocity and angle
  useEffect(() => {
    const dx = mousePos.x - prevMousePosRef.current.x;
    const dy = mousePos.y - prevMousePosRef.current.y;
    const velocity = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);

    if (mousePos.x > 0 && velocity > 0.5) {
      setMouseTrail({
        x: mousePos.x,
        y: mousePos.y,
        prevX: prevMousePosRef.current.x,
        prevY: prevMousePosRef.current.y,
        velocity: Math.min(velocity, 30),
        angle,
        isActive: true,
      });
    } else if (mousePos.x < 0) {
      setMouseTrail(prev => ({ ...prev, isActive: false, velocity: 0 }));
    }

    prevMousePosRef.current = { x: mousePos.x, y: mousePos.y };
  }, [mousePos]);

  // Update stars based on mouse proximity
  useEffect(() => {
    const proximityRadius = 18;

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
      className="absolute inset-0 overflow-hidden pointer-events-auto z-[15] touch-none"
    >
      {/* Static stars with parallax */}
      {stars.map((star) => {
        const parallaxOffset = scrollY * star.depth * 0.15;
        
        return (
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
              transform: `translateY(${parallaxOffset}px)`,
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
              animationDelay: `${star.id * 0.1}s`,
              willChange: 'transform',
            }}
          />
        );
      })}

      {/* Mouse-following shooting star */}
      {mouseTrail.isActive && mouseTrail.velocity > 2 && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${mouseTrail.x}%`,
            top: `${mouseTrail.y}%`,
            width: `${Math.min(mouseTrail.velocity * 4, 100)}px`,
            height: '3px',
            background: `linear-gradient(90deg, 
              hsl(var(--primary)), 
              hsl(var(--primary) / 0.6), 
              hsl(var(--primary) / 0.2),
              transparent)`,
            transform: `rotate(${mouseTrail.angle + 180}deg) translateY(-50%)`,
            transformOrigin: 'left center',
            boxShadow: `
              0 0 8px hsl(var(--primary)), 
              0 0 16px hsl(var(--primary) / 0.5),
              0 0 24px hsl(var(--primary) / 0.3)
            `,
            borderRadius: '4px 0 0 4px',
            transition: 'width 0.1s ease-out, opacity 0.15s',
            opacity: Math.min(mouseTrail.velocity / 10, 1),
          }}
        />
      )}

      {/* Glow point at cursor */}
      {mousePos.x > 0 && (
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            width: '8px',
            height: '8px',
            transform: 'translate(-50%, -50%)',
            background: 'hsl(var(--primary))',
            boxShadow: `
              0 0 10px hsl(var(--primary)),
              0 0 20px hsl(var(--primary) / 0.7),
              0 0 30px hsl(var(--primary) / 0.4)
            `,
            opacity: mouseTrail.isActive ? 1 : 0.6,
            transition: 'opacity 0.2s',
          }}
        />
      )}

      {/* Random shooting stars */}
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
