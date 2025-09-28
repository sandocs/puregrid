import React, { useState } from 'react';
import { 
  Settings, 
  Battery, 
  Zap, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Calendar,
  RefreshCw
} from 'lucide-react';

const OptimizationRecommendations = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');
  
  const recommendations = {
    today: [
      {
        id: 1,
        category: 'Battery Management',
        priority: 'high',
        title: 'Optimize Battery Charging Window',
        description: 'Begin charging batteries at 9:30 AM to utilize peak solar generation (95 kW expected at 12:00 PM)',
        impact: 'Save ₹1,247 in grid costs',
        timeframe: '9:30 AM - 2:00 PM',
        status: 'pending',
        icon: Battery,
        savings: { cost: 1247, carbon: 892 }
      },
      {
        id: 2,
        category: 'Load Scheduling',
        priority: 'medium',
        title: 'Reschedule HVAC Operations',
        description: 'Shift air conditioning peak load from 2:00 PM to 11:00 AM to align with solar generation',
        impact: 'Reduce grid dependence by 23%',
        timeframe: '11:00 AM - 1:00 PM',
        status: 'pending',
        icon: Clock,
        savings: { cost: 845, carbon: 623 }
      },
      {
        id: 3,
        category: 'Grid Export',
        priority: 'low',
        title: 'Export Surplus Energy',
        description: 'Export 34 kW surplus energy to grid during 12:30 PM - 1:30 PM window',
        impact: 'Generate ₹567 revenue',
        timeframe: '12:30 PM - 1:30 PM',
        status: 'approved',
        icon: Zap,
        savings: { cost: -567, carbon: 245 }
      }
    ],
    week: [
      {
        id: 4,
        category: 'Maintenance',
        priority: 'medium',
        title: 'Schedule Preventive Maintenance',
        description: 'Plan solar panel cleaning and wind turbine inspection during low generation period (Thursday)',
        impact: 'Prevent 15% efficiency loss',
        timeframe: 'Thursday 8:00 AM - 12:00 PM',
        status: 'pending',
        icon: Settings,
        savings: { cost: 2340, carbon: 1680 }
      },
      {
        id: 5,
        category: 'Load Management',
        priority: 'high',
        title: 'Optimize Lab Equipment Schedule',
        description: 'Reschedule energy-intensive research equipment to align with high generation days',
        impact: 'Increase renewable utilization by 34%',
        timeframe: 'Monday, Wednesday, Friday',
        status: 'pending',
        icon: TrendingUp,
        savings: { cost: 4520, carbon: 3240 }
      }
    ],
    month: [
      {
        id: 6,
        category: 'System Upgrade',
        priority: 'low',
        title: 'Battery Capacity Optimization',
        description: 'Analysis suggests adding 100 kWh storage capacity would improve ROI by 23%',
        impact: 'Reduce monthly grid costs by ₹45,600',
        timeframe: 'Q2 2025 Implementation',
        status: 'under_review',
        icon: Battery,
        savings: { cost: 45600, carbon: 32800 }
      }
    ]
  };

  const [acceptedRecommendations, setAcceptedRecommendations] = useState<number[]>([3]);

  const handleAcceptRecommendation = (id: number) => {
    setAcceptedRecommendations([...acceptedRecommendations, id]);
  };

  const currentRecommendations = recommendations[selectedTimeframe as keyof typeof recommendations];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-300 bg-red-50 text-red-800';
      case 'medium':
        return 'border-yellow-300 bg-yellow-50 text-yellow-800';
      case 'low':
        return 'border-green-300 bg-green-50 text-green-800';
      default:
        return 'border-gray-300 bg-gray-50 text-gray-800';
    }
  };

  const getStatusConfig = (status: string, id: number) => {
    if (acceptedRecommendations.includes(id)) {
      return {
        bgColor: 'bg-green-100',
        textColor: 'text-green-800',
        label: 'Implemented',
        icon: CheckCircle
      };
    }

    switch (status) {
      case 'pending':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          label: 'Pending Review',
          icon: AlertCircle
        };
      case 'approved':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          label: 'Approved',
          icon: CheckCircle
        };
      case 'under_review':
        return {
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-800',
          label: 'Under Review',
          icon: RefreshCw
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          label: 'Unknown',
          icon: AlertCircle
        };
    }
  };

  const totalSavings = currentRecommendations.reduce((acc, rec) => ({
    cost: acc.cost + Math.abs(rec.savings.cost),
    carbon: acc.carbon + rec.savings.carbon
  }), { cost: 0, carbon: 0 });

  return (
    <div className="space-y-6">
      {/* Header with Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Smart Optimization Recommendations</h2>
            <p className="text-gray-600">AI-powered suggestions to maximize renewable energy utilization</p>
          </div>
          
          <div className="flex space-x-2">
            {['today', 'week', 'month'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  selectedTimeframe === timeframe
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        {/* Impact Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Potential Savings</span>
            </div>
            <p className="text-2xl font-bold text-green-900 mt-2">₹{totalSavings.cost.toLocaleString()}</p>
            <p className="text-sm text-green-600">{selectedTimeframe === 'today' ? 'Today' : selectedTimeframe === 'week' ? 'This Week' : 'This Month'}</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Recommendations</span>
            </div>
            <p className="text-2xl font-bold text-blue-900 mt-2">{currentRecommendations.length}</p>
            <p className="text-sm text-blue-600">{acceptedRecommendations.filter(id => currentRecommendations.some(r => r.id === id)).length} Implemented</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">CO₂ Reduction</span>
            </div>
            <p className="text-2xl font-bold text-purple-900 mt-2">{totalSavings.carbon} kg</p>
            <p className="text-sm text-purple-600">Carbon savings</p>
          </div>
        </div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {currentRecommendations.map((rec) => {
          const Icon = rec.icon;
          const statusConfig = getStatusConfig(rec.status, rec.id);
          const StatusIcon = statusConfig.icon;
          const isImplemented = acceptedRecommendations.includes(rec.id);

          return (
            <div key={rec.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{rec.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                          {rec.priority.toUpperCase()} PRIORITY
                        </span>
                        <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{rec.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{rec.timeframe}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600">{rec.impact}</span>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          Category: <span className="font-medium">{rec.category}</span>
                        </div>
                      </div>
                      
                      {/* Savings Breakdown */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-xs text-gray-500">Financial Impact</span>
                            <p className="text-sm font-semibold text-gray-800">
                              {rec.savings.cost > 0 ? '₹' : ''}
                              {rec.savings.cost > 0 ? rec.savings.cost.toLocaleString() + ' saved' : '₹' + Math.abs(rec.savings.cost).toLocaleString() + ' revenue'}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500">Environmental Impact</span>
                            <p className="text-sm font-semibold text-gray-800">{rec.savings.carbon} kg CO₂ reduced</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex-shrink-0 ml-4">
                  {!isImplemented && rec.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAcceptRecommendation(rec.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        Implement
                      </button>
                      <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-400 transition-colors">
                        Review Later
                      </button>
                    </div>
                  )}
                  
                  {isImplemented && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">Implemented</span>
                    </div>
                  )}
                  
                  {rec.status === 'approved' && !isImplemented && (
                    <button
                      onClick={() => handleAcceptRecommendation(rec.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Execute Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <Battery className="w-6 h-6 text-gray-600 mb-2" />
            <p className="text-sm font-medium text-gray-800">Force Battery Charge</p>
            <p className="text-xs text-gray-600">Override automatic scheduling</p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <Zap className="w-6 h-6 text-gray-600 mb-2" />
            <p className="text-sm font-medium text-gray-800">Enable Grid Export</p>
            <p className="text-xs text-gray-600">Sell surplus to utility</p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors">
            <Clock className="w-6 h-6 text-gray-600 mb-2" />
            <p className="text-sm font-medium text-gray-800">Schedule Load Shift</p>
            <p className="text-xs text-gray-600">Move demand to peak generation</p>
          </button>
          
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <RefreshCw className="w-6 h-6 text-gray-600 mb-2" />
            <p className="text-sm font-medium text-gray-800">Refresh Analysis</p>
            <p className="text-xs text-gray-600">Update recommendations</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptimizationRecommendations;