import React, { useState } from 'react';
import { TrendingUp, Sun, Wind, CloudRain, BarChart3, Calendar } from 'lucide-react';

const PredictiveAnalytics = () => {
  const [timeRange, setTimeRange] = useState('24h');

  const forecastData = {
    '24h': {
      solar: [65, 78, 89, 95, 88, 72, 45, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 45, 72, 85, 92, 87, 65],
      wind: [25, 28, 32, 35, 38, 42, 45, 48, 35, 28, 22, 18, 15, 12, 18, 25, 32, 38, 42, 45, 38, 32, 28, 25],
      demand: [55, 52, 48, 45, 42, 45, 52, 68, 85, 92, 95, 88, 85, 82, 78, 85, 92, 98, 95, 88, 78, 68, 62, 58],
      weather: ['Clear', 'Clear', 'Clear', 'Sunny', 'Sunny', 'Partly Cloudy', 'Cloudy', 'Night', 'Night']
    },
    '7d': {
      solar: [450, 520, 380, 290, 480, 510, 470],
      wind: [280, 320, 450, 380, 290, 260, 310],
      demand: [680, 720, 650, 580, 690, 740, 710],
      weather: ['Sunny', 'Partly Cloudy', 'Rainy', 'Cloudy', 'Sunny', 'Clear', 'Partly Cloudy']
    },
    '30d': {
      solar: [12500, 13800, 11200, 9800, 14200, 13500, 12800, 15200, 14100, 13600, 12900, 11800, 10500, 9200, 11800, 13400, 14700, 15100, 13900, 12600, 11300, 10800, 12400, 13800, 14500, 13200, 11900, 10600, 12100, 13700],
      wind: [8900, 9500, 11200, 10800, 9200, 8600, 9800, 10400, 11800, 10200, 9600, 8800, 7900, 8500, 9300, 10100, 10900, 11500, 10700, 9800, 9100, 8700, 9400, 10200, 10800, 9900, 9300, 8600, 9200, 9800],
      demand: [18500, 19200, 17800, 16900, 18800, 19500, 18200, 20100, 19800, 18600, 17900, 17200, 16500, 15800, 17100, 18400, 19300, 20200, 19600, 18300, 17600, 16900, 17800, 18700, 19400, 18900, 18100, 17400, 17900, 18600],
      weather: Array(30).fill(0).map(() => ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 4)])
    }
  };

  const currentForecast = forecastData[timeRange as keyof typeof forecastData];

  const getOptimizationRecommendations = () => {
    const totalGeneration = currentForecast.solar[0] + currentForecast.wind[0];
    const demand = currentForecast.demand[0];
    const surplus = totalGeneration - demand;

    if (surplus > 20) {
      return [
        { type: 'success', message: 'Excess generation detected. Recommend charging batteries to 90%.' },
        { type: 'info', message: 'Consider scheduling energy-intensive operations (HVAC, lab equipment).' },
        { type: 'info', message: 'Export surplus to grid for revenue generation.' }
      ];
    } else if (surplus < -10) {
      return [
        { type: 'warning', message: 'Generation shortfall predicted. Discharge batteries as needed.' },
        { type: 'warning', message: 'Defer non-critical loads to peak generation hours.' },
        { type: 'error', message: 'Grid import required to meet demand.' }
      ];
    } else {
      return [
        { type: 'success', message: 'Generation and demand well balanced.' },
        { type: 'info', message: 'Maintain current battery charge levels.' }
      ];
    }
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Predictive Analytics Dashboard</h2>
          <div className="flex space-x-2">
            {['24h', '7d', '30d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range === '24h' ? '24 Hours' : range === '7d' ? '7 Days' : '30 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Weather-Based Forecast */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center space-x-3 mb-3">
              <Sun className="w-6 h-6 text-yellow-600" />
              <h3 className="font-semibold text-gray-800">Solar Generation Forecast</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Current Conditions</span>
                <span className="text-sm font-medium">890 W/m² irradiance</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Peak Expected</span>
                <span className="text-sm font-medium">{Math.max(...currentForecast.solar)} kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Daily Total</span>
                <span className="text-sm font-medium">{timeRange === '24h' ? '1,247 kWh' : timeRange === '7d' ? '8,890 kWh' : '378,500 kWh'}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center space-x-3 mb-3">
              <Wind className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Wind Generation Forecast</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Current Wind Speed</span>
                <span className="text-sm font-medium">4.2 m/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Peak Expected</span>
                <span className="text-sm font-medium">{Math.max(...currentForecast.wind)} kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Daily Total</span>
                <span className="text-sm font-medium">{timeRange === '24h' ? '742 kWh' : timeRange === '7d' ? '5,290 kWh' : '289,400 kWh'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forecast Visualization */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Generation vs Demand Forecast</h3>
        <div className="h-80 relative">
          <div className="absolute inset-0 bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-12 gap-1 h-full">
              {currentForecast.solar.slice(0, 12).map((solarVal, index) => {
                const windVal = currentForecast.wind[index];
                const demandVal = currentForecast.demand[index];
                const maxVal = Math.max(solarVal + windVal, demandVal);
                const scale = maxVal > 0 ? maxVal : 100;

                return (
                  <div key={index} className="flex flex-col justify-end items-center space-y-1">
                    <div className="text-xs text-gray-600 mb-1">{demandVal}</div>
                    
                    {/* Demand bar (red) */}
                    <div
                      className="w-full bg-red-400 rounded-t"
                      style={{ height: `${(demandVal / scale) * 60}%` }}
                    />
                    
                    {/* Generation bars */}
                    <div className="w-full flex flex-col justify-end" style={{ height: '60%' }}>
                      {/* Solar (yellow) */}
                      <div
                        className="w-full bg-yellow-400"
                        style={{ height: `${(solarVal / scale) * 100}%` }}
                      />
                      {/* Wind (blue) */}
                      <div
                        className="w-full bg-blue-400"
                        style={{ height: `${(windVal / scale) * 100}%` }}
                      />
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      {timeRange === '24h' ? `${index * 2}h` : timeRange === '7d' ? `D${index + 1}` : `${index + 1}`}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                <span className="text-sm text-gray-600">Solar</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded"></div>
                <span className="text-sm text-gray-600">Wind</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded"></div>
                <span className="text-sm text-gray-600">Demand</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">AI-Generated Recommendations</h3>
        <div className="space-y-3">
          {getOptimizationRecommendations().map((rec, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                rec.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                rec.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                rec.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                'bg-blue-50 border-blue-200 text-blue-800'
              }`}
            >
              <div className="flex items-start space-x-2">
                <TrendingUp className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{rec.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Impact Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Weather Impact Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CloudRain className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">Cloud Cover Impact</span>
              </div>
              <span className="text-sm text-blue-600">-23% solar efficiency</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Wind className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Wind Conditions</span>
              </div>
              <span className="text-sm text-green-600">+15% above average</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Sun className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium">Temperature Effect</span>
              </div>
              <span className="text-sm text-yellow-600">-8% PV efficiency</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Optimization Opportunities</h3>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <h4 className="text-sm font-medium text-green-800">Battery Scheduling</h4>
              <p className="text-xs text-green-600 mt-1">Charge during 10 AM - 2 PM peak solar hours</p>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="text-sm font-medium text-blue-800">Load Management</h4>
              <p className="text-xs text-blue-600 mt-1">Schedule HVAC maintenance during low generation periods</p>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="text-sm font-medium text-purple-800">Grid Export</h4>
              <p className="text-xs text-purple-600 mt-1">Export 45 kW surplus expected at 1 PM today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;