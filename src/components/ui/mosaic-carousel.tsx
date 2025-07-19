import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MosaicCarouselProps {
  images: {
    src: string;
    alt: string;
    title: string;
  }[];
}

const MosaicCarousel = ({ images }: MosaicCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality - défilement continu plus rapide
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(images.length / 6));
    }, 2500); // Plus rapide: 2.5 secondes au lieu de 4

    return () => clearInterval(interval);
  }, [images.length, isAutoPlaying]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(images.length / itemsPerPage);

  const getCurrentImages = () => {
    const start = currentIndex * itemsPerPage;
    return images.slice(start, start + itemsPerPage);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Mosaic Grid */}
      <div className="relative h-80 md:h-96 overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-full">
          {getCurrentImages().map((image, index) => {
            // Different sizes for mosaic effect
            const getMosaicClass = (idx: number) => {
              switch (idx) {
                case 0:
                  return "col-span-2 row-span-1"; // Large horizontal
                case 1:
                  return "col-span-1 row-span-2"; // Tall vertical
                case 2:
                  return "col-span-1 row-span-1"; // Small square
                case 3:
                  return "col-span-1 row-span-1"; // Small square
                case 4:
                  return "col-span-2 row-span-1"; // Medium horizontal
                case 5:
                  return "col-span-1 row-span-1"; // Small square
                default:
                  return "col-span-1 row-span-1";
              }
            };

            return (
              <div
                key={`${currentIndex}-${index}`}
                className={cn(
                  "relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 group cursor-pointer",
                  getMosaicClass(index)
                )}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                  {image.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MosaicCarousel;