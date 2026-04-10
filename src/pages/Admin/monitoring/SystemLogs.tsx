// src/pages/Admin/monitoring/SystemLogs.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Search, Filter, Download, Trash2, Eye, AlertCircle, 
  CheckCircle, Info, AlertTriangle, Clock, User, Activity, 
  Server, Database, Shield, RefreshCw, Calendar, ChevronDown
} from 'lucide-react';
import ReusableButton from '../../../components/Reusable/ReusableButton';
import ReusableTable from '../../../components/Reusable/ReusableTable';
import SuccessPopup from '../../../components/Reusable/SuccessPopup';

interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  source: string;
  message: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
}

const deepTeal = "#007590";

const SystemLogs: React.FC = () => {
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<SystemLog | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock log data
  const mockLogs: SystemLog[] = [
    { id: '1', timestamp: new Date().toISOString(), level: 'info', source: 'Auth Service', message: 'User login successful', userId: 'user_123', ipAddress: '192.168.1.100', userAgent: 'Chrome/120.0' },
    { id: '2', timestamp: new Date(Date.now() - 300000).toISOString(), level: 'warning', source: 'Payment Gateway', message: 'Payment processing delay detected', userId: 'user_456', ipAddress: '192.168.1.101', userAgent: 'Firefox/121.0' },
    { id: '3', timestamp: new Date(Date.now() - 600000).toISOString(), level: 'error', source: 'Database', message: 'Connection pool timeout', ipAddress: 'localhost', userAgent: 'System' },
    { id: '4', timestamp: new Date(Date.now() - 900000).toISOString(), level: 'info', source: 'API Gateway', message: 'New theater registration submitted', userId: 'theater_789', ipAddress: '192.168.1.102', userAgent: 'Postman/10.0' },
    { id: '5', timestamp: new Date(Date.now() - 1200000).toISOString(), level: 'warning', source: 'Cache Service', message: 'Redis memory usage above 80%', ipAddress: 'localhost', userAgent: 'System' },
    { id: '6', timestamp: new Date(Date.now() - 1800000).toISOString(), level: 'info', source: 'Email Service', message: 'Welcome email sent to new theater', userId: 'theater_101', ipAddress: '192.168.1.103', userAgent: 'NodeMailer' },
    { id: '7', timestamp: new Date(Date.now() - 2400000).toISOString(), level: 'error', source: 'Search Service', message: 'Elasticsearch indexing failed', ipAddress: 'localhost', userAgent: 'System' },
    { id: '8', timestamp: new Date(Date.now() - 3600000).toISOString(), level: 'info', source: 'Auth Service', message: 'Password reset requested', userId: 'user_202', ipAddress: '192.168.1.104', userAgent: 'Safari/17.0' }
  ];

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setLogs(mockLogs);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelBadge = (level: string) => {
    const configs: Record<string, { icon: any; color: string; bg: string }> = {
      info: { icon: Info, color: 'text-blue-700', bg: 'bg-blue-100' },
      warning: { icon: AlertTriangle, color: 'text-yellow-700', bg: 'bg-yellow-100' },
      error: { icon: AlertCircle, color: 'text-red-700', bg: 'bg-red-100' },
      debug: { icon: Activity, color: 'text-gray-700', bg: 'bg-gray-100' }
    };
    const config = configs[level];
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
        <Icon className="h-3 w-3" />
        {level.toUpperCase()}
      </span>
    );
  };

  const handleExport = () => {
    const exportData = filteredLogs.map(log => ({
      Timestamp: new Date(log.timestamp).toLocaleString(),
      Level: log.level,
      Source: log.source,
      Message: log.message,
      UserId: log.userId || 'N/A',
      IP: log.ipAddress || 'N/A'
    }));
    
    const csv = convertToCSV(exportData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-logs-${new Date().toISOString()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    setShowSuccess(true);
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => headers.map(header => JSON.stringify(row[header] || '')).join(','))
    ];
    return csvRows.join('\n');
  };

  const handleClearLogs = () => {
    if (window.confirm('Are you sure you want to clear all logs? This action cannot be undone.')) {
      setLogs([]);
      setShowSuccess(true);
    }
  };

  const sources = ['all', ...Array.from(new Set(logs.map(l => l.source)))];
  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || log.level === filterLevel;
    const matchesSource = filterSource === 'all' || log.source === filterSource;
    return matchesSearch && matchesLevel && matchesSource;
  });

  const columns = [
    {
      Header: 'Timestamp',
      accessor: 'timestamp',
      sortable: true,
      Cell: (row: SystemLog) => (
        <div className="text-sm">
          <div>{new Date(row.timestamp).toLocaleDateString()}</div>
          <div className="text-xs text-gray-500">{new Date(row.timestamp).toLocaleTimeString()}</div>
        </div>
      )
    },
    {
      Header: 'Level',
      accessor: 'level',
      sortable: true,
      Cell: (row: SystemLog) => getLevelBadge(row.level)
    },
    {
      Header: 'Source',
      accessor: 'source',
      sortable: true,
      Cell: (row: SystemLog) => (
        <div className="flex items-center gap-2">
          <Server className="h-3 w-3 text-gray-400" />
          <span className="text-sm text-gray-700">{row.source}</span>
        </div>
      )
    },
    {
      Header: 'Message',
      accessor: 'message',
      sortable: true,
      Cell: (row: SystemLog) => (
        <div className="max-w-md">
          <p className="text-sm text-gray-700 truncate">{row.message}</p>
          {row.userId && <p className="text-xs text-gray-500 mt-0.5">User: {row.userId}</p>}
        </div>
      )
    },
    {
      Header: 'Actions',
      accessor: 'id',
      sortable: false,
      Cell: (row: SystemLog) => (
        <button
          onClick={() => { setSelectedLog(row); setShowDetails(true); }}
          className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
          title="View Details"
        >
          <Eye className="h-4 w-4 text-blue-600" />
        </button>
      )
    }
  ];

  const levelCounts = {
    info: logs.filter(l => l.level === 'info').length,
    warning: logs.filter(l => l.level === 'warning').length,
    error: logs.filter(l => l.level === 'error').length,
    debug: logs.filter(l => l.level === 'debug').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="h-8 w-8" style={{ color: deepTeal }} />
            System Logs
          </h1>
          <p className="text-gray-500 mt-1">View and analyze system events, errors, and activities</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Total Logs</span>
              <FileText className="h-4 w-4 text-gray-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{logs.length}</p>
            <p className="text-xs text-gray-500 mt-1">Last 24 hours</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Errors</span>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-red-600">{levelCounts.error}</p>
            <p className="text-xs text-gray-500 mt-1">Critical issues</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Warnings</span>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-yellow-600">{levelCounts.warning}</p>
            <p className="text-xs text-gray-500 mt-1">Needs attention</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Info Events</span>
              <Info className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{levelCounts.info}</p>
            <p className="text-xs text-gray-500 mt-1">Informational</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:outline-none"
                style={{ focusRingColor: deepTeal }}
              />
            </div>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
            >
              <option value="all">All Levels</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="debug">Debug</option>
            </select>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
            >
              {sources.map(source => (
                <option key={source} value={source}>
                  {source === 'all' ? 'All Sources' : source}
                </option>
              ))}
            </select>
            <ReusableButton size="sm" variant="secondary" icon={Download} onClick={handleExport}>
              Export
            </ReusableButton>
            <ReusableButton size="sm" variant="danger" icon={Trash2} onClick={handleClearLogs}>
              Clear Logs
            </ReusableButton>
            <ReusableButton size="sm" variant="secondary" icon={RefreshCw} onClick={fetchLogs} loading={loading}>
              Refresh
            </ReusableButton>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <ReusableTable
            columns={columns}
            data={filteredLogs}
            title="System Event Logs"
            icon={FileText}
            showSearch={false}
            showExport={false}
            showPrint={false}
            itemsPerPage={15}
          />
        </div>

        {/* Log Details Modal */}
        {showDetails && selectedLog && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Log Details</h2>
                <button onClick={() => setShowDetails(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Timestamp</label>
                    <p className="font-medium">{new Date(selectedLog.timestamp).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Level</label>
                    <div>{getLevelBadge(selectedLog.level)}</div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase">Source</label>
                    <p className="font-medium">{selectedLog.source}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase">User ID</label>
                    <p className="font-medium">{selectedLog.userId || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase">IP Address</label>
                    <p className="font-medium">{selectedLog.ipAddress || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase">User Agent</label>
                    <p className="font-medium text-sm">{selectedLog.userAgent || 'N/A'}</p>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">Message</label>
                  <p className="mt-1 p-3 bg-gray-50 rounded-lg font-mono text-sm">{selectedLog.message}</p>
                </div>
              </div>
              <div className="border-t px-6 py-4 flex justify-end">
                <ReusableButton variant="secondary" onClick={() => setShowDetails(false)}>Close</ReusableButton>
              </div>
            </motion.div>
          </div>
        )}

        <SuccessPopup
          isOpen={showSuccess}
          onClose={() => setShowSuccess(false)}
          type="success"
          title="Success"
          message="Operation completed successfully"
          duration={3000}
          position="top-right"
        />
      </div>
    </div>
  );
};

export default SystemLogs;