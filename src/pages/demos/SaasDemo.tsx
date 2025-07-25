import { useState, useEffect } from 'react';
import { ArrowLeft, BarChart3, Users, TrendingUp, Eye, Calendar, Settings, Bell, Download, Filter, RefreshCw, Globe, Smartphone, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import mockupSaas from "@/assets/mockup-saas.jpg";
import mockupSaasPricing from "@/assets/mockup-saas-pricing.jpg";
import mockupSaasDashboard from "@/assets/mockup-saas-dashboard.jpg";

const SaasDemo = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [liveStats, setLiveStats] = useState({
    users: 12847,
    revenue: 47295,
    conversion: 3.24,
    pageViews: 89432
  });
  const [notifications, setNotifications] = useState(3);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        users: prev.users + Math.floor(Math.random() * 10) - 5,
        revenue: prev.revenue + Math.floor(Math.random() * 100) - 50,
        conversion: Math.max(0, prev.conversion + (Math.random() - 0.5) * 0.1),
        pageViews: prev.pageViews + Math.floor(Math.random() * 50)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const refreshData = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const stats = [
    { label: 'Active Users', value: liveStats.users.toLocaleString(), change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Monthly Revenue', value: `$${liveStats.revenue.toLocaleString()}`, change: '+18%', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Conversion Rate', value: `${liveStats.conversion.toFixed(2)}%`, change: '+5%', icon: BarChart3, color: 'text-purple-600' },
    { label: 'Page Views', value: liveStats.pageViews.toLocaleString(), change: '+7%', icon: Eye, color: 'text-orange-600' }
  ];

  const recentTransactions = [
    { id: '#TXN-1234', customer: 'Acme Corp', amount: '$2,450', status: 'completed', time: '2 min' },
    { id: '#TXN-1233', customer: 'StartUp Inc', amount: '$890', status: 'pending', time: '5 min' },
    { id: '#TXN-1232', customer: 'Tech Solutions', amount: '$3,200', status: 'completed', time: '12 min' },
    { id: '#TXN-1231', customer: 'Digital Agency', amount: '$1,750', status: 'completed', time: '25 min' }
  ];

  const deviceStats = [
    { device: 'Desktop', users: '45%', icon: Monitor, color: 'bg-blue-500' },
    { device: 'Mobile', users: '38%', icon: Smartphone, color: 'bg-green-500' },
    { device: 'Tablet', users: '17%', icon: Globe, color: 'bg-purple-500' }
  ];

  const topCountries = [
    { country: 'United States', flag: '🇺🇸', users: 4521, sessions: 12847 },
    { country: 'Germany', flag: '🇩🇪', users: 2847, sessions: 8234 },
    { country: 'United Kingdom', flag: '🇬🇧', users: 1923, sessions: 5432 },
    { country: 'Canada', flag: '🇨🇦', users: 856, sessions: 2145 }
  ];

  const recentActivity = [
    { user: 'Sarah J.', action: 'created a new project', time: '2 min ago', avatar: 'SJ' },
    { user: 'Mike K.', action: 'updated analytics metrics', time: '5 min ago', avatar: 'MK' },
    { user: 'Emma R.', action: 'added team member', time: '12 min ago', avatar: 'ER' },
    { user: 'Alex D.', action: 'exported data report', time: '25 min ago', avatar: 'AD' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-700"></div>
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-20 animate-pulse"></div>
                <h1 className="relative text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
                  DataPulse Pro
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={refreshData}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''} group-hover:scale-110 transition-transform duration-200`} />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-all duration-200">
                <Download className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              </Button>
              <Button variant="ghost" size="sm" className="relative hover:bg-blue-50 transition-all duration-200">
                <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                {notifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 animate-pulse">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 transition-all duration-200">
                <Settings className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              </Button>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  JP
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white text-center py-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <p className="text-sm font-medium relative z-10">
          📊 INTERACTIVE DEMO - SaaS Analytics Platform by zyFlows
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header avec indicateurs live */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Dashboard</h2>
            <div className="flex items-center space-x-4">
              <p className="text-xl text-gray-600">Real-time analytics overview</p>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 font-bold">Live Data</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="hover:bg-blue-50 transition-all duration-200">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-blue-50 transition-all duration-200">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'calendar', label: 'Calendar', icon: Calendar }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-all duration-200 hover:scale-105 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <Badge variant="secondary" className="mt-2 text-green-600 bg-green-50">
                      {stat.change}
                    </Badge>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Showcase with Mockup Images */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={mockupSaas} 
                  alt="SaaS Platform Overview" 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600 text-sm">Comprehensive real-time analytics with advanced visualization tools</p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={mockupSaasDashboard} 
                  alt="SaaS Dashboard Interface" 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Live Dashboard</h3>
                <p className="text-gray-600 text-sm">Interactive dashboard with real-time data updates and team collaboration</p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={mockupSaasPricing} 
                  alt="SaaS Pricing Plans" 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Pricing Strategy</h3>
                <p className="text-gray-600 text-sm">Flexible pricing plans designed to scale with your business growth</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Area */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Traffic Evolution</span>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Last 7 days</Badge>
                  <Button variant="ghost" size="sm">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
                {/* Detailed chart simulation */}
                <div className="flex items-end justify-between h-full space-x-2">
                  {[65, 45, 78, 52, 89, 67, 93, 74, 81, 69, 87, 73, 95, 83].map((height, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                      <div 
                        className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t transition-all duration-1000 hover:from-blue-600 hover:to-purple-600 w-full"
                        style={{ height: `${height}%` }}
                      ></div>
                      {index % 2 === 0 && (
                        <span className="text-xs text-gray-500">{index + 1}</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span className="text-gray-600">Unique Visitors</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded"></div>
                    <span className="text-gray-600">Sessions</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle>Activité récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {activity.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Cards - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Top Countries */}
          <Card>
            <CardHeader>
              <CardTitle>Top Pays</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCountries.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{item.flag}</span>
                      <div>
                        <p className="font-medium text-gray-900">{item.country}</p>
                        <p className="text-sm text-gray-500">{item.users.toLocaleString()} utilisateurs</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{item.sessions.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">sessions</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Appareils utilisés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceStats.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${device.color}`}>
                        <device.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{device.device}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-gray-900">{device.users}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Transactions récentes */}
          <Card>
            <CardHeader>
              <CardTitle>Transactions récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{transaction.customer}</p>
                      <p className="text-xs text-gray-500">{transaction.id} • Il y a {transaction.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{transaction.amount}</p>
                      <Badge 
                        variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                        className={`text-xs ${
                          transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {transaction.status === 'completed' ? 'Payé' : 'En attente'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance KPIs */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Indicateurs de performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Objectifs mensuels</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Revenus</span>
                        <span className="text-sm text-gray-500">€{liveStats.revenue.toLocaleString()} / €50,000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full transition-all duration-1000" style={{ width: `${(liveStats.revenue / 50000) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Nouveaux utilisateurs</span>
                        <span className="text-sm text-gray-500">1,847 / 2,000</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Métriques temps réel</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-blue-900">Visiteurs actifs</span>
                      <span className="text-lg font-bold text-blue-600">{Math.floor(liveStats.users / 100)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-900">Ventes aujourd'hui</span>
                      <span className="text-lg font-bold text-green-600">€{Math.floor(liveStats.revenue / 30).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium text-purple-900">Taux de conversion</span>
                      <span className="text-lg font-bold text-purple-600">{liveStats.conversion.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-lg">
            © 2024 DataPulse Pro - Platform created by <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold">zyFlows</span>
          </p>
          <p className="text-gray-500 mt-3 text-lg">
            Modern SaaS interface with real-time analytics
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SaasDemo;