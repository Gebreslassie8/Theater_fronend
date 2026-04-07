// src/pages/Admin/users/ActivityLogs.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    History,
    User,
    Shield,
    Settings,
    DollarSign,
    Ticket,
    Building,
    Calendar,
    Clock,
    Search,
    Filter,
    Download,
    Printer,
    Eye,
    CheckCircle,
    XCircle,
    AlertCircle,
    LogIn,
    LogOut,
    UserPlus,
    UserMinus,
    Edit,
    Trash2,
    ShieldAlert,
    FileText
} from 'lucide-react';
import ReusableTable from '../../../components/Reusable/ReusableTable';
import SuccessPopup from '../../../components/Reusable/SuccessPopup';

// Types
interface ActivityLog {
    id: string;
    action: string;
    actionType: 'create' | 'update' | 'delete' | 'login' | 'logout' | 'permission_change' | 'role_change' | 'settings_change';
    performedBy: string;
    performedByRole: string;
    target: string;
    targetType: 'user' | 'role' | 'theater' | 'show' | 'payment' | 'settings';
    details: string;
    ipAddress: string;
    userAgent: string;
    timestamp: string;
    status: 'success' | 'failed' | 'pending';
}

// Mock Activity Logs Data
const mockActivityLogs: ActivityLog[] = [
    {
        id: '1',
        action: 'User Created',
        actionType: 'create',
        performedBy: 'Admin User',
        performedByRole: 'Admin',
        target: 'John Doe',
        targetType: 'user',
        details: 'New user account created with role: Manager',
        ipAddress: '192.168.1.1',
        userAgent: 'Chrome/120.0',
        timestamp: '2024-04-05T10:30:00',
        status: 'success'
    },
    {
        id: '2',
        action: 'Role Permissions Updated',
        actionType: 'permission_change',
        performedBy: 'Admin User',
        performedByRole: 'Admin',
        target: 'Manager Role',
        targetType: 'role',
        details: 'Added view_reports, Removed delete_users',
        ipAddress: '192.168.1.1',
        userAgent: 'Chrome/120.0',
        timestamp: '2024-04-05T09:15:00',
        status: 'success'
    },
    {
        id: '3',
        action: 'User Deactivated',
        actionType: 'delete',
        performedBy: 'Admin User',
        performedByRole: 'Admin',
        target: 'David Brown',
        targetType: 'user',
        details: 'User deactivated due to policy violation',
        ipAddress: '192.168.1.1',
        userAgent: 'Chrome/120.0',
        timestamp: '2024-04-04T14:20:00',
        status: 'success'
    },
    {
        id: '4',
        action: 'Login Attempt',
        actionType: 'login',
        performedBy: 'John Doe',
        performedByRole: 'Manager',
        target: 'John Doe',
        targetType: 'user',
        details: 'Successful login from new device',
        ipAddress: '192.168.1.50',
        userAgent: 'Firefox/121.0',
        timestamp: '2024-04-04T08:45:00',
        status: 'success'
    },
    {
        id: '5',
        action: 'Payment Processed',
        actionType: 'create',
        performedBy: 'System',
        performedByRole: 'System',
        target: 'The Lion King Booking',
        targetType: 'payment',
        details: 'Payment of ETB 450 processed via Chapa',
        ipAddress: 'System',
        userAgent: 'System',
        timestamp: '2024-04-03T19:30:00',
        status: 'success'
    },
    {
        id: '6',
        action: 'Theater Created',
        actionType: 'create',
        performedBy: 'Sarah Williams',
        performedByRole: 'Theater Owner',
        target: 'Sunset Theater',
        targetType: 'theater',
        details: 'New theater registration submitted',
        ipAddress: '192.168.1.100',
        userAgent: 'Safari/17.0',
        timestamp: '2024-04-03T11:00:00',
        status: 'pending'
    },
    {
        id: '7',
        action: 'Show Deleted',
        actionType: 'delete',
        performedBy: 'Manager User',
        performedByRole: 'Manager',
        target: 'Chicago Show',
        targetType: 'show',
        details: 'Show cancelled due to low ticket sales',
        ipAddress: '192.168.1.75',
        userAgent: 'Chrome/120.0',
        timestamp: '2024-04-02T16:20:00',
        status: 'success'
    },
    {
        id: '8',
        action: 'Failed Login Attempt',
        actionType: 'login',
        performedBy: 'Unknown',
        performedByRole: 'Unknown',
        target: 'admin@theaterhub.com',
        targetType: 'user',
        details: 'Multiple failed login attempts detected',
        ipAddress: '203.0.113.45',
        userAgent: 'Unknown',
        timestamp: '2024-04-02T03:15:00',
        status: 'failed'
    }
];

