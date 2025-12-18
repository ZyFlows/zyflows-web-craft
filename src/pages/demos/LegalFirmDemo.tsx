import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, Scale, Shield, Users, Clock, Award, Phone, Mail, 
  MapPin, CheckCircle, Quote, Calendar, FileText, Gavel
} from "lucide-react";
import DemoSEO from '@/components/DemoSEO';

const LegalFirmDemo = () => {
  const navigate = useNavigate();
  const [activeCases, setActiveCases] = useState(247);
  const [clientsSatisfied, setClientsSatisfied] = useState(1840);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCases(prev => prev + Math.floor(Math.random() * 3));
      setClientsSatisfied(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const practiceAreas = [
    {
      icon: Gavel,
      title: "Corporate Law",
      description: "Comprehensive business legal services including mergers, acquisitions, and corporate governance.",
      cases: 156
    },
    {
      icon: Shield,
      title: "Criminal Defense",
      description: "Aggressive defense representation for all criminal charges from misdemeanors to felonies.",
      cases: 89
    },
    {
      icon: Users,
      title: "Family Law",
      description: "Compassionate guidance through divorce, custody, adoption, and estate planning matters.",
      cases: 134
    },
    {
      icon: FileText,
      title: "Personal Injury",
      description: "Maximum compensation for accident victims, medical malpractice, and wrongful death cases.",
      cases: 98
    },
    {
      icon: Scale,
      title: "Employment Law",
      description: "Protection of employee rights including discrimination, harassment, and wrongful termination.",
      cases: 76
    },
    {
      icon: Award,
      title: "Intellectual Property",
      description: "Safeguarding your innovations through patents, trademarks, and copyright protection.",
      cases: 45
    }
  ];

  const attorneys = [
    {
      name: "Margaret Thompson",
      title: "Senior Partner",
      specialization: "Corporate Law & M&A",
      experience: "25+ years",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face",
      education: "Harvard Law School, J.D."
    },
    {
      name: "Robert Chen",
      title: "Partner",
      specialization: "Criminal Defense",
      experience: "18+ years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
      education: "Stanford Law School, J.D."
    },
    {
      name: "Sarah Williams",
      title: "Partner",
      specialization: "Family Law & Estate Planning",
      experience: "15+ years",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=400&h=500&fit=crop&crop=face",
      education: "Yale Law School, J.D."
    }
  ];

  const testimonials = [
    {
      content: "Thompson & Associates provided exceptional representation during our corporate merger. Their attention to detail and strategic thinking saved us millions.",
      author: "David Martinez",
      title: "CEO, TechFlow Industries",
      rating: 5
    },
    {
      content: "When I was facing serious criminal charges, Robert Chen fought tirelessly for my rights. His expertise and dedication resulted in a complete dismissal.",
      author: "Jennifer Adams",
      title: "Software Engineer",
      rating: 5
    },
    {
      content: "Sarah Williams guided us through a difficult custody battle with compassion and professionalism. We couldn't have asked for better representation.",
      author: "Michael Thompson",
      title: "Business Owner",
      rating: 5
    }
  ];

  return (
    <>
      <DemoSEO
        title="Law Firm Website Demo"
        description="Interactive law firm website demo by zyFlows. Professional legal services website with practice areas, attorney profiles, testimonials, and consultation booking. Built for legal professionals."
        keywords="law firm demo, legal website, attorney website, law practice, legal services, lawyer template, consultation booking, zyFlows"
        path="/demo/legal-firm"
        demoType="WebSite"
        category="Legal Services"
        features={["Practice Areas", "Attorney Profiles", "Client Testimonials", "Case Statistics", "Consultation Booking", "Contact Forms"]}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="hover:bg-blue-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-lg flex items-center justify-center">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-serif text-slate-900">Thompson & Associates</h1>
                  <p className="text-sm text-slate-600">Attorneys at Law</p>
                </div>
              </div>
              
              <nav className="hidden lg:flex space-x-8">
                <a href="#" className="text-slate-700 hover:text-blue-700 transition-colors font-medium">Practice Areas</a>
                <a href="#" className="text-slate-700 hover:text-blue-700 transition-colors font-medium">Our Team</a>
                <a href="#" className="text-slate-700 hover:text-blue-700 transition-colors font-medium">Case Results</a>
                <a href="#" className="text-slate-700 hover:text-blue-700 transition-colors font-medium">About</a>
                <a href="#" className="text-slate-700 hover:text-blue-700 transition-colors font-medium">Contact</a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" className="hidden md:flex border-blue-700 text-blue-700 hover:bg-blue-50">
                <Phone className="h-4 w-4 mr-2" />
                (555) 123-4567
              </Button>
              <Button className="bg-blue-700 hover:bg-blue-800">
                Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">⚖️ Professional Law Firm Demo - Trusted Legal Representation Since 1995</p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&h=1080&fit=crop')] bg-cover bg-center"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-blue-600/20 text-blue-200 border-blue-400/50">
              Rated #1 Law Firm in the Region
            </Badge>
            <h2 className="text-5xl font-serif text-white mb-6 leading-tight">
              Protecting Your Rights with 
              <span className="text-blue-300"> Uncompromising Excellence</span>
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              For over 25 years, Thompson & Associates has provided strategic legal counsel 
              and aggressive representation to individuals and businesses throughout the state.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                <Calendar className="h-5 w-5 mr-2" />
                Schedule Consultation
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                View Case Results
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">{activeCases}</div>
              <p className="text-slate-600">Active Cases</p>
              <Badge variant="secondary" className="mt-2">Growing</Badge>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">{clientsSatisfied}</div>
              <p className="text-slate-600">Satisfied Clients</p>
              <Badge variant="secondary" className="mt-2">98% Success Rate</Badge>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">25+</div>
              <p className="text-slate-600">Years Experience</p>
              <Badge variant="secondary" className="mt-2">Established</Badge>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-700 mb-2">$50M+</div>
              <p className="text-slate-600">Client Recoveries</p>
              <Badge variant="secondary" className="mt-2">Record Results</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif text-slate-900 mb-6">
              Comprehensive Legal Services
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our experienced attorneys provide expert representation across a wide range of practice areas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <area.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{area.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                      {area.cases} Cases Won
                    </Badge>
                    <Button variant="link" className="text-blue-700 hover:text-blue-800 p-0">
                      Learn More →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Attorneys */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif text-slate-900 mb-6">
              Meet Our Legal Team
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our partners bring decades of combined experience and a track record of success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {attorneys.map((attorney, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={attorney.image}
                    alt={attorney.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold text-slate-900 mb-1">{attorney.name}</h4>
                  <p className="text-blue-700 font-medium mb-2">{attorney.title}</p>
                  <p className="text-slate-600 mb-3">{attorney.specialization}</p>
                  <div className="space-y-1 text-sm text-slate-500">
                    <p>{attorney.experience} experience</p>
                    <p>{attorney.education}</p>
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-blue-200 text-blue-700 hover:bg-blue-50">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif text-white mb-6">
              Client Success Stories
            </h3>
            <p className="text-xl text-blue-100">
              What our clients say about our legal representation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 border-white/20 text-white">
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-blue-300 mb-4" />
                  <p className="text-blue-100 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-blue-200 text-sm">{testimonial.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-serif text-white mb-6">
            Ready to Discuss Your Legal Matter?
          </h3>
          <p className="text-xl text-slate-300 mb-8">
            Contact us today for a free consultation with one of our experienced attorneys
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
              <Phone className="h-5 w-5 mr-2" />
              Call (555) 123-4567
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              <Mail className="h-5 w-5 mr-2" />
              Email Consultation
            </Button>
          </div>
          <div className="flex items-center justify-center text-slate-400">
            <MapPin className="h-4 w-4 mr-2" />
            <span>123 Legal Plaza, Downtown District, City State 12345</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400">
            © 2024 Thompson & Associates. Professional Law Firm Demo created with Lovable.
          </p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default LegalFirmDemo;