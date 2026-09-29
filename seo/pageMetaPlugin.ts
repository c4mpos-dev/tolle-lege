import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import type { Plugin, ResolvedConfig } from 'vite'
import { pages } from './pages.ts'

function escapeHtml(text: string) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

/** Troca o valor de um atributo numa tag do index.html; falha alto se a tag sumir. */
function replaceAttr(html: string, tag: RegExp, value: string) {
  if (!tag.test(html)) throw new Error(`pageMetaPlugin: tag não encontrada no index.html: ${tag}`)
  return html.replace(tag, (_, before: string, after: string) => `${before}${escapeHtml(value)}${after}`)
}

/**
 * Depois do build, gera `dist/<página>/index.html` a partir do index.html, com título, descrição
 * e URL próprios. A Vercel serve `/confession` a partir de `confession/index.html`, e os robôs das
 * redes veem a prévia da página certa. O app React continua o mesmo em todas.
 *
 * Também gera o `sitemap.xml` (a lista de páginas que o Google usa para achar o site todo) e o
 * `robots.txt` (que libera a leitura e aponta o sitemap), com as mesmas páginas.
 *
 * (Não usamos `cleanUrls`: ele redirecionaria qualquer `.html`, inclusive o arquivo de
 * verificação do Google Search Console, que precisa responder direto, sem redirecionamento.)
 */
export function pageMetaPlugin(siteUrl: string): Plugin {
  let config: ResolvedConfig

  return {
    name: 'tolle-lege:page-meta',
    apply: 'build',
    configResolved(resolved) {
      config = resolved
    },
    async closeBundle() {
      const outDir = config.build.outDir
      const template = await readFile(join(outDir, 'index.html'), 'utf-8')

      for (const page of pages) {
        const url = `${siteUrl}${page.path}`
        let html = template
        html = replaceAttr(html, /(<title>)[^<]*(<\/title>)/, page.title)
        html = replaceAttr(html, /(<meta\s+name="description"\s+content=")[^"]*(")/, page.description)
        html = replaceAttr(html, /(<meta\s+property="og:title"\s+content=")[^"]*(")/, page.title)
        html = replaceAttr(html, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, page.description)
        html = replaceAttr(html, /(<meta\s+property="og:url"\s+content=")[^"]*(")/, url)
        html = replaceAttr(html, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, url)

        const file = join(outDir, page.path.slice(1), 'index.html')
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, html)
      }

      const urls = ['/', ...pages.map((page) => page.path)]
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map((path) => `  <url><loc>${escapeHtml(`${siteUrl}${path}`)}</loc></url>`),
        '</urlset>',
        '',
      ].join('\n')
      await writeFile(join(outDir, 'sitemap.xml'), sitemap)
      await writeFile(join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
    },
  }
}
