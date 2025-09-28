import React, { useState } from 'react';
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle, 
  X,
  Settings,
  Bell,
  Filter,
  Clock
} from 'lucide-react';

const AlertsPanel = () => {
  const [filterType, setFilterType] = useState('all');
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Wind Turbine Efficiency Drop',
      message: 'Wind turbine efficiency has dropped to 62% (below 70% threshold)',
      timestamp: '2025-01-15 14:32:15',
      source: 'Wind Generation System',
      acknowledged: false,
      actions: ['Schedule Maintenance', 'Adjust Thresholds']
    },
    {
      id: 2,
      type: 'warning',
      title: 'Battery Charge Level Low',
      message: 'Battery storage is at 25% capacity. Consider adjusting charging schedule.',
      timestamp: '2025-01-15 13:45:22',
      source: 'Battery Management System',
      acknowledged: false,
      actions: ['Force Charge', 'Review Schedule']
    },
    {
      id: 3,
      type: 'info',
      title: 'Peak Generation Opportunity',
      message: 'Optimal solar conditions detected. Consider deferring grid import for next 3 hours.',
      timestamp: '2025-01-15 12:15:30',
      source: 'Optimization Engine',
      acknowledged: true,
      actions: ['Adjust Load Schedule', 'Export to Grid']
    },
    {
      id: 4,
      type: 'warning',
      title: 'Grid Export Limit Reached',
      message: 'Current export capacity at 95%. Monitor for potential curtailment.',
      timestamp: '2025-01-15 11:28:45',
      source: 'Grid Interface',
      acknowledged: false,
      actions: ['Increase Local Consumption', 'Battery Charge']
    },
    {
      id: 5,
      type: 'critical',
      title: 'Communication Error',
      message: 'Lost connection with solar inverter #3. System operating in degraded mode.',
      timestamp: '2025-01-15 10:47:12',
      source: 'Solar Generation System',
      acknowledged: false,
      actions: ['Check Network', 'Manual Reset']
    },
    {
      id: 6,
      type: 'success',
      title: 'Maintenance Completed',
      message: 'Scheduled maintenance on Battery Bank A completed successfully.',
      timestamp: '2025-01-15 09:15:00',
      source: 'Maintenance System',
      acknowledged: true,
      actions: []
    }
  ]);

  const acknowledgeAlert = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getAlertConfig = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-300',
          iconColor: 'text-red-600',
          textColor: 'text-red-800',
          icon: AlertTriangle
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-300',
          iconColor: 'text-yellow-600',
          textColor: 'text-yellow-800',
          icon: AlertCircle
        };
      case 'info':
        return {
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-300',
          iconColor: 'text-blue-600',
          textColor: 'text-blue-800',
          icon: AlertCircle
        };
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-300',
          iconColor: 'text-green-600',
          textColor: 'text-green-800',
          icon: CheckCircle
        };
      default:
        return {
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-300',
          iconColor: 'text-gray-600',
          textColor: 'text-gray-800',
          icon: AlertCircle
        };
    }
  };

  const filteredAlerts = filterType === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === filterType);

  const getFilterCounts = () => {
    return {
      all: alerts.length,
      critical: alerts.filter(a => a.type === 'critical').length,
      warning: alerts.filter(a => a.type === 'warning').length,
      info: alerts.filter(a => a.type === 'info').length,
      success: alerts.filter(a => a.type === 'success').length
    };
  };

  const counts = getFilterCounts();
  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">System Alerts & Notifications</h2>
              <p className="text-gray-600">
                {unacknowledgedCount} unacknowledged alert{unacknowledgedCount !== 1 ? 's' : ''} • {alerts.length} total
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Settings className="w-4 h-4" />
              <span>Configure</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Mark All Read
            </button>
          </div>
        </div>

        {/* Alert Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gray-100 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-gray-800">{counts.all}</span>
            <p className="text-sm text-gray-600">Total Alerts</p>
          </div>
          <div className="bg-red-100 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-red-800">{counts.critical}</span>
            <p className="text-sm text-red-600">Critical</p>
          </div>
          <div className="bg-yellow-100 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-yellow-800">{counts.warning}</span>
            <p className="text-sm text-yellow-600">Warnings</p>
          </div>
          <div className="bg-blue-100 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-blue-800">{counts.info}</span>
            <p className="text-sm text-blue-600">Info</p>
          </div>
          <div className="bg-green-100 rounded-lg p-3 text-center">
            <span className="text-2xl font-bold text-green-800">{counts.success}</span>
            <p className="text-sm text-green-600">Success</p>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter by type:</span>
          
          {['all', 'critical', 'warning', 'info', 'success'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors capitalize ${
                filterType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type} ({counts[type as keyof typeof counts]})
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const config = getAlertConfig(alert.type);
          const Icon = config.icon;

          return (
            <div
              key={alert.id}
              className={`bg-white rounded-xl shadow-lg border-l-4 ${config.borderColor} ${
                !alert.acknowledged ? 'ring-2 ring-blue-200' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-10 h-10 ${config.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${config.iconColor}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${config.textColor}`}>
                        {alert.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {!alert.acknowledged && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            New
                          </span>
                        )}
                        <button
                          onClick={() => dismissAlert(alert.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{alert.message}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{alert.timestamp}</span>
                        </div>
                        <div>
                          <span className="font-medium">Source:</span> {alert.source}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    {alert.actions.length > 0 && (
                      <div className="flex items-center space-x-2 mb-4">
                        {alert.actions.map((action, index) => (
                          <button
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* Acknowledge Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {alert.acknowledged ? (
                          <div className="flex items-center space-x-1 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">Acknowledged</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            Acknowledge
                          </button>
                        )}
                      </div>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${config.bgColor} ${config.textColor}`}>
                        {alert.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Alerts State */}
      {filteredAlerts.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No {filterType} alerts</h3>
          <p className="text-gray-600">
            {filterType === 'all' 
              ? 'All systems are running normally.' 
              : `No ${filterType} alerts at this time.`}
          </p>
        </div>
      )}

      {/* Alert Configuration Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Alert Thresholds Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Battery Low Level</h4>
            <div className="flex items-center space-x-2">
              <input 
                type="number" 
                defaultValue="20" 
                className="w-16 px-2 py-1 border rounded text-sm"
              />
              <span className="text-sm text-gray-600">%</span>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Generation Efficiency</h4>
            <div className="flex items-center space-x-2">
              <input 
                type="number" 
                defaultValue="70" 
                className="w-16 px-2 py-1 border rounded text-sm"
              />
              <span className="text-sm text-gray-600">%</span>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Grid Export Limit</h4>
            <div className="flex items-center space-x-2">
              <input 
                type="number" 
                defaultValue="90" 
                className="w-16 px-2 py-1 border rounded text-sm"
              />
              <span className="text-sm text-gray-600">%</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;