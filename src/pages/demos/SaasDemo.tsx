import { useState } from 'react';
import { ArrowLeft, BarChart3, Users, TrendingUp, Eye, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const SaasDemo = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Utilisateurs actifs', value: '12,847', change: '+12%', icon: Users, color: 'text-blue-600' },
    { label: 'Revenus mensuels', value: '€47,295', change: '+18%', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Taux de conversion', value: '3.24%', change: '+5%', icon: BarChart3, color: 'text-purple-600' },
    { label: 'Pages vues', value: '89,432', change: '+7%', icon: Eye, color: 'text-orange-600' }
  ];

  const recentActivity = [
    { user: 'Marie L.', action: 'a créé un nouveau projet', time: 'Il y a 2 min', avatar: 'ML' },
    { user: 'Thomas K.', action: 'a mis à jour les métriques', time: 'Il y a 5 min', avatar: 'TK' },
    { user: 'Sarah M.', action: 'a ajouté un membre à l\'équipe', time: 'Il y a 12 min', avatar: 'SM' },
    { user: 'Alex R.', action: 'a exporté les données', time: 'Il y a 25 min', avatar: 'AR' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Analytics Pro
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                JD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className="bg-blue-600 text-white text-center py-3">
        <p className="text-sm font-medium">
          📊 DÉMO INTERACTIVE - Tableau de bord SaaS développé par zyFlows
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h2>
          <p className="text-gray-600">Aperçu de vos métriques en temps réel</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 border-b">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3 },
              { id: 'users', label: 'Utilisateurs', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'calendar', label: 'Calendrier', icon: Calendar }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Area */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Évolution du trafic</span>
                <Badge variant="outline">7 derniers jours</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Graphique interactif</p>
                  <p className="text-sm text-gray-500">Données en temps réel</p>
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

        {/* Additional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Performance par région</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { region: 'France', users: '4,521', percent: 45 },
                  { region: 'Allemagne', users: '2,847', percent: 28 },
                  { region: 'Espagne', users: '1,923', percent: 19 },
                  { region: 'Italie', users: '856', percent: 8 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{item.region}</p>
                      <p className="text-sm text-gray-500">{item.users} utilisateurs</p>
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Objectifs mensuels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Revenus</span>
                    <span className="text-sm text-gray-500">€47,295 / €50,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
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
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Taux d'engagement</span>
                    <span className="text-sm text-gray-500">68% / 75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
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
          <p className="text-gray-400">
            © 2024 Analytics Pro - Dashboard créé par <span className="text-blue-400 font-semibold">zyFlows</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Interface SaaS moderne avec métriques en temps réel
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SaasDemo;