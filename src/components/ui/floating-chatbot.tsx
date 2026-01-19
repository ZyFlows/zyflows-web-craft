import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2, Minimize2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface LeadInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  challenge: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const chatTranslations = {
  fr: {
    title: 'Assistant Zyflows',
    subtitle: 'Comment puis-je vous aider ?',
    placeholder: 'Tapez votre message...',
    welcome: 'Bonjour ! 👋 Je suis l\'assistant Zyflows. Je suis là pour comprendre vos besoins et vous mettre en contact avec notre équipe. Comment vous appelez-vous ?',
    error: 'Désolé, une erreur s\'est produite. Veuillez réessayer.',
    selectLanguage: 'Choisissez votre langue',
    leadSaved: '✅ Vos informations ont été enregistrées. Notre équipe vous contactera sous 24h.',
    leadError: '⚠️ Erreur lors de l\'enregistrement. Veuillez nous contacter directement.',
  },
  en: {
    title: 'Zyflows Assistant',
    subtitle: 'How can I help you?',
    placeholder: 'Type your message...',
    welcome: 'Hello! 👋 I\'m the Zyflows assistant. I\'m here to understand your needs and connect you with our team. What\'s your name?',
    error: 'Sorry, an error occurred. Please try again.',
    selectLanguage: 'Choose your language',
    leadSaved: '✅ Your information has been saved. Our team will contact you within 24h.',
    leadError: '⚠️ Error saving your information. Please contact us directly.',
  },
  he: {
    title: 'עוזר Zyflows',
    subtitle: 'איך אוכל לעזור לך?',
    placeholder: 'הקלד את ההודעה שלך...',
    welcome: 'שלום! 👋 אני העוזר של Zyflows. אני כאן כדי להבין את הצרכים שלך ולחבר אותך עם הצוות שלנו. מה שמך?',
    error: 'מצטער, אירעה שגיאה. אנא נסה שוב.',
    selectLanguage: 'בחר את השפה שלך',
    leadSaved: '✅ המידע שלך נשמר. הצוות שלנו יצור איתך קשר תוך 24 שעות.',
    leadError: '⚠️ שגיאה בשמירת המידע. אנא צור איתנו קשר ישירות.',
  },
};

const languageOptions = [
  { code: 'fr' as Language, label: 'Français', flag: '🇫🇷' },
  { code: 'en' as Language, label: 'English', flag: '🇬🇧' },
  { code: 'he' as Language, label: 'עברית', flag: '🇮🇱' },
];

