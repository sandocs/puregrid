import React, { useState } from 'react';
import { Leaf, TrendingUp, Award, Download, Calendar, BarChart3 } from 'lucide-react';

const CarbonTracker = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  const carbonData = {
    today: {
      avoided: 892,
      generated: 1247,
      target: 1000,
      renewable_percentage: 78.3,
      grid_offset: 567
    },
    month: {
      avoided: 24567,
      generated: 34890,
      target: 28000,
      renewable_percentage: 82.1,
      grid_offset: 15600
    },
    year: {
      avoided: 298450,
      generated: 425600,
      target: 350000,
      renewable_percentage: 79.8,
      grid_offset: 189200
    }
  };

  const currentData = carbonData[timeRange as keyof typeof carbonData];
  
  const milestones = [
    { target: 50000, label: 'Bronze Certificate', achieved: true, date: '2024-03-15' },
    { target: 150000, label: 'Silver Certificate', achieved: true, date: '2024-08-22' },
    { target: 300000, label: 'Gold Certificate', achieved: currentData.avoided >= 300000, date: currentData.avoided >= 300000 ? '2025-01-15' : 'In Progress' },
    { target: 500000, label: 'Platinum Certificate', achieved: false, date: 'Target 2025' }
  ];

  const monthlyTrend = [
    { month: 'Jan', avoided: 18450, generated: 26800 },
    { month: 'Feb', avoided: 21200, generated: 30500 },
    { month: 'Mar', avoided: 25600, generated: 36200 },
    { month: 'Apr', avoided: 28900, generated: 41200 },
    { month: 'May', avoided: 31200, generated: 44800 },
    { month: 'Jun', avoided: 29800, generated: 42600 },
    { month: 'Jul', avoided: 27400, generated: 39100 },
    { month: 'Aug', avoided: 30100, generated: 43200 },
    { month: 'Sep', avoided: 32500, generated: 46500 },
    { month: 'Oct', avoided: 28700, generated: 41000 },
    { month: 'Nov', avoided: 26900, generated: 38400 },
    { month: 'Dec', avoided: 24600, generated: 35200 }
  ];

  const getProgressPercentage = () => {
    return Math.min((currentData.avoided / currentData.target) * 100, 100);
  };

  const exportReport = () => {
    // Simulate report generation
    const reportData = {
      period: timeRange,
      carbonAvoided: currentData.avoided,
      energyGenerated: currentData.generated,
      renewablePercentage: currentData.renewable_percentage,
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `carbon-report-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Carbon Footprint Tracker</h2>
              <p className="text-gray-600">Monitor environmental impact and sustainability goals</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              {['today', 'month', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    timeRange === range
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            
            <button
              onClick={exportReport}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl shadow-lg p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-7 h-7 text-white" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-green-800">{currentData.avoided.toLocaleString()}</span>
              <p className="text-sm text-green-600">kg CO₂ Avoided</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-green-700">Target: {currentData.target.toLocaleString()} kg</span>
            <span className="text-green-600 font-medium">
              {getProgressPercentage().toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-2 mt-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl shadow-lg p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-blue-800">{currentData.renewable_percentage}%</span>
              <p className="text-sm text-blue-600">Renewable Energy</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-blue-700">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+{(currentData.renewable_percentage - 75).toFixed(1)}% vs baseline</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl shadow-lg p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-purple-800">{currentData.grid_offset.toLocaleString()}</span>
              <p className="text-sm text-purple-600">kWh Grid Offset</p>
            </div>
          </div>
          <div className="text-sm text-purple-700">
            Equivalent to powering {Math.floor(currentData.grid_offset / 30)} homes
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl shadow-lg p-6 border border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-yellow-800">{currentData.generated.toLocaleString()}</span>
              <p className="text-sm text-yellow-600">kWh Generated</p>
            </div>
          </div>
          <div className="text-sm text-yellow-700">
            {timeRange === 'today' ? 'Today' : timeRange === 'month' ? 'This Month' : 'This Year'}
          </div>
        </div>
      </div>

      {/* Sustainability Milestones */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Sustainability Milestones & Certifications</h3>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                milestone.achieved 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  milestone.achieved 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-400 text-white'
                }`}>
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-semibold ${
                    milestone.achieved ? 'text-green-800' : 'text-gray-700'
                  }`}>
                    {milestone.label}
                  </h4>
                  <p className={`text-sm ${
                    milestone.achieved ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    Target: {milestone.target.toLocaleString()} kg CO₂ avoided
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <span className={`text-sm font-medium ${
                  milestone.achieved ? 'text-green-700' : 'text-gray-600'
                }`}>
                  {milestone.achieved ? '✓ Achieved' : 'In Progress'}
                </span>
                <p className="text-xs text-gray-500">{milestone.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Annual Carbon Avoidance Trend</h3>
        <div className="h-80">
          <div className="flex items-end justify-between h-64 space-x-2 mb-4">
            {monthlyTrend.map((month, index) => {
              const maxValue = Math.max(...monthlyTrend.map(m => m.avoided));
              const height = (month.avoided / maxValue) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col justify-end" style={{ height: '200px' }}>
                    <div 
                      className="w-full bg-green-500 rounded-t-md hover:bg-green-600 transition-colors cursor-pointer relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        {month.avoided.toLocaleString()} kg
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-600 mt-2">{month.month}</span>
                </div>
              );
            })}
          </div>
          
          {/* Chart Legend */}
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>CO₂ Avoided (kg)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Environmental Equivalents</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-green-800">Trees Planted Equivalent</span>
              <span className="text-lg font-bold text-green-600">
                {Math.floor(currentData.avoided / 22)} trees
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-blue-800">Cars Off Road Equivalent</span>
              <span className="text-lg font-bold text-blue-600">
                {Math.floor(currentData.avoided / 4600)} cars/year
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-purple-800">Coal Avoided</span>
              <span className="text-lg font-bold text-purple-600">
                {Math.floor(currentData.avoided / 2200)} tonnes
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Compliance & Reporting</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm text-gray-700">ISO 14001 Compliance</span>
              <span className="text-sm font-medium text-green-600">✓ Compliant</span>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm text-gray-700">CDP Carbon Disclosure</span>
              <span className="text-sm font-medium text-green-600">✓ Submitted</span>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm text-gray-700">GHG Protocol Standard</span>
              <span className="text-sm font-medium text-green-600">✓ Aligned</span>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <span className="text-sm text-gray-700">Next Report Due</span>
              <span className="text-sm font-medium text-yellow-600">March 31, 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonTracker;