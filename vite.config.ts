import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * GitHub Pages ne connaît pas les routes du routeur : une URL ouverte
 * directement (ou rechargée) renvoie sa page 404. En dupliquant index.html en
 * 404.html, GitHub sert quand même l'application, qui affiche alors la bonne
 * page — /projects/1 comme la vraie page « introuvable ».
 */
function spaFallback(): Plugin {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    // Après le plugin HTML de Vite, sinon index.html n'est pas encore dans le bundle.
    enforce: 'post',
    generateBundle(_options, bundle) {
      const index = bundle['index.html']
      if (index && index.type === 'asset') {
        this.emitFile({ type: 'asset', fileName: '404.html', source: index.source })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaFallback()],
  base: '/',
})
