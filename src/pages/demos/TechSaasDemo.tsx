import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, BarChart3, Users, Zap, Shield, Code, Cloud, 
  Rocket, CheckCircle, ArrowRight, Play, Star, TrendingUp,
  Database, Cpu, Globe, Lock
} from "lucide-react";
import DemoSEO from '@/components/DemoSEO';

const TechSaasDemo = () => {
  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState(1247);
  const [apiCalls, setApiCalls] = useState(2893456);
  const [uptime, setUptime] = useState(99.97);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 5));
      setApiCalls(prev => prev + Math.floor(Math.random() * 50));
      setUptime(prev => Math.min(99.99, prev + Math.random() * 0.01));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description: "Scalable cloud architecture with 99.9% uptime guarantee",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "End-to-end encryption with SOC2 Type II compliance",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast API",
      description: "Sub-100ms response times with global edge network",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time insights with customizable dashboards",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Database,
      title: "Smart Data Pipeline",
      description: "Automated data processing with ML-powered insights",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: Cpu,
      title: "AI-Powered Automation",
      description: "Intelligent workflows that adapt to your business",
      gradient: "from-red-500 to-pink-500"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: 29,
      description: "Perfect for small teams getting started",
      features: ["Up to 5 team members", "10GB storage", "Basic analytics", "Email support"],
      popular: false
    },
    {
      name: "Professional",
      price: 99,
      description: "For growing businesses that need more power",
      features: ["Up to 50 team members", "100GB storage", "Advanced analytics", "Priority support", "API access"],
      popular: true
    },
    {
      name: "Enterprise",
      price: 299,
      description: "For large organizations with custom needs",
      features: ["Unlimited team members", "1TB storage", "Custom analytics", "24/7 phone support", "Custom integrations", "SLA guarantee"],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO at TechFlow",
      content: "This platform revolutionized our development workflow. We've seen 300% improvement in deployment speed.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=64&h=64&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "VP Engineering at DataCorp",
      content: "The analytics capabilities are incredible. We can now make data-driven decisions in real-time.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Lead Developer at StartupXYZ",
      content: "Best investment we've made. The ROI was visible within the first month of implementation.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      rating: 5
    }
  ];

  return (
    <>
      <DemoSEO
        title="Tech SaaS Platform Demo"
        description="Interactive tech SaaS platform demo by zyFlows. Enterprise-grade cloud platform with API management, security features, analytics, and scalable infrastructure. Built for B2B tech companies."
        keywords="tech SaaS demo, cloud platform, API management, enterprise software, B2B SaaS, developer platform, SaaS template, zyFlows"
        path="/demo/tech-saas"
        demoType="SoftwareApplication"
        category="Enterprise SaaS"
        features={["Cloud Infrastructure", "API Management", "Enterprise Security", "Advanced Analytics", "Team Collaboration", "Pricing Plans"]}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white">TechFlow</h1>
              </div>
              
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Platform</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Solutions</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Docs</a>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">🚀 Tech SaaS Platform Demo - Next-Generation Development Tools</p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/50">
              ⚡ Now with AI-Powered Automation
            </Badge>
            <h2 className="text-6xl font-bold text-white mb-6">
              Build Faster,
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Deploy Smarter</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The all-in-one platform that accelerates your development workflow with intelligent automation, 
              real-time collaboration, and enterprise-grade security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8">
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                Start Free Trial
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-12 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {activeUsers.toLocaleString()}
                </div>
                <p className="text-gray-300">Active Users</p>
                <div className="flex items-center justify-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-green-400 text-sm">+12% this week</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {apiCalls.toLocaleString()}
                </div>
                <p className="text-gray-300">API Calls Today</p>
                <div className="flex items-center justify-center mt-2">
                  <Zap className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-yellow-400 text-sm">Lightning fast</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/5 border-white/10 text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {uptime.toFixed(2)}%
                </div>
                <p className="text-gray-300">System Uptime</p>
                <div className="flex items-center justify-center mt-2">
                  <Shield className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-green-400 text-sm">Enterprise ready</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-6">
              Powerful Features for Modern Development
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to build, deploy, and scale your applications with confidence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-6">
              Simple, Transparent Pricing
            </h3>
            <p className="text-xl text-gray-300">
              Choose the plan that fits your team's needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'bg-gradient-to-b from-blue-500/20 to-cyan-500/20 border-blue-500/50' : 'bg-white/5 border-white/10'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-300">/month</span>
                  </div>
                  <p className="text-gray-300 mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-6">
              Trusted by Leading Teams
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Development Workflow?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who've already accelerated their productivity
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
            Start Your Free Trial Today
            <Rocket className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 TechFlow Platform. Demo created with Lovable.
          </p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default TechSaasDemo;