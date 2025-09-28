import React, { useState } from 'react';
import { 
  Download, 
  Calendar, 
  BarChart3, 
  FileText, 
  TrendingUp, 
  Share2,
  Filter,
  Eye
} from 'lucide-react';

const ReportsPanel = () => {
  const [selectedReport, setSelectedReport] = useState('monthly');
  const [dateRange, setDateRange] = useState('current');
  
  const reportTypes = [
    {
      id: 'daily',
      name: 'Daily Operations Report',
      description: 'Comprehensive daily energy generation, consumption, and efficiency metrics',
      icon: Calendar,
      frequency: 'Daily',
      size: '2.4 MB',
      lastGenerated: '2025-01-15 06:00:00'
    },
    {
      id: 'weekly',
      name: 'Weekly Performance Summary',
      description: 'Weekly analysis of system performance, optimization opportunities, and maintenance needs',
      icon: BarChart3,
      frequency: 'Weekly',
      size: '8.7 MB',
      lastGenerated: '2025-01-13 06:00:00'
    },
    {
      id: 'monthly',
      name: 'Monthly Sustainability Report',
      description: 'Detailed monthly report including carbon savings, financial impact, and compliance metrics',
      icon: FileText,
      frequency: 'Monthly',
      size: '15.2 MB',
      lastGenerated: '2024-12-31 23:59:59'
    },
    {
      id: 'quarterly',
      name: 'Quarterly Strategic Analysis',
      description: 'Quarterly review of system optimization, ROI analysis, and future planning recommendations',
      icon: TrendingUp,
      frequency: 'Quarterly',
      size: '23.8 MB',
      lastGenerated: '2024-12-31 23:59:59'
    }
  ];

  const generatedReports = [
    {
      id: 1,
      name: 'January 2025 - Daily Operations Report',
      type: 'daily',
      date: '2025-01-15',
      size: '2.4 MB',
      format: 'PDF',
      status: 'Ready'
    },
    {
      id: 2,
      name: 'Week 2 2025 - Performance Summary',
      type: 'weekly',
      date: '2025-01-13',
      size: '8.7 MB',
      format: 'PDF',
      status: 'Ready'
    },
    {
      id: 3,
      name: 'December 2024 - Sustainability Report',
      type: 'monthly',
      date: '2024-12-31',
      size: '15.2 MB',
      format: 'PDF',
      status: 'Ready'
    },
    {
      id: 4,
      name: 'Q4 2024 - Strategic Analysis',
      type: 'quarterly',
      date: '2024-12-31',
      size: '23.8 MB',
      format: 'PDF',
      status: 'Ready'
    },
    {
      id: 5,
      name: 'November 2024 - Sustainability Report',
      type: 'monthly',
      date: '2024-11-30',
      size: '14.8 MB',
      format: 'PDF',
      status: 'Archived'
    }
  ];

  const keyMetrics = {
    daily: {
      energyGenerated: '1,247 kWh',
      carbonAvoided: '892 kg CO₂',
      costSavings: '₹3,247',
      efficiency: '87.3%',
      uptime: '99.8%'
    },
    weekly: {
      energyGenerated: '8,890 kWh',
      carbonAvoided: '6,356 kg CO₂',
      costSavings: '₹23,147',
      efficiency: '84.7%',
      uptime: '98.9%'
    },
    monthly: {
      energyGenerated: '34,890 kWh',
      carbonAvoided: '24,967 kg CO₂',
      costSavings: '₹90,847',
      efficiency: '82.1%',
      uptime: '99.2%'
    },
    quarterly: {
      energyGenerated: '125,640 kWh',
      carbonAvoided: '89,858 kg CO₂',
      costSavings: '₹327,456',
      efficiency: '83.4%',
      uptime: '98.7%'
    }
  };

  const handleDownloadReport = (reportId: number) => {
    // Simulate report download
    console.log(`Downloading report ${reportId}`);
  };

  const handleGenerateReport = () => {
    // Simulate report generation
    console.log(`Generating ${selectedReport} report for ${dateRange} period`);
  };

  const handleShareReport = (reportId: number) => {
    // Simulate report sharing
    console.log(`Sharing report ${reportId}`);
  };

  const handlePreviewReport = (reportId: number) => {
    // Simulate report preview
    console.log(`Previewing report ${reportId}`);
  };

  const currentMetrics = keyMetrics[selectedReport as keyof typeof keyMetrics];
  const selectedReportType = reportTypes.find(type => type.id === selectedReport);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Reports & Analytics</h2>
            <p className="text-gray-600">Generate and manage comprehensive energy system reports</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button
              onClick={handleGenerateReport}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* Report Type Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {reportTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedReport(type.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedReport === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className={`w-6 h-6 ${selectedReport === type.id ? 'text-blue-600' : 'text-gray-600'}`} />
                  <span className={`font-medium ${selectedReport === type.id ? 'text-blue-800' : 'text-gray-800'}`}>
                    {type.frequency}
                  </span>
                </div>
                <h3 className={`text-sm font-medium mb-1 ${selectedReport === type.id ? 'text-blue-800' : 'text-gray-800'}`}>
                  {type.name}
                </h3>
                <p className="text-xs text-gray-600">{type.description}</p>
              </button>
            );
          })}
        </div>

        {/* Date Range Selector */}
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Time Period:</span>
          <div className="flex space-x-2">
            {['current', 'previous', 'custom'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors capitalize ${
                  dateRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Report Preview */}
      {selectedReportType && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{selectedReportType.name} Preview</h3>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <span className="text-sm text-green-600">Energy Generated</span>
              <p className="text-xl font-bold text-green-800">{currentMetrics.energyGenerated}</p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <span className="text-sm text-blue-600">Carbon Avoided</span>
              <p className="text-xl font-bold text-blue-800">{currentMetrics.carbonAvoided}</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <span className="text-sm text-purple-600">Cost Savings</span>
              <p className="text-xl font-bold text-purple-800">{currentMetrics.costSavings}</p>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <span className="text-sm text-yellow-600">System Efficiency</span>
              <p className="text-xl font-bold text-yellow-800">{currentMetrics.efficiency}</p>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <span className="text-sm text-indigo-600">Uptime</span>
              <p className="text-xl font-bold text-indigo-800">{currentMetrics.uptime}</p>
            </div>
          </div>

          {/* Report Sections */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="font-medium text-gray-800 mb-3">Report Sections Include:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Executive Summary</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Energy Generation Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Carbon Footprint Tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Financial Performance</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>System Efficiency Metrics</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span>Maintenance & Alerts Summary</span>
              </div>
              {selectedReport === 'monthly' || selectedReport === 'quarterly' ? (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>Compliance & Certifications</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span>Optimization Recommendations</span>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Generated Reports */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Reports</h3>
        
        <div className="space-y-3">
          {generatedReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800">{report.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Generated: {report.date}</span>
                    <span>Size: {report.size}</span>
                    <span>Format: {report.format}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      report.status === 'Ready' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePreviewReport(report.id)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleShareReport(report.id)}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => handleDownloadReport(report.id)}
                  className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statutory Reporting */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Statutory & Compliance Reporting</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Required Reports</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-sm text-green-800">ISO 14001 Environmental Report</span>
                <span className="text-xs text-green-600">Due: March 31, 2025</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-sm text-blue-800">Carbon Disclosure Project (CDP)</span>
                <span className="text-xs text-blue-600">Due: July 31, 2025</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <span className="text-sm text-yellow-800">Ministry of Power Returns</span>
                <span className="text-xs text-yellow-600">Due: Monthly</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Export Formats</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
                <FileText className="w-6 h-6 text-gray-600 mx-auto mb-1" />
                <span className="text-sm font-medium">PDF</span>
              </button>
              
              <button className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center">
                <BarChart3 className="w-6 h-6 text-gray-600 mx-auto mb-1" />
                <span className="text-sm font-medium">Excel</span>
              </button>
              
              <button className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center">
                <Share2 className="w-6 h-6 text-gray-600 mx-auto mb-1" />
                <span className="text-sm font-medium">XML</span>
              </button>
              
              <button className="p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-colors text-center">
                <Download className="w-6 h-6 text-gray-600 mx-auto mb-1" />
                <span className="text-sm font-medium">CSV</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPanel;