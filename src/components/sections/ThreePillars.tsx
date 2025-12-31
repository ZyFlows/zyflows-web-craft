import { Bot, Zap, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import ScrollReveal from "@/components/ui/scroll-reveal";

const ThreePillars = () => {
  const { t, language } = useLanguage();

  const pillars = [
    {
      icon: Bot,
      title: language === 'fr' ? 'Agents IA & Chatbots' : language === 'he' ? 'סוכני AI וצ\'אטבוטים' : 'AI Agents & Chatbots',
      description: language === 'fr' 
        ? 'Assistants intelligents conversationnels propulsés par GPT' 
        : language === 'he'
        ? 'עוזרים שיחתיים חכמים מופעלים על ידי GPT'
        : 'GPT-powered conversational intelligent assistants',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: Zap,
      title: language === 'fr' ? 'Automatisations Intelligentes' : language === 'he' ? 'אוטומציות חכמות' : 'Intelligent Automations',
      description: language === 'fr'
        ? 'Workflows automatisés qui connectent tous vos outils'
        : language === 'he'
        ? 'זרימות עבודה אוטומטיות המחברות את כל הכלים שלך'
        : 'Automated workflows connecting all your tools',
      gradient: 'from-purple-600 to-pink-500'
    },
    {
      icon: Globe,
      title: language === 'fr' ? 'Solutions Digitales' : language === 'he' ? 'פתרונות דיגיטליים' : 'Digital Solutions',
      description: language === 'fr'
        ? 'Sites web, apps mobiles et plateformes SaaS sur mesure'
        : language === 'he'
        ? 'אתרים, אפליקציות מובייל ופלטפורמות SaaS מותאמות אישית'
        : 'Custom websites, mobile apps and SaaS platforms',
      gradient: 'from-cyan-500 to-blue-600'
    }
  ];

  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <ScrollReveal
              key={index}
              animation="fade-up"
              delay={index * 150}
              duration={600}
            >
              <div className="group relative h-full">
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                  style={{
                    background: `linear-gradient(135deg, ${pillar.gradient.includes('blue') ? '#6366f1' : pillar.gradient.includes('purple') ? '#8b5cf6' : '#06b6d4'}, ${pillar.gradient.includes('pink') ? '#ec4899' : '#8b5cf6'})`
                  }}
                />
                
                <div className="relative glass-effect rounded-2xl p-8 h-full hover:border-primary/50 transition-all duration-300 group-hover:scale-105">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <pillar.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {pillar.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreePillars;
