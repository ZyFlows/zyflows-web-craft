import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Linkedin, Phone, User } from "lucide-react";

const Footer = () => {
  const { t, language } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
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
            <button
              onClick={() => setIsDialogOpen(true)}
              className="text-white hover:text-white/80 hover:underline transition-all duration-200 cursor-pointer bg-transparent border-none p-0 ml-1"
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Raphael Belhassen
            </button>
          </p>
        </div>
      </footer>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
              <User className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nom</p>
                <p className="font-semibold">Raphael Belhassen</p>
              </div>
            </div>
            
            <a 
              href="mailto:raphael.belhassen@gmail.com"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="font-semibold">raphael.belhassen@gmail.com</p>
              </div>
            </a>

            <a 
              href="https://www.linkedin.com/in/raphael-belhassen"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <Linkedin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">LinkedIn</p>
                <p className="font-semibold">linkedin.com/in/raphael-belhassen</p>
              </div>
            </a>

            <a 
              href="tel:+33766554565"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
            >
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                <p className="font-semibold">+33 7 66 55 45 65</p>
              </div>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;
