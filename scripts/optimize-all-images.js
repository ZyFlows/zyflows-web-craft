// scripts/optimize-all-images.js
// Script pour optimiser automatiquement TOUTES les images identifiées par PageSpeed
// Usage: node scripts/optimize-all-images.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration basée sur le rapport PageSpeed
const IMAGES_TO_OPTIMIZE = [
  {
    input: 'public/lovable-uploads/89832acc-ee39-4d30-bb24-cf59c98cf511.png',
    outputs: [
      { width: 96, suffix: '-96w', format: 'webp', quality: 85 },
      { width: 192, suffix: '-192w', format: 'webp', quality: 85 }, // Pour Retina
    ]
  },
  {
    input: 'src/assets/hero-tech.jpg',
    outputs: [
      { width: 640, suffix: '-640w', format: 'webp', quality: 80 },
      { width: 1280, suffix: '-1280w', format: 'webp', quality: 80 },
      { width: 1920, suffix: '-1920w', format: 'webp', quality: 80 },
    ]
  },
  // Mockups - tous affichés en 370x208 mais source en 1920x997
  {
    pattern: 'mockup-bakery',
    input: 'src/assets/mockup-bakery.jpg',
    outputs: [
      { width: 370, suffix: '-370w', format: 'webp', quality: 80 },
      { width: 750, suffix: '-750w', format: 'webp', quality: 80 },
      { width: 1920, suffix: '-1920w', format: 'webp', quality: 75 },
    ]
  },
  {
    pattern: 'mockup-saas',
    input: 'src/assets/mockup-saas.jpg',
    outputs: [
      { width: 370, suffix: '-370w', format: 'webp', quality: 80 },
      { width: 750, suffix: '-750w', format: 'webp', quality: 80 },
      { width: 1920, suffix: '-1920w', format: 'webp', quality: 75 },
    ]
  },
  {
    pattern: 'mockup-professional',
    input: 'src/assets/mockup-professional.jpg',
    outputs: [
      { width: 370, suffix: '-370w', format: 'webp', quality: 80 },
      { width: 750, suffix: '-750w', format: 'webp', quality: 80 },
      { width: 1920, suffix: '-1920w', format: 'webp', quality: 75 },
    ]
  },
  {
    pattern: 'mockup-realestate',
    input: 'src/assets/mockup-realestate.jpg',
    outputs: [
      { width: 370, suffix: '-370w', format: 'webp', quality: 80 },
      { width: 750, suffix: '-750w', format: 'webp', quality: 80 },
      { width: 1920, suffix: '-1920w', format: 'webp', quality: 75 },
    ]
  },
  {
    pattern: 'mockup-custom-gpt',
    input: 'src/assets/mockup-custom-gpt.jpg',
    outputs: [
      { width: 370, suffix: '-370w', format: 'webp', quality: 80 },
      { width: 750, suffix: '-750w', format: 'webp', quality: 80 },
      { width: 1600, suffix: '-1600w', format: 'webp', quality: 75 },
    ]
  },
  {
    pattern: 'mockup-automation',
    input: 'src/assets/mockup-automation.jpg',
    outputs: [
      { width: 370, suffix: '-370w', format: 'webp', quality: 80 },
      { width: 750, suffix: '-750w', format: 'webp', quality: 80 },
      { width: 1600, suffix: '-1600w', format: 'webp', quality: 75 },
    ]
  },
  {
    pattern: 'mockup-blog',
    input: 'src/assets/mockup-blog.jpg',
    outputs: [
      { width: 370, suffix: '-370w', format: 'webp', quality: 80 },
      { width: 750, suffix: '-750w', format: 'webp', quality: 80 },
      { width: 1920, suffix: '-1920w', format: 'webp', quality: 75 },
    ]
  },
  {
    pattern: 'mockup-agency',
    input: 'src/assets/mockup-agency.jpg',
    outputs: [
      { width: 370, suffix: '-370w', format: 'webp', quality: 80 },
      { width: 750, suffix: '-750w', format: 'webp', quality: 80 },
      { width: 1920, suffix: '-1920w', format: 'webp', quality: 75 },
    ]
  },
  {
    pattern: 'mockup-portfolio',
    input: 'src/assets/mockup-portfolio.jpg',
    outputs: [
      { width: 370, suffix: '-370w', format: 'webp', quality: 80 },
      { width: 750, suffix: '-750w', format: 'webp', quality: 80 },
      { width: 1920, suffix: '-1920w', format: 'webp', quality: 75 },
    ]
  },
  {
    pattern: 'mockup-ecommerce',
    input: 'src/assets/mockup-ecommerce.jpg',
    outputs: [
      { width: 370, suffix: '-370w', format: 'webp', quality: 80 },
      { width: 750, suffix: '-750w', format: 'webp', quality: 80 },
      { width: 1920, suffix: '-1920w', format: 'webp', quality: 75 },
    ]
  },
];

