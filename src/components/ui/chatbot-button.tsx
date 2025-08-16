import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './button';

interface ChatbotButtonProps {
  className?: string;
}

interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
}

const ChatbotButton: React.FC<ChatbotButtonProps> = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'bot', 
      content: language === 'fr' 
        ? "Bonjour ! Je suis l'assistant zyFlows. Comment puis-je vous aider aujourd'hui ?" 
        : language === 'en'
        ? "Hello! I'm the zyFlows assistant. How can I help you today?"
        : "שלום! אני העוזר של zyFlows. איך אני יכול לעזור לך היום?"
    }
  ]);

  // Position RTL pour hébreu
  const isRTL = language === 'he';

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage('');
    
    const newMessages: ChatMessage[] = [
      ...messages, 
      { role: 'user', content: userMessage }
    ];
    
    // Simuler une réponse automatique
    setTimeout(() => {
      const botResponse = language === 'fr' 
        ? "Merci pour votre message ! Notre équipe vous contactera bientôt via WhatsApp pour une réponse personnalisée." 
        : language === 'en'
        ? "Thank you for your message! Our team will contact you soon via WhatsApp for a personalized response."
        : "תודה על ההודעה! הצוות שלנו יצור איתך קשר בקרוב דרך WhatsApp לתגובה מותאמת אישית.";
      
      setMessages([...newMessages, { role: 'bot', content: botResponse }]);
    }, 1000);
    
    setMessages(newMessages);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '140px', // 70px (WhatsApp button height + margin) + 70px (this button height + margin)
            [isRTL ? 'left' : 'right']: '20px',
            width: '320px',
            height: '400px',
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            zIndex: 999998,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div 
            style={{
              padding: '12px 16px',
              backgroundColor: 'hsl(var(--primary))',
              color: 'hsl(var(--primary-foreground))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageCircle size={20} />
              <span style={{ fontWeight: '600', fontSize: '14px' }}>
                {language === 'fr' ? 'Assistant zyFlows' : language === 'en' ? 'zyFlows Assistant' : 'עוזר zyFlows'}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'hsl(var(--primary-foreground))',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div 
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    backgroundColor: msg.role === 'user' 
                      ? 'hsl(var(--primary))' 
                      : 'hsl(var(--muted))',
                    color: msg.role === 'user' 
                      ? 'hsl(var(--primary-foreground))' 
                      : 'hsl(var(--foreground))',
                    fontSize: '14px',
                    wordWrap: 'break-word'
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div 
            style={{
              padding: '12px',
              borderTop: '1px solid hsl(var(--border))',
              display: 'flex',
              gap: '8px'
            }}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                language === 'fr' ? 'Tapez votre message...' : 
                language === 'en' ? 'Type your message...' : 
                'הקלד את ההודעה שלך...'
              }
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                backgroundColor: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              size="sm"
              style={{
                minWidth: '40px',
                height: '36px',
                padding: '0'
              }}
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Chatbot Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '80px', // Exactement au-dessus du WhatsApp (20px + 50px + 10px spacing)
          [isRTL ? 'left' : 'right']: '20px',
          width: '50px',
          height: '50px',
          backgroundColor: 'hsl(var(--primary))',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px hsl(var(--primary) / 0.3)',
          cursor: 'pointer',
          zIndex: 999999,
          border: 'none',
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          transition: 'all 0.3s ease'
        }}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        aria-label={
          language === 'fr' ? 'Ouvrir le chat assistant' : 
          language === 'en' ? 'Open assistant chat' : 
          'פתח צ\'אט עוזר'
        }
      >
        {isOpen ? (
          <X size={24} style={{ color: 'hsl(var(--primary-foreground))' }} />
        ) : (
          <MessageCircle size={24} style={{ color: 'hsl(var(--primary-foreground))' }} />
        )}
      </div>
    </>
  );
};

export default ChatbotButton;