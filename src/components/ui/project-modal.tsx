import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  X, 
  ExternalLink, 
  Calendar, 
  Users, 
  Target,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    detailedDescription: string;
    image: string;
    gallery: string[];
    tags: string[];
    metrics: string[];
    features: string[];
    duration: string;
    team: string;
    objective: string;
  };
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl border border-primary/20">
        <DialogHeader className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground">
                {project.title}
              </DialogTitle>
              <div className={`flex flex-wrap gap-2 ${language === 'he' ? 'flex-row-reverse' : ''}`}>
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <DialogClose asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* Galerie interactive */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg border border-border/50 bg-muted/30">
              <div className="relative aspect-[16/10] w-full">
                <img
                  src={project.gallery[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                
                {/* Navigation arrows */}
                {project.gallery.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background hover:scale-110 transition-all duration-300"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background hover:scale-110 transition-all duration-300"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm font-medium">
                  {currentImageIndex + 1} / {project.gallery.length}
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            {project.gallery.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {project.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`
                      relative flex-shrink-0 w-20 h-12 rounded-md overflow-hidden border-2 transition-all duration-300
                      ${index === currentImageIndex 
                        ? 'border-primary scale-105 shadow-lg shadow-primary/25' 
                        : 'border-border hover:border-primary/50 hover:scale-105'
                      }
                    `}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations du projet */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Description détaillée */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  {language === 'he' ? 'תיאור הפרויקט' : language === 'en' ? 'Project Overview' : 'Aperçu du projet'}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {project.detailedDescription}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  {language === 'he' ? 'מטרת הפרויקט' : language === 'en' ? 'Objective' : 'Objectif'}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {project.objective}
                </p>
              </div>
            </div>

            {/* Détails et métriques */}
            <div className="space-y-6">
              {/* Informations techniques */}
              <div className="grid grid-cols-1 gap-4">
                <div className="glass-effect p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">
                      {language === 'he' ? 'משך הפרויקט' : language === 'en' ? 'Duration' : 'Durée'}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{project.duration}</p>
                </div>

                <div className="glass-effect p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">
                      {language === 'he' ? 'צוות' : language === 'en' ? 'Team' : 'Équipe'}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm">{project.team}</p>
                </div>
              </div>

              {/* Métriques */}
              <div>
                <h4 className="text-lg font-semibold mb-3">
                  {language === 'he' ? 'תוצאות' : language === 'en' ? 'Results' : 'Résultats'}
                </h4>
                <div className="space-y-3">
                  {project.metrics.map((metric, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-sm text-muted-foreground">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fonctionnalités */}
              <div>
                <h4 className="text-lg font-semibold mb-3">
                  {language === 'he' ? 'תכונות עיקריות' : language === 'en' ? 'Key Features' : 'Fonctionnalités clés'}
                </h4>
                <div className="space-y-2">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/50">
            <Button className="flex-1 glow-primary">
              <ExternalLink className="h-4 w-4 mr-2" />
              {language === 'he' ? 'צפה בפרויקט החי' : language === 'en' ? 'View Live Project' : 'Voir le projet en ligne'}
            </Button>
            <Button variant="outline" className="flex-1">
              {language === 'he' ? 'פרויקט דומה' : language === 'en' ? 'Similar Project' : 'Projet similaire'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}