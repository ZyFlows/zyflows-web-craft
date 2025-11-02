import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRTL } from '@/hooks/useRTL';
import { ArrowRight } from 'lucide-react';

// Import mockups optimisés (sélection réduite)
import mockupEcommerce from "@/assets/mockup-ecommerce.jpg";
import mockupSaas from "@/assets/mockup-saas.jpg";
import mockupAutomation from "@/assets/mockup-automation.jpg";
import mockupCustomGpt from "@/assets/mockup-custom-gpt.jpg";
import mockupAgency from "@/assets/mockup-agency.jpg";
import mockupPortfolio from "@/assets/mockup-portfolio.jpg";

const Projects = () => {
  const { t } = useLanguage();
  const { isRTL } = useRTL();
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: t('projects.project1_title'),
      category: 'E-commerce',
      client: 'TechStyle Fashion',
      description: t('projects.project1_desc'),
      image: mockupEcommerce,
      tags: ['Shopify', 'React', 'Automatisation'],
      results: {
        label1: t('projects.metric1_1'),
        label2: t('projects.metric1_2'),
        label3: t('projects.metric1_3')
      }
    },
    {
      id: 2,
      title: t('projects.project2_title'),
      category: 'SaaS',
      client: 'DataFlow Analytics',
      description: t('projects.project2_desc'),
      image: mockupSaas,
      tags: ['React', 'Node.js', 'PostgreSQL'],
      results: {
        label1: t('projects.metric2_1'),
        label2: t('projects.metric2_2'),
        label3: t('projects.metric2_3')
      }
    },
    {
      id: 3,
      title: t('projects.project3_title'),
      category: t('projects.tag_automation'),
      client: 'LeadGen Pro',
      description: t('projects.project3_desc'),
      image: mockupAutomation,
      tags: ['Make', 'Google Maps API', 'CRM'],
      results: {
        label1: t('projects.metric3_1'),
        label2: t('projects.metric3_2'),
        label3: t('projects.metric3_3')
      }
    },
    {
      id: 4,
      title: t('projects.project4_title'),
      category: 'IA',
      client: 'FinTech Solutions',
      description: t('projects.project4_desc'),
      image: mockupCustomGpt,
      tags: ['GPT-4', 'Python', 'FastAPI'],
      results: {
        label1: t('projects.metric4_1'),
        label2: t('projects.metric4_2'),
        label3: t('projects.metric4_3')
      }
    },
    {
      id: 5,
      title: t('projects.project5_title'),
      category: t('projects.tag_design'),
      client: 'Studio Arch+',
      description: t('projects.project5_desc'),
      image: mockupPortfolio,
      tags: ['Framer', 'Animation', 'UX/UI'],
      results: {
        label1: t('projects.metric5_1'),
        label2: t('projects.metric5_2'),
        label3: t('projects.metric5_3')
      }
    },
    {
      id: 6,
      title: t('projects.project6_title'),
      category: t('projects.tag_automation'),
      client: 'Corporate HR Solutions',
      description: t('projects.project6_desc'),
      image: mockupAgency,
      tags: ['Zapier', 'n8n', 'Workflows'],
      results: {
        label1: t('projects.metric6_1'),
        label2: t('projects.metric6_2'),
        label3: t('projects.metric6_3')
      }
    }
  ];

  const categories = [
    'all',
    'E-commerce',
    'SaaS',
    t('projects.tag_automation'),
    'IA',
    t('projects.tag_design')
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 lg:py-28 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="text-primary font-semibold uppercase tracking-wide text-sm">
            {t('projects.badge')}
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-2 mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Filtres */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                filter === cat
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'bg-card text-foreground hover:bg-muted border border-border'
              }`}
            >
              {cat === 'all' ? t('projects.view_project').replace(' le projet', 's') : cat}
            </button>
          ))}
        </div>

        {/* Grid Projets */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-300">
                
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay au hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className={`flex items-center gap-2 text-foreground font-semibold ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span>{t('projects.view_project')}</span>
                      <ArrowRight size={20} className={`transition-transform group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'}`} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Client */}
                  <p className="text-sm text-muted-foreground mb-3">
                    Client: {project.client}
                  </p>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className={`flex flex-wrap gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {project.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-muted text-foreground text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    {Object.values(project.results).map((value, idx) => (
                      <div key={idx} className="text-center">
                        <p className="text-2xl font-bold gradient-hero bg-clip-text text-transparent">
                          {value}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {idx === 0 ? 'Performance' : idx === 1 ? 'Qualité' : 'Résultat'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-card rounded-2xl border border-border animate-fade-in-up">
          <h3 className="text-3xl font-bold mb-4">
            {t('projects.cta_title')}
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('projects.cta_desc')}
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 gradient-hero text-white font-semibold rounded-full shadow-lg hover:shadow-glow hover:scale-105 transition-all"
          >
            {t('projects.cta_button')}
            <ArrowRight size={20} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;
