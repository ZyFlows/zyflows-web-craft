import { useState } from 'react';
import { ArrowLeft, Play, Pause, Settings, Zap, CheckCircle, AlertCircle, Clock, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const AutomationDemo = () => {
  const navigate = useNavigate();
  const [runningWorkflows, setRunningWorkflows] = useState<number[]>([1, 3]);

  const workflows = [
    {
      id: 1,
      name: 'Traitement des commandes',
      description: 'Automatisation complète du processus de commande e-commerce',
      status: 'running',
      executions: 1247,
      successRate: 98.5,
      trigger: 'Nouvelle commande',
      steps: ['Validation', 'Facturation', 'Expédition', 'Notification']
    },
    {
      id: 2,
      name: 'Génération de leads',
      description: 'Collecte et qualification automatique des prospects',
      status: 'paused',
      executions: 892,
      successRate: 96.2,
      trigger: 'Formulaire contact',
      steps: ['Qualification', 'CRM', 'Email', 'Attribution']
    },
    {
      id: 3,
      name: 'Support client IA',
      description: 'Réponses automatiques et escalade intelligente',
      status: 'running',
      executions: 2156,
      successRate: 94.8,
      trigger: 'Message support',
      steps: ['Analyse', 'Réponse IA', 'Escalade', 'Suivi']
    },
    {
      id: 4,
      name: 'Backup données',
      description: 'Sauvegarde quotidienne sécurisée',
      status: 'scheduled',
      executions: 365,
      successRate: 100,
      trigger: 'Planification',
      steps: ['Collecte', 'Compression', 'Chiffrement', 'Stockage']
    }
  ];

  const recentExecutions = [
    { workflow: 'Traitement commandes', status: 'success', time: '2 min', duration: '1.2s' },
    { workflow: 'Support client IA', status: 'success', time: '3 min', duration: '0.8s' },
    { workflow: 'Génération leads', status: 'warning', time: '12 min', duration: '2.1s' },
    { workflow: 'Traitement commandes', status: 'success', time: '15 min', duration: '1.1s' },
    { workflow: 'Support client IA', status: 'success', time: '18 min', duration: '0.9s' }
  ];

  const toggleWorkflow = (id: number) => {
    setRunningWorkflows(prev => 
      prev.includes(id) 
        ? prev.filter(wid => wid !== id)
        : [...prev, id]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'scheduled': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                AutoFlow Pro
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                AF
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className="bg-purple-600 text-white text-center py-3">
        <p className="text-sm font-medium">
          ⚡ DÉMO INTERACTIVE - Plateforme d'automatisation développée par zyFlows
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Centre d'automatisation</h2>
          <p className="text-gray-600">Gérez et surveillez vos workflows automatisés</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Workflows actifs</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Exécutions/jour</p>
                  <p className="text-2xl font-bold text-gray-900">4,821</p>
                </div>
                <GitBranch className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taux de réussite</p>
                  <p className="text-2xl font-bold text-gray-900">97.3%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Temps économisé</p>
                  <p className="text-2xl font-bold text-gray-900">248h</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Workflows List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Workflows configurés</span>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Nouveau workflow
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflows.map((workflow) => (
                    <div key={workflow.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(workflow.status)}`}></div>
                            <h4 className="font-semibold text-gray-900">{workflow.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {workflow.trigger}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{workflow.executions} exécutions</span>
                            <span>{workflow.successRate}% réussite</span>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleWorkflow(workflow.id)}
                          className="ml-4"
                        >
                          {runningWorkflows.includes(workflow.id) ? 
                            <Pause className="h-4 w-4" /> : 
                            <Play className="h-4 w-4" />
                          }
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {workflow.steps.map((step, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {step}
                            </Badge>
                            {index < workflow.steps.length - 1 && (
                              <span className="text-gray-400">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Feed */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Exécutions récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentExecutions.map((execution, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(execution.status)}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{execution.workflow}</p>
                          <p className="text-xs text-gray-500">Il y a {execution.time}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {execution.duration}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Performance du système</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">CPU</span>
                      <span className="text-sm text-gray-500">23%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Mémoire</span>
                      <span className="text-sm text-gray-500">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Queue</span>
                      <span className="text-sm text-gray-500">12 tâches</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 AutoFlow Pro - Plateforme créée par <span className="text-purple-400 font-semibold">zyFlows</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Solution d'automatisation avancée pour entreprises
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AutomationDemo;