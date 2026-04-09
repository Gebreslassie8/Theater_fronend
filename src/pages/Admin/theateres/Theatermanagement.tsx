// src/pages/Admin/theaters/TheaterManagement.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Building, Eye, Edit, RefreshCw, Ban, Phone, Calendar, DollarSign,
    Ticket, CheckCircle, XCircle, Clock, AlertCircle, Search, TrendingUp,
    Activity, MapPin, Mail, Star, LayoutGrid, UserPlus
} from 'lucide-react';
import ReusableTable from '../../../components/Reusable/ReusableTable';
import ReusableButton from '../../../components/Reusable/ReusableButton';
import SuccessPopup from '../../../components/Reusable/SuccessPopup';
import AddTheater from './AddTheater';
import UpdateTheater from './UpdateTheater';
import ViewTheater from './ViewTheater';

interface Theater {
    id: number;
    name: string;
    ownerName: string;
    email: string;
    phone: string;
    location: string;
    status: 'Active' | 'Inactive' | 'Pending';
    totalRevenue: number;
    totalBookings: number;
    rating: number;
    joinDate: string;
    lastActive: string;
    screens?: number;
    capacity?: number;
}

const mockTheaters: Theater[] = [
    { id: 1, name: 'Grand Cinema', ownerName: 'John Doe', email: 'john@grandcinema.com', phone: '+251 911 234 567', location: 'Addis Ababa, Bole', status: 'Active', totalRevenue: 125000, totalBookings: 3450, rating: 4.8, joinDate: '2024-01-15', lastActive: '2024-04-01', screens: 5, capacity: 1200 },
    { id: 2, name: 'Star Multiplex', ownerName: 'Sarah Johnson', email: 'sarah@starmultiplex.com', phone: '+251 922 345 678', location: 'Addis Ababa, Kazanchis', status: 'Active', totalRevenue: 98000, totalBookings: 2780, rating: 4.6, joinDate: '2024-02-20', lastActive: '2024-04-02', screens: 4, capacity: 950 },
    { id: 3, name: 'City Cinema', ownerName: 'Michael Brown', email: 'michael@citycinema.com', phone: '+251 933 456 789', location: 'Addis Ababa, Piassa', status: 'Inactive', totalRevenue: 45000, totalBookings: 1200, rating: 4.2, joinDate: '2024-01-10', lastActive: '2024-03-15', screens: 3, capacity: 700 },
    { id: 4, name: 'Sunset Theater', ownerName: 'Emily Wilson', email: 'emily@sunsettheater.com', phone: '+251 944 567 890', location: 'Bahir Dar', status: 'Pending', totalRevenue: 0, totalBookings: 0, rating: 0, joinDate: '2024-03-25', lastActive: '2024-03-28', screens: 2, capacity: 400 },
];

