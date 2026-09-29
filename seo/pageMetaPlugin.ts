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
 * Depois do build, gera `dist/<página>.html` a partir do index.html, com título, descrição e
 * URL próprios. Com `cleanUrls` na Vercel, `/confession` serve `confession.html`, e os robôs
 * das redes veem a prévia da página certa. O app React continua o mesmo em todas.
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

        const file = join(outDir, `${page.path.slice(1)}.html`)
        await mkdir(dirname(file), { recursive: true })
        await writeFile(file, html)
      }
    },
  }
}
