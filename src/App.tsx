import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Wind, 
  Battery, 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  Leaf, 
  Calendar,
  Download,
  Settings,
  BarChart3,
  Activity
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import OptimizationRecommendations from './components/OptimizationRecommendations';
import CarbonTracker from './components/CarbonTracker';
import AlertsPanel from './components/AlertsPanel';
import ReportsPanel from './components/ReportsPanel';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'dashboard', label: 'Live Dashboard', icon: Activity },
    { id: 'analytics', label: 'Predictive Analytics', icon: TrendingUp },
    { id: 'optimization', label: 'Recommendations', icon: Settings },
    { id: 'carbon', label: 'Carbon Tracker', icon: Leaf },
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'reports', label: 'Reports', icon: BarChart3 }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <PredictiveAnalytics />;
      case 'optimization':
        return <OptimizationRecommendations />;
      case 'carbon':
        return <CarbonTracker />;
      case 'alerts':
        return <AlertsPanel />;
      case 'reports':
        return <ReportsPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-1 border-black-500">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">PureGrid</h1>
                  <p className="text-sm text-gray-600">Hybrid Renewable Energy Generation Solution</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-sm text-gray-600">Government of Rajasthan</p>
                <p className="text-xs text-gray-500">Directorate of Technical Education</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-800">
                  {currentTime.toLocaleTimeString()}
                </p>
                <p className="text-xs text-gray-600">
                  {currentTime.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-all duration-200 flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About PureGrid</h3>
              <p className="text-gray-300 text-sm">
                A vendor-neutral software framework for optimizing hybrid renewable energy systems 
                across public sector campuses in Rajasthan.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Key Features</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Real-time energy monitoring</li>
                <li>• Predictive analytics</li>
                <li>• Smart optimization</li>
                <li>• Carbon footprint tracking</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300 text-sm">
                Government of Rajasthan<br />
                Directorate of Technical Education<br />
                Clean & Green Technology Initiative
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Tech Titans 2.0. Built for sustainable energy management.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
