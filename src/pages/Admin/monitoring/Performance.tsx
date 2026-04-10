// src/pages/Admin/monitoring/PlatformHealth.tsx
import React, { useState, useEffect } from 'react';
import { 
  FiActivity, FiHeart, FiServer, FiDatabase, FiCloud, FiWifi, 
  FiCheckCircle, FiXCircle, FiAlertCircle, FiClock, FiRefreshCw, 
  FiTrendingUp, FiTrendingDown, FiCpu, FiHardDrive, FiZap, 
  FiShield, FiEye, FiBell, FiCalendar, FiDownload, FiUsers,
  FiUserCheck, FiUserPlus, FiUserX
} from 'react-icons/fi';
import { MdHealthAndSafety } from 'react-icons/md';
import ReusableButton from '../../../components/Reusable/ReusableButton';
import ReusableTable from '../../../components/Reusable/ReusableTable';
import SuccessPopup from '../../../components/Reusable/SuccessPopup';

interface HealthMetric {
  id: string;
  name: string;
  status: 'healthy' | 'degraded' | 'down' | 'warning';
  responseTime: number;
  uptime: number;
  lastChecked: string;
  endpoint: string;
}

interface SystemHealth {
  overall: 'healthy' | 'degraded' | 'down';
  uptime: number;
  activeUsers: number;
  requestsPerMinute: number;
  errorRate: number;
  lastIncident: string | null;
}

const deepTeal = "#007590";

