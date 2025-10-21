import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Award, Zap, Globe2, Shield, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WhyChoose = () => {
  const { t, language } = useLanguage();

  const reasons = [
    {
      icon: Award,
      title: language === 'he' ? 'מומחיות טכנולוגית מתקדמת' : language === 'fr' ? 'Expertise Technologique Avancée' : 'Advanced Tech Expertise',
      description: language === 'he' 
        ? 'ישראל ידועה כ"אומת הסטארט-אפ", ואנו מביאים את החדשנות והמצוינות הטכנולוגית הזו לכל פרויקט. הצוות שלנו משלב ידע מתקדם במיוחד בפיתוח, AI, ואוטומציה עם גישה מעשית ומונחית תוצאות.'
        : language === 'fr'
        ? 'Nous apportons l\'innovation et l\'excellence technologique mondiale à chaque projet. Notre équipe combine une expertise de pointe en développement, IA et automatisation avec une approche pratique orientée résultats.'
        : 'We bring global innovation and technological excellence to every project. Our team combines cutting-edge expertise in development, AI, and automation with a practical, results-driven approach.',
      color: "text-blue-500"
    },
    {
      icon: Zap,
      title: language === 'he' ? 'פתרונות מלאים מקצה לקצה' : language === 'fr' ? 'Solutions Complètes de Bout en Bout' : 'Complete End-to-End Solutions',
      description: language === 'he'
        ? 'מהרעיון הראשוני ועד לאחזקה שוטפת, אנחנו מטפלים בכל היבט של הפרויקט הדיגיטלי שלך. פיתוח אתרים, אפליקציות מובייל, אוטומציה עסקית, שילוב AI - כל מה שאתה צריך תחת קורת גג אחת, מה שמבטיח עקביות, איכות ותקשורת חלקה.'
        : language === 'fr'
        ? 'De l\'idée initiale à la maintenance continue, nous gérons chaque aspect de votre projet digital. Développement web, applications mobiles, automatisation métier, intégration IA - tout ce dont vous avez besoin sous un même toit, garantissant cohérence, qualité et communication fluide.'
        : 'From initial concept to ongoing maintenance, we handle every aspect of your digital project. Web development, mobile apps, business automation, AI integration - everything you need under one roof, ensuring consistency, quality, and seamless communication.',
      color: "text-purple-500"
    },
    {
      icon: Shield,
      title: language === 'he' ? 'אמינות וביצועים מוכחים' : language === 'fr' ? 'Fiabilité et Performance Prouvées' : 'Proven Reliability & Performance',
      description: language === 'he'
        ? 'עם יותר מ-50 פרויקטים שהושלמו בהצלחה ו-99% שביעות רצון לקוחות, המוניטין שלנו מדבר בעד עצמו. אנחנו מספקים קוד נקי, ארכיטקטורה סקלבילית, ופתרונות מאובטחים שמתאימים לסטנדרטים הגבוהים ביותר של התעשייה. הפרויקטים שלנו נבנו כך שיחזיקו מעמד ולהתפתח עם העסק שלך.'
        : language === 'fr'
        ? 'Avec plus de 50 projets réalisés avec succès et 99% de satisfaction client, notre réputation parle d\'elle-même. Nous livrons du code propre, une architecture scalable et des solutions sécurisées qui respectent les plus hauts standards de l\'industrie. Nos projets sont construits pour durer et évoluer avec votre entreprise.'
        : 'With over 50 successfully completed projects and 99% client satisfaction, our track record speaks for itself. We deliver clean code, scalable architecture, and secure solutions that meet the highest industry standards. Our projects are built to last and grow with your business.',
      color: "text-green-500"
    },
    {
      icon: Globe2,
      title: language === 'he' ? 'תמיכה רב-לשונית ועולמית' : language === 'fr' ? 'Support Multilingue et Global' : 'Multilingual & Global Support',
      description: language === 'he'
        ? 'אנחנו עובדים עם לקוחות ברחבי העולם ומספקים תמיכה באנגלית, צרפתית ועברית. ההבנה שלנו של שווקים שונים, תרבויות ודרישות רגולטוריות מבטיחה שהפתרונות שלנו אינן רק מוכשרות מבחינה טכנית אלא גם רלוונטיות תרבותית ומותאמות לשוק היעד שלך.'
        : language === 'fr'
        ? 'Nous travaillons avec des clients du monde entier et offrons un support en anglais, français et hébreu. Notre compréhension des différents marchés, cultures et exigences réglementaires garantit que nos solutions sont non seulement techniquement compétentes mais aussi culturellement pertinentes et adaptées à votre marché cible.'
        : 'We work with clients worldwide and provide support in English, French, and Hebrew. Our understanding of different markets, cultures, and regulatory requirements ensures that our solutions are not only technically sound but also culturally relevant and tailored to your target market.',
      color: "text-orange-500"
    }
  ];

  const features = [
    language === 'he' ? 'ייעוץ ותכנון אסטרטגי ללא עלות' : language === 'fr' ? 'Consultation et planification stratégique gratuite' : 'Free strategic consultation and planning',
    language === 'he' ? 'תקשורת שקופה לאורך כל הפרויקט' : language === 'fr' ? 'Communication transparente tout au long du projet' : 'Transparent communication throughout the project',
    language === 'he' ? 'מתודולוגיה Agile עם עדכונים קבועים' : language === 'fr' ? 'Méthodologie Agile avec mises à jour régulières' : 'Agile methodology with regular updates',
    language === 'he' ? 'תמיכה טכנית מתמשכת ותחזוקה' : language === 'fr' ? 'Support technique continu et maintenance' : 'Ongoing technical support and maintenance',
    language === 'he' ? 'הדרכה מקיפה למשתמשים סופיים' : language === 'fr' ? 'Formation complète des utilisateurs finaux' : 'Comprehensive end-user training',
    language === 'he' ? 'תמחור תחרותי וגמיש' : language === 'fr' ? 'Tarification compétitive et flexible' : 'Competitive and flexible pricing'
  ];

  return (
    <section 
      id="why-choose" 
      className={`py-20 relative ${language === 'he' ? 'rtl' : ''}`}
      aria-labelledby="why-choose-title"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-6">
            <Award className={`h-4 w-4 text-primary ${language === 'he' ? 'ml-2' : 'mr-2'}`} />
            <span className="text-sm font-medium">
              {language === 'he' ? 'למה לבחור בנו' : language === 'fr' ? 'Pourquoi nous choisir' : 'Why Choose Us'}
            </span>
          </div>
          
          <h2 id="why-choose-title" className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'he' 
              ? 'ההבדל של zyFlows: חדשנות ישראלית, טווח הגעה עולמי'
              : language === 'fr'
              ? 'La différence zyFlows : Innovation technologique, portée mondiale'
              : 'The zyFlows Difference: Technological Innovation, Global Reach'
            }
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {language === 'he'
              ? 'בעידן שבו כל עסק מתחרה על תשומת לב דיגיטלית, אתה זקוק לא רק לשותף טכני אלא למישהו שמבין את החזון שלך ויש לו את המומחיות להפוך אותו למציאות. הנה למה מאות עסקים בוחרים בנו כשותפי הטרנספורמציה הדיגיטלית שלהם.'
              : language === 'fr'
              ? 'À une époque où chaque entreprise se bat pour attirer l\'attention numérique, vous avez besoin non seulement d\'un partenaire technique, mais de quelqu\'un qui comprend votre vision et possède l\'expertise pour la concrétiser. Voici pourquoi des centaines d\'entreprises nous choisissent comme partenaire de transformation digitale.'
              : 'In an era where every business competes for digital attention, you need not just a technical partner but someone who understands your vision and has the expertise to bring it to life. Here\'s why hundreds of businesses choose us as their digital transformation partner.'
            }
          </p>
        </div>

        {/* Main reasons grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <Card 
                key={index}
                className="gradient-card border-border/50 hover:border-primary/50 transition-smooth hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-lg glass-effect flex items-center justify-center mb-4 ${reason.color}`}>
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{reason.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional features */}
        <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            {language === 'he'
              ? 'מה שתקבלו בכל פרויקט'
              : language === 'fr'
              ? 'Ce que vous obtenez avec chaque projet'
              : 'What You Get with Every Project'
            }
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-3 ${language === 'he' ? 'flex-row-reverse' : ''}`}
              >
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
