import React, { useState, useEffect } from 'react';
import { Sun, Wind, Battery, Zap, Home, TrendingUp, TrendingDown } from 'lucide-react';
import EnergyChart from './EnergyChart';
import StatusIndicator from './StatusIndicator';

const Dashboard = () => {
  const [energyData, setEnergyData] = useState({
    solar: { current: 45.2, capacity: 100, efficiency: 89 },
    wind: { current: 23.8, capacity: 50, efficiency: 76 },
    battery: { current: 78, capacity: 200, charging: true },
    grid: { current: 12.5, importing: true },
    consumption: { current: 67.3, peak: 95.2 }
  });

  const [weatherData, setWeatherData] = useState({
    solarIrradiance: 850,
    windSpeed: 4.2,
    temperature: 28,
    cloudCover: 25,
    forecast: 'Partly Cloudy'
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyData(prev => ({
        ...prev,
        solar: {
          ...prev.solar,
          current: prev.solar.current + (Math.random() - 0.5) * 2,
          efficiency: Math.max(75, Math.min(95, prev.solar.efficiency + (Math.random() - 0.5) * 2))
        },
        wind: {
          ...prev.wind,
          current: Math.max(0, prev.wind.current + (Math.random() - 0.5) * 3),
          efficiency: Math.max(65, Math.min(85, prev.wind.efficiency + (Math.random() - 0.5) * 2))
        },
        battery: {
          ...prev.battery,
          current: Math.max(20, Math.min(95, prev.battery.current + (Math.random() - 0.5) * 1))
        },
        grid: {
          ...prev.grid,
          current: Math.max(0, prev.grid.current + (Math.random() - 0.5) * 2)
        },
        consumption: {
          ...prev.consumption,
          current: Math.max(40, prev.consumption.current + (Math.random() - 0.5) * 3)
        }
      }));

      setWeatherData(prev => ({
        ...prev,
        solarIrradiance: Math.max(300, Math.min(1000, prev.solarIrradiance + (Math.random() - 0.5) * 20)),
        windSpeed: Math.max(0, Math.min(12, prev.windSpeed + (Math.random() - 0.5) * 0.5)),
        temperature: Math.max(20, Math.min(40, prev.temperature + (Math.random() - 0.5) * 0.5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const totalGeneration = energyData.solar.current + energyData.wind.current;
  const selfConsumption = Math.min(totalGeneration, energyData.consumption.current);
  const gridDependence = Math.max(0, energyData.consumption.current - totalGeneration);
  const surplus = Math.max(0, totalGeneration - energyData.consumption.current);

  return (
    <div className="space-y-6">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Generation</p>
              <p className="text-3xl font-bold text-gray-900">{totalGeneration.toFixed(1)}</p>
              <p className="text-sm text-gray-500">kW</p>
            </div>
            <Sun className="w-12 h-12 text-yellow-500" />
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+{((totalGeneration / 100) * 100).toFixed(1)}% capacity</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Self Consumption</p>
              <p className="text-3xl font-bold text-gray-900">{selfConsumption.toFixed(1)}</p>
              <p className="text-sm text-gray-500">kW</p>
            </div>
            <Home className="w-12 h-12 text-blue-500" />
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-green-600">
              <span>{((selfConsumption / energyData.consumption.current) * 100).toFixed(1)}% renewable</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Battery Level</p>
              <p className="text-3xl font-bold text-gray-900">{energyData.battery.current.toFixed(0)}</p>
              <p className="text-sm text-gray-500">%</p>
            </div>
            <Battery className="w-12 h-12 text-purple-500" />
          </div>
          <div className="mt-4">
            <StatusIndicator
              status={energyData.battery.charging ? 'charging' : 'discharging'}
              label={energyData.battery.charging ? 'Charging' : 'Discharging'}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Grid Dependence</p>
              <p className="text-3xl font-bold text-gray-900">{gridDependence.toFixed(1)}</p>
              <p className="text-sm text-gray-500">kW</p>
            </div>
            <Zap className="w-12 h-12 text-red-500" />
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-600">
              <span>{((gridDependence / energyData.consumption.current) * 100).toFixed(1)}% from grid</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Charts and Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Generation Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Energy Generation vs Consumption</h3>
          <EnergyChart 
            data={{
              solar: energyData.solar.current,
              wind: energyData.wind.current,
              consumption: energyData.consumption.current,
              battery: energyData.battery.current
            }}
          />
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-3">
                <Sun className="w-6 h-6 text-yellow-600" />
                <div>
                  <p className="font-medium text-gray-800">Solar Array</p>
                  <p className="text-sm text-gray-600">{energyData.solar.current.toFixed(1)} kW • {energyData.solar.efficiency}% efficiency</p>
                </div>
              </div>
              <StatusIndicator status="optimal" label="Optimal" />
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <Wind className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">Wind Turbine</p>
                  <p className="text-sm text-gray-600">{energyData.wind.current.toFixed(1)} kW • {energyData.wind.efficiency}% efficiency</p>
                </div>
              </div>
              <StatusIndicator status="good" label="Good" />
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-3">
                <Battery className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-800">Battery Storage</p>
                  <p className="text-sm text-gray-600">{energyData.battery.current.toFixed(0)}% • {energyData.battery.capacity} kWh capacity</p>
                </div>
              </div>
              <StatusIndicator 
                status={energyData.battery.charging ? 'charging' : 'discharging'} 
                label={energyData.battery.charging ? 'Charging' : 'Discharging'} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Weather Conditions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Weather</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Solar Irradiance</span>
              <span className="font-semibold text-yellow-600">{weatherData.solarIrradiance} W/m²</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Wind Speed</span>
              <span className="font-semibold text-blue-600">{weatherData.windSpeed.toFixed(1)} m/s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Temperature</span>
              <span className="font-semibold text-green-600">{weatherData.temperature.toFixed(1)}°C</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Forecast</span>
              <span className="font-semibold text-gray-800">{weatherData.forecast}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Energy Balance</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Generation</span>
              <span className="font-semibold text-green-600">{totalGeneration.toFixed(1)} kW</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Self Consumption</span>
              <span className="font-semibold text-blue-600">{selfConsumption.toFixed(1)} kW</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Grid Import</span>
              <span className="font-semibold text-red-600">{gridDependence.toFixed(1)} kW</span>
            </div>
            {surplus > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Surplus Export</span>
                <span className="font-semibold text-purple-600">{surplus.toFixed(1)} kW</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Energy Generated</span>
              <span className="font-semibold text-green-600">1,245 kWh</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Grid Savings</span>
              <span className="font-semibold text-blue-600">₹3,247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">CO₂ Avoided</span>
              <span className="font-semibold text-green-600">892 kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Renewable %</span>
              <span className="font-semibold text-purple-600">78.3%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;