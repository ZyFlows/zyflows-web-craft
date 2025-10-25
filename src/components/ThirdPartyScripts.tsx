import { useEffect } from 'react';

/**
 * Component to defer loading of third-party scripts
 * Loads scripts after 3 seconds or on first user interaction
 * This improves initial page load performance
 */
export const ThirdPartyScripts = () => {
  useEffect(() => {
    let scriptsLoaded = false;

    const loadScripts = () => {
      if (scriptsLoaded) return;
      scriptsLoaded = true;

      // Google Analytics (if you have a GA ID)
      // Uncomment and replace with your actual GA ID
      /*
      const gaScript = document.createElement('script');
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
      gaScript.async = true;
      document.head.appendChild(gaScript);

      const gaConfigScript = document.createElement('script');
      gaConfigScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
      `;
      document.head.appendChild(gaConfigScript);
      */

      // Add other third-party scripts here
      // Example: Facebook Pixel, Hotjar, etc.
    };

    // Load after 3 seconds
    const timeout = setTimeout(loadScripts, 3000);

    // Or load on first user interaction
    const handleInteraction = () => {
      loadScripts();
      clearTimeout(timeout);
      // Remove listeners after first interaction
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };

    // Listen for various user interactions
    document.addEventListener('click', handleInteraction);
    document.addEventListener('scroll', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('scroll', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  return null;
};
