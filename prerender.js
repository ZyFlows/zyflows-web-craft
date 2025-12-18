import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

// Routes must match exactly those defined in src/App.tsx
const routesToPrerender = [
  // Main pages
  '/',
  '/accessibility-statement',
  '/privacy-policy',
  // Demo pages (nested under /demo/)
  '/demo/fashion',
  '/demo/ecommerce',
  '/demo/saas',
  '/demo/tech-saas',
  '/demo/legal-firm',
  '/demo/portfolio',
  '/demo/lifestyle-blog',
  '/demo/real-estate',
  '/demo/legal-gpt',
  '/demo/restaurant',
  '/demo/agency',
  '/demo/automation'
]

;(async () => {
  console.log('Starting pre-rendering...')
  
  for (const route of routesToPrerender) {
    try {
      const appHtml = render(route)
      const html = template.replace('<!--app-html-->', appHtml)

      // Determine output file path
      const filePath = `dist${route === '/' ? '/index' : route}.html`
      const absolutePath = toAbsolute(filePath)
      
      // Ensure directory exists (handles nested routes like /demo/fashion)
      const dir = path.dirname(absolutePath)
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
        console.log('Created directory:', dir)
      }
      
      fs.writeFileSync(absolutePath, html)
      console.log('Pre-rendered:', filePath)
    } catch (error) {
      console.error(`Failed to pre-render ${route}:`, error.message)
    }
  }
  
  console.log('Pre-rendering complete!')
})()
