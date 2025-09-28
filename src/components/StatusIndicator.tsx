import React from 'react';
import { Check, AlertTriangle, Zap, Battery } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'optimal' | 'good' | 'warning' | 'error' | 'charging' | 'discharging';
  label: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, label }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'optimal':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: Check,
          iconColor: 'text-green-600'
        };
      case 'good':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          icon: Check,
          iconColor: 'text-blue-600'
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          icon: AlertTriangle,
          iconColor: 'text-yellow-600'
        };
      case 'error':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          icon: AlertTriangle,
          iconColor: 'text-red-600'
        };
      case 'charging':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: Zap,
          iconColor: 'text-green-600'
        };
      case 'discharging':
        return {
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-800',
          icon: Battery,
          iconColor: 'text-orange-600'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: Check,
          iconColor: 'text-gray-600'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}>
      <Icon className={`w-3 h-3 mr-1 ${config.iconColor}`} />
      {label}
    </div>
  );
};

export default StatusIndicator;