// Sitemap Generator Script
// Run during build to generate sitemap.xml

import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://zyflows.com';
const TODAY = new Date().toISOString().split('T')[0];

// Define all routes with their configuration
const routes = [
  // Homepage - Highest Priority
  {
    path: '/',
    priority: 1.0,
    changefreq: 'weekly',
    lastmod: TODAY,
    alternates: ['en', 'fr', 'he'],
    image: {
      loc: `${SITE_URL}/lovable-uploads/95bff906-bd37-4d87-8782-3fcce7069157.png`,
      title: 'zyFlows - AI Automations and Digital Solutions'
    }
  },
  
  // Demo Pages
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
  
  // Legal Pages
  {
    path: '/accessibility-statement',
    priority: 0.5,
    changefreq: 'yearly',
    lastmod: TODAY,
    alternates: ['en', 'fr', 'he']
  },
  {
    path: '/privacy-policy',
    priority: 0.5,
    changefreq: 'yearly',
    lastmod: TODAY,
    alternates: ['en', 'fr', 'he']
  }
];

function generateUrlEntry(route) {
  let xml = `  <url>\n`;
  xml += `    <loc>${SITE_URL}${route.path}</loc>\n`;
  xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
  xml += `    <priority>${route.priority}</priority>\n`;
  
  // Add alternate language links if available
  if (route.alternates) {
    route.alternates.forEach(lang => {
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE_URL}${route.path}?lang=${lang}"/>\n`;
    });
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${route.path}"/>\n`;
  }
  
  // Add image if available
  if (route.image) {
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${route.image.loc}</image:loc>\n`;
    xml += `      <image:title>${route.image.title}</image:title>\n`;
    xml += `    </image:image>\n`;
  }
  
  xml += `  </url>\n`;
  return xml;
}

function generateSitemap() {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  sitemap += `        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n`;
  sitemap += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n`;
  
  // Add comment with generation timestamp
  sitemap += `  <!-- Generated on ${new Date().toISOString()} -->\n\n`;
  
  routes.forEach(route => {
    sitemap += generateUrlEntry(route);
    sitemap += '\n';
  });
  
  sitemap += `</urlset>`;
  
  return sitemap;
}

// Generate and write sitemap
const sitemap = generateSitemap();
const outputPath = path.resolve(process.cwd(), 'public/sitemap.xml');

fs.writeFileSync(outputPath, sitemap, 'utf-8');
console.log(`✓ Sitemap generated with ${routes.length} URLs at ${outputPath}`);
console.log(`  Last modified date: ${TODAY}`);
