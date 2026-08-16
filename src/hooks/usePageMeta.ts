import { useEffect } from 'react';

const SITE_NAME = 'Killian Tirache';
const BASE_TITLE = 'Killian Tirache — Développeur web full-stack';

interface PageMeta {
  /** Titre de la page, sans le nom du site (ajouté automatiquement). */
  title?: string;
  description?: string;
}

function setMetaContent(selector: string, content: string) {
  const tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (tag) tag.content = content;
}

/**
 * Met à jour le titre et la description du document au changement de page.
 * Les balises Open Graph statiques d'index.html restent la référence pour les
 * aperçus de partage : elles sont lues sans exécuter le JavaScript.
 */
export default function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : BASE_TITLE;
    document.title = fullTitle;
    setMetaContent('meta[property="og:title"]', fullTitle);

    if (description) {
      setMetaContent('meta[name="description"]', description);
      setMetaContent('meta[property="og:description"]', description);
    }
  }, [title, description]);
}