const PlatformHealth: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    overall: 'healthy',
    uptime: 99.98,
    activeUsers: 1247,
    requestsPerMinute: 3450,
    errorRate: 0.02,
    lastIncident: null
  });
  const [metrics, setMetrics] = useState<HealthMetric[]>([
    { id: '1', name: 'API Gateway', status: 'healthy', responseTime: 45, uptime: 99.99, lastChecked: new Date().toISOString(), endpoint: '/api/v1/health' },
    { id: '2', name: 'Authentication Service', status: 'healthy', responseTime: 32, uptime: 99.99, lastChecked: new Date().toISOString(), endpoint: '/api/v1/auth/health' },
    { id: '3', name: 'Payment Gateway', status: 'healthy', responseTime: 78, uptime: 99.95, lastChecked: new Date().toISOString(), endpoint: '/api/v1/payments/health' },
    { id: '4', name: 'Database Cluster', status: 'healthy', responseTime: 23, uptime: 99.99, lastChecked: new Date().toISOString(), endpoint: '/api/v1/db/health' },
    { id: '5', name: 'Redis Cache', status: 'degraded', responseTime: 89, uptime: 99.87, lastChecked: new Date().toISOString(), endpoint: '/api/v1/cache/health' },
    { id: '6', name: 'Email Service', status: 'healthy', responseTime: 156, uptime: 99.92, lastChecked: new Date().toISOString(), endpoint: '/api/v1/email/health' },
    { id: '7', name: 'CDN Network', status: 'healthy', responseTime: 34, uptime: 99.99, lastChecked: new Date().toISOString(), endpoint: '/api/v1/cdn/health' },
    { id: '8', name: 'Search Service', status: 'warning', responseTime: 234, uptime: 99.78, lastChecked: new Date().toISOString(), endpoint: '/api/v1/search/health' }
  ]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchHealthData();
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchHealthData, 30000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const fetchHealthData = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        responseTime: Math.floor(Math.random() * 200) + 20,
        lastChecked: new Date().toISOString()
      })));
      setSystemHealth(prev => ({
        ...prev,
        activeUsers: Math.floor(Math.random() * 500) + 1000,
        requestsPerMinute: Math.floor(Math.random() * 2000) + 2500
      }));
    } catch (error) {
      console.error('Error fetching health data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const configs: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
      healthy: { icon: FiCheckCircle, color: 'text-green-700', bg: 'bg-green-100' },
      degraded: { icon: FiAlertCircle, color: 'text-yellow-700', bg: 'bg-yellow-100' },
      down: { icon: FiXCircle, color: 'text-red-700', bg: 'bg-red-100' },
      warning: { icon: FiAlertCircle, color: 'text-orange-700', bg: 'bg-orange-100' }
    };
    const config = configs[status];
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getOverallStatus = () => {
    const configs: Record<string, { icon: React.ElementType; color: string; bg: string; text: string }> = {
      healthy: { icon: FiCheckCircle, color: 'text-green-600', bg: 'bg-green-50', text: 'All systems operational' },
      degraded: { icon: FiAlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-50', text: 'Partial system degradation' },
      down: { icon: FiXCircle, color: 'text-red-600', bg: 'bg-red-50', text: 'Major system outage' }
    };
    const config = configs[systemHealth.overall];
    const Icon = config.icon;
    return { Icon, ...config };
  };

  const columns = [
    {
      Header: 'Service',
      accessor: 'name',
      sortable: true,
      Cell: (row: HealthMetric) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
            <FiServer className="h-4 w-4 text-gray-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.endpoint}</p>
          </div>
        </div>
      )
    },
    {
      Header: 'Status',
      accessor: 'status',
      sortable: true,
      Cell: (row: HealthMetric) => getStatusBadge(row.status)
    },
    {
      Header: 'Response Time',
      accessor: 'responseTime',
      sortable: true,
      Cell: (row: HealthMetric) => (
        <div className="flex items-center gap-2">
          <FiClock className="h-3 w-3 text-gray-400" />
          <span className={`font-medium ${row.responseTime > 100 ? 'text-yellow-600' : row.responseTime > 200 ? 'text-red-600' : 'text-green-600'}`}>
            {row.responseTime}ms
          </span>
        </div>
      )
    },
    {
      Header: 'Uptime',
      accessor: 'uptime',
      sortable: true,
      Cell: (row: HealthMetric) => (
        <span className="text-gray-700">{row.uptime}%</span>
      )
    },
    {
      Header: 'Last Checked',
      accessor: 'lastChecked',
      sortable: true,
      Cell: (row: HealthMetric) => (
        <span className="text-sm text-gray-500">
          {new Date(row.lastChecked).toLocaleTimeString()}
        </span>
      )
    }
  ];

  const overallStatus = getOverallStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <MdHealthAndSafety className="h-8 w-8" style={{ color: deepTeal }} />
            Platform Health
          </h1>
          <p className="text-gray-500 mt-1">Monitor system health, service status, and performance metrics</p>
        </div>

        {/* Overall Status Card */}
        <div className={`rounded-2xl p-6 mb-6 ${overallStatus.bg} border`} style={{ borderColor: `${deepTeal}20` }}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white shadow-sm">
                <overallStatus.Icon className={`h-8 w-8 ${overallStatus.color}`} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">System Status: {systemHealth.overall.toUpperCase()}</h2>
                <p className="text-gray-600">{overallStatus.text}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <ReusableButton
                variant="secondary"
                size="sm"
                icon={FiRefreshCw}
                onClick={fetchHealthData}
                loading={loading}
              >
                Refresh
              </ReusableButton>
              <ReusableButton
                variant={autoRefresh ? "danger" : "secondary"}
                size="sm"
                icon={FiBell}
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                {autoRefresh ? 'Auto-refresh On' : 'Auto-refresh Off'}
              </ReusableButton>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Uptime</span>
              <FiHeart className="h-4 w-4 text-red-400" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{systemHealth.uptime}%</p>
            <p className="text-xs text-green-600 mt-1">Last 30 days</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Active Users</span>
              <FiUsers className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{systemHealth.activeUsers}</p>
            <p className="text-xs text-green-600 mt-1">
              <FiTrendingUp className="h-3 w-3 inline mr-1" />
              +12% from yesterday
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Requests/min</span>
              <FiZap className="h-4 w-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{systemHealth.requestsPerMinute}</p>
            <p className="text-xs text-gray-500 mt-1">Peak: 4,200</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Error Rate</span>
              <FiAlertCircle className="h-4 w-4 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{systemHealth.errorRate}%</p>
            <p className="text-xs text-green-600 mt-1">Below threshold (0.05%)</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Last Incident</span>
              <FiCalendar className="h-4 w-4 text-gray-500" />
            </div>
            <p className="text-lg font-medium text-gray-900">
              {systemHealth.lastIncident || 'No incidents'}
            </p>
            <p className="text-xs text-green-600 mt-1">All systems stable</p>
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FiServer className="h-5 w-5" style={{ color: deepTeal }} />
              <h2 className="text-lg font-semibold text-gray-900">Service Health</h2>
            </div>
            <ReusableButton size="sm" variant="secondary" icon={FiDownload} onClick={() => setShowSuccess(true)}>
              Export Report
            </ReusableButton>
          </div>
          <ReusableTable
            columns={columns}
            data={metrics}
            showSearch={true}
            showExport={false}
            showPrint={false}
            itemsPerPage={10}
          />
        </div>
      </div>

      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        type="success"
        title="Exported"
        message="Health report exported successfully"
        duration={3000}
        position="top-right"
      />
    </div>
  );
};

export default PlatformHealth;