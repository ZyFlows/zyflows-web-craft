import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

// Sitemap Generator Plugin
function sitemapGenerator() {
  return {
    name: 'sitemap-generator',
    buildStart() {
      const SITE_URL = 'https://zyflows.com';
      const TODAY = new Date().toISOString().split('T')[0];

      const routes = [
        { path: '/', priority: 1.0, changefreq: 'weekly', lastmod: TODAY, alternates: ['en', 'fr', 'he'], image: { loc: `${SITE_URL}/lovable-uploads/95bff906-bd37-4d87-8782-3fcce7069157.png`, title: 'zyFlows - AI Automations and Digital Solutions' } },
        { path: '/demo/fashion', priority: 0.7, changefreq: 'monthly', lastmod: TODAY },
        { path: '/demo/ecommerce', priority: 0.7, changefreq: 'monthly', lastmod: TODAY },
        { path: '/demo/saas', priority: 0.7, changefreq: 'monthly', lastmod: TODAY },
        { path: '/demo/tech-saas', priority: 0.7, changefreq: 'monthly', lastmod: TODAY },
        { path: '/demo/legal-firm', priority: 0.7, changefreq: 'monthly', lastmod: TODAY },
        { path: '/demo/portfolio', priority: 0.7, changefreq: 'monthly', lastmod: TODAY },
        { path: '/demo/lifestyle-blog', priority: 0.7, changefreq: 'monthly', lastmod: TODAY },
        { path: '/demo/real-estate', priority: 0.7, changefreq: 'monthly', lastmod: TODAY },
        { path: '/demo/legal-gpt', priority: 0.7, changefreq: 'monthly', lastmod: TODAY },
        { path: '/demo/restaurant', priority: 0.7, changefreq: 'monthly', lastmod: TODAY },
        { path: '/demo/agency', priority: 0.7, changefreq: 'monthly', lastmod: TODAY },
        { path: '/demo/automation', priority: 0.7, changefreq: 'monthly', lastmod: TODAY },
        { path: '/accessibility-statement', priority: 0.5, changefreq: 'yearly', lastmod: TODAY, alternates: ['en', 'fr', 'he'] },
        { path: '/privacy-policy', priority: 0.5, changefreq: 'yearly', lastmod: TODAY, alternates: ['en', 'fr', 'he'] },
      ];

      let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;
      
      routes.forEach(route => {
        sitemap += `  <url>\n    <loc>${SITE_URL}${route.path}</loc>\n    <lastmod>${route.lastmod}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n`;
        if (route.alternates) {
          route.alternates.forEach(lang => sitemap += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE_URL}${route.path}?lang=${lang}"/>\n`);
          sitemap += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${route.path}"/>\n`;
        }
        if (route.image) {
          sitemap += `    <image:image>\n      <image:loc>${route.image.loc}</image:loc>\n      <image:title>${route.image.title}</image:title>\n    </image:image>\n`;
        }
        sitemap += `  </url>\n`;
      });
      
      sitemap += `</urlset>`;
      fs.writeFileSync(path.resolve(__dirname, 'public/sitemap.xml'), sitemap);
      console.log(`✓ Sitemap generated with ${routes.length} URLs (${TODAY})`);
    }
  };
}
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    mode === 'production' && sitemapGenerator(),
    // Compression Brotli pour production
    mode === 'production' && viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    }),
    // Compression Gzip fallback
    mode === 'production' && viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
    }),
    // Bundle analyzer
    mode === 'production' && visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-accordion',
            '@radix-ui/react-tabs',
          ],
          'icons': ['lucide-react'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash].${ext}`;
          } else if (/\.css$/i.test(assetInfo.name)) {
            return `assets/css/[name]-[hash].${ext}`;
          }
          return `assets/[name]-[hash].${ext}`;
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    reportCompressedSize: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));
