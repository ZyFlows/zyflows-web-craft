import React, { useState, useEffect, useRef } from 'react';

interface CarouselItem {
  id: number;
  title: string;
  image: string;
}

interface EnhancedCarouselProps {
  items: CarouselItem[];
  onItemClick?: (item: CarouselItem) => void;
}

const EnhancedCarousel: React.FC<EnhancedCarouselProps> = ({ items, onItemClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (isDragging) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [items.length, isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current!.offsetLeft);
    setScrollLeft(carouselRef.current!.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleCardClick = (item: CarouselItem) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const isActive = diff === 0;
    const isAdjacent = Math.abs(diff) === 1;
    
    if (isActive) {
      return {
        transform: 'translateX(0px) translateZ(0px) scale(1.1)',
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 3,
      };
    } else if (isAdjacent) {
      const direction = diff > 0 ? 1 : -1;
      return {
        transform: `translateX(${direction * 50}px) translateZ(-100px) rotateY(${-direction * 15}deg) scale(0.9)`,
        filter: 'blur(1px)',
        opacity: 0.7,
        zIndex: 2,
      };
    } else {
      const direction = diff > 0 ? 1 : -1;
      return {
        transform: `translateX(${direction * 100}px) translateZ(-200px) rotateY(${-direction * 25}deg) scale(0.8)`,
        filter: 'blur(2px)',
        opacity: 0.4,
        zIndex: 1,
      };
    }
  };

  return (
    <div className="relative w-full h-96 overflow-hidden perspective-1000">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex items-center justify-center h-full cursor-grab select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {items.map((item, index) => {
          const cardStyle = getCardStyle(index);
          return (
            <div
              key={item.id}
              className="absolute w-64 h-80 rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out transform-gpu"
              style={cardStyle}
              onClick={() => handleCardClick(item)}
            >
              {/* Card Background Image */}
              <div
                className="w-full h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Card Title */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-lg font-semibold text-center leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-gradient-to-r from-pink-500 to-blue-500 w-6'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>

      {/* Navigation Arrows (hidden on mobile) */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hidden md:flex"
        onClick={() => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hidden md:flex"
        onClick={() => setCurrentIndex((prev) => (prev + 1) % items.length)}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default EnhancedCarousel;