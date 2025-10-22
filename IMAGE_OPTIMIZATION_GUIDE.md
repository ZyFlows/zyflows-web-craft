# 🖼️ Guide d'Optimisation des Images

## 📋 Checklist Rapide

- [ ] Toutes les images converties en WebP
- [ ] Lazy loading sur images hors viewport initial
- [ ] Dimensions (width/height) sur toutes les images
- [ ] Image hero/LCP préchargée avec `fetchpriority="high"`
- [ ] Versions responsive (srcset) pour grandes images

---

## 🚀 Étape 1 : Installer les outils

```bash
npm install -D imagemin imagemin-webp glob
```

---

## 🔄 Étape 2 : Convertir les images

### Option A : Script automatique (Recommandé)

```bash
node scripts/convert-images-to-webp.js
```

Ce script convertit automatiquement tous les JPG/PNG en WebP.

### Option B : Manuellement

```bash
# Convertir une image spécifique
npx imagemin src/assets/hero.jpg --out-dir=src/assets --plugin=webp

# Convertir toutes les images d'un dossier
npx imagemin src/assets/*.jpg --out-dir=src/assets --plugin=webp
```

---

## 🎨 Étape 3 : Utiliser OptimizedImage

### Import du composant

```tsx
import OptimizedImage from '@/components/ui/optimized-image';
```

### Usage basique

```tsx
<OptimizedImage
  src="/assets/image.jpg"
  webpSrc="/assets/image.webp"
  alt="Description détaillée"
  width={1200}
  height={800}
/>
```

### Image critique (LCP)

Pour l'image hero ou première image visible :

```tsx
<OptimizedImage
  src="/assets/hero.jpg"
  webpSrc="/assets/hero.webp"
  alt="Hero image"
  width={1920}
  height={1080}
  priority={true}  // ⚡ Chargement immédiat
/>
```

### Image responsive

```tsx
<OptimizedImage
  src="/assets/banner.jpg"
  webpSrc="/assets/banner.webp"
  srcSet="/assets/banner-320w.webp 320w, 
          /assets/banner-640w.webp 640w, 
          /assets/banner-1024w.webp 1024w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Banner"
  width={1920}
  height={600}
/>
```

---

## 📏 Étape 4 : Créer des versions responsive

### Créer plusieurs tailles

Pour images importantes (hero, banners), créer plusieurs résolutions :

```bash
# Installer sharp (meilleur que imagemin pour resize)
npm install -D sharp

# Exemple de script (créer scripts/resize-images.js)
```

```javascript
import sharp from 'sharp';

const sizes = [320, 640, 1024, 1920];

async function resize(input) {
  for (const size of sizes) {
    await sharp(input)
      .resize(size, null, { fit: 'inside' })
      .toFile(input.replace('.jpg', `-${size}w.webp`));
    
    console.log(`✅ Créé: ${input.replace('.jpg', `-${size}w.webp`)}`);
  }
}

// Usage
resize('src/assets/hero.jpg');
```

---

## 📦 Étape 5 : Utiliser un CDN (Optionnel)

### Cloudinary (Recommandé)

```tsx
const cloudinaryUrl = (publicId: string, transforms: string) => {
  return `https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/${transforms}/${publicId}`;
};

// Usage
<img 
  src={cloudinaryUrl('hero', 'w_1200,q_auto,f_auto')}
  alt="Hero"
  loading="lazy"
/>
```

### ImgIX

```tsx
const imgixUrl = (path: string, params: Record<string, any>) => {
  const query = new URLSearchParams(params).toString();
  return `https://YOUR_DOMAIN.imgix.net${path}?${query}`;
};

// Usage
<img 
  src={imgixUrl('/hero.jpg', { w: 1200, auto: 'format,compress' })}
  alt="Hero"
