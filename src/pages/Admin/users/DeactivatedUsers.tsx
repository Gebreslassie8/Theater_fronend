// src/pages/Admin/users/DeactivatedUsers.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    UserX,
    UserCheck,
    Calendar,
    Clock,
    Mail,
    Phone,
    AlertCircle,
    Search,
    Filter,
    Eye,
    Edit,
    RefreshCw,
    Trash2,
    Download,
    Printer,
    Shield,
    User,
    Ban,
    CheckCircle,
    XCircle
} from 'lucide-react';
import ReusableTable from '../../../components/Reusable/ReusableTable';
import ReusableButton from '../../../components/Reusable/ReusableButton';
import SuccessPopup from '../../../components/Reusable/SuccessPopup';
import ViewUsers from './ViewUsers';

// Types
interface DeactivatedUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    previousRole: string;
    deactivatedDate: string;
    deactivatedBy: string;
    reason: string;
    canBeActivated: boolean;
    lastActive: string;
    totalBookings: number;
    totalSpent: number;
}

// Mock Deactivated Users Data
const mockDeactivatedUsers: DeactivatedUser[] = [
    {
        id: 101,
        name: 'David Brown',
        email: 'david.brown@example.com',
        phone: '+251 915 678 901',
        role: 'User',
        previousRole: 'Manager',
        deactivatedDate: '2024-03-15',
        deactivatedBy: 'Admin',
        reason: 'Violation of terms',
        canBeActivated: true,
        lastActive: '2024-03-10',
        totalBookings: 5,
        totalSpent: 1200
    },
    {
        id: 102,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+251 916 789 012',
        role: 'User',
        previousRole: 'Theater Owner',
        deactivatedDate: '2024-03-20',
        deactivatedBy: 'System',
        reason: 'Inactive for 90 days',
        canBeActivated: true,
        lastActive: '2024-03-18',
        totalBookings: 28,
        totalSpent: 7600
    },
    {
        id: 103,
        name: 'Michael Chen',
        email: 'michael.chen@example.com',
        phone: '+251 917 890 123',
        role: 'User',
        previousRole: 'Manager',
        deactivatedDate: '2024-03-25',
        deactivatedBy: 'Admin',
        reason: 'Requested deactivation',
        canBeActivated: true,
        lastActive: '2024-03-24',
        totalBookings: 12,
        totalSpent: 3400
    },
    {
        id: 104,
        name: 'Robert Kim',
        email: 'robert.kim@example.com',
        phone: '+251 918 901 234',
        role: 'User',
        previousRole: 'User',
        deactivatedDate: '2024-03-28',
        deactivatedBy: 'System',
        reason: 'Security violation',
        canBeActivated: false,
        lastActive: '2024-03-27',
        totalBookings: 3,
        totalSpent: 850
    }
];

