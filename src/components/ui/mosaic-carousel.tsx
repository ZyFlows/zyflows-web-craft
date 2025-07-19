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

  // Auto-play functionality - défilement plus lent et plus fluide
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(images.length / 8));
    }, 5000); // Ralenti à 5 secondes

    return () => clearInterval(interval);
  }, [images.length, isAutoPlaying]);

  const itemsPerPage = 8; // Plus d'images par page
  const totalPages = Math.ceil(images.length / itemsPerPage);

  const getCurrentImages = () => {
    const start = currentIndex * itemsPerPage;
    return images.slice(start, start + itemsPerPage);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Mosaic Grid - Style plus proche de l'image de référence */}
      <div className="relative h-96 md:h-[500px] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
        <div className="grid grid-cols-6 grid-rows-3 gap-4 h-full">
          {getCurrentImages().map((image, index) => {
            // Disposition plus organique comme dans l'image de référence
            const getMosaicClass = (idx: number) => {
              switch (idx) {
                case 0:
                  return "col-span-2 row-span-2 rounded-3xl"; // Grande image en haut à gauche
                case 1:
                  return "col-span-1 row-span-1 rounded-2xl"; // Petite à droite
                case 2:
                  return "col-span-1 row-span-1 rounded-2xl"; // Petite à droite
                case 3:
                  return "col-span-2 row-span-1 rounded-2xl"; // Moyenne horizontale
                case 4:
                  return "col-span-1 row-span-2 rounded-3xl"; // Verticale droite
                case 5:
                  return "col-span-1 row-span-1 rounded-2xl"; // Petite
                case 6:
                  return "col-span-1 row-span-1 rounded-2xl"; // Petite
                case 7:
                  return "col-span-1 row-span-1 rounded-2xl"; // Petite
                default:
                  return "col-span-1 row-span-1 rounded-2xl";
              }
            };

            return (
              <div
                key={`${currentIndex}-${index}`}
                className={cn(
                  "relative overflow-hidden transition-all duration-700 ease-in-out hover:scale-105 group cursor-pointer shadow-lg",
                  getMosaicClass(index)
                )}
                style={{
                  transform: `translateY(${Math.sin(index * 0.5) * 8}px)`, // Léger décalage vertical pour effet organique
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                {/* Overlay avec gradient plus subtil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                {/* Titre avec meilleur positionnement */}
                <div className="absolute bottom-3 left-3 right-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm bg-black/20 rounded-lg p-2">
                  <div className="truncate">{image.title}</div>
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