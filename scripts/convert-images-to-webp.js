/**
 * Script pour convertir toutes les images en WebP
 * 
 * Installation des dépendances:
 * npm install -D imagemin imagemin-webp glob
 * 
 * Utilisation:
 * node scripts/convert-images-to-webp.js
 */

import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs';

// Configuration
const config = {
  sourceDir: 'src/assets',
  outputDir: 'src/assets',
  quality: 80, // 0-100, 80 est un bon équilibre
  extensions: ['jpg', 'jpeg', 'png'],
};

async function convertImages() {
  console.log('🖼️  Conversion des images en WebP...\n');

  try {
    // Trouver toutes les images
    const patterns = config.extensions.map(ext => 
      `${config.sourceDir}/**/*.${ext}`
    );
    
    for (const pattern of patterns) {
      const files = await glob(pattern);
      
      for (const file of files) {
        const fileName = path.basename(file, path.extname(file));
        const dirName = path.dirname(file);
        const webpPath = path.join(dirName, `${fileName}.webp`);

        // Skip si WebP existe déjà
        if (fs.existsSync(webpPath)) {
          console.log(`⏭️  Exists: ${webpPath}`);
          continue;
        }

        // Convertir en WebP
        await imagemin([file], {
          destination: dirName,
          plugins: [
            imageminWebp({
              quality: config.quality,
              method: 6, // 0-6, 6 = meilleure compression
            })
          ]
        });

        const originalSize = fs.statSync(file).size;
        const webpSize = fs.statSync(webpPath).size;
        const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);

        console.log(`✅ ${fileName}.webp (${savings}% plus petit)`);
      }
    }

    console.log('\n✨ Conversion terminée!');
    console.log('\n📝 Prochaines étapes:');
    console.log('1. Utiliser OptimizedImage component pour les nouvelles images');
    console.log('2. Remplacer les <img> par <OptimizedImage> dans les composants');
    console.log('3. Tester avec PageSpeed Insights');

  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

convertImages();
