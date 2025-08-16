import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ChatButton = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([]);

  const isRTL = language === 'he';

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setMessage('');
    
    // Simulate response
    setTimeout(() => {
      const response = language === 'he' 
        ? 'שלום! איך אוכל לעזור לך היום?' 
        : language === 'en' 
        ? 'Hello! How can I help you today?' 
        : 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?';
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed z-[60] bg-card border border-border rounded-lg shadow-lg animate-scale-in`}
          style={{
            bottom: '140px',
            [isRTL ? 'left' : 'right']: '20px',
            width: '300px',
            height: '400px',
          }}
        >
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">
              {language === 'he' ? 'צ\'אט תמיכה' : language === 'en' ? 'Support Chat' : 'Chat Support'}
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="flex flex-col h-[300px]">
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {messages.length === 0 && (
                <div className="text-muted-foreground text-sm">
                  {language === 'he' 
                    ? 'שלח לנו הודעה ונחזור אליך בהקדם!' 
                    : language === 'en' 
                    ? 'Send us a message and we\'ll get back to you soon!' 
                    : 'Envoyez-nous un message et nous vous répondrons rapidement !'}
                </div>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg text-sm ${
                    msg.isUser
                      ? 'bg-primary text-primary-foreground ml-auto max-w-[80%]'
                      : 'bg-muted text-foreground mr-auto max-w-[80%]'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={
                    language === 'he' 
                      ? 'הקלד הודעה...' 
                      : language === 'en' 
                      ? 'Type a message...' 
                      : 'Tapez un message...'
                  }
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="px-3"
                >
                  <Send size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Button - Always positioned above WhatsApp */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 flex items-center justify-center transition-all duration-300 hover:scale-105"
        style={{
          bottom: '90px', // 20px (WhatsApp margin) + 50px (WhatsApp height) + 20px (spacing) = 90px
          [isRTL ? 'left' : 'right']: '20px',
          width: '50px',
          height: '50px',
          backgroundColor: '#1a1a1a',
          borderRadius: '50%',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
        aria-label={
          language === 'he' 
            ? 'פתח צ\'אט תמיכה' 
            : language === 'en' 
            ? 'Open support chat' 
            : 'Ouvrir le chat support'
        }
      >
        {isOpen ? (
          <X size={24} color="white" />
        ) : (
          <MessageCircle size={24} color="white" />
        )}
      </button>
    </>
  );
};

export default ChatButton;