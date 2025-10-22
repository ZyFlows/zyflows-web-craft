/**
 * Composant Image Optimisé pour PageSpeed
 * 
 * Features:
 * - Support WebP avec fallback
 * - Lazy loading natif
 * - Dimensions explicites pour éviter CLS
 * - Attributs de performance (decoding, fetchpriority)
 * 
 * Usage:
 * <OptimizedImage
 *   src="/assets/image.jpg"
 *   webpSrc="/assets/image.webp"
 *   alt="Description"
 *   width={1200}
 *   height={800}
 *   priority={false}
 * />
 */

import React from 'react';

interface OptimizedImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean; // true = eager loading pour LCP
  sizes?: string;
  srcSet?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  webpSrc,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  srcSet,
  onLoad,
  onError,
}) => {
  // Si on a une version WebP, utiliser <picture>
  if (webpSrc) {
    return (
      <picture>
        <source 
          type="image/webp" 
          srcSet={webpSrc}
          sizes={sizes}
        />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={onLoad}
          onError={onError}
        />
      </picture>
    );
  }

  // Sinon, image simple optimisée
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default OptimizedImage;