/>
```

---

## 🎯 Bonnes Pratiques

### ✅ À FAIRE

1. **WebP avec fallback**
   ```tsx
   <picture>
     <source type="image/webp" srcSet="image.webp" />
     <img src="image.jpg" alt="..." />
   </picture>
   ```

2. **Dimensions explicites**
   ```tsx
   <img src="..." width="1200" height="800" alt="..." />
   ```

3. **Lazy loading par défaut**
   ```tsx
   <img src="..." loading="lazy" alt="..." />
   ```

4. **Priority pour LCP**
   ```tsx
   <img src="hero.jpg" loading="eager" fetchpriority="high" />
   ```

5. **Alt descriptifs**
   ```tsx
   <img alt="Équipe zyFlows travaillant sur un projet web" />
   ```

### ❌ À ÉVITER

1. ❌ Images sans dimensions
   ```tsx
   <img src="image.jpg" alt="..." /> // CLS!
   ```

2. ❌ Toutes les images en eager
   ```tsx
   <img src="..." loading="eager" /> // Mauvais pour performance
   ```

3. ❌ Images trop lourdes
   ```
   hero.jpg - 5MB ❌
   hero.webp - 150KB ✅
   ```

4. ❌ Alt vides ou génériques
   ```tsx
   <img alt="" /> ou <img alt="image" />
   ```

---

## 📊 Compression des Images

### Qualité recommandée

| Type | Format | Qualité | Taille |
|------|--------|---------|--------|
| Photos | WebP | 80 | 50-200KB |
| Illustrations | WebP | 85 | 20-100KB |
| Icons | SVG | - | 1-10KB |
| Screenshots | WebP | 75 | 100-300KB |

### Outils de compression

- **[TinyPNG](https://tinypng.com/)** - Compression lossy excellente
- **[Squoosh](https://squoosh.app/)** - Outil Google, compare formats
- **[ImageOptim](https://imageoptim.com/)** - macOS app
- **[SVGOMG](https://jakearchibald.github.io/svgomg/)** - Optimisation SVG

---

## 🔍 Testing

### Test Local

```bash
npm run build
npm run preview
```

Puis ouvrir Chrome DevTools > Lighthouse

### Test Production

1. **PageSpeed Insights** : https://pagespeed.web.dev/
2. **WebPageTest** : https://www.webpagetest.org/
3. **GTmetrix** : https://gtmetrix.com/

---

## 📈 Métriques à Surveiller

| Métrique | Cible | Impact Images |
|----------|-------|---------------|
| **LCP** | < 2.5s | 🔥 Critique - Précharger hero |
| **CLS** | < 0.1 | 🔥 Critique - Ajouter width/height |
| **FCP** | < 1.8s | ⚠️ Important - Lazy loading |
| **Poids Total** | < 1MB | ⚠️ Important - Compression |

---

## 💡 Astuces Pro

1. **Lazy loading conditionnel**
   ```tsx
   <img loading={isAboveFold ? 'eager' : 'lazy'} />
   ```

2. **Preload avec media query**
   ```html
   <link rel="preload" as="image" href="hero.webp" 
         media="(min-width: 768px)">
   ```

3. **Placeholder blur**
   ```tsx
   <img 
     style={{ filter: isLoaded ? 'none' : 'blur(10px)' }}
     onLoad={() => setIsLoaded(true)}
   />
   ```

4. **Intersection Observer**
   ```tsx
   import { useInView } from 'react-intersection-observer';
   
   const { ref, inView } = useInView({ triggerOnce: true });
   
   <div ref={ref}>
     {inView && <img src="..." />}
   </div>
   ```

---

## 🎓 Ressources

- [Web.dev - Optimize Images](https://web.dev/fast/#optimize-your-images)
- [WebP vs JPEG](https://developers.google.com/speed/webp/docs/webp_study)
- [Responsive Images MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Image CDNs](https://web.dev/image-cdns/)

---

## ✅ Checklist Finale

Avant de déployer :

- [ ] Toutes les images < 200KB (sauf hero ~300KB)
- [ ] Format WebP avec fallback JPG/PNG
- [ ] Lazy loading sur 90%+ des images
- [ ] Image LCP préchargée et optimisée
- [ ] Width/height sur 100% des images
- [ ] Alt tags descriptifs partout
- [ ] Testé sur PageSpeed Insights
- [ ] Score mobile > 90
- [ ] Score desktop > 95

---

**Résultat attendu** : Réduction de 60-80% du poids des images ! 🎉
