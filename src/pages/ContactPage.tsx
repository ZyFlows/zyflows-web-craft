import Navigation from "@/components/ui/navigation";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import Contact from "@/components/sections/Contact";
import { useLanguage } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  const { language } = useLanguage();

  const metaTags = {
    fr: {
      title: "Contactez Zyflows – Demandez votre audit gratuit",
      description: "Contactez zyFlows pour discuter de votre projet. Réservez un appel gratuit ou envoyez-nous un message. Réponse garantie sous 24h. Paris & Tel Aviv."
    },
    en: {
      title: "Contact Zyflows – Request Your Free Audit",
      description: "Contact zyFlows to discuss your project. Book a free call or send us a message. Response guaranteed within 24h. Paris & Tel Aviv."
    },
    he: {
      title: "צרו קשר עם Zyflows – בקשו ייעוץ חינם",
      description: "צרו קשר עם zyFlows לדיון על הפרויקט שלכם. הזמינו שיחה חינם או שלחו לנו הודעה. מענה תוך 24 שעות. פריז ותל אביב."
    }
  };

  const meta = metaTags[language];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": meta.title,
    "description": meta.description,
    "url": "https://zyflows.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "zyFlows",
      "url": "https://zyflows.com",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+972-58-422-9255",
          "contactType": "customer service",
          "areaServed": "IL",
          "availableLanguage": ["Hebrew", "English", "French"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+33-7-69-03-58-29",
          "contactType": "customer service",
          "areaServed": "FR",
          "availableLanguage": ["French", "English"]
        }
      ],
      "email": "contact@zyflows.com",
      "address": [
        {
          "@type": "PostalAddress",
          "addressLocality": "Tel Aviv",
          "addressCountry": "IL"
        },
        {
          "@type": "PostalAddress",
          "addressLocality": "Paris",
          "addressCountry": "FR"
        }
      ]
    }
  };

  const skipLinkText = language === 'fr' 
    ? 'Aller au contenu principal' 
    : language === 'he' 
    ? 'דלג לתוכן הראשי' 
    : 'Skip to main content';

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <html lang={language} dir={language === 'he' ? 'rtl' : 'ltr'} />
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href="https://zyflows.com/contact" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content="https://zyflows.com/contact" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <a href="#main-content" className="skip-link" aria-label={skipLinkText}>
        {skipLinkText}
      </a>
      
      <header>
        <Navigation />
      </header>
      
      <main id="main-content" role="main" className="pt-20">
        <Contact />
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ContactPage;