const FloatingChatbot = () => {
  const { language: siteLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [chatLanguage, setChatLanguage] = useState<Language | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [leadInfo, setLeadInfo] = useState<Partial<LeadInfo>>({});
  const [isLeadSaved, setIsLeadSaved] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = chatLanguage ? chatTranslations[chatLanguage] : chatTranslations.en;
  const isRTL = chatLanguage === 'he';

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen && !isMinimized && chatLanguage) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized, chatLanguage]);

  const selectLanguage = (lang: Language) => {
    setChatLanguage(lang);
    const welcomeMsg = chatTranslations[lang].welcome;
    setMessages([{ role: 'assistant', content: welcomeMsg }]);
  };

  const extractLeadInfo = (allMessages: Message[]): Partial<LeadInfo> => {
    const info: Partial<LeadInfo> = { ...leadInfo };
    const userMessages = allMessages.filter(m => m.role === 'user').map(m => m.content).join(' ');
    
    // Extract email
    const emailMatch = userMessages.match(/[\w.-]+@[\w.-]+\.\w+/);
    if (emailMatch) info.email = emailMatch[0];
    
    // Extract phone (various formats including international)
    const phoneMatch = userMessages.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{2,4}[-.\s]?\d{2,4}[-.\s]?\d{0,4}/);
    if (phoneMatch && phoneMatch[0].replace(/\D/g, '').length >= 9) {
      info.phone = phoneMatch[0].trim();
    }
    
    return info;
  };

  const saveLead = async (conversationMessages: Message[]) => {
    try {
      // Extract all user messages as the challenge/request
      const userContent = conversationMessages
        .filter(m => m.role === 'user')
        .map(m => m.content)
        .join('\n');
      
      const extractedInfo = extractLeadInfo(conversationMessages);
      
      // Try to extract name from first user message
      const firstUserMsg = conversationMessages.find(m => m.role === 'user')?.content || '';
      const nameParts = firstUserMsg.split(' ').filter(p => p.length > 1 && !/[@\d]/.test(p));
      
      const leadData = {
        firstName: nameParts[0] || 'Non fourni',
        lastName: nameParts.slice(1).join(' ') || '',
        email: extractedInfo.email || 'non-fourni@temp.com',
        phone: extractedInfo.phone || '',
        challenge: userContent,
        language: chatLanguage || 'fr'
      };

      const { error } = await supabase.functions.invoke('save-lead', {
        body: leadData
      });

      if (error) {
        console.error('Error saving lead:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error saving lead:', error);
      return false;
    }
  };

  const streamChat = useCallback(async (userMessages: Message[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages, language: chatLanguage }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to get response');
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant" && prev.length > 1) {
                return prev.map((m, i) => 
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Update lead info based on conversation
    const updatedInfo = extractLeadInfo([...userMessages, { role: 'assistant', content: assistantContent }]);
    setLeadInfo(updatedInfo);

    // Check if we should save the lead (after confirmation phrases)
    const confirmationPhrases = [
      'est-ce correct', 'is this correct', 'האם זה נכון',
      'c\'est correct', 'oui', 'yes', 'כן', 'exactement', 'exactly',
      'parfait', 'perfect', 'מושלם', 'confirme', 'confirm'
    ];
    
    const lastUserMessage = userMessages[userMessages.length - 1]?.content.toLowerCase() || '';
    const hasConfirmation = confirmationPhrases.some(phrase => lastUserMessage.includes(phrase));
    
    if (hasConfirmation && !isLeadSaved && updatedInfo.email) {
      const saved = await saveLead(userMessages);
      if (saved) {
        setIsLeadSaved(true);
      }
    }

    return assistantContent;
  }, [chatLanguage, leadInfo, isLeadSaved]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !chatLanguage) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      await streamChat(newMessages);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: t.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsMinimized(false);
    } else {
      setIsOpen(true);
    }
  };

  const resetChat = () => {
    setChatLanguage(null);
    setMessages([]);
    setLeadInfo({});
    setIsLeadSaved(false);
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={cn(
          "fixed z-50 transition-all duration-300 ease-out",
          isRTL ? "left-4 sm:left-6" : "right-4 sm:right-6",
          "bottom-24 sm:bottom-28",
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        )}
        style={{ 
          width: 'min(380px, calc(100vw - 32px))',
          height: isMinimized ? '60px' : 'min(520px, calc(100vh - 160px))'
        }}
      >
        <div 
          className={cn(
            "h-full rounded-2xl shadow-2xl overflow-hidden flex flex-col",
            "bg-background/95 backdrop-blur-xl border border-border/50"
          )}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between p-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground cursor-pointer"
            onClick={() => chatLanguage && setIsMinimized(!isMinimized)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{chatLanguage ? t.title : 'Zyflows'}</h3>
                <p className="text-xs opacity-80">{chatLanguage ? t.subtitle : 'Assistant'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {chatLanguage && !isMinimized && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                  onClick={(e) => { e.stopPropagation(); resetChat(); }}
                  title="Change language"
                >
                  <Globe className="w-4 h-4" />
                </Button>
              )}
              {chatLanguage && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                  onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                onClick={(e) => { e.stopPropagation(); toggleChat(); }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Language Selection */}
          {!isMinimized && !chatLanguage && (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <Globe className="w-12 h-12 text-primary mb-4" />
              <h4 className="text-lg font-medium mb-6 text-center text-foreground">
                {chatTranslations.en.selectLanguage}
              </h4>
              <div className="flex flex-col gap-3 w-full max-w-xs">
                {languageOptions.map((option) => (
                  <Button
                    key={option.code}
                    variant="outline"
                    className="w-full py-6 text-lg justify-start gap-4 hover:bg-primary/10 hover:border-primary transition-all"
                    onClick={() => selectLanguage(option.code)}
                  >
                    <span className="text-2xl">{option.flag}</span>
                    <span>{option.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {!isMinimized && chatLanguage && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex gap-2",
                      msg.role === 'user' ? 'flex-row-reverse' : ''
                    )}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                        msg.role === 'user'
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted rounded-bl-sm"
                      )}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border/50">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t.placeholder}
                    className={cn(
                      "flex-1 bg-muted rounded-full px-4 py-2.5 text-sm",
                      "focus:outline-none focus:ring-2 focus:ring-primary/50",
                      "placeholder:text-muted-foreground"
                    )}
                    disabled={isLoading}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                  <Button
                    size="icon"
                    className="rounded-full h-10 w-10"
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                  >
                    <Send className={cn("w-4 h-4", isRTL && "rotate-180")} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Floating Button - Positioned above accessibility widget */}
      <button
        onClick={toggleChat}
        className={cn(
          "fixed z-50",
          isRTL ? "left-4 sm:left-6" : "right-4 sm:right-6",
          "bottom-20 sm:bottom-24",
          "w-14 h-14 sm:w-16 sm:h-16 rounded-full",
          "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground",
          "shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40",
          "transition-all duration-300 hover:scale-105",
          "flex items-center justify-center",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <div className={cn(
          "transition-transform duration-300",
          isOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"
        )}>
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div className={cn(
          "absolute transition-transform duration-300",
          isOpen ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        )}>
          <X className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        
        {/* Pulse animation when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
        )}
      </button>
    </>
  );
};

export default FloatingChatbot;
