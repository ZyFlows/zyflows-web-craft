import { useState, useEffect } from 'react';
import { ArrowLeft, Zap, Users, TrendingUp, Award, Play, Pause, Eye, ThumbsUp, MessageSquare, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import DemoSEO from '@/components/DemoSEO';

const AgencyDemo = () => {
  const navigate = useNavigate();
  const [activeProjects, setActiveProjects] = useState(24);
  const [clientsServed, setClientsServed] = useState(150);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProjects(prev => prev + Math.floor(Math.random() * 3) - 1);
      setClientsServed(prev => prev + Math.floor(Math.random() * 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: Rocket,
      title: 'Stratégie Digitale',
      description: 'Développement de stratégies digitales sur mesure pour booster votre présence en ligne',
      projects: 45,
      color: 'from-blue-500 to-purple-500'
    },
    {
      icon: TrendingUp,
      title: 'Marketing Digital',
      description: 'Campagnes publicitaires ciblées et optimisation des conversions',
      projects: 38,
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Award,
      title: 'Brand Design',
      description: 'Création d\'identités visuelles fortes et mémorables',
      projects: 28,
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Users,
      title: 'Community Management',
      description: 'Gestion et animation de vos communautés sur les réseaux sociaux',
      projects: 52,
      color: 'from-pink-500 to-purple-500'
    }
  ];

  const recentWork = [
    {
      title: 'Refonte E-commerce',
      client: 'FashionHub',
      description: 'Augmentation de 300% des ventes en ligne',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
      metrics: { views: '2.5M', engagement: '+250%', conversion: '+300%' },
      category: 'E-commerce'
    },
    {
      title: 'Campagne Social Media',
      client: 'TechStart',
      description: 'Campagne virale qui a touché 5M de personnes',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      metrics: { views: '5M', engagement: '+180%', conversion: '+120%' },
      category: 'Social Media'
    },
    {
      title: 'Identité Visuelle',
      client: 'GreenLife',
      description: 'Rebranding complet pour une startup écologique',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop',
      metrics: { views: '1.2M', engagement: '+400%', conversion: '+200%' },
      category: 'Branding'
    },
    {
      title: 'Application Mobile',
      client: 'HealthApp',
      description: 'Application de santé avec 100k+ téléchargements',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      metrics: { views: '3.8M', engagement: '+320%', conversion: '+450%' },
      category: 'App Design'
    }
  ];

  const teamMembers = [
    {
      name: 'Sophie Dubois',
      role: 'Directrice Créative',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&face',
      speciality: 'Strategy & Branding'
    },
    {
      name: 'Marc Lemoine',
      role: 'Développeur Senior',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&face',
      speciality: 'Frontend & UX'
    },
    {
      name: 'Alice Martin',
      role: 'Designer UI/UX',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&face',
      speciality: 'Interface Design'
    }
  ];

  return (
    <>
      <DemoSEO
        title="Creative Agency Website Demo"
        description="Interactive creative agency website demo by zyFlows. Showcase digital services, portfolio, team members, and client testimonials. Modern agency website built with React."
        keywords="creative agency demo, digital agency, marketing agency, portfolio website, agency template, web design agency, zyFlows"
        path="/demo/agency"
        demoType="WebSite"
        category="Creative Agency"
        features={["Portfolio Showcase", "Service Catalog", "Team Profiles", "Client Testimonials", "Project Metrics", "Contact Forms"]}
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au site
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-20 animate-pulse"></div>
                <h1 className="relative text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  CreativeFlow Agency
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-center py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <p className="text-sm font-medium relative z-10">
          🚀 DÉMO INTERACTIVE - Site agence créative développé par zyFlows
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Créativité Sans Limites
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Nous transformons vos idées en expériences digitales exceptionnelles qui marquent les esprits
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-2xl hover:scale-105 transition-all duration-300">
                <Rocket className="mr-2 h-5 w-5" />
                Démarrer un projet
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 hover:scale-105 transition-all duration-300">
                <Eye className="mr-2 h-5 w-5" />
                Voir notre portfolio
              </Button>
            </div>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-indigo-600 mb-2">{activeProjects}</div>
                <div className="text-sm text-gray-600">Projets actifs</div>
                <div className="flex items-center justify-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs text-green-600">En temps réel</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-purple-600 mb-2">{clientsServed}+</div>
                <div className="text-sm text-gray-600">Clients satisfaits</div>
                <div className="flex items-center justify-center mt-2">
                  <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">+15% ce mois</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-pink-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">Taux de satisfaction</div>
                <div className="flex items-center justify-center mt-2">
                  <Award className="w-3 h-3 text-yellow-600 mr-1" />
                  <span className="text-xs text-yellow-600">Excellence</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300">
                <div className="text-3xl font-bold text-green-600 mb-2">72h</div>
                <div className="text-sm text-gray-600">Délai moyen</div>
                <div className="flex items-center justify-center mt-2">
                  <Zap className="w-3 h-3 text-orange-600 mr-1" />
                  <span className="text-xs text-orange-600">Ultra rapide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Nos Expertises
            </h3>
            <p className="text-xl text-gray-600">Des solutions digitales complètes pour votre réussite</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-xl hover:scale-105 overflow-hidden">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-indigo-600 transition-colors duration-300">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">
                    {service.projects} projets réalisés
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Work */}
      <section className="py-16 bg-gradient-to-b from-white/50 to-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Projets Récents
            </h3>
            <p className="text-xl text-gray-600">Découvrez nos dernières réalisations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentWork.map((project, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-xl overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-0 shadow-lg">
                    {project.category}
                  </Badge>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="text-xl font-bold mb-1">{project.title}</h4>
                    <p className="text-sm opacity-90">{project.client}</p>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Eye className="h-4 w-4 text-indigo-600 mr-1" />
                        <span className="text-sm font-bold text-gray-900">{project.metrics.views}</span>
                      </div>
                      <span className="text-xs text-gray-500">Vues</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <ThumbsUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-sm font-bold text-gray-900">{project.metrics.engagement}</span>
                      </div>
                      <span className="text-xs text-gray-500">Engagement</span>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <TrendingUp className="h-4 w-4 text-purple-600 mr-1" />
                        <span className="text-sm font-bold text-gray-900">{project.metrics.conversion}</span>
                      </div>
                      <span className="text-xs text-gray-500">Conversion</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                    Voir le projet
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Notre Équipe
            </h3>
            <p className="text-xl text-gray-600">Des talents passionnés à votre service</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-all duration-300">
                <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h4>
                <p className="text-indigo-600 font-medium mb-2">{member.role}</p>
                <Badge variant="outline" className="text-xs">
                  {member.speciality}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            CreativeFlow Agency
          </h3>
          <p className="text-gray-400 mb-6">Transformons ensemble vos idées en réalité digitale</p>
          <div className="flex justify-center space-x-8 text-sm mb-8">
            <span>contact.zyflows@gmail.com</span>
            <span>+33 1 23 45 67 89</span>
            <span>Paris, France</span>
          </div>
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
            <MessageSquare className="mr-2 h-4 w-4" />
            Discutons de votre projet
          </Button>
          <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500 text-sm">
            © 2024 CreativeFlow Agency. Site développé par zyFlows.
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default AgencyDemo;