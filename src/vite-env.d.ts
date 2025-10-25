/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface Window {
  embeddedChatbotConfig?: {
    chatbotId: string;
    domain: string;
  };
}
