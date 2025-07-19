import { useState, useEffect } from 'react';
import { ArrowLeft, Scale, Users, FileText, Clock, Calendar, Shield, Award, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const LegalDemo = () => {
  const navigate = useNavigate();
  const [activeCases, setActiveCases] = useState(47);
  const [consultations, setConsultations] = useState(12);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCases(prev => prev + Math.floor(Math.random() * 3) - 1);
      setConsultations(prev => Math.max(0, prev + Math.floor(Math.random() * 5) - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const practiceAreas = [
    { name: "Corporate Law", cases: 23, icon: Users, color: "bg-blue-500" },
    { name: "Criminal Defense", cases: 18, icon: Shield, color: "bg-red-500" },
    { name: "Family Law", cases: 15, icon: FileText, color: "bg-green-500" },
    { name: "Real Estate", cases: 12, icon: MapPin, color: "bg-purple-500" }
  ];

  const recentCases = [
    { client: "Johnson Corp", type: "Contract Dispute", status: "Active", attorney: "Sarah Mitchell", priority: "High" },
    { client: "Smith Family", type: "Divorce Proceedings", status: "Review", attorney: "Michael Davis", priority: "Medium" },
    { client: "Tech Startup Inc", type: "IP Protection", status: "Completed", attorney: "Emily Chen", priority: "High" },
    { client: "Real Estate Co", type: "Property Transfer", status: "Active", attorney: "David Wilson", priority: "Low" }
  ];

  const attorneys = [
    { name: "Sarah Mitchell", specialization: "Corporate Law", experience: "15 years", cases: 23, rating: 4.9 },
    { name: "Michael Davis", specialization: "Family Law", experience: "12 years", cases: 18, rating: 4.8 },
    { name: "Emily Chen", specialization: "Intellectual Property", experience: "10 years", cases: 15, rating: 4.9 },
    { name: "David Wilson", specialization: "Real Estate", experience: "8 years", cases: 12, rating: 4.7 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-slate-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Button>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-20 animate-pulse"></div>
                <h1 className="relative text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-600 bg-clip-text text-transparent animate-fade-in">
                  LegalPro Suite
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-all duration-200">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-all duration-200">
                <Mail className="h-5 w-5" />
              </Button>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  LP
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-600 text-white text-center py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <p className="text-sm font-medium relative z-10">
          ⚖️ INTERACTIVE DEMO - Legal Practice Management System by zyFlows
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Practice Dashboard
            </h2>
            <div className="flex items-center space-x-4">
              <p className="text-xl text-gray-600">Legal case management overview</p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-bold">Live System</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-2xl transition-all duration-300 border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Cases</p>
                  <p className="text-3xl font-bold text-gray-900">{activeCases}</p>
                  <div className="flex items-center mt-2">
                    <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600 font-medium">+3 this week</span>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Scale className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Consultations Today</p>
                  <p className="text-3xl font-bold text-gray-900">{consultations}</p>
                  <div className="flex items-center mt-2">
                    <Calendar className="h-3 w-3 text-blue-600 mr-1" />
                    <span className="text-xs text-blue-600 font-medium">Next: 2:30 PM</span>
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Billable Hours</p>
                  <p className="text-3xl font-bold text-gray-900">248</p>
                  <div className="flex items-center mt-2">
                    <Clock className="h-3 w-3 text-purple-600 mr-1" />
                    <span className="text-xs text-purple-600 font-medium">This month</span>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-2xl transition-all duration-300 border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-3xl font-bold text-gray-900">94%</p>
                  <div className="flex items-center mt-2">
                    <Award className="h-3 w-3 text-orange-600 mr-1" />
                    <span className="text-xs text-orange-600 font-medium">Excellent</span>
                  </div>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Practice Areas */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Practice Areas Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {practiceAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${area.color}`}>
                        <area.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{area.name}</h4>
                        <p className="text-sm text-gray-500">{area.cases} active cases</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="font-medium">
                      {area.cases}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Cases */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCases.map((case_, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{case_.client}</h5>
                      <Badge 
                        variant={case_.status === 'Completed' ? 'default' : 'secondary'}
                        className={case_.status === 'Active' ? 'bg-blue-100 text-blue-800' : ''}
                      >
                        {case_.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{case_.type}</p>
                    <p className="text-xs text-gray-500">Attorney: {case_.attorney}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attorneys Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Legal Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {attorneys.map((attorney, index) => (
                  <div key={index} className="text-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-lg hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                      {attorney.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{attorney.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{attorney.specialization}</p>
                    <p className="text-xs text-gray-500 mb-2">{attorney.experience} experience</p>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm font-medium">{attorney.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-3 h-3 rounded-full ${i < Math.floor(attorney.rating) ? 'bg-yellow-400' : 'bg-gray-300'}`}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16 mt-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-gray-400 text-lg">
            © 2024 LegalPro Suite - Platform created by <span className="text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text font-bold">zyFlows</span>
          </p>
          <p className="text-gray-500 mt-3 text-lg">
            Professional legal practice management system
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LegalDemo;