# Guide de Conversion des Images pour PageSpeed 100/100

## 🎯 Objectif

Convertir toutes les images du site en formats modernes (AVIF + WebP) avec versions responsive pour atteindre:
- **LCP ≤ 2.5s** sur mobile
- **Poids total page ≤ 2 Mo**
- **CLS ≤ 0.05** (pas de décalage layout)

---

## 📦 Installation des outils

```bash
# Installer les outils de conversion
npm install -D sharp imagemin imagemin-avif imagemin-webp

# Pour conversion en masse
npm install -D @squoosh/cli
```

---

## 🔧 Script de Conversion Automatique

Créer `scripts/optimize-images.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const WIDTHS = [360, 480, 640, 800, 1200];
const QUALITY_AVIF = 75;
const QUALITY_WEBP = 80;
const QUALITY_JPEG = 85;

const INPUT_DIR = './src/assets';
const OUTPUT_DIR = './public/images';

async function optimizeImage(inputPath, filename) {
  const name = path.parse(filename).name;
  
  // Pour chaque largeur responsive
  for (const width of WIDTHS) {
    const input = sharp(inputPath);
    
    // AVIF (meilleure compression)
    await input
      .clone()
      .resize(width, null, { withoutEnlargement: true })
      .avif({ quality: QUALITY_AVIF })
      .toFile(`${OUTPUT_DIR}/${name}-${width}.avif`);
    
    // WebP (bon support navigateurs)
    await input
      .clone()
      .resize(width, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY_WEBP })
      .toFile(`${OUTPUT_DIR}/${name}-${width}.webp`);
    
    // JPEG fallback
    await input
      .clone()
      .resize(width, null, { withoutEnlargement: true })
      .jpeg({ quality: QUALITY_JPEG, progressive: true })
      .toFile(`${OUTPUT_DIR}/${name}-${width}.jpg`);
  }
  
  console.log(`✅ Optimisé: ${filename}`);
}

// Lire et traiter tous les fichiers
async function processAllImages() {
  const files = fs.readdirSync(INPUT_DIR)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  
  for (const file of files) {
    await optimizeImage(path.join(INPUT_DIR, file), file);
  }
  
  console.log('🎉 Toutes les images sont optimisées!');
}

processAllImages().catch(console.error);
```

**Exécuter:**

```bash
node scripts/optimize-images.js
```

---

## 📱 Configuration des Images dans le Code

### Image LCP (Hero) - CRITIQUE

```tsx
<OptimizedImage
  src="/images/hero-tech.jpg"
  alt="Technologie moderne et innovation digitale"
  width={1920}
  height={1080}
  priority={true} // EAGER LOADING
  srcset={{
    avif: "/images/hero-tech-{width}.avif",
    webp: "/images/hero-tech-{width}.webp",
    fallback: "/images/hero-tech-{width}.jpg"
  }}
  sizes="100vw" // Full width sur toutes les résolutions
/>
```

### Images standards (lazy)

```tsx
<OptimizedImage
  src="/images/mockup.jpg"
  alt="Description précise"
  width={1200}
  height={800}
  priority={false} // LAZY LOADING par défaut
  srcset={{
    webp: "/images/mockup-{width}.webp",
    fallback: "/images/mockup-{width}.jpg"
  }}
  sizes="(max-width: 600px) 90vw, (max-width: 1024px) 70vw, 1200px"
/>
```

### Images de galerie/carousel

```tsx
// Charger SEULEMENT la première image, le reste en lazy
{gallery.map((img, idx) => (
  <OptimizedImage
    key={idx}
    src={img}
    alt={`Galerie image ${idx + 1}`}
    width={800}
    height={600}
    priority={idx === 0} // Première image eager, reste lazy
    sizes="(max-width: 768px) 100vw, 50vw"
  />
))}
```

---

## 🎨 Tailles Recommandées par Usage

| Usage | Desktop | Tablet | Mobile | Qualité |
|-------|---------|--------|---------|---------|
| **Hero LCP** | 1920px | 1200px | 800px | 75-80% |
| **Images contenu** | 1200px | 800px | 640px | 75-80% |
| **Thumbnails** | 640px | 480px | 360px | 70-75% |
| **Icons/Logos** | SVG ou PNG si détails | | | |

---

## 🚫 Images à NE PAS Convertir

