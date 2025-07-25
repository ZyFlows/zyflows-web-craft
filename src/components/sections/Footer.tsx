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
    <footer className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Copyright © 2024 - {' '}
            <button 
              onClick={handleHomeClick}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              zyFlows
            </button>
            {' '}- {t('footer.developed_by')}{' '}
            <button 
              onClick={handleLinkedInClick}
              className="text-muted-foreground hover:text-foreground transition-colors"
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