const TheaterManagement: React.FC = () => {
    const [theaters, setTheaters] = useState<Theater[]>(mockTheaters);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
    const [viewingTheater, setViewingTheater] = useState<Theater | null>(null);
    const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
    const [showReactivateConfirm, setShowReactivateConfirm] = useState(false);
    const [theaterToDeactivate, setTheaterToDeactivate] = useState<Theater | null>(null);
    const [theaterToReactivate, setTheaterToReactivate] = useState<Theater | null>(null);
    const [deactivationReason, setDeactivationReason] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState({ title: '', message: '', type: 'success' as any });

    const stats = {
        totalTheaters: theaters.length,
        activeTheaters: theaters.filter(t => t.status === 'Active').length,
        pendingTheaters: theaters.filter(t => t.status === 'Pending').length,
        inactiveTheaters: theaters.filter(t => t.status === 'Inactive').length,
        totalRevenue: theaters.reduce((sum, t) => sum + t.totalRevenue, 0),
        totalBookings: theaters.reduce((sum, t) => sum + t.totalBookings, 0),
    };

    const filteredTheaters = theaters.filter(theater => {
        const matchesSearch = theater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            theater.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            theater.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            theater.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || theater.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const handleAddTheater = (data: any) => {
        const newTheater: Theater = {
            id: theaters.length + 1,
            name: data.name,
            ownerName: data.ownerName,
            email: data.email,
            phone: data.phone,
            location: data.location,
            status: 'Pending',
            totalRevenue: 0,
            totalBookings: 0,
            rating: 0,
            joinDate: new Date().toISOString().split('T')[0],
            lastActive: new Date().toISOString().split('T')[0],
            screens: data.screens ? parseInt(data.screens) : 0,
            capacity: data.capacity ? parseInt(data.capacity) : 0,
        };
        setTheaters([...theaters, newTheater]);
        setShowAddModal(false);
        setPopupMessage({ title: 'Success!', message: `${data.name} has been added`, type: 'success' });
        setShowSuccessPopup(true);
    };

    const handleUpdateTheater = (data: any) => {
        setTheaters(theaters.map(theater =>
            theater.id === data.id ? { ...theater, ...data } : theater
        ));
        setShowUpdateModal(false);
        setSelectedTheater(null);
        setPopupMessage({ title: 'Success!', message: `${data.name} has been updated`, type: 'success' });
        setShowSuccessPopup(true);
    };

    const handleDeactivateTheater = () => {
        if (theaterToDeactivate) {
            setTheaters(theaters.map(theater =>
                theater.id === theaterToDeactivate.id ? { ...theater, status: 'Inactive' } : theater
            ));
            setShowDeactivateConfirm(false);
            setTheaterToDeactivate(null);
            setDeactivationReason('');
            setPopupMessage({ title: 'Deactivated!', message: `${theaterToDeactivate.name} has been deactivated`, type: 'warning' });
            setShowSuccessPopup(true);
        }
    };

    const handleReactivateTheater = () => {
        if (theaterToReactivate) {
            setTheaters(theaters.map(theater =>
                theater.id === theaterToReactivate.id ? { ...theater, status: 'Active', lastActive: new Date().toISOString().split('T')[0] } : theater
            ));
            setShowReactivateConfirm(false);
            setTheaterToReactivate(null);
            setPopupMessage({ title: 'Reactivated!', message: `${theaterToReactivate.name} has been reactivated`, type: 'success' });
            setShowSuccessPopup(true);
        }
    };

    const columns = [
        {
            Header: 'Theater', accessor: 'name', Cell: (row: Theater) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {row.name.charAt(0)}
                    </div>
                    <div><p className="font-medium text-gray-900">{row.name}</p><p className="text-xs text-gray-500">ID: TH{String(row.id).padStart(3, '0')}</p></div>
                </div>
            )
        },
        {
            Header: 'Owner', accessor: 'ownerName', Cell: (row: Theater) => (
                <div><p className="text-sm font-medium text-gray-900">{row.ownerName}</p><div className="flex items-center gap-1 mt-0.5"><Mail className="h-3 w-3 text-gray-400" /><span className="text-xs text-gray-500">{row.email}</span></div><div className="flex items-center gap-1"><Phone className="h-3 w-3 text-gray-400" /><span className="text-xs text-gray-500">{row.phone}</span></div></div>
            )
        },
        { Header: 'Location', accessor: 'location', Cell: (row: Theater) => (<div className="flex items-center gap-2"><MapPin className="h-3 w-3 text-gray-400" /><span className="text-sm text-gray-600">{row.location}</span></div>) },
        {
            Header: 'Status', accessor: 'status', Cell: (row: Theater) => {
                const config = { Active: { icon: CheckCircle, color: 'bg-green-100 text-green-700' }, Inactive: { icon: XCircle, color: 'bg-red-100 text-red-700' }, Pending: { icon: Clock, color: 'bg-yellow-100 text-yellow-700' } };
                const c = config[row.status]; const Icon = c.icon;
                return (<span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${c.color}`}><Icon className="h-3 w-3" />{row.status}</span>);
            }
        },
        { Header: 'Revenue', accessor: 'totalRevenue', Cell: (row: Theater) => (<div className="flex items-center gap-1"><DollarSign className="h-3 w-3 text-green-500" /><span className="text-sm font-medium text-green-600">ETB {row.totalRevenue.toLocaleString()}</span></div>) },
        { Header: 'Bookings', accessor: 'totalBookings', Cell: (row: Theater) => (<div className="flex items-center gap-1"><Ticket className="h-3 w-3 text-gray-400" /><span className="text-sm text-gray-600">{row.totalBookings.toLocaleString()}</span></div>) },
        {
            Header: 'Actions', accessor: 'id', Cell: (row: Theater) => (
                <div className="flex items-center gap-2">
                    <button onClick={() => { setViewingTheater(row); setShowViewModal(true); }} className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100"><Eye className="h-4 w-4 text-blue-600" /></button>
                    <button onClick={() => { setSelectedTheater(row); setShowUpdateModal(true); }} className="p-1.5 rounded-lg bg-teal-50 hover:bg-teal-100"><Edit className="h-4 w-4 text-teal-600" /></button>
                    {row.status === 'Active' && (<button onClick={() => { setTheaterToDeactivate(row); setShowDeactivateConfirm(true); }} className="p-1.5 rounded-lg bg-orange-50 hover:bg-orange-100"><Ban className="h-4 w-4 text-orange-600" /></button>)}
                    {row.status === 'Inactive' && (<button onClick={() => { setTheaterToReactivate(row); setShowReactivateConfirm(true); }} className="p-1.5 rounded-lg bg-green-50 hover:bg-green-100"><RefreshCw className="h-4 w-4 text-green-600" /></button>)}
                </div>
            )
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg"><div className="flex items-center justify-between mb-4"><div><p className="text-sm text-gray-500">Total Theaters</p><p className="text-3xl font-bold text-gray-900">{stats.totalTheaters}</p></div><div className="p-3 bg-indigo-100 rounded-xl"><Building className="h-6 w-6 text-indigo-600" /></div></div><div className="text-sm text-gray-500">{stats.activeTheaters} Active · {stats.pendingTheaters} Pending</div></div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg"><div className="flex items-center justify-between mb-4"><div><p className="text-sm text-gray-500">Total Revenue</p><p className="text-3xl font-bold text-gray-900">ETB {stats.totalRevenue.toLocaleString()}</p></div><div className="p-3 bg-emerald-100 rounded-xl"><DollarSign className="h-6 w-6 text-emerald-600" /></div></div></div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg"><div className="flex items-center justify-between mb-4"><div><p className="text-sm text-gray-500">Total Bookings</p><p className="text-3xl font-bold text-gray-900">{stats.totalBookings.toLocaleString()}</p></div><div className="p-3 bg-blue-100 rounded-xl"><Ticket className="h-6 w-6 text-blue-600" /></div></div></div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg"><div className="flex items-center justify-between mb-4"><div><p className="text-sm text-gray-500">Active Rate</p><p className="text-3xl font-bold text-gray-900">{Math.round((stats.activeTheaters / stats.totalTheaters) * 100)}%</p></div><div className="p-3 bg-purple-100 rounded-xl"><Activity className="h-6 w-6 text-purple-600" /></div></div></div>
                </div>

                {/* Search and Add Button */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative min-w-[250px]"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /><input type="text" placeholder="Search theaters..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-white" /></div>
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2.5 border border-gray-200 rounded-xl bg-white"><option value="all">All Status</option><option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Pending">Pending</option></select>
                    </div>
                    <ReusableButton onClick={() => setShowAddModal(true)} icon="UserPlus" label="Add New Theater" />
                </div>

                {/* Table */}
                <ReusableTable columns={columns} data={filteredTheaters} icon={LayoutGrid} showSearch={false} showExport={true} showPrint={true} />

                {/* Modals */}
                {showAddModal && <AddTheater onSubmit={handleAddTheater} onClose={() => setShowAddModal(false)} formTitle="Add New Theater" />}
                {showUpdateModal && selectedTheater && <UpdateTheater theater={selectedTheater} isOpen={showUpdateModal} onClose={() => { setShowUpdateModal(false); setSelectedTheater(null); }} onUpdate={handleUpdateTheater} />}
                {showViewModal && viewingTheater && <ViewTheater theater={viewingTheater} isOpen={showViewModal} onClose={() => { setShowViewModal(false); setViewingTheater(null); }} />}

                {/* Deactivate Confirm Modal */}
                {showDeactivateConfirm && theaterToDeactivate && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl max-w-md w-full p-6">
                            <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-orange-100 rounded-lg"><AlertCircle className="h-6 w-6 text-orange-600" /></div><h3 className="text-xl font-bold">Deactivate Theater</h3></div>
                            <p className="text-gray-600 mb-4">Are you sure you want to deactivate <strong>{theaterToDeactivate.name}</strong>?</p>
                            <div className="mb-4"><label className="block text-sm font-medium mb-1">Reason</label><select value={deactivationReason} onChange={(e) => setDeactivationReason(e.target.value)} className="w-full px-3 py-2 border rounded-lg"><option value="">Select reason</option><option value="Violation">Violation of terms</option><option value="Inactive">Inactive account</option><option value="Requested">Requested by owner</option></select></div>
                            <div className="flex gap-3"><button onClick={() => setShowDeactivateConfirm(false)} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button><button onClick={handleDeactivateTheater} disabled={!deactivationReason} className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg disabled:opacity-50">Deactivate</button></div>
                        </motion.div>
                    </div>
                )}

                {/* Reactivate Confirm Modal */}
                {showReactivateConfirm && theaterToReactivate && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl max-w-md w-full p-6">
                            <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-green-100 rounded-lg"><RefreshCw className="h-6 w-6 text-green-600" /></div><h3 className="text-xl font-bold">Reactivate Theater</h3></div>
                            <p className="text-gray-600 mb-6">Are you sure you want to reactivate <strong>{theaterToReactivate.name}</strong>?</p>
                            <div className="flex gap-3"><button onClick={() => setShowReactivateConfirm(false)} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button><button onClick={handleReactivateTheater} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg">Reactivate</button></div>
                        </motion.div>
                    </div>
                )}

                {/* Success Popup */}
                <SuccessPopup isOpen={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} type={popupMessage.type} title={popupMessage.title} message={popupMessage.message} duration={3000} position="top-right" />
            </div>
        </div>
    );
};

export default TheaterManagement;