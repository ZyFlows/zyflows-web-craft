import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, ExternalLink, Github, Linkedin, Mail, Download,
  Palette, Code, Camera, Figma, Play, Star, Award, Users
} from "lucide-react";

const PortfolioDemo = () => {
  const navigate = useNavigate();
  const [projectsCompleted, setProjectsCompleted] = useState(47);
  const [clientsWorkedWith, setClientsWorkedWith] = useState(23);

  useEffect(() => {
    const interval = setInterval(() => {
      setProjectsCompleted(prev => prev + Math.floor(Math.random() * 2));
      setClientsWorkedWith(prev => prev + Math.floor(Math.random() * 1));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const skills = [
    { name: "UI/UX Design", level: 95, icon: Palette },
    { name: "Frontend Development", level: 90, icon: Code },
    { name: "Photography", level: 85, icon: Camera },
    { name: "Prototyping", level: 88, icon: Figma }
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Mobile App",
      category: "UI/UX Design",
      description: "Complete redesign of a fashion e-commerce platform with focus on mobile-first experience",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      tags: ["Figma", "Prototyping", "User Research"],
      featured: true,
      year: "2024"
    },
    {
      id: 2,
      title: "Brand Identity System",
      category: "Branding",
      description: "Complete brand overhaul for a sustainable tech startup including logo, guidelines, and digital assets",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      tags: ["Branding", "Logo Design", "Style Guide"],
      featured: true,
      year: "2024"
    },
    {
      id: 3,
      title: "SaaS Dashboard Interface",
      category: "Web Design",
      description: "Analytics dashboard for B2B SaaS platform with complex data visualization requirements",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tags: ["React", "Data Visualization", "UX"],
      featured: false,
      year: "2023"
    },
    {
      id: 4,
      title: "Editorial Photography",
      category: "Photography",
      description: "Fashion photography series for emerging designers showcasing sustainable fashion",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=400&fit=crop",
      tags: ["Fashion", "Editorial", "Lighting"],
      featured: false,
      year: "2023"
    },
    {
      id: 5,
      title: "Restaurant Mobile App",
      category: "App Design",
      description: "Complete mobile ordering experience with AR menu visualization and real-time tracking",
      image: "https://images.unsplash.com/photo-1512317049220-d3c6fcaf6681?w=600&h=400&fit=crop",
      tags: ["Mobile", "AR", "Food Tech"],
      featured: true,
      year: "2024"
    },
    {
      id: 6,
      title: "Corporate Website Redesign",
      category: "Web Design",
      description: "Modern, accessible website for a law firm with focus on trust and professionalism",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      tags: ["WordPress", "Accessibility", "SEO"],
      featured: false,
      year: "2023"
    }
  ];

  const testimonials = [
    {
      content: "Alex's design work is exceptional. They transformed our brand and created an experience that truly resonates with our customers.",
      author: "Sarah Chen",
      title: "Founder, EcoTech Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=64&h=64&fit=crop&crop=face"
    },
    {
      content: "Working with Alex was a game-changer for our startup. Their strategic thinking and design expertise helped us stand out in a crowded market.",
      author: "Marcus Rodriguez",
      title: "CEO, DataFlow",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
    },
    {
      content: "The attention to detail and user-centered approach resulted in a 40% increase in user engagement. Incredible work!",
      author: "Emily Watson",
      title: "Product Manager, TechFlow",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="hover:bg-purple-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                <h1 className="text-xl font-semibold text-gray-900">Alex Morgan</h1>
              </div>
              
              <nav className="hidden md:flex space-x-6">
                <a href="#work" className="text-gray-700 hover:text-purple-600 transition-colors">Work</a>
                <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors">About</a>
                <a href="#skills" className="text-gray-700 hover:text-purple-600 transition-colors">Skills</a>
                <a href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors">Contact</a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Download className="h-4 w-4 mr-2" />
                Resume
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">🎨 Creative Portfolio Demo - UI/UX Designer & Developer</p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-purple-100 text-purple-700 border-purple-200">
                Available for Projects
              </Badge>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Creative Designer &
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Front-end Developer</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                I craft beautiful, functional digital experiences that solve real problems 
                and delight users. From concept to code, I bring ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Play className="h-5 w-5 mr-2" />
                  View My Work
                </Button>
                <Button variant="outline" size="lg" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  <Mail className="h-5 w-5 mr-2" />
                  Get In Touch
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=face"
                  alt="Alex Morgan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-purple-600">{projectsCompleted}</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">{projectsCompleted}</div>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">{clientsWorkedWith}</div>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
              <p className="text-gray-600">Awards Won</p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Skills & Expertise
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A diverse skill set that bridges design and development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <skill.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{skill.name}</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{skill.level}%</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="work" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              Featured Work
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A selection of projects that showcase my design and development capabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {projects.filter(p => p.featured).map((project) => (
              <Card key={project.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="border-purple-200 text-purple-700">
                      {project.category}
                    </Badge>
                    <span className="text-sm text-gray-500">{project.year}</span>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h4>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="bg-purple-50 text-purple-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-200">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.filter(p => !p.featured).map((project) => (
              <Card key={project.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-purple-200 text-purple-700 text-xs">
                      {project.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{project.year}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <Button variant="outline" size="sm" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                    View Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-6">
              What Clients Say
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 border-white/20 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-purple-100 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-purple-200 text-sm">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Let's Work Together
          </h3>
          <p className="text-xl text-gray-300 mb-8">
            Ready to bring your next project to life? I'd love to hear about your ideas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8">
              <Mail className="h-5 w-5 mr-2" />
              Start a Project
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              <Download className="h-5 w-5 mr-2" />
              Download Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Alex Morgan. Creative Portfolio Demo created with Lovable.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioDemo;