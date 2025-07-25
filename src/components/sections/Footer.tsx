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
        <div className="text-center" style={{ direction: 'ltr' }}>
          <p className="text-white/80 text-sm">
            Copyright © 2025 - 
            <button 
              onClick={handleLinkedInClick}
              className="text-white hover:text-white/80 hover:underline transition-all duration-200 inline"
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
