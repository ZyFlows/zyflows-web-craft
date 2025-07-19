import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MosaicCarouselProps {
  images: {
    src: string;
    alt: string;
    title: string;
  }[];
}

const MosaicCarousel = ({ images }: MosaicCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const imageWidth = 288; // w-72 = 288px
        const offset = 60; // chevauchement
        const scrollDistance = imageWidth - offset;
        
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % images.length;
          container.scrollTo({
            left: nextIndex * scrollDistance,
            behavior: 'smooth'
          });
          return nextIndex;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Container avec scroll horizontal */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
        <div 
          ref={scrollRef}
          className="flex gap-0 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {images.map((image, index) => (
            <div 
              key={index} 
              className="flex-none w-72 snap-start relative"
              style={{
                marginLeft: index > 0 ? '-60px' : '0'
              }}
            >
              <div className="relative overflow-hidden rounded-3xl group cursor-pointer shadow-lg h-64 transition-all duration-300 hover:scale-105 hover:z-10">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                {/* Overlay avec gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                {/* Titre */}
                <div className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="truncate">{image.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MosaicCarousel;