const ActivityLogs: React.FC = () => {
    const [logs, setLogs] = useState<ActivityLog[]>(mockActivityLogs);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterActionType, setFilterActionType] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    // Filter logs
    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.performedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.details.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesActionType = filterActionType === 'all' || log.actionType === filterActionType;
        const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
        return matchesSearch && matchesActionType && matchesStatus;
    });

    const getActionIcon = (actionType: string) => {
        switch (actionType) {
            case 'create': return <UserPlus className="h-4 w-4 text-green-500" />;
            case 'update': return <Edit className="h-4 w-4 text-blue-500" />;
            case 'delete': return <Trash2 className="h-4 w-4 text-red-500" />;
            case 'login': return <LogIn className="h-4 w-4 text-green-500" />;
            case 'logout': return <LogOut className="h-4 w-4 text-gray-500" />;
            case 'permission_change': return <ShieldAlert className="h-4 w-4 text-purple-500" />;
            case 'role_change': return <Shield className="h-4 w-4 text-amber-500" />;
            case 'settings_change': return <Settings className="h-4 w-4 text-gray-500" />;
            default: return <Activity className="h-4 w-4 text-gray-500" />;
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'success':
                return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><CheckCircle className="h-3 w-3" /> Success</span>;
            case 'failed':
                return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700"><XCircle className="h-3 w-3" /> Failed</span>;
            default:
                return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"><Clock className="h-3 w-3" /> Pending</span>;
        }
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return {
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
    };

    const columns = [
        {
            Header: 'Action',
            accessor: 'action',
            sortable: true,
            Cell: (row: ActivityLog) => (
                <div className="flex items-center gap-2">
                    {getActionIcon(row.actionType)}
                    <span className="text-sm font-medium text-gray-900">{row.action}</span>
                </div>
            )
        },
        {
            Header: 'Performed By',
            accessor: 'performedBy',
            sortable: true,
            Cell: (row: ActivityLog) => (
                <div>
                    <p className="text-sm font-medium text-gray-900">{row.performedBy}</p>
                    <p className="text-xs text-gray-500">{row.performedByRole}</p>
                </div>
            )
        },
        {
            Header: 'Target',
            accessor: 'target',
            sortable: true,
            Cell: (row: ActivityLog) => (
                <div>
                    <p className="text-sm text-gray-900">{row.target}</p>
                    <p className="text-xs text-gray-500 capitalize">{row.targetType}</p>
                </div>
            )
        },
        {
            Header: 'Timestamp',
            accessor: 'timestamp',
            sortable: true,
            Cell: (row: ActivityLog) => {
                const { date, time } = formatTimestamp(row.timestamp);
                return (
                    <div>
                        <p className="text-sm text-gray-900">{date}</p>
                        <p className="text-xs text-gray-500">{time}</p>
                    </div>
                );
            }
        },
        {
            Header: 'Status',
            accessor: 'status',
            sortable: true,
            Cell: (row: ActivityLog) => getStatusBadge(row.status)
        }
    ];

    const actionTypes = [
        { value: 'all', label: 'All Actions' },
        { value: 'create', label: 'Create' },
        { value: 'update', label: 'Update' },
        { value: 'delete', label: 'Delete' },
        { value: 'login', label: 'Login' },
        { value: 'logout', label: 'Logout' },
        { value: 'permission_change', label: 'Permission Change' },
        { value: 'role_change', label: 'Role Change' },
        { value: 'settings_change', label: 'Settings Change' }
    ];

    const statusTypes = [
        { value: 'all', label: 'All Status' },
        { value: 'success', label: 'Success' },
        { value: 'failed', label: 'Failed' },
        { value: 'pending', label: 'Pending' }
    ];

    const stats = {
        totalLogs: logs.length,
        todayLogs: logs.filter(log => {
            const logDate = new Date(log.timestamp).toDateString();
            const today = new Date().toDateString();
            return logDate === today;
        }).length,
        successLogs: logs.filter(log => log.status === 'success').length,
        failedLogs: logs.filter(log => log.status === 'failed').length
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-100 rounded-xl">
                                    <History className="h-6 w-6 text-blue-600" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
                            </div>
                            <p className="text-gray-600">Track all user activities and system events</p>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Events</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalLogs}</p>
                            </div>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Activity className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Today</p>
                                <p className="text-2xl font-bold text-green-600">{stats.todayLogs}</p>
                            </div>
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Calendar className="h-5 w-5 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Successful</p>
                                <p className="text-2xl font-bold text-green-600">{stats.successLogs}</p>
                            </div>
                            <div className="p-2 bg-green-100 rounded-lg">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Failed</p>
                                <p className="text-2xl font-bold text-red-600">{stats.failedLogs}</p>
                            </div>
                            <div className="p-2 bg-red-100 rounded-lg">
                                <AlertCircle className="h-5 w-5 text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative min-w-[280px]">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search activities..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            />
                        </div>
                        <select
                            value={filterActionType}
                            onChange={(e) => setFilterActionType(e.target.value)}
                            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white min-w-[150px]"
                        >
                            {actionTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white min-w-[140px]"
                        >
                            {statusTypes.map(status => (
                                <option key={status.value} value={status.value}>{status.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                            <Download className="h-4 w-4 text-gray-500" />
                        </button>
                        <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                            <Printer className="h-4 w-4 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <ReusableTable
                    columns={columns}
                    data={filteredLogs}
                    title="Activity Timeline"
                    icon={History}
                    showSearch={false}
                    showExport={false}
                    showPrint={false}
                    onRowClick={(row) => {
                        setSelectedLog(row);
                        setShowDetailsModal(true);
                    }}
                />

                {/* Activity Details Modal */}
                {showDetailsModal && selectedLog && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDetailsModal(false)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Eye className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Activity Details</h2>
                                </div>
                                <button onClick={() => setShowDetailsModal(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                                    <XCircle className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Action</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {getActionIcon(selectedLog.actionType)}
                                            <p className="font-medium text-gray-900">{selectedLog.action}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Status</p>
                                        <div className="mt-1">{getStatusBadge(selectedLog.status)}</div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Performed By</p>
                                        <p className="font-medium text-gray-900 mt-1">{selectedLog.performedBy}</p>
                                        <p className="text-xs text-gray-500">{selectedLog.performedByRole}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Target</p>
                                        <p className="font-medium text-gray-900 mt-1">{selectedLog.target}</p>
                                        <p className="text-xs text-gray-500 capitalize">{selectedLog.targetType}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-xs text-gray-500">Details</p>
                                        <p className="text-sm text-gray-700 mt-1 bg-gray-50 p-3 rounded-lg">{selectedLog.details}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">IP Address</p>
                                        <p className="text-sm font-mono text-gray-600 mt-1">{selectedLog.ipAddress}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">User Agent</p>
                                        <p className="text-sm text-gray-600 mt-1">{selectedLog.userAgent}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Timestamp</p>
                                        <p className="text-sm text-gray-900 mt-1">{formatTimestamp(selectedLog.timestamp).date} at {formatTimestamp(selectedLog.timestamp).time}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                <SuccessPopup
                    isOpen={showSuccessPopup}
                    onClose={() => setShowSuccessPopup(false)}
                    type="info"
                    title="Logs Updated"
                    message="Activity logs have been refreshed"
                    duration={3000}
                    position="top-right"
                />
            </div>
        </div>
    );
};

export default ActivityLogs;