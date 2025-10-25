/**
 * Composant Image Responsive avec support WebP multi-résolutions
 * Optimisé pour PageSpeed 90+
 */

import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes = "(max-width: 768px) 370px, (max-width: 1200px) 750px, 1920px",
  className = "",
  priority = false,
  width,
  height,
}) => {
  // Extraire le chemin de base et l'extension
  const basePath = src.replace(/\.(jpg|jpeg|png)$/i, '');
  const isHeroImage = src.includes('hero-tech');
  
  // Générer les srcset selon le type d'image
  const generateSrcSet = () => {
    if (isHeroImage) {
      return {
        webp: `${basePath}-640w.webp 640w, ${basePath}-1280w.webp 1280w, ${basePath}-1920w.webp 1920w`,
        fallback: src,
      };
    }
    
    // Pour les mockups et autres images
    return {
      webp: `${basePath}-370w.webp 370w, ${basePath}-750w.webp 750w, ${basePath}-1920w.webp 1920w`,
      fallback: src,
    };
  };

  const srcSet = generateSrcSet();

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={srcSet.webp}
        sizes={sizes}
      />
      <img
        src={srcSet.fallback}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
};

export default ResponsiveImage;
