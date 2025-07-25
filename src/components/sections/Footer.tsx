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
        <div className="relative">
          <div className="text-center space-y-2">
            <div className="relative">
              <p className="text-white/80 text-sm">
                Copyright © 2024
              </p>
              <button 
                onClick={handleHomeClick}
                className="absolute top-0 right-0 text-white hover:text-white/80 transition-colors font-medium"
              >
                zyFlows
              </button>
            </div>
            <div className="relative">
              <p className="text-white/80 text-sm">
                {t('footer.developed_by')}
              </p>
              <button 
                onClick={handleLinkedInClick}
                className="absolute top-0 right-0 text-white hover:text-white/80 transition-colors font-medium"
              >
                Raphael Belhassen
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
