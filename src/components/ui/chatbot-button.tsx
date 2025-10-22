import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Bouton Chatbot flottant - positionné en bas à gauche
 */
const ChatbotButton: React.FC = () => {
  const { t } = useLanguage();
  
  const handleClick = () => {
    // TODO: Implémenter l'ouverture du chatbot
    console.log('Chatbot clicked');
  };

  return (
    <button
      onClick={handleClick}
      className="
        fixed z-[9999]
        
        /* Position et taille - Desktop */
        left-[25px] bottom-[25px]
        w-[56px] h-[56px]
        
        /* Position et taille - Mobile */
        max-[991px]:left-[15px] max-[991px]:bottom-[15px]
        max-[991px]:w-[46px] max-[991px]:h-[46px]
        
        /* Style */
        rounded-full
        bg-blue-600 text-white
        border-none
        cursor-pointer
        
        /* Ombre douce */
        shadow-[0_4px_12px_rgba(37,99,235,0.3)]
        max-[991px]:shadow-[0_2px_8px_rgba(37,99,235,0.25)]
        
        /* Interactions */
        transition-all duration-300
        hover:scale-[1.08] hover:shadow-[0_6px_16px_rgba(37,99,235,0.4)]
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
        active:scale-95
        
        /* Performance iOS */
        transform-gpu
        will-change-transform
        
        /* Layout interne */
        flex items-center justify-center
      "
      aria-label={t('chatbot.aria_label') || 'Ouvrir le chatbot'}
      title={t('chatbot.tooltip') || 'Discuter avec notre assistant'}
      type="button"
    >
      <MessageCircle 
        className="
          w-[28px] h-[28px]
          max-[991px]:w-[24px] max-[991px]:h-[24px]
        " 
        strokeWidth={2}
        aria-hidden="true"
      />
    </button>
  );
};

export default ChatbotButton;
