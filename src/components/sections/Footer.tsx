import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, language } = useLanguage();

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/raphael-belhassen-85a152283', '_blank');
  };

  return (
    <footer className={`py-8 border-t border-border/50 ${language === 'he' ? 'rtl' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            © 2024{' '}
            <button 
              onClick={handleHomeClick}
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              zyFlows
            </button>
            . כל הזכויות שמורות.
          </p>
          <p className="text-xs text-muted-foreground">
            {t('footer.developed_by')}{' '}
            <button 
              onClick={handleLinkedInClick}
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Raphael Belhassen
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
