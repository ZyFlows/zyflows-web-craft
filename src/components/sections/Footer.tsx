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
    <footer className="bg-black text-white py-8 relative">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-white/80 text-sm mb-2">
            Copyright © 2024
          </p>
          <p className="text-white/80 text-sm">
            {t('footer.developed_by')}
          </p>
        </div>
        <div className="absolute top-8 right-4 text-right space-y-1">
          <div>
            <button 
              onClick={handleHomeClick}
              className="text-white hover:text-white/80 transition-colors font-medium block"
            >
              zyFlows
            </button>
          </div>
          <div>
            <button 
              onClick={handleLinkedInClick}
              className="text-white hover:text-white/80 transition-colors font-medium block"
            >
              Raphael Belhassen
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
