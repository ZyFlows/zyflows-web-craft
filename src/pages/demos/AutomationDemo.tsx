import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Settings, Zap, CheckCircle, AlertCircle, Clock, GitBranch, Activity, TrendingUp, Database, Cpu, MemoryStick, HardDrive, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import DemoSEO from '@/components/DemoSEO';

const AutomationDemo = () => {
  const navigate = useNavigate();
  const [runningWorkflows, setRunningWorkflows] = useState<number[]>([1, 3]);
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 23,
    memory: 45,
    queue: 12,
    uptime: '99.9%'
  });
  const [liveExecutions, setLiveExecutions] = useState(4821);
  const [activeWorkflows, setActiveWorkflows] = useState(12);

  // Simulation temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        cpu: Math.max(5, Math.min(80, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(85, prev.memory + (Math.random() - 0.5) * 8)),
        queue: Math.max(0, Math.min(50, prev.queue + Math.floor(Math.random() * 6) - 3)),
        uptime: prev.uptime
      }));
      setLiveExecutions(prev => prev + Math.floor(Math.random() * 5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
    <>
      <DemoSEO
        title="Workflow Automation Platform Demo"
        description="Interactive workflow automation platform demo by zyFlows. Visual workflow builder, real-time monitoring, system metrics, and automation analytics. Built with React for enterprise automation needs."
        keywords="workflow automation demo, automation platform, Make integration, n8n workflows, business automation, process automation, zyFlows"
        path="/demo/automation"
        demoType="SoftwareApplication"
        category="Business Automation"
        features={["Visual Workflow Builder", "Real-time Monitoring", "System Metrics", "Automation Analytics", "Integration Hub", "Error Handling"]}
      />
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

        {/* Quick Stats - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Workflows actifs</p>
                  <p className="text-2xl font-bold text-gray-900">{activeWorkflows}</p>
                  <div className="flex items-center mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    <span className="text-xs text-green-600 font-medium">En ligne</span>
                  </div>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Exécutions/jour</p>
                  <p className="text-2xl font-bold text-gray-900">{liveExecutions.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600 font-medium">+12% aujourd'hui</span>
                  </div>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <GitBranch className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taux de réussite</p>
                  <p className="text-2xl font-bold text-gray-900">97.3%</p>
                  <div className="flex items-center mt-2">
                    <CheckCircle className="h-3 w-3 text-blue-600 mr-1" />
                    <span className="text-xs text-blue-600 font-medium">Excellent</span>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Temps économisé</p>
                  <p className="text-2xl font-bold text-gray-900">248h</p>
                  <div className="flex items-center mt-2">
                    <Clock className="h-3 w-3 text-orange-600 mr-1" />
                    <span className="text-xs text-orange-600 font-medium">Ce mois</span>
                  </div>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health Overview */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-purple-600" />
                <span>État du système</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Opérationnel
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <div className="absolute inset-0 bg-purple-100 rounded-full"></div>
                    <div className="absolute inset-2 bg-purple-500 rounded-full flex items-center justify-center">
                      <Cpu className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-600">CPU</p>
                  <p className="text-2xl font-bold text-gray-900">{systemMetrics.cpu.toFixed(0)}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${systemMetrics.cpu}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <div className="absolute inset-0 bg-blue-100 rounded-full"></div>
                    <div className="absolute inset-2 bg-blue-500 rounded-full flex items-center justify-center">
                      <MemoryStick className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-600">Mémoire</p>
                  <p className="text-2xl font-bold text-gray-900">{systemMetrics.memory.toFixed(0)}%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000" 
                      style={{ width: `${systemMetrics.memory}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <div className="absolute inset-0 bg-green-100 rounded-full"></div>
                    <div className="absolute inset-2 bg-green-500 rounded-full flex items-center justify-center">
                      <Database className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-600">Queue</p>
                  <p className="text-2xl font-bold text-gray-900">{systemMetrics.queue}</p>
                  <p className="text-xs text-gray-500 mt-1">tâches en attente</p>
                </div>
                
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    <div className="absolute inset-0 bg-orange-100 rounded-full"></div>
                    <div className="absolute inset-2 bg-orange-500 rounded-full flex items-center justify-center">
                      <Wifi className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-600">Uptime</p>
                  <p className="text-2xl font-bold text-gray-900">{systemMetrics.uptime}</p>
                  <p className="text-xs text-gray-500 mt-1">30 derniers jours</p>
                </div>
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
                <CardTitle className="flex items-center justify-between">
                  <span>Analytics en temps réel</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600">Live</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-purple-900">Workflows lancés</p>
                          <p className="text-2xl font-bold text-purple-600">1,247</p>
                        </div>
                        <Play className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-900">Terminés</p>
                          <p className="text-2xl font-bold text-green-600">1,213</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Top workflows aujourd'hui</h4>
                    {[
                      { name: 'Traitement commandes', count: 342, trend: '+15%' },
                      { name: 'Support IA', count: 289, trend: '+8%' },
                      { name: 'Génération leads', count: 156, trend: '+23%' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.count} exécutions</p>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                          {item.trend}
                        </Badge>
                      </div>
                    ))}
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
    </>
  );
};

export default AutomationDemo;