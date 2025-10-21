import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <p 
          className="text-white/80 text-sm"
          style={{ 
            textAlign: 'center', 
            direction: 'ltr', 
            whiteSpace: 'nowrap' 
          }}
        >
          Copyright © 2025 - 
          <a 
            href="https://www.linkedin.com/in/raphael-belhassen" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-white/80 hover:underline transition-all duration-200"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            Raphael Belhassen
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
