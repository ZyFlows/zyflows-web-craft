import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

const routesToPrerender = [
  '/',
  '/accessibility-statement',
  '/privacy-policy',
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
  for (const url of routesToPrerender) {
    const appHtml = render(url);
    const html = template.replace(`<!--app-html-->`, appHtml)

    const filePath = `dist${url === '/' ? '/index' : url}.html`
    
    // Create directory if it doesn't exist
    const dir = path.dirname(toAbsolute(filePath))
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    fs.writeFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }
})()
