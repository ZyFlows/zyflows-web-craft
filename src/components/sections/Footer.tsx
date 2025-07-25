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
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-1">
          <p className="text-white/80 text-sm">
            Copyright © 2025 
            <button 
              onClick={handleHomeClick}
              className="text-white hover:text-white/80 transition-colors ml-1"
            >
              zyFlows
            </button>
          </p>
          <p className="text-white/80 text-sm">
            {t('footer.developed_by')}
            <button 
              onClick={handleLinkedInClick}
              className="text-white hover:text-white/80 transition-colors ml-1"
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
