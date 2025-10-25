/**
 * Composant pour différer le chargement des scripts tiers
 * Optimise le First Contentful Paint et Time to Interactive
 */

import { useEffect } from 'react';

export const DeferredScripts = () => {
  useEffect(() => {
    // Charger Chatbase après interaction utilisateur ou après 3 secondes
    const loadChatbase = () => {
      // Vérifier si le script n'est pas déjà chargé
      if (document.querySelector('script[src*="chatbase.co"]')) {
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://www.chatbase.co/embed.min.js';
      script.defer = true;
      script.setAttribute('chatbase-id', 'OuQmubKfLkZv7b4nBnT_J');
      script.setAttribute('domain', 'www.chatbase.co');
      document.body.appendChild(script);

      // Configuration du widget (avec cast pour éviter les erreurs TypeScript)
      (window as any).embeddedChatbotConfig = {
        chatbotId: "OuQmubKfLkZv7b4nBnT_J",
        domain: "www.chatbase.co"
      };
    };

    // Délai de 3 secondes ou au premier événement utilisateur
    const timeout = setTimeout(loadChatbase, 3000);
    
    const onInteraction = () => {
      loadChatbase();
      clearTimeout(timeout);
      // Nettoyer les event listeners
      document.removeEventListener('scroll', onInteraction);
      document.removeEventListener('click', onInteraction);
      document.removeEventListener('touchstart', onInteraction);
    };
    
    // Écouter plusieurs types d'interactions
    document.addEventListener('scroll', onInteraction, { once: true, passive: true });
    document.addEventListener('click', onInteraction, { once: true });
    document.addEventListener('touchstart', onInteraction, { once: true, passive: true });
    
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('scroll', onInteraction);
      document.removeEventListener('click', onInteraction);
      document.removeEventListener('touchstart', onInteraction);
    };
  }, []);

  return null;
};

export default DeferredScripts;