const DeactivatedUsers: React.FC = () => {
    const [deactivatedUsers, setDeactivatedUsers] = useState<DeactivatedUser[]>(mockDeactivatedUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<DeactivatedUser | null>(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showActivateConfirm, setShowActivateConfirm] = useState(false);
    const [userToActivate, setUserToActivate] = useState<DeactivatedUser | null>(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState({ title: '', message: '', type: 'success' as any });

    // Filter users
    const filteredUsers = deactivatedUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleActivateUser = () => {
        if (userToActivate) {
            // Remove from deactivated list (in real app, move back to active users)
            setDeactivatedUsers(deactivatedUsers.filter(u => u.id !== userToActivate.id));
            setShowActivateConfirm(false);
            setUserToActivate(null);
            setPopupMessage({
                title: 'User Activated!',
                message: `${userToActivate.name} has been reactivated with ${userToActivate.previousRole} role`,
                type: 'success'
            });
            setShowSuccessPopup(true);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Column definitions
    const columns = [
        {
            Header: 'User',
            accessor: 'name',
            sortable: true,
            Cell: (row: DeactivatedUser) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center text-white font-bold">
                        {row.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-medium text-gray-900">{row.name}</p>
                        <p className="text-xs text-gray-500">{row.email}</p>
                    </div>
                </div>
            )
        },
        {
            Header: 'Previous Role',
            accessor: 'previousRole',
            sortable: true,
            Cell: (row: DeactivatedUser) => (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                    <Shield className="h-3 w-3" />
                    {row.previousRole}
                </span>
            )
        },
        {
            Header: 'Deactivated Date',
            accessor: 'deactivatedDate',
            sortable: true,
            Cell: (row: DeactivatedUser) => (
                <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3 text-gray-400" />
                    <span className="text-sm text-gray-600">{formatDate(row.deactivatedDate)}</span>
                </div>
            )
        },
        {
            Header: 'Deactivated By',
            accessor: 'deactivatedBy',
            sortable: true,
            Cell: (row: DeactivatedUser) => (
                <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-gray-400" />
                    <span className="text-sm text-gray-600">{row.deactivatedBy}</span>
                </div>
            )
        },
        {
            Header: 'Reason',
            accessor: 'reason',
            sortable: true,
            Cell: (row: DeactivatedUser) => (
                <span className="text-sm text-gray-600">{row.reason}</span>
            )
        },
        {
            Header: 'Status',
            accessor: 'canBeActivated',
            Cell: (row: DeactivatedUser) => (
                row.canBeActivated ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        <Clock className="h-3 w-3" />
                        Can be Activated
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <XCircle className="h-3 w-3" />
                        Permanent
                    </span>
                )
            )
        }
    ];

    // Action buttons
    const actions = [
        {
            label: 'View Details',
            icon: Eye,
            onClick: (row: DeactivatedUser) => {
                setSelectedUser(row);
                setShowViewModal(true);
            },
            color: 'info' as const
        },
        {
            label: 'Activate User',
            icon: UserCheck,
            onClick: (row: DeactivatedUser) => {
                if (row.canBeActivated) {
                    setUserToActivate(row);
                    setShowActivateConfirm(true);
                }
            },
            color: 'success' as const,
            show: (row: DeactivatedUser) => row.canBeActivated
        }
    ];

    const stats = {
        totalDeactivated: deactivatedUsers.length,
        canBeActivated: deactivatedUsers.filter(u => u.canBeActivated).length,
        permanent: deactivatedUsers.filter(u => !u.canBeActivated).length,
        deactivatedThisMonth: deactivatedUsers.filter(u => {
            const deactDate = new Date(u.deactivatedDate);
            const now = new Date();
            return deactDate.getMonth() === now.getMonth() && deactDate.getFullYear() === now.getFullYear();
        }).length
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-red-100 rounded-xl">
                                    <UserX className="h-6 w-6 text-red-600" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">Deactivated Users</h1>
                            </div>
                            <p className="text-gray-600">View and manage deactivated user accounts</p>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Deactivated</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalDeactivated}</p>
                            </div>
                            <div className="p-2 bg-red-100 rounded-lg">
                                <UserX className="h-5 w-5 text-red-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Can be Activated</p>
                                <p className="text-2xl font-bold text-yellow-600">{stats.canBeActivated}</p>
                            </div>
                            <div className="p-2 bg-yellow-100 rounded-lg">
                                <RefreshCw className="h-5 w-5 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Permanent</p>
                                <p className="text-2xl font-bold text-red-600">{stats.permanent}</p>
                            </div>
                            <div className="p-2 bg-red-100 rounded-lg">
                                <Ban className="h-5 w-5 text-red-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">This Month</p>
                                <p className="text-2xl font-bold text-blue-600">{stats.deactivatedThisMonth}</p>
                            </div>
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="relative flex-1 min-w-[280px]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search deactivated users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        />
                    </div>
                </div>

                {/* Table */}
                <ReusableTable
                    columns={columns}
                    data={filteredUsers}
                    actions={actions}
                    title="Deactivated Users List"
                    icon={UserX}
                    showSearch={false}
                    showExport={true}
                    showPrint={true}
                />

                {/* Activate Confirmation Modal */}
                {showActivateConfirm && userToActivate && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl max-w-md w-full p-6"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <UserCheck className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Activate User</h3>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to activate <strong>{userToActivate.name}</strong>?
                                <br />
                                <span className="text-sm text-gray-500 mt-2 block">
                                    The user will be restored with <strong>{userToActivate.previousRole}</strong> role.
                                </span>
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowActivateConfirm(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleActivateUser}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                >
                                    Activate User
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* View User Modal */}
                {showViewModal && selectedUser && (
                    <ViewUsers
                        user={{
                            id: selectedUser.id,
                            name: selectedUser.name,
                            email: selectedUser.email,
                            phone: selectedUser.phone,
                            role: selectedUser.previousRole as any,
                            status: 'Inactive',
                            joinDate: selectedUser.deactivatedDate,
                            lastActive: selectedUser.lastActive,
                            bookings: selectedUser.totalBookings,
                            totalSpent: selectedUser.totalSpent
                        }}
                        isOpen={showViewModal}
                        onClose={() => {
                            setShowViewModal(false);
                            setSelectedUser(null);
                        }}
                    />
                )}

                {/* Success Popup */}
                <SuccessPopup
                    isOpen={showSuccessPopup}
                    onClose={() => setShowSuccessPopup(false)}
                    type={popupMessage.type}
                    title={popupMessage.title}
                    message={popupMessage.message}
                    duration={3000}
                    position="top-right"
                />
            </div>
        </div>
    );
};

export default DeactivatedUsers;