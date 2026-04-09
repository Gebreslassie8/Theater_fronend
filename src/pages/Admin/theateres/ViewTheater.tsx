// src/pages/Admin/theaters/ViewTheater.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building, Mail, User, Phone, MapPin, Hash, Users, Calendar, DollarSign, Ticket, Star } from 'lucide-react';

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

interface ViewTheaterProps {
    theater: Theater;
    isOpen: boolean;
    onClose: () => void;
}

const ViewTheater: React.FC<ViewTheaterProps> = ({ theater, isOpen, onClose }) => {
    if (!isOpen) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-700';
            case 'Inactive': return 'bg-red-100 text-red-700';
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
        <div className="border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2 mb-1">
                <div className="text-gray-400">{icon}</div>
                <span className="text-xs text-gray-500 uppercase tracking-wide">{label}</span>
            </div>
            <p className="text-gray-900 font-medium">{value || 'N/A'}</p>
        </div>
    );

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <Building className="h-5 w-5 text-indigo-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Theater Details</h2>
                        </div>
                        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        {/* Theater Avatar */}
                        <div className="flex justify-center mb-6">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Building className="h-12 w-12 text-white" />
                            </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex justify-center mb-6">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(theater.status)}`}>
                                {theater.status}
                            </span>
                        </div>

                        {/* Information Grid */}
                        <div className="space-y-4">
                            <InfoRow icon={<Building className="h-4 w-4" />} label="Theater Name" value={theater.name} />
                            <InfoRow icon={<User className="h-4 w-4" />} label="Owner Name" value={theater.ownerName} />
                            <InfoRow icon={<Mail className="h-4 w-4" />} label="Email Address" value={theater.email} />
                            <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone Number" value={theater.phone} />
                            <InfoRow icon={<MapPin className="h-4 w-4" />} label="Location" value={theater.location} />

                            <div className="grid grid-cols-2 gap-4">
                                <InfoRow icon={<Hash className="h-4 w-4" />} label="Screens" value={theater.screens || 'N/A'} />
                                <InfoRow icon={<Users className="h-4 w-4" />} label="Capacity" value={theater.capacity ? `${theater.capacity} seats` : 'N/A'} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <InfoRow icon={<DollarSign className="h-4 w-4" />} label="Total Revenue" value={`ETB ${theater.totalRevenue.toLocaleString()}`} />
                                <InfoRow icon={<Ticket className="h-4 w-4" />} label="Total Bookings" value={theater.totalBookings.toLocaleString()} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <InfoRow icon={<Star className="h-4 w-4" />} label="Rating" value={theater.rating || 'N/A'} />
                                <InfoRow icon={<Calendar className="h-4 w-4" />} label="Join Date" value={new Date(theater.joinDate).toLocaleDateString()} />
                            </div>

                            <InfoRow icon={<Calendar className="h-4 w-4" />} label="Last Active" value={new Date(theater.lastActive).toLocaleDateString()} />
                        </div>

                        {/* Close Button */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <button onClick={onClose} className="w-full px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ViewTheater;