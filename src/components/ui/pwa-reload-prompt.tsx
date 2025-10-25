import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { toast } from 'sonner';

/**
 * PWA Reload Prompt Component
 * Shows a toast notification when a new version is available
 */
export function PWAReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  useEffect(() => {
    if (offlineReady) {
      toast.success('Application prête à fonctionner hors ligne', {
        duration: 3000,
      });
    }
  }, [offlineReady]);

  useEffect(() => {
    if (needRefresh) {
      toast('Nouvelle version disponible', {
        description: 'Cliquez sur le bouton pour mettre à jour',
        duration: Infinity,
        action: {
          label: 'Mettre à jour',
          onClick: () => {
            updateServiceWorker(true);
            close();
          },
        },
        cancel: {
          label: 'Plus tard',
          onClick: close,
        },
      });
    }
  }, [needRefresh]);

  return null;
}
