import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bot, Send, FileText, Scale, Zap, Shield, MessageSquare, User } from "lucide-react";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const LegalGPTDemo = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Bonjour ! Je suis LegalGPT. Comment puis-je vous aider avec vos questions juridiques aujourd'hui ?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");
    setIsLoading(true);

    // Ajouter le message de l'utilisateur
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);

    try {
      const { data, error } = await supabase.functions.invoke('legal-gpt-chat', {
        

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      // Ajouter la réponse de l'assistant
      setMessages([...newMessages, { role: 'assistant', content: data.message }]);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: "Désolé, je rencontre des difficultés techniques. Veuillez réessayer." 
      }]);
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

  const features = [
    { icon: FileText, title: "Analyse de Documents", description: "Révision et analyse de contrats par IA" },
    { icon: Scale, title: "Recherche Juridique", description: "Accès instantané à la jurisprudence et aux lois" },
    { icon: Zap, title: "Réponses Rapides", description: "Obtenez des insights juridiques en quelques secondes" },
    { icon: Shield, title: "Sécurisé et Confidentiel", description: "Sécurité de niveau entreprise pour les données sensibles" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">LegalGPT</h1>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">Try Free</Button>
          </div>
        </div>
      </header>

      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">🤖 Legal AI Assistant Demo - Your Personal Legal Research Tool</p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/50">AI-Powered Legal Assistant</Badge>
          <h2 className="text-5xl font-bold text-white mb-6">Legal Research, Simplified</h2>
          <p className="text-xl text-gray-300 mb-8">Get instant answers to complex legal questions with our AI assistant</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Chat with LegalGPT
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-black/20 rounded-lg p-4 h-96 mb-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      {msg.role === 'assistant' ? (
                        <Bot className="h-6 w-6 text-purple-400 mt-1 flex-shrink-0" />
                      ) : (
                        <User className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                      )}
                      <div className={`rounded-lg p-3 max-w-[80%] ${
                        msg.role === 'assistant' 
                          ? 'bg-purple-500/20 text-white' 
                          : 'bg-blue-500/20 text-white ml-auto'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start space-x-2">
                      <Bot className="h-6 w-6 text-purple-400 mt-1 flex-shrink-0" />
                      <div className="bg-purple-500/20 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez une question juridique..."
                  disabled={isLoading}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 disabled:opacity-50"
                />
                <Button 
                  onClick={sendMessage}
                  disabled={isLoading || !message.trim()}
                  className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Powerful AI Features</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/5 border-white/10 text-center">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-black/20 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2024 LegalGPT. AI Legal Assistant Demo created with Lovable.</p>
        </div>
      </footer>
    </div>
  );
};

export default LegalGPTDemo;