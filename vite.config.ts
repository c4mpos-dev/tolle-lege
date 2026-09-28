import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const DEFAULT_SITE_URL = 'https://tolle-et-lege.vercel.app'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  /*
   * Endereço público do site, usado nas tags de prévia do index.html (%VITE_SITE_URL%).
   * Vem do .env ou das variáveis da Vercel; sem nenhum dos dois, usa o domínio oficial.
   * A barra final é removida, porque o index.html já coloca a sua.
   */
  const { VITE_SITE_URL } = loadEnv(mode, process.cwd(), 'VITE_')
  process.env.VITE_SITE_URL = (VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, '')

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