// Statistiques
let stats = {
  totalOriginalSize: 0,
  totalOptimizedSize: 0,
  imagesProcessed: 0,
  imagesFailed: 0,
};

/**
 * Optimise une image avec Sharp
 */
async function optimizeImage(inputPath, outputConfig) {
  const { width, suffix, format, quality } = outputConfig;
  const inputFullPath = path.join(process.cwd(), inputPath);
  
  // Vérifier si le fichier existe
  if (!fs.existsSync(inputFullPath)) {
    console.log(`  ⚠️  Fichier non trouvé: ${inputPath}`);
    return null;
  }

  const dir = path.dirname(inputFullPath);
  const ext = path.extname(inputFullPath);
  const basename = path.basename(inputFullPath, ext);
  const outputPath = path.join(dir, `${basename}${suffix}.${format}`);

  try {
    // Obtenir la taille originale
    const originalStats = fs.statSync(inputFullPath);
    stats.totalOriginalSize += originalStats.size;

    // Optimiser
    const image = sharp(inputFullPath);
    
    await image
      .resize(width, null, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      [format]({ quality })
      .toFile(outputPath);

    // Obtenir la taille optimisée
    const optimizedStats = fs.statSync(outputPath);
    stats.totalOptimizedSize += optimizedStats.size;

    const savings = originalStats.size - optimizedStats.size;
    const savingsPercent = ((savings / originalStats.size) * 100).toFixed(1);

    console.log(`  ✅ ${basename}${suffix}.${format}`);
    console.log(`     ${formatBytes(originalStats.size)} → ${formatBytes(optimizedStats.size)} (${savingsPercent}% économie)`);

    stats.imagesProcessed++;
    return outputPath;
  } catch (error) {
    console.error(`  ❌ Erreur: ${error.message}`);
    stats.imagesFailed++;
    return null;
  }
}

/**
 * Traite toutes les images
 */
async function processAllImages() {
  console.log('🚀 Démarrage de l\'optimisation des images...\n');
  console.log(`📋 ${IMAGES_TO_OPTIMIZE.length} groupes d'images à traiter\n`);

  for (const imageGroup of IMAGES_TO_OPTIMIZE) {
    const { input, outputs, pattern } = imageGroup;
    console.log(`\n📸 Traitement: ${pattern || path.basename(input)}`);
    console.log(`   Source: ${input}`);

    for (const outputConfig of outputs) {
      await optimizeImage(input, outputConfig);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 STATISTIQUES FINALES');
  console.log('='.repeat(60));
  console.log(`✅ Images traitées: ${stats.imagesProcessed}`);
  console.log(`❌ Échecs: ${stats.imagesFailed}`);
  console.log(`📦 Taille originale totale: ${formatBytes(stats.totalOriginalSize)}`);
  console.log(`📦 Taille optimisée totale: ${formatBytes(stats.totalOptimizedSize)}`);
  console.log(`💰 Économie totale: ${formatBytes(stats.totalOriginalSize - stats.totalOptimizedSize)}`);
  console.log(`📉 Réduction: ${((stats.totalOriginalSize - stats.totalOptimizedSize) / stats.totalOriginalSize * 100).toFixed(1)}%`);
  console.log('='.repeat(60) + '\n');
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Exécution
processAllImages().catch(error => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});