- **SVG** (déjà optimaux si < 20 Ko)
- **Logos avec transparence** (garder PNG optimisé)
- **Images avec texte** (risque de compression artifacts)

Pour ces cas, utiliser:

```tsx
<img 
  src="/logo.svg" 
  alt="Logo" 
  width="200" 
  height="60"
  loading="lazy"
  decoding="async"
/>
```

---

## 📊 Checklist Optimisation

### Image Hero (LCP) ✅
- [ ] Convertie en AVIF + WebP + JPEG
- [ ] Srcset avec 5 tailles (360, 480, 640, 800, 1200)
- [ ] `priority={true}` (eager loading)
- [ ] `fetchpriority="high"`
- [ ] Préchargée dans `<head>`
- [ ] Poids mobile (≤800px) ≤ 120 Ko
- [ ] Dimensions width/height définies
- [ ] Alt text descriptif

### Autres images ✅
- [ ] Toutes converties en WebP minimum
- [ ] `loading="lazy"` + `decoding="async"`
- [ ] Width/height sur chaque image
- [ ] Alt text pertinents
- [ ] Pas d'images > 80 Ko sur mobile
- [ ] Métadonnées EXIF supprimées

### Vidéos (si présentes) ✅
- [ ] Remplacées par images poster sur mobile
- [ ] `preload="metadata"` uniquement
- [ ] Pas d'autoplay sur mobile
- [ ] Poids vidéo mobile ≤ 1 Mo
- [ ] Formats H.264 MP4 optimisé

---

## 🔍 Vérification Post-Optimisation

### PageSpeed Insights

1. Tester sur: https://pagespeed.web.dev/
2. Vérifier:
   - **LCP mobile ≤ 2.5s** ✅
   - **FCP ≤ 1.8s** ✅
   - **CLS ≤ 0.05** ✅
   - **Total Blocking Time ≤ 200ms** ✅

### DevTools Network

1. Ouvrir DevTools → Network
2. Throttling: "Slow 3G"
3. Recharger la page
4. Vérifier:
   - Poids total ≤ 2 Mo
   - Image LCP chargée en priorité
   - Pas d'images lazy dans viewport initial

### Coverage (Code non utilisé)

1. DevTools → Coverage
2. Recharger la page
3. Vérifier qu'aucune image n'est chargée sans être visible

---

## 💡 Cas Particuliers

### Background Images CSS

❌ **Éviter:**
```css
.hero {
  background-image: url('/huge-image.jpg'); /* Pas de lazy loading possible */
}
```

✅ **Préférer:**
```tsx
<div className="hero">
  <OptimizedImage 
    src="/hero.jpg"
    className="absolute inset-0 object-cover"
    priority={true}
  />
</div>
```

### Images dans Markdown/CMS

Si vous utilisez un CMS, ajouter un plugin/transformer pour automatiquement:
1. Générer les versions responsive
2. Insérer le bon HTML `<picture>`
3. Ajouter width/height

---

## 📈 Résultats Attendus

Après optimisation complète:

| Métrique | Avant | Après | Gain |
|----------|-------|-------|------|
| LCP mobile | ~4.5s | ~2.2s | -51% |
| Poids page | 5.2 Mo | 1.8 Mo | -65% |
| Requêtes images | 35 | 35 | 0 |
| CLS | 0.15 | 0.02 | -87% |
| Score PageSpeed Mobile | 60 | 95+ | +58% |

---

## 🆘 Troubleshooting

### "Image ne s'affiche pas"

- Vérifier le chemin relatif: `/images/...` ou `/src/assets/...`
- S'assurer que le fichier existe après build
- Vérifier les imports dans Vite

### "CLS toujours élevé"

- Vérifier que **toutes** les images ont width/height
- Ajouter `aspect-ratio` en CSS si nécessaire
- Vérifier les fonts (FOUT peut causer CLS)

### "LCP toujours lent"

- L'image LCP est-elle vraiment préchargée?
- Le serveur utilise-t-il HTTP/2 ou HTTP/3?
- CDN configuré correctement?
- Compression Brotli activée côté serveur?

---

## 📚 Ressources

- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [WebP Best Practices](https://developers.google.com/speed/webp)
- [AVIF Guide](https://web.dev/compress-images-avif/)
- [Responsive Images MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
